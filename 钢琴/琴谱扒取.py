import asyncio

import aiohttp
from bs4 import BeautifulSoup


async def fetch(url: str):
    async with aiohttp.ClientSession() as session:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",  # 用你自己的用户代理字符串替换
            "Content-Type": "text/html; charset=utf-8",  # 根据请求的内容类型选择适当的值
        }
        async with session.get(url=url, headers=headers) as response:
            if response.status == 200:
                return await response.text()

    return ""


async def parser(url):
    html_content = await fetch(url)
    return BeautifulSoup(html_content, "html.parser")


async def get_element_url(url, css, attr="href"):
    soup = await parser(url)
    if node := soup.select_one(css):
        return node.get(attr, "")
    return ""


async def download_image(url, session):
    async with session.get(url) as response:
        if response.status == 200:
            return await response.read()
        else:
            print(f"Failed to download image from {url}, status code: {response.status}")
            return None


async def save_image(data, filename):
    if data:
        with open(filename, "wb") as f:
            f.write(data)
        print(f"Image saved to {filename}")
    else:
        print("No data to save")


async def main(base_url, url: str):
    imgs_urls = []

    href = await get_element_url(url, ".col-md-12.col-lg-9 > div:nth-child(6)  a.Title")
    music_id = href.replace("/Music-", "").replace(".html", "")

    Number = f"https://www.everyonepiano.cn/Number-{music_id}.html"
    Stave = f"https://www.everyonepiano.cn/Stave-{music_id}.html"

    soup = await parser(Number)
    if imgs := soup.select("#EOPStype1 img"):
        for img in imgs:
            img_url = f"{base_url}{img.get('src')}"
            imgs_urls.append(img_url)

    async with aiohttp.ClientSession() as session:
        tasks = [download_image(img_url, session) for img_url in imgs_urls]
        images_data = await asyncio.gather(*tasks)

        # 保存所有图像到本地
        for i, image_data in enumerate(images_data):
            filename = f"image_{music_id}_Number_{i + 1}.jpg"  # 根据需要修改文件名
            await save_image(image_data, filename)


if __name__ == "__main__":
    word = "River Flows In You"
    base_url = "https://www.everyonepiano.cn"
    url = f"https://www.everyonepiano.cn/Music-search/?come=web&word={word.replace(' ','+')}"
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main(base_url, url))
