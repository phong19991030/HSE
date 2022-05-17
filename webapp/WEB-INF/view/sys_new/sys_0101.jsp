<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
/* 첫번째 폼 padding 수정 - validation-check 때문에 */
.registration-form.registration-form1 {padding: 1.5rem 0 0;}
#map {margin-top:2.25rem;}

/* GROUP_ROW padding */
div#GROUP_AREA {padding-right: 2.2rem;}

#GROUP_ADD_BTN {
	/* width: calc(100% + 12%); */
	width: 100%;
    display: block;
    text-align: center;
    background: #e4e5e8;
    color: #fff;
    margin-top: 12px;
    padding: 3px 0;
    border-radius: 5px;
}
#GROUP_ADD_BTN i {
	font-size: 1.3rem;
    color: #fff;
    font-weight: 700;
}
</style>

<div class="container system-wrap system-wrap1">
	<!-- insert, update -->
	<input type="hidden" id="PROCESS" name="PROCESS" value="${PROCESS}">
	<input type="hidden" id="FARM_ID" name="FARM_ID" value="${DATA.FARM_ID}"></input>
	<input type="hidden" id="NO_GROUP_ID" name="NO_GROUP_ID" value=""></input>

	<!-- 발전기 등록 -->
	<div class="system-detail-wrap">
		<div class="system-left" id="FORM">

			<!--타이틀-->
			<div class="tit-wrap">
				<h2 class="heading3">
					<span class="txt">${PAGE_TITLE}</span>
					<!-- <span class="version">V47</span> -->
				</h2>
				<ul class="location">
					<li>SYSTEM</li>
					<li class="bold">Farm Management</li>
				</ul>
			</div>
			<!--//타이틀-->

			<!-- 등록 폼 -->
			<div class="registration-form registration-form1">
				<div class="registration-form-lst-wrap">
					<!-- 왼쪽 등록폼 -->
					<ul class="registration-form-lst">
						<li><span>Name<span class="red"> *</span></span>
							<div class="registration-write">
								<div class="input-group">
									<label for="wtgId" class="sr-only">Wind farm</label> <input
										type="text" id="FARM_NM" maxlength="15"
										validation-check="required">
								</div>
							</div></li>
						<li><span>Operator<span class="red"> *</span></span>
							<div class="registration-write btn-input-wrap">
								<div class="input-group">
									<label for="Operator" class="sr-only">Operator</label> <input
										type="text" id="COMPANY_NM" validation-check="required"
										placeholder="Select Operator" readonly>
								</div>
								<button id="OPER_SEARCH_BTN" type="button"
									class="input-btn btn-style1">Select</button>
							</div></li>

					</ul>
					<!-- //왼쪽 등록폼 -->

					<!-- 오른쪽 등록폼 -->
					<ul class="registration-form-lst">
						<li>
							<span>Group</span>
							<div id="GROUP_AREA" class="registration-write btn-input-wrap">
								<!-- <div class="input-group-wrapper">
									<div class="input-group">
										<label for="Group1" class="sr-only">Group</label> 
										<input type="text" id="GROUP_NM">
									</div>
									<div class="add-delete-btn-wrap">
										<a id="DELETE_BTN" class="delete-btn"> 
											<span class="sr-only">delete</span>
											<i class="xi-minus-square"></i>
										</a> 
										<a id="ADD_BTN" class="add-btn"> 
											<span class="sr-only">add</span> 
											<i class="xi-plus-square"></i>
										</a>
									</div>
								</div> -->
								
								<a id="GROUP_ADD_BTN" href="javascript:void(0);" title="Add group"> 
									<span class="sr-only">add</span> 
									<i class="xi-plus"></i>
								</a>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<!-- //오른쪽 등록폼 -->

			<!-- 지도 -->
			<div id="map"></div>
			<!-- //지도 -->

			<!-- Location 설정 -->
			<div class="registration-form registration-form2">
				<div class="registration-form-lst-wrap">
					<ul class="registration-form-lst">
						<!-- <li>
							<span>Location<span class="red"> *</span></span>
							<div class="registration-write twice-input">
								<div class="input-group-wrapper">
									<div class="input-group">
										<label for="latitude" class="sr-only">Latitude</label> 
										<input type="text" id="LATITUDE" class="location" validation-check="required" placeholder="LATITUDE" maxNumberLength="2" maxDecimalLength="14">
									</div>
								</div>
								<div class="input-group-wrapper">
									<div class="input-group">
										<label for="longitude" class="sr-only">Longitude</label> 
										<input type="text" id="LONGTUD" class="location" validation-check="required" placeholder="LONGTITUDE" maxNumberLength="2" maxDecimalLength="14">
									</div>
								</div>
							</div>
						</li> -->
						<li>
							<span>Latitude<span class="red"> *</span></span>
							<div class="registration-write">
								<div class="input-group-wrapper">
									<div class="input-group">
										<label for="latitude" class="sr-only">Latitude</label> 
										<input type="number" id="LATITUDE" class="location" validation-check="required" placeholder="LATITUDE" maxNumberLength="3" maxDecimalLength="14" maxValue="90" minValue="-90">
									</div>
								</div>
							</div>
						</li>
						<li>
							<span>Longitude<span class="red"> *</span></span>
							<div class="registration-write">
								<div class="input-group-wrapper">
									<div class="input-group">
										<label for="latitude" class="sr-only">Longitude</label> 
										<input type="number" id="LONGTUD" class="location" validation-check="required" placeholder="LONGTITUDE" maxNumberLength="3" maxDecimalLength="14" maxValue="180" minValue="-180">
									</div>
								</div>
							</div>
						</li>
						<li>
							<span>Radius (m)<span class="red"> *</span></span>
							<div class="registration-write">
								<div class="input-group-wrapper">
									<div class="input-group">
										<label for="latitude" class="sr-only">Longitude</label> 
										<input type="number" id="RADIUS" class="location" validation-check="required" placeholder="RADIUS" maxlength="4">
									</div>
								</div>
							</div>
						</li>
					</ul>
					<!-- //Location 설정 -->

					<!-- Description -->
					<ul class="registration-form-lst">
						<li class="note">
							<span>Description</span>
							<div class="registration-write">
								<div class="input-group input-group-wrap">
									<label for="DESCRPT" class="sr-only">Description</label>
									<textarea id="DESCRPT" maxlength="300"></textarea>
								</div>
							</div>
						</li>
					</ul>
					<!-- //Description -->
				</div>
			</div>
		</div>
		<!-- //등록폼 -->

		<!-- 버튼 모음(오른쪽) -->
		<div class="system-right">
			<div class="btns" style="position: fixed; width: 12%;">
				<a href="javascript:void(0)" id="SAVE_BTN"class="btn-style btn-style1">Save</a> 
				<a href="javascript:history.back()" class="btn-style btn-style2">Cancel</a>
			</div>
		</div>
		<!-- //버튼 모음(오른쪽) -->
	</div>
	<!-- //발전기 등록 -->
