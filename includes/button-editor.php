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
* CLASS: Button Editor/Generator
*
* Description: Allow user select pre-defined button or
* customize a button
*
* @author: CodeFLox
* @copyright: Copyright 2017. All rights reserved
* @version: 1.0.0
* @tested_up_to: 4.9.4
*/
class Santu_Button_Editor{
	public static function init(){
		$class = __CLASS__;
		new $class;
	}
	
	function __construct(){
		add_action( 'wp_enqueue_scripts',array($this,'button_css'));
		add_action( 'admin_enqueue_scripts',array($this,'button_css'));
		add_shortcode('santu_button',array($this,'button_shortcode'));
	}
	
	public function button_shortcode($atts){
		extract( shortcode_atts(
			array(
		           'id'		=>	'stPrwBtn',
		           'title'	=>	'Buy Now',
		           'url'		=>	SANTU_STORE_URL,
		           'icon'		=> 	'',
		           'size' 	=> '16',
		           'position'	=> 	'left',
		           'padding'	=>	'10'
		   ),
		   $atts
		));
		$o='';
		$o.='<a href="'.$url.'"';
		$o.='class="santuButton '.$id.'"';
		$o.='>';
		if($icon){
			if($position=='left'){
				$o.='<img src="'.wp_get_attachment_url($icon).'" width="'.$size.'" height="'.$size.'" style="vertical-align: middle;margin-right:'.$padding.'">';
				$o.=$title;
			}
			else if($position=='right'){
				$o.=$title;
				$o.='<img src="'.wp_get_attachment_url($icon).'" width="'.$size.'" height="'.$size.'" style="vertical-align: middle;margin-left:'.$padding.'">';
			}
		}
		else{
			$o.=$title;
		}
		$o.='</a>';
		return $o;
	}
	
