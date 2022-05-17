<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%
request.setCharacterEncoding("UTF-8");
%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
.btns {
	margin: 10px 0 0 0;
}

#layerPopup .layer-cont.COMPANY {
	width: 700px;
}

#layerPopup .layer-cont.MENU-ACCESS {
	width: 525px;
}

#layerPopup .layer-cont.TURBINE-PERMISSION {
	width: 700px;
}
</style>

<input type="hidden" id="PROCESS" name="PROCESS" value="${PROCESS}">
<input type="hidden" id="SAFE_COURSE_PLAN_ID" name="SAFE_COURSE_PLAN_ID"
	value="${DATA.SAFE_COURSE_PLAN_ID}"></input>


<div class="container system-wrap system-wrap1">
	<!-- 사용자 등록 페이지 -->
	<div class="system-detail-wrap">
		<div class="system-left">

			<!--타이틀-->
			<div class="tit-wrap">
				<h2 class="heading3">
					<span class="txt">${PAGE_TITLE}</span>
					<!-- <span class="version">V47</span> -->
				</h2>
				<ul class="location">
					<li><spring:message code="com.com_0304.label.subTittle1" /></li>
					<li class="bold"><spring:message
							code="com.com_0304.label.subTittle2" /></li>
				</ul>
			</div>
			<!--//타이틀-->

			<!-- 등록폼 -->
			<div class="registration-form registration-form1">
				<div class="registration-form-lst-wrap">
					<!-- 왼쪽 등록폼 -->
					<ul class="registration-form-lst">
						<li><span><spring:message
									code="com.com_0304.label.courseType" /><span class="red">
									*</span></span>
							<div class="registration-write">
								<div class="input-group">
									<label for="COURSE_TYPE" class="sr-only"><spring:message
											code="com.com_0304.label.courseType" /></label> <input type="text"
										id="COURSE_TYPE" validation-check="required" maxlength="15">
								</div>
							</div></li>
						<li><span><spring:message
									code="com.com_0304.label.TrainTerm" /><span class="red">
									*</span></span>
							<div class="registration-write">
								<div class="input-group">
									<label for="TRAIN_TERM" class="sr-only"><spring:message
											code="com.com_0304.label.TrainTerm" /></label> <input type="text"
										id="TRAIN_TERM" validation-check="required" maxlength="15">
								</div>
							</div></li>
						<li><span> <spring:message
									code="com.com_0304.label.TraineeType" /><span class="red">
									*</span></span>
							<div class="registration-write">
								<div class="input-group">
									<label for="TRAINEE_TYPE" class="sr-only"><spring:message
											code="com.com_0304.label.TraineeType" /></label> <input type="text"
										id="TRAINEE_TYPE" validation-check="required" maxlength="15">
								</div>
							</div></li>

						<li><span><spring:message
									code="com.com_0304.label.TrainHours" /><span class="red">
									*</span></span>
							<div class="registration-write">
								<div class="input-group">
									<label for="TRAIN_HOURS" class="sr-only"><spring:message
											code="com.com_0304.label.TrainHours" /></label> <input type="text"
										id="TRAIN_HOURS" validation-check="required" maxlength="15">
								</div>
							</div></li>
						<li><span> <spring:message
									code="com.com_0304.label.Content" /> <span class="red">
									*</span></span>
							<div class="registration-write">
								<div class="input-group">
									<label for="CONTENT" class="sr-only"><spring:message
											code="com.com_0304.label.Content" /></label> <input type="text"
										id="CONTENT" validation-check="required" maxlength="15">
								</div>
							</div></li>
					</ul>
				</div>
			</div>
			<!-- // 등록폼 -->
		</div>

		<!-- 버튼 모음 -->
		<div class="system-right">
			<div class="btns" style="position: fixed; width: 12%;">
				<a href="javascript:void(0)" id="SAVE_BTN"
					class="btn-style btn-style1"><spring:message code="button.save" /></a> <a
					href="javascript:history.back()" class="btn-style btn-style2"><spring:message code="button.cancel" /></a>
			</div>
		</div>
		<!-- //버튼 모음 -->
	</div>
	<!-- // 사용자 등록 -->
</div>

<!-- 스크립트 -->

<script src="${ctxPath}/script/com/com_030401.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script type="text/javascript">
	var ctx = '${CTX}';
	$(document).ready(function() {
		com_030401();
	});
</script>



