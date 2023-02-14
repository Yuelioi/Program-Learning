# -*- coding: utf-8 -*-
import random
import datetime
from wordpress_xmlrpc import Client
from tqdm import tqdm
from wordpress_xmlrpc.methods.users import GetUserInfo
from wordpress_xmlrpc.methods.posts import GetPosts
from bs4 import BeautifulSoup


def sub_gl_en_zh(src_content):
    '''
    :use:用于替换英文术语
    :return:
    '''
    subb = src_content.replace('\n', ' \n')
    glossary = []
    glossaryL = []
    with open(r'glossary_en_1.txt', encoding='utf-8') as f:
        for line in f.readlines():
            glossary.append(line.split('\t')[0])
            glossaryL.append(line.split('\t')[1].split('\n')[0])

    for j in range(len(glossary)):
        subb = subb.replace(' ' + glossary[j] + ' ', ' ' + glossaryL[j] + ' ')
    return subb


def sub_tichun_zh(src_content):
    glossary = []
    glossaryL = []
    with open(r'glossary_zh_1.txt', encoding='utf-8') as f:
        for line in f.readlines():
            glossary.append(line.split('\t')[0])
            try:
                glossaryL.append(line.split('\t')[1].split('\n')[0])
            except:
                glossaryL.append("")

    for j in range(len(glossary)):
        res = src_content.replace(glossary[j], glossaryL[j])
    return res


def get_src_list(url, headers):
    '''
    :param url: 要爬取的网址
    :param headers: 请求头
    :return: 筛选后的网页内容列表
    '''

    page_text = requests.get(url=url, headers=headers).text
    soup = BeautifulSoup(page_text, 'lxml')
    # 自定义规则
    soup = soup.select('#article')[0]

    source_text = soup.prettify().replace("<h3>", "<h2>").replace(
        "</h3>", "</h2>").replace("<h4>", "<h3>").replace("</h4>", "</h3>")

    list_source = source_text.split('\n')
    return list_source

# 测试
# ⇨ # # ► ▷ ☽ ☾ ♡ # ⇀ ↪
# list_source = [' </table>', ' <p>', '  Use\xa0the', '  <strong>', '   Watch Folder', '  </strong>', '  to help the filter finding missing external After Effects files such as might happen when moving projects from one machine to another.', ' </p>', ' <table style="table-layout: fixed;">', '  <tbody>', '   <tr>', '    <td>', '     <a href="https://borisfx-com-res.cloudinary.com/image/upload//documentation/continuum/uploads/2013/06/Extruded-EPS-3.jpg">', '      <img alt="Extruded EPS 3" class="alignnone size-full wp-image-3724" height="110" src="https://borisfx-com-res.cloudinary.com/image/upload//documentation/continuum/uploads/2013/06/Extruded-EPS-3.jpg" width="730"/>', '     </a>', '     Extruded EPS supports Illustrator 8 EPS and ai files. Please\xa0 note that we do not currently support Pantone color library. All EPS files must be RGB,', '     <strong>', '      not', '     </strong>', '     CMYK.', '    </td>', '   </tr>', '  </tbody>', ' </table>', ' <table style="table-layout: fixed;">', '  <tbody>', '   <tr>', '    <td>', '     <a href="https://borisfx-com-res.cloudinary.com/image/upload//documentation/continuum/uploads/2013/06/Extruded-EPS-4.2.jpg">', '      <img alt="Extruded-EPS-4.2" class="alignnone size-full wp-image-6583" height="905" src="https://borisfx-com-res.cloudinary.com/image/upload//documentation/continuum/uploads/2013/06/Extruded-EPS-4.2.jpg" width="873"/>', '     </a>', '    </td>', '    <td>', '     <a href="https://borisfx-com-res.cloudinary.com/image/upload//documentation/continuum/uploads/2013/06/Extruded-EPS-4.1.2.jpg">', '      <img alt="Extruded-EPS-4.1.2" class="alignnone size-full wp-image-6584" height="905" src="https://borisfx-com-res.cloudinary.com/image/upload//documentation/continuum/uploads/2013/06/Extruded-EPS-4.1.2.jpg" width="874"/>', '     </a>', '    </td>', '   </tr>', '  </tbody>', ' </table>', ' <h3>', '  <strong>', '   Global Preferences [BCC9 only]', '  </strong>', ' </h3>', ' <p>', '  <em>', ]


