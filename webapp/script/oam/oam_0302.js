var viewer; // 블레이드 뷰어 캔버스 객체 
var viewer_slider; // 블레이드 뷰어 슬라이더
function oam0302() {
	// 데이터 조회
	var data = _oam.mariaDB.getData('/oam2/oam_0300/reportDetail/getBldInspReportInfo.ajax', {
		RPT_ID: $('input#RPT_ID').val(),
	});
	// 데이터 없을 경우 return 
	if(!data) return;
	// 작성자와 사용자의 UID가 다를 경우 삭제, 수정 불가
	if(data.INS_ID != _CLIENT.USER_UID) {
		// 수정, 삭제 버튼 삭제 
		$('span#modify_btn').remove();
		$('span#delete_btn').remove();
	} else {
		// 수정 버튼 클릭 이벤트
		$('span#modify_btn').click(function() {
			if($('input#EVENT_ID').val()) window.location = ctx + '/oam2/oam_0300/reportModify?RPT_ID=' + $('input#RPT_ID').val() + '&EVENT_ID=' + $('input#EVENT_ID').val();
			else window.location = ctx + '/oam2/oam_0300/reportModify?RPT_ID=' + $('input#RPT_ID').val();
		});
		
		// 삭제 버튼 클릭 이벤트
		$('span#delete_btn').click(function() {
			
			// 삭제여부 컨펌
			if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			// 삭제 요청 
			var result = _oam.mariaDB.getData('/oam2/oam_0300/reportDetail/deleteReport.ajax', {
				RPT_ID: $('input#RPT_ID').val(),
			});
			console.log(result);
			// 삭제 성공
			if(result.IS_DELETE_RPT) {
				alert(_MESSAGE.common.deleteSuccess);
				window.location = ctx + '/oam2/oam_0300/main';
			} 
			// 삭제 실패
			else {
				alert(_MESSAGE.common.deleteFail);
			}
		});
	}
	
	// 데이터 변환 
	console.log('변환 전', data);
	data = _oam.convertData.RPT_BLD_INSP(data);
	console.log('변환 후', data);
	
	// OverView
	$('span#RPT_NM').append(data.RPT_NM);
	$('span#TURBINE').text(data.POSITION).prop('info', {
		FARM_NM: data.FARM_NM,
		GROUP_NM: data.GROUP_NM,
		TURBINE_NM: data.TURBINE_NM
	});
	$('span#COMPANY').text(data.COMPANY_NM);
	$('span#RPT_TIME').text(data.START_TIME + ' ~ ' + data.END_TIME);
	$('span#RPT_TOTAL_TIME').text(_oam.toStringTimeDiff({START: data.START_TIME, END: data.END_TIME}));
	$('span#WORKERS').text(data.WORKER_LIST.map((e) => e.WORKER_NM).join(', '));
	$('span#REGISTRATOR').text(data.USER_ID);
	
	// 발전기 스펙
	$('span#MODEL_NM').text(data.MODEL_NM);
	$('span#MODEL_MANUFACTURER_LOGO img').attr('src', ctx + '/imageView' + data.MODEL_MANUFACTURER_FLE_PATH + '/' + data.MODEL_MANUFACTURER_NEW_FLE_NM);
	$('span#MODEL_MANUFACTURER_NM').text(data.MODEL_MANUFACTURER_NM);
	$('span#MODEL_POWER').text(data.MODEL_POWER + ' MW');
	$('span#MODEL_ROTOR_D').text(data.MODEL_ROTOR_D + ' m');
	$('span#MODEL_TOWER_H').text(data.MODEL_TOWER_H + ' m');
	
	// 블레이드 스펙
	var blade_info = data.BLADE_LIST.reduce((acc, e) => {
		var num = e.BLADE_NUM;
		$('span#BLADE' + num + '_SERIAL_NUM').text(e.BLADE_SERIAL_NUM);
		$('span#BLADE' + num + '_LENGTH').text(e.BLADE_LENGTH + ' m');
		$('span#BLADE' + num + '_TYPE').text(e.BLADE_TYPE_CD + '(' + e.BLADE_TYPE_DETAIL + ')');
		$('span#BLADE' + num + '_COLOR_NM').text(e.BLADE_COLOR_NM);
		$('span#BLADE' + num + '_COLOR_NM').css('background', e.BLADE_COLOR_HEX_CODE);
		
		acc['BLADE' + e.BLADE_NUM] = e;
		return acc; 
	}, {});
	$('tbody#BLADE_SPEC').prop('info', blade_info);
	
	
	// 드론 스펙
	$('span#DRONE_TYPE').text(data.DRONE_TYPE ? data.DRONE_TYPE : 'X');
	$('span#DRONE_FLIGHT_TIME').text(data.DRONE_FLIGHT_TIME ? data.DRONE_FLIGHT_TIME+ ' minutes' : 'X');
	$('span#DRONE_FLIGHT_RNG').text(data.DRONE_FLIGHT_RNG ? data.DRONE_FLIGHT_RNG + ' m' : 'X');
	$('span#DRONE_FLIGHT_ALT').text(data.DRONE_FLIGHT_ALT ? data.DRONE_FLIGHT_ALT + ' m' : 'X');
	$('span#DRONE_FLIGHT_WIND_SPD').text(data.DRONE_FLIGHT_WIND_SPD ? data.DRONE_FLIGHT_WIND_SPD + ' m/s' : 'X');
	$('span#DRONE_FLIGHT_SPD').text(data.DRONE_FLIGHT_SPD ? data.DRONE_FLIGHT_SPD + ' m/s' : 'X');
	
	// 비행 시간
	data.FLIGHT_LIST.forEach((e) => {
		var row = _oam_elements.oam_0302.main.div_flight_row({
			ID: e.FLIGHT_ID,
			WORK_TIME: e.START_TIME + ' ~ ' + e.END_TIME,
			WORK_TOTAL_TIME: _oam.toStringTimeDiff({START: e.START_TIME, END: e.END_TIME}),
			DOWNTIME_YN: e.DOWNTIME_YN === 'Y' ? 'With Turbine Stop' : '',
			WEATHER: e.WEATHER, 
			TEMPERATURE: e.TEMPERATURE + ' °C', 
			WIND_SPEED: e.WIND_SPEED + ' m/s',
			HUMIDITY: e.HUMIDITY + ' %',
			RMK: e.RMK,
		}); 
		$('div#FLIGHT_LIST').append(row);
	});
	
	// 손상 내역
	data.DAMAGE_LIST.forEach((e, i) => {
		
		var row = _oam_elements.oam_0302.main.tr_damage_row({
			ID: e.DMG_ID,
			NO: i+1,
			BLADE_SERIAL_NUM: e.BLADE_INFO.BLADE_SERIAL_NUM,
			MAINTEN_CD: e.MAINTEN_CODE + ' / ' + e.MAINTEN_LEV1_NM + ' - ' + e.MAINTEN_LEV2_NM,
			DMG_AREA: e.DMG_AREA,
			DMG_INFO: e.DMG_INFO,
			DMG_SEVERITY: e.DMG_SEVERITY,
			ATTACHMENT_CNT: '+' + e.DMG_FILE_LIST.length, 
		});
		
		// css, info, 클릭 이벤트 추가 
		row = $(row).css('cursor', 'pointer').prop('info', e).click(function() {
			console.log($(this).prop('info'));
		});
		
		row = $(row).click(openPopup).css('cursor', 'pointer');
		
		$('tbody#DAMAGE_LIST').append(row);
	});
	
	
	// 블레이드 뷰어 생성 및 저장  
	viewer = new bladeViewer('canvas').init().drawImage().drawMiddleDash();
	// image load 대기 후 자르기, 저장 
	setTimeout(() => {
		viewer.makeDrawAbleZone().save('A');
	}, 1000);
	
	// 블레이드 뷰어 버튼 클릭
	$('button#BLADEVIEWER').click(openPopup);
	
}

