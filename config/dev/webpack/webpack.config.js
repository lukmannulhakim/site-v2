const path = require( 'path' );
const webpack = require( 'webpack' );
const merge = require( 'webpack-merge' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const projectConfig = require( './project.config.js' );

module.exports = function ( env ) {
	const isDev = env === 'development';

	let config = merge({
		output: {
			path: __dirname,
			// The filename of the entry chunk as relative path inside the output.path directory.
			filename: '[name].js'
		},
		devtool: isDev ? 'source-map' : 'hidden-source-map',
		resolve: { extensions: [ '.js', '.jsx', '.css', '.scss' ] },
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
		]
	}, projectConfig.common );

	if ( isDev ) {
		config = merge( config, {
			module: {
				rules: [{
					test: /\.s?css$/,
					use: [
						{ loader: 'style-loader' },
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: { outputStyle: 'nested' }
						},
						{ loader: 'postcss-loader' }
					]
				}]
			},
			devServer: {
				host: 'webpack',
				port: 3000,
				publicPath: '/webpack/',
				inline: true,
				hot: false,
				watchOptions: { poll: true }
			},
			performance: {
				maxAssetSize: 1000000, // 1 mB.
				maxEntrypointSize: 1000000
			}
		}, projectConfig.dev );
	} else {
		config = merge( config, {
			module: {
				rules: [{
					test: /\.s?css$/,
					loader: ExtractTextPlugin.extract({
						use: [
							{
								loader: 'css-loader',
								options: {
									importLoaders: 1,
									sourceMap: true
								}
							},
							{
								loader: 'sass-loader',
								options: { outputStyle: 'compressed' }
							},
							{ loader: 'postcss-loader' }
						]
					})
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
					comments: false,
					debug: true
				})
			]
		}, projectConfig.prod );
	}

	return config;
};
