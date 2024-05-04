import os
import re
import asyncio
from pathlib import Path

import aiohttp
from bs4 import BeautifulSoup
from pydantic import BaseModel
from markdownify import markdownify as md


class Item(BaseModel):
    name: str
    href: str


class Document(BaseModel):
    name: str
    url: str
    content: str = ""
    filepath: Path = Path()


# 格式化文件名
def valid_folder_name(input_str: str | Path):
    input_str = str(input_str)
    invalid_chars = r'[\\/:*?"<>|]'
    folder_name = re.sub(invalid_chars, " ", input_str)
    folder_name = folder_name.strip()
    folder_name = re.sub(r"\s+", " ", folder_name)
    folder_name = folder_name[:255]
    return folder_name


# 获取网页内容
async def fetchJson(session: aiohttp.ClientSession, url: str):

    headers = {
        "User-Agent": "Your User Agent",
        "Accept": "application/json",
    }

    proxy = "http://127.0.0.1:10809"

    async with session.get(url, headers=headers, proxy=proxy) as response:
        if response.status == 200:
            data = await response.json()
            return data


# 解析分类与章节
async def parseNodes(session: aiohttp.ClientSession, url: str):

    if data := await fetchJson(session, url):
        html = data["blocks"][0]["content_html"]
        soup = BeautifulSoup(html, "html.parser")
        node = soup.find_all("block-dir-item")
        items: list[Item] = []
        for child in node:
            name = child["description"]
            href = child["href"]
            items.append(Item(name=name, href=href))

        return items

    return []


# 解析文章
async def parseDocument(session: aiohttp.ClientSession, url: str, document: Document):
    if data := await fetchJson(session, url):
        document.content = data["blocks"][0]["content_html"]


# 写入文件
async def writeMd(docs: Document):
    with open(docs.filepath, "w+", encoding="utf-8") as f:
        f.write(md(docs.content))


# 转换一下链接
def get_api_href(href: str):
    api_base = (
        f"https://dev.epicgames.com/community/api/documentation/document.json?path=en-us/unreal-engine/BlueprintAPI/"
    )
    query = href.replace("https://dev.epicgames.com/documentation/en-us/unreal-engine/BlueprintAPI/", "")
    return api_base + query


async def fetchDocuments(session: aiohttp.ClientSession, documents_data: list[Item], chapter: str, section: str = ""):
    task_fetch = []
    task_write_file = []

    folder = Path("dist", chapter, section)

    if not folder.exists():
        os.makedirs(folder)

    for document in documents_data:

        dc = Document(name=document.name, url=document.href)
        file_path = folder / valid_folder_name(document.name + ".md")
        if file_path.exists():
            file_size = os.path.getsize(file_path)
            if file_size > 0:
                continue

        dc.filepath = file_path

        api_url = get_api_href(document.href)

        task_fetch.append(parseDocument(session, api_url, dc))
        task_write_file.append(writeMd(dc))

        # 限制并发
        if len(task_fetch) >= 20:
            await asyncio.gather(*task_fetch)
            await asyncio.gather(*task_write_file)
            task_fetch = []
            task_write_file = []

    await asyncio.gather(*task_fetch)
    await asyncio.gather(*task_write_file)


async def fetchDocument(session: aiohttp.ClientSession, document: Item, chapter: str, section: str = ""):

    dc = Document(name=document.name, url=document.href)
    file_path = Path("dist", chapter, section, valid_folder_name(document.name + ".md"))

    if file_path.exists():
        file_size = os.path.getsize(file_path)
        if file_size > 0:
            return

    if not file_path.parent.exists():
        os.makedirs(file_path.parent)

    dc.filepath = file_path

    api_url = get_api_href(document.href)

    await parseDocument(session, api_url, dc)
    await writeMd(dc)


# 遍历章节
async def fetchChapter(session: aiohttp.ClientSession, url: str, chapter: str):

    if documentsOrSecions_data := await parseNodes(session=session, url=url):
        task = []

        for item in documentsOrSecions_data:
            # 如果能解析到2级目录
            if sections := await parseNodes(session, get_api_href(item.href)):
                task.append(fetchDocuments(session, sections, chapter, item.name))
            else:
                task.append(fetchDocument(session, item, chapter))

            if len(task) > 100:
                await asyncio.gather(*task)
                task = []
        await asyncio.gather(*task)
        # writeMd(file_path, document_content)


async def main():
    version = "5.4"
    lang = "en-us"
    url = f"https://dev.epicgames.com/community/api/documentation/document.json?path={lang}/unreal-engine/BlueprintAPI&application_version={version}"

    async with aiohttp.ClientSession() as session:
        chapters = await parseNodes(session, url)

        if not chapters:
            print("哥们 慢点爬")
            return

        task = []
        for chapter in chapters:
            api_url = get_api_href(chapter.href)
            task.append(fetchChapter(session, api_url, chapter.name))
        # task.append(
        #     fetchChapter(
        #         session,
        #         "https://dev.epicgames.com/community/api/documentation/document.json?path=en-us/unreal-engine/BlueprintAPI/Utilities&application_version=5.3",
        #         "utils",
        #     )
        # )

        await asyncio.gather(*task)


if __name__ == "__main__":
    asyncio.run(main())
