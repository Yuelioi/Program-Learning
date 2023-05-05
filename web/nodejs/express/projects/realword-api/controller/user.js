// 用户登录
exports.login = async (req, res, next) => {
    try {
        res.send("Post User Login");
    } catch (err) {
        next(err);
    }
};
// 用户注册
exports.register = async (req, res, next) => {
    try {
        res.send("Post User Login");
    } catch (err) {
        next(err);
    }
};
// 获取用户
exports.getCurrentUser = async (req, res, next) => {
    try {
        const a = JSON.parse(1 / 0);
        console.log(a);
        res.send("GET User");
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
