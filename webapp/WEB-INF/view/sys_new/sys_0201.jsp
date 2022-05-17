<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage=""%>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<style>
/* input type이 number인 경우 화살표 css 제거 */
input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {-webkit-appearance: none;margin: 0;}
span#MANUFACTURER_NM, span#POWER, span#TOWER_H, span#ROTOR_D {height:32px;display:inline-block;line-height:32px;} 

.btns {margin: 10px 0 0 0;}
#layerPopup .layer-cont.OPERATOR {width:700px;}
#layerPopup .layer-cont.TURBINE-MODEL {width:1060px;}
#layerPopup .layer-cont.TURBINE-MODEL .base_grid_table td {
	border-bottom: 1px solid #ddd; border-right: 1px solid #e2e2e2; border-left: 1px solid #c8c8ca;
}
#layerPopup .layer-cont.TURBINE-MODEL .base_grid_table th {
	border-bottom: 1px solid #ddd; border-right: 1px solid #e2e2e2; border-left: 1px solid #c8c8ca;
}
</style>

<div class="container system-wrap system-wrap1">
	<!-- insert, update -->
	<input type="hidden" id="PROCESS" name="PROCESS" value="${PROCESS}">
	<input type="hidden" id="GERATOR_ID" name="GERATOR_ID" value="${DATA.GERATOR_ID}">
	
	
	<!-- 발전기 등록화면 -->
	<div class="system-detail-wrap">
		<div class="system-left">
			<!-- 타이틀 -->
			<div class="tit-wrap">
				<h2 class="heading3">
					<span class="txt">${PAGE_TITLE}</span>
					<!-- <span class="version">V47</span> -->
				</h2>
				<ul class="location">
					<li>SYSTEM</li>
					<li class="bold">Turbine Management</li>
				</ul>
			</div>
			<!--//타이틀-->

			<!-- 등록 폼 -->
			<div class="registration-form">
				<div class="registration-form-lst-wrap">
					<!-- 왼쪽 등록 폼 -->
					<ul class="registration-form-lst">
						<li>
							<span>Farm<span class="red"> *</span></span>
							<div class="registration-write registration-write-select">
								<div class="input-group-wrapper">
									<div class="select-box">
										<label for="FARM"></label> 
										<select id="FARM" class="info-select" validation-check="required">
											<option value="" selected># Farm</option>
										</select>
									</div>
								</div>
							</div>
						</li>
						<li>
							<span>Group</span>
							<div class="registration-write registration-write-select">
								<div class="input-group-wrapper">
									<div class="select-box">
										<label for="GROUP"></label> 
										<select id="GROUP" class="info-select">
											<option value="" selected># Group</option>
										</select>
									</div>
								</div>
							</div>
						</li>
						<li>
							<span>Turbine ID<span class="red"> *</span></span>
							<div class="registration-write">
								<div class="input-group">
									<label for="TURBINE_ID" class="sr-only">Turbine ID</label> 
									<input type="text" id="TURBINE_ID" validation-check="required" maxlength="15">
								</div>
							</div></li>
						<li>
							<span>Turbine Name<span class="red"> *</span></span>
							<div class="registration-write">
								<div class="input-group-wrapper">
									<div class="input-group">
										<label for="TURBINE_NM" class="sr-only">Turbine Name</label>
										<input type="text" id="TURBINE_NM" validation-check="required" maxlength="15">
									</div>
								</div>
							</div>
						</li>
						<li>
							<span>Operator<span class="red"> *</span></span>
							<div class="registration-write btn-input-wrap">
								<div class="input-group">
									<label for="OPERATOR" class="sr-only">Operator</label> 
									<input type="text" id="OPERATOR" validation-check="required" placeholder="Select Operator" readonly>
								</div>
								<button id="OPERATOR_SEARCH_BTN" type="button" class="input-btn btn-style1">Select</button>
							</div>
						</li>
					</ul>
					<!-- //왼쪽 등록 폼 -->

					<!-- 오른쪽 등록 폼 -->
					<ul class="registration-form-lst">
						<li>
							<span>Turbine Model<span class="red"> *</span></span>
							<div class="registration-write btn-input-wrap">
								<div class="input-group">
									<label for="TURBINE-MODEL" class="sr-only">Model</label> 
									<input type="text" id="TURBINE-MODEL" validation-check="required" placeholder="Select Model" readonly>
								</div>
								<button id="TURBINE-MODEL_SEARCH_BTN" type="button" class="input-btn btn-style1">Select</button>
							</div>
						</li>
						<li>
							<span>Manufacturer</span>
							<div class="registration-write">
								<!-- <span id="MANUFACTURER_NM"></span> -->
								<div class="input-group">
									<label for="MANUFACTURER_NM" class="sr-only">Model</label> 
									<input type="text" id="MANUFACTURER_NM" placeholder="Select Model" readonly>
								</div>
							</div>
						</li>
						<li>
							<span>Power</span>
							<div class="registration-write">
								<!-- <span id="POWER"></span> -->
								<div class="input-group">
									<label for="POWER" class="sr-only">Model</label> 
									<input type="text" id="POWER" placeholder="Select Model" readonly>
								</div>
							</div>
						</li>
						<li>
							<span>Tower's height</span>
							<div class="registration-write">
								<!-- <span id="TOWER_H"></span> -->
								<div class="input-group">
									<label for="TOWER_H" class="sr-only">Model</label> 
									<input type="text" id="TOWER_H" placeholder="Select Model" readonly>
								</div>
							</div>
						</li>
						<li>
							<span>Rotor diameter</span>
							<div class="registration-write">
								<!-- <span id="ROTOR_D"></span> -->
								<div class="input-group">
									<label for="ROTOR_D" class="sr-only">Model</label> 
									<input type="text" id="ROTOR_D" placeholder="Select Model" readonly>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>

			<!-- 지도 -->
			<div id="map"></div>
		
			<div class="registration-form">
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
										<input type="text" id="LATITUDE" class="location" validation-check="required" placeholder="LATITUDE" maxNumberLength="3" maxDecimalLength="14" readonly>
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
										<input type="text" id="LONGTUD" class="location" validation-check="required" placeholder="LONGTITUDE" maxNumberLength="3" maxDecimalLength="14" readonly>
									</div>
								</div>
							</div>
						</li>
					</ul>
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
				</div>
			</div>
		</div>
		<!-- // 등록폼 -->

		<!-- 버튼 모음 -->
		<div class="system-right">
			<div class="btns" style="position: fixed; width: 12%;">
				<a href="javascript:void(0)" id="SAVE_BTN"class="btn-style btn-style1">Save</a> 
				<a href="javascript:history.back()" class="btn-style btn-style2">Cancel</a>
			</div>
		</div>
		<!-- //버튼 모음 -->
	</div>
