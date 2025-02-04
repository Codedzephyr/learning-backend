const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
});

const getTasks = (req, res) => {
    pool.query('SELECT * FROM tasks ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const getTaskById = (req, res) => {
    const id = Number.parseInt(req.params.id);
    pool.query('SELECT * FROM tasks WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const createTask = (req, res) => {
    const { name, description } = req.body;
    pool.query('INSERT INTO tasks (name, description) VALUES ($1, $2)', [name, description], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`Task added with ID: ${results.insertId}`);
    });
}

const updateTask = (req, res) => {
    const id = Number.parseInt(req.params.id);
    const { name, description } = req.body;
    pool.query('UPDATE tasks SET name = $1, description = $2 WHERE id = $3', [name, description, id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Task modified with ID: ${id}`);
    });
}

const deleteTask = (req, res) => {
    const id = Number.parseInt(req.params.id);
    pool.query('DELETE FROM tasks WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Task deleted with ID: ${id}`);
    });
}

module.exports = {
    getTasks,
    getTaskById,
    createTask, 
    updateTask,
    deleteTask,
};