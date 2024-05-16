const errorHandle = require("../../helpers/error.service");
const userService = require("../../modules/users/users.service");
const UserCreatDto = require("../../helpers/dtos/users/users-create.dto");
const handleError = require("../../helpers/error.service");
const {UserUpdateDto} = require("../../helpers/dtos/users/userUpdate.dto");

const create = async (req, res) => {
  try {
    const data = UserCreatDto(req, res);
    return await userService.create(data);
  } catch (err) {
    return res.json(errorHandle(err.message, 500, err.name));
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


    const updatedUser = await userService.update(id, {password, user_name, active});

    return res.json(updatedUser);
  } catch (err) {
    return res.json(handleError(err.message, 500, err.name));
  }
};

module.exports = {
  create,
  update
};
