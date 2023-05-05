const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

// 登录
router.post("/login", userController.login);

// 注册
router.post("/", userController.register);

// 获取用户
router.get("/", userController.getCurrentUser);

// 更新用户
router.put("/", userController.updateCurrentUser);

module.exports = router;
