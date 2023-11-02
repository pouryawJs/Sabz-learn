const express = require("express")
const offController = require("./../../controllers/v1/offController")
const isAdmin = require("./../../middlewares/isAdmin")
const tokenAuth = require("./../../middlewares/tokenAuth")

const router = express.Router();

router
    .route("/")
    .get(tokenAuth, isAdmin, offController.getAll)
    .post(tokenAuth, isAdmin, offController.create)
router
    .route("/all")
    .post(tokenAuth, isAdmin, offController.setOnAll)
router
    .route("/:code")
    .post(tokenAuth, offController.getOne)
router
    .route(":id")
    .delete(tokenAuth, isAdmin, offController.remove)

module.exports = router