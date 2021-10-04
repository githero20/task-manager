const express = require("express");
const router = express.Router();

// We can either separate the routers or chain them together
// router.get('/', getPeople)
// router.post('/', createPerson)
// router.route('/').get(getPeople).post(createPerson)

// destructure it then require
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  // editTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);
//   .put(editTask);

module.exports = router;
