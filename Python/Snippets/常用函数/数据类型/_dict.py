dir(dict)


scores = {'数学': 95, '语文': 89, '英语': 90}

# 查
list(scores.keys())    # ['数学', '语文', '英语']
list(scores.values())  # [95, 89, 90]
list(scores.items())   # [('数学', 95), ('语文', 89), ('英语', 90)]
scores.get('化学1',90) # 获取, 第二参数默认是None

for key in scores.keys():
    print(key) # 数学、语文、英语 不用list

# 增/改
scores.copy() # 浅拷贝
scores.update({'地理': 120}) # 相同的覆盖,不同的追加
scores.setdefault('化学',90) # 设置/追加, 第二参数默认是None

d2 = scores.fromkeys(scores.keys(),100) # {'数学': 100, '语文': 100, '英语': 100, '地理': 100, '化学': 100}, 第二参数默认是None
print(d2)

# 删
scores.pop("地理") # 删除一组
scores.clear() # 清空 {}


