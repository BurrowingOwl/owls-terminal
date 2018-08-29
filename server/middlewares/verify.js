const auth = require('../util/auth');
const { getUserById } = require('../query/user');
const config = require('../config');

function verify(req, res, next) {
  const authFail = () => {
    req.user = null;
    req.token = null;
    next();
  };
  if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    return authFail();
  }
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return authFail();
  }
  auth.verifyJWToken(token, config.jwtSecret)
    .then(decoded => {
      getUserById(decoded._id)
        .then((user) => {
          if (!user) {
            req.user = null;
            return authFail();
          }
          req.user = user;
          req.token = token;
          next();
        });
    })
    .catch(authFail);
}

module.exports = verify;
