from Snippets.sub_progress.downloader import yt_dlp_download
from tqdm import tqdm

from pathlib import Path
import os

from Snippets.sub_progress.translator import tran_deepl_pro_auto
from Snippets.sub_progress.util import get_urls_by_playlistId, get_playlistId_by_link
from Snippets.sub_progress.srtParse import splitByPeriod
import pysubs2
import os
import glob


script_dir = Path(__file__).resolve().parent
os.chdir(script_dir)
url = "https://www.youtube.com/watch?v=nMn8-BbRsN8&list=PLyJiOytEPs4etH7Ujq7PU7jlOlHL-9RmV&index=1&ab_channel=JaquelineVanek"
if PLAYLIST_ID := get_playlistId_by_link(url):
    urls = get_urls_by_playlistId(PLAYLIST_ID)
else:
    urls = [url]
urls = ['https://www.youtube.com/watch?v=nMn8-BbRsN8', 'https://www.youtube.com/watch?v=t8-Kd5PltIw', 'https://www.youtube.com/watch?v=fQL5uyL197s', 'https://www.youtube.com/watch?v=m8k-oqBlntY',
        'https://www.youtube.com/watch?v=urQlN_YL-Bw', 'https://www.youtube.com/watch?v=cS66xSR19fo', 'https://www.youtube.com/watch?v=szdoqEplThc', 'https://www.youtube.com/watch?v=hB4_a76EyPY', 'https://www.youtube.com/watch?v=Q2avczzZxq4']
for idx, url in tqdm(enumerate(urls)):
    print(f"{idx}/{len(urls)}")
    if currentPath := yt_dlp_download(
        url=url, output_path=script_dir / "output", down_sub=True
    ):

        if vtt_subs := glob.glob(f"{currentPath}*.vtt"):
            vtt = vtt_subs[0]

            vtt_sub = pysubs2.load(vtt_subs[0])
            srt_sub = splitByPeriod(vtt_sub)
            srt_sub.save(f"{currentPath}.en.srt")

            # 翻译字幕
            totran_sub = pysubs2.load(f"{currentPath}.en.srt")

            texts = [sub.text for sub in totran_sub]
            final_texts = tran_deepl_pro_auto(texts)

            # 替换字幕
            for i in range(len(totran_sub)):
                totran_sub[i].text = final_texts[i]

            # 保存
            totran_sub.save(f"{currentPath}.zh.srt")
