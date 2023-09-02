const userModel = require("./../../models/User");
const bannedUserModel = require("./../../models/Banned-phone");

exports.ban = async (req, res) => {
    
    const mainUser = await userModel.findOne({ _id : req.params.id })
    
    const banResult = await bannedUserModel.create({ phone : mainUser.phone})

    if(banResult){
        return res.status(200).json({ message : "user banned successfully"})
    }

    return res.status(500).json({ message : "server error !!"})
};
