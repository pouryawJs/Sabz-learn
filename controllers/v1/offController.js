const coursesModel = require("./../../models/Course")
const OffModel = require("./../../models/Off")

exports.getAll = async (req, res) => {
    // Codes
}

exports.create = async (req, res) => {
    const { code, course, percent, max} = req.body

    const newOff = await OffModel.create({
        code,
        course,
        percent,
        max,
        uses: 0,
        creator: req.user._id
    })

    return res.status(201).json(newOff)
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