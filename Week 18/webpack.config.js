const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack'); //to access built-in plugins
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/main.js',
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', options: { presets: ['env'] } },
      { test: /\.vue$/, use: 'vue-loader' },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "src/*.html", to: "[name][ext]" }
      ],
    }),
  ],
};
