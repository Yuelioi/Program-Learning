# coding:utf-8
import itertools
import os
from nnsplit import NNSplit

from pysubs2 import SSAFile
import pysubs2

from typing import List



def srt2list(srt_file: SSAFile):
    """将字幕对象转为字幕/时间列表
    Args:
        srt_file (SSAFile): _description_
    Returns:
        _type_: _description_
    """
    Timecode = [[], []]
    Subcode = []

    for sub in srt_file:
        Timecode[0].append(sub.start / 1000)
        Timecode[1].append(sub.end / 1000)
        Subcode.append(sub.text.replace("\n", " ").replace("  ", " "))

    return Subcode, Timecode


def find_all(content: str, sub: str):
    '''
    :param content:
    :param sub: 分割符
    :return: 位置列表或者false
    '''
    index_list = []
    index = content.find(sub)
    while index != -1:
        index_list.append(index)
        index = content.find(sub, index + 1)
    return index_list or False


def sub_comb(s1, t1, language='en'):
    ''' 用于合并短句
    :param s1,t1
    :return:s1,t1
    '''
    # 合并:把短字幕移至上一行 或者上两行
    print(' ----- 短句合并 sub_combine ----- ')
    if language == 'en':
        min_jug = 20
        max_jug = 150
        jug_sign = ' '
    else:
        min_jug = 30
        max_jug = 150
        jug_sign = ''

    sub_len_list = [len(s1[i]) for i in range(len(s1))]

    sub_len_list_length = len(sub_len_list)  # 字幕长度列表的长度
    loop = 0  # |的循环数
    jug_length = 5  # 判断|的个数，判断后5个,加自己6个
    _sub = []
    _time = [[], []]
    j = 0
    for i in range(sub_len_list_length):
        if loop < sub_len_list_length - jug_length:
            if sub_len_list[loop] < min_jug:
                for j in range(2, jug_length + 2):
                    if sum(sub_len_list[loop:loop + j]) > max_jug:
                        # 多行才有2个空格判断 一句的不要判断
                        _sub.append(jug_sign.join(str(i)
                                    for i in s1[loop:loop + j]).replace('  ', ' '))
                        _time[0].append(t1[0][loop])
                        _time[1].append(t1[1][loop + j - 1])
                        loop += j
                        break
                    elif j == jug_length + 1:
                        _sub.append(jug_sign.join(str(i)
                                    for i in s1[loop:loop + j]).replace('  ', ' '))
                        _time[0].append(t1[0][loop])
                        _time[1].append(t1[1][loop + j - 1])
                        loop += j
                        break
            else:
                _sub.append(s1[loop])
                _time[0].append(t1[0][loop])
                _time[1].append(t1[1][loop + j - 1])
                loop += 1
        else:
            try:
                _sub.append(s1[loop])
                _time[0].append(t1[0][loop])
                _time[1].append(t1[1][loop])
            except:
                pass
            loop += 1
    print(' ----- 合并结束 ----- ')
    return _sub, _time


def get_sbd(list):
    """  获取句子边界 并添加|   """
    model = "functions/models/en/model.onnx"

    splitter = NNSplit(model)
    temp_content = '---'.join(list)
    splits = splitter.split([temp_content])
    res = ''.join(f"{str(sentence)}|" for sentence in splits[0])
    return res.split("---")


def sub_slc(sublist: List[str]):
    """  句根据术语 给字幕列表添加 | """
    sublist_new = sublist[:]
    
    with open('functions/glossarys/glossary_base.txt', encoding='utf-8') as f:
        # 第一行用于注释
        glossary = [line.split('\t')[0] for line in f][1:]


    for index,sub in enumerate(sublist_new):
        jug = 0
        pos_list = []
        
        for word in glossary:
            
            # 获得该字典中单词的位置
            pos = f' {sub} '.find(f" {word} ")
            
            # 如果有临近位置 就跳过
            for k in pos_list:
                if k < pos < k + 10:
                    pos = -1
                    
            # 遍历完就结束
            if jug == 3 or word == glossary[-1]:
                sublist_new[index] = sub
                break
            
            # 设置新的断点
            elif pos + 1:
                pos_list.append(pos)
                jug += 1
                sub = f"{sub[:pos]}|{sub[pos:]}"
    return sublist_new


