const jwt = require("jsonwebtoken");

const generateToken = async (id) => {
  return await jwt.sign({ id }, process.env.AUTH_SECRET, { expiresIn: "1h" });
};

const getAuthorization = async(req, res, next);

// Write a middleware function to defend routes
// your code...

const verifyToken = async (token) => {
  return await jwt.verify(token, "secret");
};

module.exports = {
  generateToken,
};
