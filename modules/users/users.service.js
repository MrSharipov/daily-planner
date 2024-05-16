const User = require("../../db/models/user.model");
const errorHandle = require("../../helpers/error.service");
const bcrypt = require("bcrypt");

const create = async (data) => {
  try {
    const newUser = new User({
      active: data.active ? data.active : null,
      user_name: data.userName,
      password: await bcrypt.hash(data.password, 10),
      created_at: Date.now(),
      updated_at: Date.now(),
    });
    await newUser.save();
    return newUser;
  } catch (err) {
    return errorHandle(err.message, 500, err.name);
  }
};

const getByUserName = async (query) => {
  return User.findOne(query);
};

const getById = async (id) => {
  return User.findById(id);
};

const update = async (id, data) => {
  return User.findByIdAndUpdate(id, data, {
    new: true,
  });
};

module.exports = {
  create,
  getByUserName,
  update,
  getById
};
