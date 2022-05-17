<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
    
    
<script>

$(function(){
	
// 	$('#regi-check1').change(function(){
// 		if($(this).prop('checked')){
// 			$('#type').show();
// 		}else{
// 			$('#type').hide();
// 		}
// 	})
	
})

function validateMainten2() {
		var check = true;
		var pre = $('#add_PRE_MAIN_CD').val().trim();
		var suf = $('#add_SUF_MAIN_CD').val().trim();
		var desc = $('#add_DESCRPT').val().trim();

// 		if (!$('#UP_MAIN_NM').val()) {
// 			check = false;
// 			$('#UP_MAIN_NM').inputWarning('Select parent maintenance code.');
// 		}
		if(!$('#add_UP_MAIN_CD').val() && $('#add_TYPE').val()){
			check = false;
			$('#add_TYPE').inputWarning('TYPE are required item.');

		}
		if (pre == null || pre == '') {
			check = false;
			$('#add_PRE_MAIN_CD').inputWarning(
					'"PREFIX code" and "SUFFIX code" are required items.');

		}
		if (suf == null || suf == '') {
			$('#add_SUF_MAIN_CD').inputWarning(
					'"PREFIX code" and "SUFFIX code" are required items.');
			check = false;
		}
		if (!desc) {
			$('#add_DESCRPT').inputWarning('"Description" required item.');
			check = false;
		}

		return check;
	}
	
function validateCommon(){
	var check = true;
	var code = $('#add_COMM_CD').val().trim();
	var name = $('#add_COMM_NM').val().trim();
	var parent = $('#add_UP_COMM_NM').val().trim();
	var desc = $('#add_DESCRPT').val().trim();
	if(code==null||code==''){
		check = false;
		$('#add_COMM_CD').inputWarning('"Code" is required item.');
	}
	if(name==null||name==''){
		check = false;
		$('#add_COMM_NM').inputWarning('"Code name" is required item.');

	}
	if(parent==null||parent==''){
		check = false;
		$('#add_UP_COMM_NM').inputWarning('Please click add button on parent code.');

	}
	if(desc==null||desc==''){
		check = false;
		$('#add_DESCRPT').inputWarning('"Description" is required item.');

	}
	return check;
} 

function addNewCode(){
	if(validateCommon()){
		var code = $('#add_COMM_CD').val();
// 		var old = $('#OLD_COMM_CD').val();

		var name = $('#add_COMM_NM').val();
		var upCd = $('#add_UP_COMM_CD').val();
		var lev = $('#add_LEV_COMM_CD').val();
		var crud = 'C';
		var description = $('#add_DESCRPT').val();
		$.ajax({
			  url: CTX+'/sys/sys_0104/addCommonCode.ajax',
			  type: 'POST',
			  data:{
				  COMM_CD:code,
				  COMM_NM:name,
				  DESCRPT:description,
				  CRUD:crud,
				  LEV:lev,
				  UP_CD: upCd
// 				  OLD_COMM_CD: old
			  },
			  success: function(data) {
				  if(data == 'true'){
					  
						alert(crud == 'C'?'<spring:message code='message.saveSuccess' />': '<spring:message code='message.updateSuccess' />');
						getData();
					    $("#layerPopup").remove();	
// 						$('#detail-panel .copde').html(code);
// 						$('#detail-panel .name').html(name);
// 						$('#detail-panel .description').html(description);
						cancelUpdate();
				  }else if( data == 'dupl'){
						$('#COMM_CD').inputWarning('This code already have existed.');
						alert('<spring:message code='sys.sys_0101.list.alert.doubles' />');  
				  }else{
						alert(crud == 'C'?'<spring:message code='message.saveFailed' />': '<spring:message code='message.updateFailed' />');
				  }
				  resetComm();
			  },
			  error: function( req, status, err ) {
			    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
			  }
			});	
	}
} 

