
function sys0501() {
	
	// UPDATE 일 경우, 수정 페이지 초기화 함수 실행 
	if($('input#PROCESS').val() === 'UPDATE') modifyInit();
	
	// 저장 버튼 클릭
	$('a#SAVE_BTN').click(save);
	
	// 로고 
	$('input#LOGO').change(changeFile);
}

function save() {
	// validation check
	if(!validationCheck()) return;
	
	// 파라미터 생성
	var param = createParameter();
	console.log(param);
	
	// 파일  
	var formData = new FormData($('#fileStorage')[0]);
	
	// 파라미터 변환 (object, array => JSON string)
	for(let [key, value] of Object.entries(param)) {
	    console.log(key, value, _sys.getType(value));
	    
	    // 배열인 항목은 JSON String으로 변환
	    formData.append(key, 
	    		['object', 'array'].includes(_sys.getType(value)) 
	    		? JSON.stringify(value) : value);
	}
	
	console.log('---------- 최종 Param ------------');
	for(let entry of formData.entries()) {
		console.log(entry[0], entry[1]);
	}
	
	// 저장 
	var data = _sys.mariaDB.saveFile(ctx + '/sys_new/sys_0500/save.ajax', formData);
	console.log(data);
	
	if(data.INSERT_COMPANY_CNT > 0 || data.UPDATE_COMPANY_CNT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = ctx + '/sys_new/sys_0500/detailForm?COMPANY_ID=' + data.COMPANY_ID;
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
function createParameter() {
	var param = {};
	if($('input#PROCESS').val() === 'UPDATE') {
		param.COMPANY_ID = $('input#COMPANY_ID').val();
		// 기존 로고 파일 정보 추가  
		param.FLE_PATH = $('input#FLE_PATH').val();
		param.NEW_FLE_NM = $('input#NEW_FLE_NM').val();
	}
	param.PROCESS = $('input#PROCESS').val();
	param.COMPANY_NM = $('input#COMPANY_NM').val();
	param.CLS = $('select#CLS option:selected').val();
	param.COMPANY_ADR = $('input#ADDRESS').val();
	param.DESCRPT = $('textarea#DESCRIPTION').val();
	return param;
}

/* 수정 페이지에서 실행 될 초기화 함수 */
function modifyInit() {
	// 데이터 조회
	var data = _sys.mariaDB.getData('/sys_new/sys_0500/detailForm/getDetailInfo.ajax', {
		COMPANY_ID: $('input#COMPANY_ID').val(),
	});
	console.log(data);
	// 데이터 없을 경우 return 
	if(!data) return;
	
	var cls = {1: 'Operator', 2: 'Manufacture', 3: 'ISP', 4: 'Consulting firm'};
	
	$('input#COMPANY_NM').val(data.COMPANY_NM);
	$('select#CLS option[value=' + data.CLS + ']').prop('selected', true);
	$('select#CLS').siblings('label').text(cls[data.CLS]);
	$('input#ADDRESS').val(data.ADDRESS);
	$('img#LOGO_VIEW').prop('src', ctx + '/imageView' + data.FLE_PATH + '/' + data.NEW_FLE_NM).parents('li').show();
	$('textarea#DESCRIPTION').text(data.DESCRIPTION);
	
	$('input#FLE_PATH').val(data.FLE_PATH);
	$('input#NEW_FLE_NM').val(data.NEW_FLE_NM);
}

function changeFile() {

	var isAcceptFile = true;
	
	// File
	const files = $(this)[0].files;
	for(const file of files) {
		console.log(file);
		// 파일 확장자 점검  
		if(!['.jpeg', '.jpg', '.png'].includes(file.name.substring(file.name.lastIndexOf('.')))) {
			alert(_MESSAGE.common.unacceptableFileExtension);
			isAcceptFile = false;
			break;
		};
		// img 이미지 src 추가 
		var path = URL.createObjectURL(file);
		$('img#LOGO_VIEW').prop('src', path).parents('li').show();
		
		// 파일명 추가 
		$(this).siblings('div.fake-field-file').text(file.name);
	}
	// 초기화
	if(!isAcceptFile) $(this).val(null);
}