</div>

<!-- layerpopup - 제조사 선택 -->
<div id="layerPopup" class="dialog_company">
	<div class="layer-cont">
		<div class="tit-wrap">
			<strong class="heading6">Manufacturer</strong>
		</div>

		<!-- 검색폼 -->
		<div class="search-form-wrap">
			<div class="search-wrapper">
				<form id="detailKeywordForm" name="detailKeywordForm" method="post">
					<div class="input-group">
						<label for="detailKeyword" class="sr-only">Enter search
							term</label> <input type="text" name="detailKeyword" id="POPUP_SEARCH"
							placeholder="Enter your search term and then press Enter.">
					</div>
					<a id="POPUP_REFRESH" class="refresh-btn"> <i
						class="xi-refresh"></i>
					</a>
				</form>
			</div>
		</div>
		<!-- //검색폼 -->

		<!-- 테이블 -->
		<div class="btn-table">
			<div class="base_grid_table">
				<table>
					<caption>Select a Mannfacture - Logo, Operator</caption>
					<colgroup>
						<col style="width: 10%">
						<col style="width: 30%">
						<col style="width: 60%">
					</colgroup>
					<thead>
						<tr>
							<th scope="col"></th>
							<th scope="col">Logo</th>
							<th scope="col">Operator</th>
						</tr>
					</thead>
					<tbody id="MAFAC_LIST">
						<!-- 샘플 -->
						<tr>
							<td>
								<div class="checkbox-radio-custom">
									<input type="radio" class="checkbox" id="checkLogo1"> <label
										for="checkLogo1" class="sr-only"></label>
								</div>
							</td>
							<td><img src="/img/sub/ex_logo.png" alt=""></td>
							<td>Operator 01</td>
						</tr>
						<!-- //샘플 -->
					</tbody>
				</table>
			</div>
		</div>
		<!-- //테이블 -->

		<div class="btns txt-right">
			<a id="POPUP_SELECT" href="javascript:void(0)"
				class="btn-style btn-style4">Select</a>
		</div>

		<a id="POPUP_CLOSE" href="javascript:void(0)" class="layer-close">
			<span class="sr-only">close layer popup</span> <i class="xi-close"></i>
		</a>
	</div>
