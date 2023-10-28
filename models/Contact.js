const mongoose = require("mongoose")


const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  answer: {
    type: Number,
    enum: [0,1],
    required: true
  },
  body: {
    type: String,
    required: true
  }  
}, { timestamps: true, versionKey: false })

const model = mongoose.model("contact", schema)

module.exports = model