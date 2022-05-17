/**
 * ###### Selector ############################
 * input#TITLE : 공지사항 제목
 * input#ACTIVE_CHECK : 공지사항 활성화 체크 박스
 * input#START_DT : 공지사항 활성 시작일
 * input#END_DT : 공지사항 활성 종료일
 * textarea#CONTENT : 공지사항 내용
 * input#ATTACH_FILE : 첨부파일
 * a#SAVE_BTN : 저장버튼
 * 
 * ####### Parameter ###########################
 * input#PROCESS
 * input#DATA.NOTICE_ID
 * 
 * ####### Function ############################
 * 
 * sys0701()
 * 
 */

/* 초기화 */
function sys0701(){
	
	// 수정페이지일 경우
	if($('input#PROCESS').val() === 'UPDATE') modifyInit();
	
	//저장버튼 클릭
	$('a#SAVE_BTN').click(save);
	
	// 첨부파일
	$('input#ATCH_FILE').change(changeFile);
	
	/* 공지사항 활성화 */
	// 체크박스 활성화 시 데이트 피커 활성화 - 체크박스 비활성화 시 데이트 피커 비활성화
	$('li#ACTIVE_CHECK').css('cursor', 'pointer').click(function(){
		var checkbox = $('input#ACTIVE');
		var start = $('input#START_DT');
		var end = $('input#END_DT');
		var start_btn = $('button#START_DT_BTN');
		var end_btn = $('button#END_DT_BTN');

		
		if($('li#ACTIVE_CHECK').find('input[type=checkbox]').is('input:checked')){
			checkbox.prop('checked', false);
			checkbox.val('');
			start.css('background-color', '#dadee0');
			end.css('background-color', '#dadee0');
			start.val('');
			end.val('');
			// datepicker 파괴
			$('.datepicker').datepicker('destroy').siblings('.calendar-picker-btn').unbind('click');
		}else if($('li#ACTIVE_CHECK').find('input[type=checkbox]').not('input:checked')){
			checkbox.prop('checked', true);
			checkbox.val('Y');
			//################# 처음만 datepicker 활성,비활성화 잘됨.. 
			$('.datepicker').setDatePicker();
			start.css('background-color', '#ffffff');
			end.css('background-color', '#ffffff');
		}
	});
	// 공지 일자 유효 체크
	$('input#START_DT').change(function(){
		if($('input#END_DT').val()) {
			var start_dt = $('input#START_DT').datepicker('getDate');
			var end_dt = $('input#END_DT').datepicker('getDate');
			if(start_dt > end_dt) {
				alert(_MESSAGE.common.timeError);
				$('input#ENT_DT').datepicker('setDate', start_dt);
			}
		}
	});
	$('input#END_DT').change(function(){
		if($('input#START_DT').val()) {
			var start_dt = $('input#START_DT').datepicker('getDate');
			var end_dt = $('input#END_DT').datepicker('getDate');
			if(start_dt > end_dt) {
				alert(_MESSAGE.common.timeError);
				$('input#START_DT').datepicker('setDate', end_dt);
			}
		}
	});
}

/* 저장 */
function save(){
	
	//validation check
	if(!validationCheck()) return;
	
	//파라미터 생성
	var param = createParameter();
	console.log(param);
	
	param = _sys.convertParam(param);
	//파일
	var formData = new FormData($('form#FILE_STORAGE')[0]);
	
	//파라미터 변환 (object, array => JSON String)
	for(let [key, value] of Object.entries(param)){
		console. log(key, value, _sys.getType(value));
		
		//배열인 항목은 JSON String으로 변환
		formData.append(key, ['object', 'array'].includes(_sys.getType(value)) ? JSON.stringify(value) : value);
	}
	
	console.log('최종이라능');
	for(let entry of formData.entries()){
		console.log(entry[0], entry[1]);
	}
	
	//저장
	var data = _sys.mariaDB.saveFile(ctx + '/sys_new/sys_0700/save.ajax', formData);
	console.log(data);
	
	if(data.INSERT_NOTICE_CNT > 0 || data.UPDATE_NOTICE_CNT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = ctx + '/sys_new/sys_0700/detailForm?NOTICE_ID=' + data.NOTICE_ID;
	} 
	else {
		alert(_MESSAGE.common.saveFail);
	}
}

/* 유효성 검사 */
function validationCheck(root='') {
	var check = true;
	/* validation-check */
	check = $(root + ' [validation-check]').vcCheck();
	return check; 
}

/* 파라미터 생성 */
function createParameter(){
	var param = {};

	if($('input#PROCESS').val() === 'UPDATE') {
		param.NOTICE_ID = $('input#NOTICE_ID').val();
		
		//기존 첨부파일 정보 추가
//		if(!$('input#EXIST_ATCH_FILE').val() === 'null'){
//		param.FLE_PATH = $('input#FLE_PATH').val();
//		param.NEW_FLE_NM = $('input#NEW_FLE_NM').val();
//		}
		var pre_atch = $('input#PRE_ATTACH').prop('info');
		if(pre_atch) Object.assign(param, pre_atch); 
	}

	param.PROCESS = $('input#PROCESS').val();
	param.NOTICE_TIT = $('input#TITLE').val();
	param.NOTICE_CONT = $('textarea#CONTENT').val();
	param.NOTICE_SETTING = $('input#ACTIVE').val();
	param.START_DATE = $('input#START_DT').val();
	param.END_DATE = $('input#END_DT').val();
	
	console.log(param);
	
	return param;
}
 
/* 수정 페이지 초기화 함수 */
function modifyInit(){
	//데이터 조회
	var data = _sys.mariaDB.getData('/sys_new/sys_0700/detailForm/getDetailInfo.ajax',{
		NOTICE_ID: $('input#NOTICE_ID').val(),
	});
	console.log(data);
	
	//데이터 없을 경우 return
	if(!data) return;
	console.log('no data');
	
	
	$('input#TITLE').val(data.TITLE);
	$('textarea#CONTENT').val(data.CONTENT);
	$('input#ACTIVE').val(data.NOTICE_SETTING);
	if(($('input#ACTIVE').val()) === 'Y'){
		$('input#ACTIVE').prop('checked', true); 
		$('input#START_DT').css('background-color', '#ffffff'); 
		$('input#END_DT').css('background-color', '#ffffff');
		$('.datepicker').setDatePicker();
	}
	console.log($('input#ACTIVE').val());
	$('input#START_DT').val(data.START_DATE);
	$('input#END_DT').val(data.END_DATE);
	$('div#FLE_NM').text(data.FLE_NM);
	
	// 이전 첨부파일 있을경우 추가
	if(data.ATCH_FLE_SEQ != '' && data.ATCH_FLE_SEQ != null)
		$('input#PRE_ATTACH').prop('info', {ATCH_FLE_SEQ: data.ATCH_FLE_SEQ, FLE_PATH: data.FLE_PATH, NEW_FLE_NM: data.NEW_FLE_NM, FLE_NM:data.FLE_NM});
	
	
}

/* 첨부파일 */
function changeFile(){
	
	var isAcceptFile = true;
	
	//File
	const files = $(this)[0].files;
	for(const file of files){
		console.log(file);
		
		$(this).siblings('div.fake-field-file').text(file.name);
	}
	
	//초기화
	if(!isAcceptFile) $(this).val(null);
}