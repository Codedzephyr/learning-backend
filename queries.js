const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
});

//parameterized query with placeholder $1, $2 to prevent SQL injections
const getTasks = async () => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
  return result.rows;
};

const getTaskById = async (id) => {
  const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
  return result.rows;
};

const createTask = async (req) => {
  const { name, description } = req;
  const result = await pool.query(
    "INSERT INTO tasks (name, description) VALUES ($1, $2)",
    [name, description]
  );
  return result.rows;
};

const updateTask = async (paramId, req) => {
  const id = Number.parseInt(paramId);
  const { name, description } = req;
  const result = await pool.query(
    "UPDATE tasks SET name = $1, description = $2 WHERE id = $3",
    [name, description, id]
  );
  return result.rows;
};

const deleteTask = async (id) => {
  const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  return result.rows;
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