	function button_css(){
		if(is_user_logged_in() && is_admin()){ ?><style id="stPreBtnCSS" type="text/css" media="all" scoped>a.stPrwBtn{-moz-box-shadow: 0px 10px 14px -7px #232423;-webkit-box-shadow: 0px 10px 14px -7px #232423;box-shadow: 0px 10px 14px -7px #232423;background-color:#f5c7c0;background:-webkit-gradient(linear,left top,left bottom,color-stop(0.05,#f5c7c0),color-stop(1,#ff8a7f));background:-moz-linear-gradient(top,#f5c7c0 5%,#ff8a7f 100%);background:-webkit-linear-gradient(top,#f5c7c0 5%,#ff8a7f 100%);background:-o-linear-gradient(top,#f5c7c0 5%, #ff8a7f 100%);background:-ms-linear-gradient(top,#f5c7c0 5%, #ff8a7f 100%);background:linear-gradient(to bottom,#f5c7c0 5%,#ff8a7f 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#f5c7c0',endColorstr='#ff8a7f',GradientType=0);-moz-border-radius:9px;-webkit-border-radius:9px;border-radius:9px;border:4px solid #d93722;color:#ffffff;font-family:Arial;font-size:16px;font-weight:bold;font-style:italic;padding:10px 20px;text-shadow:0px 1px 2px #615f61}a.stPrwBtn:hover{background-color:#ff8a7f;background:-webkit-gradient(linear,left top,left bottom,color-stop(0.05,#ff8a7f),color-stop(1,#f5c7c0));background:-moz-linear-gradient(top,#ff8a7f 5%,#f5c7c0 100%);background:-webkit-linear-gradient(top,#ff8a7f 5%,#f5c7c0 100%);background:-o-linear-gradient(top,#ff8a7f 5%,#f5c7c0 100%);background:-ms-linear-gradient(top,#ff8a7f 5%,#f5c7c0 100%);background:linear-gradient(to bottom,#ff8a7f 5%,#f5c7c0 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff8a7f',endColorstr='#f5c7c0',GradientType=0);color:#fff}</style><?php }
	}
	
	public static function run(){
		ob_start();
		$args  = array(
			array('name'=>'Button','scode'=>'tab_button'),
			array('name'=>'Icon','scode'=>'tab_icon'),
		);
		Santu_Button_Editor::pannel($args);
		$o=ob_get_contents();
		ob_end_clean();
		return $o;
	}
	
	public static function pannel($arr){
		$number_of_tab	= count($arr);
		echo '<ul id="smBtnTabNav" class="smBtnTabNav">';
		for($i=0;$i<$number_of_tab;$i++){
			$name 	= 	$arr[$i]['name'];
			echo '<li><a ';
			if($i==0){	echo 'class="smActive"';	}
			echo ' tab="'.$i.'" href="javascript:void(0)">'.$name.'</a></li>';
		}
		echo '</ul>';
		echo '<div class="smBtnTabCont">';
		for($j=0;$j<$number_of_tab;$j++){
			$scode 		=	$arr[$j]['scode'];
			echo '<div class="smBtnPanel smBtnPanel'.$j.' ';
			if($j==0){	echo 'stActiveTab';}
			echo '">';
			echo call_user_func(array('Santu_Button_Editor',$scode));
			echo '</div>';
		}
		echo '</div>';
	}
	
	public static function tab_button(){
		?>
		<div class="smBtnSecA">
			<div class="stRangeCnt">
				<label class="smBtnSizeOut">Size:</label>
				<input type="hidden" dval="16" id="smBtnFontSize" class="smBtnSize" value="16">
			</div>
			<div class="stRangeCnt">
				<label>Font:</label>
				<select id="smBtnFont" class="smBtnFont" dval="Arial">
					<option style="font-family:'Arial'" value="Arial">Arial</option>
					<option style="font-family:'Comic Sans MS'" value="Comic Sans MS">Comic Sans MS</option>
					<option style="font-family:'Courier New'" value="Courier new">Courier new</option>
					<option style="font-family:'Georgia'" value="Georgia">Georgia</option>
					<option style="font-family:'Impact'" value="Impact">Impact</option>
					<option style="font-family:'Lucida Console'" value="Lucida Console">Lucida Console</option>
					<option style="font-family:'Lucida Sans Unicode'" value="Lucida Sans Unicode">Lucida Sans Unicode</option>
					<option style="font-family:'Palatino Linotype'" value="Palatino Linotype">Palatino Linotype</option>
					<option style="font-family:'Tahoma'" value="Tahoma">Tahoma</option>
					<option style="font-family:'Times New Roman'" value="Times New Roman">Times New Roman</option>
					<option style="font-family:'Trebuchet MS'" value="Trebuchet MS">Trebuchet MS</option>
					<option style="font-family:'Verdana'" value="Verdana">Verdana</option>
				</select>
			</div>
			<div class="stRangeCnt">
				Bold <input id="stBtnBold" type="checkbox" dval="bold" class="stBtnBold" checked>
				Italic <input id="stBtnItalic" type="checkbox" dval="italic" class="stBtnItalic" checked>
			</div>
		</div>
		<div class="smBtnSecB">
			<div class="stRangeCnt">
				<span class="btnColorRadio">
					<form>
						<input type="radio" name="btnColor" value="1" checked>
							<?php echo __('Button Color','santu'); ?> &nbsp;&nbsp;&nbsp;&nbsp; 
						<input type="radio" name="btnColor" value="2"> <?php echo __('Hover Color','santu'); ?>
						</form>
					</span>
				<?php /* --- Button Background Color Top/Bottom ---*/ ?>
				<div class="btnClrA">
					<ul>
						<li><span class="stBtnCLbl"><?php echo __('Text Color','santu'); ?></span>
							<span class="btnColorPlt1"><input type="text" class="smBtnColor" id="smBtnFontColor" title="Font Color" dval="#ffffff"></span>
						</li>
						<li>
							<span class="stBtnCLbl"><?php echo __('Button Colors','santu'); ?></span>
							<span class="btnColorPlt1">
								<input type="text" class="smBtnColor" id="smBtnBorderColor" title="Border Color" dval="">
								<input type="text" class="smBtnColor" id="smBtnGradientTopColor" title="Gradient Top Color" dval="">
								<input type="text" class="smBtnColor" id="smBtnGradientBottomColor" title="Gradient Bottom Color" dval="">
							</span>
						</li>
					</ul>
				</div>
				<?php /* --- Button Background Hover Color Top/Bottom ---*/ ?>
				<div class="btnClrB" style="display:none">
					<ul>
						<li><span class="stBtnCLbl"><?php echo __('Text Color','santu'); ?></span>
							<span class="btnColorPlt1"><input type="text" class="smBtnColor smBtnColor3h" id="smBtnFontColorH" title="Font Color" dval="#f1f1f1"></span>
						</li>
						<li>
							<span class="stBtnCLbl"><?php echo __('Button Colors','santu'); ?></span>
							<span class="btnColorPlt1">
								<input type="text" class="smBtnColor" id="smBtnBorderColorH" title="Border Color" dval="">
								<input type="text" class="smBtnColor" id="smBtnGradientTopColorH" title="<?php echo __('Gradient Top Color','santu'); ?>" dval="">
								<input type="text" class="smBtnColor" id="smBtnGradientBottomColorH" title="<?php echo __('Gradient Bottom Color','santu'); ?>" dval="">
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<?php
	}
	
	public static function tab_icon(){
		?>
		<div class="stIEdit stIEdit1">
			<label><?php echo __('Insert Icon','santu'); ?></label><br>
			<span class="stIEPre"></span><a href="javascript:void(0)" class="smBtn smbtn2 smbtnChangeIcon"><?php echo __('Change','santu'); ?></a><br>
		</div>
		<div class="stIEdit stIEdit2">
			<label><?php echo __('Size','santu'); ?>:</label><br><div class="stRangeCnt"><input type="hidden" dval="20" id="smIconSize" class="smIconSize" value="20"></div>
		</div>
		<div class="stIEdit stIEdit3">
			<label><?php echo __('Position','santu'); ?>:</label><br>
			<div class="stIconPosition">
				<img src="<?php echo SANTU_PLUGIN_DIR; ?>img/left.jpg"><input type="radio" name="sticonpos" value="left" checked="checked">
				<img src="<?php echo SANTU_PLUGIN_DIR; ?>img/right.jpg"><input type="radio" name="sticonpos" value="right">
			</div>
			<br><br>
			<label><?php echo __('Padding','santu'); ?>: </label><br>
			<div class="stRangeCnt"><input type="hidden" dval="10" id="smIconPadding" class="smIconPadding" value="10"></div>
		</div>
		<?php
	}
}
add_action('plugins_loaded',array('Santu_Button_Editor','init'));