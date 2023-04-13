import re
from playwright.sync_api import Page, expect

# 在终端输入 pytest 即可
# 默认是无头浏览器运行


def test_homepage_has_Playwright_in_title(page: Page):
    page.goto("https://baidu.com/")

    # Expect a title "to contain" a substring.
    expect(page).to_have_title(re.compile("百度"))

    input_text = page.locator("#kw")
    input_text.fill("月离的万事屋")

    get_search = page.locator("text=百度一下")
    get_search.click()
