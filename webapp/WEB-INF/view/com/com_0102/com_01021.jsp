<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<style>
	.cls_sps_detail{
		padding: 10px
	}
</style>

<input type="hidden" id="PROCESS" name="PROCESS" value="${PROCESS}">
<input type="hidden" id="PROJECT_ID" name="PROJECT_ID" value="${DATA.PROJECT_ID}"></input>
<main id="content" class="general-page">
  <div class="container">
    <section class="hdSection">
      <!-- tit-wrap -->
      <div class="tit-wrap">
        <div class="tit-left">
	         <div class="tit-wrap">
		        <div class="tit-left">
			        <c:if test="${DATA.PROJECT_ID != null && DATA.PROJECT_ID != ''}">
			        	<h1 class="heading1"><spring:message code="com.com_01021.label.project.edit"/></h1>
			        </c:if>
			        <c:if test="${DATA.PROJECT_ID == null || DATA.PROJECT_ID == ''}">
			        	<h1 class="heading1"><spring:message code="com.com_01021.label.project"/></h1>
			        </c:if>
		        </div>
	      	</div>
        </div>
      </div>
      <!-- //tit-wrap -->
    </section>
    <section class="contSection">
      <div class="content clearfix">

        <!-- left area -->
        <div class="left-area">
          <article class="registration-form" id="APPROVER_VIEW">
            <h2 class="heading4">결재라인</h2>
            <div class="approval-select-area">
              <button id="BTN_POPUP_EMP">결재라인을 지정해주세요</button>
            </div>
          </article>

          <article class="registration-form">
            <h2 class="heading4">
              <spring:message code="com.com_01021.label.project1" />
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
                      <spring:message code="com.com_0102.label.companyName" />
                    </th>
                    <td colspan="3">
                    	<jsp:include page="../../common/select_company_btn.jsp"></jsp:include>
                      <!-- <div class="register-write w50p">
                        <div class="input-group">
                          <input type="text" title="회사명" placeholder="회사명을 입력해주세요" id="COMPANY">
                        </div>
                      </div> -->
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="com.com_0102.label.projectName" />
                    </th>
                    <td colspan="3">
                      <div class="register-write w50p">
                        <div class="input-group">
                          <input validation-check="required" type="text" title="프로젝트명" placeholder="프로젝트명을 입력해주세요" id="PROJECT_NAME">
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="com.com_0102.label.period" />
                    </th>
                    <td colspan="3">
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label> <input validation-check="required" type="text" placeholder="YYYY-MM-DD" title="날짜설정"
                            class="datepicker" id="START_TIME_PROJECT" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div> <em class="hyphen">~</em>
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label> <input validation-check="required" type="text" placeholder="YYYY-MM-DD" title="날짜설정"
                            class="datepicker" id="END_TIME_PROJECT" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="com.com_0102.label.manager" />
                    </th>
                    <td colspan="3">
                      <div class="register-write w50p" style="display: flex;">
                        <div class="" >
                          <!-- <input type="text" title="총괄 책임자" id="MANAGER" placeholder="총괄 책임자명을 입력해주세요"> -->
                          <input type="text" id="id_emp_str_uid_key_manager" validation-check="required" name="MANAGER" value="${DATA.MANAGER}" hidden="true"/>
                        </div>
                        <jsp:include page="../../common/select_emp_btn.jsp">
                        	<jsp:param name="key" value="key_manager" />
                        	<jsp:param name="isOne" value="true" />
                        	<jsp:param name="title" value="총괄책임자 설정" />
                        </jsp:include>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="com.com_0102.label.totalManpower" />
                    </th>
                    <td colspan="3">
                      <div class="register-write w50p">
                        <div class="input-group">
                          <input validation-check="required" type="number" title="총괄 책임자" id="TOTAL_MANPOWER" placeholder="투입인력수(명)">
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <spring:message code="com.com_0102.label.status" />
                    </th>
                    <td colspan="3">
                      <div class="select-group">
                        <select validation-check="required" title="진행 단계" id="id_select_status">
                          <option value="" selected>선택</option>
                          <c:forEach items="${PRJ_STATUS_LIST}" var="PRJ_STATUS">
                            <option value="${PRJ_STATUS.COMM_CD}">${PRJ_STATUS.COMM_NM}</option>
                          </c:forEach>

                        </select>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">HSE 관리</th>
                    <td colspan="3" >
		                <button class="btn1" id="BTN_POPUP_SPS_CD"><spring:message code="button.setting" /></button>
                    	<div class="check-selected-wrap">
	                    	<input type="text" id="SFT_PLAN" hidden>
		                    <button class="btn1 style2" id="BTN_POPUP_SPS_RS" style="display: none"><spring:message code="button.reset1" /></button>
							<div class="cls_sps_detail" id="id_SPS_PLAN">
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
            <button class="btn-style1" id="BTN_SAVE">
              <i class="las la-edit"></i><span class="name">
                <spring:message code="button.save" /></span>
            </button>
            <button class="btn-style3" id="BTN_CANCEL">
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
            <input type="text" placeholder="이름" id="POPUP_SEARCH_ALL">
            <button class="search-btn">검색</button>
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
        <ul class="selected-approval-custom" id="SELECTED_VIEW">
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
      <button class="btn-style1" id="BTN_SAVE_POPUP1">저장</button>
    </div>

    <button type="button" class="popup-close-btn">
      <i class="xi-close"></i>
    </button>
  </div>
</div>
<!-- //layer-popup -->

<div class="layer-popup" id="layer-popup2">
  <div class="popup-cont" style="min-width: 447px;">

    <h2 class="heading4">안전관리 계획서 관리 설정</h2>
    <h3 class="heading5">계힉서 목록</h3>

    <div class="base-table">
      <table>
        <caption></caption>
        <colgroup>
          <col style="width: auto;">
          <col style="width: auto;">
          <col style="width: auto;">
        </colgroup>
        <thead>
          <tr>
            <th scope="col" class="txt-center"><spring:message code="hea.label.no"/></th>
            <th scope="col">계획서명</th>
            <th scope="col" class="txt-center">권한 설정</th>
          </tr>
        </thead>
        <tbody id="SPS_CD_ROW_LIST">
          <!-- <tr>
              <td class="txt-center">1</td>
              <td>직원 정보 관리</td>
              <td class="txt-center">
                <div class="toggle-switch">
                  <input type="checkbox" id="toggle1">
                  <label for="toggle1"></label>
                </div>
              </td>
            </tr> -->
        </tbody>
      </table>
    </div>

    <div class="foot-btn-area">
      <button class="btn-style3">
        <i class=" las la-reply"></i><span class="name">취소</span>
      </button>
      <button class="btn-style1" id="BTN_SAVE_SPS_CD">
  <i class="las la-edit"></i><span class="name">등록</span>
</button>
    </div>

    <button type="button" class="popup-close-btn">
      <i class="xi-close"></i>
    </button>
  </div>
</div>
<!-- //layer-popup2 -->


<script src="${ctxPath}/script/com/com_01021.js"></script>
<script src="${ctxPath}/script/com/com-element.js"></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>

<script>
  $(document).ready(function () {
    com_01021();
  });
</script>