const userModule = require("../../db/models/user.model");
const errorHandle = require("../../helpers/error.service");
const bcrypt = require("bcrypt");

const create = async (data) => {
  try {
    const newUser = new userModule( {
      active: data.active ? data.active : null,
      user_name: data.userName,
      password: await bcrypt.hash(data.password, 10),
      created_at: Date.now(),
      updated_at: Date.now()
    });
    await newUser.save();
    return newUser
  } catch (err) {
    return errorHandle(err.message, 500, err.name);
  }
};

// const findOne = async (query) => {
//   return await UserModel.findOne(query);
// };

module.exports = {
  create
};
