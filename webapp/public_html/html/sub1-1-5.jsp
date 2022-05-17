<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
	
	<!-- *참고사항 - .cms-map-wrap5 -->
	<div class="cms-map-wrap cms-map-wrap5">
		<!--지도표시 영역-->
		<div id="map"></div>
		<!--//지도표시 영역-->

		<!--level2은 .popup-bubble에 이중 class로 .popup-bubble2이 붙습니다.level3은 .popup-bubble에 이중 class로 .popup-bubble3이 붙습니다.-->
		<!--default infowindow-->
		<!--풍력기 갯수가 10개 미만시 #infowindow-pop에 .popup-bubble2-->
		<!--풍력기 갯수가 5개 미만시 #infowindow-pop에 .popup-bubble3-->
		<!--click시 active-->
		
		<!-- *참고사항 - cms - map - popup 기본일 경우 -->
		<!-- <div id="infowindow-pop" class="popup-farm">
			<div class="info">
				<span>
					<em class="name">Hangwon</em>
					<strong class="num">40</strong>
				</span>
			</div>
			
			<div class="popup-farm-detail">
				<ul>
					<li>
						<strong class="tit">Faulted</strong>
						<strong class="detail-num"><span class="point point-txt">7</span><em>/</em><span>22</span></strong>
					</li>
					<li>
						<strong class="tit">Stopped</strong>
						<strong class="detail-num"><span class="point">0</span><em>/</em><span>22</span></strong>
					</li>
				</ul>
			</div>
			
			<div class="bg"></div>
		</div> -->
		<!-- //*참고사항 - cms - map - popup 기본일 경우  -->
		
		
		<!-- *참고사항 - cms - map - popup 경고일 경우 .warning  -->
		<!-- <div id="infowindow-pop" class="popup-farm warning">
			<div class="info">
				<span>
					<em class="name">Hangwon</em>
					<strong class="num">40</strong>
				</span>
			</div>
			
			<div class="popup-farm-detail">
				<ul>
					<li>
						<strong class="tit">Faulted</strong>
						<strong class="detail-num"><span class="point point-txt">999</span><em>/</em><span>999</span></strong>
					</li>
					<li>
						<strong class="tit">Stopped</strong>
						<strong class="detail-num"><span class="point">0</span><em>/</em><span>999</span></strong>
					</li>
				</ul>
			</div>
			
			<div class="bg"></div>
		</div>  -->
		<!-- //*참고사항 - cms - map - popup 경고일 경우 .warning  -->
		
		<!-- *참고사항 - cms - map - popup 심각일 경우  .problem -->
		<div id="infowindow-pop" class="popup-farm problem">
			<div class="info">
				<span>
					<em class="name">Hangwon</em>
					<strong class="num">40</strong>
				</span>
			</div>
			
			<div class="popup-farm-detail">
				<ul>
					<li>
						<strong class="tit">Faulted</strong>
						<strong class="detail-num"><span class="point point-txt">999</span><em>/</em><span>999</span></strong>
					</li>
					<li>
						<strong class="tit">Stopped</strong>
						<strong class="detail-num"><span class="point">0</span><em>/</em><span>100</span></strong>
					</li>
				</ul>
			</div>
			
			<div class="action">
				<span></span>
				<span></span>
			</div>
			<div class="bg"></div>
		</div>
		<!-- //*참고사항 - cms - map - popup 심각일 경우 .problem  -->
		
		<!--//default infowindow-->
		<script>
			var map, popup, Popup;

			/** Initializes the map and the custom popup. */
			function initMap() {
				map = new google.maps.Map(document.getElementById('map'), {
					center: {
						lat: 33.5177623,
						lng: 126.6457088
					},
					zoom: 12.5,
				});

				Popup = createPopupClass();
				
				popup = new Popup(
					new google.maps.LatLng(33.4777607, 126.6675584),
					document.getElementById('infowindow-pop'));
				popup.setMap(map);
				
				
				
			}

			/**
			 * Returns the Popup class.
			 *
			 * Unfortunately, the Popup class can only be defined after
			 * google.maps.OverlayView is defined, when the Maps API is loaded.
			 * This function should be called by initMap.
			 */
			function createPopupClass() {
				/**
				 * A customized popup on the map.
				 * @param {!google.maps.LatLng} position
				 * @param {!Element} content The bubble div.
				 * @constructor
				 * @extends {google.maps.OverlayView}
				 */
				function Popup(position, content) {
					this.position = position;

					content.classList.add('popup-bubble');

					// This zero-height div is positioned at the bottom of the bubble.
					var bubbleAnchor = document.createElement('div');
					bubbleAnchor.classList.add('popup-bubble-anchor');
					bubbleAnchor.appendChild(content);

					// This zero-height div is positioned at the bottom of the tip.
					this.containerDiv = document.createElement('div');
					this.containerDiv.classList.add('popup-container');
					this.containerDiv.appendChild(bubbleAnchor);

					// Optionally stop clicks, etc., from bubbling up to the map.
					google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
				}
				// ES5 magic to extend google.maps.OverlayView.
				Popup.prototype = Object.create(google.maps.OverlayView.prototype);

				/** Called when the popup is added to the map. */
				Popup.prototype.onAdd = function() {
					this.getPanes().floatPane.appendChild(this.containerDiv);
				};

				/** Called when the popup is removed from the map. */
				Popup.prototype.onRemove = function() {
					if (this.containerDiv.parentElement) {
						this.containerDiv.parentElement.removeChild(this.containerDiv);
					}
				};

				/** Called each frame when the popup needs to draw itself. */
				Popup.prototype.draw = function() {
					
					var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

					// Hide the popup when it is far out of view.
					var display =
						Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
						'block' :
						'none';

					if (display === 'block') {
						this.containerDiv.style.left = divPosition.x + 'px';
						this.containerDiv.style.top = divPosition.y + 'px';
					}
					if (this.containerDiv.style.display !== display) {
						this.containerDiv.style.display = display;
					}
				};

				return Popup;
			}
			//*참고사항 클릭시 마커 정보 나오는 효과
			$('#infowindow-pop').click(function(){
				$(this).toggleClass('popup-farm-detail-active'); 
		  	});
			//*참고사항 클릭시 마커 정보 나오는 효과
		</script>
		<!-- <script>
			var map, popup, Popup;

			/** Initializes the map and the custom popup. */
			function initMap() {
				map = new google.maps.Map(document.getElementById('map'), {
					center: {
						lat: 33.5177623,
						lng: 126.6457088
					},
					zoom: 12.5,
				});

				Popup = createPopupClass();
				popup = new Popup(
					new google.maps.LatLng(33.4777607, 126.6675584),
					document.getElementById('infowindow-pop'));
				popup.setMap(map);
			}

			/**
			 * Returns the Popup class.
			 *
			 * Unfortunately, the Popup class can only be defined after
			 * google.maps.OverlayView is defined, when the Maps API is loaded.
			 * This function should be called by initMap.
			 */
			function createPopupClass() {
				/**
				 * A customized popup on the map.
				 * @param {!google.maps.LatLng} position
				 * @param {!Element} content The bubble div.
				 * @constructor
				 * @extends {google.maps.OverlayView}
				 */
				function Popup(position, content) {
					this.position = position;

					content.classList.add('popup-bubble');

					// This zero-height div is positioned at the bottom of the bubble.
					var bubbleAnchor = document.createElement('div');
					bubbleAnchor.classList.add('popup-bubble-anchor');
					bubbleAnchor.appendChild(content);

					// This zero-height div is positioned at the bottom of the tip.
					this.containerDiv = document.createElement('div');
					this.containerDiv.classList.add('popup-container');
					this.containerDiv.appendChild(bubbleAnchor);

					// Optionally stop clicks, etc., from bubbling up to the map.
					google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
				}
				// ES5 magic to extend google.maps.OverlayView.
				Popup.prototype = Object.create(google.maps.OverlayView.prototype);

				/** Called when the popup is added to the map. */
				Popup.prototype.onAdd = function() {
					this.getPanes().floatPane.appendChild(this.containerDiv);
				};

				/** Called when the popup is removed from the map. */
				Popup.prototype.onRemove = function() {
					if (this.containerDiv.parentElement) {
						this.containerDiv.parentElement.removeChild(this.containerDiv);
					}
				};

				/** Called each frame when the popup needs to draw itself. */
				Popup.prototype.draw = function() {
					var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

					// Hide the popup when it is far out of view.
					var display =
						Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
						'block' :
						'none';

					if (display === 'block') {
						this.containerDiv.style.left = divPosition.x + 'px';
						this.containerDiv.style.top = divPosition.y + 'px';
					}
					if (this.containerDiv.style.display !== display) {
						this.containerDiv.style.display = display;
					}
				};

				return Popup;
			}
		</script>-->
		<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCh3K14xNRxPzr5lD0Y02yHfIpgJnO0SYI&callback=initMap"></script>

		<div class="map-info-wrap">
			<ul>
				<li class="map-info map-info2">
					<strong class="heading5">Energy Production</strong>
					<div class="energy-percent-wrap">
						<div class="energy-txt">
							<strong><i>3.6</i><span>GW</span><span>Current</span></strong>
						</div>
						<div class="energy-txt">
							<strong><i>1,150</i><span>GW</span><span>Annual</span></strong>
						</div>
						<div class="percent">
							<strong>+9.06%
								<i class="xi-long-arrow-down"></i>
								<!--올랐을때-->
								<!-- <i class="xi-long-arrow-up"></i> -->
							</strong>
							<span class="info">(YoY)</span>
						</div>
					</div>
				</li>
				<li class="map-info map-info4">
					<strong class="heading5">Weather</strong>
					<ul class="weather-lst">
						<!--default - 날씨좋음, 매우흐림 .weather-now.weather2, 흐림 .weather-now.weather3, 비 .weather-now.weather4, 소나기 .weather-now.weather5, 진눈깨비 .weather-now.weather6, 눈 .weather-now.weather7 -->
						<li class="weather-now">
							<div class="num">
								<span class="temperature">
									31 <em>℃</em>
								</span>
								<span class="temperature-detail">
									<em class="point1">16℃</em> / <em class="point2"> 33℃</em>
								</span>
							</div>
						</li>
						<li class="wind">
							<div class="num">
								<span class="wind-num">
									3 <em>km/h</em>
								</span>
							</div>
						</li>
					</ul>
				</li>
				<!-- 로딩시 .loading 붙음-->
				<li class="map-info map-info5">
					<!-- 로딩 -->
					<!--  <div class="load-wrapp">
				        <div>
				        	<div class="line"></div>
					        <div class="line"></div>
					        <div class="line"></div>
				        </div>
				     </div> -->
			    	 <!-- //로딩 -->
					<div class="alarm-list-wrapper">
						<strong class="heading5">Alarm list</strong>
						<div class="base_grid_table">
							<table>
								<caption>Alarm list - No, Date, Position, Alarm code, Description</caption>
								<thead>
									<tr>
										<th scope="col">NO.</th>
										<th scope="col">Date</th>
										<th scope="col">Position</th>
										<th scope="col">Alarm code</th>
										<th scope="col">Description</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>5</td>
										<td>2019.10.02  12:12:12 </td>
										<td>Hangwon > Group1 > V47</td>
										<td><strong class="point-num">40</strong>Turbine OK</td>
										<td>If the error the turbine has stopped with has reset before the turbine has delivered the alarm call to the QSL server....</td>
									</tr>
									<tr>
										<td>4</td>
										<td>2019.10.02  12:12:12 </td>
										<td>Hangwon > Group1 > V47</td>
										<td><strong class="point-num">40</strong>Turbine OK</td>
										<td>If the error the turbine has stopped with has reset before the turbine has delivered the alarm call to the QSL server....</td>
									</tr>
									<tr>
										<td>3</td>
										<td>2019.10.02  12:12:12 </td>
										<td>Hangwon > Group1 > V47</td>
										<td><strong class="point-num">40</strong>Turbine OK</td>
										<td>If the error the turbine has stopped with has reset before the turbine has delivered the alarm call to the QSL server....</td>
									</tr>
									<tr>
										<td>2</td>
										<td>2019.10.02  12:12:12 </td>
										<td>Hangwon > Group1 > V47</td>
										<td><strong class="point-num">40</strong>Turbine OK</td>
										<td>If the error the turbine has stopped with has reset before the turbine has delivered the alarm call to the QSL server....</td>
									</tr>
									<tr>
										<td>1</td>
										<td>2019.10.02  12:12:12 </td>
										<td>Hangwon > Group1 > V47</td>
										<td><strong class="point-num">40</strong>Turbine OK</td>
										<td>If the error the turbine has stopped with has reset before the turbine has delivered the alarm call to the QSL server....</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
	
	<!-- 로딩시 .loading 붙음-->
	<div class="cms-map-info-wrap cms-dash-board cms-dash-board-active">
		 <!-- mobile visible-->
		<a href="#none" class="view-all-info">View all information</a>
		 <!-- //mobile visible-->
		 
		 <!-- 로딩 -->
		 <!-- <div class="load-wrapp">
	        <div>
	        	<div class="line"></div>
		        <div class="line"></div>
		        <div class="line"></div>
	        </div>
	     </div> -->
    	 <!-- //로딩 -->
    	
		<div class="cms-map-info-wrap-scroll">
    	
			<ul class="cms-map-info-wrap-lst">
				<li>
					<strong class="heading12"><span>Sensor Error</span><em>2019.10.12</em></strong>
					<!-- *참고사항 - 스케쥴 없을 시에는 .gauge-wrapper에 .gauge-wrapper-scroll가 붙지 않습니다. (스크롤 x) -->
					<div class="gauge-wrapper gauge-wrapper-scroll">
						<div class="gauge-wrap">
							<a href="#none">
								<span class="tit">
									<strong class="blade blade3">Turbine04_Vestas_V47 Turbine04_Vestas_V47</strong>
									<span>12:12:12 ~ 13:13:13</span>
								</span>
								<span class="gauge-cont" data-percentage="80">
								  <span class="gauge-value">
							  		<span>0.000</span>
							  		<span>0.000</span>
							  	  </span>
								  <span class="gauge">
								  	
								    <span class="inner"></span>
								  </span>
								  <span class="pointer"><strong class="gauge-num problem-num"></strong></span>
								  <span class="pointer-knob"></span>
								</span>
								<span class="output-num">0.000000000000000000</span>
								<span class="blade-name">
									<strong class="blade blade1"><span>Generator</span><span>Generator-housing-GE-DE_in</span></strong>
								</span>
							</a>
						</div>
						<div class="gauge-wrap">
							<a href="#none">
								<span class="tit">
									<strong class="blade blade3">Turbine04_Vestas_V47 Turbine04_Vestas_V47</strong>
									<span>12:12:12 ~ 13:13:13</span>
								</span>
								<span class="gauge-cont" data-percentage="80">
								  <span class="gauge-value">
							  		<span>0.000</span>
							  		<span>0.000</span>
							  	  </span>
								  <span class="gauge">
								  	
								    <span class="inner"></span>
								  </span>
								  <span class="pointer"><strong class="gauge-num problem-num"></strong></span>
								  <span class="pointer-knob"></span>
								</span>
								<span class="output-num">0.000000000000000000</span>
								<span class="blade-name">
									<strong class="blade blade1"><span>Generator</span><span>Generator-housing-GE-DE_in</span></strong>
								</span>
							</a>
						</div>
						<div class="gauge-wrap">
							<a href="#none">
								<span class="tit">
									<strong class="blade blade3">Turbine04_Vestas_V47 Turbine04_Vestas_V47</strong>
									<span>12:12:12 ~ 13:13:13</span>
								</span>
								<span class="gauge-cont" data-percentage="80">
								  <span class="gauge-value">
							  		<span>0.000</span>
							  		<span>0.000</span>
							  	  </span>
								  <span class="gauge">
								  	
								    <span class="inner"></span>
								  </span>
								  <span class="pointer"><strong class="gauge-num problem-num"></strong></span>
								  <span class="pointer-knob"></span>
								</span>
								<span class="output-num">0.000000000000000000</span>
								<span class="blade-name">
									<strong class="blade blade1"><span>Generator</span><span>Generator-housing-GE-DE_in</span></strong>
								</span>
							</a>
						</div>
						<div class="gauge-wrap">
							<a href="#none">
								<span class="tit">
									<strong class="blade blade3">Turbine04_Vestas_V47 Turbine04_Vestas_V47</strong>
									<span>12:12:12 ~ 13:13:13</span>
								</span>
								<span class="gauge-cont" data-percentage="80">
								  <span class="gauge-value">
							  		<span>0.000</span>
							  		<span>0.000</span>
							  	  </span>
								  <span class="gauge">
								  	
								    <span class="inner"></span>
								  </span>
								  <span class="pointer"><strong class="gauge-num problem-num"></strong></span>
								  <span class="pointer-knob"></span>
								</span>
								<span class="output-num">0.000000000000000000</span>
								<span class="blade-name">
									<strong class="blade blade1"><span>Generator</span><span>Generator-housing-GE-DE_in</span></strong>
								</span>
							</a>
						</div>
						<div class="gauge-wrap">
							<a href="#none">
								<span class="tit">
									<strong class="blade blade3">Turbine04_Vestas_V47 Turbine04_Vestas_V47</strong>
									<span>12:12:12 ~ 13:13:13</span>
								</span>
								<span class="gauge-cont" data-percentage="80">
								  <span class="gauge-value">
							  		<span>0.000</span>
							  		<span>0.000</span>
							  	  </span>
								  <span class="gauge">
								  	
								    <span class="inner"></span>
								  </span>
								  <span class="pointer"><strong class="gauge-num problem-num"></strong></span>
								  <span class="pointer-knob"></span>
								</span>
								<span class="output-num">0.000000000000000000</span>
								<span class="blade-name">
									<strong class="blade blade1"><span>Generator</span><span>Generator-housing-GE-DE_in</span></strong>
								</span>
							</a>
						</div>
						<div class="gauge-wrap">
							<a href="#none">
								<span class="tit">
									<strong class="blade blade3">Turbine04_Vestas_V47 Turbine04_Vestas_V47</strong>
									<span>12:12:12 ~ 13:13:13</span>
								</span>
								<span class="gauge-cont" data-percentage="80">
								  <span class="gauge-value">
							  		<span>0.000</span>
							  		<span>0.000</span>
							  	  </span>
								  <span class="gauge">
								  	
								    <span class="inner"></span>
								  </span>
								  <span class="pointer"><strong class="gauge-num problem-num"></strong></span>
								  <span class="pointer-knob"></span>
								</span>
								<span class="output-num">0.000000000000000000</span>
								<span class="blade-name">
									<strong class="blade blade1"><span>Generator</span><span>Generator-housing-GE-DE_in</span></strong>
								</span>
							</a>
						</div>
						<div class="gauge-wrap">
							<a href="#none">
								<span class="tit">
									<strong class="blade blade3">Turbine04_Vestas_V47 Turbine04_Vestas_V47</strong>
									<span>12:12:12 ~ 13:13:13</span>
								</span>
								<span class="gauge-cont" data-percentage="80">
								  <span class="gauge-value">
							  		<span>0.000</span>
							  		<span>0.000</span>
							  	  </span>
								  <span class="gauge">
								  	
								    <span class="inner"></span>
								  </span>
								  <span class="pointer"><strong class="gauge-num problem-num"></strong></span>
								  <span class="pointer-knob"></span>
								</span>
								<span class="output-num">0.000000000000000000</span>
								<span class="blade-name">
									<strong class="blade blade1"><span>Generator</span><span>Generator-housing-GE-DE_in</span></strong>
								</span>
							</a>
						</div>
						<div class="gauge-wrap">
							<a href="#none">
								<span class="tit">
									<strong class="blade blade3">Turbine04_Vestas_V47 Turbine04_Vestas_V47</strong>
									<span>12:12:12 ~ 13:13:13</span>
								</span>
								<span class="gauge-cont" data-percentage="80">
								  <span class="gauge-value">
							  		<span>0.000</span>
							  		<span>0.000</span>
							  	  </span>
								  <span class="gauge">
								  	
								    <span class="inner"></span>
								  </span>
								  <span class="pointer"><strong class="gauge-num problem-num"></strong></span>
								  <span class="pointer-knob"></span>
								</span>
								<span class="output-num">0.000000000000000000</span>
								<span class="blade-name">
									<strong class="blade blade1"><span>Generator</span><span>Generator-housing-GE-DE_in</span></strong>
								</span>
							</a>
						</div>
						<div class="gauge-wrap">
							<a href="#none">
								<span class="tit">
									<strong class="blade blade3">Turbine04_Vestas_V47 Turbine04_Vestas_V47</strong>
									<span>12:12:12 ~ 13:13:13</span>
								</span>
								<span class="gauge-cont" data-percentage="80">
								  <span class="gauge-value">
							  		<span>0.000</span>
							  		<span>0.000</span>
							  	  </span>
								  <span class="gauge">
								  	
								    <span class="inner"></span>
								  </span>
								  <span class="pointer"><strong class="gauge-num problem-num"></strong></span>
								  <span class="pointer-knob"></span>
								</span>
								<span class="output-num">0.000000000000000000</span>
								<span class="blade-name">
									<strong class="blade blade1"><span>Generator</span><span>Generator-housing-GE-DE_in</span></strong>
								</span>
							</a>
						</div>
						<div class="gauge-wrap">
							<a href="#none">
								<span class="tit">
									<strong class="blade blade3">Turbine04_Vestas_V47 Turbine04_Vestas_V47</strong>
									<span>12:12:12 ~ 13:13:13</span>
								</span>
								<span class="gauge-cont" data-percentage="80">
								  <span class="gauge-value">
							  		<span>0.000</span>
							  		<span>0.000</span>
							  	  </span>
								  <span class="gauge">
								  	
								    <span class="inner"></span>
								  </span>
								  <span class="pointer"><strong class="gauge-num problem-num"></strong></span>
								  <span class="pointer-knob"></span>
								</span>
								<span class="output-num">0.000000000000000000</span>
								<span class="blade-name">
									<strong class="blade blade1"><span>Generator</span><span>Generator-housing-GE-DE_in</span></strong>
								</span>
							</a>
						</div>
						<div class="gauge-wrap">
							<a href="#none">
								<span class="tit">
									<strong class="blade blade3">Turbine04_Vestas_V47 Turbine04_Vestas_V47</strong>
									<span>12:12:12 ~ 13:13:13</span>
								</span>
								<span class="gauge-cont" data-percentage="80">
								  <span class="gauge-value">
							  		<span>0.000</span>
							  		<span>0.000</span>
							  	  </span>
								  <span class="gauge">
								  	
								    <span class="inner"></span>
								  </span>
								  <span class="pointer"><strong class="gauge-num problem-num"></strong></span>
								  <span class="pointer-knob"></span>
								</span>
								<span class="output-num">0.000000000000000000</span>
								<span class="blade-name">
									<strong class="blade blade1"><span>Generator</span><span>Generator-housing-GE-DE_in</span></strong>
								</span>
							</a>
						</div>
					</div>
				</li>
				<li>
					<strong class="heading12"><span>Schedules</span><em>2019.10.12</em></strong>
					<!-- *참고사항 - 재고 부품 없을 시에는 .schedules-wrapper에 .schedules-wrapper-active가 붙습니다. (스크롤 x) -->
					<div class="schedules-wrapper schedules-wrapper-active">
						<div class="schedules-wrap">
							<a href="#none">
								<span class="tit">
									<strong>U50</strong>
								</span>
								<span class="schedules-lst">
									<span class="parts-lst">
										<strong class="schedules-tit">Parts</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Texaco Rando Wm 32 LT</span>
												<span class="d-day-gauge">
													<em style="width:50%;"></em>
												</span>
												<span class="d-day-num">999days</span>
											</span>
											<span>
												<span class="name">Omala</span>
												<span class="d-day-gauge">
													<em style="width:80%;"></em>
												</span>
												<span class="d-day-num">999days</span>
											</span>
										</span>
									</span>
									<span class="parts-lst detail-lst work-detail-lst">
										<strong class="schedules-tit">Delivery Detail</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Texaco Rando Wm 32 LT</span>
												<span class="detail">2019.10.01~2019.10.17</span>
											</span>
											<span>
												<span class="name">Omala</span>
												<span class="detail">2019.10.01~2019.10.17</span>
											</span>
										</span>
									</span>
									<span class="tool-lst">
										<strong class="schedules-tit">Tools&amp;PPE</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Filler gauge</span>
												<span class="d-day-gauge">
													<em style="width:50%;"></em>
												</span>
												<span class="d-day-num">999days</span>
											</span>
											<span>
												<span class="name">Filler</span>
												<span class="d-day-gauge">
													<em style="width:80%;"></em>
												</span>
												<span class="d-day-num">4days</span>
											</span>
										</span>
									</span>
									<span class="detail-lst delivery-detail-lst">
										<strong class="schedules-tit">Delivery-detail</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Filler gauge</span>
												<span class="detail">2019.10.01~2019.10.17</span>
											</span>
											<span>
												<span class="name">Fillers</span>
												<span class="detail">2019.10.01~2019.10.17</span>
											</span>
										</span>
									</span>
									<span class="work-lst">
										<strong class="schedules-tit">Work</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Work</span>
												<span class="participant">Hong Gil-dong and 3 others</span>
											</span>
										</span>
									</span>
									<span class="work-lst detail-lst work-detail-lst">
										<strong class="schedules-tit">Work Detail</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Details</span>
												<span class="detail">Part Replacement</span>
											</span>
											<span>
												<span class="name">Period</span>
												<span class="detail">09:00~16:00</span>
											</span>
											<span>
												<span class="name">Worker</span>
												<span class="detail">
													<em>Hong Gil-dong1</em>
													<em>Hong Gil-dong2</em>
													<em>Hong Gil-dong3</em>
												</span>
											</span>
											<span>
												<span class="name">Cost</span>
												<span class="detail">
													<em>1,500,000 WON</em>
												</span>
											</span>
										</span>
									</span>
								</span>
							</a>
						</div>
						<div class="schedules-wrap">
							<a href="#none">
								<span class="tit">
									<strong>U50</strong>
								</span>
								<span class="schedules-lst">
									<span class="parts-lst">
										<strong class="schedules-tit">Parts</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Texaco Rando Wm 32 LT</span>
												<span class="d-day-gauge">
													<em style="width:50%;"></em>
												</span>
												<span class="d-day-num">999days</span>
											</span>
											<span>
												<span class="name">Omala</span>
												<span class="d-day-gauge">
													<em style="width:80%;"></em>
												</span>
												<span class="d-day-num">999days</span>
											</span>
										</span>
									</span>
									<span class="parts-lst detail-lst work-detail-lst">
										<strong class="schedules-tit">Delivery Detail</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Texaco Rando Wm 32 LT</span>
												<span class="detail">2019.10.01~2019.10.17</span>
											</span>
											<span>
												<span class="name">Omala</span>
												<span class="detail">2019.10.01~2019.10.17</span>
											</span>
										</span>
									</span>
									<span class="tool-lst">
										<strong class="schedules-tit">Tools&amp;PPE</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Filler gauge</span>
												<span class="d-day-gauge">
													<em style="width:50%;"></em>
												</span>
												<span class="d-day-num">999days</span>
											</span>
											<span>
												<span class="name">Filler</span>
												<span class="d-day-gauge">
													<em style="width:80%;"></em>
												</span>
												<span class="d-day-num">4days</span>
											</span>
										</span>
									</span>
									<span class="detail-lst delivery-detail-lst">
										<strong class="schedules-tit">Delivery-detail</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Filler gauge</span>
												<span class="detail">2019.10.01~2019.10.17</span>
											</span>
											<span>
												<span class="name">Fillers</span>
												<span class="detail">2019.10.01~2019.10.17</span>
											</span>
										</span>
									</span>
									<span class="work-lst">
										<strong class="schedules-tit">Work</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Work</span>
												<span class="participant">Hong Gil-dong and 3 others</span>
											</span>
										</span>
									</span>
									<span class="work-lst detail-lst work-detail-lst">
										<strong class="schedules-tit">Work Detail</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Details</span>
												<span class="detail">Part Replacement</span>
											</span>
											<span>
												<span class="name">Period</span>
												<span class="detail">09:00~16:00</span>
											</span>
											<span>
												<span class="name">Worker</span>
												<span class="detail">
													<em>Hong Gil-dong1</em>
													<em>Hong Gil-dong2</em>
													<em>Hong Gil-dong3</em>
												</span>
											</span>
											<span>
												<span class="name">Cost</span>
												<span class="detail">
													<em>1,500,000 WON</em>
												</span>
											</span>
										</span>
									</span>
								</span>
							</a>
						</div>
						<div class="schedules-wrap">
							<a href="#none">
								<span class="tit">
									<strong>U50</strong>
								</span>
								<span class="schedules-lst">
									<span class="parts-lst">
										<strong class="schedules-tit">Parts</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Texaco Rando Wm 32 LT</span>
												<span class="d-day-gauge">
													<em style="width:50%;"></em>
												</span>
												<span class="d-day-num">999days</span>
											</span>
											<span>
												<span class="name">Omala</span>
												<span class="d-day-gauge">
													<em style="width:80%;"></em>
												</span>
												<span class="d-day-num">999days</span>
											</span>
										</span>
									</span>
									<span class="parts-lst detail-lst work-detail-lst">
										<strong class="schedules-tit">Delivery Detail</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Texaco Rando Wm 32 LT</span>
												<span class="detail">2019.10.01~2019.10.17</span>
											</span>
											<span>
												<span class="name">Omala</span>
												<span class="detail">2019.10.01~2019.10.17</span>
											</span>
										</span>
									</span>
									<span class="tool-lst">
										<strong class="schedules-tit">Tools&amp;PPE</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Filler gauge</span>
												<span class="d-day-gauge">
													<em style="width:50%;"></em>
												</span>
												<span class="d-day-num">999days</span>
											</span>
											<span>
												<span class="name">Filler</span>
												<span class="d-day-gauge">
													<em style="width:80%;"></em>
												</span>
												<span class="d-day-num">4days</span>
											</span>
										</span>
									</span>
									<span class="detail-lst delivery-detail-lst">
										<strong class="schedules-tit">Delivery-detail</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Filler gauge</span>
												<span class="detail">2019.10.01~2019.10.17</span>
											</span>
											<span>
												<span class="name">Fillers</span>
												<span class="detail">2019.10.01~2019.10.17</span>
											</span>
										</span>
									</span>
									<span class="work-lst">
										<strong class="schedules-tit">Work</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Work</span>
												<span class="participant">Hong Gil-dong and 3 others</span>
											</span>
										</span>
									</span>
									<span class="work-lst detail-lst work-detail-lst">
										<strong class="schedules-tit">Work Detail</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Details</span>
												<span class="detail">Part Replacement</span>
											</span>
											<span>
												<span class="name">Period</span>
												<span class="detail">09:00~16:00</span>
											</span>
											<span>
												<span class="name">Worker</span>
												<span class="detail">
													<em>Hong Gil-dong1</em>
													<em>Hong Gil-dong2</em>
													<em>Hong Gil-dong3</em>
												</span>
											</span>
											<span>
												<span class="name">Cost</span>
												<span class="detail">
													<em>1,500,000 WON</em>
												</span>
											</span>
										</span>
									</span>
								</span>
							</a>
						</div>
						<div class="schedules-wrap">
							<a href="#none">
								<span class="tit">
									<strong>U50</strong>
								</span>
								<span class="schedules-lst">
									<span class="parts-lst">
										<strong class="schedules-tit">Parts</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Texaco Rando Wm 32 LT</span>
												<span class="d-day-gauge">
													<em style="width:50%;"></em>
												</span>
												<span class="d-day-num">999days</span>
											</span>
											<span>
												<span class="name">Omala</span>
												<span class="d-day-gauge">
													<em style="width:80%;"></em>
												</span>
												<span class="d-day-num">999days</span>
											</span>
										</span>
									</span>
									<span class="parts-lst detail-lst work-detail-lst">
										<strong class="schedules-tit">Delivery Detail</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Texaco Rando Wm 32 LT</span>
												<span class="detail">2019.10.01~2019.10.17</span>
											</span>
											<span>
												<span class="name">Omala</span>
												<span class="detail">2019.10.01~2019.10.17</span>
											</span>
										</span>
									</span>
									<span class="tool-lst">
										<strong class="schedules-tit">Tools&amp;PPE</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Filler gauge</span>
												<span class="d-day-gauge">
													<em style="width:50%;"></em>
												</span>
												<span class="d-day-num">999days</span>
											</span>
											<span>
												<span class="name">Filler</span>
												<span class="d-day-gauge">
													<em style="width:80%;"></em>
												</span>
												<span class="d-day-num">4days</span>
											</span>
										</span>
									</span>
									<span class="detail-lst delivery-detail-lst">
										<strong class="schedules-tit">Delivery-detail</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Filler gauge</span>
												<span class="detail">2019.10.01~2019.10.17</span>
											</span>
											<span>
												<span class="name">Fillers</span>
												<span class="detail">2019.10.01~2019.10.17</span>
											</span>
										</span>
									</span>
									<span class="work-lst">
										<strong class="schedules-tit">Work</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Work</span>
												<span class="participant">Hong Gil-dong and 3 others</span>
											</span>
										</span>
									</span>
									<span class="work-lst detail-lst work-detail-lst">
										<strong class="schedules-tit">Work Detail</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Details</span>
												<span class="detail">Part Replacement</span>
											</span>
											<span>
												<span class="name">Period</span>
												<span class="detail">09:00~16:00</span>
											</span>
											<span>
												<span class="name">Worker</span>
												<span class="detail">
													<em>Hong Gil-dong1</em>
													<em>Hong Gil-dong2</em>
													<em>Hong Gil-dong3</em>
												</span>
											</span>
											<span>
												<span class="name">Cost</span>
												<span class="detail">
													<em>1,500,000 WON</em>
												</span>
											</span>
										</span>
									</span>
								</span>
							</a>
						</div>
						<div class="schedules-wrap">
							<a href="#none">
								<span class="tit">
									<strong>U50</strong>
								</span>
								<span class="schedules-lst">
									<span class="parts-lst">
										<strong class="schedules-tit">Parts</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Texaco Rando Wm 32 LT</span>
												<span class="d-day-gauge">
													<em style="width:50%;"></em>
												</span>
												<span class="d-day-num">999days</span>
											</span>
											<span>
												<span class="name">Omala</span>
												<span class="d-day-gauge">
													<em style="width:80%;"></em>
												</span>
												<span class="d-day-num">999days</span>
											</span>
										</span>
									</span>
									<span class="parts-lst detail-lst work-detail-lst">
										<strong class="schedules-tit">Delivery Detail</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Texaco Rando Wm 32 LT</span>
												<span class="detail">2019.10.01~2019.10.17</span>
											</span>
											<span>
												<span class="name">Omala</span>
												<span class="detail">2019.10.01~2019.10.17</span>
											</span>
										</span>
									</span>
									<span class="tool-lst">
										<strong class="schedules-tit">Tools&amp;PPE</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Filler gauge</span>
												<span class="d-day-gauge">
													<em style="width:50%;"></em>
												</span>
												<span class="d-day-num">999days</span>
											</span>
											<span>
												<span class="name">Filler</span>
												<span class="d-day-gauge">
													<em style="width:80%;"></em>
												</span>
												<span class="d-day-num">4days</span>
											</span>
										</span>
									</span>
									<span class="detail-lst delivery-detail-lst">
										<strong class="schedules-tit">Delivery-detail</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Filler gauge</span>
												<span class="detail">2019.10.01~2019.10.17</span>
											</span>
											<span>
												<span class="name">Fillers</span>
												<span class="detail">2019.10.01~2019.10.17</span>
											</span>
										</span>
									</span>
									<span class="work-lst">
										<strong class="schedules-tit">Work</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Work</span>
												<span class="participant">Hong Gil-dong and 3 others</span>
											</span>
										</span>
									</span>
									<span class="work-lst detail-lst work-detail-lst">
										<strong class="schedules-tit">Work Detail</strong>
										<span class="d-day-lst">
											<span>
												<span class="name">Details</span>
												<span class="detail">Part Replacement</span>
											</span>
											<span>
												<span class="name">Period</span>
												<span class="detail">09:00~16:00</span>
											</span>
											<span>
												<span class="name">Worker</span>
												<span class="detail">
													<em>Hong Gil-dong1</em>
													<em>Hong Gil-dong2</em>
													<em>Hong Gil-dong3</em>
												</span>
											</span>
											<span>
												<span class="name">Cost</span>
												<span class="detail">
													<em>1,500,000 WON</em>
												</span>
											</span>
										</span>
									</span>
								</span>
							</a>
						</div>
					</div>
				</li>
				<li>
					<strong class="heading12"><span>Parts out of stock</span><em>2019.10.12</em></strong>
					<div class="base_grid_table">
						<table>
							<caption>Parts out of stock - Position, Part number, Category, Stock, Minimum requirement</caption>
							<thead>
								<tr>
									<th scope="col">NO.</th>
									<th scope="col">Position</th>
									<th scope="col">Part number</th>
									<th scope="col">Category</th>
									<th scope="col">Stock</th>
									<th scope="col">Minimum requirement</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>4</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>3</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>2</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
								<tr>
									<td>1</td>
									<td>Hangwon > Group1 > V47</td>
									<td>004</td>
									<td>Main Cable</td>
									<td>
										<strong class="point2">2</strong>
									</td>
									<td>3</td>
								</tr>
							</tbody>
						</table>
					</div>
				</li>
				
				<!-- <li class="wt-detail-info">
					<strong class="name">Group 01</strong>
					<ul>
						<li class="detail-info detail-info1">
							<strong><i class="xi-paper"></i><span>Group Name</span></strong>
							<span>Group 01</span>
						</li>
						<li class="detail-info detail-info2">
							<strong><i class="xi-user-address"></i><span>Operator</span></strong>
							<span>Hong Gil Dong</span>
						</li>
						Repair completed - default, Error occurred - .bar-wrap2, Under repair - .bar-wrap3
						<li class="detail-info detail-info3">
							<strong><i class="xi-battery-70"></i><span>Condition</span></strong>
							<span>
								<span class="bar-wrap bar-wrap1">
									<span class="bar-fill"></span>
								</span>
								Normal
							</span>
						</li>
						<li class="detail-info detail-info3">
							<strong><i class="xi-flash"></i><span>Installed <br>Capacity</span></strong>
							<span>9,380㎾ (40units)</span>
						</li>
						<li class="detail-info detail-info4">
							<strong><i class="xi-my-location"></i><span>Location</span></strong>
							<span>X : 5132165498132 Y : 21651322216654 </span>
						</li>
					</ul>
				</li> -->
				 <!-- mobile visible-->
				
				<li class="map-info map-info2">
					<strong class="heading5">Energy Production</strong>
					<div class="energy-percent-wrap">
						<i class="xi-battery-70"></i>
						<div class="energy-txt">
							<span>Current</span>
							<div class="energy-txt-percent">
								<strong><i>3.6</i><span>GW</span></strong>
							</div>
						</div>
						<div class="energy-txt">
							<span>Annual</span>
							<div class="energy-txt-percent">
								<strong><i>1,150</i><span>GW</span></strong>
								<div class="percent">
									<strong>+9.06%
										<i class="xi-long-arrow-down"></i>
										<!--올랐을때-->
										<!-- <i class="xi-long-arrow-up"></i> -->
									</strong>
									<span class="info">(YoY)</span>
								</div>
							</div>
						</div>
					</div>
				</li>
				<li class="map-info map-info4">
					<strong class="heading5">Weather</strong>
					<ul class="weather-lst">
						<!--default - 날씨좋음, 매우흐림 .weather-now.weather2, 흐림 .weather-now.weather3, 비 .weather-now.weather4, 소나기 .weather-now.weather5, 진눈깨비 .weather-now.weather6, 눈 .weather-now.weather7 -->
						<li class="weather-now">
							<div class="num">
								<span class="temperature">
									31 <em>℃</em>
								</span>
								<span class="temperature-detail">
									<em class="point1">16℃</em> / <em class="point2"> 33℃</em>
								</span>
							</div>
						</li>
						<li class="wind">
							<div class="num">
								<span class="wind-num">
									3 <em>km/h</em>
								</span>
							</div>
						</li>
					</ul>
				</li>
				<li class="map-info map-info5">
					<strong class="heading5">Alarm list</strong>
					<div class="base_grid_table">
						<table>
							<caption>Alarm list - No, Date, Position, Alarm code, Description</caption>
							<thead>
								<tr>
									<th scope="col">NO.</th>
									<th scope="col">Date</th>
									<th scope="col">Position</th>
									<th scope="col">Alarm code</th>
									<th scope="col">Description</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>5</td>
									<td>2019.10.02  12:12:12 </td>
									<td>Hangwon > Group1 > V47</td>
									<td><strong class="point-num">40</strong>Turbine OK</td>
									<td>If the error the turbine has stopped with has reset before the turbine has delivered the alarm call to the QSL server....</td>
								</tr>
								<tr>
									<td>4</td>
									<td>2019.10.02  12:12:12 </td>
									<td>Hangwon > Group1 > V47</td>
									<td><strong class="point-num">40</strong>Turbine OK</td>
									<td>If the error the turbine has stopped with has reset before the turbine has delivered the alarm call to the QSL server....</td>
								</tr>
								<tr>
									<td>3</td>
									<td>2019.10.02  12:12:12 </td>
									<td>Hangwon > Group1 > V47</td>
									<td><strong class="point-num">40</strong>Turbine OK</td>
									<td>If the error the turbine has stopped with has reset before the turbine has delivered the alarm call to the QSL server....</td>
								</tr>
								<tr>
									<td>2</td>
									<td>2019.10.02  12:12:12 </td>
									<td>Hangwon > Group1 > V47</td>
									<td><strong class="point-num">40</strong>Turbine OK</td>
									<td>If the error the turbine has stopped with has reset before the turbine has delivered the alarm call to the QSL server....</td>
								</tr>
								<tr>
									<td>1</td>
									<td>2019.10.02  12:12:12 </td>
									<td>Hangwon > Group1 > V47</td>
									<td><strong class="point-num">40</strong>Turbine OK</td>
									<td>If the error the turbine has stopped with has reset before the turbine has delivered the alarm call to the QSL server....</td>
								</tr>
							</tbody>
						</table>
					</div>
				</li>
				<!-- //mobile visible-->
			</ul>
		</div>
		 <!-- cms dashboard btn -->
		<a href="#none" class="cms-dashboard-btn">
			<span class="sr-only">View Dashboard</span>
			<i class="xi-ellipsis-v"></i>
		</a>
		 <!-- //cms dashboard btn-->
	</div>
	
	<!--map에만 들어가는 js-->
	<script src="https://code.highcharts.com/stock/highstock.js"></script>
	<script src="https://code.highcharts.com/stock/modules/data.js"></script>
	<script src="https://code.highcharts.com/stock/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/stock/modules/export-data.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			$('html').addClass('map-wrap');
		});
	</script>
	<!--//map에만 들어가는 js-->
<jsp:include page="include/sub_footer.jsp"></jsp:include>