<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<%--==============================================================
 * Notice Detail(공지사항 조회)
 * @author		: yjkim
 * @since		: 2019.10.07
 * @Modification Information
 *　Date　　　　　　Name　　　　　 Desc.
 *　──────────　　  ──────────　　 ──────────
 *　2019.00.00　　  Yunju Kim　　　-
===============================================================--%>
<script>
var session_uid = '${SESS_USER.USER_UID}';
var writer_uid  = '${DATA.INS_ID}';
var user_role	= '${DATA.USER_ROLE}';		// ADMIN or NORMAL

function updateNotice() {
	if (session_uid != writer_uid && user_role != 'ADMIN') {
// 		alert("관리자 또는 작성자 이외에는 수정할 수 없습니다.");
		alert("It cannot be modified except by the administrator or writer.");
		return;
	}
	
	var param = {};
	
	param["NOTICE_ID"] = $('#NOTICE_ID').val();
	param["NOTICE_TIT"] = $('#NOTICE_TIT').val();
	param["NOTICE_CONT"] = $('#NOTICE_CONT').val();
	
	var url = CTX + '/cms/cms_0102/update.ajax';
	
	if (confirm('<spring:message code='oam.oam_0203.detail.tab01.msg.confirmSave' />')) {
		$.ajax({
			url: url,
			type: 'POST',
			data: param,
			dataType: 'json',
			success: function(data, textStatus, jqXHR) {
				$(location).attr('href', CTX + '/cms/cms_0102/list');
			}
		});
	}
}

function deleteNotice() {
	if (session_uid != writer_uid && user_role != 'ADMIN') {
// 		alert("관리자 또는 작성자 이외에는 삭제할 수 없습니다.");
		alert("It cannot be deleted except by the administrator or writer.");
		return;
	}
	
	var url = CTX + '/cms/cms_0102/delete.ajax';
	
	if (confirm('<spring:message code='message.confirmDelete' />')) {
		$.ajax({
			url: url,
			type: 'POST',
			data: { NOTICE_ID : $('#NOTICE_ID').val() },
			dataType: 'json',
			success: function(data, textStatus, jqXHR) {
				$(location).attr('href', CTX + '/cms/cms_0102/list');
			}
		});
	}
}

function goList() {
	$(location).attr('href', CTX + '/cms/cms_0102/list');
}
</script>

<div class="module_area">
<button type="button" id="farm_detail"  class="btn btn_back" onclick="goList()"><spring:message code='title.button.back'/></button>

<h3><spring:message code="title.notice.detail"/></h3> 

<form name="noticeForm">
	<input type="hidden" id="NOTICE_ID" name="NOTICE_ID" value="${DATA.NOTICE_ID}" />
	<table class="search_tbl">
		<caption><spring:message code="title.notice.detail"/>: <spring:message code="title.notice.title"/>, <spring:message code="title.notice.writer"/>, <spring:message code="title.event.INS_DT"/>, <spring:message code="title.notice.contents"/></caption>
		<colgroup>
			<col style="width: 150px;">
			<col style="width: auto;">
		</colgroup>
		<tbody>
			<tr>
				<th scope="row">
					<label for="NOTICE_TIT"><spring:message code="title.notice.title"/></label>
				</th>
				<td>
					<input type="text" id="NOTICE_TIT" name="NOTICE_TIT" value="${DATA.NOTICE_TIT}" />
				</td>
			</tr>
			<tr>
				<th scope="row">
					<label for="INS_ID"><spring:message code="title.notice.writer"/></label>
				</th>
				<td>
					<input type="hidden" name="INS_ID" value="${DATA.INS_ID}" />
					${DATA.USER_NM}
				</td>
			</tr>
			<tr>
				<th scope="row">
					<spring:message code="title.event.INS_DT"/>
				</th>
				<td>
					${DATA.INS_DT}
				</td>
			</tr>
			<tr>
				<th scope="row">
					<label for="NOTICE_CONT"><spring:message code="title.notice.contents"/></label>
				</th>
				<td>
									                              <div class="input-group input-group-wrap">
				
					<textarea id="NOTICE_CONT" name="NOTICE_CONT" cols="30" rows="10">${DATA.NOTICE_CONT}</textarea>
				</div>
				</td>
			</tr>
		</tbody>
	</table>
<!-- 	<button type="reset">Reset</button> -->
<div style="text-align: center; padding: 20px; margin: 50px;">
	<span  class="basic_btn" onclick="deleteNotice()"><spring:message code="button.delete"/></span>
		<span  class="basic_btn" onclick="updateNotice()"><spring:message code="button.save"/></span>
	
<%-- 	<span  class="basic_btn" onclick="goList()"><spring:message code="button.list"/></span> --%>
	
	</div>
</form>

</div>