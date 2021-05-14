const DBTask = require("../models/task").default;

const createTask = async (user, name) => {
  const task = await DBTask.create({ user, name });
  return task;
};

const getTaskbyUser = async (userId) => {
  return await DBTask.find({
    userId,
  });
};

const findById = async (userId, taskId) => {
  const task = await DBTask.findOne({
    _id: taskId,
    userId,
  });
  return task;
};

// const updateById = async (taskId, userId, name) => {
//   const task = await findById(userId, taskId);
//   if (!task) {
//     return null;
//   }
//   task.name = name;
//   await task.save();
//   return task;
// };

// const deleteById = async (taskId, user) => {
//   await Task.deleteOne({
//     _id: taskId,
//     user,
//   });
// };

exports.default = {
  createTask,
    getTaskbyUser,
    findById,
  //   updateById,
  //   deleteById,
};
