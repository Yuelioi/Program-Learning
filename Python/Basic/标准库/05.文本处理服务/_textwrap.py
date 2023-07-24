import textwrap
import itertools
# 占位符
textwrap.shorten("Hello  world!", width=12)  # 'Hello world!'
textwrap.shorten("Hello  world!", width=11)  # 'Hello [...]'
textwrap.shorten("Hello world", width=10, placeholder="...")  # 'Hello...'


out = textwrap.wrap("这个不知道，应该不会,涨吧.这个不知道，应该不会涨吧", width=12)
print(out)


s = ['01234567890123456789',  '123', "4", "555"]


def split_arr(arr, lens):
    return [subele for ele in arr for subele in textwrap.wrap(ele, width=lens)]


def split_arr2(arr, lens):
    return [subele for ele in arr for subele in ([ele[i:i+lens] for i in range(0, len(ele), lens)] if len(ele) >= lens else [ele])]


out = split_arr(s, 5)
print(out)
