# -*- coding:utf-8 -*-
import PySimpleGUI as sg
from wordpress_xmlrpc import Client, WordPressPost
from wordpress_xmlrpc.methods.posts import NewPost

import json
import datetime
import requests
import random
import urllib.request
import time

sg.ChangeLookAndFeel('BlueMono')
# sg.SetOptions(font = ('Calibri', 12, 'bold'))
cat_dict = {'AE教程': ['MG与动画', '基础知识', '效果', '文字动画', '曲线与拉镜', '灯光与摄像机', '表达式'], '暂无分类': [''], 'C4D': ['C4D基础', 'C4D建模', 'C4D渲染器'], 'PV专区': [''], '佳作欣赏': ['3D 佳作', 'motion', 'PV佳作', 'Reel'], '其他分享': ['PS与AI', '归档'], '商店': ['AE脚本'], '图书馆': ['中英对照', '书籍', '备忘录', '访谈'], '安利': ['浏览器插件', '软件安利'], '小贴士': ['一分钟动画', '实用技巧', '彩蛋', '快捷键'], '开发': ['AE扩展', '脚本库（非开源）',
                                                                                                                                                                                                                                                                                                                                                 '脚本教程(视频)', '脚本示例(开源)'], '插件/脚本': ['三维', '动画', '合成工具', '图像', '图标库', '实用工具', '工作流', '文字', '渲染', '素材管理', '自动化', '表达式', '魔法'], '效果库': ['元素类', '光效类', '其他类（其实就是没想好放哪）', '对象类', '扭曲类', '渐变类', '科技类'], '教程众筹': [], '来拆工程': ['Circus', 'Motion Box', '百舌谷'], '油管': ['adobe社区', 'Avnish Parker', 'Dope Motions', 'everydayskillshare', 'motionscript', 'schoolofmotion', 'Twitter', 'Video-Copilot', '播放列表'], '置顶': [], '自用': ['python', 'secret', 'wordpress', '日主题美化', '月离离工具箱', '笔记']}

main_cat = ['AE教程', '小贴士', '开发', '插件/脚本', '效果库', '来拆工程', 'PV专区', '暂无分类']
child_cat = []

wp_url = 'https://www.yuelili.com/xmlrpc.php'
u1 = 'http://api.bilibili.com/x/web-interface/view?bvid='


layout = [
    [sg.Text('账号:', size=(15, 1)), sg.InputText(
        size=(25, 1), key='account', password_char='*')],
    [sg.Text('密码:', size=(15, 1)), sg.InputText(
        size=(25, 1), key='password', password_char='*')],
    [sg.Text('标题:', size=(15, 1)), sg.InputText(size=(25, 1), key='title')],
    [sg.Text('封面地址:', size=(15, 1)), sg.InputText(size=(25, 1), key='cover')],
    [sg.Text('主分类:', size=(15, 1)), sg.Combo(values=main_cat,
                                             size=(23, 1), enable_events=True, key='main_cat')],
    [sg.Text('二级分类:', size=(15, 1)), sg.Combo(
        values=child_cat, size=(23, 1), key='child_cat')],
    [sg.Text('标签:', size=(15, 1)), sg.InputText(size=(25, 1), key='tag')],
    [sg.Text('B站链接:', size=(15, 1))],
    [sg.Multiline(size=(40, 2), key='files')],
    [sg.Text('文章内容:', size=(15, 1))],
    [sg.Multiline(key='content', size=(40, 6)), sg.Input(
        key='fileread', visible=False, enable_events=True)],
    [sg.ReadButton('读取配置', size=(8, 1), key='load'), sg.ReadButton('保存配置', size=(8, 1), key='save'), sg.ReadButton('开始上传', size=(8, 1), key='upload')]]


window = sg.Window('月离离WP助手').Layout(layout)

