const categoryModel = require("./../../models/Category")
const categoryValidator = require("./../../validators/categoryValidator")

exports.create = async (req, res) => {

    const validationResult = categoryValidator(req.body)

    if(validationResult !== true){
        return res.status(401).json(validationResult)
    }

    const { title, href } = req.body
    
    const newCategory = await categoryModel.create({title, href})

    if(newCategory){
        res.status(201).json({ message: "category created"})
    }

    return res.status(500).json({ message: "something went wrong"})
}
exports.getAll = async (req, res) => {
    const categories = await categoryModel.find({})
    return res.status(200).json(categories)
}