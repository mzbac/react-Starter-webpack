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
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
    }],
  },
  plugins: [

  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },
};
