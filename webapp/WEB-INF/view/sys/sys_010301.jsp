<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<link rel="stylesheet" href="${ctxPath}/stylesheet/stnd/sys_code.css">

<style>
/* input type이 number인 경우 화살표 css 제거 */
input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {-webkit-appearance: none;margin: 0;}

</style>

<script type="text/javascript" >

var msg = rules['required'].msg[lang];
// make treeview look clearly
function treeCallback(grid) {
	$(grid).find('span[data-lev="1"]').each(function(i, o) {
		$(o).css({
			margin: '0px',
			padding: '0px'
		});
		//$(o).after('<span style="color: red;">&nbsp;</span>');
	});
	
	$(grid).find('span[data-lev="2"]').each(function(i, o) {
		if ($(o).hasClass('parent')) {
			$(o).css('margin-left', '40px');			
		}
		//$(o).after('<span style="color: lightgreen;">&nbsp;</span>');
	});
	
	$(grid).find('span[data-lev="3"]').each(function(i, o) {
		$(o).css('margin-right', '40px');		
		//$(o).after('<span style="color: blue;">&nbsp;</span>');
	});
}
 
 

$(document).ready(function(){
			   
	    

});


/*check double common code  */
function doubleCheck(){
	var code = $('#COMM_CD').val();
	if(code==null||code==''){
		
		var name = 'Code';
		var msg1 = msg.replace('###', '"'+name+'"')
	$('#COMM_CD').inputWarning(msg1);
		

// 		alert('<spring:message code='sys.sys_0101.list.alert.invalid' />');
	}else{
		$.ajax({
			  url: CTX+'/sys/sys_0103/checkDoubleCode.ajax?COMM_CD='+code,
			  type: 'GET',
			  success: function(data) {
			    if(data){
					alert('<spring:message code='sys.sys_0101.list.alert.news' />')
			    }else{
			    	alert('<spring:message code='sys.sys_0101.list.alert.doubles' />')
			    }
			  },
			  error: function( req, status, err ) {
			    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
			  }
			});		
	}	
}
function createCode(){

	  var manufar = $('#Manu_ALARM_CD').val().trim();
	  var type = $('#Type_ALARM_CD').val().trim();
	  var capacity = $('#Capacity_ALARM_CD').val().trim();
	  var name = $('#ALARM_NM').val().trim();
	  var description = $('#DESCRPT').val().trim();
	  if(!description){
		  $('#DESCRPT').inputWarning('"Description" is required item.');
	  }else{
		 // $('#DESCRPT').available();
	  }
	  
	  if(validateDoubleAlarm(manufar, type, capacity, name) && description){
			$.ajax({
				  url: CTX+'/sys/sys_0103/addAlarmCode.ajax',
				  data:{
					  MANUFAR: manufar,
					  ALARM_TP: type,
					  CAPACITY:capacity,
					  DESCRPT: description,
					  ALARM_NM: name
				  },
				  success: function(data, status) {
					  var check = data['CHECK'];
					  if(check){
						  var code = data['WT_ALARM_GR_ID'];
//						  alert('<spring:message code='message.saveSuccess' />');
						  alert(_MESSAGE.common.saveSuccess);
						  onBack();
//						  if(confirm("<spring:message code='sys.sys_0101.confirm.DeatailAlarm' />")){
//								var url = CTX+'/sys/sys_0101/listdetailAlarm/form.popup?WT_ALARM_GR_ID='+code;
//								popupWindow = window.open(url, 'popup', 'width=' + (parseInt(window.innerWidth) * 0.9) + ',height=' + (parseInt(window.innerHeight) * 0.9));
//						  }else{
//							  cancelCode();
								
//						  }
					  }else{
						  alert('<spring:message code='sys.sys_0101.list.alert.doubles' />');
					  }
				  },
				  error: function( req, status, err ) {
				    
				  }
				});
	  }else{
		  alert('<spring:message code='sys.sys_0101.list.alert.invalid' />');
	  }
	
}
 
  /* Alarm code js */
  function checkDoubleAlarm(){
	  var manufar = $('#Manu_ALARM_CD').val();
	  var type = $('#Type_ALARM_CD').val();
	  var capacity = $('#Capacity_ALARM_CD').val();
	  if(validateDoubleAlarm(manufar, type, capacity, "default")){
			$.ajax({
				  url: CTX+'/sys/sys_0103/checkDoubleAlarmCode.ajax',
				  data:{
					  MANUFAR: manufar,
					  ALARM_TP: type,
					  CAPACITY:capacity
				  },
				  success: function(data) {
					  if(data){
						  	$('#Manu_ALARM_CD').available();
							$('#Type_ALARM_CD').available();
							$('#Capacity_ALARM_CD').available();
						}else{
						  $('#Manu_ALARM_CD').inputWarning('<spring:message code='sys.sys_0101.list.alert.doubles' />');
						  $('#Type_ALARM_CD').inputWarning('<spring:message code='sys.sys_0101.list.alert.doubles' />');
						  $('#Capacity_ALARM_CD').inputWarning('<spring:message code='sys.sys_0101.list.alert.doubles' />');
					  }
					  
				  },
				  error: function( req, status, err ) {
				  }
				});
	  }else{
		  alert('<spring:message code='sys.sys_0101.list.alert.invalid' />');	//Some fields are required!
	  }

  }
  function validateDoubleAlarm( a, b, c, d){
	  var check = true;
	  if(a == null || a==''){
		  check = false;
			
	  }
	  if(b == null || b==''){
		  check = false;
				  }
	 if(c == null || c==''){
		 check = false;	
	  }
	 if(!check){
// 	 		var name = 'Capacity, Type, Capacity';
			var msg1 = '"Manufacturer, Type, Capacity" are required items.'
// 			var msg1 = '"Manufacturer" is required item.'
// 			var msg2 = '"Type" is required item.'
// 			var msg3 = '"Capacity" is required item.'
			
			$('#Manu_ALARM_CD').inputWarning(msg1);
			$('#Type_ALARM_CD').inputWarning(msg1);
			$('#Capacity_ALARM_CD').inputWarning(msg1);
	 	}
	 
	 if(d != 'default' || $('#ALARM_NM').val()){
	  if(d == null || d==''){
		  check = false;
			//var name = 'Alarm name';
			//var msg1 = msg.replace('###', '"'+name+'"')
			var msg2 = '"Code name" is required item.'
			$('#ALARM_NM').inputWarning(msg2);
	  }else{
		  //$('#ALARM_NM').available();
	  }
	 }
	  return check;
  }
  /* Alarm code js */

  function deleteAlarmGroup(){
	var url =CTX+'/sys/sys_0103/deleteGrAlarmCd.ajax';
	var data = {};
	data['WT_ALARM_GR_ID'] = alarmCd;
	if(!data['WT_ALARM_GR_ID']){
		return false
	}
	 if(confirm(_MESSAGE.common.deleteConfirm)){	
	$.ajax({
		url :url,// CTX+ url, )
		data : $.extend({
			'type' : 'dialog'
			,'cls' : ''
		}, data),
		cache : false,
		success : function(data, textStatus, jqXHR) {
			if(data == true || data == 'true'){
				//alert('<spring:message code='message.deletedSuccess' />');
				alert(_MESSAGE.common.deleteSuccess);
				window.location.href =CTX+ "/sys/sys_0103/list";
			}else if(data == 'hasChildren'){
				alert('This menu has children!');
			}else{
				//alert('<spring:message code='message.deletedFailed' />');
				alert(_MESSAGE.common.deleteFail);

			}
		}
	});
	 }
}
  
