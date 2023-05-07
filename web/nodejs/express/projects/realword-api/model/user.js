const mongoose = require("mongoose");
const baseModel = require("./base-model");
const { Schema } = mongoose;
const md5 = require("../util/md5");

const userScheme = new Schema({
    ...baseModel,
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        // 赋值时 直接转为md5
        set: (value) => md5(value),
        // 查询后 不显示密码
        select: false,
    },
    bio: {
        type: String,
        default: null,
    },
});

module.exports = userScheme;
