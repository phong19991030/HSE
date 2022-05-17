<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
  .cls_pdb_10 {
    padding-bottom: 10px;
  }
</style>

<input type="hidden" id="CRUD" name="CRUD" value="${DATA.CRUD}">
<input type="hidden" id="TOOL_ID" name="TOOL_ID" value="${DATA.TOOL_ID}">

<main id="content" class="safety-page">
  <%-- <form:form action="" id="manualForm" data-func="saveForm" data-callback=""> --%>
  <%-- <form:form action="" id="manualForm" data-callback=""> --%>
  <div class="container">
    <section class="hdSection">
      <!-- tit-wrap -->
      <div class="tit-wrap">
        <div class="tit-left">
          <h1 class="heading1">
            <spring:message code="sft.sft_0001.label.register" />
          </h1>
        </div>
      </div>
      <!-- //tit-wrap -->
    </section>
    <section class="contSection">
      <div class="content clearfix">
        <div class="left-area">
          <article class="registration-form">
            <h2 class="heading4">결재라인</h2>
            <div class="approval-select-area">
              <button modal-id="layer-popup1">결재라인을 지정해주세요</button>
            </div>
          </article>
          <!-- common aprroval end-->

          <article class="registration-form">
            <h2 class="heading4">
              <spring:message code="sft.sft_0001.label.content" />
            </h2>
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
                    <th scope="row">
                      <spring:message code="sft.sft_0001.label.toolType" />
                    </th>
                    <td>
                      <div class="select-group">
                        <select title="구분" id='id_tool_type'>
                          <option value="">내용</option>
                          <c:forEach items="${toolTypes}" var="type" varStatus="loop">
                            <c:if test="${DATA.TOOL_TYPE != null && DATA.TOOL_TYPE eq type.COMM_CD}">
                              <option value="${type.COMM_CD}" selected="selected">${type.COMM_NM}</option>
                            </c:if>
                            <c:if test="${DATA.TOOL_TYPE ne type.COMM_CD}">
                              <option value="${type.COMM_CD}">${type.COMM_NM}</option>
                            </c:if>
                          </c:forEach>
                        </select>
                      </div>
                    </td>
                    <th scope="row">
                      <spring:message code="sft.sft_0001.label.manageNo" />
                    </th>
                    <td>
                      <div class="register-write w50p">
                        <div class="input-group">
                          <label for="MANAGE_NO" class="sr-only">
                            <spring:message code="sft.sft_0001.label.manageNo" /></label>
                          <input type="text" id="MANAGE_NO" validation-check="required" name="MANAGE_NO" placeholder="관리 번호"
                            value="${DATA.MANAGE_NO}" autocomplete="off" maxlength="19" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0001.label.toolName" />
                    </th>
                    <td>
                      <div class="register-write w100p">
                        <div class="input-group">
                          <label for="TOOL_NAME" class="sr-only">
                            <spring:message code="sft.sft_0001.label.toolName" /></label>
                          <input type="text" id="TOOL_NAME" placeholder="공구 및 장비 명을 입력해주세요" validation-check="required"
                            name="TOOL_NAME" value="${DATA.TOOL_NAME }" autocomplete="off" />
                        </div>
                      </div>
                    </td>
                    <th scope="row">
                      <spring:message code="sft.sft_0001.label.standard" />
                    </th>
                    <td>
                      <div class="register-write w50p">
                        <div class="input-group">
                          <label for="STANDARD" class="sr-only">
                            <spring:message code="sft.sft_0001.label.standard" /></label>
                          <input type="text" id="STANDARD" placeholder="규격을 입력해주세요" name="STANDARD"
                            value="${DATA.STANDARD }" autocomplete="off" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0001.label.brandName" />
                    </th>
                    <td>
                      <div class="register-write w100p">
                        <div class="input-group">
                          <label for="BRAND_NAME" class="sr-only">
                            <spring:message code="sft.sft_0001.label.brandName" /></label>
                          <input type="text" placeholder="브랜드 명을 입력해주세요" id="BRAND_NAME" name="BRAND_NAME"
                            value="${DATA.BRAND_NAME }" autocomplete="off" />
                        </div>
                      </div>
                    </td>
                    <th scope="row">
                      <spring:message code="sft.sft_0001.label.modelName" />
                    </th>
                    <td>
                      <div class="register-write w50p">
                        <div class="input-group">
                          <label for="MODEL_NAME" class="sr-only">
                            <spring:message code="sft.sft_0001.label.modelName" /></label>
                          <input type="text" placeholder="모델명을 입력해주세요" id="MODEL_NAME" name="MODEL_NAME"
                            value="${DATA.MODEL_NAME }" autocomplete="off" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0001.label.amount" />
                    </th>
                    <td>
                      <div class="register-write w50p">
                        <div class="input-group">
                          <label for="AMOUNT" class="sr-only">
                            <spring:message code="sft.sft_0001.label.amount" /></label>
                          <input type="number" id="AMOUNT" validation-check="required" name="AMOUNT" placeholder='<spring:message code="sft.sft_0001.label.amount" />'
                            value="${DATA.AMOUNT }" autocomplete="off" />
                        </div>
                      </div>
                      <!-- <span class="unit mgl5">ea</span> -->
                    </td>
                    <th scope="row">
                      <spring:message code="sft.sft_0001.label.lossOrDamageAmount" />
                    </th>
                    <td>
                      <%-- <div class="input-group">
                        <label for="IS_LOSS_OR_DAMAGE" class="sr-only">
                          <spring:message code="sft.sft_0001.label.lossOrDamageAmount" /></label>
                        <input type="number" id="IS_LOSS_OR_DAMAGE" name="IS_LOSS_OR_DAMAGE"
                          value="${DATA.IS_LOSS_OR_DAMAGE }" autocomplete="off" />
                      </div> --%>

                      <!-- 2022-04-21 add (@smlee) -->
                      <c:forEach items="${lossDamageTypes}" var="type" varStatus="loop">
                      	<span class="checkbox-radio-group">
	                        <label for="CHK${loop.count}" class="radio">
	                        
	                        <c:if test="${DATA.LOSS_OR_DAMAGE != null && DATA.LOSS_OR_DAMAGE eq type.COMM_CD}">
	                        	<input type="radio" name="NAME_CHK" id="CHK${loop.count}" value="${type.COMM_CD}" checked>
	                        </c:if>
	                        <c:if test="${DATA.LOSS_OR_DAMAGE ne type.COMM_CD}">
	                          <input type="radio" name="NAME_CHK" id="CHK${loop.count}" value="${type.COMM_CD}">
	                        </c:if>
	                          <span class="circle"></span>
	                          <em>${type.COMM_NM}</em>
	                        </label>
	                      </span>
                      </c:forEach>
                      <!-- <span class="checkbox-radio-group">
                        <input type="checkbox" name="checkbox" id="CHK1">
                        <label for="CHK1">정상</label>
                      </span>
                      <span class="checkbox-radio-group">
                        <input type="checkbox" name="checkbox" id="CHK2">
                        <label for="CHK2">분실</label>
                      </span>
                      <span class="checkbox-radio-group">
                        <input type="checkbox" name="checkbox" id="CHK3">
                        <label for="CHK3">파손</label>
                      </span>
                      <span class="checkbox-radio-group">
                        <input type="checkbox" name="checkbox" id="CHK4">
                        <label for="CHK4">수리</label>
                      </span> -->

                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0001.label.correctionDate" />
                    </th>
                    <td>
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label>
                          <input type="text" id='id_correctionDate' value="${DATA.CORRECTION_DATE}"
                            placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                      <!-- 2022-04-21 add (@smlee) -->
                      <span class="checkbox-radio-group mgl5">
                      	<c:if test="${DATA.UNNECESSARY eq 'Y'}">
                      		<input type="checkbox" name="checkbox" id="unnecessary" onclick="chkChange(this)" checked>
                      	</c:if>
                      	<c:if test="${DATA.UNNECESSARY ne 'Y'}">
	                        <input type="checkbox" name="checkbox" id="unnecessary" onclick="chkChange(this)">
                      	</c:if>
                        <label for="unnecessary">불필요</label>
                      </span>
                    </td>
                    <th scope="row">
                      <spring:message code="sft.sft_0001.label.renewDate" />
                    </th>
                    <td>
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label>
                          <input type="text" id='id_renewDate' value="${DATA.RENEW_DATE }" placeholder="YYYY-MM-DD"
                            title="날짜설정" class="datepicker" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0001.label.imagePath" />
                    </th>
                    <td colspan="3">
                      <div class="download-box-area custom" style="display: flex;">
                        <input id="id_input_imagePath" type="file" onchange='getFilenameImagePath(this)' name="doc_file"
                          style="display: none;" accept="image/*" />
                        <ul id="id_lst_img" >
                          <c:forEach items="${DATA.TOOL_FILES}" var="fileImg" varStatus="loop">
                            <c:if test="${fileImg.FILE_TYPE eq 'IMG'}">
                              <li class="img-box" style="width: 236px;">
                                <img class="cls_img_${fileImg.FILE_ID}"
                                  src="${ctxPath}/util/upload/imageView/${fileImg.FILE_ID}" alt="예시 이미지">
                                <button class="remove-btn" tmpToolFileId="${fileImg.TOOL_FILE_ID}"
                                  tmpFileId="${fileImg.FILE_ID}" tmpFileNm="${fileImg.FLE_NM}"
                                  tmpFilePath="${fileImg.FLE_PATH}" onclick="removeImgFunc(this)"></button>
                              </li>
                            </c:if>
                          </c:forEach>
                        </ul>
                        <ul>
                          <li id="id_imagePath" class="add-box">
                            <button class="add-btn" onclick="addImgFunc()"></button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0001.label.serialNo" />
                    </th>
                    <td>
                      <div class="register-write w100p">
                        <div class="input-group">
                          <label for="SERIAL_NO" class="sr-only">
                            <spring:message code="sft.sft_0001.label.serialNo" /></label>
                          <input type="text" placeholder="시리얼 넘버를 입력해주세요" id="SERIAL_NO" validation-check="required"
                            name="SERIAL_NO" value="${DATA.SERIAL_NO }" autocomplete="off" />
                        </div>
                      </div>
                    </td>
                    <th scope="row">
                      <spring:message code="sft.sft_0001.label.importDate" />
                    </th>
                    <td>
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">
                            <spring:message code="sft.sft_0001.label.importDate" /></label>
                          <input type="text" id='id_importDate' value="${DATA.IMPORT_DATE}" placeholder="YYYY-MM-DD"
                            title="날짜설정" class="datepicker" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0001.label.manager" />
                    </th>
                    <td>
                      <div class="register-write w50p" style="display: flex;">
                        <div class="">
                          <%-- <label for="MANAGER">${DATA.MANAGER }</label> --%>
                          <%-- <input type="text" placeholder="관리 책임자를 입력해주세요" id="MANAGER" validation-check="required" name="MANAGER" value="${DATA.MANAGER }" readonly="true" hidden="true"/> --%>
                          <input type="text" id="id_emp_str_uid_key_manager" validation-check="required" name="MANAGER"
                            value="${DATA.MANAGER}" hidden="true" />
                        </div>
                        <jsp:include page="../common/select_emp_btn.jsp">
                          <jsp:param name="key" value="key_manager" />
                          <jsp:param name="CRUD" value="${DATA.CRUD}" />
                          <jsp:param name="strEmpId" value="${DATA.MANAGER}" />
                          <jsp:param name="isOne" value="true" />
                          <jsp:param name="title" value="관리 책임자 설정" />
                        </jsp:include>
                      </div>


                    </td>
                    <th scope="row">
                      <spring:message code="sft.sft_0001.label.importPrice" />
                    </th>
                    <td>
                      <div class="register-write w50p">
                        <div class="input-group">
                          <label for="IMPORT_PRICE" class="sr-only">
                            <spring:message code="sft.sft_0001.label.importPrice" /></label>
                          <input type="number" placeholder="취득 가격을 입력해주세요" id="IMPORT_PRICE" validation-check="required"
                            name="IMPORT_PRICE" value="<fmt:formatNumber type=" number" pattern="0"
                            value="${DATA.IMPORT_PRICE}" />" autocomplete="off"/>
                        </div>
                      </div>
                      <!-- <span class="unit">원</span> -->
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0001.label.toolHistory" />
                    </th>
                    <td colspan="3">
                      <ul class="equip-history-lst" id='historys'>
                        <!-- TOOL_HISTORY -->
                        <c:if test="${DATA.TOOL_HISTORY.size() > 0}">
                          <c:forEach items="${DATA.TOOL_HISTORY}" var="his" varStatus="status">
                            <li>
                              <div class="calendar-picker">
                                <div class="input-group">
                                  <label class="sr-only">날짜설정</label>
                                  <input name="dp_${his.TOOL_HIS_ID}" type="text" id='HIS_DATE_${his.TOOL_HIS_ID}'
                                    validation-check="required" placeholder="YYYY-MM-DD" title="날짜설정"
                                    class="datepicker cls_HIS_DATE" readonly value="${his.HIS_DATE}">
                                  <button class="calendar-picker-btn"></button>
                                </div>
                              </div>
                              <div class="register-write">
                                <div class="input-group">
                                  <input type="text" id='HIS_CONTENT' title="장비이력입력"
                                    placeholder="장비 활용 용도" value="${his.HIS_CONTENT}">
                                </div>
                              </div>
                              <c:if test="${DATA.TOOL_HISTORY.size() > 1}">
                                <button class="btn1 remove-btn motion" onclick="removeHisFunc(this)" id="removeHisFunc">
                                  <i class="lar la-trash-alt"></i>
                                </button>
                              </c:if>
                              <c:if test="${status.count eq DATA.TOOL_HISTORY.size()}">
                                <button class="btn3 motion cls_addHis" onclick='addHisFunc(this)'>
                                  <i class="las la-plus"></i>
                                </button>
                              </c:if>
                            </li>
                          </c:forEach>
                        </c:if>

                        <c:if test="${DATA.TOOL_HISTORY == null || DATA.TOOL_HISTORY.size() eq 0}">
                          <li>
                            <!-- 1. calendar -->
                            <div class="calendar-picker">
                              <div class="input-group">
                                <label class="sr-only">날짜설정</label>
                                <input name="dp_new" type="text" id='HIS_DATE_new' placeholder="YYYY-MM-DD"
                                  validation-check="required" title="날짜설정" class="datepicker cls_HIS_DATE" readonly>
                                <button class="calendar-picker-btn"></button>
                              </div>
                            </div>
                            <!-- 2. input-text -->
                            <div class="register-write">
                              <div class="input-group">
                                <input type="text" id='HIS_CONTENT' title="장비이력입력"
                                  placeholder="장비 활용 용도">
                              </div>
                            </div>
                            <c:if test="${DATA.CRUD ne 'C'}">
                              <button class="btn1 remove-btn motion" onclick="removeHisFunc(this)" id="removeHisFunc">
                                <i class="lar la-trash-alt"></i>
                              </button>
                            </c:if>
                            <!-- 3. add btn-->
                            <button class="btn3 motion cls_addHis" onclick='addHisFunc(this)'>
                              <i class="las la-plus"></i>
                            </button>
                          </li>
                        </c:if>
                      </ul>
                      <hr style="display: inline-block; margin-top: 15px;">
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0001.label.specification" /> &amp;<br />
                      <spring:message code="sft.sft_0001.label.proofreadingCertificate" />
                    </th>
                    <td colspan="3">
                      <div class="download-box-area custom" style="display: flex;">
                        <input id="id_input_specification" type="file" onchange='getFilenameSpecification(this)'
                          name="specification_file" style="display: none;" />
                        <ul id="id_lst_specification" >
                          <c:forEach items="${DATA.TOOL_FILES}" var="fileSpe" varStatus="loop">
                            <c:if test="${fileSpe.FILE_TYPE eq 'SPE'}">
                              <li>
                                <div class="file-wrap">
                                  <span class="file-info">
                                    <em class="name">${fileSpe.FLE_NM}</em>
                                  </span>
                                  <span class="bottom-info">
                                    <em class="date">${fileSpe.FILE_INS_DATE}</em>
                                    <em>${fileSpe.FLE_SZ}</em>
                                  </span>
                                </div>
                                <button class="download-btn" tmpFileId="${fileSpe.FILE_ID}"
                                  tmpFileNm="${fileSpe.FLE_NM}" onclick="downloadFileSpeFunc(this)"></button>
                                <button class="remove-btn" tmpToolFileId="${fileSpe.TOOL_FILE_ID}"
                                  tmpFileId="${fileSpe.FILE_ID}" tmpFileNm="${fileSpe.FLE_NM}"
                                  tmpFilePath="${fileSpe.FLE_PATH}" onclick="removeSpecificationFunc(this)"></button>
                              </li>
                            </c:if>
                          </c:forEach>
                        </ul>
                        <ul>
                          <li class="add-box">
                            <button class="add-btn" onclick="addSpecificationFunc()"></button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
        </div>

        <div class="right-area">
          <div class="right-btn-type">
            <button id="SAVE_BTN" class="btn-style1">
              <i class="las la-edit"></i><span class="name">
                <spring:message code="button.save" /></span>
            </button>
            <button class="btn-style3" onclick="goList()">
              <i class="las la-reply"></i><span class="name">
                <spring:message code="button.cancel" /></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
  <%-- </form:form> --%>
</main>

<script src="${ctxPath}/script/safety/safety_000101.js?cachebuster=" + new Date().getTime()></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>

<script>
	var unnecessary = "${DATA.UNNECESSARY}";
  	$(document).ready(function () {
      sft000101();
    
      getEmpInfos('key_manager', '${DATA.MANAGER}');
  	});
</script>