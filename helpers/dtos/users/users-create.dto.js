const User = require("../../../db/models/user.model");

const UserCreatDto = async (req, res) => {
  const resultData = {};
  const { name, email, userName, password } = req.body;

  /* Check name */
  if (name) {
    resultData.name = name;
  }
  /* Check email */
  if (email) {
    resultData.email = email;
  }

  /* Check username */
  if (!userName) {
    throw new Error("username is not found");
  }
  if (typeof userName !== "string") {
    throw new Error("username is not valid");
  }

  const user = await User.findOne({ user_name: userName });

  if (user) {
    throw new Error("User has been already registered");
  }

  resultData.userName = userName;

  /* Check password */
  if (!password) {
    throw new Error("password is not found");
  }
  if (typeof password !== "string") {
    throw new Error("password is not valid");
  }

  resultData.password = password;

  return resultData;
};

module.exports = UserCreatDto;
