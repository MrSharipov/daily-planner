const authService = require("./auth.service");

const register = (req, res) => {
  // validate req.body

  const result = authService.register(req.body);
  return res.send(result);
}

const login = (req, res) => {
  return res.send(req.body);
}


module.exports = {
  register,
  login
}