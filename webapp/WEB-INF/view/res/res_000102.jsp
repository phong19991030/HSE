<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%
request.setCharacterEncoding("UTF-8");
%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<input type="hidden" id="FIRE_PROTECTION_ID" name="FIRE_PROTECTION_ID" value="${DATA.FIRE_PROTECTION_ID}">

<main id="content" class="environ-page">
      <div class="container">
        <section class="hdSection">
          <!-- tit-wrap -->
          <div class="tit-wrap">
            <div class="tit-left">
              <h1 class="heading1"><spring:message code="res.res_000102.label.title" /></h1>
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
                <h2 class="heading4"><spring:message code="res.res_000102.label.employee_information" /></h2>
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
                        <th scope="row"><spring:message code="res.res_000102.label.check_turbine" /></th>
                        <td id="TURBINE_NAME"></td>
                        <th scope="row"><spring:message code="res.res_000102.label.checker" /></th>
                        <td id="CHECKER_NAME"></td>
                        <th scope="row"><spring:message code="res.res_000102.label.inspection_date" /></th>
                        <td id="INSPECTION_DATE"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>

              <article class="registration-form">
                <h2 class="heading4"><spring:message code="res.res_000102.label.Checklist" /></h2>
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
                        <th scope="col" class="check-lst-txt"><spring:message code="res.res_000102.label.Checking_list" /></th>
                        <th scope="col" class="txt-center"><spring:message code="res.res_000102.label.Inspection" /></th>
                      </tr>
                    </thead>
                    <tbody id="ROW_CHECKLIST">
                      <!-- <tr>
                        <th scope="row" rowspan="8" class="txt-center">소화기</th>
                        <td class="check-lst-txt">1. 소화기의 안전핀에 이상이 없는가?</td>
                        <td class="txt-center"><span class="green f-bold">이상없음</span></td>
                      </tr>
                      <tr>
                        <td class="check-lst-txt">2. 소화기의 손잡이에 이상이 없는가?</td>
                        <td class="txt-center"><span class="green f-bold">이상없음</span></td>
                      </tr>
                      <tr>
                        <td class="check-lst-txt">3. 소화기의 봉인줄이 풀어져 있는가?</td>
                        <td class="txt-center"><span class="green f-bold">이상없음</span></td>
                      </tr>
                      <tr>
                        <td class="check-lst-txt">4. 노즐에 이상이 없는가?</td>
                        <td class="txt-center"><span class="green f-bold">이상없음</span></td>
                      </tr>
                      <tr>
                        <td class="check-lst-txt">5. 도색한 소화기에 칠이 떨어졌거나 몸통이 부식되어 있는가?</td>
                        <td class="txt-center"><span class="green f-bold">이상없음</span></td>
                      </tr>
                      <tr>
                        <td class="check-lst-txt">6. 소화기의 외관이 청결한가?</td>
                        <td class="txt-center"><span class="green f-bold">이상없음</span></td>
                      </tr>
                      <tr>
                        <td class="check-lst-txt">7. 소화기의 관리번호가 기입되어 있는가?</td>
                        <td class="txt-center"><span class="green f-bold">이상없음</span></td>
                      </tr>
                      <tr>
                        <td class="check-lst-txt">8. 소화기 비치가 잘 되어 있는가?</td>
                        <td class="txt-center"><span class="green f-bold">이상없음</span></td>
                      </tr>
                      <tr>
                        <th scope="row" rowspan="3" class="txt-center">자동 소화설비</th>
                        <td class="check-lst-txt">1. 동작에 이상이 없는가?</td>
                        <td class="txt-center"><span class="green f-bold">이상없음</span></td>
                      </tr>
                      <tr>
                        <td class="check-lst-txt">2. 소화재에 이상이 없는가?</td>
                        <td class="txt-center"><span class="green f-bold">이상없음</span></td>
                      </tr>
                      <tr>
                        <td class="check-lst-txt">3. 센서에 이상이 없는가?</td>
                        <td class="txt-center"><span class="green f-bold">이상없음</span></td>
                      </tr>
                      <tr>
                        <th scope="row" rowspan="3" class="txt-center">화재 경보기</th>
                        <td class="check-lst-txt">1. 동작에 이상이 없는가?</td>
                        <td class="txt-center"><span class="green f-bold">이상없음</span></td>
                      </tr>
                      <tr>
                        <td class="check-lst-txt">2. 경보음에 이상이 없는가?</td>
                        <td class="txt-center"><span class="green f-bold">이상없음</span></td>
                      </tr>
                      <tr>
                        <td class="check-lst-txt">3. 화재감시 이상이 없는가?</td>
                        <td class="txt-center"><span class="green f-bold">이상없음</span></td>
                      </tr> -->
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
                <button onclick="goList()" class="btn-style3">
                  <i class=" las la-reply"></i><span class="name"><spring:message code="button.back" /></span>
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
  <script src="${ctxPath}/script/res/res_000102.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>	
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script type="text/javascript">
	var ctx = '${CTX}';
	$(document).ready(function() { 
		res_000102();
	});
</script>
  