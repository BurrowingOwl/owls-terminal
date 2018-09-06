const postQuery = require('../../query/post');

function getPost(_, { _id }) {
  return postQuery.getPostById(_id);
}

function getPosts(_, { tabId, authorId, projection = {}, limit = 0, sort = { _id: -1 } }) {
  let query = {};
  let option = {};
  if (authorId) {
    query = { ...query, authorId };
  }
  if (tabId) {
    query = { ...query, tabId };
  }
  option = {
    projection,
    limit,
    sort,
  };
  return postQuery.getPostsByQuery(query, option);
}

function createPost(_, post) {
  return postQuery.savePost(post);
}

module.exports = {
  getPost,
  getPosts,
  createPost,
};
