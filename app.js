const express = require("express")
const cors = require("cors")
const authRouter = require("./routes/v1/authRouter")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/v1/auth", authRouter)

module.exports = app