<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<input type="hidden" id="EDU_ID" name="EDU_ID" value="${DATA.EDU_ID}">

<main id="content" class="safety-page">
  <div class="container">
    <section class="hdSection">
      <!-- tit-wrap -->
      <div class="tit-wrap">
        <div class="tit-left">
          <h1 class="heading1"><spring:message code="sft.sft_0500.label.title.detail"/></h1>
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
            <h2 class="heading4"><spring:message code="sft.sft_0500.label.title.info"/></h2>

            <div class="base-table custom-table3">
              <table>
                <caption></caption>
                <colgroup>
                  <col style="width: 11%;">
                  <col style="width: auto;">
                  <col style="width: 11%;">
                  <col style="width: 25%;">
                  <col style="width: 11%;">
                  <col style="width: auto;">
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row"><spring:message code="sft.sft_0500.label.EMP_NAME"/></th>
                    <td class="blank"></td>
                    <td id="EMP_NAME" colspan="2"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.DUTY_NAME"/></th>
                    <td id="DUTY_NAME"></td>
                  </tr>
                  <tr>
                    <th scope="row" rowspan="2"><spring:message code="sft.sft_0500.label.SHP_EDU_DATE"/></th>
                    <td class="blank bm-none"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.completeDate"/></th>
                    <td id="SHP_EDU_DATE" colspan="3"></td>
                  </tr>
                  <tr>
                    <td class="blank"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.certificate"/></th>
                    <td colspan="3">
                      <div class="download-box-area custom">
                        <ul id="id_lst_shp" style="padding-right: 10px;">
                          <c:forEach items="${DATA.SHP_FILES}" var="fileShp" varStatus="loop">
                            <c:if test="${fileShp.FILE_TYPE eq 'SHP'}">
                              <li tmpFileId="${fileShp.FILE_ID}" tmpFileNm="${fileShp.FLE_NM}" onclick="downloadFileShpFunc(this)"  style="cursor:pointer">
                                <div class="file-wrap">
                                  <span class="file-info">
                                    <em class="name">${fileShp.FLE_NM}</em>
                                  </span>
                                  <span class="bottom-info">
                                    <em class="date">${fileShp.FILE_INS_DATE}</em>
                                    <em>${fileShp.FLE_SZ}</em>
                                  </span>
                                </div>
                                <button class="download-btn" tmpFileId="${fileShp.FILE_ID}" tmpFileNm="${fileShp.FLE_NM}" onclick="downloadFileShpFunc(this)"></button>
                                <!-- <button class="remove-btn" tmpEduFileId="${fileShp.EDU_FILE_ID}" tmpFileId="${fileShp.FILE_ID}" 
                                      tmpFileNm="${fileShp.FLE_NM}" tmpFilePath="${fileShp.FLE_PATH}" onclick="removeShpFunc(this)"></button> -->
                              </li>
                            </c:if>
                          </c:forEach>  
                        </ul>
                      </div>
                    </td>
                  </tr>
                  
                  <tr>
                    <th scope="row" rowspan="2"><spring:message code="sft.sft_0500.label.PIPL_EDU_DATE"/><!--<br />교육--></th>
                    <td class="blank bm-none"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.completeDate"/></th>
                    <td id="PIPL_EDU_DATE" colspan="3"></td>
                  </tr>
                  <tr>
                    <td class="blank"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.certificate"/></th>
                    <td colspan="3">
                      <div class="download-box-area custom">
                        <ul id="id_lst_pipl" style="padding-right: 10px;">
                          <c:forEach items="${DATA.PIPL_FILES}" var="filePipl" varStatus="loop">
                            <c:if test="${filePipl.FILE_TYPE eq 'PIPL'}">
                              <li tmpFileId="${filePipl.FILE_ID}" tmpFileNm="${filePipl.FLE_NM}" onclick="downloadFilePiplFunc(this)"  style="cursor:pointer">
                                <div class="file-wrap">
                                  <span class="file-info">
                                    <em class="name">${filePipl.FLE_NM}</em>
                                  </span>
                                  <span class="bottom-info">
                                    <em class="date">${filePipl.FILE_INS_DATE}</em>
                                    <em>${filePipl.FLE_SZ}</em>
                                  </span>
                                </div>
                                <button class="download-btn" tmpFileId="${filePipl.FILE_ID}" tmpFileNm="${filePipl.FLE_NM}" onclick="downloadFilePiplFunc(this)"></button>
                                <!-- <button class="remove-btn" tmpEduFileId="${filePipl.EDU_FILE_ID}" tmpFileId="${filePipl.FILE_ID}" 
                                      tmpFileNm="${filePipl.FLE_NM}" tmpFilePath="${filePipl.FLE_PATH}" onclick="removePiplFunc(this)"></button> -->
                              </li>
                            </c:if>
                          </c:forEach>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" rowspan="2"><spring:message code="sft.sft_0500.label.DISABILITIES_EDU_DATE"/></th>
                    <td class="blank bm-none"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.completeDate"/></th>
                    <td id="DISABILITIES_EDU_DATE" colspan="3"></td>
                  </tr>
                  <tr>
                    <td class="blank"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.certificate"/></th>
                    <td colspan="3">
                      <div class="download-box-area custom">
                        <ul id="id_lst_disabilities" style="padding-right: 10px;">
                          <c:forEach items="${DATA.DISABILITIES_FILES}" var="fileDisabilities" varStatus="loop">
                            <c:if test="${fileDisabilities.FILE_TYPE eq 'DISABILITIES'}">
                              <li tmpFileId="${fileDisabilities.FILE_ID}" tmpFileNm="${fileDisabilities.FLE_NM}" onclick="downloadFileDisabilitiesFunc(this)"  style="cursor:pointer">
                                <div class="file-wrap">
                                  <span class="file-info">
                                    <em class="name">${fileDisabilities.FLE_NM}</em>
                                  </span>
                                  <span class="bottom-info">
                                    <em class="date">${fileDisabilities.FILE_INS_DATE}</em>
                                    <em>${fileDisabilities.FLE_SZ}</em>
                                  </span>
                                </div>
                                <button class="download-btn" tmpFileId="${fileDisabilities.FILE_ID}" tmpFileNm="${fileDisabilities.FLE_NM}" onclick="downloadFileDisabilitiesFunc(this)"></button>
                                <!-- <button class="remove-btn" tmpEduFileId="${Disabilities.EDU_FILE_ID}" tmpFileId="${Disabilities.FILE_ID}" 
                                      tmpFileNm="${Disabilities.FLE_NM}" tmpFilePath="${Disabilities.FLE_PATH}" onclick="removeDisabilitiesFunc(this)"></button> -->
                              </li>
                            </c:if>
                          </c:forEach>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" rowspan="2"><spring:message code="sft.sft_0500.label.RETIREMENT_EDU_DATE"/></th>
                    <td class="blank bm-none"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.completeDate"/></th>
                    <td id="RETIREMENT_EDU_DATE" colspan="3"></td>
                  </tr>
                  <tr>
                    <td class="blank"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.certificate"/></th>
                    <td colspan="3">
                      <div class="download-box-area custom">
                        <ul id="id_lst_retirement" style="padding-right: 10px;">
                          <c:forEach items="${DATA.RETIREMENT_FILES}" var="fileRetirement" varStatus="loop">
                            <c:if test="${fileRetirement.FILE_TYPE eq 'RETIREMENT'}">
                              <li tmpFileId="${fileRetirement.FILE_ID}" tmpFileNm="${fileRetirement.FLE_NM}" onclick="downloadFileRetirementFunc(this)"  style="cursor:pointer">
                                <div class="file-wrap">
                                  <span class="file-info">
                                    <em class="name">${fileRetirement.FLE_NM}</em>
                                  </span>
                                  <span class="bottom-info">
                                    <em class="date">${fileRetirement.FILE_INS_DATE}</em>
                                    <em>${fileRetirement.FLE_SZ}</em>
                                  </span>
                                </div>
                                <button class="download-btn" tmpFileId="${fileRetirement.FILE_ID}" tmpFileNm="${fileRetirement.FLE_NM}" onclick="downloadFileRetirementFunc(this)"></button>
                                <!-- <button class="remove-btn" tmpEduFileId="${fileRetirement.EDU_FILE_ID}" tmpFileId="${fileRetirement.FILE_ID}" 
                                      tmpFileNm="${fileRetirement.FLE_NM}" tmpFilePath="${fileRetirement.FLE_PATH}" onclick="removeRetirementFunc(this)"></button> -->
                              </li>
                            </c:if>
                          </c:forEach>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" rowspan="2"><spring:message code="sft.sft_0500.label.SAFETY_EDU_DATE"/></th>
                    <td class="blank bm-none"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.completeDate"/></th>
                    <td id="SAFETY_EDU_DATE" colspan="3"></td>
                  </tr>
                  <tr>
                    <td class="blank"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.certificate"/></th>
                    <td colspan="3">
                      <div class="download-box-area custom">
                        <ul id="id_lst_safety" style="padding-right: 10px;">
                          <c:forEach items="${DATA.SAFETY_FILES}" var="fileSafety" varStatus="loop">
                            <c:if test="${fileSafety.FILE_TYPE eq 'SAFETY'}">
                              <li tmpFileId="${fileSafety.FILE_ID}" tmpFileNm="${fileSafety.FLE_NM}" 
                              onclick="downloadfileSafetyFunc(this)"  style="cursor:pointer">
                                <div class="file-wrap">
                                  <span class="file-info">
                                    <em class="name">${fileSafety.FLE_NM}</em>
                                  </span>
                                  <span class="bottom-info">
                                    <em class="date">${fileSafety.FILE_INS_DATE}</em>
                                    <em>${fileSafety.FLE_SZ}</em>
                                  </span>
                                </div>
                                <button class="download-btn" tmpFileId="${fileSafety.FILE_ID}" tmpFileNm="${fileSafety.FLE_NM}" onclick="downloadfileSafetyFunc(this)"></button>
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

<script src="${ctxPath}/script/safety/safety_0502.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>	
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>

	var param = '${DATA}';
	
	$(document).ready(function(){
		safety_0502();
	});
</script>