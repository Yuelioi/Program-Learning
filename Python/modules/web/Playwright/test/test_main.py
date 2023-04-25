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


def main():

    # test_props()
    ...


if __name__ == "__main__":
    main()
