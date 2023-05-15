"""
python xx.py
python -m pdb xx.py

p x = print(x)
w = where 查看调用栈
l = 
    l 当前10行 / 向下翻10行  
    l. 返回当前行
    ll 当前函数全部代码
u/d 上一帧/下一帧
n(next) 运行一行代码
s(step) 步入
retval 查看函数返回值
util [x] 运行,直到行数超过当前行/第x行(跳出循环)
c 继续跑, 跳过当前调试
b x 在第x行设置断点 / 查看所有断点
q 退出调试
clear x 删除第x个断点 / 删除所有断点
"""

def g(data):
    return data * data

def f(x):

    breakpoint()
    lst = []
    for i in range(x):
        val = g(i)
        lst.append(val)

f(2)
    
