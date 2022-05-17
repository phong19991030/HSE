
function sys0301() {
	// 검색 버튼(TURBINE, COMPANY, WORKERS),
	// 추가 버튼(PART, TOOL, PPE) CSS, EVENT 추가
	$('button[id*=SEARCH_BTN], span[id*=ADD_BTN]').css('cursor', 'pointer').click(openPopup);
	
	// UPDATE 일 경우, 수정 페이지 초기화 함수 실행 
	if($('input#PROCESS').val() === 'UPDATE') modifyInit();
	// else {
	// 	$('input#USER_ID').val('');
	// 	$('input#USER_NM').val('');
	// }
	// 저장 버튼 클릭
	$('#SAVE_BTN').click(save);
}

function openPopup() {
	var TYPE = $(this).attr('id').split('_')[0].toUpperCase();
	
	if(['COMPANY', 'MENU-ACCESS'].includes(TYPE)) $('div#layerPopup').attr('class', 'layer-popup');
	else if(['PERMISSION'].includes(TYPE)) $('div#layerPopup').attr('class', 'layer-popup-permission');
	else $('div#layerPopup').attr('class', 'layer-popup');
	
	var scroll_target = '.base_grid_table';
	
	/* COMPANY */
	if(TYPE === 'COMPANY') {
		var content = _sys_elements.sys_0301.popup.company_content({
			TITLE: 'Select a Organization',
			TYPE: TYPE,
		});
		$('div#layerPopup').html('').html(content);
		// row 생성 
		createSearchPopupRow(TYPE);
	}
	/* MENU-ACCESS */
	else if(TYPE === 'MENU-ACCESS') {
		var content = _sys_elements.sys_0301.popup.menu_access_content({
			TITLE: 'Select Menu access',
			TYPE: TYPE,
		});
		$('div#layerPopup').html('').html(content);
		// row 생성 
		createSearchPopupRow(TYPE);
	}
	/* TURBINE-PERMISSION */
	// else if(TYPE === 'TURBINE-PERMISSION') {
	// 	var content = _sys_elements.sys_0301.popup.turbine_permission_content({
	// 		TITLE: 'Select Turbine Permission',
	// 		TYPE: TYPE,
	// 	});
	// 	$('div#layerPopup').html('').html(content);
	// 	// row 생성
	// 	createSearchPopupRow(TYPE);
	// }
	
	/*** 팝업 관련 이벤트 ***/
	// 스크롤 활성화 
	$("#layerPopup " + scroll_target).mCustomScrollbar({
		axis: "Y",
		theme: "minimal-dark",
		mouseWheelPixels: 300
	});
	// 팝업 검색창 입력 이벤트 
	$('input#popup_search').keyup(function(e) {
		if(e.keyCode === 13) {
			var type = $(this).parents('div.layer-cont').attr('popup-type');
			var param = {SEARCH_ALL: $(this).val()};
			createSearchPopupRow(type, param);
		}
	});
	// 팝업 검색창 새로고침 버튼 이벤트 
	$('a#popup_search_refresh').css('cursor', 'pointer').click(function() {
		$('input#popup_search').val('');
		var type = $(this).parents('div.layer-cont').attr('popup-type');
		var param = {};
		createSearchPopupRow(type, param);
	});
	
	$('#popup_search_refresh').css('cursor', 'pointer').click(function() {
		$('input#popup_search').val('');
		var type = $(this).parents('div.layer-cont').attr('popup-type');
		var param = {};
		createSearchPopupRow(type, param);
	});
	// 전체 체크박스 이벤트 
	$('#layerPopup #all_check').click(function() {
		var check = true;  
		if(!$(this).is('input:checked')) check = false;
		$(this).prop('checked', check);
		$('tbody#popup_list').find('input[type=checkbox], input[type=radio]').prop('checked', check);
	});
	
	
	// 팝업 닫기 버튼 이벤트
	$('#popup_close').click(closePopup);
	
	// 팝업 등록 버튼 이벤트
	$('#popup_register').click(closePopup);
	
	// 팝업창 활성화 
	$('div#layerPopup').addClass('active');
}

