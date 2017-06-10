<?php

/**
 * Setup theme
 */
function wpid_setup() {
	add_theme_support( 'title-tag' );
}
add_action( 'after_setup_theme', 'wpid_setup' );

/**
 * Enqueue scripts and styles.
 */
function wpid_enqueue_assets() {
	$assets_dir_url = get_template_directory_uri();

	if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
		// When we're in dev mode, the stylesheet will be loaded by webpack dev
		// server, hence we load its script here.
		$assets_dir_url = str_replace( content_url(), home_url( 'webpack' ), $assets_dir_url );
		wp_enqueue_script( 'theme', "${assets_dir_url}/assets/theme.js", false, null, true );
	} else {
		// In production, we don't load webpack dev server's script and only load
		// the theme's stylesheet instead.
		wp_enqueue_style( 'theme', "${assets_dir_url}/assets/theme.css", false, null );
	}
}
add_action( 'wp_enqueue_scripts', 'wpid_enqueue_assets' );


/**
 * Add SVG definitions to the footer.
 */
function wpid_include_svg_icons() {
	// Define SVG sprite file.
	$svg_icons = get_parent_theme_file_path( '/assets/images/svg-icons.svg' );

	// If it exists, include it.
	if ( file_exists( $svg_icons ) ) {
		require_once( $svg_icons );
	}
}
add_action( 'wp_footer', 'wpid_include_svg_icons', 9999 );
