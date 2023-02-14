import requests
from lxml import etree


def get_list(pages):
    '''
    :param pages: 爬取多少页
    :return:所有页数的链接
    '''
    print('开始获取分页信息')
    return [
        f'https://aescripts.com/after-effects/?p={str(i + 1)}'
        for i in range(pages)
    ]


def get_info(url_list, img_out_path):
    '''
    :param url_list: 所有分页的url列表
    :return: 单页所有商品的信息
    '''
    page_info = []
    lens = len(url_list)
    for i in range(lens):
        try:
            print(f'正在获取:{url_list[i]}')
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
            }
            r = requests.get(url=url_list[i], headers=headers)
            html = etree.HTML(r.text)

            for j in range(12):
                print('提取分页信息...')
                try:
                    url = html.xpath(
                        f'//*[@id="products-gallery"]/ul/li[{str(j + 1)}]/div/div/a/@href'
                    )[0]
                    author = html.xpath(
                        '//*[@class="author"]/text()')[j].strip()
                    price = html.xpath('//*[@class="price"]/text()')[j].strip()
                    page_info.append([url, author, price])
                    page_info[i * 12 +
                              j].extend(get_product_info(url, img_out_path))
                    # 链接,作者,价格,描述,名称,图片下载,视频介绍,版本范围,版本号
                except:
                    continue
        except:
            print(f'未抓取成功：{url_list[i]}')
            continue

    return page_info


def get_product_info(url_product, img_out_path):
    print(f'开始获取单个插件信息:{url_product}')
    products_data = []
    if url_product != 'https://aescripts.com/handycam/':
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
        }
        r = requests.get(url=url_product, headers=headers)
        html = etree.HTML(r.text)

        try:
            _extracted_from_get_product_info_(
                html, img_out_path, products_data)
        except Exception as e:
            print(e)
    return products_data


# TODO Rename this here and in `get_product_info`
def _extracted_from_get_product_info_(html, img_out_path, products_data):
    name = html.xpath(
        '//*[@class="page-title product-name"]/h1/text()')[0]
    desc = html.xpath(
        '//*[@class="short-description"]/div/p/text()')[0].strip()
    desc = "".join(desc.split())  # 去除不可见 \xa0

    img = html.xpath('//*[@id="image"]/@src')[0]
    imgDown(img_out_path, img, name)
    video = 'https://www.youtube.com/watch?v=' + \
        html.xpath(
            '//*[@id="product_tabs_description_contents"]/div//@id')[0]
    allow = html.xpath(
        '//*[@id="product-attribute-specs-table"]/tbody/tr/td/text()')[0]

    vision = html.xpath(
        '//*[@class="downloadplus-product-history-entry"]/h4/text()')[0].strip()
    vision = "".join(vision.split())  # 去除不可见 \xa0
    products_data.extend([name, desc, img, video, allow, vision])


def imgDown(dir, url, name):
    print('下载图片')
    try:
        pic = requests.get(url=url, timeout=10)
    except requests.exceptions.ConnectionError:
        print('图片无法下载')

    outfile = f'{dir}/{name}.jpg'
    with open(outfile, 'wb') as fp:
        fp.write(pic.content)


def write_in(dataset, data_path):
    import csv
    with open(data_path, "w+", encoding='utf-8') as fileOutput:
        writer = csv.writer(fileOutput, lineterminator='\n')
        # writer.writerow(header)
        print(dataset)
        writer.writerows(dataset)
        print("保存成功")


pages = 20  # 前多少页
img_path = r'G:\back\pyfile\爬虫与数据处理\img'  # 下载图片文件夹
data_path = r'G:\back\pyfile\爬虫与数据处理\data.csv'  # 保存csv的地址

iff = get_info(get_list(pages), img_path)
write_in(iff)
