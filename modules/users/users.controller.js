const errorHandle = require("../../helpers/error.service");
const userService = require("../../modules/users/users.service");
const UserCreatDto = require("../../helpers/dtos/users/users-create.dto");

const create = async (req, res) => {
  try {
    const data = UserCreatDto(req, res);
    return await userService.create(data);
  } catch (err) {
    return res.json(errorHandle(err.message, 500, err.name));
  }
};

module.exports = {
  create,
};
