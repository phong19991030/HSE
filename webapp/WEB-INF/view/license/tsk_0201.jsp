<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
.base_grid_table .registration-write {
	width: 100%;
}
</style>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script type="text/javascript"
	src="${ctxPath}/script/a2mFWJs/util/nova-validation.js"></script>

<span hidden id="CRUD" name="CRUD" />${CRUD}</span>
<input type="hidden" id="RISK_ASSESSMENT_ID" name="RISK_ASSESSMENT_ID"
	value="${DATA.RISK_ASSESSMENT_ID}" />
<span hidden id="subTittleModify"><spring:message
		code="license.tsk_0100.label.subTittleModify" /></span>
<span hidden id="subTittleRegister"><spring:message
		code="license.tsk_0100.label.subTittleRegister" /></span>
<main id="content" class="work-page">
	<div class="container">
		<section class="hdSection">
			<!-- tit-wrap -->
			<div class="tit-wrap">
				<div class="tit-left">
					<h1 class="heading1"><spring:message code="license.tsk_0200.title.register" /></h1>
				</div>
			</div>
			<!-- //tit-wrap -->
		</section>
		<section class="contSection">
			<div class="content clearfix">

				<!-- left area -->
				<div class="left-area">
					<article class="registration-form">
						<h2 class="heading4">결재라인</h2>
						<div class="approval-select-area">
							<button modal-id="layer-popup1">결재라인을 지정해주세요</button>
						</div>
					</article>

					<article class="registration-form inner-view-form">
						<h2 class="heading4"><spring:message code="license.tsk_0200.title.detail" /></h2>
						<div class="base-table">
							<table>
								<caption></caption>
								<colgroup>
									<col style="width: 10%;">
									<col style="width: 90%;">
								</colgroup>
								<tbody>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.project.name" /></th>
										<td>
											<div class="register-write w70p">
												<div class="select-group">
													<select validation-check="required" title="Select" id='id_project_name'>
														<option value="">내용</option>
														<c:forEach items="${projects}" var="project" varStatus="loop">
															<c:if
																test="${DATA.PROJECT_ID != null && DATA.PROJECT_ID eq project.PROJECT_ID}">
																<option value="${project.PROJECT_ID}"
																	selected="selected">${project.PROJECT_NAME}</option>
															</c:if>
															<c:if test="${DATA.PROJECT_ID ne project.PROJECT_ID}">
																<option value="${project.PROJECT_ID}">${project.PROJECT_NAME}</option>
															</c:if>
														</c:forEach>
													</select>
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.work.date" /></th>
										<td>
											<div class="calendar-picker">
												<div class="input-group">
													<label class="sr-only">날짜설정</label> 
													<input validation-check="required" type="text"id="WORK_DATE" value="${DATA.WORK_DATE}" title="날짜설정"
														placeholder="YYYY-MM-DD" class="datepicker" readonly>
													<button class="calendar-picker-btn"></button>
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.job.name" /></th>
										<td>
											<div class="register-write w70p">
												<div class="input-group">
													<input validation-check="required" type="text" title="작업명" placeholder="작업명을 입력해주세요" id="JOB_NAME" 
													value="${DATA.JOB_NAME}">
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.work.content" /></th>
										<td>
											<ul class="equip-history-lst" id='works'>
												<!-- TOOL_HISTORY -->
												<c:if test="${WORKS != null && WORKS.size() > 0 }">
													<c:forEach items="${WORKS}" var="his" varStatus="status">
														<li>
															<div class="register-write w70p">
																<div class="input-group">
																	<input validation-check="required" name="dp_${his.value}" type="text" id='WORKCONTENT_${his.value}' value="${his.value}" class="cls_WORK" title="장비명" placeholder="장비명">
																</div>
															</div>

															<button class="btn1 remove-btn motion" onclick="removeWorkFunc(this)">
																<i class="lar la-trash-alt"></i>
															</button>
															
															<c:if test="${status.count eq WORKS.size()}">
																<button class="btn3 motion cls_addWork" onclick='addWorkFunc(this)'>
																	<i class="las la-plus"></i>
																</button>
															</c:if>
														</li>
													</c:forEach>
												</c:if>

												<c:if test="${WORKS == null || WORKS.size() eq 0}">
													<li>
														<div class="register-write">
															<div class="input-group">
																<input validation-check="required" name="dp_new" type="text" id='WORKCONTENT_new' title="장비명" class="cls_WORK" placeholder="장비명">
															</div>
														</div> 
														<c:if test="${DATA.CRUD ne 'C'}">
															<button class="btn1 remove-btn motion" onclick="removeWorkFunc(this)">
																<i class="lar la-trash-alt"></i>
															</button>
														</c:if> <!-- 3. add btn-->
														<button class="btn3 motion cls_addWork" onclick='addWorkFunc(this)'>
															<i class="las la-plus"></i>
														</button>
													</li>
												</c:if>
											</ul>
										</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.responsible" /></th>
										<td>
											<div class="register-write w50p" style="display: flex;">
												<div class="">
													<input type="text" id="id_emp_str_uid_key_manager"
														validation-check="required" name="MANAGER"
														value="${DATA.MANAGER}" hidden="true" />
												</div>
												<jsp:include page="../common/select_emp_btn.jsp">
													<jsp:param name="key" value="key_manager" />
													<jsp:param name="CRUD" value="${DATA.CRUD}" />
													<jsp:param name="strEmpId" value="${DATA.MANAGER}" />
													<jsp:param name="isOne" value="true" />
													<jsp:param name="title" value="책임자 설정" />
												</jsp:include>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.participants" /></th>
										<td>
											<div class="register-write w50p" style="display: flex;">
												<div class="">
													<input type="text" id="id_emp_str_uid_key_participants"
														validation-check="required" name="PARTICIPANTS"
														value="${DATA.PARTICIPANTS}" hidden="true" />
												</div>
												<jsp:include page="../common/select_emp_btn.jsp">
													<jsp:param name="key" value="key_participants" />
													<jsp:param name="CRUD" value="${DATA.CRUD}" />
													<jsp:param name="strEmpId" value="${DATA.PARTICIPANTS}" />
													<jsp:param name="isOne" value="false" />
													<jsp:param name="title" value="참여자 설정" />
												</jsp:include>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.protective.equipment" /></th>
										<td>
											<div class="register-write w50p" style="display: flex;">
												<div class="">
													<input type="text" id="id_emp_str_uid_key_tool_list"
														validation-check="required" name="TOOL_LIST"
														value="${DATA.TOOL_LIST}" hidden="true" />
												</div>
												<jsp:include
													page="../common/select_personal_equipment_bnt.jsp">
													<jsp:param name="key" value="key_tool_list" />
													<jsp:param name="CRUD" value="${DATA.CRUD}" />
													<jsp:param name="strEmpId" value="${DATA.TOOL_LIST}" />
													<jsp:param name="isOne" value="true" />
												</jsp:include>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.materials" /></th>
										<td>
											<ul class="equip-history-lst" id='materials'>
												<!-- TOOL_HISTORY -->
												<c:if test="${MATS != null && MATS.size() > 0 }">
													<c:forEach items="${MATS}" var="his" varStatus="status">
														<li>
															<div class="register-write">
																<div class="input-group">
																	<input validation-check="required" name="dp_${his.key}" type="text" id='MATERIAL_${his.value}' value="${his.key}" title="장비명" class="cls_MAT" placeholder="장비명">
																</div>
															</div>
															<div class="register-write w50p">
																<div class="input-group">
																	<input validation-check="required" type="text" id="MAT_CONTENT" value="${his.value}" title="사용목적" placeholder="사용목적을 입력해주세요">

																</div>
															</div>
															<button class="btn1 remove-btn motion" onclick="removeMatFunc(this)">
																<i class="lar la-trash-alt"></i>
															</button>
															<c:if test="${status.count eq MATS.size()}">
																<button class="btn3 motion cls_addMat" onclick='addMatFunc(this)'>
																	<i class="las la-plus"></i>
																</button>
															</c:if>

														</li>
													</c:forEach>
												</c:if>

												<c:if test="${MATS == null || MATS.size() eq 0}">
													<li>
														<div class="register-write">
															<div class="input-group">
																<input validation-check="required" name="dp_new" type="text" id='MATERIAL_new' title="장비명" class="cls_MAT" placeholder="장비명">
															</div>
														</div> <!-- 2. input-text -->
														<div class="register-write">
															<div class="input-group">
																<input validation-check="required" type="text" title="사용목적" id="MAT_CONTENT" placeholder="사용목적을 입력해주세요">
															</div>
														</div> <c:if test="${DATA.CRUD ne 'C'}">
															<button class="btn1 remove-btn motion" onclick="removeMatFunc(this)">
																<i class="lar la-trash-alt"></i>
															</button>
														</c:if>
														<button class="btn3 motion cls_addMat" onclick='addMatFunc(this)'>
															<i class="las la-plus"></i>
														</button>
													</li>
												</c:if>
											</ul>
										</td>

									</tr>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.consumables" /></th>
										<td>
											<div class="select-group">
												<select validation-check="required" title="재료 및 소모품" id="CONSUMABLES">
													<c:forEach items="${consum}" var="item" varStatus="loop">
														<c:if test="${DATA.CONSUMABLES != null && DATA.CONSUMABLES eq item.COMM_CD}">
															<option value="${item.COMM_CD}"
																selected="selected">${item.COMM_NM}</option>
														</c:if>
														<c:if
															test="${DATA.CONSUMABLES ne item.COMM_CD}">
															<option value="${item.COMM_CD}">${item.COMM_NM}</option>
														</c:if>
													</c:forEach>
												</select>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.risk.assessment" /><br /><spring:message code="license.tsk_0200.label.keywork" />
										</th>
										<td>
											<div class="select-group">
												<select validation-check="required" id='id_risk_assessment'>
													<option value="">내용</option>
													<c:forEach items="${riskAssessments}" var="riskAssessment"
														varStatus="loop">
														<c:if test="${DATA.RA_KEYWORD != null && DATA.RA_KEYWORD eq riskAssessment.COMM_CD}">
															<option value="${riskAssessment.COMM_CD}"
																selected="selected">${riskAssessment.COMM_NM}</option>
														</c:if>
														<c:if
															test="${DATA.RA_KEYWORD ne riskAssessment.COMM_CD}">
															<option value="${riskAssessment.COMM_CD}">${riskAssessment.COMM_NM}</option>
														</c:if>
													</c:forEach>
												</select>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.perform.assessment" /></th>
										<td>
											<div class="risk-assessment-area">
												<!-- 위험성 평가 수행 입력 영역-->
												<section class="section1">
													<h4 class="tit">
														<spring:message code="license.tsk_0200.note.1" /><span>1,2,3,4 or 5</span><spring:message code="license.tsk_0200.note.2" />
													</h4>

													<div class="view-form">
														<div class="base-table center-table">
															<table id="table">
																<caption></caption>
																<colgroup>
																	<col style="width: 12%;">
																	<col style="width: 25%;">
																	<col style="width: 5%;">
																	<col style="width: 5%;">
																	<col style="width: 5%;">
																	<col style="width: 33%;">
																	<col style="width: 5%;">
																	<col style="width: 5%;">
																	<col style="width: 5%;">
																</colgroup>
																<thead>
																	<tr>
																		<th scope="col"><spring:message code="license.tsk_0200.table.header.work" /></th>
																		<th scope="col" class="txt-left"><spring:message code="license.tsk_0200.table.header.potential.hazard" /></th>
																		<th scope="col"><spring:message code="license.tsk_0200.table.header.frequencyL" /></th>
																		<th scope="col"><spring:message code="license.tsk_0200.table.header.resultC" /></th>
																		<th scope="col"><spring:message code="license.tsk_0200.table.header.risk" /></th>
																		<th scope="col" class="txt-left"><spring:message code="license.tsk_0200.table.header.risk.control" /></th>
																		<th scope="col"><spring:message code="license.tsk_0200.table.header.frequencyL" /></th>
																		<th scope="col"><spring:message code="license.tsk_0200.table.header.resultC" /></th>
																		<th scope="col"><spring:message code="license.tsk_0200.table.header.risk" /></th>
																	</tr>
																</thead>
																<tbody>
																<c:forEach items="${riskContents}" var="cntItem" varStatus="row">
																	<tr>
																		<c:if test="${row.index == 0}">
																			<td rowspan="3" class="bl-none"><spring:message code="license.tsk_0200.table.row.1" /></td>
																		</c:if>
																		<c:if test="${row.index > 2}">
																			<td rowspan="1" class="bl-none"><spring:message code="license.tsk_0200.table.row.2" /></td>
																		</c:if>
																		<td class="txt-left">${cntItem.COMM_NM}</td>
																		<td>
																			<div class="register-write">
																				<div class="input-group">
																					<input validation-check="required" type="number" title="입력" class="numbers" max="5" id="FREQ-${(row.index +1)}"
																						placeholder="-">
																				</div>
																			</div>
																		</td>
																		<td class="bl-none">
																			<div class="register-write">
																				<div class="input-group">
																					<input validation-check="required" type="number" title="입력" class="numbers" max="5" id="RES-${(row.index +1)}"
																						placeholder="-">
																				</div>
																			</div>
																		</td>
																		<td class="bl-none">
																			<div class="register-write">
																				<div class="input-group">
																					<input type="number" disabled title="입력" id="RSK-${(row.index +1)}"
																						placeholder="-">
																				</div>
																			</div>
																		</td>
																		<td class="txt-left">
																			${riskContentsRight[row.index].COMM_NM}
																		</td>
																		<td>
																			<div class="register-write">
																				<div class="input-group">
																					<input validation-check="required" type="number" title="입력" class="numbers" max="5" id="FREQ-${riskContents.size() +row.index +1}"
																						placeholder="-">
																				</div>
																			</div>
																		</td>
																		<td class="bl-none">
																			<div class="register-write">
																				<div class="input-group">
																					<input validation-check="required" type="number" title="입력" class="numbers" max="5" id="RES-${riskContents.size() +row.index +1}"
																						placeholder="-">
																				</div>
																			</div>
																		</td>
																		<td class="bl-none">
																			<div class="register-write">
																				<div class="input-group">
																					<input type="number" disabled title="입력" id="RSK-${riskContents.size() +row.index +1}"
																						placeholder="-">
																				</div>
																			</div>
																		</td>
																	</tr>
																
																</c:forEach>
																	
																
																</tbody>
															</table>
														</div>
													</div>
												</section>

												<!-- 위험성 평가 결과 추정 -->
												<section class="section2">
													<h4 class="tit">위험성 평가 결과 추정</h4>
													<ul class="risk-result-area">
														<li>
															<div class="value-box-wrap">
																<span class="title">[위험성 평가 전 결과]</span> <small
																	class="x-axis">빈도 (LIKELIHOOD)</small> <small
																	class="y-axis">결과 (CONSEQUENCES)</small>
																<ul class="value-box">
																	<li class="x-num-axis y-num-axis"><em class="num">1</em>
																		<span>LOW</span></li>
																	<li class="x-num-axis"><em class="num">2</em> <span>LOW</span>
																	</li>
																	<li class="x-num-axis"><em class="num">3</em> <span>LOW</span>
																	</li>
																	<li class="x-num-axis"><em class="num">4</em> <span>LOW</span>
																	</li>
																	<li class="x-num-axis"><em class="num">5</em> <span>LOW</span>
																	</li>
																	<li class="y-num-axis"><em class="num">2</em> <span>LOW</span>
																	</li>
																	<li><em class="num">4</em> <span>LOW</span></li>
																	<li><em class="num">6</em> <span>MEDIUM</span></li>
																	<li><em class="num">8</em> <span>MEDIUM</span></li>
																	<li><em class="num">10</em> <span>MEDIUM</span></li>
																	<li class="y-num-axis"><em class="num">3</em> <span>LOW</span>
																	</li>
																	<li><em class="num">6</em> <span>MEDIUM</span></li>
																	<li><em class="num">9</em> <span>MEDIUM</span></li>
																	<li><em class="num">12</em> <span>MEDIUM</span></li>
																	<li><em class="num">15</em> <span>MEDIUM</span></li>
																	<li class="y-num-axis"><em class="num">4</em> <span>LOW</span>
																	</li>
																	<li><em class="num">8</em> <span>MEDIUM</span></li>
																	<li><em class="num">12</em> <span>MEDIUM</span></li>
																	<li><em class="num">16</em> <span>MEDIUM</span></li>
																	<li><em class="num">20</em> <span>MEDIUM</span></li>
																	<li class="y-num-axis"><em class="num">5</em> <span>LOW</span>
																	</li>
																	<li><em class="num">10</em> <span>MEDIUM</span></li>
																	<li><em class="num">15</em> <span>MEDIUM</span></li>
																	<li><em class="num">20</em> <span>MEDIUM</span></li>
																	<li><em class="num">25</em> <span>MEDIUM</span></li>
																</ul>
															</div>
														</li>
														<li>
															<div class="value-box-wrap">
																<span class="title">[위험성 평가 후 결과 변화]</span> <small
																	class="x-axis">빈도 (LIKELIHOOD)</small> <small
																	class="y-axis">결과 (CONSEQUENCES)</small>
																<ul class="value-box">
																	<li class="x-num-axis y-num-axis"><em class="num">1</em>
																		<span>LOW</span></li>
																	<li class="x-num-axis"><em class="num">2</em> <span>LOW</span>
																	</li>
																	<li class="x-num-axis"><em class="num">3</em> <span>LOW</span>
																	</li>
																	<li class="x-num-axis"><em class="num">4</em> <span>LOW</span>
																	</li>
																	<li class="x-num-axis"><em class="num">5</em> <span>LOW</span>
																	</li>
																	<li class="y-num-axis"><em class="num">2</em> <span>LOW</span>
																	</li>
																	<li><em class="num">4</em> <span>LOW</span></li>
																	<li><em class="num">6</em> <span>MEDIUM</span></li>
																	<li><em class="num">8</em> <span>MEDIUM</span></li>
																	<li><em class="num">10</em> <span>MEDIUM</span></li>
																	<li class="y-num-axis"><em class="num">3</em> <span>LOW</span>
																	</li>
																	<li><em class="num">6</em> <span>MEDIUM</span></li>
																	<li><em class="num">9</em> <span>MEDIUM</span></li>
																	<li><em class="num">12</em> <span>MEDIUM</span></li>
																	<li><em class="num">15</em> <span>MEDIUM</span></li>
																	<li class="y-num-axis"><em class="num">4</em> <span>LOW</span>
																	</li>
																	<li><em class="num">8</em> <span>MEDIUM</span></li>
																	<li><em class="num">12</em> <span>MEDIUM</span></li>
																	<li><em class="num">16</em> <span>MEDIUM</span></li>
																	<li><em class="num">20</em> <span>MEDIUM</span></li>
																	<li class="y-num-axis"><em class="num">5</em> <span>LOW</span>
																	</li>
																	<li><em class="num">10</em> <span>MEDIUM</span></li>
																	<li><em class="num">15</em> <span>MEDIUM</span></li>
																	<li><em class="num">20</em> <span>MEDIUM</span></li>
																	<li><em class="num">25</em> <span>MEDIUM</span></li>
																</ul>
															</div>
														</li>
													</ul>
												</section>

											</div>
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
						<button id="SAVE_BTN" class="btn-style1">
		                  <i class="las la-edit"></i><span class="name"><spring:message code="button.save" /></span>
		                </button>
						<c:if test="${CRUD == 'U'}" >
							<button class="btn-style1" id="DEL_BTN">
								<i class="las la-trash-alt"></i><span class="name"><spring:message code="button.delete" /></span>
							</button>
						</c:if>
						<button class="btn-style3" onclick="goList()">
		                  <i class="las la-reply"></i><span class="name"><spring:message code="button.cancel" /></span>
		                </button>
					</div>
				</div>
				<!-- // right area -->
			</div>
		</section>
	</div>
</main>

<script src="${ctxPath}/script/license/tsk_0201.js?cachebuster=" + new Date().getTime()></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>
	$(document).ready(function() {
		debugger
		tsk_0201();
		console.log('${riskContents}');
		getEmpInfos('key_manager', '${DATA.MANAGER}');
		getEmpInfos('key_participants', '${DATA.PARTICIPANTS}');
		getPersEquipmentInfo('key_tool_list', '${DATA.TOOL_LIST}');
		if(${CRUD=="U"}){
			setRisk();
		}
		$('.numbers').keyup(function () { 
			if(this.value>5){
				this.value = 5;
			}
		});
	});
	function setRisk(){
		if(${DATA.RISK_ASSESSMENT!=null}){
			var result = '${DATA.RISK_ASSESSMENT}';
			var list = JSON.parse(result);	
			console.log(list);
			jQuery(list).each(function(i, item){
				var index= i+1;
				$('#FREQ-'+index).val(item.FREQ);
				$('#RES-'+index).val(item.RES);
				$('#RSK-'+index).val(item.RSK);
			});
		}
		else return;
	}
</script>