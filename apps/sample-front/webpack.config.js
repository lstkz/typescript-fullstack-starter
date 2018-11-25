const makeWebpack = require('config/make-webpack');

const __PROD__ = process.env.NODE_ENV === 'production';

const webpackConfig = makeWebpack({
  dirname: __dirname,
  entry: ['./src/main.tsx'],
  devtool: __PROD__ ? 'nosources-source-map' : 'eval',
  title: 'Test',
});

module.exports = webpackConfig;
