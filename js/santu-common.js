$=jQuery;
var cf_is_valid_URL=function(url){var url=url.trim();return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url)}
var cf_is_html=function(s){
	var a=document.createElement('div');
	a.innerHTML=s;
	for(var c=a.childNodes,i=c.length;i--;){
		if(c[i].nodeType == 1){
			return true
		}
	}
	return false
}
var cf_RGBToHex=function(rgb){rgb=rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);return (rgb&&rgb.length===4)?("0"+parseInt(rgb[1],10).toString(16)).slice(-2)+("0"+parseInt(rgb[2],10).toString(16)).slice(-2)+("0"+parseInt(rgb[3],10).toString(16)).slice(-2):''}
var cf_setCookie=function(id,vl){var ed=1;var d=new Date();d.setTime(d.getTime()+(ed*24*60*60*1000));var ex="expires="+d.toUTCString();document.cookie=id+"="+vl+"; "+ex}
var cf_getCookie=function(nm){var nm=nm+"=";var ca=document.cookie.split(';');
	for(var i=0;i<ca.length;i++){var c=ca[i];
		while(c.charAt(0)==' ')
			c=c.substring(1);
		if(c.indexOf(nm)==0) return c.substring(nm.length,c.length)
	}return false
}
var cf_delCookie=function(n){document.cookie = n + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'}
var cf_getCookiesValue=function(event_id,d){cd=new Date();var eDated=new Date(cd.getTime()+86400000);var postid='<?php echo get_the_ID(); ?>';if(cf_getCookie(postid)!=''){var ckArr=$.parseJSON(cf_getCookie(postid));for(i=0;i<ckArr.length;i++){if(ckArr[i][0]==event_id){if(d==1){if(ckArr[i][1]!=''){sDate=new Date(ckArr[i][1]);return sDate}else{return curentDate}}else if(d==2){if(ckArr[i][2]!=''){eDate=new Date(ckArr[i][2]);return eDate}else{return eDated}}else if(d==3){return ckArr[i][3]; }else{ return ckArr[i][0]}}}}else{return false}}
var cf_getColor=function(pm){var rc=[];rc=cf_hasHexColor(pm);if(pm.indexOf("rgb")>=0){rc=cf_hasRGBColor(pm,rc)}return rc}
var cf_hasHexColor=function(pm){
	var mh,co=0,cr=[],mhs=[],regexp=/#/g;
	while((mh=regexp.exec(pm))!=null){mhs.push(mh.index)}
	for(i=0;i<mhs.length;i++){
		ex=parseInt(mhs[i])+7;cr.push(pm.substring(mhs[i],ex));//problem is herere.................
		co++
	}return cr}
var cf_hasRGBColor=function(pm,hxc=[]){
	var mh,cr=[],mhs=[],regExp=/rgb\(([^)]+)\)/g;mhs=pm.match(regExp);for(i=0;i<mhs.length;i++){var hcr=cf_RGBToHex(mhs[i]);hxc.push('#'+hcr)}return hxc
}
var cf_CheckHexdColor=function(foo){
	var regexp=/#/g;
	var match,rsp=[],colors=[],matches=[];
	while((match=regexp.exec(foo))!=null){matches.push(match.index)}
	var counter=0;
	for(i=0;i<matches.length;i++){
	var endIndex=parseInt(matches[i])+7;
	colors.push(foo.substring(matches[i],endIndex));
	counter ++;
	}
	return colors
}
var cf_getRGBColors = function(pm=''){var rgm=[];var rgx=/rgb\(([^)]+)\)/g;var rgm=pm.match(rgx);return rgm}
var cf_strColorReplace = function(str='',color1='',color2=''){
	var rsp=cf_getRGBColors(str);
	if(rsp!=null){
		for(i=0;i<rsp.length;i++){
			var hColor='#'+cf_RGBToHex(rsp[i]);
			str=str.replace(rsp[i],hColor)
		}
	}
	var strArr	=	str.split("linear-gradient");
	strArr 		=	strArr.filter(Boolean);
	if(strArr.length<2){
		colorABC=strArr[0];
		colornC=colorABC.replace(' !important','');
		clenth=colornC.length;
		if(clenth<8){
			lnStr = str.replace( strArr[0],color1);
		}
		else{
			var lnClr	=	cf_CheckHexdColor(strArr[0]);
			var lnStr	=	strArr[0].replace( lnClr[0],color1 );
			var lnStr	=	lnStr.replace( lnClr[1],color2 );
			var lnStr	=	'linear-gradient'+lnStr
		}
	}
	else{
		var lnClr=cf_CheckHexdColor(strArr[1]);
		var lnStr=strArr[1].replace(lnClr[0],color1);
		var lnStr=lnStr.replace(lnClr[1],color2);var lnStr=color1+' '+'linear-gradient'+lnStr;
	}
	return lnStr;
}
var cf_hashCode=function(s){var h=0;for(var i=0;i<s.length;i++){h=s.charCodeAt(i)+((h<<5)-h)}return h} 
var cf_intToRGB=function(i){var c=(i&0x00FFFFFF).toString(16).toUpperCase();return "00000".substring(0,6-c.length)+c}
var cf_getHexColor=function(s){return cf_intToRGB(cf_hashCode(s))}
var cf_contains = function(needle) {
    var findNaN = needle !== needle;
    var indexOf;
    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;
            for(i = 0; i < this.length; i++) {
                var item = this[i];
                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }
            return index;
        };
    }
    return indexOf.call(this, needle) > -1;
};
var st_loader_show=function(){
	if ($("body").hasClass("wp-admin")) { // Only show in Admin area
		$('.sntldr').show()
	}
}
var st_loader_hide=function(){$('.sntldr').hide(300)}