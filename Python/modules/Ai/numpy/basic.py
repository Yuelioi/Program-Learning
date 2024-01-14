import numpy as np

# https://numpy.org/doc/stable/reference/arrays.html

# tag 数据类型
# https://numpy.org/doc/stable/reference/arrays.dtypes.html

dt = np.dtype(np.int32)  # 或者直接"i4"
student = np.dtype([("name", np.str_, 5), ("age", "i4")])  # 5= 最大长度5
print(student)

# tag 创建
"""
np.array通常用于创建新数组，np.asarray更倾向于在已经有数组的情况下，共享数据而不是复制数据。
默认元素类型一致, 不一致则会 str>float>int统一

参数
    object  数组或嵌套的数列
    dtype   数组元素的数据类型，可选
    copy    对象是否需要复制，可选
    order   创建数组的样式，C为行方向，F为列方向，A为任意方向〈默认）
    subok   默认返回一个与基类类型一致的数组
    ndmin   指定生成数组的最小维度
"""

arr = np.array([1, 2, 3, 4])
students1 = np.array([("张三三四五六", 19), ("李四", 20)], dtype=student)
students2 = np.asarray(students1)

students2[0]["name"] = "张三"
print(students1)  # 也会更改students1

# tag 常用方法

# 2. 创建全零或全一数组
zeros_arr = np.zeros((3, 3))  # 3x3的全零数组
ones_arr = np.ones((2, 2))  # 2x2的全一数组

# 3. 创建等差数列
range_arr = np.arange(0, 10, 2)  # 从0到10，步长为2的数组

# 4. 创建指定范围内的等间隔样本数
linspace_arr = np.linspace(0, 1, 5)  # 从0到1，生成5个等间隔的样本

# 5. 创建单位矩阵
eye_arr = np.eye(3)  # 3x3的单位矩阵
identity_arr = np.identity(2)  # 2x2的单位矩阵

# 6. 生成随机数
random_arr = np.random.rand(2, 2)  # 2x2的随机数组 [0,1)

# 7. 创建指定形状和填充值的数组
full_arr = np.full((2, 3), 7)  # 2x3的数组，填充值为7, 2行3列


# 8. 创建一个未初始化的数组
empty_arr = np.empty((2, 2))  # 2x2的未初始化数组


# tag 数组属性
"""
NumPy数组的维数称为秩(rank)
一维数组的秩为1 二维数组的秩为2，以此类推
在NumPy中，每一个线性的数组称为是一个轴(axis)也就是维度(dimensions)。
比如说，二维数组相当于是两个一维数组，其中第一个一维数组中每个元素又是一个一维数组。
所以一维数组就是NumPy中的轴(axis)，第一个轴相当于是底层数组，第二个轴是底层数组里的数组。
而轴的数量一一秩，就是数组的维数
很多时候可以声明axisoaxis=O，表示沿着第0轴进行操作，即对每一列进行操作；
axis=l，表示沿着第1轴进行操作，即对每一行进行操作

属性
ndim        秩，即轴的数量或维度的数量
shape       数组的维度，对于矩阵，n行m列
size        数组元素的总个数，相当于.shape中n*m的值
dtype       ndarray对象的元素类型
itemsize    ndarray对象中每个元素的大小，以字节为单位
flags       ndarray对象的内存信息
real         ndarray元素的实部
imag        ndarray元素的虚部
data        包含实际数组元素的缓冲区，由于一般通过数组的索引获取元素，所以通常不需要使用这个属性



"""