</div>

<!-- Google Map API -->
<script src="https://maps.googleapis.com/maps/api/js?libraries=geometry&key=AIzaSyCh3K14xNRxPzr5lD0Y02yHfIpgJnO0SYI"></script>
<!-- <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCh3K14xNRxPzr5lD0Y02yHfIpgJnO0SYI&callback=initMap"></script> -->


<!-- 스크립트 -->
<script src="${ctxPath}/script/sys/sys_0201.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>
	$(document).ready(function() {
		sys0201();
	});
</script>

<!-- <script>
	var _map; 
	var mapMarker;
	var coordInfoWindow;
	var TILE_SIZE = 256;
	$(document).ready(function() {
		
		// 기본 좌표 생성
		var centerMap = new google.maps.LatLng(33.5177623, 126.6457088);
		
		// 지도 생성
		_map = new google.maps.Map(document.getElementById('map'), {
			//center: {lat:33.5177623, lng: 126.6457088},
			center: centerMap,
			zoom: 12.5,
			//minZoom: 2.5,
			//maxZoom: 12,
			gestureHandling: 'greedy', // cmd, ctrl 키 없이 스크롤만으로 zoom 확대
			/* mapTypeId: "terrain", */
		});
		
		// 마커 추가
		var image = '/img/sub/wf_marker.png';
		mapMarker = new google.maps.Marker({
			position: centerMap,
			map: _map,
			icon: image
		});
		
		// 윈도우 생성
		coordInfoWindow = new google.maps.InfoWindow();
		coordInfoWindow.setContent(createInfoWindowContent(centerMap, _map.getZoom()));
		coordInfoWindow.setPosition(centerMap);
		coordInfoWindow.open(_map);
		
		// 줌 체인지 이벤트 추가
		_map.addListener('zoom_changed', function() {
			coordInfoWindow.setContent(createInfoWindowContent(mapMarker.position, _map.getZoom()));
			coordInfoWindow.open(_map);
		});

		// 지도 클릭 이벤트 생성
		_map.addListener('click', function(e) {
			// 현재 좌표 값
			console.log('[lat]', e.latLng.lat(), '[lng]', e.latLng.lng());
			
			// 위도, 경도 삽입 
			$('input#LATITUDE').val(e.latLng.lat());
			$('input#LONGTUD').val(e.latLng.lng());
			moveMarker(e.latLng.lat(), e.latLng.lng());
		});
		
		$('input#LATITUDE').on('input keyup', function() {
			var lat = $(this).val();
			var lng = $('input#LONGTUD').val();
			console.log(lat,lng);
			if(/[ㄱ-ㅎㅏ-ㅡ가-핳]/g.test(lat) || /[ㄱ-ㅎㅏ-ㅡ가-핳]/g.test(lng)) return;
			moveMarker(lat, lng);
		});
		
		$('input#LONGTUD').on('input keyup', function() {
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
		
		sys0201();		
	});
	
	function createInfoWindowContent(latLng, zoom) {
		var scale = 1 << zoom;
		var worldCoordinate = project(latLng);
		return [latLng].join('<br>');
	}
	
	// The mapping between latitude, longitude and pixels is defined by the web
	// mercator projection.
	function project(latLng) {
		var siny = Math.sin(latLng.lat() * Math.PI / 180);
		
		// Truncating to 0.9999 effectively limits latitude to 89.189. This is
		// about a third of a tile past the edge of the world tile.
		siny = Math.min(Math.max(siny, -0.9999), 0.9999);
		return new google.maps.Point(
			TILE_SIZE * (0.5 + latLng.lng() / 360),
			TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))
		);
	}
	
	// 마커, 윈도우, 지도센터 이동
	function moveMarker(lat, lng) {
		var position = new google.maps.LatLng(lat, lng);
		// 마커, 윈도우 이동
		mapMarker.setPosition(position);
		coordInfoWindow.setPosition(position);
		coordInfoWindow.setContent(createInfoWindowContent(position, _map.getZoom()));
		// 지도 센터 이동 
		_map.panTo(position);
	}
</script> -->
