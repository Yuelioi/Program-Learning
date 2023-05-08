const { verify } = require("../util/jwt");
const { jwtSecret } = require("../config/config.default");
const { User } = require("../model/");
module.exports = async (req, res, next) => {
    // 从请求头获取数据
    // 验证
    // 无效 401
    // 有效 挂载 user 到 req
    let token = req.headers["authorization"];

    token = token ? token.split("Bearer ")[1] : null;
    if (!token) {
        return res.status(401).end();
    }

    try {
        const decodedToken = await verify(token, jwtSecret);
        // 挂载 user 信息
        req.user = await User.findById(decodedToken.userId);
        console.log("登录成功");
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).end();
    }
};
