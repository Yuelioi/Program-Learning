# 查看代码的字节码

import dis
d = dis.dis(
    "[0]*3"
)
print(d)
