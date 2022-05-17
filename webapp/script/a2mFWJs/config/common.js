jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ? 
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
};

/**************************************************************************************************************
 *

**********************************          Ajax Global Setup            ************************************
 **************************************************************************************************************/
/** 1. Global Ajax Setting **/
/*
 * @JK - 보안 취약점 수정
 */
//try{}catch(e){
//	
//}finally{
//	
//}
$.ajaxSetup({
	timeout: 30000000
});

$(document).ajaxStart(function(){
//	loadingBarShow(); 
});  
$(document).ajaxStop(function(){
//	loadingBarHide();
});
/**/
/*
$(document).ajaxSuccess(function(a,b,c,d,e){
	var text = b.responseText
	if(d.indexOf('Exception]')>0){
		//팝업창 타이틀
		var $title = $('<div class="errormessage" style="color:#fff;background:#ff6600;padding:8px 3px 6px 8px;">예외사항발생</div>');
		//팝업창 내용
		var $contents = $("<div style='background:#fff;border:solid 1px #d0d0d0;padding:10px;margin:10px;height:175px;overflow:auto;'>" + text + "</div>");
		//팝업창
		var $div = $('<div class="message" style="position:absolute;top:200px;left:200px;border:solid 1px #ff6600;background:#e8e8e8;font-size:12px;width:400px;height:250px;z-index:1000;"></div>');
		//닫기 버튼
		var $button = $("<div style='position:absolute;top:8px;right:8px;cursor:pointer;color:#fff;font-weight:bold;'>X</div>");
		$button.bind('click', function(){$div.remove();});//$div.remove()
		//조립하고 Body에 붙임
		$title.append($button);
		$div.append($title);
		$div.append($contents);
		$div.draggable();//drag할수 있게 JQuery UI이용
		$div.appendTo("body");
	}
});
*/
$(document).ajaxComplete(function(a,b,c,d,e){
		initialDom($(document))
});

/** 2. Global Ajax Error Handler **/
/* @JK - 필요 없음 */
//$(document).ajaxError(function(event, jqxhr, settings, exception) {
//	
//	// @JK ajaxError 수정 
////	try {
////		loadingBarHide();	
////	} catch (e) {
////		/*
////		 * @JK - 보안 취약점 수정
////		 * : 기존에 catch 구문에 아무 처리 안되어있었음 
////		 */
////		alert(e); 
////	}
//	
//	//jqxhr, exception
//	var cont = "";
//	if (jqxhr.status === 0) {
//        cont = 'Not connect. Verify Network.('+exception+')';
//    } else if (jqxhr.status == 404) {
//        cont = 'Requested page not found. [404].('+exception+')';
//    } else if (jqxhr.status == 500) {
//        cont = 'Internal Server Error [500].('+exception+')';
//    } else if (exception === 'parsererror') {
//        cont = 'Requested JSON parse failed.';
//    } else if (exception === 'timeout') {
//        cont = 'Time out error.';
//    } else if (exception === 'abort') { 
//        cont = 'Ajax request aborted.';
//    } else {
//        cont = 'Uncaught Error.<br/>' + jqxhr.responseText;
//    }
//	//settings
//	var err = '- url : ' + settings.url + '<br/>';
//	err += '- data : ' + settings.data + '<br/>';
//	err += '- dataType : ' + settings.dataType + '<br/>';
//	err += '- type : ' + settings.type + '<br/>';
//	err += '- async : ' + settings.async + '<br/>';
//	err += '- exception : ' + cont;
//
//	//팝업창 타이틀
//	var $title = $('<div class="errormessage" style="color:#fff;background:#ff6600;padding:8px 3px 6px 8px;">예외사항발생</div>');
//	//팝업창 내용
//	var $contents = $("<div style='background:#fff;border:solid 1px #d0d0d0;padding:10px;margin:10px;height:175px;overflow:auto;'>" + err + "</div>");
//	//팝업창
//	var $div = $('<div class="message" style="position:absolute;top:200px;left:200px;border:solid 1px #ff6600;background:#e8e8e8;font-size:12px;width:400px;height:250px;z-index:1000;"></div>');
//	//닫기 버튼
//	var $button = $("<div style='position:absolute;top:8px;right:8px;cursor:pointer;color:#fff;font-weight:bold;'>X</div>");
//	$button.bind('click', function(){$div.remove();});//$div.remove()
//	//조립하고 Body에 붙임
//	$title.append($button);
//	$div.append($title);
//	$div.append($contents);
//	$div.draggable();//drag할수 있게 JQuery UI이용
//	$div.appendTo("body");
//});
/**************************************************************************************************************/

function openPop(to, ctxPath, start_dt, end_dt, val1, val2){
	if(to == 1){
		return windowOpen(ctxPath + "/common/gis/gisPopup.do?POPUPCASE=gis&SUBST_CD=" + val1 + "&CBID=" + val2 + "&START_DT="+start_dt+"&END_DT="+end_dt, 'GIS', $(parent.parent.window).width(), $(parent.parent.window).height(),'location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,titlebar=no'); 
	}
//	else if(to == 11){
//		return windowOpen(ctxPath + "/common/gis/gisPopup.do?POPUPCASE=gis&SUBST_CD=&START_DT="+start_dt+"&END_DT="+end_dt, 'GIS', 1000, 700,'location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,titlebar=no');
//	}
	else if(to == 2){
		return windowOpen(ctxPath + "/common/gis_sch/gisPopup.do?POPUPCASE=gis&SUBST_CD=" + val1 + "&START_DT="+start_dt+"&END_DT="+end_dt, 'SCHGIS', $(window).width(), $(window).height(),'location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,titlebar=no');
	}
	else if(to == 3){
		var param1="";
		var param2="&VMODE=";
		//relay(3, '<%=ctxPath%>', START_DT, END_DT,'', '', '', '', '');
		/*
		if(m_actNo != null && m_actNo != ""){
			param1 = param1+"&ACT_NO="+m_actNo;
		}*/
		if(val1 != null && val1 != ""){
			param1 = val1;
		}
		if(val2 != null && val2 != ""){
			if(typeof val2 != undefined && val2 instanceof Object){
//				param2 += "&SUBST_CD=" + val1;
//				param2 += "&FEED_CD=" + (val2.FEED_CD || '' );
				param2 = param2 + "N";
			}else
				param2 = param2 + val2;
		}
		else{
			param2 = param2 + "A";
		}
		//alert(param1+param2);
		return windowOpen(ctxPath + "/common/gis_sld/gisPopup.do?POPUPCASE=gis&START_DT="+start_dt+"&END_DT="+end_dt+param1+param2, 'SLDGIS', $(window).width(), $(window).height(),'location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,titlebar=no');
	}
}

function popCallback(){
	if(m_to == 1)
		try{ 
			popWin1.trans(m_actNo, m_val1, m_val2);
		} catch (e) {
			/*
			 * @JK - 보안 취약점 수정
			 * : 기존에 해당 alert 주석 처리 되어있었음 
			 */
			//alert("GIS 데이터 전송오류(" + e.toString()+")");
			alert(e);
		}
	else if(m_to == 2)
		popWin2.trans(m_actNo, m_val1, m_val2);
	else if(m_to == 3)
		popWin3.trans(m_actNo, m_val1, m_val2);
}


function chkPopWin(No){
	switch(No){
	case 1 : return popWin1;
	case 2 : return popWin2;
	case 3 : return popWin3;
	default : return null;
	}
	
}

