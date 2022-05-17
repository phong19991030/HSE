<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%
request.setCharacterEncoding("UTF-8");
%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<input type="hidden" id="ACCIDENT_ID" name="ACCIDENT_ID"
	value="${DATA.ACCIDENT_ID}">

<main id="content" class="safety-page">
      <div class="container">
        <section class="hdSection">
          <!-- tit-wrap -->
          <div class="tit-wrap">
            <div class="tit-left">
              <h1 class="heading1"><spring:message code="sft.sft_0300.label.subTittleView" /></h1>
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
                <h2 class="heading4">사고 정보</h2>

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
                        <th scope="row">문서번호</th>
                        <td colspan="3" id="DOC_NO">${DATA.DOC_NO}</td>
                      </tr>
                      <tr>
                        <th scope="row"><spring:message code="sft.sft_0300.label.REPORT_NAME" /></th>
                        <td colspan="3" id="REPORT_NAME">${DATA.REPORT_TYPE_NM}</td>
                      </tr>
                      <tr>
                        <th scope="row"><spring:message code="sft.sft_0300.label.ACCIDENT_NAME" /></th>
                        <td colspan="3" id="NAME_OF_INJURED">${DATA.ACCIDENT_NAME}</td>
                      </tr>
                      <tr>
                        <th scope="row"><spring:message code="sft.sft_0300.label.accidentPerson" /></th>
                        <td colspan="3" id="NAME_OF_INJURED">${DATA.EMP_NAME_OF_INJURED}</td>
                      </tr>
                      <tr>
                        <th scope="row"><spring:message code="sft.sft_0300.label.PROJECT_NAME" /></th>
                        <td colspan="3" id="PROJECT_NAME">${DATA.PROJECT_NAME}</td>
                      </tr>
                      <tr>
                        <th scope="row"><spring:message code="sft.sft_0300.label.WRITER" /></th>
                        <td><span id="WRITER">${DATA.WRITER_NAME}</span>
                        <th scope="row"><spring:message code="sft.sft_0300.label.EMP_NO_INVOLVE" /></th>
                        <input hidden id="EMP_NO_INVOLVE" value="${DATA.EMP_NO_INVOLVE}"/>
                        <td id="EMP_NAME_INVOLVE"></td>
                      </tr>
                      <tr>
                        <th scope="row"><spring:message code="sft.sft_0300.label.ACCIDENT_DATE" /></th>
                        <td id="ACCIDENT_DATE">${DATA.ACCIDENT_DATE}<i>&nbsp;</i>${DATA.ACCIDENT_DATE_TIME}</td>
                        <td colspan="3">
                          
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><spring:message code="sft.sft_0300.label.PLACE" /></th>
                        <td id="PLACE">${DATA.PLACE}</td>
                        <th scope="row"><spring:message code="sft.sft_0300.label.PLACE_DETAIL" /></th>
                        <td id="PLACE_DETAIL">${DATA.PLACE_DETAIL}</td>
                      </tr>
                      <tr>
                        <th scope="row"><spring:message code="sft.sft_0300.label.injuredPersons" /></th>
                        <td id="EMP_NO_INJURED"></td>
                        <input hidden id="id_EMP_NAME_INJURED" value="${DATA.EMP_NO_INJURED}"/>
                        <input hidden id="id_OTHER_PEOPLE_INJURED" value="${DATA.OTHER_PEOPLE_INJURED}"/>
                        <th scope="row"><spring:message code="sft.sft_0300.label.INJURED_AREA" /></th>
                        <td id="INJURED_AREA">
                        	<c:if test="${DATA.INJURED_AREA_LST.size() > 0}">
		                      	<c:forEach items="${DATA.INJURED_AREA_LST}" var="item" varStatus="status">
		                      		<div>${item}</div>
		                      	</c:forEach>
	                      	</c:if>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><spring:message code="sft.sft_0300.label.ACCIDENT_DETAIL" /></th>
                        <td colspan="3" id="ACCIDENT_DETAIL">
                        	<c:if test="${DATA.ACCIDENT_DETAIL_LST.size() > 0}">
		                      	<c:forEach items="${DATA.ACCIDENT_DETAIL_LST}" var="item" varStatus="status">
		                      		<div>${item}</div>
		                      	</c:forEach>
	                      	</c:if>
	                     </td>
                      </tr>
                      <tr>
                        <th scope="row"><spring:message code="sft.sft_0300.label.FILE_NM" /></th>
                        <td colspan="3">
                          <div class="view-img-box" style="display: flex;">
		                          	<c:forEach items="${DATA.ACCIDENT_FILES}" var="fileImg" varStatus="loop">
		                          		<c:if test="${fileImg.FILE_TYPE eq 'IMG'}">
			                            	<img class="cls_img_${fileImg.FILE_ID}"  src="${ctxPath}/util/upload/imageView/${fileImg.FILE_ID}" alt="예시 이미지">
			                            	<input id="id_inpFileId" value="${fileImg.FILE_ID}" hidden="true"/>
		                          		</c:if>
			                      	</c:forEach>
		                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><spring:message code="sft.sft_0300.label.ACTION" /></th>
                        <td colspan="3" id="ACTION">
                        	<c:if test="${DATA.ACTION_LST.size() > 0}">
		                      	<c:forEach items="${DATA.ACTION_LST}" var="item" varStatus="status">
		                      		<div>${item}</div>
		                      	</c:forEach>
	                      	</c:if>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><spring:message code="sft.sft_0300.label.PREVENTION_PLAN" /></th>
                        <td colspan="3" id="PREVENTION_PLAN">
                        	<c:if test="${DATA.PREVENTION_PLAN_LST.size() > 0}">
		                      	<c:forEach items="${DATA.PREVENTION_PLAN_LST}" var="item" varStatus="status">
		                      		<div>${item}</div>
		                      	</c:forEach>
	                      	</c:if>
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
                <button class="btn-style5" id="DELETE_BTN">
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

<script src="${ctxPath}/script/safety/safety_0302.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>
	var param = '${DATA}';

	$(document).ready(function() {
		safety_0302();
	});
</script>