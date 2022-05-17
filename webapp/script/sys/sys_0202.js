/*
 * ####### Selector ###################################
 * span#FARM_NM : 발전단지 명
 * span#GROUP_NM : 그룹명
 * span#GENER_ID : 발전기 ID
 * span#MANUF_NM : 제조사 명
 * span#OPER_NM : 운영사명
 * span#GENER_NM : 발전기명(한글)
 * span#GENER_NM_EN : 발전기명(영문)
 * span#POWER : 발전기 발전량
 * span#TOWR_HGHT : 타워 높이
 * span#ROTOR_D : 로터 diameter
 * span#BLADE_TYPE : 블레이드 타입
 * span#SERIAL1
 * span#BLADE_LENGTH
 * span#SERIAL2
 * span#BLADE_COLOR
 * span#SERIAL3
 * span#LATITUDE
 * span#LONGTITUDE
 * span#DESCRIPT
 *
 * div#map : 지도
 *
 * span#MODIFY_BTN : 수정 버튼
 * span#DELETE_BTN : 삭제 버튼
 * 
 * 
 * ######## Parameter ################################
 * # parameter
 * DATA.GENER_ID
 * 
 * 
 * ######## Function #################################
 * sys_0102 : 초기화
 */

/* 초기화*/
function sys0202(){
	
	//데이터 조회
	var data = _sys.mariaDB.getData('/sys_new/sys_0200/detailForm/getDetailInfo.ajax', {
		GERATOR_ID: $('input#GERATOR_ID').val(),
	});
	
	console.log(data);
	//데이터 없을 경우 return
	if(!data) return;
	
	//수정 버튼 클릭 이벤트
	$('span#MODIFY_BTN').click(function(){
		window.location = CTX + '/sys_new/sys_0200/modifyForm?GERATOR_ID=' + $('input#GERATOR_ID').val(); 
	});
	
	//삭제 버튼 클릭 이벤트
	$('span#DELETE_BTN').click(function(){
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var result = _sys.mariaDB.getData('/sys_new/sys_0200/detailForm/delete.ajax', {
			GERATOR_ID: $('input#GERATOR_ID').val(),
		});
		console.log(result);
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = ctx + '/sys_new/sys_0200/list';
		}
		// Exception 발생
		else if(result.EXCEPTION){
			if(result.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
		}
		// 삭제 실패
		else {
			alert(_MESSAGE.common.deleteFail);
		}
	});
	
	$('span#FARM').text(data.FARM_NM);
	$('span#GROUP').text(data.GROUP_NM);
	$('span#TURBINE_ID').text(data.GERATOR_ID);
	$('span#TURBINE_NM').text(data.GERATOR_NM);
	$('span#OPERATOR').text(data.OPERATOR_NM);
	$('span#TURBINE-MODEL').text(data.MODEL_NM);
	$('span#MANUFACTURER_NM').text(data.MANUFACTURER_NM);
	$('span#POWER').text(data.POWER ? data.POWER + ' MW' : 'X');
	$('span#TOWER_H').text(data.TOWER_H ? data.TOWER_H + ' m' : 'X');
	$('span#ROTOR_D').text(data.ROTOR_D ? data.ROTOR_D + ' m' : 'X');
	$('span#LATITUDE').text(data.LATITUDE);
	$('span#LONGTUD').text(data.LONGTUD);
	$('span#DESCRPT').html('<p>' + data.DESCRPT.split('\n').join('</p><p>') + '</p>');
	
	var _map = new google.maps.Map(document.getElementById('map'), {
		center: new google.maps.LatLng(33.363058381442286, 126.5502616969065),
		zoom:10,
		minZoom: 5,
		//maxZoom: 12,
		gestureHandling: 'greedy', // cmd, ctrl 키 없이 스크롤만으로 zoom 확대
	});
	
	_map.setZoom(20);
	
	var _circle = new google.maps.Circle({
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
	
}









