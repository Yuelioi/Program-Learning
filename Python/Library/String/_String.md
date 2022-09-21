str.capitalize()
首字符大写，其余为小写。

str.casefold()
消除大小写。 可用于忽略大小写的匹配。

str.center(width[, fillchar])
返回长度为 width 的字符串，原字符串在其正中。 使用指定的 fillchar 填充两边的空位（默认使用 ASCII 空格符）。 如果 width 小于等于 len(s) 则返回原字符串的副本。

str.count(sub[, start[, end]])
返回子字符串 sub 在 [start, end] 范围内非重叠出现的次数。 可选参数 start 与 end 会被解读为切片表示法。

str.encode(encoding='utf-8', errors='strict')
返回原字符串编码为字节串对象的版本。 默认编码为 'utf-8'。 

str.endswith(suffix[, start[, end]])
如果字符串以指定的 suffix 结束返回 True，否则返回 False。 

str.expandtabs(tabsize=8)
返回字符串的副本

str.find(sub[, start[, end]])
返回子字符串 sub 在 s[start:end] 切片内被找到的最小索引。未被找到则返回 -1。

str.format(*args, **kwargs)
执行字符串格式化操作。 

str.format_map(mapping)
类似于 str.format(**mapping)，不同之处在于 mapping 会被直接使用而不是复制到一个 dict。 

str.index(sub[, start[, end]])
类似于 find()，但在找不到子字符串时会引发 ValueError。

str.isalnum()
如果字符串中的所有字符都是字母或数字且至少有一个字符，则返回 True ， 否则返回 False 。 如果 c.isalpha() ， c.isdecimal() ， c.isdigit() ，或 c.isnumeric() 之中有一个返回 True ，则字符``c``是字母或数字。

str.isalpha()
如果字符串中的所有字符都是字母，并且至少有一个字符，返回 True ，否则返回 False 。

str.isascii()
如果字符串为空或字符串中的所有字符都是 ASCII ，返回 True ，否则返回 False 

str.isdecimal()
如果字符串中的所有字符都是十进制字符且该字符串至少有一个字符，则返回 True ， 否则返回 False 。

str.isdigit()
如果字符串中的所有字符都是数字，并且至少有一个字符，返回 True ，否则返回 False 。 

str.isidentifier()
如果字符串是有效的标识符，返回 True

str.islower()
如果字符串中至少有一个区分大小写的字符 4 且此类字符均为小写则返回 True ，否则返回 False 。

str.isnumeric()
如果字符串中至少有一个字符且所有字符均为数值字符则返回 True ，否则返回 False 。 

str.isprintable()
如果字符串中所有字符均为可打印字符或字符串为空则返回 True ，否则返回 False 。 

str.isspace()
如果字符串中只有空白字符且至少有一个字符则返回 True ，否则返回 False 。

空白 字符是指在 Unicode 字符数据库 (参见 unicodedata) 中主要类别为 Zs ("Separator, space") 或所属双向类为 WS, B 或 S 的字符。

str.istitle()
如果字符串中至少有一个字符且为标题字符串则返回 True ，例如大写字符之后只能带非大写字符而小写字符必须有大写字符打头。 否则返回 False 。

str.isupper()
如果字符串中至少有一个区分大小写的字符 4 且此类字符均为大写则返回 True ，否则返回 False 。

str.join(iterable)
返回一个由 iterable 中的字符串拼接而成的字符串。 如果 iterable 中存在任何非字符串值包括 bytes 对象则会引发 TypeError。 调用该方法的字符串将作为元素之间的分隔。

str.ljust(width[, fillchar])
返回长度为 width 的字符串，原字符串在其中靠左对齐。 使用指定的 fillchar 填充空位 (默认使用 ASCII 空格符)。 如果 width 小于等于 len(s) 则返回原字符串的副本。

str.lower()
返回原字符串的副本，其所有区分大小写的字符 4 均转换为小写。

str.lstrip([chars])
返回原字符串的副本，移除其中的前导字符。 chars 参数为指定要移除字符的字符串。 如果省略或为 None，则 chars 参数默认移除空白符。 实际上 chars 参数并非指定单个前缀；而是会移除参数值的所有组合:

static str.maketrans(x[, y[, z]])
此静态方法返回一个可供 str.translate() 使用的转换对照表。

str.partition(sep)
在 sep 首次出现的位置拆分字符串，返回一个 3 元组，其中包含分隔符之前的部分、分隔符本身，以及分隔符之后的部分。 如果分隔符未找到，则返回的 3 元组中包含字符本身以及两个空字符串。

