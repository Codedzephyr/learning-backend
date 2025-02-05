const express = require("express");
const router = express.Router();
const taskController = require("../controller/task-controller"); // trying out controller

router.get("/", (req, res) => {
	res.send("This is the task page");
});

router.get("/101", (req, res) => {
	res.send("This is the task 101 page");
});

router.get("/102", (req, res) => {
	res.send("This is the task 102 page");
});

router.get("/tasks", taskController.getTasks);
router.get("/tasks/:id", taskController.getTaskById);
router.post("/tasks", taskController.createTask);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);

module.exports = router;