(function($){
	/* Page Load Plug In 추가 */
	$.fn.loadpage = function(opt){
		$(this).load(opt.url, opt.data, opt.success ? opt.success () : null);
		return this;
	};
	
	/* 
	 * Chart Plug In 추가
	 * 라인, 방사형 Chart에 사용
	 * series의 data타입이 배열안의 맵형태([{a : b}, {c : d}, {e : f}, {g : h}]
	 * 
	 *  - opt
	 *    opt.data(json data) : ajax submit에서 리턴받은 json 데이터
	 *    opt.label_key(String) : chart의 라벨 key
	 *    opt.categories(Array) : chart의 value key
	 *    opt.option : chart 옵션
	 *    opt.defaultOption : chart Default 옵션
	 */
	$.fn.highChartsDefault = function(opt){
		if(opt.defaultOption){
			Highcharts.setOptions(opt.defaultOption);
		}
		var chartData = [];
		$.each(opt.data, function(k, v){
			var gv = [];
			$.each(opt.categories, function(k1, v1){
				gv.push(Number(v[v1]));
			});
			chartData.push({name : v[opt.label_key], data : gv});
		});
		opt.option.xAxis.categories = opt.categories;
		opt.option.series = chartData;
		new Highcharts.Chart(opt.option);
	};
	
	/* Chart Plug In 추가
	 * Pie Chart에 사용
	 * series의 data타입이 배열안에 배열형태([[a, b], [c, d], [e, f], [g, h]])
	 * 
	 *  - opt
	 *    opt.data(json data) : ajax submit에서 리턴받은 json 데이터
	 *    opt.label_key(String) : pie chart의 라벨 key
	 *    opt.categories(Array) : pie chart의 value key
	 *    opt.option : chart 옵션
	 *    opt.defaultOption : chart Default 옵션
	 */
	$.fn.highChartsPie = function(opt){
		if(opt.defaultOption){
			Highcharts.setOptions(opt.defaultOption);
		}
		var $this = $(this);
		var chartData = [];
		var gv = [];
		$.each(opt.data, function(k, v){
			$.each(opt.categories, function(k1, v1){
				gv.push([v[opt.label_key], Number(v[v1])]);
			});
		});
		chartData.push({data : gv});
		opt.option.series = new Array();
		opt.option.series = chartData;
		new Highcharts.Chart(opt.option);
	};
	
	/*
	 * Chart Plug In 추가
	 * Bar(Column) Chart에 사용
	 * 
	 *  - opt
	 *    opt.data(json data) : ajax submit에서 리턴받은 json 데이터
	 *    opt.label_key(Array) : bar chart의 라벨 key
	 *    opt.label(Array) : bar chart에서 사용될 라벨의 명칭
	 *    opt.categories(Array) : bar chart의 value key
	 *    opt.option : chart 옵션
	 *    opt.defaultOption : chart Default 옵션
	 *    
	 *    ※opt.label_key 와 opt.label은 1:1 매핑이므로 length가 같아야함.
	 */
	$.fn.highChartsBar = function(opt){
		if(opt.defaultOption){
			Highcharts.setOptions(opt.defaultOption);
		}
		var $this = $(this);
		var chartData = [];
		var gl = [];
		$.each(opt.data, function(k1, v1){
			gl.push(v1[opt.categories]);
		});
		$.each(opt.label_key, function(k, v){
			var gv = [];
			$.each(opt.data, function(k1, v1){
				gv.push(Number(v1[v]))
			});
			if(opt.type){
				chartData.push({type : opt.type[k], name : opt.label[k], data : gv});
			}else{
				chartData.push({name : opt.label[k], data : gv});
			}
		});
		opt.option.xAxis = new Array();
		opt.option.xAxis[0] = new Object();
		opt.option.xAxis[0].categories = gl;
		opt.option.series = new Array();
		opt.option.series = chartData;
		new Highcharts.Chart(opt.option);
	};
})(jQuery);

/**************************** DATE **********************************************************************/
/**
 * 초 -> 0시 0분 0초로 반환
 */
function getStrTimeFromSeconds(seconds){
	var dd = Math.floor(seconds / (60 * 60 * 24));//일
	var hh = seconds % (60 * 60 * 24);//시(일을 뺀 나머지 시간)
	    hh = Math.floor(hh / (60 * 60));
	var mm = seconds % (60 * 60);//분(시간을 뺀 나머지 분)
		mm =  Math.floor(mm / 60);
	var ss = seconds % 60;//초
	var str_time = "";
	if(dd > 0) str_time += dd + "일 ";
	if(hh > 0) str_time += hh + "시간 ";
	if(mm > 0) str_time += mm + "분 ";
	str_time += ss + "초";
	
	/*
	if(hh > 0){
		str_time = hh + "시 "+ mm + "분 "+ ss + "초";
	}else{
		if(mm > 0){
			str_time = mm + "분 "+ ss + "초";
		}else{
			str_time = ss + "초";
		}
	}
	*/
	return str_time;
}
/**
 * 초 -> 0시로 반환
 */
function getStrHourFromSeconds(seconds){
	var hh = seconds;
	    hh = Math.floor(hh / (60 * 60));
	
	return hh;
}

/**
 * 현재 시간을 String으로 반환  2013-07-24 09:59:15<br/>
 * 
 * getStrDate([part_name]);<br/>
 * @param part_name (옵션) 날짜의 각 부분<br/>
 *        : YY=년도, MM=월, DD=일, HH=시간(24시간제), MI=분, SS=초, WK=요일<br/>
 *        : DATE=년-월-일(YYYY-MM-DD), TIME=시:분:초(HH:MI:SS)<br/>
 *        : null =년-월-일 시:분:초<br/>
 * 
 */ 
function getStrDate(part_name){
	var weeks = new Array('일','월','화','수','목','금','토');
	var datetime = new Date();
	var strdate = "";

	if(!part_name) part_name = "DEFAULT";
	
	if(part_name == "YY") { 
		strdate = datetime.getFullYear() + ""; 
	} else if(part_name == "MM") {
		strdate = leadingZeros(datetime.getMonth() + 1, 2);
    } else if(part_name == "DD") {
    	strdate = leadingZeros(datetime.getDate(), 2);
    } else if(part_name == "HH") {
    	strdate = leadingZeros(datetime.getHours(), 2);
    } else if(part_name == "MI") {
    	strdate = leadingZeros(datetime.getMinutes(), 2);
    } else if(part_name == "SS") {
    	strdate = leadingZeros(datetime.getSeconds(), 2);
    } else if(part_name == "WK") {
    	strdate = weeks[datetime.getDay()];
    } else if(part_name == "DATE") {
    	strdate = datetime.getFullYear() + "-" +
    	          leadingZeros(datetime.getMonth() + 1, 2) + "-" + 
    	          leadingZeros(datetime.getDate(), 2);
    } else if(part_name == "HHMM") {
    	strdate = leadingZeros(datetime.getHours(), 2) + ":" +
        leadingZeros(datetime.getMinutes(), 2) ;

    } else if(part_name == "TIME") {
    	strdate = leadingZeros(datetime.getHours(), 2) + ":" +
    	          leadingZeros(datetime.getMinutes(), 2) + ":" + 
    	          leadingZeros(datetime.getSeconds(), 2);
    
	} else if(part_name == "DEFAULT") {
		strdate = datetime.getFullYear() + "-" +
        	          leadingZeros(datetime.getMonth() + 1, 2) + "-" + 
        	          leadingZeros(datetime.getDate(), 2) + " " +
					  leadingZeros(datetime.getHours(), 2) + ":" +
        	          leadingZeros(datetime.getMinutes(), 2) + ":" + 
        	          leadingZeros(datetime.getSeconds(), 2);
		
	}
	return strdate;
}

