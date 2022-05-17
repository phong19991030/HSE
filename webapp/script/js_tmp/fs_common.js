//JSON stringify
jQuery.extend({
	stringify : function stringify(obj) {
		if ("JSON" in window) {
			return JSON.stringify(obj);
		}

		var t = typeof (obj);
		if (t != "object" || obj === null) {
			// simple data type
			if (t == "string")
				obj = '"' + obj + '"';

			return String(obj);
		} else {
			// recurse array or object
			var n, v, json = [], arr = (obj && obj.constructor == Array);

			for (n in obj) {
				v = obj[n];
				t = typeof (v);
				if (obj.hasOwnProperty(n)) {
					if (t == "string") {
						v = '"' + v + '"';
					} else if (t == "object" && v !== null) {
						v = jQuery.stringify(v);
					}

					json.push((arr ? "" : '"' + n + '":') + String(v));
				}
			}

			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
		}
	}
});


//자릿수 확인 number(5, 2)
function checkLength(e) {
	if(keyFilter(e)){
		
		var objValue = $(this).val();
		
		//소수점이 있는지 확인
		if (objValue.indexOf(".") > -1) {
			
			//소수점 이후 글자수 체크
			if ((objValue.substring(objValue.indexOf(".") + 1, objValue.length).length) > 2) {
				alert("소수점 둘째자리까지 입력 가능합니다.");
				$(this).val(objValue.substring(0, objValue.indexOf(".")) + objValue.substr(objValue.indexOf("."), 3));
				return;
			}
			
			// 소수점 이전 글자수 체크
			if (objValue.substring(0, objValue.indexOf(".")).length > 3) {
				alert("입력 값이 잘못되었습니다. 정수 자리는 3자리, 소숫점 자리는 2자리까지 입력 가능합니다.222 ex)123.45");
				$(this).val(objValue.substring(objValue.substring(0, objValue.indexOf(".")).length - 3, objValue.indexOf(".")) + objValue.substr(objValue.indexOf("."), 3));
				return;
			}
		} else {
			// 소수점 제외 최대 자릿수 체크
			if (objValue.length > 3) {
				alert("입력 값이 잘못되었습니다. 정수 자리는 3자리, 소숫점 자리는 2자리까지 입력 가능합니다.222 ex)123.45");
				$(this).val(objValue.substring(objValue.substring(0, objValue.indexOf(".")).length - 3, objValue.indexOf(".")) + objValue.substr(objValue.indexOf("."), 3));
				return;
			}
		}//end if (objValue.indexOf(".") > -1) {
	}//end if(keyFilter(e)){
}//end function checkLength(e) {


//숫자 천단위 표시 - str
function formatNum(str) {
	var point = "";
	//소수점 처리 - 둘째자리까지..Number.toFixed(2)
    if (String(str).indexOf(".") != -1) {
    	point = "." + String(str.toFixed(2)).substr(String(str).indexOf(".") + 1, 3);
    }
    
	//-인 경우 처리
    if (String(str).indexOf("-") != -1 ){
		return "-" + Number(String(str).replace(/\..*|[^\d]/g,"")).toLocaleString().slice(0,-3) + point;
    } else {
    	return Number(String(str).replace(/\..*|[^\d]/g,"")).toLocaleString().slice(0,-3) + point;
    }
}

//숫자 천단위 표시 - str
function formatNum(str, length) {
	var point = "";
	//소수점 처리 - length째 자리까지..Number.toFixed(length)
	if (String(str).indexOf(".") != -1 && length > 0) {
		point = "." + String(str.toFixed(length)).substr(String(str).indexOf(".") + 1, length + 1);
	}
	
	//-인 경우 처리
	if (String(str).indexOf("-") != -1 ){
		return "-" + Number(String(str).replace(/\..*|[^\d]/g,"")).toLocaleString().slice(0,-3) + point;
	} else {
		return Number(String(str).replace(/\..*|[^\d]/g,"")).toLocaleString().slice(0,-3) + point;
	}
}

