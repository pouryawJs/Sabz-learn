const { isValidObjectId } = require("mongoose")
const courseModel = require("./../../models/Course")
const sessionModel = require("./../../models/Session")

exports.create = async (req, res) => {
    const {
    name,
    description,
    cover,       
    support,
    href,
    price,
    status,
    discount,
    categoryID,
    creator
    } = req.body
    
    const course = await courseModel.create({
        name,
        description,
        cover: req.file.filename,
        support,
        href,
        price,
        status,
        discount,
        categoryID,
        creator: req.user._id
    })

    const mainCourse = await courseModel.findById(course._id).populate("creator", "-password")
    
    return res.status(201).json(mainCourse)
}
exports.createSession = async (req, res) => {
    const { title, time, free} = req.body
    const { id } = req.params // course id

    // course id validation
    const isValidId = isValidObjectId(id)

    if(!isValidId){
        return res.status(409).json({ message: "id is not valid"})
    }

    const course = await courseModel.findById(id)

    if(!course){
        return res.status(404).json({ message: "course not found"})
    }
    // create session
    const session = await sessionModel.create({
        title,
        time,
        free,
        video: "video.mp4", // req.file.fileName
        course: id
    }) 

    return res.status(201).json({session})
}
exports.getAllSessions = async (req, res) => {
    const sessions = await sessionModel
        .find({})
        .populate("course", "name")
        .lean()

    return res.status(200).json(sessions)
}
exports.getSessionInfo = async (req, res) => {
    const { href , sessionID } = req.params
    
    // session id validation
    const isValidSessionId = isValidObjectId(sessionID)

    if(!isValidSessionId){
        return res.status(409).json({ message:"id is not valid"})
    }

    // get session info

    const course = await courseModel.findOne({ href }).lean();
    
    if(!course){
        return res.status(404).json({ message: "there is no course with this href"})
    }

    const session = await sessionModel.findById(sessionID)

    const sessions = await sessionModel.find({ course: course._id})

    return res.status(200).json({ session, sessions })
}