def split_time(sublist, splitlist, timelist):
    '''根据 | 分割字幕与时间
    :param sublist: 原始字幕
    :param splitlist: 带|的字幕
    :param timelist: 时间轨道
    :return: 字幕列表，时间列表
    '''
    SUBLIST = []
    TIMLIST = [[], []]
    sub_temp = ''

    TIMLIST[0].append(timelist[0][0])
    for i in range(len(sublist)):
        if i == len(sublist) - 1:
            SUBLIST.append(f'{sub_temp} {sublist[i]}'.strip())
            break
        if split_pos_list := find_all(splitlist[i], "|"):
            for j in range(len(split_pos_list)):
                start = timelist[0][i]
                end = timelist[1][i]
                if len(split_pos_list) == 1:
                    # 只有一个断句
                    sub = f'{sub_temp.strip()} {str(sublist[i][:split_pos_list[0]])}'
                    SUBLIST.append(sub.strip())
                    sub_temp = sublist[i][split_pos_list[0]:]

                    mid = start + split_pos_list[0] / \
                        len(sublist[i]) * (end - start)
                    TIMLIST[1].append(mid)
                    TIMLIST[0].append(mid)

                elif j == 0:
                    # 1
                    sub = f'{sub_temp.strip()} {str(sublist[i][:split_pos_list[0]])}'
                    SUBLIST.append(sub.strip())
                    sub_temp = ''

                    mid = start + split_pos_list[0] / \
                        len(sublist[i]) * (end - start)
                    TIMLIST[1].append(mid)
                    TIMLIST[0].append(mid)

                elif j < len(split_pos_list) - 1:
                    # 2 ~ n-1
                    sub = str(
                        sublist[i][max(split_pos_list[j - 1] - j, 0):split_pos_list[j] - j - 1])
                    SUBLIST.append(sub.strip())

                    mid = start + split_pos_list[j] / \
                        len(sublist[i]) * (end - start)
                    TIMLIST[1].append(mid)
                    TIMLIST[0].append(mid)

                else:
                    # n
                    sub = str(
                        sublist[i][max(split_pos_list[j - 1] - j, 0):split_pos_list[j] - j])
                    SUBLIST.append(sub.strip())
                    sub_temp = sublist[i][split_pos_list[j] - j:]

                    mid = start + split_pos_list[-1] / \
                        len(sublist[i]) * (end - start)
                    TIMLIST[1].append(mid)
                    TIMLIST[0].append(mid)
        else:
            sub_temp = f'{sub_temp} {sublist[i]}'

    TIMLIST[1].append(timelist[1][-1])
    return SUBLIST, TIMLIST


def sub_foward(sublist, timelist):
    """  句尾的单词 比如so/if，会并入下一句   """
    with open('functions/glossarys/sub_foward.txt', encoding='utf-8') as f:
        txt = f.readlines()
        forward_list = [i.split('\n')[0] for i in txt]
        forward_listL = [len(i.split('\n')[0]) for i in txt]

    # forward_list = ['right','all','i will']
    # forward_listL = [5,3,6]
    for i in range(len(sublist)):
        if i < len(sublist) - 1:  # 最后一行处理会报错 故只处理到倒数第二行
            try:
                j = forward_list.index(sublist[i].lower().rsplit(' ')[-1])
                sublist[i] = sublist[i][:-forward_listL[j] - 1]
                sublist[i + 1] = f'{forward_list[j]} {sublist[i + 1]}'

                tim_move = (timelist[1][i] - timelist[0][i]) * \
                    len(forward_listL[j]) / len(sublist[i])
                timelist[1][i] = timelist[1][i] - tim_move
                timelist[0][i+1] = timelist[0][i+1] + tim_move
            except:
                pass
            if sublist[i].endswith(' all') and sublist[i+1].startswith('right '):
                sublist[i] = sublist[i][:-3]
                sublist[i + 1] = f'all {sublist[i + 1]}'
                tim_move = (timelist[1][i] - timelist[0]
                            [i]) * 3 / len(sublist[i])
                timelist[1][i] = timelist[1][i] - tim_move
                timelist[0][i+1] = timelist[0][i+1] + tim_move

    return sublist, timelist


def sub_tooshort(subb, timm):
    """ 字幕精细处理 比如and断句提前"""
    # 如果出现 not all arguments converted during string formatting ，需要再加判断

    with open(r'functions/glossarys/sentence_foward.txt', encoding='utf-8') as f:
        txt = f.readlines()

    forward_list = [i.split('\n')[0] for i in txt]

    SUB = subb[:]
    TIM = [timm[0][:], timm[1][:]]
    check = False
    link = 0
    jug = 30
    for i in range(len(subb)):
        subL = subb[i]
        if link:
            link -= 1
            continue
        if len(subL) < jug:
            if i < len(subb) - 3:
                for bb in subb[i:i+3]:
                    if len(bb) >= jug:
                        break
                    SUB[i+link] = ''
                    TIM[0][i+link] = ''
                    TIM[1][i+link] = ''
                    link += 1
                if subL.lower().split(' ')[0] in forward_list:
                    check = True

                if check or i == 0 or (subb[i+1].split(' ')[0]):
                    if len(SUB[i + link]) < jug:
                        SUB[i + link-1] = ' '.join(subb[i:i+link])
                        TIM[0][i + link-1] = timm[0][i]
                        TIM[1][i + link-1] = timm[1][i + link-1]
                    else:
                        SUB[i + link] = ' '.join(subb[i:i+link+1])
                        TIM[0][i + link] = timm[0][i]
                        link += 1

                    check = False

                else:
                    SUB[i - 1] = f'{SUB[i - 1]} {subL}'
                    TIM[1][i - 1] = timm[1][i]

                    if len(SUB[i + link]) < jug:
                        SUB[i + link-1] = ' '.join(subb[i+1:i+link])
                        TIM[0][i + link-1] = timm[0][i+1]
                        TIM[1][i + link-1] = timm[1][i + link-1]
                    else:
                        SUB[i + link] = ' '.join(subb[i+1:i+link+1])
                        TIM[0][i + link] = timm[0][i+1]
                        link += 1
                link -= 1
            elif i == len(subb) - 1:
                TIM[1][i-1] = TIM[1][i]
                SUB[i-1] = f'{SUB[i - 1]} {subL}'

                _extracted_tooshort(TIM, i, SUB)
            else:
                TIM[0][i+1] = TIM[0][i]
                SUB[i+1] = f'{subL} {SUB[i + 1]}'

                _extracted_tooshort(TIM, i, SUB)
                link = 1
    return SUB, TIM


