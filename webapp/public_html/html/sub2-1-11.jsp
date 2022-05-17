<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
<!-- 블레이드 점검보고서 작성 -->
<div class="container onm-wrap2">
	<div class="tit-wrap">
		<h2 class="heading3">
			<span class="txt">Blade Inspection</span>
			<span class="version">V47</span>
		</h2>
		<ul class="location">
			<li>O&amp;M</li>
			<li>Blade Inspection</li>
			<li>HANGWON</li>
			<li>Group01</li>
			<li class="bold">V47</li>
		</ul>
	</div>

	<div class="tab-wrap">
		<ul class="tab1">
			<li class="step step1 ov">
				<a href="#">
					<strong>1</strong>
					<span>Event &amp; Suggestion</span>
				</a>
			</li>
			<li class="step step2 ov">
				<a href="#">
					<strong>2</strong>
					<span>Plan</span>
				</a>
			</li>
			<li class="step step3 ov">
				<a href="#">
					<strong>3</strong>
					<span>Result</span>
				</a>
			</li>
			<li class="step step4 check-btn">
				<a href="#">
					<strong>
						<span class="sr-only">completed</span>
						<i class="xi-check-circle-o"></i>
					</strong>
				</a>
			</li>
		</ul>
	</div>

	<div class="system-detail-wrap">
		<div class="system-left">
			<h3 class="heading4">Overview</h3>
			<div class="registration-form-lst-wrap registration-form-lst-wrap-full">
				<ul class="registration-form-lst">
					<li>
						<span class="essential">Type</span>
						<div class="registration-write">
							<div class="input-group-wrapper">
								<div class="select-box">
									<label for="Type">-</label>
									<select name="Type" id="Type" class="info-select">
										<option value="1">-</option>
										<option value="2"></option>
										<option value="3"></option>
									</select>
								</div>
							</div>
						</div>
					</li>
					<li>
						<span class="essential">Report number</span>
						<div class="registration-write">
							<ul class="registration-result">
								<li>Report 20190821_01</li>
							</ul>
						</div>
					</li>
					<li>
						<span class="essential">Report name</span>
						<div class="registration-write">
							<ul class="registration-result">
								<li>행원풍력발전단지 유지보수 용역</li>
								<li>Maintenance for Hangwon Wind Farm</li>
							</ul>
						</div>
					</li>
					<li>
						<span class="essential">WTG name</span>
						<div class="registration-write">
							<ul class="registration-result">
								<li>행원8호기 V47</li>
								<li>WTG 8</li>
							</ul>
						</div>
					</li>
					<li>
						<span class="essential">Operator</span>
						<div class="registration-write">
							<ul class="registration-result">
								<li>제주에너지공사</li>
								<li>Jeju Energy Corporation</li>
							</ul>
						</div>
					</li>
					<li>
						<span class="essential">Workers</span>
						<div class="registration-write">
							<div class="input-group-wrapper">
								<div class="input-group">
									<label for="Workers" class="sr-only">Report name</label>
									<input type="text" name="Workers" id="Workers" placeholder="">
								</div>
							</div>
						</div>
					</li>
					<li>
						<span class="essential">Writer</span>
						<div class="registration-write twice-input">
							<div class="input-group-wrapper">
								<div class="input-group">
									<label for="writerKor" class="sr-only">Writer</label>
									<input type="text" name="writerKor" id="writerKor" placeholder="ex:홍길동">
								</div>
							</div>
							<div class="input-group-wrapper">
								<div class="input-group">
									<label for="writerEng" class="sr-only">Writer</label>
									<input type="text" name="writerEng" id="writerEng" placeholder="ex:Homg GilDong">
								</div>
							</div>
						</div>
					</li>
				</ul>

			</div>

			<h3 class="heading4">Specification</h3>
			<strong class="heading8">WTG Specifications
				<span class="active-toggle-wrap">
					<input type="checkbox" id="activeToggle1" name="" value="" class="sr-only">
					<label for="activeToggle1"><span class="sr-only">Activation</span></label>
				</span>
			</strong>
			<div class="base_grid_table">
				<table>
					<caption>WTG Specifications - Maintenance code, Rotor diameter, Tower height, Blade type, Blade length, Blade color, Blade color</caption>
					<colgroup>
						<col style="width:20%">
						<col style="width:23%">
						<col style="width:20%">
						<col style="width:28%">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">Maintenance code</th>
							<td class="txt-left" colspan="3">
								<div class="registration-write">
									<div class="input-group">
										<label for="maintenance" class="sr-only">Maintenance code</label>
										<input type="text" name="maintenance" id="maintenance" placeholder="">
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">Rotor diameter</th>
							<td class="txt-left" colspan="3">
								<div class="registration-write">
									<div class="input-group">
										<label for="rotorDiameter" class="sr-only">Rotor diameter</label>
										<input type="text" name="rotorDiameter" id="rotorDiameter" placeholder="">
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">Tower height</th>
							<td class="txt-left" colspan="3">
								<div class="registration-write">
									<div class="input-group">
										<label for="towerHeight" class="sr-only">Tower height</label>
										<input type="text" name="towerHeight" id="towerHeight" placeholder="">
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">Blade type</th>
							<td class="txt-left" colspan="3">
								<div class="registration-write">
									<div class="input-group">
										<label for="bladeYype" class="sr-only">Blade type</label>
										<input type="text" name="bladeYype" id="bladeYype" placeholder="">
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">Blade length</th>
							<td class="txt-left" colspan="3">
								<div class="registration-write">
									<div class="input-group">
										<label for="bladeLength" class="sr-only">Blade length</label>
										<input type="text" name="bladeLength" id="bladeLength" placeholder="">
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">Blade color</th>
							<td class="txt-left" colspan="3">
								<div class="registration-write">
									<div class="input-group">
										<label for="bladeColor" class="sr-only">Blade color</label>
										<input type="text" name="bladeColor" id="bladeColor" placeholder="">
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row" rowspan="3">Blade Serial Number</th>
							<td class="txt-left" rowspan="3">
								<div class="select-box input-group">
									<label for="bladeColor">-</label>
									<select name="Replacement" id="bladeColor" class="info-select">
										<option value="1">-</option>
										<option value="2"></option>
										<option value="3"></option>
									</select>
								</div>
							</td>
							<th scope="row">Blade #1</th>
							<td class="txt-left">
								<div class="input-group">
									<label for="blade1" class="sr-only">Blade #1</label>
									<input type="text" name="blade1" id="blade1" placeholder="">
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">Blade #2</th>
							<td class="txt-left">
								<div class="input-group">
									<label for="blade2" class="sr-only">Blade #2</label>
									<input type="text" name="blade2" id="blade2" placeholder="">
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">Blade #3</th>
							<td class="txt-left">
								<div class="input-group">
									<label for="blade3" class="sr-only">Blade #3</label>
									<input type="text" name="blade3" id="blade3" placeholder="">
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<strong class="heading8">Drone &amp; Camera specifications
				<span class="active-toggle-wrap">
					<input type="checkbox" id="activeToggle2" name="" value="" class="sr-only">
					<label for="activeToggle2"><span class="sr-only">Drone &amp; Camera specifications</span></label>
				</span>
			</strong>
			<div class="base_grid_table">
				<table>
					<caption>Drone &amp; Camera specifications - Type, Flight time, Flight range, maximum flight altitude, maximum flight wind speed, maximum flight speed, Camera model, Lens model</caption>
					<colgroup>
						<col style="width:20%">
						<col style="width:80%">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">Type</th>
							<td class="txt-left">
								<div class="registration-write">
									<div class="input-group">
										<label for="type" class="sr-only">type</label>
										<input type="text" name="type" id="type" placeholder="">
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">Flight time</th>
							<td class="txt-left">
								<div class="registration-write">
									<div class="input-group">
										<label for="flightTime" class="sr-only">Flight time</label>
										<input type="text" name="flightTime" id="flightTime" placeholder="">
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">Flight range</th>
							<td class="txt-left">
								<div class="registration-write">
									<div class="input-group">
										<label for="flightRange" class="sr-only">Flight range</label>
										<input type="text" name="flightRange" id="flightRange" placeholder="">
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">maximum flight altitude</th>
							<td class="txt-left">
								<div class="registration-write">
									<div class="input-group">
										<label for="maximumFlightAltitude" class="sr-only">maximum flight altitude</label>
										<input type="text" name="maximumFlightAltitude" id="maximumFlightAltitude" placeholder="">
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">maximum flight wind speed</th>
							<td class="txt-left">
								<div class="registration-write">
									<div class="input-group">
										<label for="maximumFlightWindSpeed" class="sr-only">maximum flight wind speed</label>
										<input type="text" name="maximumFlightWindSpeed" id="maximumFlightWindSpeed" placeholder="">
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">maximum flight speed</th>
							<td class="txt-left">
								<div class="registration-write">
									<div class="input-group">
										<label for="maximumFlightSpeed" class="sr-only">maximum flight speed</label>
										<input type="text" name="maximumFlightSpeed" id="maximumFlightSpeed" placeholder="">
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">Camera model</th>
							<td class="txt-left">
								<div class="registration-write">
									<div class="input-group">
										<label for="cameraModel" class="sr-only">Camera model</label>
										<input type="text" name="cameraModel" id="cameraModel" placeholder="">
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">Lens model</th>
							<td class="txt-left">
								<div class="registration-write">
									<div class="input-group">
										<label for="lensModel" class="sr-only">Lens model</label>
										<input type="text" name="lensModel" id="lensModel" placeholder="">
									</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h3 class="heading4">Working time &amp; Weather</h3>
			<div class="base_grid_table">
				<table>
					<caption>>Working time &amp; Weather - Down time</caption>
					<colgroup>
						<col style="width:20%">
						<col style="width:80%">
					</colgroup>

					<tbody>
						<tr>
							<th scope="row">
								<span class="essential">Down time</span>
							</th>
							<td class="txt-left">
								<div class="registration-write">
									<div class="calendar-picker">
										<div class="calendar-wrap">
											<div class="input-group">
												<label for="workingtime1" class="sr-only"></label>
												<input type="text" id="workingtime1" name="workingtime1" value="">
												<button class="calendar-picker-btn">
													<i class="xi-calendar"></i>
												</button>
											</div>
											<em class="hyphen">
												<span class="sr-only">-</span>
											</em>
											<div class="input-group">
												<label for="workingtime2" class="sr-only"></label>
												<input type="text" id="workingtime2" name="workingtime2" value="">
												<button class="calendar-picker-btn">
													<i class="xi-calendar"></i>
												</button>
											</div>
										</div>
									</div>
									<span class="total-hour point2">912h</span>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">Flight time</th>
							<td class="txt-left">
								<div class="registration-write">
									<div class="calendar-picker">
										<div class="calendar-wrap">
											<div class="input-group">
												<label for="workingtime1" class="sr-only"></label>
												<input type="text" id="workingtime1" name="workingtime1" value="">
												<button class="calendar-picker-btn">
													<i class="xi-calendar"></i>
												</button>
											</div>
											<em class="hyphen">
												<span class="sr-only">-</span>
											</em>
											<div class="input-group">
												<label for="workingtime2" class="sr-only"></label>
												<input type="text" id="workingtime2" name="workingtime2" value="">
												<button class="calendar-picker-btn">
													<i class="xi-calendar"></i>
												</button>
											</div>
										</div>
									</div>
									<span class="total-hour">912h</span>
								</div>

								<div class="base_grid_table">
									<table>
										<caption>>Flight time - No, Working Data, Weather, Temperature, Wind speed, Humidity</caption>
										<colgroup>
											<col style="width:10%">
											<col style="width:30%">
											<col style="width:15%">
											<col style="width:15%">
											<col style="width:15%">
											<col style="width:15%">
										</colgroup>
										<thead>
											<tr>
												<th scope="col">No</th>
												<th scope="col">Working Data</th>
												<th scope="col">Weather</th>
												<th scope="col">Temperature</th>
												<th scope="col">Wind speed</th>
												<th scope="col">Humidity</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>2</td>
												<td>2019.09.01 09:00 ~ 2019.09.01 15:00</td>
												<td>Sunny</td>
												<td>15~18</td>
												<td>2~5</td>
												<td>60</td>
											</tr>
											<tr>
												<td>1</td>
												<td>2019.09.01 09:00 ~ 2019.09.01 15:00</td>
												<td>Sunny</td>
												<td>15~18</td>
												<td>2~5</td>
												<td>60</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div class="more-btn-wrap">
									<a href="" class="more">
										<span class="sr-only">more details</span>
										<i class="xi-plus-circle"></i>
									</a>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">Remark</th>
							<td class="txt-left">
								<div class="registration-write">
									<div class="input-group">
										<label for="workingRemark" class="sr-only">Remark</label>
										<input type="text" name="workingRemark" id="workingRemark" placeholder="">
									</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h3 class="heading4">Operating</h3>
			<div class="search-form-wrap search-form-wrap2">
				<div class="input-group-wrapper">
					<div class="select-box">
						<label for="Type">-</label>
						<select name="Type" id="Type" class="info-select">
							<option value="1">-</option>
							<option value="2"></option>
							<option value="3"></option>
						</select>
					</div>
				</div>

				<button class="btn-style btn-style4">Blade Viewer</button>
			</div>

			<div class="base_grid_table">
				<table>
					<caption>Working time &amp; Weather - NO, Maintenance code, Damage area, Distance(m) from Root, Damage Maintenance Plan, Process, Attachment</caption>
					<colgroup>
						<col style="width:10%">
						<col style="width:13%">
						<col style="width:13%">
						<col style="width:13%">
						<col style="width:25%">
						<col style="width:13%">
						<col style="width:13%">
					</colgroup>
					<thead>
						<tr>
							<th scope="col">NO.</th>
							<th scope="col">Maintenance code</th>
							<th scope="col">Damage area</th>
							<th scope="col">Distance(m)<span class="add-txt">from Root</span></th>
							<th scope="col">Damage Maintenance Plan</th>
							<th scope="col">Process</th>
							<th scope="col">Attachment</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>10</td>
							<td>H-33</td>
							<td>TE</td>
							<td>5.0</td>
							<td>surface paint contamination Performance is not affected, but it is recommended...</td>
							<td>
								<span class="num-mark num-mark1">1</span>
							</td>
							<td>+3</td>
						</tr>
						<tr>
							<td>9</td>
							<td>H-33</td>
							<td>TE</td>
							<td>5.0</td>
							<td>surface paint contamination Performance is not affected, but it is recommended...</td>
							<td>
								<span class="num-mark num-mark2">1</span>
							</td>
							<td>+3</td>
						</tr>
						<tr>
							<td>8</td>
							<td>H-33</td>
							<td>TE</td>
							<td>5.0</td>
							<td>surface paint contamination Performance is not affected, but it is recommended...</td>
							<td>
								<span class="num-mark num-mark3">1</span>
							</td>
							<td>+3</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="apply-btn-wrap">
				<a href="" class="btn-style btn-style1">Register</a>
			</div>
		</div>
		<div class="system-right">
			<div class="btns">
				<a href="" class="btn-style btn-style1">Save</a>
				<a href="" class="btn-style btn-style2">Cancel</a>
				<a href="" class="btn-style btn-style3">Temporary</a>
				<a href="" class="btn-style btn-style5">Blade Inspection Report</a>
			</div>
		</div>
	</div>
</div>
<!-- //블레이드 점검보고서 작성 -->
<jsp:include page="include/footer.jsp"></jsp:include>