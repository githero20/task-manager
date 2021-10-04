// this is the logic behind tasks.js in the main folder, so the file doesnt get messy
const Task = require("../models/Task");
const asyncWrapper = require("../middleware.js/asyncWrapper");
const { createCustomError } = require("../errors/customError");

// Old Method
// const getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     // empty object, so it finds all the tasks
//     res.status(200).json({ tasks });
//     // tasks: tasks (same thing)
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

// Best to use a middleware function that wraps all controllers, instead of multiple try catches

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  // empty object, so it finds all the tasks
  res.status(200).json({ tasks });
  // tasks: tasks (same thing)
  res.status(500).json({ msg: error });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
  // this shows a successful post request (201)
  // then sends the 'task' received from the body in json format
  res.status(500).json({ msg: error });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  // we grab the ID from the params and give it an alias 'taskID'
  const task = await Task.findById(taskID);

  if (!task) {
    return next(createCustomError(`Task with id: ${taskID} not found.`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndDelete(taskID);

  if (!task) {
    return next(createCustomError(`Task with id: ${taskID} not found.`, 404));
  }

  res.status(200).json({ task });
  // res.status(200).send() also works tbh, once the FE gets the 200 status code. It is validated and will proceed regardless
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndUpdate(
    taskID,
    req.body,
    {
      new: true,
      runValidators: true,
    },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
  // if you don't pass in the options, even though you're successful the new value may not show in your update response

  if (!task) {
    return next(createCustomError(`Task with id: ${taskID} not found.`, 404));
  }

  res.status(200).json({ task });
  //not empty because if we're updating something you need to pass in the old data first
});

// PUT REQUEST PRACTICE
// const editTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;

//     // const task = await Task.findByIdAndUpdate( //this does not overwrite
//     const task = await Task.findOneAndUpdate(
//       taskID,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//         overwrite: true,
//       },
//       function (err, result) {
//         if (err) {
//           res.send(err);
//         } else {
//           res.send(result);
//         }
//       }
//     );
//     // if you don't pass in the options, even though you're successful the new value may not show in your update response

//     if (!task) {
//       res.status(404).json({
//         msg: `Task with id ${taskID} is not available and cannot be deleted.`,
//       });
//     }

//     res.status(200).json({ task });
//     //data because if we're updating something you need to pass in the old data first
//   } catch (error) {}
//   res.status(500).json({ msg: error });
// };

// export it as an object
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  // editTask,
};
