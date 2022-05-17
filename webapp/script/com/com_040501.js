
function com_040501() {
	if($('input#PROCESS').val() === 'UPDATE') modifyInit();
	$('#SAVE_BTN').click(save);

}



function save() {
	// validation check
	if(!validationCheck()) return;
	
	// 파라미터 생성
	var param = createParameter();
	
	// 파라미터 변환 (object, array => JSON string)
	param = _sys.convertParam(param);
	
	// 저장 
	var data = _sys.mariaDB.ajax(CTX + '/com/com_0405/save.ajax', param, 'post');
	if(data.INSERT_COMPANY_MGT > 0 || data.UPDATE_COMPANY_MGT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/com/com_0405/detailForm?COMPANY_ID=' + data.COMPANY_ID;
	} 
	else {
		alert(_MESSAGE.common.saveFail);
	}
}

function validationCheck(root='') {
	var check = true;
	/* validation-check */
	check = $(root + ' [validation-check]').vcCheck();
	
	/* ID 중복체크 */
	if($('input#COMPANY_ID').vcReset().vcCheck()) {
		var param = {COMPANY_ID: $('input#COMPANY_ID').val()};
		if($('input#PROCESS').val() === 'UPDATE') param.COMPANY_ID = $('input#COMPANY_ID').val();
		
		
	}

	return check; 
}


/* 파라미터 생성 */
function createParameter() {
	var param = {};
	if($('input#PROCESS').val() === 'UPDATE') param.COMPANY_ID = $('input#COMPANY_ID').val();
	param.PROCESS = $('input#PROCESS').val();
	param.COMPANY_NAME = $('input#COMPANY_NAME').val();
	param.COMPANY_ADDRESS = $('input#COMPANY_ADDRESS').val();
	console.log(param);
	return param;
}

/* 수정 페이지에서 실행 될 초기화 함수 */
function modifyInit() {
	// 데이터 조회
	var data = _sys.mariaDB.getData(CTX +'/com/com_0405/detailForm/getDetailInfo.ajax', {
		COMPANY_ID: $('input#COMPANY_ID').val(),
	});
	// 데이터 없을 경우 return 
	if(!data) return;
	
	$('input#COMPANY_NAME').val(data.COMPANY_NAME);
	$('input#COMPANY_ADDRESS').val(data.COMPANY_ADDRESS);

}
