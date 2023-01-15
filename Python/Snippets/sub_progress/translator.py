# -*- coding:utf-8 -*-

import json
import time
import requests
import pyperclip
from tqdm import tqdm

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By


from Snippets.sub_progress.secret import *
from Snippets.sub_progress.glossary import sub_gl_en_zh, sub_tichun_zh

# https://github.com/Saravananslb/py-googletranslation/issues/26


def _caiyun(txt):

    url = "http://api.interpreter.caiyunai.com/v1/translator"
    token = caiyun_token
    payload = {
        "source": txt,
        "trans_type": "en2zh",
        "request_id": "demo",
    }
    headers = {
        'content-type': "application/json",
        'x-authorization': "token " + token,
    }
    response = requests.request(
        "POST", url, data=json.dumps(payload), headers=headers)
    tran_str = json.loads(response.text)['target']
    return tran_str


def tran_caiyun(src_text):
    '''
    查看字符数：https://dashboard.caiyunapp.com/v1/token/5f684871300ab8000d9c0919/?type=2
    :param src_text: 原始数据 列表
    :return: final_translate_list 为列表
    '''


    final_translate_list = []
    if len(src_text) > 30:
        length = len(src_text)  # 总长
        n = length // 19  # 切分成多少份
        step = int(length / n) + 1  # 每份的长度
        for i in range(0, length, step):
   
            text = '\n'.join(src_text[i: i + step])
            text = sub_gl_en_zh(text).split('\n')
            final_translate_list.extend(_caiyun(text))
    else:
        final_translate_list.extend(_caiyun(src_text))

    final_list = '\n'.join(final_translate_list)
    final_list = sub_tichun_zh(final_list).split('\n')
    return final_list


def _baidu(query):
    import random
    import json
    from hashlib import md5

    # 高级版账号

    # 标准版账号
    appid = baiduappid
    appkey = baidusecretKey

    # For list of language codes, please refer to `https://api.fanyi.baidu.com/doc/21`
    from_lang = 'en'
    to_lang = 'zh'

    endpoint = 'http://api.fanyi.baidu.com'
    path = '/api/trans/vip/translate'
    url = endpoint + path

    # Generate salt and sign
    def make_md5(s, encoding='utf-8'):
        return md5(s.encode(encoding)).hexdigest()

    salt = random.randint(32768, 65536)
    sign = make_md5(appid + query + str(salt) + appkey)

    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    payload = {'appid': appid, 'q': query, 'from': from_lang,
               'to': to_lang, 'salt': salt, 'sign': sign}

    r = requests.post(url, params=payload, headers=headers)
    result = r.json()

    res = json.dumps(result, indent=4, ensure_ascii=False)

    import re
    pattern = re.compile(r'(?<=dst": ").+(?=")')   # 查找数字
    final_translate_list = pattern.findall(res)
    time.sleep(1.1)
    return final_translate_list


def tran_baidu(src_text):
    '''
    百度翻译:https://fanyi-api.baidu.com/api/trans/product/desktop?req=developer
    :param src_text: 原始数据 列表
    :return: fin_str 列表
    '''
    fin_list = []
    if len(src_text) > 30:
        src_cache = [src_text[i:i + 30]
                     for i in range(len(src_text)) if i % 30 == 0]

        for i in range(0, len(src_cache)):
            src_cache2 = "\n".join('%s' % id for id in src_cache[i])
            fin_list.extend(_baidu(src_cache2))
    else:
        src_text = "\n".join(src_text)
        fin_list = _baidu(src_text)
    return fin_list


def tran_google(src_text):
    '''
    https://github.com/Saravananslb/py-googletranslation
    :param src_text: 外文字幕列表
    :param src_lang: 外文字幕语言
    :return: 翻译后的字幕列表
    报错：如果报错，请减少个数
    '''

    from pygoogletranslation import Translator

    translator = Translator()
    fin_str = ''
    if len(src_text) > 12:
        src_cache = [src_text[i:i + 12]
                     for i in range(len(src_text)) if i % 12 == 0]
        src_len = len(src_cache)
        for i in range(0, src_len):
            src_cache2 = '\n'.join('%s' % id for id in src_cache[i])
            src_cache3 = sub_gl_en_zh(src_cache2)
            fin_str = fin_str + \
                translator.translate(src_cache3, dest="zh-CN").text + '\n'
        time.sleep(0.2)
    else:
        src_txt = '\n'.join(src_text)
        src_txt = sub_gl_en_zh(src_txt)
        fin_str = translator.translate(src_txt, dest="zh-CN").text + '\n'

    fin_str = sub_tichun_zh(fin_str)

    return fin_str.split('\n')


def paste_it(chunk, driver):
    # Get the input_area
    input_css = '.lmt__inner_textarea_container  textarea'
    input_css2 = 'd-textarea'
    try:
      input_area = driver.find_element(By.CSS_SELECTOR, input_css)
    except:
      input_area = driver.find_element(By.CSS_SELECTOR, input_css2)

      
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


def get_driver(src_lang='en'):
    options = webdriver.ChromeOptions()
    options.add_argument('--allow-running-insecure-content') # 允许访问剪切板选项
    options.add_argument('--clipboard-permission-request') # 允许网站访问剪贴板
    options.add_experimental_option("detach", True)
    driver = webdriver.Chrome(service=Service("../../chromedriver.exe"),options=options)
    return driver


