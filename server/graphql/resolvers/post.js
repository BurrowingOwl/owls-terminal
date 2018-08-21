const postQuery = require('../../query/post');

function getPost(_, { _id }) {
  return postQuery.getPostById(_id);
}

function getPosts(_, { tabId, authorId }) {
  let query = {};
  if (authorId) {
    query = { ...query, authorId };
  }
  if (tabId) {
    query = { ...query, tabId };
  }
  return postQuery.getPostsByQuery(query);
}

function createPost(_, post) {
  return postQuery.savePost(post);
}

module.exports = {
  getPost,
  getPosts,
  createPost,
};
