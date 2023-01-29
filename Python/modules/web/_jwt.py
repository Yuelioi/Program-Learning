# pip install pyjwt
from datetime import datetime, timedelta
import jwt


class AuthHandler():

    _salt = "@^4_00wedv**pi)+(!w1rwi=d3q4l=ie=g-u$s8jevmj*zgg2"
    _expire_message = dict(code=401, msg="token 已经失效")
    _unknown_error_message = dict(code=401, msg="token 解析失败")
    user_data = {
        "yueli": '123'
    }

    @classmethod
    def verify_password(cls, username: str, password: str) -> bool:
        if cls.user_data.get(username) == password:
            return True
        else:
            return False

    # 生成token
    @classmethod
    def generate_token(cls, payload: dict) -> str:
        headers = dict(typ="jwt", alg="HS256")
        result = jwt.encode(payload=payload, key=cls._salt, algorithm="HS256",
                            headers=headers)
        return result

    # 解析token
    @classmethod
    def parse_token(cls, token: str) -> tuple:
        verify_status = False
        try:
            payload_data = jwt.decode(token, cls._salt, algorithms=['HS256'])
            verify_status = True
        except jwt.ExpiredSignatureError:
            payload_data = cls._expire_message
        except Exception as _err:
            print(_err)
            payload_data = cls._unknown_error_message
        return verify_status, payload_data


if __name__ == '__main__':

    expire_seconds = 3600

    is_admin = AuthHandler.verify_password("yueli", '1231')
    print(is_admin)

    TEST_DATA = dict(name="mooor", exp=datetime.utcnow() +
                     timedelta(seconds=expire_seconds))
    token = AuthHandler.generate_token(TEST_DATA)
    token = r"eyJhbGciOiJIUzI1NiIsInR5cCI6Imp3dCJ9.eyJuYW1lIjoibW9vb3IiLCJleHAiOjE2NzU1NzM0NjB9.maAv1fYPzWVVnVcW6tMdPpZEqfhumI-KVtcaeXXYeKU"
    print(token)

    status, payload = AuthHandler.parse_token(token)
    print(payload)
