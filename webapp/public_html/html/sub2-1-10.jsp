<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>

	<!-- 결과리스트 -->
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

		<div class="base_grid_table">
			<table>
				<caption>result list - NO, Type, Report number, Report name, Writer, Date, Report Download</caption>
				<thead>
					<tr>
						<th scope="col">NO.</th>
						<th scope="col">Type</th>
						<th scope="col">Report number</th>
						<th scope="col">Report name</th>
						<th scope="col">Writer</th>
						<th scope="col">Date</th>
						<th scope="col">Report Download</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>10</td>
						<td>Inspection report</td>
						<td>Report20190821_01</td>
						<td>행원풍력발전단지 유지보수 용역 Maintenance for Hangwon Wind Farm</td>
						<td>홍길동 Hong GilDong</td>
						<td>2019.08.23 12:12:12</td>
						<td>
							<a href="" class="download-btn">
								<i class="xi-download"></i>
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="apply-btn-wrap">
			<div class="select-box input-group">
				<label for="tag"></label>
				<select name="tag" id="tag" class="info-select">
					<option value="1">WTG Inspection-</option>
					<option value="2"></option>
					<option value="3"></option>
				</select>
			</div>
			<button type="button" class="btn-style btn-style4">Check</button>
			<a href="" class="btn-style btn-style1">Register</a>
		</div>



		<div class="btns">
			<a href="" class="btn-style btn-style-m btn-style2 float-left">Back</a>
			<a href="" class="btn-style btn-style-m btn-style1 float-right">Next</a>
		</div>
	</div>
	<!-- //결과리스트 -->
<jsp:include page="include/footer.jsp"></jsp:include>