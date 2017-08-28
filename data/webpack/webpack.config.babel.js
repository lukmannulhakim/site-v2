const path = require( 'path' );
const webpack = require( 'webpack' );
const merge = require( 'webpack-merge' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

module.exports = function ( env ) {
	const isDev = env === 'development';

	let config = {
		output: {
			path: __dirname,
			// The filename of the entry chunk as relative path inside the output.path directory.
			filename: '[name].js'
		},
		devtool: isDev ? 'source-map' : 'hidden-source-map',
		resolve: { extensions: [ '.js', '.css' ] },
		module: {
			rules: [{
				test: /\.js$/,
				loader: 'babel-loader',
				query: { presets: [ [ 'es2015', { modules: false }] ] },
				exclude: path.resolve( __dirname, '/node_modules/' )
			}, {
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
				loader: 'url-loader',
				query: {
					name: '[name].[ext]',
					limit: 10000
				}
			}]
		},
		performance: {
			assetFilter: assetFilename => {
				return ! ( /\.map$/.test( assetFilename ) );
			}
		},
		plugins: [
			new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify( env ) })
		],
		entry: {
			'themes/hello-world/assets/theme': './themes/hello-world/assets/src/js/index.js'
		}
	};

	if ( isDev ) {
		config = merge( config, {
			module: {
				rules: [{
					test: /\.css$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								sourceMap: true
							}
						},
						'postcss-loader'
					]
				}]
			},
			devServer: {
				host: 'webpack',
				port: 3000,
				public: 'wp-id.local',
				publicPath: '/webpack/',
				inline: true,
				hot: false,
				watchOptions: { poll: true }
			},
			performance: {
				maxAssetSize: 1000000, // 1 mB.
				maxEntrypointSize: 1000000
			}
		});
	} else {
		config = merge( config, {
			module: {
				rules: [{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract({ use: 'css-loader?sourceMap!postcss-loader' })
				}]
			},
			plugins: [
				new ExtractTextPlugin( '[name].css' ),
				new webpack.LoaderOptionsPlugin({
					minimize: true,
					debug: false
				}),
				new webpack.optimize.UglifyJsPlugin({
					beautify: false,
					mangle: {
						screw_ie8: true,
						keep_fnames: true
					},
					compress: { screw_ie8: true },
					comments: false
				})
			]
		});
	}

	return config;
};