/**
 * Time 스트링을 자바스크립트 Date 객체로 변환<br/>
 * ex) toDate("2009-11-25", "-");<br/>
 * ex) toDate("20091125", "");<br/>
 * @param dateStr 날짜형식 문자열
 * @param delemeter
 * @returns {Date}
 */
function toDate(dateStr, delm) {
	var year;
	var month;
	var day;
	var result;
	if(dateStr){
		if(delm){
			var d = dateStr.split(delm);
			year = d[0];
			month = d[1] - 1;
			day = d[2];
		}else{
			year = dateStr.substr(0,4);
			month = dateStr.substr(4,2) - 1;
			day = dateStr.substr(6,2);
		}
		result = new Date(year,month,day)
	}else{
		result =''
	}
	return result;
};

/**
 * 날짜에 특정 필드를 amount 만큼 더하거나 뺀다.
 * ex) addDate("2013-06-26", "d", 1)
 * ex) addDate("2013-06-26", "m", 1)
 * ex) addDate("2013-06-26", "y", 1)
 * @param src     더하거나 뺄 대상 날짜(Date 타입이나 "2011-06-01" 형식의 문자열)
 * @param field   대상 필드( y, m, d )
 * @param amount  더가허나 뺄 숫자
 * @returns {String}
 */
function addDate(src, field, amount){
	var d = (src.getDate) ? src : toDate(src, "-");
	d.addDate(field, amount);
	
	var month = parseInt(d.getMonth())+1;
	var day = parseInt(d.getDate());
	
	return d.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
};

/**
 * 날짜의 특정 필드 연산
 * @param field y, m, d
 * @param amount 더하거나 뺄 숫자
 * @returns {Date}
 */
Date.prototype.addDate = function(field, amount){ 
	if(isNaN(amount)){ 
		return false; 
	} 
	amount = new Number(amount); 
	switch(field.toLowerCase()){ 
		case "y": { 
			this.setFullYear(this.getFullYear() + amount); 
			break; 
		}
		case "m": { 
			this.setMonth(this.getMonth() + amount); 
			break; 
		} 
		case "d": { 
			this.setDate(this.getDate() + amount); 
			break; 
		} 
		default: { 
			return false; 
		} 
	} 
	return this; 
};

Array.prototype.unique = function(){
	var a = {};
	for(var i = 0; i < this.length; i++){
		if(typeof a[this[i]] == "undefined"){
			a[this[i]] = 1;
		}
	}
	this.length = 0;
	for(var i in a){
		this[this.length] = i;
	}
	return this;
}

/* Tab Navigator Class 변경 */
function tabClassChang(opt, tabIndex){
	opt.removeClass();
	$.each(opt, function(idx){
		var item = $(this); 
		if(idx == "0"){
			// 첫번째 탭이 선택된경우
			if(idx == tabIndex){
				item.addClass("tab_first_ov");
			}else{
				item.addClass("tab_first_out");
			}
		}else if(idx == (opt.length - 1)){
			// 마지막 탭이 선택된 경우
			if(idx == tabIndex){
				item.addClass("tab_last_out_ov");
			}else{
				// 이전 탭이 선택된경우
				if(idx == (tabIndex + 1)){
					item.addClass("tab_last_ov_out");
				}else{
					item.addClass("tab_last_out_out");
				}
			}
		}else{
			// 중간 탭이 선택된 경우
			if(idx == tabIndex){
				item.addClass("tab_mid_out_ov");
			}else{
				// 이전 탭이 선택된 경우
				if(idx == (tabIndex + 1)){
					item.addClass("tab_mid_ov_out");
				}else{
					item.addClass("tab_mid_out_out");
				}
			}
		}
	});
}

/**
 * table의 동일 column에 rowspan주기
 * @param colIdx rowspan할 column
 * 사용법
 * $("#테이블 id").rowspan(0);
 */
$.fn.rowspan = function(colIdx){
	return this.each(function(){
		var that;
		$("tr", this).each(function(row){
			$("td:eq(" + colIdx + ")", this).filter(":visible").each(function(col){
				if($(this).html() == $(that).html()){
					rowspan = $(that).attr("rowSpan");
					
					if(rowspan == undefined){
						$(that).attr("rowSpan", 1);
						rowspan = $(that).attr("rowSpan");
					}
					rowspan = Number(rowspan) + 1;
					$(that).attr("rowSpan", rowspan);
					$(this).hide();
				}else{
					that = this;
				}
				that = (that == null) ? this : that;
			});
		});
	});
}

/* 폼검증 */
function isEmpty(id, name , type){
	if(type == null) type = "input";//input|select
	var obj = $("#"+id);
	if(obj.val() == ""){
		if(type == "input") alert(name + "을(를) 입력하세요.");
		else if(type == "select") alert(name + "을(를) 선택하세요.");
		else alert(name + "이(가) 없습니다.");
		obj.focus();
		return false;
	}else{
		return true;
	}

}

/* input readonly 설정 */
function setReadOnly(id, flag){
	if(flag){
		//disabled된 것 처럼 처리
		$("#"+id).attr("readonly", true);//readonly - disabled로 하면 전송이 안됨
		$("#"+id).addClass("readonly");//스타일 적용
		$("#"+id).bind("focus", function(e){$(this).blur();});//포커스를 갖지 못하게 조정
	}else{
		//disabled된 것 처럼 처리된것 해제
		$("#"+id).attr("readonly", false);//readonly해제
		$("#"+id).removeClass("readonly");//스타일 해제
		$("#"+id).unbind("focus");//이벤트 해제
	}
}


/*이미지 파일 체크*/
function imgFileChk(){
	var chkFile = false;
	var limitFile = new Array();
	limitFile = ["jpeg","jpg","bmp","gif","png"];
	var fileName = $("#REAL_NAME").val();
	var limitFileLen = limitFile.length;
	var chkExe = fileName.split(".");

	if(fileName == null || fileName == "") chkFile = true;
	
	for(var i=0; i<limitFileLen; i++){
		for(var j=0; j < chkExe.length; j++){
			if(limitFile[i] == chkExe[j]){
				chkFile = true;
				break;
			}
		}
	}
	return chkFile;
}

function imgFileChange(){		
	if(!imgFileChk()){
		alert("이미지 파일만 첨부가 가능합니다.");
		$('#FILE').replaceWith("<input type='file' id='REAL_NAME' name='REAL_NAME' style='width:450px' onchange='javascript:imgFileChange()'/>");
	}
}

//파일다운로드
function goDownload(cls, uniq_no){		
	var ctxPath = $("#ctxPathForJavascript").val();
	location.href = ctxPath + "/common/attach/download?UNIQ_NO="+uniq_no+"&CLS="+cls+"&SEQ=1";
}


/**
 * 쿼리결과를 Array로 변환
 * 'YYYY-MM-DD HH24:MI:SS' -> javascript Array객체로 변환
 */
