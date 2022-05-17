
function project0101() {
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
	$('a#SAVE_BTN').click(save);
}

function openPopup() {
	
	var TYPE = $(this).attr('id').split('_')[0].toUpperCase();
	
	if(['COMPANY', 'CONTRACT-STATUS', 'INIT-STATUS', 'IMPLEMENT-STATUS', 'CLOSE-STATUS'].includes(TYPE)) $('div#layerPopup').attr('class', 'layer-popup-planing');
	// else if(['PERMISSION'].includes(TYPE)) $('div#layerPopup').attr('class', 'layer-popup-permission');
	else $('div#layerPopup').attr('class', 'layer-popup-planing');
	
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
	/* CONTRACT-STATUS */
	else if(TYPE === 'CONTRACT-STATUS') {
		var content = _sys_elements.sys_0301.popup.menu_access_content({
			TITLE: 'Select Menu access',
			TYPE: TYPE,
		});
		$('div#layerPopup').html('').html(content);
		// row 생성 
		createSearchPopupRow(TYPE);
	}
	/* INIT-STATUS */
	else if(TYPE === 'INIT-STATUS') {
		var content = _sys_elements.sys_0301.popup.menu_access_content({
			TITLE: 'Select Menu access',
			TYPE: TYPE,
		});
		$('div#layerPopup').html('').html(content);
		// row 생성 
		createSearchPopupRow(TYPE);
	}
	/* IMPLEMENT-STATUS */
	else if(TYPE === 'IMPLEMENT-STATUS') {
		var content = _sys_elements.sys_0301.popup.menu_access_content({
			TITLE: 'Select Menu access',
			TYPE: TYPE,
		});
		$('div#layerPopup').html('').html(content);
		// row 생성 
		createSearchPopupRow(TYPE);
	}
	/* CLOSE-STATUS */
	else if(TYPE === 'CLOSE-STATUS') {
		var content = _sys_elements.sys_0301.popup.menu_access_content({
			TITLE: 'Select Menu access',
			TYPE: TYPE,
		});
		$('div#layerPopup').html('').html(content);
		// row 생성 
		createSearchPopupRow(TYPE);
	}
	
	
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
	// 전체 체크박스 이벤트 
	$('#layerPopup #all_check').click(function() {
		var check = true;  
		if(!$(this).is('input:checked')) check = false;
		$(this).prop('checked', check);
		$('tbody#popup_list').find('input[type=checkbox], input[type=radio]').prop('checked', check);
	});
	
	
	// 팝업 닫기 버튼 이벤트
	$('a#popup_close').click(closePopup);
	
	// 팝업 등록 버튼 이벤트
	$('a#popup_register').click(closePopup);
	
	// 팝업창 활성화 
	$('div#layerPopup').addClass('active');
}

function closePopup() {
	// 등록, 닫기 여부 체크  
	var isRegister = $(this).attr('id').split('_')[1] === 'register';
	
	// type 체크 
	var type = $(this).parents('div.layer-cont').attr('popup-type');
	
	// COMPANY, MENUACCESS 등록 일 경우  
	if(isRegister && ['COMPANY', 'CONTRACT-STATUS', 'INIT-STATUS', 'IMPLEMENT-STATUS', 'CLOSE-STATUS'].includes(type)) {
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
		else if(type === 'CONTRACT-STATUS') {
			$('input#CONTRACT-STATUS').val(info_list[0].COMM_NM);
			$('input#CONTRACT-STATUS').prop('info', info_list[0]);
		}
		else if(type === 'INIT-STATUS') {
			$('input#INIT-STATUS').val(info_list[0].COMM_NM);
			$('input#INIT-STATUS').prop('info', info_list[0]);
		}
		else if(type === 'IMPLEMENT-STATUS') {
			$('input#IMPLEMENT-STATUS').val(info_list[0].COMM_NM);
			$('input#IMPLEMENT-STATUS').prop('info', info_list[0]);
		}
		else if(type === 'CLOSE-STATUS') {
			$('input#CLOSE-STATUS').val(info_list[0].COMM_NM);
			$('input#CLOSE-STATUS').prop('info', info_list[0]);
		}

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
	param={
		COMM_CD: TYPE,
	}
	var data = _sys.mariaDB.getData(CTX + '/project/project_0100/popupData/' + TYPE + '.ajax', param);
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
		else if(TYPE === 'CONTRACT-STATUS' || TYPE === 'INIT-STATUS' || TYPE === 'IMPLEMENT-STATUS' || TYPE === 'CLOSE-STATUS') {
			// row 생성
			row = _sys_elements.sys_0301.popup.tr_menu_access_row({
				ID: e.COMM_CD,
				NAME: e.COMM_NM,
				DESC: e.DESCRPT,
			});
		}
		
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
	console.log(param);
	
	// 파라미터 변환 (object, array => JSON string)
	param = _sys.convertParam(param);
	
	// 저장 
	var data = _sys.mariaDB.ajax(CTX + '/project/project_0100/save.ajax', param, 'post');
	console.log(data);
	
	if(data.INSERT_PROJECT_CNT > 0 || data.UPDATE_PROJECT_CNT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/project/project_0100/detailForm?PROJECT_ID=' + data.PROJECT_ID;
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
	if($('input#PROCESS').val() === 'UPDATE') param.PROJECT_ID = $('input#PROJECT_ID').val();
	param.PROCESS = $('input#PROCESS').val();
	param.USER_ID = $('input#USER_ID').val();
	param.USER_NM = $('input#USER_NM').val();
	param.COMPANY_ID = $('input#COMPANY').prop('info') ? $('input#COMPANY').prop('info').COMPANY_ID : '';
	param.COMPANY = $('input#COMPANY').val();
	param.PASSWORD = $('input#PASSWORD').val();
	console.log(param);
	return param;
}

/* 수정 페이지에서 실행 될 초기화 함수 */
function modifyInit() {
	// 데이터 조회
	var data = _sys.mariaDB.getData(CTX +'/project/project_0100/detailForm/getDetailInfo.ajax', {
		PROJECT_ID: $('input#PROJECT_ID').val(),
	});
	console.log(data);
	// 데이터 없을 경우 return 
	if(!data) return;
	
	
	$('input#PROJECT_NAME').val(data.PROJECT_NAME);
	$('input#COMPANY').val(data.COMPANY_NAME);
	$('input#COMPANY').prop('info', {COMPANY_ID: data.COMPANY_ID});
	$('input#START_TIME_PROJECT').val(data.START_TIME_PROJECT);
	$('input#END_TIME_PROJECT').val(data.END_TIME_PROJECT);
	$('input#MANAGER').val(data.MANAGER);
	$('input#TOTAL_MANPOWER').val(data.TOTAL_MANPOWER);
	$('input#DETAIL_CONTENT').val(data.DETAIL_CONTENT);

}
