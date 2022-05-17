/*	
 * 	######## Selector ##########################################
 * 	## MAIN
 *	input#RPT_NM				: 보고서 제목
 *
 *	input#TURBINE		  		: 발전기 이름
 *	button#TURBINE_SEARCH_BTN 	: 발전기 검색 버튼
 *
 *	input#COMPANY		   		: 유지보수사?? 운영사?? 이름
 *  button#COMPANY_SEARCH_BTN  	: 운영사 검색 버튼
 *  
 *	input#RPT_START_TIME		: 작업 시작 시간
 *  input#RPT_END_TIME			: 작업 종료 시간
 *  span#RPT_TOTAL_TIME 		: 총 작업 시간
 *  
 *  input#WORKERS			  	: 작업자
 *  button#WORKERS_SEARCH_BTN 	: 작업자 검색 버튼
 *  
 *  span#REGISTRATOR			: 작성자
 *  
 *  textarea#SAFETY				: 안전 내용
 *  textarea#OVERVIEW			: 개요 내용
 *  
 *  button#ALL_NORMAL			: 전체 "정상" 체크 버튼 
 *  
 *  tbody#CHECK_LIST			: 체크 리스트
 *  
 *  span#SPAN_BTN 				: 저장 버튼 
 *  
 *  ## POPUP
 *  - common
 *  
 *  $('div.layer-cont').attr('popup-type') : 팝업 창 종류 (TURBINE, COMPANY, WORKERS, MAINTEND_CD, PART, TOOL, PPE)
 *  
 *  div#layerPopup		: 팝업 창	(.active)			
 *  stong#popup_title	: 팝업 타이틀
 *  a#popup_close	 	: 팝업 닫기 버튼 
 *  a#popup_register	: 팝업 등록 버튼
 *  
 *  - TURBINE, COMPANY, WORKERS, MAINTEN_CD
 *  tbody#popup_list	: 팝업 table tbody 
 *  input#popup_search	: 팝업 검색창
 *  a#popup_search_refresh : 팝업 검색 새로고침
 *  
 *  ######## Parameter ##########################################
 *  # parameter
 *  PAGE_TITLE	: 페이지 제목 (Register, Modify)
 *  
 *  
 *  ######## Function ###########################################
 *  
 *  oam0401 		: 초기화 
 *  
 *  
 */
function oam0401() {
	// 체크리스트 템플릿 생성 
	makeCheckList(check_list);
	
	// 검색 버튼(TURBINE, COMPANY, WORKERS) CSS, EVENT 추가
	$('button[id*=SEARCH_BTN]').css('cursor', 'pointer').click(openPopup);
	
	// 보고서 시간(시작, 종료) 변경 event 추가, datepicker 활성화 - @TODO : EVENT 중복 적용 수정 
	$('input.datetimepicker').change(checkReportTime).setDateTimePicker('yy-mm-dd');
	
	// ALL NORMAL 버튼 클릭 이벤트 
	$('button#ALL_NORMAL').click(function() {
		if($(this).hasClass('active')) 
			$('tbody#CHECK_LIST tr[id*=ITEM_] input[id*=radio_]').prop('checked', false);
		else 
			$('tbody#CHECK_LIST tr[id*=ITEM_] input[id*=radio_Y]').prop('checked', true);
		// 클래스 토글 
		$(this).toggleClass('active');
	});
	
	// 저장 버튼 클릭
	$('span#SAVE_BTN').click(save);
	
	// UPDATE 일 경우, 수정 페이지 초기화 함수 실행 
	if($('input#PROCESS').val() === 'UPDATE') modifyInit();
	
	/* EVENT_ID가 있을 경우 발전기 세팅 */
	if($('input#EVENT_ID').val()) {
		// EVENT_ID로 발전기 정보 검색
		var data = _oam.mariaDB.getData(ctx + '/oam2/oam_0200/popupData/TURBINE.ajax', {EVENT_ID: $('input#EVENT_ID').val()})[0];
		// 값추가, 프로퍼티 추가 
		$('input#TURBINE').val(data.FARM_NM + ' > ' + data.GROUP_NM + ' > ' + data.TURBINE_NM).prop('info', data);
		// 발전기 input 비활성화  
		$('input#TURBINE').prop('disabled', true);
		// 발전기 검색버튼 삭제 
		$('button#TURBINE_SEARCH_BTN').remove();
	}
}

/* 체크리스트 템플릿 생성 */
function makeCheckList(list) {
	
	list.forEach((e) => {
		// sample 생성 
		var sample = _oam_elements.oam_0401.main.tr_checklist_row({
			ID: e.CHK_TEMP_ID,
			CHK_NO: e.CHK_NO,
			CHK_ITEM: e.CHK_ITEM,
			CHK_DETAIL: e.CHK_DETAIL,
			IS_REMARK: e.IS_REMARK === 'Y',
			GROUP_NUM: e.GROUP_NUM,
			GROUP_CNT: e.GROUP_CNT, 
		});
		
		sample = $(sample).prop('info', e);
		
		// sample 추가 
		$('tbody#CHECK_LIST').append(sample);
	});
	// input placeholder
	initialControl();
}

