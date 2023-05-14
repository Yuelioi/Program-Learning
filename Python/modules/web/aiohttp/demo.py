import asyncio
import json
import aiohttp
from bs4 import BeautifulSoup


async def main(keyword):
    url = "https://manhua.dmzj.com/huyuli/67435.shtml#@page=12"

    async with aiohttp.ClientSession() as session:
        page = 1
        url = f'https://images.dmzj.com/h/%E7%8B%90%E4%B8%8E%E7%8B%B8/%E7%AC%AC1%E8%AF%9D_1512316916/P1%20%28{page}%29.jpg'
        # 下载图片
        async with session.get(url) as response:
            image = await response.content.read()

            # 保存图片
            with open("image111.jpg", "wb") as f:
                f.write(image)


loop = asyncio.get_event_loop()
loop.run_until_complete(
    main('透明惑星'))
