<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>


<script>

var session_uid = '${SESS_USER.USER_UID}';
var writer_uid  = '${DATA.INS_ID}';
var user_role	= '${DATA.USER_ROLE}';		// ADMIN or NORMAL
var startDate = '${DATA.START_DATE}';
var endDate = '${DATA.END_DATE}';
var file_name= '${DATA.NEW_FLE_NM}'

function deleteNotice() {
	if (session_uid != writer_uid && user_role != 'ADMIN') {
// 		alert("관리자 또는 작성자 이외에는 삭제할 수 없습니다.");
		alert('<spring:message code='sys.sys_0303.noPermission' />');
		return;
	}
	
	var url = CTX + '/sys/sys_0303/delete.ajax';
	
	if (confirm(_MESSAGE.common.deleteConfirm)) {
		$.ajax({
			url: url,
			type: 'POST',
			data: { NOTICE_ID : $('#NOTICE_ID').val() },
			dataType: 'json',
			success: function(data, textStatus, jqXHR) {
				if(data == true || data == "true" ){
					//alert('<spring:message code='message.deletedSuccess' />');
					alert(_MESSAGE.common.deleteSuccess);
					window.location.href = "/sys/sys_0303/list";
				}else{
					//alert('<spring:message code='message.deletedFailed' />');
					alert(_MESSAGE.common.deleteFail);
				}
			}
		});
	}
}


function callsave(form, callback, c) {
	if($('#noticeCalendar').attr('checked') == 'checked' && (!$('#noticeCalendarPrev').val() ||!$('#noticeCalendarNext').val())){
		alert('<spring:message code='msg.sys_0303.daterequired' />');
		return false;
	}
	var files = document.querySelector('input[name="file"]');
	const url = $(form).attr('action');
	if (files && files.files && files.files.length) {
		var formData = new FormData();
		var arr = $(form).serializeArray();
		$.each(arr, function(index, obj) {

			formData.append(obj.name, obj.value);
		});

		formData.append('file', files.files.length ? files.files[0] : null);

		$.ajax({
			type : 'POST',
			url : url,
			data : formData,
			dataType : 'json',
			processData : false,
			contentType : false,
			cache : false,
			success : function(data) {
				console.log(data);
// 				debugger;

				if (data.status) {
					alert('<spring:message code='message.saveSuccess' />');
					//if (callback) eval(callback + '()');

					var id = data.responseData;
					window.location.href = CTX+'/sys/sys_0303/formdetail?NOTICE_ID='+id;
				} else {
					alert('<spring:message code='message.saveFailed' />');
				}
			},
			error : function(xhr, textStatus, errors) {

			}
		});
	} else {

			
		var datas = {};
		var arr = $(form).serializeArray();
		$.each(arr, function(index, obj) {

			datas[obj.name] = obj.value;
		});

		$.ajax({
			type : 'POST',
			url : url,
			data : datas,
			dataType : 'json',
			cache : false,
			success : function(data) {
// 				console.log(data);
// debugger;
				if (data.status) {
					alert('<spring:message code='message.saveSuccess' />');
					var id = data.responseData;
					window.location.href = CTX+'/sys/sys_0303/formdetail?NOTICE_ID='+id;
				} else {
					alert('<spring:message code='message.saveFailed' />');
				}
			},
			error : function(xhr, textStatus, errors) {
				console.log(xhr);
				console.log(textStatus);
				console.log(errors);
			}
		});
	}

	return false;
}

function backToList() {
	window.location.reload();
}

function submitForm(){
	$('#noticeForm').submit();
}

function toDate(dateStr) {
	  var parts = dateStr.split("-")
	  		if(lang == 'en'){
	  		  return new Date(parts[2], parts[1] - 1, parts[0])
			}else{
				  return new Date(parts[0], parts[1] - 1,parts[2])
			}
	}

