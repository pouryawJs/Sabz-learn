const categoryModel = require("./../../models/Category")
const categoryValidator = require("./../../validators/categoryValidator")
const { isValidObjectId } = require("mongoose")

exports.create = async (req, res) => {

    const validationResult = categoryValidator(req.body)

    if(validationResult !== true){
        return res.status(401).json(validationResult)
    }

    const { title, href } = req.body
    
    const newCategory = await categoryModel.create({title, href})

    if(newCategory){
        return res.status(201).json({ message: "category created"})
    }

    return res.status(500).json({ message: "something went wrong"})
}

exports.getAll = async (req, res) => {
    const categories = await categoryModel.find({})
    return res.status(200).json(categories)
}

exports.removeOne = async (req, res) => {
    const { id } = req.params

    const isValidId = isValidObjectId(id)
    
    if(!isValidId){
        return res.status(409).json({ message : " Id is not valid"})
    }

    const removedCategory = await categoryModel.findByIdAndDelete(id)

    if(!removedCategory){
        return res.status(404).json({ message : "category not found"})
    }

    return res.json({ message : "category deleted"})
}