const { isValidObjectId } = require("mongoose")
const contactModel = require("./../../models/Contact")
const contactValidator = require("./../../validators/contactValidator")

exports.getAll = async (req, res) => {
    const allContacts = await contactModel.find().lean()

    return res.json(allContacts)
}

exports.create = async (req, res) => {
    const { name, email, phone, body } = req.body

    const isValidData = contactValidator(req.body)

    if(isValidData !== true){
        return res.status(401).json(isValidData)
    }

    const contact = await contactModel.create({
        name,
        email,
        phone,
        body,
        answer: 0
    })

    return res.status(201).json({contact})
}

exports.remove = async (req, res) => {
    const { id } = req.params

    // validation
    const isValidID = isValidObjectId(id)

    if(!isValidID){
        return res.status(409).json({message: "id is not valid"})
    }

    // remove
    const removedContact = await contactModel.findByIdAndRemove(id)

    if(!removedContact){
        return res.status(404).json({message: "contact not found"})
    }

    return res.json(removedContact)
}

exports.answer = async (req, res) => {
    
}