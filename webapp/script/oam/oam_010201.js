
/*	
 * 	######## Selector ##########################################
 * 	## MAIN
 * 	
 *  input#PLAN_NM_EN	: 계획 제목 (영어)
 *  input#PLAN_NM		: 계획 제목 (한글)
 *  
 *  span#GERATOR_NM	: 발전기 이름
 *  span#COMPANY_NM	: 회사 이름
 *  
 *  input#PLAN_START_TIME	: 계획 시작 시간
 *  input#PLAN_END_TIME		: 계획 종료 시간 
 *  span#PLAN_TOTAL_TIME	: 총 작업 시간 
 * 
 * 	div#summary_form	: 본문 폼
 *  
 *  tbody#part_list 	: 부품 리스트  
 *	span#part_add_btn 	: 부품 추가 버튼
 * 	
 *  tbody#tool_list		: 도구 리스트
 *  span#tool_add_btn	: 도구 추가 버튼
 *  
 *  tbody#ppe_list		: PPE 리스트 
 *  span#ppe_add_btn	: PPE 추가 버튼
 *  
 *  tbody#work_list		: 작업 리스트
 *  span#work_add_btn	: 작업 추가 버튼
 *  
 *  span#save_btn		: 저장 버튼
 *  a#cancel_btn		: 취소 버튼
 *  
 *  
 *  ## POPUP
 *  - common
 *  div#layerPopup		: 팝업 창	(.active)			
 *  stong#popup_title	: 팝업 타이틀
 *  a#popup_close	 	: 팝업 닫기 버튼 
 *  a#popup_register	: 팝업 등록 버튼
 *  
 *  input#popup_start_time	: 팝업 시작 datetimepicker 
 *  input#popup_end_time	: 팝업 종료 datetimepicker
 *  
 *  - item
 *  select#popup_category 		: 카테고리 셀렉트 박스 
 *  select#popup_item	  		: 부품 셀렉트 박스
 *  
 *  - work
 *  input#popup_work_title		: 작업 제목
 *  textarea#popup_work_detail 	: 작업 상세 내용 
 *  
 *  select#popup_worker			: 작업자 셀렉트 박스
 *  div#popup_worker_list		: 작업자 리스트
 * 	div#popup_worker_list span	: 작업자 icon
 *  input#popup_cost			: 작업 비용
 *  
 *  
 *  
 *  ######## Parameter ##########################################
 *  # parameter
 *  input#EVENT_ID 		: 이벤트 ID
 *  input#GERATOR_ID	: 발전기 ID
 *  input#COMPANY_ID	: 회사 ID
 * 	input#PLAN_ID		: 계획 ID, 수정 페이지에서만 존재, 등록 페이지에선 X
 * 	input#PROCESS		: INSERT(planRegister), UPDATE(planModify)
 *  
 *  
 *  ######## Function ###########################################
 *  
 *  oam010201 		: 초기화, 
 *  openPopup 		: 팝업 창 활성화,
 *  closePopup		: 팝업 창 닫기, 등록 
 *  selectboxChange	: 팝업 창 셀렉트 박스 변경 이벤트,
 *  validationCheck	: 팝업 창 등록시 validation check,
 *  save			: 계획 저장
 *  createParameter	: 계획 저장 시, 컨트롤러에 넘길 파라미터 생성
 *  checkPlanningTime: 계획 총 계획 시간 체크,
 *  
 */
function oam010201() {
	
	// Part, Tool, PPE, Worker 추가 버튼 css, event 추가
	$('span[id*=add_btn]').not('#work_add_btn').css('cursor', 'pointer').click(openPopup);
	
	$('span#work_add_btn').css('cursor', 'pointer').click(addWork);
	
	// 저장 버튼 이벤트 추가
	$('span#save_btn').click(save);
	
	// UPDATE 일 경우, 수정 페이지 초기화 함수 실행 
	if($('input#PROCESS').val() === 'UPDATE') modifyInit();
	if($('input#PROCESS').val() === 'INSERT') addWork();
}

