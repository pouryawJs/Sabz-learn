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
    .route("/category/:href")
    .get(courseController.getCoursesByCategory)
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
router
    .route("/:href/:sessionID") // href: course href
    .get(courseController.getSessionInfo)
router
    .route("/sessions/:id")
    .delete(tokenAuth, isAdmin, courseController.removeSession)
router
    .route("/:id/register")
    .post(tokenAuth, courseController.userRegister)
router
    .route("/:href")
    .get(tokenAuth, courseController.getOne)
router
    .route("/:id")
    .delete(tokenAuth, isAdmin, courseController.removeOne)

module.exports = router;
