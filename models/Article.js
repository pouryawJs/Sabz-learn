const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desciption: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
            required: true,
        },
        href: {
            type: String,
            required: true,
        },
        categoryID: {
            type: mongoose.Types.ObjectId,
            ref: "category",
            required: true,
        },
        creator: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        publish: {
            type: Number, // 0-1
            required: true,
        },
    },
    { timestamps: true, versionKey: false }
);

const model = mongoose.model("Article", schema);

module.exports = model;
