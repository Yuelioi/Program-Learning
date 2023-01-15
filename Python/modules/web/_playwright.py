from playwright.sync_api import sync_playwright
import pyperclip
import time

def paste_it(chunk, driver):
    # Get the input_area
    input_css = '.lmt__inner_textarea_container  textarea'
    input_css2 = 'd-textarea'

    input_area = driver.find_element(By.CSS_SELECTOR, input_css)


      
    pyperclip.copy(chunk)
    input_area.clear()
    input_area.send_keys(Keys.CONTROL + "v")

     
    numC = len(chunk)
    if numC < 500:
        time.sleep(3)
    elif numC < 980:
        time.sleep(5)
    elif numC < 1546:
        time.sleep(7)
    elif numC < 2635:
        time.sleep(9)
    elif numC < 4000:
        time.sleep(10)
    else:
        time.sleep(11)


    button_css = '.lmt__target_toolbar button'
    y = driver.find_elements(By.CSS_SELECTOR, button_css)[-1].location['y']
    driver.execute_script("window.scrollTo(0, {})".format(y - 150))

    time.sleep(1)

    try:
        button = driver.find_element(
            By.CSS_SELECTOR, '[aria-label="Copy to clipboard"]')
    except:
        button = driver.find_element(By.CSS_SELECTOR, '[aria-label="复制到剪贴板"]')

    driver.execute_script("arguments[0].click();", button)

    content = pyperclip.paste()
    input_area.clear()

    return content
  
  
def tran_deepl(driver, src_list, src_lang='en'):
    '''更新地址:https://chromedriver.chromium.org/downloads'''


    trg_len = len(src_list)
    time.sleep(1)
    traned = paste_it('\n'.join(src_list), driver).replace('\r', '')
    traned = traned.split("\n")[:trg_len]
    pyperclip.copy('')

    return traned
 
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe")
    page = browser.new_page()
    page.goto("https://www.deepl.com/translator")
    print(page.title())
    browser.close()