# TODO Rename this here and in `sub_tooshort`
def _extracted_tooshort(TIM, i, SUB):
    TIM[0][i] = ''
    TIM[1][i] = ''
    SUB[i] = ''


def clear_blank(s, t):
    """ 去除空字幕  """
    S = []
    T = [[], []]
    for i in range(len(s)):
        if s[i] != '':
            S.append(s[i])
            T[0].append(t[0][i])
            T[1].append(t[1][i])

    return S, T


def sub_toolong(subb, timm, limit=150):

    glossary = []
    with open(r'functions/glossarys/too_long.txt', encoding='utf-8') as f:
        glossary.extend(line.split('\t')[0] for line in f)
    glossary = glossary[1:]  # 用于第一行注释


    SS = []
    TT = [[], []]
    for i in range(len(subb)):
        subLen = len(subb[i])
        mid = 0
        if subLen > limit:
            for sp in glossary:
                mid_temp = (subb[i]).find(f" {sp} ")
                if subLen*1/4 < mid_temp < subLen*3/4:
                    mid = mid_temp
                    break
            if not mid:
                print(f"这些句子因为过长被吃掉(分割)了：{subb[i]}")
                mid = subb[i].find(" ", round(subLen / 2))

            midTime = timm[0][i] + mid / subLen * (timm[1][i] - timm[0][i])
            SS.extend((subb[i][:mid], subb[i][mid:]))
            TT[0].append(timm[0][i])
            TT[0].append(midTime)
            TT[1].append(midTime)
        else:
            SS.append(subb[i])
            TT[0].append(timm[0][i])
        TT[1].append(timm[1][i])
    return SS, TT


def sub_tichun_en(subb):
    '''
    subb → subb
    用于校对英文字幕的识别错误 比如
    Trap code → Trapcode
    '''

    glossary = []
    glossaryL = []
    with open(r'functions/glossarys/en_error.txt', encoding='utf-8') as f:
        for line in f:
            glossary.append(line.split('\t')[0])
            glossaryL.append(line.split('\t')[1].split('\n')[0])

    for i, j in itertools.product(range(len(subb)), range(len(glossary))):
        subb[i] = f' {subb[i]} '.replace(
            f' {glossary[j]} ', f' {glossaryL[j]} '
        ).strip()
    return subb


def progress(srt:SSAFile):
    s_original, t_original = srt2list(srt)
    s_temp = get_sbd(s_original)
    s_temp = sub_slc(s_temp)
    
    s1, t1 = split_time(s_original, s_temp, t_original)
    s2,t2 = sub_foward(s1, t1)
    s3,t3 =sub_toolong(s2,t2,150)
    s3,t3 =sub_toolong(s3,t3,150)
    return s3,t3

def generate_sub(s,t):
    ssFile = SSAFile()
    
    for i in range(len(s)):
        ssFile.append(pysubs2.SSAEvent(start=t[0][i]*1000, end=t[1][i]*1000, text=s[i]))
    ssFile.save("TEST.ASS")
    
    
if __name__ == '__main__':
    os.chdir(os.path.dirname(__file__))

    srt = pysubs2.load(r"E:\Project\Program-Learning\Python\Projects\youtube_downloader\output\1_CRAZY After Effects Technique The Power Pin Sandwich OPzXwJENZUg.en.srt")
    s_original, t_original = srt2list(srt)
    s_temp = get_sbd(s_original)
    s_temp = sub_slc(s_temp)
    s1, t1 = split_time(s_original, s_temp, t_original)
    s2,t2 = sub_foward(s1, t1)
    s3,t3 =sub_toolong(s2,t2,150)
    s3,t3 =sub_toolong(s3,t3,150)
  
    generate_sub(s3,t3)

    

