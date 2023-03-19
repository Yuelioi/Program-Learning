import pysrt

import os
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

# 创建一个字幕对象
subs = pysrt.SubRipFile()

起始时间 = [1, 2, 3, 4, 5]
结束时间 = [2, 3, 4, 5, 6]
字幕 = ["a", "b", "c", "d", "e"]

# 循环遍历每一个字幕
for i in range(len(起始时间)):
    # 创建一个字幕条目
    sub = pysrt.SubRipItem(index=i + 1,
                           start=pysrt.SubRipTime(milliseconds=起始时间[i]*1000),
                           end=pysrt.SubRipTime(milliseconds=结束时间[i]*1000),
                           text=字幕[i])
    # 将字幕条目添加到字幕对象中
    subs.append(sub)

# 将字幕文件保存到磁盘中
subs.save('my_subtitles.srt')
