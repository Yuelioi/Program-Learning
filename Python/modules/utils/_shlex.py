"""
shlex 是pytyhon自带的 用于分割字符串 当作命令的模块
文档: https://docs.python.org/zh-cn/3/library/shlex.html
"""

import shlex
text = """哈哈 爱好 爱好
124"""

# 直接用
out = shlex.split(text)
print(out)  # ['哈哈', '爱好', '爱好', '124']


# 也可以手动修改规则, 下面是去掉空格的切割
text = shlex.shlex(text)
text.whitespace = '\t\r\n'
text.whitespace_split = True
print(list(text))
