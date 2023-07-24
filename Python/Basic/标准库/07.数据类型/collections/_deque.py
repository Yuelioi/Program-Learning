from collections import deque


class CircularQueue:
    def __init__(self, capacity):
        self.capacity = capacity
        self.queue = deque(maxlen=capacity)

    def is_full(self):
        return len(self.queue) == self.capacity

    def is_empty(self):
        return not bool(self.queue)

    def enqueue(self, item):
        if self.is_full():
            print("Queue is full")
        else:
            self.queue.append(item)

    def dequeue(self):
        if self.is_empty():
            print("Queue is empty")
        else:
            return self.queue.popleft()

    def __str__(self):
        return str(list(self.queue))


# 创建一个容量为 5 的循环队列
cq = CircularQueue(5)

# 向队列中添加元素
cq.enqueue(1)
cq.enqueue(2)
cq.enqueue(3)
cq.enqueue(4)
cq.enqueue(5)
cq.enqueue(6)

# 队列已满，再次添加元素会提示队列已满
cq.enqueue(6)  # 输出 "Queue is full"

# 输出队列的元素
print(cq)  # 输出 [1, 2, 3, 4, 5]

# 从队列中取出元素
print(cq.dequeue())  # 输出 1
print(cq.dequeue())  # 输出 2

# 输出队列的元素
print(cq)  # 输出 [3, 4, 5]

# 向队列中添加元素
cq.enqueue(6)
cq.enqueue(7)

# 输出队列的元素
print(cq)  # 输出 [3, 4, 5, 6, 7]
