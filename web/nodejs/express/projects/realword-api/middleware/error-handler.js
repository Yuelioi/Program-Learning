const util = require("util");

module.exports = () => {
    return (err, req, res, next) => {
        res.status(500).json({
            // 使用util 获取对象字符串
            error: util.format(err),
        });
    };
};
