list1 = [1, 2, 3, 4]
list2 = [3, 4, 5, 6]

"""
被定义为假值的常量: None 和 False。
任何数值类型的零: 0, 0.0, 0j, Decimal(0), Fraction(0, 1)
空的序列和多项集: '', (), [], {}, set(), range(0)
"""

# 交集
intersection = [x for x in list1 if x in list2]
print(intersection)