function closePopup() {
	// 등록, 닫기 여부 체크  
	var isRegister = $(this).attr('id').split('_')[1] === 'register';
	
	// type 체크 
	var type = $(this).parents('div.layer-cont').attr('popup-type');
	
	// COMPANY, MENUACCESS 등록 일 경우  
	if(isRegister && ['COMPANY', 'MENU-ACCESS'].includes(type)) {
		// 체크 리스트 조회
		var check_list = $('tbody#popup_list input[type="radio"]:checked, tbody#popup_list input[type="checkbox"]:checked');
		// 체크 항목 없을 경우 
		if(!check_list.length) return;
		// 체크 항목 정보 가져오기  
		var info_list = check_list.toArray().map((e) => $(e).parents('tr').prop('info'));
		
		// input value, property 세팅
		if(type === 'COMPANY') {
			$('input#COMPANY').val(info_list[0].COMPANY_NAME);
			$('input#COMPANY').prop('info', info_list[0]);
		}
		else if(type === 'MENU-ACCESS') {
			$('input#MENU-ACCESS').val(info_list.map((e) => e.ROLE_NM).join(', '));
			$('input#MENU-ACCESS').prop('info', info_list);
		}
		// else if(type === 'TURBINE-PERMISSION') {
		// 	$('input#TURBINE-PERMISSION').val(info_list.map((e) => e.GERATOR_NM).join(', '));
		// 	$('input#TURBINE-PERMISSION').prop('info', info_list);
		// }
	}
	else {
		console.log('닫기');
	}
	// popup 내용 삭제, 비활성화 
	$('div#layerPopup').html('').removeClass('active');
	
}

function createSearchPopupRow(TYPE, param={}) {
	// popup list 비우기 
	$('tbody#popup_list').html('');
	
	// data 조회 
	var data = _sys.mariaDB.getData(CTX + '/com/com_0101/popupData/' + TYPE + '.ajax', param);
	console.log(TYPE, param, data);
	
	// row 생성, 프로퍼티 추가, 삽입
	data.forEach((e) => {
		// row 생성
		var row;
		
		if(TYPE === 'COMPANY') {
			// row 생성
			row = _sys_elements.sys_0301.popup.tr_company_row({
				ID: e.COMPANY_ID,
				COMPANY_NM: e.COMPANY_NAME,
				LOGO_PATH: CTX + '/imageView' + e.FLE_PATH + '/' + e.NEW_FLE_NM,
				// CLS: e.CLS,
			});
		}
		else if(TYPE === 'MENU-ACCESS') {
			// row 생성
			row = _sys_elements.sys_0301.popup.tr_menu_access_row({
				ID: e.ROLE_ID,
				NAME: e.ROLE_NM,
				DESC: e.RMK,
			});
		}
		// else if(TYPE === 'TURBINE-PERMISSION') {
		// 	// row 생성
		// 	row = _sys_elements.sys_0301.popup.tr_turbine_permission_row({
		// 		ID: e.ROLE_ID,
		// 		FARM_NM: e.FARM_NM,
		// 		GROUP_NM: e.GROUP_NM,
		// 		TURBINE_NM: e.GERATOR_NM
		// 	});
		// }
		
		// 프로퍼티 추가 
		row = $(row).prop('info', e);
		// css, 이벤트 추가 : 팝업 리스트 tr(row) 클릭 이벤트 : tr 클릭 시 checkbox, radio on/off
		row = $(row).css('cursor', 'pointer').click(_sys.clickRowCheckOnOff);

		// 삽입
		$('tbody#popup_list').append(row);
	});
}

function save() {
	// validation check
	if(!validationCheck()) return;
	
	// 파라미터 생성
	var param = createParameter();
	
	// 파라미터 변환 (object, array => JSON string)
	param = _sys.convertParam(param);
	// 저장 
	var data = _sys.mariaDB.ajax(CTX + '/com/com_0101/save.ajax', param, 'post');
	
	if(data.ValidationMsg && data.ValidationMsg != ''){
		alert(data.ValidationMsg);
	}else if(data.INSERT_USER_CNT > 0 || data.UPDATE_USER_CNT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/com/com_0101/detailForm?USER_UID=' + data.USER_UID;
	}else {
		alert(_MESSAGE.common.saveFail);
	}
}

