<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
input{
	width: 300px;
}
</style>

<script type="text/javascript">

function submitWithValidation(obj) {
	
	if (validateForm() == "true") {
		$(obj).parents('form').submit();

	} else {
		alert(validateForm());
	}
	//		save(obj)
}

var validateForm = function() {
	var message = "";
	if (!$('#title').val()) {
		message += "<spring:message	code='message.portlet.title.required' />\n";
	}
	if (!$('#url').val()) {
		message += "<spring:message	code='message.portlet.url.required' />\n";
	}

	if (message == "") {
		return "true";
	} else
		return message;

}

 function saveCallbackFunc(form, data){
// 	 console.log(data);
	 updateWidgetCallback(data);
		closeDialogPopup(form);

 }
 
 function doDelete(event){
	 if(confirm('<spring:message code='message.confirmDelete' />')){
			
  	   var data = {"WIDGET_ID": $('#widget_id').val()};
     	   $.ajax({
     	        url:  CTX + "/common/common/portlet/edit/delete01.ajax",
     	        type: "post",
     	        data: data ,
     	        success: function (response) {
//      	        	callback(response);
					var msg = '<spring:message code='apv01010101.msg.deleteSuccess' />'
					alert(msg);
					deleteWidgetCallback(data);
					$('#newWidgetForm').closest('.ui-dialog-content').dialog('close'); 
     	        },
     	        error: function(jqXHR, textStatus, errorThrown) {
     	           console.log(textStatus, errorThrown);
     	        }
     	    }); 
		}
 }

</script>


<form:form action="${formPath}/save01.ajax" id="newWidgetForm" data-func="saveAjax" data-callback="saveCallbackFunc">
		
		<input name="WIDGET_ID" id="widget_id" hidden value="${DATA.WIDGET_ID}">
		<!-- 사용자 등록 -->
		<fieldset>
			<legend>입력 및 선택한 조건으로 등록합니다.</legend>
			<div class="group">
				<div class="group_title">
					<strong class="g_title"><spring:message
 									code='title.form.editWidget' /></strong>
					<span class="g_title_tip"><em class="aster"><i class="icon-ok"></i></em></span>
					<div class="g_title_btn">
<!-- 						<span class="btn bts_snew ac_click sbtn" data-func="reset" data-param="F">신규</span> -->
						<span class="btn btm_delete ac_click sbtn" data-func="doDelete"></span>
						<span class="btn btm_save ac_click sbtn" data-func="submitWithValidation"></span>
					</div>
				</div>
				<div class="group_content write">
			<table id="orgSave" class="write_tbl">
				<caption></caption>
				<colgroup>
					<col style="width: 200px;">
					<col style="width: auto;">
				
				</colgroup>
				<tbody>
					<tr>
						<th><label for="title"><spring:message
 									code='title.portlet.label.title' /></label></th>  
						<td><input type="text" name="TITLE" id="title" value="${DATA.TITLE}" style="width: 300px" maxlength="50" required></td>
					</tr>
					<tr>
						<th><label for="url"><spring:message
 									code='title.portlet.label.url' /></label></th>
						<td><input type="text" name="URL" id="url" value="${DATA.URL}" style="width: 300px" maxlength="50" required></td>
					</tr>


				</tbody>
			</table>

				</div>
			</div>
		</fieldset>

	</form:form>