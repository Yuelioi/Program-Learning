import re


def replace_filter(matched):
    """正则处理"""
    input_content = matched.group("group")
    print(input_content)
    return "\n" + input_content


CONTENT = '''![](https://mir.yuelili.com/wp-content/uploads/2021/07/cada62ab21ba4f63082af50884e87594.png)![](https://mir.yuelili.com/wp-content/uploads/2021/07/1abeca39d6a7e7107a7f53457eef7e5f.png)
'''

replacedStr = re.sub(r"(?P<group>.+\)(\!\[].+))", replace_filter, CONTENT)
print(replacedStr)
