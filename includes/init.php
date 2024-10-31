<?php
/*
* Block direct access.
*
* @since  1.0.0
*/
if(!defined('ABSPATH')){
	exit;
}

class Santu_Init{
	public static function init(){
        $class = __CLASS__;
        new $class;
    }
	
	function __construct(){
		add_action( 'wp_head',array($this,'santu_api_script'));
		add_action( 'wp_footer',array($this,'global_script'));
		add_action( 'admin_head',array($this,'global_script'));		
		add_action( 'admin_enqueue_scripts',array($this,'add_santu_modal_js'));
		add_action( 'admin_enqueue_scripts',array($this,'santu_modal_css'));
		add_action( 'wp_enqueue_scripts',array($this,'add_santu_modal_js'));
		add_action( 'wp_enqueue_scripts',array($this,'santu_modal_css'));
		add_action('init',array($this,'add_editor_style'));
		add_filter('tiny_mce_before_init',array($this,'override_mce_options'));
		add_filter( 'tiny_mce_before_init',array($this,'fix_tiny_mce_before_init'));
	}
	
	static function has_santu_button($content,$target){
		//$target = 'class="santuButton ';
		if(strpos($content,$target)!==false){
			return true;
		}
		else{return false;}
	}
	
	/*
	* Register Santu Store API URL
	*
	* @since  1.0.0
	*
	* @return js
	*/
	function santu_api_script(){
		$js 	=	get_option('santu_store_url').'/cart/header.js';
		echo '<script type="text/javascript" src="'.$js.'"></script>';
	}
	
	/*
	* Register Script for Santu Modal
	*
	* @since  1.0.0
	*
	*/
	function add_santu_modal_js() {
		if(is_user_logged_in() && is_admin()){
			wp_register_script('santu-color-js',SANTU_PLUGIN_DIR.'js/spectrum.js',array('jquery'),'1.8.0',false);
			wp_enqueue_script('santu-color-js');
			wp_register_script('santu-range-js',SANTU_PLUGIN_DIR.'js/jquery.range-min.js',array('jquery'),'0.1.2',false);
			wp_enqueue_script('santu-range-js');
			wp_register_script('santu-common-js',SANTU_PLUGIN_DIR.'js/santu-common.js',array('jquery'),'0.0.4',false);
			wp_enqueue_script('santu-common-js');
			if(is_admin()){
				global $pagenow;
				if(!empty($pagenow) && ('post-new.php' === $pagenow || 'post.php' === $pagenow )){
					wp_register_script('santu-buttons-js',SANTU_PLUGIN_DIR.'js/santu-buttons.js',array('jquery'),'0.1.2',false);
					wp_enqueue_script('santu-buttons-js');
				}
			}
			else{
				wp_register_script('santu-buttons-js',SANTU_PLUGIN_DIR.'js/santu-buttons.js',array('jquery'),'0.1.2',false);
				wp_enqueue_script('santu-buttons-js');
			}
			wp_localize_script('santu-buttons-js','st_lang',
				array(
					's1'	=>	__('Buy Now','santu'),
					's2'	=>	__('But could not save, please try again','santu'),
					's3'	=>	__('Please add an icon','santu'),
					's4'	=>	__('Icon width & height must greater than 16px','santu'),
					's5'	=>	__('Icon width & height is too large, use max width and height 128px','santu'),
					's6'	=>	__('Invalid File Formate, Please select only valid image','santu'),
					's7'	=>	__('Are you sure you want to remove this button?','santu'),
					's8'	=>	__('Max Text Length','santu'),
					's9'	=>	__('Please add title','santu'),
					's10'	=>	__('Invalid Link','santu'),
					's11'	=>	__('Please add link','santu'),
					's12'	=>	__('Please add button text','santu'),
					's13'	=>	__('Invalid Link','santu'),
					's14'	=>	__('Please add link','santu'),
					's15'	=>	__('Insert Buy Now Links','santu'),
					's16'	=>	__('Insert Buy Now Button','santu'),
				)
			);
		}
	}
	
	/*
	* Register Style for Santu Modal
	*
	* @since  1.0.0
	* @param  string $title
	*
	*/
	function santu_modal_css() {
		if(is_user_logged_in()  && is_admin()){
			wp_register_style('summer-map-css',SANTU_PLUGIN_DIR.'css/summer-map.css',false,'0.0.1');
			wp_enqueue_style('summer-map-css');
			wp_register_style('santu-range-css',SANTU_PLUGIN_DIR.'css/jquery.range.css',false,'0.1.2');
			wp_enqueue_style('santu-range-css');
			wp_register_style('santu-color-css',SANTU_PLUGIN_DIR.'css/spectrum.css',false,'1.8.0');
			wp_enqueue_style('santu-color-css');
		}
		wp_register_style('santu-css',SANTU_PLUGIN_DIR.'css/santu.css',false,'0.0.1');
		wp_enqueue_style('santu-css');
	}
	
	function  add_editor_style(){
		add_editor_style(SANTU_PLUGIN_DIR.'css/santu.css');
	}
	
	/*
	* Global Java Script Function.
	*
	* @since  1.0.0
	*
	* @return JS
	*/
	function global_script(){
		?>
		<script>
			var santu={"dir":"<?php echo SANTU_PLUGIN_DIR; ?>","ajax":"<?php echo admin_url('admin-ajax.php'); ?>"};
			var santu_plugin_dir_url=function(){return '<?php echo SANTU_PLUGIN_DIR; ?>'};
			var is_santu_url_set=function(){var surl='<?php echo SANTU_STORE_URL; ?>';if(surl){return true}else{return false}};
			var is_santu_url_not_set=function(){if(is_santu_url_set()!=true){alert('<?php echo __('Store URL is not set','santu'); ?>')}};
			var santu_ajax_url=function(){return '<?php echo admin_url('admin-ajax.php'); ?>'}
		</script>
		<!--Image Map Responsive Script Starts-->
		<script type="text/javascript" src="<?php echo SANTU_PLUGIN_DIR;?>js/jquery.rwdImageMaps.min.js"></script>
		<script type="text/javascript">
		jQuery(document).ready(function($){(function($){$('img[usemap]').rwdImageMaps();}(jQuery))});</script>
		<!--Image Map Responsive Script Ends-->
	<?php
	}
	
	function override_mce_options($initArray){
		$opts = '*[*]';
		$initArray['valid_elements'] = $opts;
		$initArray['extended_valid_elements'] = $opts;
		return $initArray;
	}
	
	function fix_tiny_mce_before_init($in){
		$in[ 'valid_children'] 			="+a[div|p|ul|ol|li|h1|span|h2|h3|h4|h5|h5|h6|figure]";
		$in[ 'force_p_newlines' ]			= FALSE;
		$in[ 'remove_linebreaks' ]		= FALSE;
		$in[ 'force_br_newlines' ]		= FALSE;
		$in[ 'remove_trailing_nbsp' ]	= FALSE;
		$in[ 'apply_source_formatting' ]	= FALSE;
		$in[ 'convert_newlines_to_brs' ]	= FALSE;
		$in[ 'verify_html' ]				= FALSE;
		$in[ 'remove_redundant_brs' ]	= FALSE;
		$in[ 'validate_children' ]		= FALSE;
		$in[ 'forced_root_block' ]		= FALSE;
		return $in;
	}
}
add_action('plugins_loaded',array('Santu_Init','init'));