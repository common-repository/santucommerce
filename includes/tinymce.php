<?php
/*
* Block direct access.
*
* @since  1.0.0
*/
if(!defined('ABSPATH')){
	exit;
}

class Santu_Tinymce{
	public static function init(){
        $class = __CLASS__;
        new $class;
    }
	
	function __construct(){
		add_action('admin_head',array($this,'add_button'));
		add_action( 'wp_ajax_update_content_ajax', array($this,'update_content_ajax' ));
		add_action( 'wp_ajax_nopriv_update_content_ajax', array($this,'update_content_ajax' ));
	}
	
	function add_button(){
		global $typenow;
		#check user permissions
		if(!current_user_can('edit_posts') && !current_user_can('edit_pages')){
			return;
		}
		# verify the post type
		if(!in_array($typenow,array('post','page'))){
			return;
		}
		# check if WYSIWYG is enabled
		if(get_user_option('rich_editing')=='true'){
			add_filter('mce_external_plugins',array($this,'santu_add_tinymce_plugin_js'));
			add_filter('mce_buttons',array($this,'santu_register_button'));
		}
	}
	
	# Include Santu Tinymce Plugin in WP
	function santu_add_tinymce_plugin_js($plugin_array){
		$plugin_array['santu_button'] = SANTU_PLUGIN_DIR.'/js/santu-tinymce.js';
		return $plugin_array;
	}
	
	function santu_register_button($buttons){
		array_push($buttons,"santu_button");
		return $buttons;
	}
	
	function update_content_ajax(){
		if($_REQUEST){
			$pid		=	$_POST['pid'];
			$content	=	$_POST['content'];
			$my_post	=	array('ID'=>$pid,'post_content'=>$content);
			if(wp_update_post( $my_post )){
				$response	=	array(
					'response'	=>	1,
					'message'	=>	'Post Updated'
					);
			}
			else{
				$response	=	array(
					'response'	=>	0,
					'message'	=>	'Error'
				);
			}
			echo json_encode($response);
		}
		die();
	}

}
add_action('plugins_loaded',array('Santu_Tinymce','init'));