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
//}) 

//     oStyleSheet.addRule("p", "background-color: #FF0;");