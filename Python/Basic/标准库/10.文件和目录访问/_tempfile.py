import tempfile

# 用了自动删
# out = tempfile.TemporaryDirectory()


# 需要自己删
# out = tempfile.mkdtemp()
# out = tempfile.mkstemp()

print(tempfile.gettempdir())  # C:\Users\yl\AppData\Local\Temp

# 示例, 读写文件并删除

with tempfile.TemporaryFile() as fp:
    fp.write(b'Hello world!')
    fp.seek(0)
    fp.read()  # b'Hello world!'


# print("\n".join([ele for ele in dir(tempfile) if not ele.startswith("_")]))
