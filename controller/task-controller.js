const db = require('../queries');

const getTasks = (req, res) => {
    db.getTasks(req, res);
}

const getTaskById = (req, res) => {
    db.getTaskById(req, res);
}

const createTask = (req,res) => {
    db.createTask(req,res);
}

const updateTask = (req,res) => {
    db.updateTask(req,res);
}

const deleteTask = (req,res) => {
    db.deleteTask(req,res);
}

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
}