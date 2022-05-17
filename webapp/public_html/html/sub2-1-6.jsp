<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>

	<!-- 계획리스트 -->
	<div class="container onm-wrap2">
		<div class="tit-wrap">
			<h2 class="heading3">
				<span class="txt">Schedules</span>
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
				<li class="step step3">
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

		<div class="schedule-wrap">
			<ul class="schedule-info">
				<li>
					<strong>Today 2019.08.02 Friday</strong>
				</li>
				<li>
					<strong>WTG Name : </strong>
					<ul>
						<li>Hangwon 8  V47</li>
					</ul>
				</li>
				<li>
					<strong>Estimated Down time :</strong>
					<ul>
						<li>2019.08.08(Thu) 00:00 ~ 2019.08.12(Mon) 12:00</li>
					</ul>
					<em>912h</em>
				</li>
				<li>
					<strong>Cost :</strong>
					<ul>
						<li>Stationary Capacity 0.4MW  <strong>34,000,000</strong></li>
						<li>Parts purchase  <strong>1,000,000</strong></li>
						<li>Work input  <strong>30,000,000</strong></li>
					</ul>
					<em>65,000,000</em>
				</li>
			</ul>
			
			
			<div class="mark-info-lst txt-right">
				<span class="mark mark1">Parts in stock</span>
				<span class="mark mark2">Parts out of stock</span>
			</div>
		
			<div class="base_grid_table btn-table">
			스케줄표는 풀캘린더나 플러그인 넣어주세요
			</div>
		</div>
		
		<div class="btns txt-right">
			<a href="" class="btn-style btn-style3">
				<i class="xi-trash"></i>
				<span class="sr-only">Edit</span>
			</a>
			<a href="" class="btn-style btn-style4">PDF Download</a>
		</div>

		<div class="btns">
			<a href="" class="btn-style btn-style-m btn-style2 float-left">Back</a>
			<a href="" class="btn-style btn-style-m btn-style1 float-right">Next</a>
		</div>

	</div>
	<!-- //계획리스트 -->
<jsp:include page="include/footer.jsp"></jsp:include>