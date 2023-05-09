const validate = require("../middleware/validate");
const { body, param } = require("express-validator");
const mongoose = require("mongoose");
const { Article } = require("../model");

// * https://www.realworld.how/docs/specs/backend-specs/endpoints#create-article
exports.createArticle = validate([
    body("article.title").notEmpty().withMessage("文章标题不能为空"),
    body("article.description").notEmpty().withMessage("文章摘要不能为空"),
    body("article.body").notEmpty().withMessage("文章内容不能为空"),
]);

exports.getArticle = validate([
    validate.isValidObjectId(["params"], "articleId"),

    /*
     * param("articleId").custom((id) => {
     *     if (!mongoose.isValidObjectId(id)) {
     *         // 异步失败
     *         // return Promise.reject("文章Id类型错误");
     *
     *         // 同步失败
     *         throw new Error("文章Id类型错误");
     *     }
     *     // 同步成功
     *     return true;
     * }),
     */
]);

exports.getArticles = validate([validate.isValidObjectId(["params"], "articleId")]);

exports.updateArticle = [
    // 验证参数ID
    validate([validate.isValidObjectId(["params"], "articleId")]),
    // 验证文章是否存在
    async (req, res, next) => {
        const { articleId } = req.params;
        const article = await Article.findById(articleId);
        // 挂载article给作者验证用
        req.article = article;
        if (!article) {
            return res.status(404).end();
        }
        next();
    },
    // 验证是不是作者本身
    async (req, res, next) => {
        // 这里要格式转换下
        console.log(req.article.author.toString(), req.user._id.toString());
        if (req.article.author.toString() !== req.user._id.toString()) {
            return res.status(403).end();
        }
        next();
    },
];
