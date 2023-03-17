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

        await page.goto('https://www.behance.net/gallery/161360299/Cosmoses-?tracking_source=project_owner_other_projects')
        # 异步等待

        cover_element = await page.wait_for_selector('meta[property="og:image"]', timeout=10000)
        print(1223)
        if cover_element:
            cover_url = await cover_element.get_attribute('content')
            print(cover_url)
        # 使用.nth(0) 获取第一个元素
        # await top.nth(0).screenshot(path="screenshot2.png")
        # await browser.close()


if __name__ == '__main__':
    asyncio.run(main2())
