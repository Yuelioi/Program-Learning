
from collections import ChainMap

# 映射管理器?
# https://docs.python.org/zh-cn/3/library/collections.html#chainmap-objects

dict1 = {'a': 1, 'b': 2}
dict2 = {'c': 3, 'd': 4}

combined_dict = ChainMap(dict1, dict2)
combined_dict['a']  # 输出 1
combined_dict.get('e', "default")  # 输出 default
combined_dict.maps  # 输出 [{'a': 1, 'b': 2}, {'c': 3, 'd': 4}]
combined_dict.items()  # 输出 ItemsView(ChainMap({'a': 1, 'b': 2}, {'c': 3, 'd':

# KeysView(ChainMap({'a': 1, 'b': 2}, {'c': 3, 'd': 4}))
out = combined_dict.keys()
combined_dict.values()  # 输出 [{'a': 1, 'b': 2}, {'c': 3, 'd': 4}]
combined_dict.parents  # 输出 [{'a': 1, 'b': 2}, {'c': 3, 'd'
