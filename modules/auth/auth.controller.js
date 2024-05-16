const userService = require("../users/users.service");
const errorHandle = require("../../helpers/error.service");
const authService = require("./auth.service");
const UserCreatDto = require("../../helpers/dtos/users/users-create.dto");
const LoginUserDto = require("../../helpers/dtos/auth/login-user.dto");
const { generateToken } = require("../../middlewares/auth-middleware");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    //Validate input params
    const data = await UserCreatDto(req, res);

    const token = await authService.register(data);

    return res.status(201).send({ status: "OK", authToken: token });
  } catch (err) {
    return res.json(errorHandle(err.message, 500, err.name));
  }
};

const login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    LoginUserDto(userName, password);
    const user = await userService.getByUserName({ user_name: userName });
    if (!user) {
      throw new Error("You are not registered in the system");
    }

    // check password: password in payload === password of user in DB
    //your code...

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password  " });
    }

    const token = await generateToken(user._id); // The problem was in async and await

    return res.status(201).send({ status: "OK", authToken: token });
  } catch (err) {
    return res.json(errorHandle(err.message, 500, err.name));
  }
};

module.exports = {
  register,
  login,
};
