var cf_setCookie=function(id,vl){var ed=1;var d=new Date();d.setTime(d.getTime()+(ed*24*60*60*1000));var ex="expires="+d.toUTCString();document.cookie=id+"="+vl+"; "+ex}
var cf_getCookie=function(nm){var nm=nm+"=";var ca=document.cookie.split(';');
	for(var i=0;i<ca.length;i++){var c=ca[i];
		while(c.charAt(0)==' ')
			c=c.substring(1);
		if(c.indexOf(nm)==0) return c.substring(nm.length,c.length)
	}return false
}
var cf_delCookie=function(n){document.cookie = n+'=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'}
'use strict';
function SummerHtmlImageMapCreator(){	
	/* Utilities */
	var utils={offsetX:function(node){var box=node.getBoundingClientRect(),scroll=window.pageXOffset;return Math.round(box.left+scroll)},offsetY:function(node){var box=node.getBoundingClientRect(),scroll=window.pageYOffset;return Math.round(box.top+scroll)},rightX:function(x){return x-app.getOffset('x')},rightY:function(y){return y-app.getOffset('y')},trim:function(str){return str.replace(/^\s+|\s+$/g,'')},id:function(str){return document.getElementById(str)},hide:function(node){node.style.display='none';return this},show:function(node){node.style.display='block';return this},encode:function(str){return str.replace(/</g, '&lt;').replace(/>/g, '&gt;')},foreach:function(arr, func){for(var i=0, count=arr.length; i<count; i++){func(arr[i],i)}},foreachReverse:function(arr, func){for(var i=arr.length-1; i>=0; i--){func(arr[i],i)}},debug:(function(){var output=document.getElementById('debug');return function(){output.innerHTML=[].join.call(arguments,' ')}})(),stopEvent:function(e){e.stopPropagation();e.preventDefault();return this},addClass:function(node,str){var is_svg=node.className.baseVal !== undefined?true:false,arr=is_svg?node.className.baseVal.split(' '):node.className.split(' '),isset=false;utils.foreach(arr,function(x){if(x===str){isset=true}});if(!isset){arr.push(str);is_svg ? node.className.baseVal=arr.join(' '):node.className=arr.join(' ')}return this},removeClass:function(node,str){var is_svg=node.className.baseVal!==undefined?true:false,arr=is_svg?node.className.baseVal.split(' '):node.className.split(' '),isset=false;utils.foreach(arr,function(x,i){if(x===str){isset=true;arr.splice(i--,1)}});if(isset){is_svg ? node.className.baseVal=arr.join(' '):node.className=arr.join(' ')}return this},hasClass:function(node,str){var is_svg=node.className.baseVal!==undefined?true:false,arr=is_svg?node.className.baseVal.split(' '):node.className.split(' '),isset=false;utils.foreach(arr,function(x){if(x===str){isset=true}});return isset},extend:function(obj,options){var target={};for(name in obj){if(obj.hasOwnProperty(name)){target[name]=options[name]?options[name]:obj[name]}}return target},supportFileReader:(function(){return (typeof FileReader !== 'undefined')})()};
	/* Main object */
	var app=(function(){
		var body=document.getElementsByTagName('body')[0],wrapper=utils.id('wrapper'),svg=utils.id('svg'),img=utils.id('img'),img_src=null,container=utils.id('image'),about=utils.id('about'),coords_info=utils.id('coords'),offset={x: 0, y: 0},shape=null,is_draw=false,mode=null,objects=[],new_area=null,selected_area=null,edit_type,events=[],map,filename,KEYS={F1:112,ESC:27,TOP:38,BOTTOM:40,LEFT:37,RIGHT:39,DELETE:46,I:73,S:83,C:67};
		function recalcOffsetValues(){offset.x=utils.offsetX(container);offset.y=utils.offsetY(container)};window.addEventListener('resize',recalcOffsetValues,false);container.addEventListener('mousedown',function(e){e.preventDefault()},false);img.addEventListener('dragstart',function(e){e.preventDefault()},false);container.addEventListener('mousemove',function(e){coords_info.innerHTML='x: '+utils.rightX(e.pageX)+', '+'y: '+utils.rightY(e.pageY)},false);container.addEventListener('mouseleave',function(){coords_info.innerHTML=''},false);
		function onSvgMousedown(e){
			if(mode==='editing'){
				if(e.target.parentNode.tagName==='g'){
					info.unload();selected_area=e.target.parentNode.obj;app.deselectAll();selected_area.select();selected_area.delta={'x':e.pageX,'y':e.pageY};
					if(utils.hasClass(e.target,'helper')){
						var helper=e.target;edit_type=helper.action;if(helper.n>=0){selected_area.selected_point=helper.n}
						app.addEvent(container,'mousemove',selected_area.onEdit).addEvent(container,'mouseup',selected_area.onEditStop);
					}else if(e.target.tagName==='rect'||e.target.tagName==='circle'||e.target.tagName==='polygon'){edit_type='move';app.addEvent(container,'mousemove',selected_area.onEdit).addEvent(container,'mouseup',selected_area.onEditStop)};
				}else{app.deselectAll();info.unload()};
			};
		}
		container.addEventListener('mousedown',onSvgMousedown,false);
		function onSvgClick(e){if(mode==='drawing'&&!is_draw&&shape){code.hide();switch(shape){case 'rect':new_area=new Rect(utils.rightX(e.pageX), utils.rightY(e.pageY));app.addEvent(container,'mousemove',new_area.onDraw).addEvent(container,'click',new_area.onDrawStop);break;case 'circle':new_area=new Circle(utils.rightX(e.pageX), utils.rightY(e.pageY));app.addEvent(container,'mousemove',new_area.onDraw).addEvent(container,'click',new_area.onDrawStop);break;case 'polygon':new_area=new Polygon(utils.rightX(e.pageX), utils.rightY(e.pageY));app.addEvent(container,'mousemove',new_area.onDraw).addEvent(container,'click',new_area.onDrawAddPoint).addEvent(document,'keydown',new_area.onDrawStop).addEvent(new_area.helpers[0].helper,'click',new_area.onDrawStop);break}}};container.addEventListener('click',onSvgClick,false);
		function operaSvgKeydownBugFix(){window.focus()}
		if(window.navigator.appName==='Opera'){container.addEventListener('mousedown',operaSvgKeydownBugFix,false);container.addEventListener('mouseup',operaSvgKeydownBugFix,false);container.addEventListener('click',operaSvgKeydownBugFix,false);container.addEventListener('dblclick',operaSvgKeydownBugFix,false)};
		function onAreaDblClick(e){if(mode==='editing'){if(e.target.tagName==='rect'||e.target.tagName==='circle'||e.target.tagName==='polygon'){selected_area=e.target.parentNode.obj;info.load(selected_area,e.pageX,e.pageY)}}};
		container.addEventListener('dblclick',onAreaDblClick,false);
		function onDocumentKeyDown(e){
			var ctrlDown=e.ctrlKey || e.metaKey // PC || Mac
			switch(e.keyCode){
				case KEYS.F1:help.show();e.preventDefault();break;case KEYS.ESC:help.hide();if(is_draw){is_draw=false;new_area.remove();objects.pop();app.removeAllEvents()}else if(mode==='editing'){selected_area.redraw();app.removeAllEvents()};break;case KEYS.TOP:if(mode==='editing' && selected_area){selected_area.setParams(selected_area.dynamicEdit(selected_area['move'](0,-1)));e.preventDefault()}break;case KEYS.BOTTOM:if(mode==='editing' && selected_area){selected_area.setParams(selected_area.dynamicEdit(selected_area['move'](0, 1)));e.preventDefault()}break;case KEYS.LEFT:if(mode==='editing' && selected_area){selected_area.setParams(selected_area.dynamicEdit(selected_area['move'](-1,0)));e.preventDefault()}break;case KEYS.RIGHT:if(mode==='editing' && selected_area){selected_area.setParams(selected_area.dynamicEdit(selected_area['move'](1,0)));e.preventDefault()}break;case KEYS.DELETE:if(mode==='editing' && selected_area){app.removeObject(selected_area);selected_area=null;info.unload()}break;case KEYS.I:if(mode==='editing' && selected_area){var params=selected_area.params,x=params.x||params.cx||params[0],y=params.y||params.cy||params[1];info.load(selected_area, x+app.getOffset('x'), y+app.getOffset('y'))}break;case KEYS.S:app.saveInLocalStorage();break;
				case KEYS.C:
					if(mode==='editing' && selected_area && ctrlDown){
						var Constructor=null,area_params=selected_area.toJSON(),area;switch(area_params.type){case 'rect':Constructor=Rect;break;case 'circle':Constructor=Circle;break;case 'polygon':Constructor=Polygon;break}
						if(Constructor){Constructor.createFromSaved(area_params);selected_area.setParams(selected_area.move(10,10));selected_area.redraw()}
					}
					break;
			}
		}
		document.addEventListener('keydown',onDocumentKeyDown,false);
		return{
			saveInLocalStorage:function(){var obj={areas:[],img:img_src};utils.foreach(objects,function(x){obj.areas.push(x.toJSON())});window.localStorage.setItem('SummerHTMLImageMapCreator',JSON.stringify(obj));return this},
			loadFromLocalStorage:function(){var str=window.localStorage.getItem('SummerHTMLImageMapCreator'),obj=JSON.parse(str),areas=obj.areas;this.loadImage(obj.img);utils.foreach(areas,function(x){switch(x.type){case 'rect':if(x.coords.length===4){Rect.createFromSaved({coords:x.coords,href:x.href,alt:x.alt,title:x.title})}break;case 'circle':if(x.coords.length===3){Circle.createFromSaved({coords:x.coords,href:x.href,alt:x.alt,title:x.title})}break;case 'polygon':if(x.coords.length>=6 && x.coords.length % 2===0){Polygon.createFromSaved({coords:x.coords,href:x.href,alt:x.alt,title:x.title})}break}});return this},
			hide:function(){utils.hide(wrapper);return this},show:function(){utils.show(wrapper);return this},recalcOffsetValues: function(){recalcOffsetValues();return this},setDimensions:function(width,height){svg.setAttribute('width',width);svg.setAttribute('height',height);container.style.width=width+'px';container.style.height=height+'px';return this},loadImage:function(url){get_image.showLoadIndicator();img.src=url;img_src=url;img.onload=function(){get_image.hideLoadIndicator().hide();app.show().setDimensions(img.width, img.height).recalcOffsetValues()};return this},preview:(function(){img.setAttribute('usemap','#map');map=document.createElement('map');map.setAttribute('name','map');container.appendChild(map);return function(){info.unload();app.setShape(null);utils.hide(svg);map.innerHTML=app.getHTMLCode();code.print();return this}})(),hidePreview:function(){utils.show(svg);map.innerHTML='';return this},addNodeToSvg:function(node){svg.appendChild(node);return this},removeNodeFromSvg:function(node){svg.removeChild(node);return this},getOffset:function(arg){switch(arg){case 'x':return offset.x;break;case 'y':return offset.y;break}return undefined},clear:function(){objects.length=0;while(svg.childNodes[0]){svg.removeChild(svg.childNodes[0])}code.hide();info.unload();return this},removeObject:function(obj){utils.foreach(objects,function(x,i){if(x===obj){objects.splice(i,1)}});obj.remove();return this},deselectAll:function(){utils.foreach(objects,function(x){x.deselect();});return this},getIsDraw:function(){return is_draw},setIsDraw:function(arg){is_draw=arg;return this},setMode:function(arg){mode=arg;return this},getMode:function(){return mode},setShape:function(arg){shape=arg;return this},getShape:function(){return shape},addObject:function(object){objects.push(object);return this},getNewArea:function(){return new_area},resetNewArea:function(){new_area=null;return this},getSelectedArea:function(){return selected_area},setSelectedArea:function(obj){selected_area=obj;return this},getEditType:function(){return edit_type},setFilename:function(str){filename=str;return this},setEditClass:function(){utils.removeClass(container,'draw').addClass(container,'edit');return this},setDrawClass:function(){utils.removeClass(container,'edit').addClass(container,'draw');return this},setDefaultClass:function(){utils.removeClass(container,'edit').removeClass(container,'draw');return this},addEvent:function(target,eventType,func){events.push(new AppEvent(target,eventType,func));return this},removeAllEvents:function(){utils.foreach(events, function(x){x.remove()});events.length=0;return this},getHTMLCode:function(a){var o='';if(a){if(!objects.length){return '0 objects'}o+=utils.encode('<img src="'+filename+'" usemap="#map">')+'<br>'+utils.encode('<map name="map">');utils.foreachReverse(objects,function(x){o+=utils.encode(x.toString())+'<br>'});o+=utils.encode('</map>')}else{utils.foreachReverse(objects,function(x){o+=x.toString()})}return o},
			/* #3 Problem is here */
			customHTMLOutput:function(){
				var o='';
				if(!objects.length){
					var d=Date.now(),s=document.getElementById('selected-img-name').value;
					o+='<figure class="mapedImg" id="fg_'+d+'"><img src="'+s+'" mapid="map_'+d+'" usemap="#map'+d+'"></figure>&nbsp;';
                    return o
				}
				else{
            		var d=Date.now(),s=document.getElementById('selected-img-name').value;
					o+='<figure class="mapedImg" id="fg_'+d+'"><map name="map'+d+'" id="map_'+d+'">';
					utils.foreachReverse(objects,function(x){o+=x.toString()});
                    o+='</map><img src="'+s+'" mapid="map_'+d+'" usemap="#map'+d+'"></figure>&nbsp;';
                }
				objects.length=0;
				return o
            }
		};
	})();
	var help=(function(){var block=utils.id('help'),overlay=utils.id('overlay'),close_button=block.querySelector('.close_button');function hide(){utils.hide(block);utils.hide(overlay)};function show(){utils.show(block);utils.show(overlay)};overlay.addEventListener('click',hide,false);close_button.addEventListener('click',hide,false);return{show:show,hide:hide}})();
	var code=(function(){var block=utils.id('code'),content=utils.id('code_content'),close_button=block.querySelector('.close_button');close_button.addEventListener('click',function(e){utils.hide(block);e.preventDefault()},false);return{print:function(){content.innerHTML=app.getHTMLCode(true);utils.show(block)},hide:function(){utils.hide(block)}}})();
    var info=(function(){
		var form	=	utils.id('edit_details'),
		header		=	form.querySelector('h5'),
		href_attr		=	utils.id('href_attr'),
		alt_attr		=	utils.id('alt_attr'),
		title_attr		=	utils.id('title_attr'),
		save_button	=	utils.id('save_details'),
		close_button	=	form.querySelector('.close_button'),
		sections		=	form.querySelectorAll('p'),obj,x,y,temp_x,temp_y;
		function changedReset(){
			utils.removeClass(form,'changed');
			utils.foreach(sections,function(x){
				utils.removeClass(x,'changed');
			}
		)};
		function save(e){
			obj.href	=	href_attr.value;
			obj.alt	=	alt_attr.value;
			obj.title	=	title_attr.value;
			obj.href?obj.with_href():obj.without_href();
			changedReset();
			e.preventDefault();
		};
		function unload(){
			obj	=	null;
			changedReset();
			utils.hide(form)
		};
		function setCoords(x, y){
			form.style.left	=	(x-5)+'px';
			form.style.top	=	(y-5)+'px';
		};
		function moveEditBlock(e){
			setCoords(x+e.pageX-temp_x, y+e.pageY-temp_y);
		};
		function stopMoveEditBlock(e){
			x	=	x+e.pageX-temp_x;
			y	=	y+e.pageY-temp_y;
			setCoords(x, y);
			app.removeAllEvents();
		};
		function change(){
			utils.addClass(form,'changed');
			utils.addClass(this.parentNode,'changed');
		};
		save_button.addEventListener('click',save,false);
		href_attr.addEventListener('keydown',function(e){
			e.stopPropagation();
		},false);
		alt_attr.addEventListener('keydown',function(e){
			e.stopPropagation();
		},false);
		title_attr.addEventListener('keydown',function(e){
			e.stopPropagation();
		},false);
		href_attr.addEventListener('change',change,false);
		alt_attr.addEventListener('change',change,false);
		title_attr.addEventListener('change',change,false);
		close_button.addEventListener('click',unload,false);
		header.addEventListener('mousedown',function(e){
			temp_x	=	e.pageX,temp_y	=	e.pageY;
			app.addEvent(document,'mousemove',moveEditBlock);
			app.addEvent(header,'mouseup',stopMoveEditBlock);
			e.preventDefault();
		},false);
		return{
			load:function(object,new_x,new_y){
				obj	=	object;
				href_attr.value	=	object.href?object.href:'';
				alt_attr.value	=	object.alt?object.alt:'';
				title_attr.value	=	object.title?object.title:'';
				utils.show(form);
				if(new_x && new_y){					
					x	=	new_x;
					y	=	new_y;
					setCoords(x,y);
				}
			},unload:unload
		}
	})();
	/* Load areas from html code */
	var from_html_form=(function(){
		var form=utils.id('from_html_wrapper'),code_input=utils.id('code_input'),load_button=utils.id('load_code_button'),close_button=form.querySelector('.close_button'),regexp_area=/<area(?=.*? shape="(rect|circle|poly)")(?=.*? coords="([\d ,]+?)")[\s\S]*?>/gmi,regexp_href=/ href="([\S\s]+?)"/,regexp_alt=/ alt="([\S\s]+?)"/,regexp_title=/ title="([\S\s]+?)"/;
		function test(str){
			var result_area,result_href,result_alt,result_title,type,coords,area,href,alt,title,success=false;
			if(str){
				result_area=regexp_area.exec(str);
				while(result_area){
					success=true;area=result_area[0];type=result_area[1];coords=result_area[2].split(/ ?, ?/);result_href=regexp_href.exec(area);if(result_href){href=result_href[1]}else{href=''}result_alt=regexp_alt.exec(area);if(result_alt){alt=result_alt[1]}else{alt=''}result_title=regexp_title.exec(area);if(result_title){title=result_title[1]}else{title=''}
					for(var i=0, len=coords.length;i<len;i++){coords[i]=Number(coords[i])}
					switch(type){case 'rect':if(coords.length===4){Rect.createFromSaved({coords:coords,href:href,alt:alt,title:title})}break;case 'circle':if(coords.length===3){Circle.createFromSaved({coords:coords,href:href,alt:alt,title:title})}break;case 'poly':if(coords.length>=6 && coords.length % 2===0){Polygon.createFromSaved({coords:coords,href:href,alt:alt,title:title})}break}
					result_area=regexp_area.exec(str);
				}
				if(success){hide()}
			}
		}
		function load(e){test(code_input.value);e.preventDefault()};function hide(){utils.hide(form)};load_button.addEventListener('click',load,false);close_button.addEventListener('click',hide,false);return{show:function(){code_input.value='';utils.show(form)},hide:hide};
	})();
	/* Get image form */
	var get_image=(function(){
		var block=utils.id('get_image_wrapper'),loading_indicator=utils.id('loading'),button=utils.id('button'),filename=null,last_changed=null;
		// Drag'n'drop-the first way to loading an image
		var drag_n_drop=(function(){
			var dropzone=utils.id('dropzone'),dropzone_clear_button=dropzone.querySelector('.clear_button'),sm_img=utils.id('sm_img');
			if(!utils.supportFileReader){utils.hide(utils.id('file_reader_support'))};
			function testFile(type){
				switch(type){
				case 'image/jpeg':
				case 'image/gif':
				case 'image/png':
					return true;break;
				}
				return false;
			}
			dropzone.addEventListener('dragover',function(e){utils.stopEvent(e)},false);dropzone.addEventListener('dragleave',function(e){utils.stopEvent(e)},false);dropzone.addEventListener('drop',function(e){utils.stopEvent(e);var reader=new FileReader(),file=e.dataTransfer.files[0];if(testFile(file.type)){utils.removeClass(dropzone,'error');reader.readAsDataURL(file);reader.onload=function(e){sm_img.src=e.target.result;sm_img.style.display='inline-block';filename=file.name;utils.show(dropzone_clear_button);last_changed=drag_n_drop}}else{clearDropzone();utils.addClass(dropzone,'error')}},false);
			function clearDropzone(){sm_img.src='';utils.hide(sm_img).hide(dropzone_clear_button).removeClass(dropzone,'error');last_changed=url_input};dropzone_clear_button.addEventListener('click',clearDropzone,false);return{clear:clearDropzone,init:function(){dropzone.draggable=true;this.clear();utils.hide(sm_img).hide(dropzone_clear_button)},test:function(){return sm_img.src?true:false},getImage:function(){return sm_img.src}};
		})();
		/* Set a url-the second way to loading an image */
		var url_input=(function(){
			var url=utils.id('url'),url_clear_button=url.parentNode.querySelector('.clear_button');
			function testUrl(str){
				var url_str=utils.trim(str),temp_array=url_str.split('.'),ext;
				if(temp_array.length>1){
					ext=temp_array[temp_array.length-1].toLowerCase();
					switch(ext){
					case 'jpg':
					case 'jpeg':
					case 'gif':
					case 'png':
						return true;break;
					};
				};return false;
			}
			function onUrlChange(){setTimeout(function(){if(url.value.length){utils.show(url_clear_button);last_changed=url_input}else{utils.hide(url_clear_button);last_changed=drag_n_drop}},0)}
			url.addEventListener('keypress',onUrlChange,false);url.addEventListener('change',onUrlChange,false);url.addEventListener('paste',onUrlChange,false);
			function clearUrl(){url.value='';utils.hide(url_clear_button);utils.removeClass(url,'error');last_changed=url_input};
			url_clear_button.addEventListener('click',clearUrl,false);
			return{
				clear:clearUrl,init:function(){this.clear();utils.hide(url_clear_button)},test:function(){if(testUrl(url.value)){utils.removeClass(url,'error');return true}else{utils.addClass(url,'error')};return false},
				getImage:function(){var tmp_arr=url.value.split('/');filename=tmp_arr[tmp_arr.length-1];return utils.trim(url.value)}
			};
		})();
		function init(){utils.hide(loading_indicator);drag_n_drop.init();url_input.init()};init();
		function clear(){drag_n_drop.clear();url_input.clear();last_changed=null};
		/* Code By CodeFlox 106 */
		function onButtonClick_custom(){
			var has_img	=	$('#selected-img-name').val();
			if(has_img==''){
				alert('Please select an image!');
				return false;
			}
            hide_wp_stuff();
			$('.clear_button').show();
			$('.contentIMAGES').hide();$('#header').css({"position":"fixed","z-index":"3","top":"45px"});$('#smbtnNEXT,.santuModalBoxD').hide();$('.img-map').show();
			var txt_val=document.getElementById("url").value;
			if(txt_val!=''){app.loadImage(url_input.getImage()).setFilename(filename)}else if(last_changed===drag_n_drop&&drag_n_drop.test()){app.loadImage(drag_n_drop.getImage()).setFilename(filename)}
        }
		/* Code By CodeFlox 106 End */
		/* Selected image loading */
		function onButtonClick(e){
			//# if(last_changed===url_input && url_input.test()){app.loadImage(url_input.getImage()).setFilename(filename)}
			/* Code By CodeFlox 104 */
			var txt_val=document.getElementById("url").value;
			if(txt_val!=''){app.loadImage(url_input.getImage()).setFilename(filename);}
			/* Code By CodeFlox 104 End */
			else if(last_changed===drag_n_drop&&drag_n_drop.test()){app.loadImage(drag_n_drop.getImage()).setFilename(filename)}
			e.preventDefault();
		};
		button.addEventListener('click',onButtonClick,false);		
		function reactangle_onload(e){
			app.setMode('drawing').setDrawClass().setShape('rect').deselectAll().hidePreview();
			info.unload()
		}
		/* Code By CodeFlox 105 *//* CodeFlox Replica below code from other part */
		var form=utils.id('from_html_wrapper'),code_input=utils.id('code_input'),load_button=utils.id('load_code_button'),close_button=form.querySelector('.close_button'),regexp_area=/<area(?=.*? shape="(rect|circle|poly)")(?=.*? coords="([\d ,]+?)")[\s\S]*?>/gmi,regexp_href=/ href="([\S\s]+?)"/,regexp_alt=/ alt="([\S\s]+?)"/,regexp_title=/ title="([\S\s]+?)"/;
		function hide(){utils.hide(form)}
		function codeflox_load_map(str){
			var ra,rh,rl,rt,type,coords,area,href,alt,ttl,su=false;
			if(str){
				ra=regexp_area.exec(str);
				while(ra){
					su=true;area=ra[0];type=ra[1];coords=ra[2].split(/ ?, ?/);rh=regexp_href.exec(area);
					if(rh){href=rh[1]}else{href=''} rl=regexp_alt.exec(area);if(rl){alt=rl[1]}else{alt=''} rt=regexp_title.exec(area);if(rt){ttl=rt[1]}else{ttl=''}
					for(var i=0,len=coords.length;i<len;i++){coords[i]=Number(coords[i])}
					switch(type){case 'rect':if(coords.length===4){Rect.createFromSaved({coords:coords,href:href,alt:alt,title:ttl})}break;case 'circle':if(coords.length===3){Circle.createFromSaved({coords:coords,href:href,alt:alt,title:ttl})}break;case 'poly':if(coords.length>=6&&coords.length%2===0){Polygon.createFromSaved({coords:coords,href:href,alt:alt,title:ttl})}break}
					ra=regexp_area.exec(str);
				}
				if(su){hide()}
			}
		}
		/* Image selection */
		/*-----------------------------------------------------------------[Start]*/		
		jQuery(document).ready(function(){(function($){
			/* ----------------- [Selection A] ------------------ */
			$(document).on('click','#slfimg',function(e){
				$('.img-map').hide();$('.contentIMAGES').show();$('.smbtn1').show();$('#svg').html('');$('nav ul li').removeClass('selected');				
				// Default rectangle shape
				reactangle_onload();
				$('#rect').addClass('selected');				
				var theIMG	=	tinymce.activeEditor.selection.getContent({format:'html'});
				if(theIMG){
					editorHTML	=	tinymce.activeEditor.getContent();
					var mapID 	=	$(theIMG).attr('mapid');
					if(mapID){
						var mapArea	=	$(editorHTML).find('#'+mapID).html();
						if(mapArea){var mapHTML='<map id="'+mapID+'" name="'+mapID+'">'+mapArea+'</map>'}else{var mapHTML='<map id="'+mapID+'" name="'+mapID+'"></map>'}
						var relID 	=	mapID.split('map_');
						var figID		=	'fg_'+relID[1];
						cf_setCookie('fgid',figID);cf_setCookie('m_id',mapID);
						onButtonClick_custom();
						var imgMapHTML=theIMG+mapHTML;
						if(codeflox_load_map(imgMapHTML)){}
					}
					else{
						var mapID 	= 	$(theIMG).attr('id')
						var mapArea 	=	$(editorHTML).find('#'+mapID).html();
						if(mapArea){ var mapHTML='<map id="'+mapID+'" name="'+mapID+'">'+mapArea+'</map>'}else{var mapHTML='<map id="'+mapID+'" name="'+mapID+'"></map>'}
						cf_setCookie('fgid','');cf_setCookie('m_id',mapID);
						onButtonClick_custom();
						var imgMapHTML=theIMG+mapHTML;
					}
				}				
			});
			/* ----------------- [Selection B] ------------------ */
			$(document).on('click','.choose-img',function(){
				
				$('.choose-img').removeClass('active'); // remove active classes from other images
				$(this).addClass('active'); //add active class				
				$('#svg').html('');
				var imgID		=	$(this).attr('id');
				var src			=	$(this).attr('src');
				var ed 			= 	tinyMCE.activeEditor;
				var newNode=ed.dom.select('img#'+imgID);
				ed.selection.select(newNode[0]);
				var theIMG		=	tinymce.activeEditor.selection.getContent({format:'html'});
				var editorHTML	=	tinymce.activeEditor.getContent();
				$('#selected-img-name').val('').val(src);$('#url').val('').val(src).focus();
				if(theIMG){
					$('#svg').html('');
					var mapID 	=	$(theIMG).attr('mapid');
					if(mapID){
						$('#svg').html('');
						var mapArea 	=	$(editorHTML).find('#'+mapID).html();
						if(mapArea){var mapHTML='<map id="'+mapID+'" name="'+mapID+'">'+mapArea+'</map>'}else{var mapHTML='<map id="'+mapID+'" name="'+mapID+'"></map>'}
						var relID 	=	mapID.split('map_');
						var figID		=	'fg_'+relID[1];
						cf_setCookie('fgid',figID);cf_setCookie('m_id',mapID);
						var imgMapHTML=theIMG+mapHTML;
						if(codeflox_load_map(imgMapHTML)){}
					}
					else{
						$('#svg').html('');
						var mapID 	= 	$(theIMG).attr('id');
						var mapArea 	=	$(editorHTML).find('#'+mapID).html();
						if(mapArea){ var mapHTML='<map id="'+mapID+'" name="'+mapID+'">'+mapArea+'</map>'}else{var mapHTML='<map id="'+mapID+'" name="'+mapID+'"></map>'}
						cf_setCookie('fgid','');cf_setCookie('m_id',mapID);
						var imgMapHTML=theIMG+mapHTML;
						if(codeflox_load_map(imgMapHTML)){}
					}
				}
			});
		}(jQuery))});
		/*----------------------------------------------------------------- [End]*/
		var btn=document.getElementById("smbtnNEXT");btn.addEventListener('click',onButtonClick_custom,false);
		/* Code By CodeFlox 105 End */
		/* Returned object */
		return{show:function(){clear();utils.show(block);return this;},hide:function(){utils.hide(block);return this},showLoadIndicator:function(){utils.show(loading_indicator);return this;},hideLoadIndicator:function(){utils.hide(loading_indicator);return this}};
	})();
	/* Buttons and actions */
	var buttons=(function(){
		var all=utils.id('nav').getElementsByTagName('li'),save=utils.id('save'),load=utils.id('load'),rectangle=utils.id('rect'),circle=utils.id('circle'),polygon=utils.id('polygon'),edit=utils.id('edit'),clear=utils.id('clear'),from_html=utils.id('from_html'),to_html=utils.id('to_html'),preview=utils.id('preview'),new_image=utils.id('new_image'),show_help=utils.id('show_help');
		function deselectAll(){utils.foreach(all, function(x){utils.removeClass(x,'selected')})}
		function selectOne(button){deselectAll();utils.addClass(button,'selected')}
		function onSaveButtonClick(e){app.saveInLocalStorage();e.preventDefault()}
		function onLoadButtonClick(e){app.clear().loadFromLocalStorage();e.preventDefault()}
		function onShapeButtonClick(e){app.setMode('drawing').setDrawClass().setShape(this.id).deselectAll().hidePreview();info.unload();selectOne(this);e.preventDefault()}
		function onClearButtonClick(e){if(confirm('Clear all?')){app.setMode(null).setDefaultClass().setShape(null).clear().hidePreview();deselectAll()}e.preventDefault()}
		function onFromHtmlButtonClick(e){from_html_form.show();e.preventDefault()}
		function onToHtmlButtonClick(e){info.unload();code.print();e.preventDefault()}
		function onPreviewButtonClick(e){if(app.getMode()==='preview'){app.setMode(null).hidePreview();deselectAll()}else{app.deselectAll().setMode('preview').setDefaultClass().preview();selectOne(this)}e.preventDefault()}		
		function onEditButtonClick(e){if(app.getMode()==='editing'){app.setMode(null).setDefaultClass().deselectAll();deselectAll();utils.show(svg)}else{app.setShape(null).setMode('editing').setEditClass();selectOne(this)}app.hidePreview();e.preventDefault()}
		function onNewImageButtonClick(e){if(confirm('Discard all changes?')){app.setMode(null).setDefaultClass().setShape(null).setIsDraw(false).clear().hide().hidePreview();deselectAll();get_image.show()}e.preventDefault()}
		function onShowHelpButtonClick(e){help.show();e.preventDefault()}
		/* Code By CodeFlox 102 */
		function pasteCodeIntoPage(e){
			$('.img-map').hide();
			show_wp_stuff();
			var m_id=cf_getCookie('m_id'),fig_id=cf_getCookie('fgid');
			if(m_id!==''){
				var newIMGMap=app.customHTMLOutput();
				tinyMCE.activeEditor.dom.remove(fig_id);
				tinyMCE.activeEditor.dom.remove(m_id);
				tinymce.activeEditor.insertContent(newIMGMap)
			}
			cf_delCookie('fgid');
			cf_delCookie('m_id');
			update_content_ajax();
			window.localStorage.removeItem('SummerHTMLImageMapCreator');
			localStorage.clear();
			e.preventDefault()
		}
		/* Code By CodeFlox 102 End */
		//save.addEventListener('click',onSaveButtonClick,false);
		load.addEventListener('click',onLoadButtonClick,false);rectangle.addEventListener('click',onShapeButtonClick,false);circle.addEventListener('click',onShapeButtonClick,false);polygon.addEventListener('click',onShapeButtonClick,false);clear.addEventListener('click',onClearButtonClick,false);from_html.addEventListener('click',onFromHtmlButtonClick,false);to_html.addEventListener('click',onToHtmlButtonClick,false);preview.addEventListener('click',onPreviewButtonClick,false);edit.addEventListener('click',onEditButtonClick,false);new_image.addEventListener('click',onNewImageButtonClick,false);show_help.addEventListener('click',onShowHelpButtonClick,false);
		/* Code By CodeFlox 101 */
		var	insert_code=document.getElementById("insert_code");
	   	insert_code.addEventListener('click',pasteCodeIntoPage,false);
		/* Code By CodeFlox 101 End */
	})();
	/* AppEvent constructor */
	function AppEvent(target,eventType,func){this.target=target;this.eventType=eventType;this.func=func;target.addEventListener(eventType,func,false)};
	AppEvent.prototype.remove=function(){this.target.removeEventListener(this.eventType, this.func,false)};
	/* Helper constructor */
	function Helper(node,x,y){this.helper=document.createElementNS('http://www.w3.org/2000/svg','rect');this.helper.setAttribute('class','helper');this.helper.setAttribute('height',7);this.helper.setAttribute('width',7);this.helper.setAttribute('x',x-3);this.helper.setAttribute('y',y-3);node.appendChild(this.helper)};
	Helper.prototype.setCoords=function(x,y){this.helper.setAttribute('x',x-3);this.helper.setAttribute('y',y-3);return this};
	Helper.prototype.setAction=function(action){this.helper.action=action;return this};
	Helper.prototype.setCursor=function(cursor){utils.addClass(this.helper,cursor);return this};
	Helper.prototype.setId=function(id){this.helper.n=id;return this};
	/* Rectangle constructor */
	var Rect=function (x,y){app.setIsDraw(true);this.params={x:x,y:y,width:0,height:0};this.href='';this.alt='';this.title='';this.g=document.createElementNS('http://www.w3.org/2000/svg','g');this.rect=document.createElementNS('http://www.w3.org/2000/svg','rect');app.addNodeToSvg(this.g);this.g.appendChild(this.rect);this.g.obj=this;this.helpers={center:new Helper(this.g,x-this.params.width/2,y-this.params.height/2),top:new Helper(this.g,x-this.params.width/2,y-this.params.height/2),bottom:new Helper(this.g,x-this.params.width/2,y-this.params.height/2),left:new Helper(this.g,x-this.params.width/2,y-this.params.height/2),right:new Helper(this.g,x-this.params.width/2,y-this.params.height/2),top_left:new Helper(this.g,x-this.params.width/2,y-this.params.height/2),top_right:new Helper(this.g,x-this.params.width/2,y-this.params.height/2),bottom_left:new Helper(this.g,x-this.params.width/2,y-this.params.height/2),bottom_right:new Helper(this.g,x-this.params.width/2,y-this.params.height/2)};this.helpers.center.setAction('move').setCursor('move');this.helpers.left.setAction('editLeft').setCursor('e-resize');this.helpers.right.setAction('editRight').setCursor('w-resize');this.helpers.top.setAction('editTop').setCursor('n-resize');this.helpers.bottom.setAction('editBottom').setCursor('s-resize');this.helpers.top_left.setAction('editTopLeft').setCursor('nw-resize');this.helpers.top_right.setAction('editTopRight').setCursor('ne-resize');this.helpers.bottom_left.setAction('editBottomLeft').setCursor('sw-resize');this.helpers.bottom_right.setAction('editBottomRight').setCursor('se-resize');this.select().redraw();app.addObject(this)};
	Rect.prototype.setCoords=function(params){this.rect.setAttribute('x',params.x);this.rect.setAttribute('y',params.y);this.rect.setAttribute('width',params.width);this.rect.setAttribute('height',params.height);this.helpers.center.setCoords(params.x+params.width/2,params.y+params.height/2);this.helpers.top.setCoords(params.x+params.width/2,params.y);this.helpers.bottom.setCoords(params.x+params.width/2,params.y+params.height);this.helpers.left.setCoords(params.x,params.y+params.height/2);this.helpers.right.setCoords(params.x+params.width,params.y+params.height/2);this.helpers.top_left.setCoords(params.x,params.y);this.helpers.top_right.setCoords(params.x+params.width,params.y);this.helpers.bottom_left.setCoords(params.x,params.y+params.height);this.helpers.bottom_right.setCoords(params.x+params.width,params.y+params.height);return this};
	Rect.prototype.setParams=function(params){this.params.x=params.x;this.params.y=params.y;this.params.width=params.width;this.params.height=params.height;return this};
	Rect.prototype.redraw=function(){this.setCoords(this.params);return this};
	Rect.prototype.dynamicDraw=function(x1,y1,square){var x0=this.params.x,y0=this.params.y,new_x,new_y,new_width,new_height,delta,temp_params;new_width=Math.abs(x1-x0);new_height=Math.abs(y1-y0);if(square){delta=new_width-new_height;if(delta>0){new_width=new_height}else{new_height=new_width}}if(x0>x1){new_x=x1;if(square && delta>0){new_x=x1+Math.abs(delta)}}else{new_x=x0}
		if(y0>y1){new_y=y1;if(square && delta<0){new_y=y1+Math.abs(delta)}}else{new_y=y0}
		temp_params={x:new_x,y:new_y,width:new_width,height:new_height};this.setCoords(temp_params);return temp_params};
	Rect.prototype.onDraw=function(e){
		var _n_f=app.getNewArea(),square=e.shiftKey?true:false;
		_n_f.dynamicDraw(utils.rightX(e.pageX),utils.rightY(e.pageY),square);
	};
	Rect.prototype.onDrawStop=function(e){
		var _n_f	=	app.getNewArea(),
		square	=	e.shiftKey?true:false;
		_n_f.setParams(_n_f.dynamicDraw(utils.rightX(e.pageX),utils.rightY(e.pageY),square)).deselect();
		app.removeAllEvents().setIsDraw(false).resetNewArea();
		selected_area	=	e.target.parentNode.obj;
		//info.load(selected_area,e.pageX,e.pageY); 
		if(e.pageY >= 350){
			info.load(selected_area,550,300); //Custom
		}
		else{
			info.load(selected_area,e.pageX,e.pageY); 
		}		
	};
	Rect.prototype.move=function(dx,dy){var temp_params=Object.create(this.params);temp_params.x+=dx;temp_params.y+=dy;return temp_params};
	Rect.prototype.editLeft=function(dx,dy){var temp_params=Object.create(this.params);temp_params.x+=dx;temp_params.width-=dx;return temp_params};
	Rect.prototype.editRight=function(dx,dy){var temp_params=Object.create(this.params);temp_params.width+=dx;return temp_params};
	Rect.prototype.editTop=function(dx,dy){var temp_params=Object.create(this.params);temp_params.y+=dy;temp_params.height-=dy;return temp_params};
	Rect.prototype.editBottom=function(dx,dy){var temp_params=Object.create(this.params);temp_params.height+=dy;return temp_params};
	Rect.prototype.editTopLeft=function(dx,dy){var temp_params=Object.create(this.params);temp_params.x+=dx;temp_params.y+=dy;temp_params.width-=dx;temp_params.height-=dy;return temp_params};
	Rect.prototype.editTopRight=function(dx,dy){var temp_params=Object.create(this.params);temp_params.y+=dy;temp_params.width+=dx;temp_params.height-=dy;return temp_params};
	Rect.prototype.editBottomLeft=function(dx,dy){var temp_params=Object.create(this.params);temp_params.x+=dx;temp_params.width-=dx;temp_params.height+=dy;return temp_params};
	Rect.prototype.editBottomRight=function(dx,dy){var temp_params=Object.create(this.params);temp_params.width+=dx;temp_params.height+=dy;return temp_params};
	Rect.prototype.dynamicEdit=function(temp_params,save_proportions){
		if(temp_params.width<0){temp_params.width=Math.abs(temp_params.width);temp_params.x-=temp_params.width}
		if(temp_params.height<0){temp_params.height=Math.abs(temp_params.height);temp_params.y-=temp_params.height}
		if(save_proportions){var proportions=this.params.width/this.params.height,new_proportions=temp_params.width/temp_params.height,delta=new_proportions-proportions,x0=this.params.x,y0=this.params.y,x1=temp_params.x,y1=temp_params.y;if(delta>0){temp_params.width=Math.round(temp_params.height*proportions)}else{temp_params.height=Math.round(temp_params.width/proportions)}}
		this.setCoords(temp_params);return temp_params
	};
	Rect.prototype.onEdit=function(e){var _s_f=app.getSelectedArea(),edit_type=app.getEditType(),save_proportions=e.shiftKey?true:false;_s_f.dynamicEdit(_s_f[edit_type](e.pageX-_s_f.delta.x,e.pageY-_s_f.delta.y),save_proportions)};
	Rect.prototype.onEditStop=function(e){var _s_f=app.getSelectedArea(),edit_type=app.getEditType(),save_proportions=e.shiftKey?true:false;_s_f.setParams(_s_f.dynamicEdit(_s_f[edit_type](e.pageX-_s_f.delta.x, e.pageY-_s_f.delta.y), save_proportions));app.removeAllEvents()};
	Rect.prototype.remove=function(){app.removeNodeFromSvg(this.g)};
	Rect.prototype.select=function(){utils.addClass(this.rect,'selected');return this};
	Rect.prototype.deselect=function(){
		utils.removeClass(this.rect,'selected');
		return this
		};
	Rect.prototype.with_href=function(){utils.addClass(this.rect,'with_href');return this}
	Rect.prototype.without_href=function(){utils.removeClass(this.rect,'with_href');return this}
	Rect.prototype.toString=function(){var x2=this.params.x+this.params.width,y2=this.params.y+this.params.height;return '<area shape="rect" coords="'+this.params.x+','+this.params.y+','+x2+','+y2+'"'+(this.href?' href="'+this.href+'"':'')+(this.alt?' alt="'+this.alt+'"':'')+(this.title?' title="'+this.title+'"':'')+'>'};
	Rect.createFromSaved=function(params){var coords=params.coords,href=params.href,alt=params.alt,title=params.title,area=new Rect(coords[0],coords[1]);area.setParams(area.dynamicDraw(coords[2],coords[3])).deselect();app.setIsDraw(false).resetNewArea();if(href){area.href=href}
		if(alt){area.alt=alt}
		if(title){area.title=title}
	};
	Rect.prototype.toJSON=function(){return{type:'rect',coords:[this.params.x,this.params.y,this.params.x+this.params.width,this.params.y+this.params.height],href:this.href,alt:this.alt,title:this.title}};
	/* Circle constructor */
	var Circle=function(x,y){app.setIsDraw(true);this.params={cx:x,cy:y,radius:0};this.href='';this.alt='';this.title='';this.g=document.createElementNS('http://www.w3.org/2000/svg','g');this.circle=document.createElementNS('http://www.w3.org/2000/svg','circle');app.addNodeToSvg(this.g);this.g.appendChild(this.circle);this.g.obj=this;this.helpers={center:new Helper(this.g,x,y),top:new Helper(this.g,x,y),bottom:new Helper(this.g,x,y),left:new Helper(this.g,x,y),right:new Helper(this.g,x,y)};this.helpers.center.setAction('move');this.helpers.top.setAction('editTop').setCursor('n-resize');this.helpers.bottom.setAction('editBottom').setCursor('s-resize');this.helpers.left.setAction('editLeft').setCursor('w-resize');this.helpers.right.setAction('editRight').setCursor('e-resize');this.select().redraw();app.addObject(this)};
	Circle.prototype.setCoords=function(params){this.circle.setAttribute('cx',params.cx);this.circle.setAttribute('cy',params.cy);this.circle.setAttribute('r',params.radius);this.helpers.center.setCoords(params.cx,params.cy);this.helpers.top.setCoords(params.cx,params.cy-params.radius);this.helpers.right.setCoords(params.cx+params.radius,params.cy);this.helpers.bottom.setCoords(params.cx,params.cy+params.radius);this.helpers.left.setCoords(params.cx-params.radius,params.cy);return this};
	Circle.prototype.setParams=function(params){this.params.cx=params.cx;this.params.cy=params.cy;this.params.radius=params.radius;return this};
	Circle.prototype.redraw=function(){this.setCoords(this.params);return this};
	Circle.prototype.dynamicDraw=function(x1,y1){var x0=this.params.cx,y0=this.params.cy,dx,dy,radius,temp_params;x1=x1?x1:x0;y1=y1?y1:y0;dx=Math.abs(x0-x1);dy=Math.abs(y0-y1);radius=Math.round(Math.sqrt(dx*dx+dy*dy));temp_params={cx:x0,cy:y0,radius:radius};this.setCoords(temp_params);return temp_params};
	Circle.prototype.onDraw=function(e){var _n_f=app.getNewArea();_n_f.dynamicDraw(utils.rightX(e.pageX), utils.rightY(e.pageY))};
	Circle.prototype.onDrawStop=function(e){
		var _n_f=app.getNewArea();
		_n_f.setParams(_n_f.dynamicDraw(utils.rightX(e.pageX),utils.rightY(e.pageY))).deselect();app.removeAllEvents().setIsDraw(false).resetNewArea();
		selected_area=e.target.parentNode.obj;
		if(e.pageY >= 350){
			info.load(selected_area,550,300); //Custom
		}
		else{
			info.load(selected_area,e.pageX,e.pageY); 
		}
	};
	Circle.prototype.move=function(dx,dy){var temp_params=Object.create(this.params);temp_params.cx+=dx;temp_params.cy+=dy;return temp_params};
	Circle.prototype.editTop=function(dx,dy){var temp_params=Object.create(this.params);temp_params.radius-=dy;return temp_params};
	Circle.prototype.editBottom=function(dx,dy){var temp_params=Object.create(this.params);temp_params.radius+=dy;return temp_params};	
	Circle.prototype.editLeft=function(dx,dy){var temp_params=Object.create(this.params);temp_params.radius-=dx;return temp_params};
	Circle.prototype.editRight=function(dx,dy){var temp_params=Object.create(this.params);temp_params.radius+=dx;return temp_params};
	Circle.prototype.dynamicEdit=function(temp_params){if(temp_params.radius<0){temp_params.radius=Math.abs(temp_params.radius)}this.setCoords(temp_params);return temp_params};	
	Circle.prototype.onEdit=function(e){var _s_f=app.getSelectedArea(),edit_type=app.getEditType();_s_f.dynamicEdit(_s_f[edit_type](e.pageX-_s_f.delta.x,e.pageY-_s_f.delta.y))};
	Circle.prototype.onEditStop=function(e){var _s_f=app.getSelectedArea(),edit_type=app.getEditType();_s_f.setParams(_s_f.dynamicEdit(_s_f[edit_type](e.pageX-_s_f.delta.x,e.pageY-_s_f.delta.y)));app.removeAllEvents()};
	Circle.prototype.remove=function(){app.removeNodeFromSvg(this.g)};
	Circle.prototype.select=function(){utils.addClass(this.circle,'selected');return this};
	Circle.prototype.deselect=function(){utils.removeClass(this.circle,'selected');return this};
	Circle.prototype.with_href=function(){utils.addClass(this.circle,'with_href');return this}
	Circle.prototype.without_href=function(){utils.removeClass(this.circle,'with_href');return this}
	Circle.prototype.toString=function(){return '<area shape="circle" coords="'+this.params.cx+','+this.params.cy+','+this.params.radius+'"'+(this.href?' href="'+this.href+'"':'')+(this.alt?' alt="'+this.alt+'"':'')+(this.title?' title="'+this.title+'"':'')+'>'};
	Circle.createFromSaved=function(params){
		var coords=params.coords,href=params.href,alt=params.alt,title=params.title,area=new Circle(coords[0],coords[1]);area.setParams(area.dynamicDraw(coords[0],coords[1]+coords[2])).deselect();app.setIsDraw(false).resetNewArea();
		if(href){area.href=href}
		if(alt){area.alt=alt}
		if(title){area.title=title}
	};
	Circle.prototype.toJSON=function(){return{type:'circle',coords:[this.params.cx,this.params.cy,this.params.radius],href:this.href,alt:this.alt,title:this.title}};
	/* Polygon constructor */
	var Polygon=function(x,y){app.setIsDraw(true);this.params=[x,y];this.href='';this.alt='';this.title='';this.g=document.createElementNS('http://www.w3.org/2000/svg','g');this.polygon=document.createElementNS('http://www.w3.org/2000/svg','polyline');app.addNodeToSvg(this.g);this.g.appendChild(this.polygon);this.g.obj=this;this.helpers=[new Helper(this.g,this.params[0],this.params[1])];this.helpers[0].setAction('pointMove').setCursor('pointer').setId(0);this.selected_point=-1;this.select().redraw();app.addObject(this)};
	Polygon.prototype.setCoords=function(params){var coords_values=params.join(' ');this.polygon.setAttribute('points',coords_values);utils.foreach(this.helpers, function(x, i){x.setCoords(params[2*i], params[2*i+1])});return this};
	Polygon.prototype.setParams=function(arr){this.params=Array.prototype.slice.call(arr);return this};
	Polygon.prototype.addPoint=function(x,y){var helper=new Helper(this.g,x,y);helper.setAction('pointMove').setCursor('pointer').setId(this.helpers.length);this.helpers.push(helper);this.params.push(x,y);this.redraw();return this};
	Polygon.prototype.redraw=function(){this.setCoords(this.params);return this};
	Polygon.prototype.right_angle=function(x,y){var old_x=this.params[this.params.length-2],old_y=this.params[this.params.length-1],dx=x-old_x,dy=-(y-old_y),tan=dy/dx;if(dx>0&&dy>0){if(tan>2.414){x=old_x}else if(tan<0.414){y=old_y}else{Math.abs(dx)>Math.abs(dy)?x=old_x+dy:y=old_y-dx}}else if(dx<0&&dy>0){if(tan<-2.414){x=old_x}else if(tan> -0.414){y=old_y}else{Math.abs(dx)>Math.abs(dy)?x=old_x-dy:y=old_y+dx}}else if(dx<0&&dy<0){if(tan>2.414){x=old_x}else if(tan<0.414){y=old_y} else{Math.abs(dx)>Math.abs(dy)?x=old_x+dy:y=old_y-dx}}else if(dx>0&&dy<0){if(tan<-2.414){x=old_x}else if(tan> -0.414){y=old_y}else{Math.abs(dx)>Math.abs(dy)?x=old_x-dy:y=old_y+dx}}return{x:x,y:y}};
	Polygon.prototype.dynamicDraw=function(x,y,right_angle){var temp_params=[].concat(this.params);if(right_angle){var right_coords=this.right_angle(x,y);x=right_coords.x;y=right_coords.y}temp_params.push(x,y);this.setCoords(temp_params);return temp_params};
	Polygon.prototype.onDraw=function(e){var _n_f=app.getNewArea();var right_angle=e.shiftKey?true:false;_n_f.dynamicDraw(utils.rightX(e.pageX),utils.rightY(e.pageY),right_angle)};
	Polygon.prototype.onDrawAddPoint=function(e){var x=utils.rightX(e.pageX),y=utils.rightY(e.pageY),_n_f=app.getNewArea();if(e.shiftKey){var right_coords=_n_f.right_angle(x,y);x=right_coords.x;y=right_coords.y}_n_f.addPoint(x,y)};
	Polygon.prototype.onDrawStop=function(e){
		var _n_f=app.getNewArea();
		if(e.type=='click'||(e.type=='keydown' && e.keyCode==13)){
			if(_n_f.params.length>=6){
				_n_f.polyline	=	_n_f.polygon;
				_n_f.polygon	=	document.createElementNS('http://www.w3.org/2000/svg','polygon');
				_n_f.g.replaceChild(_n_f.polygon,_n_f.polyline);
				selected_area	=	e.target.parentNode.obj;
				if(e.pageY >= 350){
					info.load(selected_area,550,300); //Custom
				}
				else{
					info.load(selected_area,e.pageX,e.pageY); 
				}
				_n_f.setCoords(_n_f.params).deselect();
				delete(_n_f.polyline);
				app.removeAllEvents().setIsDraw(false).resetNewArea()
			}
		};
		e.stopPropagation()
	};
	Polygon.prototype.move=function(x,y){var temp_params=Object.create(this.params);for(var i=0,count=this.params.length;i<count;i++){i%2?this.params[i]+=y:this.params[i]+=x}return temp_params};
	Polygon.prototype.pointMove=function(x,y){this.params[2*this.selected_point]+=x;this.params[2*this.selected_point+1]+=y;return this.params};
	Polygon.prototype.dynamicEdit=function(temp_params){this.setCoords(temp_params);return temp_params};
	Polygon.prototype.onEdit=function(e){var _s_f=app.getSelectedArea(),edit_type=app.getEditType();_s_f.dynamicEdit(_s_f[edit_type](e.pageX-_s_f.delta.x,e.pageY-_s_f.delta.y));_s_f.delta.x=e.pageX;_s_f.delta.y=e.pageY};
	Polygon.prototype.onEditStop=function(e){var _s_f=app.getSelectedArea(),edit_type=app.getEditType();_s_f.setParams(_s_f.dynamicEdit(_s_f[edit_type](e.pageX-_s_f.delta.x,e.pageY-_s_f.delta.y)));app.removeAllEvents()};
	Polygon.prototype.remove=function(){app.removeNodeFromSvg(this.g)};
	Polygon.prototype.select=function(){utils.addClass(this.polygon,'selected');return this};
	Polygon.prototype.deselect=function(){
		utils.removeClass(this.polygon,'selected');
		return this
	};
	Polygon.prototype.with_href=function(){utils.addClass(this.polygon,'with_href');return this};
	Polygon.prototype.without_href=function(){utils.removeClass(this.polygon,'with_href');return this};
	Polygon.prototype.toString=function(){for(var i=0,count=this.params.length,str='';i<count;i++){str+=this.params[i];if(i!=count-1){str+=','}}return '<area shape="poly" coords="'+str+'"'+(this.href?' href="'+this.href+'"':'')+(this.alt?' alt="'+this.alt+'"':'')+(this.title?' title="'+this.title+'"':'')+'>'};
	Polygon.createFromSaved=function(params){var coords=params.coords,href=params.href,alt=params.alt,title=params.title,area=new Polygon(coords[0],coords[1]);for(var i=2,c=coords.length;i<c;i+=2){area.addPoint(coords[i],coords[i+1])}
		area.polyline=area.polygon;area.polygon=document.createElementNS('http://www.w3.org/2000/svg','polygon');area.g.replaceChild(area.polygon,area.polyline);area.setCoords(area.params).deselect();delete(area.polyline);app.setIsDraw(false).resetNewArea();
		if(href){area.href=href}
		if(alt){area.alt=alt}
		if(title){area.title=title}
	};
	Polygon.prototype.toJSON=function(){return{type:'polygon',coords:this.params,href:this.href,alt:this.alt,title:this.title}};
};
document.addEventListener("DOMContentLoaded",SummerHtmlImageMapCreator,false);
/*
* Code by CodeFlox
* To manage map editor in WordPress editor
*/
var $=jQuery;

