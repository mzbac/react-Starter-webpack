const path = require('path');
const cssnext = require('postcss-cssnext');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /(\.scss|\.css)$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass',
        include: path.resolve(__dirname, '../')
      },
      {
        test: /(\.js|\.jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
      }
    ],
  },
  plugins: [],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },
  postcss: [autoprefixer],
};