</div>

<!-- layerpopup - operator select -->
<div id=layerPopup class="selectCompany">
	<div class="layer-cont" style="width: 700px;">
		<div class="tit-wrap">
			<strong class="heading6">Select a Operator</strong>
		</div>

		<!-- 검색폼 -->
		<div class="search-form-wrap">
			<div class="search-wrapper">
				<form name="detailKeywordForm">
					<div class="input-group">
						<label for="detailKeyword" class="sr-only">Enter search
							term</label> <input type="text" name="detailKeyword" id="POPUP_SEARCH"
							placeholder="Enter your search term and then press Enter.">
					</div>
					<a id="POPUP_REFRESH" class="refresh-btn"> 
						<i class="xi-refresh" title="Refresh"></i>
					</a>
				</form>
			</div>
		</div>
		<!-- //검색폼 -->

		<!-- 테이블 -->
		<div class="btn-table">
			<div class="base_grid_table">
				<table>
					<colgroup>
						<col style="width: 10%">
						<col style="width: 40%">
						<col style="width: 50%">
					</colgroup>
					<thead>
						<tr>
							<th scope="col"></th>
							<th scope="col">Logo</th>
							<th scope="col">Operator</th>
						</tr>
					</thead>
					<tbody id="OPER_LIST">
						<!-- 샘플 -->
						<!-- 				  			<tr> -->
						<!-- 				  				<td> -->
						<!-- 				  					<div class="checkbox-radio-custom"> -->
						<!-- 				                     <input type="checkbox" class="checkbox" id="checkA"> -->
						<!-- 				                     <label for="checkA" class="sr-only"></label> -->
						<!-- 				                   </div> -->
						<!-- 				  				</td> -->
						<!-- 				  				<td> -->
						<!-- 				  					<img src="/img/sub/ex_logo.png" alt=""> -->
						<!-- 				  				</td> -->
						<!-- 				  				<td>Operator 01</td> -->
						<!-- 				  			</tr> -->
						<!-- //샘플 -->
					</tbody>
				</table>
			</div>
		</div>
		<!-- //테이블 -->

		<div class="btns txt-right">
			<a id="POPUP_REGISTER" href="javascript:void(0)"
				class="btn-style btn-style1">Register</a>
		</div>

		<a id="POPUP_CLOSE" href="javascript:void(0)" class="layer-close">
			<span class="sr-only">close layer popup</span> <i class="xi-close" title="Close popup"></i>
		</a>
	</div>
</div>
<!-- //layerpopup -->

<!-- Google Map API -->
<script src="https://maps.googleapis.com/maps/api/js?libraries=geometry&key=AIzaSyCh3K14xNRxPzr5lD0Y02yHfIpgJnO0SYI"></script>
<!-- <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCh3K14xNRxPzr5lD0Y02yHfIpgJnO0SYI&callback=initMap"></script> -->

<!-- 스크립트 -->
<script src="${ctxPath}/script/sys/sys_0101.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>


<script>
	$(document).ready(function(){
		sys0101();
	});
</script>
	


