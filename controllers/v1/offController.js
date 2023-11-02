const coursesModel = require("./../../models/Course")

exports.getAll = async (req, res) => {
    // Codes
}

exports.create = async (req, res) => {
    // Codes
}

exports.setOnAll = async (req, res) => {
    const { discount } = req.body

    const coursesDiscounts = await coursesModel.updateMany({ discount })

    return res.json({ message: "discount set seccessfully"})
}

exports.getOne = async (req, res) => {
    // Codes
}

exports.remove = async (req, res) => {
    // Codes
}