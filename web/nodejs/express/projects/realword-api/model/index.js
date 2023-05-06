const mongoose = require("mongoose");

const { dbUri } = require("../config/config.default");

// 连接 MongoDB 数据库
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // 30 秒
    socketTimeoutMS: 45000, // 45 秒
});

// 组织导出模型类
module.exports = {
    User: mongoose.model("User", require("./user")),
    Article: mongoose.model("Article", require("./article")),
};
