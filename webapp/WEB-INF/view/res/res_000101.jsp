<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%
request.setCharacterEncoding("UTF-8");
%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>


<input type="hidden" id="PROCESS" name="PROCESS" value="${PROCESS}">
<input type="hidden" id="FIRE_PROTECTION_ID" name="FIRE_PROTECTION_ID" value="${DATA.FIRE_PROTECTION_ID}">

<main id="content" class="environ-page">
  <div class="container">
    <section class="hdSection">
      <!-- tit-wrap -->
      <div class="tit-wrap">
        <div class="tit-left">
          <h1 class="heading1">
            <c:if test="${PROCESS == 'INSERT'}">
              <spring:message code="res.res_000101.label.title.reg" />
            </c:if>
            <c:if test="${PROCESS == 'UPDATE'}">
              <spring:message code="res.res_000101.label.title.update" />
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
            <h2 class="heading4">
              <spring:message code="res.res_000101.label.employee_information" />
            </h2>
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
                    <th scope="row">
                      <spring:message code="res.res_000101.label.check_turbine" />
                    </th>
                    <td>
                      <!-- <div class="register-write">
                            <div class="input-group">
                              <input type="text" title="점검 터빈" placeholder="점검 터빈">
                            </div>
                          </div> -->
                      <div class="select-group">
                        <select validation-check="required" id="TURBINE" validation-check="required" title="점검 터빈">
                          <option selected value="">점검 터빈</option>
                        </select>
                      </div>
                    </td>
                    <th scope="row">
                      <spring:message code="res.res_000101.label.checker" />
                    </th>
                    <td>
                      <!-- <div class="register-write">
                            <div class="input-group">
                              <input type="text" title="점검자" placeholder="점검자">
                            </div>
                          </div> -->
                      <div class="register-write w30p">
                        <!-- <div class="input-group">
                              <input  validation-check="required" id="INVESTOR" type="text" title="발주처" placeholder="발주처를 입력해주세요">
                            </div> -->
                        <div class="">
                          <!-- <label for="MANAGER">${DATA.MANAGER }</label>
                              <input type="text" placeholder="관리 책임자를 입력해주세요" id="MANAGER" validation-check="required" name="MANAGER" value="${DATA.MANAGER }" readonly="true" hidden="true"/> -->
                          <input type="text" id="id_emp_str_uid_key_checker" validation-check="required" name="CHECKER"
                            value="${DATA.CHECKER_ID}" hidden="true" />
                        </div>
                        <jsp:include page="../common/select_emp_btn.jsp">
                          <jsp:param name="key" value="key_checker" />
                          <jsp:param name="CRUD" value="${DATA.CRUD}" />
                          <jsp:param name="strEmpId" value="${DATA.CHECKER}" />
                          <jsp:param name="isOne" value="true" />
                          <jsp:param name="title" value="점검자 설정" />
                        </jsp:include>
                      </div>
                    </td>
                    <th scope="row">
                      <spring:message code="res.res_000101.label.inspection_date" />
                    </th>
                    <td>
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label>
                          <input validation-check="required" id="INSPECTION_DATE" type="text" placeholder="YYYY-MM-DD"
                            title="날짜설정" class="datepicker" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article class="registration-form">
            <h2 class="heading4">
              <spring:message code="res.res_000101.label.Checklist" />
            </h2>
            <div class="base-table custom-table2">
              <table>
                <caption></caption>
                <colgroup>
                  <col style="width: 22%;">
                  <col style="width: 50%;">
                  <col style="width: 28%;">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col" class="txt-center"></th>
                    <th scope="col" class="check-lst-txt">
                      <spring:message code="res.res_000101.label.Checking_list" />
                    </th>
                    <th scope="col" class="txt-center">
                      <spring:message code="res.res_000101.label.Inspection" />
                    </th>
                  </tr>
                </thead>
                <tbody id="ROW_CHECKLIST">
                </tbody>
              </table>
            </div>
          </article>

          <!-- D : registration-form (add, delete, typing) -->
         <!--  <article class="registration-form">
            <h2 class="heading4">registration-form (add, delete, typing)</h2>
            <div class="base-table custom-table2">
              <table>
                <caption></caption>
                <colgroup>
                  <col style="width: 22%;">
                  <col style="width: 50%;">
                  <col style="width: 28%;">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col" class="txt-center"></th>
                    <th scope="col" class="check-lst-txt">점검사항</th>
                    <th scope="col" class="txt-center">점검유무</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" rowspan="8" class="txt-center">소화기</th>
                    <td>
                      add area
                      <div class="flexWrap">
                        <div class="register-write w100p">
                          <div class="input-group">
                            <input type="text" title="내용 입력" placeholder="내용을 입력해주세요">
                          </div>
                        </div>
                        <button class="btn7-1">
                          <i class="las la-plus"></i>
                        </button>
                      </div>
                      //add area
                    </td>
                    <td class="txt-center">
                      <span class="checkbox-radio-group">
                        <label for="EX1-1" class="radio">
                          <input type="radio" name="EX1" id="EX1-1" checked>
                          <span class="circle"></span>
                          <em>이상 없음</em>
                        </label>
                      </span>
                      <span class="checkbox-radio-group">
                        <label for="EX1-2" class="radio">
                          <input type="radio" name="EX1" id="EX1-2">
                          <span class="circle"></span>
                          <em>수리 필요</em>
                        </label>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td class="txt-center">
                      <span class="checkbox-radio-group">
                        <label for="EX2-1" class="radio">
                          <input type="radio" name="EX2" id="EX2-1" checked>
                          <span class="circle"></span>
                          <em>이상 없음</em>
                        </label>
                      </span>
                      <span class="checkbox-radio-group">
                        <label for="EX2-2" class="radio">
                          <input type="radio" name="EX2" id="EX2-2">
                          <span class="circle"></span>
                          <em>수리 필요</em>
                        </label>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      add area
                      <div class="flexWrap">
                        <div class="register-write w100p">
                          <div class="input-group">
                            <input type="text" title="내용 입력" placeholder="내용을 입력해주세요">
                          </div>
                        </div>
                        <button class="btn7-2">
                          <i class="las la-minus"></i>
                        </button>
                      </div>
                      //add area
                    </td>
                    <td class="txt-center">
                      <span class="checkbox-radio-group">
                        <label for="EX3-1" class="radio">
                          <input type="radio" name="EX3" id="EX3-1" checked>
                          <span class="circle"></span>
                          <em>이상 없음</em>
                        </label>
                      </span>
                      <span class="checkbox-radio-group">
                        <label for="EX3-2" class="radio">
                          <input type="radio" name="EX3" id="EX3-2">
                          <span class="circle"></span>
                          <em>수리 필요</em>
                        </label>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      add area
                      <div class="flexWrap">
                        <div class="register-write w100p">
                          <div class="input-group">
                            <input type="text" title="내용 입력" placeholder="내용을 입력해주세요">
                          </div>
                        </div>
                        <button class="btn7-2">
                          <i class="las la-minus"></i>
                        </button>
                        <button class="btn7-1">
                          <i class="las la-plus"></i>
                        </button>
                      </div>
                      //add area
                    </td>
                    <td class="txt-center">
                      <span class="checkbox-radio-group">
                        <label for="EX4-1" class="radio">
                          <input type="radio" name="EX4" id="EX4-1" checked>
                          <span class="circle"></span>
                          <em>이상 없음</em>
                        </label>
                      </span>
                      <span class="checkbox-radio-group">
                        <label for="EX4-2" class="radio">
                          <input type="radio" name="EX4" id="EX4-2">
                          <span class="circle"></span>
                          <em>수리 필요</em>
                        </label>
                      </span>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </article> -->

        </div>
        <!-- // left area -->
        <!-- right area -->
        <div class="right-area">
          <div class="right-btn-type">
            <button id="SAVE_BTN" class="btn-style1">
              <i class="las la-edit"></i><span class="name">
                <spring:message code="button.save" /></span>
            </button>
            <c:if test="${PROCESS == 'UPDATE'}">
              <button id="DELETE_BTN" class="btn-style5">
                <i class="las la-trash-alt"></i><span class="name">
                  <spring:message code="button.delete" /></span>
              </button>
            </c:if>
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
      <button class="btn-style3">
        <i class=" las la-reply"></i><span class="name">취소</span>
      </button>
      <button class="btn-style1">
        <i class="las la-save"></i><span class="name">저장</span>
      </button>
    </div>

    <button type="button" class="popup-close-btn">
      <i class="xi-close"></i>
    </button>
  </div>
</div>
<!-- //layer-popup -->

<script src="${ctxPath}/script/res/res_000101.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script type="text/javascript">
  var ctx = '${CTX}';
  var param = '${DATA}';
  $(document).ready(function () {
    res_000101();
    getEmpInfos('key_checker', '${DATA.CHECKER_ID}');
  });
</script>