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
    .route("/admins")
    .get(tokenAuth, isAdmin, notificationController.get)
router
    .route("/:id/see")
    .put(tokenAuth, isAdmin, notificationController.seen)

module.exports = router