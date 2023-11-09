const express = require("express")
const ticketController = require("../../controllers/v1/ticketController")
const tokenAuth = require("../../middlewares/tokenAuth")
const isAdmin = require("../../middlewares/isAdmin")

const router = express.Router()

router
    .route("/")
    .get(tokenAuth, isAdmin, ticketController.getAll)
    .post(tokenAuth, ticketController.create);
router
    .route("/user")
    .get(tokenAuth, ticketController.userTicketes);
router
    .route("/departments")
    .get(ticketController.departments)
router
    .route("/departments-subs/:id")
    .get(ticketController.departmentsSub)
router
    .route("/answer")
    .post(tokenAuth, isAdmin, ticketController.setAnswer)
    .get(tokenAuth, ticketController.getAnswer)
router
    .route("/:id/answer")
    .get(tokenAuth, ticketController.getAnswer)

module.exports = router