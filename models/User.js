const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true,
        unique : true
    },
    role : {
        type : String,
        required : true,
        enum : ["ADMIN","USER"],
        default : "USER"
    }
},{ timestamps : true, versionKey : false})

const model = mongoose.model("User", schema)

module.exports = model