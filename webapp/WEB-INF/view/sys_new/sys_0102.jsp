<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%
	request.setCharacterEncoding("UTF-8");
%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<div class="container system-wrap system-wrap1">

	<!-- insert, update -->
	<input type="hidden" id="FARM_ID" name="FARM_ID"
		value="${DATA.FARM_ID}"></input>
	<%-- <input type="hidden" id="GROUP_ID" name="GROUP_ID" value="${DATA.GROUP_ID}"></input> --%>

	<c:if test="${DATA.FROM_TOTALVIEW eq 'Y'}">
		<input type="hidden" id="FROM_TOTALVIEW" name="FROM_TOTALVIEW" value="${DATA.FROM_TOTALVIEW}">
	</c:if>

	<!-- 발전단지 상세정보 -->
	<div class="system-detail-wrap">
		<div class="system-left" id="FORM">

			<!--타이틀-->
			<div class="tit-wrap">
				<h2 class="heading3">
					<span class="txt">Detail</span>
					<!-- <span class="version"></span> -->
				</h2>
				<ul class="location">
					<li>SYSTEM</li>
					<li class="bold">Farm Management</li>
				</ul>
			</div>
			<!--//타이틀-->

			<!-- 상세 폼 -->
			<div class="registration-form registration-form1">
				<div class="registration-form-lst-wrap">
					<!-- 왼쪽 상세폼 -->
					<ul class="registration-form-lst">
						<li><span>Wind farm</span>
							<div class="registration-write">
								<span id="FARM_NM"></span>
							</div></li>
						<li><span>Operator</span>
							<div class="registration-write btn-input-wrap">
								<span id="COMPANY_NM"></span>
							</div></li>

					</ul>
					<!-- //왼쪽 상세폼 -->

					<!-- 오른쪽 상세폼 -->
					<ul class="registration-form-lst">
						<li><span>Group</span>
							<div id="" class="registration-write btn-input-wrap">
								<div class="input-group-wrapper">
									<span id="GROUP_NM"></span>
								</div>
							</div></li>
					</ul>
				</div>
			</div>
			<!-- //오른쪽 상세폼 -->

			<!-- 지도 -->
			<div id="map"></div>
			<!-- //지도 -->

			<!-- Location 설정 -->
			<div class="registration-form registration-form2">
				<div class="registration-form-lst-wrap">
					<ul class="registration-form-lst">
						<li>
							<!-- <span>Location</span>
							<div class="registration-write twice-input">
								<span id="LATITUDE"></span> 
								<span> , </span> 
								<span id="LONGTUD"></span>
							</div> -->
							<span>Latitude</span>
							<div class="registration-write">
								<span id="LATITUDE"></span> 
							</div>
						</li>
						<li>
							<span>Longitude</span>
							<div class="registration-write">
								<span id="LONGTUD"></span> 
							</div>
						</li>
						<li>
							<span>Radius (m)</span>
							<div class="registration-write">
								<span id="RADIUS"></span> 
							</div>
						</li>
					</ul>
					<!-- //Location 설정 -->

					<!-- Description -->
					<ul class="registration-form-lst">
						<li class="note">
							<span>Description</span>
							<div class="registration-write change-line">
								<span id="DESCRPT"></span>
							</div>
						</li>
					</ul>
					<!-- //Description -->
				</div>
			</div>
		</div>
		<!-- //상세폼 -->

		<!-- 버튼 모음(오른쪽) -->
		<div class="system-right">
			<div class="btns" style="position: fixed; width: 12%;">
				<span id="MODIFY_BTN" class="btn-style btn-style1">Modify</span> 
				<span id="DELETE_BTN" class="btn-style btn-style3">Delete</span> 
				<a href="javascript:history.back()" class="btn-style btn-style2">Cancel</a>
			</div>
		</div>
		<!-- //버튼 모음(오른쪽) -->
	</div>
	<!-- //발전단지 상세정보 -->
</div>

<!-- Google Map API -->
<script src="https://maps.googleapis.com/maps/api/js?libraries=geometry&key=AIzaSyCh3K14xNRxPzr5lD0Y02yHfIpgJnO0SYI"></script>

<!-- 스크립트 -->
<script src="${ctxPath}/script/sys/sys_0102.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>
	$(document).ready(function() {
		sys0102();
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
		
		sys0102();
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