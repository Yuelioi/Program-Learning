const express = require("express");
const articleControl = require("../controller/article");
const articleValidator = require("../validator/article");
const auth = require("../middleware/auth");

const router = express.Router();

// 获取文章列表
router.get("/", articleControl.getArticles);

// 获取关注的作者文章列表
router.get("/feed", articleControl.getFeedArticles);

// 获取文章
router.get("/:articleId", articleValidator.getArticle, articleControl.getArticle);

// 创建文章
router.post("/", auth, articleValidator.createArticle, articleControl.createArticle);

// 更新文章
router.put("/:articleId", auth, articleControl.updateArticle);

// 删除文章
router.delete("/:articleId", auth, articleControl.deleteArticle);

// 添加评论
router.post("/:articleId/comments", articleControl.createArticleComment);

// 获取评论列表
router.get("/:articleId/comments", articleControl.getArticleComments);

// 删除评论
router.delete("/:articleId/comments/:id", articleControl.deleteArticleComments);

module.exports = router;
