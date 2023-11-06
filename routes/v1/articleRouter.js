const express = require("express");
const articleController = require("./../../controllers/v1/articleController");
const isAdmin = require("./../../middlewares/isAdmin");
const tokenAuth = require("./../../middlewares/tokenAuth");
const multer = require("multer")
const multerStorage = require("./../../utils/uploader")

const router = express.Router();

router
    .route("/")
    .get(articleController.getAll)
    .post(
        tokenAuth,
        isAdmin,
        multer({ storage: multerStorage, limits: {fileSize:1000000} }).single("cover"),
        articleController.create);
router
    .route("/:href")
    .get(articleController.getOne)
router
    .route("/:id")
    .delete(tokenAuth, isAdmin, articleController.remove)
router
    .route("/draft")
    .post(
        tokenAuth,
        isAdmin,
        // multer({ Storage: multerStorage, limits: { fileSize: 100000000 }}), 
        articleController.saveDraft)
        
module.exports = router;
