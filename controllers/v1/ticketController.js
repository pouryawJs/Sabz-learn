const departmentModel = require("./../../models/Department")
const departmentSubModel = require("./../../models/Department-sub")

exports.getAll = async (req, res) => {
    // codes
}

exports.create = async (req, res) => {
    // codes
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