var on_click_radio_button=function(){
	$('input[type=radio][name=santu-image-type]').change(function(){
		if(this.value=='other-images'){
			$('.other-imgs').show();
			$('.feature-img').hide();
			$('.selected-img').hide()
		}
		else if(this.value=='feature-image'){
			$('.feature-img').show();
			$('.other-imgs').hide();
			$('.selected-img').hide()
		}
	});
};
on_click_radio_button();
function page_reload(){ location.reload()}
var update_content_ajax=function(){
	var content	=	tinymce.activeEditor.getContent();
	var pid		=	jQuery('#post_ID').val();
	$.ajax({
		type:'POST',
		url:ajaxurl,
		data:{'action':'update_content_ajax','pid':pid,'content':content},
		success:function(data){
			var res=$.parseJSON(data);
			if(res.response==1){console.log(res.message)}
			else{console.log(res.message)}
		}
	})
}

var hide_info_button=function(){$(document).on('click','#save_details',function(){$('#edit_details').hide()})}
var hide_wp_stuff=function(){$('#wpcontent,#wpfooter,#adminmenumain').addClass('hideMcont')}
var show_wp_stuff=function(){$('#wpcontent,#wpfooter,#adminmenumain').removeClass('hideMcont')}

var cancel_mapping=function(){
	$('.img-map').hide();
	show_wp_stuff();
	$('#selected-img-name').val('');
}

hide_info_button();