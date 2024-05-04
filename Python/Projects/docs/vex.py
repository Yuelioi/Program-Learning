import os
import asyncio
from pathlib import Path

import aiohttp
from bs4 import BeautifulSoup
from pydantic import BaseModel
from markdownify import markdownify as md


class Document(BaseModel):
    name: str
    url: str
    content: str = ""
    filepath: Path = Path()


# 获取网页内容
async def fetchHtml(session: aiohttp.ClientSession, url: str):
    async with session.get(url) as response:
        if response.status == 200:
            html = await response.text()
            return html


# 获取文档网页
async def fetchDocsHtml(session: aiohttp.ClientSession, docs: Document):
    async with session.get(docs.url) as response:
        if response.status == 200:
            html = await response.text()
            await fetchDocument(html, docs)


# 获取文档内容
async def fetchDocument(html: str, docs: Document):
    soup = BeautifulSoup(html, "html.parser")
    if postmeta := soup.find("table", id="postmeta"):
        postmeta.extract()

    folder = docs.filepath.parent
    if not folder.exists():
        os.makedirs(folder)

    if content := soup.find("div", id="content"):
        docs.content = str(content)


# 写入文件
async def writeMd(docs: Document):
    with open(docs.filepath, "w+", encoding="utf-8") as f:
        f.write(md(docs.content))


# 遍历章节
async def fetchChapter(session, html: str):
    base_url = "https://www.sidefx.com/docs/houdini/vex/functions/"

    soup = BeautifulSoup(html, "html.parser")
    chapters = soup.find_all("section", class_="heading")

    for chapter in chapters:

        chapter_title = chapter.find("h2").text.replace("¶", "").strip()
        docs_list = chapter.find_all("li", class_="subtopics_item")

        tasks_fetch_docs_html = []
        task_write_file = []

        for docs in docs_list:
            docs_url = docs.find("a")["href"].strip()  # 修改此行，获取href属性值
            docs_title = docs.find("a").text.strip()
            docs_path = Path("dist", chapter_title, docs_title + ".md")

            dc = Document(name=docs_title, url=base_url + docs_url, filepath=docs_path)
            dc.filepath = docs_path

            tasks_fetch_docs_html.append(fetchDocsHtml(session, dc))
            task_write_file.append(writeMd(dc))

        # 先爬网页再写入文件
        await asyncio.gather(*tasks_fetch_docs_html)
        await asyncio.gather(*task_write_file)


async def main():
    url = "https://www.sidefx.com/docs/houdini/vex/functions/index.html"

    async with aiohttp.ClientSession() as session:
        if chapters_html := await fetchHtml(session, url):
            await fetchChapter(session, chapters_html)


if __name__ == "__main__":
    asyncio.run(main())
