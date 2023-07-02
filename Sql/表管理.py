import sqlite3


con = sqlite3.connect("./Sql/data.db")
cur = con.cursor()



# 创建
cur.execute(
    "CREATE TABLE IF NOT EXISTS movie (title TEXT, year INTEGER, score FLOAT)")

# 删除表数据
cur.execute("DELETE FROM movie")
con.commit()
# 删除表
# cur.execute("DROP TABLE IF EXISTS movie")
# con.commit()

# 插入
cur.execute("""
    INSERT INTO movie (title, year, score) VALUES 
        ('Monty Python and the Holy Grail', 1975, 8.2),
        ('And Now for Something Completely Different', 1971, 7.5)
""")


# 批量插入
data = [
    ("Monty Python Live at the Hollywood Bowl", 1982, 7.9),
    ("Monty Python's The Meaning of Life", 1983, 7.5),
    ("Monty Python's Life of Brian", 1979, 8.0),
]

cur.executemany("INSERT INTO movie VALUES(?, ?, ?)", data)



# 记得commit
con.commit()




