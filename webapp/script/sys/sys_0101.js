/*
 * 	######## Selector ##########################################
 *  
 *  button#OPER_SEARCH_BTN : 운영사 검색 버튼
 *  
 *  div#GROUP_AREA : 그룹영역
 *  a#DELETE_BTN : 그룹 input 삭제 버튼
 *  a#ADD_BTN : 그룹 input 추가 버튼
 *  
 *  a#SAVE_BTN : 저장버튼
 *  a#POPUP_REGISTER : 팝업 select 버튼
 *  a#POPUP_CLOSE : 팝업 닫기
 *  a#POPUP_REGISTER : 팝업 선택
 *  input#POPUP_SEARCH : 팝업 검색창
 *  
 *  div#FORM : 화면 폼
 *  
 *  input#FARM_NM : farm명
 *  input#COMPANY_NM : 운영사명
 *  input#GROUP_NM : group명
 *  
 *
 *  ###### Pameter ######################
 *  PAGE_TITLE : 페이지 제목 (Register, Modify)
 *  DATA.FARM_ID
 *  PROCESS : 페이지 프로세스(Update)
 *  
 *  ###### Function ###################
 *  sys0101();
 */


var _map;
var _circle;
var _default_radius = 300;
var _max_radius = 2000;
function circleDrag(e) {
	// 위도, 경도 삽입 
	$('input#LATITUDE').val(this.center.lat());
	$('input#LONGTUD').val(this.center.lng());
	
	var type = e ? e.domEvent.type : 'center_changed';
	if(type === 'mouseup') {
		// 지도 센터 이동 
		_map.panTo(this.center);
	} 
	else if(type === 'drag') {
		
	}
	else if(type === 'center_changed') {
		// 드래그 시 버벅 거림
		_map.panTo(this.center);
	}
}

function circleEdit(e) {
	var r = parseInt(this.getRadius());
	
	if(r > _max_radius) {
		alert(_MESSAGE.sys.farmRadiusMore);
		r = _max_radius;
		this.setRadius(r);
	} 
//	else if(r < _default_radius) {
//		alert(_MESSAGE.sys.farmRadiusLess);
//		r = _default_radius;
//		this.setRadius(r);
//	}
	//  
	$('input#RADIUS').val(r);
	// 원크기에 따라 bound 하기
	_map.fitBounds(this.getBounds());
};

