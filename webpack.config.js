const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  context: resolve(__dirname, 'src'),
  entry: [
    'react-hot-loader/patch',
    'react-hot-loader/babel',
    'webpack-hot-middleware/client',
    './index.jsx',
  ],
  output: {
    filename: 'build.js',
    path: '/',
    publicPath: '/javascripts',
  },
  // devServer: {
  //  hot: true,
  //  inline: true,
  //  contentBase: resolve(__dirname, ''),
  //  publicPath: '/javascripts',
  // },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|public\/)/,
        loader: 'babel-loader',
      },
    ],
  },
  optimization: {
    moduleIds: "named"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