//0) common
//fomet - 소수부 자릿수 0~
//0일때는 소수부 삭제
function addCommaNum(str, fomet){
	var re = /[0-9]/g;
	if(re.test(str) == true){
		str = removeCommaNum(str);
		x = str.split(".");//소수부분리
		x1 = x[0];
		x2 = "";
		if(x.length>1){
			x2 = x[1];
			for(var i=0; i<Number(fomet); i++){
				x2 = x2.length>i?x2:x2 + "0";
				if(i == Number(fomet)-1){
					x2 = "." +x2.slice(0,fomet);
				}
			}
		}else{
			for(var i=0; i<Number(fomet); i++){
				x2 = x2 + "0";
				if(i == Number(fomet)-1){
					x2 = "." +x2;
				}
			}
		}
		var regex = /(\d+)(\d{3})/;
		while(regex.test(x1)){
			x1 = x1.replace(regex, "$1"+","+"$2");
		}
		return x1 + x2;
	}else{
		return str;
	}
}

//콤마 삭제
function removeCommaNum(str){
	str += "";
	var regex = /,/g;
	return str.replace(regex,"");
}

//날짜 포맷
function addCommaDate(dt, str){
	var dtStr;
	var regex = /[0-9]/g;
	if(dt.length == 8 && regex.test(dt) == true){
		dtStr = dt.slice(0,4) + str + dt.slice(4,6) + str + dt.slice(6);
	}else{
		dtStr = dt;
	}
	return dtStr;
}

function restrictNum(e){
	if(keyFilter(e)){
		var regex = /[^0-9\.\-]/g;
		$(this).val($(this).val().replace(regex, ""));
	}
}

//요일추가
function addWeekStr(dt){
	var regex = /[^0-9]/g;
	var dateStr = dt.replace(regex, "");
	var year;
	var month;
	var day;
	if(dateStr.length == 8){
		year = dateStr.substr(0, 4);
		month = Number(dateStr.substr(4, 2))-1;
		day = Number(dateStr.substr(6, 2));
	}else if(dateStr.length == 6){
		year = "20" + dateStr.substr(0, 2);
		month = Number(dateStr.substr(2, 2))-1;
		day = Number(dateStr.substr(4, 2));
	}
	var weekDay = new Date(year,month,day);
	var week;
	var weekStr;
	week = weekDay.getDay();
	switch(week)
	{
	case 0:
		weekStr = "(일)";
	   break;
	case 1:
		weekStr = "(월)";
	   break;
	case 2:
		weekStr = "(화)";
	   break;
	case 3:
		weekStr = "(수)";
	   break;
	case 4:
		weekStr = "(목)";
	   break;
	case 5:
		weekStr = "(금)";
	   break;
	case 6:
		weekStr = "(토)";
	   break;
	}

	return weekStr;
}

//두 날짜 사이의 차이를 일수로 구하기
function calDateRange(val1, val2){
    var FORMAT = "-";
    // FORMAT을 포함한 길이 체크
    if (val1.length != 10 || val2.length != 10) return null;

    // FORMAT이 있는지 체크
    if (val1.indexOf(FORMAT) < 0 || val2.indexOf(FORMAT) < 0) return null;

    // 년도, 월, 일로 분리
    var start_dt = val1.split(FORMAT);
    var end_dt = val2.split(FORMAT);

    // 월 - 1(자바스크립트는 월이 0부터 시작하기 때문에...)
    // Number()를 이용하여 08, 09월을 10진수로 인식하게 함.
    start_dt[1] = (Number(start_dt[1]) - 1) + "";
    end_dt[1] = (Number(end_dt[1]) - 1) + "";

    var from_dt = new Date(start_dt[0], start_dt[1], start_dt[2]);
    var to_dt = new Date(end_dt[0], end_dt[1], end_dt[2]);

    return ((to_dt.getTime() - from_dt.getTime()) / 1000 / 60 / 60 / 24)+1;
}

