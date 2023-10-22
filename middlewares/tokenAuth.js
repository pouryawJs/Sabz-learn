const jwt = require("jsonwebtoken")
const userModel = require("./../models/User")

module.exports = async (req, res, next) => {
    
    const authHeader = req.header("Authorization")?.split(" ")

    if(authHeader?.length !== 2){
        return res.status(403).json({ message : "you cant have access to this api"})
    }

    const token = authHeader[1]

    try {
        const payloadData = jwt.verify(token, process.env.JWT_SECRET)
        
        const user = await userModel.findById(payloadData.id)
        Reflect.deleteProperty(user, "password")
        req.user = user

        return next()

    } catch (error) {
        return res.status(500).json(error)
    }

}