const postQuery = require('../../query/post');

function getPost(_, { _id }) {
  return postQuery.getPostById(_id);
}

async function getPosts(_, { filter }) {
  const { authorId, tabId, cursor } = filter;
  const limit = 12; // 일단 상수로.
  let query = {};
  let option = {};
  let newCursor;
  let isLast = true;
  if (cursor) {
    query = { ...query, created: { $lt: cursor } };
  }
  if (authorId) {
    query = { ...query, authorId };
  }
  if (tabId) {
    query = { ...query, tabId };
  }
  option = {
    limit,
    sort: { created: -1 },
  };
  const posts = await postQuery.getPostsByQuery(query, option);
  if (posts.length > 0) {
    newCursor = posts[posts.length - 1].created;
    isLast = false;
  }
  return {
    posts,
    isLast,
    cursor: newCursor,
  };
}

function createPost(_, post) {
  return postQuery.savePost(post);
}

module.exports = {
  getPost,
  getPosts,
  createPost,
};
