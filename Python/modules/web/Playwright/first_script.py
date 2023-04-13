# 同步调用

import asyncio
from playwright.async_api import async_playwright
from playwright.sync_api import sync_playwright


# launch 的指令
# executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe"
# headless=False
# timeout 等待时间(ms)
# proxy={"server": "http://127.0.0.1:10809"}
# download_path
# slow_mo 每个操作间隔

def test_sync():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto("https://www.baidu.com")
        print(page.title())
        browser.close()  # with可以不写


async def test_async():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=False)
        page = await browser.new_page()
        await page.goto('https://www.baidu.com')
        print(await page.title())


def test_args():
    """
    测试浏览器参数
    chrome 参数列表:https://peter.sh/experiments/chromium-command-line-switches/
    """
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, args=["--start-maximized"])
        page = browser.new_page(no_viewport=True)
        page.goto("https://www.baidu.com")
        print(page.title())

        # browser.close()


def main():
    # test_sync()
    # asyncio.run(test_async())
    test_args()
    # 异步调用


if __name__ == '__main__':
    main()