function getArrayDate(strDate){
	if(strDate){
		var dateArray = strDate.split(" ");
		var date = dateArray[0].split("-");
		var time = dateArray[1].split(":");
		
		/*
		 * @JK - 보안 취약점 수정
		 */
//		return [date[0], eval(date[1]) - 1, date[2], time[0], time[1], time[2]];
		return [date[0], parseInt(date[1])-1, date[2], time[0], time[1], time[2]];
	} else {
		return [0,0,0,0,0,0];
	}
}

/**
 * 2015.06.02 a2m_ohsy
 * 사업자번호 검증
 */
function checkBizID(bizID){
	// bizID는 숫자만 10자리로 해서 문자열로 넘긴다. 
	var checkID = [1, 3, 7, 1, 3, 7, 1, 3, 5, 1]; 
	var chkSum = 0;
	var c2 = "";
	var remander = 0; 
	//1) strip
	bizID = bizID.replace('-',''); 
	//2)
	for (var i = 0;i <= 7;i++)
	{
		chkSum = chkSum + checkID[i] * Number(bizID.charAt(i)); 
	}
	
	c2 = "0" + (checkID[8] * Number(bizID.charAt(8))); 
	c2 = c2.substring(c2.length - 2, c2.length); 

	chkSum =  chkSum + Math.floor(Number(c2.charAt(0))) + Math.floor(Number(c2.charAt(1))); 
	remander = (10 - (chkSum % 10)) % 10 ; 
	
	if (Math.floor(Number(bizID.charAt(9))) != remander) return false;
	
	return true;
}

/**
 * 2015.06.02 a2m_ohsy
 * 주민번호 검증
 */
function chkJumin(jumin){	
	jumin = jumin.replace('-',''); 
	jumin = jumin.substr(0,6) + "-" + jumin.substr(6,7);
	if(jumin.match(/^\d{2}[0-1]\d[0-3]\d-[1-4]\d{6}$/) == null) {
		return false;
	}
	
	var chk = 0;
	var i ;
	var last_num  = Number(jumin.substring(13, 14));
	var chk_num  = '234567-892345';
	
	for(i = 0; i < 13; i++) {
		if(jumin.charAt(i) != '-')
			chk += ( parseInt(chk_num.charAt(i)) * parseInt(jumin.charAt(i)) );
	}
	
	chk = (11 - (chk % 11)) % 10;
	
	if (chk != last_num) return false;
	
	return true;
}

/**
 * 2014-04-14 최민경
 * 외국인번호 검증
 */
function chkFrgn(frgn){

	frgn = frgn.replace(/\-/g, '');
	
	var sum = 0;
	if (frgn.length != 13) {
		return false;
	}
	else if (frgn.substr(6, 1) != '5' && frgn.substr(6, 1) != '6' && frgn.substr(6, 1) != '7' && frgn.substr(6, 1) != '8') {
		return false;
	}
	
	if (Number(frgn.substr(7, 2)) % 2 != 0) {
		return false;
	}
	for (var i = 0; i < 12; i++) {
		sum += Number(frgn.substr(i, 1)) * ((i % 8) + 2);
	}
	if ((((11 - (sum % 11)) % 10 + 2) % 10) == Number(frgn.substr(12, 1))) {
		return true;
	}
	return false;
}

/**************************** WINDOW **********************************************************************/

/**
* POPUP WINDOW
*/
function windowOpen(url, name, width, height, options){
	//값검증
	if(name == null) name = "";
	if(width == null || width == "") width = 700;
	if(height == null || height == "") height = 500;
	if(options == null || options == "") options = "directories=no,fullscreen=no,location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,titlebar=no";
	//창위치
	var x = 0;
	var y = 0;
	if(window.screenX){
		x = window.screenX;
		y = window.screenY;
	}else{//IE
		x = window.screenLeft;
		y = window.screenTop;
	}
	var x = x + ($(window).width() - width)/2;
	var y = y + ($(window).height() - height)/2;
	return window.open(url, name , "width="+width+",height="+height+",top="+y+",left="+x+"," + options);
}
/**
 * 팝업창에서 Opener을 핸들링(이동시키기) 하기 위해 호출
 */
function linkOpener(url){
	window.opener.linkCallBack(url);
}
/**
 * Opener의 페이지 이동 요청을 처리
 */
function linkCallBack(url){
	location.href = url;
}


/**
 * flag : g = global, i = ignore case, m = multiline
 * ^ = 
 */

//8) 종합모니터링팝업
function openDashboard(url){
	var screenWidth = 1000;
	var screenHeight = 660;
	var option = "directories=0,location=0,menubar=0,resizable=1,scrollbars=0,status=0,titlebar=0,toolbar=0";
	windowOpen(url, "Dashboard", screenWidth, screenHeight, option);
}

//99) class선택자로 keyup이벤트에 자동 바인딩
$(document).ready(function(){
	//money
//	$(".money").bind("keyup", restrictMoney);
//	$(".money").bind("keyup", formatComma);
//	$(".money").bind("focus", formatSelect);
//	
//	$(".money").bind("blur", restrictMoney);
//	$(".money").bind("blur", formatComma);
//	//number
//	$(".number").bind("keyup", restrictNumber);
//	$(".number").bind("keyup", formatComma);
//	$(".number").bind("focus", formatSelect);
//	
//	$(".number").bind("blur", restrictNumber);
//	$(".number").bind("blur", formatComma);
//	//decimal
//	$(".decimal").bind("keyup", restrictDecimal);
//	$(".decimal").bind("focus", formatSelect);
//	
//	$(".decimal").bind("blur", restrictDecimal);
//	//onlyNumber
//	$(".onlyNumber").bind("keyup", restrictOnlyNumber);
//	$(".onlyNumber").bind("focus", formatSelect);
//	
//	$(".onlyNumber").bind("blur", restrictOnlyNumber);
//	//onlyEnglish
//	$(".onlyEnglish").bind("keyup", restrictOnlyEnglish);
//	$(".onlyEnglish").bind("focus", formatSelect);
//	
//	$(".onlyEnglish").bind("blur", restrictOnlyEnglish);
//	//onlyEnglishUpper
//	$(".onlyEnglishUpper").bind("keyup", restrictOnlyEnglishUpper);
//	$(".onlyEnglishUpper").bind("focus", formatSelect);
//	
//	$(".onlyEnglishUpper").bind("blur", restrictOnlyEnglishUpper);
//	//onlyEnglishLower
//	$(".onlyEnglishLower").bind("keyup", restrictOnlyEnglishLower);
//	$(".onlyEnglishLower").bind("focus", formatSelect);
//	
//	$(".onlyEnglishLower").bind("blur", restrictOnlyEnglishLower);
//	//forCode
//	$(".forCode").bind("keyup", restrictForCode);
//	$(".forCode").bind("focus", formatSelect);
//	
//	$(".forCode").bind("blur", restrictForCode);
//	//forId
//	$(".forId").bind("keyup", restrictForId);
//	$(".forId").bind("focus", formatSelect);
//	$(".forId").bind("blur", restrictForId);
	
	 
	
});

/**************************** EXCEL **********************************************************************/


