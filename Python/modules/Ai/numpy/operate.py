import numpy as np

arr1 = np.arange(1, 26)


# tag 切片

# 直接切片
s = slice(2, 8, 2)
arr1[s]
arr1[2:8:2]  # [2 4 6]

arr2 = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
# ... 等价于 : 全部
arr2[..., 1]  # [2 5 8] 取所有的第1列
arr2[1:, 2]  # [6 9]  取第2~列的第2列
arr2[-1, ...]  # [7 8 9]
arr2[1, 1:3]  # [5 6]

arr1 = arr1.reshape(5, 5)
arr1[1:4, 1:4]  # 中间的9个数
arr1[[1, 2, 3], [1]]  # [7 12 17] 中间3列的第1个元素
arr1[[1, 2, 3], [1, 2, 3]]  # [7 13 19] 中间3列的第1,2,3个元素

# 先行后列反正 随便写
rows = np.array([[0, 0], [4, 4]])
columns = np.array([[0, 4], [0, 4]])
arr1[rows, columns]  # [ [1 5] [21 25] ] 选第0行的2个(0/4列) 第4行的2个(0/4列)

# 比较取值
arr1[arr1 > 15]  # 返回大于15的一维数组


# tag 广播
"""
·让所有输入数组都向其中形状最长的数组看齐，形状中不足的部分都通过在前面加1补
齐
·输出数组的形状是输入数组形状的各个维度上的最大值
·如果输入数组的某个维度和输出数组的对应维度的长度相同者其长度为1时，这个数
组能够用来计算，否则出错
·当输入数组的某个维度的长度为1时，
沿着此维度运算时都用此维度上的第一组值
"""
arr3 = np.arange(1, 13).reshape(4, 3)
arr4 = np.arange(1, 4)
arr3 + arr4  # 直接多维各加1维

# tag 修改
# arr3[...] = arr3 * 2

for it in np.nditer(arr3):
    ...

# tag 常用方法

# 转置
arr1.ravel
arr1.transpose

# 拼接
np.concatenate

# 拆分
np.split
