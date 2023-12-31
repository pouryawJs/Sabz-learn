const express = require("express")
const userController = require("./../../controllers/v1/userController")
const isAdmin = require("./../../middlewares/isAdmin")
const tokenAuth = require("./../../middlewares/tokenAuth")

const router = express.Router()

router
    .route("/")
    .get(tokenAuth, isAdmin, userController.getAll)
    .put(tokenAuth, userController.updateOne)
router
    .route("/ban/:id")
    .post(tokenAuth, isAdmin, userController.ban)
router
    .route("/:id")
    .delete(tokenAuth, isAdmin, userController.removeOne)
router
    .route("/role")
    .put(tokenAuth, isAdmin, userController.changeRole)
module.exports = router