const express = require("express");
const categoryController = require("./../../controllers/v1/categoryController");
const isAdmin = require("./../../middlewares/isAdmin");
const tokenAuth = require("./../../middlewares/tokenAuth");

const router = express.Router();

router
    .route("/")
    .post(tokenAuth, isAdmin, categoryController.create)
    .get(categoryController.getAll)
router
    .route("/:id")
    .delete(tokenAuth, isAdmin, categoryController.removeOne)
    
module.exports = router