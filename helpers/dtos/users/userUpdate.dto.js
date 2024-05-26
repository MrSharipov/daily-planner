const { isDocumentId } = require("../../global-fn");
const UserUpdateDto = (id, user_name, password, active) => {
  if (!id) {
    throw new Error("id is not found");
  }

  if (!isDocumentId(id)) {
    throw new Error("id is not valid");
  }
  if (password) {
    if (typeof password !== "string") {
      throw new Error("password is not valid");
    }
  }

  if (user_name) {
    if (typeof user_name !== "string") {
      throw new Error("user_name is not valid");
    }
  }

  if (active) {
    if (typeof active !== "boolean") {
      throw new Error("active is not valid");
    }
  }
};

module.exports = UserUpdateDto;
