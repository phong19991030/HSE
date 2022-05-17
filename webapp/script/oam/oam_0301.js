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
 *  RPT_ID 		: 보고서 ID (Modify)
 *  RPT_ID 		: 보고서 ID (Modify)
 *  
 *  
 *  ######## Function ###########################################
 *  
 *  oam0301 		: 초기화 
 *  
 *  
 */
var viewer; // 블레이드 뷰어 캔버스 객체 
var viewer_slider; // 블레이드 뷰어 슬라이더
function oam0301() {
	// 검색 버튼(TURBINE, COMPANY, WORKERS) CSS, EVENT 추가
	$('button[id*=SEARCH_BTN]').css('cursor', 'pointer').click(openPopup);
	
	// 추가 버튼(WORK) css, event 추가
	$('a[id=FLIGHT_ADD_BTN]').css('cursor', 'pointer').click(addFlight);
	
	// 발전기 모델, 블레이드 타입+컬러, 드론 모델 검색 버튼 클릭 
	$('a[id*=_SEARCH_BTN]').click(openPopup);
	
	// 블레이드 스펙의 블레이드 길이 input : 소수 입력, 붙여넣기 해제, 한글 삭제 이벤트 추가
	$('tbody#BLADE_SPEC').find('input[id*=LENGTH_NONE]').keypress(_oam.isNumberKey);
	$('tbody#BLADE_SPEC').find('input[id*=LENGTH_NONE]').keyup(_oam.deleteHangul);
	$('tbody#BLADE_SPEC').find('input[id*=LENGTH_NONE]').keydown(_oam.isPasteUnable);
	
	// 블레이드 스펙 저장 버튼 css, event 추가 
	$('span#BLADE_SPEC_SAVE').css('cursor', 'pointer').click(function() {
		
		// validation : 입력 값이 없는 항목 list 
		var input_list = $('tbody#BLADE_SPEC input[id*=SERIAL_NUM_NONE], tbody#BLADE_SPEC input[id*=LENGTH_NONE]').toArray().filter((e) => !$(e).val());
		var span_list = $('tbody#BLADE_SPEC span[id*=TYPE_NONE], tbody#BLADE_SPEC span[id*=COLOR_NM_NONE]').toArray().filter((e) => !$(e).text());
		
		if(input_list.length > 0 || span_list.length > 0) {
			alert(_MESSAGE.oam.bladeSpecRequireSpec);
			// border 경고 표시 
			input_list.forEach((e) => $(e).css('border', '1px solid').css('border-color', 'red'));
			span_list.forEach((e) => $(e).parent('span').css('border', '1px solid').css('border-color', 'red'));
			return;
		} else {
			// border 경고 초기화 
			$('tbody#BLADE_SPEC [style*=border]').css('border', '');
		}
		
		if(confirm(_MESSAGE.oam.bladeSpecSaveConfirm)) {
			alert(_MESSAGE.common.saveSuccess);
			// 통과 후 처리 
			$(this).hide();
			
			var spec = $('tbody#BLADE_SPEC td[class*=none] input').toArray().reduce((acc, e, i) => {
				var num = $(e).attr('id').split('_')[0].replace('BLADE', '');
				acc['BLADE' + num].BLADE_ID = num;
				acc['BLADE' + num].BLADE_NUM = num;
				if($(e).attr('id').includes('LENGTH')) acc['BLADE' + num].BLADE_LENGTH = parseFloat($(e).val()); 
				if($(e).attr('id').includes('SERIAL')) acc['BLADE' + num].BLADE_SERIAL_NUM = $(e).val();
				return acc;
			}, { BLADE1:{}, BLADE2:{}, BLADE3:{} });
			
			// 프로퍼티 추가, object 병합
			$('tbody#BLADE_SPEC').prop('info').BLADE1 = Object.assign($('tbody#BLADE_SPEC').prop('info').BLADE1, spec.BLADE1);
			$('tbody#BLADE_SPEC').prop('info').BLADE2 = Object.assign($('tbody#BLADE_SPEC').prop('info').BLADE2, spec.BLADE2);
			$('tbody#BLADE_SPEC').prop('info').BLADE3 = Object.assign($('tbody#BLADE_SPEC').prop('info').BLADE3, spec.BLADE3);
			
			// td[class=txt-left] 내용 표시 
			var info = $('tbody#BLADE_SPEC').prop('info');
			
			for(var i=1; i<=3; i++) {
				$('span#BLADE' + i + '_SERIAL_NUM').text(info['BLADE' + i].BLADE_SERIAL_NUM);
				$('span#BLADE' + i + '_TYPE').text(info['BLADE' + i].BLADE_TYPE_CD + (info['BLADE' + i].BLADE_TYPE_DETAIL ? ' (' + info['BLADE' + i].BLADE_TYPE_DETAIL + ')' : ''));
				$('span#BLADE' + i + '_LENGTH').text(info['BLADE' + i].BLADE_LENGTH + ' m');
				$('span#BLADE' + i + '_COLOR_NM').text(info['BLADE' + i].BLADE_COLOR_NM);
				$('span#BLADE' + i + '_COLOR_NM').css('background', info['BLADE' + i].BLADE_COLOR_HEX_CODE);
			}
			
			// td NONE 숨김 <=> td 표시
			$('tbody#BLADE_SPEC td[class*=none]').hide();
			$('tbody#BLADE_SPEC td[class=txt-left]').show();
		} else {
			
		}
	});
	
	// 추가 버튼(DAMAGE) css, event 추가  
	$('a[id=DAMAGE_ADD_BTN]').css('cursor', 'pointer').click(openPopup);
	
	// PROCESS INSERT 일 경우, 
	if($('input#PROCESS').val() === 'INSERT') {
		// 드론 ROW => 검색 버튼으로 변경 
		$('tbody#DRONE_SPEC td#DRONE_SEARCH_ROW').show();
		$('tbody#DRONE_SPEC td[id!=DRONE_SEARCH_ROW]').hide();
		
		// INSERT 기본 Flight 추가 
		addFlight();
	} 
	// PROCESS UPDATE 일 경우,
	else {
		// 드론 ROW => 스펙 ROW로 변경 
		$('tbody#DRONE_SPEC td#DRONE_SEARCH_ROW').hide();
		$('tbody#DRONE_SPEC td[id!=DRONE_SEARCH_ROW]').show();
		
		// UPDATE 일 경우, 수정 페이지 초기화 함수 실행
		modifyInit();
	}
	
	// 저장 버튼 클릭
	$('span#SAVE_BTN').click(save);
	
	// 블레이드 뷰어 생성 및 저장  
	viewer = new bladeViewer('canvas').init().drawImage().drawMiddleDash();
	// image load 대기 후 자르기, 저장 
	setTimeout(() => {
		viewer.makeDrawAbleZone().save('A');
	}, 1000);
	
	// 블레이드 뷰어 버튼 클릭
	$('button#BLADEVIEWER').click(openPopup);
	
	
	
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
		
		
		// TURBINE SPEC 입력
		if(data.MODEL_ID) {
			// MODEL_ID 있을 경우
			$('span#MODEL_NM').text(data.MODEL_NM);
			$('span#MODEL_MANUFACTURER_LOGO img').attr('src', ctx + '/imageView' + data.MODEL_MANUFACTURER_FLE_PATH + '/' + data.MODEL_MANUFACTURER_NEW_FLE_NM);
			$('span#MODEL_MANUFACTURER_NM').text(data.MODEL_MANUFACTURER_NM);
			$('span#MODEL_POWER').text(data.MODEL_POWER + ' MW');
			$('span#MODEL_ROTOR_D').text(data.MODEL_ROTOR_D + ' m');
			$('span#MODEL_TOWER_H').text(data.MODEL_TOWER_H + ' m');
			
			$('tbody#TURBINE_SPEC td#MODEL_SEARCH_ROW').hide();
			$('tbody#TURBINE_SPEC td[id!=MODEL_SEARCH_ROW]').show();
			
			// 프로퍼티 추가 
			$('tbody#TURBINE_SPEC').prop('info', {PROCESS:'NOT'});
		} else {
			// MODEL_ID 없을 경우
			$('tbody#TURBINE_SPEC td#MODEL_SEARCH_ROW').show();
			$('tbody#TURBINE_SPEC td[id!=MODEL_SEARCH_ROW]').hide();
			
			// 프로퍼티 추가
			$('tbody#TURBINE_SPEC').prop('info', {PROCESS:'INSERT'});
		}
		
		// BLADE SPEC 입력
		if(data.BLADE_ID_LIST) {
			// BALDE 정보 있을 경우
			var blade_id_list = data.BLADE_ID_LIST.split(' | '); 
			var blade_num_list = data.BLADE_NUM_LIST.split(' | ');
			var blade_serial_num_list = data.BLADE_SERIAL_NUM_LIST.split(' | ');
			var blade_length_list = data.BLADE_LENGTH_LIST.split(' | ');
			
			var blade_color_id_list = data.BLADE_COLOR_ID_LIST.split(' | ');
			var blade_color_nm_list = data.BLADE_COLOR_NM_LIST.split(' | ');
			var blade_color_hex_code_list = data.BLADE_COLOR_HEX_CODE_LIST.split(' | ');
			
			var blade_type_id_list = data.BLADE_TYPE_ID_LIST.split(' | ');
			var blade_type_cd_list = data.BLADE_TYPE_CD_LIST.split(' | ');
			var blade_type_detail_list = data.BLADE_TYPE_DETAIL_LIST.split(' | ');
			
			blade_num_list.forEach((e, i) => {
				$('span#BLADE' + e + '_SERIAL_NUM').text(blade_serial_num_list[i]);
				$('span#BLADE' + e + '_TYPE').text(blade_type_cd_list[i] + ' (' + blade_type_detail_list[i] + ')');
				$('span#BLADE' + e + '_LENGTH').text(blade_length_list[i] + ' m');
				$('span#BLADE' + e + '_COLOR_NM').text(blade_color_nm_list[i]);
				$('span#BLADE' + e + '_COLOR_NM').css('background', blade_color_hex_code_list[i]);
			});
			
			$('tbody#BLADE_SPEC td[class*=none]').hide();
			$('tbody#BLADE_SPEC td[class=txt-left]').show();
			$('span#BLADE_SPEC_SAVE').hide();
			
			// 프로퍼티 추가  
			var spec = blade_id_list.reduce((acc, e, i) => {
				acc['BLADE' + blade_num_list[i]] = {
					BLADE_ID: e,
					BLADE_NUM: blade_num_list[i],
					BLADE_SERIAL_NUM: blade_serial_num_list[i],
					BLADE_LENGTH: parseFloat(blade_length_list[i]),
					BLADE_COLOR_ID: blade_color_id_list[i],
					BLADE_TYPE_ID: blade_type_id_list[i],
				}
				return acc;
			}, {PROCESS:'NOT', BLADE1:{}, BLADE2:{}, BLADE3:{}});
			$('tbody#BLADE_SPEC').prop('info', spec);
		} else {
			// BALDE 정보 없을 경우
			$('tbody#BLADE_SPEC td[class*=none]').show();
			$('tbody#BLADE_SPEC td[class=txt-left]').hide();
			$('span#BLADE_SPEC_SAVE').show();
			
			// 프로퍼티 추가 
			$('tbody#BLADE_SPEC').prop('info', {PROCESS:'INSERT', BLADE1:{}, BLADE2:{}, BLADE3:{}});
		}
		
	}
}

