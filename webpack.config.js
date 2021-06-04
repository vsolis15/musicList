const { resolve } = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssOutputLocation = process.env.NODE_ENV === 'production' ? 
  'public/stylesheets/style-prod.css' :
  'stylesheets/style.css';

const jsProdOutput = {
  filename: 'public/javascripts/build-prod.js',
  path: resolve(__dirname),
  publicPath: '/',
}

const jsDevOutput = {
  filename: 'javascripts/build.js',
  path: '/',
  publicPath: '/',
}

const jsOutputLocation = process.env.NODE_ENV === 'production' ? jsProdOutput : jsDevOutput;

module.exports = {
  context: resolve(__dirname, 'src'),
  entry: [
    // 'react-hot-loader/patch',
    // 'react-hot-loader/babel',
    // 'webpack-hot-middleware/client',
    './index.jsx',
  ],
  output: jsOutputLocation,
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
        options: { presets: ['@babel/env', '@babel/react']},
      },
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          }, 
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
    ],
  },
  optimization: {
    moduleIds: "named"
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    // new ExtractTextPlugin('stylesheets/style.css'),
    new MiniCssExtractPlugin({
      filename: cssOutputLocation,
      // filename: 'stylesheets/style.css'
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  module.exports.optimization.minimize = true;
  module.exports.optimization.minimizer = [
    new TerserPlugin()
  ];
}
console.log("ENTRY");
console.log(module.exports.entry);
console.log("OPTIMIZATION");
console.log(module.exports.optimization);
console.log("OUTPUT");
console.log(module.exports.output);
console.log("CSS");
console.log(cssOutputLocation);

if (process.env.NODE_ENV !== 'production') {
  module.exports.entry.unshift(
    'react-hot-loader/patch',
    'react-hot-loader/babel',
    'webpack-hot-middleware/client',
  );
  module.exports.plugins.push(new webpack.HotModuleReplacementPlugin());
}

console.log("ENTRY");
console.log(module.exports.entry);
