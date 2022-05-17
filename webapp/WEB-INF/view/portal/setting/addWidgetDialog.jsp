<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>


<style>

</style>

<script type="text/javascript">

var icon = '${DATA.ICON}';
var crud = '${DATA.CRUD}';

function onSave(obj) {
	$(obj.target).parents('form').submit();
	
}

 function saveCallbackFunc(form, data){
	 saveWidgetCallback();
	closeDialogPopup(form);

 }
 
 function onDelete(){
	
	 
	 if(confirm('<spring:message code='message.confirmDelete' />')){
			
	  	   var data = {"WIDGET_ID": $('input[name="WIDGET_ID"]').val()};
	     	   $.ajax({
	     	        url:  CTX + "/plt/plt_0101/edit/delete01.ajax",
	     	        type: "post",
	     	        data: data ,
	     	        success: function (response) {
//	      	        	callback(response);
						if(response == 'true'){
							var msg = '<spring:message code='sys.sys_0101.list.alert.deleteSucess' />'
							alert(msg);
							saveWidgetCallback();
							 closeDialogPopup($('#newWidgetForm'));
							
						}else{
							var msg = '<spring:message code='oam.oam_0203.detail.tab03.msg.saveUnsuccess' />'
							alert(msg);

						}
	     	        },
	     	        error: function(jqXHR, textStatus, errorThrown) {
	     	           console.log(textStatus, errorThrown);
	     	        }
	     	    }); 
			}
 }
 
 $(function(){
	 if(icon && crud){
		  $('.add-lst-select-icon > ul > li').removeClass('active');
		  $('.add-lst-select-icon > ul > li > a > i.'+ icon).closest('li').addClass('active').trigger('click');
	 }else{
		 $('#icon').val($('.add-lst-select-icon > ul > li.active a i ').attr('class'));	 
// 		 alert('default')
	 }

// 	 $('.add-lst-select-icon > ul > li.active').trigger('click');
	  $('.add-lst-select-icon > ul > li').click(function(){
		  $('.add-lst-select-icon > ul > li').removeClass('active');
		  $(this).addClass('active');
		  var className = $(this).find('a i').attr('class');
		  $('#icon').val(className);
		  
	  })	 
 })
 

</script>


<form:form action="${formPath}/save02.ajax" id="newWidgetForm" data-func="saveAjax" data-callback="saveCallbackFunc">

			<input hidden name="CRUD" value="${DATA.CRUD}"/>
			<input hidden name="WIDGET_ID" value="${DATA.WIDGET_ID}"/>
		    <div class="tit-wrap">
		    	<c:if test="${CRUD == 'U'}">
		    		<strong class="heading8"><spring:message	code='title.portlet.setting.widgetSetting' /></strong>
		    	</c:if>
		    	<c:if test="${CRUD != 'U'}">
		    		<strong class="heading8"><spring:message	code='title.portlet.setting.addWidget' /></strong>
		    	</c:if>
		    </div>
		    <div class="registration-form-lst-wrap registration-form-lst-wrap-full">
				<ul class="registration-form-lst">
					<li>
						<span><spring:message	code='title.porlet.setting.title' /></span>
						<div class="registration-write">
							<div class="input-group">
								<label for="addLstTitle" class="sr-only"><spring:message	code='title.porlet.setting.title' /></label>
								<input type="text" name="title" id="title" value="${DATA.TITLE}" maxlength="50" nova-validation="required">
							</div>
						</div>
					</li>
					<li>
						<span><spring:message code='title.porlet.setting.url' /></span>
						<div class="registration-write">
							<div class="input-group">
								<label for="addLstUrl" class="sr-only"><spring:message code='title.porlet.setting.url' /></label>
								<input type="text" name="url" id="url"  value="${DATA.URL}" maxlength="50" nova-validation="required">
							</div>
						</div>
					</li>
				</ul>
			</div>
			
			<div class="registration-form-lst-wrap">
				<ul class="registration-form-lst">
					<li>
						<span><spring:message	code='title.porlet.setting.minWidth' /></span>
						<div class="registration-write">
							<div class="input-group">
								<label for="minWidth" class="sr-only"><spring:message	code='title.porlet.setting.minWidth' /></label>
								<input type="text" name="MIN_WIDTH"  value="${DATA.MIN_WIDTH}" id="minWidth"  nova-validation="number">
							</div>
						</div>
					</li>
				</ul>
				<ul class="registration-form-lst">
					<li>
						<span><spring:message	code='title.porlet.setting.minHeight' /></span>
						<div class="registration-write">
							<div class="input-group">
								<label for="minHeight" class="sr-only"><spring:message	code='title.porlet.setting.minHeight' /></label>
								<input type="text" name="MIN_HEIGHT"  value="${DATA.MIN_HEIGHT}" id="minHeight" nova-validation="number">
							</div>
						</div>
					</li>
				</ul>
			</div>
			
			<div class="add-lst-select-icon">
				<span><spring:message	code='title.porlet.setting.setIcon' /></span>
				<input type="text" name="ICON" id="icon"  value="${DATA.ICON}" hidden>
				
				<ul class="icon-lst">
					<li class="active">
						<a href="#none">
							<i class="xi-view-carousel"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-view-list"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-library-bookmark"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-package"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-mail"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-call"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-comment"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-forum"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-message"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-user-address"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-profile"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-group"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-star"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-heart"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-thumbs-up"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-trophy"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-bell"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-alarm"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-time"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-calendar"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-calendar-list"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-new"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-info"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-help"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-error"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-ban"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-warning"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-shield-checked"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-list-square"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-list-number"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-document"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-eraser"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-layout-snb"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-presentation"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-plug"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-battery-50"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-gps"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-chip"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-touch"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-usb"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-book"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-image"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-equalizer"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-equalizer-thin"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-flash"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-paper"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-library-books"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-library-image"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-chart-line"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-chart-bar-square"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-timer"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-map"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-location-arrow"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-walk"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-maker"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-cart"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-box"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-coupon"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-exchange"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-money"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-briefcase"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-receipt"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-file"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-file-text"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-documents"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-file-upload"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-file-download"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-file-check"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-folder"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-folder-open"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-attachment"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-cloud"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-cloud-upload"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-cloud-download"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-upload"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-download"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-globus"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-browser-text"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-central-router"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-branch"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-sitemap"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-sun"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-network-server"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-server"></i>
						</a>
					</li>
					<li>
						<a href="#none">
							<i class="xi-antenna"></i>
						</a>
					</li>
				</ul>
				<div class="btns txt-right">
					<a onclick="onCancel()" class="btn-style btn-style2"><spring:message	code='button.cancel' /></a>
					<c:if test="${DATA.CRUD != 'C'}"><a onclick="onDelete()"  class="btn-style btn-style2"><spring:message	code='button.delete' /></a></c:if>
					<a onclick="onSave(event)"  class="btn-style btn-style1"><spring:message	code='button.save' /></a>
				</div>
			</div>

	</form:form>