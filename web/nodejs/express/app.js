const express = require("express");
const app = express();

// 配置解析表单请求体  raw => application/json
app.use(express.json());

// 配置解析表单请求体 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

let todos = [
    { id: 1, content: "test1" },
    { id: 2, content: "test2" },
];

// 获取 todo 列表
app.get("/todos", (req, res) => {
    let content = todos
        .map((element) => {
            return `<li>${element.id}:${element.content}</li>`;
        })
        .join("");

    content = `<ul>${content}</ul>`;
    res.status(201).send(content);
});

// 获取 todo
app.get("/todos/:id", (req, res) => {
    const element = todos.find((item) => item.id.toString() === req.params.id);

    if (element) {
        return res.status(201).json(element);
    }
    res.status(404).send("没有数据喔");
});

app.patch("/todos/:id", (req, res) => {
    const todo = req.body;
    if (!todo.content) {
        return res.status(422).json({
            error: "the field 'content' is required",
        });
    }

    // 获取要修改的todo
    const ret = todos.find((todo) => todo.id.toString() === req.params.id);

    if (!ret) {
        return res.status(404).json({
            error: "未找到该条数据",
        });
    }

    Object.assign(ret, todo);
    res.end("修改成功");
});

app.delete("/todos/:id", (req, res) => {
    // 获取要修改的todo
    const todoId = todos.findIndex((todo) => todo.id.toString() === req.params.id);

    if (todoId === -1) {
        return res.status(404).json({
            error: "未找到该条数据",
        });
    }

    todos.splice(todoId, 1);
    res.end("修改成功");
});

// 添加 todo
app.post("/todos", (req, res) => {
    const todo = req.body;

    if (!todo.content) {
        return res.status(422).json({
            error: "the field 'content' is required",
        });
    }
    // 获取最大id
    const maxId =
        todos.reduce((prev, current) => {
            return prev.id > current.id ? prev.id : current.id;
        }, 1) + 1;
    todos.push({ id: maxId, content: todo.content });

    res.status(201).send(`已成功添加${maxId}`);
});

app.listen(4000, () => {
    console.log("running");
});
