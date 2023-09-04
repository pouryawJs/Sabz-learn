const express = require("express")
const userController = require("./../../controllers/v1/userController")
const isAdmin = require("./../../middlewares/isAdmin")
const tokenAuth = require("./../../middlewares/tokenAuth")

const router = express.Router()

router
    .route("/ban/:id")
    .post(tokenAuth, isAdmin, userController.ban)

module.exports = router