import aiohttp

import asyncio
import time
import requests


def get_html(response):
    return response.text()


def get_info(response):
    print("Status:", response.status)
    print("Content-type:", response.headers['content-type'])


def get_url(response):
    return response.json() # URL 需要的话用str()转换下


async def main(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            json = await response.json()
            print(json["data"][0]["urls"]["original"])
            # return get_url(response)
            

# loop = asyncio.get_event_loop()
# print(loop.run_until_complete(main('https://api.lolicon.app/setu/v2')))