str.removeprefix(prefix, /)
如果字符串以 prefix 字符串开头，返回 string[len(prefix):]。 否则，返回原始字符串的副本：

str.removesuffix(suffix, /)
如果字符串以 suffix 字符串结尾，并且 suffix 非空，返回 string[:-len(suffix)]。 否则，返回原始字符串的副本:

str.replace(old, new[, count])
返回字符串的副本，其中出现的所有子字符串 old 都将被替换为 new。 如果给出了可选参数 count，则只替换前 count 次出现。

str.rfind(sub[, start[, end]])
返回子字符串 sub 在字符串内被找到的最大（最右）索引，这样 sub 将包含在 s[start:end] 当中。 可选参数 start 与 end 会被解读为切片表示法。 如果未找到则返回 -1。

str.rindex(sub[, start[, end]])
类似于 rfind()，但在子字符串 sub 未找到时会引发 ValueError。

str.rjust(width[, fillchar])
返回长度为 width 的字符串，原字符串在其中靠右对齐。 使用指定的 fillchar 填充空位 (默认使用 ASCII 空格符)。 如果 width 小于等于 len(s) 则返回原字符串的副本。

str.rpartition(sep)
在 sep 最后一次出现的位置拆分字符串，返回一个 3 元组，其中包含分隔符之前的部分、分隔符本身，以及分隔符之后的部分。 如果分隔符未找到，则返回的 3 元组中包含两个空字符串以及字符串本身。

str.rsplit(sep=None, maxsplit=- 1)
返回一个由字符串内单词组成的列表，使用 sep 作为分隔字符串。 如果给出了 maxsplit，则最多进行 maxsplit 次拆分，从 最右边 开始。 如果 sep 未指定或为 None，任何空白字符串都会被作为分隔符。 除了从右边开始拆分，rsplit() 的其他行为都类似于下文所述的 split()。

str.rstrip([chars])
返回原字符串的副本，移除其中的末尾字符。 chars 参数为指定要移除字符的字符串。 如果省略或为 None，则 chars 参数默认移除空白符。 实际上 chars 参数并非指定单个后缀；而是会移除参数值的所有组合:

str.split(sep=None, maxsplit=- 1)
返回一个由字符串内单词组成的列表，使用 sep 作为分隔字符串。 如果给出了 maxsplit，则最多进行 maxsplit 次拆分（因此，列表最多会有 maxsplit+1 个元素）。 如果 maxsplit 未指定或为 -1，则不限制拆分次数（进行所有可能的拆分）。

str.splitlines(keepends=False)
返回由原字符串中各行组成的列表，在行边界的位置拆分。 结果列表中不包含行边界，除非给出了 keepends 且为真值。

str.startswith(prefix[, start[, end]])
如果字符串以指定的 prefix 开始则返回 True，否则返回 False。 prefix 也可以为由多个供查找的前缀构成的元组。 如果有可选项 start，将从所指定位置开始检查。 如果有可选项 end，将在所指定位置停止比较。

str.strip([chars])
返回原字符串的副本，移除其中的前导和末尾字符。 chars 参数为指定要移除字符的字符串。 如果省略或为 None，则 chars 参数默认移除空白符。 实际上 chars 参数并非指定单个前缀或后缀；而是会移除参数值的所有组合:

str.swapcase()
返回原字符串的副本，其中大写字符转换为小写，反之亦然。 请注意 s.swapcase().swapcase() == s 并不一定为真值。

str.title()
返回原字符串的标题版本，其中每个单词第一个字母为大写，其余字母为小写。

str.translate(table)
返回原字符串的副本，其中每个字符按给定的转换表进行映射。 转换表必须是一个使用 __getitem__() 来实现索引操作的对象，通常为 mapping 或 sequence。 当以 Unicode 码位序号（整数）为索引时，转换表对象可以做以下任何一种操作：返回 Unicode 序号或字符串，将字符映射为一个或多个字符；返回 None，将字符从结果字符串中删除；或引发 LookupError 异常，将字符映射为其自身。

str.upper()
返回原字符串的副本，其中所有区分大小写的字符 4 均转换为大写。 

str.zfill(width)
返回原字符串的副本，在左边填充 ASCII '0' 数码使其长度变为 width。 正负值前缀 ('+'/'-') 的处理方式是在正负符号 之后 填充而非在之前。 如果 width 小于等于 len(s) 则返回原字符串的副本。
