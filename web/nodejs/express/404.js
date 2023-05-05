const express = require("express");
const app = express();

// ...

// 处理404, 放在所有路由之后
app.use((req, res, next) => {
    res.status(404).send("404 Not Found.");
});
