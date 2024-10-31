/**
* Santu Button Editor
* @since: 1.0.1
* @developer: CodeFlox
*/
var santu=function(){
	this.init=function(){
		santu.embed_store();
	};
	this.embed_store=function(){
		$	=	jQuery;
		$(document).on('change','.stebdStor .spGrp0 input',function(){v=$(this).val();sc=$('.stescat');sp=$('.stessp');if(v==2){sc.hide();sp.show()}else{sc.show();sp.hide()}});
		$(document).on('click','.santuModalBoxE .smbtnOk',function(){
			v=$('.stebdStor .spGrp0 input:checked').val();
			if(v==2){l=$('.stessp').find(':selected').val()}else{l=$('.stescat').val()}
			if(cf_is_valid_URL(l)==true){$('.santuModalBoxE').hide();tinymce.activeEditor.execCommand('mceInsertContent',false,'[santu_embed url= "'+l+'"]')}
		});
	};
};
santu=new santu();
santu.init();

jQuery(document).ready(function(e){(function($){
	/*----------------------------------------------------------------*/
	/*		 Button Preview text Change 			*/	
	/*--------------------------------------------------------------*/
	var santu_button_text_change=function(){
		$(document).on('keyup','.stMButton_text,.stBtnSubTxt',function(){v=$(this).val();l=v.length;if(l>21){alert(st_lang.s8)}else{if($('.stPrwBtn').find("img").length>0){it=$('.stPrwBtn img');sz=it.attr('width');sr=it.attr('src');pd=cf_getCookie('smIconPadding');if(pd=='false'){pd='10px'}po=cf_getCookie('stIconPosition');if(po=='false'){ po='left'}$('.stPrwBtn').html(' ');if(po=='right'){$('.stPrwBtn').html(v+'<img src="'+sr+'" width="'+sz+'" height="'+sz+'" style="margin-left:'+pd+'">')}else{$('.stPrwBtn').html('<img src="'+sr+'" width="'+sz+'" height="'+sz+'" style="margin-right:'+pd+'">'+v)}}else{$('.stPrwBtn').html(v)}cf_setCookie('stBtnTxt',v)}});
		$(document).on('change','.stSButton_text',function(){v=$(this).find(":selected").text();pr=$('.stPrwBtn');if(pr.find("img").length>0){it=$('.stPrwBtn img');sz=it.attr('width');sr=it.attr('src');pd=cf_getCookie('smIconPadding');if(pd=='false'){pd='10px'}po=cf_getCookie('stIconPosition');if(po=='false'){ po='left'}pr.html(' ');if(po=='right'){pr.html(v+'<img src="'+sr+'" width="'+sz+'" height="'+sz+'" style="margin-left:'+pd+'">')}else{pr.html('<img src="'+sr+'" width="'+sz+'" height="'+sz+'" style="margin-right:'+pd+'">'+v)}}else{pr.html(v)}cf_setCookie('stBtnTxt',v)});
	}
	/*
	* Color Work: Text Color Gradient Color etc.
	*/
	var santu_color_picker=function(e){
		$(e).spectrum({
		    allowEmpty:true,showInput: true,containerClassName:"full-spectrum",showInitial:true,showPalette:true,showSelectionPalette:true,showAlpha:true,maxPaletteSize:10,preferredFormat:"hex",
		    localStorageKey:"spectrum.demo",
		    move: function(color){
		    	cob	=	$(this).spectrum("get");
		    	hex	=	cob.toHex();
		    	cl	=	'#'+hex;
				$(e).attr('dval',cl);
				$(e).find('div').css('background-color',cl);
				font_color_hover 		=	'#smBtnFontColorH';
				gradient_top 			=	'#smBtnGradientTopColor';
				gradient_bottom 		=	'#smBtnGradientBottomColor';
				gradient_hover_top 	=	'#smBtnGradientTopColorH';
				gradient_hover_bottom	=	'#smBtnGradientBottomColorH';
				border_color 			= 	'#smBtnBorderColor';
				border_hover_color 	= 	'#smBtnBorderColorH';
				//Background
				if(e==gradient_top||e==gradient_bottom){
					if(e==gradient_top){
						arrD=[cl,$(gradient_bottom).attr('dval')];
						santu_update('background',arrD,'n');
					}
					else{
						arrE=[$(gradient_top).attr('dval'),cl];
						santu_update('background',arrE,'n');
					}
				}
				//Background Hover
				else if(e==gradient_hover_top||e==gradient_hover_bottom){
					if(e==gradient_hover_top){
						arrA	=	[cl,$(gradient_hover_bottom).attr('dval')];
						santu_update('background',arrA,'h');
					}
					else{
						arrB = [$(gradient_hover_top).attr('dval'),cl];
						santu_update('background',arrB,'h');
					}
				}
				else if(e==border_color){
					santu_update('border-color',cl,'n');
				}
				else if(e==border_hover_color){
					santu_update('border-color',cl,'h');
				}
				else if(e==font_color_hover){
					santu_update('color',cl,'h');
				}
				else{
					santu_update('color',cl,'n');
				}
		    },
		    show: function () {},
		    beforeShow:function(){},
		    hide:function(color) {},
		    palette:[
			["#000000","#434343","#666666","#999999","#b7b7b7","#cccccc","#d9d9d9","#efefef","#f3f3f3","#ffffff"],
			["#980000","#ff0000","#ff9900","#ffff00","#00ff00","#00ffff","#4a86e8","#0000ff","#9900ff","#ff00ff"],
			["#e6b8af","#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#c9daf8","#cfe2f3","#d9d2e9","#ead1dc","#dd7e6b"],
			["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#a4c2f4","#9fc5e8","#b4a7d6","#d5a6bd","#cc4125","#e06666"],
			["#f6b26b","#ffd966","#93c47d","#76a5af","#6d9eeb","#6fa8dc","#8e7cc3","#c27ba0","#a61c00","#cc0000","#e69138"],
			["#f1c232","#6aa84f","#45818e","#3c78d8","#3d85c6","#674ea7","#a64d79","#85200c","#990000","#b45f06","#bf9000"],
			["#38761d","#134f5c","#1155cc","#0b5394","#351c75","#741b47","#5b0f00","#660000","#783f04","#7f6000","#274e13"],
			["#0c343d","#1c4587","#073763","#20124d","#4c1130"]]
		});
	}
	var santu_get_btn_font_size=function(){
		$('.smBtnSize').jRange({from:10,to:42,step:1,format:'%s',width:200,showLabels:false,scale:false,onstatechange:function(){
			fs	=	$('.smBtnSize').val();
			$('#smBtnFontSize').attr('dval',fs);
			santu_update('font-size',fs+'px','n')}
		}
	)}
	var santu_reset_cookies=function(){
		cf_setCookie('stIconID',false);
		cf_setCookie('st_btn_edit',false);
		cf_setCookie('stCustomBtnPID','');
		cf_setCookie('stCustomBtnPID2','');
		cf_setCookie('stIconID','false');
		cf_setCookie('smBtnSize',false);
		cf_setCookie('smIconPadding',false);
		cf_setCookie('stIconPosition',false);
		cf_setCookie('st_bid','');
	}
	/* Collection and My Collection Button Load... */
	var santu_get_my_collection_button=function(btn){
			santu_reset_cookies();
			$.ajax({type:"POST",url:santu.ajax,data:{'action':'get_button_css_ajax','act':'get_my_collection','btn':btn},
				success:function(data){
				st_loader_hide();
				if(data){
					santu_reset_editor();
					cf_setCookie('st_btn_edit','false');cf_setCookie('stBtnEditN','true');
					cf_setCookie('stBtnEditH','true');cf_setCookie('st_btn_name','scbt_'+btn);
					cf_setCookie('st_bid',btn);
					o 	=	'';
					ar 	= 	JSON.parse(data);
					sn 	=	ar['n'];
					sh 	=	ar['h'];
					sv 	=	ar['v'];
					sa 	=	ar['a'];
					sb 	=	ar['b'];
					nb	=	santu_jsonTocss(sn);
					hb 	=	santu_jsonTocss(sh,':hover');
					vb 	=	santu_jsonTocss(sv,':active');
					ab 	=	santu_jsonTocss(sa,'::before');
					bb	=	santu_jsonTocss(sb,'::after');
					santu_load_in_editor(sn);santu_load_in_editor(sh,':hover');
					if(nb){o+=nb}if(hb){o+=hb}if(vb){o+=vb}if(ab){o+=ab}if(bb){o+=bb}
					$('#stPreBtnCSS').html(o);
					bttxt=cf_getCookie('stBtnTxt');
				$.ajax({type:"POST",url:santu.ajax,data:{'action':'get_button_css_ajax','act':'get_my_collection_icon','btn':btn},
						success:function(data){
							st_loader_hide();
							bttxt=cf_getCookie('stBtnTxt');
							pr=$('.stPrwBtn');
							if(data){
								narr=JSON.parse(data);
								ic 	=	narr['icon'];
								ur 	=	narr['url'];
								sz 	=	narr['size'];
								po 	=	narr['position'];
								pa 	=	narr['padding'];
								if(sz!='false' && sz!=false){szArr=sz.split('px');nsz=szArr[0]}else{nsz ='16'}
								if(pa!='false' && pa!=false){paArr=pa.split('px');npa=paArr[0]}else{npa='10'}
								$('.stIEPre').html('<img width="16" height="16" src="'+ur+'">');
								$('#smIconSize').attr('dval',nsz);$('#smIconSize').jRange('setValue',nsz)
								if(po=='right'){$('.stIconPosition input[value="right"]').attr('checked',true)}
								else{$('.stIconPosition input[value="left"]').attr('checked',true)}
								$('#smIconPadding').attr('dval',npa);$('.smIconPadding').jRange('setValue',npa)
								if(bttxt){ txt=bttxt }else{ txt=st_lang.s1;}
								cf_setCookie('stIconID',ic);cf_setCookie('stIconURL',ur);
								pr.html(' ');
								$('.stIEPre').html('<img class="stbicon" width="16" height="16" src="'+ur+'">');
								if(po=='right'){pr.html(txt+'<img class="stbicon" width="16" height="16" src="'+ur+'">')}
								else{pr.html('<img class="stbicon" width="16" height="16" src="'+ur+'">'+txt)}
								santu_update_icon_change('smIconSize',nsz);
								santu_update_icon_change('stIconPosition_load',po);
								santu_update_icon_change('smIconPadding_load',npa);
								cf_setCookie('st_btn_edit',false);
							}
							else{
								if(bttxt){ txt=bttxt }else{ txt=st_lang.s1;}
								pr.html(txt)
							}
						},error:function(err){st_loader_hide()}
					});
				}
			},error:function(err){st_loader_hide()}
		});
	}
	santu_get_collection_button=function(btn,cll){
		santu_reset_cookies();
		$.ajax({
			type:"POST",url:santu.ajax,
			data:{'action':'get_button_css_ajax','act':'get','btn':btn,'cll':cll},
			success:function(data){
				st_loader_hide();
				if(data){
					santu_reset_editor();
					cf_setCookie('st_btn_edit','false');cf_setCookie('stBtnEditN','true');
					cf_setCookie('stBtnEditH','true');cf_setCookie('st_btn_name',btn);
					cf_setCookie('st_btn_collection',cll);
					o 	=	'';
					ar 	=	JSON.parse(data);
					sn 	=	ar['n'];
					sh 	=	ar['h'];
					sv 	=	ar['v'];
					sa 	=	ar['a'];
					sb 	=	ar['b'];
					nb	=	santu_jsonTocss(sn);
					hb 	=	santu_jsonTocss(sh,':hover');
					vb 	=	santu_jsonTocss(sv,':active');
					ab 	=	santu_jsonTocss(sa,'::before');
					bb	=	santu_jsonTocss(sb,'::after');
					santu_load_in_editor(sn);
					santu_load_in_editor(sh,':hover');
					if(nb){o+=nb}
					if(hb){o+=hb}
					if(vb){o+=vb}
					if(ab){o+=ab}
					if(bb){o+=bb}
					$('#stPreBtnCSS').html(o);
				}
			},error:function(err){st_loader_hide()}
		});
	}
	var santu_color_reset=function(tg){
		tg.attr('dval','');
		tg.spectrum("set",'');
	}
	/*------------------------------------------*/
	/* 		JSON to CSS 		*/
	/*----------------------------------------*/
	santu_jsonTocss=function(p,delimiter=''){
		if(p!=null){
			arr=santu_btn_css_obj(p);
			dm=delimiter.replace(/:/g,"");
			cf_setCookie('stBtn'+dm,JSON.stringify(arr));
			cf_setCookie('backUpstBtn'+dm,JSON.stringify(arr));
			c='';
			c+='a.stPrwBtn'+delimiter;c+='{';
			narr=[];
			psize=p.length;
			for(z=0; z<psize;z++){
				obj = p[z];
				for(property in obj){
					value=obj[property];
					value=value.replace(' !important','');
					if(value){
						c+=property+':'+value+';'
						narr.push(property)
					}
				}
				//Set defualt font-size if font-size property missing
				if(delimiter==''){
					if(z!=psize-1){}
					else{
						hasFontSize=cf_contains.call(narr,'font-size');
						if(hasFontSize==false){
							c+='font-size:16px;';
						}
					}
				}
			}
			c+='}';
			//Hover state in previews
			if(delimiter==':hover'){
				c+='a#stPrwBtnHover';c+='{';
				for(z=0; z<p.length; z++){
					obj = p[z];for(property in obj){
						value=obj[property];
						if(value){
							if(property=='color'||property=='border-color'||property=='background'||property=='background-color'){
								c+=property+':'+value+';'
							}else{c+=property+':'+value+';'}
						}
					}
				}c+='}';
			}
			return c
		}
	}
	var santu_jsonTocleanCss=function(json,delimiter=''){
		var p	=	JSON.parse(json);
		if(p!=null){
			arr	=	santu_btn_css_obj(p);
			o	=	'';
			for(z=0; z<p.length;z++){
				obj	=	p[z];
				for(property in obj){
					value	=	obj[property];
					if(value){
						if(delimiter==':hover'){
							if(property=='border-radius'||property=='text-shadow'||property=='border'){								
								pv1=property+':'+value+';';pv1=pv1.replace('!important !important','!important');
								o+=pv1;
							}
							else{
								pv1=property+':'+value+' !important;';pv1=pv1.replace('!important !important','!important');
								o+=pv1;
							}
						}
						else{
							if(property=='background'||property=='color'||property=='border-radius'||property=='text-shadow'||property=='border'||property=='font-family'||property=='box-shadow'||property=='border-width'){
								pv1=property+':'+value+';';pv1=pv1.replace('!important !important','!important');
								o+=pv1;
							}
							else{
								pv1=property+':'+value+' !important;';pv1=pv1.replace('!important !important','!important');
								o+=pv1;
							}
						}
					}
				}
			}
			return o;
		}else{return '';}
	}
	/*----------------------------------------------------------------*/
	/*		 Create Button CSS Object 			*/
	/*-------------------------------------------------------------*/
	var santu_btn_css_obj=function(p){arr=[];for(z=0;z<p.length;z++){obj=p[z];for(property in obj){value=obj[property];arr.push({[property]:value})}}return arr}
	/*---------------------------------------------------------------*/
	/*		 Get Button from COllection 			*/
	/*-------------------------------------------------------------*/
	var santu_reset_editor=function(){$('#stBtnBold,#stBtnItalic').attr('checked',false)}
	var santu_change_prview=function(){
		$(document).on('change','.stSpecial_link ',function(){
			v	=	$(this).find(':selected').attr('dval');
			santu_special_link_change_txt(v);
			cf_setCookie('stBtnTxt',v);
		});
		$(document).on('change','#button_special_links',function(){
			if($(this).is(':checked')){
				v	=	$('#special_link_button').find(':selected').attr('dval');
				santu_special_link_change_txt(v)
				$('.smControl .smbtnOk').html('Insert Special Link');
			}
		});
		$(document).on('change','#button_product_address',function(){
			if($(this).is(':checked')){
				$('.smControl .smbtnOk').html('Ok');
			}
		});
		
		$(document).on('click','.btnColorRadio input[name="btnColor"]',function(){
			v	=	$(this).val();
			tg	=	$('.santuModalBoxB .smPreview a');
			if(v==2){tg.attr('id','stPrwBtnHover')}
			else{
				tg.attr('id','');
				tg.addClass('stPrwBtn')
			}
		});
		$(document).on('change','.stInsertBuyNowButton input[name="source_type"]',function(){
			v	=	$(this).val();
			if(v=='address'){
				t=$('.stBtnSubTxt').val();
				santu_special_link_change_txt(t)
			}
		})
	}
	var santu_special_link_change_txt=function(v){
		
		$('.stProduct_title,.stMButton_text,.stMButton_text').val(v);
		
		if($('.stPrwBtn').find("img").length>0){
			imgtg	=	$('.stPrwBtn img');
			size 	=	imgtg.attr('width');
			src 		=	imgtg.attr('src');
			smIcPd 	=	cf_getCookie('smIconPadding');if(smIcPd=='false'){smIcPd='10px'}
			smIcPo 	=	cf_getCookie('stIconPosition');if(smIcPo=='false'){ smIcPo='left'}
			$('.stPrwBtn').html(' ');
			if(smIcPo=='right'){
				$('.stPrwBtn').html(v+'<img src="'+src+'" width="'+size+'" height="'+size+'" style="margin-left:'+smIcPd+'">');
			}
			else{
				$('.stPrwBtn').html('<img src="'+src+'" width="'+size+'" height="'+size+'" style="margin-right:'+smIcPd+'">'+v);
			}
		}
		else{$('.stPrwBtn').html(v)}
	}
	var santu_init=function(){
		$('input[name=btnColor][value="1"]').prop('checked','checked');
		santu_button_text_change();
		/*--------------------------------------------------------------------------------------------*/
		/*		 Button Style Section / Button Customize Section 			*/
		/*------------------------------------------------------------------------------------------*/
		$(document).on('change','.btnColorRadio input',function(){v=$(this).val();if(v==1){$('.btnClrA').show();$('.btnClrB').hide()}else{$('.btnClrA').hide();$('.btnClrB').show()}});
		$(document).on('change','.smBtnFont',function(){ft=$(this).find('option:selected').text();$('#smBtnFont').attr('dval',ft);santu_update('font-family',ft,'n')});
		$(document).on('change','.stBtnBold',function(){if($(this).is(':checked')){$('#stBtnBold').attr('dval','bold');santu_update('font-weight','bold','n');}else{$('#stBtnBold').attr('dval','inherit');santu_update('font-weight','inherit','n')}});
		$(document).on('change','.stBtnItalic',function(){if($(this).is(':checked')){$('#stBtnItalic').attr('dval','italic');santu_update('font-style','italic','n')}else{$('#stBtnItalic').attr('dval','inherit');santu_update('font-style','inherit','n')}});
		santu_color_picker('#smBtnFontColor');santu_color_picker('#smBtnBorderColor');santu_color_picker('#smBtnFontColorH');santu_color_picker('#smBtnBorderColorH');santu_color_picker('#smBtnGradientTopColor');santu_color_picker('#smBtnGradientBottomColor');santu_color_picker('#smBtnGradientTopColorH');santu_color_picker('#smBtnGradientBottomColorH');santu_get_btn_font_size();
		$(document).on('change','.stCollSel',function(){$('.stCollTab').hide();$('.'+$('option:selected',this).attr('tab')).show()});
		$(document).on('change','.stAllMyCollect input[name="collection"]',function(){v=$(this).val();if(v==2){$('.stAlColTab').hide();$('.stMyColTab').show()}else{$('.stAlColTab').show();$('.stMyColTab').hide()}});
		$(document).on('click','.santuModalBoxB .smbtnOk',function(){$('.santuModalBoxB').hide().removeClass('.stActiveModal');$('.santuModalBoxC').addClass('.stActiveModal')});
		$('.stcACBtn a').trigger('click');
		santu_remove_my_collection_btn();
		santu_change_prview();
		santu_get_recent_button();
	}
	/*---------------------------------------------------------*/
	/*		 Load Editor Values 			*/
	/*------------------------------------------------------*/
	var santu_load_in_editor=function(p,dm=''){
		if(p!=null){
			nar=[];arr=santu_btn_css_obj(p);dv=dm.replace(/:/g,"");cf_setCookie('stBtn'+dv,JSON.stringify(arr));cf_setCookie('backUpstBtn'+dv,JSON.stringify(arr));
			psz=p.length;o='a.stPrwBtn'+dm;o+='{';for(z=0; z<psz; z++){obj=p[z];for(pr in obj){vl=obj[pr];o+=pr+':'+vl+';';santu_set_editor_value(pr,vl,dm,arr);nar.push(pr)}}o+='}';
			//Check font-size and adjust range defualt 16px
			if(dm==''){hfs=cf_contains.call(nar,'font-size');if(hfs==false){var fs=$('#smBtnFontSize');si='16';fs.val(16).attr('dval',16);$('#smBtnFontSize').jRange('setValue',si)}}
		}
	}
	/* Update Button Values in Picker */
	var santu_set_editor_value = function(k,v,h='',arr=''){
		v=v.replace(' !important','');
		blk='rgba(0,0,0,0)';
		bgc='background-color';fs=$('#smBtnFontSize');ft=$('#smBtnFont');fb=$('#stBtnBold');fi=$('#stBtnItalic');
		fc=$('#smBtnFontColor');gt=$('#smBtnGradientTopColor');gb=$('#smBtnGradientBottomColor');bc=$('#smBtnBorderColor');
		fch=$('#smBtnFontColorH');gth=$('#smBtnGradientTopColorH');gbh=$('#smBtnGradientBottomColorH');bch=$('#smBtnBorderColorH');
		if(h==''){
			if(k=='font-size'){si=v.replace(/px/g,"");fs.val(si).attr('dval',si);if(si){si=si}else{si='16'}fs.jRange('setValue',si)}
			if(k=='font-weight'){if(v=='bold'||v=='700'||v=='800'){fb.attr('checked',true)}else{fb.attr('checked',false)}}
			if(k=='font-style'){if(v=='italic'){fi.attr('checked',true)}else{fi.attr('checked',false)}}
			if(k=='font-family'){if(ft.find('option').text.length>0){ft.attr('dval',v);ft.find('option[value="'+v+'"]').attr('selected','selected')}}
			if(k=='color'){fc.attr('value',v);fc.spectrum("set",v)}
			else if(k=='border-color'||k=='border'){cv=cf_getColor(v);bc.attr('value',cv[0]);bc.spectrum("set",cv[0])}
			else if(k=='background-color'||k=='background'){carr=cf_getColor(v);cl=carr.length;
				if(cl==1){gt.attr('dval',carr[0]); gt.spectrum("set",carr[0])}
				else if(cl==2){gt.attr('dval',carr[0]); gt.spectrum("set",carr[0]);gb.attr('dval',carr[1]); gb.spectrum("set",carr[1])}
				else if(cl==3){gt.attr('dval',carr[1]); gt.spectrum("set",carr[1]);gb.attr('dval',carr[2]); gb.spectrum("set",carr[2])}
			}
		}
		/*----- On Hover -----*/
		if(h==':hover'){
			if(k=='color'){fch.attr('dval',v);fch.spectrum("set",v)}
			else if(k=='border-color'||k=='border'){cv=cf_getColor(v);bch.attr('dval',cv[0]);bch.spectrum("set",cv[0])}
			else if(k=='background-color'||k=='background'){
				carr=cf_getColor(v);cl=carr.length;
				if(cl==1){gth.attr('dval',carr[0]);gth.spectrum("set",carr[0]);gbh.attr('dval',carr[0]);gbh.spectrum("set",carr[0])}
				else if(cl==2){gth.attr('dval',carr[0]);gth.spectrum("set",carr[0]);gbh.attr('dval',carr[1]);gbh.spectrum("set",carr[1])}
				else if(cl==3){gth.attr('dval',carr[1]);gth.spectrum("set",carr[1]);gbh.attr('dval',carr[2]);gbh.spectrum("set",carr[2])}
			}
		}
		if(h==':active'){}
		if(h=='::before'){}
		if(h=='::after'){}
	}
	/**============================*/
	/*		 Edit Santu Button CSS 			*/
	/**==========================*/
	sanut_apply_css=function(property,value,type=""){
		o	='';
		if(type=='n'){
			o+=santu_button_normal(property,value,type)+santu_button_static_data('stBtnhover',':hover')
		}
		else if(type=='h'){
			o+=santu_button_hover(property,value,type)+santu_button_static_data('stBtn','')
		}
		return o;
	}
	santu_update=function(property,value,type){
		cf_setCookie('st_btn_edit','true');
		$('#stPreBtnCSS').html(sanut_apply_css(property,value,type));
	}
	santu_has_prp=function(arr,property){
		var count=0;
		for(x=0; x<arr.length; x++){
			for(key in arr[x]){
				if(key==property){count=1}
			}
		}
		if(count==0){return false}
		else{return true}
	}
	santu_add_button_in_editor=function(url,title,css1,css2){
		st_loader_show()
		scode=santu_btn_shortcode(url,title);
		$.ajax({type:"POST",url:santu.ajax,data:{'action':'get_button_css_ajax','act':'get_button','title':title,scode},
			success:function(data){
				st_loader_hide();
				if(data){
					console.log(data);
					bid='scbt_'+scode['bid'];
					sty='<style type="text/css" id="sty_'+bid+'">'+'a#'+bid+'{'+css1+'}'+'a#'+bid+':hover{'+css2+'}'+'</style>';
					$('#content_ifr').contents().find("#sty_"+bid).remove();
					hd=$('#content_ifr').contents().find("head");
					//$(tinymce.activeEditor.getBody()).find('a[data-mce-selected="1"]').remove();
					if(tinymce.activeEditor.selection.getNode().nodeName=='A'){
						         $(tinymce.activeEditor.getBody()).find(tinymce.activeEditor.selection.getNode()).remove(); // Delete before edit
					}
					tinyMCE.activeEditor.selection.setContent('&nbsp;'+data+'&nbsp;');
					//tinymce.activeEditor.execCommand('mceInsertContent',false,data);
				}
			},
			error:function(err){st_loader_hide()}
		});
	}
	santu_btn_shortcode=function(url,title){
		btedit=cf_getCookie('st_btn_edit');
		cpid=cf_getCookie('stCustomBtnPID2');
		if(btedit=='true'||btedit==true){
			pid 	=	cf_getCookie('stCustomBtnPID');
			if(pid==false && pid == 'false'){pid =	cf_getCookie('stCustomBtnPID2')}
			stIconID 	=	cf_getCookie('stIconID');
			smBtnSize=	cf_getCookie('smBtnSize'); if(smBtnSize=='false'){smBtnSize='16'}
			smIcPd 	=	cf_getCookie('smIconPadding');if(smIcPd=='false'){smIcPd='10px'}
			smIcPo 	=	cf_getCookie('stIconPosition');if(smIcPo=='false'){ smIcPo='left'}
			data={icon:stIconID,size:smBtnSize,position:smIcPo,padding:smIcPd,url:url,title:title,id:'scbt_'+pid,bid:pid}
			return data
		}
		else if(cpid){
			pid 		=	cpid;
			stIconID	=	cf_getCookie('stIconID');
			smBtnSize=	cf_getCookie('smBtnSize'); if(smBtnSize=='false'){smBtnSize='16'}
			smIcPd 	=	cf_getCookie('smIconPadding');if(smIcPd=='false'){smIcPd='10px'}
			smIcPo 	=	cf_getCookie('stIconPosition');if(smIcPo=='false'){ smIcPo='left'}
			data={icon:stIconID,size:smBtnSize,position:smIcPo,padding:smIcPd,url:url,title:title,id:'scbt_'+pid,bid:pid}
			return data
		}
		else{
			btid =cf_getCookie('st_btn_name');
			data={url:url,title:title,id:btid,bid:btid}
			return data;
		}
	}
	santu_save_custom_button=function(url,title){
		
		normal	=	cf_getCookie('stBtn');
		if(normal!=false){
			s1	=	normal;
		}
		else{
			s1 = '';
		}
		hover	=	cf_getCookie('stBtnhover');
		if(hover!=false){
			s2	=	hover;
		}
		else{ s2='';}
		active	=	''; 
		s3		=	'';
		after		=	''; 
		s4		=	'';
		before	=	'';
		s5		=	'';
		s1	=	santu_jsonTocleanCss(s1);
		s2 	=	santu_jsonTocleanCss(s2,':hover');
		btedit	=	cf_getCookie('st_btn_edit');
		if(btedit=='true'||btedit==true){
			stIconID	=	cf_getCookie('stIconID');
			if(stIconID && stIconID!=false && stIconID!='false'){
				stIconID 	=	cf_getCookie('stIconID');
				smBtnSize=	cf_getCookie('smBtnSize'); if(smBtnSize=='false'){smBtnSize='16'}
				smIcPd 	=	cf_getCookie('smIconPadding');if(smIcPd=='false'){smIcPd='10px'}
				smIcPo 	=	cf_getCookie('stIconPosition');if(smIcPo=='false'){ smIcPo='left'}
				$.ajax({type:"POST",url:santu.ajax,data:{'action':'get_button_css_ajax','act':'generate_button_icon','title':title,'s1':s1,'s2':s2,'s3':s3,'s4':s4,'s5':s5,'icon':stIconID,'size':smBtnSize,'padding':smIcPd,'position':smIcPo},success:function(data){st_loader_hide();if(data!=0){cf_setCookie('stCustomBtnPID',data);cf_setCookie('strecenttitle',title);santu_add_button_in_editor(url,title,s1,s2)}else{alert(st_lang.s2)}
				},error:function(err){st_loader_hide()}
				});
			}
			else{
				$.ajax({type:"POST",url:santu.ajax,data:{'action':'get_button_css_ajax','act':'generate_button','title':title,'s1':s1,'s2':s2,'s3':s3,'s4':s4,'s5':s5},
				success:function(data){
					st_loader_hide();if(data!=0){cf_setCookie('stCustomBtnPID',data);cf_setCookie('strecenttitle',title);santu_add_button_in_editor(url,title,s1,s2)}else{alert(st_lang.s2)}
				},error:function(err){st_loader_hide()}
				});
			}
		}
		else{santu_add_button_in_editor(url,title,s1,s2);}
	}
	santu_add_prp=function(arr,property,value){pv={};pv[property]=value;return pv}
	santu_rplcBoClr=function(s,v){s=s.replace(' !important','');b=s.split(' ');return s.replace(b[b.length-1],v)}
	/* On normal editor changes */
	santu_button_normal=function(property,value,type=""){
		json 	=	cf_getCookie('stBtn');
		ar 		=	[];
		btedit	= 	cf_getCookie('stBtnEditN');
		if(json!='undefined'||json!=false){
			arr =	JSON.parse(json);
			if(btedit=='true' && btedit!=true){
				if(santu_has_prp(arr,'font-size')==false){ar.push(santu_add_prp(arr,'font-size',santu_getCurrentValue('font-size',type)+'px'))}
				if(santu_has_prp(arr,'font-family')==false){ar.push(santu_add_prp(arr,'font-family',santu_getCurrentValue('font-family',type)))}
				if(santu_has_prp(arr,'font-weight')==false){ar.push(santu_add_prp(arr,'font-weight',santu_getCurrentValue('font-weight',type)))}
				if(santu_has_prp(arr,'font-style')==false){ar.push(santu_add_prp(arr,'font-style',santu_getCurrentValue('font-style',type)))}
				if(santu_has_prp(arr,'color')==false){ar.push(santu_add_prp(arr,'color',santu_getCurrentValue('color',type)))}
				if(santu_has_prp(arr,'border')==false && santu_has_prp(arr,'border-color')==false){ar.push(santu_add_prp(arr,'border-color',santu_getCurrentValue('border-color',type)))}
				if(santu_has_prp(arr,'background')==false && santu_has_prp(arr,'background-color')==false){sbgcarr=santu_getCurrentValue('background',type);ar.push(santu_add_prp(arr,'background','linear-gradient('+sbgcarr[0]+' 5%,'+sbgcarr[1]+' 100%)'))}
			}
			for(x=0; x<arr.length; x++){
				for(key in arr[x]){
					val 	=	arr[x][key];
					ox 	=	{};
					if(property=='background'||property=='background-color'){
						if(key==property){ox[key]=cf_strColorReplace(val,value[0],value[1])}else if(key=='background-color'){ox[key]=cf_strColorReplace(val,value[0],value[1])}
						else{ox[key]=val}
					}
					else{
						if(key==property){ox[key]=value}
						else if(property=='border-color'){
							if(key=='border'){ox[key]=santu_rplcBoClr(val,value)}else if(key=='border-color'){ox[key]=value}else{ox[key]=val}
						}else{ox[key]=val}
					}
					ar.push(ox);
				}
			}
			return santu_jsonTocss(ar);
		}
		cf_setCookie('stBtnEditN','false');
	}

	/* On hover changes */
	santu_button_hover=function(property,value,type=""){
		json 	=	cf_getCookie('stBtnhover');
		ar 		=	[];
		btedit	=	cf_getCookie('stBtnEditH');
		if(json!='undefined'||json!=false){
			arr 	=	JSON.parse(json);
			if(btedit=='true' && btedit!=true){
				if(santu_has_prp(arr,'color')==false){ar.push(santu_add_prp(arr,'color',santu_getCurrentValue('color',type)))}
				if(santu_has_prp(arr,'border')==false && santu_has_prp(arr,'border-color')==false){ar.push(santu_add_prp(arr,'border-color',santu_getCurrentValue('border-color',type)))}
				if(santu_has_prp(arr,'background')==false && santu_has_prp(arr,'background-color')==false){sbgcarr=santu_getCurrentValue('background',type);ar.push(santu_add_prp(arr,'background','linear-gradient('+sbgcarr[0]+' 5%,'+sbgcarr[1]+' 100%)'))}
			}
			for(x=0; x<arr.length; x++){
				for(key in arr[x]){
					val 	=	arr[x][key];
					ox 	=	{};
					if(property=='background'){
						if(key==property){ox[key]=cf_strColorReplace(val,value[0],value[1])}else if(key=='background-color'){ox[key]=cf_strColorReplace(val,value[0],value[1])}
						else{ox[key]	=	val}
					}
					else{
						if(key==property){ox[key]=value}else if(property=='border-color'){if(key=='border'){ox[key]=santu_rplcBoClr(val,value)}else if(key=='border-color'){ox[key]=value}else{ox[key]=val}}else{ox[key]=val}
					}
					ar.push(ox);
				}
			}
			return santu_jsonTocss(ar,':hover');
		}
		cf_setCookie('stBtnEditH','false');
	}
	santu_button_static_data=function(cook,delimiter){
		json	=	cf_getCookie(cook);
		ar 	=	[];
		if(json!='undefined'||json!=false){
			arr	=	JSON.parse(json);
			for(x=0; x<arr.length; x++){for(k in arr[x]){vl=arr[x][k];ox={};ox[k]=vl;ar.push(ox)}}return santu_jsonTocss(ar,delimiter);
		}
	}
	santu_getCurrentValue=function(property,type){
		d='dval';
		if(type=='n'){
			if(property=='font-size'){return $('#smBtnFontSize').attr(d)}
			if(property=='font-family'){return $('#smBtnFont').attr(d)}
			if(property=='font-weight'){if($('#stBtnBold').is(':checked')==true){ return 'bold' }else{ return 'inherit'} }
			if(property=='font-style'){if($('#stBtnItalic').is(':checked')==true){ return 'italic' }else{ return 'inherit'}}
			if(property=='color'){return $('#smBtnFontColor').attr(d)}
			if(property=='border' || property=='border-color'){	return $('#smBtnBorderColor').attr(d)}
			if(property=='background' || property=='background-color'){sbgc =	[$('#smBtnGradientTopColor').attr(d),$('#smBtnGradientBottomColor').attr(d)];return sbgc}
		}
		if(type=='h'){
			if(property=='color'){return $('#smBtnFontColorH').attr(d) }
			if(property=='border' || property=='border-color'){return $('#smBtnBorderColorH').attr(d) }
			if(property=='background' || property=='background-color'){sbgc	=[$('#smBtnGradientTopColorH').attr(d),$('#smBtnGradientBottomColorH').attr(d)];return sbgc}
		}
	}
	santu_update_icon_change=function(property,value){
		cf_setCookie('st_btn_edit','true');
		img =	$('.stPrwBtn img');
		if(property=='smIconSize'){img.attr('width',value);img.attr('height',value);cf_setCookie('smBtnSize',value)}
		else if(property=='stIconPosition_load'){
			cf_setCookie('stIconPosition',value);if(value=='right'){cf_setCookie('stIconPosition',value)}else{cf_setCookie('stIconPosition','left')}
		}
		else if(property=='smIconPadding_load'){
			pad =	value+'px';
			cp 	=	cf_getCookie('stIconPosition');
			cf_setCookie('smIconPadding',pad);if(cp=='right'){img.css('margin-left',pad)}else{img.css('margin-right',pad)}
		}
		else if(property=='stIconPosition'){
			cf_setCookie('stIconPosition',value);if(value=='right'){cf_setCookie('stIconPosition',value)}else{cf_setCookie('stIconPosition','left')}
		}
		else if(property=='smIconPadding'){
			pad =	value+'px';
			cf_setCookie('smIconPadding',pad);
			cp=$('.stIconPosition input:checked').val();if(cp=='right'){img.css('margin-left',pad)}else{img.css('margin-right',pad)}
		}
	}
	santu_icon_edit=function(){
		$('.smIconSize').jRange({from:16,to:32,step:1,format:'%s',width:150,showLabels:false,scale:false,onstatechange:function(){is=$('.smIconSize').val();$('#smIconSize').attr('dval',is);santu_update_icon_change('smIconSize',is)}});
		$('.smIconPadding').jRange({from:5,to:30,step:1,format:'%s',width:150,showLabels:false,scale:false,onstatechange:function(){icp=$('.smIconPadding').val();$('#smIconPadding').attr('dval',icp);santu_update_icon_change('smIconPadding',icp)}});
		$(document).on('change','.stIconPosition input',function(){
			iconid = cf_getCookie('stIconID');
			if(iconid!='false' && iconid !=false){
				v 		=	$(this).val();
				bttxt 	=	cf_getCookie('stBtnTxt');
				btsize 	=	cf_getCookie('smBtnSize')
				btpad	=	cf_getCookie('smIconPadding');
				if(bttxt){txt	=	bttxt }else{ txt=st_lang.s1}
				if(btsize){bsize	=	btsize;}else{bsize=16}
				btpa	=	$('.smIconPadding').attr('dval');
				url	=	cf_getCookie('stIconURL');
				img =	$('.stPrwBtn img');
				if(v=='right'){cf_setCookie('stIconPosition','right');$('.stPrwBtn').html(txt+'<img style="margin-left:'+btpa+'px" width="'+btsize+'" height="'+btsize+'" src="'+url+'">')}
				else{cf_setCookie('stIconPosition','left');$('.stPrwBtn').html('<img style="margin-right:'+btpa+'px" width="'+btsize+'" height="'+btsize+'" src="'+url+'">'+txt)}
			}
			else{alert(st_lang.s3)}
		});
		$(document).on('click','.smbtnChangeIcon',function(){
			$('.santuModalBoxC').hide();
			$('.santuModalBoxB').hide();
			sticonupload = wp.media({
				title		: 	'Upload Icon',
				button 	: 	{text:'Upload Icon'},
				multiple 	: 	false,
				library 	: 	{type:'image'}})
				.on('select',function(){
					atch		=	sticonupload.state().get('selection').first().toJSON();
					ftype	=	atch.subtype;
					width 	=	atch.width;
					height	=	atch.height;
					mid 	=	atch.id;
					csize		=	$('.smIconSize').attr('dval');
					cpostion	=	$('.stIconPosition input:checked').val();
					cpadding	=	$('.smIconPadding').attr('dval');
					cf_setCookie('st_btn_edit','true');
					if(ftype=="png" || ftype=="jpg" || ftype=="jpeg"){
						if(height<=128 && width<=128){
							if(height>=16 && width >=16){
								bttxt=cf_getCookie('stBtnTxt');
								if(bttxt){ txt=bttxt }else{ txt=st_lang.s1; }
								cf_setCookie('stIconID',mid);cf_setCookie('stIconURL',atch.url);cf_setCookie('smBtnSize',csize);cf_setCookie('stIconPosition',cpostion);cf_setCookie('smIconPadding',cpadding);
								$('.santuModalBoxC').show();
								$('.santuModalBoxB').show();
								$('.stPrwBtn').html(' ');
								$('.stIEPre').html('<img class="stbicon" width="20" height="20" src="'+atch.url+'">');
								if(cpostion=='right'){$('.stPrwBtn').html(txt+'<img style="margin-left:'+cpadding+'px" width="'+csize+'" height="'+csize+'" src="'+atch.url+'">')}
								else{$('.stPrwBtn').html('<img style="margin-right:'+cpadding+'px" width="'+csize+'" height="'+csize+'" src="'+atch.url+'">'+txt)}
							}else{alert(st_lang.s4)}
						}else{alert(st_lang.s5)}
					}else{alert(st_lang.s6)}
				}
			).open();
		});
	}
	/* Remove My Collection Button [+] */
	santu_remove_my_collection_btn=function(){$(document).on('click','.stRemoveCollection',function(){re=confirm(st_lang.s7);btn=$(this).attr('bid');if(re==true){$.ajax({type:"POST",url:santu.ajax,data:{'action':'get_button_css_ajax','act':'remove_my_collection_btn','btn':btn},success:function(data){st_loader_hide();if(data==1){$('.scbt_'+btn).parents('li').hide(200)}},error:function(err){st_loader_hide()}})}})}
	
	santu_load_custom_button=function(bid,title,loader=true){ 
		cf_setCookie('stBtnTxt',title);
		$.ajax({
			type:"POST",url:santu.ajax,
			data:{'action':'get_button_css_ajax','act':'load_collection_button','bid':bid},
			success:function(data){
				st_loader_hide();
				if(data){
					ar 	= 	JSON.parse(data);
					cll	=	ar['collection'];
					nbid	=	ar['bid'];
					if(cll=='collection'){
						cll	=	$('.stCollCont .santuButton[btn="'+nbid+'"]').attr('cll');
						if(cll){	santu_get_collection_button(nbid,cll);	}
					}
					else{
						santu_get_my_collection_button(nbid);
						cf_setCookie('stCustomBtnPID2',nbid);
					}
				santu_set_title(title)
				}
			},error:function(err){st_loader_hide()}
		});
	}
	santu_set_title=function(t){		
		var t= t.replace(/<[^>]*>/g, "");
		if(t){
			$('.stMButton_text,.stBtnSubTxt').val(t).hide();
			$('.smPreview .santuButton').text(t);
			cf_setCookie('stBtnTxt',t);			
			/// htwey hoey
			//$('.stSButton_text option[value="'+t+'"]').each(function(){$(this).remove()})
			//$('.stSButton_text').find('option').removeAttr("selected");
			//$('.stSButton_text').append(new Option(t,t,true))	
			//$('.stSButton_text option[value="'+t+'"]').attr('selected','selected')
			//$('.stSButton_text option[value="'+t+'"]').find();
			if($('.stSButton_text option:contains("'+t+'")').length > 0){
				$('.stSButton_text').find('option').removeAttr("selected");
				$('.stSButton_text').find('option:contains("'+t+'")').attr('selected','selected');
			}
			else{
				$('.stSButton_text option[value=""]').attr('selected','selected');	
			}
			$('.stdropdown').show();  // Custom 
		}
	}

	$(document).on('click','.santuModalBoxB .smbtnReset',function(){
		btn=cf_getCookie('st_btn_name');
		cll=cf_getCookie('st_btn_collection',cll);
		if(btn&&cll){
			santu_get_collection_button(btn,cll);
		}
	});
	
	//Load Pre-defined collection
	/*---------------------------------------------------------------*/
	/* 		Click on Collection button 			*/
	/*-------------------------------------------------------------*/
	$(document).on('click','.stCollTab .santuButton',function(){	
		cf_setCookie('st_btn_id',$(this).attr('btn'));
		cf_setCookie('st_btn_tp','1');		
		$('.stCollTab li').removeClass('stcACBtn');
		$(this).parents('li').addClass('stcACBtn');
		btn	=	$(this).attr('btn');
		cll	=	$(this).attr('cll');
		santu_get_collection_button(btn,cll);
		santu_color_reset($('#smBtnFontColor'));
		santu_color_reset($('#smBtnGradientTopColor'));
		santu_color_reset($('#smBtnGradientBottomColor'));
		santu_color_reset($('#smBtnBorderColor'));
		santu_color_reset($('#smBtnFontColorH'));
		santu_color_reset($('#smBtnGradientTopColorH'));
		santu_color_reset($('#smBtnGradientBottomColorH'));
		santu_color_reset($('#smBtnBorderColorH'));
	});
	//Load my collection
	$(document).on('click','.stMyCollTab .santuButton',function(){
		cf_setCookie('st_btn_id',$(this).attr('bid'));
		cf_setCookie('st_btn_tp','2');
		$('.stMyCollTab li').removeClass('stcACBtn');
		$(this).parents('li').addClass('stcACBtn');
		btn=$(this).attr('bid');
		title=$(this).attr('title');
		$('.stBtnSubTxt').val(title);
		cf_setCookie('stBtnTxt',title);
		santu_get_my_collection_button(btn);
		cf_setCookie('stCustomBtnPID2',btn);
	});
	
	/* --------------------------------------- Santu Modal Box -------------------------------------- */
	/* Insert button in editor */
	santu_update_recent_button=function(){
		tab	=	$('.stInsertBuyNowButton');
		d	=	cf_getCookie('st_btn_id');
		t	=	cf_getCookie('st_btn_tp');
		v	=	tab.find('input[name="source_type"]:checked').val();
		if(v=='address'){
			l=tab.find('.stProduct_link').val();
			x=$('.stBtnSubTxt').val();
		}
		else{
			l=tab.find('.stSpecial_link option:selected').val();
			x=tab.find('.stMButton_text').val();
		}
		$.ajax({
			type:"POST",url:santu.ajax,
			data:{'action':'get_button_css_ajax','act':'update_recent_button','btn_id':d,'btn_tx':x,'btn_lk':l,'btn_tp':t},
			success:function(data){
				st_loader_hide();
			}
		});
	}
	
	santu_get_recent_button=function(){
		$.ajax({
			type:"POST",url:santu.ajax,
			data:{'action':'get_button_css_ajax','act':'get_recent_button'},
			success:function(data){
				st_loader_hide();
				if(data){
					ar	=	JSON.parse(data);
					id	=	ar['id'];
					ty	=	ar['type'];
					tx 	=	ar['text'];
					ln 	=	ar['link'];
					if(ty==1){
						cll	=	$('.stCollCont ul li').find('#'+id).attr('cll');
						santu_get_collection_button(id,cll);
					}
					else{
						santu_load_custom_button(id,tx,false);
					}
					//$('#product_adress_button').val(ln);
					santu_set_title(tx);
				}
				else{
					id='mixbtno124';
					cll	=	$('.stCollCont ul li').find('#'+id).attr('cll');
					santu_get_collection_button(id,cll);
				}
			}
		});
	}
	
	$(document).on('click','.santuModalBoxC .smbtnOk',function(){
		$('.smControl .smbtnOk').html('OK');
		santu_update_recent_button();
		
		sibnb	=	$('.stInsertBuyNowButton');
		stype	=	sibnb.find('input[name="source_type"]:checked').val();
		
		if(stype=='links'){
			link	=	sibnb.find('.stSpecial_link').val();
			text	=	sibnb.find('input.stMButton_text').val();
		}
		else{
			link	=	sibnb.find('.stProduct_link').val();
			text	=	sibnb.find('.stBtnSubTxt').val();
			if(text==''){
				text	=	sibnb.find('.stSButton_text').val();
			}
		}
		if(link){
			if(cf_is_valid_URL(link)){
				if(text){
					santu_save_custom_button(link,text);
					$('.santuModalBoxC').removeClass('stActiveModal').hide();
				}
				else{alert(st_lang.s12);}
			}
			else{alert(st_lang.s13);}
		}
		else{alert(st_lang.s14);}
	});
	
	/* Get Current Active Modal */
	var santu_active_modal=function(x,y=null){$=jQuery;a='stActiveModal';$(x).addClass(a).show();if(y!=null){$(y).removeClass(a)}};
	$('.smClose,.smbtnCancel').click(function(){$(this).parents('#santuLoadModal').hide();});
	$('.Closesm').click(function(){
		$(this).parents('#santuLoadModal').hide();
		$('#selected-img-name').val('');
		var ed 		= 	tinyMCE.activeEditor;
		var newNode	=	ed.dom.select('p');
		ed.selection.select(newNode[0]);
	});
	$('.smbChangeButton').click(function(){santu_active_modal('.santuModalBoxB','.santuModalBoxC')});
	
	function isBold(){
		var isBold = false;
		if (document.queryCommandState) {
			isBold = document.queryCommandState("bold");
		}
		return true;
	}
	function isItalic(){
		var isItalic = false;
		if (document.queryCommandState) {
			isItalic = document.queryCommandState("em");
		}
		return true;
	}
	function isItalic_and_Bold(cnt){	
		var italic =	isItalic(cnt);
		var bold =	isBold(cnt);
		if ((italic==true)&&(bold==true)) {
			return true;
		}
		return false;
	}
	$(document).on('click','.santuModalBoxA .smbtnOk',function(){
		tab	=	$('.stInsertBuyNowLink');
		srt	=	tab.find('.spGrp0 input[name=source_type]:checked').val();
		if(srt=='links'){
			link	=	tab.find('.stSpecial_link option:selected').val();
		}
		else{
			link	=	tab.find('.stProduct_link').val();
		}
		var ttl	=	tab.find('.stProduct_title').val();
		var cnt	=	tinymce.activeEditor.selection.getContent({format:'html'});
		var slc	=	tinymce.activeEditor.selection;
		var fnt	=	slc.getNode();
		if(cnt.indexOf('<img ')>=0){
			if(!ttl){	ttl=' ';}
		}
		if(link){
			if(cf_is_valid_URL(link)){
				if(ttl){
					if(cnt){
						if(cf_is_html(cnt)){
							if(cnt.indexOf('<img ')>=0){
								imgS	=	fnt.src;
								imgCls	=	$(fnt).attr("class");
								imgC	=	imgCls.split(" ");
								tcls		=	imgC.length;
								if(tcls>3){
									imgC.pop();
									imgCls=imgC.join(" ")
								}
								imgD	=	$(fnt).attr("data-mce-src");
								imgW	=	fnt.width;
								imgH	=	fnt.height;
								tinymce.activeEditor.execCommand('mceInsertContent',false,'<a href="'+link+'"><img class="'+imgCls+' '+link+'" src="'+imgS+'" title="'+ttl+'" data-mce-src="'+imgD+'" width="'+imgW+'" height="'+imgH+'"></a>');
							}
							else{
								ttl	=	cnt;
								 if((isBold(ttl)==true) &&(isItalic(ttl)==false)){  // if selected content is Bold
									tinymce.activeEditor.execCommand('mceInsertContent',false,',<a href="'+link+'"><strong>'+ttl+'</strong></a>');
								 }
								 else if((isItalic(ttl)==true)&&(isBold(ttl)==false)){ // if selected content is Italic
									 tinymce.activeEditor.execCommand('mceInsertContent',false,',<a href="'+link+'"><em>'+ttl+'</em></a>');
								 }
								  else if((isItalic_and_Bold(ttl)==true)&&(isItalic(ttl)==false)&&(isBold(ttl)==false)){ // if selected content is Bold and Italic	
									 tinymce.activeEditor.execCommand('mceInsertContent',false,',<a href="'+link+'"><em><strong>'+ttl+'</strong></em></a>');
								 }
								 else{
									tinymce.activeEditor.execCommand('mceInsertContent',false,'<a href="'+link+'">'+ttl+'</a>');
								 }
							}
						}
						else{
							tinymce.activeEditor.execCommand('mceInsertContent',false,'<a href="'+link+'">'+ttl+'</a>');
						}
					}
					else{
						tinymce.activeEditor.execCommand('mceInsertContent',false,'<a href="'+link+'">'+ttl+'</a>');
					}
					$('.santuModalBoxA').hide();
				}
				else{alert(st_lang.s9);}
			}
			else{alert(st_lang.s10);}
		}
		else{alert(st_lang.s11);}
	});
	/* Santu Model Box Tab | Esc press close santu modal box */
	$('.stInsertBuyNowLink .spGrp0 input:radio[name="source_type"]').change(function(){
		if($(this).val()=='links'){
			$('.stProduct_link').hide();
			$('.buynowProduct').hide();
			$('.stSpecial_link').show();
			$('.addUrl').hide();
		}
		else{
			$('.stProduct_link').show();
			$('.buynowProduct').show();
			$('.addUrl').show();
			$('.stSpecial_link').hide();
		}
	});
	$('.stInsertBuyNowButton .spGrp0 input:radio[name="source_type"]').change(function(){
		if($(this).val()=='links'){
			$('.stProduct_link').hide();
			$('.buynowProduct').hide();
			$('.stSpecial_link').show();
		}else{
			$('.stProduct_link').show();
			$('.buynowProduct').show();
			$('.stSpecial_link').hide();
		}
	});
	$('.stInsertBuyNowButton .spGrp0 input:radio[name="source_type"]').change(function(){
		if($(this).val()=='links'){
			$('.stMButton_text').show();
			$('.stdropdown').hide();
		}
		else{
			$('.stMButton_text').hide();
			$('.stdropdown').show();
		}
	});
	var santuTab=function(){
		$(document).on('click','.smTabNav a',function(){
			t=$(this).attr('tab');
			if(t){
				c=$('.smPanel'+t);
				$('.smPanel').removeClass('stActiveTab');
				$(this).parents('#smTabNav').children('li').find('a').removeClass('smActive');
				$(this).addClass('smActive');
				$('.smPanel').hide();
				c.addClass('stActiveTab').show()}});$(document).on('click','.smBtnTabNav a',function(){t=$(this).attr('tab');if(t){c=$('.smBtnPanel'+t);$('.smBtnPanel').removeClass('stActiveTab');$(this).parents('#smBtnTabNav').children('li').find('a').removeClass('smActive');$(this).addClass('smActive');$('.smBtnPanel').hide();c.addClass('stActiveTab').show()}})}
	var sanut_modal_esc_close=function(){$(document).on('keydown',function(e){if(e.keyCode===27){a='.stActiveModal';p=$(a).attr('parent');$(a).hide();$(a).removeClass('stActiveModal');if(p){$('.'+p).addClass('stActiveModal')}$('.cfjcp').hide()}})}
	santuTab();sanut_modal_esc_close();
	santu_icon_edit();
	santu_init();

}(jQuery))});
	/* --------------------------------------------------------------- */
	/* 		Load existing selected button		 */
	/* ------------------------------------------------------------ */
	var santu_load_button=function(){
		slc	=	tinymce.activeEditor.selection;
		fnd	=	slc.getNode();
		bid	=	$(fnd).attr("bid");
		cnt	=	fnd.innerHTML;
		ttl	=	cnt.replace(/<img[^>]*>/g,"");
		$('.stIEPre').empty();
		if(bid !== undefined){
			santu_load_custom_button(bid,ttl,true);
		}
		else{
			santu_get_recent_button();
		}		
	};