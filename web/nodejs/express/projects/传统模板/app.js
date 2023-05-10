const express = require("express");
const template = require("art-template");
const fs = require("fs");
const path = require("path");
const app = express();

// 渲染.art结尾的资源, 使用art-template渲染
app.engine("art", require("express-art-template"));

// art-template art模板引擎配置
// * 官网给的是view 其实是view options
app.set("view options", {
    debug: process.env.NODE_ENV !== "production",
});

// art模板文件存储目录
app.set("views", path.join(__dirname, "views"));

// 渲染可以省略的后缀
app.set("view engine", "art");

const todos = [
    { id: 1, title: "吃饭1" },
    { id: 2, title: "吃饭2" },
    { id: 3, title: "吃饭3" },
    { id: 4, title: "吃饭4" },
];

// routes
app.get("/", function (req, res) {
    res.render("index", {
        foo: "bar",
        todos,
    });
});

// app.get("/", (req, res) => {
//     fs.readFile("./views/index.html", "utf8", (err, templateStr) => {
//         if (err) {
//             return res.status(400).send("404");
//         }

//         const ret = template.render(templateStr, {
//             foo: "bar",
//             todos,
//         });

//         res.end(ret);
//     });
// });

app.listen(13000, () => {
    console.log("run");
});
