const userService = require("../users/users.service");
const authService = require("./auth.service");
const { UserCreatDto, LoginUserDto, handleError } = require("../../helpers");
const { generateToken } = require("../../middlewares/auth-middleware");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { userName, password } = req.body;
  try {
    //Validate input params
    UserCreatDto(userName, password);

    const token = await authService.register(userName, password);

    return res.status(201).send({ status: "OK", authToken: token });
  } catch (err) {
    return res.json(handleError(err.message, 500, err.name));
  }
};

const login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    LoginUserDto(userName, password);
    const user = await userService.getByUserName(userName);
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
    console.log(err);
    return res.json(handleError(err.message, 500, err.name));
  }
};

module.exports = {
  register,
  login,
};
