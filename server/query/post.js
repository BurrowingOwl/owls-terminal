const Post = require('../model/post');

function getPostById(id) {
  return Post.findById(id);
}
function getPostsByAuthor(id) {
  return Post.find({ authorId: id });
}
function getPostsByQuery(query = {}) {
  return Post.find(query);
}

function savePost(post = {}) {
  const newPost = new Post(post);
  return newPost.save();
}

module.exports = {
  getPostById,
  getPostsByAuthor,
  getPostsByQuery,
  savePost,
};
