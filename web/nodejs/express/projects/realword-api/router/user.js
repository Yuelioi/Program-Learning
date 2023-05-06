const express = require("express");
const router = express.Router();
const userValidator = require("../validator/user");

const userController = require("../controller/user");

// 登录
router.post("/login", userController.login);

// 注册
router.post(
    "/",
    // 配置验证规则
    userValidator.register,
    userController.register
);

// 获取用户
router.get("/", userController.getCurrentUser);

// 更新用户
router.put("/", userController.updateCurrentUser);

module.exports = router;
