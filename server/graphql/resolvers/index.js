const DataLoader = require('dataloader');

const userResolver = require('./user');
const postResolver = require('./post');
const tabResolver = require('./tab');

const userQuery = require('../../query/user');
const postQuery = require('../../query/post');
const tabQuery = require('../../query/tab');

// n+1문제를 해결해줌.
// 하지만, 해줘야할 작업이 있음.
// query/tab 참고.
// root의 context에 넣는 것도 방법.
const TabsLoader = new DataLoader(tabQuery.getTabsByIds);
const UsersLoader = new DataLoader(userQuery.getUsersByIds);
const PostsLoader = new DataLoader(postQuery.getPostsByIds);

// 단순 Query에서도 dataloader가 필요한지는 생각해 봐야함.
// Query에 있는 user,post,tab을 여러번 부를일이 있나?
// 써서 나쁠건 없을듯.
const resolvers = {
  Query: {
    user: (_, { _id }) => UsersLoader.load(_id),
    users: userResolver.getUsers,
    post: (_, { _id }) => PostsLoader.load(_id),
    posts: postResolver.getPosts,
    tab: (_, { _id }) => TabsLoader.load(_id),
    tabs: tabResolver.getTabs,
  },
  // User를 가져올 때 posts 필드에 Post 타입의 데이터를 가져올 수 있도록 함.
  // Post 타입은 typeDefs에 정해져 있고, 그에 따라 title, contents를 바로 가져올 수 있음
  // 밑에 Post에서도 마찬가지.
  User: {
    posts: (root) => postQuery.getPostsByAuthor(root._id),
  },
  Post: {
    author: (root) => UsersLoader.load(root.authorId),
    tab: (root) => TabsLoader.load(root.tabId),
  },
  Mutation: {
    login: userResolver.login,
    signup: userResolver.signup,
    createPost: postResolver.createPost,
    createTab: tabResolver.createTab,
  },
};

module.exports = resolvers;
