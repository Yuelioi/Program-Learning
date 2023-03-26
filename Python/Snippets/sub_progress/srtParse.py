import pysrt
import pysubs2
import os


def createSub(index: int, start: int, end: int, text: str):
    """
    Args:
        index (int): 字幕索引
        start (int): 起始时间(ms)
        end (int): 结束时间
        text (str): 字幕
    return: 单个字幕
    """
    return pysrt.SubRipItem(
        index=index,
        start=pysrt.SubRipTime(milliseconds=start),
        end=pysrt.SubRipTime(milliseconds=end),
        text=text,
    )


def splitByPeriod(subs):
    trg_subs = pysrt.SubRipFile()
    tStart = 0
    tIndex = 0
    tText = ""
    for sub in subs:
        if tStart == 0:
            tStart = sub.start

        if "." in sub.text:
            periodIndex = sub.text.rfind(".")
            tIndex += 1
            if periodIndex > len(sub.text) - 3:
                tText += f" {sub.text}"
                tEnd = sub.end
                # 创建字幕, 并把\n 换成空格
                newsub = createSub(tIndex, tStart, tEnd,
                                   tText.replace("\\n", " ").replace("\\N", " ").strip())
                trg_subs.append(newsub)
                tStart = 0
                tText = ""
            else:
                tEnd = sub.end - ((sub.end - sub.start) /
                                  len(sub.text) * (len(sub.text) - periodIndex))
                tText += f" {sub.text[:periodIndex+1]}"
                # 创建字幕, 并把\n 换成空格
                newsub = createSub(tIndex, tStart, tEnd,
                                   tText.replace("\\n", " ").replace("\\N", " ").strip())
                trg_subs.append(newsub)
                tStart = tEnd
                tText = sub.text[periodIndex+1:]

            continue
        else:
            tText += f" {sub.text}"
    return trg_subs
