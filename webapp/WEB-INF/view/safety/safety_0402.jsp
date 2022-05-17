<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%
request.setCharacterEncoding("UTF-8");
%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<input type="hidden" id="ERP_ID" name="ERP_ID" value="${DATA.ERP_ID}">

<main id="content" class="safety-page">
      <div class="container">
        <section class="hdSection">
          <!-- tit-wrap -->
          <div class="tit-wrap">
            <div class="tit-left">
              <h1 class="heading1"><spring:message code="sft.sft_0400.label.subTittleView" /></h1>
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
                <h2 class="heading4">비상 대응 계획 정보</h2>

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
                        <th scope="row"><spring:message code="txt.doc.no" /></th>
                        <td class="blank"></td>
                        <td colspan="2" id="DOC_NO">${DATA.DOC_NO}</td>
                      </tr>
                      <tr>
                        <th scope="row"><spring:message code="sft.sft_0400.label.PROJECT_NAME" /></th>
                        <td class="blank"></td>
                        <td colspan="2" id="PROJECT_NAME">${DATA.PROJECT_NAME}</td>
                      </tr>
                      <tr>
                        <th scope="row"><spring:message code="sft.sft_0400.label.WRITER" /></th>
                        <td class="blank"></td>
                        <td colspan="2"><span id="WRITER">${DATA.WRITER_NAME}</span></td>
                      </tr>
                      <tr>
                        <th scope="row" rowspan="5"><spring:message code="sft.sft_0400.label.contact" /></th>
                        <td class="blank bm-none"></td>
                        <th scope="row"><spring:message code="sft.sft_0400.label.EMERGENCY_PHONE" /></th>
                        <td colspan="3" id="EMERGENCY_PHONE">${DATA.EMERGENCY_PHONE}</td>
                      </tr>
                      <tr>
                        <td class="blank"></td>
                        <th scope="row"><spring:message code="sft.sft_0400.label.SITE_REPRESENT_PHONE" /></th>
                        <td colspan="3" id="SITE_REPRESENT_PHONE">${DATA.SITE_REPRESENT_PHONE}</td>
                      </tr>
                      <tr>
                        <td class="blank"></td>
                        <th scope="row"><spring:message code="sft.sft_0400.label.SAFE_OFFICER_PHONE" /></th>
                        <td colspan="3" id="SAFE_OFFICER_PHONE">${DATA.SAFE_OFFICER_PHONE}</td>
                      </tr>
                      <tr>
                        <td class="blank"></td>
                        <th scope="row"><spring:message code="sft.sft_0400.label.FIELD_REPRESENT_PHONE" /></th>
                        <td colspan="3" id="FIELD_REPRESENT_PHONE">${DATA.FIELD_REPRESENT_PHONE}</td>
                      </tr>
                      <tr>
                        <td class="blank"></td>
                        <th scope="row"><spring:message code="sft.sft_0400.label.OTHER_CONTACTS" /></th>
                        <td colspan="3" id="OTHER_CONTACTS">${DATA.OTHER_CONTACTS}</td>
                      </tr>
                      <tr>
                        <th scope="row"><spring:message code="sft.sft_0400.label.EXPECTED_EMERGENCY" /></th>
                        <td class="blank"></td>
                        <td colspan="2" id="EXPECTED_EMERGENCY">
                        	<c:if test="${DATA.EXPECTED_EMERGENCY_LST.size() > 0}">
		                      	<c:forEach items="${DATA.EXPECTED_EMERGENCY_LST}" var="item" varStatus="status">
		                      		<div>${item}</div>
		                      	</c:forEach>
	                      	</c:if>
                      	</td>
                      </tr>
                      <tr>
                        <th scope="row"><spring:message code="sft.sft_0400.label.PROCEDURE_ACTION" /></th>
                        <td class="blank"></td>
                        <td colspan="2" id="PROCEDURE_ACTION">
	                        <c:if test="${DATA.PROCEDURE_ACTION_LST.size() > 0}">
	                        	<c:forEach items="${DATA.PROCEDURE_ACTION_LST}" var="item" varStatus="status">
	                        		<div>${item}</div>
	                        	</c:forEach>
	                        </c:if>
                        </tr>
                      <tr>
                        <th scope="row" rowspan="2"><spring:message code="sft.sft_0400.label.EVACUATION_ROUTE" /></th>
                        <td class="blank bm-none"></td>
                        <th scope="row">주소</th>
                        <td colspan="3">
                          <span id="EVACUATION_ROUTE1">${DATA.EVACUATION_ROUTE1}</span>
                          <em class="devide-line"></em>
                          <span id="EVACUATION_ROUTE2">${DATA.EVACUATION_ROUTE2}</span>
                        </td>
                      </tr>
                      
                      <tr>
                        <td class="blank"></td>
                        <th scope="row">사진</th>
                        <td colspan="3">
                          <div class="view-img-box" style="display: flex;">
		                          	<c:forEach items="${DATA.EMERGENCY_FILES}" var="fileImg" varStatus="loop">
		                          		<c:if test="${fileImg.FILE_TYPE eq 'IMG'}">
			                            	<img class="cls_img_${fileImg.FILE_ID}"  src="${ctxPath}/util/upload/imageView/${fileImg.FILE_ID}" alt="예시 이미지">
			                            	<input id="id_inpFileId" value="${fileImg.FILE_ID}" hidden="true"/>
		                          		</c:if>
			                      	</c:forEach>
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


<script src="${ctxPath}/script/safety/safety_0402.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>
	var param = '${DATA}';
	var aaa = '${EMERGENCY_FILES}';
	console.log(aaa);
	$(document).ready(function() {
		safety_0402();
	});
</script>