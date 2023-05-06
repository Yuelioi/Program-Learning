const mongoose = require("mongoose");
const { Schema } = mongoose;
const baseModel = require("./base-model");

const articleScheme = new Schema({
    ...baseModel,
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: null,
    },
});

module.exports = articleScheme;