def src_slice(list_source):
    '''
    :param list_source: 原始网页（列表）
    :return: text_tran（要翻译的列表）
    '''
    # 分割原始文档列表：需要翻译、不需要翻译
    tran_list = []
    noTran_list = []
    all_list = []
    index_src = 0
    jug_p = 0  # 段落标记
    jug_t = 0  # 是否跨行
    jug_s = 0  # strong 标签
    jub_b = 0  # <b> 标签 难判断 弃用
    last_cont = ''  # 上一句
    # jub_index = 0
    sign_s_left = "_SL_"
    sign_s_right = "_SR_"
    content_cache = '#'
    t_cache = '##'

    def rreplace(self, old, new, *max):
        count = len(self)
        if max and str(max[0]).isdigit():
            count = max[0]
        return new.join(self.rsplit(old, count))

    for src_text in list_source:
        '''
        一、没激活开关时
            1.如果找到<p 那么开启开关 本句不翻译
            2.如果以< 开头，本句也不翻译
            3.否则（也就是文本段）加入翻译栏
        二、激活开关后
            1.找到</p 结束开关，本句不翻译，翻译列表加入上述段落全体
            2.以<开头 不翻译
            3.否则（也就是文本段）加入翻译栏
            → C4D专用：包含c4d_menu_id，则开启标题模式，暂停P开关，开启T开关

            4.如果遇到strong 则左加标记1 右加标记2 然后再还原
            由于C4D标题类型为  <p  标题区域   </p> ,且标题附近无其他文字，因此可以直接取消p开关，否则应该结算p开关再取消   。
        '''
        cur_content_clear = src_text.strip()  # 清除空格

        # 如果开启p模式 追加li模式
        if jug_p == 1:
            if cur_content_clear.startswith('</p') or cur_content_clear.startswith('</li'):
                # 结束 进行汇总
                jug_p = 0
                noTran_list.append([index_src, src_text])
                tran_list.append([index_src-1, content_cache])
                content_cache = '#'
                jub_b = 0
            # elif cur_content_clear.startswith('c4d_menu_id') + 1 or cur_content_clear.startswith('<span class="HL_group'):
            #     jug_t = 1
            #     jug_p = 0
            #     noTran_list.append([index_src, src_text])
            elif cur_content_clear.startswith('<b>'):
                jub_b = 1
                last_cont = '<b>'
                noTran_list.append([index_src, cur_content_clear])

            elif cur_content_clear.startswith('</b>'):
                jub_b = 0
                # 如果上一个还是<b> 那么要多加一个空格
                if last_cont == '<b>':
                    content_cache = content_cache + ' '
                last_cont = ''
                noTran_list.append([index_src, cur_content_clear])

            elif cur_content_clear.startswith('<strong>'):
                # content_cache = content_cache + sign_s_left
                noTran_list.append([index_src, ' ' + cur_content_clear])
            elif cur_content_clear.startswith('</strong'):
                # content_cache = content_cache + sign_s_right
                noTran_list.append([index_src, cur_content_clear])

            elif cur_content_clear.startswith('<'):
                noTran_list.append([index_src, src_text])
            else:

                if last_cont == '<b>':
                    last_cont = '<bb>'
                if jub_b:
                    noTran_list.append([index_src, src_text])
                    content_cache = content_cache + cur_content_clear
                else:
                    content_cache = content_cache + ' ' + cur_content_clear
                    noTran_list.append([index_src, src_text])

        # 开启标题模式
        elif jug_t == 1:
            # 清除标题中间的换行符、加粗
            cur_content_clear = cur_content_clear.replace('<strong>', '').replace(
                '</strong>', '').replace('<br>', '').replace('</br>', '')
            # C4D 专用cur_content_clear.startswith('</span') or
            if cur_content_clear.startswith('</h2') or cur_content_clear.startswith('</h3'):
                jug_t = 0
                noTran_list.append([index_src, cur_content_clear])
                tran_list.append([index_src-1, t_cache.replace('\n', '')])
                t_cache = '##'
            elif cur_content_clear.startswith('<'):
                noTran_list.append([index_src, src_text])
            else:
                t_cache = t_cache + ' ' + cur_content_clear
        else:
            if cur_content_clear.startswith('<p') or cur_content_clear.startswith('<li'):
                # 如果遇到段落 开始段落标记 当前句加入不翻译列表
                jug_p = 1
                if cur_content_clear.startswith('<p'):
                    noTran_list.append(
                        [index_src, '<p class="yll-trs-source">'])
                elif cur_content_clear.startswith('<li'):
                    content_cache = '#s'
                    noTran_list.append(
                        [index_src, '<li class="yll-trs-source">'])
            # elif cur_content_clear.startswith('c4d_menu_id')+1 or cur_content_clear.startswith('<span class="HL_group'):
            #     # 如果遇到特殊标记 开启不换行模式 当前句加入不翻译列表
            #     jug_t = 1
            #     noTran_list.append([index_src, cur_content_clear])
            elif cur_content_clear.startswith('<h2') or cur_content_clear.startswith('<h3'):
                # 如果遇到特殊标记 开启不换行模式 当前句加入不翻译列表
                jug_t = 1
                noTran_list.append([index_src, src_text])
            elif cur_content_clear.startswith('<strong>'):
                noTran_list.append([index_src, cur_content_clear])
            elif cur_content_clear.startswith('</strong'):
                noTran_list.append([index_src, cur_content_clear])
            elif cur_content_clear.startswith('<'):
                noTran_list.append([index_src, src_text])
            else:
                noTran_list.append([index_src, src_text])
                # if jug_s:
                #     tran_list.append([index_src,sign_s_left + cur_content_clear + sign_s_right])
                # else:
                tran_list.append([index_src, cur_content_clear])
        index_src += 1

    return noTran_list, tran_list


