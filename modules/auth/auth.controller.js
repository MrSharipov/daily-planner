const authService = require("./auth.service");

const register = (req, res) => {
  // validate req.body

  const result = authService.register(req.body);
  return res.send(result);
}


module.exports = {
  register
}