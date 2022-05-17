<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%
request.setCharacterEncoding("UTF-8");
%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<input type="hidden" id="LICENSE_ID" name="LICENSE_ID" value="${DATA.LICENSE_ID}">
<main id="content" class="work-page">
      <div class="container">
        <section class="hdSection">
          <!-- tit-wrap -->
          <div class="tit-wrap">
            <div class="tit-left">
              <h1 class="heading1">작업 허가 관리 상세</h1>
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
                </div>

                <ul class="approval-view--line">
                  <!-- D : li class="approval" -> "결재 승인" style is applied. -->
                  <li class="approval">
                    <p class="state">결재승인</p>
                    <div class="box">
                      <div class="info-wrap">
                        <span class="info">
                          <em class="team">윈디텍(주)</em>
                          <em class="name">장길동</em>
                          <em class="position">과장</em>
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
                        <em>2021.06.01</em>
                        <em>09:16</em>
                      </p>
                    </div>
                  </li>
                  <li>
                    <p class="state">결재대기</p>
                    <div class="box">
                      <div class="info-wrap">
                        <span class="info">
                          <em class="team">윈디텍(주)</em>
                          <em class="name">곽길동</em>
                          <em class="position">팀장</em>
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
                        <span class="info">
                          <em class="team">운영사 A</em>
                          <em class="name">채길동</em>
                          <em class="position">부장</em>
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
                <h2 class="heading4">작업 정보</h2>

                <div class="base-table custom-table3">
                  <table>
                    <caption></caption>
                    <colgroup>
                      <col style="width: 11%;">
                      <col style="width: auto;">
                      <col style="width: 5%;">
                      <col style="width: auto;">
                    </colgroup>
                    <tbody>
                    	<tr>
                        <th scope="row"><spring:message code="license.tsk_0100.label.docNo" /></th>
                        <td colspan="3">${DATA.DOC_NO}</td>
                      </tr>
                      <tr>
                        <th scope="row"><spring:message code="license.tsk_0100.label.ProjectName" /></th>
                        <td colspan="3">${DATA.PROJECT_NAME}</td>
                      </tr>
                      <tr>
                        <th scope="row"><spring:message code="license.tsk_0100.label.workDate" /></th>
                        <td colspan="3">${DATA.WORK_DATE}</td>
                      </tr>
                      <tr>
                    	<th scope="row" id=thLicenseWork><spring:message code="license.tsk_0100.label.workContentsAndProcedures" /></th>
                    	<c:forEach items="${DATA.LICENSE_WORK}" var="work" varStatus="status">
                    	<tr>
                    		<td class="blank bm-none"></td>
							<th scope="row" rowspan="2">작업${work.RN}</th>
                        	<td rowspan="2">
                        		<p class="black f-bolder">${work.WORKER}</p>
	                          <p class="black f-bolder">${work.WORK_CONTENT}</p>
	                          <div class="mgt10">
	                           ${work.WORK_PROCEDURE}
	                          </div>
                        	</td>
                        </tr>
                        <tr>
                        <td class="blank bm-none"></td>
                      </tr>
                   	    </c:forEach>
                      <tr>
                      <tr>
                        <th scope="row"><spring:message code="license.tsk_0100.label.responsible" /></th>
                        <td colspan="3">
                          ${DATA.RESPONSIBLE_NM}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><spring:message code="license.tsk_0100.label.Participants" /></th>
                        <td colspan="3" id="PARTICIPANT">
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><spring:message code="license.tsk_0100.label.personalProtectiveEquipment" /></th>
                        <td colspan="3" id="PROTECTIVE_EQUIPMENT">
                          
                        </td>
                      </tr>
                      <tr>
                    			<th scope="row"><spring:message code="license.tsk_0100.label.toolsEquipment" /></th>
                    			<td colspan="3">
                    				<ul>
                    					<c:forEach items="${DATA.LICENSE_TOOL}" var="tool" varStatus="status">
                    						<li>
				                              <span class="txt">${tool.TOOL_NM}</span>
				                              |
				                              <span class="txt">${tool.TOOL_CONTENT}</span>
				                            </li>
                    					</c:forEach>
			                        </ul>
                    			</td>
                    		</tr>
                      
                      <tr>
                        <th scope="row"><spring:message code="license.tsk_0100.label.MaterialsAndConsumables" /></th>
                        <td colspan="3">${DATA.MATERIAL_CONSUMABLE_NM}</td>
                      </tr>
                      <%-- <tr>
                        <th scope="row"><spring:message code="license.tsk_0100.label.conductRiskAsseessment" /></th>
                        <td colspan="3">${DATA.RISK_ASSESSMENT_NM}</td>
                      </tr> --%>
                      <tr>
                        <th scope="row"><spring:message code="license.tsk_0100.label.reviewConfirm" /></th>
                        <td colspan="3">
                          <p class="black f-bolder">${DATA.WORK_TYPE_NM}</p>
                          <div class="view-form mgt10">
                            <div class="base-table">
                              <table>
                                <caption></caption>
                                <colgroup>
                                  <col style="width: 4%;">
                                  <col style="width: 32%;">
                                  <col style="width: 17%;">
                                  <col style="width: 30%;">
                                  <col style="width: 17%;">
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th scope="col" class="txt-center"><spring:message code="hea.label.no"/></th>
                                    <th scope="col">PTW승인시 검토사항</th>
                                    <th scope="col" class="txt-center">검토</th>
                                    <th scope="col">실제 작업 수행 시 확인사항</th>
                                    <th scope="col" class="txt-center">검토</th>
                                  </tr>
                                </thead>
                                <tbody id="ROW_CHECKLIST">
                                 
                                </tbody>
                              </table>
                            </div>
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
                <button class="btn-style2" id="MODIFY_BTN" >
                  <i class="las la-eraser"></i><span class="name"><spring:message code="button.modify" /></span>
                </button>
                <button class="btn-style5" id="DELETE_BTN" >
                  <i class="las la-trash-alt"></i><span class="name"><spring:message code="button.delete" /></span>
                </button>
                <button class="btn-style4" >
                  <i class="las la-print"></i><span class="name"><spring:message code="button.print" /></span>
                </button>
              </div>
            </div>
            <!-- // right area -->
          </div>
        </section>
      </div>
    </main>
    <script src="${ctxPath}/script/license/tsk_0102.js?cachebuster=" + new Date().getTime()></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script>
	$(document).ready(function() {
		tsk_0102();
	});
</script>