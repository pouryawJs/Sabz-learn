const express = require("express")
const notificationController = require("./../../controllers/v1/notificationController")
const isAdmin = require("./../../middlewares/isAdmin")
const tokenAuth = require("./../../middlewares/tokenAuth")

const router = express.Router()

router
    .route("/")
    .post(tokenAuth, isAdmin, notificationController.create)
    .get(tokenAuth, isAdmin, notificationController.getAll)
router
    .route("/:adminID")
    .get(tokenAuth, isAdmin, notificationController.get)
router
    .route("/:adminID")
    .put(tokenAuth, isAdmin, notificationController.seen)

module.exports = router