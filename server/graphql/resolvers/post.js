const Post = require('../../model/post');

function getPost(_, { _id }) {
  return Post.findById(_id);
}

function getPosts(_, { tabId, authorId }) {
  if (tabId) {
    return Post.find({ tabId });
  }
  if (authorId) {
    return Post.find({ authorId });
  }
  return Post.find({});
}

function createPost(_, post) {
  const newPost = new Post(post);
  return newPost.save();
}

module.exports = {
  getPost,
  getPosts,
  createPost,
};
