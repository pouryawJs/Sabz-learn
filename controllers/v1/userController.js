const userModel = require("./../../models/User");
const bannedUserModel = require("./../../models/Banned-phone");
const bcrypt = require("bcrypt")
const { isValidObjectId } = require("mongoose");

exports.ban = async (req, res) => {
    
    const mainUser = await userModel.findOne({ _id : req.params.id })
    
    const banResult = await bannedUserModel.create({ phone : mainUser.phone})

    if(banResult){
        return res.status(200).json({ message : "user banned successfully"})
    }

    return res.status(500).json({ message : "server error !!"})
};

exports.getAll = async (req, res) => {

    const users = await userModel.find({}).lean()

    for (const key in users) {
        Reflect.deleteProperty(users[key], "password")
    }

    return res.status(200).send(users)
}

exports.removeOne = async (req, res) => {

    const { id } = req.params

    const isValidId = isValidObjectId(id)
    
    if(!isValidId){
        return res.status(409).json({ message : " Id is not valid"})
    }
    
    const removedUser = await userModel.findByIdAndDelete(id)
    
    if(!removedUser){
        return res.status(404).json({ message : "user not found"})
    }
    
    return res.status(200).json({ message : `user removed`})
        
}

exports.changeRole = async (req, res) => {
    const { id } = req.body

    const isValidId = isValidObjectId(id)
    
    if(!isValidId){
        return res.status(409).json({ message : " Id is not valid"})
    }

    const user = await userModel.findById(id)

    if(!user){
        return res.status(404).json({ message: "user not found"})
    }

    const newrole = user.role === "ADMIN" ? "USER" : "ADMIN"
    
    const updatedUser = await userModel.findByIdAndUpdate(id, {
        $set : { role : newrole }
    })

    return res.status(201).json({ message: `${updatedUser.name}'s role has changed to ${newrole}`})
}

exports.updateOne = async (req, res) => {
    const {name, username, email, password, phone} = req.body

    const hashedPassword = await bcrypt.hash(password, 10)
    const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
        name,
        username,
        email,
        password : hashedPassword,
        phone
    }, { new : true }).select("-password")

    if(!updatedUser){
        return res.status(404).json({ message: "user not found"})
    }

    return res.status(201).json(updatedUser)
}