<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:include page="include/sub_header.jsp"></jsp:include>
	<!-- 계획리스트 -->
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

		<div class="plan-lst-wrap">
			<ul class="plan-lst">
				<li>
					<div class="plan-lst-info-wrap">
						<div class="plan-info-wrap">
							<div class="checkbox-radio-custom">
								<input type="radio" name="radio" id="radio1">
								<label for="radio1">행원풍력발전단지 유지보수 용역</label>
							</div>
							<span class="plan-info">
								<strong>Maintenance for Hangwon Wind Farm</strong>
								<em>Temp</em>
							</span>
						</div>

						<span class="plan-etc">
							<em>2020.02.21</em>
							<a href="#none" class="plan-modify">
								<span class="sr-only">paln modify</span>
								<i class="xi-pen"></i>
							</a>
						</span>
					</div>
					<a href="" class="plan-Confirm">Confirm</a>
				</li>
				<li>
					<div class="plan-lst-info-wrap">
						<div class="plan-info-wrap">
							<div class="checkbox-radio-custom">
								<input type="radio" name="radio" id="radio2">
								<label for="radio2">행원풍력발전단지 유지보수 용역</label>
							</div>
							<span class="plan-info">
								<strong>Maintenance for Hangwon Wind Farm</strong>
								<em>Temp</em>
							</span>
						</div>

						<span class="plan-etc">
							<em>2020.02.21</em>
							<a href="#none" class="plan-modify">
								<span class="sr-only">paln modify</span>
								<i class="xi-pen"></i>
							</a>
						</span>
					</div>
					<a href="" class="plan-Confirm">Confirm</a>
				</li>
				<li>
					<div class="plan-lst-info-wrap">
						<div class="plan-info-wrap">
							<div class="checkbox-radio-custom">
								<input type="radio" name="radio" id="radio3">
								<label for="radio3">행원풍력발전단지 유지보수 용역</label>
							</div>
							<span class="plan-info">
								<strong>Maintenance for Hangwon Wind Farm</strong>
								<em>Temp</em>
							</span>
						</div>

						<span class="plan-etc">
							<em>2020.02.21</em>
							<a href="#none" class="plan-modify">
								<span class="sr-only">paln modify</span>
								<i class="xi-pen"></i>
							</a>
						</span>
					</div>
					<a href="" class="plan-Confirm">Confirm</a>
				</li>
			</ul>
		</div>

		<div class="apply-btn-wrap">
			<div class="checkbox-radio-custom">
				<input type="checkbox" class="checkbox" id="noPlan">
				<label for="noPlan">No plan</label>
			</div>
			<a href="" class="btn-style btn-style4">Apply</a>
			<a href="" class="btn-style btn-style1">Register</a>
		</div>

		<div class="btns">
			<a href="" class="btn-style btn-style-m btn-style2 float-left">Back</a>
			<a href="" class="btn-style btn-style-m btn-style1 float-right">Next</a>
		</div>

	</div>
	<!-- //계획리스트 -->
<jsp:include page="include/footer.jsp"></jsp:include>