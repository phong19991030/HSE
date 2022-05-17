<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%
request.setCharacterEncoding("UTF-8");
%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<!-- insert, update -->
<input type="hidden" id="PROCESS" name="PROCESS" value="${PROCESS}">
<input type="hidden" id="EDU_ID" name="EDU_ID" value="${DATA.EDU_ID}">
<input type="hidden" id="CRUD" name="CRUD" value="${DATA.CRUD}">
<input type="hidden" id="SESS_USER_ID" name="INS_ID" value="${INS_ID}">
<input type="hidden" id="UPS_ID" name="UPS_ID" value="${UPS_ID}">
<main id="content" class="safety-page">
  <div class="container">
    <section class="hdSection">
      <!-- tit-wrap -->
      <div class="tit-wrap">
        <div class="tit-left">
          <h1 class="heading1">
            <c:if test="${PROCESS == 'INSERT'}">
              <spring:message code="sft.sft_0500.label.title.reg" />
              </c:if>
              <c:if test="${PROCESS == 'UPDATE'}">
                <spring:message code="sft.sft_0500.label.title.update" />
              </c:if>  
          </h1>
        </div>
      </div>
      <!-- //tit-wrap -->
    </section>
    <section class="contSection">
      <div class="content clearfix">

        <!-- left area -->
        <div class="left-area">          
          <article class="registration-form">
            <h2 class="heading4">결재라인</h2>
            <div class="approval-select-area">
              <button modal-id="layer-popup1">결재라인을 지정해주세요</button>
            </div>
          </article>

          <article class="registration-form">
            <h2 class="heading4"><spring:message code="sft.sft_0500.label.title.info" /></h2>

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
                      <td colspan="2">
                        <div class="register-write w50p">
                          <div class="">
                            <!-- <input type="text" title="성명" placeholder="성명을 입력해주세요" value="장길동"> -->
                            <input type="text" id="id_emp_str_uid_key_emp_no" validation-check="required" name="EMP_NO" value="${DATA.EMP_NO}" hidden="true"/>
                          </div>
                          <jsp:include page="../common/select_emp_btn.jsp">
                            <jsp:param name="key" value="key_emp_no" />
                            <jsp:param name="CRUD" value="${DATA.CRUD}" />
                            <jsp:param name="strEmpId" value="${DATA.EMP_NO}" />
                            <jsp:param name="isOne" value="true" />
                            <jsp:param value="성명 설정" name="title"/>
                          </jsp:include>
                        </div>
                      </td>
                      <th scope="row"><spring:message code="sft.sft_0500.label.DUTY_NAME"/></th>
                      <td>
                        <!-- <div class="select-group">
                          <select disabled validation-check="required" id='id_duty_cd' title="직급">
                            <option selected>과장</option>
                            <c:forEach items="${dutyCds}" var="dutyCd" varStatus="loop">
                      			<option value="${dutyCd.COMM_CD}">${dutyCd.COMM_NM}</option>
                      		</c:forEach>
                          </select>
                        </div> -->
                        <div class="register-write">
                          <div class="input-group">
                            <input id='id_duty_cd' disabled validation-check="required" type="text" title="점검자" placeholder="점검자" value="${DATA.DUTY_NAME}">
                          </div>
                        </div>
                      </td>
                    </tr>
                  <tr> <!-- Sexual Harassment Prevention Education  SHP -->
                    <th scope="row" rowspan="2"><spring:message code="sft.sft_0500.label.SHP_EDU_DATE"/></th>
                    <td class="blank bm-none"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.completeDate"/></th>
                    <td colspan="3">
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label>
                          <input value="${DATA.SHP_EDU_DATE}" validation-check="required" type="text" id="SHP_EDU_DATE" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr> 
                    <td class="blank"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.certificate"/></th>
                    <td colspan="3">
                      <div class="download-box-area custom" style="display: flex;">
                        <input id="id_input_shp" type="file" onchange="getFilenameShp(this)" name="shp_file" style="display: none;" />	
                        <ul id="id_lst_shp" >
                          <c:forEach items="${DATA.SHP_FILES}" var="fileShp" varStatus="loop">
                            <c:if test="${fileShp.FILE_TYPE eq 'SHP'}">
                              <li>
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
                                <button class="remove-btn" tmpEduFileId="${fileShp.EDU_FILE_ID}" tmpFileId="${fileShp.FILE_ID}" 
                                      tmpFileNm="${fileShp.FLE_NM}" tmpFilePath="${fileShp.FLE_PATH}" onclick="removeShpFunc(this)"></button>
                              </li>
                            </c:if>
                          </c:forEach>  
                        </ul>
                        <ul>
                          <li class="add-box">
                            <button class="add-btn" onclick="addShpFunc()"></button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr> <!-- Personal Information Protection Law Education  PIPL-->
                    <th scope="row" rowspan="2"><spring:message code="sft.sft_0500.label.PIPL_EDU_DATE"/><!--<br />교육--></th>
                    <td class="blank bm-none"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.completeDate"/></th>
                    <td colspan="3">
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label>
                          <input value="${DATA.PIPL_EDU_DATE}" validation-check="required" type="text" id="PIPL_EDU_DATE" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr> 
                    <td class="blank"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.certificate"/></th>
                    <td colspan="3">
                      <div class="download-box-area custom" style="display: flex;">
                        <input id="id_input_pipl" type="file" onchange="getFilenamePipl(this)" name="pipl_file" style="display: none;" />	
                        <ul id="id_lst_pipl" >
                          <c:forEach items="${DATA.PIPL_FILES}" var="filePipl" varStatus="loop">
                            <c:if test="${filePipl.FILE_TYPE eq 'PIPL'}">
                              <li>
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
                                <button class="remove-btn" tmpEduFileId="${filePipl.EDU_FILE_ID}" tmpFileId="${filePipl.FILE_ID}" 
                                      tmpFileNm="${filePipl.FLE_NM}" tmpFilePath="${filePipl.FLE_PATH}" onclick="removePiplFunc(this)"></button>
                              </li>
                            </c:if>
                          </c:forEach>
                        </ul>
                        <ul>
                          <li class="add-box">
                            <button class="add-btn" onclick="addPiplFunc()"></button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr><!-- Education to improve awareness of the disabled in the workplace DISABILITIES -->
                    <th scope="row" rowspan="2"><spring:message code="sft.sft_0500.label.DISABILITIES_EDU_DATE"/><!--<br />인식개선 교육--></th>
                    <td class="blank bm-none"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.completeDate"/></th>
                    <td colspan="3">
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label>
                          <input value="${DATA.DISABILITIES_EDU_DATE}" validation-check="required" type="text" id="DISABILITIES_EDU_DATE" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="blank"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.certificate"/></th>
                    <td colspan="3">
                      <div class="download-box-area custom" style="display: flex;">
                        <input id="id_input_disabilities" type="file" onchange="getFilenameDisabilities(this)" name="disabilities_file" style="display: none;" />	
                        <ul id="id_lst_disabilities" >
                          <c:forEach items="${DATA.DISABILITIES_FILES}" var="fileDisabilities" varStatus="loop">
                            <c:if test="${fileDisabilities.FILE_TYPE eq 'DISABILITIES'}">
                              <li>
                                <div class="file-wrap">
                                  <span class="file-info">
                                    <em class="name">${fileDisabilities.FLE_NM}</em>
                                  </span>
                                  <span class="bottom-info">
                                    <em class="date">${Disabilities.FILE_INS_DATE}</em>
                                    <em>${Disabilities.FLE_SZ}</em>
                                  </span>
                                </div>
                                <button class="download-btn" tmpFileId="${fileDisabilities.FILE_ID}" tmpFileNm="${fileDisabilities.FLE_NM}" onclick="downloadFileDisabilitiesFunc(this)"></button>
                                <button class="remove-btn" tmpEduFileId="${fileDisabilities.EDU_FILE_ID}" tmpFileId="${fileDisabilities.FILE_ID}" 
                                      tmpFileNm="${fileDisabilities.FLE_NM}" tmpFilePath="${fileDisabilities.FLE_PATH}" onclick="removeDisabilitiesFunc(this)"></button>
                              </li>
                            </c:if>
                          </c:forEach>
                        </ul>
                        <ul>
                          <li class="add-box">
                            <button class="add-btn" onclick="addDisabilitiesFunc()"></button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr><!-- Retirement pension education RETIREMENT -->
                    <th scope="row" rowspan="2"><spring:message code="sft.sft_0500.label.RETIREMENT_EDU_DATE"/></th>
                    <td class="blank bm-none"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.completeDate"/></th>
                    <td colspan="3">
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label>
                          <input value="${DATA.RETIREMENT_EDU_DATE}" validation-check="required" type="text" id="RETIREMENT_EDU_DATE" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="blank"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.certificate"/></th>
                    <td colspan="3">
                      <div class="download-box-area custom" style="display: flex;">
                        <input id="id_input_retirement" type="file" onchange="getFilenameRetirement(this)" name="retirement_file" style="display: none;" />	
                        <ul id="id_lst_retirement" >
                          <c:forEach items="${DATA.RETIREMENT_FILES}" var="fileRetirement" varStatus="loop">
                            <c:if test="${fileRetirement.FILE_TYPE eq 'RETIREMENT'}">
                              <li>
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
                                <button class="remove-btn" tmpEduFileId="${fileRetirement.EDU_FILE_ID}" tmpFileId="${fileRetirement.FILE_ID}" 
                                      tmpFileNm="${fileRetirement.FLE_NM}" tmpFilePath="${fileRetirement.FLE_PATH}" onclick="removeRetirementFunc(this)"></button>
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
                  <tr><!-- safety edu-->
                    <th scope="row" rowspan="2"><spring:message code="sft.sft_0500.label.SAFETY_EDU_DATE"/></th>
                    <td class="blank bm-none"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.completeDate"/></th>
                    <td colspan="3">
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label>
                          <input value="${DATA.SAFETY_EDU_DATE}" validation-check="required" type="text" id="SAFETY_EDU_DATE" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="blank"></td>
                    <th scope="row"><spring:message code="sft.sft_0500.label.certificate"/></th>
                    <td colspan="3">
                      <div class="download-box-area custom" style="display: flex;">
                        <input id="id_input_safety" type="file" onchange="getFilenameSafety(this)" name="safety_file" style="display: none;" />	
                        <ul id="id_lst_safety" >
                          <c:forEach items="${DATA.SAFETY_FILES}" var="fileSafety" varStatus="loop">
                            <c:if test="${fileSafety.FILE_TYPE eq 'SAFETY'}">
                              <li>
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
                                <button class="remove-btn" tmpEduFileId="${fileSafety.EDU_FILE_ID}" tmpFileId="${fileSafety.FILE_ID}" 
                                      tmpFileNm="${fileSafety.FLE_NM}" tmpFilePath="${fileSafety.FLE_PATH}" onclick="removeSafetyFunc(this)"></button>
                              </li>
                            </c:if>
                          </c:forEach>
                        </ul>
                        <ul>
                          <li class="add-box">
                            <button class="add-btn" onclick="addSafetyFunc()"></button>
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
            <button id="SAVE_BTN" class="btn-style1">
              <i class="las la-edit"></i><span class="name"><spring:message code="button.save" /></span>
            </button>
            <button class="btn-style3" onclick="goList()">
              <i class="las la-reply"></i><span class="name"><spring:message code="button.cancel" /></span>
            </button>
          </div>
        </div>
        <!-- // right area -->
      </div>
    </section>
  </div>