<!-- <script>
	var _map; 
	var _circle;

	$(document).ready(function(){
		
		// 기본 좌표 생성
		var centerMap = new google.maps.LatLng(33.5177623, 126.6457088);
		
		// 지도 생성
		_map = new google.maps.Map(document.getElementById('map'), {
			//center: {lat:33.5177623, lng: 126.6457088},
			center: centerMap,
			zoom:20,
			minZoom: 5,
			//maxZoom: 12,
			gestureHandling: 'greedy', // cmd, ctrl 키 없이 스크롤만으로 zoom 확대
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
		    radius: 100,
		    //editable: true,
		    suppressUndo: true, //수정 되돌리기 비활성화 default: false 
		    draggable:true,
		});
		/* google.maps.event.addListener(_circle, 'click', 'dblclick', function(e) {
			console.log(this, e);
			moveMarker(e.latLng.lat(), e.latLng.lng());
		}); */
		// circle 클릭 이벤트
		_circle.addListener('click', circleClick);
		// circle 이동 이벤트 
		_circle.addListener('center_changed', circleDrag);
		_circle.addListener('drag', circleDrag);
		//_circle.addListener('dragend', circleDrag);
		// circle 수정 이벤트
		_circle.addListener('radius_changed', circleEdit);
		
		// map zoom을 circle에 bound 하기
		_map.fitBounds(_circle.getBounds());
		
		/* circle 이벤트 */
		function circleClick(e) {
			this.setEditable(this.editable ? false : true);
		};
		
		function circleDrag(e) {
			// infowindow
// 			_infoWindow.setPosition(this.center);
// 			_infoWindow.setContent(createInfoWindowContent(this.center, _map.getZoom()));
			
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
				_map.panTo(this.center);
			}
		};
		
		function circleEdit(e) {
			// infowindow
// 			_infoWindow.setPosition(this.center);
// 			_infoWindow.setContent(createInfoWindowContent(this.center, _map.getZoom()));
			
			// 위도, 경도 삽입 
			$('input#LATITUDE').val(this.center.lat());
			$('input#LONGTUD').val(this.center.lng());	
			
			
			var position = new google.maps.LatLng(this.center.lat(), this.center.lng());
			// 지도 센터 이동 
			_map.panTo(this.center);
			
			// 원크기에 따라 bound 하기
			_map.fitBounds(this.getBounds());
		};
		/*//circle 이벤트 */
		
		// 줌 체인지 이벤트 추가
		/* _map.addListener('zoom_changed', function() {
			//_infoWindow.setContent(createInfoWindowContent(mapMarker.position, _map.getZoom()));
			_infoWindow.setContent(createInfoWindowContent(this.center, _map.getZoom()));
			_infoWindow.open(_map);
		}); */

		// 지도 클릭 이벤트 생성
		_map.addListener('click', function(e) {
			// 현재 좌표 값
			console.log('[lat]', e.latLng.lat(), '[lng]', e.latLng.lng());
			
			// 위도, 경도 삽입 
			$('input#LATITUDE').val(e.latLng.lat());
			$('input#LONGTUD').val(e.latLng.lng());
			
			//moveMarker(e.latLng.lat(), e.latLng.lng());
			
			_circle.setCenter(e.latLng);
			
		});
		
		$('input#LATITUDE').on('keyup', function() {
			this.value = this.value.replace();
			
			
			
			var lat = $(this).val();
			var lng = $('input#LONGTUD').val();
			console.log(lat,lng);
			if(/[ㄱ-ㅎㅏ-ㅡ가-핳]/g.test(lat) || /[ㄱ-ㅎㅏ-ㅡ가-핳]/g.test(lng)) return;
			moveMarker(lat, lng);
		});
		
		$('input#LONGTUD').on('keyup', function() {
			this.value = this.value.replace();
			
			
			var lat = $('input#LATITUDE').val();
			var lng = $(this).val();
			console.log(lat,lng);
			if(/[ㄱ-ㅎㅏ-ㅡ가-핳]/g.test(lat) || /[ㄱ-ㅎㅏ-ㅡ가-핳]/g.test(lng)) return; 
			moveMarker(lat, lng);
		});
		
		if($('input#PROCESS').val() === 'INSERT') {
			$('input#LATITUDE').val(_map.center.lat());
			$('input#LONGTUD').val(_map.center.lng());	
		}
		
		sys0101();
	});
	
	function createInfoWindowContent(latLng, zoom) {
		//var scale = 1 << zoom;
		//var worldCoordinate = project(latLng);
		return [latLng].join('<br>');
	}
	
	// 마커, 윈도우, 지도센터 이동
	function moveMarker(lat, lng) {
		var position = new google.maps.LatLng(lat, lng);
		// 마커, 윈도우 이동
		//mapMarker.setPosition(position);
// 		_infoWindow.setPosition(position);
// 		_infoWindow.setContent(createInfoWindowContent(position, _map.getZoom()));
		
		// circle 이동
		_circle.setCenter(position);
		
		// 지도 센터 이동 
		//_map.panTo(position);
	}
</script> -->
