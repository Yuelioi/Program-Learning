const express = require("express");
const template = require("art-template");
const fs = require("fs");
const path = require("path");
const app = express();

const { promisify } = require("util");

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

// *托管静态资源
// 访问时, 不需要加public了 => ./css/main.css
app.use(express.static(path.join(__dirname, "./public")));

// 访问时, 需要加public了 => ./public/css/main.css
// 可以不是public 比如是static  => ./static/css/main.css (文件还是在public内)
app.use("/public", express.static(path.join(__dirname, "./public")));

// * routes
app.get("/", function (req, res) {
    res.render("index", {
        foo: "bar",
        todos,
    });
});

// 加载静态资源(手动)
// app.get("/publi/css/main.css",(req, res)=>{
//     const data = await promisify(fs.readFile("./publi/css/main.css"))
//     res.send(data)
// })

// 加载页面(手动)
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
