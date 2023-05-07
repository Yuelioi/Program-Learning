const express = require("express");
const { validationResult, ValidationChain } = require("express-validator");
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
module.exports = (validations) => {
    return async (req, res, next) => {
        // 并行处理(全部验证跳出)
        await Promise.all(validations.map((validate) => validate.run(req)));

        // 顺序处理(失败就跳出)
        // for (let validation of validations) {
        //     const result = await validation.run(req);
        //     if (result.errors.length) break;
        // }

        const errors = validationResult(req);

        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({ errors: errors.array() });
    };
};
