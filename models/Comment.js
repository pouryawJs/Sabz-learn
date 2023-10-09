const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        body: {
            type: String,
            required: true,
        },
        course: {
            type: mongoose.Types.ObjectId,
            ref: "courses",
        },
        creator: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        isAccept: {
            type: Number, // 0 = false - 1 = true
            default: 0,
        },
        score: {
            type: Number, // 1 to 5
            default: 5,
        },
        isAnswer: {
            type: Number, // 0 = false - 1 = true
            required: true,
        },
        mainCommentID: {
            type: mongoose.Types.ObjectId,
            ref: "comment"
        }
    },
    { timestamps: true, versionKey: false }
);

const model = mongoose.model("comment", schema);

module.exports = model;