/* page 초기화 */
function sys0101(){
	
	/* 지도 관련 */
	// 지도 생성
	_map = new google.maps.Map(document.getElementById('map'), {
		//center: {lat:33.5177623, lng: 126.6457088},
		center: new google.maps.LatLng(33.5177623, 126.6457088),
		zoom:20,
		minZoom: 5,
		//maxZoom: 12,
		gestureHandling: 'greedy', // cmd, ctrl 키 없이 스크롤만으로 zoom 확대
	});
	
	// 지도 클릭 이벤트 생성
	_map.addListener('click', function(e) {
		// 현재 좌표 값
		console.log('[lat]', e.latLng.lat(), '[lng]', e.latLng.lng());
		
		// 위도, 경도 삽입 
		$('input#LATITUDE').val(e.latLng.lat());
		$('input#LONGTUD').val(e.latLng.lng());
		
		_circle.setCenter(e.latLng);
		_map.panTo(_circle.center);
	});
	
	_circle = new google.maps.Circle({
	    strokeColor: "#FF0000",
	    strokeOpacity: 0.8,
	    strokeWeight: 2,
	    fillColor: "#FF0000",
	    fillOpacity: 0.35,
	    map: _map,
	    center: {lat:_map.center.lat(), lng: _map.center.lng()},
	    //radius: Math.sqrt(2714856) * 100,
	    radius: _default_radius,
	    //editable: true,
	    suppressUndo: true, //수정 되돌리기 비활성화 default: false 
	    draggable:true,
	});
	
	// circle 클릭 이벤트
	_circle.addListener('click', function() {
		this.setEditable(this.editable ? false : true);
	});
	// circle 드래그 이벤트
	_circle.addListener('center_changed', circleDrag);
	_circle.addListener('drag', circleDrag);
	// circle 수정 이벤트
	_circle.addListener('radius_changed', circleEdit);
	
	// map zoom을 circle에 bound 하기
	_map.fitBounds(_circle.getBounds());
	
	
	//	_circle.getBounds().contains(a.getCenter());
	//	new google.maps.LatLngBounds({lng:_circle.getBounds().getSouthWest().lng(), lat:_circle.getBounds().getNorthEast().lng()});
	/*//지도 관련 */
	
	// 등록 일 경우
	if($('input#PROCESS').val() === 'INSERT') {
		$('input#LATITUDE').val(_map.center.lat());
		$('input#LONGTUD').val(_map.center.lng());
		$('input#RADIUS').val(_default_radius);
	}
	
	// 수정 일 경우
	if($('input#PROCESS').val() === 'UPDATE') modifyInit();
	
	//운영사 검색 버튼 클릭 이벤트
	$('button#OPER_SEARCH_BTN').css('cursor', 'pointer').click(openPopup);
	
	// 그룹 추가 버튼 클릭 이벤트
	$('a#GROUP_ADD_BTN').click(addGroup);
	
	//저장버튼 클릭
	$('a#SAVE_BTN').click(save);
	
	//$('input#LATITUDE, input#LONGTUD').on('keypress', _sys.isNumberKey).on('keyup', _sys.deleteHangle);
//	$('input#LATITUDE, input#LONGTUD').on('keypress', _sys.isDecimalKey).keyup(function() {
//		this.value = this.value.replace(/[^0-9\.\+]/g,'');
//	});
	
	$('input#LATITUDE, input#LONGTUD').keyup('keyup', _sys.isDecimalKey);
	
	$('input#LATITUDE').on('keyup', function() {
		var sign = this.value.substring(0,1) === '-' ? '-' : '' 
		var x = this.value.split('.');
		
		x[0] = x[0].replace(/[ㄱ-ㅎㅏ-ㅡ가-핳a-zA-Z \{\}\[\]\/?,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,'');
		if(x[1]) x[1] = x[1].replace(/[ㄱ-ㅎㅏ-ㅡ가-핳a-zA-Z \{\}\[\]\/?,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,'');
		
		var numLength = parseInt(this.getAttribute('maxNumberLength')) || 0;
		var decLength = parseInt(this.getAttribute('maxDecimalLength')) || 0;
		var maxValue = parseInt(this.getAttribute('maxValue')) || 0;
		var minValue = parseInt(this.getAttribute('minValue')) || 0;
		
		if(x.length === 2) {
			this.value = sign + x[0].substring(0, numLength) + '.' + x[1].substring(0, decLength);
		} 
		else if(!x[1]) {
			this.value = sign + x[0].substring(0, numLength);
		}
		
		if(maxValue < parseFloat(this.value)) {
			alert(_MESSAGE.sys.latMaximum);
			this.value = parseFloat(maxValue);
		}
		if(parseFloat(this.value) < minValue) {
			alert(_MESSAGE.sys.latMinimum);
			this.value = parseFloat(minValue);
		}
		
		var lat = parseFloat(this.value);
		var lng = parseFloat($('input#LONGTUD').val());
		console.log(lat,lng);
		
		_circle.setCenter({lat: lat, lng:lng});
		_map.setCenter({lat: lat, lng:lng});
	});
	
	$('input#LONGTUD').on('keyup', function() {
		var sign = this.value.substring(0,1) === '-' ? '-' : '' 
		var x = this.value.split('.');
		
		x[0] = x[0].replace(/[ㄱ-ㅎㅏ-ㅡ가-핳a-zA-Z \{\}\[\]\/?,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,'');
		if(x[1]) x[1] = x[1].replace(/[ㄱ-ㅎㅏ-ㅡ가-핳a-zA-Z \{\}\[\]\/?,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,'');
		
		var numLength = parseInt(this.getAttribute('maxNumberLength')) || 0;
		var decLength = parseInt(this.getAttribute('maxDecimalLength')) || 0;
		var maxValue = parseInt(this.getAttribute('maxValue')) || 0;
		var minValue = parseInt(this.getAttribute('minValue')) || 0;
		
		if(x.length === 2) {
			this.value = sign + x[0].substring(0, numLength) + '.' + x[1].substring(0, decLength);
		} 
		else if(!x[1]) {
			this.value = sign + x[0].substring(0, numLength);
		}
		
		if(maxValue < parseFloat(this.value)) {
			alert(_MESSAGE.sys.lngMaximum);
			this.value = parseFloat(maxValue);
		}
		if(parseFloat(this.value) < minValue) {
			alert(_MESSAGE.sys.lngMinimum);
			this.value = parseFloat(minValue);
		}
		
		var lat = parseFloat($('input#LATITUDE').val());
		var lng = parseFloat(this.value);
		console.log(lat,lng);
		
		_circle.setCenter({lat: lat, lng:lng});
		_map.setCenter({lat: lat, lng:lng});
	});
	
	$('input#RADIUS').on('keyup', function() {
		
		
		this.value = this.value || 1;
		this.value = this.value.replace(/[ㄱ-ㅎㅏ-ㅡ가-핳a-zA-Z \{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,'');
		
		var r = parseInt(this.value);
		
		if(r > _max_radius) {
			alert(_MESSAGE.sys.farmRadiusMore);
			r = _max_radius;
			_circle.setRadius(r);
		} 
//		else if(r < _default_radius) {
//			//alert(_MESSAGE.sys.farmRadiusLess);
//			r = _default_radius;
//			_circle.setRadius(r);
//		}
		
		_circle.setRadius(r);
		// 원크기에 따라 bound 하기
		_map.fitBounds(_circle.getBounds());
	});
	
}


function addGroup() {
	var num = $('div[id*=GROUP_ROW_]').length;
	var id = moment().valueOf();
	
	// 샘플 생성 
	var sample = _sys_elements.sys_0101.main.div_group_row({
		NUM: num,
		ID: id,
	});
	
	// 삭제 버튼 클릭 이벤트 
	sample = $(sample).find('a[id*="DELETE_BTN_"]').css('cursor', 'pointer').click(function() {
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		$(this).parents('div[id*=GROUP_ROW]').remove();
	}).parents('div[id*=GROUP_ROW]');
	
	// 프로퍼티 추가 
	$(sample).prop('info', {
		PROCESS: 'INSERT',
		GROUP_ID: id,
	});
	
	// 삽입
	$('div#GROUP_AREA a#GROUP_ADD_BTN').before(sample);
	
	// common.js
	initialControl();
}

//팝업창 열기
function openPopup(){
	
	var param = {};
	
	//팝업 리스트 생성
	createSearchPopupRow(param);
	
	console.log(param);
	
	/*** 팝업 관련 이벤트 ***/
	// 스크롤 활성화
	$("#layerPopup .btn-table .base_grid_table").mCustomScrollbar({
		axis: "Y",
		theme: "minimal-dark",
		mouseWheelPixels: 300
	});
	
	// 팝업 검색창 입력 이벤트 /
	$('input#POPUP_SEARCH').keyup(function(e){
		//Enter키
		if(e.keyCode === 13){
			var sample = {SEARCH_ALL : $(this).val()};
			createSearchPopupRow(sample);
		}
	});
	
	// 팝업 검색창 새로고침 버튼 이벤트
	$('a#POPUP_REFRESH').css('cursor', 'pointer').click(function(){
		$('input#POPUP_SEARCH').val('');
		var sample = {};
		createSearchPopupRow(sample);
	});
	
	// 팝업 닫기 버튼 이벤트
	$('a#POPUP_CLOSE').click(closePopup);
	
	// 팝업 등록 버튼 이벤트
	$('a#POPUP_REGISTER').click(closePopup);
	
	// 팝업창 활성화 
	$('div#layerPopup').addClass('active');
}

//팝업창 row 생성
function createSearchPopupRow(param={}){
	
	//popup list 비우기
	$('tbody#OPER_LIST').html('');
	
	//데이터 조회
	var data = _sys.mariaDB.getData(CTX + '/sys_new/sys_0100/popupData.ajax', param);
	console.log(param);
	console.log(data);
	
	//row 생성, 프로퍼티 추가, 삽입
	data.LIST.forEach((e) => {
		//row 생성
		var row = _sys_elements.sys_0101.popup.tr_company_row({
			ID : e.COMPANY_ID,
			COMPANY_NM : e.COMPANY_NM,
			LOGO_PATH: ctx + '/imageView' + e.FLE_PATH + '/' + e.NEW_FLE_NM,
		});
		// 프로퍼티 추가
		row = $(row).prop('info', e);
		// row(tr) 클릭 이벤트
//		row = $(row).css('cursor', 'pointer').click(function() {
//			var checkbox = $(this).find('input[type=checkbox]');
//			//만약  선택 체크박스가 체크된상태일경우 
//			if(checkbox.prop('checked')) { 
//				//해당화면에  checkbox들을 체크해준다 
//				checkbox.prop('checked', false);
//				// 선택 체크박스가 해제된 경우 
//			} else { 
//				//해당화면에 checkbox들의 체크를해제시킨다. 
//				checkbox.prop('checked', true);
//			}
//		});
		row = $(row).css('cursor', 'pointer').click(_sys.clickRowCheckOnOff);
		
		// row 추가
		$('tbody#OPER_LIST').append(row);
	});
}

/* 팝업창 닫기 이벤트*/
function closePopup(){
	
	//popup search input 비우기
	$('input#POPUP_SEARCH').val('');
	
	//체크된 리스트 조회
	var check_list = $('tbody#OPER_LIST input[type="checkbox"]:checked');
	
	//체크된 항목 없을 경우
	if(!check_list.length) return;
	
	//체크 항목 정보 가져오기
	var info_list = check_list.toArray().map((e) => $(e).parents('tr').prop('info'));
	$('input#COMPANY_NM').val(info_list.map((e) => e.COMPANY_NM).join(', '));
	$('input#COMPANY_NM').prop('info', info_list);
	
	//팝업창 닫기 (비활성화)
//	$('div#layerPopup').html('').removeClass('active');
	$('div#layerPopup').removeClass('active').find('tbody#OPER_LIST').html('');
}

/* 저장 */
function save(){
	// validation check
	if(!validationCheck()) return;
	
	//파라미터 생성
	var param = createParameter();
	console.log(param);
	
	param = _sys.convertParam(param);
	
	var data = _sys.mariaDB.getData(CTX + '/sys_new/sys_0100/saveRegister.ajax', param);
	console.log(data);
	
	if(data.INSERT_FARM_CNT > 0 || data.UPDATE_FARM_CNT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/sys_new/sys_0100/detailForm?FARM_ID=' + data.FARM_ID;
	} 
	else {
		alert(_MESSAGE.common.saveFail);
	}
}

function validationCheck(root='') {
	var check = true;
	/* validation-check */
	check = $(root + ' [validation-check]').vcCheck();
	
	/* 발전 단지 중복 체크 */
	if($('input#FARM_NM').val()) {
		var param = {PROCESS: 'FARM', FARM_NM: $('input#FARM_NM').val()};
		if($('input#PROCESS').val() === 'UPDATE') param.FARM_ID = $('input#FARM_ID').val();
		var result = _sys.mariaDB.getData(CTX + '/sys_new/sys_0100/duplicatCheck.ajax', param);
		if(result.CNT > 0) {
			$('input#FARM_NM').vcWarning(_MESSAGE.common.duplicateCheckFail('name'));
			check = false;
		}
	}
	
	/* 그룹 중복 체크 */
	$('div#GROUP_AREA div[id*=GROUP_ROW_]').not('[style*=none]').find('input[id*=GROUP_NM]').toArray().reduce((acc, e) => {
		// 체크 
	    var a = $('div#GROUP_AREA div[id*=GROUP_ROW_]').not('[style*=none]').find('input[id*=GROUP_NM]').not(e).toArray().filter((e2) => $(e).val() && $(e).val() === $(e2).val());
	    if(a.length > 0) acc.push(e);
	    return acc;
	}, []).forEach((e, i, arr) => {
		check = false;
		$(e).vcWarning(_MESSAGE.sys.idDuplicateCheckFail);
		
		// 해제 1 
		var a = arr.reduce((acc, e2, i2) => {
			acc = acc + (i2 > 0 ? ', ' : '') + '#' + $(e2).attr('id'); 
			return acc;
		}, '');
		$(e).on('input', function(e) {
			$(this).unbind('input');
			$(a).trigger('input');
			$(this).focus();
		});
		
		// 해제 2
//		function clear() {
//			$(this).unbind('keyup', clear);
//			
//			var arr2 = arr.filter((e2, i2, arr2) => arr2.filter((e3) => $(e2).val() === $(e3).val() && e2 !== e3).length > 0);
//			
//			if(arr2.length > 0) {
//				arr2.forEach((e2) => $(e2).vcWarning(_MESSAGE.sys.idDuplicateCheckFail));
//			} else {
//				arr.forEach((e2) => $(e2).trigger('input'));
//			}
//			$(this).trigger('keyup').focus();
//		}
//		$(e).on('keyup', clear);
	});
	
	/* 발전단지 범위 체크 */
	if($('input#PROCESS').val() === 'UPDATE' && _circle.TURBINE_LIST.length > 0) {
		var bound = _circle.getBounds();
		_circle.TURBINE_LIST.forEach((e) => {
			if(!bound.contains(e.getPosition())) check = false;
		});
		
		if(!check) alert(_MESSAGE.sys.turbineOutOfRange);
	}
	
	
	return check;
}

/* 파라미터 생성 */
function createParameter() {
	
	var param = {};
	param.PROCESS = $('input#PROCESS').val();
	if($('input#PROCESS').val() === 'UPDATE') {
		param.FARM_ID = $('input#FARM_ID').val();
		param.NO_GROUP_ID = $('input#NO_GROUP_ID').val();
	}
	param.FARM_NM = $('input#FARM_NM').val();
	param.COMPANY_LIST = $('input#COMPANY_NM').prop('info') ? $('input#COMPANY_NM').prop('info').map(e => {return { COMPANY_ID: e.COMPANY_ID, } } ) : [];
	param.GROUP_LIST = $('#GROUP_AREA div[id*=GROUP_ROW]').toArray().map((e) => { 
 		var result = {};
		var info = $(e).prop('info');
 		result.PROCESS = info.PROCESS;
		result.GROUP_ID = info.GROUP_ID;
		result.GROUP_NM = $(e).find('input[id*=GROUP_NM]').val();
		
		// 수정 일 경우 발전기 리스트 추가 => 그룹 삭제 시 NO GROUP으로 이동 시 필요  
		if($('input#PROCESS').val() === 'UPDATE') result.TURBINE_LIST = info.TURBINE_LIST || [];
		return result;
	});
	param.LATITUDE = $('input#LATITUDE').val();
	param.LONGTUD = $('input#LONGTUD').val();
	param.RADIUS = $('input#RADIUS').val();
	param.DESCRPT = $('textarea#DESCRPT').val();
	
	return param;
}

/* 수정페이지에서 실행될 초기화 함수 */
function modifyInit(){
	
	//데이터 조회
	var data = _sys.mariaDB.getData('/sys_new/sys_0100/detailForm/getFarmInfo.ajax', {
		FARM_ID: $('input#FARM_ID').val()
	}); 
	
	//데이터 없을 경우 return
	if(!data) return;
	
	console.log(data);
	data = _sys.convertData.FARM_INFO(data);
	console.log(data);
	
	
	//OVERVIEW
	$('input#FARM_NM').val(data.FARM_NM);
	$('input#FARM_ID').val(data.FARM_ID);
	
	// COMPANY
	$('input#COMPANY_NM').val(data.COMPANY_LIST.reduce((acc, e, i) => {
		acc = acc + e.COMPANY_NM 
		if(i > 0) acc = acc + ', '
		return acc;
	}, ''));
	$('input#COMPANY_NM').prop('info', data.COMPANY_LIST);
	
	// GROUP
	data.GROUP_LIST.forEach((e, i) => {
		
		// NO GROUP 일 경우, 
		if(e.GROUP_NM === 'NO GROUP') {
			$('input#NO_GROUP_ID').val(e.GROUP_ID);
		} 
		// NO_GROUP 아닐 경우,
		else {
			// 샘플 생성 
			var sample = _sys_elements.sys_0101.main.div_group_row({
				NUM: i,
				ID: e.GROUP_ID,
				NAME: e.GROUP_NM,
			});
			
			// 삭제 버튼 클릭 이벤트 
			//if(i > 0) 
			sample = $(sample).find('a[id*="DELETE_BTN_"]').css('cursor', 'pointer').click(function() {
				if(!confirm(_MESSAGE.common.deleteConfirm)) return;
				$(this).parents('div[id*=GROUP_ROW]').hide();
				$(this).parents('div[id*=GROUP_ROW]').prop('info').PROCESS = 'DELETE';
			}).parents('div[id*=GROUP_ROW]');
			
			// 추가 버튼 클릭 이벤트
			//if(i === 0) sample = $(sample).find('a[id*="ADD_BTN_"]').click(addGroup).css('cursor', 'pointer').parents('div[id*=GROUP_ROW]');
			
			// 프로퍼티 추가 
			$(sample).prop('info', Object.assign(e, {PROCESS: 'UPDATE'}));
			
			// 삽입
			//$('div#GROUP_AREA').prepend(sample);
			$('div#GROUP_AREA a#GROUP_ADD_BTN').before(sample);
		}
	});
	
	// common.js
	initialControl();
	
	// 상세 정보
	$('input#LATITUDE').val(data.LATITUDE);
	$('input#LONGTUD').val(data.LONGTUD);
	$('input#RADIUS').val(data.RADIUS);
	$('textarea#DESCRPT').val(data.DESCRPT);
	
	// 단지 원 셋팅 
	_circle.setCenter({lat:data.LATITUDE, lng: data.LONGTUD});
	_circle.setRadius(data.RADIUS);
	
	// 발전기 표시 
	data.TURBINE_LIST.forEach((e) => {
		
		
		var marker = new google.maps.Marker({
	        position: new google.maps.LatLng(e.LAT, e.LNG),
	        map: null,
	        icon: marker_image = {
        		url : ctx + '/img/sub/wt_icon.png',
        		size: new google.maps.Size(50, 50),
        	    origin: new google.maps.Point(0, 0),
        	    anchor: new google.maps.Point(23, 27) 
        	},
	        //shape: shape,		// click 범위 바뀜
	        title: e.GERATOR_NM,
	        optimized: false,
	        //infowindow: infowindow,
	    });
		marker.setMap(_map);
		
		if(!_circle.TURBINE_LIST) _circle.TURBINE_LIST = [];
		_circle.TURBINE_LIST.push(marker);
	});
}










