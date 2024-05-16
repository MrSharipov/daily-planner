const UserCreatDto = (userName, password) => {
  /* Check username */
  if (!userName) {
    throw new Error("username is not found");
  }
  if (typeof userName !== "string") {
    throw new Error("username is not valid");
  }

  /* Check password */
  if (!password) {
    throw new Error("password is not found");
  }
  if (typeof password !== "string") {
    throw new Error("password is not valid");
  }
};

module.exports = UserCreatDto;
