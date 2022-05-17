/**
 * ###### Parameter ##############
 * input#PROCESS
 * input#DATA.GENER_ID
 * 
 * ###### Selector ###############
 * select#FARM_ID
 * select#GROUP_ID
 * input#GENER_ID
 * input#GENER_NM
 * input#POWER
 * input#MANUFACTURER
 * input#OPERATOR
 * input#TOWR_HGHT
 * input#ROTOR_D
 * input#BLADE_TYPE
 * input#SERIAL1
 * input#BLADE_LENGTH
 * input#SERIAL2
 * input#BLADE_COLOR
 * input#SERIAL3
 * 
 * input#LATITUDE
 * input#LONGTITUDE
 * textarea#DESCRIPT
 * 
 * a#SAVE_BTN
 * button#MANUFACTURER_SEARCH_BTN
 * button#OPERATOR_SEARCH_BTN
 * 
 * ###### Function ###########
 * 
 * sys0201
 * 
 */

var _map;
var _circle;
var _marker;


/*초기화*/
function sys0201(){
	
	/* 지도 관련 */
	// 지도 생성
	_map = new google.maps.Map(document.getElementById('map'), {
		center: new google.maps.LatLng(33.363058381442286, 126.5502616969065),
		zoom:10,
		minZoom: 5,
		//maxZoom: 12,
		gestureHandling: 'greedy', // cmd, ctrl 키 없이 스크롤만으로 zoom 확대
	});
	/* //지도 관련 */
	
	
	// 검색 버튼(TURBINE, COMPANY, WORKERS),
	// 추가 버튼(PART, TOOL, PPE) CSS, EVENT 추가
	$('button[id*=SEARCH_BTN], span[id*=ADD_BTN]').css('cursor', 'pointer').click(openPopup);
	
	// 발전단지 조회, option 추가  
	var farm_list = _sys.mariaDB.getData(ctx + '/sys_new/sys_0200/popupData/FARM.ajax', {});
	farm_list.forEach((e, i) => {
		
		var option = '<option value="' + e.FARM_ID + '">' + e.FARM_NM + '</option>';
		
		var group_id_list = e.GROUP_ID_LIST ? e.GROUP_ID_LIST.split(' | ') : [];
		var group_nm_list = e.GROUP_NM_LIST ? e.GROUP_NM_LIST.split(' | ') : [];
		
		var group_list = group_id_list.map((e, i) => { return {GROUP_ID: group_id_list[i], GROUP_NM: group_nm_list[i]} });
		
		option = $(option).prop('info', Object.assign(e, {GROUP_LIST: group_list}));
		
		$('select#FARM').append(option);
	});
	
	
	$('select#FARM').change(function() {
		
		// GROUP 셀렉트 박스 비우기, 기본 option 추가  
		$('select#GROUP').html('').append('<option value="" selected># Select Group</option>');;
		// 
		var info = $(this).find('option:selected').prop('info');
		if(info) {
			info.GROUP_LIST.forEach((e) => {
				if(e.GROUP_NM !== 'NO GROUP') {
					var option = '<option value="' + e.GROUP_ID + '">' + e.GROUP_NM + '</option>';
					option = $(option).prop('info', e);
					$('select#GROUP').append(option);
				} else {
					$('select#GROUP option:eq(0)').prop('info', e);
				}
			});
		}
		
		// 기존 생성 초기화 
		if(_marker) _marker.setMap(null);
		if(_circle) _circle.setMap(null);
		_map.setZoom(20);
		
		// 단지 원 추가 
		_circle = new google.maps.Circle({
		    strokeColor: "#FF0000",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#FF0000",
		    fillOpacity: 0.35,
		    map: _map,
		    center: {lat:info.LATITUDE, lng:info.LONGTUD},
		    radius: info.RADIUS,
		});
		// 지도 맞춤 
		_map.panTo(_circle.center);
		_map.fitBounds(_circle.getBounds());
		_map.setOptions({minZoom: _map.getZoom() - 1});
		
		
		// 마커 추가
		_marker = new google.maps.Marker({
	        position: new google.maps.LatLng(info.LATITUDE, info.LONGTUD),
	        map: null,
	        icon: marker_image = {
        		url : ctx + '/img/sub/wt_icon.png',
        		size: new google.maps.Size(50, 50),
        	    origin: new google.maps.Point(0, 0),
        	    anchor: new google.maps.Point(23, 27) 
        	},
	        //shape: shape,		// click 범위 바뀜
	        //title: e.GERATOR_NM,
	        optimized: true,
	        //infowindow: infowindow,
	        draggable: true,
	    });
		_marker.setMap(_map);
		
		$('input#LATITUDE').val(info.LATITUDE);
		$('input#LONGTUD').val(info.LONGTUD);
		
		_marker.addListener('dragend', function() {
			
			var lat = this.position.lat();
			var lng = this.position.lng();
			
			if(!_circle.getBounds().contains(this.position)) {
				alert(_MESSAGE.sys.turbineOutOfRange);
				lat = _circle.center.lat();
				lng = _circle.center.lng();
				this.setPosition(_circle.center);
			}
			$('input#LATITUDE').val(lat);
			$('input#LONGTUD').val(lng);
		});
		
		_circle.addListener('click', function(e) {
			_marker.setPosition(e.latLng);
			
			$('input#LATITUDE').val(e.latLng.lat());
			$('input#LONGTUD').val(e.latLng.lng());
		});
	});
	
	
	_map.addListener('click', function(e) {
		alert(_MESSAGE.sys.turbineOutOfRange);
	});
	
	// 수정페이지일 경우
	if($('input#PROCESS').val() === 'UPDATE') modifyInit();
	
	//저장버튼 클릭
	$('a#SAVE_BTN').click(save);
	
	$('input#LATITUDE, input#LONGTUD').on('keyup', _sys.isDecimalKey);
	
	$('input#LATITUDE').on('keyup', function() {
		this.value = this.value.replace(/[ㄱ-ㅎㅏ-ㅡ가-핳a-zA-Z \{\}\[\]\/?,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, '');
		
		var lat = $(this).val();
		var lng = $('input#LONGTUD').val();
		console.log(lat,lng);
		
		
		if(_marker) _marker.setPosition({lat:lat, lng: lng});
	});
	
	$('input#LONGTUD').on('keyup', function() {
		this.value = this.value.replace(/[ㄱ-ㅎㅏ-ㅡ가-핳a-zA-Z \{\}\[\]\/?,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, '');
		
		var lat = $('input#LATITUDE').val();
		var lng = $(this).val();
		console.log(lat,lng);
		
		if(_marker) _marker.setPosition({lat:lat, lng: lng});
	});
}

function openPopup() {
	
	var TYPE = $(this).attr('id').split('_')[0].toUpperCase();
	
	if(['OPERATOR', 'TURBINE-MODEL'].includes(TYPE)) $('div#layerPopup').attr('class', 'layer-popup-planing');
	
	var scroll_target = '.base_grid_table';
	
	/* COMPANY */
	if(TYPE === 'OPERATOR') {
		var content = _sys_elements.sys_0201.popup.operator_content({
			TITLE: 'Select a Operator',
			TYPE: TYPE,
		});
		$('div#layerPopup').html('').html(content);
		// row 생성 
		createSearchPopupRow(TYPE);
	}
	/* TURBINE-MODEL */
	else if(TYPE === 'TURBINE-MODEL') {
		var content = _sys_elements.sys_0201.popup.model_content({
			TITLE: 'Select a Turbine Model',
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
//	$('#layerPopup #all_check').click(function() {
//		var check = true;  
//		if(!$(this).is('input:checked')) check = false;
//		$(this).prop('checked', check);
//		$('tbody#popup_list').find('input[type=checkbox], input[type=radio]').prop('checked', check);
//	});
	
	// 팝업 닫기 버튼 이벤트
	$('a#popup_close').click(closePopup);
	
	// 팝업 등록 버튼 이벤트
	$('a#popup_register').click(closePopup);
	
	// 팝업창 활성화 
	$('div#layerPopup').addClass('active');
	
	initialControl();
}


function closePopup() {
	// 등록, 닫기 여부 체크  
	var isRegister = $(this).attr('id').split('_')[1] === 'register';
	
	// type 체크 
	var type = $(this).parents('div.layer-cont').attr('popup-type');
	
	// OPERATOR, TURBINE-MODEL 등록 일 경우  
	if(isRegister && ['OPERATOR', 'TURBINE-MODEL'].includes(type)) {
		// 체크 리스트 조회
		var check_list = $('tbody#popup_list input[type="radio"]:checked, tbody#popup_list input[type="checkbox"]:checked');
		// 체크 항목 없을 경우 
		if(!check_list.length) return;
		// 체크 항목 정보 가져오기  
		var info_list = check_list.toArray().map((e) => $(e).parents('tr').prop('info'));
		
		// input value, property 세팅
		if(type === 'OPERATOR') {
			$('input#OPERATOR').val(info_list[0].COMPANY_NM);
			$('input#OPERATOR').prop('info', info_list[0]);
		}
		else if(type === 'TURBINE-MODEL') {
			$('input#TURBINE-MODEL').val(info_list[0].MODEL_NM);
			$('input#TURBINE-MODEL').prop('info', info_list[0]);
			
			$('input#MANUFACTURER_NM').val(info_list[0].MANUFACTURER_NM);
			$('input#POWER').val(info_list[0].POWER ? info_list[0].POWER + ' MW' : 'X');
			$('input#TOWER_H').val(info_list[0].ROTOR_D ? info_list[0].ROTOR_D + ' m' : 'X');
			$('input#ROTOR_D').val(info_list[0].TOWER_H ? info_list[0].TOWER_H + ' m' : 'X');
//			$('span#MANUFACTURER_NM').text(info_list[0].MANUFACTURER_NM);
//			$('span#POWER').text(info_list[0].POWER ? info_list[0].POWER + ' MW' : 'X');
//			$('span#TOWER_H').text(info_list[0].ROTOR_D ? info_list[0].ROTOR_D + ' m' : 'X');
//			$('span#ROTOR_D').text(info_list[0].TOWER_H ? info_list[0].TOWER_H + ' m' : 'X');
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
	var data = _sys.mariaDB.getData(ctx + '/sys_new/sys_0200/popupData/' + TYPE + '.ajax', param);
	console.log(TYPE, param, data);
	
	// row 생성, 프로퍼티 추가, 삽입
	data.forEach((e) => {
		// row 생성
		var row;
		
		if(TYPE === 'OPERATOR') {
			// row 생성
			row = _sys_elements.sys_0201.popup.tr_operator_row({
				ID: e.COMPANY_ID,
				COMPANY_NM: e.COMPANY_NM,
				LOGO_PATH: ctx + '/imageView' + e.FLE_PATH + '/' + e.NEW_FLE_NM,
			});
		}
		else if(TYPE === 'TURBINE-MODEL') {
			// row 생성
			row = _sys_elements.sys_0201.popup.tr_model_row({
				ID: e.MODEL_ID,
				MODEL_IMG_PATH: ctx + '/imageView' + e.MODEL_FLE_PATH + '/' + e.MODEL_NEW_FLE_NM,
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
	var data = _sys.mariaDB.ajax(ctx + '/sys_new/sys_0200/save.ajax', param, 'post');
	console.log(data);
	
	if(data.INSERT_TURBINE_CNT > 0 || data.UPDATE_TURBINE_CNT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = ctx + '/sys_new/sys_0200/detailForm?GERATOR_ID=' + data.GERATOR_ID;
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
	/* ID 중복체크 */
	if($('input#TURBINE_ID').vcCheck() && $('input#PROCESS').val() === 'INSERT') {
		var param = {GERATOR_ID: $('input#TURBINE_ID').val()};
		var result = _sys.mariaDB.ajax(CTX + '/sys_new/sys_0200/popupData/ID-CHECK.ajax', param, 'get');
		console.log(result[0].CNT);
		if(result[0].CNT > 0) {
			$('input#TURBINE_ID').vcWarning(_MESSAGE.sys.idDuplicateCheckFail);
			check = false;
		} else {
			$('input#TURBINE_ID').vcSuccess(_MESSAGE.sys.idDuplicateCheckSuccess);
		}
	}
	return check; 
}

/* 파라미터 생성 */
function createParameter() {
	var param = {};
	if($('input#PROCESS').val() === 'UPDATE') param.GERATOR_ID = $('input#GERATOR_ID').val();
	if($('input#PROCESS').val() === 'INSERT') param.GERATOR_ID = $('input#TURBINE_ID').val();
	param.PROCESS = $('input#PROCESS').val();
	param.GROUP_ID = $('select#GROUP option:selected').prop('info').GROUP_ID;
	param.GERATOR_NM = $('input#TURBINE_NM').val();
	param.OPERATOR_ID = $('input#OPERATOR').prop('info').COMPANY_ID;
	var model_info = $('input#TURBINE-MODEL').prop('info');
	param.MODEL_ID = model_info.MODEL_ID;
	param.MANUFACTURER_ID = model_info.MANUFACTURER_ID;	// 추후 삭제
	param.POWER = parseFloat(model_info.POWER);
	param.ROTOR_D = parseFloat(model_info.ROTOR_D);
	
	param.LONGTUD = parseFloat($('input#LONGTUD').val());
	param.LATITUDE = parseFloat($('input#LATITUDE').val());
	param.DESCRPT = $('textarea#DESCRPT').val();
	
	param.OBJECT_ID = '5c8f58eb22c3eb3a3c6c0afc';
	return param;
}

/* 수정페이지에서 실행될 초기화 함수 */
function modifyInit(){
	
	//데이터 조회
	var data = _sys.mariaDB.getData('/sys_new/sys_0200/detailForm/getDetailInfo.ajax', {
		GERATOR_ID: $('input#GERATOR_ID').val()
	}); 
	console.log(data);
	//데이터 없을 경우 return
	if(!data) return;
	
	$('select#FARM').siblings('label').text(data.FARM_NM);
	$('select#FARM option[value=' + data.FARM_ID + ']').prop('selected', true);

	$('select#GROUP').siblings('label').text(data.GROUP_NM);
	var info = $('select#FARM option[value=' + data.FARM_ID + ']').prop('info');
	$('select#GROUP').html('').append('<option value=""># Select Group</option>');
	if(info) {
		info.GROUP_LIST.forEach((e) => {
			if(e.GROUP_NM !== 'NO GROUP') {
				var option = '<option value="' + e.GROUP_ID + '">' + e.GROUP_NM + '</option>';
				option = $(option).prop('info', e);
				$('select#GROUP').append(option);
			} else {
				$('select#GROUP option:eq(0)').prop('info', e);
			}
		});
	}
	$('select#GROUP option[value=' + data.GROUP_ID + ']').prop('selected', true);

	$('input#TURBINE_ID').val(data.GERATOR_ID).prop('readonly', true);
	$('input#TURBINE_NM').val(data.GERATOR_NM);
	$('input#OPERATOR').val(data.OPERATOR_NM).prop('info', {
		COMPANY_ID: data.OPERATOR_ID,
	});
	$('input#TURBINE-MODEL').val(data.MODEL_NM).prop('info', {
		MODEL_ID: data.MODEL_ID,
		MANUFACTURER_ID: data.MANUFACTURER_ID,
		POWER: data.POWER,
		ROTOR_D: data.ROTOR_D,
	});
	$('input#MANUFACTURER_NM').val(data.MANUFACTURER_NM);
	$('input#POWER').val(data.POWER ? data.POWER + ' MW' : 'X');
	$('input#TOWER_H').val(data.TOWER_H ? data.TOWER_H + ' m' : 'X');
	$('input#ROTOR_D').val(data.ROTOR_D ? data.ROTOR_D + ' m' : 'X');
	$('input#LATITUDE').val(data.LATITUDE);
	$('input#LONGTUD').val(data.LONGTUD);
	$('textarea#DESCRPT').val(data.DESCRPT); 
	
	/* 지도 관련 */
	_map.setZoom(20);
	_circle = new google.maps.Circle({
	    strokeColor: "#FF0000",
	    strokeOpacity: 0.8,
	    strokeWeight: 2,
	    fillColor: "#FF0000",
	    fillOpacity: 0.35,
	    map: _map,
	    center: {lat:data.FARM_LATITUDE, lng:data.FARM_LONGTUD},
	    radius: data.FARM_RADIUS,
	});
	
	// 지도 맞춤 
	_map.panTo(_circle.center);
	_map.fitBounds(_circle.getBounds());
	
	
	// 마커 추가
	_marker = new google.maps.Marker({
        position: new google.maps.LatLng(data.LATITUDE, data.LONGTUD),
        map: null,
        icon: marker_image = {
    		url : ctx + '/img/sub/wt_icon.png',
    		size: new google.maps.Size(50, 50),
    	    origin: new google.maps.Point(0, 0),
    	    anchor: new google.maps.Point(23, 27) 
    	},
        //shape: shape,		// click 범위 바뀜
        //title: e.GERATOR_NM,
        optimized: true,
        //infowindow: infowindow,
        draggable: true,
    });
	_marker.setMap(_map);
	
	_marker.addListener('dragend', function() {
		
		var lat = this.position.lat();
		var lng = this.position.lng();
		
		if(!_circle.getBounds().contains(this.position)) {
			alert(_MESSAGE.sys.turbineOutOfRange);
			lat = _circle.center.lat();
			lng = _circle.center.lng();
			this.setPosition(_circle.center);
		}
		$('input#LATITUDE').val(lat);
		$('input#LONGTUD').val(lng);
	});
	
	_circle.addListener('click', function(e) {
		_marker.setPosition(e.latLng);
		
		$('input#LATITUDE').val(e.latLng.lat());
		$('input#LONGTUD').val(e.latLng.lng());
	});
	
}







