<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage=""%>
<%request.setCharacterEncoding("UTF-8");%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script>
	var param = '${DATA}';

	$(document).ready(function() {
		safety_0202();
	});
</script>
<input type="hidden" id="SAFE_COURSE_ID" name="SAFE_COURSE_ID"
	value="${DATA.SAFE_COURSE_ID}"></input>
<script src="${ctxPath}/script/safety/safety_0202.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<main id="content" class="safety-page">
	<div class="container">
		<section class="hdSection">
			<!-- tit-wrap -->
			<div class="tit-wrap">
				<div class="tit-left">
					<h1 class="heading1">
						<spring:message code="sft.sft_0200.label.tittleDetail" />
					</h1>
				</div>
			</div>
			<!-- //tit-wrap -->
		</section>
		<section class="contSection">
			<div class="content clearfix">

				<!-- left area -->
				<div class="left-area">

					<!-- approval-view -->
					<article class="approval-view">
						<div class="flexWrap">
							<h2 class="heading4"><spring:message code="sft.sft_0200.label.paymentLine" /></h2>
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
					<!-- //approval-view -->

					<article class="view-form">
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
										<th scope="row"><spring:message code="sft.sft_0200.label.DOC_NO" /></th>
										<td colspan="3" id="DOC_NO"></td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="sft.sft_0200.label.PROJECT_NAME" /></th>
										<td colspan="3" id="PROJECT_NAME"></td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="sft.sft_0200.label.WORK_TYPE" /></th>
										<td  id="WORK_TYPE"></td>
										<th scope="row"><spring:message code="sft.sft_0200.label.COURSE_DATE" /></th>
										<td id="COURSE_DATE"></td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="sft.sft_0200.label.PLACE" /></th>
										<td colspan="3" id="PLACE"></td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="sft.sft_0200.label.TRAINER" /></th>
										<td  id="TRAINER"></td>
										<th scope="row"><spring:message code="sft.sft_0200.label.TRAINEE" /></th>
										<td id="TRAINEE"></td>
										
									</tr>
									<tr>
										<th scope="row"><spring:message code="sft.sft_0200.label.education" /></th>
										<td colspan="3">
											<article class="view-form mgvertical10">
												<div class="base-table">
													<table>
														<colgroup>
															<col style="width: 5%;">
															<col style="width: 40%;">
															<col style="width: 15%;">
															<col style="width: 35%;">
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
						<button id="MODIFY_BTN" class="btn-style2">
	            <i class="las la-eraser"></i><span class="name"><spring:message code="button.modify" /></span>
	          </button>
	          <button  id="DELETE_BTN" class="btn-style5">
	            <i class="las la-trash-alt"></i><span class="name"><spring:message code="button.delete" /></span>
	          </button>
	          <button class="btn-style4" >
	            <i class="las la-print"></i><span class="name"><spring:message code="button.print" /></span></span>
	          </button>
					</div>
				</div>
				<!-- // right area -->
			</div>
		</section>
	</div>
</main>