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
* CLASS: Santu Modal Box
*
* Description: Custom HTML/CSS for modal box show in when TinyMCE button
* clicked, this class contain all model box including button editor.
*
* @author: CodeFLox
* @copyright: Copyright 2017. All rights reserved
* @version: 2.0.0
* @tested_up_to: 4.7.5
*/
class Santu_Modal_Box{
	public static function init(){
        $class = __CLASS__;
        new $class;
    }
	
	function __construct(){
		if(is_user_logged_in() && is_admin()){
			add_action('wp_footer',array($this,'load_modal'));
			add_action('admin_footer',array($this,'load_modal'));
		}
		add_shortcode( 'santu_embed', array($this,'santu_embed'));
	}
	
	function santu_embed($atts){
		extract(shortcode_atts(array('url'=>''),$atts));
		return "<script type=\"text/javascript\">SantuCart.display('".$url."');</script>";
	}
	
	function load_modal(){
		Santu_Modal_Box::insert_buy_now_links();
		Santu_Modal_Box::insert_buy_now_button();
		Santu_Modal_Box::button_style();
		Santu_Modal_Box::select_image_on_page();
		Santu_Modal_Box::embed_store();
		if(is_user_logged_in() && is_admin()){
		?>
		<script type="text/javascript" src="<?php echo SANTU_PLUGIN_DIR;?>js/summerHTMLImageMapCreator.js"></script>
		<?php
		}
	}
	
	/*
	* Modal Header.
	*
	* @since  1.0.2
	* @param  string $title
	* @return html
	*/
	function modal_header($title){
		?>
		<div id="santuModalBG">
			<div id="santuModal" class="santuModal">
				<div class="smHead">
					<span class="smLogo"><img src="<?php echo SANTU_PLUGIN_DIR; ?>img/i24.png"></span>
					<span class="smTitle"><?php echo __($title,'santu'); ?></span>
					<a class="smClose" href="javascript:void(0)">
					<img src="<?php echo SANTU_PLUGIN_DIR; ?>img/x.jpg"></a>
				</div><!--smHead Ends-->
		<?php
	}
	
	/*
	* Modal Footer.
	*
	* @since 1.0.1
	* @return html
	*/
	function modal_footer($reset=false,$ok='OK',$cancel='Cancel',$link=''){
		?>
		<div class="smFoot">
			<div class="smLogo"><img src="<?php echo SANTU_PLUGIN_DIR; ?>img/logo.jpg"></div>
				<div class="smControl">
			<?php
				if(!empty($link)){
			?>
					<a href="<?php echo esc_url_raw($link); ?>" class="smBtn smbtn2" target="_blank">
						<?php echo __('Help','santu'); ?>
					</a>
				<?php
				}
				if($reset==true){
			?>
				<a href="javascript:void(0)" class="smBtn smbtn2 smbtnReset"><?php echo __('Reset','santu'); ?></a>
		<?php	} 	?>
				<a href="javascript:void(0)" class="smBtn smbtn1 smbtnOk"><?php echo __($ok,'santu'); ?></a>
				<a href="javascript:void(0)" class="smBtn smbtn2 smbtnCancel"><?php echo __($cancel,'santu'); ?></a>
				</div>				
			</div><!--smFoot Ends-->
	</div></div><?php
	}
	
	/*
	* Embed Shop modal box.
	*
	* @since  1.7.1
	* @return html modal box after click on tinymce's "Embed Shop"
	* from drop down menu
	*/
	function embed_store(){
		echo '<div class="sntldr"></div>';
		echo '<div id="santuLoadModal" class="santuModalBoxE">';
		Santu_Modal_Box::modal_header(__('Embed Store','santu'));
		$embed_store	=	get_option("santu_embed_store",false);
		?>
		<div class="santuModalContent stebdStor">
			<span class="spGrp0">
				<input type="radio" name="embedStoreOpt" value="2" checked><?php echo __('Special Pages','santu'); ?>
				<span class="stSepr"></span>
				<input type="radio" name="embedStoreOpt" value="1"><?php echo __('Categories Pages','santu'); ?>
			</span>
			<span class="spGrp1">
				<input type="text" name="stescat" class="stescat" style="display:none">
				<select name="stessp" class="stessp" style="display:inline">
					<option value="<?php echo SANTU_STORE_URL; ?>"><?php echo __('Store link','santu'); ?></option>
					<option value="<?php echo SANTU_STORE_URL.'/carts'; ?>"><?php echo __('Shopping cart','santu'); ?></option>
					<option value="<?php echo SANTU_STORE_URL.'/search'; ?>"><?php echo __('Search','santu'); ?></option>
					<option value="<?php echo SANTU_STORE_URL.'/cart/signup'; ?>"><?php echo __('Membership signup','santu'); ?></option>
					<option value="<?php echo SANTU_STORE_URL.'/m/8/list/'; ?>" selected><?php echo __('List of all products','santu'); ?></option> 					<!--/c/13330/list replaced with /m/8/list/-->
					<option value="<?php echo SANTU_STORE_URL.'/cart/login'; ?>"><?php echo __('Log in','santu'); ?></option>
				</select>
				<?php echo Santu_Modal_Box::tool_tip('Select a special page from the menu to embed or enter the URL of a page or product in your store.');?>
			</span>
		</div>
		<?php
		Santu_Modal_Box::modal_footer(false,'Embed','Cancel',$embed_store);
		echo '</div>';
	}
	
