<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<input type="hidden" id="PROCESS" name="PROCESS" value="${PROCESS}">
<input type="hidden" id="CRUD" name="CRUD" value="${CRUD}">
<input type="hidden" id="EMP_NO" name="EMP_NO" value="${DATA.EMP_NO}">
<input type="hidden" id="EMP_HEALTH_ID" name="EMP_NO" value="${DATA.EMP_HEALTH_ID}">

<main id="content" class="health-page">
  <div class="container">
    <section class="hdSection">
      <!-- tit-wrap -->
      <div class="tit-wrap">
        <div class="tit-left">
          <c:choose>
            <c:when test="${DATA.EMP_NO eq null}">
              <h1 class="heading1">
                <spring:message code="hea.hea_000201.title.register" />
              </h1>
            </c:when>
            <c:otherwise>
              <h1 class="heading1">
                <spring:message code="hea.hea_000201.title.modify" />
              </h1>
            </c:otherwise>
          </c:choose>
        </div>
      </div>
      <!-- //tit-wrap -->
    </section>
    <section class="contSection">
      <div class="content clearfix">

        <!-- left area -->
        <div class="left-area">
          <article class="registration-form" id="APPROVER_VIEW">
            <h2 class="heading4">결재라인</h2>
            <div class="approval-select-area">
              <button id="BTN_POPUP_EMP">결재라인을 지정해주세요</button>
            </div>
          </article>

          <article class="registration-form">
            <h2 class="heading4">
              <spring:message code="hea.hea_0002.title.health_2" />
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
                      <spring:message code="hea.hea_0002.label.empName" />
                    </th>
                    <!-- <td>
											<div class="register-write">
												<div class="input-group">
													<input type="text" id="EMP_NAME" title="성명" placeholder="<spring:message code="hea.hea_0002.label.empName"/>">
												</div>
											</div>
										</td> -->
                    <td>
                      <div class="register-write w50p">
                        <div class="">
                          <!-- <input type="text" title="성명" placeholder="성명을 입력해주세요" value="장길동"> -->
                          <input type="text" id="id_emp_str_uid_key_emp_no" validation-check="required" name="EMP_NO"
                            value="${DATA.EMP_NO}" hidden="true" />
                        </div>
                        <jsp:include page="../common/select_emp_btn.jsp">
                          <jsp:param name="key" value="key_emp_no" />
                          <jsp:param name="CRUD" value="${DATA.CRUD}" />
                          <jsp:param name="strEmpId" value="${DATA.EMP_NO}" />
                          <jsp:param name="isOne" value="true" />
                          <jsp:param value="직원 설정" name="title"/>
                        </jsp:include>
                      </div>
                    </td>
                    <th scope="row">
                      <spring:message code="hea.hea_0002.label.duty" />
                    </th>
                    <td>
                      <div class="register-write">
                        <div class="input-group">
                          <input validation-check="required" disabled value="${DATA.DUTY_CD}" type="text" id="DUTY_CD"
                            title="직급" placeholder='<spring:message code="hea.hea_0002.label.duty" />'>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="hea.hea_0002.label.height" />
                    </th>
                    <td>
                      <div class="register-write">
                        <div class="input-group">
                          <input validation-check="required" value="${DATA.HEIGHT}" type="text" id="HEIGHT" title="성명"
                            placeholder='<spring:message code="hea.hea_0002.label.height" />'>
                        </div>
                      </div> 
                      <!-- <span class="unit">cm</span> -->
                    </td>
                    <th scope="row">
                      <spring:message code="hea.hea_0002.label.weight" />
                    </th>
                    <td>
                      <div class="register-write">
                        <div class="input-group">
                          <input validation-check="required" value="${DATA.WEIGHT}" type="text" id="WEIGHT" title="체중"
                            placeholder='<spring:message code="hea.hea_0002.label.weight" />'>
                        </div>
                      </div> 
                      <!-- <span class="unit">kg</span> -->
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="hea.hea_0002.label.eye" />
                    </th>
                    <td>
                      <div class="register-write">
                        <div class="input-group">
                          <input validation-check="required" value="${DATA.LEFT_EYE}" type="text" id="LEFT_EYE"
                            title="시력" placeholder='<spring:message code="hea.hea_0002.label.leftEye" />'>
                        </div>
                      </div>
                      <div class="register-write">
                        <div class="input-group">
                          <input validation-check="required" value="${DATA.RIGHT_EYE}" type="text" id="RIGHT_EYE"
                            title="시력" placeholder='<spring:message code="hea.hea_0002.label.rightEye" />'>
                        </div>
                      </div>
                    </td>
                    <th scope="row">
                      <spring:message code="hea.hea_0002.label.bp" />
                    </th>
                    <td>
                      <div class="register-write">
                        <div class="input-group">
                          <input validation-check="required" value="${DATA.SBP}" type="text" id="SBP" title="혈압"
                            placeholder='<spring:message code="hea.hea_0002.label.sbp" />'>
                        </div>
                      </div>
                      <div class="register-write">
                        <div class="input-group">
                          <input validation-check="required" value="${DATA.DBP}" type="text" id="DBP" title="혈압"
                            placeholder='<spring:message code="hea.hea_0002.label.dbp" />'>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="hea.hea_0002.label.diseases"/>
                    </th>
                    <td colspan="3">

                      <!-- 2022-04-25 add (@smlee) -->
                      <div class="staff-info-area">
                        <div class="base-table">
                          <table>
                            <colgroup>
                              <col style="width: 4%;">
                              <col style="width: 24%;">
                              <col style="width: 24%;">
                              <col style="width: 35%;">
                              <col style="width: 13%;">
                            </colgroup>
                            <thead>
                              <tr>
                                <th scope="col">No</th>
                                <th scope="col">질병 명</th>
                                <th scope="col">치료 여부</th>
                                <th scope="col">기간</th>
                                <th scope="col"></th>
                              </tr>
                            </thead>
                            <tbody id="DISEASE_ROWS">
                              <tr>
                                <td>1</td>
                                <td>
                                  <div class="register-write w100p">
                                    <div class="input-group">
                                      <input type="text" title="내용입력" placeholder="내용을 입력해주세요">
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span class="checkbox-radio-group">
                                    <label for="RADIO1" class="radio">
                                      <input type="radio" name="radio" id="RADIO1">
                                      <span class="circle"></span>
                                      <em>Y</em>
                                    </label>
                                  </span>
                                  <span class="checkbox-radio-group">
                                    <label for="RADIO2" class="radio">
                                      <input type="radio" name="radio" id="RADIO2">
                                      <span class="circle"></span>
                                      <em>N</em>
                                    </label>
                                  </span>
                                </td>
                                <td>
                                  <div class="calendar-picker">
                                    <div class="input-group">
                                      <label class="sr-only">날짜설정</label>
                                      <input type="text" title="날짜설정" placeholder="YYYY-MM-DD" class="datepicker">
                                      <button class="calendar-picker-btn"></button>
                                    </div>
                                  </div>
                                  <span class="hyphen">~</span>
                                  <div class="calendar-picker">
                                    <div class="input-group">
                                      <label class="sr-only">날짜설정</label>
                                      <input type="text" title="날짜설정" placeholder="YYYY-MM-DD" class="datepicker">
                                      <button class="calendar-picker-btn"></button>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div class="flexWrap">
                                    <button id="btnRem${info.type}-${info.idx}" name="${info.type}-${info.idx}" onclick="removeRowFunc(this, '${info.type}');" class="common-btn motion remove-btn" title="삭제"></button>
                                    <button id="btnAdd${info.type}-${info.idx}" name="${info.type}-${info.idx}" onclick="addRowFunc(this, '${info.type}');" class="common-btn motion add-btn" title="추가"></button>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- <tr>
                    <th scope="row">
                      <spring:message code="hea.hea_0002.label.healthCheckFile" />
                    </th>
                    <td colspan="3">
                      <div class="download-box-area custom" style="display: flex;">
                        <input validation-check="required" id="id_input_retirement" type="file"
                          onchange="getFilenameRetirement(this)" name="retirement_file" style="display: none;" />
                      </div>
                    </td>
                  </tr> -->
                  <tr>
                    <th scope="row">
                      <spring:message code="hea.hea_0002.label.healthCheckFile" />
                    </th>
                    <td colspan="3">
                      <div class="download-box-area custom" style="display: flex;">
                        <input id="id_input_retirement" type="file" onchange="getFilenameRetirement(this)"
                          name="retirement_file" style="display: none;" />

                        <ul id="id_lst_retirement">
                          <c:forEach items="${DATA.HEALTH_FILES}" var="file" varStatus="loop">
                            <c:if test="${file.FILE_TYPE eq 'HEALTH'}">
                              <li>
                                <div class="file-wrap">
                                  <span class="file-info">
                                    <em class="name">${file.FLE_NM}</em>
                                  </span>
                                  <span class="bottom-info">
                                    <em class="date">${file.FILE_INS_DATE}</em>
                                    <em>${file.FLE_SZ}</em>
                                  </span>
                                </div>
                                <button class="download-btn" tmpFileId="${file.FILE_ID}" tmpFileNm="${file.FLE_NM}"
                                  onclick="downloadfileRetirementFunc(this)"></button>
                                <button class="remove-btn" tmpEduFileId="${file.EMP_HEALTH_FILE_ID}"
                                  tmpFileId="${file.FILE_ID}" tmpFileNm="${file.FLE_NM}" tmpFilePath="${file.FLE_PATH}"
                                  onclick="removeRetirementFunc(this)"></button>
                              </li>
                            </c:if>
                          </c:forEach>
                        </ul>
                        <ul>
                          <li class="add-box">
                            <button class="add-btn" onclick="addRetirementFunc()"></button>
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
        <!-- // left area -->
        <!-- right area -->
        <div class="right-area">
          <div class="right-btn-type">
            <button class="btn-style1" id="BTN_SAVE">
              <i class="las la-edit"></i><span class="name">
                <spring:message code="button.save" /></span>
            </button>
            <button class="btn-style3" id="BTN_CANCEL">
              <i class="las la-reply"></i><span class="name">
                <spring:message code="button.cancel" /></span>
            </button>
          </div>
        </div>
        <!-- // right area -->
      </div>
    </section>
  </div>
