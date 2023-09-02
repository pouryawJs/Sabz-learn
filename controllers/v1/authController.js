const userModel = require("../../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerValidator = require("./../../validators/registerValidator")

exports.register = async (req,res) => {
    const validationResult = registerValidator(req.body)

    if(validationResult !== true){
        return res.status(401).json(validationResult)
    }

    const {username, name, email, password, phone} = req.body

    const isUserExist = await userModel.findOne(
        { $or : [{ email }, { username }]}
    ) 

    if(isUserExist){
        return res.status(409).send({ message : "username or email exists"})
    }

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
    
    const userObject = user.toObject()
    Reflect.deleteProperty(userObject, "password")

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30 day"})
    
    return res.status(200).json({ userObject, accessToken })
}
exports.login = async (req,res) => {

}
exports.getMe = async (req,res) => {

}