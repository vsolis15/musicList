const { resolve } = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const nodeExternals = require('webpack-node-externals');
// const ReactRefreshWebpackPlugin = require('react-refresh-webpack-plugin');
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

const my_mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const prod_mode = 'production';

module.exports = {
  context: resolve(__dirname, 'src'),
  entry: [
    // 'react-hot-loader/patch',
    // 'react-hot-loader/babel',
    // 'webpack-hot-middleware/client',
    './index.jsx',
  ],
  // node: {
  //  Buffer: false,
  //  process: false,
  // },
  // target: 'web',
  //externalsPresets: { node: true },
  // externals: [
  //   nodeExternals({
  //     importType: 'umd',
  //     allowlist: [
  //       'react',
  //       'react-redux', 
  //       'reactstrap', 
  //       'webpack/hot/dev-server',
  //       'console-browserify',
  //       'util',
  //       'object-assign',
  //       'react-hot-loader',
  //       'prop-types',
  //       '@babel/runtime/helpers/*'
  //     ]
  //   }),
  // ],
  mode: my_mode,
  output: jsOutputLocation,
  // devServer: {
  //  hot: true,
  //  inline: true,
  //  contentBase: resolve(__dirname, ''),
  //  publicPath: '/javascripts',
  // },
  resolve: {
    extensions: ['.js', '.jsx'],
    // alias: {
    //   process: "process/browser"
    // },
    fallback: {
    //   "path": require.resolve("path-browserify"),
    //   "zlib": require.resolve("browserify-zlib"),
    "fs": false,
    //   "stream": require.resolve("stream-browserify"),
    //   "http": false,
    //   // require.resolve("stream-http"),
    "net": false,
    //   "buffer": require.resolve("buffer/"),
    //   "url": require.resolve("url/"),
    //   "util": require.resolve('util/'),
    //   "assert": require.resolve("assert/"),
    //   // "tls": false,
    //   // "https": false,
    //   "crypto": require.resolve('crypto-browserify'),
    //   //"crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
    },
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
    // moduleIds: "named"
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    // new ExtractTextPlugin('stylesheets/style.css'),
    new MiniCssExtractPlugin({
      filename: cssOutputLocation,
      // filename: 'stylesheets/style.css'
    }),
    new NodePolyfillPlugin(),
    //new ReactRefreshWebpackPlugin(),
    // new webpack.ProvidePlugin({
    //   process: 'process/browser',
    // }),
    // new webpack.EnvironmentPlugin({
    //   NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
    //   DEBUG: false,
    // }),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    //   'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
    // }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  module.exports.optimization.minimize = true;
  module.exports.optimization.minimizer = [
    new TerserPlugin()
  ];
}
// console.log("ENTRY");
// console.log(module.exports.entry);
// console.log("OPTIMIZATION");
// console.log(module.exports.optimization);
// console.log("OUTPUT");
// console.log(module.exports.output);
// console.log("CSS");
// console.log(cssOutputLocation);

// if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
//   const runtime = require('react-refresh/runtime');
//   runtime.injectIntoGlobalHook(window);
//   window.$RefreshReg$ = () => {};
//   window.$RefreshSig$ = () => type => type;
// }

if (process.env.NODE_ENV !== 'production') {
  module.exports.entry.unshift(
    'react-hot-loader/patch',
    'react-hot-loader/babel',
    'webpack-hot-middleware/client',
  );
  module.exports.plugins.push(new webpack.HotModuleReplacementPlugin());
}


// console.log("ENTRY");
// console.log(module.exports.entry);
