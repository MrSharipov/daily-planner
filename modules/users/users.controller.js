const userService = require("../../modules/users/users.service");
const {
  UserUpdateDto,
  IdCheckDto,
  handleError,
  UserCreatDto,
} = require("../../helpers");

const create = async (req, res) => {
  const { userName, password } = req.body;
  try {
    UserCreatDto(userName, password);

    const user = await userService.getByUserName(userName);

    if (user) {
      throw new Error("User has been already registered");
    }
    const newUser = await userService.create({ userName, password });

    return res.json(newUser);
  } catch (err) {
    console.error(err, "user.controller");
    return res.json(handleError(err.message, 500, err.name));
  }
};

const update = async (req, res) => {
  const { password, user_name, active } = req.body;
  const id = req.params.id;

  try {
    UserUpdateDto(id, user_name, password, active);

    const user = await userService.getById(id);

    if (!user) {
      return res.json(handleError("User is not found", 500, {}));
    }

    const updatedUser = await userService.update(id, {
      password,
      user_name,
      active,
    });

    return res.json(updatedUser);
  } catch (err) {
    return res.json(handleError(err.message, 500, err.name));
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    IdCheckDto(id);
    await userService.remove(id);
    return res.json({
      id,
      removed: true,
    });
  } catch (err) {
    console.log(err);
    return res.json(handleError(err.message, 500, err.name));
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    IdCheckDto(id);
    const user = await userService.getById(id);
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.json(handleError(err.message, 500, err.name));
  }
};

const getAll = async (req, res) => {
  const result = await userService.getAll();
  return res.json(result);
};

module.exports = {
  create,
  update,
  remove,
  getById,
  getAll,
};
