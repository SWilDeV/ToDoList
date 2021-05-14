const DBTask = require("../models/task").default;

const createTask = async (user, name) => {
  const task = await DBTask.create({ user, name });
  return task;
};

const getTaskbyUser = async (user) => {
  return await DBTask.find({
    user,
  });
};

const findById = async (user, taskId) => {
  const task = await DBTask.findOne({
    _id: taskId,
    user,
  });
  return task;
};

const getTaskById = async (taskId, userId) => {
  const task = await findById(userId, taskId);
  if (!task) {
    return null;
  }
  return task;
};

const updateById = async (taskId, userId, name) => {
  const task = await findById(userId, taskId);
  if (!task) {
    return null;
  }
  task.name = name;
  await task.save();
  return task;
};

const deleteById = async (taskId, user) => {
  await DBTask.deleteOne({
    _id: taskId,
    user,
  });
};

exports.default = {
  createTask,
    getTaskbyUser,
    findById,
    getTaskById,
    updateById,
    deleteById,
};
