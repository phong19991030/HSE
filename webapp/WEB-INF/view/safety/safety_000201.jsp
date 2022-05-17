<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<input type="hidden" id="CRUD" name="CRUD" value="${DATA.CRUD}">
<input type="hidden" id="TOOL_GRANT_REVOKE_ID" name="TOOL_GRANT_REVOKE_ID" value="${DATA.TOOL_GRANT_REVOKE_ID}">

<main id="content" class="safety-page">
  <div class="container">
    <section class="hdSection">
      <!-- tit-wrap -->
      <div class="tit-wrap">
        <div class="tit-left">
          <h1 class="heading1">
            <spring:message code="sft.sft_000201.label.header" />
          </h1>
        </div>
      </div>
      <!-- //tit-wrap -->
    </section>
    <section class="contSection">
      <div class="content clearfix">
        <div class="left-area">
          <!-- approval -->
          <article class="registration-form">
            <h2 class="heading4">결재라인</h2>
            <div class="approval-select-area">
              <button modal-id="layer-popup1">결재라인을 지정해주세요</button>
            </div>
          </article>

          <article class="registration-form">
            <h2 class="heading4">
              <spring:message code="sft.sft_000201.label.info" />
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
                      <spring:message code="sft.sft_0002.label.projectName" />
                    </th>
                    <td colspan="3">
                      <div class="register-write w50p">
                        <div class="select-group">
                          <label for="PROJECT_ID" hidden="true">${DATA.PROJECT_NAME }</label>
                          <select id="PROJECT_ID" name="PROJECT_ID" class="info-select" validation-check="required">
                            <option value="">전체</option>
                            <c:forEach items="${projects}" var="project" varStatus="loop">
                              <c:if test="${DATA.PROJECT_ID != null && DATA.PROJECT_ID eq project.PROJECT_ID}">
                                <option value="${project.PROJECT_ID}" selected="selected">${project.PROJECT_NAME}
                                </option>
                              </c:if>
                              <c:if test="${DATA.PROJECT_ID ne project.PROJECT_ID}">
                                <option value="${project.PROJECT_ID}">${project.PROJECT_NAME}</option>
                              </c:if>
                            </c:forEach>
                          </select>
                        </div>
                      </div>

                      <!-- 2022-04-21 add (@smlee) -->
                     <%--  <div class="register-write w50p">
                        <div class="input-group">
                          <input type="text" title="프로젝트 입력" placeholder="프로젝트를 입력해주세요" value="${DATA.PROJECT_NAME}"/>
                        </div>
                      </div> --%>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0002.label.grantDate" />
                    </th>
                    <td>
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label>
                          <input type="text" id='id_grantDate' value="${DATA.GRANT_DATE }" placeholder="YYYY-MM-DD"
                            title="날짜설정" class="datepicker" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                    </td>
                    <th scope="row">
                      <spring:message code="sft.sft_0002.label.expectRevokeDate" />
                    </th>
                    <td>
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label>
                          <input type="text" id='id_expectRevokeDate' value="${DATA.EXPECT_REVOKE_DATE }"
                            placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                      <span class="checkbox-devide-line"></span>
                      <span class="checkbox-radio-group">
                        <!-- REVOKE_DATE -->
                        <c:if test="${DATA.REVOKE_DATE == null || DATA.REVOKE_DATE eq ''}">
                          <input type="checkbox" validation-check="required" name="checkbox" id="id_chk_isReturn">
                        </c:if>
                        <c:if test="${DATA.REVOKE_DATE != null && DATA.REVOKE_DATE ne ''}">
                          <input type="checkbox" validation-check="required" name="checkbox" id="id_chk_isReturn"
                            checked>
                        </c:if>
                        <label for="id_chk_isReturn">
                          <spring:message code="sft.sft_000201.label.isReturn" /></label>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0002.label.registerUser" />
                    </th>
                    <td>
                      <div class="register-write w50p" style="display: flex;">
                        <div class="">
                          <input type="text" id="id_emp_str_uid_key_register" validation-check="required"
                            name="REGISTER_USER" value="${DATA.REGISTER_USER_NO}" hidden="true" />
                        </div>
                        <jsp:include page="../common/select_emp_btn.jsp">
                          <jsp:param name="key" value="key_register" />
                          <jsp:param name="CRUD" value="${DATA.CRUD}" />
                          <jsp:param name="strEmpId" value="${DATA.REGISTER_USER}" />
                          <jsp:param name="isOne" value="true" />
                          <jsp:param name="title" value="신청자 설정"/>
                        </jsp:include>
                      </div>
                    </td>
                    <th scope="row">
                      <spring:message code="sft.sft_0002.label.approveUser" />
                    </th>
                    <td>
                      <div class="register-write w50p" style="display: flex;">
                        <div class="">
                          <input type="text" id="id_emp_str_uid_key_approve" validation-check="required"
                            name="APPROVE_USER" value="${DATA.APPROVE_USER_NO}" hidden="true" />
                        </div>
                        <jsp:include page="../common/select_emp_btn.jsp">
                          <jsp:param name="key" value="key_approve" />
                          <jsp:param name="CRUD" value="${DATA.CRUD}" />
                          <jsp:param name="strEmpId" value="${DATA.APPROVE_USER}" />
                          <jsp:param name="isOne" value="true" />
                          <jsp:param name="title" value="허가자 설정"/>
                        </jsp:include>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0002.label.listTool" />
                    </th>
                    <td colspan="3">
                      <ul class="equip-history-lst" id='id_tool_grant_lst'>
                        <c:if test="${DATA.TOOL_GRANT_LIST.size() > 0}">
                          <c:forEach items="${DATA.TOOL_GRANT_LIST}" var="item" varStatus="status">
                            <li>
                              <div class="select-group">
                                <select title="선택" id="id_select_tool_item">
                                  <option value="">전체</option>
                                  <c:forEach items="${tools}" var="tool" varStatus="loop">
                                    <c:if test="${tool.TOOL_ID eq item.TOOL_ID}">
                                      <option value="${tool.TOOL_ID}" selected>${tool.TOOL_NAME}</option>
                                    </c:if>
                                    <c:if test="${tool.TOOL_ID ne item.TOOL_ID}">
                                      <option value="${tool.TOOL_ID}">${tool.TOOL_NAME}</option>
                                    </c:if>
                                  </c:forEach>
                                </select>
                              </div>
                              <div class="register-write">
                                <div class="input-group amount">
                                  <input type="number" id='id_tool_amount' title="수량입력" validation-check="required"
                                    placeholder="수량입력" value="${item.AMOUNT}">
                                </div>
                              </div>
                              <div class="register-write">
                                <div class="input-group">
                                  <input type="text" id='id_tool_note' title="장비이력입력" validation-check="required"
                                    placeholder="특이사항을 입력해주세요 (이상없을 경우 '이상없음'으로 입력해주세요)" value="${item.NOTE}">
                                </div>
                              </div>
                              <c:if test="${DATA.TOOL_GRANT_LIST.size() > 1}">
                                <button class="btn1 remove-btn motion" onclick="removeToolItemFunc(this)">
                                  <i class="lar la-trash-alt"></i>
                                </button>
                              </c:if>
                              <c:if test="${status.count eq DATA.TOOL_GRANT_LIST.size()}">
                                <button class="btn3 motion cls_addHis" onclick='addToolItemFunc(this)'>
                                  <i class="las la-plus"></i>
                                </button>
                              </c:if>
                            </li>
                          </c:forEach>
                        </c:if>

                        <c:if test="${DATA.TOOL_GRANT_LIST == null || DATA.TOOL_GRANT_LIST.size() eq 0}">
                          <li>
                            <div class="select-group">
                              <select title="선택" id="id_select_tool_item">
                                <option value="">전체</option>
                                <c:forEach items="${tools}" var="tool" varStatus="loop">
                                  <option value="${tool.TOOL_ID}">${tool.TOOL_NAME}</option>
                                </c:forEach>
                              </select>
                            </div>
                            <div class="register-write">
                              <div class="input-group amount">
                                <input type="number" id='id_tool_amount' title="수량입력" placeholder="수량입력">
                              </div>
                            </div>
                            <div class="register-write">
                              <div class="input-group">
                                <!-- 2022-04-21 add (@smlee) -->
                                <input type="text" id='id_tool_note' title="장비이력입력"
                                  placeholder="특이사항을 입력해주세요 (이상없을 경우 '이상없음'으로 입력해주세요)" />
                              </div>
                            </div>
                            <c:if test="${DATA.CRUD ne 'C'}">
                              <button class="btn1 remove-btn motion" onclick="removeToolItemFunc(this)">
                                <i class="lar la-trash-alt"></i>
                              </button>
                            </c:if>
                            <!-- 3. add btn-->
                            <button class="btn3 motion cls_addHis" onclick='addToolItemFunc(this)'>
                              <i class="las la-plus"></i>
                            </button>
                          </li>
                        </c:if>
                      </ul>
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
</main>

<script src="${ctxPath}/script/safety/safety_000201.js?cachebuster=" + new Date().getTime()></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>

<script>
var arrTools = new Array();
<c:forEach items="${tools}" var="tool" varStatus="status">
	var toolDetail = new Object();
	toolDetail.TOOL_ID = "${tool.TOOL_ID}";
	toolDetail.TOOL_NAME = "${tool.TOOL_NAME}";
	arrTools.push(toolDetail);
</c:forEach> 
  $(document).ready(function () {

    sft000201();

    //emp popup common
    getEmpInfos('key_register', '${DATA.REGISTER_USER_NO}');
    getEmpInfos('key_approve', '${DATA.APPROVE_USER_NO}');
  });
</script>