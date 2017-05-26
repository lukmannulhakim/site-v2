<?php

/**
 * Plugin Name: Dashboard Column Options
 * Description: Bring back dashboard columns options that's removed in 3.8
 * Version: 0.1
 * Plugin URI: http://wordpress.stackexchange.com/questions/126301/wordpress-3-8-dashboard-1-column-screen-options/126307#126307
 * Author: ocean90, Dzikri Aziz
 * Author URI: http://kucrut.org
 */
function _kcmu_dashboard_column_options() {
	add_screen_option(
		'layout_columns',
		array(
			'max'     => 4,
			'default' => 2,
		)
	);
}
add_action( 'load-index.php', '_kcmu_dashboard_column_options' );
