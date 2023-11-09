const CourseUserModel = require("./../../models/course-user")

exports.getAll = async (req, res) => {
    const orders = await CourseUserModel
        .find({ user : req.user._id })
        .populate("course", "name href")
    
    if(!orders){
        return res.status(404).json({ message: "not found"})
    }

    return res.json(orders)
}

exports.getOne = async (req, res) => {
    const order = await CourseUserModel.findOne({ _id: req.params.id })
        .populate("course")

    if(!order){
        return res.status(404).json({ message: "order not found"})
    }

    return res.json(order)
}