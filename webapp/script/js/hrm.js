

/****************************************************************************
 * 설명 		 : timepicker 기본 설정
 * date 	 : 2015-07-13
 * author	 : cmk
 * 
 * parameter : 
 * e.g, 	 : 
 ****************************************************************************/
var setTimepicker = function(){
	//set timepicker
	$('.timepicker').css('width', '60px');
	$('.timepicker').timepicker({
		'minTime':'9:00am',
		'maxTime':'6:00pm',
//	 		'useSelect':true,
		'step':10,
		'timeFormat':'H:i', 
//		'disableTextInput':true,
		'scrollDefault':'now'
	});
};

/****************************************************************************
 * 설명 		 : 시간차이 계산
 * date 	 : 2015-07-13
 * author	 : cmk
 * 
 * parameter : 
 * e.g, 	 : getTimeDiff('13:00', '15:00'), getTimeDiff('1300', '1500')
 ****************************************************************************/
var getTimeDiff = function(p_start, p_end){
	
	var start = p_start.replace(/\:/, '');
	var end = p_end.replace(/\:/, '');

	if(start.length < 4 || isNaN(start)) return;
	if(end.length   < 4 || isNaN(end)) return;
	
	var s_ary = start.match(/\d{2}/g);
	var e_ary = end.match(/\d{2}/g);
	
	start = parseInt(s_ary[0],10)*60 + parseInt(s_ary[1],10);
	end   = parseInt(e_ary[0],10)*60 + parseInt(e_ary[1],10);
	
	var result = Math.floor( ((end - start) / 60) * 10 )/10;
	
	return result;
}


/****************************************************************************
 * 설명 		 : key가 없을 경우 삭제버튼 비활성화 ( TO-DO )
 * date 	 : 2015-07-09
 * author	 : cmk, to do
 * 
 * parameter : 
 * e.g, 	 : 
 ****************************************************************************/
//var disableBtnDel = function(){
//	if($('.btn_삭제')){
//		var key = $('.btn_삭제').data('key');
//	}
//};



/****************************************************************************
 * 설명 		 : 문자열이 null이거나 ''일 경우 true 반환 ( ING ) 
 * 	- ctrl + S 키 입력 시 저장되도록
	- F2 : 정산대상목록 팝업 
	- F6 : 저장 실행
	- F7 : 삭제 실행
 * 
 * date 	 : 2015-07-09
 * author	 : cmk
 * 
 * parameter : 
 * e.g, 	 : 
 ****************************************************************************/
//var shortCutKey = function(){
//	
//	$(document).on('keyup', function(event){
//		//ESC
//		if(event.keyCode == 27) doClose();
//		
//	});
//};



/****************************************************************************
 * 설명 		 : 문자열이 null이거나 ''일 경우 true 반환
 * date 	 : 2015-07-09
 * author	 : cmk
 * 
 * parameter : 
 * e.g, 	 : 
 ****************************************************************************/
var isNull = function(obj){
	obj = obj.trim();
	if(obj == null || obj == ''){
		return true;
	}else{
		return false;
	}
};


/****************************************************************************
 * 설명 		 : 시작일, 종료일을 받아 날짜 차이 계산 (휴일포함)
 * date 	 : 2015-07-09
 * author	 : cmk
 * 
 * parameter : frm_dt 시작일, to_dt : 종료일
 * e.g, 	 : getDateDiff('20150101', '20150104') 
 ****************************************************************************/
var getDateDiff = function (frm_dt, to_dt)
{	
	if(frm_dt == null || frm_dt == '' || to_dt == null || to_dt == ''){
		return;
	}
	
	// '-'있을 경우 제거
	frm_dt = frm_dt.replace(/\-/g,'');
	to_dt  = to_dt.replace(/\-/g,'');
	
	if(to_dt.length != 8 || frm_dt.length != 8){
		return;
	}
	
	var getDate1 = new Date(to_dt.substr(0,4), to_dt.substr(4,2), to_dt.substr(6,2));
	var getDate2 = new Date(frm_dt.substr(0,4), frm_dt.substr(4,2), frm_dt.substr(6,2));
	
//	  var arrDate1 = to_dt.split("-");
//	  var getDate1 = new Date(parseInt(arrDate1[0]),parseInt(arrDate1[1])-1,parseInt(arrDate1[2]));
//	  var arrDate2 = frm_dt.split("-");
//	  var getDate2 = new Date(parseInt(arrDate2[0]),parseInt(arrDate2[1])-1,parseInt(arrDate2[2]));
	  
	  var getDiffTime = getDate1.getTime() - getDate2.getTime();
	  var result = Math.floor(getDiffTime / (1000 * 60 * 60 * 24));
	  
	  return result+1;
};


/****************************************************************************
 * 설명 		 : 날짜와, 더할 숫자를 계산하여 반환
 * date 	 : 2015-11-24
 * author	 : cmk
 * 
 * parameter : dt : 날짜, num : 더할 숫자 
 * e.g, 	 : getDateAdd('20150101', 3) 
 ****************************************************************************/
var addDate2 = function (dt, num)
{	
	if(dt == null || dt == '' || num == null || num == ''){
		return;
	}
	
	// '-'있을 경우 제거
	if(dt.toString().length == 10) dt = dt.replace(/\-/g,'');
	
	
	//완전한 날짜(YYYY-MM-DD, YYYYMMDD) 가 아닐 경우 RETURN 
	if(dt.length != 8){
		return;
	}
	
	var result = new Date(dt.substr(0,4), dt.substr(4,2), dt.substr(6,2));
	
	result.setDate(result.getDate() + eval(num));
	
	var yy = result.getFullYear();
	var mm = result.getMonth();
	var dd = result.getDate();
	
	mm = mm<9?'0'+mm:mm;
	dd = dd<9?'0'+dd:dd;
	
	return yy+'-'+mm+'-'+dd;
};


/****************************************************************************
 * 설명 		 : 해당 로우에서 특정 컬럼의 값을 가져옴. 
 * date 	 : 2015-10-17
 * author	 : cmk
 * 
 * parameter  
 *   obj     : ex) target jquery object
 * 	 colNm   : column name
 ****************************************************************************/
var getRowData = function($obj, colNm){
	var result = $obj.parents('tr').find('[col="'+colNm+'"] input').datas();
	return result;
};

/****************************************************************************
 * 설명 		 : 해당 로우에서 특정 컬럼의 값을 설정 
 * date 	 : 2015-10-17
 * author	 : cmk
 * 
 * parameter  
 *   obj     : ex) target jquery object
 * 	 colNm   : column name
 *   val     : value to be setted
 ****************************************************************************/
var setRowData = function($obj, colNm,val){
	 $obj.parents('tr').find('[col="'+colNm+'"] input').datas(val);
};