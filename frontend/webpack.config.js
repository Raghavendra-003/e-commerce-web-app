import path from 'path';
export default {
  entry: './src/index.js',
  output: { path: path.resolve('dist'), filename: 'bundle.js', publicPath: '/' },
  devServer: { static: './public', historyApiFallback: true, port: 3000 },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] }
    ]
  }
};