// user/
//   id: String
//   username: String
//   password: String
//   name: String
//   isAuthorized: Boolean
//   isAdmin: Boolean

const typeDefs = `
type Query {
  user(_id: String!): User
  users(isAuthorized: Boolean): [User]
  post(_id: String!): Post
  posts(tabId: String, authorId: String): [Post]
  tab(_id: String!): Tab
  tabs(name: String): [Tab]
},
type User {
  _id: String
  username: String
  password: String
  name: String
  isAuthorized: Boolean
  isAdmin: Boolean
  posts: [Post]
}
type Post {
  _id: String
  title: String
  contents: String
  author: User
  created: String
  updated: String
  status: String
  tab: Tab
}
type Tab {
  _id: String
  name: String
}
type LoginData {
  user: User
  token: String
}
type Mutation {
  login(username: String!, password: String!): LoginData
  signup(username: String!, password: String!, name: String!, isAuthorized: Boolean, isAdmin: Boolean): User
  createPost(title: String!, contents: String!, authorId: String!, status: String, tabId: String): Post
  createTab(name: String!): Tab
  verify: LoginData
}
`;

module.exports = typeDefs;
