/* 검색 조건  */
var _search;
(function(window){
	
	/* 생성자 */
	function Search(a, b, c){
		//null check
		this.ALL = a || null;	
		this.A = b || null;	
		this.B = c || null;
	};
	
	/* 현재 입력값 자동 셋팅 */
	Search.prototype.autoSet = function(){
		this.ALL = $('input#SEARCH_CRITERIA_ALL').val() || null;
		this.A = $('input#SEARCH_CRITERIA_A').val() || null;
		this.B = $('input#SEARCH_CRITERIA_B').val() || null;
		return this;
	} 
	
	/* 입력 폼 리셋 */
	Search.prototype.resetForm = function(target) {
		if(target) {
			if($(target).prop('tagName') === 'SELECT') {
				$(target + " option:eq(0)").prop("selected", true);
				$(target).siblings('label').text($(target + " option:eq(0)").text());
			} else if($(target).prop('tagName') === 'INPUT') {
				$(target).val('');
			}
		} else {
			$('input#SEARCH_CRITERIA_A').val('');
			$('input#SEARCH_CRITERIA_B').val('');
		}
		return this;
	}
	
	/* 검색 조건 set */
	Search.prototype.set = function(k, v){
		if(this.hasOwnProperty(k)) this[k] = v;
		return this;
	}
	
	/* 특정 검색 조건 get */
	Search.prototype.get = function(k, v){
		return this[k];
	}
	
	/* 모든 검색 조건 get */
	Search.prototype.getAll = function(k, v){
		return this;
	}
	
	/* 모든 검색 조건 parameter형식(xml 검색 조건) 으로 get */
	Search.prototype.getParam = function() {
		var param = {};
		if(this.ALL) param.SEARCH_ALL = this.ALL;
		if(this.A) param.SEARCH_ALARM_SUB_CD = this.A;
		if(this.B) param.SEARCH_ALARM_TXT = this.B;
		return param;
	}
	
	/* 검색 조건 초기화 */
	Search.prototype.reset = function() {
		this.ALL = null;
		this.A = null;
		this.B = null;
		return this;
	}
	
	/* 생성자 */
	window.Search = Search;
	_search = new Search();
	
})(window);

function sys0901() {
	// 검색 버튼(TURBINE-MODEL)
	$('button[id*=SEARCH_BTN]').css('cursor', 'pointer').click(openPopup);
	
	// 저장 버튼 클릭
	$('span#SAVE_BTN').click(save);
	
	// UPDATE 일 경우, 수정 페이지 초기화 함수 실행 
	if($('input#PROCESS').val() === 'UPDATE') modifyInit();
	// INSERT 일 경우,
	else if($('input#PROCESS').val() === 'INSERT') {
		// NO_DATA 행 삽입
		$('tbody#ALARM_LIST').append('<tr class="NO_DATA"><td colspan="9">No Data</td></tr>');
		
		// 페이징 숨김
		$('div#PAGENATION').css('display', 'none');
		$('.search-wrapper').css('display', 'none');
		$('.total-wrap').css('display', 'none');
	}
	
	// 등록 버튼 
	$('a#REGISTER_BTN').click(openPopup);
}

