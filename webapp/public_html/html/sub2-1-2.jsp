<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
	<!-- 이벤트,제안 -->
	<div class="container onm-wrap2">
		<div class="tit-wrap">
			<h2 class="heading3">
				<span class="txt">Alarm management</span>
				<span class="version">V47</span>
			</h2>
			<ul class="location">
				<li>O&amp;M</li>
				<li>Alarm management</li>
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
				<li class="step step2 disable-tab">
					<a href="#">
						<strong>2</strong>
						<span>Plan</span>
					</a>
				</li>
				<li class="step step3 disable-tab">
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

		<h3 class="heading4">Event</h3>
		<div class="base_grid_table">
			<table>
				<caption>Event - Alarm code, Alarm text, Departure date</caption>
				<colgroup>
					<col style="width:20%">
					<col style="width:80%">
				</colgroup>
				<thead>
				<tbody>
					<tr>
						<th scope="row">Alarm code</th>
						<td class="txt-left"><strong class="th-tit display-title">Alarm code</strong>159</td>
					</tr>
					<tr>
						<th scope="row">Alarm text</th>
						<td class="txt-left"><strong class="th-tit display-title">Alarm text</strong>External RPM guard</td>
					</tr>
					<tr>
						<th scope="row">Departure date</th>
						<td class="txt-left"><strong class="th-tit display-title">Departure date</strong>The turbine has had an overspeed on the rotor. the error occurs it the turbine reach a set limit for how many rotations it may take per minut. This error is typical seen when a powerfull gust has brought the turbine in
							an overspeed situation.</td>
					</tr>
				</tbody>
			</table>
		</div>

		<h3 class="heading4">Suggestion</h3>
		<div class="base_grid_table">
			<table>
				<caption>Suggestion - Suggestion, Description of Action, Parts, Tool, PPE</caption>
				<colgroup>
					<col style="width:20%">
					<col style="width:80%">
				</colgroup>
				<thead>
				<tbody>
					<tr>
						<th scope="row">Suggestion</th>
						<td class="txt-left"><strong class="th-tit display-title">Suggestion</strong>Check the adjustment of the rotor sensor for the VOG ( Vestas Overspeed Guard )<br>Check the VOG sensor damage. / Check the Cable connection from the sensor. <br>Check CT 3153.<br>Check warning log and alarm log this
							error can occur when there is a grid fault.</td>
					</tr>
					<tr>
						<th scope="row">Description of Action</th>
						<td class="txt-left">
							<strong class="th-tit display-title">Description of Action</strong>
							<ol class="bul-list01">
								<li>External RPM guard error inspection</li>
								<li>Yaw system inspection</li>
							</ol>
						</td>
					</tr>
					<tr>
						<th scope="row">Parts</th>
						<td class="txt-left"><strong class="th-tit display-title">Parts</strong>Texaco Rando WM 32 LT : 4L</td>
					</tr>
					<tr>
						<th scope="row">Tool</th>
						<td class="txt-left">
							<strong class="th-tit display-title">Tool</strong>
							<ol class="bul-list01">
								<li>Filler gauge * 1</li>
								<li>Fliers * 1</li>
								<li>Spanner * 1</li>
								<li>Hand tool * 1</li>
							</ol>
						</td>
					</tr>
					<tr>
						<th scope="row">PPE</th>
						<td class="txt-left">
							<strong class="th-tit display-title">PPE</strong>
							<ol class="bul-list01">
								<li>Harness * 1</li>
								<li>Lanyard * 1</li>
								<li>Helmet * 1</li>
								<li>Sleeve * 1</li>
							</ol>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="apply-btn-wrap">
			<div class="checkbox-radio-custom">
				<input type="checkbox" class="checkbox" id="SCADAAlarmError">
				<label for="SCADAAlarmError">SCADA Alarm Error</label>
			</div>
			<a href="" class="btn-style btn-style4">Apply</a>
		</div>
	</div>
	<!-- //이벤트,제안 -->
<jsp:include page="include/footer.jsp"></jsp:include>