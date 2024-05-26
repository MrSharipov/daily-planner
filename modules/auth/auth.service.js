const userService = require("../users/users.service");
const { generateToken } = require("../../middlewares/auth-middleware");

const register = async (userName, password) => {
  console.log;
  // add some extra fields
  const userData = {
    userName,
    password,
    active: true,
  };
  // create user
  const newUser = await userService.create(userData);
  // create token
  return generateToken(newUser._id);
};

module.exports = {
  register,
};
