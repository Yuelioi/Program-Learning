import os
import re
import asyncio

import aiohttp
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

url = "https://api.lolicon.app/setu/v2?tag=loli"
url = "https://api.lolicon.app/setu/v2"

url_list = set()


def filter_filename(filename):
    filtered_name = re.sub(r'[\\/:*?"<>|]', '', filename)
    return filtered_name.strip()


def get_file_names(folder_path):
    file_names = []
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            file_name = os.path.basename(file)
            file_names.append(file_name)
    return file_names


async def down_file(url, title):
    headers = {'Referer': 'https://www.pixiv.net/'}
    async with aiohttp.ClientSession() as session:
        async with session.get(url, proxy='http://127.0.0.1:10809', headers=headers) as response:
            content = await response.read()
            with open(f"./cache/{title}", 'wb') as f:
                f.write(content)


async def get_url():
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            data = await response.json()

            original = data['data'][0]['urls']['original']
            original = original.replace(
                "https://i.pixiv.re/", "https://i.pximg.net/")
            pid = data['data'][0]['pid']

            tags = data['data'][0]['tags']
            logger.info(original)

            file_names = get_file_names("./cache")

            file_name = f"{pid} #{' #'.join(tags)}.jpg"
            file_name = filter_filename(file_name)

            if file_name in file_names:
                pass
            else:
                await down_file(original, file_name)
                url_list.add(pid)


async def main():
    tasks = []
    while True:
        tasks.append(get_url())
        await asyncio.sleep(0.3)
        if len(tasks) >= 10:
            await asyncio.gather(*tasks)
            tasks.clear()

asyncio.run(main())
