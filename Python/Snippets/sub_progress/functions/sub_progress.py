import itertools
from nnsplit import NNSplit
import srt
# coding:utf-8


def time2float(t):
    '''    
    :param t: 00:05:30.200
    :return: 210.200
    '''
    t_list = [float(x) for x in t.split(":")]
    return t_list[0]*3600+t_list[1]*60+t_list[2]


def srt2list(srt_file):

    Timecode = [[], []]
    Subcode = []

    s = srt.parse(srt_file)
    for i in s:

        Timecode[0].append(time2float(str(i.start)))
        Timecode[1].append(time2float(str(i.end)))
        Subcode.append(i.content.replace("\n", " ").replace("  ", " "))
    # import re
    #
    # try:
    #     srt_list = re.sub("(\d{2}:\d{2}:\d{2}).(\d{3})", lambda m: m.group(1) + '.' + m.group(2), srt_file).split('\n')
    # except :
    #     srt_list = re.sub("(\d{2}:\d{2}:\d{2}),(\d{3})", lambda m: m.group(1) + ',' + m.group(2), srt_file).split('\n')
    # time1 = [srt_list[i] for i in range(len(srt_list)) if re.findall('\d{2}.+--.+', srt_list[i])]
    # Timecode[0] = [time2float(t.split(' --> ')[0]) for t in time1]
    # Timecode[1] = [time2float(t.split(' --> ')[1]) for t in time1]
    # Subcode = [(srt_list[i+1]+ ' ' + srt_list[i+2]).strip() for i in range(len(srt_list)) if re.findall('\d{2}.+--.+',srt_list[i])]
    return Subcode, Timecode


def find_all(content, sub):
    '''
    :param content: 字符串
    :param sub: 分割符
    :return: 位置列表或者false
    '''
    index_list = []
    index = content.find(sub)
    while index != -1:
        index_list.append(index)
        index = content.find(sub, index + 1)
    return index_list or False


def sub_comb(s1, t1, lang='en'):
    ''' 用于合并短句
    :param s1,t1
    :return:s1,t1
    '''
    # 合并:把短字幕移至上一行 或者上两行
    print(' ----- 短句合并 sub_combine ----- ')
    if lang == 'en':
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

    splitter = NNSplit("models/en/model.onnx")
    temp_content = '---'.join(list)
    splits = splitter.split([temp_content])
    res = ''.join(f"{str(sentence)}|" for sentence in splits[0])
    return res.split("---")


def sub_slc(sublist):
    """  句根据术语 给字幕列表添加 |   """
    sublist2 = sublist[:]
    glossary = []
    with open(r'glossarys\glossary_base.txt', encoding='utf-8') as f:
        glossary.extend(line.split('\t')[0] for line in f)
    glossary = glossary[1:]  # 用于第一行注释

    for i in range(len(sublist2)):
        sub = sublist2[i]
        jug = 0
        pos_list = []
        for sp in glossary:
            t = f' {sub} '.find(f" {sp} ")
            for k in pos_list:
                if k < t < k + 10:
                    t = -1
            if jug == 3 or sp == glossary[-1]:
                sublist2[i] = sub
                break
            elif t + 1:
                pos_list.append(t)
                jug += 1
                sub = f"{sub[:t]}|{sub[t:]}"
    return sublist2


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
    with open(r'glossarys\sub_foward.txt', encoding='utf-8') as f:
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
    with open(r'glossarys\sentence_foward.txt', encoding='utf-8') as f:
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

                _extracted_from_sub_tooshort_61(TIM, i, SUB)
            else:
                TIM[0][i+1] = TIM[0][i]
                SUB[i+1] = f'{subL} {SUB[i + 1]}'

                _extracted_from_sub_tooshort_61(TIM, i, SUB)
                link = 1
    return SUB, TIM


# TODO Rename this here and in `sub_tooshort`
def _extracted_from_sub_tooshort_61(TIM, i, SUB):
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


def sub_toolong(subb, timm, limit):

    glossary = []
    with open(r'glossarys\too_long.txt', encoding='utf-8') as f:
        glossary.extend(line.split('\t')[0] for line in f)
    glossary = glossary[1:]  # 用于第一行注释

    long = int(limit)
    SS = []
    TT = [[], []]
    for i in range(len(subb)):
        subLen = len(subb[i])
        mid = 0
        if subLen > long:
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
    with open(r'glossarys\en_error.txt', encoding='utf-8') as f:
        for line in f:
            glossary.append(line.split('\t')[0])
            glossaryL.append(line.split('\t')[1].split('\n')[0])

    for i, j in itertools.product(range(len(subb)), range(len(glossary))):
        subb[i] = f' {subb[i]} '.replace(
            f' {glossary[j]} ', f' {glossaryL[j]} '
        ).strip()
    return subb


