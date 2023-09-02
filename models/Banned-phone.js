const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    phone : {
        type : Number,
        required : true,
        unique : true
    }  
},{ timestamps : true, versionKey : false})

const model = mongoose.model("BannedUser", schema)

module.exports = model