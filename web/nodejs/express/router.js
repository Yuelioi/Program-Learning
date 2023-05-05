const express = require("express");

// 1. 路由实例
// 相当于mini Express 实例
const router = express.Router();

// 2.配置
router.get("/about", (req, res) => {
    res.send("about");
});

// 3.导出
module.exports = router;

// 4.其他文件使用
// const router = require('router')
// app.use(router)  // 正常使用
// app.use("/user",router) // 此时变成了 /user/about生效, 相当于访问前缀
