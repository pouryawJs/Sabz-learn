const articleModel = require("./../../models/Article")

exports.getAll = async (req, res) => {
    //codes
}

exports.create = async (req, res) => {
    //codes
}

exports.getOne = async (req, res) => {
    //codes
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