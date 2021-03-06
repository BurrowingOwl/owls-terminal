const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base');

module.exports = base({
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // https://webpack.js.org/configuration/devtool/#devtool 참고
  devServer: {
    contentBase: path.resolve(process.cwd(), 'dist'),
    historyApiFallback: true,
    inline: true,

    host: 'localhost', // Defaults to `localhost`
    port: 8080, // Defaults to 8080
    proxy: {
      '^/graphql/*': {
        target: 'http://localhost:4000/graphql/',
        secure: false,
      },
    },
  },
  babelOption: {
    // This is a feature of `babel-loader` for webpack (not Babel itself).
    // It enables caching results in ./node_modules/.cache/babel-loader/
    // directory for faster rebuilds.
    cacheDirectory: true,
    plugins: ['react-hot-loader/babel'],
  },
  entry: [
    // 'webpack-hot-middleware/client?reload=true', // 이거는 webpack-dev-middleware 용.
    // 'webpack/hot/dev-server', // 이거랑 밑에거는 --hot옵션을 줬기 때문에 자동으로 넣어줌.
    // 'webpack-dev-server/client?http://localhost:8080/',
    path.resolve(process.cwd(), 'src/index.js'),
  ],
  output: {
    publicPath: '/',
    filename: 'bundle.js',
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new HtmlWebpackPlugin({ // Create HTML file that includes references to bundled CSS and JS.
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true, // custom
    }),
    // new webpack.HotModuleReplacementPlugin(), // webpack-hot-loader를 위한 plugin
    // 이것도--hot옵션을 줬기 때문에 자동으로 넣어줌.
  ],
});
