<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%
request.setCharacterEncoding("UTF-8");
%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<input type="hidden" id="RISK_ASSESSMENT_ID" name="RISK_ASSESSMENT_ID" value="${DATA.RISK_ASSESSMENT_ID}">
<!-- Expert Pool - Register, Modify -->
<main id="content" class="work-page">
	<div class="container">
		<section class="hdSection">
			<!-- tit-wrap -->
			<div class="tit-wrap">
				<div class="tit-left">
					<h1 class="heading1"><spring:message code="license.tsk_0200.title.view" /></h1>
				</div>
			</div>
			<!-- //tit-wrap -->
		</section>
		<section class="contSection">
			<div class="content clearfix">

				<!-- left area -->
				<div class="left-area">
					<article class="approval-view">
						<div class="flexWrap">
							<h2 class="heading4">결재라인</h2>
							<!-- <button class="btn2 refresh-btn">
                    <span class="name">결재라인 재지정</span>
                  </button> -->
						</div>

						<ul class="approval-view--line">
							<!-- D : li class="approval" -> "결재 승인" style is applied. -->
							<li class="approval">
								<p class="state">결재승인</p>
								<div class="box">
									<div class="info-wrap">
										<span class="info"> <em class="team">윈디텍(주)</em> <em
											class="name">장길동</em> <em class="position">과장</em>
										</span>
										<!-- D : Badge style by approval status.
                          1. approval-badge1 기안
                          2. approval-badge2 검토
                          3. approval-badge3 결재
                        -->
										<small class="approval-badge1">기안</small>
									</div>
									<!-- D : li class="approval" -> "approval-date" The markup should be added. -->
									<p class="approval-date">
										<em>2021.06.01</em> <em>09:16</em>
									</p>
								</div>
							</li>
							<li>
								<p class="state">결재대기</p>
								<div class="box">
									<div class="info-wrap">
										<span class="info"> <em class="team">윈디텍(주)</em> <em
											class="name">곽길동</em> <em class="position">팀장</em>
										</span>
										<!-- D : Badge style by approval status.
                          1. approval-badge1 기안
                          2. approval-badge2 검토
                          3. approval-badge3 결재
                        -->
										<small class="approval-badge2">검토</small>
									</div>
									<!-- D : li class="approval" -> "approval-date" The markup should be added. -->
									<!-- <p class="approval-date">
                        <em>2021.06.01</em>
                        <em>09:16</em>
                      </p> -->
								</div>
							</li>
							<li>
								<p class="state">결재대기</p>
								<div class="box">
									<div class="info-wrap">
										<span class="info"> <em class="team">운영사 A</em> <em
											class="name">채길동</em> <em class="position">부장</em>
										</span>
										<!-- D : Badge style by approval status.
                          1. approval-badge1 기안
                          2. approval-badge2 검토
                          3. approval-badge3 결재
                        -->
										<small class="approval-badge3">결재</small>
									</div>
									<!-- D : li class="approval" -> "approval-date" The markup should be added. -->
									<!-- <p class="approval-date">
                        <em>2021.06.01</em>
                        <em>09:16</em>
                      </p> -->
								</div>
							</li>
						</ul>
					</article>

					<article class="view-form">
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
										<td>${DATA.PROJECT_NAME}</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.work.date" /></th>
										<td>${DATA.WORK_DATE}</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.job.name" /></th>
										<td>${DATA.JOB_NAME}</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.work.content" /></th>
										<td>
											<ul class="module-history-lst">
												<c:forEach items="${WORKS}" var="work" varStatus="loop">
													<li><em class="line"></em> <span class="txt">${work.value}</span></li>
												</c:forEach>
											</ul>
										</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.responsible" /></th>
										<td id="id_td_responsible">
											<div class="check-selected-wrap">
												<ul id="id_ul_responsible">
												</ul>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.participants" /></th>
										<td id="id_td_participants">
											<div class="check-selected-wrap">
												<ul id="id_ul_participants">
												</ul>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.protective.equipment" /></th>
										<td>
											<div class="check-selected-wrap">
												<ul id="id_ul_tool_lst"></ul>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.materials" /></th>
										<td>
											<c:forEach items="${MATS}" var="mat" varStatus="loop">
												<span>${mat.key} | </span>
												<i class="devide-line"></i>
												<span style="padding-right: 15px;">사용 목적 : ${mat.value}</span>
											</c:forEach>
										</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.consumables" /></th>
										<td>${DATA.CONSUMABLES_NM}</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.risk.assessment" /><br /><spring:message code="license.tsk_0200.label.keywork" />
										</th>
										<td>${DATA.RA_KEYWORD_NM}</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="license.tsk_0200.label.perform.assessment" /></th>
										<td>
											<div class="risk-assessment-area">
												<!-- 위험성 평가 수행 입력 영역-->
												<section class="section1">
													<div class="view-form">
														<div class="base-table center-table">
															<table>
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
																					<input type="text" title="입력" id="FREQ-${(row.index +1)}"
																						placeholder="-" readonly>
																				</div>
																			</div>
																		</td>
																		<td class="bl-none">
																			<div class="register-write">
																				<div class="input-group">
																					<input type="text" title="입력" id="RES-${(row.index +1)}"
																						placeholder="-" readonly>
																				</div>
																			</div>
																		</td>
																		<td class="bl-none">
																			<div class="register-write">
																				<div class="input-group">
																					<input type="text" title="입력" id="RSK-${(row.index +1)}"
																						placeholder="-" readonly>
																				</div>
																			</div>
																		</td>
																		<td class="txt-left">
																			${riskContentsRight[row.index].COMM_NM}
																		</td>
																		<td>
																			<div class="register-write">
																				<div class="input-group">
																					<input type="text" title="입력" id="FREQ-${riskContents.size() +row.index +1}"
																						placeholder="-" readonly>
																				</div>
																			</div>
																		</td>
																		<td class="bl-none">
																			<div class="register-write">
																				<div class="input-group">
																					<input type="text" title="입력" id="RES-${riskContents.size() +row.index +1}"
																						placeholder="-" readonly>
																				</div>
																			</div>
																		</td>
																		<td class="bl-none">
																			<div class="register-write">
																				<div class="input-group">
																					<input type="text" title="입력" id="RSK-${riskContents.size() +row.index +1}"
																						placeholder="-" readonly>
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
																	<!-- D :  type color 
                                      1. type1 : Yellow
                                      2. type2 : Orange
                                      3. tyep3 : Green
                                      -->
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
																	<li class="type1"><em class="num">6</em> <span>MEDIUM</span>
																	</li>
																	<li class="type1"><em class="num">8</em> <span>MEDIUM</span>
																	</li>
																	<li class="type1"><em class="num">10</em> <span>MEDIUM</span>
																	</li>
																	<li class="y-num-axis"><em class="num">3</em> <span>LOW</span>
																	</li>
																	<li class="type1"><em class="num">6</em> <span>MEDIUM</span>
																	</li>
																	<li class="type1"><em class="num">9</em> <span>MEDIUM</span>
																	</li>
																	<li class="type1"><em class="num">12</em> <span>MEDIUM</span>
																	</li>
																	<li class="type2"><em class="num">15</em> <span>MEDIUM</span>
																	</li>
																	<li class="y-num-axis"><em class="num">4</em> <span>LOW</span>
																	</li>
																	<li class="type1"><em class="num">8</em> <span>MEDIUM</span>
																	</li>
																	<li class="type1"><em class="num">12</em> <span>MEDIUM</span>
																	</li>
																	<li class="type2"><em class="num">16</em> <span>MEDIUM</span>
																	</li>
																	<li class="type2"><em class="num">20</em> <span>MEDIUM</span>
																	</li>
																	<li class="y-num-axis"><em class="num">5</em> <span>LOW</span>
																	</li>
																	<li class="type1"><em class="num">10</em> <span>MEDIUM</span>
																	</li>
																	<li class="type2"><em class="num">15</em> <span>MEDIUM</span>
																	</li>
																	<li class="type2"><em class="num">20</em> <span>MEDIUM</span>
																	</li>
																	<li class="type2"><em class="num">25</em> <span>MEDIUM</span>
																	</li>
																</ul>
															</div>
														</li>
														<li>
															<div class="value-box-wrap">
																<span class="title">[위험성 평가 후 결과 변화]</span> <small
																	class="x-axis">빈도 (LIKELIHOOD)</small> <small
																	class="y-axis">결과 (CONSEQUENCES)</small>
																<ul class="value-box">
																	<li class="x-num-axis y-num-axis type3"><em
																		class="num">1</em> <span>LOW</span></li>
																	<li class="x-num-axis type3"><em class="num">2</em>
																		<span>LOW</span></li>
																	<li class="x-num-axis type3"><em class="num">3</em>
																		<span>LOW</span></li>
																	<li class="x-num-axis type3"><em class="num">4</em>
																		<span>LOW</span></li>
																	<li class="x-num-axis type3"><em class="num">5</em>
																		<span>LOW</span></li>
																	<li class="y-num-axis type3"><em class="num">2</em>
																		<span>LOW</span></li>
																	<li class="type3"><em class="num">4</em> <span>LOW</span>
																	</li>
																	<li class="type3"><em class="num">6</em> <span>MEDIUM</span>
																	</li>
																	<li><em class="num">8</em> <span>MEDIUM</span></li>
																	<li><em class="num">10</em> <span>MEDIUM</span></li>
																	<li class="y-num-axis type3"><em class="num">3</em>
																		<span>LOW</span></li>
																	<li><em class="num">6</em> <span>MEDIUM</span></li>
																	<li><em class="num">9</em> <span>MEDIUM</span></li>
																	<li><em class="num">12</em> <span>MEDIUM</span></li>
																	<li><em class="num">15</em> <span>MEDIUM</span></li>
																	<li class="y-num-axis type3"><em class="num">4</em>
																		<span>LOW</span></li>
																	<li><em class="num">8</em> <span>MEDIUM</span></li>
																	<li><em class="num">12</em> <span>MEDIUM</span></li>
																	<li><em class="num">16</em> <span>MEDIUM</span></li>
																	<li><em class="num">20</em> <span>MEDIUM</span></li>
																	<li class="y-num-axis type3"><em class="num">5</em>
																		<span>LOW</span></li>
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
						<button class="btn-style5" id="MODIFY_BTN">
							<i class=" las la-redo-alt"></i><span class="name"><spring:message code="button.collect" /></span>
						</button>
						<button class="btn-style4" id="PRINT_BTN">
							<i class=" las la-print"></i><span class="name"><spring:message code="button.print" /></span>
						</button>
						<button class="btn-style3" onclick="goList()">
							<i class=" las la-reply"></i><span class="name"><spring:message code="button.back" /></span>
						</button>
					</div>
				</div>
				<!-- // right area -->
			</div>
		</section>
	</div>
