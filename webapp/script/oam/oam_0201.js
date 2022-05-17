
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
 *  
 *  textarea#ISSUE				: 이슈 내용
 *  tbody#ISSUE_FILE_LIST 		: 이슈 첨부파일 리스트 
 *  input#ADD_FILE_ISSUE		: 이슈 첨부파일 추가
 *  
 *  
 *  textarea#PURPOSE			: 목적 내용
 *  tbody#PURPOSE_FILE_LIST		: 목적 첨부파일 리스트 
 *  input#ADD_FILE_PURPOSE		: 목적 첨부파일 추가
 *  
 *  
 *  textarea#CONCLUSION			: 결론 내용 
 *  
 *  
 *  tbody#PART_LIST				: 부품 리스트
 *  span#PART_ADD_BTN 			: 부품 추가 버튼
 *  
 *  tbody#TOOL_LIST				: 도구 리스트
 *  span#TOOL_ADD_BTN 			: 부품 추가 버튼
 *  
 *  tbody#PPE_LIST				: PPE 리스트
 *  span#PPE_ADD_BTN 			: 부품 추가 버튼
 *  
 *  div#WORK_LIST				: 작업 리스트
 *  a#WORK_ADD_BTN				: 작업 추가 버튼
 *  
 *  
 *  span#SPAN_BTN 				: 저장 버튼 
 *  
 *  
 *  
 *  ## FILE element
 *  - parameter
 *  ID : numbering, FILE_SEQ
 *  TYPE : ISSUE, PURPOSE, WORK
 *  FILE_NAME : 파일명
 *  FILE_SIZE : 파일 크기
 *  FILE_EXTENSION : 파일 확장자
 *  
 *  - element
 *  li#$TYPE_FILE_$ID 			: 파일 row (li)
 *  textarea#$TYPE_FILE_INFO_$ID: 파일 row의 파일 설명 
 *  a#$TYPE_FILE_DELETE_$ID		: 파일 row의 삭제 버튼
 *  
 *  
 *  ## ITEM element
 *  - parameter
 *  ID 		  : numbering, ITEM_ID
 *  TYPE 	  : PART, TOOL, PPE
 *  CATEGORY  : 카테고리 
 *  ITEM_NAME : 아이템 이름
 *  RETURN_YN : 반납 여부
 *  
 *  - element
 *  tr#$TYPE_$ID			: 아이템 row (tr)
 *  input#CHECK_$TYPE_$ID	: 아이템 row의 반납 여부 체크 박스
 *  
 *  
 *  ## WORK element
 *  - parameter
 *  ID : numbering, PROC_WORK_ID
 *  
 *  - element
 *  tbody#WORK_$ID					: 작업 row
 *  
 *  input#WORK_MAINTEN_CD_$ID 		: 작업 row의 유지보수 코드
 *  button#WORK_MAINTEN_CD_BTN_$ID 	: 작업 row의 유지보수 코드 검색 버튼
 *  
 *  select#WORK_DIFFICULTY_$ID		: 작업 row의 난이도
 *   
 *  input#WORK_NM_$ID				: 작업 row의 작업 이름 
 *  
 *  textarea#WORK_DETAIL_$ID		: 작업 row의 작업 상세
 *  
 *  ul#WORK_FILE_LIST_$ID			: 작업 row의 첨부파일 리스트
 *  input#ADD_FILE_WORK_$ID			: 작업 row의 첨부파일 추가
 *  
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
 *  oam0201 		: 초기화 
 *  
 *  
 */
