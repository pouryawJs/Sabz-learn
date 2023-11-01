const { isValidObjectId } = require("mongoose")
const notificationModel = require("./../../models/Notification")

exports.get = async (req, res) => {

}

exports.create = async (req, res) => {
    const {message, admin} = req.body

    // validation
    const isValidAdminID = isValidObjectId(admin)
    
    if(!isValidAdminID){
        return res.status(401).json({ message: "id is not valid"})
    }
    if(!message){
        return res.status(401).json({ message: "message required"})
    }
    // create
    const notification = await notificationModel.create({
        message,
        admin
    })
    return res.status(201).json({notification})
}

exports.seen = async (req, res) => {

}

exports.getAll = async (req, res) => {
    const notifications = await notificationModel.find({})
    return res.json({notifications})
}