import json
import time
from playwright.sync_api import sync_playwright
url = "https://zhuanlan.zhihu.com/p/385178515"


def test_props():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto(url)

        page.wait_for_selector('.Modal-closeButton', timeout=500)
        page.click('.Modal-closeButton')

        page.wait_for_selector(
            '.ColumnPageHeader-profile .css-jmxm1g', timeout=500)
        page.click('.ColumnPageHeader-profile .css-jmxm1g')
        page.click('.Modal-closeButton')

        page.wait_for_selector('.Post-Main', timeout=500)
        top = page.locator(".Post-Main")
        top.screenshot(path="./test.png")


def test_cookie():
    with sync_playwright() as p:
        # 启动浏览器并打开登录页面
        browser = p.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()
        page.goto('https://zhuanlan.zhihu.com/p/385178515')

        time.sleep(30)
        # 获取当前浏览器的 cookies 配置
        cookies = context.cookies()

        # 保存 cookies 配置到文件
        with open('cookies.json', 'w') as f:
            f.write(json.dumps(cookies))

        # 关闭浏览器
        context.close()
        browser.close()


def main():

    # test_props()
    test_cookie()


if __name__ == "__main__":
    main()
