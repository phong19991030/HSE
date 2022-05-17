<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<style>
/* th {
	text-align: center;
} */

/* tr {
	height: 65px;
} */

.path-file>li .path-fiie-detail .file-name {
	width: 35%;
}

.path-file>li .path-fiie-detail .file-info {
	width: 45%;
}

.system-detail-wrap .registration-write textarea {
	height: 248px;
}
</style>

<script src="${ctxPath}/script/sys/sys-common.js"></script>

<script type="text/javascript">
	function saveCallbackFunc(form, data) {
		window.opener.callBackAddRole();
		window.close();
	}

	function goList() {
		$(location).attr('href', CTX + '/com/com_0201/list');
	}

	//SAVE FORM
	function ajaxUpdate() {
		// validation check
		var check = $('[validation-check]').vcCheck();

		if ($('input#INSTALL_YEAR').vcCheck()) {
			var year = new $('input#INSTALL_YEAR').val();
			var curYear = new Date().getFullYear();
			if (year <= 0) {
				$('input#INSTALL_YEAR')
						.vcWarning('year must be greater than 0');
				check = false;
			} else if (curYear < year) {
				$('input#INSTALL_YEAR').vcWarning(
						'year must be less than current year');
				check = false;
			} else {
				/* $('input#INSTALL_YEAR').vcSuccess('OK'); */
			}
			/* $('.datepicker').datepicker();
	  		$('.calendar-picker').click(function() {
	     		$(this).find(".datepicker").datepicker('show');
	  			}); */
		}
		
		if ($('input#USE_RATE').vcCheck()) {
			var num = parseInt($('input#USE_RATE').val());
			if(num > 100){
				alert("이용률 can not be greater than 100");
				check = false;
			}
		}

		if (!check) {
			return false;
		}

		saveForm();
	}

	// form submit
	function saveForm() {
		debugger
		var crud = $('#CRUD').val();
		var params_json = $(':input').serializeArray();

		var data = _sys.mariaDB.ajax(CTX + '/com/com_0201/saveTurbine.ajax', params_json);

		if (data.INSERT_TURBINE_MGT > 0 || data.UPDATE_TURBINE_MGT > 0) {
			var turbine_id = data['TURBINE_ID'];
			if (crud == "U") {
				turbine_id = '${DATA.TURBINE_ID}';
			}
			alert(_MESSAGE.common.saveSuccess);
			window.location.href = CTX
					+ '/com/com_0201/form/detailTurbine.part?TURBINE_ID='
					+ turbine_id;
		} else {
			alert(_MESSAGE.common.saveFail);
		}
	} // form submit end

	$(document).ready(function() {
		if (!$.trim($('#fake-field-file-issue').html()).length) {
			$('.fake-field-file-wrap').css('margin-top', '3px');
		} else {
			$('.fake-field-file-wrap').css('margin-top', '0px');
		}
	});

	$('#file_list_issue').change(function() {
		if (!$.trim($('#fake-field-file-issue').html()).length) {
			$('#fake-field-file-issue').css('margin-top', '3px');
		} else {
			$('#fake-field-file-issue').css('margin-top', '0px');
		}
	});

	$(document).ready(function() {
		// 숨겨진 input type="file"을 연다
		$('.xi-paperclip').click(function(e) {
			e.preventDefault();
			$('#file_list_issue').click();
		});
	});

	// 이미 있는 첨부파일의 DESCRPT 바꾸기
	$(document).on(
			'change',
			'#turbineForm input[name="DESCRPT"]',
			function() {
				var input_text = $(this).val();
				var fle_seq = $(this).siblings('#fileUpdateID').val();
				$(this).siblings(
						$('#turbineForm input[name="fileUpdateDescrpt"]')).val(
						fle_seq + '//' + input_text);
			});
</script>

