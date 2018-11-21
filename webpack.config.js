const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: 
  	{app: ['./src/popup.js',
     './src/scss/style.scss']
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
          {
            loader: "file-loader",
            options: {
              name: 'css/[name].css'
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: "sass-loader",
          }
  			]
  		},
      { 
        test: /\.js$/, 
        use: [
          {
            loader: "file-loader",
            options: {
              name: 'js/[name].js'
            }
          }
        ]
      }
  	]
  }
};