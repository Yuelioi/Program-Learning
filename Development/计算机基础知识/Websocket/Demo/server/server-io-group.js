const http = require("http");
const server = http.createServer();

const io = require("socket.io")(server, {
    // 这里改为 server
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("message", (message) => {
        console.log("Received message:", message);
        socket.emit("message", message); // 将消息发送回当前客户端
    });

    socket.emit("message", "Welcome to the server!");
});

server.listen(8080, () => {
    console.log("Server is running on port 8080"); // 这里改为 8080
});
