var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var configDynamic = require('./list-dir-none-recursive');
var webpackPlugins = [];
webpackPlugins.push(new uglifyJsPlugin({
  compress: {
    warnings: false
  }
}));
console.info(configDynamic.htmlPluginArray);

configDynamic.htmlPluginArray.forEach(config => {
  webpackPlugins.push(new HtmlWebpackPlugin(config));
});
webpackPlugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'));
webpackPlugins.push(new ExtractTextPlugin('styles/styles.css', {
  publicPath: '/styles/',
  allChunks: true
}));


module.exports = {
  entry: Object.assign(configDynamic.entry, {
    vendor: ['vue']
  }),
  output: {
    path: 'built',
    filename: "[name].bundle.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
      { test: /\.json/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=81920&name=img/[name].[ext]' },
      {
        test: /common.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ]
  },
  plugins: webpackPlugins,
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.jsx']
  }
};
