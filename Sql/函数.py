import sqlite3


con = sqlite3.connect("./Sql/data.db")
cur = con.cursor()

# SUBSTRING 截取字符串 => Monty Python's Life
cur.execute(
    """UPDATE movie SET title = SUBSTRING(title, 1, 19)  WHERE title = "Monty Python's Life of Brian"
    """
)

# || 连接字符串 => Monty Python's Life-Monty Python's Life
cur.execute(
    """UPDATE movie SET title = title || "-" || title WHERE title LIKE "%Monty Python's Life%" """
)

# UPPER / LOWER 函数：转换字符串大小写 => MONTY PYTHON'S LIFE-MONTY PYTHON'S LIFE
cur.execute(
    """UPDATE movie SET title = UPPER(title) WHERE title LIKE "%Monty Python's Life%" """
)



# 记得commit
con.commit()
