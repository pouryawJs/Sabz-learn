const { isValidObjectId } = require("mongoose")
const notificationModel = require("./../../models/Notification")

exports.get = async (req, res) => {
    const { _id } = req.user

    const adminNotifications = await notificationModel.find({ admin: _id })

    return res.json(adminNotifications)
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
    const { id } = req.params

    // validation 
    const isValidID = isValidObjectId(id)
    
    if(!isValidID){
        return res.status(401).json({ message: "id is not valid"})
    }
    // update
    const notification = await notificationModel.findByIdAndUpdate(id, {
        $set: { seen : 1 }
    }, { new: true })

    if(!notification){
        return res.status(404).json({ message: "notification not found"})
    }
    return res.json(notification)
}

exports.getAll = async (req, res) => {
    const notifications = await notificationModel.find({})
    return res.json({notifications})
}