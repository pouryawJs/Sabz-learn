const express = require("express");
const categoryController = require("./../../controllers/v1/categoryController");
const isAdmin = require("./../../middlewares/isAdmin");
const tokenAuth = require("./../../middlewares/tokenAuth");

const router = express.Router();

router
    .route("/")
    .post(tokenAuth, isAdmin, categoryController.create)
module.exports = router