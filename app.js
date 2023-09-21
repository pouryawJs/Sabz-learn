const express = require("express")
const cors = require("cors")
const authRouter = require("./routes/v1/authRouter")
const userRouter = require("./routes/v1/userRouter")
const categoryRouter = require("./routes/v1/categoryRouter")
const courseRouter = require("./routes/v1/courseRouter")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/courses", courseRouter)

module.exports = app