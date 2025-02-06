const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("This is the task page");
});

router.get("/101", (req, res) => {
	res.send("This is the task 101 page");
});

router.get("/102", (req, res) => {
	res.send("This is the task 102 page");
});


module.exports = router;
