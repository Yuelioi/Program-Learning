# 解包元组
x, y, z = (1, 2, 3)


# 遍历列表并获取索引和值
fruits = ['apple', 'banana', 'cherry']
for index, fruit in enumerate(fruits):
    print(index, fruit)
    
# 迭代多个列表并组合对应位置的元素
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]
for name, age in zip(names, ages):
    print(name, age)