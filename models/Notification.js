const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    seen: {
        type: Number, // 0 - 1
    }
}, { timestamps: true , versionKey: false })

const model = mongoose.model("Notifications", schema)

module.exports = model