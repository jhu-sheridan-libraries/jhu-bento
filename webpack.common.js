const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
        {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader?modules',
            include: /flexboxgrid/
        },
        {
            test: /\.scss$/,
            include: path.resolve(__dirname, 'src'),
            loaders: ['style-loader', 'css-loader', 'sass-loader'],
        }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(['public/bundle.js', 'public/bundle.js.map'])
  ],
};
