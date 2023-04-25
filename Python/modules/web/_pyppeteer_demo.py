import asyncio
import aiohttp
import pyppeteer

# 知乎不给爬
url = "https://zhuanlan.zhihu.com/p/385178515"


async def fetch(session, url):
    async with session.get(url) as response:
        return await response.text()


async def main(url):

    browser = await pyppeteer.launch(headless=False)
    page = await browser.newPage()
    await page.goto(url)
    # await page.setContent(html)
    # await page.waitForNavigation()
    # 等待页面加载完成
    await page.waitForSelector('.Post-Main', timeout=5000)

    # 获取页面指定元素的坐标和宽高
    if element := await page.J('.Post-Main'):

        bounding_box = await element.boundingBox()

        # 截图指定区域并保存到本地
        await page.screenshot(path='./screenshot.png', clip=bounding_box)

    await browser.close()

asyncio.run(main(url))
