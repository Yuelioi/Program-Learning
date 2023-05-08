const { User } = require("../model");
const { jwtSecret, expTime } = require("../config/config.default");
const jwt = require("../util/jwt");

// 用户登录
exports.login = async (req, res, next) => {
    try {
        // 1. 数据验证
        // 2. 生成token
        // # user 是 validate 里传递的
        const user = req.user.toJSON();

        delete user.password;
        const token = await jwt.sign(
            {
                userId: user._id,
            },
            jwtSecret,
            {
                expiresIn: expTime,
            }
        );
        // 3. 发送成功响应

        res.status(200).json({ ...user, token });
    } catch (err) {
        next(err);
    }
};
// 用户注册
exports.register = async (req, res, next) => {
    try {
        // 1. 获取请求数据
        console.log(req.body);

        // 2.数据验证
        // 2.1 基本验证 参数是否通过
        // 2.2 业务验证 不能重复等

        let user = new User(req.body.user);

        // 3. 保存到数据库
        await user.save();

        // 不想在客户端显示密码, 需要先把密码信息删除
        // 不过要先转为Json, 因为创建的user是 mongoose 自己处理后的格式
        user = user.toJSON();
        delete user.password;

        // 4. 发送成功响应
        res.status(201).json({
            user,
        });
    } catch (err) {
        next(err);
    }
};
// 获取用户
exports.getCurrentUser = async (req, res, next) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (err) {
        next(err);
    }
};
// 更新用户
exports.updateCurrentUser = async (req, res, next) => {
    try {
        res.send("Post User Login");
    } catch (err) {
        next(err);
    }
};
