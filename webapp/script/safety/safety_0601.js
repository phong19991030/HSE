/*초기화*/
function safety_0601(){
	
	var project_list = _sys.mariaDB.getData(CTX + '/com/com_0102/getData.ajax', {});
	project_list.LIST.forEach((e) => {
		
		var option = '<option value="' + e.PROJECT_ID + '">' + e.PROJECT_NAME + '</option>';
		option = $(option).prop('info', e);
		$('select#PROJECT').append(option);
	});
	
	// 수정페이지일 경우
	if($('input#PROCESS').val() === 'UPDATE') {
		modifyInit();
	} 
	
	//저장버튼 클릭
	$('button#SAVE_BTN').click(save);
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
	var data = _sys.mariaDB.ajax(CTX + '/sft/sft_0601/save.ajax', param, 'post');
	console.log(data);
	
	if(data.INSERT_RESULT > 0 || data.UPDATE_RESULT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		/*window.location = CTX + '/sft/sft_0601/detailForm?SAFE_MGT_ORG_ID=' + data.SAFE_MGT_ORG_ID;*/
		window.location = CTX + '/sft/sft_0601/list';
	} else {
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
		param.SAFE_MGT_ORG_ID = $('input#SAFE_MGT_ORG_ID').val();
	} else if($('input#PROCESS').val() === 'INSERT') {
		param.SAFE_MGT_ORG_ID = $('input#SAFE_MGT_ORG_ID').val();
	} 
	param.PROCESS = $('input#PROCESS').val();
	param.PROJECT_ID = $('select#PROJECT option:selected').prop('info').PROJECT_ID;
	param.DOC_NO = $('input#DOC_NO').val();
//	param.INVESTOR = $('input#id_emp_str_uid_key_investor').val();
	param.INVESTOR = $('input#INVESTOR').val();
	param.CSO = $('input#id_emp_str_uid_key_CSO').val();
	param.FIELD_AGENT = $('input#id_emp_str_uid_key_FIELD_AGENT').val();
	param.SAFETY_MANAGER = $('input#id_emp_str_uid_key_SAFETY_MANAGER').val();
	param.MATERIAL_MANAGER = $('input#id_emp_str_uid_key_MATERIAL_MANAGER').val();
	param.SITE_MANAGER = $('input#id_emp_str_uid_key_SITE_MANAGER').val();

	param.CSO_JOB = $('input#CSO_JOB').val();
	param.FIELD_AGENT_JOB = $('input#FIELD_AGENT_JOB').val();
	param.SAFETY_MANAGER_JOB = $('input#SAFETY_MANAGER_JOB').val();
	param.MATERIAL_MANAGER_JOB = $('input#MATERIAL_MANAGER_JOB').val();
	param.SITE_MANAGER_JOB = $('input#SITE_MANAGER_JOB').val();

	return param;
}

/* 수정페이지에서 실행될 초기화 함수 */
function modifyInit(){
	
	//데이터 조회
	var data = _sys.mariaDB.getData(CTX +'/sft/sft_0601/detailForm/getDetailInfo.ajax', {
		SAFE_MGT_ORG_ID: $('input#SAFE_MGT_ORG_ID').val()
	}); 
	console.log(data);
	//데이터 없을 경우 return
	if(!data) {
		return;
	}
	
	// $('input#INVESTOR').val(data.INVESTOR);
	// $('input#CSO').val(data.CSO);
	// $('input#FIELD_AGENT').val(data.FIELD_AGENT);
	// $('input#SAFETY_MANAGER').val(data.SAFETY_MANAGER);
	// $('input#MATERIAL_MANAGER').val(data.MATERIAL_MANAGER);
	// $('input#SITE_MANAGER').val(data.SITE_MANAGER);

  // $('input#CSO_JOB').val(data.CSO_JOB);
	// $('input#FIELD_AGENT_JOB').val(data.FIELD_AGENT_JOB);
	// $('input#SAFETY_MANAGER_JOB').val(data.SAFETY_MANAGER_JOB);
	// $('input#MATERIAL_MANAGER_JOB').val(data.MATERIAL_MANAGER_JOB);
	// $('input#SITE_MANAGER_JOB').val(data.SITE_MANAGER_JOB);

	//$('select#PROJECT').siblings('label').text(data.PROJECT_NAME);
	$('select#PROJECT option[value=' + 	$('input#PROJECT_ID').val()+ ']').prop('selected', true);
}

function goList() { 
  window.location = CTX + '/sft/sft_0601/list';
}





