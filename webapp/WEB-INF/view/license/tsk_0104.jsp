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
<input type="hidden"  id="LICENSE_ID" name="LICENSE_ID" value="${DATA.LICENSE_ID}"/>
<span hidden id="subTittleModify"><spring:message code="license.tsk_0100.label.subTittleModify" /></span>
<span  hidden id="subTittleRegister"><spring:message code="license.tsk_0100.label.subTittleRegister" /></span>


<!-- Emp Detail -->
<main id="content" class="work-page">
      <div class="container">
        <section class="hdSection">
          <!-- tit-wrap -->
          <div class="tit-wrap">
            <div class="tit-left">
              <h1 class="heading1">작업 허가 관리 수정</h1>
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
                <h2 class="heading4">작업 정보</h2>

                <div class="base-table custom-table3">
                  <table>
                    <caption></caption>
                    <colgroup>
                      <col style="width: 11%;">
                      <col style="width: auto;">
                      <col style="width: 5%;">
                      <col style="width: auto;">
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row">프로젝트명</th>
                        <td colspan="3">
                          <div class="register-write w70p">
                            <div class="input-group">
                              <input type="text" title="프로젝트명" placeholder="프로젝트명을 입력해주세요"
                                value="동복 풍력발전단지 13호 Gearbox Oil Pump 교체">
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">작업 일자</th>
                        <td colspan="3">
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
                      <!-- ---------------------------------------------------------------- -->
                      <tr>
                        <th scope="row" rowspan="4">작업 내용 및 절차</th>
                        <td class="blank bm-none"></td>
                        <th scope="row" rowspan="2">작업1</th>
                        <td>
                          <div class="register-write w90p">
                            <div class="input-group">
                              <input type="text" title="작업 내용" placeholder="작업 내용을 입력해주세요" value="Gearbox Oil Pump 교체">
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="blank bm-none"></td>
                        <th>
                          <div class="flexWrap">
                            <div class="register-write w90p">
                              <div class="input-group">
                                <textarea title="작업 절차" placeholder="작업 절차를 입력해주세요">