/* 
 * 검색 버튼(TURBINE, COMPANY, WORKERS) : $taget_SEARCH_BTN  
 * 클릭
 * : 팝업창 열기 
 */
function openPopup() {
	
	var TYPE = $(this).attr('id').split('_')[0].toUpperCase();
	
	/* TURBINE */
	if(TYPE === 'TURBINE') {
		// 팝업창 콘텐츠 생성, 삽입
		var content = _oam_elements.oam_0201.popup.turbine_content({
			TITLE: 'Select a Wind Turbine',
			TYPE: TYPE,
		});
		$('div#layerPopup').html('').html(content);
		// row 생성 
		createSearchPopupRow(TYPE);
	}
	/* COMPANY */
	else if(TYPE === 'COMPANY') {
		// 팝업창 콘텐츠 생성, 삽입
		var content = _oam_elements.oam_0201.popup.company_content({
			TITLE: 'Select a ISP',
			TYPE: TYPE,
		});
		$('div#layerPopup').html('').html(content);
		// row 생성 
		createSearchPopupRow(TYPE);
	}
	/* WORKERS */
	else if(TYPE === 'WORKERS') {
		
		// COMPANY ID 가져오기 
		var company_info = $('input#COMPANY').prop('info');
		
		// COMPANY 선택 여부 CHECK
		if(!company_info) {
			$('input#COMPANY').vcWarning('Please select an ISP');
			return;
		}
	
		// 팝업창 콘텐츠 생성, 삽입
		var content = _oam_elements.oam_0201.popup.worker_content({
			TITLE: 'Select Workers',
			TYPE: TYPE,
		});
		$('div#layerPopup').html('').html(content);
		// row 생성 
		createSearchPopupRow(TYPE, {COMPANY_ID: company_info.COMPANY_ID});
	}
	/*** 팝업 관련 이벤트 ***/
	// 스크롤 활성화 
	//$("#layerPopup .layer-cont").mCustomScrollbar({
	$("#layerPopup .base_grid_table").mCustomScrollbar({
		axis: "Y",
		theme: "minimal-dark",
		mouseWheelPixels: 300
	});
	// 팝업 검색창 입력 이벤트 
	$('input#popup_search').keyup(function(e) {
		if(e.keyCode === 13) {
			var type = $(this).parents('div.layer-cont').attr('popup-type');
			var param = {SEARCH_ALL: $(this).val()};
			// WOKERS 일 경우, COMPANY_ID 파라미터 추가 
			if(type === 'WORKERS') param.COMPANY_ID = $('input#COMPANY').prop('info').COMPANY_ID;
			createSearchPopupRow(type, param);
		}
	});
	// 팝업 검색창 새로고침 버튼 이벤트 
	$('a#popup_search_refresh').css('cursor', 'pointer').click(function() {
		$('input#popup_search').val('');
		var type = $(this).parents('div.layer-cont').attr('popup-type');
		var param = {};
		// WOKERS 일 경우, COMPANY_ID 파라미터 추가 
		if(type === 'WORKERS') param.COMPANY_ID = $('input#COMPANY').prop('info').COMPANY_ID;
		createSearchPopupRow(type, param);
	});
	// 팝업 닫기 버튼 이벤트
	$('a#popup_close').click(closePopup);
	
	// 팝업 등록 버튼 이벤트
	$('a#popup_register').click(closePopup);
	
	// 팝업창 활성화 
	$('div#layerPopup').addClass('active');
}

/* popup 닫기, 등록 버튼 클릭 시 event */
function closePopup() {
	
	// 등록, 닫기 여부 체크  
	var isRegister = $(this).attr('id').split('_')[1] === 'register';
	
	// type 체크 
	var type = $(this).parents('div.layer-cont').attr('popup-type');
	
	// TURBINE, COMPANY, WORKERS 등록 일 경우 
	if(isRegister && ['TURBINE', 'COMPANY', 'WORKERS'].includes(type)) {
		// 체크 리스트 조회
		var check_list = $('tbody#popup_list input[type="radio"]:checked, tbody#popup_list input[type="checkbox"]:checked');
		// 체크 항목 없을 경우 
		if(!check_list.length) return;
		// 체크 항목 정보 가져오기  
		var info_list = check_list.toArray().map((e) => $(e).parents('tr').prop('info'));
		
		// input value, property 세팅
		if(type === 'TURBINE') {
			$('input#TURBINE').val(info_list[0].FARM_NM + ' > ' + info_list[0].GROUP_NM + ' > ' + info_list[0].TURBINE_NM);
			$('input#TURBINE').prop('info', info_list[0]);
		} 
		else if(type === 'COMPANY') {
			$('input#COMPANY').val(info_list[0].COMPANY_NM);
			$('input#COMPANY').prop('info', info_list[0]);
			// WORKERS 초기화 
			$('input#WORKERS').val('');
			$('input#WORKERS').removeProp('info');
		}
		else if(type === 'WORKERS') {
			$('input#WORKERS').val(info_list.map((e) => e.USER_NM).join(', '));
			$('input#WORKERS').prop('info', info_list);
		}
	}
	else {
		console.log('닫기');
	}
	// popup 내용 삭제, 비활성화 
	$('div#layerPopup').html('').removeClass('active');
}

