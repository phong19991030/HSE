<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
  <% request.setCharacterEncoding("UTF-8"); %>
    <%@ include file="/WEB-INF/_include/taglib.jsp" %>
      <style>
        /* input type이 number인 경우 화살표 css 제거 */
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        span#MANUFACTURER_NM,
        span#POWER,
        span#TOWER_H,
        span#ROTOR_D {
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
      <span hidden id="CRUD" name="CRUD" />${DATA.CRUD}</span>
      <input type="hidden" id="LICENSE_ID" name="LICENSE_ID" value="${DATA.LICENSE_ID}" />
      <span hidden id="subTittleModify">
        <spring:message code="license.tsk_0100.label.subTittleModify" />
      </span>
      <span hidden id="subTittleRegister">
        <spring:message code="license.tsk_0100.label.subTittleRegister" />
      </span>


      <!-- Emp Detail -->
      <main id="content" class="work-page">
        <div class="container">
          <section class="hdSection">
            <!-- tit-wrap -->
            <div class="tit-wrap">
              <div class="tit-left">
                <!-- <h1 class="heading1">작업 허가 관리 등록</h1> -->
                <h1 class="heading1">
                  <ul id="TITLE"></ul>
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
                      <!-- 2022-05-04 add (@haung) -->
                  		<tr>
                    		<th scope="row">문서번호</th>
                    		<td colspan="3">
                      			<div class="register-write">
                        			<div class="input-group">
                          				<input type="text" title="문서번호 입력" placeholder="문서 번호를 입력해주세요" id="DOC_NO" value="${DATA.DOC_NO}">
                        			</div>
                      			</div>
                    		</td>
                  		</tr>
                  		<!-- //2022-05-04 add (@haung) -->
                        <tr>
                          <th scope="row">
                            <spring:message code="license.tsk_0100.label.ProjectName" />
                          </th>
                          <td colspan="3">
                            <div class="select-group">
                              <select validation-check="required" title="Select" id='id_project_name'>
                                <option value="">내용</option>
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
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <spring:message code="license.tsk_0100.label.workDate" />
                          </th>
                          <td colspan="3">
                            <div class="calendar-picker">
                              <div class="input-group">
                                <label class="sr-only">날짜설정</label> <input validation-check="required" type="text" id='id_correctionDate'
                                  value="${DATA.WORK_DATE}" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker"
                                  readonly>
                                <button class="calendar-picker-btn"></button>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <spring:message code="license.tsk_0100.label.workContentsAndProcedures" />
                          </th>
                          <td class="blank bm-none">
                            <c:if test="${DATA.LICENSE_WORK.size() > 0}">
                              <table style="margin-left: 20px;">
                                <tbody id="id_work_content_tb">
                                  <c:forEach items="${DATA.LICENSE_WORK}" var="work" varStatus="status">
                                    <tr>
                                      <th scope="row" style="width: 100px !important;" id="id_th_work_idx"></th>
                                      <td>
                                      	<!-- 2022-05-04 add (@haung) -->
                                    	<div class="register-write w90p">
                                        	<div class="input-group">
                                          		<input type="text" title="작업자" id="WORK_WORKER" validation-check="required"
                                            	placeholder="작업자 이름 입력" value="${work.WORKER}">
                                        	</div>
                                      	</div> <br />
                                      	<hr /> <br />
                                      	<!-- //2022-05-04 add (@haung) -->
                                        <div class="register-write w90p">
                                          <div class="input-group">
                                            <input type="text" title="작업 내용" id="WORK_CONTENT"
                                              validation-check="required" placeholder="작업 내용을 입력해주세요"
                                              value="${work.WORK_CONTENT}">
                                          </div>
                                        </div>
                                        <br />
                                        <hr /> <br />
                                        <div class="flexWrap">
                                          <div class="register-write w90p">
                                            <div class="input-group">
                                              <textarea title="작업 절차" placeholder="작업 절차를 입력해주세요"
                                                validation-check="required" id="WORK_PROCEDURE"
                                                value="${work.LICENSE_WORK}">${work.WORK_PROCEDURE}</textarea>
                                            </div>
                                          </div>
                                          <div class="btn-vertical">
                                            <c:if test="${DATA.LICENSE_WORK.size() > 1}">
                                              <button class="btn6-2 remove-btn motion" onclick="removeWorkFunc(this)">
                                                <i class="lar la-trash-alt"></i>
                                              </button>
                                            </c:if>
                                            <c:if test="${status.count eq DATA.LICENSE_WORK.size()}">
                                              <button class="btn6-1 motion cls_addWork" onclick="addWorkFunc(this)">
                                                <i class="las la-plus"></i>
                                              </button>

                                            </c:if>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </c:forEach>
                                </tbody>
                              </table>
                            </c:if>

                            <c:if test="${DATA.LICENSE_WORK == null || DATA.LICENSE_WORK.size() eq 0}">
                              <table style="margin-left: 20px;">
                                <tbody id="id_work_content_tb">
                                  <tr>
                                    <th scope="row" style="width: 100px !important;" id="id_th_work_idx">작업1</th>
                                    <td>
                                    	<!-- 2022-05-04 add (@haung) -->
                                    	<div class="register-write w90p">
                                        	<div class="input-group">
                                          		<input type="text" title="작업자" id="WORK_WORKER" validation-check="required"
                                            	placeholder="작업자 이름 입력" value="${work.WORK_WORKER}">
                                        	</div>
                                      	</div> <br />
                                      	<hr /> <br />
                                      	<!-- //2022-05-04 add (@haung) -->
                                      <div class="register-write w90p">
                                        <div class="input-group">
                                          <input type="text" title="작업 내용" id="WORK_CONTENT" validation-check="required"
                                            placeholder="작업 내용을 입력해주세요" value="${work.WORK_CONTENT}">
                                        </div>
                                      </div> <br />
                                      <hr /> <br />
                                      <div class="flexWrap">
                                        <div class="register-write w90p">
                                          <div class="input-group">
                                            <textarea title="작업 절차" placeholder="작업 절차를 입력해주세요" id="WORK_PROCEDURE"
                                              validation-check="required"
                                              value="${work.WORK_PROCEDURE}">${work.WORK_PROCEDURE}</textarea>
                                          </div>
                                        </div>
                                        <c:if test="${DATA.CRUD ne 'C'}">
                                          <button class="btn6-2 remove-btn motion" onclick="removeWorkFunc(this)">
                                            <i class="lar la-trash-alt"></i>
                                          </button>
                                        </c:if>
                                        <div class="btn-vertical">
                                          <button class="btn6-1 motion cls_addWork" onclick="addWorkFunc(this)">
                                            <i class="las la-plus"></i>
                                          </button>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </c:if>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <spring:message code="license.tsk_0100.label.responsible" />
                          </th>
                          <td colspan="3">
                            <div class="register-write w50p" style="display: flex;">
                              <div class="">
                                <input type="text" id="id_emp_str_uid_key_responsible" validation-check="required"
                                  name="RESPONSIBLE" value="${DATA.RESPONSIBLE}" hidden="true" />
                              </div>
                              <jsp:include page="../common/select_emp_btn.jsp">
                                <jsp:param name="key" value="key_responsible" />
                                <jsp:param name="CRUD" value="${DATA.CRUD}" />
                                <jsp:param name="strEmpId" value="${DATA.RESPONSIBLE}" />
                                <jsp:param name="isOne" value="true" />
                                <jsp:param name="title" value="책임자 설정" />
                              </jsp:include>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <spring:message code="license.tsk_0100.label.Participants" />
                          </th>
                          <td colspan="3">
                            <div class="register-write w50p" style="display: flex;">
                              <div class="">
                                <input type="text" id="id_emp_str_uid_key_participants" validation-check="required"
                                  name="PARTICIPANT" value="${DATA.PARTICIPANT}" hidden="true" />
                              </div>
                              <jsp:include page="../common/select_emp_btn.jsp">
                                <jsp:param name="key" value="key_participants" />
                                <jsp:param name="CRUD" value="${DATA.CRUD}" />
                                <jsp:param name="strEmpId" value="${DATA.PARTICIPANT}" />
                                <jsp:param name="isOne" value="false" />
                                <jsp:param name="title" value="참여자 설정" />
                              </jsp:include>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <spring:message code="license.tsk_0100.label.personalProtectiveEquipment" />
                          </th>
                          <td colspan="3">
                            <div class="register-write w50p" style="display: flex;">
                              <div class="">
                                <input type="text" id="id_emp_str_uid_key_protective_equipment"
                                  validation-check="required" name="PROTECTIVE_EQUIPMENT"
                                  value="${DATA.PROTECTIVE_EQUIPMENT}" hidden="true" />
                              </div>
                              <jsp:include page="../common/select_personal_equipment_bnt.jsp">
                                <jsp:param name="key" value="key_protective_equipment" />
                                <jsp:param name="CRUD" value="${DATA.CRUD}" />
                                <jsp:param name="strEmpId" value="${DATA.PROTECTIVE_EQUIPMENT}" />
                              </jsp:include>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <spring:message code="license.tsk_0100.label.toolsEquipment" />
                          </th>
                          <td colspan="3">
                            <ul class="equip-history-lst" id='tools'>

                              <c:if test="${DATA.LICENSE_TOOL.size() > 0}">
                                <c:forEach items="${DATA.LICENSE_TOOL}" var="tool" varStatus="status">
                                  <li>
                                    <div class="register-write">
                                      <div class="input-group" style="width: 252px">
                                        <input type="text" title="장비명" placeholder="장비명" validation-check="required"
                                          id="TOOL_NM" value="${tool.TOOL_NM}">
                                      </div>
                                    </div>
                                    <div class="register-write">
                                      <div class="input-group">
                                        <input type="text" id='TOOL_CONTENT' validation-check="required" title="사용목적"
                                          placeholder="사용목적을 입력해주세요" value="${tool.TOOL_CONTENT}">
                                      </div>
                                    </div>
                                    <c:if test="${DATA.LICENSE_TOOL.size() > 1}">
                                      <button class="btn1 remove-btn motion" onclick="removeToolFunc(this)"
                                        id="removeTool">
                                        <i class="lar la-trash-alt"></i>
                                      </button>
                                    </c:if>
                                    <c:if test="${status.count eq DATA.LICENSE_TOOL.size()}">
                                      <button class="btn3 motion cls_addTool" onclick='addToolFunc(this)'>
                                        <i class="las la-plus"></i>
                                      </button>
                                    </c:if>

                                </c:forEach>
                              </c:if>

                              <c:if test="${DATA.LICENSE_TOOL == null || DATA.LICENSE_TOOL.size() eq 0}">
                                <li>
                                  <div class="register-write">
                                    <div class="input-group" style="width: 252px">
                                      <input type="text" title="장비명" placeholder="장비명" validation-check="required"
                                        id="TOOL_NM" value="${tool.TOOL_NM}">
                                    </div>
                                  </div>
                                  <div class="register-write">
                                    <div class="input-group">
                                      <input type="text" id='TOOL_CONTENT' validation-check="required" title="사용목적"
                                        placeholder="사용목적을 입력해주세요" value="${tool.TOOL_CONTENT}">
                                    </div>
                                  </div>
                                  <c:if test="${DATA.CRUD ne 'C'}">
                                    <button class="btn1 remove-btn motion" onclick="removeToolFunc(this)"
                                      id="removeTool">
                                      <i class="lar la-trash-alt"></i>
                                    </button>
                                  </c:if>
                                  <!-- 3. add btn-->
                                  <button class="btn3 motion cls_addTool" onclick='addToolFunc(this)'>
                                    <i class="las la-plus"></i>
                                  </button>
                                </li>
                              </c:if>
                            </ul>
                            <hr style="display: inline-block; margin-top: 15px;">
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <spring:message code="license.tsk_0100.label.MaterialsAndConsumables" />
                          </th>
                          <td colspan="3">
                            <div class="select-group">
                              <select validation-check="required" id='id_mater_consum'>
                                <option value="">내용</option>
                                <c:forEach items="${materConsums}" var="materConsum" varStatus="loop">
                                  <c:if
                                    test="${DATA.MATERIAL_CONSUMABLE != null && DATA.MATERIAL_CONSUMABLE eq materConsum.COMM_NM}">
                                    <option value="${materConsum.COMM_NM}" selected="selected">${materConsum.COMM_NM}
                                    </option>
                                  </c:if>
                                  <c:if test="${DATA.MATERIAL_CONSUMABLE ne materConsum.COMM_NM}">
                                    <option value="${materConsum.COMM_NM}">${materConsum.COMM_NM}</option>
                                  </c:if>
                                </c:forEach>
                              </select>
                            </div>
                          </td>
                        </tr>
                        <%-- <tr>
                          <th scope="row">
                            <spring:message code="license.tsk_0100.label.conductRiskAsseessment" />
                          </th>
                          <td colspan="3">
                            <div class="select-group">
                              <select validation-check="required" id='id_risk_assessment'>
                                <option value="">내용</option>

                                <c:forEach items="${riskAssessments}" var="riskAssessment" varStatus="loop">
                                  <c:if
                                    test="${DATA.RISK_ASSESSMENT != null && DATA.RISK_ASSESSMENT eq riskAssessment.COMM_NM}">
                                    <option value="${riskAssessment.COMM_NM}" selected="selected">
                                      ${riskAssessment.COMM_NM}</option>
                                  </c:if>
                                  <c:if test="${DATA.RISK_ASSESSMENT ne riskAssessment.COMM_NM}">
                                    <option value="${riskAssessment.COMM_NM}">${riskAssessment.COMM_NM}</option>
                                  </c:if>
                                </c:forEach>
                              </select>
                            </div>
                          </td>
                        </tr> --%>
                        <tr>
                          <th scope="row">
                            <spring:message code="license.tsk_0100.label.reviewConfirm" />
                          </th>
                          <td colspan="3">

                            <div class="select-group">
                              <select validation-check="required" id='id_work_type'>
                                <option value="">내용</option>
                                <c:forEach items="${workTypes}" var="workType" varStatus="loop">
                                  <c:if test="${DATA.WORK_TYPE != null && DATA.WORK_TYPE eq workType.COMM_NM}">
                                    <option value="${workType.COMM_NM}" selected="selected">${workType.COMM_NM}</option>
                                  </c:if>
                                  <c:if test="${DATA.WORK_TYPE ne workType.COMM_NM}">
                                    <option value="${workType.COMM_NM}">${workType.COMM_NM}</option>
                                  </c:if>
                                </c:forEach>
                              </select>
                            </div>

                            <div class="view-form mgt10">
                              <div class="base-table">
                                <table id="id_tbl_work_content">
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
                                  <tbody id="ROW_LIST">

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
                  <button class="btn-style3" onclick="goList()">
                    <i class="las la-reply"></i><span class="name">취소</span>
                  </button>
                </div>
              </div>
              <!-- // right area -->
            </div>
          </section>
        </div>
      </main>

      <script src="${ctxPath}/script/license/tsk_0101.js"></script>
      <script src="${ctxPath}/script/sys/sys-common.js"></script>
      <script src="${ctxPath}/script/sys/sys-element.js"></script>


      <script>
        $(document).ready(
          function () {
            tsk_0101();

          });
        getEmpInfos('key_participants', '${DATA.PARTICIPANT}');
        getEmpInfos('key_responsible', '${DATA.RESPONSIBLE}');
        getPersEquipmentInfo('key_protective_equipment', '${DATA.PROTECTIVE_EQUIPMENT}');
      </script>