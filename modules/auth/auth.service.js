const userService = require('../users/users.service')

const register = (data) => {
  // add some extra fields
const userData = {
  ...data,
  active: true,
}
  // create user
const newUser = userService.create(userData);

// create token

  return newUser;
}

module.exports = {
  register
}