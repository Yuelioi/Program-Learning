import sqlite3

con = sqlite3.connect("./Sql/data.db")
cur = con.cursor()

# 直接全查
cur.execute("Select * from movie")

res = cur.fetchall()
print(res)
