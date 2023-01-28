https://www.bilibili.com/video/av844850252/?p=2
https://www.bilibili.com/video/av635216349/
https://jwt.io/

Session Cookie Token Jwt

Session:

Cookie: Set-Cookie 保存 cookie 后,,每次请求附上该 Cookie(name:x,pass:y) F12-Application-Storage-Cookie

Token:

jwt 是存在客户端(如 storage 里)的一种数据加密方式

优点:

1. 无需再服务器存放用户的数据，减轻服务器端压力
2. 轻量级、json 风格比较简单
3. 跨语言

缺点:

1. 一旦生成后期无法修改:
2. 无法销毁一个 jwt
