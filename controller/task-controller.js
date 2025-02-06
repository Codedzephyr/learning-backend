const db = require("../queries");
const { NotFoundError } = require("../custom-errors");

const getTasks = async (req, res, next) => {
	try {
		const results = await db.getTasks();
		res.status(200).json(results);
	} catch (error) {
		next(error);
	}
};

const getTaskById = async (req, res) => {
	try {
		const id = req.params.id;
		const results = await db.getTaskById(id);
		if (!results.length) {
			return res.status(404).json({ error: 'Task not found' });
		}
		res.status(200).json(results);
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while fetching tasks' });
	}
};

const createTask = async (req, res) => {
	try {
		const results = await db.createTask(req.body);
		res.status(201).json(results.rows);
	} catch (error) {
		console.log('error:', error); 
		res.status(500).json({ error: 'An error occurred while updating the task' });
	}
};

const updateTask = async (req, res, next) => {
	try {
		const result = await db.updateTask(req.params.id, req.body, res);
		res.status(200).json({message: `Task modified with ID: ${req.params.id}`})
		res.status(200).json(result);
		if (result.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while updating the task' });
	}
};

const deleteTask = async (req, res, next) => {
	try {
		await db.deleteTask(req.params.id);
		res.status(200).json({message: `Task deleted with ID: ${req.params.id}`});
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while deleting the task' });
		res.status(404).json({ error: 'An error occurred while deleting the task' });

	}
};

module.exports = {
	getTasks,
	getTaskById,
	createTask,
	updateTask,
	deleteTask,
};
