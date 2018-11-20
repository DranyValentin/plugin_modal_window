const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
  	app: './src/index.js'
  },
  devtool: 'source-map',
  devServer: {
  	hot: true,
    contentBase: './dist'
  },
  plugins: [
  	new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
  	rules: [
  		{
  			test: /\.scss$/,
  			use: [
  				'style-loader',
  				'css-loader',
  				"sass-loader"
  			]
  		},
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      }
  	]
  }
};