<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%
request.setCharacterEncoding("UTF-8");
%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<input type="hidden" id="SAFE_COURSE_PLAN_ID" name="SAFE_COURSE_PLAN_ID"
	value="${DATA.SAFE_COURSE_PLAN_ID}"></input>

<div class="container system-wrap system-wrap1">

	<!-- 사용자 관리 상세정보 페이지 -->
	<div class="system-detail-wrap">
		<div class="system-left">
			<!--타이틀-->
			<div class="tit-wrap">
				<h2 class="heading3">
					<span class="txt">${PAGE_TITLE}</span>
					<!-- <span id="USER_ID" class="version">V47</span> -->
				</h2>
				<ul class="location">
				<li><spring:message code="com.com_0304.label.subTittle1" /></li>
					<li class="bold"><spring:message code="com.com_0304.label.subTittle2" /></li>
				</ul>
			</div>
			<!--//타이틀-->

			<!-- 상세폼 -->
			<div class="registration-form registration-form1">
				<div class="registration-form-lst-wrap">
					<!-- 왼쪽 상세폼 -->
					<ul class="registration-form-lst">
						<li><span><spring:message code="com.com_0304.label.courseType" /></span>
							<div class="registration-write">
								<span id="COURSE_TYPE"></span>
							</div></li>
						<li><span><spring:message code="com.com_0304.label.TrainTerm" /></span>
							<div class="registration-write">
								<span id="TRAIN_TERM"></span>
							</div></li>
						<li><span><spring:message code="com.com_0304.label.TraineeType" /></span>
							<div class="registration-write">
								<span id="TRAINEE_TYPE"></span>
							</div></li>
						<li><span><spring:message code="com.com_0304.label.TrainHours" /></span>
							<div class="registration-write">
								<span id="TRAIN_HOURS"></span>
							</div></li>
						<li><span><spring:message code="com.com_0304.label.Content" /></span>
							<div class="registration-write">
								<span id="CONTENT"></span>
							</div></li>
					</ul>
					<!-- //왼쪽 상세폼 -->

					<!-- 오른쪽 상세폼 -->

				</div>
			</div>
			<!-- //오른쪽 상세폼 -->
		</div>
		<!-- // 상세폼 -->

		<!-- 버튼 모음 -->
		<div class="system-right">
			<div class="btns" style="position: fixed; width: 12%;">
				<span id="MODIFY_BTN" class="btn-style btn-style1"><spring:message code="button.modify" /></span> <span
					id="DELETE_BTN" class="btn-style btn-style3"><spring:message code="button.delete" /></span> <span
					id="CANCEL_BTN" class="btn-style btn-style2"><spring:message code="button.cancel" /></span>
			</div>
		</div>
	</div>
	<!-- //버튼 모음 -->
</div>

<script src="${ctxPath}/script/com/com_030402.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>
	var param = '${DATA}';

	$(document).ready(function() {
		com_030402();
	});
</script>
