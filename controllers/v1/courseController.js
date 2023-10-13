const { isValidObjectId } = require("mongoose")
const courseModel = require("./../../models/Course")
const sessionModel = require("./../../models/Session")
const courseUserModel = require("./../../models/course-user")
const categoryModel = require("./../../models/Category")
const commentModel = require("./../../models/Comment")

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
exports.removeSession = async (req, res) => {
    const { id } = req.params // session id

    // session id validation 
    const isValidSessionID = isValidObjectId(id)

    if(!isValidSessionID){
        return res.status(409).json({message: "session id is not valid"})
    }

    // delete session
    const deletedSession = await sessionModel.findByIdAndDelete(id).select("title")
    
    if(!deletedSession){
        return res.status(404).json({message: "session not found"})
    }
    
    return res.status(200).json({deletedSession})
}
exports.userRegister = async (req, res) => {
    const userID = req.user._id
    const { id: courseID } = req.params 
    const { price } = req.body 

    // is user already registered??
    const isUserRegistered = await courseUserModel.findOne({
        user: userID,
        course: courseID,
    }) 

    if(isUserRegistered) {
        return res.status(409).json({ message: "user already registered"})
    }

    // register
    await courseUserModel.create({
        user: userID,
        course: courseID,
        price
    })

    return res.status(201).json({ message: "register successfully"})
}
exports.getCoursesByCategory = async (req, res) => {
    const { href } = req.params
    const category = await categoryModel.findOne({ href })

    if(category){
        const categoryCourses = await courseModel.find({ categoryID: category._id })

        return res.json({ courses: categoryCourses })
    }else {
        return res.json([])
    }
}
exports.getOne = async(req, res) => {
    const { href: courseHref } = req.params

    const course = await courseModel.findOne({ href: courseHref })
        .populate("categoryID")
        .populate("creator", "-password")

    const sessions = await sessionModel.find({ course: course._id }).lean();
    const comments = await commentModel.find({ course: course._id, isAccept: 1 })
        .populate("creator", "-password")
        .lean();
    const students = await courseUserModel.find({ course: course._id })
        .populate("user", "-password")
        .lean();

    const isUserRegistered = !!(await courseUserModel.findOne({
        course: course._id,
        user: req.user._id
    }))

    return res.json({ course, sessions, comments, students, isUserRegistered})
}
exports.removeOne = async (req, res) => {
    const courseID = req.params.id

    // id validation
    const isValidCourseID = isValidObjectId(courseID)

    if(!isValidCourseID){
        return res.status(409).json({message: "course id is not valid"})
    }

    // remove 
    const removedCourse = await courseModel.findByIdAndRemove(courseID).lean()

    if(!removedCourse){
        return res.status(404).json({message: "course not found"})
    }

    return res.json({ message: 'course removed successfully'})
}
exports.getRelatedCourses = async (req, res) => {
    const { href } = req.params
    
    const mainCourse = await courseModel.findOne({ href }).lean()

    if(!mainCourse){
        return res.status(404).json({ message: "course with this href doesn't exist"})
    }

    let relatedCourses = await courseModel.find({ categoryID: mainCourse.categoryID })

    relatedCourses = relatedCourses.filter(course => course.href !== href)

    return res.json(relatedCourses)
}