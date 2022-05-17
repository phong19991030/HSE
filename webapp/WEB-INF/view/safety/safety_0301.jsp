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
<input type="hidden" id="CRUD" name="CRUD" value="${DATA.CRUD}" />
<input type="hidden" id="ACCIDENT_ID" name="ACCIDENT_ID" value="${DATA.ACCIDENT_ID}" />
<span hidden id="subTittleModify">
  <spring:message code="sft.sft_0300.label.subTittleModify" />
</span>
<span hidden id="subTittleRegister">
  <spring:message code="sft.sft_0300.label.subTittleRegister" />
</span>

<main id="content" class="safety-page">
  <div class="container">
    <section class="hdSection">
      <!-- tit-wrap -->
      <div class="tit-wrap">
        <div class="tit-left">
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

          <article class="registration-form">
            <h2 class="heading4">사고 정보</h2>

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
                  <!-- 2022-04-25 add (@smlee) -->
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
                  <tr>
                    <!--item-->
                    <th scope="row">
                      <spring:message code="sft.sft_0300.label.REPORT_TYPE" />
                    </th>
                    <td colspan="3">
                      <div class="select-group">
                        <select validation-check="required" id='id_report_type'>
                          <option value="">내용</option>
                          <c:forEach items="${reports}" var="type" varStatus="loop">
                            <c:if test="${DATA.REPORT_TYPE != null && DATA.REPORT_TYPE eq type.COMM_CD}">
                              <option value="${type.COMM_CD}" selected="selected">${type.COMM_NM}</option>
                            </c:if>
                            <c:if test="${DATA.REPORT_TYPE ne type.COMM_NM}">
                              <option value="${type.COMM_CD}">${type.COMM_NM}</option>
                            </c:if>
                          </c:forEach>
                        </select>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <!--item-->
                    <th scope="row">
                      <spring:message code="sft.sft_0300.label.ACCIDENT_NAME" />
                    </th>
                    <td colspan="3">
                      <div class="register-write w50p">
                        <div class="input-group">
                          <input validation-check="required" id="ACCIDENT_NAME" value="${DATA.ACCIDENT_NAME}"
                            type="text" title="ACCIDENT_NAME" placeholder="사고 이름을 입력하십시오">
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <!--item-->
                    <th scope="row">
                      <spring:message code="sft.sft_0300.label.accidentPerson" />
                    </th>
                    <td colspan="3">
                      <div class="register-write w50p">
                        <!-- <div class="input-group">
                          <input type="text" title="사고 명" id="NAME_OF_INJURED" value="${DATA.NAME_OF_INJURED}"
                            placeholder="사고 명을 입력해주세요">
                        </div> -->
                        <div class="register-write w50p" style="display: flex;">
                          <div class="">
                            <input type="text" id="id_emp_str_uid_key_name_of_injured" validation-check="required"
                              name="NAME_OF_INJURED" value="${DATA.NAME_OF_INJURED}" hidden="true" />
                          </div>
                          <jsp:include page="../common/select_emp_btn.jsp">
                            <jsp:param name="key" value="key_name_of_injured" />
                            <jsp:param name="CRUD" value="${DATA.CRUD}" />
                            <jsp:param name="strEmpId" value="${DATA.NAME_OF_INJURED}" />
                            <jsp:param name="isOne" value="true" />
                            <jsp:param name="title" value="책임자 설정" />
                          </jsp:include>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <!--item-->
                    <th scope="row">
                      <spring:message code="sft.sft_0300.label.PROJECT_NAME" />
                    </th>
                    <td colspan="3">
                      <div class="select-group">
                        <select validation-check="required" title="Select" id='id_project_name'>
                          <%-- <option value="">Select</option>
                                  <c:forEach items="${projects}" var="project" varStatus="loop">
                                    <option value="${project.PROJECT_ID}">${project.PROJECT_NAME}</option>
                                  </c:forEach>
                                  --%>
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
                    <!--item-->
                    <th scope="row">
                      <spring:message code="sft.sft_0300.label.WRITER" />
                    </th>
                    <td>
                      <!-- 2022-04-25 add (@smlee) -->
                      <!-- <span id="WRITER_NAME" value="${DATA.WRITER_NAME}">${DATA.WRITER}</span> -->
                      <div class="register-write w50p" style="display: flex;">
                        <div class="">
                          <input type="text" id="id_emp_str_uid_key_writer" validation-check="required"
                            name="WRITER" value="${DATA.WRITER}" hidden="true" />
                        </div>
                        <jsp:include page="../common/select_emp_btn.jsp">
                          <jsp:param name="key" value="key_writer" />
                          <jsp:param name="isOne" value="true" />
                          <jsp:param value="작성자 설정" name="title"/>	
                        </jsp:include>
                      </div>
                    </td>
                    <!--item-->
                    <th scope="row">
                      <spring:message code="sft.sft_0300.label.EMP_NO_INVOLVE" />
                    </th>
                    <td>
                      <div class="register-write w50p" style="display: flex;">
                        <div class="">
                          <input type="text" id="id_emp_str_uid_key_emp_no_involve" validation-check="required"
                            name="EMP_NO_INVOLVE" value="${DATA.EMP_NO_INVOLVE}" hidden="true" />
                        </div>
                        <jsp:include page="../common/select_emp_btn.jsp">
                          <jsp:param name="key" value="key_emp_no_involve" />
                          <jsp:param name="CRUD" value="${DATA.CRUD}" />
                          <jsp:param name="strEmpId" value="${DATA.EMP_NO_INVOLVE}" />
                          <jsp:param name="isOne" value="false" />
                          <jsp:param value="사고 관련자 설정" name="title"/>
                        </jsp:include>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0300.label.ACCIDENT_DATE" />
                    </th>
                    <!--item-->
                    <td colspan="3">
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label>
                          <input validation-check="required" type="text" id='ACCIDENT_DATE'
                            value="${DATA.ACCIDENT_DATE}" placeholder="YYYY-MM-DD" title="ACCIDENT_DATE"
                            class="datepicker" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                      <div class="calendar-picker">
                        <div class="input-group time">
                            <input type="text" id='ACCIDENT_DATE_TIME' value="" title="시간설정" class="time-picker"  placeholder="00:00" readonly>
                            <button class="calendar-picker-btn"></button>
                        </div>
                    </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0300.label.PLACE" />
                    </th>
                    <!--item-->
                    <td>
                      <div class="register-write w100p">
                        <div class="input-group">
                          <input validation-check="required" type="text" title="PLACE" id="PLACE" value="${DATA.PLACE}"
                            placeholder="발생 장소를 입력해주세요">
                        </div>
                      </div>
                    </td>
                    <th scope="row">
                      <spring:message code="sft.sft_0300.label.PLACE_DETAIL" />
                    </th>
                    <!--item-->
                    <td>
                      <div class="register-write w100p">
                        <div class="input-group">
                          <input type="text" title="PLACE_DETAIL" id="PLACE_DETAIL"
                            value="${DATA.PLACE_DETAIL}" placeholder="발생 지점을 입력해주세요">
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0300.label.injuredPersons" />
                    </th>
                    <!--item-->
                    <td>

                      <!-- 2022-04-25 add (@smlee) -->
                      <!-- <button class="btn1">설정</button> -->

                      <%-- <div class="register-write w50p">
                              <div class="input-group">
                                <input type="number" title="EMP_NO_INJURED" validation-check="required" id="EMP_NO_INJURED"
                                  value="${DATA.EMP_NO_INJURED}" placeholder="부상자 명을 입력해주세요">
                              </div>
                  </div> --%>
                      <div class="register-write w50p" style="display: flex;">
                        <div class="">
                          <input type="text" id="id_emp_str_uid_key_emp_no_injured"
                            name="EMP_NO_INJURED" value="${DATA.EMP_NO_INJURED}" hidden="true" />
                          <input type="text" id="id_other_people_key_emp_no_injured"
                            name="EMP_NO_INJURED" value="${DATA.EMP_NO_INJURED}" hidden="true" />
                        </div>
                        <jsp:include page="../common/select_emp_btn.jsp">
                          <jsp:param name="key" value="key_emp_no_injured" />
                          <jsp:param name="isOne" value="false" />
                          <jsp:param name="isAddManual" value="true" />
                          <jsp:param name="title" value="부상자 설정"/>
                        </jsp:include>
                        
                        <div>
	                        <!-- <span class="checkbox-devide-line"></span> -->
		                    <span class="checkbox-radio-group">
		                    	<c:if test="${DATA.NO_INJURED != null && DATA.NO_INJURED == 'Y'}">
			                        <input type="checkbox" name="checkbox" id="NO_INJURED" onclick="cbNoInjuredChange()" checked>
		                    	</c:if>
		                    	<c:if test="${DATA.NO_INJURED == null || DATA.NO_INJURED == 'N'}">
		                    		<input type="checkbox" name="checkbox" id="NO_INJURED" onclick="cbNoInjuredChange()">
		                    	</c:if>
		                        <label for="NO_INJURED">부상자 없음</label>
		                    </span>
                        </div>
                      </div>
                    </td>
                    <th scope="row">
                      <spring:message code="sft.sft_0300.label.INJURED_AREA" />
                    </th>
                    <!--item-->
                    <td id="id_td_injured_area">
                      <!-- 2022-04-25 add (@smlee) -->
                      <c:if test="${DATA.INJURED_AREA_LST.size() > 0}">
                      	<c:forEach items="${DATA.INJURED_AREA_LST}" var="item" varStatus="status">
	                    	<div class="flexWrap">
		                        <div class="register-write w100p">
		                          <div class="input-group">
		                            <input type="text" id="INJURED_AREA_ITEM" title="부상 부위" placeholder="부상 부위를 입력해주세요" value="${item}">
		                          </div>
		                        </div>
		                        <c:if test="${DATA.INJURED_AREA_LST.size() > 1}">
			                        <button class="btn6-2 motion remove-btn" onclick="removeAreaFunc(this)">
			                          <i class="lar la-trash-alt"></i>
			                        </button>
		                        </c:if>
		                        <c:if test="${status.count eq DATA.INJURED_AREA_LST.size()}">
		                        	 <button class="btn6-1 motion cls_addArea" onclick='addAreaFunc(this)'>
			                         	<i class="las la-plus"></i>
			                         </button>
		                        </c:if>
		                	</div>
                      	</c:forEach>
                      </c:if>
                      
                      <c:if test="${DATA.INJURED_AREA_LST == null || DATA.INJURED_AREA_LST.size() eq 0}">
                      	<div class="flexWrap">
                        	<div class="register-write w100p">
	                          <div class="input-group">
	                            <input type="text" id="INJURED_AREA_ITEM" title="부상 부위" placeholder="부상 부위를 입력해주세요">
	                          </div>
	                        </div>
	                        <button class="btn6-1 motion cls_addArea" onclick='addAreaFunc(this)'>
	                          <i class="las la-plus"></i>
	                        </button>
	                      </div>
                      </c:if>
                      
                      <!-- <div class="register-write w50p">
                        <div class="input-group">
                          <input validation-check="required" type="text" title="부상 부위" id="INJURED_AREA"
                            value="${DATA.INJURED_AREA}" placeholder="부상 부위를 입력해주세요">
                        </div>
                      </div> -->
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0300.label.ACCIDENT_DETAIL" />
                    </th>
                    <!--item-->
                    <td colspan="3" id="id_td_accident_detail">
                      <!-- 2022-04-25 add (@smlee) -->
                      <c:if test="${DATA.ACCIDENT_DETAIL_LST == null || DATA.ACCIDENT_DETAIL_LST.size() eq 0}">
                      	<div class="flexWrap">
                        <div class="register-write w100p">
                          <div class="input-group">
                            <textarea title="사건사고 세부사항" id="ACCIDENT_DETAIL_ITEM" placeholder="사건사고 세부사항을 입력해주세요"></textarea>
                          </div>
                        </div>
                        <button class="btn6-1 motion cls_addDetail" onclick='addDetailFunc(this)' style="height: 110px;">
                          <i class="las la-plus"></i>
                        </button>
                      </div>
                      </c:if>
                      
                      <c:if test="${DATA.ACCIDENT_DETAIL_LST.size() > 0}">
                      	<c:forEach items="${DATA.ACCIDENT_DETAIL_LST}" var="item" varStatus="status">
                      		<div class="flexWrap">
		                        <div class="register-write w100p">
		                          <div class="input-group">
		                            <textarea title="사건사고 세부사항" id="ACCIDENT_DETAIL_ITEM" placeholder="사건사고 세부사항을 입력해주세요">${item}</textarea>
		                          </div>
		                        </div>
		                        <c:if test="${DATA.ACCIDENT_DETAIL_LST.size() > 1}">
			                        <button class="btn6-2 motion remove-btn" onclick="removeDetailFunc(this)" style="height: 110px;">
			                          <i class="lar la-trash-alt"></i>
			                        </button>
		                        </c:if>
		                        <c:if test="${status.count eq DATA.ACCIDENT_DETAIL_LST.size()}">
		                        	 <button class="btn6-1 motion cls_addDetail" onclick='addDetailFunc(this)' style="height: 110px;">
			                         	<i class="las la-plus"></i>
			                         </button>
		                        </c:if>
		                	</div>
                      	</c:forEach>
                      </c:if>
                      
                      <!-- <div class="register-write w100p">
                        <div class="input-group">
                          <textarea validation-check="required" title="사건사고 세부사항" id="ACCIDENT_DETAIL"
                            value="${DATA.ACCIDENT_DETAIL}"
                            placeholder="사건사고 세부사항을 입력해주세요">${DATA.ACCIDENT_DETAIL}</textarea>
                        </div>
                      </div> -->
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0300.label.FILE_NM" />
                    </th>
                    <!--item-->
                    <td colspan="3">
                      <div class="download-box-area custom" style="display: flex;">
                        <input id="id_input_imagePath" type="file" onchange='getFilenameImagePath(this)' name="doc_file"
                          style="display: none;" accept="image/*" />
                        <ul id="id_lst_img" >
                          <c:forEach items="${DATA.ACCIDENT_FILES}" var="fileImg" varStatus="loop">
                            <c:if test="${fileImg.FILE_TYPE eq 'IMG'}">
                              <li class="img-box" style="width: 236px;">
                                <img class="cls_img_${fileImg.FILE_ID}"
                                  src="${ctxPath}/util/upload/imageView/${fileImg.FILE_ID}" alt="예시 이미지">
                                <button class="remove-btn" tmpToolFileId="${fileImg.ACCIDENT_FILE_ID}"
                                  tmpFileId="${fileImg.FILE_ID}" tmpFileNm="${fileImg.FLE_NM}"
                                  tmpFilePath="${fileImg.FLE_PATH}" onclick="removeImgFunc(this)"></button>
                              </li>
                            </c:if>
                          </c:forEach>
                        </ul>
                        <ul>
                          <li id="id_imagePath" class="add-box">
                            <button class="add-btn" onclick="addImgFunc()"></button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0300.label.ACTION" />
                    </th>
                    <!--item-->
                    <td colspan="3" id="id_td_action">
	                    <c:if test="${DATA.ACTION_LST == null || DATA.ACTION_LST.size() eq 0}">
	                      	<div class="flexWrap">
	                        <div class="register-write w100p">
	                          <div class="input-group">
	                          	<textarea title="조치사항" id="ACTION_ITEM" placeholder="조치사항을 입력해주세요"></textarea>
	                          </div>
	                        </div>
	                        <button class="btn6-1 motion cls_addAction" onclick='addActionFunc(this)' style="height: 110px;">
	                          <i class="las la-plus"></i>
	                        </button>
	                      </div>
	                    </c:if>
	                      
                      <c:if test="${DATA.ACTION_LST.size() > 0}">
                      	<c:forEach items="${DATA.ACTION_LST}" var="item" varStatus="status">
                      		<div class="flexWrap">
		                        <div class="register-write w100p">
		                          <div class="input-group">
		                            <textarea title="조치사항" id="ACTION_ITEM" placeholder="조치사항을 입력해주세요" >${item}</textarea>
		                          </div>
		                        </div>
		                        <c:if test="${DATA.ACTION_LST.size() > 1}">
			                        <button class="btn6-2 motion remove-btn" onclick="removeActionFunc(this)" style="height: 110px;">
			                          <i class="lar la-trash-alt"></i>
			                        </button>
		                        </c:if>
		                        <c:if test="${status.count eq DATA.ACTION_LST.size()}">
		                        	 <button class="btn6-1 motion cls_addAction" onclick='addActionFunc(this)' style="height: 110px;">
			                         	<i class="las la-plus"></i>
			                         </button>
		                        </c:if>
		                	</div>
                      	</c:forEach>
                      </c:if>
                      <!-- 2022-04-25 add (@smlee) -->

                      <!-- <div class="register-write w100p">
                        <div class="input-group">
                          <textarea validation-check="required" title="조치사항" id="ACTION" value="${DATA.ACTION}"
                            placeholder="조치사항을 입력해주세요">${DATA.ACTION}</textarea>
                        </div>
                      </div> -->
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0300.label.PREVENTION_PLAN" />
                    </th>
                    <!--item-->
                    <td colspan="3" id="id_td_prevention_plan">
	                    <c:if test="${DATA.PREVENTION_PLAN_LST == null || DATA.PREVENTION_PLAN_LST.size() eq 0}">
	                      	<div class="flexWrap">
	                        <div class="register-write w100p">
	                          <div class="input-group">
	                          	<textarea title="향후 예방계획" id="PREVENTION_PLAN_ITEM" placeholder="향후 예방계획을 입력해주세요"></textarea>
	                          </div>
	                        </div>
	                        <button class="btn6-1 motion cls_addPlan" onclick='addPlanFunc(this)' style="height: 110px;">
	                          <i class="las la-plus"></i>
	                        </button>
	                      </div>
	                    </c:if>
		                      
	                    <c:if test="${DATA.PREVENTION_PLAN_LST.size() > 0}">
	                      	<c:forEach items="${DATA.PREVENTION_PLAN_LST}" var="item" varStatus="status">
	                      		<div class="flexWrap">
			                        <div class="register-write w100p">
			                          <div class="input-group">
			                            <textarea title="향후 예방계획" id="PREVENTION_PLAN_ITEM" placeholder="향후 예방계획을 입력해주세요" >${item}</textarea>
			                          </div>
			                        </div>
			                        <c:if test="${DATA.PREVENTION_PLAN_LST.size() > 1}">
				                        <button class="btn6-2 motion remove-btn" onclick="removePlanFunc(this)" style="height: 110px;">
				                          <i class="lar la-trash-alt"></i>
				                        </button>
			                        </c:if>
			                        <c:if test="${status.count eq DATA.PREVENTION_PLAN_LST.size()}">
			                        	 <button class="btn6-1 motion cls_addPlan" onclick='addPlanFunc(this)' style="height: 110px;">
				                         	<i class="las la-plus"></i>
				                         </button>
			                        </c:if>
			                	</div>
	                      	</c:forEach>
	                      </c:if>
                      <!-- 2022-04-25 add (@smlee) -->
                      <!-- <div class="register-write w100p">
                        <div class="input-group">
                          <textarea validation-check="required" title="향후 예방계획" id="PREVENTION_PLAN"
                            value="${DATA.PREVENTION_PLAN}"
                            placeholder="향후 예방계획을 입력해주세요">${DATA.PREVENTION_PLAN}</textarea>
                        </div>
                      </div> -->
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