</main>
<script src="${ctxPath}/script/license/tsk_0202.js?cachebuster=" + new
	Date().getTime()></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
	<script src="${ctxPath}/script/sys/sys-element.js"></script>
<script>
	$(document).ready(function() {
		tsk_0202();
		setRisk();
		makeEmpData(1, '${DATA.MANAGER}');
		makeEmpData(2, '${DATA.PARTICIPANTS}');
		makeProtectiveEquipmentData();
	});
	
	
	function setRisk(){
		var list = ${DATA.RISK_ASSESSMENT};
		jQuery(list).each(function(i, item){
			var index= i+1;
			$('#FREQ-'+index).val(item.FREQ);
			$('#RES-'+index).val(item.RES);
			$('#RSK-'+index).val(item.RSK);
		})
	}
	
	async function makeEmpData(type, strId){
		var emp = await getEmps(strId);
				   
		if(type == 1){
			$('ul#id_ul_responsible').html('');
			var sample = drawLiEmp(emp[0]);
			$('ul#id_ul_responsible').append(sample);
		}else{
			$('ul#id_ul_participants').html('');
			emp.forEach((e) => {
				var sample = drawLiEmp(e);	
				$('ul#id_ul_participants').append(sample);
			});
		}
	}
	
	function drawLiEmp(emp){
		var sample = '';
		if(emp.EMP_NAME){
			sample = '<li>'
				   +	'<span class="badge-custom8">'
				   +		'<i class="number">'+emp.RN+'</i>'
				   +		'<span class="txt-inner">'
				   +			'<em class="company">'+emp.COMPANY_NAME+'</em>'
				   +			'<em class="name">'+emp.EMP_NAME+'</em>'
	               +			'<em class="position">'+emp.DUTY_NAME+'</em>'
				   +		'</span>'
				   +	'</span>'
				   + '</li>';
		}
			   
		return sample
	}
	
	async function makeProtectiveEquipmentData(){
		$('ul#id_ul_tool_lst').html('');
		var infos = await getPersEquipmentInfo("${DATA.TOOL_LIST}");
		infos.forEach((e) => {
			var sample = '<li>'
					   + 	'<span class="badge-custom4">'+e.COMM_NM+'</span>'
					   + '</li>';
			
			
			$('ul#id_ul_tool_lst').append(sample);
		});
	}
	
</script>