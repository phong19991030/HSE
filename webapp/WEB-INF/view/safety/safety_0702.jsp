<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<input type="hidden" id="SAFE_CHECK_ID" name="SAFE_CHECK_ID" value="${DATA.SAFE_CHECK_ID}">


<main id="content" class="safety-page">
  <div class="container">
    <section class="hdSection">
      <!-- tit-wrap -->
      <div class="tit-wrap">
        <div class="tit-left">
          <h1 class="heading1"><spring:message code="sft.sft_0700.label.detail" /></h1>
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
          <!-- //approval-view -->

          <article class="view-form">
            <h2 class="heading4"><spring:message code="sft.sft_0700.label.info" /></h2>

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
                    <th scope="row"><spring:message code="safety.safety_0701.label.projectName"/></th>
                    <td id="PROJECT_NAME" colspan="3"></td>
                  </tr>
                  <tr>
                    <th scope="row"><spring:message code="safety.safety_0701.label.safetyChecker"/></th>
                    <td id="CHECKER"></td>
                    <th scope="row"><spring:message code="safety.safety_0701.label.safetyCheckDate"/></th>
                    <td id="CHECK_DATE"></td>
                  </tr>
                  <tr>
                    <th scope="row">문서번호</th>
                    <td id="DOC_NO" colspan="3"></td>
                  </tr>
                  <tr>
                    <th scope="row"><spring:message code="safety.safety_0701.label.generalManagement"/></th>
                    <td id="COMMON_CHECK"></td>
                    <th scope="row"><spring:message code="safety.safety_0701.label.healthCare"/></th>
                    <td id="HEALTH_CHECK"></td>
                  </tr>
                  <tr>
                    <th scope="row"><spring:message code="safety.safety_0701.label.safetyManagement"/></th>
                    <td id="SAFETY_CHECK"></td>
                    <th scope="row"><spring:message code="safety.safety_0701.label.taskManagement"/></th>
                    <td id="WORKING_CHECK"></td>
                  </tr>
                  <tr>
                    <th scope="row"><spring:message code="safety.safety_0701.label.environmentalManagement"/></th>
                    <td id="ENVIROMENT_CHECK" colspan="3"></td>
                  </tr>
                  <tr>
                    <th scope="row"><spring:message code="safety.safety_0702.label.checkList"/></th>
                    <td colspan="3">
                      <table class="base-table mgvertical10">
                        <colgroup>
                          <col style="width: 5%;">
                          <col style="width: 15%;">
                          <col style="width: 30%;">
                          <col style="width: 35%;">
                          <col style="width: 15%;">
                        </colgroup>
                        <thead>
                          <tr>
                            <th scope="col"><spring:message code="hea.label.no"/></th>
                            <th scope="col"><spring:message code="safety.safety_0702.label.division"/></th>
                            <th scope="col"><spring:message code="safety.safety_0702.label.Checking"/></th>
                            <th scope="col"><spring:message code="safety.safety_0702.label.Error"/></th>
                            <th scope="col" class="txt-center"><spring:message code="safety.safety_0702.label.Action"/></th>
                          </tr>
                        </thead>
                        <tbody id="ROW_LIST"> 
                          <!-- <tr>
                            <td>01</td>
                            <td>직원 정보 관리</td>
                            <td>안전교육을 이수하였나?</td>
                            <td>지적 사항은 이것입니다.</td>
                            <td class="txt-center">
                              <span class="green">YES</span>
                            </td>
                          </tr>
                          <tr>
                            <td>02</td>
                            <td>직원 건강 관리</td>
                            <td>직원건강관리 건강검진표를 제출하였나?</td>
                            <td>지적 사항은 이것입니다.</td>
                            <td class="txt-center">
                              <span class="red">NO</span>
                            </td>
                          </tr>
                          <tr>
                            <td>03</td>
                            <td>작업공구 및 장비 관리</td>
                            <td>작업공구 및 장비 관리 장비의 불량이 있는지 확인하였나?</td>
                            <td>지적 사항은 이것입니다.</td>
                            <td class="txt-center">
                              <span class="green">YES</span>
                            </td>
                          </tr>
                          <tr>
                            <td>04</td>
                            <td>개인보호장비</td>
                            <td>개인보호장비의 불량이 있는지 확인하였나?</td>
                            <td>지적 사항은 이것입니다.</td>
                            <td class="txt-center">
                              <span class="red">NO</span>
                            </td>
                          </tr>
                          <tr>
                            <td>05</td>
                            <td>법정의무교육</td>
                            <td>법정의무교육을 이수하였나?</td>
                            <td>지적 사항은 이것입니다.</td>
                            <td class="txt-center">
                              <span class="green">YES</span>
                            </td>
                          </tr>
                          <tr>
                            <td>06</td>
                            <td>안전관리조직도</td>
                            <td>안전관리조직도에 따른 역할을 숙지하였나?</td>
                            <td>지적 사항은 이것입니다.</td>
                            <td class="txt-center">
                              <span class="red">NO</span>
                            </td>
                          </tr>
                          <tr>
                            <td>07</td>
                            <td>위험성평가관리</td>
                            <td></td>
                            <td>지적 사항은 이것입니다.</td>
                            <td class="txt-center">
                              <span class="green">YES</span>
                            </td>
                          </tr> -->
                        </tbody>
                      </table>

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

<script src="${ctxPath}/script/safety/safety_0702.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>	
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>

	var param = '${DATA}';
	
	$(document).ready(function(){
		safety_0702();
	});
</script>