</main>

<!-- layer-popup -->
<div class="layer-popup" id="layer-popup-approver">
  <div class="popup-cont approval-cont">

    <h2 class="heading4">결재라인 지정</h2>

    <section class="approval-section">
      <!-- left-area -->
      <div class="left-area">
        <!-- fixed-search-form2 -->
        <div class="fixed-search-form2">
          <div class="search-bar">
            <input type="text" placeholder="이름" id="POPUP_SEARCH_ALL">
            <button class="search-btn" id="POPUP_SEARCH_EMP_BTN">검색</button>
          </div>

        </div>

        <h3 class="heading5">직원 목록</h3>
        <div class="base-table">
          <table>
            <caption></caption>
            <colgroup>
              <col style="width: auto;">
              <col style="width: auto;">
              <col style="width: auto;">
              <col style="width: auto;">
            </colgroup>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">회사명</th>
                <th scope="col">성명</th>
                <th scope="col">직급</th>
              </tr>
            </thead>
            <tbody id="EMP_ROW_LIST">
              <!-- <tr>
								<td><span class="checkbox-radio-group"> <label><input
											type="checkbox" name="checkbox"></label>
								</span></td>
								<td>(주)에이투엠</td>
								<td>홍길동</td>
								<td>대표</td>
							</tr> -->
            </tbody>
          </table>
        </div>
      </div>

      <!-- right-area -->
      <div class="right-area">

        <!-- D : The selected person from the left list will be added. -->
        <ul class="selected-approval-custom" id="SELECTED_APPROVAL_VIEW">
          <!-- <li>
						<div class="custom info">
							<span class="team">운영사 A</span> <span class="name">박정권<em
								class="position">대표</em></span>
							<button class="remove-btn"></button>
						</div>
						<div class="custom select-group">
							<select title="결재">
								<option>전체</option>
								<option>기안</option>
								<option>검토</option>
								<option>결재</option>
								<option>전결</option>
							</select>
						</div>
						<div class="custom">
							<button class="drag-btn">
								<i class="las la-expand-arrows-alt"></i>
							</button>
						</div>
					</li> -->
        </ul>
      </div>
    </section>

    <div class="foot-btn-area">
      <button class="btn-style3">
        <i class=" las la-reply"></i><span class="name">취소</span>
      </button>
      <button class="btn-style1" id="BTN_SAVE_POPUP_APPROVER">저장</button>
    </div>

    <button type="button" class="popup-close-btn">
      <i class="xi-close"></i>
    </button>
  </div>
</div>
<!-- //layer-popup -->

<script src="${ctxPath}/script/hea/hea_000201.js"></script>
<script src="${ctxPath}/script/com/com-element.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>


<script>
  $(document).ready(function () {
    getEmpInfos('key_emp_no', '${DATA.EMP_NO}');
    hea_000201();
    if("${PROCESS}"=="UPDATE"){
      initDisease('${DATA.DISEASES}');
    }
    

    var selector = 'id_lst_retirement';
    checkfilelist();
    var myElement = document.getElementById(selector);
    if(window.addEventListener) {
      // Normal browsers
      myElement.addEventListener('DOMSubtreeModified', checkfilelist, false);
    } else
      if(window.attachEvent) {
          // IE
          myElement.attachEvent('DOMSubtreeModified', checkfilelist);
      }

    function checkfilelist() {
      if ( $('#'+selector).children().length > 0 ) {
        $('#'+selector).css("padding-right","10px");
      }else{
        $('#'+selector).css("padding-right","");
      }
    }
  })
</script>