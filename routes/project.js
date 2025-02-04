const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("This is the project page");
});

router.get("/101", (req, res) => {
	res.send("This is the project 101 page");
});

router.get("/102", (req, res) => {
	res.send("This is the project 102 page");
});

// Route-level middleware
// router.use("/101", (req, res, next) => {
// 	console.log("Middleware for /101 route");
// 	const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next(); // Pass control to the next middleware or route handler
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {     
    res.json({info: 'Node.js, Express, and Postgres API'});
});

const taskRoute = require('./routes/task');
const projectRoute = require('./routes/project');

app.use('/task', taskRoute);
app.use('/project', projectRoute);

const db = require('./queries');

app.get('/tasks', db.getTasks);
app.get('/tasks/:id', db.getTaskById);
app.post('/tasks', db.createTask);
app.put('/tasks/:id', db.updateTask);
app.delete('/tasks/:id', db.deleteTask);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});;
//   });
  
//   router.get("/101", (req, res) => {
// 	res.send("This is the project 101 page");
//   });

module.exports = router;