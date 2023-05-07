const crypto = require("crypto");

// 查看支持的散列算法
// console.log(crypto.getHashes());

module.exports = (str) => {
    const salt = "test";
    return crypto
        .createHash("md5")
        .update(salt + str)
        .digest("hex");
};