/* 
 * 검색 버튼(TURBINE, COMPANY, WORKERS) : $taget_SEARCH_BTN  
 * 클릭
 * : 팝업창 열기 
 */
function openPopup(event) {
	
	var TARGET = $(this);
	var ID = $(this).attr('id').split('_');
	var TYPE = $(this).attr('id').split('_')[0].toUpperCase();
	var BLADE_NUM = $(this).attr('id').split('_').pop();
	
	/*
	 * 	활성화 : active
	 * 	planning : layer-popup-planing
	 * 	blade viewer popup : layer-popup-blade-inspection layer-popup-blade-inspection2
	 * 	register blade damage : dialogCustom,
	 */
	/* 팝업창 클래스 정하기 */
	if(['TURBINE', 'COMPANY', 'WORKERS', 'BLADETYPE', 'BLADECOLOR'].includes(TYPE)) $('div#layerPopup').attr('class', 'layer-popup-planing');
	else if(['MODEL', 'DRONE'].includes(TYPE)) $('div#layerPopup').attr('class', 'layer-popup-turbine-model');
	else if(['DAMAGE'].includes(TYPE)) $('div#layerPopup').attr('class', 'layer-popup-blade-inspection2');
	else if(['BLADEVIEWER'].includes(TYPE)) $('div#layerPopup').attr('class', 'layer-popup-blade-inspection layer-popup-blade-inspection2');
	else $('div#layerPopup').attr('class', 'layer-popup-planing');
	
	
	var scroll_target = '.base_grid_table';
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
	/* MODEL */
	else if(TYPE === 'MODEL') {
		// 팝업창 콘텐츠 생성, 삽입
		var content = _oam_elements.oam_0301.popup.model_content({
			TITLE: 'Select Turbine Model',
			TYPE: TYPE,
		});
		$('div#layerPopup').html('').html(content);
		// row 생성 
		createSearchPopupRow(TYPE);
	}
	/* BLADETYPE */
	else if(TYPE === 'BLADETYPE') {
		// 팝업창 콘텐츠 생성, 삽입
		var content = _oam_elements.oam_0301.popup.blade_type_content({
			TITLE: 'Select Blade Type',
			TYPE: TYPE,
			BLADE_NUM: BLADE_NUM
		});
		$('div#layerPopup').html('').html(content);
		// row 생성 
		createSearchPopupRow(TYPE);
	}
	/* BLADECOLOR */
	else if(TYPE === 'BLADECOLOR') {
		// 팝업창 콘텐츠 생성, 삽입
		var content = _oam_elements.oam_0301.popup.blade_color_content({
			TITLE: 'Select Blade Color',
			TYPE: TYPE,
			BLADE_NUM: BLADE_NUM
		});
		$('div#layerPopup').html('').html(content);
		// row 생성 
		createSearchPopupRow(TYPE);
	}
	/* DRONE */
	else if(TYPE === 'DRONE') {
		// 팝업창 콘텐츠 생성, 삽입
		var content = _oam_elements.oam_0301.popup.drone_content({
			TITLE: 'Select Drone Model',
			TYPE: TYPE,
		});
		$('div#layerPopup').html('').html(content);
		// row 생성 
		createSearchPopupRow(TYPE);
	}
	/* DAMAGE */
	else if(TYPE === 'DAMAGE') {
		
		var process = ID[1] === 'ADD' ? 'ADD' : 'UPDATE';
		
		// tr 클릭이 아닐 경우, !!아래 줄은 tr에 이벤트를 먹여서 tr(.target)과 td(.currentTarget)가 다르므로 적용 안됨 => tr이 아닌 td에 이벤트를 먹여야함    
		if(process === 'UPDATE' && $(event.target).prop('tagName') !== 'TD') return;
		//if(event.target !== event.currentTarget) return;
		
		
		// TURBING_INFO 가져오기
		var turbine_info = $('input#TURBINE').prop('info');
		
		// TURBINE 선택 여부 CHECK
		if(!turbine_info) {
			$('input#TURBINE').vcWarning('Please select a Turbine');
			// input#TURBINE 위치로 스크롤 이동
			_oam.moveScrollToTargetPosition('input#TURBINE');
			return;
		}
		
		// BLADE SPEC 가져오기 
		var blade_spec = $('tbody#BLADE_SPEC').prop('info');
		// BLADE_ID, BLADE_SERIAL_NUM 없을 경우 
		if(!blade_spec.BLADE1.BLADE_SERIAL_NUM) {
			alert('Please save the blade spec.');
			// 경고표시 
			$('span#BLADE_SPEC_SAVE').css('border-color', 'red');
			// span#BLADE_SPEC_SAVE 위치로 스크롤 이동
			_oam.moveScrollToTargetPosition('span#BLADE_SPEC_SAVE');
			return;
		} else {
			
		}
		
		// 팝업창 콘텐츠 생성
		var content = _oam_elements.oam_0301.popup.damage_content({
			//ID: ID[1] === 'ADD' ? moment().valueOf() : TARGET.parents('tr[id*=DAMAGE_]').attr('id').split('_')[1],
			ID: ID[1] === 'ADD' ? moment().valueOf() : TARGET.attr('id').split('_')[1],
			PROCESS: process,
			TITLE: 'Register blade damage',
			TYPE: TYPE,
		});
		// input(FROM_R, FROM_LE, HORIZ, VERTI) key event 추가 
		content = $(content).find('input[id*=FROM_], input[id=HORIZ], input[id=VERTI]').keypress(_oam.isNumberKey).parents('.layer-cont');
		content = $(content).find('input[id*=FROM_], input[id=HORIZ], input[id=VERTI]').keyup(_oam.deleteHangul).parents('.layer-cont');
		content = $(content).find('input[id*=FROM_], input[id=HORIZ], input[id=VERTI]').keydown(_oam.isPasteUnable).parents('.layer-cont');
		// 첨부파일 변경 시 event 추가 
		content = $(content).find('input[id*=ADD_FILE_DAMAGE]').change(changeFile).parents('.layer-cont');
		
		// td css 변경 
		content = $(content).find('td').css('position', 'relative').parents('.layer-cont');
		
		// 블레이드 뷰어 관련 
		content = $(content).find('select#BLD_ID').change(initViewer).parents('.layer-cont');
		content = $(content).find('input[id*=FROM_], input[id=HORIZ], input[id=VERTI]').keyup(drawDamage).parents('.layer-cont');
		content = $(content).find('select#DMG_AREA, select#DMG_SEVERITY').change(drawDamage).parents('.layer-cont');
		
		// 팝업창 콘텐츠 삽입
		$('div#layerPopup').html('').html(content);
		
		// 블레이드 serial number, id - option 추가
		for(var [k, v] of Object.entries(blade_spec)) {
			if(k.includes('BLADE')) {
				var option = $('<option value="' + v.BLADE_ID + '">' + v.BLADE_SERIAL_NUM + '</option>').prop('info', v);
				$('select#BLD_ID').append(option);
			}
		}
		
		// MAINTEN_CD - option 생성 
		createSearchPopupRow(TYPE, {SEARCH_LEV1_PRE_NM:'H'});
		scroll_target = '#scroll_target';
		
		// UPDATE일 경우, 기존 DAMAGE 내용 삽입  
		if(process === 'UPDATE') {
			
			//var info = $(this).parents('tr').prop('info');
			var info = $(this).prop('info');
			
			$('#layerPopup .layer-cont #BLD_ID option[value=' + info.BLD_ID + ']').attr('selected', true).siblings('option:selected').attr('selected', false);
			$('#layerPopup .layer-cont #MAINTEN_CD option[value=' + info.MAINTEN_CD + ']').attr('selected', true).siblings('option:selected').attr('selected', false);
			$('#layerPopup .layer-cont #DMG_AREA option[value=' + info.DMG_AREA + ']').attr('selected', true).siblings('option:selected').attr('selected', false);
			$('#layerPopup .layer-cont #DMG_SEVERITY option[value=' + info.DMG_SEVERITY + ']').attr('selected', true).siblings('option:selected').attr('selected', false);
			$('#layerPopup .layer-cont #DMG_INFO option[value="' + info.DMG_INFO + '"]').attr('selected', true).siblings('option:selected').attr('selected', false);
			$('#layerPopup .layer-cont #MAINTEN_PLAN').val(info.MAINTEN_PLAN);
			$('#layerPopup .layer-cont #FROM_R').val(info.FROM_R);
			$('#layerPopup .layer-cont #FROM_LE').val(info.FROM_LE);
			$('#layerPopup .layer-cont #HORIZ').val(info.HORIZ);
			$('#layerPopup .layer-cont #VERTI').val(info.VERTI);
			
			// file 생성
			info.DMG_FILE_LIST.forEach((e) => {
				
				var sample;
				
				// INSERT 일 경우,
				if(e.PROCESS === 'INSERT') {
					var type = e.TYPE;
					var id = e.ID;
					var file_input = $('form#fileStorage input#DAMAGE_FILE_' + id)[0];
					
					// File
					const files = file_input.files;
					for(const file of files) {
						
						// File sample 생성
						sample = _oam_elements.oam_0201.main.tr_file_row({
							ID: id,
							TYPE: type,
							FILE_NAME: e.FILE_NAME,
							FILE_SIZE: _oam.returnFileSize(e.FILE_SIZE),
							FILE_EXTENSION: e.FILE_EXTENSION,
						});
						
						// File sample prop 추가 
						sample = $(sample).prop('info', e);
						sample = $(sample).attr('not-delete', true);
						
						// img tag 이미지 추가 
						var path = URL.createObjectURL(file);
						$(sample).find('img').attr('src', path);
						
						// sample의 textarea(FILE_INFO) keydown 이벤트 + 내용 추가
						//sample = $(sample).find('textarea[id*=FILE_INFO]').keydown(_oam.textareaMaxLine).val(e.FILE_INFO).parents('tr');
						sample = $(sample).find('textarea[id*=FILE_INFO]').on('input', _oam.textareaMaxLine).val(e.FILE_INFO).parents('tr');
						// sample의 삭제 버튼(a) click 이벤트 추가 
						sample = $(sample).find('a.delete-btn').click(deleteFile).parents('tr');
						
						// file sample 삽입   
//						var tbody = '#DAMAGE_FILE_LIST'; 
						// 처음 삽입 되는 경우 기존 no file tr 삭제 
//						if($(tbody + ' tr[id*=' + type + '_FILE]').not('tr[style*=none]').length === 0) $(tbody + ' tr#NO_FILE').remove();
//						$(tbody).append(sample);
					}
				} 
				// UPDATE 또는 DELETE 일 경우, 
				else if(e.PROCESS === 'UPDATE' || e.PROCESS === 'DELETE') {
					
					// File sample 생성
					sample = _oam_elements.oam_0201.main.tr_file_row({
						ID: e.ATCH_FLE_SEQ,
						TYPE: e.TYPE,
						FILE_NAME: e.FLE_NM.substring(0, e.FLE_NM.lastIndexOf('.')),
						FILE_SIZE: _oam.returnFileSize(e.FLE_SZ),
						FILE_EXTENSION: '.' + e.FLE_TP,
					});
					
					// DELETE 상태 일 경우 숨기기
					if(e.PROCESS === 'DELETE') sample = $(sample).hide();
					
					// File sample prop 추가 
					sample = $(sample).prop('info', e);
					
					// img tag 이미지 추가 
					$(sample).find('img').attr('src', ctx + '/oam2/oam_0200/imageView/' + e.FLE_PATH + '/' + e.NEW_FLE_NM);
					
					// sample의 textarea(FILE_INFO) keydown 이벤트 + 내용 추가
					//sample = $(sample).find('textarea[id*=FILE_INFO]').keydown(_oam.textareaMaxLine).val(e.FILE_INFO).parents('tr');
					sample = $(sample).find('textarea[id*=FILE_INFO]').on('input', _oam.textareaMaxLine).val(e.FILE_INFO).parents('tr');
					// sample의 삭제 버튼(a) click 이벤트 추가 
					sample = $(sample).find('a.delete-btn').click(deleteFile).parents('tr');
				}
				
				// 삽입
				$('tbody#DAMAGE_FILE_LIST').append(sample);
			});
			
			// NO_FILE 삭제 여부 
			if($('tbody#DAMAGE_FILE_LIST tr[id*=DAMAGE_FILE]').not('tr[style*=none]').length > 0) $('tbody#DAMAGE_FILE_LIST tr#NO_FILE').remove();
			
			// 블레이드 뷰어 
			initViewer();
			drawDamage();
		}
		
		/*
		 * 	selectbox 이벤트 => /script/common/common.js
		 *  : selectbox 변경 시, label 변경 
		 */
		initialControl();
	}
	/* BLADEVIEWER */
	else if(TYPE === 'BLADEVIEWER') {
		
		// TURBINE 정보 가져오기 0301 = input, 0302 = span
		var turbine_info = $('#TURBINE').prop('info');
		// TURBINE 선택 여부 CHECK
		if(!turbine_info) {
			$('#TURBINE').vcWarning('Please select a Turbine');
			// #TURBINE 위치로 스크롤 이동
			_oam.moveScrollToTargetPosition('#TURBINE');
			return;
		}
		
		// BLADE SPEC 가져오기 
		var blade_spec = $('tbody#BLADE_SPEC').prop('info');
		// BLADE_ID, BLADE_SERIAL_NUM 없을 경우 
		if(!blade_spec.BLADE1.BLADE_SERIAL_NUM) {
			alert('Please save the blade spec.');
			// 경고표시 
			$('span#BLADE_SPEC_SAVE').css('border-color', 'red');
			// span#BLADE_SPEC_SAVE 위치로 스크롤 이동
			_oam.moveScrollToTargetPosition('span#BLADE_SPEC_SAVE');
			return;
		} else {
			
		}
		
		// 팝업창 콘텐츠 생성
		var content = _oam_elements.oam_0301.popup.blade_viewer_content({
			TITLE: 'Blade Viewer',
			TYPE: TYPE,
			LOCATION: turbine_info.FARM_NM + ' > ' + turbine_info.GROUP_NM + ' > ' + turbine_info.TURBINE_NM, 
			MODEL: $('span#MODEL_NM').text() + '_' + $('span#MODEL_POWER').text().replace(' ', ''),
		});
		
		// 팝업창 콘텐츠 삽입
		$('div#layerPopup').html('').html(content);
		
		// ul#BLADEVIEWER_TAB : 블레이드 tab LIST
		// tbody#BLADEVIEWER_DAMAGE_LIST : 데미지 리스트 
		// td#BLADEVIEWER_DAMAGE_AREA : 데미지 영역 
		// td#BLADEVIEWER_FROM_R : 프롬루트 
		// td#BLADEVIEWER_FROM_LE
		// td#BLADEVIEWER_HORIZ
		// td#BLADEVIEWER_VERTI
		// ul#BLADEVIEWER_FILE_LIST : 파일 리스트  
		
		/* 팝업 콘텐츠 채우기 */
		// 블레이드 탭 
		Object.entries(blade_spec).forEach(([k,v]) => {
			if(k.includes('BLADE')) {
				
				// 손상 리스트 찾기 
				var DAMAGE_LIST = $('tbody#DAMAGE_LIST tr').toArray().reduce((acc, e, i) => {
					var info = $(e).prop('info');
					if(info.BLD_NUM === v.BLADE_NUM) acc.push(info);
                    return acc;
				}, []);
				
				// tab 생성, 프로퍼티 추가, 클릭 이벤트 
				var tab = $(_oam_elements.oam_0301.popup.li_blade_viewer_tab({
					BLADE_NUM: v.BLADE_NUM,
					BLADE_SERIAL_NUM: v.BLADE_SERIAL_NUM,
				})).prop('info', Object.assign(v, {DAMAGE_LIST: DAMAGE_LIST})).click(function() {
					// active 제어 
					$(this).addClass('active').siblings('li').removeClass('active');
					
					// 블레이드 정보 
					var info = $(this).prop('info');
					
					// 블레이드 뷰어 생성
					viewer.restore('A').setBladeLength(info.BLADE_LENGTH).drawRuler().drawRulerFigure().mirroringToImgTag('#img');
					viewer.save('B');
					viewer.restore('B').emptyDamageList().mirroringToImgTag('#img');
					
					// 손상 내역 리스트 초기화 
					$('#layerPopup tbody#BLADEVIEWER_DAMAGE_LIST').html('');
					
					// 손상 내역 상세 보기 초기화 
					$('#layerPopup td#BLADEVIEWER_DAMAGE_AREA').html('');
					$('#layerPopup td#BLADEVIEWER_FROM_R').html('');
					$('#layerPopup td#BLADEVIEWER_FROM_LE').html('');
					$('#layerPopup td#BLADEVIEWER_HORIZ').html('');
					$('#layerPopup td#BLADEVIEWER_VERTI').html('');
					
					// 첨부파일 리스트 초기화 
					$('#layerPopup ul#BLADEVIEWER_FILE_LIST').html('');
					if(viewer_slider) viewer_slider.destroySlider();
					
					// 손상 내역
					if(info.DAMAGE_LIST.length) {
						
						// 손상 내역 리스트 
						info.DAMAGE_LIST.forEach((e, i) => {
							
							// 뷰어 손상 내역 표시 
							viewer.drawDamage({
								NUM: i+1,
								DMG_AREA: e.DMG_AREA,
								DMG_SEVERITY: e.DMG_SEVERITY,
								FROM_R: e.FROM_R,
								FROM_LE: e.FROM_LE,
								HORIZ: e.HORIZ,
								VERTI: e.VERTI
							}).mirroringToImgTag('#img');
						
							// DAMAGE LIST row 생성, 프로퍼티 추가, css, 클릭 이벤트 추가 
							var row = $(_oam_elements.oam_0301.popup.tr_blade_viewer_damage_row({
								NUM: i+1,
								MAINTEN_CD: e.MAINTEN_CODE + ' / ' + e.MAINTEN_LEV1_NM + ' - ' + e.MAINTEN_LEV2_NM,
								DMG_INFO: e.DMG_INFO,
								DMG_SEVERITY: e.DMG_SEVERITY,
								MAINTEN_PLAN: e.MAINTEN_PLAN,
								//ATTACHMENT_CNT: '+ ' + e.DMG_FILE_LIST.length,
								ATTACHMENT_CNT: '+ ' + e.DMG_FILE_LIST.filter((file) => file.PROCESS !== 'DELETE').length,
							})).prop('info', e).css('cursor', 'pointer')
							// DAMAGE row 클릭 이벤트 
							.click(function() {
								// 손상 내역 정보 
								var damage_info = $(this).prop('info');
								
								// 손상 내역 상세 정보 표시 
								$('#layerPopup td#BLADEVIEWER_DAMAGE_AREA').html(damage_info.DMG_AREA);
								$('#layerPopup td#BLADEVIEWER_FROM_R').html(damage_info.FROM_R + ' m');
								$('#layerPopup td#BLADEVIEWER_FROM_LE').html(damage_info.FROM_LE + ' m');
								$('#layerPopup td#BLADEVIEWER_HORIZ').html(damage_info.HORIZ + ' m');
								$('#layerPopup td#BLADEVIEWER_VERTI').html(damage_info.VERTI + ' m');
								
								// 손상 내역 파일 리스트 초기화 
								$('#layerPopup ul#BLADEVIEWER_FILE_LIST').html('');
								if(viewer_slider) viewer_slider.destroySlider();
								
								// 손상 내역 파일 리스트
								damage_info.DMG_FILE_LIST.forEach((e2, i2) => {
									
									var src;
									if(e2.PROCESS === 'INSERT') src = URL.createObjectURL($('form#fileStorage input#DAMAGE_FILE_' + e2.ID)[0].files[0]);
									if(e2.PROCESS === 'UPDATE') src = ctx + '/oam2/oam_0200/imageView' + e2.FLE_PATH + '/' + e2.NEW_FLE_NM;
									if(e2.PROCESS === 'DELETE') return false;
									
									// 파일 li 생성 
									var li = _oam_elements.oam_0301.popup.li_blade_viewer_damage_file({
										SRC: src,
										FILE_INFO: e2.FILE_INFO
									});
									
									// li 삽입 
									$('#layerPopup ul#BLADEVIEWER_FILE_LIST').append(li);
								});
								
								// 팝업창 슬라이더
								viewer_slider = $('#layerPopup ul#BLADEVIEWER_FILE_LIST').bxSlider({
									//pager: true,
									//controls: true,
									//infiniteLoop: false,
									//hideControlOnEnd: true,
									//captions: true,
									//auto: true,
									//pause: 3000,
									//autoControls : true,
									//mode: 'fade',
									//slideWidth: 600,
								});
							});
							// row 삽입 
							$('#layerPopup tbody#BLADEVIEWER_DAMAGE_LIST').append(row);
						});
						// 뷰어 손생 내역 번호 표시 
						viewer.drawNumber().mirroringToImgTag('#img');
					} else {
						// DAMAGE LIST 없을 경우 
						$('#layerPopup tbody#BLADEVIEWER_DAMAGE_LIST').append(_oam_elements.oam_0301.popup.tr_blade_viewer_no_damage_row());
					}
				});
				
				// tab 삽입
				$('ul#BLADEVIEWER_TAB').append(tab);
			}
		});
		// 첫번째 탭 클릭 
		$('ul#BLADEVIEWER_TAB li:eq(0)').click();
		
		/* 팝업 콘텐츠 채우기 */
		
		scroll_target = '#scroll_target';
	}
	
	/* 스크롤 높이 구하기 */
	if(TYPE === 'DAMAGE') {
		var cont_h = parseInt($('#layerPopup .layer-cont').css('height').replace('px', ''));
		var cont_p_t = parseInt($('#layerPopup .layer-cont').css('padding-top').replace('px', ''));
		var cont_p_b = parseInt($('#layerPopup .layer-cont').css('padding-bottom').replace('px', ''));
		var btn_h = parseInt($('#layerPopup .txt-right').css('height').replace('px', ''));
		
		var h = cont_h - cont_p_t - cont_p_b - btn_h - 40;
		// 왼쪽 
		$("#layerPopup " + scroll_target).css('max-height', h + 'px');
		$("#layerPopup " + scroll_target).css('min-height', h + 'px');
		// 오른쪽 
		$("#layerPopup div.system-right").css('max-height', h + 'px');
		$("#layerPopup div.system-right").css('min-height', h + 'px');
		
		// 블레이드 뷰어 스크롤 활성화 
		$("#layerPopup div.system-right").mCustomScrollbar({
			axis: "Y",
			theme: "minimal-dark",
			mouseWheelPixels: 300
		});
	}
	
	if(TYPE === 'BLADEVIEWER') {
		var cont_h = parseInt($('#layerPopup .layer-cont').css('height').replace('px', ''));
		var cont_p_t = parseInt($('#layerPopup .layer-cont').css('padding-top').replace('px', ''));
		var cont_p_b = parseInt($('#layerPopup .layer-cont').css('padding-bottom').replace('px', ''));
		
		var tit_h = parseInt($('#layerPopup .tit-wrap').css('height').replace('px', ''));
		var tit_m_b = parseInt($('#layerPopup .tit-wrap').css('margin-bottom').replace('px', ''));
		
		var info_h = parseInt($('#layerPopup .blade-info-lst').css('height').replace('px', ''));
		var info_m_b = parseInt($('#layerPopup .blade-info-lst').css('margin-bottom').replace('px', ''));
		var info_p_b = parseInt($('#layerPopup .blade-info-lst').css('padding-bottom').replace('px', ''));
		
		var tab_h = parseInt($('#layerPopup ul.tab2').css('height').replace('px', ''));
		var tab_m_b = parseInt($('#layerPopup ul.tab2').css('margin-bottom').replace('px', ''));
		
		// 높이 구하기 
		var h = cont_h - cont_p_t - cont_p_b - (tit_h + tit_m_b) - (info_h + info_m_b + info_p_b) - (tab_h + tab_m_b);
		
		// 왼쪽 
		$("#layerPopup " + scroll_target).css('max-height', h + 'px');
		$("#layerPopup " + scroll_target).css('min-height', h + 'px');
		// 오른쪽 
		$("#layerPopup div#scroll_viewer").css('max-height', h + 'px');
		$("#layerPopup div#scroll_viewer").css('min-height', h + 'px');
		
		// 블레이드 뷰어 스크롤 활성화 
		$("#layerPopup div#scroll_viewer").mCustomScrollbar({
			axis: "Y",
			theme: "minimal-dark",
			mouseWheelPixels: 300
		});
	}
	/* 스크롤 높이 구하기 */
	
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
	var blade_num = $(this).parents('div.layer-cont').attr('blade-num');
	
	
	// TURBINE, COMPANY, WORKERS 등록 일 경우 
	if(isRegister && ['TURBINE', 'COMPANY', 'WORKERS', 'MODEL', 'BLADETYPE', 'BLADECOLOR', 'DRONE'].includes(type)) {
		// 체크 리스트 조회
		var check_list = $('tbody#popup_list input[type="radio"]:checked, tbody#popup_list input[type="checkbox"]:checked');
		// 체크 항목 없을 경우 
		if(!check_list.length) return;
		// 체크 항목 정보 가져오기  
		var info_list = check_list.toArray().map((e) => $(e).parents('tr').prop('info'));
		
		if(type === 'TURBINE') {
			// input value, property 세팅
			$('input#TURBINE').val(info_list[0].FARM_NM + ' > ' + info_list[0].GROUP_NM + ' > ' + info_list[0].TURBINE_NM);
			$('input#TURBINE').prop('info', info_list[0]);
			
			/* 추후 함수로 나누기 */
			// TURBINE SPEC 입력
			if(info_list[0].MODEL_ID) {
				// MODEL_ID 있을 경우
				$('span#MODEL_NM').text(info_list[0].MODEL_NM);
				$('span#MODEL_MANUFACTURER_LOGO img').attr('src', ctx + '/imageView' + info_list[0].MODEL_MANUFACTURER_FLE_PATH + '/' + info_list[0].MODEL_MANUFACTURER_NEW_FLE_NM);
				$('span#MODEL_MANUFACTURER_NM').text(info_list[0].MODEL_MANUFACTURER_NM);
				$('span#MODEL_POWER').text(info_list[0].MODEL_POWER + ' MW');
				$('span#MODEL_ROTOR_D').text(info_list[0].MODEL_ROTOR_D + ' m');
				$('span#MODEL_TOWER_H').text(info_list[0].MODEL_TOWER_H + ' m');
				
				$('tbody#TURBINE_SPEC td#MODEL_SEARCH_ROW').hide();
				$('tbody#TURBINE_SPEC td[id!=MODEL_SEARCH_ROW]').show();
				
				// 프로퍼티 추가 
				$('tbody#TURBINE_SPEC').prop('info', {PROCESS:'NOT'});
			} else {
				// MODEL_ID 없을 경우
				$('tbody#TURBINE_SPEC td#MODEL_SEARCH_ROW').show();
				$('tbody#TURBINE_SPEC td[id!=MODEL_SEARCH_ROW]').hide();
				
				// 프로퍼티 추가
				$('tbody#TURBINE_SPEC').prop('info', {PROCESS:'INSERT'});
			}
			
			// BLADE SPEC 입력
			if(info_list[0].BLADE_ID_LIST) {
				// BALDE 정보 있을 경우
				var blade_id_list = info_list[0].BLADE_ID_LIST.split(' | '); 
				var blade_num_list = info_list[0].BLADE_NUM_LIST.split(' | ');
				var blade_serial_num_list = info_list[0].BLADE_SERIAL_NUM_LIST.split(' | ');
				var blade_length_list = info_list[0].BLADE_LENGTH_LIST.split(' | ');
				
				var blade_color_id_list = info_list[0].BLADE_COLOR_ID_LIST.split(' | ');
				var blade_color_nm_list = info_list[0].BLADE_COLOR_NM_LIST.split(' | ');
				var blade_color_hex_code_list = info_list[0].BLADE_COLOR_HEX_CODE_LIST.split(' | ');
				
				var blade_type_id_list = info_list[0].BLADE_TYPE_ID_LIST.split(' | ');
				var blade_type_cd_list = info_list[0].BLADE_TYPE_CD_LIST.split(' | ');
				var blade_type_detail_list = info_list[0].BLADE_TYPE_DETAIL_LIST.split(' | ');
				
				blade_num_list.forEach((e, i) => {
					$('span#BLADE' + e + '_SERIAL_NUM').text(blade_serial_num_list[i]);
					$('span#BLADE' + e + '_TYPE').text(blade_type_cd_list[i] + ' (' + blade_type_detail_list[i] + ')');
					$('span#BLADE' + e + '_LENGTH').text(blade_length_list[i] + ' m');
					$('span#BLADE' + e + '_COLOR_NM').text(blade_color_nm_list[i]);
					$('span#BLADE' + e + '_COLOR_NM').css('background', blade_color_hex_code_list[i]);
				});
				
				$('tbody#BLADE_SPEC td[class*=none]').hide();
				$('tbody#BLADE_SPEC td[class=txt-left]').show();
				$('span#BLADE_SPEC_SAVE').hide();
				
				// 프로퍼티 추가  
				var spec = blade_id_list.reduce((acc, e, i) => {
					acc['BLADE' + blade_num_list[i]] = {
						BLADE_ID: e,
						BLADE_NUM: blade_num_list[i],
						BLADE_SERIAL_NUM: blade_serial_num_list[i],
						BLADE_LENGTH: parseFloat(blade_length_list[i]),
						BLADE_COLOR_ID: blade_color_id_list[i],
						BLADE_TYPE_ID: blade_type_id_list[i],
					}
					return acc;
				}, {PROCESS:'NOT', BLADE1:{}, BLADE2:{}, BLADE3:{}});
				$('tbody#BLADE_SPEC').prop('info', spec);
			} else {
				
				// span, input 이전기록 비우기
				$('tbody#BLADE_SPEC [id*=_NONE]').toArray().forEach((e) => {
					if(e.nodeName === 'INPUT') $(e).val('');
					if(e.nodeName === 'SPAN') {
						$(e).text('');
						$(e).parent('span').css('background', '');
					}
				});
				
				// border 경고 초기화 
				$('tbody#BLADE_SPEC [style*=border]').css('border', '');
				
				// BALDE 정보 없을 경우
				$('tbody#BLADE_SPEC td[class*=none]').show();
				$('tbody#BLADE_SPEC td[class=txt-left]').hide();
				$('span#BLADE_SPEC_SAVE').show();
				
				// 프로퍼티 추가 
				$('tbody#BLADE_SPEC').prop('info', {PROCESS:'INSERT', BLADE1:{}, BLADE2:{}, BLADE3:{}});
			}
			
			// DAMAGE, DAMAGE 첨부파일 비우기 
			$('tbody#DAMAGE_LIST tr').remove();
			$('form#fileStorage input').remove();
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
		else if(type === 'MODEL') {
			var info = info_list[0];
			$('span#MODEL_NM').text(info.MODEL_NM);
			$('span#MODEL_MANUFACTURER_LOGO img').attr('src', ctx + '/imageView' + info.MANUFACTURER_FLE_PATH + '/' + info.MANUFACTURER_NEW_FLE_NM);
			$('span#MODEL_MANUFACTURER_NM').text(info.MANUFACTURER_NM);
			$('span#MODEL_POWER').text(info.POWER ? info.POWER + ' MW' : 'X');
			$('span#MODEL_ROTOR_D').text(info.ROTOR_D ? info.ROTOR_D + ' m' : 'X');
			$('span#MODEL_TOWER_H').text(info.TOWER_H ? info.TOWER_H + ' m' : 'X');
			
			$('tbody#TURBINE_SPEC td#MODEL_SEARCH_ROW').hide();
			$('tbody#TURBINE_SPEC td[id!=MODEL_SEARCH_ROW]').show();
			
			$('tbody#TURBINE_SPEC').prop('info', Object.assign(info, {PROCESS:'INSERT'}));
		}
		else if(type === 'BLADETYPE') {
			var info = info_list[0];
			$('span#BLADE' + blade_num + '_TYPE_NONE').text(info.TYPE_CD + (info.TYPE_DETAIL ? ' (' + info.TYPE_DETAIL + ')' : ''));
			
			// 프로퍼티 추가
			$('tbody#BLADE_SPEC').prop('info')['BLADE' + blade_num]['BLADE_TYPE_ID'] = info.TYPE_ID;
			$('tbody#BLADE_SPEC').prop('info')['BLADE' + blade_num]['BLADE_TYPE_CD'] = info.TYPE_CD;
			$('tbody#BLADE_SPEC').prop('info')['BLADE' + blade_num]['BLADE_TYPE_DETAIL'] = info.TYPE_DETAIL;
		}
		else if(type === 'BLADECOLOR') {
			var info = info_list[0];
			$('span#BLADE' + blade_num + '_COLOR_NM_NONE').text(info.COLOR_NM);
			$('span#BLADE' + blade_num + '_COLOR_NM_NONE').parent('span.search-row').css('background', info.COLOR_HEX_CODE);
			
			// 프로퍼티 추가 
			$('tbody#BLADE_SPEC').prop('info')['BLADE' + blade_num]['BLADE_COLOR_ID'] = info.COLOR_ID;
			$('tbody#BLADE_SPEC').prop('info')['BLADE' + blade_num]['BLADE_COLOR_NM'] = info.COLOR_NM;
			$('tbody#BLADE_SPEC').prop('info')['BLADE' + blade_num]['BLADE_COLOR_HEX_CODE'] = info.COLOR_HEX_CODE;
		}
		else if(type === 'DRONE') {
			var info = info_list[0];
			$('span#DRONE_TYPE').text(info.TYPE);
			$('span#DRONE_FLIGHT_TIME').text(info.FLIGHT_TIME ? info.FLIGHT_TIME + ' minutes' : 'X');
			$('span#DRONE_FLIGHT_RNG').text(info.FLIGHT_RNG ? info.FLIGHT_RNG + ' m' : 'X');
			$('span#DRONE_FLIGHT_ALT').text(info.FLIGHT_ALT ? info.FLIGHT_ALT + ' m' : 'X');
			$('span#DRONE_FLIGHT_WIND_SPD').text(info.FLIGHT_WIND_SPD ? info.FLIGHT_WIND_SPD + ' m/s' : 'X');
			$('span#DRONE_FLIGHT_SPD').text(info.FLIGHT_SPD ? info.FLIGHT_SPD + ' m/s' : 'X');
			
			
			$('tbody#DRONE_SPEC td#DRONE_SEARCH_ROW').hide();
			$('tbody#DRONE_SPEC td[id!=DRONE_SEARCH_ROW]').show();
			
			$('tbody#DRONE_SPEC').prop('info', Object.assign(info, {PROCESS:'INSERT'}));
			
			// 변경 버튼
			$('#DRONE_SEARCH_BTN2').show();
		}
	}
	else if(isRegister && ['DAMAGE'].includes(type)) {
		if(type === 'DAMAGE') {
			// validation check
			if(!validationCheck('#layerPopup')) return;
			
			// 프로세스, dmg_id 가져오기 
			var process = $(this).parents('div.layer-cont').attr('process');
			var dmg_id = $(this).parents('div.layer-cont').attr('damage-id');
				
			// 입력 값 가져오기 
			var blade = $('select#BLD_ID option:selected').prop('info');
			var maintenance_code = $('select#MAINTEN_CD option:selected').prop('info');
			var dmg_area = $('select#DMG_AREA option:selected').val();
			var dmg_severity = $('select#DMG_SEVERITY option:selected').val();
			var dmg_info = $('select#DMG_INFO option:selected').val();
			var mainten_plan = $('input#MAINTEN_PLAN').val();
			
			var from_r = $('input#FROM_R').val();
			var from_le = $('input#FROM_LE').val();
			var horiz = $('input#HORIZ').val();
			var verti = $('input#VERTI').val();
			
			if(process === 'ADD') {
				// 샘플 생성  
				var sample = _oam_elements.oam_0301.main.tr_damage_row({
					ID: dmg_id,
					NO: $('tbody#DAMAGE_LIST tr[id*=DAMAGE_]').length + 1,
					BLADE_SERIAL_NUM: blade.BLADE_SERIAL_NUM,
					MAINTEN_CD: maintenance_code.LEV1_PRE_NM + maintenance_code.LEV2_PRE_NM + ' / ' + maintenance_code.LEV1_SUF_NM + ' - ' + maintenance_code.LEV2_SUF_NM,
					DMG_AREA: dmg_area,
					DMG_INFO: dmg_info,
					DMG_SEVERITY: dmg_severity,
					ATTACHMENT_CNT: '+' + $('form#fileStorage input[id*=DAMAGE_FILE_' + dmg_id + ']').length,
				});
				
				// 첨부파일 리스트
				var dmg_file_list = $('tbody#DAMAGE_FILE_LIST tr[id*=DAMAGE_FILE]').toArray().map((e) => {
					return Object.assign($(e).prop('info'), {FILE_INFO: $(e).find('textarea[id*=DAMAGE_FILE_INFO_]').val()});
				});
				
				// 프로퍼티 추가
				sample = $(sample).prop('info', {
					PROCESS: 'INSERT',
					DMG_ID: $(this).parents('div.layer-cont').attr('damage-id'),
					BLADE_INFO: Object.assign({}, blade),
					BLD_ID: blade.BLADE_ID,
					BLD_NUM: blade.BLADE_NUM,
					MAINTEN_CD: maintenance_code.LEV2_CD,
					MAINTEN_CODE: maintenance_code.LEV1_PRE_NM + maintenance_code.LEV2_PRE_NM,
					MAINTEN_LEV1_NM: maintenance_code.LEV1_SUF_NM,
					MAINTEN_LEV2_NM: maintenance_code.LEV2_SUF_NM,
					DMG_AREA: dmg_area,
					DMG_SEVERITY: dmg_severity,
					DMG_INFO: dmg_info,
					MAINTEN_PLAN: mainten_plan,
					FROM_R: parseFloat(from_r),
					FROM_LE: parseFloat(from_le),
					HORIZ: parseFloat(horiz),
					VERTI: parseFloat(verti),
					DMG_FILE_LIST: dmg_file_list,
				});
				
				// 수정 버튼 클릭 이벤트 추가 
				// sample = $(sample).find('span[id*=DAMAGE_UPDATE_]').click(openPopup).parents('tr[id*=DAMAGE_]');
				sample = $(sample).click(openPopup).css('cursor', 'pointer');
				
				// 삭제 버튼 클릭 이벤트 추가 
				sample = $(sample).find('span[id*=DAMAGE_DELETE_]').click(function() {
					// 삭제 컨펌 
					if(!confirm(_MESSAGE.common.deleteConfirm)) return;
					
					var tr = $(this).parents('tr');
					// 첨부 파일 삭제
					$('form#fileStorage input[id*=DAMAGE_FILE_' + tr.prop('info').DMG_ID + ']').remove();
					// tr 삭제
					tr.remove();
					// DAMAGE tr 넘버링 수정
					$('tbody#DAMAGE_LIST tr[id*=DAMAGE_]').toArray().forEach((e, i) => $(e).find('td:eq(0)').text(i+1));
				}).parents('tr[id*=DAMAGE_]');
				
				// 샘플 삽입
				$('tbody#DAMAGE_LIST').append(sample);
			}
			else if(process === 'UPDATE') {
				var target = $('tbody#DAMAGE_LIST tr#DAMAGE_' + dmg_id);
				
				// row 수정
				target.find('td:eq(1)').text(blade.BLADE_SERIAL_NUM);
				target.find('td:eq(2)').text(maintenance_code.LEV1_PRE_NM + maintenance_code.LEV2_PRE_NM + ' / ' + maintenance_code.LEV1_SUF_NM + ' - ' + maintenance_code.LEV2_SUF_NM);
				target.find('td:eq(3)').text(dmg_area);
				target.find('td:eq(4)').text(dmg_info);
				target.find('td:eq(5) span').text(dmg_severity).attr('class', 'num-mark num-mark' + dmg_severity);
				//target.find('td:eq(6)').text('+' + $('form#fileStorage input[id*=DAMAGE_FILE_' + dmg_id + ']').length);
				target.find('td:eq(6)').text('+ ' + $('#layerPopup tbody#DAMAGE_FILE_LIST tr[id*=DAMAGE_FILE_]').not('tr[style*=none]').length);
				
				// 첨부파일 리스트
				var dmg_file_list = $('tbody#DAMAGE_FILE_LIST tr[id*=DAMAGE_FILE]').toArray().map((e) => {
					return Object.assign($(e).prop('info'), {FILE_INFO: $(e).find('textarea[id*=DAMAGE_FILE_INFO_]').val()});
				});
				
				// info 수정
				target.prop('info').BLADE_INFO = Object.assign({}, blade);
				target.prop('info').BLD_ID = blade.BLADE_ID;
				target.prop('info').BLD_NUM = blade.BLADE_NUM;
				target.prop('info').MAINTEN_CD = maintenance_code.LEV2_CD;
				target.prop('info').MAINTEN_CODE = maintenance_code.LEV1_PRE_NM + maintenance_code.LEV2_PRE_NM;
				target.prop('info').MAINTEN_LEV1_NM = maintenance_code.LEV1_SUF_NM;
				target.prop('info').MAINTEN_LEV2_NM = maintenance_code.LEV2_SUF_NM;
				target.prop('info').DMG_AREA = dmg_area;
				target.prop('info').DMG_SEVERITY = dmg_severity;
				target.prop('info').DMG_INFO = dmg_info;
				target.prop('info').MAINTEN_PLAN = mainten_plan;
				target.prop('info').FROM_R = parseFloat(from_r);
				target.prop('info').FROM_LE = parseFloat(from_le);
				target.prop('info').HORIZ = parseFloat(horiz);
				target.prop('info').VERTI = parseFloat(verti);
				target.prop('info').DMG_FILE_LIST = dmg_file_list;
			}
		}
	}
	else {
		console.log('닫기');
		if(type === 'DAMAGE') {
			// 팝업창에서 등록된 첨부파일 삭제 
//			var dmg_id = $(this).parents('div.layer-cont').attr('damage-id');
//			$('form#fileStorage input[id*=DAMAGE_FILE_' + dmg_id + ']').remove();
			$(this).parents('div.layer-cont').find('tbody#DAMAGE_FILE_LIST tr[id*=DAMAGE_FILE_]').not('[not-delete=true]').toArray().map((e) => $(e).attr('id')).forEach((e) => $('form#fileStorage #' + e).remove());
		}
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
		
		else if(TYPE === 'MODEL') {
			// row 생성
			row = _oam_elements.oam_0301.popup.tr_model_row({
				ID: e.MODEL_ID,
				SRC: ctx + '/oam2/oam_0200/imageView' + e.MODEL_FLE_PATH + '/' + e.MODEL_NEW_FLE_NM,
				MODEL_NM: e.MODEL_NM,
				MANUFACTURER_NM: e.MANUFACTURER_NM,
				POWER: e.POWER ? e.POWER + ' MW' : 'X',
				ROTOR_D: e.ROTOR_D ? e.ROTOR_D + ' m' : 'X',
				TOWER_H: e.TOWER_H ? e.TOWER_H + ' m' : 'X',
			});
			
			// 프로퍼티 추가 
			row = $(row).prop('info', e);
			// css, 이벤트 추가 : 팝업 리스트 tr(row) 클릭 이벤트 : tr 클릭 시 check 박스 활성화
			row = $(row).css('cursor', 'pointer').click(function() {
				var id = $(this).attr('id').split('_');
				if(id[2] === 'A') $(this).find('input[type=radio], input[type=checkbox]').prop('checked', true);
				if(id[2] !== 'A') $(this).siblings('tr[id*=tr_' + id[1] + '_A]').find('input[type=radio], input[type=checkbox]').prop('checked', true);
			});
			// 삽입
			$('tbody#popup_list').append(row);
			return false;
		}
		else if(TYPE === 'BLADETYPE') {
			// row 생성
			row = _oam_elements.oam_0301.popup.tr_blade_type_row({
				ID: e.TYPE_ID,
				TYPE_CD: e.TYPE_CD,
				TYPE_DETAIL: e.TYPE_DETAIL,
			});
		}
		else if(TYPE === 'BLADECOLOR') {
			// row 생성
			row = _oam_elements.oam_0301.popup.tr_blade_color_row({
				ID: e.COLOR_ID,
				COLOR: e.COLOR_HEX_CODE,
				COLOR_NM: e.COLOR_NM,
			});
		}
		else if(TYPE === 'DRONE') {
			// row 생성
			row = _oam_elements.oam_0301.popup.tr_drone_row({
				ID: e.DRONE_ID,
				SRC: ctx + '/oam2/oam_0200/imageView' + e.DRONE_FLE_PATH + '/' + e.DRONE_NEW_FLE_NM,
				DRONE_NM: e.DRONE_NM,
				MANUFACTURER_NM: e.MANUFACTURER_NM || 'X' ,
				TYPE: e.TYPE,
				FLIGHT_TIME: e.FLIGHT_TIME ? e.FLIGHT_TIME + ' minutes' : 'X',
				FLIGHT_RNG: e.FLIGHT_RNG ? e.FLIGHT_RNG + ' m' : 'X',
				FLIGHT_ALT: e.FLIGHT_ALT ? e.FLIGHT_ALT + ' m' : 'X',
				FLIGHT_SPD: e.FLIGHT_SPD ? e.FLIGHT_SPD + ' m/s' : 'X',
				FLIGHT_WIND_SPD: e.FLIGHT_WIND_SPD ? e.FLIGHT_WIND_SPD + ' m/s' : 'X',
			});
			
			// 프로퍼티 추가 
			row = $(row).prop('info', e);
			// css, 이벤트 추가 : 팝업 리스트 tr(row) 클릭 이벤트 : tr 클릭 시 check 박스 활성화
			row = $(row).css('cursor', 'pointer').click(function() {
				var id = $(this).attr('id').split('_');
				if(id[2] === 'A') $(this).find('input[type=radio], input[type=checkbox]').prop('checked', true);
				if(id[2] !== 'A') $(this).siblings('tr[id*=tr_' + id[1] + '_A]').find('input[type=radio], input[type=checkbox]').prop('checked', true);
			});
			// 삽입
			$('tbody#popup_list').append(row);
			return false;
		}
		else if(TYPE === 'DAMAGE') {
			
			// option 생성 및 추가 (MAINTEN_CD: 블레이드 관련)
			row = $('<option value="' + e.LEV2_CD + '">' + e.LEV1_PRE_NM + e.LEV2_PRE_NM + ' / ' + e.LEV1_SUF_NM + ' - ' + e.LEV2_SUF_NM + '</option>');
			row = $(row).prop('info', e);
			$('#layerPopup select#MAINTEN_CD').append(row);
			
			return false;
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

/* 비행 시간 추가 */
function addFlight() {
	
	// id 생성 - 현재 갯수
	//id = $('div#FLIGHT_LIST > div.base_grid_table > table > tbody[id*=FLIGHT_]').length;
	var id = moment().valueOf();
	
	// sample 생성
	var sample = _oam_elements.oam_0301.main.div_flight_row({ID: id});
	
	/****** 추가 이벤트 ******/
	// 온도, 풍속, 습도 input : 소수 입력, 붙여넣기 해제, 한글 삭제 이벤트 추가  
	sample = $(sample).find('input[id*=TEMPERATURE], input[id*=WIND_SPEED], input[id*=HUMIDITY]').keypress(_oam.isNumberKey).parents('div.base_grid_table');
	sample = $(sample).find('input[id*=TEMPERATURE], input[id*=WIND_SPEED], input[id*=HUMIDITY]').keyup(_oam.deleteHangul).parents('div.base_grid_table');
	sample = $(sample).find('input[id*=TEMPERATURE], input[id*=WIND_SPEED], input[id*=HUMIDITY]').keydown(_oam.isPasteUnable).parents('div.base_grid_table');
	// 프로퍼티 추가 
	sample = $(sample).find('tbody[id*=FLIGHT_]').prop('info', {
		ID: id.toString(),
		PROCESS: 'INSERT',
	}).parents('div.base_grid_table');
	// 작업 시간(시작, 종료) 변경 event 추가, datepicker 활성화 - @TODO : EVENT 중복 적용 수정 
	$(sample).find('input.datetimepicker').change(checkReportTime).setDateTimePicker('yy-mm-dd');
	// 삭제 버튼 클릭 이벤트 
	sample = $(sample).find('span[id*=DELETE_BTN]').css('cursor', 'pointer').click(function(){
		// 삭제 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 갯수 조회 
		var flight_cnt = $('tbody[id*=FLIGHT_]').toArray().filter((e) => $(e).prop('info').PROCESS !== 'DELETE').length;
		// 작업이 1개 일 경우 => 삭제 불가 
		if(flight_cnt <= 1) return alert(_MESSAGE.oam.deleteFlightAlert); 
		// 삭제 
		$(this).parents('div.base_grid_table').remove();
	}).parents('div.base_grid_table');
	/****** 추가 이벤트 ******/
	
	$('div#FLIGHT_LIST').append(sample);
	/*
	 * 	selectbox 이벤트 => /script/common/common.js
	 *  : selectbox 변경 시, label 변경 
	 */
	initialControl();
}


/* 총 작업 시간 계산 */
function checkReportTime() {
	
	// 현재 등록 된 WORK 의 TIME을 전체 체크
	var time = $('input.datetimepicker.hasDatepicker').toArray().reduce((acc, e) => { 
		acc.push({START_TIME:$(e).val(), END_TIME: $(e).val()});
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
	
	if(root) return check;
	
	// Fight 타임 에러
	if(check) {
		$('tbody[id*=FLIGHT_]').toArray().filter((e) => {
			var a = $(e).find('input[id*=FLIGHT_START_TIME]').val();
			var b = $(e).find('input[id*=FLIGHT_END_TIME]').val();
			if(a && b) {
				a = moment(a), b = moment(b);
				if(b.isBefore(a)) {
					$(e).find('input[id*=FLIGHT_START_TIME]').vcWarning(_MESSAGE.common.timeError);
					$(e).find('input[id*=FLIGHT_END_TIME]').vcWarning(_MESSAGE.common.timeError);
					check = false;
				}
			}
		});
	}
	
	// 발전기 스펙 체크
	var turbine_spec = $('tbody#TURBINE_SPEC').prop('info');
	if(check && turbine_spec.PROCESS === 'INSERT' && !turbine_spec.MODEL_ID) { 
		// 스크롤 이동, 검색 버튼 경고 표시
		alert(_MESSAGE.oam.alertSelectTurbineModel);
		_oam.moveScrollToTargetPosition('tbody#TURBINE_SPEC');
		$('a#MODEL_SEARCH_BTN').css('color', 'red');
		check = false;
	}
	
	// 블레이드 스펙 체크
	var blade_spec = $('tbody#BLADE_SPEC').prop('info');
	if(check && blade_spec.PROCESS === 'INSERT' && !blade_spec.BLADE1.BLADE_ID) {
		// 스크롤 이동, 저장 버튼 경고 표시
		alert(_MESSAGE.oam.alertSaveBladeSpec);
		_oam.moveScrollToTargetPosition('span#BLADE_SPEC_SAVE');
		$('span#BLADE_SPEC_SAVE').css('border-color', 'red');
		check = false;
	}
	
	// 드론 스펙 체크
	var drone_spec = $('tbody#DRONE_SPEC').prop('info');
	if(check && !drone_spec) {
		// 스크롤 이동, 저장 버튼 경고 표시
		alert(_MESSAGE.oam.alertSaveDroneSpec);
		_oam.moveScrollToTargetPosition('a#DRONE_SEARCH_BTN');
		$('a#DRONE_SEARCH_BTN').css('color', 'red');
		check = false;
	}
	
	// DAMAGE 체크
	if(check && !$('tbody#DAMAGE_LIST tr[id*=DAMAGE_]').length) {
		// 스크롤 이동
		alert(_MESSAGE.oam.alertRegisterBladeDamage);
		_oam.moveScrollToTargetPosition('tbody#DAMAGE_LIST');
		check = false;
	}
	
	return check; 
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
	if(type === 'DAMAGE') id = $(this).parents('div.layer-cont').attr('damage-id') + '_' + moment().valueOf();
	
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
		var name = type + '_FILE';
		if(['WORK', 'DAMAGE'].includes(type)) name = type + '_FILE_' + id.split('_')[0];
		var copy = _oam.copyTag(this, {id: type + '_FILE_' + id, name: name});
		// form에 추가
		$('form#fileStorage').append(copy);
	}
	
	// 초기화
	$(this).val(null);
}

/* 파일 삭제 */
function deleteFile() {
	
	// 삭제 컨펌 
	if(!confirm(_MESSAGE.common.deleteConfirm)) return;
	
	// info 가져오기 
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

/* 저장 */
function save() {
	
//	// OVERVIEW 체크
//	if(!validationCheck('div#OVERVIEW')) {
//		// 스크롤 이동
//		_oam.moveScrollToTargetPosition('div#OVERVIEW');
//		return;
//	}
//	
//	// 발전기 스펙 체크
//	var turbine_spec = $('tbody#TURBINE_SPEC').prop('info');
//	if(turbine_spec.PROCESS === 'INSERT' && !turbine_spec.MODEL_ID) { 
//		// 스크롤 이동, 검색 버튼 경고 표시
//		alert(_MESSAGE.oam.alertSelectTurbineModel);
//		_oam.moveScrollToTargetPosition('tbody#TURBINE_SPEC');
//		$('a#MODEL_SEARCH_BTN').css('color', 'red');
//		return;
//	}
//	
//	// 블레이드 스펙 체크
//	var blade_spec = $('tbody#BLADE_SPEC').prop('info');
//	if(blade_spec.PROCESS === 'INSERT' && !blade_spec.BLADE1.BLADE_ID) {
//		// 스크롤 이동, 저장 버튼 경고 표시
//		alert(_MESSAGE.oam.alertSaveBladeSpec);
//		_oam.moveScrollToTargetPosition('span#BLADE_SPEC_SAVE');
//		$('span#BLADE_SPEC_SAVE').css('border-color', 'red');
//		return;
//	}
//	
//	// 드론 스펙 체크
//	var drone_spec = $('tbody#DRONE_SPEC').prop('info');
//	if(!drone_spec) {
//		// 스크롤 이동, 저장 버튼 경고 표시
//		alert(_MESSAGE.oam.alertSaveDroneSpec);
//		_oam.moveScrollToTargetPosition('a#DRONE_SEARCH_BTN');
//		$('a#DRONE_SEARCH_BTN').css('color', 'red');
//		return;
//	}
//	
//	// 비행시간 체크
//	if(!validationCheck('div#FLIGHT_LIST')) {
//		// 스크롤 이동
//		_oam.moveScrollToTargetPosition('div#FLIGHT_LIST');
//		return;
//	}
//	
//	// DAMAGE 체크
//	if(!$('tbody#DAMAGE_LIST tr[id*=DAMAGE_]').length) {
//		// 스크롤 이동
//		alert(_MESSAGE.oam.alertRegisterBladeDamage);
//		_oam.moveScrollToTargetPosition('tbody#DAMAGE_LIST');
//		return;
//	}
	
	// validation check
	if(!validationCheck()) return;
	
	// 파라미터 생성
	var param = createParameter();
	console.log(param);
	
	// 파일 관련 FormData 생성  
	var formData = new FormData($('#fileStorage')[0]);
	
	// formData에 param 옮겨 닮기 
	for(let [key, value] of Object.entries(param)) {
	    console.log(key, value, _oam.getType(value));
	    
	    // 배열인 항목은 JSON String으로 변환
	    formData.append(key, 
	    		['object', 'array'].includes(_oam.getType(value)) 
	    		? JSON.stringify(value) : value);
	}
	
	// 블레이드 별 손상 리스트 생성  
	var blade_damages = $('tbody#DAMAGE_LIST tr').not('[style*=none]').toArray().reduce((acc, e) => {
		var info = $(e).prop('info');
		if(info.BLD_NUM === '1') acc.BLADE1.push(info);
		else if(info.BLD_NUM === '2') acc.BLADE2.push(info);
		else if(info.BLD_NUM === '3') acc.BLADE3.push(info);
		return acc;
	}, {BLADE1:[], BLADE2:[], BLADE3:[]});
	
	// 블레이드 별 손상 이미지 그리기
	var blade_spec = $('tbody#BLADE_SPEC').prop('info');
	
	// BLADE1
	// 블레이드 뷰어 초기화
	if(blade_damages.BLADE1.length) {
		viewer.restore('A').emptyDamageList().setBladeLength(blade_spec.BLADE1.BLADE_LENGTH).drawRuler().drawRulerFigure();
		blade_damages.BLADE1.forEach((e, i) => {
			
			// 뷰어 손상 내역 표시 
			viewer.drawDamage({
				NUM: i+1,
				DMG_AREA: e.DMG_AREA,
				DMG_SEVERITY: e.DMG_SEVERITY,
				FROM_R: e.FROM_R,
				FROM_LE: e.FROM_LE,
				HORIZ: e.HORIZ,
				VERTI: e.VERTI
			});
		});
		var base64 = viewer.drawNumber().canvasToBase64();
		var file = _oam.convertBase64ToFile(base64, 'blade1.png');
		formData.append('BLADE1_IMG', file);
	}
	
	// BLADE2
	// 블레이드 뷰어 초기화
	if(blade_damages.BLADE2.length) {
		viewer.restore('A').emptyDamageList().setBladeLength(blade_spec.BLADE2.BLADE_LENGTH).drawRuler().drawRulerFigure();
		blade_damages.BLADE2.forEach((e, i) => {
			
			// 뷰어 손상 내역 표시 
			viewer.drawDamage({
				NUM: i+1,
				DMG_AREA: e.DMG_AREA,
				DMG_SEVERITY: e.DMG_SEVERITY,
				FROM_R: e.FROM_R,
				FROM_LE: e.FROM_LE,
				HORIZ: e.HORIZ,
				VERTI: e.VERTI
			});
		});
		var base64 = viewer.drawNumber().canvasToBase64();
		var file = _oam.convertBase64ToFile(base64, 'blade2.png');
		formData.append('BLADE2_IMG', file);
	}
	
	// BLADE3
	// 블레이드 뷰어 초기화
	if(blade_damages.BLADE3.length) {
		viewer.restore('A').emptyDamageList().setBladeLength(blade_spec.BLADE3.BLADE_LENGTH).drawRuler().drawRulerFigure();
		blade_damages.BLADE3.forEach((e, i) => {
			
			// 뷰어 손상 내역 표시 
			viewer.drawDamage({
				NUM: i+1,
				DMG_AREA: e.DMG_AREA,
				DMG_SEVERITY: e.DMG_SEVERITY,
				FROM_R: e.FROM_R,
				FROM_LE: e.FROM_LE,
				HORIZ: e.HORIZ,
				VERTI: e.VERTI
			});
		});
		var base64 = viewer.drawNumber().canvasToBase64();
		var file = _oam.convertBase64ToFile(base64, 'blade3.png');
		formData.append('BLADE3_IMG', file);
	}
	
	
	// 저장 
	var data = _oam.mariaDB.saveFile(ctx + '/oam2/oam_0300/reportRegister/saveReport.ajax', formData);
	console.log(data);
	
	if(data.RPT_INSERT_CNT > 0 || data.RPT_UPDATE_CNT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		if($('input#FROM_TOTALVIEW').val() === 'Y') window.location = ctx + '/oam2/oam_0500/totalView?EVENT_ID=' + $('input#EVENT_ID').val();
		else if($('input#EVENT_ID').val()) window.location = ctx + '/oam2/oam_0300/reportDetail?RPT_ID=' + data.RPT_ID  + '&EVENT_ID=' + $('input#EVENT_ID').val();
		else window.location = ctx + '/oam2/oam_0300/reportDetail?RPT_ID=' + data.RPT_ID;
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
		param.BLD_INSP_ID = $('input#BLD_INSP_ID').val();
		
		// 이전 블레이드 손상 이미지 저장 
		param.DELETE_BLADE_IMG_LIST = [];
		var img1 = $('input#BLADE1_IMG').prop('info');
		var img2 = $('input#BLADE2_IMG').prop('info');
		var img3 = $('input#BLADE3_IMG').prop('info');
		
		if(img1) param.DELETE_BLADE_IMG_LIST.push(img1);
		if(img2) param.DELETE_BLADE_IMG_LIST.push(img2);
		if(img3) param.DELETE_BLADE_IMG_LIST.push(img3);
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
	
	/* 발전기 스펙 */
	var turbine_spec = $('tbody#TURBINE_SPEC').prop('info');
	if(turbine_spec.PROCESS === 'INSERT') param.MODEL_ID = turbine_spec.MODEL_ID;
	
	/* 블레이드 스펙 */
	var blade_spec = $('tbody#BLADE_SPEC').prop('info');
	if(turbine_spec.PROCESS === 'INSERT') {
		param.BLADE1 = Object.assign({}, blade_spec.BLADE1);
		param.BLADE2 = Object.assign({}, blade_spec.BLADE2);
		param.BLADE3 = Object.assign({}, blade_spec.BLADE3);
	}
	
	/* 드론 스펙 */
	var drone_spec = $('tbody#DRONE_SPEC').prop('info');
	if(drone_spec) {
		param.DRONE_ID = drone_spec.DRONE_ID;
	}
	
	/* 비행 시간 */
	param.FLIGHT_LIST = $('div#FLIGHT_LIST tbody[id*=FLIGHT_]').toArray().map((e) => {
		var start_time = $(e).find('input[id*=FLIGHT_START_TIME_]').val();
		var end_time = $(e).find('input[id*=FLIGHT_END_TIME_]').val();
		
		return {
			START_TIME: start_time,
			END_TIME: end_time,
			START_TIME_UTC: moment.tz(start_time, _CLIENT.CLIENT_ACCESS_TIMEZONE).tz('UTC').format('YYYY-MM-DD HH:mm:ss'),
			END_TIME_UTC: moment.tz(end_time, _CLIENT.CLIENT_ACCESS_TIMEZONE).tz('UTC').format('YYYY-MM-DD HH:mm:ss'),
			DOWNTIME_YN: $(e).find('input[id*=FLIGHT_CHECK_DOWNTIME_]').prop('checked') ? 'Y' : 'N',
			WEATHER: $(e).find('select[id*=FLIGHT_WEATHER_] option:selected').val(),
			TEMPERATURE: parseFloat($(e).find('input[id*=FLIGHT_TEMPERATURE_]').val()),
			WIND_SPEED: parseFloat($(e).find('input[id*=FLIGHT_WIND_SPEED_]').val()),
			HUMIDITY: parseFloat($(e).find('input[id*=FLIGHT_HUMIDITY_]').val()),
			RMK: $(e).find('input[id*=FLIGHT_RMK_]').val(),
		};
	});
	
	/* 블레이드 손상 내역 */
	var damage_list = $('tbody#DAMAGE_LIST tr[id*=DAMAGE_]').toArray().reduce((acc, e, i) => {
		
		var obj = {};
		var info = Object.assign({}, $(e).prop('info'));
		
		// 첨부파일 리스트
		var file_list = info.DMG_FILE_LIST.reduce((acc2, e2, i2) => {
			
			if(e2.PROCESS === 'INSERT') {
				acc2.FILE_LIST.push({
					FILE_INFO: e2.FILE_INFO,
				});
			}
			else if(e2.PROCESS === 'UPDATE') {
				acc2.FILE_LIST_UPDATE.push({
					ATCH_FLE_SEQ: e2.ATCH_FLE_SEQ,
					FILE_INFO: e2.FILE_INFO,
				});
			}
			else if(e2.PROCESS === 'DELETE') {
				acc2.FILE_LIST_DELETE.push({
					ATCH_FLE_SEQ: e2.ATCH_FLE_SEQ,
					FLE_PATH: e2.FLE_PATH,
					NEW_FLE_NM: e2.NEW_FLE_NM,
					FLE_TP: e2.FLE_TP,
				});
			}
			
			return acc2;
		}, {FILE_LIST:[], FILE_LIST_UPDATE:[], FILE_LIST_DELETE:[]});
		
		var new_info = Object.assign(info, file_list);
		
		
		if(new_info.PROCESS === 'INSERT') acc.DAMAGE_LIST.push(new_info);
		if(new_info.PROCESS === 'UPDATE') acc.DAMAGE_LIST_UPDATE.push(new_info);
		if(new_info.PROCESS === 'DELETE') acc.DAMAGE_LIST_DELETE.push(new_info);
		
		return acc;
	}, {DAMAGE_LIST:[], DAMAGE_LIST_UPDATE:[], DAMAGE_LIST_DELETE:[]});
	param = Object.assign(param, damage_list);
	
	return param;
}

/* 블레이드 뷰어 생성 */
function initViewer() {
	var info = $(this).find('option:selected').prop('info') || $('#layerPopup select#BLD_ID').find('option:selected').prop('info');
	
	console.log(info.BLADE_SERIAL_NUM, info.BLADE_LENGTH);
	viewer.restore('A').setBladeLength(info.BLADE_LENGTH).drawRuler().drawRulerFigure().mirroringToImgTag('#img');
	viewer.save('B');
}

/* 데미지 그리기 */
function drawDamage() {
	console.log($(this));
	
	var area = $('select#DMG_AREA option:selected').val();
	var severity = $('select#DMG_SEVERITY option:selected').val();
	
	var from_r = $('input#FROM_R').val();
	var from_le = $('input#FROM_LE').val();
	var horiz = $('input#HORIZ').val();
	var verti = $('input#VERTI').val();
	
	console.log(area, severity, from_r, from_le, horiz, verti);
	
	viewer.restore('B').emptyDamageList().mirroringToImgTag('#img');
	
	
	if(!area || !severity || !from_r || !from_le || !horiz || !verti) return;
	
	viewer.drawDamage({
		NUM: 1,
		DMG_AREA: area,
		DMG_SEVERITY: severity,
		FROM_R: parseFloat(from_r),
		FROM_LE: parseFloat(from_le),
		HORIZ: parseFloat(horiz),
		VERTI: parseFloat(verti)
	}).mirroringToImgTag('#img');
	
}

/* 수정 페이지에서 실행 될 초기화 함수 */
function modifyInit() {
	// 데이터 조회
	var data = _oam.mariaDB.getData('/oam2/oam_0300/reportDetail/getBldInspReportInfo.ajax', {
		RPT_ID: $('input#RPT_ID').val(),
	});
	// 데이터 없을 경우 return 
	if(!data) return;
	
	// 데이터 변환 
	console.log('변환 전', data);
	data = _oam.convertData.RPT_BLD_INSP(data);
	console.log('변환 후', data);
	
	// OVERVIEW
	$('input#BLD_INSP_ID').val(data.BLD_INSP_ID);
	$('input#RPT_NM').val(data.RPT_NM);
	
	// 블레이드 1,2,3 손상 이미지 정보 담기 => 보고서 수정 시 삭제 후 새로 생성 하기 위해서
	if(data.BLADE1_IMG_ATCH_FLE_SEQ) $('input#BLADE1_IMG').prop('info', {
		ATCH_FLE_SEQ: data.BLADE1_IMG_ATCH_FLE_SEQ,
		FLE_PATH: data.BLADE1_IMG_FLE_PATH,
		NEW_FLE_NM: data.BLADE1_IMG_NEW_FLE_NM
	});
	if(data.BLADE2_IMG_ATCH_FLE_SEQ) $('input#BLADE2_IMG').prop('info', {
		ATCH_FLE_SEQ: data.BLADE2_IMG_ATCH_FLE_SEQ,
		FLE_PATH: data.BLADE2_IMG_FLE_PATH,
		NEW_FLE_NM: data.BLADE2_IMG_NEW_FLE_NM
	});
	if(data.BLADE3_IMG_ATCH_FLE_SEQ) $('input#BLADE3_IMG').prop('info', {
		ATCH_FLE_SEQ: data.BLADE3_IMG_ATCH_FLE_SEQ,
		FLE_PATH: data.BLADE3_IMG_FLE_PATH,
		NEW_FLE_NM: data.BLADE3_IMG_NEW_FLE_NM
	});
	
	$('input#TURBINE').val(data.POSITION);
	$('input#TURBINE').prop('info', {
		FARM_NM: data.FARM_NM,
		GROUP_NM: data.GROUP_NM,
		TURBINE_NM: data.TURBINE_NM,
		TURBINE_ID:data.TURBINE_ID,
	});
	
	$('input#COMPANY').val(data.COMPANY_NM);
	$('input#COMPANY').prop('info', {
		COMPANY_ID:data.COMPANY_ID
	});
	
	$('input#RPT_START_TIME').val(data.START_TIME);
	$('input#RPT_END_TIME').val(data.END_TIME);
	
	$('input#WORKERS').val(data.WORKER_LIST.map((e) => e.WORKER_NM).join(', '));
	$('input#WORKERS').prop('info', data.WORKER_LIST.map((e) => {return {USER_UID: e.WORKER_ID}}));
	
	$('span#REGISTRATOR').text(data.USER_ID);
	
	// 발전기 스펙
	$('tbody#TURBINE_SPEC span#MODEL_NM').text(data.MODEL_NM);
	$('tbody#TURBINE_SPEC span#MODEL_MANUFACTURER_LOGO img').attr('src', ctx + '/imageView' + data.MODEL_MANUFACTURER_FLE_PATH + '/' + data.MODEL_MANUFACTURER_NEW_FLE_NM);
	$('tbody#TURBINE_SPEC span#MODEL_MANUFACTURER_NM').text(data.MODEL_MANUFACTURER_NM);
	$('tbody#TURBINE_SPEC span#MODEL_POWER').text(data.MODEL_POWER ? data.MODEL_POWER + ' MW' : 'X');
	$('tbody#TURBINE_SPEC span#MODEL_ROTOR_D').text(data.MODEL_ROTOR_D ? data.MODEL_ROTOR_D + ' m' : 'X');
	$('tbody#TURBINE_SPEC span#MODEL_TOWER_H').text(data.MODEL_TOWER_H ? data.MODEL_TOWER_H + ' m' : 'X');
	$('tbody#TURBINE_SPEC').prop('info', {PROCESS:'NOT'});
	
	// 블레이드 스펙
	var blade_spec = data.BLADE_LIST.reduce((acc, e, i) => {
		$('tbody#BLADE_SPEC span#BLADE' + e.BLADE_NUM + '_SERIAL_NUM').text(e.BLADE_SERIAL_NUM);
		$('tbody#BLADE_SPEC span#BLADE' + e.BLADE_NUM + '_LENGTH').text(e.BLADE_LENGTH + ' m');
		$('tbody#BLADE_SPEC span#BLADE' + e.BLADE_NUM + '_TYPE').text(e.BLADE_TYPE_CD + ' (' + e.BLADE_TYPE_DETAIL + ')');
		$('tbody#BLADE_SPEC span#BLADE' + e.BLADE_NUM + '_COLOR_NM').text(e.BLADE_COLOR_NM).css('background', e.BLADE_COLOR_HEX_CODE);
		acc['BLADE' + e.BLADE_NUM] = Object.assign({}, e);
		return acc; 
	}, {PROCESS: 'NOT', BLADE1:null, BLADE2:null, BLADE3:null});
	$('tbody#BLADE_SPEC').prop('info', blade_spec);
	
	// 드론 스펙
	$('a#DRONE_SEARCH_BTN2').show();
	$('tbody#DRONE_SPEC span#DRONE_TYPE').text(data.DRONE_TYPE);
	$('tbody#DRONE_SPEC span#DRONE_FLIGHT_TIME').text(data.DRONE_FLIGHT_TIME ? data.DRONE_FLIGHT_TIME + ' minutes' : 'X');
	$('tbody#DRONE_SPEC span#DRONE_FLIGHT_RNG').text(data.DRONE_FLIGHT_RNG ? data.DRONE_FLIGHT_RNG + ' m' : 'X');
	$('tbody#DRONE_SPEC span#DRONE_FLIGHT_ALT').text(data.DRONE_FLIGHT_ALT ? data.DRONE_FLIGHT_ALT + ' m' : 'X');
	$('tbody#DRONE_SPEC span#DRONE_FLIGHT_WIND_SPD').text(data.DRONE_FLIGHT_WIND_SPD ? data.DRONE_FLIGHT_WIND_SPD + ' m/s' : 'X');
	$('tbody#DRONE_SPEC span#DRONE_FLIGHT_SPD').text(data.DRONE_FLIGHT_SPD ? data.DRONE_FLIGHT_SPD + ' m/s' : 'X');
	$('tbody#DRONE_SPEC').prop('info', {PROCESS: 'UPDATE', DRONE_ID: data.DRONE_ID});
	
	// 비행 시간
	data.FLIGHT_LIST.forEach((e) => {
		var row = _oam_elements.oam_0301.main.div_flight_row({
			ID: e.FLIGHT_ID,
		});
		
		row = $(row).find('input[id*=FLIGHT_START_TIME]').val(e.START_TIME).parents('div.base_grid_table');
		row = $(row).find('input[id*=FLIGHT_END_TIME]').val(e.END_TIME).parents('div.base_grid_table');
		row = $(row).find('input[id*=FLIGHT_CHECK_DOWNTIME]').attr('checked', e.DOWNTIME_YN === 'Y').parents('div.base_grid_table');
		row = $(row).find('select[id*=FLIGHT_WEATHER] option[value=' + e.WEATHER + ']').attr('selected', true).parents('div.base_grid_table');
		row = $(row).find('input[id*=FLIGHT_TEMPERATURE]').val(e.TEMPERATURE).parents('div.base_grid_table');
		row = $(row).find('input[id*=FLIGHT_WIND_SPEED]').val(e.WIND_SPEED).parents('div.base_grid_table');
		row = $(row).find('input[id*=FLIGHT_HUMIDITY]').val(e.HUMIDITY).parents('div.base_grid_table');
		row = $(row).find('input[id*=FLIGHT_RMK]').val(e.RMK).parents('div.base_grid_table');
		
		// 작업 시간(시작, 종료) 변경 event 추가, datepicker 활성화 - @TODO : EVENT 중복 적용 수정 
		$(row).find('input.datetimepicker').change(checkReportTime).setDateTimePicker('yy-mm-dd');
		
		// 프로퍼티 추가 
		row = $(row).find('tbody[id*=FLIGHT_]').prop('info', {
			ID: e.FLIGHT_ID,
			PROCESS: 'UPDATE',
		}).parents('div.base_grid_table');
		
		// 삭제 버튼 클릭 이벤트
		row = $(row).find('span[id*=DELETE_BTN]').css('cursor', 'pointer').click(function(){
			// 삭제 컨펌 
			if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			// 갯수 조회 
			var flight_cnt = $('tbody[id*=FLIGHT_]').toArray().filter((e) => $(e).prop('info').PROCESS !== 'DELETE').length;
			// 작업이 1개 일 경우 => 삭제 불가 
			if(flight_cnt <= 1) return alert(_MESSAGE.oam.deleteFlightAlert); 
			// 숨김 처리 
			$(this).parents('div.base_grid_table').remove();
			// 프로세스 변경
			//$(this).parents('div.base_grid_table').find('tbody[id*=FLIGHT_]').prop('info').PROCESS = 'DELETE';
		}).parents('div.base_grid_table');
		
		$('div#FLIGHT_LIST').append(row);
	});
	/*
	 * 	selectbox 이벤트 => /script/common/common.js
	 *  : selectbox 변경 시, label 변경 
	 */
	initialControl();
	
	// 손상 내역 
	data.DAMAGE_LIST.forEach((e, i) => {
		var row = _oam_elements.oam_0301.main.tr_damage_row({
			ID: e.DMG_ID,
			NO: i+1,
			BLADE_SERIAL_NUM: e.BLADE_INFO.BLADE_SERIAL_NUM,
			MAINTEN_CD: e.MAINTEN_CODE + ' / ' + e.MAINTEN_LEV1_NM + ' - ' + e.MAINTEN_LEV2_NM,
			DMG_AREA: e.DMG_AREA,
			DMG_INFO: e.DMG_INFO,
			DMG_SEVERITY: e.DMG_SEVERITY,
			ATTACHMENT_CNT: '+ ' + e.DMG_FILE_LIST.length,
		});
		// prop 추가
		row = $(row).prop('info', e);
		
		// 수정 버튼 클릭 이벤트 추가 
		//row = $(row).find('span[id*=DAMAGE_UPDATE_]').click(openPopup).parents('tr[id*=DAMAGE_]');
		row = $(row).click(openPopup).css('cursor', 'pointer');
		
		// 삭제 버튼 클릭 이벤트 추가 
		row = $(row).find('span[id*=DAMAGE_DELETE_]').click(function() {
			
			// 삭제 컨펌 
			if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			
			var tr = $(this).parents('tr');
			
			// 첨부 파일 삭제
			$('form#fileStorage input[id*=DAMAGE_FILE_' + tr.prop('info').DMG_ID + ']').remove();
			
			// 손상 내역 삭제 시 첨부파일 	PROCESS = DELETE로 바꾸고 PROCESS = INSERT는 걸러내기   
			var newFileList = tr.prop('info').DMG_FILE_LIST.reduce((acc, e) => {
				if(e.PROCESS === 'UPDATE') e.PROCESS = 'DELETE';
				if(e.PROCESS === 'DELETE') acc.push(e);
				return acc;
			}, []);
			tr.prop('info').DMG_FILE_LIST = newFileList;
			
			// tr 숨기기
			tr.hide();
			tr.prop('info').PROCESS = 'DELETE';
			
			// DAMAGE tr 넘버링 수정
			$('tbody#DAMAGE_LIST tr[id*=DAMAGE_]').not('[style*=none]').toArray().forEach((e, i) => $(e).find('td:eq(0)').text(i+1));
			
		}).parents('tr[id*=DAMAGE_]');
		
		// 삽입 
		$('tbody#DAMAGE_LIST').append(row);
	});
	
}