/* 검색 팝업 창 Row 생성 */
function createSearchPopupRow(TYPE, param={}) {
	// popup list 비우기 
	$('tbody#popup_list').html('');
	
	// data 조회 
	var data = _oam.mariaDB.getData(ctx + '/oam2/oam_0200/popupData/' + TYPE + '.ajax', param);
	console.log(TYPE, param, data);
	
	// row 생성, 프로퍼티 추가, 삽입
	data.forEach((e) => {
		// row 생성
		var row;
		if(TYPE === 'TURBINE') {
			// row 생성
			row = _oam_elements.oam_0201.popup.tr_turbine_row({
				ID: e.TURBINE_ID,
				FARM_NM: e.FARM_NM,
				GROUP_NM: e.GROUP_NM,
				TURBINE_NM: e.TURBINE_NM
			});
		}
		else if(TYPE === 'COMPANY') {
			// row 생성
			row = _oam_elements.oam_0201.popup.tr_company_row({
				ID: e.COMPANY_ID,
				COMPANY_NM: e.COMPANY_NM,
				LOGO_PATH: ctx + '/imageView' + e.FLE_PATH + '/' + e.NEW_FLE_NM,
			});
		}
		else if(TYPE === 'WORKERS') {
			// row 생성
			row = _oam_elements.oam_0201.popup.tr_worker_row({
				ID: e.USER_UID,
				COMPANY_NM: e.COMPANY_NM,
				WORKER_NM: e.USER_NM,
			});
		}
		// 프로퍼티 추가 
		row = $(row).prop('info', e);
		// css, 이벤트 추가 : 팝업 리스트 tr(row) 클릭 이벤트 : tr 클릭 시 check 박스 활성화
		row = $(row).css('cursor', 'pointer').click(function() {
			$(this).find('input[type=radio], input[type=checkbox]').prop('checked', true);
		});
		// 삽입
		$('tbody#popup_list').append(row);
	});
}

/* 총 작업 시간 계산 */
function checkReportTime() {
	// 총 작업시간 표시 
	$('span#RPT_TOTAL_TIME').text(_oam.toStringTimeDiff({START:$('input[id*=START_TIME]').val(), END: $('input[id*=END_TIME]').val()}));
}

/* 
 * # 정규 표현식 체크
 * @TODO oam_010201.js 의  validationCheck 와 oam-common.js에 통합
 */ 
function validationCheck(root='') {
	var check;
	check = $(root + ' [validation-check]').vcCheck();
	
	// Working time 에러 
	var a = $('input[id*=START_TIME]').val();
	var b = $('input[id*=END_TIME]').val();
	if(a && b) {
		a = moment(a), b = moment(b);
		if(b.isBefore(a)) {
			$('input[id*=START_TIME]').vcWarning(_MESSAGE.common.timeError);
			$('input[id*=END_TIME]').vcWarning(_MESSAGE.common.timeError);
			check = false;
		}
	}
	
	return check; 
}

/* 저장 */
function save() {
	// validation check
	if(!validationCheck()) return;
	
	// 파라미터 생성
	var param = createParameter();
	console.log('변환 전', param);
	
	// param 변환 
	for(let [key, value] of Object.entries(param)) {
		console.log(key, value, _oam.getType(value));
		// 배열인 항목은 JSON String으로 변환
		param[key] = ['object', 'array'].includes(_oam.getType(value)) ? JSON.stringify(value) : value;
	}
	
	console.log('변환 후', param);
	
	// 저장 
	//var data = _oam.mariaDB.getData(ctx + '/oam2/oam_0400/reportRegister/saveReport.ajax', param);
	var data = _oam.mariaDB.ajax(ctx + '/oam2/oam_0400/reportRegister/saveReport.ajax', param, 'post');
	console.log(data);
	
	if(data.RPT_INSERT_CNT > 0 || data.RPT_UPDATE_CNT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		if($('input#FROM_TOTALVIEW').val() === 'Y') window.location = ctx + '/oam2/oam_0500/totalView?EVENT_ID=' + $('input#EVENT_ID').val();
		else if($('input#EVENT_ID').val()) window.location = ctx + '/oam2/oam_0400/reportDetail?RPT_ID=' + data.RPT_ID + '&EVENT_ID=' + $('input#EVENT_ID').val();
		else window.location = ctx + '/oam2/oam_0400/reportDetail?RPT_ID=' + data.RPT_ID;
	} 
	else {
		alert(_MESSAGE.common.saveFail);
	}
}

