const { User } = require("../model");
const { jwtSecret } = require("../config/config.default");
const jwt = require("../util/jwt");

// 获取文章列表
exports.getArticles = async (req, res, next) => {
    try {
        res.send("Post User Login");
    } catch (err) {
        next(err);
    }
};

// 获取关注的作者文章列表
exports.getFeedArticles = async (req, res, next) => {
    console.log(123);
};

// 获取文章
exports.getArticle = async (req, res, next) => {
    console.log(123);
};

// 创建文章
exports.createArticle = async (req, res, next) => {
    console.log(123);
};

// 更新文章
exports.updateArticle = async (req, res, next) => {
    console.log(123);
};

// 删除文章
exports.deleteArticle = async (req, res, next) => {
    console.log(123);
};

// 添加评论
exports.createArticleComment = async (req, res, next) => {
    console.log(123);
};

// 获取评论列表
exports.getArticleComments = async (req, res, next) => {
    console.log(123);
};

// 删除评论
exports.deleteArticleComments = async (req, res, next) => {
    console.log(123);
};
