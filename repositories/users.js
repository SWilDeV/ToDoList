const DBUser = require("../models/user").default;

const createUser = async () => {
  const user = await DBUser.create({});
  return user;
};

const findById = async (id) => {
  return await DBUser.findById(id);
};

exports.default = {
  createUser,
  findById,
};