</main>

<!-- layer-popup -->
<div class="layer-popup" id="layer-popup1">
  <div class="popup-cont approval-cont">

    <h2 class="heading4">결재라인 지정</h2>

    <section class="approval-section">
      <!-- left-area -->
      <div class="left-area">
        <!-- fixed-search-form2 -->
        <div class="fixed-search-form2">
          <div class="search-bar">
            <input type="text" placeholder="이름">
            <button class="search-btn">검색</button>
          </div>

          <!-- D : "search-panel", Please refer to it if necessary. -->
          <!-- <div class="search-panel">
                    <p>홍길동</p>
                    <p>홍길동</p>
                    <p>홍길동</p>
                 </div> 
          -->
        </div>
        <!-- //fixed-search-form2 -->

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
            <tbody>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>(주)에이투엠</td>
                <td>홍길동</td>
                <td>대표</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>(주)에이투엠</td>
                <td>홍길동</td>
                <td>선임연구원</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>(주)에이투엠</td>
                <td>홍길동</td>
                <td>엔지니어</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>운영사 A</td>
                <td>이길동</td>
                <td>연구원</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>운영사 A</td>
                <td>이길동</td>
                <td>연구원</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>운영사 A</td>
                <td>이길동</td>
                <td>연구원</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>윈디텍(주)</td>
                <td>성길동</td>
                <td>선임연구원</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>윈디텍(주)</td>
                <td>장길동</td>
                <td>엔지니어</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>윈디텍(주)</td>
                <td>장길동</td>
                <td>엔지니어</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>윈디텍(주)</td>
                <td>장길동</td>
                <td>엔지니어</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>윈디텍(주)</td>
                <td>장길동</td>
                <td>엔지니어</td>
              </tr>
              <tr>
                <td>
                  <span class="checkbox-radio-group">
                    <label><input type="checkbox" name="checkbox"></label>
                  </span>
                </td>
                <td>윈디텍(주)</td>
                <td>장길동</td>
                <td>엔지니어</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- right-area -->
      <div class="right-area">

        <!-- D : The selected person from the left list will be added. -->
        <ul class="selected-approval-custom">
          <li>
            <div class="custom info">
              <span class="team">운영사 A</span>
              <span class="name">박정권<em class="position">대표</em></span>
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
          </li>
          <li>
            <div class="custom info">
              <span class="team">운영사 A</span>
              <span class="name">박정권<em class="position">이사</em></span>
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
          </li>
          <li>
            <div class="custom info">
              <span class="team">운영사 A</span>
              <span class="name">박정권<em class="position">팀장</em></span>
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
          </li>
          <li>
            <div class="custom info">
              <span class="team">운영사 A</span>
              <span class="name">박정권<em class="position">선임연구원</em></span>
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
          </li>
          <li>
            <div class="custom info">
              <span class="team">윈디텍(주)</span>
              <span class="name">박정권<em class="position">선임연구원</em></span>
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
          </li>
        </ul>
      </div>
    </section>

    <div class="foot-btn-area">
      <button class="btn-style3">취소</button>
      <button class="btn-style1">저장</button>
    </div>

    <button type="button" class="popup-close-btn">
      <i class="xi-close"></i>
    </button>
  </div>
</div>
<!-- //layer-popup -->

<!-- 스크립트 -->
<script src="${ctxPath}/script/safety/safety_0501.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>
	$(document).ready(function() {
		safety_0501();
    getEmpInfos('key_emp_no', '${DATA.EMP_NO}');
	});
</script>
