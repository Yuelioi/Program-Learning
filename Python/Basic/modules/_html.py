import html

html_string = "&amp;&#44;&#91;&#93;"
normal_string = '<p>Hello, World!</p>'

decoded_string = html.unescape(html_string)
ecode_string = html.escape(normal_string)
print(decoded_string)  # &,[]
print(ecode_string)  # &lt;p&gt;Hello, World!&lt;/p&gt;
