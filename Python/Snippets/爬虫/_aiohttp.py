import aiohttp

import asyncio


def get_html(response):
    return response.text()


def get_info(response):
    print("Status:", response.status)
    print("Content-type:", response.headers['content-type'])


def get_url(response):
    return response.url # URL 需要的话用str()转换下


async def main(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return get_url(response)
            

loop = asyncio.get_event_loop()
print(loop.run_until_complete(main('https://www.dmoe.cc/random.php')))
