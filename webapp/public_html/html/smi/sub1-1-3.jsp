<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
	<!-- *참고사항 - .cms-map-wrap5 -->
	<div class="cms-map-wrap cms-map-wrap5"> 
		<!-- 발전기 색상별 info -->
		<div class="electrical-machine-info">
			<ul>
				<li class="case1">Normal</li>
				<li class="case3">Service mode</li>
				<li class="case4">Failure</li>
				<li class="case2">Warning</li>
			</ul>
		</div>
		<!-- //발전기 색상별 info -->
	
		
		<!--지도표시 영역-->
		<div id="map"></div>
		<!--//지도표시 영역-->

		<!--level2은 .popup-bubble에 이중 class로 .popup-bubble2이 붙습니다.level3은 .popup-bubble에 이중 class로 .popup-bubble3이 붙습니다.-->
		<!--default infowindow-->
		<!--풍력기 갯수가 10개 미만시 #infowindow-pop에 .popup-bubble2-->
		<!--풍력기 갯수가 5개 미만시 #infowindow-pop에 .popup-bubble3-->
		<!--click시 active-->
		<!-- case case1 : .popup-turbine1 -->
		<!-- case case2 : .popup-turbine2 -->
		<!-- case case3 : .popup-turbine3 -->
		<!-- case case4 : .popup-turbine4 -->
		<div id="infowindow-pop" class="popup-turbine popup-turbine1">
			<div>
				<div class="wt-infowindow">
					<em class="name">V47</em>
					<em class="tit">Energy production</em>
					<ul class="state-lst">
						<li>
							<strong>3.6</strong>
							<span>GW</span>
						</li>
					</ul>
				</div>
				<div class="wt-icon-wrap">
					<span></span>
				</div>
			</div>
		</div>
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
		</script>
		<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCh3K14xNRxPzr5lD0Y02yHfIpgJnO0SYI&callback=initMap"></script>

		<div class="map-info-wrap">
			<ul>
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
										<td>Hangwon &gt; Group1 &gt; V47</td>
										<td><strong class="point-num">40</strong>Turbine OK</td>
										<td>If the error the turbine has stopped with has reset before the turbine has delivered the alarm call to the QSL server....</td>
									</tr>
									<tr>
										<td>4</td>
										<td>2019.10.02  12:12:12 </td>
										<td>Hangwon &gt; Group1 &gt; V47</td>
										<td><strong class="point-num">40</strong>Turbine OK</td>
										<td>If the error the turbine has stopped with has reset before the turbine has delivered the alarm call to the QSL server....</td>
									</tr>
									<tr>
										<td>3</td>
										<td>2019.10.02  12:12:12 </td>
										<td>Hangwon &gt; Group1 &gt; V47</td>
										<td><strong class="point-num">40</strong>Turbine OK</td>
										<td>If the error the turbine has stopped with has reset before the turbine has delivered the alarm call to the QSL server....</td>
									</tr>
									<tr>
										<td>2</td>
										<td>2019.10.02  12:12:12 </td>
										<td>Hangwon &gt; Group1 &gt; V47</td>
										<td><strong class="point-num">40</strong>Turbine OK</td>
										<td>If the error the turbine has stopped with has reset before the turbine has delivered the alarm call to the QSL server....</td>
									</tr>
									<tr>
										<td>1</td>
										<td>2019.10.02  12:12:12 </td>
										<td>Hangwon &gt; Group1 &gt; V47</td>
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
	<!-- mobile visible-->
	<div class="cms-map-info-wrap">
		<a href="#none" class="view-all-info">View all information</a>
		<div class="cms-map-info-wrap-scroll">
			<ul class="cms-map-info-wrap-lst">
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
			</ul>
		</div>
	<!-- //mobile visible-->
	</div>
	<!--map에만 들어가는 js-->
	<script type="text/javascript">
		$(document).ready(function() {
			$('html').addClass('map-wrap');
		});
	</script>
	<!--//map에만 들어가는 js-->
	
<jsp:include page="include/sub_footer.jsp"></jsp:include>