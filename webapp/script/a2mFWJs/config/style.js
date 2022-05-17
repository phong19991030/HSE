//
//$(document).ready(function(){
//	

	
	var sheet = document.styleSheets[4];
	var list = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p']
	$.each(list,function(i,key){
		for(var j=0 ;j<= 16;j++){
		 if(agt.indexOf("msie 8.0") != -1){
			 sheet.addRule('.'+key+j+':before' , ' background-position:'+(-16*(i+1))+'px '+(-16*j)+'px;');
//			 sheet.addRule('.'+key+j+':after{ content:"'+(-16*(i+1))+' '+(-16*j)+';"}');
		 }else{
			 sheet.insertRule('.'+key+j+':before{ background-position:'+(-16*(i+1))+'px '+(-16*j)+'px;}', 1);
//			 sheet.insertRule('.'+key+j+':after{ content:"'+(-16*(i+1))+' '+(-16*j)+';"}', 1);
		 }
		}
	});
	

	var maxTreeSize = 15;
	var preCss = '.tabContent_list .k-treeview';
	var prePaddingCss = '.tabContent_list .k-treeview';
		
	var postCss = '>div:first-child ';
	
	var midCss1 = '>ul>.k-item[aria-selected="true"]';
	var midCss2 = '>ul>.k-item[aria-expanded="true"]';
	var midPaddingCss = '>ul>.k-item';
	
	var alphaList = ['ff', 'ee', 'dd', 'cc', 'bb', 'aa', '99', '88', '77', '66', '55', '44', '33', '22', '11'];
	
	var cssColor = 'background-color: #6582e6';
	var cssPadding = 'padding: 3px 16px 3px ';
	
	var cssWidth = 'width: calc(100% - 36px)';
	for(var i = 0; i < maxTreeSize; i++) {
			
		var cssName1 = preCss;
		var cssName2 = preCss;
		var cssName3 = prePaddingCss;
			
		 
		for(var j = 0; j < i; j++) {
			if(i >= 2) {
				cssName1 += midCss1;
				cssName2 += midCss2;
			}
			cssName3 += midPaddingCss;
		}
		 
		if(i >= 2) {
			cssName1 += postCss;
			cssName2 += postCss;
		}
		
		cssName3 += postCss;
		
		if(agt.indexOf("msie 8.0") != -1){
			if(i >= 2) {
				sheet.addRule(cssName1 , cssColor + alphaList[i] + ' !important;');
				sheet.addRule(cssName2 , cssColor + alphaList[i] + ' !important;');
				sheet.addRule(cssName1 + ' .icon-plus' , 'color: #fff !important;');
				sheet.addRule(cssName2 + ' .icon-plus' , 'color: #fff !important;');
				 
				sheet.addRule(cssName1 + ' .k-in'  , ' color:#fff; font-weight: 800;');
				sheet.addRule(cssName2 + ' .k-in'  , ' color:#fff; font-weight: 800;');
			}
			
			sheet.addRule(cssName3 + ' .k-in'   , cssWidth);
//			sheet.addRule(cssName3 + ' .k-in'   , cssWidthHeader + ((i * 16) + 5) + cssWidthFooter);
			sheet.addRule(cssName3 , cssPadding + (i * 16) + 'px');
		}else{
			if(i >= 2) {
				sheet.insertRule(cssName1 + '{' + cssColor + alphaList[i] + ' !important;}', 1);
				sheet.insertRule(cssName2 + '{' + cssColor + alphaList[i] + ' !important;}', 1);
				sheet.insertRule(cssName1 + ' .icon-plus { color: #fff !important;', 1);
				sheet.insertRule(cssName2 + ' .icon-plus { color: #fff !important;', 1);
				 
				sheet.insertRule(cssName1 + ' .k-in'  + '{ color:#fff; font-weight: 800; }', 1);
				sheet.insertRule(cssName2 + ' .k-in'  + '{ color:#fff; font-weight: 800; }', 1);
			}

			sheet.insertRule(cssName3 + ' .k-in' + '{' + cssWidth + '}', 1);
//			sheet.insertRule(cssName3 + ' .k-in' + '{' + cssWidthHeader + ((i * 16) + 5) + cssWidthFooter + '}', 1);
			sheet.insertRule(cssName3 + '{' + cssPadding + (i * 16) + 'px}', 1);
		}
	}
//}) 

//     oStyleSheet.addRule("p", "background-color: #FF0;");