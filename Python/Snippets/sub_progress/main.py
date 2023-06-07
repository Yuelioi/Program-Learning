from Snippets.sub_progress.functions.translator import tran_deepl_pro_auto
from Snippets.sub_progress.functions.srtParse import splitByPeriod
from Snippets.sub_progress.functions.sub_download import subDownload
import pysubs2
import os

# 设置工作路径
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

# sub_url = "https://player.vimeo.com/texttrack/85339586.vtt?token=643b3adf_0x48304df92e6f0e98a9348f7526884fc25159ada0"
subName = "04.流線背景の作成"
# subDownload(sub_url, subName)


# 读取 并转换字幕
# vtt_subs = pysubs2.load(f"{subName}.vtt")
# srt_subs = splitByPeriod(vtt_subs)
# srt_subs.save(f"{subName}.en.srt")

# 翻译字幕
# totran_subs = pysubs2.load(f"{subName}.en.srt")
totran_subs = pysubs2.load(f"{subName}.srt")

texts = [sub.text for sub in totran_subs]
final_texts = tran_deepl_pro_auto(texts)

# 替换字幕
for i in range(len(totran_subs)):
    totran_subs[i].text = final_texts[i]

# 保存
totran_subs.save(f"{subName}.zh.srt")
