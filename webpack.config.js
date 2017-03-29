const path = require('path');
const config = require('./gulp.config.js')();
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

console.log('[NODE_ENV] is', process.env.NODE_ENV);

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    main: config.path.src + config.dir.app + config.entry.main,
  },
  output: {
    publicPath: path.resolve(__dirname, `${config.path.dev}`),
    path: path.resolve(__dirname, `${config.path.dev + config.dir.js}`),
    filename: (process.env.NODE_ENV === 'development') ? '[name].bundle.js' : '[name].min.js',
    pathinfo: false,
    library: '[name]',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: ['awesome-typescript-loader'],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.html$/,
        loader: ['ng-cache-loader'],
      },
    ],
  },

  /**Resolve modules*/
  resolve: {
    modules: [
      'node_modules',
      'bower_components',
      path.resolve(__dirname, `${config.path.src + config.dir.app}`),
      path.resolve(__dirname, `${config.path.dev}`),
    ],
    descriptionFiles: ['package.json', 'bower.json'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },

  /**Watch options*/
  watch: process.env.NODE_ENV === 'development',
  watchOptions: {
    poll: 500,
    aggregateTimeout: 300,
    ignored: ['node_modules', 'bower_components'],
  },

  /**Development options*/
  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : false,

  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ],

};
