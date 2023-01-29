'''
pip i mysql-connector
https://blog.csdn.net/weixin_43335392/article/details/124701008

'''
import mysql.connector


class SqlHandle:

    @classmethod
    def get_connect(cls):
        # 获取连接
        connection = mysql.connector.connect(
            host='127.0.0.1',
            user='bot',
            passwd='AfiEPyeHrMdE8XBx',
            db='bot',
            charset='utf8',
            autocommit=True  # 开启自动提交后，增删改操作无需手动调用connection.commit()
        )
        return connection

    @classmethod
    def close_connect(cls, cur, cnx):
        cur.close()
        cnx.close()

    @classmethod
    def get_data(cls, query):
        cnx = cls.get_connect()
        cur = cnx.cursor()
        cur.execute(query)
        data = cur.fetchall()
        cls.close_connect(cur, cnx)
        return data[2]


# 执行查询语句，使用占位符,注意参数是元祖形式

# execute(SQL语句，元祖/字典)
# cur.execute("SELECT * FROM `userdata` WHERE username='%s'", (username))

# varchar返回的是bytearray，需要进行调用decode()转为String
# datetime返回datetime.datetime
