from flask import Flask, render_template,request
from gevent import pywsgi

import pymysql

app = Flask(__name__)



def userExist(cursor,username):
    cursor.execute("SELECT * FROM user WHERE username='%s'"% username)
    result = cursor.fetchone()

    # If the result is None, then the user does not exist
    if result is None:
        return False
    return True


def tableExist(cursor):
  cursor.execute("SHOW TABLES LIKE 'user'")
  result = cursor.fetchone()
  
  if not result:
    cursor.execute("CREATE TABLE user ( id int auto_increment primary key, username varchar(16) not null,password varchar(16) not null );")

@app.route("/add/user",methods=['GET', 'POST'])
def add_user():
  if request.method =="GET":
    return render_template("add_user.html")

  username = request.form.get("user")
  password = request.form.get("pwd")
  
  conn = pymysql.connect(host="127.0.0.1",port=3306,user="test_yuelili_com",password="nMAa8YnDShhwDjan",db="test_yuelili_com",charset="utf8")
  cursor = conn.cursor()
  
  tableExist(cursor)
  if userExist(cursor,username):
    return "用户已存在"
  
  sql="insert into user(username,password) values(%s, %s)"
  cursor.execute(sql,[username,password])
  conn.commit() # 增删改后 使用commit确认
  
  cursor.close()
  conn.close()
  
  return "添加成功"

@app.route("/show/user",methods=['GET'])
def show_user():

  conn = pymysql.connect(host="127.0.0.1",port=3306,user="test_yuelili_com",password="nMAa8YnDShhwDjan",db="test_yuelili_com",charset="utf8")
  cursor = conn.cursor(pymysql.cursors.DictCursor) # 使结果返回字典 默认返回元组

  sql="select * from user"
  cursor.execute(sql)
  data_list = cursor.fetchall()
  
  cursor.close()
  conn.close()
  
  return render_template("show_user.html",data_list=data_list)



if __name__ == "__main__":
  server = pywsgi.WSGIServer(('0.0.0.0', 5888), app)
  server.serve_forever()
  app.run()

