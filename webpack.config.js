const path = require('path');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const isProduction = process.env.NODE_ENV === 'production';
const isStaging = process.env.NODE_ENV === 'staging';

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    index: [
      './js/index.js',
      './scss/index.scss',
    ],
    // An "empty" bess.min.js file is created for this styles-only entry.
    // We remove it using:
    // https://github.com/fqborges/webpack-fix-style-only-entries
    bess: [
      './scss/bess.scss',
    ],
    dataservices: [
      './js/dataservices.js',
      './scss/dataservices.scss',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js'
  },
  devtool: isProduction || isStaging ? 'source-map' : 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].min.css',
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader?-url'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
    ],
  },
  plugins : [
    // See comment for `entry.bess` above.
    new FixStyleOnlyEntriesPlugin(),
  ],
};
