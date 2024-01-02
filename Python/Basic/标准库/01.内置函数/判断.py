callable(object)
any((True,))  # 传生成器比列表快
all((True,))


list1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
list2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


def gt(num):
    return num > 5


def change2(num1, num2):
    return num1 + num2


def change(num):
    return num * 2


filtered_list = list(filter(gt, list1))
mapped_list = list(map(change2, list1, list2))

print(filtered_list)
print(mapped_list)
