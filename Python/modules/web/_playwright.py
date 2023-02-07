# 同步调用
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(
        executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe")
    page = browser.new_page()
    page.goto("https://m.weibo.cn/status/4866169851085102")

    # 获取所有li 使用locator
    top = page.locator(".f-weibo")
    top.screenshot(path="screenshot1.png")

    browser.close()

# 异步调用
from playwright.async_api import async_playwright


async def main():
    async with async_playwright() as playwright:
        browser = await playwright.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        await page.goto('https://www.example.com')
        print(f'Title of the page: {await page.title()}')

        await browser.close()
