// 错误处理中间件
const express = require("express");
const app = express();

// 需要传err
app.get("/", (req, res, next) => {
    try {
        // ...
    } catch (err) {
        // next()  直接用next 只会玩完过后匹配下一个中间件
        next(err); // 传参后, 则跳讨所有剩余的无错课外理路由和中间件函数
    }
});

// 在所有的中间件之后 挂载错误处理中间件
app.use((err, req, res, next) => {
    res.status(500).json({
        error: err.message,
    });
});
