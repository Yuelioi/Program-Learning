# pip install authlib


import json
from authlib.jose import jwt


def generate_token(data, secret_key):
    """生成用于邮箱验证的JWT（json web token）"""
    # 签名算法
    header = {'alg': 'HS256'}
    # 用于签名的密钥
    key = secret_key
    # 待签名的数据负载
    return jwt.encode(header=header, payload=data, key=key)

expiration = 3600
payload = {'user_id': 1,"exp":expiration}
secret_key = 'my-secret-key'

token = generate_token(payload, secret_key)
print(token)


# 解密并验证过期时间
data = jwt.decode(token, secret_key)
data.validate_exp
print(json.loads(str(data)))  # 输出 {'user_id': 1}
