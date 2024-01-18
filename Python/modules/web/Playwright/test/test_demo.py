import re

from playwright.sync_api import Page, expect

# 在终端输入 pytest 即可
# 默认是无头浏览器运行

url = "https://github.com/microsoft/vscode"


def test_homepage_has_Playwright_in_title(page: Page):
    page.goto(url)

    # Expect a title "to contain" a substring.
    page.wait_for_selector(".Post-Main")
    top = page.locator(".Post-Main")

    # input_text = page.locator("#kw")
    # input_text.fill("月离的万事屋")

    # get_search = page.locator("text=百度一下")
    # get_search.click()
