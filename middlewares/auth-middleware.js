const jwt = require("jsonwebtoken");

const generateToken = async (id) => {
  return await jwt.sign({id}, process.env.AUTH_SECRET, {expiresIn: "1h"});
};

// Write a middleware function to defend routes
// your code...

module.exports = {
  generateToken,
};
