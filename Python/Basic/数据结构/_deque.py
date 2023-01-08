from collections import deque

# 创建一个空的 deque
d = deque()

# 在 deque 的末尾添加元素
d.append(1)
d.append(2)
d.append(3)
print(d)  # 输出：deque([1, 2, 3])

# 在 deque 的开头添加元素
d.appendleft(0)
print(d)  # 输出：deque([0, 1, 2, 3])

# 在 deque 的末尾删除元素
d.pop()
print(d)  # 输出：deque([0, 1, 2])

# 在 deque 的开头删除元素
d.popleft()
print(d)  # 输出：deque([1, 2])
