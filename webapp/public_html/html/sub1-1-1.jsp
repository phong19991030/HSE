<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
<script type="text/javascript" src="${ctxPath}/script/common/comboboxInHeader.js"></script>

	<div class="cms-map-wrap">
		<!-- mobile visible -->
		<ul class="error-alarm-lst">
			<li class="error">
				<span>
					<strong>9999</strong>Sensor Error
				</span>
			</li>
			<li class="alarm">
				<span>
					<strong>999</strong>SCADA Alarm
				</span>
			</li>
		</ul>
		<!-- //mobile visible -->
		<!--지도표시 영역-->
		<div id="map"></div>
		<!--//지도표시 영역-->

		<!--level2은 .popup-bubble에 이중 class로 .popup-bubble2이 붙습니다.level3은 .popup-bubble에 이중 class로 .popup-bubble3이 붙습니다.-->
		<!--default infowindow-->
		<!-- *참고사항 - cms - map - popup 기본일 경우 -->
		<div id="infowindow-pop" class="popup-farm">
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
		</div>
		<!-- //*참고사항 - cms - map - popup 기본일 경우 -->
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

			// *참고사항 클릭시 마커 정보 나오는 효과 
			$('#infowindow-pop').click(function(){
				$(this).toggleClass('popup-farm-detail-active'); 
		  	});
			//*참고사항 클릭시 마커 정보 나오는 효과 
		</script>
		<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCh3K14xNRxPzr5lD0Y02yHfIpgJnO0SYI&callback=initMap"></script>

		<div class="map-info-wrap">
			<ul>
				<li class="map-info map-info1">
					<strong class="heading5">Overview</strong>
					<ul class="all-development-info-lst">
						<li>
							<span class="num">
								<strong>5.3</strong>GW
							</span>
							<span class="info">Installed Capacity</span>
						</li>
						<li>
							<span class="num">
								<strong>93.7</strong>%
							</span>
							<span class="info">Availability</span>
						</li>
						<li>
							<span class="num">
								<strong>36.5</strong>%
							</span>
							<span class="info">Capacity Factor</span>
						</li>
					</ul>
				</li>
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
				<li class="map-info map-info3">
					<strong class="heading5">Operation Condition</strong>
					<div class="circle-graph-wrap">
						<div class="circle-graph-container">
							<div class="chart chart1" data-percent="86">
								<span class="percent"></span>
								<strong class="state">Normal</strong>
							</div>
						</div>
						<script>
							document.addEventListener('DOMContentLoaded', function() {
								var chart = window.chart = new EasyPieChart(document.querySelector('.chart1'), {
									easing: 'easeOutElastic',
									delay: 3000,
									barColor: '#4b70fd',
									trackColor: '#f0f0f7',
									scaleColor: false,
									lineWidth: 10,
									trackWidth: 10,
									lineCap: 'butt',
									onStep: function(from, to, percent) {
										this.el.children[0].innerHTML = Math.round(percent);
									}
								});
							});
						</script>
						<div class="circle-graph-container">
							<div class="chart chart2" data-percent="7">
								<span class="percent"></span>
								<strong class="state">Sensor<br>Error</strong>
							</div>
						</div>
						<script>
							document.addEventListener('DOMContentLoaded', function() {
								var chart = window.chart = new EasyPieChart(document.querySelector('.chart2'), {
									easing: 'easeOutElastic',
									delay: 3000,
									barColor: '#ee5543',
									trackColor: '#f0f0f7',
									scaleColor: false,
									lineWidth: 10,
									trackWidth: 10,
									lineCap: 'butt',
									onStep: function(from, to, percent) {
										this.el.children[0].innerHTML = Math.round(percent);
									}
								});
							});
						</script>
						<div class="circle-graph-container">
							<div class="chart chart3" data-percent="3">
								<span class="percent"></span>
								<strong class="state">SCADA <br>Alarm</strong>
							</div>
						</div>
						<script>
							document.addEventListener('DOMContentLoaded', function() {
								var chart = window.chart = new EasyPieChart(document.querySelector('.chart3'), {
									easing: 'easeOutElastic',
									delay: 3000,
									barColor: '#8e8e8e',
									trackColor: '#f0f0f7',
									scaleColor: false,
									lineWidth: 10,
									trackWidth: 10,
									lineCap: 'butt',
									onStep: function(from, to, percent) {
										this.el.children[0].innerHTML = Math.round(percent);
									}
								});
							});
						</script>
					</div>
				</li>
				<!-- <li class="map-info map-info4">
	                <strong class="heading5">Weather</strong>
	                <ul class="weather-lst">
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
	              </li> -->
			</ul>
		</div>
	</div>
		
	<!-- mobile visible-->
	<div class="cms-map-info-wrap">
		<a href="#none" class="view-all-info">View all information</a>
		<div class="cms-map-info-wrap-scroll">
			<ul class="cms-map-info-wrap-lst">
				<li class="map-info map-info1">
					<strong class="heading5">Overview</strong>
					<ul class="all-development-info-lst">
						<li>
							<span class="info">Installed Capacity</span>
							<span class="num">
								<strong>5.3</strong>GW
							</span>
						</li>
						<li>
							<span class="info">Availability</span>
							<span class="num">
								<strong>93.7</strong>%
							</span>
						</li>
						<li>
							<span class="info">Capacity Factor</span>
							<span class="num">
								<strong>36.5</strong>%
							</span>
						</li>
					</ul>
				</li>
				<li class="map-info map-info2">
					<strong class="heading5">Energy Production</strong>
					<div class="energy-percent-wrap">
						<i class="xi-battery-70"></i>
						<div class="energy-txt">
							<span>Current</span>
							<div class="energy-txt-percent">
								<strong>3.6<span>GW</span></strong>
							</div>
						</div>
						<div class="energy-txt">
							<span>Annual</span>
							<div class="energy-txt-percent">
								<strong>1,150<span>GW</span></strong>
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
				<li class="map-info map-info3">
					<strong class="heading5">Operation Condition</strong>
					<div class="line-graph-wrap">
						<div class="line-graph-container">
							<div class="line-chart line-chart1">
								<div class="graph-wrap">
									<span class="graph-bar" data-value="85"></span>
								</div>
								<span class="percent-state">
									<strong class="state">Normal</strong>
									<span class="percent"></span>
								</span>
							</div>
							<div class="line-chart line-chart2">
								<div class="graph-wrap">
									<span class="graph-bar" data-value="7"></span>
								</div>
								<span class="percent-state">
									<strong class="state">Sensor <br>Error</strong>
									<span class="percent"></span>
								</span>
							</div>
							<div class="line-chart line-chart3">
								<div class="graph-wrap">
									<span class="graph-bar" data-value="3"></span>
								</div>
								<span class="percent-state">
									<strong class="state">SCADA <br>Alarm</strong>
									<span class="percent"></span>
								</span>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<!-- //mobile visible-->
	</div>
	<!--cms에만 들어가는 js-->
	<script type="text/javascript">
		$(document).ready(function() {
			$('body').removeClass('gnb-active');
			$('body').addClass('gnb-none');
			$('html').addClass('cms-wrapper');
		});
	</script>
	<!--//cms에만 들어가는 js-->

<jsp:include page="include/footer.jsp"></jsp:include>