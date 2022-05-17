<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage=""%>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>


<input type="hidden" id="SAFE_MGT_ORG_ID" name="SAFE_MGT_ORG_ID" value="${DATA.SAFE_MGT_ORG_ID}">
<main id="content" class="safety-page">
  <div class="container">
    <section class="hdSection">
      <!-- tit-wrap -->
      <div class="tit-wrap">
        <div class="tit-left">
          <h1 class="heading1"><spring:message code="sft.sft_0600.label.title.detail" /></h1>
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
            <h2 class="heading4"><spring:message code="sft.sft_0600.label.info" /></h2>

            <div class="base-table custom-table3">
              <table>
                <caption></caption>
                <colgroup>
                  <col style="width: 11%;">
                  <col style="width: auto;">
                  <col style="width: 11%;">
                  <col style="width: auto;">
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">문서번호</th>
                    <td class="blank"></td>
                    <td id="DOC_NO" colspan="2"></td>
                  </tr>
                  <tr>
                    <th scope="row"><spring:message code="sft.sft_0600.label.Project_name" /></th>
                    <td class="blank"></td>
                    <td id="PROJECT_NAME" colspan="2"></td>
                  </tr>
                  <tr>
                    <th scope="row"><spring:message code="sft.sft_0600.label.Invester" /></th>
                    <td class="blank"></td>
                    <td id="INVESTOR" colspan="2"></td>
                  </tr>
                  <tr>
                    <th scope="row" rowspan="5">
                      <spring:message code="sft.sft_0600.label.Organization_chart_1" /></th>
                    <td class="blank bm-none"></td>
                    <th scope="row"><spring:message code="sft.sft_0600.label.Chief_Safety_Officer" /></th>
                    <td colspan="3">
                      <span id="CSO"></span>
                      <em class="devide-line"></em>
                      <span id="CSO_JOB"></span>
                    </td>
                  </tr>
                  <tr>
                    <td class="blank bm-none"></td>
                    <th scope="row"><spring:message code="sft.sft_0600.label.field_agent" /></th>
                    <td colspan="3">
                      <span id="FIELD_AGENT"></span>
                      <em class="devide-line"></em>
                      <span id="FIELD_AGENT_JOB"></span>
                    </td>
                  </tr>
                  <tr>
                    <td class="blank bm-none"></td>
                    <th scope="row"><spring:message code="sft.sft_0600.label.safety_manager" /></th>
                    <td colspan="3">
                      <span id="SAFETY_MANAGER"></span>
                      <em class="devide-line"></em>
                      <span id="SAFETY_MANAGER_JOB"></span>
                    </td>
                  </tr>
                  <tr>
                    <td class="blank bm-none"></td>
                    <th scope="row"><spring:message code="sft.sft_0600.label.material_manager" /></th>
                    <td colspan="3">
                      <span id="MATERIAL_MANAGER"></span>
                      <em class="devide-line"></em>
                      <span id="MATERIAL_MANAGER_JOB"></span>
                    </td>
                  </tr>
                  <tr>
                    <td class="blank"></td>
                    <th scope="row"><spring:message code="sft.sft_0600.label.Field_Management_Officer" /></th>
                    <td colspan="3">
                      <span id="SITE_MANAGER"></span>
                      <em class="devide-line"></em>
                      <span id="SITE_MANAGER_JOB"></span>
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


<script src="${ctxPath}/script/safety/safety_0602.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>	
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>

	var param = '${DATA}';
	
	$(document).ready(function(){
		safety_0602();
	});
</script>