def generate_list(src_list,max_char):
    chars = 0
    tar_list = []
    cache_list = []
    for i in range(len(src_list)):
        l = src_list[i]
        chars += len(l)

        if chars < max_char:
            cache_list.append(l)
        else:
            tar_list.append(cache_list)
            cache_list = [l]
            chars = len(l)

        if i == len(src_list) - 1:
            tar_list.append(cache_list)
    return tar_list


def tran_deepl(driver, src_list, src_lang='en'):
    '''更新地址:https://chromedriver.chromium.org/downloads'''


    trg_len = len(src_list)
    time.sleep(1)
    traned = paste_it('\n'.join(src_list), driver).replace('\r', '')
    traned = traned.split("\n")[:trg_len]
    pyperclip.copy('')

    return traned


def tran_deepl_pro(src_list):
    import deepl

    auth_key = deepl_key
    translator = deepl.Translator(auth_key)
    result = translator.translate_text(src_list, target_lang="ZH")

    finaltext = []

    for r in result:
        finaltext.append(r.text)

    return finaltext


def tran_deepl_auto(src_list,driver):
    
    list_cache = generate_list(src_list,2500)
    res = []
    deepl_url = 'https://www.deepl.com/translator#en/ZH/'
    driver.get(deepl_url)
    print("开始翻译")
    for one in tqdm(list_cache):
        res.extend(tran_deepl(driver, one))
    print("finish")

    return res


def tran_deepl_pro_auto(src_list):
    list_cache = generate_list(src_list,4500)
    res = []

    for one in tqdm(list_cache):
        res.extend(tran_deepl_pro(one))

    return res


if __name__ == '__main__':
    a = ['Effects must respond correctly to footage with non-square pixels, and non-uniform downsampling factors. Even different layer parameters can have different pixel aspect ratios! Doing so isn’t difficult once you understand the concepts involved.', 'Simple effects needn’t do any work to match up [point parameters](../effect-basics/parameters.html) (#effect-basics-parameters) to the actual pixels in the output. Point parameters are given to the effect scaled for downsample factor and pixel aspect ratio; they are in the coordinate system of the input buffer. This provides an implicit “pixel coordinate system.” This coordinate system is handy and easy to understand. But effects that use absolute pixel measurements or geometry must take a deeper look at the relationship between the input buffer and the final rendered image.', 'First, it is not necessarily a square coordinate system, due to both pixel aspect ratio and non-uniform downsample factor. The final rendered image can be stretched or squashed horizontally, relative to the pixels your effect processes. Circles will appear as ellipses, squares as rectangles. The distance between two points varies based on their angle in this coordinate system; anything rotated in this system is skewed, in the final output.', 'Second, even if it _is_ a square coordinate system, it’s not necessarily the same size as the final output. This means that any slider which defines a size in pixels will be a problem when the image is rendered downsampled; the width of anti-aliasing filters changes based on downsample factor.', 'Sometimes these issues aren’t a problem. Any effect that colors pixels based solely on a linear function of the x and y coordinates need not bother with pixel aspect ratio and downsample factor at all. Staying in the input coordinate space is an option, though you must account for pixel aspect ratio and downsample factor elsewhere.', 'Suppose you’re writing a particle system effect that sprays textured sprites from a source position defined by an effect control point. Using pixel coordinates to represent the particle positions seems fine (as long as the particles don’t have to rotate around a point), but when you go to actually _render_ the particle textures, you’ll have to scale them by pixel aspect ratio and downsample factor.', 'If an effect already has coordinate transformation machinery in its pipeline, there’s an alternative that’s often simpler. Many algorithms require some sort of coordinate transformation; using matrices to set up a transformation, for example. But there are other easily adaptable algorithms, for example a texture generation effect that computes the value of each pixel based solely on its position. In this case, the code must take the raw pixel position and account for pixel aspect ratio and downsample factor.',
         'The simplest way to get all of this right is to work entirely in full resolution square coordinates, then scale by downsample factor and pixel aspect ratio as a final output transformation. Since point parameters are always reported in input buffer coordinates, convert them to full-resolution square coordinates before use. With this approach you don’t need to worry about sliders which define a size in pixels; just interpret them as defining size in full-resolution vertical pixels.', '1. When getting your point parameters, go immediately to floating point and a full resolution square pixel system, like this.', '2. Perform all setup (define transformation matrices, generate coordinates for later scan conversion, compute values based on the distance between points, rotating things, et cetera) in this coordinate space. Note that you’re not actually dealing with pixels in this stage; you’re just manipulating coordinates or coordinate transformations.', '3. To go back to a coordinate system that corresponds directly to the pixels of the output buffer, undo the transformations from step one. Do this as late as possible, so as little code as possible needs to deal with this non-square space. If you’re using matrices, this would be a final output transformation. For an effect which renders something based on the coordinate of each pixel, iterate over the output pixels and convert pixel coordinates to square coordinates before doing any processing for that pixel.', 'This may seem like extra work, but most reasonably complex effects like this have a coordinate transformation step anyway; and if they don’t, they still need one to handle pixel aspect ratio and downsample factor correctly.', 'After Effects does all of its stretching horizontally so as to not to introduce unnecessary field interpolations; when pixels are used as a unit, we think of them as vertical pixels.', 'Test at 1/2, 1/4, and custom resolutions and compare the output. Use an anamorphic (2:1) pixel aspect ratio composition to track down bugs in pixel aspect ratio handling (it really makes them obvious), and be sure to test with different horizontal and vertical downsample factors.', 'Some developers have reported problems with the downsample factors provided by some “After Effects compatible” plug-in hosts being zero. Check for zero before dividing.']
    # tran_deepl_auto(a,get_driver())
    print(tran_deepl_pro_auto(a))
