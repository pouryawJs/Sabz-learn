const express = require("express")
const commentController = require("./../../controllers/v1/commentController")
const tokenAuth = require("./../../middlewares/tokenAuth");
const isAdmin = require("../../middlewares/isAdmin");

const router = express.Router();

router.route("/").post(tokenAuth, commentController.create)
router.route("/:id").delete(tokenAuth, isAdmin, commentController.remove)
router.route("/:id/accept").put(tokenAuth, isAdmin, commentController.accept)
router.route("/:id/reject").put(tokenAuth, isAdmin, commentController.reject)

module.exports = router