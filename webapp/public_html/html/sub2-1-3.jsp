<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
	<!-- 계획없음 -->
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
				<li class="step step2 active">
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

		<div class="none-paln txt-center">
			<strong>The plan information is not registered.</strong>
			<span>When registering work history without plan <br>Please enter the result immediately.</span>
			<a href="" class="btn-style btn-style1">Plan registration</a>
			<a href="" class="btn-style btn-style1 disable-btn"> 버튼 비활성화시 .disable-btn</a>
			<div class="apply-btn-wrap">
				<div class="checkbox-radio-custom">
					<input type="checkbox" class="checkbox" id="noPlan">
					<label for="noPlan">No plan</label>
				</div>
				<a href="" class="btn-style btn-style4">Apply</a>
			</div>
		</div>

		<div class="btns">
			<a href="" class="btn-style btn-style-m btn-style2 float-left">Back</a>
			<a href="" class="btn-style btn-style-m btn-style1 float-right">Next</a>
		</div>
	</div>
	<!-- //계획없음 -->
<jsp:include page="include/footer.jsp"></jsp:include>