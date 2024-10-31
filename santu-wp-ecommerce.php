<?php

/*

Plugin Name: SantuCommerce

Plugin URI: http://santu.com/en/wordpress

Description: Add beautiful buy now buttons to your site with this powerful eCommerce plug-in, create an online store, sell from pictures, manage orders, customers and more.

Version: 1.0

Tested up to: 4.9.4

Author: Santu Pty Ltd

Author URI: http://www.santu.com/wordpress

Text Domain: santu

Domain Path: lang/

License: GPLv2 or later

License URI: http://www.gnu.org/licenses/gpl-2.0.html

*/

if(!defined('ABSPATH')){

	exit;  

}

define("SANTU_PLUGIN_DIR",plugin_dir_url(__FILE__));

define("SANTU_PLUGIN_PATH",plugin_dir_path(__FILE__));

define("SANTU_STORE_URL",get_option("santu_store_url"));



register_activation_hook(__FILE__, 'santu_plugin_activate');



/**

*	Function:	santu_plugin_activate

*

*	Description: add url into option just after Plugin activate

*/

function santu_plugin_activate(){

	$content	=	santu_retrieve_url_json();

	foreach($content as $key => $values){

		update_option($key,esc_url_raw($values));

	}

}



/**

*	Function:	santu_retrieve_url_json

*

*	Description: retrieve content from json file

*	@return: $array

*/

function santu_retrieve_url_json(){

	$json_file = file_get_contents(SANTU_PLUGIN_DIR.'/json/santu.json');

	return json_decode($json_file, true);

}



require_once('includes/init.php');

require_once('includes/modal.php');

require_once('includes/button-editor.php');

require_once('includes/santu-admin.php');

require_once('includes/tinymce.php');

require_once('includes/button-collection.php');

require_once('includes/button-collection-post-type.php');