	/*
	* Insert buy now links modal box.
	*
	* @since  1.0.0
	* @return html modal box after click on tinymce's "Insert Buy Now Links"
	* from drop down menu
	*/
	function insert_buy_now_links(){
		echo '<div class="sntldr"></div>';
		echo '<div id="santuLoadModal" class="santuModalBoxA">';
		Santu_Modal_Box::modal_header('Insert Buy Now Links');
		$buy_now_links		=	get_option("santu_buy_now_links",false);
		$buy_now_products	=	get_option("santu_buy_now_product",false);
		?>
		<div class="santuModalContent">
			<div class="stInsertBuyNowLink">
			<form>
			<span class="spGrp0">
				<input type="radio" name="source_type" id="product_address" value="address" checked> <?php echo __('Product address','santu'); ?> <span class="stSepr"></span>
				<input type="radio" name="source_type" id="special_links" value="links"> <?php echo __('Special Links','santu'); ?>
			</span>
			<span class="spGrp1">
				<label class="addUrl" style="display:none"><?php echo __('Add URL','santu'); ?></label>
				<br>				
				<input type="text" name="product_adress" class="stProduct_link">
				<select name="special_link" id="special_link_drodown" class="stSpecial_link">
					<option dval="<?php echo __('View store','santu'); ?>" value="<?php echo SANTU_STORE_URL; ?>">
						<?php echo __('Store Link','santu'); ?>
					</option>
					<option dval="<?php echo __('View cart','santu'); ?>" value="<?php echo SANTU_STORE_URL.'/carts'; ?>">
						<?php echo __('Shopping Cart','santu'); ?>
					</option>
					<option dval="<?php echo __('Search','santu'); ?>" value="<?php echo SANTU_STORE_URL.'/search'; ?>">
						<?php echo __('Search','santu'); ?>
					</option>
					<option dval="<?php echo __('Become a member','santu'); ?>" value="<?php echo SANTU_STORE_URL.'/cart/signup'; ?>">
						<?php echo __('Membership Signup','santu'); ?>
					</option>
					<option dval="<?php echo __('Log in','santu'); ?>" value="<?php echo SANTU_STORE_URL.'/cart/login'; ?>">
						<?php echo __('Login','santu'); ?>
					</option>
				</select>
				<?php Santu_Modal_Box::tool_tip('Enter a Santu Product address or select one of the predefines special links.'); ?>
				<a href="<?php echo $buy_now_products; ?>" class="smBtn smbtn2 buynowProduct" target="santu_app">
					<?php echo __('Find','santu'); ?>
				</a>
			</span>
			<span class="spGrp2">
				<label><?php echo __('Title','santu'); ?></label><br>
				<input type="text" class="stProduct_title">
				<?php Santu_Modal_Box::tool_tip('Add custom title'); ?>
			</span>
		</form></div></div>
		<?php
		Santu_Modal_Box::modal_footer(false,'OK','Cancel',$buy_now_links);
		echo '</div>';
	}
	
