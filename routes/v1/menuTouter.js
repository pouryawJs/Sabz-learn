const express = require("express");
const menuController = require("./../../controllers/v1/menuController");
const isAdmin = require("./../../middlewares/isAdmin");
const tokenAuth = require("./../../middlewares/tokenAuth");

const router = express.Router();

router.route("/")
    .get(menuController.getAll)
    .post(tokenAuth, isAdmin, menuController.create);
router.route("/all")
    .get(menuController.getAllInPanel);
router.route("/:id")
    .delete(tokenAuth, isAdmin, menuController.remove);

module.exports = router;
