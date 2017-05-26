<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php echo esc_attr( get_bloginfo( 'charset' ) ); ?>">
		<link rel="profile" href="http://gmpg.org/xfn/11">
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>
		<div class="wrapper">
			<?php printf(
				'<img src="%s" alt="%s" />',
				esc_url( get_stylesheet_directory_uri() . '/wcdps2016-logo.png' ),
				esc_attr__( 'WordCamp Denpasar 2016 Logo', 'wpid' )
			); ?>
			<h1>Selamat Datang di Komunitas WordPress Indonesia!</h1>

			<div class="social-navigation">
				<ul id="menu-social" class="social-links-menu">
					<li><a href="https://github.com/wp-id" target="_blank"><svg class="icon icon-github" aria-hidden="true" role="img"> <use href="#icon-github" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-github"></use> </svg></a></li>
					<li><a href="https://www.facebook.com/groups/WordPressDevID/" target="_blank"><svg class="icon icon-facebook" aria-hidden="true" role="img"> <use href="#icon-facebook" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-facebook"></use> </svg></a></li>
					<li><a href="https://chat.wp-id.org" target="_blank"><svg class="icon icon-slack" aria-hidden="true" role="img"> <use href="#icon-slack" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-slack"></use> </svg></a></li>
				</ul>
			</div>
		</div>
		<?php wp_footer(); /* required */ ?>
	</body>
</html>
