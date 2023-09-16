const webpack = require("webpack");
const path = require("path");
const fs = require('node:fs');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'production',
  devtool: "eval-source-map",
  devServer: {
    https: {
      key: fs.readFileSync('server/cert/key.pem'),
      cert: fs.readFileSync('server/cert/cert.pem'),
      // ca: fs.readFileSync('server/cert/ca.pem'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml|fnt|wav)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(ttf|woff)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'src/assets/fonts/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      PROD: JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
};
