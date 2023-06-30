import sqlite3

# 连接到数据库（如果不存在则会创建一个新的数据库）
conn = sqlite3.connect('./test/test.db')

# 创建一个游标对象
cursor = conn.cursor()

# 创建一个表
cursor.execute('''
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER
    )
''')

# 插入数据
cursor.execute('INSERT INTO students (name, age) VALUES (?, ?)', ('Alice', 20))
cursor.execute('INSERT INTO students (name, age) VALUES (?, ?)', ('Bob', 21))
cursor.execute('INSERT INTO students (name, age) VALUES (?, ?)', ('Charlie', 19))

# 提交更改（将数据写入数据库）
conn.commit()

# 查询数据
cursor.execute('SELECT * FROM students')
rows = cursor.fetchall()
for row in rows:
    print(row)

# 关闭游标和连接
cursor.close()
conn.close()