while True:
    event, values = window.Read()  # value is a dictionary holding name and marks (4)

    def save_settings():
        print("保存设置")
        # 保存面板
        config = {
            'account': values['account'],
            'password': values['password'],
            'title': values['title'],
            'main_cat': values['main_cat'],
            'child_cat': values['child_cat'],
            'tag': values['tag'],
        }

        with open('config_wp.json', 'w', encoding='utf-8') as f:
            json.dump(config, f)

    def load_settings():
        with open('config_wp.json', 'r', encoding='utf-8') as fileobj:
            config = json.load(fileobj)
        print("加载设置成功")
        window.Element('account').Update(config['account'])
        window.Element('password').Update(config['password'])
        window.Element('title').Update(config['title'])
        window.Element('main_cat').Update(config['main_cat'])
        window.Element('child_cat').Update(config['child_cat'])
        window.Element('tag').Update(config['tag'])

    def get_b_info(url):
        print('获取B站信息')
        bv_id = url[url.find("BV") + 2:]
        bs_url = u1 + bv_id
        with urllib.request.urlopen(bs_url) as response:
            response_text = response.read()
            req = json.loads(response_text.decode())
            bTitle = req["data"]["title"]
            bpic = req["data"]['pic']  # 封面
            bvid = req["data"]['bvid']
            pubdate = req["data"]['pubdate']
            tupTime = time.localtime(int(pubdate))
            push_date = time.strftime("%Y,%m,%d", tupTime)

            desc = req["data"]['desc']

        content_b = (
            (
                (
                    (
                        f'[out_to_bili]{url}' +
                        '[/out_to_bili]\n[out_to_guider]https://www.yuelili.com/user-guide/[/out_to_guider]' +
                        '\n<div class="video_src"><iframe src="https://player.bilibili.com/player.html?bvid='
                    ) + str(bvid) +
                    '&page=1&high_quality=1" "width="100%"> </iframe></div>'
                ) + '\n<div class="video_real"><iframe src="https://www.bilibili.com/blackboard/html5player.html?bvid='
            ) + str(bvid) + '&p=1"> </iframe></div>'
        )

        return bvid, bTitle, bpic, content_b, push_date, desc

    def upload():
        wp_username = values['account']
        wp_password = values['password']
        wp = Client(wp_url, wp_username, wp_password)
        post = WordPressPost()
        push_date, desc = '', ''

        print("开始上传")
        bv_urls = values['files'].split('\n')[:-1]
        if len(bv_urls) > 2:
            for url in bv_urls:
                bvid, bTitle, bpic = get_b_info(bv_urls)
        elif bv_urls != ['']:
            bv_urls = bv_urls[0]
            bvid, bTitle, bpic, content_b, push_date, desc = get_b_info(
                bv_urls)
            thumnbnail = upload_qiniu(bpic)
            wp_post(wp, post, bTitle, content_b, thumnbnail, push_date, desc)
        else:
            bTitle, bpic, content_b, thumnbnail = ''
            wp_post(wp, post, bTitle, content_b, thumnbnail, push_date, desc)

    def upload_qiniu(bpic):

        pic = requests.get(bpic)
        key = str(datetime.datetime.now().strftime("%Y%m%d%H%M%S%f"))[
            :-4] + '-' + str(random.randint(10, 99)) + '.' + bpic.rsplit('.', 1)[1]
        print(f"开始上传七牛云：{key}")
        localfile = f'WP_Download/{key}'

        with open(localfile, 'wb') as fp:
            fp.write(pic.content)
        from qiniu import Auth, put_file, etag
        access_key = 'OZhHdKDa688FgiYQOCcvwcDtWoDE8tlTmdyFv0yh'
        secret_key = 'UxnTkea25l1kQh9PlnT1mGR65u8MnIe2ikuQll27'
        url = 'meta.yuelili.com'
        bucket_name = 'yueli-user'
        q = Auth(access_key, secret_key)

        # 生成上传 Token，可以指定过期时间等
        token = q.upload_token(bucket_name, key, 3600)

        ret, info = put_file(token, key, localfile)
        assert ret['key'] == key
        assert ret['hash'] == etag(localfile)

        print('图片上传成功')
        return f'http://{url}/{key}'

    def wp_post(wp, post, bTitle, content_b, thumnbnail, push_date, desc):
        print("开始发布文章")
        post.title = values['title'] + bTitle if (values['title'].endswith(
            '】') or values['title'].endswith(']') or values['title'].endswith('』')) else bTitle
        post.content = values['content'] + \
            content_b if values['content'] else content_b
        post.post_status = 'publish'
        post.custom_fields = []
        post.user = 247

        if push_date:
            YMD = push_date.split(',')
            post.date = datetime.datetime(
                int(YMD[0]), int(YMD[1]), int(YMD[2]))

        if len(thumnbnail) > 2:
            post.custom_fields.append({
                'key': 'knawatfibu_url',
                'value': thumnbnail,
            })
        post_cat = [values['main_cat']]

        if len(values['child_cat']) > 0:
            post_cat = [values['main_cat'], values['child_cat']]

        if len(values['tag']) > 0:
            post_tag = values['tag'].split(',')
            post.terms_names = {
                'post_tag': post_tag,
                'category': post_cat
            }
        else:
            post.terms_names = {
                'category': post_cat
            }

        wp.call(NewPost(post))
        print('发布成功')

    if event == 'main_cat':
        window.Element('child_cat')(
            value='', values=cat_dict[values['main_cat']])
    if event == 'save':
        save_settings()
    if event == 'load':
        load_settings()
    if event == 'upload':
        upload()
    if event in (None, 'Exit'):
        break
