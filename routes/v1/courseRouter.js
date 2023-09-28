const express = require("express");
const courseController = require("./../../controllers/v1/courseController");
const multer = require("multer");
const multerStorage = require("./../../utils/uploader");
const isAdmin = require("./../../middlewares/isAdmin");
const tokenAuth = require("./../../middlewares/tokenAuth");

const router = express.Router();

router
    .route("/")
    .post(
        multer({ storage: multerStorage, limits: {fileSize:1000000} }).single("cover"),
        tokenAuth,
        isAdmin,
        courseController.create
    );

router
        .route("/:id/sessions")
        .post(
            // multer({ storage: multerStorage}).single("video"),
            tokenAuth,
            isAdmin,
            courseController.createSession)
router
        .route("/sessions")
        .get(
            tokenAuth,
            isAdmin,
            courseController.getAllSessions)

module.exports = router;
