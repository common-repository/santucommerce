<?php
/**
* Block direct access.
* @since  1.0.0*/
if(!defined('ABSPATH')){
	exit;
}

/** CLASS: Santu Modal Box*
* Description: Custom HTML/CSS for modal box show in when TinyMCE button
* clicked, this class contain all model box including button editor.
* @author: CodeFLox
* @copyright: Copyright 2017. All rights reserved
* @since: 1.0.0
* @tested_up_to: 4.9.4
*/
class Santu_Admin{
	public static function init(){
		$class = __CLASS__;
		new $class;
	}
	
	function __construct(){
		add_action('admin_menu',array($this,'add_menu_page'));
		add_action('wp_ajax_santu_settings_save_ajax',array($this,'santu_settings_save_ajax'));
		add_action('wp_ajax_nopriv_santu_settings_save_ajax',array($this,'santu_settings_save_ajax'));
		add_action('admin_head',array($this,'admin_js'));
	}
	
	function add_menu_page(){
		add_menu_page(__('SantuCommerce','santu'),__('SantuCommerce','santu'),'administrator','santu',array($this,'admin_page'),SANTU_PLUGIN_DIR.'img/i16.png');
	}
	
	function admin_page(){
		$signup_url=	get_option("santu_signup_url",false);
		$show_help	=	get_option("santu_show_help",false);
		?>
		<h1><?php echo __('SantuCommerce API Settings','santu'); ?></h1>
		<div class="wrap">
			<div class="card pressthis" style="float:left;width:45%;text-align:center">
				<img src="<?php echo SANTU_PLUGIN_DIR; ?>img/373x70.png"/>
				<h2><?php echo __('Enter your Store Address','santu'); ?></h2>
				<p>
					<input type="text" id="santuStoreURL" name="santuStoreURL" value="<?php echo get_option('santu_store_url'); ?>">
					<a href="javascript:void(0)" class="button button-primary st_save_store_url">
						<?php echo __('Save','santu'); ?>
					</a>
				</p>
				<h3 style="text-transform: lowercase"><?php echo __('Or','santu'); ?></h3>
				<?php
				echo'<p>'. __('<a target="new" href="'.$signup_url.'" style="padding: 8px 35px;font-size: 20px;font-weight: 700;text-decoration: none;color: #fff;background: #1fb118;">Get your free store address now !</a>','santu').'</p>';
				echo '<h4>Help, '.__('<a target="new" href="'.$show_help.'">show me how this works !</a>','santu').'</h4>'; ?>
			</div>
		</div>
		<?php
	}
	
	function admin_js(){
	?>
	<script type="text/javascript">
		var santuStoreURL	='<?php echo esc_url(SANTU_STORE_URL); ?>';
		jQuery(document).ready(function(){(function($){
			$('.st_save_store_url').click(function(){
				surl	=	$('#santuStoreURL').val();
				if(surl){
					if(cf_is_valid_URL(surl)){
						$.ajax({
							type:"POST",url:ajaxurl,data:{'action':'santu_settings_save_ajax','act':'store_url','surl':surl},
							success:function(data){
								var res		=	$.parseJSON(data);
								if(res.response == 1){alert(res.message);}
							}
						})
					}
					else{alert('<?php echo __('Invalid URL','santu'); ?>');}
				}
				else{alert('<?php echo __('Please add your store URL','santu'); ?>');}
			});
		}(jQuery))});</script>
		<?php
	}
	
	function santu_settings_save_ajax(){
		if(isset($_REQUEST)){
			$act	=	sanitize_text_field($_REQUEST['act']);
			$surl 	=	esc_url_raw($_REQUEST['surl']);
			if($act=='store_url'){
				$last_chracter = substr($surl, -1);
				$latestString  = '';
				if( $last_chracter == '/'){
					$latestString   =	substr($surl, 0, -1);
				}
				else{$latestString	=	$surl;}
				update_option( 'santu_store_url',$latestString );
				$response	=	array(
					'response'=>1,
					'message'=>__('Store URL Saved','santu')
				);
			}
		}
		echo json_encode( $response );
		die();
	}

}
add_action('plugins_loaded',array('Santu_Admin','init'));