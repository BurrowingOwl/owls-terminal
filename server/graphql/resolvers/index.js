const userResolver = require('./user');
const postResolver = require('./post');
const tabResolver = require('./tab');

const resolvers = {
  Query: {
    user: userResolver.getUser,
    users: userResolver.getUsers,
    post: postResolver.getPost,
    posts: postResolver.getPosts,
    tab: tabResolver.getTab,
    tabs: tabResolver.getTabs,
  },
  // User를 가져올 때 posts 필드에 Post 타입의 데이터를 가져올 수 있도록 함.
  // Post 타입은 typeDefs에 정해져 있고, 그에 따라 title, contents를 바로 가져올 수 있음
  // 밑에 Post에서도 마찬가지.
  User: {
    posts: (root) => postResolver.getPosts(null, { authorId: root._id }),
  },
  Post: {
    author: (root) => userResolver.getUser(null, { _id: root.authorId }),
    tab: (root) => tabResolver.getTab(null, { _id: root.tabId }),
  },
  Mutation: {
    login: userResolver.login,
    signup: userResolver.signup,
    createPost: postResolver.createPost,
    createTab: tabResolver.createTab,
  },
};

module.exports = resolvers;