$(document).ready(function(){
$('.datepicker').setDatePicker();
	checkTime();
// 	$('#noticeCalendar').change(function(){
// 		if($(this).attr('checked') == 'checked'){
// 			$(this).val('Y');
// 			$('#periodTime').find('span.calendar-picker-btn').css("pointer-events", "");
// 			$('#periodTime').find('input.datepicker').disabled = false;
// 		}else{
// 			$(this).val('N');
// 			$('#periodTime').find('span.calendar-picker-btn').css("pointer-events", "none");
// 			$('#periodTime').find('input.datepicker').disabled = true;
// 		}
		
// 	}).trigger("change");
/* debugger;
	var date;
	if(startDate){
		date =toDate(startDate);
		$('#noticeCalendarPrev').datepicker('setDate', date);

	}
	
	if(endDate){
		date =toDate(endDate);
		$('#noticeCalendarNext').datepicker('setDate', date);

	}
 */
	
	$('#noticeSetting').change(function(){
		if($(this).attr('checked') == 'checked'){
			$(this).val('Y');
			$('#noticeCalendar').attr('disabled', false);
		}else{
			$('#noticeCalendar').attr('disabled', true);
			$('#noticeCalendar').attr('checked', false);
			$('#noticeCalendar').val('N').trigger("change");
			$(this).val('N');
		}
		
	}).trigger("change");
	$('#noticeCalendar').change(function(){
		if($(this).attr('checked') == 'checked'){
			$(this).val('Y');
		
		}else{
			$(this).val('N');
	
		}
		
	}).trigger("change");
	
// 	checkTime();
	
	$('#noticeCalendarPrev').change(function(){
// 		checkTime();
	})
	$('#noticeCalendarNext').change(function(){
// 		checkTime();
	})

})

function checkTime(){
    $('#noticeCalendarPrev').change(function(){
    	if($('#noticeCalendarNext').val()) {
		var fromdate =  $('#noticeCalendarPrev').datepicker('getDate');
		var todate =  $('#noticeCalendarNext').datepicker('getDate');
		if(fromdate > todate){
			alert('<spring:message code="edu.edu_0201.list.alert.validate"/>');
			$('#noticeCalendarNext').datepicker('setDate', fromdate);

		}
    	}
    })
    
    $('#noticeCalendarNext').change(function(){
    	if($('#noticeCalendarPrev').val()) {
		var fromdate =  $('#noticeCalendarPrev').datepicker('getDate');
		var todate =  $('#noticeCalendarNext').datepicker('getDate');
		if(fromdate > todate){
			alert('<spring:message code="edu.edu_0201.list.alert.validate"/>');
			$('#noticeCalendarPrev').datepicker('setDate', todate);

		}
    	}
    })
	
}


function downloadFile(){
	var fileName = file_name;
	if(!fileName) return false;
	var arr = [];
	arr = fileName.split('.');
	window.location.href = CTX + '/util/upload/downloadFile?fileName='+arr[0]+ '&extension='+arr[1];
}

</script>


<div class="container system-wrap system-wrap1">
  

  <!-- 공지사항 등록 -->
  <div class="system-detail-wrap">
    <div class="system-left">
	  <!--tit-wrap-->
	  <div class="tit-wrap">
	    <h2 class="heading3">
	    
