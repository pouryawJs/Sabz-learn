const { isValidObjectId } = require("mongoose");
const coursesModel = require("./../../models/Course")
const OffModel = require("./../../models/Off")

exports.getAll = async (req, res) => {
    const offs = await OffModel.find({})
        .populate("course", "name href")
        .populate("creator", "name");
        
    return res.json(offs)
}

exports.create = async (req, res) => {
    const { code, course, percent, max} = req.body

    const newOff = await OffModel.create({
        code,
        course,
        percent,
        max,
        uses: 0,
        creator: req.user._id
    })

    return res.status(201).json(newOff)
}

exports.setOnAll = async (req, res) => {
    const { discount } = req.body

    const coursesDiscounts = await coursesModel.updateMany({ discount })

    return res.json({ message: "discount set seccessfully"})
}

exports.getOne = async (req, res) => {
    const { code } = req.params
    const { course } = req.body

    // id Validation
    const idValidCourseID = isValidObjectId(course)

    if(!isValidObjectId){
        return res.status(409).json({ message: "course id is not valid"})
    }

    // 

    const off = await OffModel.findOne({code, course})

    if(!off){
        return res.status(404).json({ message: "code not found"})
    } else if(off.uses === off.max){
        return res.json({ message: "code is already used"})
    }
    await OffModel.findOneAndUpdate({ code, course },{
        $set: {
            uses: off.uses + 1
        }
    })

    return res.json(off)
}

exports.remove = async (req, res) => {
    const { id } = req.params

    // id Validation
    const idValidID = isValidObjectId(id)

    if(!isValidObjectId){
        return res.status(409).json({ message: "id is not valid"})
    }

    // remove

    const removedOff = await OffModel.findByIdAndRemove(id);

    if(!removedOff){
        return res.status(404).json({ message: "not found"})
    }

    return res.json(removedOff)
}