/* 파라미터 생성 */
function createParameter() {
	
	var param = {};
	
	/* EVENT에 대한 보고서 일 경우 */
	if($('input#EVENT_ID').val()) {
		param.EVENT_ID = $('input#EVENT_ID').val();
	}
	
	/* INSERT AND UPDATE */
	param.PROCESS = $('input#PROCESS').val();
	if($('input#PROCESS').val() === 'UPDATE') {
		param.RPT_ID = $('input#RPT_ID').val();
		param.RPT_CHK_ID = $('input#RPT_CHK_ID').val();
	}
	
	/* WT_RPT */
	param.RPT_NM = $('input#RPT_NM').val();
	param.GERATOR_ID = $('input#TURBINE').prop('info').TURBINE_ID;
	param.MAINTEN_ID = $('input#COMPANY').prop('info').COMPANY_ID;
	param.START_TIME = $('input#RPT_START_TIME').val();
	param.END_TIME = $('input#RPT_END_TIME').val();
	param.START_TIME_UTC = moment.tz(param.START_TIME, _CLIENT.CLIENT_ACCESS_TIMEZONE).tz('UTC').format('YYYY-MM-DD HH:mm:ss');
	param.END_TIME_UTC = moment.tz(param.END_TIME, _CLIENT.CLIENT_ACCESS_TIMEZONE).tz('UTC').format('YYYY-MM-DD HH:mm:ss');
	
	/* WT_RPT_WORKER */
	param.WORKER_LIST = $('input#WORKERS').prop('info').map((e) => { return {WORKER_ID: e.USER_UID} });
	
	/* WT_RPT_CHKLST */
	param.SAFETY = $('textarea#SAFETY').val();
	param.OVERVIEW = $('textarea#OVERVIEW').val();
	
	/* WT_RPT_CHKLST_ITEM */
	param.CHECK_LIST = $('tbody#CHECK_LIST tr[id*=ITEM_]').toArray().map((e) => {
		var info = $(e).prop('info');
		info.CHK = $(e).find('input[type=radio]:checked').val() || 'U';
		info.RMK = $(e).find('input[id*=REMARK_]').val();
		return info;
	});
	
	return param;
}

/* 수정 페이지에서 실행 될 초기화 함수 */
function modifyInit() {
	// 데이터 조회
	var data = _oam.mariaDB.getData('/oam2/oam_0400/reportDetail/getChklstReportInfo.ajax', {
		RPT_ID: $('input#RPT_ID').val(),
	});
	// 데이터 없을 경우 return 
	if(!data) return;
	
	// 데이터 변환 
	console.log(data);
	data = _oam.convertData.RPT_CHKLST(data);
	console.log(data);
	
	// OVERVIEW
	$('input#RPT_CHK_ID').val(data.RPT_CHK_ID);
	$('input#RPT_NM').val(data.RPT_NM);
	
	$('input#TURBINE').val(data.POSITION);
	$('input#TURBINE').prop('info', {TURBINE_ID:data.TURBINE_ID});
	
	$('input#COMPANY').val(data.COMPANY_NM);
	$('input#COMPANY').prop('info', {COMPANY_ID:data.COMPANY_ID});
	
	$('input#RPT_START_TIME').val(data.START_TIME);
	$('input#RPT_END_TIME').val(data.END_TIME);
	
	$('input#WORKERS').val(data.WORKER_LIST.map((e) => e.WORKER_NM).join(', '));
	$('input#WORKERS').prop('info', data.WORKER_LIST.map((e) => {return {USER_UID: e.WORKER_ID}}));
	
	$('span#REGISTRATOR').text(data.USER_ID);
	
	// SAFETY, OVERVIEW
	$('textarea#SAFETY').text(data.SAFETY);
	$('textarea#OVERVIEW').text(data.OVERVIEW);
	
	// CHECK LIST
	data.CHECK_LIST.forEach((e) => {
		var target = $('tbody#CHECK_LIST tr#ITEM_' + e.CHK_TEMP_ID);
		target.find('input[id*=radio_' + e.CHK + ']').prop('checked', true);
		target.find('input[id*=REMARK_]').val(e.RMK);
	});
	
	checkReportTime();
}
