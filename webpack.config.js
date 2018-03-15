var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
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
  devServer: {
      contentBase: path.resolve(__dirname, "dist"),
      historyApiFallback: true // To enable direct access to route     
  },
  devtool: 'source-map',
};
