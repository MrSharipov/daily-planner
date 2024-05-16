const jwt = require("jsonwebtoken");

const generateToken = async (id) => {
  return await jwt.sign({ id }, "secret", { expiresIn: "1h" });
};

module.exports = {
  generateToken,
};
