"""代码高亮"""

from pygments import highlight
from pygments.formatters import HtmlFormatter
from pygments.lexers import get_lexer_by_name
from pygments.styles import get_style_by_name

code = "print('Hello, World!')"

lexer = get_lexer_by_name("python", stripall=True)
formatter = HtmlFormatter(style="colorful", linenos=True)

result = highlight(code, lexer, formatter)
with open("output.html", "w") as f:
    highlight(code, lexer, HtmlFormatter(style="colorful", linenos=True), outfile=f)
style = get_style_by_name("colorful")

# 生成 HTMLFormatter 并获取样式的 CSS 格式
formatter = HtmlFormatter(style=style)
css_code = formatter.get_style_defs()

# 将 CSS 代码写入文件
with open("pygments_style.css", "w") as css_file:
    css_file.write(css_code)
