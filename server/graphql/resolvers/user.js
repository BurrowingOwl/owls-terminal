const userQuery = require('../../query/user');
const authUtil = require('../../util/auth');

// _ 는 parent에서 return된 값. 여기서 필요없음.
// find관련 query는 promise가 아님!
// mongoose 문서 참고.

function getUser(_, { _id }) {
  return userQuery.getUserById(_id);
}

function getUsers() {
  return userQuery.getUsersByQuery({});
}

async function login(_, { username, password }) {
  const user = await userQuery.getUserByUsername(username);
  if (user && user.password === password) {
    const matchUser = {
      _id: user._id,
      username: user.username,
      name: user.name,
    };
    const token = authUtil.createJWToken({ payload: matchUser });
    return {
      user: matchUser,
      token, // 임시 토큰.
    };
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
  return userQuery.createUser(user);
}
module.exports = {
  getUser,
  getUsers,
  login,
  signup,
};
