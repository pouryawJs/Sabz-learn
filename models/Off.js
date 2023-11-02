const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    percent: {
        type: Number,
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "courses",
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    max: {
        type: Number,
        required: true
    },
    uses: {
        type: Number,
        required: true
    }
}, { timestamps: true , versionKey: false })

const model = mongoose.model("Off", schema)

module.exports = model