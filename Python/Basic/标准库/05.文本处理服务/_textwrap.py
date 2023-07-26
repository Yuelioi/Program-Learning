import textwrap
import itertools
# 占位符 所有连续空格替换为单个空格 并折叠
textwrap.shorten("Hello  world!", width=12)  # 'Hello world!'
textwrap.shorten("Hello  world!", width=11)  # 'Hello [...]'
textwrap.shorten("Hello world", width=10, placeholder="...")  # 'Hello...'

# 自动换行。 返回由输出行组成的列表，行尾不带换行符。
textwrap.wrap("012345678901234567890\n", 4)
# ['0123', '4567', '8901', '2345', '6789', '0']

# 同上, 只不过列表换成了 "\n".join(结果)
textwrap.fill("012345678901234567890\n", 4)


# 移除 text 中每一行的任何相同前缀空白符。
s = '''\
    hello
      world
    '''
print(repr(s))          # prints '    hello\n      world\n    '
print(repr(textwrap.dedent(s)))  # prints 'hello\n  world\n'

# 将 prefix 添加到行的开头。
s = 'hello\n\n \nworld'
textwrap.indent(s, '  ')