function openPopup(evnet) {
	
	if(['I', 'SPAN'].includes(event.target.tagName)) return;
	
	var TYPE = $(this).attr('id').split('_')[0].toUpperCase();
	
	var scroll_target = '.base_grid_table';
	
	/* TURBINE-MODEL */
	if(TYPE === 'TURBINE-MODEL') {
		var content = _sys_elements.sys_0901.popup.model_content({
			TITLE: 'Select a Turbine Model',
			TYPE: TYPE,
		});
		$('div#layerPopup').html('').html(content);
		// row 생성 
		createSearchPopupRow(TYPE);
	}
	/* 알람 코드 등록 창 */
	else if(['REGISTER', 'ALARM'].includes(TYPE)) {
		var content = _sys_elements.sys_0901.popup.alarm_content({
			TITLE: 'Register Alarm code',
			TYPE: TYPE,
		});
		$('div#layerPopup').html('').html(content);
		
		// 스크롤 대상 지정
		scroll_target = '#scroll_target';
		
		// 추가 버튼 클릭 (ACTION, PART, TOOL, PPE )
		$('.layer-cont a[id*=ADD_BTN]').click(function() {
			// row(Action, Part, Tool, PPE) 생성
			var row = _sys_elements.sys_0901.popup.div_alarm_detail_row({TYPE: $(this).attr('id').split('_')[0]});
			
			// 삭제 버튼 클릭 (ACTION, PART, TOOL, PPE)
			row = $(row).find('.delete-btn').click(function() {
				$(this).parents('.input-group-wrapper').remove();
			}).parents('.input-group-wrapper');
			
			// 추가
			$(this).before(row);
			initialControl();
		});
		
		// 수정 일 경우, 
		if(TYPE === 'ALARM') {
			// 값 채우기 
			var info = $(this).prop('info');
			$('input#WT_ALARM_ID').prop('info', info);
			$('input#ALARM_SUB_CD').val(info.ALARM_SUB_CD);
			$('input#ALARM_TXT').val(info.ALARM_TXT);
			$('textarea#ALARM_DESCRPT').val(info.ALARM_DESCRPT);
			$('textarea#ALARM_SUGGEST').val(info.ALARM_SUGGEST);
			['ACTION', 'PART', 'TOOL', 'PPE'].forEach((e) => {
				info['ALARM_' + e + '_LIST'].forEach((e2) => {
					// row 생성
					var row = _sys_elements.sys_0901.popup.div_alarm_detail_row({TYPE:e});
					// 삭제 버튼 클릭
					row = $(row).find('.delete-btn').click(function() {
						$(this).parents('.input-group-wrapper').remove();
					}).parents('.input-group-wrapper');
					
					$(row).find('input#' + e + '_NM').val(e2[e+'_NM']);
					
					// 추가
					$('#' + e + '_ADD_BTN').before(row);
				});
			});
			initialControl();
		}
		// 중복 체크 버튼 클릭
		$('button#DUPLICATE_CHECK_BTN').click(duplicateCheck);
		// 팝업 등록 버튼 클릭
		$('span#popup_register').click(closePopup);
		// 팝업 닫기 버튼 클릭
		$('span#popup_close').click(closePopup);
		// 팝업 삭제 버튼 클릭
		$('span#popup_delete').click(closePopup);
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
			createSearchPopupRow(type, {SEARCH_ALL: $(this).val()});
		}
	});
	// 팝업 검색창 새로고침 버튼 이벤트 
	$('a#popup_search_refresh').css('cursor', 'pointer').click(function() {
		$('input#popup_search').val('');
		var type = $(this).parents('div.layer-cont').attr('popup-type');
		createSearchPopupRow(type, {});
	});
	
	// 팝업 닫기 버튼 이벤트
	$('a#popup_close').click(closePopup);
	
	// 팝업 등록 버튼 이벤트
	$('a#popup_register').click(closePopup);
	
	// 팝업창 활성화 
	$('div#layerPopup').addClass('active');
	
	initialControl();
}