if __name__ == '__main__':
    s1 = ["Hi I'm marcela to also known as credibility three D", ". I'm a freelance three D. Art director,", "I'm born and living in Barcelona and I love to", 'work with light texas and animation and things like this', '. Yeah. Mhm. Three yeah. No you', "know what? No. Mhm. I've started to", 'dive into the design world through graphic design using mainly', 'illustrator and Photoshop. Soon I realized that these were', 'awesome tools but I was depending a bit too much', 'an external images to create photo compositions and with illustrator', "I couldn't create photo realistic images. At that time", 'I discovered three D. And it was the solution', 'to all these problems. I started to learn about', 'it through tutorials and courses on the internet and working', 'on personal projects by myself From there. The first', 'time projects came shortly after that and thanks to three', 'D. I had the opportunity to work with amazing', 'studios and international brands, enjoying every step of the', 'process on this course. I would like to share', "with you some of the techniques and learnings that I've", 'been collecting along this design journey. Yeah. Hi', "I'm Gemma master freelance motion designer from America but currently", 'based in Barcelona and I do things like this.', 'Hey. Okay. Yeah. Mhm. Yeah.', 'Yeah. Okay. Yeah. Okay. Mhm.', 'I studied advertising but I was always attracted to cinema', 'and audiovisual in general. I discovered motion design while', 'working on an advertising agency and I realized soon that', 'that was way more interesting than anything I did by', 'then. So I opened after ethics and from there',
          'I explore it for months to understand it juggling with', 'it to create some simple animations. After college I', 'developed my animation skills in my time in an animation', 'studio. And after more than two years there I', "finally became a freelance motion designer from them. I've", 'been lucky to work with different animation studios, advertising', 'agencies and brands that allowed me to gain tons of', 'experience tips and advice that I would like to share', 'with you. In this course we met each other', "in our time in college and from there we've had", "parallel careers in motion design industry. We've been talking", "about creating something together for years but we didn't find", 'the right moment to doing. It was really when', 'the lockdown started in spain that we felt that it', 'was a perfect moment to finally do something together.', 'We decided to combine the pure motion design language with', "the three D. World. And that's how we", 'ended up doing this project called Between Two and three', '. We wanted to explore new techniques, mixing styles', 'and trying new work clothes. And this was the', 'result of this experiment boy. What? Wait what', '? What? Mm hmm. What? Mm hmm', '. In this course we will go through all the', 'process involved in the creation of this project, dividing', 'it in different sections such as style frames selecting vectorized', 'principles of animation to the animation with after ethics set', 'up an export for cinema four D. Three D', '. Modeling and animation through the lighting and shading,', 'rendering, compositing sound design and final conclusion. So']
    t1 = [[0.04, 4.269, 6.059, 8.47, 13.64, 39.369, 48.119, 51.609, 55.28, 57.899, 60.869, 64.25, 67.81, 70.48, 72.23, 75.549, 79.93, 82.549, 86.2, 89.37, 90.87, 96.4, 100.189, 105.439, 135.039, 167.039, 171.46, 173.96, 178.36, 180.46, 184.58, 187.77, 190.25900000000001, 194.65, 196.379, 201.22899999999998, 203.99, 208.53, 210.789, 216.939, 218.349, 222.82999999999998, 226.039, 227.27, 231.28, 233.539, 237.889, 239.71, 242.24, 245.09, 248.629, 260.939, 284.639, 286.86, 288.81, 294.519, 298.379, 300.689, 302.79], [4.259, 6.059,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       8.47, 13.06, 39.369, 48.119, 51.6, 55.27, 57.899, 60.869, 64.239, 67.81, 70.48, 72.23, 75.549, 79.93, 82.549, 86.189, 89.37, 90.85900000000001, 96.39, 100.189, 104.35900000000001, 119.14, 159.55, 171.46, 173.96, 178.349, 180.449, 184.569, 187.77, 190.25900000000001, 194.65, 196.379, 201.22899999999998, 203.99, 208.53, 210.789, 216.939, 218.34, 222.82999999999998, 226.039, 227.27, 231.28, 233.15, 237.889, 239.71, 241.759, 245.09, 248.629, 256.56, 283.15999999999997, 286.86, 288.81, 294.509, 298.379, 300.689, 302.779, 309.48]]
    s_temp = get_sbd(s1)
    for i in range(len(s1)):
        print(s1[i] + "\n" + s_temp[i])
        print()
    s_temp = sub_slc(s_temp)
    # print(s_temp)

    s1, t1 = split_time(s1, s_temp, t1)

    print(s1, t1)
