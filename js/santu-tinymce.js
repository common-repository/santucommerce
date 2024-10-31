jQuery(document).ready(function(e){(function($){(function(){

	tinyMCE.init({

		selector: 'textarea',

		invalid_elements:'p',

	//	theme : "advanced",

		force_br_newlines	: true,

		force_p_newlines	: false,

		forced_root_block	: '',

		extended_valid_elements:"*[*]",

		valid_children	: 'span[map|img|#text]',

		valid_elements : 'span[class=mapedImg]',

		nowrap : true

	});

	tinymce.PluginManager.add('santu_button',function(editor,url){

		editor.addButton( 'santu_button',{title:'',text:'',icon:'icon santu-16-icon',type:'menubutton',

			menu:[

				{

					text:st_lang.s15,value:'',

					onclick:function(){

						tinyMCE.get('content').focus();

						sm 		=	tinymce.activeEditor.selection;

						fnd		=	sm.getNode();

						cont 	=	tinymce.activeEditor.selection.getContent({format:'html'});

						smbA 	=	'.santuModalBoxA';

						$(smbA+' input[type="text"]').each(function(){$(this).val('')});

						$(smbA+" input[type='radio']").attr('checked', false);

						$(smbA+" input[type='radio']:first").attr('checked', true);

						$(smbA+" select").prop('selectedIndex',0);

						$('.santuModalContent .spGrp1 select').hide();

						$('.santuModalContent .spGrp1 input[type="text"]').show();

						$(smbA).addClass('stActiveModal').show();

						cnt	=	tinymce.activeEditor.selection.getContent({format:'html'});

						if(cont.indexOf('<img ')>=0){

							var txt			=	fnd.alt;

							var imgClass		=	$(fnd).attr("class");

							var imgClasArr	= 	imgClass.split(" ");

							var totalClasses	= 	imgClasArr.length;

							var lastClass    	= 	imgClasArr[totalClasses-1];

							if( totalClasses > 3){var prl = lastClass;}

							else{var prl = '';}

						}

						else{

							var txt	=	tinymce.activeEditor.selection.getContent({format:'text'});

							var prl	=	fnd.href;

						}

						var img	=	tinymce.activeEditor.selection.getContent({format:'img'});

						if((txt)&&(img=='')){

							$('.spGrp2').show(); // show input to add title in a tag

							$('.stProduct_title').val(txt);

						}

						else if((img)&&(txt=='')){

							$('.spGrp2').hide();  // client said no need to add title for image

							if(prl){

								cont	=	fnd.innerHTML;

								txt 	=	cont.replace(/<img[^>]*>/g,"");

								$('.stInsertBuyNowLink .stProduct_title').val(txt);

							}

						}

						else{

							$('.stInsertBuyNowLink .stProduct_title').val(txt);

							$('.spGrp2').show();

						}

						if(prl){

							stArr	=	[];

							srl		=	santuStoreURL;

							stArr.push(srl)

							var spu =  srl+'/carts'; stArr.push(spu);

							var sts	=	srl+'/search'; stArr.push(sts);

							var stp	=	srl+'/cart/signup'; stArr.push(stp);

							var stl	=	srl+'/cart/login'; stArr.push(stl);

							var lnl	=	jQuery.inArray( prl, stArr );

							if( lnl == -1 ){$('.stInsertBuyNowLink .stProduct_link').val(prl)}

							else{

								$('#special_links').attr('checked',true).trigger('change');

								$('#special_link_drodown option:eq('+lnl+')').attr('selected','selected');

							}

						}

					}

				},

				{

					text:st_lang.s16,value:'',

					onclick:function(){

						tinyMCE.get('content').focus();

						smbB	=	'.santuModalBoxC';

						$(smbB+' input[type="text"]').each(function(){$(this).val('')});

						$(smbB+" input[type='radio']").attr('checked',false);

						$(smbB+" input[name='source_type']:first").attr('checked',true);

						$(smbB+" select").prop('selectedIndex',0);

						$('.santuModalContent .spGrp1 select').hide();

						$('.santuModalContent .spGrp1 input[type="text"]').show();

						$(smbB).addClass('stActiveModal').show();

						sm 	=	tinymce.activeEditor.selection;

						fnd	=	sm.getNode();

						prl = 	fnd.href;

						if( prl ){

							stArr	=	[];

							srl		=	santuStoreURL;

							stArr.push(srl);

							var spu	=	srl+'/carts'; stArr.push(spu);

							var sts	=	srl+'/search'; stArr.push(sts);

							var stp	=	srl+'/cart/signup'; stArr.push(stp);

							var stl	=	srl+'/cart/login'; stArr.push(stl);

							var lnl	=	jQuery.inArray( prl, stArr );

							if(lnl==-1){

								$('#product_adress_button').val(prl);

							}

							else{

								$('#button_special_links').attr('checked',true).trigger('change');

								$('#special_link_button:eq('+lnl+')').attr('selected','selected');

							}

						}

						santu_load_button();

					}

				},

				{

					text:'Sell From Image',value:'',id:'slfimg',onclick:function(){

						tinyMCE.get('content').focus();

						var smbd='.santuModalBoxD',img_type=$('input[name=santu-image-type]:checked').val();

						$(smbd).addClass('stActiveModal').show();

						/**Retrieve All Images from editor **/

						var imgsArr 	=	new Array();

						var classArr	=	new Array();

						var atr_umaps=	new Array();

						var idArr	=	new Array();

						var atr_alts	=	new Array();

						var ictr 		= 	0;

						$(tinyMCE.activeEditor.dom.getRoot()).find('img').each(function() {

							/**Add unique id for all images into editor**/

							$(tinyMCE.activeEditor.dom.setAttrib($(this),'id','img_'+ictr));

							imgsArr.push($(this).attr("src"));

							idArr.push($(this).attr("id"));

							classArr.push($(this).attr("class"));

							atr_umaps.push($(this).attr("usemap"));

							atr_alts.push($(this).attr("alt"));

							ictr++;

						});

						if(!jQuery.isEmptyObject(imgsArr)){

							$('.other-imgs ul').empty(); // make empty before append

							for(var i=0;i<imgsArr.length;i++){

								var srcA	=(imgsArr[i]);

								var clsnm	=	(classArr[i]);

								var idA		=	(idArr[i]);

								var usemap	=	(atr_umaps[i]);

								var img_alt	=	(atr_alts[i]);

								$('.other-imgs ul').append('<li><a href="javascript:void(0)"><img class="'+clsnm+' choose-img" src="'+srcA+'" usemap="'+usemap+'" alt="'+img_alt+'" id="'+idA+'"></a></li>');

							}

						}

						else{

							$('.other-imgs ul').html('<li style="width: 100%;text-align: center;display:block;padding:0"><h3>You must add images to your page, first !</h3></li>');

						}

						var slctd_img=tinymce.activeEditor.selection.getContent({format:'html'});

						if(slctd_img==''){show_all_imgs()}

						/**	Retrieve Selected Image from editor	**/

						if(slctd_img!=''){

							$('.selected-img').html('<li><a href="javascript:void(0)">'+slctd_img+'</a></li>').show();

							$('.selected-img li img').addClass("choose-img");

							var srcB=$(slctd_img).attr('src');

							$('#selected-img-name').val('').val(srcB);

							$('#url').val('').val(srcB);

							$('.other-imgs').hide();

							$('.feature-img').hide();

							/*Radio Buttons*/

							$('#other-images').prop('checked',false);

							$('#feature-image').prop('checked',false);

						}

					}

				},

				{text:'Embed Store',value:'',onclick:function(){smbE='.santuModalBoxE';$(smbE).addClass('stActiveModal').show();}

				},

				{text:'Manage Products',value:'',onclick:function(){window.open('https://app.santu.com/buynow/product','_blank')}},

				{text:'Manage Store',value:'[santu_buy_now_link]',onclick:function(){window.open('https://app.santu.com/buynow','_blank')}},

				{text:'Help',value:'',onclick:function(){window.open('http://goto.3d3.com/wphelp/','_blank')}},

			],

			onclick:function(){is_santu_url_not_set()}

		});

	});

})();



}(jQuery))});



/**

* Function :	show_all_imgs

*

** Description: Display all images from editor

*/

var show_all_imgs=function (){

	$('.other-imgs').show();

	$('.selected-img').hide();

	$('.feature-img').hide();

	$('#other-images').prop('checked',true);

}