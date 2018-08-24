const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const chalk = require('chalk'); // console에 색 입혀주는 라이브러리
const config = require('./config');
const schema = require('./graphql');
const middlewares = require('./middlewares');

mongoose.connect(config.dbUrl, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', () => console.error(chalk.bgRed('connection error:')));
db.once('open', () => console.log(chalk.yellow('DB Connected! 🔗')));

const app = express();

// middleware 설정. (cors, jwt)
// cors setting. 현재는 webpack-dev-server랑 이 node 서버랑 따로 임.
app.use(cors());
// graphiql은 graphql을 시각화해서 보여주는 툴.
// 개발용.
app.use('/graphql', middlewares.verify, graphqlHTTP(req => ({
  schema,
  graphiql: process.env.NODE_ENV !== 'production',
  context: {
    user: req.user, // middlewares.verify로 부터 반환된 값.
    token: req.token,
  },
})));

app.listen(config.port, () => {
  console.log(chalk.magenta(`Server is Listening on Port ${chalk.bgWhite.black(config.port)} 💻`));
});
