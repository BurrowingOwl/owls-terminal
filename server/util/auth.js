const jwt = require('jsonwebtoken');
const config = require('../config');

function createJWToken({ data = {}, maxAge = 3600 }) {
  const token = jwt.sign(
    data,
    config.jwtSecret,
    {
      expiresIn: maxAge,
      algorithm: 'HS256',
    },
  );
  return token;
}
function verifyJWToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err || !decoded) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
}

module.exports = {
  createJWToken,
  verifyJWToken,
};
