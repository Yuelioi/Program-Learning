# 海象运算符, 在表达式中为变量赋值，并且返回赋值后的值

# 优先级比大多数比较运算符低

# 普通写法
import random
user_input = input("请输入一个字符串：")
if len(user_input) > 0:
    print(f"你输入的字符串是：{user_input}")

# 使用海象运算符的写法
if (user_input := input("请输入一个字符串：")):
    print(f"你输入的字符串是：{user_input}")


# 普通写法
number = random.randint(1, 10)
while number != 7:
    print(number)
    number = random.randint(1, 10)
print("找到了7！")

# 使用海象运算符的写法
while (number := random.randint(1, 10)) != 7:
    print(number)
print("找到了7！")
