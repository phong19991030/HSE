<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<link rel="stylesheet" href="${ctxPath}/stylesheet/stnd/sys_code.css">

<style>
/* input type이 number인 경우 화살표 css 제거 */
input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {-webkit-appearance: none;margin: 0;}
span#MANUFACTURER_NM, span#POWER, span#TOWER_H, span#ROTOR_D {height:32px;display:inline-block;line-height:32px;} 

</style>

<script type="text/javascript" >


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
 
 
var group_id = '';
$(document).ready(function(){
			   
	group_id = $('#WT_ALARM_GR_ID').val();


});


function saveCode(){
		
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
				  url: CTX+'/sys/sys_0103/updateAlarmCode.ajax',
				  data:{
					  MANUFAR: manufar,
					  ALARM_TP: type,
					  CAPACITY:capacity,
					  DESCRPT: description,
					  ALARM_NM: name,
					  WT_ALARM_GR_ID: group_id
				  },
				  success: function(data, status) {
					  var check = data['CHECK'];
					  if(check){
						  var code = data['WT_ALARM_GR_ID'];
// 						  alert('<spring:message code='message.updateSuccess' />');
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
		if(!group_id){
			return false;
		}
	  var manufar = $('#Manu_ALARM_CD').val();
	  var type = $('#Type_ALARM_CD').val();
	  var capacity = $('#Capacity_ALARM_CD').val();
	  if(validateDoubleAlarm(manufar, type, capacity, "default")){
			$.ajax({
				  url: CTX+'/sys/sys_0103/checkDoubleAlarmCodeUpdate.ajax',
				  data:{
					  MANUFAR: manufar,
					  ALARM_TP: type,
					  CAPACITY:capacity,
					  WT_ALARM_GR_ID: group_id
				  },
				  success: function(data) {
					  if(data){
						  $('#Manu_ALARM_CD').available();
							$('#Type_ALARM_CD').available();
							$('#Capacity_ALARM_CD').available();
						}else{
						  $('#Manu_ALARM_CD').inputWarning('This alarm group code already have existed.');
						$('#Type_ALARM_CD').inputWarning('This alarm group code already have existed.');
						$('#Capacity_ALARM_CD').inputWarning('This alarm group code already have existed.');
					  }
				  },
				  error: function( req, status, err ) {
				  }
				});
	  }else{
		  alert('<spring:message code='sys.sys_0101.list.alert.invalid' />');
	  }

  }
  function validateDoubleAlarm( a, b, c, d){
	  var check = true;
	  if(a == null || a==''){
		  check = false;
		  //$('#Manu_ALARM_CD').inputWarning(rules['required'].msg[lang]);
	  }else{
		  //$('#Manu_ALARM_CD').available();
	  }
	  if(b == null || b==''){
		  check = false;
		  //$('#Type_ALARM_CD').inputWarning(rules['required'].msg[lang]);
	  }else{
		  //$('#Type_ALARM_CD').available();
	  }
	 if(c == null || c==''){
		 check = false;
		  //$('#Capacity_ALARM_CD').inputWarning(rules['required'].msg[lang]);
	  }else{
		  //$('#Capacity_ALARM_CD').available();
	  }
	 if(!check){
		 var msg1 = '"Manufacturer, Type, Capacity" are required items.'
		 $('#Manu_ALARM_CD').inputWarning(msg1);
		 $('#Type_ALARM_CD').inputWarning(msg1);
		 $('#Capacity_ALARM_CD').inputWarning(msg1);
	 }
	 if(d != 'default' || $('#ALARM_NM').val()){
	  if(d == null || d==''){
		  check = false;
		  //$('#ALARM_NM').inputWarning(rules['required'].msg[lang]);
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
	data['WT_ALARM_GR_ID'] = '${DATA.WT_ALARM_GR_ID}';
	if(!data['WT_ALARM_GR_ID']){
		return false
	}
// 	 if(confirm('<spring:message code='message.confirmDelete' />\nAll alarms in this group will be deleted.')){
	if(confirm(_MESSAGE.common.deleteConfirm)){	 
	$.ajax({
		url :url,// CTX+ url, )
		data : $.extend({
			'type' : 'dialog'
			,'cls' : ''
		}, data),
		cache : false,
        //timeout 2 min
        timeout: 120000,			
        beforeSend: function() {
        	$('#loader').css("display",'block');
		},
		success : function(data, textStatus, jqXHR) {
        	$('#loader').css("display",'block');

			if(data == true || data == 'true'){
// 				alert('<spring:message code='message.deletedSuccess' />');
				alert(_MESSAGE.common.deleteSuccess);
				window.location.href =CTX+ "/sys/sys_0103/list";
			}else if(data == 'hasChildren'){
				alert('This menu has children!');
			}else{
// 				alert('<spring:message code='message.deletedFailed' />');
				alert(_MESSAGE.common.deleteFail);

			}
		},
		error: function(xhr) {
        	$('#loader').css("display",'none');
//             alert('<spring:message code='message.saveFailed' />');
			   alert(_MESSAGE.common.saveFail);
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
	    
							<span class="txt"><spring:message code="button.modify"/></span>
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
						<input hidden id="WT_ALARM_GR_ID" name="WT_ALARM_GR_ID" value="${DATA.WT_ALARM_GR_ID}"  >
								  <ul class="registration-form-lst">
								      <li>
								              <span>Alarm Group Code<span class="red"> *</span></span>
								                <div class="registration-write">
								                <div class="input-group" style="width: 30.5%">
												<input maxlength="2"  nova-validation="required" type="number" id="Manu_ALARM_CD" name="Manu_ALARM_CD" value="${DATA.MANUFAR}"  >
										</div>
										<div class="combine">/</div>
										<div class="input-group" style="width: 30.5%">
										<input maxlength="2" type="number"  nova-validation="required" id="Type_ALARM_CD" name="Type_ALARM_CD"   value="${DATA.ALARM_TP}"  >
										</div>
										<div class="combine">/</div>
										<div class="input-group" style="width: 30.5%">
										<input maxlength="10" type="number"  nova-validation="required" id="Capacity_ALARM_CD" name="Capacity_ALARM_CD"   value="${DATA.CAPACITY}"  >
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
					              <textarea maxlength="300" id="DESCRPT" nova-validation="required" name="DESCRPT" >${DATA.DESCRPT}</textarea>
					              </div>
					            </div>
					          </li>
						            </ul>
						            <ul class="registration-form-lst">
						            <li>
								        <span><spring:message code='sys.sys_0101.list.title.codeName' /><span class="red"> *</span></span>
								              <div class="registration-write">
								                
								                <div class="input-group">
								                
												<input type="text" maxlength="15" id="ALARM_NM"  nova-validation="required" name="ALARM_NM"   value="${DATA.ALARM_NM}"  >
								           </div>
								           </div>
								           
						            </li>
						        </ul>
						</div>
					</div>
				</div>
				<div class="system-right">
					<c:if test="${navimenu.SUBMENU.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
						<a class="basic_btn sbtn ac_click btn-style btn-style1"  onclick="saveCode()"><spring:message code='button.save' /></a>
					</c:if>
					<c:if test="${navimenu.SUBMENU.SUBMENU.SUBMENU.WRT_YN eq 'Y'}">
						<a class="basic_btn sbtn ac_click btn-style btn-style3"   onclick="deleteAlarmGroup()"><spring:message code='button.delete' /></a>
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
	
	    <div id="loader" style="display: none" class="lds-dual-ring  overlay"></div>
	