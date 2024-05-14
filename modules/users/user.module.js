const UserModel = require("../../db/models/user.model");

//Create user in DB
const create = async (user) => {
  const userDoc = await UserModel.create(user);
  return userDoc;
};

//Find user from DB
const findOne = async (query) => {
  return await UserModel.findOne(query);
};

module.exports = {
  create,
  findOne,
};
