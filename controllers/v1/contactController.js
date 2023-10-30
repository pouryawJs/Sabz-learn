const { isValidObjectId } = require("mongoose")
const contactModel = require("./../../models/Contact")
const contactValidator = require("./../../validators/contactValidator")
const nodemailer = require("nodemailer")

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
    const { id } = req.params

    // validation
    const isValidID = isValidObjectId(id)

    if(!isValidID){
        return res.status(409).json({message: "id is not valid"})
    }

    // find cointact
    const contact = await contactModel.findById(id)

    if(!contact){
        return res.status(404).json({ message: "contact not found"})
    }
    // send mail
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "persianroasthub@gmail.com",
            pass: "wqqpujneedwzefbk"
        }
    })

    const mailOption = {
        from: "persianroasthub@gmail.com",
        to: contact.email,
        subject: "nodemailer test",
        text: req.body.answer
    }

    transporter.sendMail(mailOption, async (error, info) => {
        if(error){
            return res.json({ message: error })
        }else{
            // change answer status
            await contactModel.findByIdAndUpdate(id, { $set: {answer: 1}})
            return res.json({ message: "email sent successfully"})
        }
    })
}