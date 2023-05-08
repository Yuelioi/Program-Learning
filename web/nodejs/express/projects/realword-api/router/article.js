const express = require("express");
const articleControl = require("../controller/article");
const auth = require("../middleware/auth");

const router = express.Router();

// 获取文章列表
router.get("/", articleControl.getArticles);

// 获取关注的作者文章列表
router.get("/feed", articleControl.getFeedArticles);

// 获取文章
router.get("/:slug", articleControl.getArticle);

// 创建文章
router.put("/", articleControl.createArticle);

// 更新文章
router.put("/:slug", articleControl.updateArticle);

// 删除文章
router.delete("/:slug", articleControl.deleteArticle);

// 添加评论
router.post("/:slug/comments", articleControl.createArticleComment);

// 获取评论列表
router.get("/:slug/comments", articleControl.getArticleComments);

// 删除评论
router.delete("/:slug/comments/:id", articleControl.deleteArticleComments);

module.exports = router;