/* 팝업창 열기 */
function openPopup(event) {
	
	var TARGET = $(this);
	var ID = $(this).attr('id').split('_');
	var TYPE = $(this).attr('id').split('_')[0].toUpperCase();
	var BLADE_NUM = $(this).attr('id').split('_').pop();
	
	if(['DAMAGE'].includes(TYPE)) $('div#layerPopup').attr('class', 'layer-popup-blade-inspection2');
	if(['BLADEVIEWER'].includes(TYPE)) $('div#layerPopup').attr('class', 'layer-popup-blade-inspection layer-popup-blade-inspection2');
	
	var scroll_target = '.base_grid_table';
	
	/* DAMAGE */
	if(TYPE === 'DAMAGE') {
		var process = ID[1] === 'ADD' ? 'ADD' : 'DETAIL';
		
		// tr 클릭이 아닐 경우 
		if(process === 'DETAIL' && $(event.target).prop('tagName') !== 'TD') return;
		
		
		var info = TARGET.prop('info');
		
		// 팝업창 콘텐츠 생성
		var content = _oam_elements.oam_0302.popup.damage_content({
			ID: ID[1] === 'ADD' ? moment().valueOf() : TARGET.attr('id').split('_')[1],
			PROCESS: process,
			TITLE: 'Detail blade damage',
			TYPE: TYPE,
			SERIAL_NUM: info.BLADE_INFO.BLADE_SERIAL_NUM,
			MAINTEN_CD: info.MAINTEN_CODE + ' / ' + info.MAINTEN_LEV1_NM + ' - ' + info.MAINTEN_LEV2_NM,
			DMG_AREA: info.DMG_AREA,
			DMG_SEVERITY: info.DMG_SEVERITY,
			DMG_INFO: info.DMG_INFO,
			MAINTEN_PLAN: info.MAINTEN_PLAN,
			FROM_R: info.FROM_R + ' m',
			FROM_LE: info.FROM_LE + ' m',
			HORIZ: info.HORIZ + ' m',
			VERTI: info.VERTI + ' m',
		});
		
		// 팝업창 콘텐츠 삽입
		$('div#layerPopup').html('').html(content);
		
		// file 생성
		info.DMG_FILE_LIST.forEach((e) => {
			
			// File sample 생성
			var sample = _oam_elements.oam_0202.main.tr_file_row({
				ID: e.ATCH_FLE_SEQ,
				TYPE: e.TYPE,
				SRC: ctx + '/oam2/oam_0200/imageView/' + e.FLE_PATH + '/' + e.NEW_FLE_NM,
				FILE_INFO: e.FILE_INFO,
				FILE_NAME: e.FLE_NM.substring(0, e.FLE_NM.lastIndexOf('.')),
				FILE_SIZE: _oam.returnFileSize(e.FLE_SZ),
				FILE_EXTENSION: '.' + e.FLE_TP,
			});
			
			// 삽입
			$('tbody#DAMAGE_FILE_LIST').append(sample);
		});
		
		// NO_FILE 삭제 여부 
		if($('tbody#DAMAGE_FILE_LIST tr[id*=DAMAGE_FILE]').not('tr[style*=none]').length > 0) $('tbody#DAMAGE_FILE_LIST tr#NO_FILE').remove();
		
		scroll_target = '#scroll_target';
		
		// 블레이드 뷰어 
		viewer.restore('A').setBladeLength(info.BLADE_INFO.BLADE_LENGTH).drawRuler().drawRulerFigure().mirroringToImgTag('#img');
		viewer.save('B');
		viewer.restore('B').emptyDamageList().mirroringToImgTag('#img');
		viewer.drawDamage({
			NUM: 1,
			DMG_AREA: info.DMG_AREA,
			DMG_SEVERITY: info.DMG_SEVERITY,
			FROM_R: info.FROM_R,
			FROM_LE: info.FROM_LE,
			HORIZ: info.HORIZ,
			VERTI: info.VERTI,
		}).mirroringToImgTag('#img');
	}
	/* BLADEVIEWER */
	else if(TYPE === 'BLADEVIEWER') {
		
		// TURBINE 정보 가져오기 0301 = input, 0302 = span
		var turbine_info = $('#TURBINE').prop('info');
		// TURBINE 선택 여부 CHECK
		if(!turbine_info) {
			alert('Please select an Turbine.');
			$('#TURBINE').inputWarning('');
			// input#TURBINE 위치로 스크롤 이동
			_oam.moveScrollToTargetPosition('#TURBINE');
			return;
		} else {
			$('#TURBINE').resetWarning('');
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
	
	// 팝업 닫기 버튼 이벤트
	$('a#popup_close').click(closePopup);
	
	// 팝업창 활성화 
	$('div#layerPopup').addClass('active');
}

/* 팝업창 닫기 */
function closePopup() {
	
	// 등록, 닫기 여부 체크  
	var isRegister = $(this).attr('id').split('_')[1] === 'register';
	
	// type 체크 
	var type = $(this).parents('div.layer-cont').attr('popup-type');
	var blade_num = $(this).parents('div.layer-cont').attr('blade-num');
	
	
	// popup 내용 삭제, 비활성화 
	$('div#layerPopup').html('').removeClass('active');
}

