const ticketModel = require("./../../models/Ticket")
const departmentModel = require("./../../models/Department")
const departmentSubModel = require("./../../models/Department-sub")

exports.getAll = async (req, res) => {
    const tickets = await ticketModel
        .find({ answer: 0})
        .populate("departmentID")
        .populate("departmentSubID")
        .populate("user")
        .lean();
        
    return res.json(tickets)
}

exports.create = async (req, res) => {
    const {
        title,
        departmentID,
        departmentSubID,
        body,
        priority,
        course
    } = req.body

    const ticket = await ticketModel.create({
        title,
        departmentID,
        departmentSubID,
        body,
        priority,
        user: req.user._id,
        answer: 0,
        isAnswer: 0
    })

    const mainTicket = await ticketModel
        .findOne({ _id: ticket._id})
        .populate("departmentID")
        .populate("departmentSubID")
        .populate("user")
        .lean();

    return res.status(201).json(mainTicket)
}

exports.userTicketes = async (req, res) => {
    // codes
}

exports.departments = async (req, res) => {
    const departments = await departmentModel.find()
    return res.json(departments)
}

exports.departmentsSub = async (req, res) => {
    const departmentSubs = await departmentSubModel.find({ parent: req.body.parent}).lean()
    return res.json(departmentSubs)
}

exports.setAnswer = async (req, res) => {
    // codes
}

exports.getAnswer = async (req, res) => {
    // codes
}

exports.getAnswer = async (req, res) => {
    // codes
}