function _getData(gridName, flag){
	var result = [];
	//iframe에 들어있는 데이터는 특별처리
	if(flag == "iframe")
		result = $("#chartIframe").contents().find("#"+gridName+"").jqGridExport({exptype:"jsonstring"});
	else
		result = $("#"+gridName+"").jqGridExport({exptype:"jsonstring"});
	return result;
}
function RemoveHTML(text) {
    var objReg = new RegExp();  //  정규 표현식 객체를 생성한다
    objReg = /[<][^>]*[>]/gi;  
     // <...> 태그를 대소문자 구분 없이[/gi 옵션](g=global / i=insensitive) 모두 찾는다.
     text= text.replace(objReg, "");
     return text;
}




 
//특수문자제거
function removeSpecial(str){
	var result = str; 
	var specialChars='&';		//제거할 특수문자
	var specialChange = '    ％   ';						//몇몇 필요한 특수문자 치환
  var i, j;
  if (result == '' || result == null) {
	  return "";
  }
  for (i = 0; i < result.length; i++) {
    for (j = 0; j < specialChars.length; j++) {
      if (result.charAt(i) == specialChars.charAt(j)){
      	if(j<=6){										//몇몇 필요한 특수문자 치환
      		result = result.replace(result.charAt(i), specialChange.charAt(j));
      	}else{
      	result = result.replace(result.charAt(i), "");	//필요하지 않은 특수문자는 제거
      	}
      }
    }
  }
  return result;
}

/**
 * 두 날짜의 차이를 일자로 구한다.(조회 종료일 - 조회 시작일)
 *
 * @param val1 - 조회 시작일(날짜 ex.2002-01-01)
 * @param val2 - 조회 종료일(날짜 ex.2002-01-01)
 * @return 기간에 해당하는 일자
 */
function calDateRange(val1, val2)
{
    var FORMAT = "-";

   

    // FORMAT을 포함한 길이 체크
    if (val1.length != 10 || val2.length != 10)
        return null;



    // FORMAT이 있는지 체크
    if (val1.indexOf(FORMAT) < 0 || val2.indexOf(FORMAT) < 0)
        return null;



    // 년도, 월, 일로 분리
    var start_dt = val1.split(FORMAT);
    var end_dt = val2.split(FORMAT);



    // 월 - 1(자바스크립트는 월이 0부터 시작하기 때문에...)
    // Number()를 이용하여 08, 09월을 10진수로 인식하게 함.
    start_dt[1] = (Number(start_dt[1]) - 1) + "";
    end_dt[1] = (Number(end_dt[1]) - 1) + "";



    var from_dt = new Date(start_dt[0], start_dt[1], start_dt[2]);
    var to_dt = new Date(end_dt[0], end_dt[1], end_dt[2]);



    return (to_dt.getTime() - from_dt.getTime()) / 1000 / 60 / 60 / 24;
}
/**************************** HighCharts **********************************************************************/
/*
 * getChartWidth(챠트의갯수, 챠트넓이비율, 챠트간격)
 * 챠트의갯수    : 가로로 배열되는 챠트의 갯수
 * 챠트넓이비율  : 화면에서 챠트가 차지할 비율 ex)2개의 챠트를 가로로 배열 -> 0.5
 * 챠트간격      : 챠트간의 간격총합 ex) 2개의챠트 간격은 10 -> 10, 3개의 챠트 간격은 10 -> 20
 */
function getChartWidth(chart_count, chart_width_ratio, chart_gap){
	//1) window의넓이(넓이계산의 기초값)
	var window_width = $(window).width();
	if(TOP_LAYOUT_WIDTH) {if(window_width < TOP_LAYOUT_WIDTH) window_width = TOP_LAYOUT_WIDTH;}//subHeader.jsp에서 구한 TOP메뉴의 넓이
	//2) 메뉴의 넓이 : 메뉴가 닫힌 경우 확인
	var menu_width = $('#leftwrap').width();
	var menu_status = $('#leftwrap').css('display');
	if(menu_status == 'none'){
		menu_width = 0;
	}
	//3) 메뉴 열림/닫힘 버튼의 넓이
	var menu_button_width = $('#btn_wrap').width();
	//4) 컨텐츠의 패팅(현재 left=20, right=10)
	var contents_padding = 30;
	//5) 챠트의 패팅(chart_wrapper의 패팅=20)
	var chart_padding = 20 * chart_count;
	//6) 챠트의 보더(chart_wrapper의 보더=2)
	var chart_border = 4 * chart_count;
	//7) 챠트의 넓이 계산
	var chart_width = window_width - menu_width - menu_button_width - contents_padding - chart_padding - chart_border;
	
	//8) 챠트간격 적용
	chart_width = chart_width - chart_gap;
	
	//9) 챠트의 넓이 비율 적용
	chart_width = chart_width * chart_width_ratio;
	return chart_width;
}


/**************************** Debug **********************************************************************/

/**
 * Object의 내용을 팝업창으로 보여준다.
 * 
 * debug(확인하고 싶은 오브젝트);
 */
function debug(obj){
	//오브젝트 내용을 String으로 만든다.
	var s = "";
	////////////////////////////////////////// 1
	for(var key1 in obj){
		var obj1 = obj[key1];
		
		if(typeof(obj1) == "object"){
			s += (key1 + " = {\n");	
				/////////////////////////////////// 2
				for(var key2 in obj1){
					var obj2 = obj1[key2];
					
					if(typeof(obj2) == "object"){
						s += (key2 + " = {\n");	
						
						/////////////////////////////////// 3
						for(var key3 in obj2){
							var obj3 = obj2[key3];
					
							if(typeof(obj3) == "object"){
								s += (key3 + " = {\n");	
								/////////////////////////////////// 4
								for(var key4 in obj3){
									var obj4 = obj3[key4];
							
									if(typeof(obj4) == "object"){
										s += (key4 + " = {\n");	
										/////////////////////////////////// 5
										for(var key5 in obj4){
											var obj5 = obj4[key5];
									
											if(typeof(obj5) == "object"){
												s += (key5 + " = {\n");	
												/////////////////////////////////// 6
												for(var key6 in obj5){
													var obj6 = obj5[key6];
											
													//if(typeof(obj6) == "object"){
													//	s += (key6 + " = {\n");	
													//	s += "}\n";
													//}else{
														s += (key6 + " = " + obj6 + "\n");	
													//}
												}
												////////////////////////////////// 6
												s += "}\n";
											}else{
												s += (key5 + " = " + obj5 + "\n");	
											}
										}
										////////////////////////////////// 5
										s += "}\n";
									}else{
										s += (key4 + " = " + obj4 + "\n");	
									}
								}
								////////////////////////////////// 4
								s += "}\n";
							}else{
								s += (key3 + " = " + obj3 + "\n");	
							}
						}
						////////////////////////////////// 3
						s += "}\n";
					}else{
						s += (key2 + " = " + obj2 + "\n");	
					}
				}
				/////////////////////////////////// 2
			s += "}\n";
		}else{
			s += (key1 + " = " + obj1 + "\n");	
		}
	}
	////////////////////////////////////// 1
	
	//팝업창 타이틀
	var $title = $("<div style='color:#fff;background:#000;height:20px;'>&nbsp;&nbsp;Debug </div>");
	//팝업창 내용(Textarea)
	var $contents = $("<textarea style='width:364px;height:264px;padding:10px;margin:5px;'>" + s + "</textarea>");
	//팝업창
	var $div = $("<div style='position:absolute;top:100px;left:100px;border:solid 1px #000;background:#eee;width:400px;height:320px;z-index:1000;'></div>");
	//닫기 버튼
	var $button = $("<div style='position:absolute;top:2px;right:10px;cursor:pointer;color:#ff0000'>X</div>");
	$button.bind('click', function(){$div.remove();});//$div.remove()
	//조립하고 Body에 붙임
	$title.append($button);
	$div.append($title);
	$div.append($contents);
	$div.draggable();//drag할수 있게 JQuery UI이용
	$div.appendTo("body");
}


