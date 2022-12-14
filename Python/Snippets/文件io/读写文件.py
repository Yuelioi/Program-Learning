import csv

# 同时读写文件
with open('data.txt', "r+", encoding='utf-8') as file:
    file_content = file.read()
    file.seek(0)
    file.truncate()
    file.write("# Title\n" + file_content)


# 写入csv
csv_header = ['序号', '名称', 'ID']
csv_content = [("序号1", "名称1", "ID"), ("序号2", "名称2", "ID2")]
with open("data.csv", 'w', encoding='gbk') as file_obj:
    # 1:创建writer对象
    writer = csv.writer(file_obj)
    # 2:写表头
    writer.writerow(csv_header)
    # 3:遍历列表，将每一行的数据写入csv
    for p in csv_content:
        writer.writerow(p)

# 读取csv
with open('data.csv', 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)
