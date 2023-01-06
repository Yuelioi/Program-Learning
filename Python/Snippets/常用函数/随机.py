import string
import random

# 随机1~10 [1,2,...10]
x = random.randint(1, 10)
print(x)


# 打乱数组
numbers = [1, 2, 3, 4, 5]
random.shuffle(numbers)

# 随机8位字符串
def generate_random_string():
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for i in range(8))


print(generate_random_string())  # SefnlH3X
