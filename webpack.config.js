const path = require('path');
// const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: {
    app: ['./src/main'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/assets/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env',
              ['es2015', { modules: false, loose: true }],
            ],
          },
        },
      },
    ],
  },
};
