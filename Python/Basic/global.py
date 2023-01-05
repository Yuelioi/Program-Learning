# global 允许在函数内修改全局变量

x = 10  # this is a global variable

def foo():
    print(x)
foo()  # prints 10



def foo2():
    global x
    x = 20

foo2()
print(x)  # prints 20