/* 초기화 */
function oam0201(){ 
	// 검색 버튼(TURBINE, COMPANY, WORKERS),
	// 추가 버튼(PART, TOOL, PPE) CSS, EVENT 추가
	$('button[id*=SEARCH_BTN], span[id*=ADD_BTN]').css('cursor', 'pointer').click(openPopup);
	// 추가 버튼(WORK) css, event 추가
	$('a[id=WORK_ADD_BTN]').css('cursor', 'pointer').click(addWork);
	// ISSUE, PURPOSR 파일 추가 버튼 change event 
	$('input[id*=ADD_FILE]').change(changeFile);
	// 저장 버튼 클릭
	$('span#SAVE_BTN').click(save);
	// INSERT 기본 Work 추가 
	if($('input#PROCESS').val() === 'INSERT') addWork();
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

/* 작업 추가 */ 
//function addWork(id = undefined) {
function addWork() {
	// id 생성 - 현재 갯수
	//id = _oam.getType(id) === 'string' ? id : $('div#WORK_LIST > div.base_grid_table > table > tbody[id*=WORK_]').length;
	//id = $('div#WORK_LIST > div.base_grid_table > table > tbody[id*=WORK_]').length;
	var id = moment().valueOf();
	
	// sample 생성
	var sample = _oam_elements.oam_0201.main.div_work_row({ID: id});
	
	/****** 추가 이벤트 ******/
	// 유지보수 코드 버튼 css, 클릭 event 추가
	sample = $(sample).find('button[id*=MAINTENCD_SEARCH_BTN_]').css('cursor', 'pointer').click(openPopup).parents('div.base_grid_table');
	// 첨부파일 변경 시 event 추가
	sample = $(sample).find('input[id*=ADD_FILE_WORK_]').change(changeFile).parents('div.base_grid_table');
	// 프로퍼티 추가 
	sample = $(sample).find('tbody[id*=WORK]').not('tbody[id*=WORK_FILE_LIST]').prop('info', {
		ID: id.toString(),
		PROCESS: 'INSERT',
	}).parents('div.base_grid_table');
	// 작업 시간(시작, 종료) 변경 event 추가, datepicker 활성화 - @TODO : EVENT 중복 적용 수정 
	$(sample).find('input.datetimepicker').change(checkReportTime).setDateTimePicker('yy-mm-dd');
	// 삭제 버튼
	sample = $(sample).find('span[id*=DELETE_BTN]').css('cursor', 'pointer').click(function() {
		// 삭제 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 작업 갯수 조회 
		var work_cnt = $('tbody[id*=WORK_]').not('tbody[id*=WORK_FILE_LIST]').toArray().filter((e) => $(e).prop('info').PROCESS !== 'DELETE').length;
		// 작업이 1개 일 경우 => 삭제 불가 
		if(work_cnt <= 1) return alert(_MESSAGE.oam.deleteWorkAlert); 
		// 정보 가져오기 
		var info = $(this).parents('div.base_grid_table').find('tbody[id*=WORK]').not('tbody[id*=WORK_FILE_LIST]').prop('info');
		// WORK 삭제 
		$(this).parents('div.base_grid_table').remove();
		// 첨부파일 삭제 
		$('#fileStorage input[name=WORK_FILE_' + info.ID + ']').remove();
	}).parents('div.base_grid_table');
	/****** 추가 이벤트 ******/
	// sample 추가
	$('div#WORK_LIST').append(sample);
	/*
	 * 	selectbox 이벤트 => /script/common/common.js
	 *  : selectbox 변경 시, label 변경 
	 */
	initialControl();
}

/* ISSUE, PURPOSE, WORK file input 변경 시 */
function changeFile() {
	//console.log(this);
	//console.log($(this));
	/*
	 * ISSUE: input#ADD_FILE_ISSUE 		/ 	LIST: tbody#ISSUE_FILE_LIST
	 * PURPOSE: input#ADD_FILE_PURPOSE	/ 	LIST: tbody#PURPOSE_FILE_LIST
	 * WORK: input#ADD_FILE_WORK_$id	/ 	LIST: tbody#WORK_FILE_LIST_$id
	 */
	var type = $(this).attr('id').split('_')[2];
	var id = type !== 'WORK' ? moment().valueOf() : $(this).attr('id').split('_')[3] + '_' + moment().valueOf();
	
	var isAcceptFile = true;
	
	// File
	const files = $(this)[0].files;
	for(const file of files) {
		console.log(file);
		console.log(type, id);
		
		// 파일 확장자 점검  
		if(!['.jpeg', '.jpg', '.png'].includes(file.name.substring(file.name.lastIndexOf('.')))) {
			alert(_MESSAGE.common.unacceptableFileExtension);
			isAcceptFile = false;
			break;
		};
		
		// File sample 생성
		var sample = _oam_elements.oam_0201.main.tr_file_row({
			ID: id,
			TYPE: type,
			FILE_NAME: file.name.substring(0, file.name.lastIndexOf('.')),
			FILE_SIZE: _oam.returnFileSize(file.size),
			FILE_TIME: file.lastModified,
			FILE_EXTENSION: file.name.substring(file.name.lastIndexOf('.')),
		});
		
		// File sample prop 추가 
		sample = $(sample).prop('info', {
			ID: id,
			TYPE: type,
			FILE_NAME: file.name.substring(0, file.name.lastIndexOf('.')),
			FILE_SIZE: file.size,
			FILE_TIME: file.lastModified,
			FILE_EXTENSION: file.name.substring(file.name.lastIndexOf('.')),
			PROCESS: 'INSERT',
		});
		
		// img tag 이미지 추가 
		var path = URL.createObjectURL(file);
		$(sample).find('img').attr('src', path);
		
		// sample의 textarea(FILE_INFO) keydown 이벤트 추가
		//sample = $(sample).find('textarea[id*=FILE_INFO]').keydown(_oam.textareaMaxLine).parents('tr');
		sample = $(sample).find('textarea[id*=FILE_INFO]').on('input', _oam.textareaMaxLine).parents('tr');
		// sample의 삭제 버튼(a) click 이벤트 추가 
		sample = $(sample).find('a.delete-btn').click(deleteFile).parents('tr');
		
		// file sample 삽입   
		var tbody = type !== 'WORK' ? 'tbody#' + type + '_FILE_LIST' : 'tbody#' + type + '_FILE_LIST_' + id.split('_')[0];
		// 처음 삽입 되는 경우 기존 no file tr 삭제 
		//$(tbody + ' tr[id*=' + type + '_FILE]').not('tr[style*=none]').length > 0 ? $(tbody).append(sample) : $(tbody + ' tr#NO_FILE').remove(); 
		if($(tbody + ' tr[id*=' + type + '_FILE]').not('tr[style*=none]').length === 0) $(tbody + ' tr#NO_FILE').remove();
		$(tbody).append(sample);
	}
	
	if(isAcceptFile) {
		// input 복사 
		var copy = _oam.copyTag(this, {id: type + '_FILE_' + id, name: type !== 'WORK' ? type + '_FILE' : type + '_FILE_' + id.split('_')[0]});
		// form에 추가
		$('form#fileStorage').append(copy);
	}
	
	// 초기화
	$(this).val(null);
}

/* 파일 삭제 */
function deleteFile() {
	// info 가져오기 d
	var info = $(this).parents('tr').prop('info');
	var tbody = $(this).parents('tbody[id*=' + info.TYPE + '_FILE_LIST]');
	
	// INSERT : tr 삭제, input(파일) 삭제 
	if(info.PROCESS == 'INSERT') {
		// file 삭제 
		$('form#fileStorage input#' + info.TYPE + '_FILE_' + info.ID).remove();
		// tr 삭제 
		$(this).parents('tr[id*=' + info.TYPE + '_FILE]').remove();
	} 
	// UPDATE : tr 숨김, 'DELETE'로 변경  
	else if(info.PROCESS == 'UPDATE') {
		// tr 감추기
		$(this).parents('tr[id*=' + info.TYPE + '_FILE]').hide();
		$(this).parents('tr[id*=' + info.TYPE + '_FILE]').prop('info').PROCESS = 'DELETE'; 
	}
	
	// tr(file)의 갯수가 없을 경우 No File 삽입 (숨김 파일 제외)
	if(tbody.find('tr').not('tr[style*=none]').length === 0) {
		var nofile = _oam_elements.oam_0201.main.tr_nofile_row({TEXT: 'No File'});
		tbody.append(nofile);
	}
}

/* 
 * 검색 버튼(TURBINE, COMPANY, WORKERS, MAINTENCD) : $taget_SEARCH_BTN  
 * 추가 버튼(PART, TOOL, PPE) : $taget_ADD_BTN
 * 클릭
 * : 팝업창 열기 
 */
function openPopup() {
	
	var TYPE = $(this).attr('id').split('_')[0].toUpperCase();
	/* PART, TOOL, PPE */
	if(TYPE === 'PART' || TYPE === 'TOOL' || TYPE === 'PPE') {
		
		// TURBINE ID 가져오기 
		var turbine_info = $('input#TURBINE').prop('info');
		
		// TURBINE 선택 여부 CHECK
		if(!turbine_info) {
			$('input#TURBINE').vcWarning(_MESSAGE.common.selectItem('wind turbine'));
			// 스크롤 이동 input#TURBINE 으로 
			_oam.moveScrollToTargetPosition('#TURBINE');
			return;
		}
		
		// 팝업 창 콘텐츠 생성, 삽입 
		var content = _oam_elements.oam_0201.popup.item_content({
			TITLE: TYPE, 
			TYPE: TYPE,	
		});
		$('div#layerPopup').html('').html(content);
		
		// 셀렉트 박스 데이터 조회
		var data = _oam.mariaDB.getData(ctx + '/oam2/oam_0200/popupData/' + TYPE + '.ajax', {
			PART_TYPE: TYPE,
			TURBINE_ID : turbine_info.TURBINE_ID
		});
		console.log(TYPE, data);
		
		// 카테고리 option 생성, 삽입
		data.forEach((e) => {
			// 생성, 프로퍼티 추가
			var option = $('<option>' + e.CODE + ' ' + e.CATEGORY + '</option>').prop('info', {
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
		
		/*** PART, TOOL, PPE 팝업 관련 이벤트 ***/
		/*
		 * 	selectbox 이벤트 => /script/common/common.js
		 *  : selectbox 변경 시, label 변경 
		 */
		initialControl();
		
		$('select#popup_category').change(selectboxChange);
	}
	/* TURBINE */
	else if(TYPE === 'TURBINE') {
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
			$('input#COMPANY').vcWarning(_MESSAGE.common.selectItem('ISP'));
			return;
		}
	
		// 팝업창 콘텐츠 생성, 삽입
		var content = _oam_elements.oam_0201.popup.worker_content({
			TITLE: 'Select Worker',
			TYPE: TYPE,
		});
		$('div#layerPopup').html('').html(content);
		// row 생성 
		createSearchPopupRow(TYPE, {COMPANY_ID: company_info.COMPANY_ID});
	}
	/* MAINTENCD */
	else if(TYPE === 'MAINTENCD') {
		// 팝업창 콘텐츠 생성, 삽입
		var content = _oam_elements.oam_0201.popup.code_content({
			TITLE: 'Select a Maintenance Code',
			TYPE: TYPE,
			WORK_ID: $(this).attr('id').split('_')[3]
		});
		$('div#layerPopup').html('').html(content);
		// row 생성 
		createSearchPopupRow(TYPE);
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
	
	// TURBINE, COMPANY, WORKERS, MAINTENCD 등록 일 경우 
	if(isRegister && ['TURBINE', 'COMPANY', 'WORKERS', 'MAINTENCD'].includes(type)) {
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
		else if(type === 'MAINTENCD') {
			var work_id = $(this).parents('div.layer-cont').attr('work-id');
			var value = info_list[0].LEV1_PRE_NM + info_list[0].LEV2_PRE_NM + ' (' + info_list[0].LEV1_SUF_NM + ' - ' + info_list[0].LEV2_SUF_NM + ')';
			$('input#WORK_MAINTEN_CD_' + work_id).val(value);
			$('input#WORK_MAINTEN_CD_' + work_id).prop('info', info_list[0]);
		}
	}
	// PART, TOOL, PPE 등록 일 경우 
	else if(isRegister && ['PART', 'TOOL', 'PPE'].includes(type)) {
		
		// 정규 표현식 체크 => 등록 + 체크 실패 일 경우 리턴 
		if(!validationCheck('#layerPopup')) return;
		
		// 선택된 option 정보 추출  
		var info = $('select#popup_item option:selected').prop('info');
		
		// row 생성 
		var row = _oam_elements.oam_0201.main.tr_item_row({
			ID: info.ITEM_ID,
			TYPE: type,
			CATEGORY: info.CODE + ' ' + info.CATEGORY,
			ITEM_NM: info.ITEM_NM,
		});
		
		// row 프로퍼티 추가
		info.PROCESS = 'INSERT';
		info.PREVIOUS_STATE = info.STATE;
		row = $(row).prop('info', info);
		
		// row 삭제 버튼 css, 이벤트 추가 
		row = $(row).find('span.delete-btn').css('cursor', 'pointer').click(itemDelete).parents('tr');

		// row item 반납 버튼 클릭 이벤트
		row = $(row).find('input[id*=CHECK_]').css('cursor', 'pointer').click(itemReturn).parents('tr');
		
		// row 추가 
		$('tbody#' + type + '_LIST').append(row);
	}
	else {
		console.log('닫기');
	}
	// popup 내용 삭제, 비활성화 
	$('div#layerPopup').html('').removeClass('active');
}

/* item 삭제 버튼 클릭 */
function itemDelete() {
	// info 가져오기 
	var info = $(this).parents('tr').prop('info');
	
	// INSERT : tr 삭제 
	if(info.PROCESS === 'INSERT') {
		// row 삭제
		$(this).parents('tr').remove();
	} 
	// UPDATE : tr 숨기기, 'DELETE'로 변경  
	else if(info.PROCESS === 'UPDATE') {
		$(this).parents('tr').hide();
		$(this).parents('tr').prop('info').PROCESS = 'DELETE';
	}
}

/* item 반납 버튼 클릭 */
function itemReturn() {
	
	var msg = $(this).parent('span').siblings('span');
	var process = $(this).parents('tr').prop('info').PROCESS;
	var tr = $(this).parents('tr');
	
	// 체크 할 경우 
	if($(this).prop('checked')) {
		var isConfirm = false;
		
		// 수정 항목 일 경우, 
		if(process === 'UPDATE') {
			isConfirm = confirm('Would you like to return it? \n Unable to revert state.');
			if(isConfirm) {
				$(this).parents('span.active-toggle-wrap').hide();
			} else {
				$(this).prop('checked', false);
				return;
			}
		}
		
		// 반납
		tr.prop('info').STATE = 'U';
		// 메세지 변경 
		msg.css('color', '#455eee').text('Return completed');
	} 
	// 체크 해제 할 경우 
	else {
		// 사용중
		tr.prop('info').STATE = 'I';
		// 메세지 변경 
		msg.css('color', '#db4453').text('Return not completed');
	}
	
	console.log(tr.prop('info').ITEM_NM, ' : ', tr.prop('info').PREVIOUS_STATE, ' => ' , tr.prop('info').STATE);
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
		else if(TYPE === 'MAINTENCD') {
			// lev1 row 생성, 삽입 
			if(!$('#tr_lev1_' + e.LEV1_CD).length) {
				row = _oam_elements.oam_0201.popup.tr_codeLEV1_row({
					ID: e.LEV1_CD,
					CODE: e.LEV1_PRE_NM,
					NAME: e.LEV1_SUF_NM,
				});
				$('tbody#popup_list').append(row);
			}
			// row 생성
			row = _oam_elements.oam_0201.popup.tr_code_row({
				ID: e.LEV2_CD,
				CODE: e.LEV1_PRE_NM + e.LEV2_PRE_NM,
				NAME: e.LEV2_SUF_NM,
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

/* 
 * # popup(PART, TOOL, PPE) - 카테고리 selectbox 변경 될 때 이벤트
 * @TODO oam_010201.js 의  selectboxChange 와 oam-common.js에 통합 
 */
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
	if($(option).val() != '' && info) {
		
		// 현재 추가된 아이템 list(ITEM_ID) 추출 
		//var add_item_list = $('tbody#' + info.TYPE + '_LIST' + ' tr[id*=' + info.TYPE + ']').toArray().map((e) => $(e).prop('info').ITEM_ID);
		var add_item_list = $('tr[id*=' + info.TYPE + ']').toArray().map((e) => $(e).prop('info').ITEM_ID);
		
		info.ITEM_ID_LIST.forEach((e, i) => {
			// 현재 추가된 item 인지? true: return, false: option 생성 
			var isAdded = add_item_list.includes(e);
			if(isAdded) return;
			
			// item option 생성 
			var option = $('<option>' + info.ITEM_NM_LIST[i] + '</option>').prop('info', {
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
				// 부품의 현재 상태 => 사용 중이므로  
				STATE: 'I'
			});
			$('select#popup_item').append(option);
		});
	} else {
		
	}
}

/* 총 작업 시간 계산 */
function checkReportTime() {
	
	// 현재 등록 된 WORK 의 TIME을 전체 체크
	var time = $('div#WORK_LIST > div.base_grid_table > table > tbody[id*=WORK_]').toArray().reduce((acc, e) => { 
		acc.push({START_TIME:$(e).find('input[id*=WORK_START_TIME]').val(), END_TIME: $(e).find('input[id*=WORK_END_TIME]').val()});
		return acc; 
	}, []).reduce((acc, e, i) => {
		if(e.START_TIME !== '' && e.END_TIME !== '') {

			//if(i==0) acc = {START_TIME: e.START_TIME, END_TIME: e.END_TIME};
			if(!acc.START_TIME) acc.START_TIME = e.START_TIME;
			if(!acc.END_TIME) acc.END_TIME = e.END_TIME;
			// START 비교
		    if(moment(e.START_TIME).isBefore(acc.START_TIME)) acc.START_TIME = e.START_TIME;
		    // END 비교
		    if(moment(e.END_TIME).isAfter(acc.END_TIME)) acc.END_TIME = e.END_TIME;
		}
		return acc;
	}, {});
	
	// 시간 표시 
	$('#RPT_START_TIME').val(time.START_TIME);
	$('#RPT_END_TIME').val(time.END_TIME);
	
	// 총 작업시간 표시 
	$('span#RPT_TOTAL_TIME').text(_oam.toStringTimeDiff({START:time.START_TIME, END: time.END_TIME}));
}


/* 
 * # 정규 표현식 체크
 * @TODO oam_010201.js 의  validationCheck 와 oam-common.js에 통합
 */ 
function validationCheck(root='') {
	var check;
	check = $(root + ' [validation-check]').vcCheck();
	
	if(root !== '#layerPopup') {
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
	if(!validationCheck('div#FORM')) return;
	
	// 파라미터 생성
	var param = createParameter();
	console.log(param);
	
	// 파일 관련 FormData 생성  
	var formData = new FormData($('#fileStorage')[0]);
	
	// WORK 갯수 추가
	//formData.append('WORK_CNT', $('tbody[id*=WORK]').length);
	
	
	// formData에 param 옮겨 닮기 
	for(let [key, value] of Object.entries(param)) {
	    console.log(key, value, _oam.getType(value));
	    
	    // 배열인 항목은 JSON String으로 변환
	    formData.append(key, 
	    		['object', 'array'].includes(_oam.getType(value)) 
	    		? JSON.stringify(value) : value);
	}
	
	// log 
	console.log('---------- 최종 Param ------------');
	for(let entry of formData.entries()) {
		console.log(entry[0], entry[1]);
	}
	
	// 저장 
	var data = _oam.mariaDB.saveFile(ctx + '/oam2/oam_0200/reportRegister/saveReport.ajax', formData);
	console.log(data);
	
	if(data.RPT_INSERT_CNT > 0 || data.RPT_UPDATE_CNT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		if($('input#FROM_TOTALVIEW').val() === 'Y') window.location = ctx + '/oam2/oam_0500/totalView?EVENT_ID=' + $('input#EVENT_ID').val();
		else if($('input#EVENT_ID').val()) window.location = ctx + '/oam2/oam_0200/reportDetail?RPT_ID=' + data.RPT_ID + '&EVENT_ID=' + $('input#EVENT_ID').val();
		else window.location = ctx + '/oam2/oam_0200/reportDetail?RPT_ID=' + data.RPT_ID;
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
		param.RPT_PROC_ID = $('input#RPT_PROC_ID').val();
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
	
	/* WT_RPT_PROC */
	param.ISSUE = $('textarea#ISSUE').val();
	param.PURPOSE = $('textarea#PURPOSE').val();
	param.CONCLUSION = $('textarea#CONCLUSION').val();
	
	/* WT_RPT_PROC_ATTS */
	// ISSUE
	var issue_files = $('tbody#ISSUE_FILE_LIST tr[id*=ISSUE_FILE_]').toArray().reduce((acc, e, i) => {
		var info = $(e).prop('info');
		// INSERT
		if(info.PROCESS === 'INSERT') {
			acc.ISSUE_FILE_LIST.push({
				FILE_INFO: $(e).find('textarea[id*=ISSUE_FILE_INFO_]').val(),
				FILE_TYPE: '1',
			});
		}
		// UPDATE
		else if(info.PROCESS === 'UPDATE') {
			acc.ISSUE_FILE_LIST_UPDATE.push({
				ATCH_FLE_SEQ: info.ATCH_FLE_SEQ,
				FILE_INFO: $(e).find('textarea[id*=ISSUE_FILE_INFO_]').val(),
			});
		}
		// DELETE 
		else if(info.PROCESS === 'DELETE') {
			acc.ISSUE_FILE_LIST_DELETE.push({
				ATCH_FLE_SEQ: info.ATCH_FLE_SEQ,
				FLE_PATH: info.FLE_PATH,
				NEW_FLE_NM: info.NEW_FLE_NM,
				FLE_TP: info.FLE_TP,
			});
		}
		return acc;
	}, {ISSUE_FILE_LIST: [], ISSUE_FILE_LIST_UPDATE: [], ISSUE_FILE_LIST_DELETE: []});
	param = Object.assign(param, issue_files);
	
	// PURPOSE
	var purpose_files = $('tbody#PURPOSE_FILE_LIST tr[id*=PURPOSE_FILE_]').toArray().reduce((acc, e, i) => {
		var info = $(e).prop('info');
		// INSERT
		if(info.PROCESS === 'INSERT') {
			acc.PURPOSE_FILE_LIST.push({
				FILE_INFO: $(e).find('textarea[id*=PURPOSE_FILE_INFO_]').val(),
				FILE_TYPE: '2',
			});
		}
		// UPDATE
		else if(info.PROCESS === 'UPDATE') {
			acc.PURPOSE_FILE_LIST_UPDATE.push({
				ATCH_FLE_SEQ: info.ATCH_FLE_SEQ,
				FILE_INFO: $(e).find('textarea[id*=PURPOSE_FILE_INFO_]').val(),
			});
		}
		// DELETE 
		else if(info.PROCESS === 'DELETE') {
			acc.PURPOSE_FILE_LIST_DELETE.push({
				ATCH_FLE_SEQ: info.ATCH_FLE_SEQ,
				FLE_PATH: info.FLE_PATH,
				NEW_FLE_NM: info.NEW_FLE_NM,
				FLE_TP: info.FLE_TP,
			});
		}
		return acc;
	}, {PURPOSE_FILE_LIST: [], PURPOSE_FILE_LIST_UPDATE: [], PURPOSE_FILE_LIST_DELETE: []});
	param = Object.assign(param, purpose_files);
	
	
	// PART
	var parts = $('tr[id*=tr_PART_]').toArray().reduce((acc, e, i) => {
		var info = $(e).prop('info');
		// INSERT
		if(info.PROCESS === 'INSERT') {
			acc.PART_LIST.push(info);
		}
		// UPDATE
		else if(info.PROCESS === 'UPDATE') {
			acc.PART_LIST_UPDATE.push(info);
		}
		// DELETE 
		else if(info.PROCESS === 'DELETE') {
			acc.PART_LIST_DELETE.push(info);
		}
		return acc;
	}, {PART_LIST: [], PART_LIST_UPDATE: [], PART_LIST_DELETE: []});
	param = Object.assign(param, parts);
	
	// TOOL
	var tools = $('tr[id*=tr_TOOL_]').toArray().reduce((acc, e, i) => {
		var info = $(e).prop('info');
		// INSERT
		if(info.PROCESS === 'INSERT') {
			acc.TOOL_LIST.push(info);
		}
		// UPDATE
		else if(info.PROCESS === 'UPDATE') {
			acc.TOOL_LIST_UPDATE.push(info);
		}
		// DELETE 
		else if(info.PROCESS === 'DELETE') {
			acc.TOOL_LIST_DELETE.push(info);
		}
		return acc;
	}, {TOOL_LIST: [], TOOL_LIST_UPDATE: [], TOOL_LIST_DELETE: []});
	param = Object.assign(param, tools);
	
	// PPE
	var ppes = $('tr[id*=tr_PPE_]').toArray().reduce((acc, e, i) => {
		var info = $(e).prop('info');
		// INSERT
		if(info.PROCESS === 'INSERT') {
			acc.PPE_LIST.push(info);
		}
		// UPDATE
		else if(info.PROCESS === 'UPDATE') {
			acc.PPE_LIST_UPDATE.push(info);
		}
		// DELETE 
		else if(info.PROCESS === 'DELETE') {
			acc.PPE_LIST_DELETE.push(info);
		}
		return acc;
	}, {PPE_LIST: [], PPE_LIST_UPDATE: [], PPE_LIST_DELETE: []});
	param = Object.assign(param, ppes);
	
	/* WT_RPT_PROC_WORK : tbody[id*=WORK_FILE_LIST] 때문에 직계자손으로 선택자 잡음 */ 
	param.WORK_LIST = $('div#WORK_LIST > div.base_grid_table > table > tbody[id*=WORK_]').toArray().map((e) => {
		var obj = {};
		var info = $(e).prop('info');
		//obj.PROC_WORK_ID = $(e).attr('id').split('_')[1];
		obj.PROC_WORK_ID = info.ID;
		obj.MAINTEN_CD = $(e).find('input[id*=WORK_MAINTEN_CD]').prop('info').LEV2_CD;
		obj.DIFFICULTY = $(e).find('select[id*=WORK_DIFFICULTY] option:selected').val();
		obj.WORK_NM = $(e).find('input[id*=WORK_NM]').val();
		obj.WORK_DETAIL = $(e).find('textarea[id*=WORK_DETAIL]').val();
		obj.START_TIME = $(e).find('input[id*=WORK_START_TIME]').val();
		obj.END_TIME = $(e).find('input[id*=WORK_END_TIME]').val();
		obj.START_TIME_UTC = moment.tz(obj.START_TIME, _CLIENT.CLIENT_ACCESS_TIMEZONE).tz('UTC').format('YYYY-MM-DD HH:mm:ss');
		obj.END_TIME_UTC = moment.tz(obj.END_TIME, _CLIENT.CLIENT_ACCESS_TIMEZONE).tz('UTC').format('YYYY-MM-DD HH:mm:ss');
		obj.DOWNTIME_YN = $(e).find('input[id*=WORK_CHECK_DOWNTIME]').prop('checked') ? 'Y' : 'N';
		obj.PROCESS = info.PROCESS;
		
		// WT_RPT_PROC_WORK_ATTS
		//obj.WORK_FILE_LIST = $(e).find('textarea[id*=WORK_FILE_INFO]').toArray().map((e) => { return {FILE_INFO: $(e).val()} });
		
		var work_files = $(e).find('tbody[id*=WORK_FILE_LIST] tr[id*=WORK_FILE_]').toArray().reduce((acc2, e2, i2) => {
			
			var info2 = $(e2).prop('info');
			
			// INSERT
			if(info2.PROCESS === 'INSERT') {
				acc2.WORK_FILE_LIST.push({
					FILE_INFO: $(e2).find('textarea[id*=WORK_FILE_INFO_]').val(),
				});
			}
			// UPDATE
			else if(info2.PROCESS === 'UPDATE') {
				acc2.WORK_FILE_LIST_UPDATE.push({
					ATCH_FLE_SEQ: info2.ATCH_FLE_SEQ,
					FILE_INFO: $(e2).find('textarea[id*=WORK_FILE_INFO_]').val(),
				});
			}
			// DELETE 
			else if(info2.PROCESS === 'DELETE') {
				acc2.WORK_FILE_LIST_DELETE.push({
					ATCH_FLE_SEQ: info2.ATCH_FLE_SEQ,
					FLE_PATH: info2.FLE_PATH,
					NEW_FLE_NM: info2.NEW_FLE_NM,
					FLE_TP: info2.FLE_TP,
				});
			}
			return acc2;
		}, {WORK_FILE_LIST:[], WORK_FILE_LIST_UPDATE:[], WORK_FILE_LIST_DELETE:[]});
		obj = Object.assign(obj, work_files);
		return obj;
	});
	return param;
}


/* 수정 페이지에서 실행 될 초기화 함수 */
function modifyInit() {
	// 데이터 조회
	var data = _oam.mariaDB.getData('/oam2/oam_0200/reportDetail/getProcReportInfo.ajax', {
		RPT_ID: $('input#RPT_ID').val(),
	});
	// 데이터 없을 경우 return 
	if(!data) return;
	
	// 데이터 변환 
	console.log('변환 전', data);
	data = _oam.convertData.RPT_PROC(data);
	console.log('변환 후', data);
	
	// OVERVIEW
	$('input#RPT_PROC_ID').val(data.RPT_PROC_ID);
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
	
	// ISSUE
	$('textarea#ISSUE').text(data.ISSUE);
	// ISSUE FILE LIST
	$('tbody#ISSUE_FILE_LIST').html('');
	data.ISSUE_FILE_LIST.forEach((e) => {
		var sample = _oam_elements.oam_0201.main.tr_file_row({
			ID: e.ATCH_FLE_SEQ,
			TYPE: e.FILE_TYPE,
			FILE_NAME: e.FLE_NM.substring(0, e.FLE_NM.lastIndexOf('.')),
			FILE_EXTENSION: '.' + e.FLE_TP,
			FILE_SIZE: _oam.returnFileSize(parseInt(e.FLE_SZ)), 
			FILE_INFO: e.FILE_INFO,
			SRC: ctx + '/imageView' + e.FLE_PATH + '/' + e.NEW_FLE_NM,
		});
		// 프로퍼티 추가 
		e.PROCESS = 'UPDATE';
		sample = $(sample).prop('info', e);
		// 이벤트 추가
		sample = $(sample).find('a.delete-btn').click(deleteFile).parents('tr');
		//sample = $(sample).find('textarea[id*=FILE_INFO]').keydown(_oam.textareaMaxLine).parents('tr');
		sample = $(sample).find('textarea[id*=FILE_INFO]').on('input', _oam.textareaMaxLine).parents('tr');
		// 삽입 
		$('tbody#ISSUE_FILE_LIST').append(sample);
	});
	
	
	// PURPOSE
	$('textarea#PURPOSE').text(data.PURPOSE);
	$('tbody#PURPOSE_FILE_LIST').html('');
	data.PURPOSE_FILE_LIST.forEach((e) => {
		var sample = _oam_elements.oam_0201.main.tr_file_row({
			ID: e.ATCH_FLE_SEQ,
			TYPE: e.FILE_TYPE,
			FILE_NAME: e.FLE_NM.substring(0, e.FLE_NM.lastIndexOf('.')),
			FILE_EXTENSION: '.' + e.FLE_TP,
			FILE_SIZE: _oam.returnFileSize(parseInt(e.FLE_SZ)), 
			FILE_INFO: e.FILE_INFO,
			SRC: ctx + '/imageView' + e.FLE_PATH + '/' + e.NEW_FLE_NM,
		});
		
		// 프로퍼티 추가 
		e.PROCESS = 'UPDATE';
		sample = $(sample).prop('info', e);
		// 이벤트 추가
		sample = $(sample).find('a.delete-btn').click(deleteFile).parents('tr');
		//sample = $(sample).find('textarea[id*=FILE_INFO]').keydown(_oam.textareaMaxLine).parents('tr');
		sample = $(sample).find('textarea[id*=FILE_INFO]').on('input', _oam.textareaMaxLine).parents('tr');
		
		// 삽입 
		$('tbody#PURPOSE_FILE_LIST').append(sample);
	});
	
	//CONCLUSION
	$('textarea#CONCLUSION').text(data.CONCLUSION);
	
	// PART
	data.PART_LIST.forEach((e) => {
		var sample = _oam_elements.oam_0201.main.tr_item_row({
			ID: e.ITEM_ID,
			TYPE: e.TYPE,
			CATEGORY: e.CATEGORY,
			ITEM_NM: e.ITEM_NM,
			RETURN_YN: e.STATE === 'U' ? true : false, 
		});
		// 프로퍼티 추가 
		e.PREVIOUS_STATE = e.STATE;
		e.PROCESS = 'UPDATE';
		sample = $(sample).prop('info', e);
		
		// 반납 상태 일 경우, 버튼 숨김 처리 
		if(e.STATE === 'U') sample = $(sample).find('span.active-toggle-wrap').hide().parents('tr');
		
		// 클릭 이벤트 추가
		sample = $(sample).find('span.delete-btn').click(itemDelete).parents('tr');
		sample = $(sample).find('input[id*=CHECK_]').click(itemReturn).parents('tr');
		// 삽입
		$('tbody#PART_LIST').append(sample);
	});
	
	// TOOL
	data.TOOL_LIST.forEach((e) => {
		var sample = _oam_elements.oam_0201.main.tr_item_row({
			ID: e.ITEM_ID,
			TYPE: e.TYPE,
			CATEGORY: e.CATEGORY,
			ITEM_NM: e.ITEM_NM,
			RETURN_YN: e.STATE === 'U' ? true : false, 
		});
		// 프로퍼티 추가 
		e.PREVIOUS_STATE = e.STATE;
		e.PROCESS = 'UPDATE';
		sample = $(sample).prop('info', e);
		
		// 반납 상태 일 경우, 버튼 숨김 처리 
		if(e.STATE === 'U') sample = $(sample).find('span.active-toggle-wrap').hide().parents('tr');
		
		// 클릭 이벤트 추가
		sample = $(sample).find('span.delete-btn').click(itemDelete).parents('tr');
		sample = $(sample).find('input[id*=CHECK_]').click(itemReturn).parents('tr');
		// 삽입 
		$('tbody#TOOL_LIST').append(sample);
	});
	
	// PPE
	data.PPE_LIST.forEach((e) => {
		var sample = _oam_elements.oam_0201.main.tr_item_row({
			ID: e.ITEM_ID,
			TYPE: e.TYPE,
			CATEGORY: e.CATEGORY,
			ITEM_NM: e.ITEM_NM,
			RETURN_YN: e.STATE === 'U' ? true : false, 
		});
		
		// 프로퍼티 추가 
		e.PREVIOUS_STATE = e.STATE;
		e.PROCESS = 'UPDATE';
		sample = $(sample).prop('info', e);
		
		// 반납 상태 일 경우, 버튼 숨김 처리 
		if(e.STATE === 'U') sample = $(sample).find('span.active-toggle-wrap').hide().parents('tr');
		
		// 클릭 이벤트 추가
		sample = $(sample).find('span.delete-btn').click(itemDelete).parents('tr');
		sample = $(sample).find('input[id*=CHECK_]').click(itemReturn).parents('tr');
		// 삽입
		$('tbody#PPE_LIST').append(sample);
	});
	
	// WORK
	data.WORK_LIST.forEach((e) => {
		var sample = _oam_elements.oam_0201.main.div_work_row({
			ID: e.PROC_WORK_ID,
		});
		
		// 프로퍼티 추가 
		sample = $(sample).find('tbody[id*=WORK]').not('tbody[id*=WORK_FILE_LIST]').prop('info', {
			ID: e.PROC_WORK_ID,
			PROCESS: 'UPDATE'
		}).parents('div.base_grid_table');
		
		// MAINTEN_CD
		sample = $(sample).find('input[id*=WORK_MAINTEN_CD_]').val(e.CODE + ' (' + e.MAINTEN_LEV1_NM + ' - ' + e.MAINTEN_LEV2_NM + ')').parents('.base_grid_table');
		$(sample).find('input[id*=WORK_MAINTEN_CD_]').prop('info', {
			LEV2_CD : e.MAINTEN_CD 
		});
		
		// DIFFICULTY
		sample = $(sample).find('select[id*=WORK_DIFFICULTY_] option:eq(' + parseInt(e.DIFFICULTY) + ')').prop('selected', true).parents('.base_grid_table');
		
		// TITLE
		sample = $(sample).find('input[id*=WORK_NM_]').val(e.WORK_NM).parents('.base_grid_table');
		
		// DETAIL
		sample = $(sample).find('textarea[id*=WORK_DETAIL_]').val(e.WORK_DETAIL).parents('.base_grid_table');
		
		// WORK TIME
		sample = $(sample).find('input[id*=WORK_START_TIME_]').val(e.START_TIME).parents('.base_grid_table');
		sample = $(sample).find('input[id*=WORK_END_TIME_]').val(e.END_TIME).parents('.base_grid_table');
		sample = $(sample).find('input[id*=WORK_CHECK_DOWNTIME_]').prop('checked', e.DOWNTIME_YN === 'Y').parents('.base_grid_table');
		
		// WORK_FILE
		$(sample).find('tbody[id*=WORK_FILE_LIST_]').html('');
		e.FILE_LIST.forEach((e2) => {
			var tr = _oam_elements.oam_0201.main.tr_file_row({
				ID: e2.ATCH_FLE_SEQ,
				TYPE: e2.TYPE,
				FILE_NAME: e2.FLE_NM.substring(0, e2.FLE_NM.lastIndexOf('.')),
				FILE_EXTENSION: '.' + e2.FLE_TP,
				FILE_SIZE: _oam.returnFileSize(parseInt(e2.FLE_SZ)), 
				FILE_INFO: e2.FILE_INFO,
				SRC: ctx + '/imageView' + e2.FLE_PATH + '/' + e2.NEW_FLE_NM,
			});
			// 프로퍼티 추가 
			e2.PROCESS = 'UPDATE';
			tr = $(tr).prop('info', e2);
			// 이벤트 추가
			tr = $(tr).find('a.delete-btn').click(deleteFile).parents('tr');
			//tr = $(tr).find('textarea[id*=FILE_INFO]').keydown(_oam.textareaMaxLine).parents('tr');
			tr = $(tr).find('textarea[id*=FILE_INFO]').on('input', _oam.textareaMaxLine).parents('tr');
			// 삽입 
			$(sample).find('tbody[id*=WORK_FILE_LIST_]').append(tr);
		});
		
		// 삭제 버튼
		sample = $(sample).find('span[id*=DELETE_BTN]').css('cursor', 'pointer').click(function() {
			// 삭제 컨펌 
			if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			// 작업 갯수 조회 
			var work_cnt = $('tbody[id*=WORK_]').not('tbody[id*=WORK_FILE_LIST]').toArray().filter((e) => $(e).prop('info').PROCESS !== 'DELETE').length;
			// 작업이 1개 일 경우 => 삭제 불가 
			if(work_cnt <= 1) return alert(_MESSAGE.oam.deleteWorkAlert); 
			// 정보 가져오기 
			var info = $(this).parents('div.base_grid_table').find('tbody[id*=WORK]').not('tbody[id*=WORK_FILE_LIST]').prop('info');
			// WORK 숨기기  
			$(this).parents('div.base_grid_table').hide();
			// PROCESS 변경, WORK, WORK_FILE
			info.PROCESS = 'DELETE';
			$('tbody[id*=WORK_FILE_LIST_' + info.ID + '] tr').toArray().forEach((e) => $(e).prop('info').PROCESS = 'DELETE');
			// 첨부파일 삭제 
			$('#fileStorage input[name=WORK_FILE_' + info.ID + ']').remove();
		}).parents('div.base_grid_table');
		
		
		// 유지보수 코드 버튼 클릭 css, event 추가 
		sample = $(sample).find('button[id*=MAINTENCD_SEARCH_BTN_]').css('cursor', 'pointer').click(openPopup).parents('.base_grid_table');
		// 파일 추가 버튼 event 추가
		sample = $(sample).find('input[id*=ADD_FILE_WORK_]').change(changeFile).parents('.base_grid_table');
		// 작업 시간(시작, 종료) 변경 event 추가, datepicker 활성화
		$(sample).find('input.datetimepicker').change(checkReportTime).setDateTimePicker('yy-mm-dd');
		// sample 추가
		$('div#WORK_LIST').append(sample);
	});
	
	/*
	 * 	selectbox 이벤트 => /script/common/common.js
	 *  : selectbox 변경 시, label 변경 
	 */
	initialControl();
	// 보고서 시간 계산 
	checkReportTime();
}





/* 첨부파일 저장 - TEST function */ 
function saveFile() {
	var formData = new FormData($('#fileStorage')[0]);
	
//	formData.append('OBJECT', {a:1, b:2});
//	formData.append('LIST', [1,2,3,4]);
//	formData.append('OBJECT_LIST', {a:1, b:[1,2,3,4]});
//	formData.append('LIST_OBJECT', [{a:1}, {b:2}]);
//	
//	var a = new Map();
//	a.set("STRING", "A");
//	a.set("LIST", [1,2,3,4]);
//	
//	var b = new Map();
//	b.set("STRING", "B");
//	
//	var c = new Map();
//	c.set("STRING", "C");
//	var d = new Map();
//	d.set("STRING", "D");
//	b.set("LIST", [c, d]);
//	formData.append('LIST_MAP_LIST', [a,b]);
	
	// key
//	for(let key of formData.keys()) {
//		console.log(key);
//	}
	// value
//	for(let values of formData.values()) {
//		console.log(values);
//	}
	// entry : [key, value]
//	for(let entry of formData.entries()) {
//		console.log(entry[0], entry[1]);
//	}
	
	//$('form#fileStorage input[name*=WORK_FILE]');
	
	// WORK 갯수 추가
	formData.append('WORK_CNT', $('tbody[id*=WORK]').length);
	var data = _oam.mariaDB.saveFile(ctx + '/oam2/oam_0200/saveFile.ajax', formData);
	return data;
}


