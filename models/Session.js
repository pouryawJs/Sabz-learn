const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    free : {
        type : Number,
        required : true
    },
    video : {
        type : String,
        required : true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "course"
    }
}, { timestamps: true, versionKey: false })

const model = mongoose.model("session", schema)

module.exports = model