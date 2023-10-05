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