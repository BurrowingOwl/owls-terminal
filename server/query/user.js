const User = require('../model/user');

// _ 는 parent에서 return된 값. 여기서 필요없음.
// find관련 query는 promise가 아님!
function getUserById(id) {
  return User.findById(id);
}
function getUserByName(name) {
  return User.findOne(name);
}
function getUsersByQuery(query = {}) {
  return User.find(query);
}
function createUser(user) {
  const newUser = new User(user);
  return newUser.save();
}
module.exports = {
  getUserById,
  getUserByName,
  getUsersByQuery,
  createUser,
};
