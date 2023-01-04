# 移除重复值
from collections import OrderedDict
items = [1, 1, 2, 2, 3]
list(set(items))  # [1, 2, 3]
list(OrderedDict.fromkeys(items).keys()) # [1, 2, 3]