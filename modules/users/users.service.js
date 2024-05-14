const usersModule = require("../../modules/users/user.module");
const {generateToken} = require("../../middlewares/auth-middleware");

const register = async (user) => {
  const userForDb = {
    ...user,
    active: true,
    created_at: Date.now(),
    updated_at: Date.now(),
  };

  const userDoc = await usersModule.create(userForDb);

  const token = generateToken(userDoc._id);
  return token;
};

const login = async (user) => {
  const token = await generateToken(user.id);
  return token;
};

module.exports = {
  register,
  login,
};
