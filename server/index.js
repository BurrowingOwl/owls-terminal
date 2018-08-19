const express = require('express');
const express_graphql = require('express-graphql');
const mongoose = require('mongoose');
const chalk = require('chalk'); // console에 색 입혀주는 라이브러리
const config = require('./config');
const schema = require('./graphql');

mongoose.connect(config.dbUrl, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', () => console.error(chalk.bgRed('connection error:')));
db.once('open', () => console.log(chalk.yellow('DB Connected! 🔗')));

const app = express();

// graphiql은 graphql을 시각화해서 보여주는 툴.
// 개발용.
app.use('/graphql', express_graphql({
  schema,
  graphiql: process.env.NODE_ENV !== 'production',
}));

app.listen(config.port, () => {
  console.log(chalk.magenta(`Server is Listening on Port ${chalk.bgWhite.black(4000)} 💻`));
});