const express = require('express');
const bodyParser = require('body-parser');
const {logRequest, authenticate} = require('./middleware');
const app = express();
const port = 3000;

// use logging middleware for all routes
// app.use(logRequest);

// use authentication middleware for all routes
// app.use('/tasks', authenticate);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {     
    res.json({info: 'Node.js, Express, and Postgres API'});
});

const taskRoute = require('./routes/task');
const projectRoute = require('./routes/project');

app.use('/task', taskRoute);
app.use('/project', projectRoute);


// server listener
app.listen(port,() => {
    console.log(`Server is running at http://localhost:${port}`);
})


