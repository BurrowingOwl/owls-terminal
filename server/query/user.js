const User = require('../model/user');
const { mapKeysToValues } = require('../util/dataloader');
// _ 는 parent에서 return된 값. 여기서 필요없음.
// find관련 query는 promise가 아님!
function getUserById(id) {
  return User.findById(id);
}
async function getUsersByIds(ids) {
  const users = await User.find({ _id: ids });
  const mappedUsers = mapKeysToValues(ids, users, '_id');
  return mappedUsers;
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
  getUsersByIds,
  getUserByName,
  getUsersByQuery,
  createUser,
};
