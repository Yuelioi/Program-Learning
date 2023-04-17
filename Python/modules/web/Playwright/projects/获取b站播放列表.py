from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    page.goto("https://www.bilibili.com/video/BV1UD4y1s7Wi/")

    cur = page.locator(".cur-list")
    # 等待li下面有链接
    page.wait_for_selector(".cur-list li a", timeout=5000)
    li_list = cur.locator("li").all()
    for li in li_list:
        print(li.locator(".page-num").inner_text())
        print(li.locator(".part").inner_text())
        print(li.locator(".duration").inner_text())
