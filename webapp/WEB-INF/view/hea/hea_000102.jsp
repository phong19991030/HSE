<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
  .btns {
    margin: 10px 0 0 0;
  }

  #layerPopup .layer-cont.COMPANY {
    width: 700px;
  }
</style>

<input type="hidden" id="PROCESS" name="PROCESS" value="${PROCESS}">
<input type="hidden" id="EMP_NO" name="EMP_NO" value="${DATA.EMP_NO}">
<main id="content" class="health-page">
  <div class="container">
    <section class="hdSection">
      <!-- tit-wrap -->
      <div class="tit-wrap">
        <div class="tit-left">
          <c:choose>
            <c:when test="${DATA.EMP_NO eq null}">
              <h1 class="heading1">
                <spring:message code="hea.hea_000102.title.register" />
              </h1>
            </c:when>
            <c:otherwise>
              <h1 class="heading1">
                <spring:message code="hea.hea_000102.title.modify" />
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

          <!-- approval-view -->
          <article class="registration-form" id="APPROVER_VIEW">
            <h2 class="heading4">결재라인</h2>
            <div class="approval-select-area">
              <button id="BTN_POPUP_EMP">결재라인을 지정해주세요</button>
            </div>
          </article>

          <article class="registration-form">
            <h2 class="heading4">
              <spring:message code="hea.hea_0001.title.health_2" />
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
                      <spring:message code="hea.label.empName" />
                    </th>
                    <td>
                      <div class="register-write">
                        <div class="input-group">
                          <input type="text" id="EMP_NAME" title="성명" placeholder="성명" validation-check="required">
                        </div>
                      </div>
                    </td>
                    <th scope="row">
                      <spring:message code="hea.label.duty" />
                    </th>
                    <td>
                      <div class="select-group">
                        <select title="직급" id="DUTY_CD" validation-check="required">
                          <option value="" selected>직급</option>
                          <c:forEach items="${COM_LIST}" var="COM">
                            <option value="${COM.COMM_CD}">${COM.COMM_NM}</option>
                          </c:forEach>
                        </select>
                      </div>
                      <!-- 2022-04-21 add (@smlee) -->
                      <div class="select-group">
                      <select title="직책" id="POSITION_CD" validation-check="required">
                          <option value="" selected>직책</option>
                          <c:forEach items="${POSITION_LIST}" var="COM">
                            <option value="${COM.COMM_CD}">${COM.COMM_NM}</option>
                          </c:forEach>
                        </select>
                      </div>

                      <!-- <div class="register-write">
												<div class="input-group">
													<input type="text" title="직급" placeholder="직급" id="DUTY_CD">
												</div>
											</div> -->
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="hea.label.area" />
                    </th>
                    <td>
                      <div class="register-write w100p">
                        <div class="input-group">
                          <input type="text" title="담당 분야" id="AREA_CD"
                            placeholder="담당 분야를 입력해주세요">
                        </div>
                      </div>
                    </td>
                    <th scope="row">
                      <spring:message code="hea.label.expr" />
                    </th>
                    <td>
                      <div class="register-write w50p">
                        <div class="input-group">
                          <input type="number" title="근무 경력" id="EXPR" placeholder="근무 경력(개월)" >
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="hea.label.mainExpr" />
                    </th>
                    <td colspan="3">
                      <!-- <div class="register-write w100p">
                        <div class="input-group">
                          <textarea title="주요 경력" placeholder="주요 경력을 입력해주세요" id="MAIN_EXPR"
                            validation-check="required"></textarea>
                        </div>
                      </div> -->

                      <!-- 2022-04-21 add (@smlee) -->
                      <div class="staff-info-area">
                        <div class="base-table">
                          <table>
                            <colgroup>
                              <col style="width: 4%;">
                              <col style="width: 29%;">
                              <col style="width: 34%;">
                              <col style="width: 33%;">
                            </colgroup>
                            <thead>
                              <tr>
                                <th scope="col">No</th>
                                <th scope="col">프로젝트명</th>
                                <th scope="col">수행기간</th>
                                <th scope="col">주요 수행 사항</th>
                              </tr>
                            </thead>
                            <tbody id="EXP_ROWS">
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="hea.label.mainDegree" />
                    </th>
                    <td colspan="3">
                      <!-- <div class="register-write w100p">
                        <div class="input-group">
                          <textarea title="주요 자격" placeholder="주요 자격을 입력해주세요" id="MAIN_DEGREE"
                            validation-check="required"></textarea>
                        </div>
                      </div> -->
                      <!-- 2022-04-21 add (@smlee) -->
                      <div class="staff-info-area">
                        <div class="base-table">
                          <table>
                            <colgroup>
                              <col style="width: 4%;">
                              <col style="width: 29%;">
                              <col style="width: 34%;">
                              <col style="width: 33%;">
                            </colgroup>
                            <thead>
                              <tr>
                                <th scope="col">No</th>
                                <th scope="col">자격명</th>
                                <th scope="col">취득 일자</th>
                                <th scope="col">갱신 일자</th>
                              </tr>
                            </thead>
                            <tbody id="DEGREE_ROWS">
                            
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="hea.label.safeCourseCert" />
                    </th>
                    <td>
                      <!-- 2022-04-21 add (@smlee) -->
                      <div class="flexWrap">
                        <span class="checkbox-radio-group mgl5">
                          <input type="checkbox" name="checkbox" id="CHECK">
                          <label for="CHECK">미이수</label>
                        </span>

                        <span class="checkbox-devide-line"></span>

                        <div class="register-write w100p" style="display: flex">
                          <div class="input-group">
                            <input type="text" title="안전교육 이수" placeholder="안전교육을 선택해주세요"
                              id="SAFE_COURSE_CERT">
                          </div>
                          <!-- <%-- <button id="BTN_POPUP_SAFE" class="btn1" style="margin: 5px"><spring:message code="button.select" /></button> --%> -->
                        </div>

                      </div>
                    </td>
                    <th scope="row"><span>
                        <spring:message code="com.com_0101.label.company" /></span></th>
                    <td>
                      <div class="register-write " style="display: flex">
                        <div class="input-group">
                          <label for="COMPANY" class="sr-only">
                            <spring:message code="com.com_0101.label.company" /></label>
                          <input validation-check="required" type="text" id="COMPANY" placeholder="회사 명" readonly>
                        </div>
                        <button id="COMPANY_SEARCH_BTN" type="button" class="input-btn btn-style1" style="margin: 5px">
                          <spring:message code="button.select" /></button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="hea.label.certDate" />
                    </th>
                    <td>
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label> <input type="text" placeholder="YYYY-MM-DD" title="날짜설정"
                            class="datepicker" validation-check="required" readonly id="CERT_DATE">
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                    </td>
                    <th scope="row">
                      <spring:message code="hea.label.renewalCertDate" />
                    </th>
                    <td>
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label> <input type="text" placeholder="YYYY-MM-DD" title="날짜설정"
                            class="datepicker" validation-check="required" readonly id="RENEWAL_CERT_DATE">
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                      
                      <!-- 2022-04-21 add (@smlee) -->
                      <!--  D : Please let the text be displayed when the update date is reached -->

                      <!-- <span class="red">갱신 필요</span> -->
                      
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="hea.label.pprStatus" />
                    </th>
                    <td colspan="3">
                      <div class="select-group">
                        <select title="개인보호장비 지급여부" id="PPE_STATUS" validation-check="required">
                          <option value="">지급완료</option>
                          <c:forEach items="${PAID_LIST}" var="ppeStatus" varStatus="loop">
                            <option value="${ppeStatus.COMM_CD}">${ppeStatus.COMM_NM}</option>
                          </c:forEach>
                        </select>
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
            <button class="btn-style1" id="SAVE_BTN">
              <i class="las la-edit"></i><span class="name">
                <spring:message code="button.save" /></span>
            </button>
            <button class="btn-style3" id="CANCEL_BTN">
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

