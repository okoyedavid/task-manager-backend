const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskscontroller");

router.get("/", taskController.handleFetchTasks);

module.exports = router;