/* 작업 추가 */ 
function addWork(param={}) {
	// id 생성 
	var id = param.SCHED_ID ? param.SCHED_ID : moment().valueOf();
	
	// 생성 
	var sample = _oam_elements.oam_010201.main.div_work_row({
		ID: id,
	});
	
	// Worker 추가 버튼 클릭 이벤트  
	sample = $(sample).find('span[id*=WORKER_ADD_BTN]').css('cursor', 'pointer').click(openPopup).parents('.table-row');
	
	// 삭제 버튼 클릭 이벤
	sample = $(sample).find('span[id*=DELETE_BTN_]').css('cursor', 'pointer').click(function() {
		
		// 삭제 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 작업 갯수 조회 
		var work_cnt = $('tbody[id*=WORK_]').toArray().filter((e) => $(e).prop('info').PROCESS !== 'DELETE').length;
		// 작업이 1개 일 경우 => 삭제 불가 
		if(work_cnt <= 1) return alert(_MESSAGE.oam.deleteWorkAlert); 
		//
		var info = $(this).parents('div.table-row').find('tbody[id*=WORK_]').prop('info');
		$(this).parent('.table-row').remove();
		
//		if(info.PROCESS === 'INSERT') {
//			$(this).parent('.table-row').remove(); 
//		} 
//		else {
//			info.PROCESS = 'DELETE';
//			$(this).hide();
//		}
	}).parents('.table-row');
	
	// Date time picker input 이벤트 추가 
	sample = $(sample).find('input[id*=WORK_START_TIME], input[id*=WORK_END_TIME]').on('input', checkPlanningTime).parents('.table-row');
	sample = $(sample).find('input[id*=WORK_START_TIME], input[id*=WORK_END_TIME]').on('input', checkPlanningTime).parents('.table-row');
	
	
	sample = $(sample).find('input[id*=WORK_COST]').keyup(function(e) {
		this.value = this.value.replace(/[ㄱ-ㅎㅏ-ㅡ가-핳a-zA-Z \{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, '');
	}).parents('.table-row');
	
	// 프로퍼티 추가 
	$(sample).find('tbody[id*=WORK_]').prop('info', {
		PROCESS: 'INSERT',
		ID: id,
	});
	
	// 추가 
	$('div#WORK_LIST').append(sample);
	
	if(param.SCHED_ID) {
		$('input#WORK_NM_' + param.SCHED_ID).val(param.WORK_TITLE);
		$('textarea#WORK_DETAIL_' + param.SCHED_ID).val(param.WORK_DETAIL);
		$('input#WORK_START_TIME_' + param.SCHED_ID).val(param.START_TIME);
		$('input#WORK_END_TIME_' + param.SCHED_ID).val(param.END_TIME);
		$('input#WORK_COST_' + param.SCHED_ID).val(param.WORK_COST);
		
		param.WORKER.forEach((e2) => {
			var worker = _oam_elements.oam_010201.main.tr_worker_row({
				COMPANY_NM: e2.COMPANY_NM,
				USER_NM: e2.USER_NM,
			});
			
			// 프로퍼티 추가 
			worker = $(worker).prop('info', e2);
			$('tbody#WORKER_LIST_' + param.SCHED_ID).append(worker);
		});
	}
	
	// Date time picker 활성화 
	$('input[id*=WORK_START_TIME],input[id*=WORK_END_TIME]').not('.hasDatepicker').setDateTimePicker();
	
	// common.js
	initialControl();
	
}


/* Part, Tool, PPE, Work 추가 버튼 클릭 */
function openPopup() {
	
	var data;
	
	var TYPE = $(this).attr('id').split('_')[0].toUpperCase();
	
	if(['PART', 'TOOL', 'PPE', 'WORKER'].includes(TYPE)) $('div#layerPopup').attr('class', 'layer-popup-planing');
	
	var scroll_target = '.base_grid_table';
	
	if(TYPE === 'PART' || TYPE === 'TOOL' || TYPE === 'PPE') {
		
		// 팝업창 콘텐츠 생성, 삽입
		var sample = _oam_elements.oam_010201.popup.item_content({
			TITLE: TYPE,
			TYPE: TYPE,
		});
		$('div#layerPopup').html(sample);
		
		// 셀렉트 박스 데이터 조회
		data = _oam.mariaDB.getData('/oam2/oam_0100/02/planRegister/getPartList.ajax', {
			PART_TYPE: TYPE,
			EVENT_ID: $('input#EVENT_ID').val(),
		});
		console.log(data);
		
		// 카테고리 option 생성, 삽입
		data.forEach((e) => {
			// 생성, 프로퍼티 추가
			var option = $('<option>' + e.CODE + ' ' + e.CATEGORY + '</option>').prop('info', {
				EVENT_ID: e.EVENT_ID,
				GERATOR_ID: e.GERATOR_ID,
				PART_CD: e.PART_CD,
				PART_ID: e.PART_ID,
				CODE: e.CODE,
				CATEGORY: e.CATEGORY,
				PART_NM: e.PART_NM,
				TYPE: TYPE,
				// 부품 재고 리스트 
				ITEM_ID_LIST: JSON.parse(e.ITEM_ID_LIST),
				ITEM_NM_LIST: JSON.parse(e.ITEM_NM_LIST),
				PRICE_USD_LIST: JSON.parse(e.PRICE_USD_LIST),
				STATE_LIST: JSON.parse(e.STATE_LIST),
			});
			// 삽입
			$('select#popup_category').append(option);
		});
		
		// 카테고리 셀렉트 박스 변경 이벤트 
		$('select#popup_category').change(selectboxChange);
	} 
	else if(TYPE === 'WORKER') {
		// 팝업창 콘텐츠 생성, 삽입
		var content = _oam_elements.oam_010201.popup.worker_content({
			TITLE: 'Select Worker',
			TYPE: TYPE,
			TARGET_ID: $(this).attr('id').split('_')[3],
		});
		$('div#layerPopup').html('').html(content);
		// row 생성 
		createSearchPopupRow(TYPE);
	}
	
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
	
	// Date Picker 활성화
	$('#layerPopup input.datetimepicker').not('.hasDatepicker').setDateTimePicker('yy-mm-dd');
	
	// 팝업 닫기 버튼 이벤트
	$('a#popup_close').click(closePopup);
	
	// 팝업 등록 버튼 이벤트
	$('a#popup_register').click(closePopup);
	
	// 팝업창 활성화 
	$('div#layerPopup').addClass('active');
	
	/*
	 * 	selectbox 이벤트 => /script/common/common.js
	 *  : selectbox 변경 시, label 변경 
	 */
	initialControl();
}

/* popup 닫기, 등록 버튼 클릭 시 event */
function closePopup() {
	
	// 등록, 닫기 여부 체크  
	var isRegister = $(this).attr('id').split('_')[1] === 'register';
	
	// type 체크 
	var type = $(this).parents('div.layer-cont').attr('popup-type');
	
	var rowId; 
	// 등록 일 경우 and PART, TOOL, PPE
	if(isRegister && ['PART', 'TOOL', 'PPE'].includes(type)) {
		
		// 정규 표현식 체크 => 등록 + 체크 실패 일 경우 리턴 
		if(isRegister && !validationCheck('#layerPopup')) return;
		
		// DATE TIME 추출 => PART, TOOL, PPE 공통  
		var datetime = $('#layerPopup input.datetimepicker').toArray().reduce((acc, e) => {
			e.id.includes('start') ? acc['START_TIME'] = $(e).val() : acc['END_TIME'] = $(e).val();
		    return acc;
		}, {});
		
		// DB 저장 용 Local Time => UTC Time
		datetime.START_TIME_UTC = moment.tz(datetime.START_TIME, _CLIENT.CLIENT_ACCESS_TIMEZONE).tz('UTC').format('YYYY-MM-DD HH:mm:ss');
		datetime.END_TIME_UTC = moment.tz(datetime.END_TIME, _CLIENT.CLIENT_ACCESS_TIMEZONE).tz('UTC').format('YYYY-MM-DD HH:mm:ss');
		
		// 선택된 option 정보 추출  
		var info = $('select#popup_item option:selected').prop('info');
		
		// rowId 생성 => 이미 등록 된 아이템을 다음 info 창에서 제외하기 위해 ITEM_ID로 등록 
		rowId = info.ITEM_ID;
		
		// DATE TIME 병합
		info = Object.assign(info, datetime);
		
		// row 생성 
		var row = _oam_elements.oam_010201.main.tr_item_row({
			TYPE: type,
			CATEGORY: info.CODE + ' ' + info.CATEGORY,
			ITEM_NM: info.ITEM_NM,
			COST: '$ ' + info.PRICE_USD,
			STATUS: '준비중',
			ID: type + '_' + rowId,
			START_TIME: info.START_TIME,
			END_TIME: info.END_TIME,
		});
		
		// row 프로퍼티 추가 
		row = $(row).prop('info', info);
		
		// row 추가 
		$('tbody#' + type + '_LIST').append(row);
		
		// row 삭제 버튼 클릭 이벤트
		$('#tr_' + type + '_' + rowId + ' span.delete-btn').css('cursor', 'pointer').click(function() {
			// 삭제 컨펌 
			if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			// row 삭제
			$(this).parents('tr').remove();
			// 총 작업 시간 계산
			checkPlanningTime();
		});
		
		// 총 작업 시간 계산
		if(isRegister) checkPlanningTime();
	
	} 
	// 등록 일 경우 and WORK
	else if(isRegister && ['WORKER'].includes(type)) {
		
		var target_id = $(this).parents('.layer-cont').attr('target-id');
		var info_list = $('tbody#popup_list input[type=checkbox]:checked').parents('tr').toArray().map((e) => $(e).prop('info'));
		// WORKER_LIST 비우기
		$('tbody#WORKER_LIST_' + target_id).html('');
		
		info_list.forEach((e) => {
			// row 생성 
			var row = _oam_elements.oam_010201.main.tr_worker_row({
				COMPANY_NM: e.COMPANY_NM,
				USER_NM: e.USER_NM,
			});
			// row 프로퍼티 추가 
			row = $(row).prop('info', e);
			// row 추가
			$('tbody#WORKER_LIST_' + target_id).append(row);
		});
	}
	
	$('div#layerPopup').html('').removeClass('active');
}

function createSearchPopupRow(TYPE, param={}) {
	// popup list 비우기 
	$('tbody#popup_list').html('');
	
	// data 조회 
	var data = _oam.mariaDB.getData(ctx + '/oam2/oam_0100/popupData/' + TYPE + '.ajax', param);
	console.log(TYPE, param, data);
	
	// row 생성, 프로퍼티 추가, 삽입
	data.forEach((e) => {
		// row 생성
		var row;
		
		if(TYPE === 'WORKER') {
			
			var select_list = $('tbody#WORKER_LIST_' + $('#layerPopup .layer-cont').attr('target-id') + ' tr').toArray().map((e2) => $(e2).prop('info').USER_UID);
			
			// row 생성
			row = _oam_elements.oam_010201.popup.tr_worker_row({
				ID: e.USER_UID,
				COMPANY_NM: e.COMPANY_NM,
				LOGO_PATH: ctx + '/imageView' + e.FLE_PATH + '/' + e.NEW_FLE_NM,
				USER_NM: e.USER_NM,
				CHECKED: select_list.includes(e.USER_UID),
			});
		}
		
		// 프로퍼티 추가 
		row = $(row).prop('info', e);
		// css, 이벤트 추가 : 팝업 리스트 tr(row) 클릭 이벤트 : tr 클릭 시 check 박스 활성화
		row = $(row).css('cursor', 'pointer').click(function() {
			if($(this).find('input[type=radio], input[type=checkbox]').is('input:checked')) 
				$(this).find('input[type=radio], input[type=checkbox]').prop('checked', false);
			else 
				$(this).find('input[type=radio], input[type=checkbox]').prop('checked', true);
		});
		// 삽입
		$('tbody#popup_list').append(row);
	});
}


/* popup - 카테고리 selectbox 변경 될 때 이벤트 */
function selectboxChange() {
	var option = $(this).children('option:selected');
	
	var info = $(option).prop('info');
	console.log(info);
	
	// 기본 option 선택, 기본 이외 option 삭제, label	변경
	$('select#popup_item option:eq(0)').prop('selected', true);
	$('select#popup_item option:gt(0)').remove();
	$('select#popup_item').siblings('label').text($('select#popup_item option:eq(0)').text());
	
	// PART, TOOL, PPE
	// 기본 option 이외 option 선택 할 경우 
	if($(option).val() != '' && info && info.TYPE != 'WORK') {
		
		// 현재 추가된 아이템 list(ITEM_ID) 추출 
		var add_item_list = $('tr[id*=tr_' + info.TYPE.toLowerCase() + ']').toArray().map((e) => $(e).prop('info').ITEM_ID);
		
		info.ITEM_ID_LIST.forEach((e, i) => {
			// 현재 추가된 item 인지? true: return, false: option 생성 
			var isAdded = add_item_list.includes(e);
			if(isAdded) return;
			
			// item option 생성 
			var option = $('<option>' + info.ITEM_NM_LIST[i] + '</option>').prop('info', {
				EVENT_ID: info.EVENT_ID,
				GERATOR_ID: info.GERATOR_ID,
				PART_CD: info.PART_CD,
				PART_ID: info.PART_ID,
				CODE: info.CODE,
				CATEGORY: info.CATEGORY,
				PART_NM: info.PART_NM,
				TYPE: info.TYPE,
				ITEM_ID: e,
				ITEM_NM: info.ITEM_NM_LIST[i],
				PRICE_USD: info.PRICE_USD_LIST[i],
				// 부품의 이전 상태 
				PREVIOUS_STATE: info.STATE_LIST[i],
				// 부품의 현재 상태 => 계획 중이므로  
				STATE: 'P'
			});
			$('select#popup_item').append(option);
		});
	} 
	
	// WORK
	// 기본 option 이외 option 선택 할 경우 
	else if($(option).val() != '#' && info && info.TYPE == 'WORK') {
		// 기본 option 선택, 기본 이외 option 삭제, label	변경
		$('select#popup_worker option:eq(0)').prop('selected', true);
		$('select#popup_worker option').filter($(option)).remove();
		$('select#popup_worker').siblings('label').text($('select#popup_worker option:eq(0)').text());
		
		// worker 아이콘 생성
		var span = _oam_elements.oam_010201.popup.worker_icon({WORKER_NAME: info.USER_NM});
		span = $(span).prop('info', info);
		
		// 삽입 
		$('div#popup_worker_list').append(span);
	}
}

/* 정규 표현식 체크 */ 
function validationCheck(root='') {
	
	var check;
	
	// validation-check 
	check = $(root + ' [validation-check]').vcCheck();
	
	// Date 비교 : start > end = error
	var a = $('input#popup_start_time').val();
	var b = $('input#popup_end_time').val();
	if(a && b) {
		a = moment(a), b = moment(b);
		if(b.isBefore(a)) {
			$('input#popup_start_time').vcWarning(_MESSAGE.common.timeError);
			$('input#popup_end_time').vcWarning(_MESSAGE.common.timeError);
			check = false;
		}
	}
	if(root !== '#layerPopup') {
		// Worker 빠진 경우 체크 
		var no_worker_list = $('tbody[id*=WORK_] tbody[id*=WORKER_LIST]').toArray().filter((e) => {
		    if($(e).find('tr').length === 0) return e;
		});
		if(check && no_worker_list.length > 0) {
			alert(_MESSAGE.oam.noWorker);
			_oam.moveScrollToTargetPosition(no_worker_list[0]);
			check = false;
		}
		
		// Work 타임 에러 
		$('tbody[id*=WORK_]').toArray().filter((e) => {
			var a = $(e).find('input[id*=WORK_START_TIME]').val();
			var b = $(e).find('input[id*=WORK_END_TIME]').val();
			if(a && b) {
				a = moment(a), b = moment(b);
				if(b.isBefore(a)) {
					$(e).find('input[id*=WORK_START_TIME]').vcWarning(_MESSAGE.common.timeError);
					$(e).find('input[id*=WORK_END_TIME]').vcWarning(_MESSAGE.common.timeError);
					check = false;
				}
			}
		});
	}
	return check; 
}

/* 저장 */
function save() {
	
	// validation check
	if(!validationCheck('')) return;
	
	// 파라미터 생성
	var param = createParameter();
	console.log(param);
	
	// 저장
	data = _oam.mariaDB.getData('/oam2/oam_0100/02/planRegister/savePlan.ajax', param);
	console.log(data);
	
	// 저장 후 처리
	if(data) {
		if(data.INSERT_PLAN_CNT > 0 || data.UPDATE_PLAN_CNT > 0) {
			alert(_MESSAGE.common.saveSuccess);
			if($('input#FROM_TOTALVIEW').val() === 'Y') window.location = ctx + '/oam2/oam_0500/totalView?EVENT_ID=' + data.EVENT_ID; 
			else window.location = ctx + "/oam2/oam_0100/02/planDetail?EVENT_ID=" + data.EVENT_ID + '&PLAN_ID=' + data.PLAN_ID; 
		} else {
			alert(_MESSAGE.common.saveFail);
		}
	} else {
		alert(_MESSAGE.common.saveFail);
	}
}

/* 파라미터 생성 */ 
function createParameter() {
	
	var param = {};
	
	// INSERT AND UPDATE
	param.PROCESS = $('input#PROCESS').val();
	if($('input#PROCESS').val() === 'UPDATE') param.PLAN_ID = $('input#PLAN_ID').val();
	
	
	// WT_PLAN_MGNT
	param.EVENT_ID = $('#EVENT_ID').val()
	param.GERATOR_ID = $('#GERATOR_ID').val()
	param.COMPANY_ID = $('#COMPANY_ID').val()
	
	param.PLAN_NM = $('#PLAN_NM').val();
	
	// PLAN START, END TIME Local => UTC 변환 
	param.PLAN_START_TIME_UTC = moment.tz($('#PLAN_START_TIME').val(), _CLIENT.CLIENT_ACCESS_TIMEZONE).tz('UTC').format('YYYY-MM-DD HH:mm:ss');
	param.PLAN_END_TIME_UTC = moment.tz($('#PLAN_END_TIME').val(), _CLIENT.CLIENT_ACCESS_TIMEZONE).tz('UTC').format('YYYY-MM-DD HH:mm:ss');
	
	// PART, TOOL, PPE, PARAM 생성 
	var schedule = $('tr[id*="tr_"]').toArray().reduce((acc, e) => {
		var info = $(e).prop('info');
		// 제일 처음 배열 생성
		if(!acc[info.TYPE + '_LIST']) acc[info.TYPE + '_LIST'] = [];
		// 이후 push
		acc[info.TYPE + '_LIST'].push(info);
		return acc;
	}, {});
	
	// JSON => JSONString 
	if(schedule['PART_LIST']) schedule['PART_LIST'] = JSON.stringify(schedule['PART_LIST']);
	if(schedule['TOOL_LIST']) schedule['TOOL_LIST'] = JSON.stringify(schedule['TOOL_LIST']);
	if(schedule['PPE_LIST']) schedule['PPE_LIST'] = JSON.stringify(schedule['PPE_LIST']);
	
	
	param.WORK_LIST = $('div#WORK_LIST tbody[id*=WORK_]').toArray().map((e) => {
		var work = {};
		var info = $(e).prop('info');
		work.PROCESS = info.PROCESS; 
		work.WORK_TITLE = $(e).find('input[id*=WORK_NM]').val();
		work.WORK_DETAIL = $(e).find('textarea[id*=WORK_DETAIL]').val();
		work.WORK_COST = $(e).find('input[id*=WORK_COST]').val();
		work.START_TIME = $(e).find('input[id*=WORK_START_TIME]').val();
		work.START_TIME_UTC = moment.tz($(e).find('input[id*=WORK_START_TIME]').val(), _CLIENT.CLIENT_ACCESS_TIMEZONE).tz('UTC').format('YYYY-MM-DD HH:mm:ss'); 
		work.END_TIME = $(e).find('input[id*=WORK_END_TIME]').val();
		work.END_TIME_UTC = moment.tz($(e).find('input[id*=WORK_END_TIME]').val(), _CLIENT.CLIENT_ACCESS_TIMEZONE).tz('UTC').format('YYYY-MM-DD HH:mm:ss');
		work.WORKERS = $(e).find('tbody[id*=WORKER_LIST] tr').toArray().map((e) => $(e).prop('info'));
		work.TYPE = 'WORK';
		return work; 
	});
	// JSON => JSONString 
	param.WORK_LIST = JSON.stringify(param.WORK_LIST);
	
	return Object.assign(param, schedule);
}

/* 총 작업 시간 계산 */
function checkPlanningTime() {
	
	// 현재 등록 된 PART, TOOL, PPE, WORK 의 TIME을 전체 체크
	//var time = $('tr[id*=tr_]').toArray().reduce((acc, e) => {
	var time = $('tr[id*=tr_], tbody[id*=WORK_]').not('[style*=none]').toArray().reduce((acc, e) => {
		
		// tr 일 경우 (PART, TOOL, PPE)
		if($(e).is('tr')) {
			var info = $(e).prop('info');
			acc.push({START_TIME: info.START_TIME, END_TIME: info.END_TIME});
		} 
		// tbody 일 경우 (WORK)
		else if($(e).is('tbody')) {
			acc.push({
				START_TIME: $(e).find('input[id*=WORK_START_TIME_]').val(),
				END_TIME: $(e).find('input[id*=WORK_END_TIME_]').val(),
			});
		}
	    
		return acc;
	}, []).reduce((acc, e, i) => {
		// 제일 처음 입력
		if(i==0) acc = {START_TIME: e.START_TIME, END_TIME: e.END_TIME};
		// START 비교
	    if(moment(e.START_TIME).isBefore(acc.START_TIME)) acc.START_TIME = e.START_TIME;
	    // END 비교
	    if(moment(e.END_TIME).isAfter(acc.END_TIME)) acc.END_TIME = e.END_TIME;
	    return acc;
	}, {});
	
	// 시간 표시 
	$('#PLAN_START_TIME').val(time.START_TIME);
	$('#PLAN_END_TIME').val(time.END_TIME);
	
	// 총 작업시간 표시 
	$('span#PLAN_TOTAL_TIME').text(_oam.toStringTimeDiff({START:time.START_TIME, END: time.END_TIME}));
}

/* 수정 페이지에서 실행 될 초기화 함수 */
function modifyInit() {
	// 데이터 조회
	var data = _oam.mariaDB.getData('/oam2/oam_0100/02/planDetail/getPlanInfo.ajax', {
		EVENT_ID: $('input#EVENT_ID').val(),
		PLAN_ID: $('input#PLAN_ID').val(),
	});
	if(!data) return;
	
	// 데이터 변환
	console.log(data);
	data = _oam.convertData.PLAN(data);
	console.log(data);
	
	// REPORT NAME
	//$('input#PLAN_NM_EN').val(data.PLAN_NM_EN);
	$('input#PLAN_NM').val(data.PLAN_NM);
	// WTG NAME
	$('span#GERATOR_NM').text(data.GERATOR_NM);
	// COMPANY NAME
	$('span#COMPANY_NM').text(data.COMPANY_NM);
	
	// PLAN TIME
	// 계획 시작, 종료 시간 표기 
	$('input#PLAN_START_TIME').val(data.PLAN_START_TIME);
	$('input#PLAN_END_TIME').val(data.PLAN_END_TIME);
	// 총 계획 시간 표시 
	$('span#PLAN_TOTAL_TIME').text(_oam.toStringTimeDiff({START:data.PLAN_START_TIME, END:data.PLAN_END_TIME}));
	
	// PART
	data.PART_LIST.forEach((e) => {
		var info = {
			TYPE: e.TYPE,
			CATEGORY: e.CATEGORY,
			ITEM_ID: e.ITEM_ID,
			ITEM_NM: e.ITEM_NM,
			COST: e.COST,
			STATUS: e.STATUS,
			START_TIME: e.START_TIME,
			END_TIME: e.END_TIME,
			START_TIME_UTC: e.START_TIME_UTC,
			END_TIME_UTC: e.END_TIME_UTC,
			ID: e.TYPE.toLowerCase() + '_' + e.ITEM_ID,
		};
		var sample = _oam_elements.oam_010201.main.tr_item_row(info);
		sample = $(sample).prop('info', info);
		$('#PART_LIST').append(sample);
	});
	
	// TOOL
	data.TOOL_LIST.forEach((e) => {
		var info = {
			TYPE: e.TYPE,
			CATEGORY: e.CATEGORY,
			ITEM_ID: e.ITEM_ID,
			ITEM_NM: e.ITEM_NM,
			COST: e.COST,
			STATUS: e.STATUS,
			START_TIME: e.START_TIME,
			END_TIME: e.END_TIME,
			START_TIME_UTC: e.START_TIME_UTC,
			END_TIME_UTC: e.END_TIME_UTC,
			ID: e.TYPE.toLowerCase() + '_' + e.ITEM_ID,
		};
		var sample = _oam_elements.oam_010201.main.tr_item_row(info);
		sample = $(sample).prop('info', info);
		$('#TOOL_LIST').append(sample);
	});
	
	// PPE
	data.PPE_LIST.forEach((e) => {
		var info = {
			TYPE: e.TYPE,
			CATEGORY: e.CATEGORY,
			ITEM_ID: e.ITEM_ID,
			ITEM_NM: e.ITEM_NM,
			COST: e.COST,
			STATUS: e.STATUS,
			START_TIME: e.START_TIME,
			END_TIME: e.END_TIME,
			START_TIME_UTC: e.START_TIME_UTC,
			END_TIME_UTC: e.END_TIME_UTC,
			ID: e.TYPE.toLowerCase() + '_' + e.ITEM_ID,
		};
		var sample = _oam_elements.oam_010201.main.tr_item_row(info);
		sample = $(sample).prop('info', info);
		$('#PPE_LIST').append(sample);
	});
	
	// WORK
	data.WORK_LIST.forEach((e, i) => {
		addWork(e);
//		var sample = _oam_elements.oam_010201.main.div_work_row({
//			ID: e.SCHED_ID,
//		});
//		$('#WORK_LIST').append(sample);
//		
//		$('input#WORK_NM_' + e.SCHED_ID).val(e.WORK_TITLE);
//		$('textarea#WORK_DETAIL_' + e.SCHED_ID).val(e.WORK_DETAIL);
//		$('input#WORK_START_TIME_' + e.SCHED_ID).val(e.START_TIME);
//		$('input#WORK_END_TIME_' + e.SCHED_ID).val(e.END_TIME);
//		$('input#WORK_COST_' + e.SCHED_ID).val(e.WORK_COST);
//		
//		e.WORKER.forEach((e2) => {
//			var worker = _oam_elements.oam_010201.main.tr_worker_row({
//				COMPANY_NM: e2.COMPANY_NM,
//				USER_NM: e2.USER_NM,
//			});
//			worker = $(worker).prop('info', e2);
//			$('tbody#WORKER_LIST_' + e.SCHED_ID).append(worker);
//		});
	});
	
	// 삭제 버튼 이벤트 추가
	$('tr[id*=tr_] span.delete-btn').click(function(){
	    $(this).parents('tr').remove();
	    checkPlanningTime();
	});
}



