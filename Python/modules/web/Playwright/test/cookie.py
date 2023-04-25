import json
import time
from playwright.sync_api import sync_playwright
# from bs4 import BeautifulSoup


def save_cookie(url):
    with sync_playwright() as p:
        # 启动浏览器并打开登录页面
        browser = p.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()
        page.goto(url)

        time.sleep(30)
        # 获取当前浏览器的 cookies 配置
        cookies = context.cookies()

        # 保存 cookies 配置到文件
        with open('cookies.json', 'w') as f:
            f.write(json.dumps(cookies))

        # 关闭浏览器
        context.close()
        browser.close()


def use_cookie(url):
    USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=False)
        context = browser.new_context(user_agent=USER_AGENT)

        # 加载 cookies 配置
        with open('cookies.json', 'r') as f:
            cookies = json.loads(f.read())
        context.add_cookies(cookies)
        page = context.new_page()

        page.goto(url)

        time.sleep(30)

        # 关闭浏览器
        context.close()
        browser.close()


def main():
    url = "https://music.163.com/"
    # save_cookie(url)
    use_cookie(url)


if __name__ == "__main__":
    main()

    # loop = asyncio.get_event_loop()
    # loop.run_until_complete(main2())
    # loop.close()
