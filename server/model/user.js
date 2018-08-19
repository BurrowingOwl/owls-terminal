const mongoose = require('mongoose');

// user/
//   username: String
//   password: String
//   name: String
//   isAuthorized: Boolean
//   isAdmin: Boolean

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isAuthorized: {
    type: Boolean,
    default: false,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
