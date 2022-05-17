/*
 * ######## Selector #################################
 * span#FARM_NM : 발전단지명
 * span#COMPANY_NM : 운영사명
 * span#GROUP_NM : 그룹명
 * span#LATITUDE : 경도
 * span#LONGTUD : 위도
 * span#DESCRPT : 설명
 * 
 * div#map : 지도
 * 
 * span#MODIFY_BTN : 수정 버튼
 * span#DELETE_BTN : 삭제 버튼
 * 
 * ######## Parameter ################################
 * # parameter
 * DATA.FARM_ID
 * 
 * ######## Function #################################
 * sys_0102 : 초기화
 * 
 * 
 */

var _map;
var _circle;

/* 초기화 */
function sys0102(){
	
	//데이터 조회
	var data = _sys.mariaDB.getData('/sys_new/sys_0100/detailForm/getFarmInfo.ajax', {
		FARM_ID: $('input#FARM_ID').val()
	}); 
	console.log(data);
	//데이터 없을 경우 return
	if(!data) return;
	data = _sys.convertData.FARM_INFO(data);
	console.log(data);
	
	// 작성자와 사용자의 UID가 다를 경우 삭제, 수정이 불가 -> 일단 보류
	
	//수정 버튼 클릭 이벤트
	$('span#MODIFY_BTN').click(function(){
		window.location = CTX + '/sys_new/sys_0100/farmModify?FARM_ID=' + $('input#FARM_ID').val(); 
	});
	
	//삭제 버튼 클릭 이벤트
	$('span#DELETE_BTN').click(function(){
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var result = _sys.mariaDB.getData('/sys_new/sys_0100/detailForm/deleteFarm.ajax', {
			FARM_ID: $('input#FARM_ID').val(),
		});
		console.log(result);
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = ctx + '/sys_new/sys_0100/list';
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
	
	// 
	$('span#FARM_NM').text(data.FARM_NM);
	$('span#COMPANY_NM').text(data.COMPANY_LIST.length > 0 ? data.COMPANY_LIST.map((e) => e.COMPANY_NM).join(', ') : 'X');
	$('span#GROUP_NM').text(data.GROUP_LIST.length > 0 ? data.GROUP_LIST.filter((e) => e.GROUP_NM != 'NO GROUP').map((e) => e.GROUP_NM).join(', ') : 'X');
	$('span#LATITUDE').text(data.LATITUDE);
	$('span#LONGTUD').text(data.LONGTUD);
	$('span#RADIUS').text(data.RADIUS);
	$('span#DESCRPT').html('<p>' + data.DESCRPT.split('\n').join('</p><p>') + '</p>');
	
	// 지도 생성
	_map = new google.maps.Map(document.getElementById('map'), {
		//center: {lat:33.5177623, lng: 126.6457088},
		center: new google.maps.LatLng(33.5177623, 126.6457088),
		zoom:20,
		minZoom: 5,
		//maxZoom: 12,
		gestureHandling: 'greedy', // cmd, ctrl 키 없이 스크롤만으로 zoom 확대
	});
	
	// 원 생성
	_circle = new google.maps.Circle({
	    strokeColor: "#FF0000",
	    strokeOpacity: 0.8,
	    strokeWeight: 2,
	    fillColor: "#FF0000",
	    fillOpacity: 0.35,
	    map: _map,
	    center: {lat:data.LATITUDE, lng:data.LONGTUD},
	    radius: data.RADIUS,
	});
	
	// map zoom을 circle에 bound 하기
	_map.fitBounds(_circle.getBounds());
	
	// 발전기 생성
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
	});
	
}