//Tree구조 js
function doFsTree(){
	jQuery(function($){
		var tree_menu = $('#tree_menu');
		var icon_open = '/aos/images/tree/tree_open.gif';
		var icon_close = '/aos/images/tree/tree_close.gif';
		
		tree_menu.find('li:has("ul")').prepend('<a href="#" class="control"><img src="' + icon_open + '" /></a> ');
		tree_menu.find('li:last-child').addClass('end');
		
		$('.control').click(function(){
			var temp_el = $(this).parent().find('>ul');
			if (temp_el.css('display') == 'none'){
				temp_el.slideDown(100);
				$(this).find('img').attr('src', icon_close);
				return false;
			} else {
				temp_el.slideUp(100);
				$(this).find('img').attr('src', icon_open);
				return false;
			}
		});
		
		function tree_init(status){
			if (status == 'close'){
				tree_menu.find('ul').hide();
				$('a.control').find('img').attr('src', icon_open);
			} else if (status == 'open'){
				tree_menu.find('ul').show();
				$('a.control').find('img').attr('src', icon_close);
			}
		}
		
		tree_init('open');
		
		/* OPEN & CLOSE */
		$('#all').toggle(function(){
			tree_init('open');
			$(this).text('ALL CLOSE');
		},function(){
			tree_init('close');
			$(this).text('ALL OPEN');
		});
		
	});
}
/**************************** EXCEL **********************************************************************/

function doFsExcel(gridId, excelTitle, hiddenColumnDisplay){
	//hidden컬럼 표시 여부
	if(hiddenColumnDisplay == null) hiddenColumnDisplay = false;
	
	//url, postData
	var url = $("#"+gridId).getGridParam("url");
	var postData = $("#"+gridId).getGridParam("postData");
	
	//groupHeader
	var groupStartColumnIds = "";
	var groupNumberOfColumns = "";
	var groupColumnNames = "";
	var groupHeader = $("#"+gridId).getGridParam("groupHeader");
	if(groupHeader != null){
		var groupHeaders = groupHeader.groupHeaders;
		if(groupHeaders != null){
			for(var i = 0;i < groupHeaders.length;i++){
				if(i == 0){
					groupStartColumnIds = groupStartColumnIds + groupHeaders[i].startColumnName;
					groupNumberOfColumns = groupNumberOfColumns + groupHeaders[i].numberOfColumns;
					groupColumnNames = groupColumnNames + groupHeaders[i].titleText;
				}else{
					groupStartColumnIds = groupStartColumnIds + "," + groupHeaders[i].startColumnName;
					groupNumberOfColumns = groupNumberOfColumns + "," + groupHeaders[i].numberOfColumns;
					groupColumnNames = groupColumnNames + "," + groupHeaders[i].titleText;
				}
			}
			groupColumnNames = groupColumnNames.replace(/(<([^>]+)>)/gi, "");//remove html tag
			
		}
	}
	//컬럼명&컬럼ID
	var colNames = $("#"+gridId).getGridParam("colNames");
	var colModel = $("#"+gridId).getGridParam("colModel");
	var columnIds = "";
	var columnNames = "";

	if(colNames != null && colModel != null){
		for(var i = 0;i < colNames.length;i++){
			if(colNames[i] != ""){
				if(hiddenColumnDisplay == true || (hiddenColumnDisplay == false && colModel[i].hidden == false)){
					if(columnIds == ""){
						columnIds = columnIds + colModel[i].name;
						columnNames = columnNames + colNames[i];
					}else{
						columnIds = columnIds + "," + colModel[i].name;
						columnNames = columnNames + "," + colNames[i];
					}
				}
			}
		}
		columnNames = columnNames.replace(/(<([^>]+)>)/gi, "");//remove html tag
	}
	
	//MODE
	if(url.match(/\?/g)){
		url = url + "&MODE=FSEXCEL&excelTitle="+excelTitle+"&columnIds="+columnIds+"&columnNames="+columnNames
			      +"&groupStartColumnIds="+groupStartColumnIds+"&groupNumberOfColumns="+groupNumberOfColumns+"&groupColumnNames="+groupColumnNames;
	}else{
		url = url + "?MODE=FSEXCEL&excelTitle="+excelTitle+"&columnIds="+columnIds+"&columnNames="+columnNames
				  +"&groupStartColumnIds="+groupStartColumnIds+"&groupNumberOfColumns="+groupNumberOfColumns+"&groupColumnNames="+groupColumnNames;
	}

	//PARAM
	$.each(postData, function(key, val){
		url = url + "&" + key + "=" + val;
	});
	
	//한글 및 특수문자 처리를 위해 encodeURI
	location.href = encodeURI(url);//response가 excel attach여서 location처리(window.open고려해볼 필요 있음)
}

/**************************** DATEUTIL **********************************************************************/

