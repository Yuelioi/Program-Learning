const express = require("express");
const app = express();

// content-type 为 application/json
app.use(express.json());

// content-type 为 application/x-www-form-urlencoded
app.use(express.urlencoded());

// content-type 为 application/octet-stream
app.use(express.raw());

// content-type 为 application/plain
app.use(express.text());

// 托管静态资源文件
app.use(express.static());
