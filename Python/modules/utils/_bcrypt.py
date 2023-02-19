# pip install bcrypt
import bcrypt

# 创建密码哈希
password = "my_password".encode()  # b"my_password"

# 生成salt值
salt = bcrypt.gensalt()

# 密码哈希化
hashed_password = bcrypt.hashpw(password, salt)

# 验证密码哈希
password_to_check = b"my_password"
if bcrypt.checkpw(password_to_check, hashed_password):
    print("密码匹配")
else:
    print("密码不匹配")
