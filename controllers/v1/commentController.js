const { isValidObjectId } = require("mongoose");
const commentModel = require("./../../models/Comment")
const courseModel = require("./../../models/Course")

exports.create = async (req, res) => {
    const { body, courseHref, score } = req.body

    // get course info
    const course = await courseModel.findOne({ href: courseHref }).lean();

    // course Validation
    if(!course){
        return res.status(404).json({ message: "course with this href not found"})
    }

    // create comment
    const comment = await commentModel.create({
        body,
        course: course._id,
        creator: req.user._id,
        score,
        isAccept: 0,
        isAnswer: 0
    })

    if(!comment){
        return res.status(500).json({ message: "something went wrong... try again"})
    }

    res.status(201).json({ message: "comment created"})
}
exports.remove = async (req, res) => {
    const { id } = req.params

    // id validation
    const isValidCommentID = isValidObjectId(id)

    if(!isValidCommentID){
        return res.status(409).json({ message: "id is not valid"})
    }

    // remove
    const removedComment = await commentModel.findByIdAndRemove(id)

    if(!removedComment){
        return res.status(404).json({ message: "comment not found"})
    }

    return res.json({ message: "comment removed successfully"})
}
exports.accept = async (req, res) => {
    const { id } = req.params

    // id validation
    const isValidCommentID = isValidObjectId(id)

    if(!isValidCommentID){
        return res.status(409).json({ message: "id is not valid"})
    }

    // accept the comment
    const acceptedComment = await commentModel.findByIdAndUpdate(
        id,
        { $set: {
            isAccept: 1
        }}
    )

    if(!acceptedComment){
        return res.status(404).json({ message: " comment not found"})
    }

    return res.json({ message: "comment accepted successfully"})
}
exports.reject = async (req, res) => {
    const { id } = req.params

    // id validation
    const isValidCommentID = isValidObjectId(id)

    if(!isValidCommentID){
        return res.status(409).json({ message: "id is not valid"})
    }

    // reject the comment
    const rejectedComment = await commentModel.findByIdAndUpdate(
        id,
        { $set: {
            isAccept: 0
        }}
    )

    if(!rejectedComment){
        return res.status(404).json({ message: " comment not found"})
    }

    return res.json({ message: "comment rejected successfully"})
}