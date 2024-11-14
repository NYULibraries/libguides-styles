const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const isStaging = process.env.NODE_ENV === 'staging';

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    index: [
      './js/index.js',
      './scss/index.scss',
    ],
    dataservices: [
      './js/dataservices.js',
      './scss/dataservices.scss',
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    clean: true,
  },
  devtool: isProduction || isStaging ? 'source-map' : 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
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
          'extract-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                quietDeps: true,
              },
            }
          }
        ]
      },
    ],
  },
  watch: true,
};
