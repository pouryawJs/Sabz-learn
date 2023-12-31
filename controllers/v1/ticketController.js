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
    const tickets = await ticketModel.find({user: req.user._id})
        .sort({ _id : -1})
        .populate("departmentID")
        .populate("departmentSubID")
        .populate("user")
        .lean();
    
    return res.json(tickets)
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
    const { body, ticketID} = req.body

    const ticket = await ticketModel.findOne({ _id: ticketID }).lean()

    const answer = await ticketModel.create({
        title: "پاسخ به تیکت شما",
        departmentID: ticket.departmentID,
        departmentSubID: ticket.departmentSubID,
        body,
        priority: ticket.priority,
        user: req.user._id,
        answer: 0,
        parent: ticketID,
        isAnswer: 1
    })

    await ticketModel.findOneAndUpdate({ _id: ticketID}, {
        $set: {answer: 1}
    })

    return res.status(201).json(answer)
}

exports.getAnswer = async (req, res) => {
    const { id } = req.body

    const ticket = await ticketModel.findOne({ _id: id})
    const ticketAnswer = await ticketModel.find({ parent : id})

    return res.json({
        ticket,
        Answer: ticketAnswer ? ticketAnswer : null
})
}