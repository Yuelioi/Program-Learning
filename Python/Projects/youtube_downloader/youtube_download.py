import re
from tqdm import tqdm

from functions.util import (get_playlistId_by_link,                             get_urls_by_playlistId,
                            is_old_sub)
from functions.translator import tran_deepl_pro_auto
from functions.downloader import yt_dlp_download
import pysubs2

import os
import glob


os.chdir(os.path.dirname(__file__))


def main(url):

    if PLAYLIST_ID := get_playlistId_by_link(url):
        urls = get_urls_by_playlistId(PLAYLIST_ID)
    else:
        urls = [url]

    for idx, url in tqdm(enumerate(urls)):
        print(f"{idx +1}/{len(urls)}")

        try:
            if currentPath := yt_dlp_download(
                    url=url,
                    output_path="output",
                    down_sub=True,
                    down_video=True,
                    down_thumbnail=True,
                    prefix=f"{idx+1}_"
            ):

                vtt2srt(currentPath)
                srt2zh(currentPath)

        except:
            continue


def vtt2srt(currentPath):
    if vtt_subs := glob.glob(f"{currentPath}*.vtt"):
        vtt = vtt_subs[0]
        if is_old_sub(vtt):
            to_del = []
            srt_sub = pysubs2.load(vtt)
            to_del = []
            for idx, _ in enumerate(srt_sub):
                if idx % 3 != 1:
                    to_del.append(idx)
            for to_id in sorted(to_del, reverse=True):
                del srt_sub[to_id]

            # file = open(vtt .replace(".vtt", ".srt"), 'r+')
            # content = file.read()

            # modified_content = re.sub(r'<.+?>', '', content)
            # file.seek(0)
            # file.write(modified_content)
            # file.truncate()
            # file.close()

        else:
            srt_sub = pysubs2.load(vtt)

        # 处理一下 双行转单行 以及去掉一些字符

        for idx, _ in enumerate(srt_sub):
            srt_sub[idx].text = re.sub(r'<.+?>', '', srt_sub[idx].text)
            srt_sub[idx].text = srt_sub[idx].text \
                .replace("&nbsp;", "")\
                .replace("\\N", " ")

        srt_sub.save(vtt .replace(".vtt", ".srt"))


def sub_clean(currentPath, ext="vtt"):
    if srt_subs := glob.glob(f"{currentPath}*.en.{ext}"):
        srt = srt_subs[0]
        file = open(srt, 'r+')
        content = file.read()
        modified_content = content.replace("&nbsp;", "")
        file.seek(0)

        file.write(modified_content)
        # 截断文件，确保文件内容不会被旧内容残留覆盖
        file.truncate()
        # 关闭文件
        file.close()


def srt2zh(currentPath):
    if srt_subs := glob.glob(f"{currentPath}*.en.srt"):
        srt = srt_subs[0]
        tran_sub = pysubs2.load(srt)

        texts = [sub.text for sub in tran_sub]
        final_texts = tran_deepl_pro_auto(texts)

        # 替换字幕
        for i in range(len(tran_sub)):
            tran_sub[i].text = final_texts[i]

        # 保存
        tran_sub.save(srt.replace("en", "zh"))


def srt2ass(currentPath):

    # 加载英文字幕文件
    en_subs = pysubs2.load(f'{currentPath}.en.srt')

    # 加载中文字幕文件
    zh_subs = pysubs2.load(f'{currentPath}.zh.srt')
    en_subs.save(f'{currentPath}1.ass', format_="ass")


if __name__ == "__main__":

    os.chdir(os.path.dirname(__file__))
    url = "https://www.youtube.com/playlist?list=PL0n2FoJqwC_N7P5VSv4I8lC1Y5QfLN8u0"
    url = "https://www.youtube.com/shorts/QmuZmRf2IH4"
    # main(url)
    currentPath = r"E:\Scripting\Program-Learning\Python\Projects\youtube_downloader\1\\"
    # main()
    # srtClean(r'E:\Project\Program-Learning\Python\Projects\1\\')
    # sub_clean(currentPath=currentPath)
    vtt2srt(currentPath=currentPath)