function closePopup() {
	// 등록, 닫기 삭제 버튼 
	var button = $(this).attr('id').split('_')[1];
	// 등록, 닫기 여부 체크  
	var isRegister = (button === 'register');
	// type 체크 
	var type = $(this).parents('div.layer-cont').attr('popup-type');
	
	// TURBINE-MODEL 등록 일 경우  
	if(isRegister && ['TURBINE-MODEL'].includes(type)) {
		// 체크 리스트 조회
		var check_list = $('tbody#popup_list input[type="radio"]:checked, tbody#popup_list input[type="checkbox"]:checked');
		// 체크 항목 없을 경우 
		if(!check_list.length) return;
		// 체크 항목 정보 가져오기  
		var info_list = check_list.toArray().map((e) => $(e).parents('tr').prop('info'));
		
		// input value, property 세팅
		if(type === 'TURBINE-MODEL') {
			$('input#TURBINE-MODEL').val(info_list[0].MODEL_NM);
			$('input#TURBINE-MODEL').prop('info', info_list[0]);
			
			$('input#ALARM_GROUP_CODE').val(info_list[0].MODEL_CODE + info_list[0].MANUFACTURER_CODE + info_list[0].CAPACITY_CODE);
			$('input#CODE_A').val(info_list[0].MODEL_CODE);
			$('input#CODE_B').val(info_list[0].MANUFACTURER_CODE);
			$('input#CODE_C').val(info_list[0].CAPACITY_CODE);
		}
	}
	else if(isRegister && ['REGISTER', 'ALARM'].includes(type)) {
		
		if(!validationCheck('.layer-cont')) return;
		
		var time = moment();
		var detail_list = $('#ACTION_LIST, #PART_LIST, #TOOL_LIST, #PPE_LIST').find('input[id*=_NM]').toArray().reduce((acc, e, i) => {
			var t = $(e).attr('id').split('_')[0], tmp = {};
			tmp[$(e).attr('id')] = $(e).val();
			acc['ALARM_' + t +'_LIST'].push(tmp);
			acc['ALARM_' + t +'_CNT'] = acc['ALARM_' + t +'_LIST'].length; 
			return acc;
		}, {ALARM_ACTION_LIST: [], ALARM_PART_LIST: [], ALARM_TOOL_LIST:[], ALARM_PPE_LIST: [], ALARM_ACTION_CNT:0, ALARM_PART_CNT:0, ALARM_TOOL_CNT:0, ALARM_PPE_CNT:0 });
			
		var param = Object.assign({
			PROCESS: 'INSERT',
			WT_ALARM_ID: time.valueOf(),
			ALARM_SUB_CD: $('input#ALARM_SUB_CD').val(),
			ALARM_TXT: $('input#ALARM_TXT').val(),
			ALARM_DESCRPT: $('textarea#ALARM_DESCRPT').val(),
			ALARM_SUGGEST: $('textarea#ALARM_SUGGEST').val(),
			INS_DT: time.tz(_CLIENT.CLIENT_ACCESS_TIMEZONE).format('YYYY-MM-DDTHH:mm:ss'),
			INS_DT_UTC: time.tz('UTC').format('YYYY-MM-DDTHH:mm:ss'),
		}, detail_list);
		
		/********* UPDATE **********/
		if($('#PROCESS').val() === 'UPDATE') {
			if(type === 'REGISTER') {
				var new_param = {};
				new_param.WT_ALARM_GR_ID = $('input#WT_ALARM_GR_ID').val();
				new_param.ALARM_LIST = JSON.stringify([param]);
				var data = _sys.mariaDB.getData(ctx + '/sys_new/sys_0900/popupData/insertAlarmCode.ajax', new_param);
				if(data.INSERT_ALARM_CODE_CNT > 0) onSearch();
			}
			else if(type === 'ALARM') {
				var new_param = {};
				param.WT_ALARM_ID = $('input#WT_ALARM_ID').prop('info').WT_ALARM_ID;
				new_param.ALARM_LIST = JSON.stringify([param]);
				var data = _sys.mariaDB.getData(ctx + '/sys_new/sys_0900/popupData/updateAlarmCode.ajax', new_param);
				if(data.UPDATE_ALARM_CODE_CNT > 0) onSearch();
			}
			
		}
		
		
		
		
		
		/********* INSERT **********/
		if($('#PROCESS').val() === 'INSERT') {
			// 알람 row 생성
			var row = _sys_elements.sys_0901.main.tr_alarm_row(param);
			// prop 추가
			row = $(row).prop('info', param);
			// 알람 row 삭제 버튼 클릭
			row = $(row).find('.delete-btn').css('cursor', 'pointer').click(function() {
				// 삭제 여부 컨펌 
				if(!confirm(_MESSAGE.common.deleteConfirm)) return;
				// 삭제 
				$(this).parents('tr').remove();
				
				// tr 갯수 파악
				if($('tbody#ALARM_LIST tr').length) {
					// 번호 다시 매기기
					$('tbody#ALARM_LIST tr').toArray().forEach((e,i) => { $(e).find('td:eq(0)').text(i+1); });
				} else {
					// NO_DATA 행 삽입
					$('tbody#ALARM_LIST').append('<tr class="NO_DATA"><td colspan="9">No Data</td></tr>');
				}
				
			}).parents('tr');
			// 행 클릭
			row = $(row).css('cursor', 'pointer').click(openPopup);
			
			
			// 추가 일 때
			if(type === 'REGISTER') {
				// NO_DATA 삭제
				$('tbody#ALARM_LIST').find('tr.NO_DATA').remove();
				// 추가
				$('tbody#ALARM_LIST').prepend(row);
			}
			// 수정 일 때 
			else if(type === 'ALARM') {
				var info = $('input#WT_ALARM_ID').prop('info');
				// 기존 데이터(INS_DT, INS_DT_UTC, WT_ALARM_ID)와 병합 
				row = $(row).prop('info', Object.assign(param, {
					INS_DT: info.INS_DT,
					INS_DT_UTC: info.INS_DT_UTC,
//					WT_ALARM_ID: info.WT_ALARM_ID,
				}));
				// 기존 row와 교체
				$('tbody#ALARM_LIST tr#ALARM_' + info.WT_ALARM_ID).replaceWith($(row));
			}
			// 번호 다시 매기기
			$('tbody#ALARM_LIST tr').toArray().forEach((e,i) => { $(e).find('td:eq(0)').text(i+1); });
		}
		
	}
	
	// 삭제 버튼 (알람)
	else if(!isRegister && button === 'delete') {
		
		if($('#PROCESS').val() === 'INSERT') {
			// 삭제 여부 컨펌 
			if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			
			// 알람 row 삭제
			var info = $('input#WT_ALARM_ID').prop('info');
			$('tbody#ALARM_LIST tr#ALARM_' + info.WT_ALARM_ID).remove();
			// tr 갯수 파악
			if($('tbody#ALARM_LIST tr').length) {
				// 번호 다시 매기기
				$('tbody#ALARM_LIST tr').toArray().forEach((e,i) => { $(e).find('td:eq(0)').text(i+1); });
			} else {
				// NO_DATA 행 삽입
				$('tbody#ALARM_LIST').append('<tr class="NO_DATA"><td colspan="9">No Data</td></tr>');
			}
		}
		else if($('#PROCESS').val() === 'UPDATE') {
			// 삭제 여부 컨펌
			if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			// 삭제 요청
			var result = _sys.mariaDB.getData('/sys_new/sys_0900/popupData/deleteAlarmCode.ajax', {
				WT_ALARM_ID: $('#WT_ALARM_ID').prop('info').WT_ALARM_ID,
			});
			console.log(result);
			// 삭제 성공
			if(result.IS_DELETE) {
				alert(_MESSAGE.common.deleteSuccess);
				onSearch();
			}
			// Exception 발생
			else if(result.EXCEPTION){
				if(result.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
			}
			// 삭제 실패
			else {
				alert(_MESSAGE.common.deleteFail);
			}
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
	var data = _sys.mariaDB.getData(ctx + '/sys_new/sys_0900/popupData/' + TYPE + '.ajax', param);
	console.log(TYPE, param, data);
	
	// row 생성, 프로퍼티 추가, 삽입
	data.forEach((e) => {
		// row 생성
		var row;
		
		if(TYPE === 'TURBINE-MODEL') {
			// row 생성
			row = _sys_elements.sys_0901.popup.tr_model_row({
				ID: e.MODEL_ID,
				IMG_PATH: ctx + '/imageView' + e.MODEL_FLE_PATH + '/' + e.MODEL_NEW_FLE_NM,
				MODEL_NM: e.MODEL_NM,
				MANUFACTURER_LOGO_PATH: ctx + '/imageView' + e.MANUFACTURER_FLE_PATH + '/' + e.MANUFACTURER_NEW_FLE_NM,
				POWER: e.POWER ? e.POWER + ' MW' : 'X',
				ROTOR_D: e.ROTOR_D ? e.ROTOR_D + ' m' : 'X',
				TOWER_H: e.TOWER_H ? e.TOWER_H + ' m' : 'X',
			});
			// 프로퍼티 추가 
			row = $(row).prop('info', e);
			// css, 이벤트 추가 : 팝업 리스트 tr(row) 클릭 이벤트 : tr 클릭 시 checkbox, radio on/off
			row = $(row).css('cursor', 'pointer').click(_sys.clickRowsCheckOnOff);
			// 삽입
			$('tbody#popup_list').append(row);
			return false;
		}
		
		// 프로퍼티 추가 
		row = $(row).prop('info', e);
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
	console.log(param);
	
	// 저장 
	var data = _sys.mariaDB.ajax(ctx + '/sys_new/sys_0900/save.ajax', param, 'post');
	console.log(data);
	
	if(data.INSERT_ALARM_GROUP_CODE_CNT > 0 || data.UPDATE_ALARM_GROUP_CODE_CNT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = ctx + '/sys_new/sys_0900/detailForm?WT_ALARM_GR_ID=' + data.WT_ALARM_GR_ID;
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
	
	/* 팝업 창 ALARM_SUB_CD 중복체크 여부 체크 */
	if($(root + ' input#ALARM_SUB_CD').val() && !$(root + ' input#ALARM_SUB_CD').prop('readonly')) {
		$(root + ' input#ALARM_SUB_CD').vcWarning(_MESSAGE.common.duplicateCheckRequest('alarm code'));
		check = false;
	}
	
	return check; 
}

/* 파라미터 생성 */
function createParameter() {
	var param = {};
	
	if($('input#PROCESS').val() === 'UPDATE') param.WT_ALARM_GR_ID = $('input#WT_ALARM_GR_ID').val();
	param.PROCESS = $('input#PROCESS').val();
	
	/*  */
	var turbine_info = $('input#TURBINE-MODEL').prop('info');
	param.MODEL_ID = turbine_info.MODEL_ID;
	param.MODEL_CODE = turbine_info.MODEL_CODE;
	param.MANUFACTURER_CODE = turbine_info.MANUFACTURER_CODE;
	param.CAPACITY_CODE = turbine_info.CAPACITY_CODE;
	
	/*  */
	param.ALARM_NM = $('input#ALARM_NM').val();
	param.DESCRPT = $('textarea#DESCRPT').val();
	
	/* 알람 리스트 */
	param.ALARM_LIST = $('input#PROCESS').val() === 'INSERT' ? $('tbody#ALARM_LIST tr').not('tr.NO_DATA').toArray().map((e)=> { return $(e).prop('info'); }) : [];
	
	return param;
}

/* 수정 페이지에서 실행 될 초기화 함수 */
function modifyInit() {
	
	
	// 데이터 조회
	var data = _sys.mariaDB.getData('/sys_new/sys_0900/detailForm/getDetailInfo.ajax', {
		WT_ALARM_GR_ID: $('input#WT_ALARM_GR_ID').val(),
	});
	console.log(data);
	// 데이터 없을 경우 return 
	if(!data) return;
	
	// 메뉴 권한 정보 
	$('input#TURBINE-MODEL').val(data.MODEL_NM);
	$('input#TURBINE-MODEL').prop('info', {
		MODEL_ID: data.MODEL_ID,
		MODEL_CODE: data.MODEL_CODE,
		MANUFACTURER_CODE: data.MANUFACTURER_CODE,
		CAPACITY_CODE: data.CAPACITY_CODE,
	});
	$('input#ALARM_NM').val(data.ALARM_NM);
	$('textarea#DESCRPT').val(data.DESCRPT);
	$('input#ALARM_GROUP_CODE').val(data.MODEL_CODE + data.MANUFACTURER_CODE + data.CAPACITY_CODE);
	$('input#CODE_A').val(data.MODEL_CODE);
	$('input#CODE_B').val(data.MANUFACTURER_CODE);
	$('input#CODE_C').val(data.CAPACITY_CODE);
	
	/****************** 검색 *******************/ 

	// 검색 폼 토글 버튼 클릭 이벤트 
	$('a#SEARCH_TOGGLE_BTN').click(function() {
		$(this).parents('div.search-wrapper').toggleClass('active');
	});
	
	// 전체 검색 input enter 이벤트
	$('input#SEARCH_CRITERIA_ALL').keypress(function(e){
		if(e.keyCode === 13){
			// active 해제 
			var parent = $(this).parents('.search-wrapper');
			if(parent.hasClass('active')) parent.removeClass('active');
			
			// 검색 setting
			_search.autoSet().set('A',null).set('B',null).resetForm('input#SEARCH_CRITERIA_A').resetForm('input#SEARCH_CRITERIA_B');
			onSearch();
		}
	});
	
	/* 검색 조건 input */
	$('ul.detail-search-lst li input').keypress(function(e) {
		if(e.keyCode === 13) $('button#SEARCH_BTN').click();
	});
	
	// page nation 버튼 클릭 
	$('a#FST_PAGE').click(movePage);
	$('a#PRE_PAGE').click(movePage);
	$('a#NXT_PAGE').click(movePage);
	$('a#LST_PAGE').click(movePage);
	
	// 행 갯수 option change 
	$('select#PAGE_SIZE').change(onSearch);
	
	//search 버튼 클릭
	$('button#SEARCH_BTN').click(function(){
		//검색창 닫기
		$(this).parents('.search-wrapper').toggleClass('active');
		
		//검색 setting
		_search.autoSet().set('ALL',null).resetForm('input#SEARCH_CRITERIA_ALL');
		
		//page 초기화
		$('div#PAGENATION').children('.active').text(1);
		
		//검색 
		onSearch();
	});
	
	// search 리셋 버튼 클릭
	$('a#SEARCH_RESET_BTN').click(function(){
		// page 리셋
		$('div#PAGENATION').children('.active').text(1);
		//검색조건, 폼 리셋
		_search.reset().resetForm();
		onSearch();
	});
	
	onSearch();
	
}

/* 알람코드 중복 체크 */
function duplicateCheck() {
	var check = false;
	if($('#PROCESS').val() === 'INSERT') {
		
		var info = $('input#WT_ALARM_ID').prop('info');
		var me = info ? 'tr#ALARM_' + info.WT_ALARM_ID : '';
		var target_sub_code = $('input#ALARM_SUB_CD').val();
		
		var result = $('tbody#ALARM_LIST tr').not('.NO_DATA').not(me).toArray().filter((e) => $(e).prop('info').ALARM_SUB_CD === target_sub_code).length === 0;
		
		if(!target_sub_code) {
			$('input#ALARM_SUB_CD').vcCheck();
			return;
		}
		
		// 중복
		if(!result) {
			$('input#ALARM_SUB_CD').vcWarning(_MESSAGE.common.duplicateCheckFail('alarm code'));
		}
		// 중복 X
		else {
			$('input#ALARM_SUB_CD').vcSuccess(_MESSAGE.common.duplicateCheckSuccess('alarm code'));
			$('input#ALARM_SUB_CD').prop('readonly', true);
		}
		
	}
	else if($('#PROCESS').val() === 'UPDATE') {
		
		
		
		if(!$('input#ALARM_SUB_CD').val()) $('input#ALARM_SUB_CD').vcCheck();
		
		var type = $('#layerPopup .layer-cont').attr('popup-type');
		
		var param = {};
		param.WT_ALARM_GR_ID = $('input#WT_ALARM_GR_ID').val();
		param.ALARM_SUB_CD = $('input#ALARM_SUB_CD').val();
		if(type === 'ALARM') param.WT_ALARM_ID = $('input#WT_ALARM_ID').prop('info').WT_ALARM_ID;
		
		// 메시지 초기화 
		$('input#ALARM_SUB_CD').vcReset();
		
		var data = _sys.mariaDB.getData('/sys_new/sys_0900/popupData/duplicateCheck.ajax', param);
		if(data.CNT > 0) {
			$('input#ALARM_SUB_CD').vcWarning(_MESSAGE.common.duplicateCheckFail('alarm code'));
		} else {
			$('input#ALARM_SUB_CD').vcSuccess(_MESSAGE.common.duplicateCheckSuccess('alarm code'));
			$('input#ALARM_SUB_CD').prop('readonly', true);
		}
	}
}


/************ 수정 ************/
/* 검색 이벤트 */
function onSearch() {
	
	var param = {WT_ALARM_GR_ID : $('input#WT_ALARM_GR_ID').val()};
	
	// 페이징 옵션 
	param.PAGE = $('#PAGENATION').children('.active').text() ? parseInt($('#PAGENATION').children('.active').text()) : 1;
	param.PAGE_SIZE = parseInt($('select#PAGE_SIZE option:selected').val());
	
	// 검색 param까지 합치기
	param = Object.assign(param, _search.getParam());
	console.log(param);

	// 검색
	var data = _sys.mariaDB.getData(CTX + '/sys_new/sys_0900/detailForm/getAlarmList.ajax', param);
	console.log(data);
	
	// 데이터 가공
	data.LIST.forEach((e) => _sys.convertData.ALARM_LIST(e));
	console.log(data);
	
	// 토탈 갯수 표기
	$('strong#TOTAL_CNT').text(data.CNT);
	
	// row 생성
	makeList(data.LIST);
	
	// 페이지네이션 생성
	makePageNation(parseInt(data.CNT), parseInt(data.PAGE_SIZE), parseInt(data.PAGE));
}

function makeList(list) {
	// 
	$('tbody#ALARM_LIST').html('');
	
	// COMPANY 분류
	list.forEach((e) => {
		// row 생성 
		var sample = _sys_elements.sys_0901.main.tr_alarm_row(e);
		
		// row 클릭
		sample = $(sample).css('cursor', 'pointer').click(openPopup);
		// row 삭제 버튼 클릭
		sample = $(sample).find('.delete-btn').css('cursor', 'pointer').click(function(event) {
			// 삭제 여부 컨펌
			if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			// 삭제 요청
			var result = _sys.mariaDB.getData('/sys_new/sys_0900/popupData/deleteAlarmCode.ajax', {
				WT_ALARM_ID: $(this).parents('tr').prop('info').WT_ALARM_ID,
			});
			console.log(result);
			// 삭제 성공
			if(result.IS_DELETE) {
				alert(_MESSAGE.common.deleteSuccess);
				onSearch();
			}
			// Exception 발생
			else if(result.EXCEPTION){
				if(result.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
			}
			// 삭제 실패
			else {
				alert(_MESSAGE.common.deleteFail);
			}
		}).parents('tr');
		
		// 프로퍼티 추가 
		$(sample).prop('info', e);
		
		// row 추가 
		$('tbody#ALARM_LIST').append(sample);
	});
	
	// 데이터 0개 일 경우 
	if(list.length === 0) $('tbody#ALARM_LIST').append('<tr class="NO_DATA"><td colspan="8">No Data</td><tr>');
};

function makePageNation(row_cnt, row_size, current_page) {
	// 기존 pagenation 초기화
	$('div#PAGENATION').css('display', 'block');
	$('div#PAGENATION > a[class*="page"], div#PAGENATION > a[class*="PAGE"]').remove();
	
	// 생성 될 수 있는 전체 페이지 수 
	var page_cnt = parseInt(row_cnt / row_size);
	page_cnt = row_cnt % row_size > 0 ? page_cnt + 1 : page_cnt;
	$('a#FST_PAGE').prop('page', 1);
	$('a#LST_PAGE').prop('page', page_cnt);
	
	// 생성 될 페이지 수 제한 (10개)
	var mok = parseInt(current_page / 10);
	mok = current_page % 10 > 0 ? mok : mok - 1;
	//var nmg = page_cnt % 10;
	
	var s = (mok*10)+1;
	var e = (mok+1)*10 > page_cnt ? page_cnt : (mok+1)*10; 
	
	if(page_cnt > 0) {
		// pagenation 삽입
		for(var i=s; i<=e; i++) {
			var cls = i === current_page ? 'page active' : 'page';
			$('div#PAGENATION').children('#NXT_PAGE').before('<a href="javascript:void(0);" class="' + cls + '">' + i + '</a>');
		}
		// 다음 page nation이 있을 경우
		if(e < page_cnt) {
			$('div#PAGENATION').children('#NXT_PAGE').before('<a href="javascript:void(0);" class="NXT_PAGENATION">...</a>');
			$('.NXT_PAGENATION').click(function() {
				$('div#PAGENATION > a[class*="active"]').text(e+1);
				onSearch();
			});
		}
		// 이전 page nation이 있을 경우 
		if(current_page > 10) {
			$('div#PAGENATION').children('#PRE_PAGE').after('<a href="javascript:void(0);" class="PRE_PAGENATION">...</a>');
			$('.PRE_PAGENATION').click(function() {
				$('div#PAGENATION > a[class*="active"]').text(s-1);
				onSearch();
			});
		}
		// pagenation click event
		$('div#PAGENATION > a[class="page"]').click(function() {
			$(this).addClass('active');
			$(this).siblings('.active').removeClass('active');
			onSearch();
		});
	} else {
		$('div#PAGENATION').css('display', 'none');
	}
}

function movePage() {
	var process = $(this).attr('id').split('_')[0];
	var current_page = parseInt($('div#PAGENATION > a[class*="active"]').text());
	var last_page = $('#LST_PAGE').prop('page');
	
	if(current_page === 1 && (process === 'FST' || process === 'PRE')) return;
	if(current_page === last_page && (process === 'NXT' || process === 'LST')) return;
	
	var move_page;
	switch(process) {
		case 'FST':
			move_page = $(this).prop('page');
			break;
		case 'PRE':
			move_page = current_page - 1;
			break;
		case 'NXT':
			move_page = current_page + 1;
			break;
		case 'LST':
			move_page = $(this).prop('page');
			break;
	}
	$('div#PAGENATION > a[class*="active"]').text(move_page);
	onSearch();
}