/* 유효성 검사 */
function validationCheck(root='') {
	var check = true;
	/* validation-check */
	check = $(root + ' [validation-check]').vcCheck();
	
	/* ID 중복체크 */
	//if($('input#USER_ID').val()) {
	if($('input#USER_ID').vcReset().vcCheck()) {
		var param = {USER_ID: $('input#USER_ID').val()};
		// 수정 일 경우, USER_UID를 같이 던져 이전 ID는 중복체크 제외  
		if($('input#PROCESS').val() === 'UPDATE') param.USER_UID = $('input#USER_UID').val();
		
		var result = _sys.mariaDB.ajax(CTX + '/com/com_0101/popupData/ID-CHECK.ajax', param, 'get');
		if(result[0].CNT > 0) {
			$('input#USER_ID').vcWarning(_MESSAGE.sys.idDuplicateCheckFail);
			check = false;
		} else {
			$('input#USER_ID').vcSuccess(_MESSAGE.sys.idDuplicateCheckSuccess);
		}
	}
	/* PASSWORD 체크 */
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

/* 파라미터 생성 */
function createParameter() {
	var param = {};
	if($('input#PROCESS').val() === 'UPDATE') param.USER_UID = $('input#USER_UID').val();
	param.PROCESS = $('input#PROCESS').val();
	param.USER_ID = $('input#USER_ID').val();
	param.USER_NM = $('input#USER_NM').val();
	//param.COMPANY_ID = $('input#COMPANY').prop('info') ? $('input#COMPANY').prop('info').COMPANY_ID : '';
	//param.COMPANY = $('input#COMPANY').val();
	param.EMP_NO = $('input#id_emp_str_uid_key_emp').val();
	param.PASSWORD = $('input#PASSWORD').val();
	param.MENU_ACCESS_LIST = $('input#MENU-ACCESS').prop('info') ? $('input#MENU-ACCESS').prop('info').map((e) => { return {ROLE_ID: e.ROLE_ID} }) : [];
	// param.EMAIL = $('input#EMAIL').val();
	// param.TURBINE_PERMISSION_LIST = $('input#TURBINE-PERMISSION').prop('info') ? $('input#TURBINE-PERMISSION').prop('info').map((e) => { return {GERATOR_ID: e.GERATOR_ID} }) : [];
	
	param.OLD_EMP = $('input#id_old_data_emp').val();
	param.EMP_NO = $('input#id_emp_str_uid_key_emp').val();
	return param;
}

/* 수정 페이지에서 실행 될 초기화 함수 */
function modifyInit() {
	// 데이터 조회
	var data = _sys.mariaDB.getData(CTX +'/com/com_0101/detailForm/getDetailInfo.ajax', {
		USER_UID: $('input#USER_UID').val(),
	});
	// 데이터 없을 경우 return 
	if(!data) return;
	
	$('input#USER_ID').val(data.USER_ID);
	$('input#USER_NM').val(data.USER_NM);
	$('input#id_old_data_emp').val(data.EMP_NO);
	$('input#id_emp_str_uid_key_emp').val(data.EMP_NO);
	//$('input#COMPANY').val(data.COMPANY_NAME);
	//$('input#COMPANY').prop('info', {COMPANY_ID: data.COMPANY_ID});
	$('input#MENU-ACCESS').val(data.ROLE_NM_LIST ? data.ROLE_NM_LIST.replaceAll(' | ', ', ') : '');
	$('input#MENU-ACCESS').prop('info', data.ROLE_ID_LIST ? 
			data.ROLE_ID_LIST.split(' | ').map((e) => { return {ROLE_ID: e,} }) 
			: []);

	getEmpInfos('key_emp', data.EMP_NO);		
			
}

function goList() { 
  window.location = CTX + '/com/com_0101/list';
}