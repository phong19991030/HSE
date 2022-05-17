<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<link rel="stylesheet" href="${ctxPath}/stylesheet/stnd/sys_code.css">
<script type="text/javascript" >


$(document).ready(function(){
		
	addRootComm();
	    

});

var duplCheck = 'unset';

/*check double common code  */
function doubleCheck(){
	var code = $('#COMM_CD').val();
	if(code==null||code==''){
		$('#COMM_CD').inputWarning('"Code" is required item.');

// 		alert('<spring:message code='sys.sys_0101.list.alert.invalid' />');
	}else{
		$.ajax({
			  url: CTX+'/sys/sys_0104/checkDoubleCode.ajax?COMM_CD='+code,
			  type: 'GET',
			  success: function(data) {
			    if(data === true){
					$('#COMM_CD').available();
					alert('<spring:message code='sys.sys_0101.list.alert.news' />');
					duplCheck = 'true';
			    }else if(data === false) {
			    	duplCheck = 'false';
					$('#COMM_CD').inputWarning('This code already have existed.');
			    	alert('<spring:message code='sys.sys_0101.list.alert.doubles' />');
			    }else{
			    	alert('<spring:message code='msg.somethingWrong' />');
			    }
			  },
			  error: function( req, status, err ) {
			    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
			  }
			});		
	}	
}
function createCode(){

	var code = $('#COMM_CD').val();
	var name = $('#COMM_NM').val();
	var upCd = $('#UP_COMMON_CD').val();
	var lev = $('#LEV_COMMON_CD').val();
	var crud = $('#TYPE_COMMON_CD').val();
	var description = $('#DESCRPT').val();
	  if(!description){
		  $('#DESCRPT').inputWarning('"Description" is required item.');
	  }else{
		  $('#DESCRPT').available();
	  }
	  
	  
	  
	if(validateCommon()){
		
		  
		$.ajax({
			  url: CTX+'/sys/sys_0104/addCommonCode.ajax',
			  type: 'POST',
			  data:{
				  COMM_CD:code,
				  COMM_NM:name,
				  DESCRPT:description,
				  CRUD:crud,
				  LEV:lev,
				  UP_CD: upCd.trim()
			  },
			  success: function(data) {
 
				  if(data === 'true'){
						alert('<spring:message code='sys.sys_0101.list.alert.success' />');
						  resetComm();
						  onBack();
						//drawgrid_comm();							 
				  }else if(data === 'dupl'){
						alert('<spring:message code='sys.sys_0101.list.alert.doubles' />');  
						$('#COMM_CD').inputWarning('<spring:message code='sys.sys_0101.list.alert.doubles' />')
				  }else{
					  console.log( '<spring:message code='msg.somethingWrong' />');
				  }
			  },
			  error: function( req, status, err ) {
			    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
			  }
			});	
	}else{
		alert('<spring:message code='sys.sys_0101.list.alert.invalid' />')
	}
}
 function validateCommon(){
	var check = true;
	var code = $('#COMM_CD').val();
	var name = $('#COMM_NM').val();
	if(code==null||code==''){
		check = false;
		$('#COMM_CD').inputWarning('"Code" is required item.');
	}else{
		  $('#COMM_CD').available();
	  }
	if(name==null||name==''){
		check = false;
		$('#COMM_NM').inputWarning('"Code name" is required items.');

	}else{
		  $('#COMM_NM').available();
	  }
	return check;
} 
 function cancelCode(){
		var url = CTX+'/sys/sys_0101/list';
		$(location).attr('href',url); 
 }

	  
 /*Common code js  */
  function doGridClickComm(rowId, target, obj3, obj4, obj5, obj6){
	 	var val = $(obj5.target).html();
	 	var code = $(val).attr('data-id');
		var lev = $(val).attr('data-lev');
		var colObj = $(obj6).data();
		var col = colObj['col'];
		if(col=='CODE'||col=='NAME'){
			if(rowId){
				rowData = $('#table_grid1').getRowData(rowId);
				if(rowData){					
					document.getElementById("COMM_NM").removeAttribute("readonly");
					$('input[name="COMM_CD"]').val(rowData.CODE); 
					$('#DESCRPT').val(rowData.DESCRPT);
		 			$('input[name="COMM_NM"]').val(rowData.NAME);
					$('#TYPE_COMMON_CD').val('U');
					if(rowData.UP_CD==""){
						$('#PARENT_COMM_CD').val("ROOT");
					}else{
						$('#PARENT_COMM_CD').val(rowData.UP_CD);
					}
					
				}
			}
		} 
 }
  function addRootComm(){
	  resetComm();
	  	$('#PARENT_COMM_CD').val("ROOT");
		$('#LEV_COMMON_CD').val(1);
		 document.getElementById("COMM_CD").removeAttribute("readonly");
		 document.getElementById("COMM_NM").removeAttribute("readonly"); 
		 $('#TYPE_COMMON_CD').val('C');
		 
 }
  function resetComm(){
	  	document.getElementById("COMM_CD").setAttribute("readonly", true);
		document.getElementById("COMM_NM").setAttribute("readonly", true);
		 	$('#COMM_CD').val('');
	 	    $('#COMM_NM').val('');
			$('#UP_COMMON_CD').val('');
			$('#LEV_COMMON_CD').val('');
			$('#TYPE_COMMON_CD').val('');
			$('#UP_COMMON_CD').val('');
			$('#DESCRPT').val('');
			$('#PARENT_COMM_CD').val('');
  }
  
  function deleteComm(){
		 var code =$(obj.target).closest('tr').find('td[data-col="CODE"]')[0].innerText;
		 var lev = $(obj.target).closest('tr').find('td[data-col="LEV"]').html();
		 if(confirm("<spring:message code='sys.sys_0101.confirm.Delete' />")){
				$.ajax({
					  url: CTX+'/sys/sys_0101/deleteCommonCode.ajax',
					  data:{
						  LEV: lev,
						  CODE: code
					  },
					  success: function(data) {
						  alert('<spring:message code='sys.sys_0101.list.alert.deleteSucess' />');
						  //drawgrid_comm();
						  resetComm();
					  },
					  error: function( req, status, err ) {					    
					  }
					});	 
		 } 
  }
  
  function removeComm(obj){
		 var code =$(obj.target).closest('tr').find('td[data-col="CODE"]')[0].innerText;
		 var lev = $(obj.target).closest('tr').find('td[data-col="LEV"]').html();
		 if(confirm("<spring:message code='sys.sys_0101.confirm.Delete' />")){
				$.ajax({
					  url: CTX+'/sys/sys_0101/deleteCommonCode.ajax',
					  data:{
						  LEV: lev,
						  CODE: code
					  },
					  success: function(data) {
						  alert('<spring:message code='sys.sys_0101.list.alert.deleteSucess' />');
						  //drawgrid_comm();
						  resetComm();
					  },
					  error: function( req, status, err ) {					    
					  }
					});	 
		 } 
  }
  function addItemComm(obj){	
		 var code =$(obj.target).closest('tr').find('td[data-col="CODE"]')[0].innerText;
		 var name = $(obj.target).closest('tr').find('td[data-col="NAME"]').html();
		 var lev = $(obj.target).closest('tr').find('td[data-col="LEV"]').html();
		 if(lev<3){
			 document.getElementById("COMM_CD").removeAttribute("readonly");
			 document.getElementById("COMM_NM").removeAttribute("readonly");
			 $('#COMM_CD').val('');
			 $('#COMM_NM').val('');
			 $('#DESCRPT').val('');
			 $('#LEV_COMMON_CD').val(parseInt(lev)+1);
			 $('#UP_COMMON_CD').val(code);
			 $('#TYPE_COMMON_CD').val('C');
			 $('#PARENT_COMM_CD').val(code);
			 
		 }else{
			 resetComm();
		 }
  }

  function link_comm(cellValue, options, rowObject) {
	 	var type = options['field'];
		var row = options['model'];
		var lev = row['LEV'];
		if(type=='ACTION'){
			if(lev<3){
				return '<button type="button" onclick="addItemComm(event)" class="btn_span">+</button> <button  type="button" onclick="removeComm(event)" class="btn_span_minus">-</button>';
			}else{
				return '<button  type="button" onclick="removeComm(event)" class="btn_span_minus" style="margin-left: 40%;">-</button>';
			}
		}
 }
  /*Common code js  */
 
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
									
						<div id="commonCode" style='float:left; width: 100%;'>
