module.exports = {
	common: {
		entry: {
			'themes/hello-world/assets/theme': './themes/hello-world/assets/src/js/index.js'
		}
	},
	dev: {
		devServer: {
			public: 'wp-id.local'
		}
	},
	prod: {}
};
