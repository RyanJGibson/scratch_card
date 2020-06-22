const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode : 'none', //production or none
	
	module: {
		rules: [
		  {
			test: /pixi_v5_1_6\.js$/,
			use: [ 'script-loader' ]
		  }
		]
	  },
			
	entry : './src/index.js',
	output : {
		filename : 'main.js',
		path : path.resolve(__dirname, 'dist'),
	}
};