<!-- 							<div id="grid1" style='float:left;  width:45%;'> </div>
 -->							<div class="group_content system-detail-wrap">
							<div class="system-left">
							<div class="registration-form registration-form1">
								  <div class="registration-form-lst-wrap">
								          <ul class="registration-form-lst">
								          <li hidden>
								              <span><spring:message code='sys.sys_0101.parenCd' /></span>
								             <div class="registration-write  registration-write-select">
								                <div class="input-group">
												<input type="text" id="PARENT_COMM_CD" name="PARENT_COMM_CD" readonly value="">
								           </div>
						              </div>
						            </li>
						            <li>
								        <span><spring:message code='sys.sys_0101.list.title.code' /><span class="red"> *</span></span>
								             <div class="registration-write  btn-input-wrap">
								                <div class="input-group">
								                
												<input maxlength="20" nova-validation="required" type="text" id="COMM_CD" name="COMM_CD"  readonly value="">
								           </div>
								           <button  class="btn bg_orange ico g8 registration-search-btn"  onclick="doubleCheck()"><spring:message code='sys.sys_0101.list.button.doubles' /></button>
								           
						              </div>
						            </li>
						            <li>
					            <span class="detail-search-keyword"><spring:message code='sys.sys_0101.list.title.description' /><span class="red"> *</span></span>
					            <div class="registration-write">
					              					                              <div class="input-group input-group-wrap">
					              
					              <label for="search_code" class="sr-only"><spring:message code='sys.sys_0101.list.title.description' /></label>
				<!-- 	              <input type="text" id="search_code" name="search.ROLE_ID" value=""> -->
					              <textarea maxlength="2500"  nova-validation="required" id="DESCRPT" name="DESCRPT" ></textarea>
					              </div>
					            </div>
					          </li>
						            </ul>
						            <ul class="registration-form-lst">
						            
						            <li>
								        <span><spring:message code='sys.sys_0101.list.title.codeName' /><span class="red"> *</span></span>
								             <div class="registration-write  registration-write-select">
								                <div class="input-group">
											<input maxlength="200" type="text"   nova-validation="required"   id="COMM_NM" readonly name="COMM_NM"  value="">
											
											<input type="hidden" id="UP_COMMON_CD" name="UP_COMMON_CD">
											<input type="hidden" id="LEV_COMMON_CD" name="LEV_COMMON_CD">
											<input type="hidden" id="TYPE_COMMON_CD" name="TYPE_COMMON_CD">								           </div>
						              </div>
						            </li>
								</ul>
										</div>
						</div>
						</div>
						<div class="system-right">
						
						<div class="btns">
<%-- 	       					<span class="basic_btn sbtn ac_click btn-style btn-style1" hidden  onclick="addRootComm()"><spring:message code='oam.oam_0203.detail.tab03.form.grid.button.add' /></span>
 --%>							<a class="basic_btn sbtn ac_click btn-style btn-style1"  onclick="createCode()"><spring:message code='button.save' /></a>
								<a class="basic_btn sbtn ac_click btn-style btn-style2"   onclick="onBack()"><spring:message code='button.back' /></a>
<%-- 							    <a onclick="deleteCode()" class="btn-style btn-style3"><spring:message code='button.delete' /></a> --%>
							
      					</div>
							
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
	