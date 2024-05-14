const errorHandle = require("../../helpers/error.service");
const userService = require("../../modules/users/users.service");

const create = async (req, res) => {
  try {
    return await userService.create(req.body);
  } catch (err) {
    return res.json(errorHandle(err.message, 500, err.name));
  }
};

module.exports = {
  create,
};