//배전정전통계 popupList Open..
function doFO0801PopupOpen(param){
	var url = CTX +"/fo/fo0801_popup.do?"+ param;
	var options = "directories=no,fullscreen=no,location=no,menubar=no,resizable=no,scrollbars=no,status=no,titlebar=no";
	windowOpen(url , "", 1000, 640, options);
}

/* StringBuffer */
var StringBuffer = function(){
	this.buffer = new Array();
};
StringBuffer.prototype.append = function(str){
	this.buffer[this.buffer.length] = str;
};
StringBuffer.prototype.toString = function() {
	return this.buffer.join("");
};

function popGis(pCode){
	var START_DT = $("#START_DT").val();
	var END_DT = "";

	if(pCode == 'pq0204'){
		index = $("#SEARCH_DL option:selected").index();
		if(index == 0){ alert('관심대상목록을 선택해주세요'); return;}
		relay(1, CTX, START_DT, END_DT, pCode, null, null);
	}
	
	if(pCode == 'pq0301'){
		relay(1, CTX, START_DT, END_DT, pCode, 'BTN', '', '', '');
	}
	
	if(pCode == 'fo0301'){
		relay(1, CTX, START_DT, END_DT, pCode, '', '', '', '');
	}

	if(pCode == 'fo0304'){
		relay(1, CTX, START_DT, END_DT, pCode, '', '', '', '');
	}
	
	if(pCode == 'pq030302'){
		relay(1, CTX, START_DT, END_DT, pCode, 'BTN', '', '', '');
	}

	if(pCode == 'fo0203'){
		relay(1, CTX, START_DT, END_DT, pCode, '', '', '', '');
	}
	
	if(pCode == 'so0206'){
		s_index = $("#SEARCH_DL option:selected").index();
		relay(1, CTX, START_DT, END_DT, pCode, s_index, '', '', '');
	}
	
	if(pCode == 'pq0204'){
	//var START_DT = "2012-07-01";
	 	var END_DT = null;
	 /*	relay(1, CTX, START_DT, END_DT,50, '', '', '', ''); */
		var sHour = $("#grid").getGridParam('selrow');
		var sDate = $("#START_DT").val();
		//var substCd = $("#SEARCH_DL option:selected").data("substcd");
		//var cbID = $("#SEARCH_DL option:selected").val();
		s_index = $("#SEARCH_DL option:selected").index();
		relay(1, CTX, sDate, sHour, pCode, s_index, null);
	}
	
}

function doviewGis2(pCode){
	var param = "SUB=" + pCode;
	var officeCd;
	var useRate;
	var oleMeshNo;
	if(pCode == 'lc0101')
	{
		officeCd = $("#GIS_OFFICECD").val();
		useRate = $("#LOAD_FILTER").val();
		param += "&OFFICE_CD=" + officeCd + "&USE_RATE=" + useRate;
	}
	else if(pCode == 'lc0102')
	{
		//officeCd = $("#GIS_OFFICECD").val();
		officeCd = '5473';
		useRate = $("#LOAD_FILTER").val();
		param += "&OFFICE_CD=" + officeCd + "&USE_RATE=" + useRate;
	}
	else if(pCode == 'lc0103')
	{
		officeCd = $("#GIS_OFFICECD").val();
		useRate = '90'; 
		param += "&OFFICE_CD=" + officeCd + "&USE_RATE=" + useRate;
	}
	else if(pCode == 'bm0101' || pCode == 'bm0102' || pCode == 'bm0103') // 정전 모니터링
	{		
		officeCd = $("#GIS_OFFICECD").val();		// 지사
		oleMeshNo = $("#GIS_POLENO").val();	// 변대주
		param += "&OFFICE_CD=" + officeCd+ "&OLD_MESH_NO=" + oleMeshNo;
	}
	else if(pCode == 'eq0301')
	{
		officeCd = '5473';
		useRate = '90'; 
		param += "&OFFICE_CD=" + officeCd + "&USE_RATE=" + useRate;
	}
	//eq0301
	//alert('doviewGis2 / ' + param)//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	$('#c_map').attr('src', CTX + "/common/gis/gisPage.do?" + param);
}

function doviewGis3(pCode,officeCd){
	var param = "SUB=" + pCode;
	//var officeCd;
	var useRate;
	if(pCode == 'lc0101'){
		//officeCd = $("#GIS_OFFICECD").val();
		useRate = $("#LOAD_FILTER").val();
		param += "&OFFICE_CD=" + officeCd + "&USE_RATE=" + useRate;
	} else if (pCode == 'lc0102'){
		//officeCd = $("#GIS_OFFICECD").val();
		useRate = $("#LOAD_FILTER").val();
		param += "&OFFICE_CD=" + officeCd + "&USE_RATE=" + useRate;
	} else if (pCode == 'lc0103'){
		//officeCd = $("#GIS_OFFICECD").val();
		useRate = 90;
		param += "&OFFICE_CD=" + officeCd + "&USE_RATE=" + useRate;
	}
	alert(param);
	$('#c_map').attr('src', CTX + "/common/gis/gisPage.do?" + param);
	//alert(CTX + "/common/gis/gisPage.do?" + param);
}

function moveToPole(pCode, oleMeshNo){
	var param = "SUB=" + pCode;
	
	if(pCode == 'lc0101')
	{
		var officeCd = $("#GIS_OFFICECD").val();
		var useRate = $("#LOAD_FILTER").val();
		param += "&OFFICE_CD=" + officeCd + "&USE_RATE=" + useRate + "&OLD_MESH_NO=" + oleMeshNo;
	}
	else if (pCode == 'lc0102')
	{
		var officeCd = $("#GIS_OFFICECD").val();
		var useRate = $("#LOAD_FILTER").val();
		param += "&OFFICE_CD=" + officeCd + "&USE_RATE=" + useRate + "&OLD_MESH_NO=" + oleMeshNo;
	}
	else if (pCode == 'lc0103')
	{
		var officeCd = $("#GIS_OFFICECD").val();
		//var useRate = $("#LOAD_FILTER").val();
		var useRate = 90;
		
		param += "&OFFICE_CD=" + officeCd + "&USE_RATE=" + useRate + "&OLD_MESH_NO=" + oleMeshNo;
	}
	else if (pCode == 'bm0101' || pCode == 'bm0102' || pCode == 'bm0103') // 정전 모니터링
	{
		var officeCd = $("#GIS_OFFICECD").val();
		param += "&OFFICE_CD=" + officeCd + "&OLD_MESH_NO=" + oleMeshNo;
	}
	$('#c_map').attr('src', CTX + "/common/gis/gisPage.do?" + param);
}



