const auth = require('../util/auth');
const config = require('../config');

function verify(req, res, next) {
  if (req.headers && req.headers.Authorization) {
    auth.verifyToken(req.headers.Authorization, config.jwtSecret)
      .then(decoded => {
        req.decoded = decoded;
        next();
      })
      .catch(() => {
        req.decoded = null;
        next();
      });
  }
  req.decoded = 'bb';
  next();
}

module.exports = verify;
