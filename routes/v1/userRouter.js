const express = require("express")
const userController = require("./../../controllers/v1/userController")
const isAdmin = require("./../../middlewares/isAdmin")
const tokenAuth = require("./../../middlewares/tokenAuth")

const router = express.Router()

router
    .route("/")
    .get(tokenAuth, isAdmin, userController.getAll)
router
    .route("/ban/:id")
    .post(tokenAuth, isAdmin, userController.ban)
router
    .route("/:id")
    .delete(tokenAuth, isAdmin, userController.removeOne)
module.exports = router