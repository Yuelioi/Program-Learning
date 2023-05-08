const mongoose = require("mongoose");
const { Schema } = mongoose;
const baseModel = require("./base-model");

const articleScheme = new Schema({
    ...baseModel,
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    tagList: {
        type: [String],
        default: null,
    },
    favoriteCount: {
        type: Number,
        default: 0,
    },
    author: {
        // https://mongoosejs.com/docs/populate.html
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = articleScheme;
