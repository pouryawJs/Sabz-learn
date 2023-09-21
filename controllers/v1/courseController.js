const courseModel = require("./../../models/Course")

exports.create = async (req, res) => {
    const {
    name,
    description,
    cover,       
    support,
    href,
    price,
    status,
    discount,
    categoryID,
    creator
    } = req.body
    
    const course = await courseModel.create({
        name,
        description,
        cover: req.file.filename,
        support,
        href,
        price,
        status,
        discount,
        categoryID,
        creator: req.user._id
    })

    const mainCourse = await courseModel.findById(course._id).populate("creator", "-password")
    
    return res.status(201).json(mainCourse)
}