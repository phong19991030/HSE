<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>

	<div class="cms-map-wrap cms-map-wrap2 cms-map-wrap3"> 
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
		<!--풍력기 갯수가 10개 미만시 #infowindow-pop에 .popup-bubble2-->
		<!--풍력기 갯수가 5개 미만시 #infowindow-pop에 .popup-bubble3-->
		<!--click시 active-->
		<div id="infowindow-pop" class="popup-turbine">
			<div>
				<div class="wt-infowindow">
					<em class="name">Turbine 4</em>
					<span class="stick-graph">
						<em>State</em>
						<!--막대그래프 상황별로 Normal - default,  Sensor Error - .bar-wrap2, SCADA Alarm - .bar-wrap3-->
						<span class="bar-wrap bar-wrap1">
<!-- 							<span class="bar-fill" style="width:100%; display:inline-block;"></span> -->
							<span class="bar-fill" style="width:20%; display:inline-block;"></span>
							<span class="bar-fill" style="width:20%; display:inline-block;"></span>
							<span class="bar-fill" style="width:20%; display:inline-block;"></span>
						</span>
					</span>
					<ul class="state-lst">
						<li>
							<strong>11</strong>
							<span>MW</span>
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
							<strong>3.6<span>GW</span></strong>
							<span>Current</span>
						</div>
						<div class="energy-txt">
							<strong>1,150<span>GW</span></strong>
							<span>Annual</span>
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
			</ul>
		</div>
	</div>
	<div class="cms-map-info-wrap">
		 <!-- mobile visible-->
		<a href="#none" class="view-all-info">View all information</a>
		 <!-- //mobile visible-->
		<div class="cms-map-info-wrap-scroll">
			<ul class="cms-map-info-wrap-lst">
				<li class="wt-detail-info">
					<strong class="name">Group 01</strong>
					<ul>
						<li class="detail-info detail-info1">
							<strong><i class="xi-paper"></i><span>Group Name</span></strong>
							<span>Group 01</span>
						</li>
						<li class="detail-info detail-info2">
							<strong><i class="xi-user-address"></i><span>Operator</span></strong>
							<!-- <span>Hong Gil Dong</span> -->
							<span>
								<img alt="" src="/img/sub/vestas.png" style="width: 32%; display:inline-block;">
								<img alt="" src="/img/sub/vestas.png" style="width: 32%; display:inline-block;">
								<img alt="" src="/img/sub/vestas.png" style="width: 32%; display:inline-block;">
							</span>
						</li>
						<!-- Repair completed - default, Error occurred - .bar-wrap2, Under repair - .bar-wrap3-->
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
				</li>
				 <!-- mobile visible-->
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
				<!-- //mobile visible-->
				<li>
					<strong class="heading5">Availability
						<span class="chart-info-lst">
							<em>2020</em>
							<em>2019</em>
						</span>
					</strong>
					<div id="container1"></div>
				</li>
				<li>
					<strong class="heading5">Energy Production
						<span class="chart-info-lst">
							<em>2020</em>
							<em>2019</em>
						</span>
					</strong>
					<div id="container2"></div>
				</li>
			</ul>
		</div>
	</div>
	<!--cms에만 들어가는 js-->
	<script src="https://code.highcharts.com/stock/highstock.js"></script>
	<script src="https://code.highcharts.com/stock/modules/data.js"></script>
	<script src="https://code.highcharts.com/stock/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/stock/modules/export-data.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			$('body').removeClass('gnb-active');
			$('body').addClass('gnb-none');
			$('html').addClass('cms-wrapper');
		});

		//cms-map-info-wrap
		$(".cms-map-info-wrap-scroll").mCustomScrollbar({
			// horizontal scrollbar
			axis: "Y",
			//테마
			theme: "minimal-dark",
			//마우스휠 속도
			mouseWheelPixels: 300
		});

		Highcharts.setOptions({
			colors: ['#486dfb', '#89898b']
		});

		Highcharts.chart('container1', {
			chart: {
				type: 'areaspline'
			},
			title: {
				text: null
			},
			legend: {
				layout: 'vertical',
				align: 'left',
				verticalAlign: 'top',
				x: 150,
				y: 100,
				floating: true,
				borderWidth: 1,
				backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#fff'
			},
			xAxis: {
				categories: [
					'03.28',
					'03.29',
					'03.30',
					'03.31',
					'04.01',
					'04.02',
					'04.03',
					'04.04'
				],
				plotBands: [{ // visualize the weekend
					from: 4.5,
					to: 6.5,
					color: '#fff'
				}]
			},
			yAxis: {
				title: {
					text: null
				}
			},
			tooltip: {
				shared: true,
				valueSuffix: 'units'
			},
			credits: {
				enabled: false
			},
			plotOptions: {
				areaspline: {
					fillOpacity: 0.5
				}
			},
			series: [{
				name: '2020',
				data: [3, 4, 3, 5, 4, 10, 12, 9]
			}, {
				name: '2019',
				data: [1, 3, 4, 3, 3, 5, 4, 5]
			}]
		});

		Highcharts.chart('container2', {
			chart: {
				type: 'area'
			},
			xAxis: {
				allowDecimals: false,
				labels: {
					formatter: function() {
						return this.value; // clean, unformatted number for year
					}
				},
				accessibility: {
					rangeDescription: null
				}
			},
			yAxis: {
				title: {
					text: null
				},
				labels: {
					formatter: function() {
						return this.value / 1000 + 'k';
					}
				}
			},
			tooltip: {
				pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
			},
			plotOptions: {
				area: {
					pointStart: 1940,
					marker: {
						enabled: false,
						symbol: 'circle',
						radius: 0,
						states: {
							hover: {
								enabled: true
							}
						}
					}
				}
			},
			series: [{
				name: '2019',
				data: [
					null, null, null, null, null, 6, 11, 32, 110, 235,
					369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468,
					20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342,
					26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
					24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380,
					21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824,
					10577, 10527, 10475, 10421, 10358, 10295, 10104, 9914, 9620, 9326,
					5113, 5113, 4954, 4804, 4761, 4717, 4368, 4018
				]
			}, {
				name: '2020',
				data: [null, null, null, null, null, null, null, null, null, null,
					5, 25, 50, 120, 150, 200, 426, 660, 869, 1060,
					1605, 2471, 3322, 4238, 5221, 6129, 7089, 8339, 9399, 10538,
					11643, 13092, 14478, 15915, 17385, 19055, 21205, 23044, 25393, 27935,
					30062, 32049, 33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000,
					37000, 35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
					21000, 20000, 19000, 18000, 18000, 17000, 16000, 15537, 14162, 12787,
					12600, 11400, 5500, 4512, 4502, 4502, 4500, 4500
				]
			}]
		});
	</script>
	<!--//cms에만 들어가는 js-->
<jsp:include page="include/sub_footer.jsp"></jsp:include>