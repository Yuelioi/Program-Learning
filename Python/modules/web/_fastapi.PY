r'''
https://fastapi.tiangolo.com/zh/
pip install fastapi

cd .\Python\modules\web
uvicorn _fastapi:app --reload

http://127.0.0.1:8000/items/5?q=somequery
'''

from _jwt import AuthHandler
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI
app = FastAPI()


@app.get("/")
def read_root() -> dict[str, str]:
    return {"Hello": "World"}


@app.get("/api/auth")
def _(username: str, password: str):
    is_admin = AuthHandler.verify_password(username, password)

    if is_admin:
        expire_seconds = 3600
        data = dict(name="mooor", exp=datetime.utcnow() +
                    timedelta(seconds=expire_seconds))
        token = AuthHandler.generate_token(data)
        return {"status": 200, "username": username, "token": token}
    else:
        return {"status": 401, "username": username}


# 2、声明一个 源 列表；重点：要包含跨域的客户端 源
origins = ["*"]

# 3、配置 CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 允许访问的源
    allow_credentials=True,  # 支持 cookie
    allow_methods=["*"],  # 允许使用的请求方法
    allow_headers=["*"]  # 允许携带的 Headers
)

if __name__ == '__main__':
    # uvicorn.run(app="_fastapi:app", reload=True, host="127.0.0.1", port=8081)
    expire_seconds = 3600

    is_admin = AuthHandler.verify_password("yueli", '1231')
    print(is_admin)

    TEST_DATA = dict(name="mooor", exp=datetime.utcnow() +
                     timedelta(seconds=expire_seconds))
    token = AuthHandler.generate_token(TEST_DATA)
    print(token)

    payload = AuthHandler.parse_token(token)
    print(payload)
