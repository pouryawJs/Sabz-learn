const userModel = require("../../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const bannedUserModel = require("./../../models/Banned-phone")
const registerValidator = require("./../../validators/registerValidator")

exports.register = async (req,res) => {

    // data validation 1
    const validationResult = registerValidator(req.body)

    if(validationResult !== true){
        return res.status(401).json(validationResult)
    }

    // data validation 2
    const {username, name, email, password, phone} = req.body

    const isUserExist = await userModel.findOne(
        { $or : [{ email }, { username }]}
    )

    if(isUserExist){
        return res.status(401).send({ message : "username or email exists"})
    }

    // data validation 3
    const isUserBanned = await bannedUserModel.findOne({ phone })

    if(isUserBanned){
        return res.status(401).json({ message: "user banned" })
    }

    // create document
    const countOfUser =  await userModel.count()
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        username,
        name,
        email,
        password: hashedPassword,
        phone,
        role: countOfUser > 0 ? "USER" : "ADMIN"
    })
    
    // delete pasword when user's data send 
    const userObject = user.toObject()
    Reflect.deleteProperty(userObject, "password")

    // create access token
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30 day"})
    
    // send result to client(without user's password)
    return res.status(200).json({ userObject, accessToken })
}
exports.login = async (req,res) => {

}
exports.getMe = async (req,res) => {

}