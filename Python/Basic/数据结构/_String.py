str = "hello"
str.capitalize() #首字符大写，其余为小写。

str.casefold() # 消除大小写。 可用于忽略大小写的匹配。

print(str.center(10,"_")) # __hello___
"""
# str.count(sub[, start[, end]]) 返回子字符串非重叠出现的次数。 
# str.encode(encoding='utf-8', errors='strict') # 原字符串编码为字节串对象的版本。 默认编码为 'utf-8'。

str.startswith(prefix[, start[, end]])
str.endswith(suffix[, start[, end]])

str.expandtabs(tabsize=8)

# 查
str.find(sub[, start[, end]])
str.rfind(sub[, start[, end]])

str.index(sub[, start[, end]]) # 类似于 find()，但在找不到子字符串时会引发 ValueError。
str.rindex(sub[, start[, end]])

str.format()

str.isalnum() # 都是字母或数字且至少有一个字符
str.isalpha() # 都是字母且至少有一个字符

str.isdigit() # 都是数字，并且至少有一个字符
str.islower() # 至少有一个区分大小写的字符,且为小写
str.isupper() # 至少有一个区分大小写的字符,且均为大写
str.isnumeric() # 至少有一个字符且所有字符均为数值
str.isspace() # 只有空白字符且至少有一个字符

str.join(iterable)
str.ljust(width[, fillchar]) # 原字符串在其中靠左对齐。
str.lower() # 返回原字符串的副本，转换为小写
str.upper()

str.rstrip([chars])
str.strip([chars])
str.lstrip([chars])

str.replace(old, new[, count])
str.split(sep=None, maxsplit=- 1)
str.rsplit(sep=None, maxsplit=- 1)
str.rstrip([chars])

str.swapcase()
str.title()
str.translate(table)
str.zfill(width)
"""

print("42".zfill(5)) # 左边填充 00042
print("42".zfill(5)) # 00042