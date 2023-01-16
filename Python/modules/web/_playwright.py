from playwright.sync_api import sync_playwright
import pyperclip
import time

 
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe")
    page = browser.new_page()
    page.goto("https://www.baidu.com/s?wd=11")
    
    # 获取所有li 使用locator
    top= page.locator(".result-op")
    boxes =top.all()
    print(top.__doc__)
    
    # boxes = page.query_selector_all(".result-op")
    
    for box in boxes:
        print (box.get_attribute('data-op'))

    browser.close()