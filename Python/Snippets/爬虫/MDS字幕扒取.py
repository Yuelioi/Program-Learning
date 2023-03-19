# import requests
# import re
# from lxml import etree
# import random

# with open('cookie_mds.txt', encoding="utf-8") as f:
#     cookies = f.read()
#     cookie_mds = {i.split("=")[0]: i.split("=")[1] for i in cookies.split(";")}
# agentsList = [
#             "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36 OPR/26.0.1656.60",
#             "Opera/8.0 (Windows NT 5.1; U; en)",
#             "Mozilla/5.0 (Windows NT 5.1; U; en; rv:1.8.1) Gecko/20061208 Firefox/2.0.0 Opera 9.50",
#             "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; en) Opera 9.50",
#             # Firefox
#             "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:34.0) Gecko/20100101 Firefox/34.0",
#             # Safari
#             "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
#             # chrome
#             "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36",
#             "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36",
#             "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
#             # 淘宝浏览器
#             "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.11 TaoBrowser/2.0 Safari/536.11",
#             # 猎豹浏览器
#             "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.71 Safari/537.1 LBBROWSER",
#             # sogou浏览器
#             "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.84 Safari/535.11 SE 2.X MetaSr 1.0",
#             # maxthon浏览器
#             "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Maxthon/4.4.3.4000 Chrome/30.0.1599.101 Safari/537.36",
#             # UC浏览器
#             "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 UBrowser/4.0.3214.0 Safari/537.36",
#         ]
# agentStr = random.choice(agentsList)

# header = {
#     'User-Agent': agentStr,
# }

# r = requests.session()
# r.keep_alive = False
# url1 = 'https://courses.motiondesign.school/courses/1298250/lectures/29778668'
# print(url1)

# try:
#     print('开始获取字幕')
#     r = requests.get(url=url1, headers=header, cookies=cookie_mds)
# except Exception as e:
#     print(e)
# def two2one(content):
#     new = ''
#     for line in content.split('\n'):
#         if line == '':
#             new += '\n\n'
#         elif re.search('[a-zA-Z]', line):  # check if there is text
#             new += line + ' '
#         else:
#             new += line + '\n'
#     return new
# html = etree.HTML(r.text)
# sub_track = html.xpath('//div[contains(@class, "attachment-wistia-player")]//@data-wistia-id')
# sub_len = len(sub_track)
# print(sub_track)
# for i in range(sub_len):
#     # 英文是eng 中文是chi eng
#     # https://fast.wistia.net/embed/captions/oi5pihrj81.vtt?language=eng
#     url2 = 'https://fast.wistia.net/embed/captions/' + sub_track[i] + '.vtt?language=eng'
#     r2 = requests.get(url=url2, headers=header, cookies=cookie_mds)
#     # print(url2)

#     out_path = r'D:\test'+ '\\' + str(i+1) +   '.srt'
#     content = r2.text.replace("WEBVTT", "", 1)
#     content = re.sub("(\d{2}:\d{2}:\d{2}).(\d{3})", lambda m: m.group(1) + ',' + m.group(2), content).split("\n",2)[2]
#     content = two2one(content)
#     content = re.sub('\n\n(\n[0-9])','\n\\1',content)
#     # print(two2one(content))

#     with open(out_path, 'a', encoding="utf-8", errors='ignore') as f:
#         f.write(content)
# 'https://embedwistia-a.akamaihd.net/deliveries/8f4b61dcfaba7005347c9c519cb6ecf34ebcb31a.m3u8'
