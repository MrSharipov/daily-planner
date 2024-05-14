const User = require("../../db/models/user.model");
const errorHandle = require("../../helpers/error.service");
const authService = require("./auth.service");

const register = async (req, res) => {
  try {
    //Validate input params
    const data = await validateRegisterInput(req, res);

    const token = await authService.register(data);

    return res.status(201).send({ status: "OK", authToken: token });

  } catch (err) {
    return res.json(errorHandle(err.message, 500, err.name));
  }
};

const login = async (req, res) => {
  try {
    const data = await validateLoginInput(req, res);
    const user = {
      id: data.userId,
      password: data.password,
    };

    const token = await userService.login(user);
    return res.status(201).send({ status: "OK", authToken: token });
  } catch (err) {
    return res.json(errorHandle(err.message, 500, err.name));
  }
};

const validateRegisterInput = async (req, res) => {
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

const validateLoginInput = async (req, res) => {
  const resultData = {};
  const { userName, password } = req.body;

  /* Check username */
  if (!userName) {
    throw new Error("username is not found");
  }
  if (typeof userName !== "string") {
    throw new Error("username is not valid");
  }

  const user = await userModule.findOne({ user_name: userName });

  if (!user) {
    throw new Error("You are not registered in the system");
  }

  resultData.userId = user._id;

  /* Check password */
  if (!password) {
    throw new Error("password is not found");
  }
  if (typeof password !== "string") {
    throw new Error("Username is not valid");
  }
  resultData.password = password;

  return resultData;
};

module.exports = {
  register,
  login,
};
