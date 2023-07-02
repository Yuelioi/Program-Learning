# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
import re
import fitz
from tqdm import tqdm


def tran_google():
    ...


def main(input_path):
    doc = fitz.open(input_path)
    for page in tqdm(doc):
        page_source = page.getText('html')
        # soup = BeautifulSoup(page_source,'lxml')
        # source_text = soup.get_text()
        # return source_text
    #     list_source.extend(source_text.split('\n'))
    # print(page_source)
    # print(type(page_source))
    soup = BeautifulSoup(page_source, 'lxml')
    page_source = soup.prettify().splitlines()
    list_source = page_source
    print(list_source)
    return list_source


def get_lists(list_source):
    # 分割原始文档列表：需要翻译、不需要翻译
    tran_list = []
    noTran_list = {}

    index_src = 0
    jug_p = 0  # 段落标记
    content_cache = '#'
    list_source = list_source[:]
    for src_text in list_source:
        '''
        一、没激活开关时
            1.如果找到<p 那么开启开关 本句不翻译
            2.如果以< 开头，本句也不翻译
            3.否则（也就是文本段）加入翻译栏
        二、激活开关后
            1.找到</p 结束开关，本句不翻译，翻译列表加入上述段落全体
            2.以<开头 不翻译
            3.否则（也就是文本段）加入翻译栏 。
        '''
        cur_content_clear = src_text.strip()  # 清除空格

        # 如果开启p模式
        if jug_p == 1:
            if cur_content_clear.startswith('</p'):
                jug_p = 0
                noTran_list[index_src] = src_text
                tran_list.append([index_src, content_cache])
                content_cache = '#'

            elif cur_content_clear.startswith('<'):
                noTran_list[index_src] = src_text
            elif len(cur_content_clear) > 40 and not cur_content_clear.find(" "):
                noTran_list[index_src] = src_text
            else:
                content_cache = content_cache + ' ' + cur_content_clear
        else:
            if cur_content_clear.startswith('<p'):
                jug_p = 1
                noTran_list[index_src] = src_text
            elif cur_content_clear.startswith('<'):
                noTran_list[index_src] = src_text
            elif len(cur_content_clear) > 40 and not cur_content_clear.find(" "):
                noTran_list[index_src] = src_text
            else:
                noTran_list[index_src] = src_text
        index_src += 1
    print("需要翻译")
    print(tran_list)
    print(len(tran_list))
    print("\n\n\n")

    print("不需要翻译")
    print(noTran_list)
    print("\n\n\n")

    return tran_list, noTran_list


def tran_pdf(tran_list, noTran_list):
    print('开始翻译')
    text_tran = list(dict(tran_list).values())
    print(text_tran)

    final_list = tran_google(text_tran)
    # final_list = tran_caiyun(text_tran)
    print('------final_list------')
    print(final_list)

    final_list_res = []
    # 翻译后的内容加入

    for i in range(len(tran_list)):
        index = tran_list[i][0] - 4
        # print(index)
        if tran_list[i][1].startswith('##'):
            noTran_list[index] = noTran_list[index] + str(final_list[i][3:])
        elif tran_list[i][1].startswith('#'):
            noTran_list[index] = noTran_list[index] + str(final_list[i][1:])
        else:
            noTran_list[index] = noTran_list[index] + str(final_list[i])

    print('开始合并源数据')

    def takeSecond(elem):
        return elem[0]

    all_list = []
    for keys, value in noTran_list.items():
        temp = [keys, value]
        all_list.append(temp)
    # all_list = noTran_list
    res_list = sorted(all_list, key=takeSecond)
    return res_list


def write_in(res_list):
    # res = '\n'.join(res_list)
    res = ''
    for i in res_list:
        res = res + i[1] + '\n'
    with open(r'G:\back\pyfile\翻译\pdf_translate-master\333.html', 'w+', encoding='utf-8') as f:
        f.write(res)


# 获取html列表
source_list = main(
    r'G:\back\pyfile\月离离工具箱\月离离TP (Translator for PDF）\vector basic training.pdf')

# 获取 翻译列表
tran_list, noTran_list = get_lists(source_list)

# 合并翻译后的列表
res_list = tran_pdf(tran_list, noTran_list)

# html提纯
res = ''
for i in res_list:
    res = res + str(i[1]) + '\n'
print(res)


def _change_blank(matched):
    intStr = matched.group("number")
    addedValue = intStr.replace('\n', '').replace("  ", "")
    return str(addedValue)


replacedStr = re.sub("(?P<number>.+<p(.+\n){0,8}.*</p>)", _change_blank, res)

# 写入html
# write_in(replacedStr)
with open(r'G:\back\pyfile\月离离工具箱\月离离TP (Translator for PDF）\vector basic training.html', 'w+', encoding='utf-8') as f:
    f.write(replacedStr)
