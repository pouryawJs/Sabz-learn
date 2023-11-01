const express = require("express")
const newsletterController = require("./../../controllers/v1/newsletterController")
const isAdmin = require("./../../middlewares/isAdmin")
const tokenAuth = require("./../../middlewares/tokenAuth")

const router = express.Router();

router
    .route("/")
    .get(tokenAuth, isAdmin, newsletterController.getAll)
    .post(newsletterController.create)

module.exports = router
