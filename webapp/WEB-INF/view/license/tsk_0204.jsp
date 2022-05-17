<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%
request.setCharacterEncoding("UTF-8");
%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<style>
/* input type이 number인 경우 화살표 css 제거 */
input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button
	{
	-webkit-appearance: none;
	margin: 0;
}

span#MANUFACTURER_NM, span#POWER, span#TOWER_H, span#ROTOR_D {
	height: 32px;
	display: inline-block;
	line-height: 32px;
}

.btns {
	margin: 10px 0 0 0;
}

#layerPopup .layer-cont.OPERATOR {
	width: 700px;
}

#layerPopup .layer-cont.TURBINE-MODEL {
	width: 1060px;
}

#layerPopup .layer-cont.TURBINE-MODEL .base_grid_table td {
	border-bottom: 1px solid #ddd;
	border-right: 1px solid #e2e2e2;
	border-left: 1px solid #c8c8ca;
}

#layerPopup .layer-cont.TURBINE-MODEL .base_grid_table th {
	border-bottom: 1px solid #ddd;
	border-right: 1px solid #e2e2e2;
	border-left: 1px solid #c8c8ca;
}
</style>

<!-- insert, update -->
<span  hidden id="CRUD" name="CRUD"/>${DATA.CRUD}</span>
<input type="hidden"  id="RISK_ASSESSMENT_ID" name="RISK_ASSESSMENT_ID" value="${DATA.LICENSE_ID}"/>
<span hidden id="subTittleModify"><spring:message code="license.tsk_0100.label.subTittleModify" /></span>
<span  hidden id="subTittleRegister"><spring:message code="license.tsk_0100.label.subTittleRegister" /></span>


