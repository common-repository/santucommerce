<?php
/*
* Block direct access.
*
* @since  1.0.0
*/
if(!defined('ABSPATH')){
	exit;
}

/*
* Santu My Collection Button
* Custom Post Type to store custom button
*
* @since 1.0.0
*/
class Santu_Collection_Post_Type{
	public static function init(){
        $class = __CLASS__;
        new $class;
    }
	
	function __construct(){
		add_action('init',array($this,'santu_button_post'),0);
	}
	
	function santu_button_post() {
		$labels = array(
			'name'                  => _x( 'Santu Button', 'Post Type General Name', 'santu' ),
			'singular_name'         => _x( 'Santu Button', 'Post Type Singular Name', 'santu' ),
			'menu_name'             => __( 'Santu Button', 'santu' ),
			'name_admin_bar'        => __( 'Santu Button', 'santu' ),
			'archives'              => __( 'Item Archives', 'santu' ),
			'attributes'            => __( 'Item Attributes', 'santu' ),
			'parent_item_colon'     => __( 'Parent Item:', 'santu' ),
			'all_items'             => __( 'All Items', 'santu' ),
			'add_new_item'          => __( 'Add New Item', 'santu' ),
			'add_new'               => __( 'Add New', 'santu' ),
			'new_item'              => __( 'New Item', 'santu' ),
			'edit_item'             => __( 'Edit Item', 'santu' ),
			'update_item'           => __( 'Update Item', 'santu' ),
			'view_item'             => __( 'View Item', 'santu' ),
			'view_items'            => __( 'View Items', 'santu' ),
			'search_items'          => __( 'Search Item', 'santu' ),
			'not_found'             => __( 'Not found', 'santu' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'santu' ),
			'featured_image'        => __( 'Featured Image', 'santu' ),
			'set_featured_image'    => __( 'Set featured image', 'santu' ),
			'remove_featured_image' => __( 'Remove featured image', 'santu' ),
			'use_featured_image'    => __( 'Use as featured image', 'santu' ),
			'insert_into_item'      => __( 'Insert into item', 'santu' ),
			'uploaded_to_this_item' => __( 'Uploaded to this item', 'santu' ),
			'items_list'            => __( 'Items list', 'santu' ),
			'items_list_navigation' => __( 'Items list navigation', 'santu' ),
			'filter_items_list'     => __( 'Filter items list', 'santu' ),
		);
		$args = array(
			'label'                 => __( 'Santu Button', 'santu' ),
			'description'           => __( 'Post Type Description', 'santu' ),
			'labels'                => $labels,
			'supports'              => array( 'title', 'editor', 'custom-fields', ),
			'hierarchical'          => false,
			'public'                => true,
			'show_ui'               => false,
			'show_in_menu'          => false,
			'menu_position'         => 5,
			'show_in_admin_bar'     => false,
			'show_in_nav_menus'     => false,
			'can_export'            => true,
			'has_archive'           => false,
			'exclude_from_search'   => false,
			'publicly_queryable'    => true,
			'capability_type'       => 'post',
		);
		register_post_type('santu_button',$args);
	}
	
}
add_action('plugins_loaded',array('Santu_Collection_Post_Type','init'));