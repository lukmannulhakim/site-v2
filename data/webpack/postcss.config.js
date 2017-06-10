module.exports = {
	plugins: [
		require( 'postcss-easy-import' ),
		require( 'autoprefixer' )( {
			browserslist: [
				'> 5%',
				'last 2 versions',
				'IE >= 9'
			]
		} )
	]
}