<c:choose>
						<c:when  test="${DATA.CRUD eq 'C'}">
							<span class="txt"><spring:message code="button.register"/></span>
						</c:when>
						<c:otherwise>
							<span class="txt"><spring:message code="button.modify"/></span>
						</c:otherwise>
					</c:choose>		      <!-- <span class="version">V47</span> -->
	    </h2>
	    <ul class="location">
	      <li>${navimenu.SUBMENU.MENU_NM}</li>
	      <li class="bold">${navimenu.SUBMENU.SUBMENU.MENU_NM}</li>
	      <li class="bold">${DATA.NOTICE_TIT}</li>
	    </ul>
	  </div>
      <!--//tit-wrap-->
      <!-- registration form -->
      <form:form name="noticeForm" id="noticeForm" data-func="callsave" action="${formPath}/save.ajax" data-callback="saveCallbackFunc" enctype="multipart/form-data">
      	<input type="hidden" id="NOTICE_ID" name="NOTICE_ID" value="${DATA.NOTICE_ID}" />
      	<input type="hidden" id="CRUD" name="CRUD" value="${DATA.CRUD}" />
      
      <div class="registration-form registration-form1">
        <div class="registration-form-lst-wrap registration-form-lst-wrap-full">
          <ul class="registration-form-lst">
            <li class="registration-input-checkbox-wrap">
              <span><spring:message code="title.notice.title"/><span class="red"> *</span></span>
              <div class="registration-write">
                <div class="input-group-wrapper">
                  <div class="input-group">
                    <label for="noticeTitle" class="sr-only">Title</label>
                    <input type="text"  nova-validation="required"   name="NOTICE_TIT" value="${DATA.NOTICE_TIT}" id="noticeTitle" placeholder="">
                  </div>
                </div>
                <ul class="checkbox-radio-custom checkbox-radio-custom2">
                  <li>
                  <c:if test="${DATA.NOTICE_SETTING == 'Y'}">
                      <input type="checkbox" class="checkbox" checked="checked" name="NOTICE_SETTING" value="${DATA.NOTICE_SETTING}" id="noticeSetting">
                  </c:if>
                  <c:if test="${DATA.NOTICE_SETTING != 'Y'}">
                      <input type="checkbox" class="checkbox"  id="noticeSetting" name="NOTICE_SETTING" value="${DATA.NOTICE_SETTING}" >
                  </c:if>
                  
                    <label for="noticeSetting"><spring:message code="msg.sys_0303.noticeSetting"/></label>

                  </li>
                  <li class="calendar-picker" id="periodTime">
                    <div class="calendar-check-wrap"> 
                    	<c:if test="${DATA.PERIOD_YN == 'Y'}">
                    		<input type="checkbox" class="checkbox" checked="checked" value="${DATA.PERIOD_YN}"  name="PERIOD_YN" id="noticeCalendar">
	                  </c:if>
	                  <c:if test="${DATA.PERIOD_YN != 'Y'}">
	                    	<input type="checkbox" class="checkbox" name="PERIOD_YN" value="${DATA.PERIOD_YN}"  id="noticeCalendar">
	                  </c:if>
                        <label for="noticeCalendar"><spring:message code="msg.sys_0303.dateSetting"/></label>
                    </div>
                    
                    <div class="calendar-wrap">
                      <div class="input-group">
                        <label for="noticeCalendarPrev" class="sr-only"></label>
                        <input type="text" class="datepicker" id="noticeCalendarPrev" name="START_DATE" value="${DATA.START_DATE}">
                      </div>
                      <em class="hyphen">
                        <span class="sr-only">-</span>
                      </em>
                      <div class="input-group">
                        <label for="noticeCalendarNext"></label>
                        <input type="text" class="datepicker" id="noticeCalendarNext" name="END_DATE" value="${DATA.END_DATE}">
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li class="note">
              <span><spring:message code="title.notice.contents"/><span class="red"> *</span></span>
              <div class="registration-write">
                <div class="input-group input-group-wrap">
              
                <label for="noticeContent" class="sr-only">Content</label>
                <textarea id="noticeContent"  nova-validation="required"  name="NOTICE_CONT" maxlength="4000" cols="30" rows="10">${DATA.NOTICE_CONT}</textarea>
              </div>
              </div>
            </li>
            <li>
              <span>Attachment</span>
              <div class="registration-write btn-input-wrap fake-field-file-wrap">
                <div class="input-group">
                  <div class="fake-field-file">${DATA.FLE_NM}</div>
                  <input type="file" name="file" id="cv-arquivo" class="field-file">
                  
	              <c:if test="${DATA.NEW_FLE_NM != null }">
                     <a target="_blank" onclick="downloadFile()" file-name="${DATA.NEW_FLE_NM}" class="file-download-btn">
                     	<span class="sr-only">Open</span>
                     	<i class="xi-folder-download-o"></i>
                     </a>
	              </c:if>
                </div>
                <label for="cv-arquivo" aria-label="Attach file" class="registration-search-btn">
                  <i class="xi-paperclip"></i>
                </label>
              </div>    
            </li>
          </ul>
        </div>
      </div>
      </form:form>
    </div>
	<div class="system-right">
		<div class="btns">
			<c:if test="${navimenu.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
				<a class="btn-style btn-style1" onclick="submitForm()"><spring:message code='button.save' /></a> 
			</c:if>
			<c:if test="${not(DATA.CRUD eq 'C') && navimenu.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
				<a class="btn-style btn-style3" onclick="deleteNotice()"><spring:message	code='button.delete' /></a>
			</c:if>
			<a class="btn-style btn-style2" onclick="backToList()">Cancel</a>
      </div>
    </div>
  </div>
  <!-- //공지사항 등록 -->
</div>
