const express = require("express")
const orderController = require("../../controllers/v1/orderController")
const tokenAuth = require("../../middlewares/tokenAuth")

const router = express.Router()

router.route("/").get(tokenAuth, orderController.getAll)
router.route("/:id").get(tokenAuth, orderController.getOne)

module.exports = router