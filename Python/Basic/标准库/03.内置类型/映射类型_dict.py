dir(dict)


scores = {'数学': 95, '语文': 89, '英语': 90}

# 查
list(scores.keys())    # 键: ['数学', '语文', '英语']
list(scores.values())  # 值: [95, 89, 90]
list(scores.items())   # 键值: [('数学', 95), ('语文', 89), ('英语', 90)]
scores.get('化学1', 90)  # 获取, 第二参数默认是None
scores.setdefault('化学', 90)  # 获取, 第二参数默认是None


# 增/改
scores.copy()  # 浅拷贝
scores.update({'地理': 120})  # 相同的覆盖,不同的追加
scores |= {}
scores | {'地理': 120}  # 合并, 重复取后者

# {'数学': 100, '语文': 100, '英语': 100, '地理': 100, '化学': 100}, 第二参数默认是None
d2 = scores.fromkeys(scores.keys(), 100)


# 删
scores.pop("地理")  # 删除某键
scores.popitem()  # 删除一组
# scores.clear()  # 清空 {}

# 示例 同时使用键与值
for k, v in scores.items():
    print(k, v)

for item in iter(scores):  # = scores.keys()
    print(item)
