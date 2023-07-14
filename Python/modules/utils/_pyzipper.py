import pyzipper

def extract_encrypted_zip(zip_file, password):
    try:
        with pyzipper.AESZipFile(zip_file) as zf:
            zf.pwd = password.encode()  # 设置密码
            # zf.extractall()
        return password  # 返回解压成功的密码
    except Exception as e:
        return None  # 解压失败时返回 None

def brute_force_decrypt(zip_file):
    for password in range(0, 999999, 1):
        password_str = str(password).zfill(4)  # 将密码转换为8位数字符串形式
        result = extract_encrypted_zip(zip_file, password_str)
        if result:
            return result  # 返回解压成功的密码
        yield password_str  # 生成密码继续尝试

zip_file = r"E:\Scripting\Program-Learning\test\test.zip"

for password in brute_force_decrypt(zip_file):
    print("尝试密码:", password)

print("密码破解成功！")
