const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userValidator = require("../validator/user");
const userController = require("../controller/user");

// 登录
router.post("/users/login", userValidator.login, userController.login);

// 注册
router.post(
    "/users/",
    // 配置验证规则
    userValidator.register,
    // 配置注册逻辑
    userController.register
);

// 获取用户
router.get("/user", auth, userController.getCurrentUser);

// 更新用户
router.put("/user", auth, userController.updateCurrentUser);

module.exports = router;
