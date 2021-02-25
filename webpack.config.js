const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('@babel/polyfill');

module.exports = {
  entry: ['@babel/polyfill', './src/index.jsx'],
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_module/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              modules: {
                auto: (resourcePath) => resourcePath.endsWith('export.scss'),
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, '/build'),
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      component: path.resolve(__dirname, 'component'),
    },
    extensions: ['.js', '.jsx'],
  },
};
