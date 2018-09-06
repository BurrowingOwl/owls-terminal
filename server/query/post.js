const Post = require('../model/post');
const { mapKeysToValues } = require('../util/dataloader');

function getPostById(id) {
  return Post.findById(id);
}
async function getPostsByIds(ids) {
  const posts = await Post.find({ _id: ids });
  const mappedPosts = mapKeysToValues(ids, posts, '_id');
  return mappedPosts;
}
function getPostsByAuthor(id) {
  return Post.find({ authorId: id });
}
function getPostsByQuery(query = {}, option = {}) {
  const { projection, limit, sort } = option;
  return Post.find(query, projection)
    .limit(limit)
    .sort(sort);
}

function savePost(post = {}) {
  const newPost = new Post(post);
  return newPost.save();
}

module.exports = {
  getPostById,
  getPostsByIds,
  getPostsByAuthor,
  getPostsByQuery,
  savePost,
};
