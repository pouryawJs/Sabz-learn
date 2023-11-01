const newsletterModel = require("./../../models/Newsletter")
const newsletterValidator = require("./../../validators/newsletterValidator")

exports.getAll = async (req, res) => {
    const newsletters = await newsletterModel.find({}).lean()
    return res.json(newsletters)
}

exports.create = async (req, res) => {
    const { email } = req.body

    const validation = newsletterValidator(req.body)
    
    if(validation !== true){
        return res.status(409).json(validation)
    }

    // create
    const newsEmail = await newsletterModel.create({ email })

    return res.status(201).json(newsEmail)
}