def src_insert(tran_list, translted_list):
    final_list_res = []
    # 翻译后的内容加入
    for i in range(len(tran_list)):
        if tran_list[i][1].startswith('##'):
            final_list_res.append([tran_list[i][0], (tran_list[i][1][1:] + ' ' +
                                  '<font class="yll-trs-target">' + translted_list[i][2:] + '</font>').replace('\n', '').strip()])
        elif tran_list[i][1].startswith('#'):
            # final_list_res.append([tran_list[i][0], '<p class="yll-trs-source">' + tran_list[i][1][1:] + '</p>'])
            if tran_list[i][1].startswith('#s'):
                final_list_res.append(
                    [tran_list[i][0] + 0.1, '<li class="yll-trs-target" contenteditable="true"> ' + translted_list[i][2:] + '</li>'])
            else:
                final_list_res.append(
                    [tran_list[i][0] + 0.1, '<p class="yll-trs-target" contenteditable="true"> ' + translted_list[i][1:] + '</p>'])
        else:
            # final_list_res.append([tran_list[i][0], tran_list[i][1]])
            final_list_res.append(
                [tran_list[i][0] + 0.1, '<font class="yll-trs-target"> ' + translted_list[i]+'</font>'])

    return final_list_res


def combine(noTran_list, final_list_res):
    def takeSecond(elem):
        return elem[0]

    all_list = noTran_list + final_list_res
    res_list = sorted(all_list, key=takeSecond)
    res = ''
    for i in res_list:
        res = res + i[1] + '\n'
    # res = res.replace('_SL_','<strong>').replace('_SR_','</strong>').replace('_sl_','<strong>').replace('_sr_','</strong>').replace('sl_','<strong>').replace('sr_','<strong>').replace('sr','')
    # .replace('「「','<strong>').replace('」」','</strong>').replace('「','<strong>').replace('」','</strong>')

    content = res.rsplit('\n', 2)[0]

    import re
    # 去除多个<b>之间的换行

    def _change_b(matched):
        intStr = matched.group("number")
        addedValue = intStr.replace('\n', '').replace("  ", " ")
        addedValueStr = str(addedValue)
        return addedValueStr

    replacedStr = re.sub(
        "(?P<number>(<b>\n(.*\n){0,2}</b>\n){1,999})", _change_b, content)
    replacedStr = replacedStr.replace('<b></b>', ' ')

    # 去除多个<h2>之间的换行
    def _change_h2(matched):
        intStr = matched.group("number")
        addedValue = intStr.replace('\n', '').replace("  ", " ")
        addedValueStr = str(addedValue)
        return addedValueStr

    replacedStr = re.sub(
        "(?P<number>(<h2>\n(.*\n){0,1}</h2>))", _change_h2, replacedStr)

    # 去除多个<h3>之间的换行

    def _change_h3(matched):
        intStr = matched.group("number")
        addedValue = intStr.replace('\n', '').replace("  ", " ")
        addedValueStr = str(addedValue)
        return addedValueStr

    replacedStr = re.sub(
        "(?P<number>(<h3>\n(.*\n){0,1}</h3>))", _change_h3, replacedStr)

    # 去除多个<span>之间的换行
    def _change_span(matched):
        intStr = matched.group("number")
        addedValue = intStr.replace('\n', '').replace("  ", " ")
        addedValueStr = str(addedValue)
        return addedValueStr

    replacedStr = re.sub(
        "(?P<number>((\n){0,1}.*<span.+\n(.*\n){0,15}.*</span.+(\n){0,1}))", _change_span, replacedStr)

    # 去除多个<strong>之间的换行
    def _change_strong(matched):
        intStr = matched.group("number")
        addedValue = intStr.replace('\n', '').replace("  ", " ")
        addedValueStr = str(addedValue)
        return addedValueStr

    replacedStr = re.sub(
        "(?P<number>((\n){0,1}<strong>\n(.*\n){0,15}</strong>(\n){0,1}))", _change_strong, replacedStr)

    # 去除多个<li>之间的换行
    def _change_li(matched):
        intStr = matched.group("number")
        addedValue = intStr.replace('\n', '').replace("  ", " ")
        addedValueStr = str(addedValue)
        return addedValueStr

    replacedStr = re.sub(
        "(?P<number>((\n){0,1}<li>\n(.*\n){0,15}</li>(\n){0,1}))", _change_li, replacedStr)

    # 去除多个<p>之间的换行
    def _change_p(matched):
        intStr = matched.group("number")
        addedValue = intStr.replace('\n', '').replace("  ", "")
        addedValueStr = str(addedValue)
        return addedValueStr
    replacedStr = replacedStr.replace('<p></p>', ' ')
    replacedStr = re.sub(
        "(?P<number><p(.+\n){0,8}.*</p>)", _change_p, replacedStr)

    # 去除多个<em>之间的换行
    def _change_em(matched):
        intStr = matched.group("number")
        addedValue = intStr.replace('\n', '').replace("  ", " ")
        addedValueStr = str(addedValue)
        return addedValueStr

    replacedStr = re.sub(
        "(?P<number>((\n){0,1}<em.+\n(.*\n){0,15}.*</em.+(\n){1,1}))", _change_em, replacedStr)

    # 去除多个<em>之间的换行
    def _change_a(matched):
        intStr = matched.group("number")
        addedValue = intStr.replace('\n', '').replace("  ", " ")
        addedValueStr = str(addedValue)
        return addedValueStr

    replacedStr = re.sub(
        "(?P<number>((\n){0,1}<a.+\n(.*\n){0,4}.*</a.+(\n){1,1}))", _change_a, replacedStr)

    final_content = replacedStr

    return final_content


