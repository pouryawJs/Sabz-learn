const express = require("express")
const searchController = require("./../../controllers/v1/searchController")

const router = express.Router()

router
    .route("/:keyword")
    .get(searchController.search)

module.exports = router