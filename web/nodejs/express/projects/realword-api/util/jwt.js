const { sign, verify, decode } = require("jsonwebtoken");
const { promisify } = require("util");

exports.sign = promisify(sign);
exports.verify = promisify(verify);
exports.decode = promisify(decode);
