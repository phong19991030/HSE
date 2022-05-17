<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<!-- 첨부파일 스크립트 -->
<!-- <link	rel="stylesheet"	type="text/css"	href="/css/jquery-ui-1.9.2.custom.min.css"> -->



<script type="text/javascript">

/* 
 * "건의사항 등록란"
 * <사용자관리 - comm_010101.jsp 화면>
 * 폼태그
 */
 
function checkEnter(){
	if(event.keyCode == 13){
		event.preventDefault();
		saveData();
	}
}

// 저장을 위한 ajax
var saveAjaxPcm2 = function(form, callback) {
	
	var mod = $('#RSAModulus').val();
	var exp = $('#RSAExponent').val();
	if(!mod || !exp){
		alert('Fail mod & exp!')
	}
	var rsa = new RSAKey();
	rsa.setPublic(mod,exp);
    
	// 제목 입력 확인
    if($('#PASS').val() == null || $('#PASS').val() == undefined || $('#PASS').val() == "" ){
	  alert("비밀번호를 입력해주세요");
	  return false;
    }
    else if($("#PASS").val().length<8)
    {
    	alert("비밀번호는 8자리 이상이어야 합니다.");
  		return false;
    }
    
    // 내용 입력 확인
    if($('#PASS_CONFIRM').val() == null || $('#PASS_CONFIRM').val() == undefined || $('#PASS_CONFIRM').val() == "" ){
	  alert("비밀번호 확인을 입력해주세요");
	  return false;
    }
    
    if($('#PASS_CONFIRM').val() != $('#PASS').val()){
  	  alert("입력한 비밀번호가 같지 않습니다. 다시 입력해주세요.");
  	  return false;
    }
    
	uid= rsa.encrypt($('#USER_ID').val());
	upw= rsa.encrypt($('#PASS').val());
	$('input[name="USER_ID"]').val(uid);
	$('input[name="USER_PW_2"]').val(upw);
    
	var message = {
		'QUESTION' : {
			'MESSAGE' : '저장하시겠습니까?'
		},
		'FAIL' : {
			'MESSAGE' : '저장실패하였습니다.'
		},
		'SUCCESS' : {
			'MESSAGE' : '저장성공했습니다.'
		}
	}

	if ($(form).data('msg')) {
		message = getMessage($(form).data('msg'));
	}
	
	$(form).expressionEngine('detach');
	if (confirm(message.QUESTION.MESSAGE)) {
		$(form).ajaxSubmit({
			success : function(data, textStatus, jqXHR) {
				if (data == "false") {
				    alert(message.FAIL.MESSAGE);
				} else {	
					alert(message.SUCCESS.MESSAGE);
					document.location.href="${ctxPath}/common/auth/logout";
				    closeDialogPopup($(form));
// 				    saveCallbackFunc(data);
				}
			},
			complete : function() {
				return true;
			},
			error : function() {
				alert(message.FAIL.MESSAGE);
				return false;
			}
		});
	}
}

var	submit1	= function(){
	$('#saveForm_0101').submit();
};

//제목과 내용을 입력했는지를 확인한다
var saveData = function() {
	
	$('#saveForm_0101').attr('action',"${ctxPath}/common/auth/resetPassword/changePasswordFirstLogin.ajax");		

	$('#saveForm_0101').attr('data-func',"saveAjaxPcm2");
	submit1();
}

</script>

<!-- 등록 폼 -->
<form method="POST" id="saveForm_0101">
	<fieldset>
		<legend>건의사항</legend>
		<div class="group">
			<div class="group_title">
				<strong class="g_title">작성</strong>
				<span class="g_title_tip"><em class="aster"><i class="icon-ok"></i></em> 는 필수항목 입니다.</span>
				<div class="g_title_btn">
					<span class="btn btm_save ac_click sbtn bts_save" data-func="saveData"></span>
				</div>
			</div>
			<div class="group_content write">
				<!-- 1단, 2단 -->
				<table class="write_tbl">
					<caption>정보를 입력 할 수 있습니다.</caption>
					<colgroup>
						<col style="width:140px;" />
						<col style="width:auto;" />
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">
								<label for="PASS"><em class="aster"><i class="icon-ok"></i><span class="blind">필수항목</span></em>비밀번호</label>
							</th>
							<td><input type="password" id="PASS"  value=""/></td>
						</tr>
						<tr>
							<th scope="row">
								<label for="PASS_CONFIRM"><em class="aster"><i class="icon-ok"></i><span class="blind">필수항목</span></em>비밀번호 확인</label>
							</th>
							<td>
								<input type="password" id="PASS_CONFIRM" name="PASS_CONFIRM" value="" />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</fieldset>
	<input  type="hidden"  name="USER_ID" value=""/>
	
	<input  type="hidden"  id="USER_ID" value="${USER_ID}"/>
	
	<input type="hidden"  name="USER_PW_2" value=""/>
	<input type="hidden" id="RSAModulus" name="modulus" value="${RSAModulus }"/>
	<input type="hidden" id="RSAExponent" name="exponent" value="${RSAExponent }"/>
</form>
<!-- //bbs write -->
<script>
$(function() {
	// set value for editor
});
</script>