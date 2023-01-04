# 列表转字符串
numbers = [1, 2, 3]
','.join(map(str, numbers))

# 列表转字典
d0 = ['tom', 'jerry']
dict(enumerate(d0))  # {0: 'tom', 1: 'jerry'}

# 列表映射(将字符串转整数)
l = list(map(int, ['1', '2', '3']))


# 转置
original = [['a', 1], ['b', 2], ['c', 3]]
list(zip(*original))  # [('a', 'b', 'c'), (1, 2, 3)]