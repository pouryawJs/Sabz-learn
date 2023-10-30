const express = require("express")
const contactController = require("./../../controllers/v1/contactController")
const isAdmin = require("./../../middlewares/isAdmin")
const tokenAuth = require("./../../middlewares/tokenAuth")

const router = express.Router();

router
    .route("/")
    .get(tokenAuth, isAdmin, contactController.getAll)
    .post(contactController.create)

router
    .route("/:id")
    .delete(contactController.remove)

router
    .route("/answer/:id")
    .post(tokenAuth, isAdmin, contactController.answer)

module.exports = router
