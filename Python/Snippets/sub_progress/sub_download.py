from playwright.sync_api import sync_playwright
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)


with sync_playwright() as p:
    # 选择使用 Chromium 浏览器
    browser = p.chromium.launch(
        executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=False)

    # 在浏览器中打开字幕下载页面
    page = browser.new_page()
    page.goto("https://player.vimeo.com/texttrack/79332015.vtt?token=6415cea3_0x37e5a196963a85e7fcc9ef5cb0504fc19c40ab5a")

    # 获取字幕内容
    subtitle_content = page.content()

    # 将字幕内容保存为文件
    with open("subtitle.vtt", "w") as f:
        f.write(subtitle_content)

    # 关闭浏览器
    browser.close()
