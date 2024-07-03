import os
import re
import asyncio
from pathlib import Path

import aiohttp
from bs4 import BeautifulSoup
from pydantic import BaseModel
from markdownify import markdownify as md

task_limit = 50


class Item(BaseModel):
    name: str
    href: str


class Document(BaseModel):
    name: str
    url: str
    content: str = ""
    filepath: Path = Path()


# 文件名合法化
def valid_folder_name(input_str: str | Path):
    input_str = str(input_str)
    invalid_chars = r'[\\/:*?"<>|]'
    folder_name = re.sub(invalid_chars, " ", input_str)
    folder_name = folder_name.strip()
    folder_name = re.sub(r"\s+", " ", folder_name)
    return folder_name[:255]


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
            if os.path.getsize(file_path):
                continue

        dc.filepath = file_path

        api_url = get_api_href(document.href)

        task_fetch.append(parseDocument(session, api_url, dc))
        task_write_file.append(writeMd(dc))

        # 限制并发
        if len(task_fetch) >= task_limit:
            await asyncio.gather(*task_fetch)
            await asyncio.gather(*task_write_file)
            task_fetch = []
            task_write_file = []

    await asyncio.gather(*task_fetch)
    await asyncio.gather(*task_write_file)


async def fetchDocument(session: aiohttp.ClientSession, document: Item, file_path: Path):

    dc = Document(name=document.name, url=document.href)
    dc.filepath = file_path

    api_url = get_api_href(document.href)

    await parseDocument(session, api_url, dc)
    await writeMd(dc)


def checkFile(chapter: str, document_name: str):
    file_path = Path("dist", chapter, valid_folder_name(document_name + ".md"))

    folder = file_path.parent

    if not folder.exists():
        os.makedirs(folder)

    if file_path.exists():
        if os.path.getsize(file_path):
            return False

    return file_path


# 遍历章节
async def fetchChapter(session: aiohttp.ClientSession, url: str, chapter: str):

    if documentsOrSections_data := await parseNodes(session=session, url=url):
        task = []
        for item in documentsOrSections_data:

            if sections := await parseNodes(session, get_api_href(item.href)):
                # 跳过 Casting/Enum/Struct 分类
                if chapter == "Utilities" and (item.name == "Casting" or item.name == "Enum" or item.name == "Struct"):
                    continue
                await fetchDocuments(session, sections, chapter, item.name)
            else:
                if file_path := checkFile(chapter, item.name):
                    task.append(fetchDocument(session, item, file_path))

            if len(task) > task_limit:
                await asyncio.gather(*task)
                task = []

        await asyncio.gather(*task)


async def main():
    version = "5.4"
    lang = "en-us"
    url = f"https://dev.epicgames.com/community/api/documentation/document.json?path={lang}/unreal-engine/BlueprintAPI&application_version={version}"

    async with aiohttp.ClientSession() as session:
        chapters = await parseNodes(session, url)

        if not chapters:
            print("哥们 慢点爬")
            return

        for index, chapter in enumerate(chapters):

            if index < 651:
                continue

            api_url = get_api_href(chapter.href)
            await fetchChapter(session, api_url, chapter.name)


if __name__ == "__main__":
    asyncio.run(main())
