const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "courses",
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const model = mongoose.model("CourseUser", schema)

module.exports = model