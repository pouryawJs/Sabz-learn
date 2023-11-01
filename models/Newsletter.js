const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
}, { timestamps: true , versionKey: false })

const model = mongoose.model("newsletter", schema)

module.exports = model