

# 进制处理 ----------------------


# ascii() 类似repr
ascii("中文")  # '\u4e2d\u6587'

# bin() => `0b + 二进制`
bin(3)  # 0b11

# bytearray(b'hello \xe4\xb8\xad\xe6\x96\x87')
bytearray("hello 中文", encoding='utf-8')

# bytes # 不可变序列
bytes("hello 中文", encoding='utf-8')  # b'hello \xe4\xb8\xad\xe6\x96\x87'
# xx.replace(b"\xe4",b"\xe5") # 与str类似 不过需要bytes类型作为参数


# chr() => unicode字符
chr(73)  # I
chr(16515)  # 䂃

# hex()
hex(255)  # 十六进制 '0xff'
