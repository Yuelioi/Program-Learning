import os
import asyncio
from pathlib import Path

import PyPDF2
import aiohttp
import aiofiles
from PIL import Image, ImageFile
from playwright.async_api import async_playwright

pdfs = []


async def download_image(img_url, filename):
    """Download Image"""
    global pdfs
    pdfs.append(f"{os.path.splitext(filename)[0]}.pdf")

    if Path(filename).is_file():
        print(f"{filename}已存在, 跳过")
        return

    async with aiohttp.ClientSession() as session:
        async with session.get(img_url) as response:
            if response.status != 200:
                print(f"下载 {img_url} 失败，错误码：{response.status}")
                return

            image = await response.content.read()
            async with aiofiles.open(filename, mode="wb") as f:
                await f.write(image)


async def get_images(page, page_url, title):
    """Get image url and download"""

    await page.goto(page_url)

    options = await page.query_selector_all("#page_select > option")
    # 获取所有图片链接
    options = await page.query_selector_all("#page_select > option")
    img_urls = await asyncio.gather(*[option.get_attribute("value") for option in options])

    tasks = []
    for i, img_url in enumerate(img_urls):
        filename = f"{title}_{str(i+1)}.jpg"
        tasks.append(asyncio.create_task(download_image(f"https:{img_url}", filename)))

    await asyncio.gather(*tasks)

    tasks2 = [create_pdf(f"{title}_{str(i+1)}.jpg") for i in range(len(img_urls))]

    await asyncio.gather(*tasks2)


async def down_anime():
    host = "https://manhua.dmzj.com"
    url = "https://manhua.dmzj.com/huyuli/"
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        await page.goto(url)

        # 查找所有章节
        await page.wait_for_selector(".cartoon_online_border > ul > li", timeout=5000)
        chapters = await page.locator(".cartoon_online_border > ul > li a").all()

        # 获取每个章节的URL和标题
        chapter_urls, chapter_titles = [], []
        for chapter in chapters[:2]:
            chapter_url = f'{host}{await chapter.get_attribute("href")}'
            chapter_titles.append(await chapter.get_attribute("title"))
            chapter_urls.append(chapter_url)

        # 下载每个章节的图片
        for url, title in zip(chapter_urls, chapter_titles):
            await get_images(page, url, title)


async def create_pdf(input_path):
    # 将JPEG图像数据添加到PDF文件中

    # 跳过文件错误
    ImageFile.LOAD_TRUNCATED_IMAGES = True
    with Image.open(input_path) as img:
        img.convert("RGB")
        filename = f"{os.path.splitext(input_path)[0]}.pdf"
        img.save(filename)


async def merge_pdf(pdfs):
    """Merge"""
    mergeFile = PyPDF2.PdfFileMerger()

    for pdf in pdfs:
        if os.path.isfile(pdf):
            mergeFile.append(PyPDF2.PdfFileReader(pdf, "rb"), outline_item=pdf)
        else:
            print(f"未找到{pdf}")
    mergeFile.write("合并文件.pdf")


async def main():
    await down_anime()
    await merge_pdf(pdfs)

    ...


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