	/*
	* Insert buy now button modal box.
	*
	* @since  1.0.0
	* @return html modal box after click on tinymce's "Insert Buy Now buttons"
	* from drop down menu
	*/
	function insert_buy_now_button(){
		echo '<div id="santuLoadModal" class="santuModalBoxC">';
		Santu_Modal_Box::modal_header('Insert Buy Now Button');
		$buy_now_buttons	=	get_option("santu_buy_now_buttons",false);
		$buy_now_products	=	get_option("santu_buy_now_product",false);
		?>
		<div class="santuModalContent">
			<div class="stInsertBuyNowButton">
				<form>
					<span class="spGrp0">				
						<input type="radio" id="button_product_address" name="source_type" value="address" checked>
							<?php echo __('Product address','santu'); ?> <span class="stSepr"></span>
						<input type="radio" id="button_special_links" name="source_type" value="links">
							<?php echo __('Special Links','santu'); ?>
					</span>
					<span class="spGrp1">						
						<input type="text" id="product_adress_button" name="product_adress" class="stProduct_link">
						<select name="special_link" id="special_link_button" class="stSpecial_link">
							<option dval="<?php echo __('View store','santu'); ?>" value="<?php echo SANTU_STORE_URL; ?>">
								<?php echo __('Store Link','santu'); ?>
							</option>
							<option dval="<?php echo __('View cart','santu'); ?>" value="<?php echo SANTU_STORE_URL.'/carts'; ?>">
								<?php echo __('Shopping Cart','santu'); ?>
							</option>
							<option dval="<?php echo __('Search','santu'); ?>" value="<?php echo SANTU_STORE_URL.'/search'; ?>">
								<?php echo __('Search','santu'); ?>
							</option>
							<option dval="<?php echo __('Become a member','santu'); ?>" value="<?php echo SANTU_STORE_URL.'/cart/signup'; ?>">
								<?php echo __('Membership Signup','santu'); ?>
							</option>
							<option dval="<?php echo __('Log in','santu'); ?>" value="<?php echo SANTU_STORE_URL.'/cart/login'; ?>">
								<?php echo __('Login','santu'); ?>
							</option>
						</select>
						<?php Santu_Modal_Box::tool_tip('Enter a Santu Product address or select one of the predefines special links.'); ?>
						<a href="<?php echo $buy_now_products; ?>" class="smBtn smbtn2 buynowProduct" target="santu_app">
							<?php echo __('Find','santu'); ?>
						</a>
					</span>
					<br>
					<label><?php echo __('Button text','santu'); ?></label><br>
					<input class="stMButton_text" type="text" name="stMButton_text">
					<div class="stdropdown">
						<input class="stBtnSubTxt" type="text">
						<select onchange="this.previousElementSibling.value=this.value;this.previousElementSibling.focus()" class="stSButton_text">
							<option selected="selected"><?php echo __('Buy Now','santu'); ?></option>
							<option><?php echo __('Add to Cart','santu'); ?></option>
							<option><?php echo __('More Details','santu'); ?></option>
						</select>
						<?php Santu_Modal_Box::tool_tip('The text displayed on your button. Enter your own text or select from the drop down menu.'); ?>
					</div>
					<br>
					<label><?php echo __('Preview','santu'); ?></label><br>
					<span class="smPreview">
						<a href="javascript:void(0)" class="stPrwBtn santuButton">
							<?php echo __('Buy Now','santu'); ?>
						</a>
					</span>
					<?php Santu_Modal_Box::tool_tip('The button design. Click on change to pick another one.'); ?>
					<a class="smBtn smbtn2 smbChangeButton" href="javascript:void(0)">
						<?php echo __('Change','santu'); ?>
					</a>
				</form>
			</div>
		</div>
		<?php
		Santu_Modal_Box::modal_footer(false,'OK','Cancel',$buy_now_buttons);
		echo '</div>';
	}
	
	/*
	* Button Style Editor, allow user customize button such as text, font, color, size etc.
	*
	* @since  1.0.0
	* @param  integer $uid
	* @return html modal box
	*/
	function button_style(){
		echo '<div id="santuLoadModal" class="santuModalBoxB" parent="santuModalBoxC">';
		Santu_Modal_Box::modal_header('Button Style');
		?>
		<ul id="smTabNav" class="smTabNav">
			<li>
			<a tab="1" class="smActive" href="javascript:void(0)"><?php echo __('Select a button','santu'); ?></a>
			</li>
			<li><a tab="2" href="javascript:void(0)"><?php echo __('Customize','santu'); ?></a></li>
			<li class="smSetting">
				<a href="<?php  echo get_admin_url('','/admin.php?page=santu',''); ?>/">
					<img src="<?php echo SANTU_PLUGIN_DIR; ?>img/g.png">
				</a>
			</li>
		</ul>
		<div class="santuModalContent">
			<div class="smPanel smPanel1">
				<span class="spGrp0">
					<form class="stAllMyCollect">
						<input type="radio" name="collection" value="1" checked> <?php echo __('All Collections','santu'); ?> <input type="radio" name="collection" value="2"> <?php echo __('My Collection','santu'); ?>
						<div class="stAlColTab">
						<?php
							Santu_Button_Collection::select_collection();
							Santu_Button_Collection::get_collections();
						?>
						</div>
						<div class="stMyColTab">
							<div class="stCollCont">
								<div class="stMyCollTab">
									<div class="stCollCont">
										<?php echo Santu_Button_Collection::show_my_collection(); ?>
									</div>
								</div>
							</div>
						</div>
					</form>
				</span>
			</div>
			<div class="smPanel smPanel2">
				<span class="spGrp0">
					<span class="smPreview">
						<a class="stPrwBtn santuButton" href="javascript:void(0)">
							<?php echo __('Buy Now','santu'); ?>
						</a>
					</span>
				</span>
				<span class="spGrp2"><?php echo Santu_Button_Editor::run(); ?></span>
			</div>
		</div>
		<?php
		$santu_select_button	=	get_option("santu_select_button",false);
		Santu_Modal_Box::modal_footer(false,'OK','Cancel',$santu_select_button);
		echo '</div>';
	}
	
