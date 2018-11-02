module.exports = {
	devServer: {
		disableHostCheck: true
	},
	css: {
		extract: false,
    loaderOptions: {
      css: {
        // options here will be passed to css-loader
      },
      postcss: {
				// parser: 'sugarss',
			  // plugins: {
			  //   'postcss-import': {},
			  //   'postcss-custom-properties': {
			  //   	preserve: true
			  //   },
			  //   'autoprefixer': {},
			  //   'postcss-preset-env': {},
			  //   'cssnano': {}
			  // }
      }
    }
  }
}
