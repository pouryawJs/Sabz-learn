const express = require("express")
const userController = require("./../../controllers/v1/userController")

const router = express.Router()

router.post("/ban/:id", userController.ban)

module.exports = router