/* input type number 길이 제한  */  
function numberMaxLength(e){
    if(e.value.length > e.maxLength){
        e.value = e.value.slice(0, e.maxLength);
    }
}  
	  
</script>
<div id="add_code_form" class="container system-wrap system-wrap1">
	  <!-- 발전기 등록테이블 -->
	  <!--tit-wrap-->

	        <div class="tit-wrap">
	    <h2 class="heading3">
							<span class="txt"><spring:message code="button.register"/></span>
		      <!-- <span class="version">V47</span> -->
	    </h2>
	    <ul class="location">
	      <li>${navimenu.SUBMENU.MENU_NM}</li>
	      <li class="bold">${navimenu.SUBMENU.SUBMENU.MENU_NM}</li>
	      
	      
	    </ul>
	  </div>
	  
<%-- <span id="btnDelete" class="basic_btn bg_gray ico l7" onclick="cancelCode()"><spring:message code='sys.sys_0101.list.button.cancel' /></span>
 --%>
								
<!--Register alarm code  -->
	<div id="alarmCode" style="float:left; width: 100%;">
			<div class="group_content system-detail-wrap">
			<div class="system-left">
				<div class="registration-form registration-form1">
				<div class="registration-form-lst-wrap">
					<ul class="registration-form-lst">
						<li>
							<span>Alarm Group Code<span class="red"> *</span></span>
						    <div class="registration-write">
						    	<div class="input-group" style="width: 30.5%">
									<input type="number"  maxlength="2" oninput="numberMaxLength(this)" nova-validation="required" id="Manu_ALARM_CD" name="Manu_ALARM_CD"   value="" placeholder="Manufacturer CD">
								</div>
								<div class="combine">/</div>
								<div class="input-group" style="width: 30.5%">
									<input type="number" maxlength="2" oninput="numberMaxLength(this)" nova-validation="required" id="Type_ALARM_CD" name="Type_ALARM_CD"   value="" placeholder="Type CD">
								</div>
								<div class="combine">/</div>
								<div class="input-group" style="width: 30.5%">
									<input type="number" maxlength="10" oninput="numberMaxLength(this)" nova-validation="required" id="Capacity_ALARM_CD" name="Capacity_ALARM_CD"   value="" placeholder="Capacity(MW)">
						        </div> 
							</div>
						</li>
						<li>
							<div class="registration-write btn-input-wrap">
								<button  class="btn bg_orange ico g8 registration-search-btn"  onclick="checkDoubleAlarm()" style="margin-right:-105px;"><spring:message code='sys.sys_0101.list.button.doubles' /></button>
							</div>
						</li>
				        <li class="note">
			            	<span ><spring:message code='sys.sys_0101.list.title.description' /><span class="red"> *</span></span>
			            	<div class="registration-write">
			              		<div class="input-group input-group-wrap">
			              			<label for="search_code" class="sr-only"><spring:message code='sys.sys_0101.list.title.description' /></label>
		<!-- 	              <input type="text" id="search_code" name="search.ROLE_ID" value=""> -->
			              			<textarea maxlength="300" id="DESCRPT" nova-validation="required" name="DESCRPT" placeholder="You can type up to 300 characters."></textarea>
			              		</div>
			            	</div>
			          	</li>
					</ul>
				    <ul class="registration-form-lst">
				    	<li>
							<span><spring:message code='sys.sys_0101.list.title.codeName' /><span class="red"> *</span></span>
						    <div class="registration-write">
						    	<div class="input-group">     
									<input type="text" maxlength="15" id="ALARM_NM"  nova-validation="required" name="ALARM_NM"  value="" placeholder="You can type up to 15 characters.">
						        </div>
						    </div>      
				        </li>
					</ul>
				</div>
				</div>
			</div>
			<div class="system-right">
				<c:if test="${navimenu.SUBMENU.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">						
					 <a class="basic_btn sbtn ac_click btn-style btn-style1"  onclick="createCode()"><spring:message code='button.save' /></a>
				</c:if>
					 <a class="basic_btn sbtn ac_click btn-style btn-style2"   onclick="onBack()">Cancel</a>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
//drawgrid_comm();
function onBack(){
	window.location.href = "";
}
</script>
	