<!-- 스크립트 -->
<script src="${ctxPath}/script/safety/safety_0301.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>
  $(document).ready(function () {
    var USER_NM = "${DATA.session.USER_NM}"
    safety_0301(USER_NM);
    getEmpInfos('key_writer', '${DATA.WRITER}');
    getEmpInfos('key_name_of_injured', '${DATA.NAME_OF_INJURED}');
    getEmpInfos('key_emp_no_involve', '${DATA.EMP_NO_INVOLVE}');
    getEmpInfoAndOther('key_emp_no_injured', '${DATA.EMP_NO_INJURED}', '${DATA.OTHER_PEOPLE_INJURED}');
    $('.time-picker').timepicker();
    var accidentDate = '${DATA.ACCIDENT_DATE_TIME}';
    var arr = accidentDate.split('-');
    $('#ACCIDENT_DATE_TIME').val(arr[0]+":"+arr[1]);
    var selector = 'id_lst_img';
    checkfilelist();
    var myElement = document.getElementById(selector);
    if(window.addEventListener) {
      // Normal browsers
      myElement.addEventListener('DOMSubtreeModified', checkfilelist, false);
    } else
      if(window.attachEvent) {
          // IE
          myElement.attachEvent('DOMSubtreeModified', checkfilelist);
      }

    function checkfilelist() {
      if ( $('#'+selector).children().length > 0 ) {
        $('#'+selector).css("padding-right","10px");
      }else{
        $('#'+selector).css("padding-right","");
      }
    }
  });
</script>