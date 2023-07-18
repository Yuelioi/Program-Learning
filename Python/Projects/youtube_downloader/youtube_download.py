import re
from tqdm import tqdm

from functions.util import (get_playlistId_by_link,                             get_urls_by_playlistId,
                            is_old_sub)
from functions.translator import tran_deepl_pro_auto
from functions.downloader import yt_dlp_download
import pysubs2
from pathlib import Path
import os
import glob


script_dir = Path(__file__).resolve().parent
os.chdir(script_dir)


def main():
    url = "https://www.youtube.com/playlist?list=PL0n2FoJqwC_N7P5VSv4I8lC1Y5QfLN8u0"
    if PLAYLIST_ID := get_playlistId_by_link(url):
        urls = get_urls_by_playlistId(PLAYLIST_ID)
    else:
        urls = [url]

    for idx, url in tqdm(enumerate(urls)):
        print(f"{idx +1}/{len(urls)}")

        try:
            if currentPath := yt_dlp_download(
                    url=url,
                    output_path=script_dir / "output",
                    down_sub=True,
                    down_video=True,
                    down_thumbnail=True,
                    prefix=f"{idx+1}_"
            ):

                vtt2srt(currentPath)
                srt2zh(currentPath)

        except:
            continue


def srt2ass(currentPath):

    # 加载英文字幕文件
    en_subs = pysubs2.load(f'{currentPath}.en.srt')

    # 加载中文字幕文件
    zh_subs = pysubs2.load(f'{currentPath}.zh.srt')
    en_subs.save(f'{currentPath}1.ass', format_="ass")


def vtt2srt(currentPath):
    if vtt_subs := glob.glob(f"{currentPath}*.vtt"):
        vtt = vtt_subs[0]
        if is_old_sub(vtt):
            to_del = []
            srt_sub = pysubs2.load(vtt)
            to_del = [idx for idx, _ in enumerate(
                srt_sub) if idx % 3 != 1]

            for to_id in sorted(to_del, reverse=True):
                del srt_sub[to_id]

            srt_sub.save(vtt .replace(".vtt", ".srt"))

            file = open(vtt .replace(".vtt", ".srt"), 'r+')
            content = file.read()

            modified_content = re.sub(r'<.+?>', '', content)
            file.seek(0)
            file.write(modified_content)
            # 截断文件，确保文件内容不会被旧内容残留覆盖
            file.truncate()
            # 关闭文件
            file.close()

        else:
            srt_sub = pysubs2.load(vtt)
            srt_sub.save(vtt .replace(".vtt", ".en.srt"))


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


if __name__ == "__main__":

    # currentPath = r"E:\Scripting\Program-Learning\Python\Projects\youtube_downloader\1"
    # main()
    vtt2srt(r'E:\Scripting\Program-Learning\Python\Projects\youtube_downloader\1\\')
    srt2zh(r'E:\Scripting\Program-Learning\Python\Projects\youtube_downloader\1\\')
