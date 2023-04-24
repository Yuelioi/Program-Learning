

import json
import time
from playwright.sync_api import Playwright, sync_playwright

with sync_playwright() as playwright:
    # 启动浏览器并打开登录页面
    browser = playwright.chromium.launch()
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
