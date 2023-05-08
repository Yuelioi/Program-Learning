const validate = require("../middleware/validate");
const { body, param } = require("express-validator");
const mongoose = require("mongoose");

// * https://www.realworld.how/docs/specs/backend-specs/endpoints#create-article
exports.createArticle = validate([
    body("article.title").notEmpty().withMessage("文章标题不能为空"),
    body("article.description").notEmpty().withMessage("文章摘要不能为空"),
    body("article.body").notEmpty().withMessage("文章内容不能为空"),
]);

exports.getArticle = validate([
    param("articleId").custom((id) => {
        if (!mongoose.isValidObjectId(id)) {
            // 异步失败
            // return Promise.reject("文章Id类型错误");

            // 同步失败
            throw new Error("文章Id类型错误");
        }
        // 同步成功
        return true;
    }),
]);

exports.getArticles = validate([
    param("articleId").custom((id) => {
        if (!mongoose.isValidObjectId(id)) {
            // 异步失败
            // return Promise.reject("文章Id类型错误");

            // 同步失败
            throw new Error("文章Id类型错误");
        }
        // 同步成功
        return true;
    }),
]);
