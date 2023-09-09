const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    href : {
        type : String,
        required : true
    }
}, { versionKey: false })

const model = mongoose.model("category", schema)

module.exports = model