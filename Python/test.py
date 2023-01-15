import html

str1 = "&amp;&#44;&#91;&#93;"
out = html.unescape(str1)
print(out)  # &,[]
