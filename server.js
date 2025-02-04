const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

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

app.listen(port,() => {
    console.log(`Server is running at http://localhost:${port}`);
})


