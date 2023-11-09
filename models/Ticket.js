const mongoose = require("mongoose")

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        departmentID: {
            type: mongoose.Types.ObjectId,
            ref: "Department",
            required: true
        },
        departmentSubID: {
            type: mongoose.Types.ObjectId,
            ref: "DepartmentSub",
            required: true
        },
        body: {
            type: String,
            required: true
        },
        priority: {
            type: Number, // 1-2-3
            required: true
        },
        answer: {
            type: Number, // 1-0
            required: true
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        course: {
            type: mongoose.Types.ObjectId,
            ref: "courses"
        }

    },
    { timestamps: true }
)

const model = mongoose.model("Ticket", schema)

module.exports = model