import aiohttp
import asyncio
from bs4 import BeautifulSoup
import time
import requests

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
        async with session.get(url, proxy='http://127.0.0.1:10809') as response:
            content = await response.text()
            soup = BeautifulSoup(content, 'html.parser')
            print(content)
            element = soup.select_one("#channel-header > yt-img-shadow > img")
            print(str(element))
            # print(element.sty)
            # tar_url = ""
            # async with session.get(tar_url, proxy='http://127.0.0.1:10809') as resp:

            #     content = await resp.read()
            #     # 读取内容
            #     with open(str(name)+"." + tar_url.split(".")[-1], 'wb') as f:
            #         # 写入至文件
            #         f.write(content)
            #         print(f'下载完成！')

            # return get_url(response)


loop = asyncio.get_event_loop()
loop.run_until_complete(main('https://www.youtube.com/watch?v=27KYsQx8aRE&ab_channel=MagnetVFX'))