wp_url = 'https://www.yuelili.com/xmlrpc.php'


def get_user():
    wp_username = '435826135@qq.com'
    wp_password = 'Zk2135211'
    return wp_username, wp_password


wp_username, wp_password = get_user()
wp = Client(wp_url, wp_username, wp_password)


def download_img(data, urls, file_path):
    '''
    :param data: 原始数据
    :param urls: 要下载的图片地址
    :param file_path: 下载的图片路径
    :return: 替换过cdn图片路径的html内容
    '''
    print('开始下载图片')
    import csv
    img_replace_url = [[], []]
    # 下载图片
    for i in tqdm(range(len(urls))):

        link = urls[i][0] + urls[i][1]
        filename = str(datetime.datetime.now().strftime("%Y%m%d%H%M%S%f"))[
            :-4] + '-' + str(random.randint(10, 99)) + '.' + urls[i][1]
        pic = requests.get(link, headers=headers)
        with open(file_path + '/' + filename, 'wb') as fp:
            fp.write(pic.content)

        img_replace_url[0].append(link)
        img_replace_url[1].append('https://cdn.yuelili.com/' + filename)

    # 修改元数据
    print('替换图片中...')
    for index in range(len(img_replace_url[0])):

        data = data.replace(
            img_replace_url[0][index], img_replace_url[1][index])

    # 保存图片记录
    img_replace_url = [[row[i] for row in img_replace_url]
                       for i in range(len(img_replace_url[0]))]
    with open('img_links.csv', 'a+', encoding='utf-8') as f:
        writer = csv.writer(f, lineterminator='\n')
        writer.writerows(img_replace_url)

    return data


