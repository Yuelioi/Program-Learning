# 去重
l1 = ['b', 'c', 'd', 'b', 'c', 'a', 'a']
l2 = list(set(l1))


l1 = ['b', 'c', 'd', 'b', 'c', 'a', 'a']
l2 = {}.fromkeys(l1).keys()

# 去重 并且不改变顺序
l2 = sorted(set(l1), key=l1.index)

print(l2)