<!-- layerpopup -->
<div id="layerPopupCompany" class="layer-popup"></div>

<!-- layer-popup -->
<div class="layer-popup" id="layer-popup-safe">
  <div class="popup-cont" style="width: 720px;">

    <h2 class="heading4">안전교육 선택</h2>
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
    <article class="list-form">
      <h3 class="heading5">안전교육 목록</h3>
      <div class="base-table">
        <table>
          <caption></caption>
          <colgroup>
            <col style="width: 5%;">
            <col style="width: 60%;">
            <col style="width: 10%;">
            <col style="width: 15%;">
          </colgroup>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">교육명/프로젝트명</th>
              <th scope="col">진행자</th>
              <th scope="col">수행 일자</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="checkbox-radio-group"> <label><input type="checkbox" name="checkbox"></label>
                </span></td>
              <td>
                <p>울진풍력발전단지 드론을 이용한 블레이드 점검 울진풍력발전단지 드론을 이용한 블레이드 점검울진풍력발전단지
                  드론을 이용한 블레이드 점검울진풍력발전단지 드론을 이용한 블레이드 점검울진풍력발전단지 드론을 이용한 블레이드
                  점검울진풍력발전단지 드론을 이용한 블레이드 점검</p>
              </td>
              <td>
                <p>홍길동</p>
              </td>
              <td>
                <p>2020.02.10</p>
              </td>
            </tr>
            <tr>
              <td><span class="checkbox-radio-group"> <label><input type="checkbox" name="checkbox"></label>
                </span></td>
              <td>
                <p>울진풍력발전단지 드론을 이용한 블레이드 점검 울진풍력발전단지 드론을 이용한 블레이드 점검울진풍력발전단지
                  드론을 이용한 블레이드 점검울진풍력발전단지 드론을 이용한 블레이드 점검울진풍력발전단지 드론을 이용한 블레이드
                  점검울진풍력발전단지 드론을 이용한 블레이드 점검</p>
              </td>
              <td>
                <p>홍길동</p>
              </td>
              <td>
                <p>2020.02.10</p>
              </td>
            </tr>
            <tr>
              <td><span class="checkbox-radio-group"> <label><input type="checkbox" name="checkbox"></label>
                </span></td>
              <td>
                <p>울진풍력발전단지 드론을 이용한 블레이드 점검 울진풍력발전단지 드론을 이용한 블레이드 점검울진풍력발전단지
                  드론을 이용한 블레이드 점검울진풍력발전단지 드론을 이용한 블레이드 점검울진풍력발전단지 드론을 이용한 블레이드
                  점검울진풍력발전단지 드론을 이용한 블레이드 점검</p>
              </td>
              <td>
                <p>홍길동</p>
              </td>
              <td>
                <p>2020.02.10</p>
              </td>
            </tr>
            <tr>
              <td><span class="checkbox-radio-group"> <label><input type="checkbox" name="checkbox"></label>
                </span></td>
              <td>
                <p>울진풍력발전단지 드론을 이용한 블레이드 점검 울진풍력발전단지 드론을 이용한 블레이드 점검울진풍력발전단지
                  드론을 이용한 블레이드 점검울진풍력발전단지 드론을 이용한 블레이드 점검울진풍력발전단지 드론을 이용한 블레이드
                  점검울진풍력발전단지 드론을 이용한 블레이드 점검</p>
              </td>
              <td>
                <p>홍길동</p>
              </td>
              <td>
                <p>2020.02.10</p>
              </td>
            </tr>
            <tr>
              <td><span class="checkbox-radio-group"> <label><input type="checkbox" name="checkbox"></label>
                </span></td>
              <td>
                <p>울진풍력발전단지 드론을 이용한 블레이드 점검 울진풍력발전단지 드론을 이용한 블레이드 점검울진풍력발전단지
                  드론을 이용한 블레이드 점검울진풍력발전단지 드론을 이용한 블레이드 점검울진풍력발전단지 드론을 이용한 블레이드
                  점검울진풍력발전단지 드론을 이용한 블레이드 점검</p>
              </td>
              <td>
                <p>홍길동</p>
              </td>
              <td>
                <p>2020.02.10</p>
              </td>
            </tr>
            <tr>
              <td><span class="checkbox-radio-group"> <label><input type="checkbox" name="checkbox"></label>
                </span></td>
              <td>
                <p>울진풍력발전단지 드론을 이용한 블레이드 점검</p>
              </td>
              <td>
                <p>홍길동</p>
              </td>
              <td>
                <p>2020.02.10</p>
              </td>
            </tr>
            <tr>
              <td><span class="checkbox-radio-group"> <label><input type="checkbox" name="checkbox"></label>
                </span></td>
              <td>
                <p>울진풍력발전단지 드론을 이용한 블레이드 점검</p>
              </td>
              <td>
                <p>홍길동</p>
              </td>
              <td>
                <p>2020.02.10</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
    <div class="foot-btn-area">
      <button class="btn-style3">
        <i class=" las la-reply"></i><span class="name">취소</span>
      </button>
      <button class="btn-style1">
        <i class="las la-edit"></i><span class="name">등록</span>
      </button>
    </div>

    <button type="button" class="popup-close-btn">
      <i class="xi-close"></i>
    </button>
  </div>
</div>
<!-- //layer-popup -->

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
      <button class="btn-style3">취소</button>
      <button class="btn-style1" id="BTN_SAVE_POPUP_APPROVER">저장</button>
    </div>

    <button type="button" class="popup-close-btn">
      <i class="xi-close"></i>
    </button>
  </div>
</div>
<!-- //layer-popup -->

<script src="${ctxPath}/script/hea/hea_000102.js"></script>
<script src="${ctxPath}/script/com/com-element.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>
  $(document).ready(function () {
    hea_000102();
  });
</script>