if __name__ == '__main__':
    import re

    headers = get_headers()
    url = url = 'https://borisfx.com//documentation/continuum/bcc-extruded-eps/'
    list_source = get_src_list(url, headers)
    print(list_source)

    noTran_list, tran_list = src_slice(list_source)
    text_tran = list(dict(tran_list).values())
    print(text_tran)
    translted_list = tran_google(text_tran)
    # translted_list = tran_caiyun(text_tran)

    final_list_res = src_insert(tran_list, translted_list)

    final_content = combine(noTran_list, final_list_res)
    # print(final_content)

    pattern = re.compile('(https:.+?)(png|jpg|gif|webp|tif)', re.I)
    img_src_urls = pattern.findall(final_content)
    print(img_src_urls)
    if len(img_src_urls) > 0:
        data_final = download_img(final_content, img_src_urls, 'downloads')
    else:
        data_final = final_content

    from wordpress_xmlrpc import WordPressPost
    from wordpress_xmlrpc.methods import posts
    from wordpress_xmlrpc.methods import taxonomies
    # 上传WP
    print('开始发布')
    wp.call(GetPosts())
    wp.call(GetUserInfo())
    post = WordPressPost()

    # 设置docs 分类
    kb_category = wp.call(taxonomies.GetTerm('knowledge_base', 188))
    doc_category = wp.call(taxonomies.GetTerm('doc_category', 189))
    post.terms.append(kb_category)
    post.terms.append(doc_category)

    title = 'BCC Extruded EPS'

    post.title = title
    post.content = final_content
    # post.content = 'wwq342q3'
    # parent_id = '6471' # 设置父对象
    post.post_status = 'publish'
    post.post_type = 'docs'

    # post.custom_fields = []
    # post.custom_fields.append({  #添加一个自定义字段
    #     '': ['Ignit Pro'],
    #     'doc_category': ['360 video']
    #
    # })
    post.post_status = 'publish'
    wp.call(posts.EditPost(15754, post))

    # wp.call(NewPost(post))
    print('发布完成')
