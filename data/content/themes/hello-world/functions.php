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
	wp_enqueue_style( 'yo', get_stylesheet_uri() );
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
