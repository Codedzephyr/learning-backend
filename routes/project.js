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
  next(); // Pass control to the next middleware or route handler. without next request will hang
});

// error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {     
    res.json({info: 'Node.js, Express, and Postgres API'});
});

const taskRoute = require('./routes/task');
const projectRoute = require('./routes/project');

//app. use for mounting middleware functions
app.use('/task', taskRoute);
app.use('/project', projectRoute);

// require acts as the import statement here 
const db = require('./queries');

// all these are route handlers
app.get('/tasks', db.getTasks);
app.get('/tasks/:id', db.getTaskById);
app.post('/tasks', db.createTask);
app.put('/tasks/:id', db.updateTask);
app.delete('/tasks/:id', db.deleteTask);

  
//   router.get("/101", (req, res) => {
// 	res.send("This is the project 101 page");
//   });

module.exports = router;