/*function doviewGis2(pCode){
	var param = "SUB=" + pCode;
	
	if(pCode == 'fo0202'){
		var rowId = $("#grid").jqGrid("getDataIDs")[0];
		var rowData = $('#grid').jqGrid('getRowData', rowId);
		var sPopup;
		
		sPopup = '<b>* 고장설비: '+ rowData.FAC_NM +'<br>';
		sPopup += '* 설비구분: '+ rowData.VOLT_CLCD +'<br>';
		sPopup += '* 전압구분: '+ rowData.SCADA_FAC_CLCD +'</b>'; 		
		sPopup = encodeURIComponent(sPopup);

		SUBSTCD = $('#SEARCH_BREAKDOWN option:selected').data('substcd');

		param += "&SUBST_CD=" + SUBSTCD + "&SPOPUP=" + sPopup;
	}
	
	if(pCode == 'pq0401tab'){
		param  += "&START_DT=" + $('#START_DT').val();
		
		aDl = $('#SEARCH_SIMU_ID option:selected').text().split(' ');//dl nm
		dl_nm = aDl[1]; //= '망월';//set param
		param += "&DL_NM=" + encodeURIComponent(dl_nm);
		//[S]param
		param += "&SIMU_YMD=" + $("#SEARCH_SIMU_ID").val();
		param += "&SIMU_SEQ=" + $('#SEARCH_SIMU_ID option:selected').data('simuseq');
		param += "&COND_SEQ=" + $("#COND_SEQ").val();
		param += "&IPMT_MTHD_CD=" + ipmt_mthd_cd;
		
		var $li = $("ul.chiletab li").eq(tabChildIndex);
		var hding_clcd = $li.children().attr("hding_clcd"); // 조작구분코드
		
		param += "&HDING_CLCD=" + hding_clcd;
		param += "&JOB_CLCD=" + $(':input:radio[name=JOB_CLCD]:checked').val();
		param += "&SUBST_CD=" + $('#SEARCH_SIMU_ID option:selected').data('substcd');
		//[E]param
		
	}
	
	if(pCode == 'fo0204'){
		//SUBSTCD = $('#SEARCH_BREAKDOWN option:selected').data('substcd');
		//FEED_CD = $('#SEARCH_BREAKDOWN option:selected').data('das_dl_id');
		//SIDEPS_DAS_COM_NO = $('#SEARCH_BREAKDOWN option:selected').data('sideps_compzat_no');
		
		SUBSTCD = $('#SUBSTCD').val();
		FEED_CD = $('#TRSDLCD').val();
		SIDEPS_DAS_COM_NO = $("#GIS_POLENO").val();
		
		var data = $("#SEARCH_BREAKDOWN option:selected");
		var com_office_cd1 = $(data).attr('data-juris_officecd');
		var dl_nm = $(data).attr('data-feed_nm');
		dl_nm = encodeURIComponent(dl_nm);
		
		var sPopup;
		sPopup = '<b>* 고장명:' + $(data).attr('data-fau_nm') + ' <br>';
		sPopup += '* 고장선로:' + $(data).attr('data-feed_nm') + ' <br>';
		sPopup += '* 동작보호기기:' + $(data).attr('data-act_prot_dev_rmrk1') + '</b>';
		sPopup = encodeURIComponent(sPopup);
		
		param += "&SUBST_CD=" + SUBSTCD + "&FEED_CD=" + FEED_CD + "&DL_NM=" + dl_nm + "&COM_OFFICE_CD1=" + com_office_cd1 + "&SPOPUP=" + sPopup;
	}
	
	if(pCode == 'fo0206'){
		SUBSTCD = $("#SUBSTCD").val();
		JURIS_OFFICECD = $("#JURIS_OFFICECD").val();

		var sPopup = '<b>*공사명: '+ $("#CONS_NM").val() +'</b>';
		sPopup = encodeURIComponent(sPopup);
		param += "&SUBST_CD=" + SUBSTCD + "&SPOPUP=" + sPopup;
	}
	
	if(pCode == 'fo0401'){
		var rowId = $('#grid1').getGridParam("selrow");
		var rowData = $("#grid1").jqGrid("getRowData", rowId);
		if(rowData == null) return;
		var subst_nm = $("#SUBST_CD option:selected").text();
		subst_nm = encodeURIComponent(subst_nm);
		
		var old_mesh_no = [];
		
		$.ajax({
			type:"POST",
			url: CTX + '/fo/fo0401LinkHistoryList.do', 
			dataType:"json",
			data:{
				 'EXE' : rowData.EXE,
				 'SUBST_CD' : rowData.SUBSTCD,
				 'LINK_SUBSTCD' : rowData.LINK_SUBSTCD
			 },
			success:function(res){
				for(var i = 0; i<res.rows.length; i++)
				{
					old_mesh_no.push(res.rows[i].DAS_COMPZAT_NO);
				}
				var j_old_mesh_no = old_mesh_no.join();
				param += "&OLD_MESH_NO=" + j_old_mesh_no + "&SUBST_NM="+subst_nm;
				param += "&EXE=" + rowData.EXE +  '&SUBST_CD=' + rowData.SUBSTCD + '&LINK_SUBSTCD=' + rowData.LINK_SUBSTCD;
			}
		});
	}
	
	$('#c_map').attr('src', CTX + "/common/gis/gisPage.do?" + param);
}*/


/**************************** HighCharts **********************************************************************/
//탭 공통 기능 정의 ㅔㅁ

//기본설정
$(document).ready(function() {
	//버튼제어
	$("#edit_btn_wrapper").hide();
	
	var thisPage = window.location.pathname;
	var ctx=CTX;
	thisPage = thisPage.replace(ctx, '');
	$('#tabs > span.tab.urlTab').each(function(){
		if($(this).data('url') == thisPage){
			$(this).addClass('on').siblings().removeClass('on');
		}
		
	});
	

	$('#tabs > span.tab.urlTab').on('click',function(){
		var did = $(this).data('id');
		var url = $(this).data('url');
		window.location.href=ctx+url
//		$(this).addClass('on').siblings().removeClass('on');
//			$('#tabWrap > div#'+did+'.tabWrap').addClass('show').siblings().removeClass('show');
	});
	
	$('.btnWrapper').on('click',function(){
		var $object = $(this).data('event');
		if($object !=null &&  $object!=''){
//		$object= $object.replace('()','');
		var $obj = $object.split('(')[0];
		if($object.split('(')[1]){
		var obj =$object.split('(')[1].replace(/\'|\)/gi,'');
		
			window[$obj](obj);
		} else{window[$obj]();}
		}
	})
	
	
	$('.search_field li label').each(function(){
		if($(this).width() < 60){
			$(this).width(60);
		}
		
		var text = $(this).text();
		$(this).empty().append('<span>'+text+'</span>:');
		var afterMark =5;
		var width = $(this).width()
		var widthChild = $(this).children('span').width();
		var spacing = (width-afterMark- widthChild)/text.length ; 
		
		$(this).children('span').width(width-afterMark);
		$(this).children('span').css('display','inline-block')
		$(this).css('white-space','nowrap');
		if(text.length != 2 ){
			$(this).children('span').css('white-space','nowrap');
//			$(this).children('span').css('letter-spacing',spacing);
		} else{
			$(this).children('span').css('white-space','nowrap');
			$(this).css('white-space','nowrap');
			$(this).children('span').css('letter-spacing',spacing+5)
//			$(this).css('letter-spacing',spacing+5)
		}
//		$(this).children('span').css('letter-spacing',spacing) 
	})
	
	
	
	
});
function $num_format(n){
	 return n > 9 ? "" + n: "0" + n;
}
jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ? 
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
};
//고객정보 
function currencyFmatter ( cellvalue, options, rowObject ){
	var type = rowObject.FAU_FSBL_CLNM;
	var targetDate = rowObject.FAU_DATE_TIME;
	if(targetDate != "" && targetDate != null){
		targetDate = targetDate.substring(0,10);
	}
	var meterId = rowObject.METER_ID;
	return "<div class='thumb'><div style='width:100%;'><a href='javascript:dialogP("+"\""+cellvalue+"\","+"\""+type+"\","+"\""+targetDate+"\","+"\""+meterId+"\""+");' ><span class='selection'>"+cellvalue+"</span></a></div></div>";
}

