const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
  entry: {
    app: './src/main.js',
    sw: './src/sw/index.js'
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader?data=@import './src/styles/variables.scss';"]
      },
      {
        test: /\.(eot|otf|svg|ttf|woff|woff2|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        type: 'javascript/auto',
        test: /\.json$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'file-loader',
          options: { name: '[name].[ext]' },
        }],
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '_build')
  }
};