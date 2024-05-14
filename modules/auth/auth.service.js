const userService = require("../users/users.service");
const {generateToken} = require("../../middlewares/auth-middleware");

const register = async (data) => {
  // add some extra fields
  const userData = {
    ...data,
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
