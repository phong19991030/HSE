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

 function validatePart2(){

		var suf = $('#add_SUF_PART_CD').val().trim();
		var pre = $('#add_PRE_PART_CD').val()? $('#add_PRE_PART_CD').val().trim(): '';
		var lev = $('#add_LEV_PART_CD').val();
		var desc = $('#add_DESCRPT').val().trim();
		var check = true;
// 		if(!$('#add_UP_PART_NM').val()){
// 			 $('#add_UP_PART_NM').inputWarning('Select parent part code.');
// 			 check = false;
// 	 	}
	 if(lev && lev > 1){
		 if(suf==null||suf==''){
			 $('#add_SUF_PART_CD').inputWarning('"SUFFIX code" is required item.');
			 check = false;
		 }
		
	 }else{
 		if(pre==null||pre==''){
			 
			 $('#add_PRE_PART_CD').inputWarning('"PREFIX code" and "SUFFIX code" are required items.');

			 check = false;
		 }
		 if(suf==null||suf==''){
			 $('#add_SUF_PART_CD').inputWarning('"PREFIX code" and "SUFFIX code" are required items.');
			 check = false;
		 }
	 }
		if(!desc){
			$('#add_DESCRPT').inputWarning('"Description" required item.');
			check = false;
		}
	 return check;
 }


function addNewCode(){
	 	
		var suf = $('#add_SUF_PART_CD').val();
		var fre = $('#add_PRE_PART_CD').val();
		var lev = $('#add_LEV_PART_CD').val();
		var upCd = $('#add_UP_PART_CD').val();
		var code =  $('#add_PART_CD').val();
		var type =  $('#add_TYPE').val();
		var crud = 'C';
		var description = $('#add_DESCRPT').val();
		if(validatePart2()){
			$.ajax({
				  url: CTX+'/sys/sys_0108/addPartCode.ajax',
				  type: 'POST',
				  data:{
					  DESCRPT: description,
					  PART_NM: suf,
					  LEV: lev,
					  UP_CD: upCd,
					  PREFIX_NM: fre,
					  PART_CD: code,
					  CRUD: crud,
					  TYPE: type
				  },
				  success: function(data) {
					  
					  if(data.result == 'true'){
						 // alert('<spring:message code='sys.sys_0101.list.alert.success' />');
						 alert(_MESSAGE.common.saveSuccess);
							getData();
						    $("#layerPopup").remove();	

					  }else{
						  if(data.msg == "dupl"){
							  $('#add_SUF_PART_CD').inputWarning('This code already have existed.')
							  alert('<spring:message code='sys.sys_0101.dulp' />');
							  

						  }else{
							  //alert('<spring:message code='message.saveFailed' />');
							  alert(_MESSAGE.common.saveFail);
						  }
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

</script>

    <div class="tit-wrap">
				<strong class="heading6">Code registration</strong>

			</div>
			<ul class="registration-write-wrap">
				<input type="hidden"  name="add_UP_PART_CD" id="add_UP_PART_CD" value="${UP_CD}">
				<input type="hidden"  name="add_LEV_PART_CD" id="add_LEV_PART_CD" value="${LEV}">
				<c:if test="${UP_CD == null || UP_CD == '' }">
					<li id="add_type" class="sub0">
						<span>Type<span class="red"> *</span></span>
						<div class="registration-write">
							<div class="select-box">
								<label for="selectType"></label> 
								<select name="TYPE"
									id="add_TYPE" class="info-select"  value="${TYPE}" >
									<option value="PART">Part</option>
									<option value="TOOL">Tool</option>
									<option value="PPE">PPE</option>
								</select>
							</div>
						</div>
					</li>
				</c:if>
				<c:if test="${UP_CD != null && UP_CD != '' }">
					<input type="hidden" value="${TYPE}" id="add_TYPE" >
				
					<li class="sub0"><span>Parent code</span>
						<div class="registration-write">
							<div class="input-group">
								<label for="name" class="sr-only">Parent code</label>
								<input type="text" placeholder="Parent code" id="add_UP_NM" name="add_UP_NM" value="${UP_NM}" readonly>
							</div>
						</div>
					</li>
				</c:if>
				
				<li class="sub0">
					<span>Code<span class="red"> *</span></span>
					<div class="registration-write twice-input">
					<c:if test="${LEV == '1' }">
						<div class="input-group">
							<label for="name" class="sr-only"></label>
							<input type="text" placeholder="PREFIX" id="add_PRE_PART_CD" name="add_PRE_PART_CD"  value="">
												</div>
						
					</c:if>
						<div class="input-group">
							<label for="name" class="sr-only"></label>
							<input type="text" placeholder="SUFFIX" id="add_SUF_PART_CD" name="add_SUF_PART_CD" value="">
						</div>
					</div>
				</li>
<!-- 				<li class="sub2"><span>-</span> -->
<!-- 					<div class="registration-write"> -->
<!-- 						<div class="input-group"> -->
<!-- 							<label for="name" class="sr-only">Name</label> -->
<!-- 							<input type="text" placeholder="PREFIX" id="add_SUF_PART_CD" name="add_SUF_PART_CD" value=""> -->
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
				<a onclick="addNewCode()" class="btn-style btn-style1">Register</a>
			</div>