const express = require("express")
const notificationController = require("./../../controllers/v1/notificationController")
const isAdmin = require("./../../middlewares/isAdmin")
const tokenAuth = require("./../../middlewares/tokenAuth")

const router = express.Router()

router
    .route("/")
    .get(tokenAuth, isAdmin, notificationController.create)
router
    .route("/:adminID")
    .get(tokenAuth, isAdmin, notificationController.get)
router
    .route("/:adminID")
    .get(tokenAuth, isAdmin, notificationController.seen)

module.exports = router