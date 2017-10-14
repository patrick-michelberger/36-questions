var path = require('path');

module.exports = {
	entry: './alexa/skill.js',
  output: {
	  filename: 'dist.js',
    path: path.join(__dirname, '/dist'),
    libraryTarget: 'commonjs'
  },

  devtool: 'source-map',

  resolve: {
	  extensions: ['.js', '.json']
  },

  target: 'node',
  externals: {'aws-sdk': 'aws-sdk'}

};