import pysrt
# import pysubs2
import os
import re


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


def time2float(t):
    '''    
    :param t: 00:05:30.200
    :return: 210.200
    '''
    t_list = [float(x) for x in t.split(":")]
    return t_list[0]*3600+t_list[1]*60+t_list[2]


def oldvtt2subs(vtt_file: str):

    trg_subs = pysrt.SubRipFile()

    starts = []
    ends = []
    texts = []

    pattern = r'<.*?>'
    repl = ''
    sub_length = 0
    with open(vtt_file, 'r') as f:
        vtt_content = f.read()
    format_sub = re.sub(pattern, repl, vtt_content).replace(
        ' align:start position:0%', '')
    sub_list = format_sub.split('\n')[4:]

    for i in range(len(sub_list)):
        if i % 12 == 8:
            try:
                starts.append(time2float(
                    sub_list[i - 8].split(' --> ')[0]))
                ends.append(time2float(
                    sub_list[i].split(' --> ')[1]))
            except Exception:
                sub_length = len(starts)
        elif i % 12 == 9:
            texts.append(
                str(f'{sub_list[i]} {str(sub_list[i + 1])}').strip())
    if sub_length:
        texts = texts[:sub_length]
        ends = ends[:sub_length]

    for i in range(len(texts)):
        trg_subs.append(createSub(i+1, starts[i]*1000, ends[i]*1000, texts[i]))

    return trg_subs


if __name__ == "__main__":
    oldvtt2subs(
        r"H:\Snippets\Program-Learning\Python\Snippets\sub_progress\output\1.vtt")
