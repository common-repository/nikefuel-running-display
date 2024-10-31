<?php
/*
Plugin Name: Nike Fuel Running Display
Plugin URI: http://www.scottmacarthurritter.com
Description: A little gizmo to display your NikeFuel Runs in pages and posts!
Version: 0.9
Author: Scott Ritter
Author URI: http://www.scottmacarthurritter.com
License: GPL2
*/
/*
Copyright 2014  Scott Ritter  (email : scottmacarthurritter@gmail.com)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License, version 2, as 
published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

include( plugin_dir_path( __FILE__ ) . 'nike.php');
include( plugin_dir_path( __FILE__ ) . 'shortcode.php');
include( plugin_dir_path( __FILE__ ) . 'functions.php');
include( plugin_dir_path( __FILE__ ) . 'options.php');
function add_header_files()
{
	wp_enqueue_script( 'jquery' );

	wp_register_script( 'fuel-script', plugins_url( '/fuelDisplay.js', __FILE__ ) );
	wp_enqueue_script( 'fuel-script' );

	wp_register_script( 'custom-script', plugins_url( '/percentageLoader/jquery.percentageloader-0.1.js', __FILE__ ) );
	wp_enqueue_script( 'custom-script' );

	wp_register_style( 'custom-style', plugins_url( '/fuelCircle.css', __FILE__ ), array(), '20120208', 'all' );
	wp_enqueue_style( 'custom-style' );

}
add_action( 'wp_enqueue_scripts', 'add_header_files' );


/**
function register_my_setting() {
	register_setting( 'nikeFuel', 'Username', 'intval' ); 
	register_setting( 'nikeFuel', 'Password', 'intval' ); 
} 
add_action( 'admin_init', 'register_my_setting' );

function nike_pluginMenu() {
	add_options_page( 'NikeFuelRunningDisplay', 'Nike Fuel Running Display', 'manage_options', 'nikefuelrunning', 'my_plugin_options' );
}

add_action( 'admin_menu', 'nike_pluginMenu' );

function my_plugin_options() {
	if ( !current_user_can( 'manage_options' ) )  {
		wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
	}
	echo '<div class="wrap">
	<h2>Nike Fuel Running Page</h2>
	<form method="post" action="options.php">'.
		settings_fields( 'nikeFuel' ).do_settings_sections( 'nikeFuel' ).'
	Nike Fuel Username: <input type="NikeUsername" /><br/>
	Nike Fuel Password: <input type="NikePassword" />
	';
	echo submit_button().'</form></div>';
}

**/
?>