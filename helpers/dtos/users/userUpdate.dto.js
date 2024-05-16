const { mongoose } = require("mongoose");
const handleError = require("../../error.service");
const userService = require("../../../modules/users/users.service");

const update = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.isValidObject(userId)) {
    return res.json(handleError("User id is not valid", 500, { userId }));
  }

  try {
    const user = await userService.getByUserName(userId);

    if (!user) {
      return res.json(handleError("User is not found", 500, {}));
    }

    const data = validateUpdateParams(req);

    const updatedUser = await userService.update(userId, data);

    return res.json(updatedUser);
  } catch (err) {
    return res.json(handleError(err.message, 500, err.name));
  }
};

const validateUpdateParams = (req) => {
  const { password, user_name, active } = req.body;

  const updateData = {};

  if (password) {
    if (password !== "string") {
      throw new Error("password is not valid");
    }
    updateData.password = password;
  }

  if (password) updateData.password = password;
  if (user_name) updateData.user_name = user_name;
  if (active) updateData.active = active;

  return updateData;
};

module.exports = {
  update,
};
