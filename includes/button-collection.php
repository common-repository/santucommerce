<?php
/**
* Block direct access.
*
* @since  1.0.0
*/
if(!defined('ABSPATH')){
	exit;
}
/*
* Common Function inside this class
*
* @since 1.0.0
*/
class Santu_Button_Collection{
	public static function init(){
        $class = __CLASS__;
        new $class;
    }
	function __construct(){
		add_action( 'wp_enqueue_scripts',array($this,'button_css'));
		add_action( 'admin_enqueue_scripts',array($this,'button_css'));		
		add_action( 'wp_ajax_get_button_css_ajax',array($this,'get_button_css_ajax'));
		add_action( 'wp_ajax_nopriv_get_button_css_ajax',array($this,'get_button_css_ajax'));
		add_action( 'get_footer',array($this,'add_santu_my_collection_button'));
		add_action( 'admin_enqueue_scripts',array($this,'add_santu_my_collection_button'),11);
		add_action('init',array($this,'add_editor_style'));
		add_action('tiny_mce_before_init',array($this,'add_css_in_editor'));
		add_filter('tiny_mce_before_init',array($this,'vipx_filter_tiny_mce_before_init'));
	}
	/*
	* Adding BID support for anchor tag in tinyMCE
	*/
	function vipx_filter_tiny_mce_before_init( $options ){
		if(!isset( $options['extended_valid_elements'] ) ) {
			$options['extended_valid_elements'] = '';
		}
		else {
			$options['extended_valid_elements'] .= ',';
		}
		if(! isset( $options['custom_elements'])){
			$options['custom_elements'] = '';
		}
		else {
			$options['custom_elements'] .= ',';
		}
		$options['extended_valid_elements'] .= 'a[download|href|hreflang|referrerpolicy|rel|target|type|charset|coords|name|bid|class|id|style]';
		return $options;
	}
	function button_css(){
		global $submenu_file,$current_screen,$pagenow,$post;
		$files = Santu_Button_Collection::get_files();
		if(is_admin()){
			if($pagenow=='post-new.php'||$pagenow=='post.php'){
				for($i=0;$i<count($files);$i++){
					wp_register_style('santu-btn-'.$i, SANTU_PLUGIN_DIR.'collection/'.$files[$i],'style.css','0.0.1');
					wp_enqueue_style('santu-btn-'.$i);
				}
			}
		}
		else{
			if(is_single()||is_page()){
				if(!has_shortcode($post->post_content, 'santu_embed')){
					$exist_buttons 	=	Santu_Button_Collection::get_all_collection_css_files($post->post_content);
					if(!empty($exist_buttons)){
						for($k=0;$k<count($exist_buttons);$k++){
							$btnfilename 	=	Santu_Button_Collection::get_buttons_css_file_name($exist_buttons[$k]);
							if($btnfilename){
								wp_register_style('santu-btn-'.$k,SANTU_PLUGIN_DIR.'collection/'.$btnfilename,'style.css','0.0.1');
								wp_enqueue_style('santu-btn-'.$k);
							}
						}
					}
				}
			}
		}
	}
	function get_all_collection_css_files($content){
		$buttons 		=	Santu_Button_Collection::get_all_collection_buttons();
		$exist_buttons	=	array();
		for($i=0;$i<count($buttons);$i++){
			$single_button	=	$buttons[$i];
			if(strpos($content,$single_button)!==false){
				array_push($exist_buttons,$single_button);
			}
		}
		return array_unique($exist_buttons);
	}
	function get_all_collection_buttons(){
		$buttons 	=	array();
		$css_files = Santu_Button_Collection::get_files();
		for($j=0;$j<count($css_files);$j++){
			$cnm 			=	$css_files[$j];
			$btn_classes 	=	Santu_Button_Collection::get_button_classes(Santu_Button_Collection::get_content($cnm));
			for($k=0;$k<count($btn_classes);$k++){
				$clid 	= str_replace('a#','',$btn_classes[$k]);
				array_push($buttons,$clid);
			}
		}
		return $buttons;
	}
	function get_buttons_css_file_name($btname){
		$buttons 	=	array();
		$css_files = Santu_Button_Collection::get_files();
		for($j=0;$j<count($css_files);$j++){
			$cnm 			=	$css_files[$j];
			$btn_classes 	=	Santu_Button_Collection::get_button_classes(Santu_Button_Collection::get_content($cnm));
			for($k=0;$k<count($btn_classes);$k++){
				$clid 	= str_replace('a#','',$btn_classes[$k]);
				if($clid==$btname){
					array_push($buttons,$cnm);
				}
			}
		}
		return $buttons[0];
	}
	function  add_editor_style(){
		$files = Santu_Button_Collection::get_files();
		for($i=0;$i<count($files);$i++){
			add_editor_style(SANTU_PLUGIN_DIR.'/collection/'.$files[$i]);
		}
	}
	/*
	* Adding Style in tinyMCE iframe editor.
	*/
	function add_css_in_editor($mceInit){
		$styles =	Santu_Button_Collection::get_my_collection_css();
		if(!isset($mceInit['content_style'])){
			$mceInit['content_style']	=	$styles.' ';
		}
		else{
			$mceInit['content_style'].=' '.$styles.' ';
		}
		return $mceInit;
	}
	public static function get_path(){
		return SANTU_PLUGIN_PATH.'collection';
	}
	public static function get_files(){
		$path 	= 	Santu_Button_Collection::get_path();
		$files	=	scandir($path);
		$arr 	=	array();
		for($i=0; $i<count($files); $i++){
			if($i!=0&&$i!=1){
				if($files[$i]!=='index.php'){
					array_push($arr,$files[$i]);
				}
			}
		}
		return $arr;
	}
	static function get_name($file){
		$content 	=	Santu_Button_Collection::get_content($file);
		preg_match_all("(Collection Name:(.*)\n)siU",$content,$name);
		$name 		= 	trim($name[1][0]);
		return $name;
	}
	static function get_slug($file){
		$content 	=	Santu_Button_Collection::get_content($file);
		preg_match_all("(Slug:(.*)\n)siU",$content,$name);
		return trim($name[1][0]);
	}
	public static function get_content($file){
		$path		=	SANTU_PLUGIN_PATH.'collection';
		return file_get_contents($path.'/'.$file);
	}
	public static function get_button_classes($css){
		$narr	=	array();
		preg_match_all( '/(?ims)([a-z0-9\s\,\.\:#_\-@*()\[\]"=]+)\{([^\}]*)\}/', $css, $arr);
		$result	=	array();
		foreach ($arr[0] as $i => $x){
			$selector 	= 	trim($arr[1][$i]);
			$rules 		= 	explode(';', trim($arr[2][$i]));
			$result[$selector]	=	array();
			foreach($rules as $strRule){
				if(!empty($strRule)){
				    $rule 	=	explode(":", $strRule);
				    $result[$selector][][trim($rule[0])] = trim($rule[1]);
				}
			}
		}
		foreach($result as $k=>$v){
			if(stripos($k,':hover')===FALSE && stripos($k,':active')===FALSE && stripos($k,'::before')===FALSE && stripos($k,'::after')===FALSE){
				$l=str_replace('a.','',$k);
				array_push($narr,str_replace('.','',$l));
			}
		}
		return $narr;
	}
	public static function select_collection(){
		$css_files = Santu_Button_Collection::get_files();
		echo '<select class="stCollSel">';
		for($i=0;$i<count($css_files);$i++){
			$cname 				=	$css_files[$i];
			$collection_name 	= 	Santu_Button_Collection::get_name($cname);
			$collection_slug 	=  Santu_Button_Collection::get_slug($cname).'<br>';
			echo '<option tab="stCollTab'.$i.'" value="'.$cname.'">'.$collection_name.'</option>';
		}
		echo '</select>'; Santu_Modal_Box::tool_tip('Select buttons from a collection. Buttons you have used will be stored in \'My collection');
	}
	public static function get_collections(){
		$css_files = Santu_Button_Collection::get_files();
		echo '<div class="stCollCont">';
		for($j=0;$j<count($css_files);$j++){
			$cnm 			=	$css_files[$j];
			$stCollTab		=	'stCollTab'.$j;
			echo '<div class="stCollTab '.$stCollTab.'" tab="'.$cnm.'">';
			$css_content 	=	Santu_Button_Collection::get_content($cnm);
			$btn_classes 	=	Santu_Button_Collection::get_button_classes($css_content);
			echo '<ul>';
				for($k=0;$k<count($btn_classes);$k++){
					$clid 	= str_replace('a#','',$btn_classes[$k]);
					echo '<li class="';
					if($stCollTab=='stCollTab0'){
						/*if($k==0){
							echo 'stcACBtn';  // added to preselect first button
						}*/
					}
					echo '">';
					echo '<a href="javascript:void(0)" btn="'.$clid.'" cll="'.$cnm.'" id="'.$clid.'" class="'.$clid.' santuButton">';
					echo 'Buy Now';
					echo '</a></li>';
				}
			echo '</ul>';
			echo '</div>';
		}
		echo '</div>';
	}
	function get_collection_css($css,$btn){
		preg_match_all('/(?ims)([a-z0-9\s\,\.\:#_\-@*()\[\]"=]+)\{([^\}]*)\}/',$css,$arr);
		$result = array();
		foreach ($arr[0] as $i => $x){
			$selector				= 	trim($arr[1][$i]);
			$selector 				=	str_replace('a#','',$selector);
			$selector 				=	str_replace('#','',$selector);
			$rules 					= 	explode(';', trim($arr[2][$i]));
			$result[$selector]	= 	array();
			foreach ($rules as $strRule){
				if (!empty($strRule)){
				    $rule 	=	explode(":", $strRule);
				    $result[$selector][][trim($rule[0])] = trim($rule[1]);
				}
			}
		}
		return array(
				'n'=>$result[$btn],
				'h'=>$result[$btn.':hover'],
				'v'=>$result[$btn.':active'],
				'b'=>$result[$btn.'::before'],
				'a'=>$result[$btn.'::after']
			);
	}
	function get_button_css_ajax(){
		if($_REQUEST){
			if($_POST['act']=='get_recent_button'){
				$d	=	get_option('recent_st_btn_id');
				$t	=	get_option('recent_st_btn_tp');
				$x	=	get_option('recent_st_btn_tx');
				$l	=	get_option('recent_st_btn_lk');
				$arr=	array('id'=>$d,'type'=>$t,'text'=>$x,'link'=>$l);
				if($t==1 || $t==2){
					echo json_encode($arr);
				}
			}
			if($_POST['act']=='update_recent_button'){
				$d 	=	sanitize_text_field($_POST['btn_id']);
				$x 	=	sanitize_text_field($_POST['btn_tx']);
				$l 	=	esc_url_raw($_POST['btn_lk']);
				$t	=	sanitize_text_field($_POST['btn_tp']);
				update_option('recent_st_btn_id',$d);
				update_option('recent_st_btn_tp',$t);
				update_option('recent_st_btn_tx',$x);
				update_option('recent_st_btn_lk',$l);
			}
			if($_POST['act']=='get'){
				$btn 	= 	sanitize_text_field($_POST['btn']);
				$cll 	=	sanitize_text_field($_POST['cll']);
				$css 	=	Santu_Button_Collection::get_content($cll);
				$arr 	=	Santu_Button_Collection::get_collection_css($css,$btn);
				$narr 	=	array_merge ($arr);
				echo json_encode($narr);
			}
			if($_POST['act']=='get_my_collection'){
				$btn 	= 	sanitize_text_field($_POST['btn']);
				$css	=	Santu_Button_Collection::get_my_collection_css_by_id($btn);
				$btag	=	'scbt_'.$btn;
				$arrA 	=	Santu_Button_Collection::get_collection_css($css,$btag);
				$narr 	=	array_merge ($arrA);
				echo json_encode($narr);
			}
			if($_POST['act']=='get_my_collection_icon'){
				$btn 	= 	sanitize_text_field($_POST['btn']);
				$icon 	=	get_post_meta($btn,'icon',true);
				$url 	=	wp_get_attachment_url($icon);
				$size 	=	get_post_meta($btn,'size',true);
				$position=	get_post_meta($btn,'position',true);
				$padding=	get_post_meta($btn,'padding',true);
				if($url){
					$arr	=	array(
									'icon'		=>	$icon,
									'url'		=>	$url,
									'size'		=>	$size,
									'position'	=>	$position,
									'padding'	=>	$padding
								);
					$json 	=	json_encode($arr);
					echo $json;
				}
			}
			if($_POST['act']=='remove_my_collection_btn'){
				$btn 	= 	sanitize_text_field($_POST['btn']);
				wp_delete_post($btn,true);
				echo 1;
			}
			if($_POST['act']=='generate_button'){
				$s1 	=	sanitize_text_field($_POST['s1']);
				$s2 	=	sanitize_text_field($_POST['s2']);
				$s3 	=	sanitize_text_field($_POST['s3']);
				$s4 	=	sanitize_text_field($_POST['s4']);
				$s5 	=	sanitize_text_field($_POST['s5']);
				$title	=	sanitize_text_field($_POST['title']);
				$pid =	wp_insert_post(
					array(
					'post_content'		=>	'',
					'post_title'		=>	'Santu Custom Button',
					'post_status'		=>	'publish',
					'post_type'		=>	'santu_button',
					'ping_status'		=>	'closed',
					'comment_status'	=>	'closed'));
				if($pid!=0){
					if($s1){update_post_meta($pid,'nr',$s1);}
					if($s2){update_post_meta($pid,'ho',$s2);}
					if($s3){update_post_meta($pid,'ac',$s3);}
					if($s4){update_post_meta($pid,'af',$s4);}
					if($s5){update_post_meta($pid,'be',$s5);}
					if($title){update_post_meta($pid,'title',$title);}
				}
				echo $pid;
			}
			/* Save Button Icon */
			if($_POST['act']=='generate_button_icon'){
				$s1 	=	sanitize_text_field($_POST['s1']);
				$s2 	=	sanitize_text_field($_POST['s2']);
				$s3 	=	sanitize_text_field($_POST['s3']);
				$s4 	=	sanitize_text_field($_POST['s4']);
				$s5 	=	sanitize_text_field($_POST['s5']);
				$icon	=	sanitize_text_field($_POST['icon']);
				$size	=	sanitize_text_field($_POST['size']);
				$title	=	sanitize_text_field($_POST['title']);
				$padding=	sanitize_text_field($_POST['padding']);
				$position=	sanitize_text_field($_POST['position']);
				$pid	=	wp_insert_post(
					array(
					'post_title'		=>	'Santu Custom Button',
					'post_status'		=>	'publish',
					'post_type'		=>	'santu_button',
					'ping_status'		=>	'closed',
					'comment_status'	=>	'closed'));
				if($pid!=0){
					if($s1){update_post_meta($pid,'nr',$s1);}
					if($s2){update_post_meta($pid,'ho',$s2);}
					if($s3){update_post_meta($pid,'ac',$s3);}
					if($s4){update_post_meta($pid,'af',$s4);}
					if($s5){update_post_meta($pid,'be',$s5);}
					if($icon){update_post_meta($pid,'icon',$icon);}
					if($title){update_post_meta($pid,'title',$title);}
					if($size){update_post_meta($pid,'size',$size);}
					if($padding){update_post_meta($pid,'padding',$padding);}
					if($position=='right'){update_post_meta($pid,'position',$position);}
					else{update_post_meta($pid,'position','left');}
				}
				echo $pid;
			}
			/* Get Button */
			if($_POST['act']=='get_button'){
				$id 	=	sanitize_text_field($_POST['scode']['id']);
				$title	=	sanitize_text_field($_POST['scode']['title']);
				$url 	=	esc_url_raw($_POST['scode']['url']);
				if(isset($_POST['scode']['bid'])){
					$bid =	sanitize_text_field($_POST['scode']['bid']);
				}
				else{$bid	=	'';	}
				$o='<a href="'.$url.'"';
				$o.=' id="'.$id.'" class="santuButton '.$id.'"';
				$o.=' bid="'.$bid.'"';
				$o.='>';
				if($_POST['scode']['bid'] && $_POST['scode']['bid']!=false  && $_POST['scode']['bid']!='false'){
					$icon 		=	sanitize_text_field($_POST['scode']['icon']);
					$size 		=	sanitize_text_field($_POST['scode']['size']);
					$position 	=	sanitize_text_field($_POST['scode']['position']);
					$padding 	=	sanitize_text_field($_POST['scode']['padding']);
					if($icon && $icon != false && $icon!='false'){
						if($position=='left'){
							$o.='<img class="wp-image-'.$icon.'" src="'.wp_get_attachment_url($icon).'" width="'.$size.'" height="'.$size.'" style="vertical-align: middle;margin-right:'.$padding.';width:'.$size.'px">';
							$o.=$title;
						}
						else if($position=='right'){
							$o.=$title;
							$o.='<img class="wp-image-'.$icon.'" src="'.wp_get_attachment_url($icon).'" width="'.$size.'" height="'.$size.'" style="vertical-align: middle;margin-left:'.$padding.';width:'.$size.'px">';
						}
					}
					else{$o.=$title;}
				}
				else{$o.=$title;}
				$o.='</a>';
				echo $o;
			}
			if($_POST['act']=='load_collection_button'){
				$bid 	=	sanitize_text_field($_POST['bid']);
				if(is_numeric($bid)){
					$arr 	=	array('collection'=>'my_collection','bid'=>$bid);
					echo json_encode($arr);
				}
				else{
					$arr	=	array('collection'=>'collection','bid'=>$bid);
					echo json_encode($arr);
				}
			}
		}
		die();
	}
	public static function get_my_collection_css(){
		$posts = get_posts(array('post_type'=>'santu_button','post_status'=>'publish','numberposts'=>-1));
		$o='';
		foreach($posts as $button){
			$bid=	$button->ID;
			$s1 = 	get_post_meta($bid,'nr',true);
			$s2 = 	get_post_meta($bid,'ho',true);
			$s3 = 	get_post_meta($bid,'ac',true);
			$s4 = 	get_post_meta($bid,'af',true);
			$s5	= 	get_post_meta($bid,'be',true);
			$btn=	'a#scbt_'.$bid;
			if($s1){ $o.=$btn.'{'.$s1.'}';}
			if($s2){ $o.=$btn.':hover{'.$s2.'}';	}
			if($s3){ $o.=$btn.':active{'.$s3.'}';}
			if($s4){ $o.=$btn.'::after{'.$s4.'}';}
			if($s5){ $o.=$btn.'::before{'.$s5.'}';}
		}
		return $o;
	}
	public static function get_my_collection_css_by_id($bid){
		$button	=	get_post($bid);
		$o	=	'';
		$s1 = 	get_post_meta($bid,'nr',true);
		$s2 = 	get_post_meta($bid,'ho',true);
		$s3 = 	get_post_meta($bid,'ac',true);
		$s4 = 	get_post_meta($bid,'af',true);
		$s5	= 	get_post_meta($bid,'be',true);
		$btn=	'a#scbt_'.$bid;
		if($s1){ $o.=$btn.'{'.$s1.'}';}
		if($s2){ $o.=$btn.':hover{'.$s2.'}';	}
		if($s3){ $o.=$btn.':active{'.$s3.'}';}
		if($s4){ $o.=$btn.'::after{'.$s4.'}';}
		if($s5){ $o.=$btn.'::before{'.$s5.'}';}
		return $o;
	}
	public static function show_my_collection(){
		$posts = get_posts(array('post_type'=>'santu_button','post_status'=>'publish','numberposts'=>-1));
		$o='<ul>';
		if(count($posts)==0){
			$o.= __('No collection found.','santu');
		}
		else{
			foreach ($posts as $button) {
				$bid 		=	$button->ID;
				$btn 		=	'scbt_'.$bid;
				$icon		=	get_post_meta($bid,'icon',true);
				$size		=	get_post_meta($bid,'size',true);
				$title		=	get_post_meta($bid,'title',true);				
				$padding	=	get_post_meta($bid,'padding',true);
				$position	=	get_post_meta($bid,'position',true);
				if($icon){
					$o.='<li><a title="'.$title.'" href="javascript:void(0)" bid="'.$bid.'" id="'.$btn.'" class="'.$btn.' santuButton">';
					if($position=='right'){
						if($title){
							$o.=$title;
						}
						else{
							$o.=__('Buy Now','santu');
						}
						$o.='<img src="'.wp_get_attachment_url($icon).'" width="'.$size.'" height="'.$size.'" style="margin-left:6px">';
					}
					else{
						$o.='<img src="'.wp_get_attachment_url($icon).'" width="'.$size.'" height="'.$size.'" style="margin-right:6px">';
						if($title){
							$o.=$title;
						}
						else{
							$o.=__('Buy Now','santu');
						}
					}
					$o.='</a>';
					$o.='<span class="stRemoveCollection" bid="'.$bid.'"><img src="'.SANTU_PLUGIN_DIR.'img/rm.png"></span>';
					$o.='</li>';
				}
				else{
					$o.='<li><a title="'.$title.'" href="javascript:void(0)" bid="'.$bid.'" id="'.$btn.'" class="'.$btn.' santuButton">';
					if($title){
						$o.=$title;
					}
					else{
						$o.=__('Buy Now','santu');
					}
					$o.='</a>';
					$o.='<span class="stRemoveCollection" bid="'.$bid.'"><img src="'.SANTU_PLUGIN_DIR.'img/rm.png"></span>';
					$o.='</li>';
				}
			}
		}
		$o.='</ul>';
		return $o;
	}
	public static function add_santu_my_collection_button(){
		?>
		<style type="text/css" id="santuMyCCSS" media="all" scoped>
			<?php echo Santu_Button_Collection::get_my_collection_css(); ?>
		</style>
		<?php
	}
}
add_action('plugins_loaded',array('Santu_Button_Collection','init'));