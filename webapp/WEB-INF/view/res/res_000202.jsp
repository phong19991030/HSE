<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%
request.setCharacterEncoding("UTF-8");
%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<input type="hidden" id="WASTE_ID" name="WASTE_ID" value="${DATA.WASTE_ID}"></input>

<main id="content" class="environ-page">
  <div class="container">
    <section class="hdSection">
      <!-- tit-wrap -->
      <div class="tit-wrap">
        <div class="tit-left">
          <h1 class="heading1"><spring:message code="res.res_000202.label.title" /></h1>
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

          <article class="view-form">
            <h2 class="heading4"><spring:message code="res.res_000202.label.titleinfo" /></h2>
            <div class="base-table">
              <table>
                <caption></caption>
                <colgroup>
                  <col style="width: 11%;">
                  <col style="width: auto;">
                  <col style="width: 11%;">
                  <col style="width: auto;">
                  <col style="width: 11%;">
                  <col style="width: auto;">
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row"><spring:message code="res.res_000202.label.Project_name" /></th>
                    <td colspan="5">${DATA.PROJECT_NAME}</td>
                  </tr>
                  <tr>
                    <th scope="row"><spring:message code="res.res_000202.label.Disposal_date" /></th>
                    <td colspan="5">${DATA.DISPOSAL_DATE}</td>
                  </tr>
                  <tr>
                    <th scope="row"><spring:message code="res.res_000202.label.manager" /></th>
                    <td colspan="5">${DATA.MANAGER_NAME}</td>
                  </tr>
                  <tr>
                    <th scope="row"><spring:message code="res.res_000202.label.Waste_type" /></th>
                    <td colspan="5">${DATA.WASTE_TYPE}</td>
                  </tr>
                  <tr>
                    <th scope="row"><spring:message code="res.res_000202.label.waste_generation" /></th>
                    <td>${DATA.WASTE_GENERATION}</td>
                    <th scope="row"><spring:message code="res.res_000202.label.self-throughput" /></th>
                    <td>${DATA.SELF_THROUGHPUT}</td>
                    <th scope="row"><spring:message code="res.res_000202.label.Consignment_Throughput" /></th>
                    <td>${DATA.CONSIGNMENT_THROUGHPUT}</td>
                  </tr>
                  <tr>
                    <th scope="row"><spring:message code="res.res_000202.label.License_or_not" /></th>
                    <td colspan="5">${DATA.LICENSE}</td>
                  </tr>
                  <tr>
                    <th scope="row"><spring:message code="res.res_000202.label.image" /></th>
                    <td colspan="5">
                      <div class="view-img-box" style="display: flex; min-width: 120px; max-width: 170px;">
                        <c:forEach items="${DATA.WASTE_FILES}" var="fileImg" varStatus="loop">
                          <c:if test="${fileImg.FILE_TYPE eq 'IMG'}">
                            <img style="width: 100%; height: auto;" class="cls_img_${fileImg.FILE_ID}"  src="${ctxPath}/util/upload/imageView/${fileImg.FILE_ID}" alt="예시 이미지">
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
                <button id="MODIFY_BTN" class="btn-style5">
                  <i class=" las la-redo-alt"></i><span class="name"><spring:message code="button.modify" /></span>
                </button>
                <button class="btn-style4">
                  <i class=" las la-print"></i><span class="name"><spring:message code="button.print" /></span>
                </button>
                <button  onclick="goList()" class="btn-style3">
                  <i class=" las la-reply"></i><span class="name"><spring:message code="button.back" /></span>
                </button>
              </div>
            </div>
            <!-- // right area -->
      </div>
    </section>
  </div>
</main>

<script src="${ctxPath}/script/res/res_000202.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>	
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script type="text/javascript">
	var ctx = '${CTX}';
	$(document).ready(function() { 
		res_000202();
	});
</script>
  