# 同步调用
import aiohttp
import aiofiles
import asyncio
from playwright.async_api import async_playwright
from playwright.sync_api import sync_playwright
import time


def main1():

    with sync_playwright() as p:
        browser = p.chromium.launch(
            executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=False)
        page = browser.new_page()
        page.goto(
            "https://www.behance.net/gallery/161360299/Cosmoses-?tracking_source=project_owner_other_projects")
        time.sleep(3)

        # 执行脚本
        page.evaluate("""() => {
                document.querySelector('#blogColumnPayAdvert').style.display = 'none';
                }""")

        # 获取所有li 使用locator
        # top = page.locator(".f-weibo")
        # top.screenshot(path="screenshot1.png")

        # browser.close()


# 异步调用


async def main2():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=False, proxy={"server": "http://127.0.0.1:10809"})
        page = await browser.new_page()

        await page.goto('https://www.behance.net/gallery/161360299/Cosmoses-?tracking_source=project_owner_other_projects')
        # 异步等待

        cover_element = await page.wait_for_selector('meta[property="og:image"]', state="attached", timeout=10000)

        if cover_element:
            title = await page.title()
            cover_url = await cover_element.get_attribute('content')
            print(title)
            out = "cover.jpg"
            if cover_url:

                async with aiohttp.ClientSession() as session:
                    async with session.get(cover_url, proxy="http://127.0.0.1:10809") as response:
                        if response.status == 200:
                            # 使用异步I/O保存文件
                            async with aiofiles.open(out, "wb") as f:
                                async for data in response.content.iter_chunked(1024):
                                    await f.write(data)
                            print(f"封面已保存到本地：{out}")


if __name__ == '__main__':
    asyncio.run(main2())
