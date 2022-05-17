<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<link rel="stylesheet" type="text/css" href="/css/detailManual.css">
<style>
	.container {
		width: calc(100% - 2.5rem);
    		margin: auto;
	}

</style>
<script type="text/javascript">

var session_uid = '${SESS_USER.USER_UID}';
var writer_uid  = '${DATA.INS_ID}';
var user_role	= '${DATA.USER_ROLE}';	
	function goList() {
		$(location).attr('href', CTX + '/sys/sys_0303/list');
	} 

	function goUpdate() {
		if (session_uid != writer_uid && user_role != 'ADMIN') {
			alert('<spring:message code='sys.sys_0303.noPermission' />');
			return;
		}
		
		var notice_id = "${DATA.NOTICE_ID}";
		var url =  CTX + '/sys/sys_0303/01.part?NOTICE_ID=' + notice_id;
		

		var success = function(html){

		};
		var ajax = new AjaxAccess();
		ajax.loadingHTML(url, $('#detail-content'), null, success, "");	
	}
 
	
	function openAttachFileWindow (url) {
		popupWindow = window.open(url, 'popup', 'width=' + getPopupSize().WIDTH + ',height=' + getPopupSize().HEIGHT);
	} 

	$(document).on("click", ".xi-folder-download-o", function(rowid, status, e){
	});

	$(function(){
		if (session_uid != writer_uid && user_role != 'ADMIN') {
			alert('<spring:message code='sys.sys_0303.noPermission' />');
			return;
		}
	})

	 function downloadFile(){
		debugger;
			var fileName =  $('#new_fle_nm').val();
			if(!fileName) return false;
			var arr = [];
			arr = fileName.split('.');
			window.location.href = CTX + '/util/upload/downloadFile?fileName='+arr[0]+ '&extension='+arr[1];
		}
</script>

	<div class="container  onm-wrap2 system-wrap system-wrap1">
	  <div class="tit-wrap">
	    <h2 class="heading3">
	    
	      <span class="txt">${navimenu.SUBMENU.SUBMENU.MENU_NM}</span>
	      <!-- <span class="version">V47</span> -->
	    </h2>
	    <ul class="location">
	      <li>${navimenu.SUBMENU.MENU_NM}</li>
	      <li class="bold">${navimenu.SUBMENU.SUBMENU.MENU_NM}</li>
	      <li class="bold">${DATA.NOTICE_TIT}</li>
	    </ul>
	  </div>
			<input hidden value="${DATA.NOTICE_ID}" name="NOTICE_ID">
		<div class="view-page-wrap">
			<div class="view-tit">
				<strong>${DATA.NOTICE_TIT }</strong>
				
                <c:if test="${DATA.PERIOD_YN == 'Y'}">
				
				<ul class="view-side">
					<li>${DATA.START_DATE} ~ ${DATA.END_DATE}</li>
					<li>${DATA.INSTITUTION }</li>
				</ul>
				</c:if>
			</div>
			
			<div class="veiw-cont-wrap">
				<div class="veiw-cont-side">
					<span>${DATA.INS_DT }</span>
					<span>${DATA.USER_ID}</span>
				</div>
				
				<div class="veiw-cont">
					<div style="clear:left; white-space:pre-line;">
						${DATA.NOTICE_CONT}
					</div>
<%-- 	              <c:if test="${DATA.NEW_FLE_NM != null }"> --%>
<%-- 	              <spring:message code="edu.edu_0201.list.label.attachment"/> --%>
<!-- 						<a onclick="download()" class="download-btn"> -->
<!-- 								<i class="xi-download"></i> -->
<!-- 							</a> -->
<%-- 				</c:if> --%>
				</div>
			</div>
			
			<ul class="attach-lst">
	              <c:if test="${DATA.NEW_FLE_NM != null }">
						<li class="file">
							<a>
								<span class="file-name" style="cursor: pointer;" onclick="downloadFile()">
									<em class="download-btn"  style="cursor:pointer;">
										<input type="hidden" id="new_fle_nm" value="${DATA.NEW_FLE_NM}"/>
									</em>
									<em>${DATA.FLE_NM}</em>
								</span>
								<span class="attach-etc">
									<em>${DATA.INS_DT }</em>
<!-- 									<span class="download-btn" onclick="downloadFile(event)"> -->
<%-- 										<input type="hidden" id="new_fle_nm" value="${attachment.NEW_FLE_NM }"/> --%>
<!-- 										<i class="xi-download"></i> -->
<!-- 									</span> -->
								</span>
							</a>
						</li>
				</c:if>
				
			</ul>
		</div>
		<div class="btns">
			<span class="btn-style btn-style-m btn-style2 float-left" onclick="goList()"><spring:message code='button.cancel' /></span>
			<c:if test="${DATA.INS_ID == SESS_USER.USER_UID || DATA.USER_ROLE == 'ADMIN'}">
				<span class="btn-style btn-style-m btn-style1 float-right" onclick="goUpdate()"><spring:message code='button.modify' /></span>
			</c:if>
		</div>
	</div>