function doubleCheck(){
 
var crud = 'C';

	
	
 var code = $('#add_COMM_CD').val().trim();
	
	if(code==null||code==''){
		$('#add_COMM_CD').inputWarning('"Code" is required item.');
		alert('"Code" is required item.');
		return false;
	}
	var upcode = $('#add_UP_COMM_CD').val().trim();
	if(upcode==null||upcode==''){
		$('#add_UP_COMM_NM').inputWarning('Please click add button on parent code.');
		alert('Please click add button on parent code.');
		return false;
	}
	
		$.ajax({
			  url: CTX+'/sys/sys_0104/checkDoubleCode.ajax?COMM_CD='+code+'&UP_CD='+upcode,
			  type: 'GET',
			  success: function(data) {
				    if(data === true){
				    	$('#add_COMM_CD').available();
				    }else if(data === false){
						$('#add_COMM_CD').inputWarning('This code already have existed.');
				    	alert('<spring:message code='sys.sys_0101.list.alert.doubles' />');

				    }else{
				    	alert('<spring:message code='msg.somethingWrong' />')
				    }
			  },
			  error: function( req, status, err ) {
			    console.log( '<spring:message code='msg.somethingWrong' />', status, err );
			  }
			});		

	
}
	
</script>

    <div class="tit-wrap">
				<strong class="heading6">Code registration</strong>

			</div>
			<ul class="registration-write-wrap">
				<input type="hidden"  name="add_UP_COMM_CD" id="add_UP_COMM_CD" value="${UP_CD}">
				<input type="hidden"  name="add_LEV_COMM_CD" id="add_LEV_COMM_CD" value="${LEV}">
<%-- 				<c:if test="${UP_CD == null || UP_CD == '' }"> --%>
<!-- 					<li id="add_type" class="sub0"> -->
<!-- 						<span>Type<span class="red"> *</span></span> -->
<!-- 						<div class="registration-write"> -->
<!-- 							<div class="select-box"> -->
<!-- 								<label for="selectType"></label>  -->
<!-- 								<select name="add_selectType" -->
<!-- 									id="add_TYPE" class="TYPE" class="info-select"> -->
<!-- 									<option value="1">Part</option> -->
<!-- 									<option value="2">Tool</option> -->
<!-- 									<option value="3">PPE</option> -->
<!-- 								</select> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</li> -->
<%-- 				</c:if> --%>
				<c:if test="${UP_CD != null && UP_CD != '' }">
					<li class="sub0"><span>Parent code<span class="red"> *</span></span>
						<div class="registration-write">
							<div class="input-group">
								<label for="name" class="sr-only">Parent code</label>
								<input type="text" placeholder="Parent code" id="add_UP_COMM_NM" name="add_UP_COMM_NM" value="${UP_NM}" readonly>
							</div>
						</div>
					</li>
				</c:if>
				
				<li class="sub4">
					<span>Code<span class="red"> *</span></span>
					<div class="registration-write btn-input-wrap btn-input-double-check">
						<div class="input-group">
							<label for="name" class="sr-only"></label>
							<input type="text" placeholder="Code" id="add_COMM_CD" name="add_COMM_CD"  value="">
						</div>
						<button type="button" onclick="doubleCheck()" class="registration-search-btn">Double Check</button>
						
					</div>
				</li>
				<li class="sub4">
					<span>Name<span class="red"> *</span></span>
					<div class="registration-write">
						<div class="input-group">
							<label for="name" class="sr-only"></label>
							<input type="text" placeholder="Name" id="add_COMM_NM" name="add_COMM_NM" value="">
				
						</div>
						
					</div>
				</li>
<!-- 				<li class="sub2"><span>-</span> -->
<!-- 					<div class="registration-write"> -->
<!-- 						<div class="input-group"> -->
<!-- 							<label for="name" class="sr-only">Name</label> -->
<!-- 							<input type="text" placeholder="PREFIX" id="add_SUF_MAIN_CD" name="add_SUF_MAIN_CD" value=""> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 				</li> -->
				<li class="sub3"><span>Description<span class="red"> *</span></span>
					<div class="registration-write">
						<div class="input-group">
							<label for="name" class="sr-only">Description</label>
							<textarea id="add_DESCRPT"></textarea>
						</div>
					</div>
				</li>
			</ul>
			<div class="footer_table_btn">
<!-- 				<a href="#" class="btn">Cancel</a> -->
				<a onclick="addNewCode()" class="btn ok-btn"><i class="xi-check"></i></a>
			</div>