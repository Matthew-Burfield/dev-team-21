var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: ['./src/main']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
};