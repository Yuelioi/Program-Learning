import json


# 将 Python 对象转换为 JSON 字符串
data = {'name': 'John', 'age': 30}
json_str = json.dumps(data)
print(json_str)

# 将 JSON 字符串转换为 Python 对象
data = json.loads(json_str)
print(data)

# # 将 Python 对象写入 JSON 文件
# with open('data.json', 'w') as f:
#     json.dump(data, f)

# # 从 JSON 文件中读取 Python 对象
# with open('data.json', 'r') as f:
#     data = json.load(f)
