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
<script type="text/javascript"
	src="${ctxPath}/script/a2mFWJs/util/nova-validation.js"></script>

<input type="hidden" id="PROCESS" name="PROCESS" value="${PROCESS}">
<input type="hidden" id="SAFE_COURSE_ID" name="SAFE_COURSE_ID"
	value="${DATA.SAFE_COURSE_ID}"></input>


<main id="content" class="safety-page">
	<div class="container">
		<section class="hdSection">
			<!-- tit-wrap -->
			<div class="tit-wrap">
				<div class="tit-left">
					<h1 class="heading1">
            <c:if test="${PROCESS == 'INSERT'}">
              <spring:message code="sft.sft_0200.label.tittleRedister" />
              </c:if>
              <c:if test="${PROCESS == 'UPDATE'}">
                <spring:message code="sft.sft_0200.label.tittleModify" />
              </c:if>  
            
            </h1>
				</div>
			</div>
			<!-- //tit-wrap -->
		</section>
		<section class="contSection">
			<div class="content clearfix">

				<!-- left area -->
				<div class="left-area">
					<article class="registration-form">
						<h2 class="heading4"><spring:message code="sft.sft_0200.label.paymentLine" /></h2>
						<div class="approval-select-area">
							<button modal-id="layer-popup1">결재라인을 지정해주세요</button>
						</div>
					</article>

					<article class="registration-form inner-view-form">
						<h2 class="heading4"><spring:message code="sft.sft_0200.label.info" /></h2>

						<div class="base-table">
							<table>
								<caption></caption>
								<colgroup>
									<col style="width: 11%;">
									<col style="width: 39%;">
									<col style="width: 11%;">
									<col style="width: 39%;">
								</colgroup>
								<tbody>
									<tr>
										<th scope="row"><spring:message
												code="sft.sft_0200.label.DOC_NO" /></th>
										<td colspan="3">
											<div class="register-write w20p">
												<div class="input-group">
													<input validation-check="required" type="text" title="문서번호" id="DOC_NO"
														placeholder="<spring:message code="sft.sft_0200.label.doc.placeholder" />">
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><spring:message
												code="sft.sft_0200.label.PROJECT_NAME" /></th>
										<td colspan="3">
											<div class="select-group">
												<select title="Select" id='id_project_name'>
													<option value="">내용</option>
													<c:forEach items="${projects}" var="project"
														varStatus="loop">
														<c:if
															test="${DATA.PROJECT_ID != null && DATA.PROJECT_ID eq project.PROJECT_ID}">
															<option value="${project.PROJECT_ID}" selected="selected">${project.PROJECT_NAME}</option>
														</c:if>
														<c:if test="${DATA.PROJECT_ID ne project.PROJECT_ID}">
															<option value="${project.PROJECT_ID}">${project.PROJECT_NAME}</option>
														</c:if>
													</c:forEach>
												</select>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><spring:message
												code="sft.sft_0200.label.WORK_TYPE" /></th>
										<td>
											<div class="select-group">
												<select validation-check="required" title="Select" id='id_work_type'>
													<option value="">내용</option>
													<c:forEach items="${workTypes}" var="workType" varStatus="loop">
														<c:if test="${DATA.WORK_TYPE != null && DATA.WORK_TYPE eq workType.COMM_NM}">
															<option value="${workType.COMM_NM}" selected="selected">${workType.COMM_NM}</option>
														</c:if>
														<c:if test="${DATA.WORK_TYPE ne workType.COMM_NM}">
															<option value="${workType.COMM_NM}">${workType.COMM_NM}</option>
														</c:if>
													</c:forEach>
												</select>
											</div>
										</td>
										<th scope="row"><spring:message
												code="sft.sft_0200.label.COURSE_DATE" /></th>
										<td>
											<div class="calendar-picker">
												<div class="input-group">
													<label class="sr-only">날짜설정</label> <input validation-check="required" type="text"
														id='COURSE_DATE' placeholder="YYYY-MM-DD" title="날짜설정"
														class="datepicker" readonly validation-check="required">
													<button class="calendar-picker-btn"></button>
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><spring:message
												code="sft.sft_0200.label.PLACE" /></th>
										<td colspan="3">
											<div class="register-write w20p">
												<div class="input-group">
													<input validation-check="required" type="text" title="수행 장소" id="PLACE" placeholder='<spring:message code="sft.sft_0200.label.PLACE" />'>
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><spring:message
												code="sft.sft_0200.label.TRAINER" /></th>
										<td>
											<!-- <div class="select-group">
												<select title="Select" id='id_trainer'>
													<option value="">Select</option>
													<c:forEach items="${users}" var="user" varStatus="loop">
														<option value="${user.USER_NM}">${user.USER_NM}</option>
													</c:forEach>
												</select>
											</div> -->
                      <div class="register-write w50p">
                        <div class="">
                          <!-- <input type="text" title="성명" placeholder="성명을 입력해주세요" value="장길동"> -->
                          <input type="text" id="id_emp_str_uid_key_trainer_no" validation-check="required" name="TRAINER" value="${DATA.TRAINER}" hidden="true"/>
                        </div>
                        <jsp:include page="../common/select_emp_btn.jsp">
                          <jsp:param name="key" value="key_trainer_no" />
                          <jsp:param name="CRUD" value="${DATA.CRUD}" />
                          <jsp:param name="strEmpId" value="${DATA.TRAINER}" />
                          <jsp:param name="isOne" value="true" />
                          <jsp:param value="교육 진행자 설정" name="title"/>
                        </jsp:include>
                      </div>
										</td>
										<th scope="row"><spring:message
												code="sft.sft_0200.label.TRAINEE" /></th>
										<td>
											<div class="register-write w100p">
												<!-- <div class="input-group">
													<input type="text" title="교육 참석자" id="TRAINEE"
														placeholder="Please enter training attendees">
												</div> -->
                        <div class="">
                          <!-- <input type="text" title="성명" placeholder="성명을 입력해주세요" value="장길동"> -->
                          <input type="text" id="id_emp_str_uid_key_trainee_no" validation-check="required" name="TRAINEE" value="${DATA.TRAINEE}" hidden="true"/>
                        </div>
                        <jsp:include page="../common/select_emp_btn.jsp">
                          <jsp:param name="key" value="key_trainee_no" />
                          <jsp:param name="CRUD" value="${DATA.CRUD}" />
                          <jsp:param name="strEmpId" value="${DATA.TRAINEE}" />
                          <jsp:param name="isOne" value="false" />
                          <jsp:param value="교육 참석자 설정" name="title"/>
                        </jsp:include>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row">교육사항</th>
										<td colspan="3">
											<article class="view-form mgvertical10">
												<div class="base-table">
													<table id="id_tbl_edu_content">
														<colgroup>
															<col style="width: 5%;">

															<col style="width: 40%;">
															<col style="width: 15%;">
															<col style="width: 35%;">
															<col style="width: 0%;">
														</colgroup>
														<thead>
															<tr>
																<th scope="col"><spring:message code="com.com_0101.label.no" /></th>
																<th scope="col"><spring:message code="sft.sft_0200.label.cl.item" /></th>
																<th scope="col"><spring:message code="sft.sft_0200.label.cl.value" /></th>
																<th scope="col"><spring:message code="sft.sft_0200.label.cl.action" /></th>
															</tr>
														</thead>
														<tbody id="ROW_LIST">
															<!-- <c:forEach items="${eduContentType}" var="type"
																varStatus="loop">
																<tr>
																	<td value="${type.RN}">${type.RN}</td>
																	
																	<td value="${type.COMM_NM}">${type.COMM_NM}</td>
																	<td>
																		<span class="checkbox-radio-group"> 
																			<label for="check${type.RN}-1" class="radio"> 
																				<input type="radio" class="cls_rdY" name="check${type.RN}" id="check${type.RN}-1" checked> 
																				<span class="circle"></span> <em>YES</em>
																			</label> 
																		</span> 
																		<span class="checkbox-radio-group"> 
																			<label for="check${type.RN}-2" class="radio"> 
																				<input type="radio" class="cls_rdN" name="check${type.RN}" id="check${type.RN}-2"> 
																				<span class="circle"></span>
																				<em>NO</em>
																			</label> 
																		</span>
																	</td>
																	<td value="${type.DESCRPT}">${type.DESCRPT}</td>
																	<td value="${type.COMM_CD}" hidden="true">
																		<input type="hidden" class="cls_edu_type" value="${type.COMM_CD}" />
																	</td>
																</tr>


															</c:forEach> -->
														</tbody>
													</table>
												</div>
											</article>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</article>
				</div>
				<!-- // left area -->
				<!-- right area -->
				<div class="right-area">
					<div class="right-btn-type">
						<button class="btn-style1" id="SAVE_BTN">
							<i class="las la-edit"></i><span class="name">등록</span>
						</button>
						<button class="btn-style3" onclick="goList()">
							<i class="las la-reply"></i><span class="name">취소</span>
						</button>
					</div>
				</div>
				<!-- // right area -->
			</div>
		</section>
	</div>
	</

	<!-- 스크립트 -->

	<script src="${ctxPath}/script/safety/safety_0201.js"></script>
	<script src="${ctxPath}/script/sys/sys-common.js"></script>
	<script src="${ctxPath}/script/sys/sys-element.js"></script>

	<script type="text/javascript">
		var ctx = '${CTX}';
		$(document).ready(function() {
			safety_0201();
      getEmpInfos('key_trainer_no', '${DATA.TRAINER}');
      getEmpInfos('key_trainee_no', '${DATA.TRAINEE}');
		});
	</script>