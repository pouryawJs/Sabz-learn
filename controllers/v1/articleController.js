const articleModel = require("./../../models/Article")
const articleValidator = require("./../../validators/articleValidator")

exports.getAll = async (req, res) => {
    const articles = await articleModel.find({})
        .populate("categoryID")
        .populate("creator", "name")
    return res.json(articles)
}

exports.create = async (req, res) => {
    const { title,
        desciption,
        body,
        href,
        categoryID,
        publish} = req.body
    
    // validation

    const dataValidation = articleValidator({ title,
        desciption,
        body,
        href,
        categoryID,
        publish});

    if(dataValidation !== true){
        return res.status(409).json(dataValidation)
    }
    console.log(req.body)
    // create
    const article = await articleModel.create({ title,
        desciption,
        body,
        cover: req.file.filename,
        href,
        categoryID,
        creator:req.user._id,
        publish})
    
    return res.status(201).json(article)
}

exports.getOne = async (req, res) => {
    const { href } = req.params
    
    const article = await articleModel.findOne({ href })
        .populate("categoryID")
        .populate("creator", "name")
    
    if(!article){
        return res.status(404).json({ message: "article not found"})
    }

    return res.json(article)
}

exports.remove = async (req, res) => {
    const { id } = req.params

    // id validation
    const isValidID = isValidObjectId(id)

    if(!isValidID){
        return res.status(409).json({ message: "id is not valid"})
    }

    // remove
    const removedArticle = await articleModel.findByIdAndRemove(id)
    
    if(!removedArticle){
        return res.status(404).json({ message: "article not found"})
    }

    return res.json(removedArticle)
}

exports.saveDraft = async (req, res) => {
    //codes
}