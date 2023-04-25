import aiohttp
import asyncio
from bs4 import BeautifulSoup


asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())


def get_html(response):
    return response.text()


def get_info(response):
    print("Status:", response.status)
    print("Content-type:", response.headers['content-type'])


def get_url(response):
    return response.json()  # URL 需要的话用str()转换下


async def main(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            content = await response.text()
            print(content)


loop = asyncio.get_event_loop()
loop.run_until_complete(
    main('https://api.ixiaowai.cn/ylapi/index.php/?code=json'))
