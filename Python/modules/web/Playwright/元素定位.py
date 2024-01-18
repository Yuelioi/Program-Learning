r"""
XPATH

: 从根节点选取
//: 从非根节点选取
*: 任意节点选取
@:根据属性筛选
text():根据文本筛选
and:关联属性或者链接文本
[]:可以放置下标/属性/链接文本
.:选取当前节点
..:选取当前节点的父节点
contains:包含, //h1[contains(text(),'Playwright')], //*[contains(@class, 'video-title tit')]


$x("//h1[@class='video-title tit']")
"""
import re
import time

from playwright.sync_api import expect, sync_playwright


def test_xpath():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto("https://www.bilibili.com/video/BV1UD4y1s7Wi/")
        title = page.locator(
            '//*[@id="viewbox_report"]/h1[contains(text(), "Playwright") and contains(@class, "tit")]'
        ).text_content()

        print(title)


def test_css():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto("https://www.bilibili.com/video/BV1UD4y1s7Wi/")

        title = page.locator(".video-title.tit").text_content()
        # print(title)
        # time.sleep(1000)


def test_playwright_selector():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto("https://github.com/microsoft/vscode")
        top = page.locator("article.markdown-body")
        print(top)
        # page.goto("https://www.bilibili.com/video/BV1UD4y1s7Wi/")
        # page.get_by_alt_text(re.compile("关注"))
        # page.get_by_label(re.compile("登录"))
        # page.get_by_title("bilibili")
        # page.get_by_text("为TA充电")
        # page.get_by_placeholder("用户名")
        # page.get_by_role("button", name="select")


def main():
    # test_xpath()
    # test_css()
    test_playwright_selector()
    ...


if __name__ == "__main__":
    main()
