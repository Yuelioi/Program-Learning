
rewrite 跳转

break 直接跳转

last 根据客户端请求的uri 匹配新的location规则

permanent 永久跳转 | 基本不变的uri 301

redirect 临时跳转 需要变换的uri 302

~: 区分大小写

```json
location ~ /{
  rewrite / test last;
}
```
