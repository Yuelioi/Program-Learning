from playwright.sync_api import sync_playwright
import os
from requests.utils import cookiejar_from_dict

script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)


# 设置登录所需的payload，包括用户名和密码
payload = {
    'username': 'strawberryflower2017@gmail.com',
    'password': 'flatwhite2023'
}


def getCookie():

    with sync_playwright() as p:
        # 打开一个新的浏览器页面
        browser = p.chromium.launch(
            executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=False, proxy={"server": "http://127.0.0.1:10809"})
        context = browser.new_context()

        # 访问需要登录的页面并进行登录
        page = context.new_page()
        page.goto('https://motiondesign.school/my-account/edit-account/')
        page.fill('#username', payload.get("username", ""))
        page.fill('#password', payload.get("password", ""))
        page.click('.login button[type="submit"]')

        # 等待登录成功并获取cookie
        page.goto('https://motiondesign.school/lessons/lesson-3-exercise-animate-two-geometric-designs-using-gradients-and-solid-drawing/')

        cookies = context.cookies()
        cookies_dict = {cookie['name']: cookie['value'] for cookie in cookies}
        with open("cookie_mds.txt", "w") as f:
            f.write(str(cookies_dict))

        # 将字典类型的cookie转换为RequestsCookieJar类型的对象
        cookies_jar = cookiejar_from_dict(cookies_dict)

        # 关闭浏览器
        context.close()
        browser.close()
        return cookies_jar
