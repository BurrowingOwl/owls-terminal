const User = require('../../model/user');

// _ 는 parent에서 return된 값. 여기서 필요없음.
// find관련 query는 promise가 아님!
function getUser(_, { _id }) {
  return User.findById(_id);
}

function getUsers() {
  return User.find({});
}

async function login(_, { username, password }) {
  const user = await User.findOne({ username });
  if (user && user.password === password) {
    return 'token'; // 임시 토큰.
  }
  throw new Error('올바른 아이디 또는 패스워드가 아닙니다.');
}

function signup(_, { username, password, name, isAuthorized = false, isAdmin = false }) {
  const user = {
    username,
    password,
    name,
    isAuthorized,
    isAdmin,
  };
  const newUser = new User(user);
  return newUser.save();
}
module.exports = {
  getUser,
  getUsers,
  login,
  signup,
};
