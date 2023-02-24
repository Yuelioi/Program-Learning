# pip install bcrypt
import bcrypt

# 创建密码哈希
password = "my_password".encode()  # b"my_password"

# 生成salt值 生成之后 单独存一下
salt = bcrypt.gensalt()  # b'$2b$12$T5Bu4D0OTRJm64CWZMmMbO'

# 密码哈希化
hashed_password = bcrypt.hashpw(password, salt)

# 验证密码哈希
password_to_check = b"my_password"
if bcrypt.checkpw(password_to_check, hashed_password):
    print("密码匹配")
else:
    print("密码不匹配")

print(salt)
