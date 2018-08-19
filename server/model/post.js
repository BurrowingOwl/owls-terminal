const mongoose = require('mongoose');

// post/
//   title: String
//   contents: String
//   author: ObjectID(user)
//   created: Date
//   updated: Date
//   status: String
//   tab: ObjectID(tab)

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  contents: {
    type: String,
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
  status: {
    type: String,
  },
  tabId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model('Post', postSchema);
