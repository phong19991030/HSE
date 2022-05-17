<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<input type="hidden" id="EMP_HEALTH_ID" name="EMP_HEALTH_ID" value="${DATA.EMP_HEALTH_ID}" />
<input type="hidden" id="HEALTH_CHECK_FILE" name="HEALTH_CHECK_FILE" value="${DATA.HEALTH_CHECK_FILE}" />
<input type="hidden" id="FLE_NM" name="FLE_NM" value="${DATA.FLE_NM}" />
<main id="content" class="health-page">
	<div class="container">
		<section class="hdSection">
			<!-- tit-wrap -->
			<div class="tit-wrap">
				<div class="tit-left">
					<h1 class="heading1"><spring:message code="hea.hea_000202.title.health"/></h1>
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
						<h2 class="heading4"><spring:message code="hea.hea_0002.title.health_2" /></h2>

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
										<th scope="row"><spring:message code="hea.hea_0002.label.empName"/></th>
										<td>${DATA.EMP_NAME}</td>
										<th scope="row"><spring:message code="hea.hea_0002.label.duty"/></th>
										<td>${DATA.COMM_NM}</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="hea.hea_0002.label.height"/></th>
										<td>${DATA.HEIGHT}</td>
										<th scope="row"><spring:message code="hea.hea_0002.label.weight"/></th>
										<td>${DATA.WEIGHT}</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="hea.hea_0002.label.eye"/></th>
										<td><spring:message code="hea.hea_0002.label.leftEye"/> ${DATA.LEFT_EYE} / <spring:message code="hea.hea_0002.label.rightEye"/> ${DATA.RIGHT_EYE}</td>
										<th scope="row"><spring:message code="hea.hea_0002.label.bp"/></th>
										<td><spring:message code="hea.hea_0002.label.sbp"/> ${DATA.SBP} / <spring:message code="hea.hea_0002.label.dbp"/> ${DATA.DBP}</td>
									</tr>
									<tr>
										<th scope="row"><spring:message code="hea.hea_0002.label.diseases"/></th>
										<!-- <td colspan="3">${DATA.DISEASES}</td> -->
                    <tr>
                      <th scope="row">
                        <spring:message code="hea.hea_0002.label.diseases" />
                      </th>
                      <td colspan="3">
                        <!-- 2022-04-25 add (@smlee) -->
                        <div class="staff-info-area">
                          <div class="base-table">
                            <table>
                              <colgroup>
                                <col style="width: 4%" />
                                <col style="width: 29%" />
                                <col style="width: 24%" />
                                <col style="width: 43%" />
                              </colgroup>
                              <thead>
                                <tr>
                                  <th scope="col">No</th>
                                  <th scope="col">질병 명</th>
                                  <th scope="col">치료 여부</th>
                                  <th scope="col">기간</th>
                                </tr>
                              </thead>
                              <tbody id="DISEASE_ROWS">
                                <!-- <tr>
                                  <td>1</td>
                                  <td></td>
                                  <td></td>
                                  <td><span class="hyphen">~</span></td>
                                </tr> -->
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
									</tr>
									<tr>
										<th scope="row"><spring:message code="hea.hea_0002.label.healthCheckFile" /></th>
										<td colspan="3">
											<div class="download-box-area custom">
                        <ul id="id_lst_retirement" style="padding-right: 10px;">
                          <c:forEach items="${DATA.HEALTH_FILES}" var="file" varStatus="loop">
                            <c:if test="${file.FILE_TYPE eq 'HEALTH'}">
                              <li tmpFileId="${file.FILE_ID}" tmpFileNm="${file.FLE_NM}" onclick="downloadfileFunc(this)" style="cursor:pointer">
                                <div class="file-wrap">
                                  <span class="file-info">
                                    <em class="name">${file.FLE_NM}</em>
                                  </span>
                                  <span class="bottom-info">
                                    <em class="date">${file.FILE_INS_DATE}</em>
                                    <em>${file.FLE_SZ}</em>
                                  </span>
                                </div>
                                <button class="download-btn" tmpFileId="${file.FILE_ID}" tmpFileNm="${file.FLE_NM}" onclick="downloadfileFunc(this)"></button>
                                <!-- <button class="remove-btn" tmpEduFileId="${fileRetirement.EDU_FILE_ID}" tmpFileId="${fileRetirement.FILE_ID}" 
                                      tmpFileNm="${fileRetirement.FLE_NM}" tmpFilePath="${fileRetirement.FLE_PATH}" onclick="removeRetirementFunc(this)"></button> -->
                              </li>
                            </c:if>
                          </c:forEach>
                        </ul>
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
						<button class="btn-style2" id="MODIFY_BTN">
							<i class="las la-eraser"></i><span class="name"><spring:message code="button.modify" /></span>
						</button>
						<button class="btn-style5" id="DELETE_BTN">
							<i class="las la-trash-alt"></i><span class="name"><spring:message code="button.delete" /></span>
						</button>
						<button class="btn-style4" id="PRINT_BTN">
							<i class="las la-print"></i><span class="name"><spring:message code="button.print" /></span>
						</button>
					</div>
				</div>
				<!-- // right area -->
			</div>
		</section>
	</div>
</main>

<script src="${ctxPath}/script/hea/hea_000202.js"></script>
<script src="${ctxPath}/script/com/com-element.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>

<script>
	$(document).ready(function() {
		hea_000202();
    diseaseFunction('${DATA.DISEASES}');
	});
</script>
