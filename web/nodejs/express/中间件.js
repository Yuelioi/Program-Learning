const express = require("express");
const app = express();

// 注意：如果当前的中间件功能没有结束请求-响应周期，则必须调用nxt0将控制权传递给下一个中间件功能。否则，该请求将被挂起。

// 自定义中间件
// next 下一个中间件
// 路由也算一种中间件 只不过不需要next
app.use((req, res, next) => {
    console.log(req.method, req.url, Date.now());

    // 也可以不交执行权, 全部返回一样的内容
    // res.send("服务器正在维护中...")

    // 预处理参数
    req.foo = "bar";
    // 交出执行权
    next();
});

// 函数柯里化
// app.use(json());

// const json = () => {
//     return (req, res, next) => {};
// };

app.listen(4000, () => [console.log("running")]);

app.get("/", (req, res) => {
    res.send("访问成功");
    res.end();
});
