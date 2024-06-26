## 参考链接

* [JSON Web Token 入门教程 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
* [https://jwt.io/](https://jwt.io/)
* [RFC 7519 - JSON Web Token (JWT)](https://datatracker.ietf.org/doc/html/rfc7519)
* [https://www.cnkirito.moe/jwt-learn-3/](https://www.cnkirito.moe/jwt-learn-3/)
* [基于 JWT 的身份认证](https://www.yuque.com/lipengzhou/dev/mzmagk)
* [10分钟学会什么是jwt【余胜军通俗易懂版本】](https://www.bilibili.com/video/av844850252/)
* [Cookie、Session、Token究竟区别在哪？如何进行身份认证，保持用户登录状态？_哔哩哔哩_bilibili](https://www.bilibili.com/video/av635216349/)
* [Handbook](https://github.com/sunilchauhan1/jwtExamples)

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

## JWT 原理

JWT 的原理是，服务器认证以后，生成一个 JSON 对象，发回给用户，就像下面这样。

```
{
  "姓名": "张三",
  "角色": "管理员",
  "到期时间": "2018年7月1日0点0分"
}
```

以后，用户与服务端通信的时候，都要发回这个 JSON 对象。服务器完全只靠这个对象认定用户身份。为了防止用户篡改数据，服务器在生成这个对象的时候，会加上签名（详见后文）。

服务器就不保存任何 session 数据了，也就是说，服务器变成无状态了，从而比较容易实现扩展。

## JWT 的数据结构

实际的 JWT 大概就像下面这样。

![](https://cdn.nlark.com/yuque/0/2020/jpeg/152778/1607482988815-4a61ec8e-77d0-41e2-9d6d-6f16df08c413.jpeg?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_23%2Ctext_5p2O6bmP5ZGoIGxwem1haWxAMTYzLmNvbQ%3D%3D%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

它是一个很长的字符串，中间用点（`.`）分隔成三个部分。注意，JWT 内部是没有换行的，这里只是为了便于展示，将它写成了几行。

JWT 的三个部分依次如下。

* Header（头部）
* Payload（负载）
* Signature（签名）

写成一行，就是下面的样子。

```json
Header.Payload.Signature
```

![](https://cdn.nlark.com/yuque/0/2020/jpeg/152778/1607483027896-f93cef17-7b3c-48a7-991e-599dd40b597f.jpeg?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_23%2Ctext_5p2O6bmP5ZGoIGxwem1haWxAMTYzLmNvbQ%3D%3D%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

### Header

Header 部分是一个 JSON 对象，描述 JWT 的元数据，通常是下面的样子。

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

上面代码中，`alg` 属性表示签名的算法（algorithm），默认是 HMAC SHA256（写成 HS256）；`typ` 属性表示这个令牌（token）的类型（type），JWT 令牌统一写为 `JWT`。

最后，将上面的 JSON 对象使用 Base64URL 算法（详见后文）转成字符串。

### Payload

Payload 部分也是一个 JSON 对象，用来存放实际需要传递的数据。JWT 规定了7个官方字段，供选用。

* iss (issuer)：签发人
* exp (expiration time)：过期时间
* sub (subject)：主题
* aud (audience)：受众
* nbf (Not Before)：生效时间
* iat (Issued At)：签发时间
* jti (JWT ID)：编号

除了官方字段，你还可以在这个部分定义私有字段，下面就是一个例子。

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

注意，JWT 默认是不加密的，任何人都可以读到，所以不要把秘密信息放在这个部分。

这个 JSON 对象也要使用 Base64URL 算法转成字符串。

### Signature

Signature 部分是对前两部分的签名，防止数据篡改。

首先，需要指定一个密钥（secret）。这个密钥只有服务器才知道，不能泄露给用户。然后，使用 Header 里面指定的签名算法（默认是 HMAC SHA256），按照下面的公式产生签名。

```json
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

算出签名以后，把 Header、Payload、Signature 三个部分拼成一个字符串，每个部分之间用"点"（`.`）分隔，就可以返回给用户。

在 JWT 中，消息体是透明的，使用签名可以保证消息不被篡改。但不能实现数据加密功能。

### Base64URL

前面提到，Header 和 Payload 串型化的算法是 Base64URL。这个算法跟 Base64 算法基本类似，但有一些小的不同。

JWT 作为一个令牌（token），有些场合可能会放到 URL（比如 api.example.com/?token=xxx）。Base64 有三个字符 `+`、`/`和 `=`，在 URL 里面有特殊含义，所以要被替换掉：`=`被省略、`+`替换成 `-`，`/`替换成 `_` 。这就是 Base64URL 算法。

## JWT 的使用方式

客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage。

此后，客户端每次与服务器通信，都要带上这个 JWT。你可以把它放在 Cookie 里面自动发送，但是这样不能跨域，所以更好的做法是放在 HTTP 请求的头信息 `Authorization`字段里面。

```json
Authorization: Bearer <token>
```

另一种做法是，跨域的时候，JWT 就放在 POST 请求的数据体里面。

## JWT 的几个特点

（1）JWT 默认是不加密，但也是可以加密的。生成原始 Token 以后，可以用密钥再加密一次。

（2）JWT 不加密的情况下，不能将秘密数据写入 JWT。

（3）JWT 不仅可以用于认证，也可以用于交换信息。有效使用 JWT，可以降低服务器查询数据库的次数。

（4）JWT 的最大缺点是，由于服务器不保存 session 状态，因此无法在使用过程中废止某个 token，或者更改 token 的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑。

（5）JWT 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT 的有效期应该设置得比较短。对于一些比较重要的权限，使用时应该再次对用户进行认证。

（6）为了减少盗用，JWT 不应该使用 HTTP 协议明码传输，要使用 HTTPS 协议传输。

## JWT 的解决方案

* [https://jwt.io/](https://jwt.io/)

## 在 Node.js 中使用 JWT

推荐：[https://github.com/auth0/node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)。
