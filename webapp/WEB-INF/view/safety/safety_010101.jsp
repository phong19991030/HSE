<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage=""%>
<% request.setCharacterEncoding("UTF-8");%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<!-- <div class="layer-popup" id="layer-popup1"> -->
  <div class="popup-cont" style="min-width: 970px;">

    <h2 class="heading4">개인 보호 장비 수정</h2>
    <ul class="popup-cont-inner">
      <input type="hidden" id="CRUD" />
      <li>
        <h3 class="heading5">개인 정보</h3>

        <div class="register-write" style="display: flex;" id="popup-select-emp">
          <div class="">
          <input type="text" id="id_emp_str_uid_key_employee" validation-check="required" name="EMPLOYEE" value="${DATA.EMPLOYEE}" hidden="true"/>
          </div>
            <jsp:include page="../common/select_emp_btn.jsp">
              <jsp:param name="key" value="key_employee" />
              <jsp:param name="CRUD" value="${DATA.CRUD}" />
              <jsp:param name="strEmpId" value="${DATA.EMPLOYEE}" />
              <jsp:param name="isOne" value="true" />
              <jsp:param name="isInPopup" value="true" />
              <jsp:param value="개인 정보 설정" name="title"/>
              
            </jsp:include>
        </div>
        <!-- <div class="register-write">
          <div class="input-group">
            <input type="text" title="이름" placeholder="이름" value="홍길동">
          </div>
        </div>
        <div class="register-write">
          <div class="input-group">
            <input type="text" title="직급" placeholder="직급" value="과장">
          </div>
        </div> -->
      </li>
      <li>
        <h3 class="heading5">개인 보호 장비 정보</h3>
        <article class="view-form">
          <div class="base-table" style="max-height: 55vh;">
            <input type="hidden" id="toolType" name="modelAttr" value="${toolType}"/>
            <input type="hidden" id="statusType" name="modelAttr" value="${statusType}"/>
            <!-- <table id="tb-item">
              <caption></caption>
              <colgroup>
                <col style="width: 8%;">
                <col style="width: 12%;">
                <col style="width: auto;">
                <col style="width: 12%;">
                <col style="width: auto;">
                <col style="width: 3%;">
              </colgroup>
              <tbody>
                  <tr> -->
                    <div id="list-item">
                      <table id="tb-item-1">
                        <caption></caption>
                        <colgroup>
                          <col style="width: 8%;">
                          <col style="width: 12%;">
                          <col style="width: auto;">
                          <col style="width: 12%;">
                          <col style="width: auto;">
                          <col style="width: 3%;">
                        </colgroup>
                        <tbody>
                          <tr>
                            <th scope="row" rowspan="3" class="border-right txt-center stt">1</th>
                            <th scope="row">품목</th>
                            <td colspan="3">
                              <div class="select-group">
                                <select title="품목" class="ppe_id" validation-check="required">
                                  <c:forEach items="${toolType}" var="type" varStatus="loop">
                                  <option value="${type.PPE_ID}">${type.SUBJECT}</option>
                                </c:forEach>
                                </select>
                              </div>
                              <div class="register-write">
                                <div class="input-group">
                                  <input type="text" title="브랜드" placeholder="브랜드" class="brand" validation-check="required">
                                </div>
                              </div>
                              <div class="register-write">
                                <div class="input-group">
                                  <input type="text" title="모델명" placeholder="모델명" class="model" validation-check="required">
                                </div>
                              </div>
                            </td>
                            <td colspan="3" rowspan="3" class="border-left">
                              <button class="table-remove-btn" id="item-1">
                                <i class="las la-trash-alt"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">지급일자</th>
                            <td>
                              <div class="calendar-picker">
                                <div class="input-group">
                                  <label class="sr-only">날짜설정</label>
                                  <input type="text" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker grant_date" readonly validation-check="required">
                                  <button class="calendar-picker-btn"></button>
                                </div>
                              </div>
                            </td>
                            <th scope="row">교체일자</th>
                            <td >
                              <div class="calendar-picker">
                                <div class="input-group">
                                  <label class="sr-only">날짜설정</label>
                                  <input type="text" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker renew_date" readonly validation-check="required">
                                  <button class="calendar-picker-btn"></button>
                                </div>
                              </div>
                              <span class="mgl10 checkbox-radio-group">
                                <label for="radio" class="radio">
                                  <input type="checkbox" name="radio" id="radio" checked class="check_renew">
                                  <!-- <span class="circle"></span> -->
                                  <em>파손 시 까지</em>
                                </label>
                              </span>
                            </td>
                          </tr>
                          <tr> 
                            <th scope="row">상태</th>
                            <td colspan="3">
                              <div class="select-group">
                                <select title="상태" class="status" validation-check="required">
                                  <option value="">상태</option>
                                  <c:forEach items="${statusType}" var="type" varStatus="loop">
                                  <option value="${type.COMM_CD}">${type.COMM_NM}</option>
                                  </c:forEach>
                                </select>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    <!-- </tr> -->
  
                  <!-- <tr> -->
                  <table id="tb-item-2">
                    <caption></caption>
                    <colgroup>
                      <col style="width: 8%;">
                      <col style="width: 12%;">
                      <col style="width: auto;">
                      <col style="width: 12%;">
                      <col style="width: auto;">
                      <col style="width: 3%;">
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row" rowspan="3" class="border-right txt-center stt">2</th>
                        <th scope="row">품목</th>
                        <td colspan="3">
                          <div class="select-group">
                            <select title="품목" class="ppe_id" validation-check="required">
                              <c:forEach items="${toolType}" var="type" varStatus="loop">
                              <option value="${type.PPE_ID}">${type.SUBJECT}</option>
                            </c:forEach>
                            </select>
                          </div>
                          <div class="register-write">
                            <div class="input-group">
                              <input type="text" title="브랜드" placeholder="브랜드" class="brand" validation-check="required">
                            </div>
                          </div>
                          <div class="register-write">
                            <div class="input-group">
                              <input type="text" title="모델명" placeholder="모델명" class="model" validation-check="required">
                            </div>
                          </div>
                        </td>
                        <td colspan="3" rowspan="3" class="border-left">
                          <button class="table-remove-btn" id="item-2">
                            <i class="las la-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">지급일자</th>
                        <td>
                          <div class="calendar-picker">
                            <div class="input-group">
                              <label class="sr-only">날짜설정</label>
                              <input type="text" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker grant_date" readonly validation-check="required">
                              <button class="calendar-picker-btn"></button>
                            </div>
                          </div>
                        </td>
                        <th scope="row">교체일자</th>
                        <td >
                          <div class="calendar-picker">
                            <div class="input-group">
                              <label class="sr-only">날짜설정</label>
                              <input type="text" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker renew_date" readonly>
                              <button class="calendar-picker-btn"></button>
                            </div>
                          </div>
                          <span class="mgl10 checkbox-radio-group">
                            <label for="radio" class="radio">
                              <input type="checkbox" name="radio" id="radio" checked class="check_renew">
                              <!-- <span class="circle"></span> -->
                              <em>파손 시 까지</em>
                            </label>
                          </span>
                        </td>
                      </tr>
                      <tr> 
                        <th scope="row">상태</th>
                        <td colspan="3">
                          <div class="select-group">
                            <select title="상태" class="status" validation-check="required">
                              <option value="">상태</option>
                              <c:forEach items="${statusType}" var="type" varStatus="loop">
                              <option value="${type.COMM_CD}">${type.COMM_NM}</option>
                              </c:forEach>
                            </select>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                    </div>

              <!-- </tr> -->
                <!-- -------------------------------------------- -->
                <!-- add-btn -->
                <!-- <tr id="add-btn">
                  <td colspan="6" class="txt-center">
                    <button class="row-add-btn">
                      <i class="las la-plus"></i>
                    </button>
                  </td>
                </tr>
                //add-btn -->
              <!--</tbody>
            </table> -->
          </div>
        </article>
      </li>
    </ul>

    <div style="justify-content: center; display: flex; margin-top: 20px;">
      <button class="row-add-btn" >
        <i class="las la-plus"></i>
      </button>
    </div>

    <div class="foot-btn-area">
      <button class="btn-style3">
        <i class="las la-reply"></i><span class="name">취소</span>
      </button>
      <button class="btn-style1" id="SAVE_BTN">
        <i class="las la-edit"></i><span class="name">등록</span></button>
    </div>

    <button type="button" class="popup-close-btn">
      <i class="xi-close"></i>
    </button>
  </div>
<!-- </div> -->


<!-- 스크립트 -->

<script src="${ctxPath}/script/safety/safety_010101.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>

<script>
	$(document).ready(function() {
		safety_010101();
		preOpenEmpPop(0);
    
	});


</script>


