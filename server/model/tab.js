const mongoose = require('mongoose');

// post/
//   title: String
//   contents: String
//   author: ObjectID(user)
//   created: Date
//   updated: Date
//   status: String
//   tab: ObjectID(tab)

const tabSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Tab', tabSchema);
