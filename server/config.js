// default config file
// DB 이름 owlsTerm.
const { PORT } = process.env;
module.exports = {
  dbUrl: 'mongodb://localhost:27017/owlsTerm',
  port: PORT || 4000,
};
