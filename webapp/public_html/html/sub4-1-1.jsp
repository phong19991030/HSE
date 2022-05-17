<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
	<!-- 발전예측 -->
	<div class="container prediction-form">
		<div class="tit-wrap">
			<h2 class="heading3">
			<span class="txt">Prediction</span>
			<span class="version">Active power</span>
			</h2>
			<ul class="location">
				<li>Prediction</li>
				<li>HANGWON</li>
				<li>Group01</li>
				<li class="bold">HanKyoung 8</li>
			</ul>
		</div>
		<div class="search-form-wrap search-form-wrap2">
			<div class="calendar-picker">
				<div class="calendar-wrap">
					<!-- Data Picker --> 
					<div class="input-group">
						<label for="searchText" class="sr-only"></label>
						<input type="text" class="datepicker hasDatepicker" name="searchText" value="" style="width:200px;" maxlength="50" placeholder="yyyy-mm-dd">
						<span class="calendar-picker-btn">
							<i class="xi-calendar"></i>
						</span>
					</div>
					<!-- /Data Picker --> 
					<em class="hyphen">
						<span class="sr-only">-</span>
					</em>
					<!-- Data Picker --> 
					<div class="input-group">
						<label for="searchText" class="sr-only"></label>
						<input type="text" class="datepicker hasDatepicker" name="searchText" value="" style="width:200px;" maxlength="50" placeholder="yyyy-mm-dd">
						<span class="calendar-picker-btn">
							<i class="xi-calendar"></i>
						</span>
					</div>
					<!-- /Data Picker --> 
				</div>
				<span class="cal-btn-right">
					<a href="javascript:void(0);" class="refresh-btn2">
						<i class="xi-refresh">
							<span class="sr-only">refresh 버튼</span>
						</i>
					</a>
				  	<button id="search-btn" class="search-btn">search</button>
				</span>
			</div>
		</div>
		
		<div class="predict-tab">
		    <input id="tab-forecast" type="radio" name="tab_item" checked>
		    <label class="tab_item" for="tab-forecast">Forecast</label>
		    <input id="tab-analyze" type="radio" name="tab_item">
		    <label class="tab_item" for="tab-analyze">Analyze</label>
   			
   			<!-- tab-content1 -->
   			<div class="tab-content" id="forecast-content">
				<!-- graph -->	
				<div class="prediction-graph">
					<div class="tit-wrap">
						<strong class="heading6">Power forecast for the next 24 hrs</strong>
					</div>
					<div class="graph-wrap" style="width: 100%; height: 380px; background: #f4f4f4;">
						<mark>graph area</mark>
						<div class="prediction-legend-wrap">
							<span class="legend-item1">Occurrence</span>
							<span class="legend-item2">Counter plan</span>
						</div>
					</div>
				</div>	
				<!-- //graph -->
			
				<div class="base_grid_table">

					<table>
						<caption>Power forecast for the next 24 hrs</caption>
						<colgroup>
							<col style="width:50%">
							<col style="width:50%">
						</colgroup>
						<thead>
							<tr>
								<th scope="col">Date</th>
								<th scope="col">Active power (KW)</th>
							</tr>
						</thead>
					</table>
					
					<div class="scroll-tbody">
						<table>
						<colgroup>
							<col style="width:50%">
							<col style="width:50%">
						</colgroup>
						<tbody>
							<tr>
								<td>2021.01.01 15:00:30</td>
								<td>33720.8</td>
							</tr>
							<tr>
								<td>2021.01.01 15:00:30</td>
								<td>33720.8</td>
							</tr>
							<tr>
								<td>2021.01.01 15:00:30</td>
								<td>33720.8</td>
							</tr>
							<tr>
								<td>2021.01.01 15:00:30</td>
								<td>33720.8</td>
							</tr>
							<tr>
								<td>2021.01.01 15:00:30</td>
								<td>33720.8</td>
							</tr>
							<tr>
								<td>2021.01.01 15:00:30</td>
								<td>33720.8</td>
							</tr>
						</tbody>
						</table>
					</div>
				</div>
			</div>
  			<!-- //tab-content1 -->
  			
   			<!-- tab-content2 -->
			<div class="tab-content" id="analyze-content">
				<!-- graph -->
				<div class="prediction-graph">
					<div class="tit-wrap">
						<strong class="heading6">Power forecast deviation from actual</strong>
					</div>
					<div class="graph-wrap" style="width: 100%; height: 380px; background: #f4f4f4;">
						<mark>graph area</mark>
						<div class="prediction-legend-wrap">
							<span class="legend-item3">Deviation (0 - 50)</span>
							<span class="legend-item4">Deviation (0 - -75)</span>
						</div>
					</div>
				</div>	
				<!-- //graph -->
			</div>
  			<!-- //tab-content2 -->
		</div>
	</div>
	<!--//발전예측-->

<jsp:include page="include/footer.jsp"></jsp:include>