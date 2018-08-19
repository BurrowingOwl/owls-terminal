const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// typeDefs는 타입에 대한 명시.
// resolvers는 명시된 타입에 대한 실제 행동.(함수)
// 둘이 맞지 않으면 에러남.
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