function NewcurrencyFmatter( cellvalue, options, rowObject ){
	var TMP = rowObject.EXE_DATE;
	TMP = TMP.substring(0,10);
	return "<div class='thumb'><div style='width:100%;'><a href='javascript:dialogP9("+"\""+cellvalue+"\""+","+"\""+TMP+"\""+");' ><span class='selection'>"+cellvalue+"</span></a></div></div>";
}

function currencyFmatter5 ( cellvalue, options, rowObject ){
	return "<div class='thumb'><div style='width:100%;'><a href='javascript:dialogP5("+"\""+cellvalue+"\""+");' ><span class='selection'>"+cellvalue+"</span></a></div></div>";
}



/** ========================= Role ===================================== */
/**
 * 종류 : 세션의 Role정보를 확인하여 특정 기능을 사용가능한지 확인한다
 * @param : chk_roles - 확인하고자 하는 Role ("R000" - 관리자)
 * @param : sess_roles - 현재세션 Role
 * @return : String - 존재여부 ( Y / N )
 */
function chkRole(chk_roles, sess_roles) {
	var role = "N";
	var chkAry = [];
	
	if(sess_roles != null && sess_roles != "" &&
		chk_roles != null && chk_roles != "")
	{
		chkAry = chk_roles.split(",");
		for(var i = 0;i < chkAry.length;i++)
		{
			if(sess_roles.indexOf(chkAry[i]) > -1){
				role = "Y";
				break;
			}
		}
	}
	
	return role;
}


/** JS OBject 기능 확장 size 함수 **/
Object.size = function(obj) {
    var size = 0, key;  
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


/**
 * 기능 : grid의 row갯수를 반환한다 ( 상태값이 D인 것은 제외)
 * 2015.08.05 cmk 
 **/
function getGridCnt(gridId){
	return $('#'+gridId).find('td[col="CRUD"] [value!="D"]').length;
}


/**
 * 기능 : grid의 checkbox의 checked 갯수를 반환한다
 * 2015.09.30 
 **/
function getGridCheckboxCnt(gridId, colNm){	
	return $('#'+gridId).find('tr').find('[col="'+colNm+'"]').find('input[type="checkbox"]:checked').length;
}

/**
 * AI REPORT
 * 
 */ 
function aiReport(sFileName, sParam){
	//param
	window.open(CTX + '/report/' + sFileName+'?reportParams=showhwp:false,showexcel:false&'+sParam, '_blank', 'width=1500, height=700');
}

//
//function loadingBarShow(){
//	
//	if($('#loading1').css('display') == 'none'){
//	$('#loading1').css('display','block').delay(50)
//	
//	}
//} 
//
//function loadingBarHide(){
////	$('#loading1').delay(50).hide(1); 
//	$('#loading1').delay(50) .queue(function (next) { 
//	    $(this).css('display', 'none'); 
//	    next(); 
//	  });
//	
//	 
//}
//function loadingBarShow1(){
//	$('#loading1').show(1).delay(50);
//}
//
//function loadingBarHide1(){
//	$('#loading1').hide(1);
//	
//}

/**
 * Open new dialog
 * 
 * @author HungDM
 * @param url (string) is view of dialog
 * @param dataOptions (object) object data parameters attach to ajax send to controller
 * @param dialogOptions (object) object attributes for display dialog
 * 
 * @Usage
 * <div><b>Example:</b></div>
 * <div style="padding: 10px; font-family: consolas;">
 * var url = CTX + '/apv/apv_0101/04/02/form.dialog';<br><br>
 * var data = {<br>
 *     <div style="padding-left: 25px;">
 *     param1: 'param value 1',<br>
 *     param2: 'param value 2',<br>
 *     paramN: 'param value n'<br>
 *     </div>
 * };<br><br>
 * var dialogOpts = {<br>
 * 	   <div style="padding-left: 25px;">
 *     width: 500,<br>
 *     height: 300<br>
 *     </div>
 * };<br><br>
 * // open dialog<br>
 * openDialog(url, data, dialogOpts);
 * </div>
 */
function openDialog(url, dataOptions, dialogOptions) {
	
	if (!url)
		return false;
	
	var $target = generateDialogDom();
	
	var defaultData = {
		type: 'dialog',
		cls: ''
	};
	
	if (typeof(dataOptions) === 'object') {
		$.extend(true, defaultData, dataOptions);
	}
	
	$.ajax({
		type: 'GET',
		url: url,
		data: defaultData,
		dataType: 'html',
		cache: false,
		success: function(data) {
			$target.html(data);
		}
	});
	
	var defaultDialogOpts = {
		resizable: false,
		width: parseInt(window.innerWidth) * 0.5,
		height: parseInt(window.innerHeight) * 0.5,
		modal: true,
		open: function() {
			$('.ui-dialog').css('box-shadow', '#999 5px 5px 5px');
		},
		close: function() {
			destroyDialogPopup($target);
		}
	};
	
	if (typeof(dialogOptions) === 'object') {
		$.extend(true, defaultDialogOpts, dialogOptions);
	}
	
	$target.dialog(defaultDialogOpts);
};

function previewPDF(content, title, docId, draftId) {
	content = content.replace("<html><head></head>","<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/></head>").replace(/&quot;/g,"'");
	var url = CTX+'/apv/apv_0101/poupPreviewDocument/form2.popup?';
		
	var mapForm = document.createElement("form");
    mapForm.target = "Map";
    mapForm.method = "POST"; // or "post" if appropriate
    mapForm.action = url;
    mapForm.className ="previewForm";

    var mapInput = document.createElement("input");
    mapInput.type = "text";
    mapInput.name = "DRAFT_CONTENT";
    mapInput.value = decodeHTML(content);
    mapForm.appendChild(mapInput);
    
    var mapInput1 = document.createElement("input");
    mapInput1.type = "text";
    mapInput1.name = "DRFT_TTL";
    mapInput1.value = title;
    mapForm.appendChild(mapInput1);
    
    var mapInput2 = document.createElement("input");
    mapInput2.type = "text";
    mapInput2.name = "DOC_MNG_NO";
    mapInput2.value = docId;
    mapForm.appendChild(mapInput2);
    
    var mapInput3 = document.createElement("input");
    mapInput3.type = "text";
    mapInput3.name = "DRFT_DOC_MNG_NO";
    mapInput3.value = draftId;
    mapForm.appendChild(mapInput3);

    document.body.appendChild(mapForm);
    $(".previewForm").hide();

    var map = window.open('', 'Map', 'status=0,title=0,width=' + (parseInt(window.innerWidth) * 1) + ',height=' + (parseInt(window.innerHeight) * 1) +'scrollbars=1');
	if (map) {
	    mapForm.submit();
	}
}
