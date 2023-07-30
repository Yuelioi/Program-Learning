import itertools
# https://docs.python.org/zh-cn/3.12/library/itertools.html#itertools.batched


"""
无限循环
count count(10) --> 10 11 12 13 14 ...
cycle cycle('ABCD') --> A B C D A B C D ...
repeat repeat(10, 3) --> 10 10 10

最短输入序列
accumulate([1,2,3,4,5]) --> 累加 1 3 6 10 15
batched('ABCDEFG', n=3) --> 切割 ABC DEF G
chain('ABC', 'DEF') --> 切割2 A B C D E F
chain.from_iterable(['ABC', 'DEF']) --> A B C D E F
compress('ABCDEF', [1,0,1,0,1,1]) --> 条件分离 A C E F
filterfalse(lambda x: x%2, range(10)) --> 条件分离 0 2 4 6 8
groupby 根据key(v)值分组的迭代器
islice('ABCDEFG', 2, None) --> 不如用: C D E F G
pairwise('ABCDEFG') --> 怪! AB BC CD DE EF FG
starmap(pow, [(2,5), (3,2), (10,3)]) --> 32 9 1000
dropwhile(lambda x: x<5, [1,4,6,4,1]) --> 遇假就停(第一个不算)6 4 1
takewhile(lambda x: x<5, [1,4,6,4,1]) --> 遇假就停 1 4
...
"""


# print("\n".join([ele for ele in dir(itertools) if not ele.startswith("_")]))
