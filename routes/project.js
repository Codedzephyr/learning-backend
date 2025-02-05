const express = require("express"); // import statement
const router = express.Router(); // import statement

router.get("/", (req, res) => {
	res.send("This is the project page");
});

router.get("/1", (req, res) => {
	res.send("This is the project 101 page");
});

router.get("/102", (req, res) => {
	res.send("This is the project 102 page");
});

module.exports = router;