<!-- Emp Detail -->
<main id="content" class="work-page">
      <div class="container">
        <section class="hdSection">
          <!-- tit-wrap -->
          <div class="tit-wrap">
            <div class="tit-left">
              <h1 class="heading1">위험성 평가 관리 수정</h1>
            </div>
          </div>
          <!-- //tit-wrap -->
        </section>
        <section class="contSection">
          <div class="content clearfix">

            <!-- left area -->
            <div class="left-area">
              <article class="approval-view">
                <div class="flexWrap">
                  <h2 class="heading4">결재라인</h2>
                  <button class="btn2 refresh-btn" modal-id="layer-popup1">
                    <span class="name">결재라인 재지정</span>
                  </button>
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

              <article class="registration-form inner-view-form">
                <h2 class="heading4">위험성 평가 정보</h2>
                <div class="base-table">
                  <table>
                    <caption></caption>
                    <colgroup>
                      <col style="width: 10%;">
                      <col style="width: 90%;">
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row">프로젝트명</th>
                        <td>
                          <div class="register-write w70p">
                            <div class="input-group">
                              <input type="text" title="프로젝트명" placeholder="프로젝트명을 입력해주세요"
                                value="동복 풍력발전단지 13호기 Gearbox Oil Pump 교체">
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">작업 일자</th>
                        <td>
                          <div class="calendar-picker">
                            <div class="input-group">
                              <label class="sr-only">날짜설정</label>
                              <input type="text" title="날짜설정" placeholder="YYYY-MM-DD" class="datepicker"
                                value="2020-08-12" readonly>
                              <button class="calendar-picker-btn"></button>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">작업명</th>
                        <td>
                          <div class="register-write w70p">
                            <div class="input-group">
                              <input type="text" title="작업명" placeholder="작업명을 입력해주세요" value="악쇼나 1.5MW 블레이드 베어링 교체">
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">작업 내용</th>
                        <td>
                          <div class="flexWrap">
                            <div class="register-write w70p">
                              <div class="input-group">
                                <input type="text" title="작업명" placeholder="작업 내용을 입력해주세요" value="Gearbox Oil Pump 교체">
                              </div>
                            </div>
                          </div>
                          <div class="flexWrap">
                            <div class="register-write w70p">
                              <div class="input-group">
                                <input type="text" title="작업명" placeholder="작업 내용을 입력해주세요" value="UPS 배터리 교체">
                              </div>
                            </div>
                            <button class="btn6-2 motion">
                              <i class="lar la-trash-alt"></i>
                            </button>
                            <button class="btn6-1 motion">
                              <i class="las la-plus"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">책임자</th>
                        <td>
                          <div class="check-selected-wrap">
                            <button class="btn1 style2" modal-id="layer-popup2">재 설정</button>
                            <ul>
                              <li>
                                <span class="badge-custom8">
                                  <i class="number">1</i>
                                  <span class="txt-inner">
                                    <em class="company">제주에너지공사</em>
                                    <em class="name">채길동</em>
                                    <em class="position">책임연구원</em>
                                  </span>
                                </span>
                              </li>
                              <li></li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">참여자</th>
                        <td>
                          <div class="check-selected-wrap">
                            <button class="btn1 style2" modal-id="layer-popup3">재 설정</button>
                            <ul>
                              <li>
                                <span class="badge-custom8">
                                  <i class="number">1</i>
                                  <span class="txt-inner">
                                    <em class="company">제주에너지공사</em>
                                    <em class="name">이길동</em>
                                    <em class="position">과장</em>
                                  </span>
                                </span>
                              </li>
                              <li>
                                <span class="badge-custom8">
                                  <i class="number">2</i>
                                  <span class="txt-inner">
                                    <em class="company">제주에너지공사</em>
                                    <em class="name">박길동</em>
                                    <em class="position">대리</em>
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">개인보호장비</th>
                        <td>
                          <div class="check-selected-wrap">
                            <button class="btn1 style2" modal-id="layer-popup4">재 설정</button>
                            <ul>
                              <li>
                                <span class="badge-custom4">안전모</span>
                              </li>
                              <li>
                                <span class="badge-custom4">멀티미터</span>
                              </li>
                              <li>
                                <span class="badge-custom4">하네스</span>
                              </li>
                              <li>
                                <span class="badge-custom4">안면보호대</span>
                              </li>
                              <li>
                                <span class="badge-custom4">고글</span>
                              </li>
                              <li>
                                <span class="badge-custom4">Lock out-Tag out</span>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">공구 및 장비</th>
                        <td>
                          <div class="register-write w20p">
                            <div class="input-group">
                              <input type="text" title="장비명" placeholder="장비명" value="블레이드 베어링 교체 공구">
                            </div>
                          </div>
                          <div class="register-write w50p">
                            <div class="input-group">
                              <input type="text" title="사용목적" placeholder="사용목적을 입력해주세요" value="블레이드 교체">
                            </div>
                          </div>
                          <button class="btn6-1 motion mgl5">
                            <i class="las la-plus"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">재료 및 소모품</th>
                        <td>
                          <div class="select-group">
                            <select title="재료 및 소모품">
                              <option selected>N/A</option>
                              <option>N/A</option>
                              <option>N/A</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">위험성 평가<br />키워드</th>
                        <td>
                          <div class="select-group w20p">
                            <select title="위험성 평가 키워드">
                              <option selected>고소작업에 따른 위험요소</option>
                              <option>선택</option>
                              <option>선택</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">위험성 평가 수행</th>
                        <td>
                          <div class="risk-assessment-area">
                            <!-- 위험성 평가 수행 입력 영역-->
                            <section class="section1">
                              <h4 class="tit">입력값은<span>1,2,3,4, or 5</span>로 입력해주세요.</h4>

                              <div class="view-form">
                                <div class="base-table center-table">
                                  <table>
                                    <caption></caption>
                                    <colgroup>
                                      <col style="width: 12%;">
                                      <col style="width: 25%;">
                                      <col style="width: 5%;">
                                      <col style="width: 5%;">
                                      <col style="width: 5%;">
                                      <col style="width: 33%;">
                                      <col style="width: 5%;">
                                      <col style="width: 5%;">
                                      <col style="width: 5%;">
                                    </colgroup>
                                    <thead>
                                      <tr>
                                        <th scope="col">작업사항</th>
                                        <th scope="col" class="txt-left">잠재적인 위험 요소 (Potential Hazard) </th>
                                        <th scope="col">빈도 L</th>
                                        <th scope="col">결과 C</th>
                                        <th scope="col">위험성 Risk</th>
                                        <th scope="col" class="txt-left">감소대책 (Risk Control)</th>
                                        <th scope="col">빈도 L</th>
                                        <th scope="col">결과 C</th>
                                        <th scope="col">위험성 Risk</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td rowspan="3" class="bl-none">크레인 셋업 및 사용</td>
                                        <td class="txt-left">장비 제원 이상의 중량물 운반 중 장비
                                          전도 및 중량물 낙하사고</td>
                                        <td>
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="2">
                                            </div>
                                          </div>
                                        </td>
                                        <td class="bl-none">
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="5">
                                            </div>
                                          </div>
                                        </td>
                                        <td class="bl-none">
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="10">
                                            </div>
                                          </div>
                                        </td>
                                        <td class="txt-left">
                                          <p>1. 크레인 제원표 확인</p>
                                          <p>2. 중량물 제원 확인 후 작업</p>
                                        </td>
                                        <td>
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="1">
                                            </div>
                                          </div>
                                        </td>
                                        <td class="bl-none">
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="1">
                                            </div>
                                          </div>
                                        </td>
                                        <td class="bl-none">
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="1">
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td class="txt-left">기초 지반 침하에 의한 크레인 전도 사고</td>
                                        <td>
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="3">
                                            </div>
                                          </div>
                                        </td>
                                        <td class="bl-none">
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="5">
                                            </div>
                                          </div>
                                        </td>
                                        <td class="bl-none">
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="15">
                                            </div>
                                          </div>
                                        </td>
                                        <td class="txt-left">
                                          <p>1. 작업 전 지반상태 확인</p>
                                          <p>2. 아웃트리거 침목 지지력 분산 및 침목 상태 확인</p>
                                        </td>
                                        <td>
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="1">
                                            </div>
                                          </div>
                                        </td>
                                        <td class="bl-none">
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="1">
                                            </div>
                                          </div>
                                        </td>
                                        <td class="bl-none">
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="1">
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td class="txt-left">
                                          공구 불량으로 인한 중량물 낙하 사고</td>
                                        <td>
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="2">
                                            </div>
                                          </div>
                                        </td>
                                        <td class="bl-none">
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="5">
                                            </div>
                                          </div>
                                        </td>
                                        <td class="bl-none">
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="10">
                                            </div>
                                          </div>
                                        </td>
                                        <td class="txt-left">
                                          <p>1. 풍속 10m/s 이상 시 작업 중지</p>
                                          <p>2. 시간당 10mm 우천 시 작업 중지 </p>
                                        </td>
                                        <td>
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="1">
                                            </div>
                                          </div>
                                        </td>
                                        <td class="bl-none">
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="1">
                                            </div>
                                          </div>
                                        </td>
                                        <td class="bl-none">
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="1">
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td class="bl-none">블레이드 베어링교체 지그 및 슬링 외 공구</td>
                                        <td class="txt-left">공구 불량으로 인한 중량물 낙하 사고</td>
                                        <td>
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="2">
                                            </div>
                                          </div>
                                        </td>
                                        <td class="bl-none">
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="5">
                                            </div>
                                          </div>
                                        </td>
                                        <td class="bl-none">
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="10">
                                            </div>
                                          </div>
                                        </td>
                                        <td class="txt-left">
                                          <p>1. 중량물 공구에 대한 사전 검사</p>
                                          <p>2. 슬링 상태 확인, Spec. 및 Certi 확인</p>
                                        </td>
                                        <td>
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="1">
                                            </div>
                                          </div>
                                        </td>
                                        <td class="bl-none">
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="1">
                                            </div>
                                          </div>
                                        </td>
                                        <td class="bl-none">
                                          <div class="register-write">
                                            <div class="input-group">
                                              <input type="text" title="입력" placeholder="1">
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </section>

                            <!-- 위험성 평가 결과 추정 -->
                            <section class="section2">
                              <h4 class="tit">위험성 평가 결과 추정</h4>
                              <ul class="risk-result-area">
                                <li>
                                  <div class="value-box-wrap">
                                    <span class="title">[위험성 평가 전 결과]</span>
                                    <small class="x-axis">빈도 (LIKELIHOOD)</small>
                                    <small class="y-axis">결과 (CONSEQUENCES)</small>

                                    <ul class="value-box">
                                      <!-- D :  type color 
                                      1. type1 : Yellow
                                      2. type2 : Orange
                                      3. tyep3 : Green
                                      -->
                                      <li class="x-num-axis y-num-axis">
                                        <em class="num">1</em>
                                        <span>LOW</span>
                                      </li>
                                      <li class="x-num-axis">
                                        <em class="num">2</em>
                                        <span>LOW</span>
                                      </li>
                                      <li class="x-num-axis">
                                        <em class="num">3</em>
                                        <span>LOW</span>
                                      </li>
                                      <li class="x-num-axis">
                                        <em class="num">4</em>
                                        <span>LOW</span>
                                      </li>
                                      <li class="x-num-axis">
                                        <em class="num">5</em>
                                        <span>LOW</span>
                                      </li>
                                      <li class="y-num-axis">
                                        <em class="num">2</em>
                                        <span>LOW</span>
                                      </li>
                                      <li>
                                        <em class="num">4</em>
                                        <span>LOW</span>
                                      </li>
                                      <li class="type1">
                                        <em class="num">6</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li class="type1">
                                        <em class="num">8</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li class="type1">
                                        <em class="num">10</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li class="y-num-axis">
                                        <em class="num">3</em>
                                        <span>LOW</span>
                                      </li>
                                      <li class="type1">
                                        <em class="num">6</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li class="type1">
                                        <em class="num">9</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li class="type1">
                                        <em class="num">12</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li class="type2">
                                        <em class="num">15</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li class="y-num-axis">
                                        <em class="num">4</em>
                                        <span>LOW</span>
                                      </li>
                                      <li class="type1">
                                        <em class="num">8</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li class="type1">
                                        <em class="num">12</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li class="type2">
                                        <em class="num">16</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li class="type2">
                                        <em class="num">20</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li class="y-num-axis">
                                        <em class="num">5</em>
                                        <span>LOW</span>
                                      </li>
                                      <li class="type1">
                                        <em class="num">10</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li class="type2">
                                        <em class="num">15</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li class="type2">
                                        <em class="num">20</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li class="type2">
                                        <em class="num">25</em>
                                        <span>MEDIUM</span>
                                      </li>
                                    </ul>
                                  </div>
                                </li>
                                <li>
                                  <div class="value-box-wrap">
                                    <span class="title">[위험성 평가 후 결과 변화]</span>
                                    <small class="x-axis">빈도 (LIKELIHOOD)</small>
                                    <small class="y-axis">결과 (CONSEQUENCES)</small>
                                    <ul class="value-box">
                                      <li class="x-num-axis y-num-axis type3">
                                        <em class="num">1</em>
                                        <span>LOW</span>
                                      </li>
                                      <li class="x-num-axis type3">
                                        <em class="num">2</em>
                                        <span>LOW</span>
                                      </li>
                                      <li class="x-num-axis type3">
                                        <em class="num">3</em>
                                        <span>LOW</span>
                                      </li>
                                      <li class="x-num-axis type3">
                                        <em class="num">4</em>
                                        <span>LOW</span>
                                      </li>
                                      <li class="x-num-axis type3">
                                        <em class="num">5</em>
                                        <span>LOW</span>
                                      </li>
                                      <li class="y-num-axis type3">
                                        <em class="num">2</em>
                                        <span>LOW</span>
                                      </li>
                                      <li class="type3">
                                        <em class="num">4</em>
                                        <span>LOW</span>
                                      </li>
                                      <li class="type3">
                                        <em class="num">6</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li>
                                        <em class="num">8</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li>
                                        <em class="num">10</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li class="y-num-axis type3">
                                        <em class="num">3</em>
                                        <span>LOW</span>
                                      </li>
                                      <li>
                                        <em class="num">6</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li>
                                        <em class="num">9</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li>
                                        <em class="num">12</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li>
                                        <em class="num">15</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li class="y-num-axis type3">
                                        <em class="num">4</em>
                                        <span>LOW</span>
                                      </li>
                                      <li>
                                        <em class="num">8</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li>
                                        <em class="num">12</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li>
                                        <em class="num">16</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li>
                                        <em class="num">20</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li class="y-num-axis type3">
                                        <em class="num">5</em>
                                        <span>LOW</span>
                                      </li>
                                      <li>
                                        <em class="num">10</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li>
                                        <em class="num">15</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li>
                                        <em class="num">20</em>
                                        <span>MEDIUM</span>
                                      </li>
                                      <li>
                                        <em class="num">25</em>
                                        <span>MEDIUM</span>
                                      </li>
                                    </ul>
                                  </div>
                                </li>
                              </ul>
                            </section>
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
                <button class="btn-style1">
                  <i class=" las la-paste"></i><span class="name">결재상신</span>
                </button>
                <button class="btn-style5">
                  <i class=" las la-trash-alt"></i><span class="name">삭제</span>
                </button>
                <button class="btn-style3"  onclick="javascript:history.back()">
                  <i class="las la-reply"></i><span class="name">취소</span>
                </button>
              </div>
            </div>
            <!-- // right area -->
          </div>
        </section>
      </div>
    </main>
    
    
<script src="${ctxPath}/script/license/tsk_0201.js?cachebuster=" + new Date().getTime()></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>

<script>
	$(document).ready(function() {
		tsk_0201();
	});
</script>