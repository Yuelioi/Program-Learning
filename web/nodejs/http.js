// https://nodejs.org/dist/latest-v19.x/docs/api/http.html

// 类似:下载web服务器软件(Apache)
const http = require("http");

// 类似安装该软件
const server = http.createServer((request, response) => {
    // 每一个请求都会触发这个函数
    // http://localhost:8080/index
    // http://localhost:8080/user
    // ...

    // 路由的操作
    // 获取到客户端请求的地址
    //

    console.log(request.url);
    // 由于是单线程, 不能多个'用户'一起使用
    if (request.url === "/1") {
        while (true) {
            console.log(1);
        }
    }
    // 死掉了
    if (request.url === "/2") {
        while (true) {
            console.log(2);
        }
    }
    console.log("hello");
    response.end();
});

// 打开该软件
server.listen((port = 8081), (err) => {
    if (err) {
        console.log("err");
    } else {
    }
});
