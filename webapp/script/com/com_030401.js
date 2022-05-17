
function com_030401() {
	// 검색 버튼(TURBINE, COMPANY, WORKERS),
	// 추가 버튼(PART, TOOL, PPE) CSS, EVENT 추가	
	// UPDATE 일 경우, 수정 페이지 초기화 함수 실행 
	if($('input#PROCESS').val() === 'UPDATE') modifyInit();
	// else {
	// 	$('input#USER_ID').val('');
	// 	$('input#USER_NM').val('');
	// }
	// 저장 버튼 클릭
	$('a#SAVE_BTN').click(save);
}

function save() {
	// validation check
	if(!validationCheck()) {
		return;
	} 
	// 파라미터 생성
	var param = createParameter();
	console.log(param);
	
	// 파라미터 변환 (object, array => JSON string)
	param = _sys.convertParam(param);
	
	// 저장 
	var data = _sys.mariaDB.ajax(CTX + '/com/com_0304/save.ajax', param, 'post');
	console.log(data);
	
	if(data.INSERT_COM_CNT > 0 || data.UPDATE_COM_CNT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/com/com_0304/list';
	} 
	else {
		alert(_MESSAGE.common.saveFail);
	}
}

function validationCheck(root='') {
	var check = true;
	/* validation-check */
	check = $(root + ' [validation-check]').vcCheck();
	
	return check; 
}
/* 유효성 검사 */
/* function validationCheck(root='') {
	var check = true;

	check = $(root + ' [validation-check]').vcCheck();
	

	//if($('input#USER_ID').val()) {
	if($('input#USER_ID').vcReset().vcCheck()) {
		var param = {USER_ID: $('input#USER_ID').val()};
		// 수정 일 경우, USER_UID를 같이 던져 이전 ID는 중복체크 제외  
		if($('input#PROCESS').val() === 'UPDATE') param.USER_UID = $('input#USER_UID').val();
		
		var result = _sys.mariaDB.ajax(CTX + '/sys_new/sys_0300/popupData/ID-CHECK.ajax', param, 'get');
		console.log(result[0].CNT);
		if(result[0].CNT > 0) {
			$('input#USER_ID').vcWarning(_MESSAGE.sys.idDuplicateCheckFail);
			check = false;
		} else {
			$('input#USER_ID').vcSuccess(_MESSAGE.sys.idDuplicateCheckSuccess);
		}
	}

	if($('input#PASSWORD, input#PASSWORD2').vcCheck()) {
		if($('input#PASSWORD').val() != $('input#PASSWORD2').val()) {
			$('input#PASSWORD2').vcWarning(_MESSAGE.sys.twoPassWordCheckFail);
			check = false;
		} else {
			$('input#PASSWORD2').vcSuccess(_MESSAGE.sys.twoPassWordCheckSuccess);
		}
	}
	return check; 
} 
*/

/* 파라미터 생성 */
function createParameter() {
	var param = {};
	if($('input#PROCESS').val() === 'UPDATE') param.SAFE_COURSE_PLAN_ID = $('input#SAFE_COURSE_PLAN_ID').val();
	param.PROCESS = $('input#PROCESS').val();
	param.COURSE_TYPE = $('input#COURSE_TYPE').val();
	param.TRAIN_TERM = $('input#TRAIN_TERM').val();
	param.TRAINEE_TYPE = $('input#TRAINEE_TYPE').val();
	param.TRAIN_HOURS = $('input#TRAIN_HOURS').val();
	param.CONTENT = $('input#CONTENT').val();
	// param.EMAIL = $('input#EMAIL').val();
	// param.TURBINE_PERMISSION_LIST = $('input#TURBINE-PERMISSION').prop('info') ? $('input#TURBINE-PERMISSION').prop('info').map((e) => { return {GERATOR_ID: e.GERATOR_ID} }) : [];
	console.log(param);
	return param;
}


/* 수정 페이지에서 실행 될 초기화 함수 */
function modifyInit() {
	// 데이터 조회
	var data = _sys.mariaDB.getData(CTX +'/com/com_0304/detailForm/getDetailInfo.ajax', {
		SAFE_COURSE_PLAN_ID: $('input#SAFE_COURSE_PLAN_ID').val(),
	});
	console.log(data);
	// 데이터 없을 경우 return 
	if(!data) return;
	
	$('input#COURSE_TYPE').val(data.COURSE_TYPE);
	$('input#TRAIN_TERM').val(data.TRAIN_TERM);
	$('input#TRAINEE_TYPE').val(data.TRAINEE_TYPE);
	$('input#TRAIN_HOURS').val(data.TRAIN_HOURS);
	$('input#CONTENT').val(data.CONTENT);
}
