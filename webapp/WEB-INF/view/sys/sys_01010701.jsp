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

function addNewCode() {

		var suf = $('#add_SUF_MAIN_CD').val();
		var fre = $('#add_PRE_MAIN_CD').val();
		var lev = $('#add_LEV_MAIN_CD').val();
		var upCd = $('#add_UP_MAIN_CD').val();
// 		var type = $('#add_TYPE').val();
		var description = $('#add_DESCRPT').val();
		var crud = 'C';
// 		var code = $('#MAIN_CD').val();
		if (validateMainten2()) {
			$.ajax({
						url : CTX + '/sys/sys_0107/addMaintenCode.ajax',
						type : 'POST',
						data : {
							DESCRPT : description,
							CRUD : crud,
							SUFFIX_NM : suf,
							LEV : lev,
							UP_CD : upCd,
							PREFIX_NM : fre
// 							MAINTEN_CD : code,
// 							TYPE: type
						},
						success : function(data) {
							if (data.result == 'true') {
								//alert(crud == 'C' ? '<spring:message code='message.saveSuccess' />'
									//	: '<spring:message code='message.updateSuccess' />');
								alert(_MESSAGE.common.saveSuccess);
								getData();
							    $("#layerPopup").remove();	
							
							} else {
								if (data.msg == "dupl") {
									alert('<spring:message code='sys.sys_0101.dulp' />');
									$('#add_PRE_MAIN_CD').inputWarning(
											'This code already have existed.')
									$('#add_SUF_MAIN_CD').inputWarning(
											'This code already have existed.')

								} else {
									//alert(crud == 'C' ? '<spring:message code='message.saveSuccess' />'
									//		: '<spring:message code='message.updateFailed' />');
									alert(_MESSAGE.common.saveFail);
								}
							}

						},
						error : function(req, status, err) {
							console
									.log(
											'<spring:message code='msg.somethingWrong' />',
											status, err);
						}
					});
		} else {
			alert('<spring:message code='sys.sys_0101.list.alert.invalid' />')
		}
	}

/* input type number 길이 제한  */  
function numberMaxLength(e){
    if(e.value.length > e.maxLength){
        e.value = e.value.slice(0, e.maxLength);
    }
}  
</script>

    <div class="tit-wrap">
				<strong class="heading6">Code registration</strong>

			</div>
			<ul class="registration-write-wrap">
				<input type="hidden"  name="add_UP_MAIN_CD" id="add_UP_MAIN_CD" value="${UP_CD}">
				<input type="hidden"  name="add_LEV_MAIN_CD" id="add_LEV_MAIN_CD" value="${LEV}">
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
						<div class="input-group">
							<label for="name" class="sr-only"></label>
							<input type="text" maxlength="3" placeholder="PREFIX" id="add_PRE_MAIN_CD" name="add_PRE_MAIN_CD"  value="">
							
						</div>
						<div class="input-group">
							<label for="name" class="sr-only"></label>
							<input type="text" placeholder="SUFFIX" id="add_SUF_MAIN_CD" name="add_SUF_MAIN_CD" value="">
				
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
				<a onclick="addNewCode()" class="btn-style btn-style1">Register</a>
			</div>