const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");

router.get("/", movieController.handleFetchMovies);

router.post("/", movieController.handleAddMovies);

router.route("/:id").delete(movieController.handleDeleteMovies);
module.exports = router;
