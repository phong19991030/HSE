<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%
request.setCharacterEncoding("UTF-8");
%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
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
<input type="hidden" id="ERP_ID" name="ERP_ID" value="${DATA.ERP_ID}" />
<span hidden id="subTittleModify">
  <spring:message code="sft.sft_0400.label.subTittleModify" /></span>
<span hidden id="subTittleRegister">
  <spring:message code="sft.sft_0400.label.subTittleRegister" /></span>

<main id="content" class="safety-page">
  <div class="container">
    <section class="hdSection">
      <!-- tit-wrap -->
      <div class="tit-wrap">
        <div class="tit-left">
          <h1 class="heading1" id="TITLE"></h1>
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
            <h2 class="heading4">비상 대응 계획 정보</h2>

            <div class="base-table custom-table3">
              <table>
                <caption></caption>
                <colgroup>
                  <col style="width: 11%;">
                  <col style="width: auto;">
                  <col style="width: 11%;">
                  <col style="width: auto;">
                </colgroup>
                <tbody>
                  <!-- 2022-04-25 add (@smlee) -->
                  <tr>
                    <th scope="row"><spring:message code="txt.doc.no" /></th>
                    <td colspan="3">
                      <div class="register-write">
                        <div class="input-group">
                          <input type="text" title="문서번호 입력" placeholder="문서 번호를 입력해주세요" id="DOC_NO" value="${DATA.DOC_NO}" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0400.label.PROJECT_NAME" />
                    </th>
                    <td colspan="3">
                      <div class="select-group">
                        <select validation-check="required" title="Select" id='id_project_name'>
                          <option value="">내용</option>
                          <c:forEach items="${projects}" var="project" varStatus="loop">
                            <c:if test="${DATA.PROJECT_ID != null && DATA.PROJECT_ID eq project.PROJECT_ID}">
                              <option value="${project.PROJECT_ID}" selected="selected">${project.PROJECT_NAME}</option>
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
                      <spring:message code="sft.sft_0400.label.WRITER" />
                    </th>
                    <td class="blank"></td>
                    <td colspan="2">

                      <!-- 2022-04-25 add (@smlee) -->
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
                      
                      <!-- <span id="WRITER" value="${DATA.WRITER}">${DATA.WRITER}</span> -->
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" rowspan="5">
                      <spring:message code="sft.sft_0400.label.contact" />
                    </th>
                    <td class="blank bm-none"></td>
                    <th scope="row">
                      <spring:message code="sft.sft_0400.label.EMERGENCY_PHONE" />
                    </th>
                    <td colspan="3">
                      <div class="register-write w20p">
                        <div class="input-group">
                          <input validation-check="required" type="text" title="EMERGENCY_PHONE" id="EMERGENCY_PHONE"
                            value="${DATA.EMERGENCY_PHONE}" placeholder="&lsquo;-&rsquo; 포함하여 입력해주세요">
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="blank bm-none"></td>
                    <th scope="row">
                      <spring:message code="sft.sft_0400.label.SITE_REPRESENT_PHONE" />
                    </th>
                    <td colspan="3">
                      <div class="register-write w20p">
                        <div class="input-group">
                          <input validation-check="required" type="text" title="SITE_REPRESENT_PHONE"
                            id="SITE_REPRESENT_PHONE" value="${DATA.SITE_REPRESENT_PHONE}"
                            placeholder="&lsquo;-&rsquo; 포함하여 입력해주세요">
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="blank bm-none"></td>
                    <th scope="row">
                      <spring:message code="sft.sft_0400.label.SAFE_OFFICER_PHONE" />
                    </th>
                    <td colspan="3">
                      <div class="register-write w20p">
                        <div class="input-group">
                          <input validation-check="required" type="text" title="SAFE_OFFICER_PHONE"
                            id="SAFE_OFFICER_PHONE" value="${DATA.SAFE_OFFICER_PHONE}"
                            placeholder="&lsquo;-&rsquo; 포함하여 입력해주세요">
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="blank"></td>
                    <th scope="row">
                      <spring:message code="sft.sft_0400.label.FIELD_REPRESENT_PHONE" />
                    </th>
                    <td colspan="3">
                      <div class="register-write w20p">
                        <div class="input-group">
                          <input validation-check="required" type="text" title="FIELD_REPRESENT_PHONE"
                            id="FIELD_REPRESENT_PHONE" value="${DATA.FIELD_REPRESENT_PHONE}"
                            placeholder="&lsquo;-&rsquo; 포함하여 입력해주세요">
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="blank"></td>
                    <th scope="row">
                      <spring:message code="sft.sft_0400.label.OTHER_CONTACTS" />
                    </th>
                    <td colspan="3">
                      <div class="register-write w20p">
                        <div class="input-group">
                          <input validation-check="required" type="text" title="OTHER_CONTACTS"
                            id="OTHER_CONTACTS" value="${DATA.OTHER_CONTACTS}"
                            placeholder="&lsquo;-&rsquo; 포함하여 입력해주세요">
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0400.label.EXPECTED_EMERGENCY" />
                    </th>
                    <td class="blank"></td>
                    <td colspan="2" id="id_td_expected_emergency">
                      <!-- 2022-04-25 add (@smlee) -->
                      <c:if test="${DATA.EXPECTED_EMERGENCY_LST.size() > 0}">
                      	<c:forEach items="${DATA.EXPECTED_EMERGENCY_LST}" var="item" varStatus="status">
	                    	<div class="flexWrap">
		                        <div class="register-write w50p">
		                          <div class="input-group">
		                            <input type="text" id="EXPECTED_EMERGENCY_ITEM" title="예상 비상 상황" placeholder="예상 비상 상황을 입력해주세요" value="${item}">
		                          </div>
		                        </div>
		                        <c:if test="${DATA.EXPECTED_EMERGENCY_LST.size() > 1}">
			                        <button class="btn6-2 motion remove-btn" onclick="removeEmergencyFunc(this)">
			                          <i class="lar la-trash-alt"></i>
			                        </button>
		                        </c:if>
		                        <c:if test="${status.count eq DATA.EXPECTED_EMERGENCY_LST.size()}">
		                        	 <button class="btn6-1 motion cls_addEmergency" onclick='addEmergencyFunc(this)'>
			                         	<i class="las la-plus"></i>
			                         </button>
		                        </c:if>
		                	</div>
                      	</c:forEach>
                      </c:if>
                      
                      <c:if test="${DATA.EXPECTED_EMERGENCY_LST == null || DATA.EXPECTED_EMERGENCY_LST.size() eq 0}">
                      	<div class="flexWrap">
                        	<div class="register-write w100p">
	                          <div class="input-group">
	                            <input type="text" id="EXPECTED_EMERGENCY_ITEM" title="예상 비상 상황" placeholder="예상 비상 상황을 입력해주세요" >
	                          </div>
	                        </div>
	                        <button class="btn6-1 motion cls_addEmergency" onclick='addEmergencyFunc(this)'>
	                          <i class="las la-plus"></i>
	                        </button>
	                      </div>
                      </c:if>
                      <!-- <div class="register-write w50p">
                        <div class="input-group">
                          <input validation-check="required" type="text" title="EXPECTED_EMERGENCY"
                            id="EXPECTED_EMERGENCY" value="${DATA.EXPECTED_EMERGENCY}" placeholder="예상 비상 상황을 입력해주세요">
                        </div>
                      </div> -->
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="sft.sft_0400.label.PROCEDURE_ACTION" />
                    </th>
                    <td class="blank"></td>
                    <td colspan="2">
                    	<div class="num-lst" id="id_num_lst_action">
	                      <!-- 2022-04-25 add (@smlee) -->
	                      <c:if test="${DATA.PROCEDURE_ACTION_LST.size() > 0}">
	                      	<c:forEach items="${DATA.PROCEDURE_ACTION_LST}" var="item" varStatus="status">
		                    	<div class="flexWrap">
		                    		<div class="num" id="id_index_action">${DATA.PROCEDURE_ACTION_LST.size() - status.index}</div>
			                        <div class="register-write w100p">
			                          <div class="input-group">
			                            <textarea title="비상 상황 시 대응 절차" id="PROCEDURE_ACTION_ITEM" placeholder="비상 상황 시 대응 절차를 입력해주세요">${item}</textarea>
			                          </div>
			                        </div>
			                        <c:if test="${DATA.PROCEDURE_ACTION_LST.size() > 1}">
				                        <button class="btn6-2 motion remove-btn" onclick="removeActionFunc(this)">
				                          <i class="lar la-trash-alt"></i>
				                        </button>
			                        </c:if>
			                        <c:if test="${status.count eq DATA.PROCEDURE_ACTION_LST.size()}">
			                        	 <button class="btn6-1 motion cls_addAction" onclick='addActionFunc(this)'>
				                         	<i class="las la-plus"></i>
				                         </button>
			                        </c:if>
			                	</div>
	                      	</c:forEach>
	                      </c:if>
	                      
	                      <c:if test="${DATA.PROCEDURE_ACTION_LST == null || DATA.PROCEDURE_ACTION_LST.size() eq 0}">
	                      	<div class="flexWrap">
	                      		<div class="num" id="id_index_action">1</div>
	                        	<div class="register-write w100p">
		                          <div class="input-group">
		                            <textarea title="비상 상황 시 대응 절차" id="PROCEDURE_ACTION_ITEM" placeholder="비상 상황 시 대응 절차를 입력해주세요"></textarea>
		                          </div>
		                        </div>
		                        <button class="btn6-1 motion cls_addAction" onclick='addActionFunc(this)'>
		                          <i class="las la-plus"></i>
		                        </button>
		                      </div>
	                      </c:if>
                    	</div>

                      <!-- <div class="register-write w100p">
                        <div class="input-group">
                          <textarea validation-check="required" title="PROCEDURE_ACTION" id="PROCEDURE_ACTION"
                            value="${DATA.PROCEDURE_ACTION}"
                            placeholder="비상 상황 시 대응 절차를 입력해주세요">${DATA.PROCEDURE_ACTION}</textarea>
                        </div>
                      </div> -->
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" rowspan="2">
                      <spring:message code="sft.sft_0400.label.EVACUATION_ROUTE" />
                    </th>
                    <td class="blank bm-none"></td>
                    <th scope="row">주소</th>
                    <td colspan="3">
                      <div class="register-write w30p">
                        <div class="input-group">
                          <input type="text" title="EVACUATION_ROUTE1"
                            id="EVACUATION_ROUTE1" value="${DATA.EVACUATION_ROUTE1}" placeholder="도로명 주소">
                        </div>
                      </div>
                      <!-- <button class="btn4 mgl5">찾기</button> -->
                      <div class="register-write w30p mgl20">
                        <div class="input-group">
                          <input type="text" title="EVACUATION_ROUTE2"
                            id="EVACUATION_ROUTE2" value="${DATA.EVACUATION_ROUTE2}" placeholder="상세 주소를 입력해주세요">
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="blank"></td>
                    <th scope="row">사진</th>
                    <td colspan="3">
                      <div class="download-box-area custom" style="display: flex;">
                        <input id="id_input_imagePath" type="file" onchange='getFilenameImagePath(this)' name="doc_file"
                          style="display: none;" accept="image/*" />
                        <ul id="id_lst_img">
                          <c:forEach items="${DATA.EMERGENCY_FILES}" var="fileImg" varStatus="loop">
                            <c:if test="${fileImg.FILE_TYPE eq 'IMG'}">
                              <li class="img-box" style="width: 236px;">
                                <img class="cls_img_${fileImg.FILE_ID}"
                                  src="${ctxPath}/util/upload/imageView/${fileImg.FILE_ID}" alt="예시 이미지">
                                <button class="remove-btn" tmpToolFileId="${fileImg.EMERGENCY_FILE_ID}"
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


<!-- 스크립트 -->
<script src="${ctxPath}/script/safety/safety_0401.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>
  $(document).ready(function () {
    var USER_NM = "${DATA.session.USER_NM}"
    safety_0401(USER_NM);
    
    getEmpInfos('key_writer', '${DATA.WRITER}');
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