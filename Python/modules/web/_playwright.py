# 同步调用
import asyncio
from playwright.async_api import async_playwright
from playwright.sync_api import sync_playwright
import time


def main1():

    with sync_playwright() as p:
        browser = p.chromium.launch(
            executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=False)
        page = browser.new_page()
        page.goto("https://blog.csdn.net/u013408061/article/details/53048291")
        time.sleep(3)

        # 执行脚本
        page.evaluate("""() => {
                document.querySelector('#blogColumnPayAdvert').style.display = 'none';
                }""")

        time.sleep(500)

        # 获取所有li 使用locator
        # top = page.locator(".f-weibo")
        # top.screenshot(path="screenshot1.png")

        # browser.close()


# 异步调用


async def main2():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=False)
        page = await browser.new_page()
        await page.goto('https://laplace.live/user/4279370')
        # 异步等待
        await asyncio.sleep(4)
        top = page.locator('main [class*="Home_xl"]')

        # 使用.nth(0) 获取第一个元素
        await top.nth(0).screenshot(path="screenshot2.png")
        await browser.close()


if __name__ == '__main__':
    asyncio.run(main2())
