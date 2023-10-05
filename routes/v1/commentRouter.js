const express = require("express")
const commentController = require("./../../controllers/v1/commentController")
const tokenAuth = require("./../../middlewares/tokenAuth")

const router = express.Router();

router.route("/").post(tokenAuth, commentController.create)

module.exports = router