<main id="content" class="general-page">
	<input type="hidden" id="CRUD" name="CRUD" value="${param.CRUD }">
	<input type="hidden" id="TURBINE_ID" name="TURBINE_ID" value="${DATA.TURBINE_ID}">
	<input type="hidden" id="SESS_USER_ID" name="SESS_USER_ID" value="${DATA.INS_ID}">
  <div class="container">
    <section class="hdSection">
      <!-- tit-wrap -->
      <div class="tit-wrap">
        <div class="tit-left">
        <c:if test="${DATA.TURBINE_ID != null && DATA.TURBINE_ID != ''}">
        	<h1 class="heading1"><spring:message code="com.com0201.label.form.edit"/></h1>
        </c:if>
        <c:if test="${DATA.TURBINE_ID == null || DATA.TURBINE_ID == ''}">
        	<h1 class="heading1"><spring:message code="com.com0201.label.form.register"/></h1>
        </c:if>
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
            <h2 class="heading4"><spring:message code="com.com0201.label.form.sub.title"/></h2>

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
                    <th scope="row"><spring:message code="com.com0201.label.turbine.name"/></th>
                    <td colspan="3">
                      <div class="register-write w50p">
                        <div class="input-group">
                          <input type="text" id="TURBINE_NAME" validation-check="required" name="TURBINE_NAME" value="${DATA.TURBINE_NAME }" title="단지명" placeholder="단지명을 입력해주세요">
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><spring:message code="com.com0201.label.turbine.no"/></th>
                    <td>
                      <div class="register-write">
                        <div class="input-group">
                          <input type="text" id="TURBINE_NO" validation-check="required" name="TURBINE_NO" value="${DATA.TURBINE_NO }" title="터빈 No" placeholder="터빈 No">
                        </div>
                      </div>
                    </td>
                    <th scope="row"><spring:message code="com.com0201.label.turbine.model"/></th>
                    <td>
                      <div class="register-write">
                        <div class="input-group">
                          <input type="text" id="TURBINE_MODEL" validation-check="required" name="TURBINE_MODEL" value="${DATA.TURBINE_MODEL }" title="터빈 모델" placeholder="터빈 모델">
                        </div>
                      </div>
                    </td>
                  </tr>
                 <tr>
                    <th scope="row"><spring:message code="com.com0201.label.turbine.year"/></th>
                    <td colspan="3">
                      <div class="calendar-picker">
                        <div class="input-group">
                          <label class="sr-only">날짜설정</label>
                          <input type="text" id="INSTALL_YEAR" validation-check="required" name="INSTALL_YEAR" value="${DATA.INSTALL_YEAR }" title="날짜설정" class="datepicker" placeholder="YYYY-MM-DD" readonly>
                          <button class="calendar-picker-btn"></button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><spring:message code="com.com0201.label.turbine.rate"/></th>
                    <td colspan="3">
                      <div class="register-write">
                        <div class="input-group">
                          <input type="number" id="USE_RATE" max="100" validation-check="required" name="USE_RATE" value="${DATA.USE_RATE }" title="이용률" placeholder="이용률">
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><spring:message code="com.com0201.label.turbine.status"/></th>
                    <td colspan="3">
                      <div class="select-group w10p">
                        <select id="STATUS" name="STATUS" validation-check="required" value="${DATA.STATUS } title="운영상태">
                        	<option value="">내용</option>
                     		<c:forEach items="${turbineStatus}" var="type" varStatus="loop">
                        		<c:if test="${DATA.STATUS != null && DATA.STATUS eq type.COMM_CD}">
                     				<option value="${type.COMM_CD}" selected="selected">${type.COMM_NM}</option>
                     			</c:if>
                     			<c:if test="${DATA.STATUS ne type.COMM_CD}">
                     				<option value="${type.COMM_CD}">${type.COMM_NM}</option>
                     			</c:if>
                     		</c:forEach>
                        </select>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><spring:message code="com.com0201.label.turbine.note"/></th>
                 	   <td colspan="3">
                      <div class="register-write w100p">
                        <div class="input-group">
                          <input type="text" id="ADDITIONAL_INFO" validation-check="required, year" name="ADDITIONAL_INFO" value="${DATA.ADDITIONAL_INFO }" title="추가 입력사항" placeholder="추가 입력사항">
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
            <button onclick="ajaxUpdate()" class="btn-style1">
              <i class="las la-edit"></i><span class="name"><spring:message code="button.save" /></span>
            </button>
            <button onclick="goList()" class="btn-style3">
              <i class="las la-reply"></i><span class="name"><span class="name"><spring:message code="button.cancel" /></span>
            </button>
          </div>
        </div>
        <!-- // right area -->
      </div>
    </section>
  </div>
</main>

