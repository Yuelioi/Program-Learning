from Snippets.sub_progress.translator import tran_deepl_pro_auto
from Snippets.sub_progress.srtParse import splitByPeriod
import pysubs2
import os

# 设置工作路径
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

# 读取 并转换字幕
vtt_subs = pysubs2.load("subtitle.vtt")
srt_subs = splitByPeriod(vtt_subs)
srt_subs.save("subtitle.srt")

# 翻译字幕
totran_subs = pysubs2.load("subtitle.srt")

texts = [sub.text for sub in totran_subs]
final_texts = tran_deepl_pro_auto(texts)

# 替换字幕
for i in range(len(totran_subs)):
    totran_subs[i].text = final_texts[i]

# 保存
totran_subs.save("subtitle2.srt")
