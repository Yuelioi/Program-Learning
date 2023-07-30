import bisect

l = [1, 2, 3, 4]

# 先找索引 再插入
index = bisect.bisect_left(l, 5)
l.insert(index, 5)
print(l)  # Output: [1, 2, 3, 4, 5]

# 直接插入
bisect.insort_left(l, 6)
print(l)  # Output: [1, 2, 3, 4, 5,6]


# 示例 查找分数等级

def grade(score, breakpoints=[60, 70, 80, 90], grades='FDCBA'):
    i = bisect.bisect(breakpoints, score)
    return grades[i]


g = [33, 99, 77, 70, 89, 90, 100]
[grade(score) for score in g]  # ['F', 'A', 'C', 'C', 'B', 'A', 'A']