	/*
	* Select Image on Page, allow user customize Images
	*	
	* @return html modal box
	*/
	function select_image_on_page(){
		echo Santu_Modal_Box::image_map_html();
		$sell_from_image	=	get_option("santu_sell_from_image",false);
		?>
		<div id="santuLoadModal" class="santuModalBoxD">
			<div id="santuModalBG">
				<div id="santuModal" class="santuModal">
					<div class="smHead">
						<span class="smLogo"><img src="<?php echo SANTU_PLUGIN_DIR; ?>img/i24.png"></span>
						<span class="smTitle"><?php echo __('Select Image on Page','santu'); ?></span>
						<a class="smClose" href="javascript:void(0)">
							<img src="<?php echo SANTU_PLUGIN_DIR; ?>img/x.jpg">
						</a>
					</div><!--smHead Ends-->
					<div class="santuModalContent contentIMAGES ">
						<input type="radio" name="santu-image-type" value="feature-image" id="feature-image">
						<span><?php echo __('Feature Image','santu'); ?></span><span class="stSepr"></span>
						<input type="radio" name="santu-image-type" value="other-images" id="other-images">
						<span><?php echo __('Other Images','santu'); ?></span>
						<div class="feature-img" style="display:block">
						<?php
							$img	=	get_the_post_thumbnail_url(get_the_ID());
							if(!empty($img)){
							?>
							<a href="javascript:void(0)"><img class="choose-img" src="<?php echo $img; ?>"></a>
							<?php }
							else{
								echo '<h3 style="background: #f9f9f9;padding: 17px;">'.__('You must add featured image to you page, first !','santu').'</h3>';
							}
							?>
						</div>
						<div class="other-imgs" style="display:none"><ul></ul></div>
						<div class="selected-img" style="display:none"><ul></ul></div>
					</div><!--santuModalContent Ends -->
					<div class="smFoot">
						<div class="smLogo">
							<img src="<?php echo SANTU_PLUGIN_DIR; ?>img/logo.jpg">
						</div>
						<div class="smControl">
							<a href="<?php echo esc_url_raw($sell_from_image); ?>" class="smBtn smbtn2 " target="_blank">
								<?php echo __('Help','santu'); ?>
							</a>
							<a href="javascript:void(0)" class="smBtn smbtn1" id="smbtnNEXT">
								<?php echo __('Next','santu'); ?>
							</a>
							<a href="javascript:void(0)" class="smBtn smbtn2 Closesm">
								<?php echo __('Cancel','santu'); ?>
							</a><!--onclick="page_reload()"-->
						</div>
					</div> <!--smFoot Ends-->
				</div>
			</div>
		</div>
		<?php
	}
	
	function santu_retrive_media_images(){
		$query_images_args	=	array('post_type'=>'attachment','post_mime_type'=>'image','post_status'=>'inherit','posts_per_page'=>-1);
		$query_images	=	new WP_Query($query_images_args);
		echo '<ul>';
		foreach ( $query_images->posts as $image){
			$src	=	wp_get_attachment_url($image->ID);
			echo'<li><a href="javascript:void(0)"><img src="'.$src.'" class="choose-img"></a></li>';
		}
		echo '</ul>';
	}
	
	function image_map_html(){
		echo '<div class="img-map" style="display:none">';
			include('image-mappping.php');
		echo '</div>';
	}
	
	/*
	* Tool Tip
	*
	* @since  1.0.0
	* @param  string $content
	* @return html tool tip pop up
	*/
	public static function tool_tip($content){
	?>
		<a href="javascript:void(0)" class="smToolTip">
			<span><?php echo $content; ?></span>
			<img src="<?php echo SANTU_PLUGIN_DIR; ?>img/q.jpg">
		</a>
		<?php
	}
	
}
add_action('plugins_loaded',array('Santu_Modal_Box','init'));