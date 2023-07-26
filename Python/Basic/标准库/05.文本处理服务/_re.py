import re


re.findall(r'(\w+)=(\d+)', 'set width=20 and height=10')
# 查全部 没有为[], [('width', '20'), ('height', '10')]


def dashreplace(matchobj):
    """普通替换"""
    if matchobj.group(0) == '-':
        return ' '
    else:
        return ''


re.sub('-{1,4}', dashreplace, 'pro----gram-files')
# program files


def dashreplace2(matchobj):
    """分组替换"""
    # print(matchobj.groupdict()) # {'first_name': 'Malcolm', 'last_name': 'Reynolds'}
    first_name = matchobj.group('first_name')
    last_name = matchobj.group('last_name')
    return f"{first_name}-{last_name}"


re.sub(r'(?P<first_name>\w+) (?P<last_name>\w+)',
       dashreplace2, "Malcolm Reynolds")


# 检查字符串中任何位置的匹配,查第一个 没有为None,
res = re.search(r"\w+", "abc def gh abc")
# <re.Match object; span=(0, 3), match='abc'>

# 检查字符串开头是否匹配
m = re.match(r"(\d+)\.(\d+)", "24.1632")
# m.groups() => ('24', '1632')

m = re.match(r"(?P<first_name>\w+) (?P<last_name>\w+)", "Malcolm Reynolds")
# m.groupdict() # {'first_name': 'Malcolm', 'last_name': 'Reynolds'}

# fullmatch: 完全匹配
