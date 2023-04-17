from playwright.sync_api import sync_playwright


def test_props():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto("https://image.baidu.com/")

        # 上传文件
        file_path = r"C:/Users/yl/Desktop/1.png"
        page.locator("input[type=file]").set_input_files(file_path)

        # # 填充
        # page.fill("#username", "yuellili")
        # # 点击
        # page.click("#submit")

        # # 获取 iframe 元素
        # page.frame_locator("iframe")

        # 获取classs属性
        # page.get_attribute(selector=".video-title.tit", name="class")

        # 设置下拉列表
        page.select_option(".province", label="湖南省")
        page.select_option(".city", value="长沙市")


def main():
    # test_xpath()
    # test_css()
    # test_playwright_selector()
    test_props()


if __name__ == "__main__":
    main()
