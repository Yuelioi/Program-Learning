const validate = require("../middleware/validate");
const { body } = require("express-validator");
const { User } = require("../model");
const md5 = require("../util/md5");

// * https://www.realworld.how/docs/specs/backend-specs/endpoints#registration

// * NOTE
// * 没有加async 会导致验证失败
// * custom 中的函数需要返回一个 Promise 对象，而 async 函数会自动返回一个 Promise，
// * 所以在没有使用 async 的情况下需要手动返回一个 Promise 对象，可以返回 Promise.resolve() 或 Promise.reject() 来表示验证的结果，
// * 或者返回一个其他 Promise 对象来进行一些其他的操作。
// * 而对于已经使用了 async 的函数，就不需要显式地返回 Promise 了，因为 async 函数已经自动将返回值封装成了 Promise 对象。

exports.register = validate([
    body("user.username")
        .notEmpty()
        .withMessage("用户名不能为空")
        .bail()
        .custom(async (username) => {
            const user = await User.findOne({ username });
            if (user) {
                return Promise.reject("用户名已存在");
            }
        })
        .trim()
        .escape(),
    body("user.password").notEmpty().withMessage("密码不能为空"),
    body("user.email")
        .notEmpty()
        .withMessage("邮箱不能为空")
        .isEmail()
        .withMessage("邮箱格式错误")
        .bail()
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                return Promise.reject("邮箱已存在");
            }
        }),
]);

exports.login = [
    // 先校验是否为空
    validate([
        body("user.email").notEmpty().withMessage("邮箱不能为空").isEmail().withMessage("邮箱格式错误"),
        body("user.password").notEmpty().withMessage("密码不能为空"),
    ]),
    validate([
        body("user.email").custom(async (email, { req }) => {
            // 需要 select 一下, 因为在 model 里, password 设置的禁止select ( 其他信息可以传数组获取) +代表追加, -代表去掉
            const user = await User.findOne({ email }).select("+password -email");
            if (!user) {
                return Promise.reject("用户不存在");
            }
            // 将数据挂载到req上, 后续的中间件可以直接使用
            req.user = user;
        }),
    ]),
    validate([
        body("user.password").custom(async (password, { req }) => {
            if (md5(password) !== req.user.password) {
                return Promise.reject("密码错误");
            }
        }),
    ]),
];
