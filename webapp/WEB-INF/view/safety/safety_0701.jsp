<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage=""%>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>


<!-- insert, update -->
<input type="hidden" id="PROCESS" name="PROCESS" value="${PROCESS}">
<input type="hidden" id="SAFE_CHECK_ID" name="SAFE_CHECK_ID" value="${DATA.SAFE_CHECK_ID}">
<main id="content" class="safety-page">
  <div class="container">
    <section class="hdSection">
      <!-- tit-wrap -->
      <div class="tit-wrap">
        <div class="tit-left">
          <h1 class="heading1">
            <c:if test="${PROCESS == 'INSERT'}">
              <spring:message code="sft.sft_0700.label.reg" />
            </c:if>
            <c:if test="${PROCESS == 'UPDATE'}">
              <spring:message code="sft.sft_0700.label.update" />
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

          <article class="registration-form inner-view-form">
            <h2 class="heading4">안전점검 및 순찰 정보</h2>

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
                      <spring:message code="sft.sft_0700.label.Project_name" />
                    </th>
                    <td colspan="3">
                      <!-- <div class="register-write w70p">
                        <div class="input-group">
                          <input type="text" title="프로젝트 명" placeholder="프로젝트 명을 입력해주세요">
                        </div>
                      </div> -->
                      <div class="select-group">
                        <select validation-check="required" id="PROJECT" validation-check="required" title="프로젝트 명">
                          <option selected value="">프로젝트 명</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0700.label.safety_checker" />
                    </th>
                    <td>
                      <div class="register-write w50p">
                        <div class="">
                          <!-- <input validation-check="required" id="CHECKER" type="text" title="안전 점검자" placeholder="성명을 입력해주세요"> -->
                          <input type="text" id="id_emp_str_uid_key_checker" validation-check="required" name="CHECKER"
                            value="${DATA.CHECKER}" hidden="true" />
                        </div>
                        <jsp:include page="../common/select_emp_btn.jsp">
                          <jsp:param name="key" value="key_checker" />
                          <jsp:param name="CRUD" value="${DATA.CRUD}" />
                          <jsp:param name="strEmpId" value="${DATA.CHECKER}" />
                          <jsp:param name="isOne" value="true" />
                          <jsp:param name="title" value="안전 점검자 설정" />
                        </jsp:include>
                      </div>
                    </td>
                    <th scope="row">
                      <spring:message code="sft.sft_0700.label.patrol_date" />
                    </th>
                    <td>
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label>
                          <input validation-check="required" id="CHECK_DATE" type="text" placeholder="YYYY-MM-DD"
                            title="날짜설정" class="datepicker" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <!-- 2022-04-25 add (@smlee) -->
                  <tr>
                    <th scope="row">문서번호</th>
                    <td colspan="3">
                      <div class="register-write">
                        <div class="input-group">
                          <input type="text" title="문서번호 입력" placeholder="문서 번호를 입력해주세요" id="DOC_NO">
                        </div>
                      </div>
                    </td>
                  </tr>
                  <!-- //2022-04-25 add (@smlee) -->
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0700.label.general_management" />
                    </th>
                    <td id="COMMON_CHECK">

                    </td>
                    <th scope="row">
                      <spring:message code="sft.sft_0700.label.health_care" />
                    </th>
                    <td id="HEALTH_CHECK">

                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0700.label.safety_management" />
                    </th>
                    <td id="SAFETY_CHECK">

                    </td>
                    <th scope="row">
                      <spring:message code="sft.sft_0700.label.task_management" />
                    </th>
                    <td id="WORKING_CHECK">

                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0700.label.environmental_management" />
                    </th>
                    <td id="ENVIROMENT_CHECK" colspan="3">

                    </td>
                  </tr>
                  <tr id="CHECK_LIST">
                    <th scope="row">
                      <spring:message code="safety.safety_0702.label.checkList" />
                    </th>
                    <td colspan="3">
                      <button id="BTN_CHECK_LIST" class="btn1" modal-id="layer_popup_check_list">
                        <spring:message code="button.setting" /></button>
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
              <i class="las la-edit"></i><span class="name">
                <spring:message code="button.save" /></span>
            </button>
            <button class="btn-style3" onclick="goList()">
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
<!-- ================================== -->
<!-- layer_popup_check_list-->
<!-- 현장 점검 확인 사항 설정 팝업 -->
<div class="layer-popup" id="layer_popup_check_list">
  <div class="popup-cont" style="min-width: 447px;">

    <h2 class="heading4">
      <spring:message code="safety.safety_0702.label.checkList" />
    </h2>
    <h3 class="heading5">항목 목록</h3>

    <div class="base-table">
      <table>
        <caption></caption>
        <colgroup>
          <col style="width: auto;">
          <col style="width: auto;">
          <col style="width: auto;">
        </colgroup>
        <thead>
          <tr>
            <th scope="col" class="txt-center"><spring:message code="hea.label.no"/></th>
            <th scope="col">점검 사항</th>
            <th scope="col" class="txt-center">설정</th>
          </tr>
        </thead>
        <tbody id="ON_SITE_CHECK_LIST">

        </tbody>
      </table>
    </div>

    <div class="foot-btn-area">
      <button class="btn-style3">취소</button>
      <button id="btn_save_popup_check_list" class="btn-style1">등록</button>
    </div>

    <button type="button" class="popup-close-btn">
      <i class="xi-close"></i>
    </button>
  </div>
</div>
<!-- //layer_popup_check_list -->

<c:set var="reset">
  <spring:message code="button.reset" />
</c:set>
<input id="reset" type="hidden" value="${reset}" />

<c:set var="checkList">
  <spring:message code="safety.safety_0702.label.checkList" />
</c:set>
<input id="checkList" type="hidden" value="${checkList}" />

<c:set var="division">
  <spring:message code="safety.safety_0702.label.division" />
</c:set>
<input id="division" type="hidden" value="${division}" />

<c:set var="Checking">
  <spring:message code="safety.safety_0702.label.Checking" />
</c:set>
<input id="Checking" type="hidden" value="${Checking}" />


<c:set var="Error">
  <spring:message code="safety.safety_0702.label.Error" />
</c:set>
<input id="Error" type="hidden" value="${Error}" />

<c:set var="Action">
  <spring:message code="safety.safety_0702.label.Action" />
</c:set>
<input id="Action" type="hidden" value="${Action}" />


<!-- 스크립트 -->
<script src="${ctxPath}/script/safety/safety_0701.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>
  $(document).ready(function () {
    safety_0701();
    getEmpInfos('key_checker', '${DATA.CHECKER}');
  });
</script>