1) 기어오일 세팅 (Gear oil setting)
2) 자재 창고에서 해당 발전기까지 기어오일 운송
3) 발전기 정지
4) 서비스 크레인을 이용하여 바스켓(Basket)을 나셀로 운반</textarea>
                              </div>
                            </div>
                          </div>
                        </th>
                      </tr>
                      <!-- ---------------------------------------------------------------- -->
                      <tr>
                        <td class="blank bm-none"></td>
                        <th scope="row" rowspan="2">작업2</th>
                        <td>
                          <div class="register-write w90p">
                            <div class="input-group">
                              <input type="text" title="작업 내용" placeholder="작업 내용을 입력해주세요" value="UPS 배터리 교체">
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="blank"></td>
                        <th>
                          <div class="flexWrap">
                            <div class="register-write w90p">
                              <div class="input-group">
                                <textarea title="작업 절차" placeholder="작업 절차를 입력해주세요"></textarea>
                              </div>
                            </div>
                            <div class="btn-vertical">
                              <button class="btn6-2 motion">
                                <i class="lar la-trash-alt"></i>
                              </button>
                              <button class="btn6-1 motion">
                                <i class="las la-plus"></i>
                              </button>
                            </div>
                          </div>
                        </th>
                      </tr>
                      <!-- ---------------------------------------------------------------- -->
                      <tr>
                        <th scope="row">책임자</th>
                        <td colspan="3">
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
                        <td colspan="3">
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
                        <td colspan="3">
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
                        <td colspan="3">
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
                        <td colspan="3">
                          <div class="select-group">
                            <select title="재료 및 소모품류">
                              <option selected>N/A</option>
                              <option>N/A</option>
                              <option>N/A</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">위험성 평가 수행</th>
                        <td colspan="3">
                          <div class="select-group">
                            <select title="위험성 평가 수행">
                              <option selected>수행완료</option>
                              <option>선택</option>
                              <option>선택</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">검토/확인사항</th>
                        <td colspan="3">

                          <div class="select-group">
                            <select title="검토/확인사항">
                              <option selected>중량물 취급</option>
                              <option>선택</option>
                              <option>선택</option>
                            </select>
                          </div>

                          <div class="view-form mgt10">
                            <div class="base-table">
                              <table>
                                <caption></caption>
                                <colgroup>
                                  <col style="width: 4%;">
                                  <col style="width: 32%;">
                                  <col style="width: 17%;">
                                  <col style="width: 30%;">
                                  <col style="width: 17%;">
                                </colgroup>
                                <thead>
                                  <tr>
                                    <th scope="col" class="txt-center"><spring:message code="hea.label.no"/></th>
                                    <th scope="col">PTW승인시 검토사항</th>
                                    <th scope="col" class="txt-center">검토</th>
                                    <th scope="col">실제 작업 수행 시 확인사항</th>
                                    <th scope="col" class="txt-center">검토</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td class="txt-center">1</td>
                                    <td>인양작업 유경험·자격을 가진 작업지휘자가 지정되었는가?</td>
                                    <td class="txt-center">
                                      <span class="checkbox-radio-group">
                                        <label for="A-1-1" class="radio">
                                          <input type="radio" name="A-1" id="A-1-1" checked>
                                          <span class="circle"></span>
                                          <em>Yes</em>
                                        </label>
                                      </span>
                                      <span class="checkbox-radio-group">
                                        <label for="A-1-2" class="radio">
                                          <input type="radio" name="A-1" id="A-1-2">
                                          <span class="circle"></span>
                                          <em>No</em>
                                        </label>
                                      </span>
                                      <span class="checkbox-radio-group">
                                        <label for="A-1-3" class="radio">
                                          <input type="radio" name="A-1" id="A-1-3">
                                          <span class="circle"></span>
                                          <em>N/A</em>
                                        </label>
                                      </span>
                                    </td>
                                    <td>
                                      사용 장비와 인양 보조기구에 허가필증이 부착되어 있는가?
                                    </td>
                                    <td class="txt-center">
                                      <span class="checkbox-radio-group">
                                        <label for="A-2-1" class="radio">
                                          <input type="radio" name="A-2" id="A-2-1" checked>
                                          <span class="circle"></span>
                                          <em>Yes</em>
                                        </label>
                                      </span>
                                      <span class="checkbox-radio-group">
                                        <label for="A-2-2" class="radio">
                                          <input type="radio" name="A-2" id="A-2-2">
                                          <span class="circle"></span>
                                          <em>No</em>
                                        </label>
                                      </span>
                                      <span class="checkbox-radio-group">
                                        <label for="A-2-3" class="radio">
                                          <input type="radio" name="A-2" id="A-2-3">
                                          <span class="circle"></span>
                                          <em>N/A</em>
                                        </label>
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td class="txt-center">2</td>
                                    <td>인양전문가에 의해 인양 방법과 사용장비에 대한<br />제원 및 작업계획서는 검토 되었는가?</td>
                                    <td class="txt-center">
                                      <span class="checkbox-radio-group">
                                        <label for="B-1-1" class="radio">
                                          <input type="radio" name="B-1" id="B-1-1" checked>
                                          <span class="circle"></span>
                                          <em>Yes</em>
                                        </label>
                                      </span>
                                      <span class="checkbox-radio-group">
                                        <label for="B-1-2" class="radio">
                                          <input type="radio" name="B-1" id="B-1-2">
                                          <span class="circle"></span>
                                          <em>No</em>
                                        </label>
                                      </span>
                                      <span class="checkbox-radio-group">
                                        <label for="B-1-3" class="radio">
                                          <input type="radio" name="B-1" id="B-1-3">
                                          <span class="circle"></span>
                                          <em>N/A</em>
                                        </label>
                                      </span>
                                    </td>
                                    <td>
                                      3·3·3 수칙을 숙지하고 준수되고 있는가?<br />(30cm 인양, 30초 대기, 3m 통제)
                                    </td>
                                    <td class="txt-center">
                                      <span class="checkbox-radio-group">
                                        <label for="B-2-1" class="radio">
                                          <input type="radio" name="B-2" id="B-2-1" checked>
                                          <span class="circle"></span>
                                          <em>Yes</em>
                                        </label>
                                      </span>
                                      <span class="checkbox-radio-group">
                                        <label for="B-2-2" class="radio">
                                          <input type="radio" name="B-2" id="B-2-2">
                                          <span class="circle"></span>
                                          <em>No</em>
                                        </label>
                                      </span>
                                      <span class="checkbox-radio-group">
                                        <label for="B-2-3" class="radio">
                                          <input type="radio" name="B-2" id="B-2-3">
                                          <span class="circle"></span>
                                          <em>N/A</em>
                                        </label>
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td class="txt-center">3</td>
                                    <td>장비 작업 구간 내 지내력 test는 실시되고<br />충분한 강도가 확보되었는가?</td>
                                    <td class="txt-center">
                                      <span class="checkbox-radio-group">
                                        <label for="C-1-1" class="radio">
                                          <input type="radio" name="C-1" id="C-1-1" checked>
                                          <span class="circle"></span>
                                          <em>Yes</em>
                                        </label>
                                      </span>
                                      <span class="checkbox-radio-group">
                                        <label for="C-1-2" class="radio">
                                          <input type="radio" name="C-1" id="C-1-2">
                                          <span class="circle"></span>
                                          <em>No</em>
                                        </label>
                                      </span>
                                      <span class="checkbox-radio-group">
                                        <label for="C-1-3" class="radio">
                                          <input type="radio" name="C-1" id="C-1-3">
                                          <span class="circle"></span>
                                          <em>N/A</em>
                                        </label>
                                      </span>
                                    </td>
                                    <td>운반경로, 중량물 고정, 상·하역시 인양능력, 짐걸이 방법은 적정한가?
                                    </td>
                                    <td class="txt-center">
                                      <span class="checkbox-radio-group">
                                        <label for="C-2-1" class="radio">
                                          <input type="radio" name="C-2" id="C-2-1" checked>
                                          <span class="circle"></span>
                                          <em>Yes</em>
                                        </label>
                                      </span>
                                      <span class="checkbox-radio-group">
                                        <label for="C-2-2" class="radio">
                                          <input type="radio" name="C-2" id="C-2-2">
                                          <span class="circle"></span>
                                          <em>No</em>
                                        </label>
                                      </span>
                                      <span class="checkbox-radio-group">
                                        <label for="C-2-3" class="radio">
                                          <input type="radio" name="C-2" id="C-2-3">
                                          <span class="circle"></span>
                                          <em>N/A</em>
                                        </label>
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td class="txt-center">4</td>
                                    <td>모든 작업자가 인양작업에 대한 특별안전교육을<br />이수하였는가?</td>
                                    <td class="txt-center">
                                      <span class="checkbox-radio-group">
                                        <label for="D-1-1" class="radio">
                                          <input type="radio" name="D-1" id="D-1-1" checked>
                                          <span class="circle"></span>
                                          <em>Yes</em>
                                        </label>
                                      </span>
                                      <span class="checkbox-radio-group">
                                        <label for="D-1-2" class="radio">
                                          <input type="radio" name="D-1" id="D-1-2">
                                          <span class="circle"></span>
                                          <em>No</em>
                                        </label>
                                      </span>
                                      <span class="checkbox-radio-group">
                                        <label for="D-1-3" class="radio">
                                          <input type="radio" name="D-1" id="D-1-3">
                                          <span class="circle"></span>
                                          <em>N/A</em>
                                        </label>
                                      </span>
                                    </td>
                                    <td>기후, 기상조건은 (풍속 10m/s, 눈 1cm/h, 비 10mm/h 등 악천후 작업금지)적정한가?</td>
                                    <td class="txt-center">
                                      <span class="checkbox-radio-group">
                                        <label for="D-2-1" class="radio">
                                          <input type="radio" name="D-2" id="D-2-1" checked>
                                          <span class="circle"></span>
                                          <em>Yes</em>
                                        </label>
                                      </span>
                                      <span class="checkbox-radio-group">
                                        <label for="D-2-2" class="radio">
                                          <input type="radio" name="D-2" id="D-2-2">
                                          <span class="circle"></span>
                                          <em>No</em>
                                        </label>
                                      </span>
                                      <span class="checkbox-radio-group">
                                        <label for="D-2-3" class="radio">
                                          <input type="radio" name="D-2" id="D-2-3">
                                          <span class="circle"></span>
                                          <em>N/A</em>
                                        </label>
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td class="txt-center">5</td>
                                    <td>유경험 신호수가 배치되고 식별조끼, 신호방법은<br />결정되었는가?</td>
                                    <td class="txt-center">
                                      <span class="checkbox-radio-group">
                                        <label for="E-1-1" class="radio">
                                          <input type="radio" name="E-1" id="E-1-1" checked>
                                          <span class="circle"></span>
                                          <em>Yes</em>
                                        </label>
                                      </span>
                                      <span class="checkbox-radio-group">
                                        <label for="E-1-2" class="radio">
                                          <input type="radio" name="E-1" id="E-1-2">
                                          <span class="circle"></span>
                                          <em>No</em>
                                        </label>
                                      </span>
                                      <span class="checkbox-radio-group">
                                        <label for="E-1-3" class="radio">
                                          <input type="radio" name="E-1" id="E-1-3">
                                          <span class="circle"></span>
                                          <em>N/A</em>
                                        </label>
                                      </span>
                                    </td>
                                    <td>지반 평탄화 및 전도방지를 위한 철판은 준비되어 있는가?</td>
                                    <td class="txt-center">
                                      <span class="checkbox-radio-group">
                                        <label for="E-2-1" class="radio">
                                          <input type="radio" name="E-2" id="E-2-1" checked>
                                          <span class="circle"></span>
                                          <em>Yes</em>
                                        </label>
                                      </span>
                                      <span class="checkbox-radio-group">
                                        <label for="E-2-2" class="radio">
                                          <input type="radio" name="E-2" id="E-2-2">
                                          <span class="circle"></span>
                                          <em>No</em>
                                        </label>
                                      </span>
                                      <span class="checkbox-radio-group">
                                        <label for="E-2-3" class="radio">
                                          <input type="radio" name="E-2" id="E-2-3">
                                          <span class="circle"></span>
                                          <em>N/A</em>
                                        </label>
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
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
							<i class="las la-edit"></i><span class="name">등록</span>
						</button>
						<button class="btn-style3" onclick="javascript:history.back()">
							<i class="las la-reply"></i><span class="name">취소</span>
						</button>
					</div>
				</div>
            <!-- // right area -->
          </div>
        </section>
      </div>
    </main>
    
    
<script src="${ctxPath}/script/license/tsk_0101.js?cachebuster=" + new Date().getTime()></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>

<script>
	$(document).ready(function() {
		tsk_0101();
	});
</script>