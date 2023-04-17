import itertools
from Snippets.sub_progress.functions.downloader import yt_dlp_download
from tqdm import tqdm

from pathlib import Path
import os

from Snippets.sub_progress.functions.translator import tran_deepl_pro_auto
from Snippets.sub_progress.functions.util import get_urls_by_playlistId, get_playlistId_by_link, is_old_sub
from Snippets.sub_progress.functions.srtParse import oldvtt2subs
from Snippets.sub_progress.functions.srtParse import splitByPeriod
import pysubs2
import os
import glob


script_dir = Path(__file__).resolve().parent
os.chdir(script_dir)


def main():
    url = "https://www.youtube.com/watch?v=xUmMHgZ9YfI&t=4s&ab_channel=JakeInMotion"
    if PLAYLIST_ID := get_playlistId_by_link(url):
        urls = get_urls_by_playlistId(PLAYLIST_ID)
    else:
        urls = [url]

    for idx, url in tqdm(enumerate(urls)):
        print(f"{idx}/{len(urls)}")
        if currentPath := yt_dlp_download(
                url=url,
                output_path=script_dir / "output",
                # down_sub=True,
                down_video=True,
                # down_thumbnail=True,
        ):

            if vtt_subs := glob.glob(f"{currentPath}*.vtt"):
                vtt = vtt_subs[0]
                vtt_sub = oldvtt2subs(vtt) if (
                    is_old_sub(vtt)) else pysubs2.load(vtt_subs[0])
                srt_sub = splitByPeriod(vtt_sub)
                srt_sub.save(f"{currentPath}.en.srt")

                # 翻译字幕
                tran_sub = pysubs2.load(f"{currentPath}.en.srt")

                texts = [sub.text for sub in tran_sub]
                final_texts = tran_deepl_pro_auto(texts)

                # 替换字幕
                for i in range(len(tran_sub)):
                    tran_sub[i].text = final_texts[i]

                # 保存
                tran_sub.save(f"{currentPath}.zh.srt")


currentPath = r"output/Getting Started with PowerShell 3.0- (09) Introducing scripting and toolmaking - Microsoft Learn"


def srt2ass(currentPath):

    # 加载英文字幕文件
    en_subs = pysubs2.load(f'{currentPath}.en.srt')

    # 加载中文字幕文件
    zh_subs = pysubs2.load(f'{currentPath}.zh.srt')
    en_subs.save(f'{currentPath}1.ass', format_="ass")


# ss = pysubs2.load(f'{currentPath}.ass')
# srt2ass(currentPath)

# pysubs2.SSAStyle(fontname='思源黑体 Regular', fontsize=48)


def autoTranslate(currentPath):

    vtt_sub = pysubs2.load(f"{currentPath}.vtt")

    srt_sub = splitByPeriod(vtt_sub)
    srt_sub.save(
        f"{currentPath}.en.srt")

    tran_sub = pysubs2.load(f"{currentPath}.en.srt")
    texts = [sub.text for sub in tran_sub]
    final_texts = tran_deepl_pro_auto(texts)

    # 替换字幕
    for i in range(len(tran_sub)):
        tran_sub[i].text = final_texts[i]

    # 保存
    tran_sub.save(f"{currentPath}.zh.srt")


if __name__ == "__main__":
    main()
