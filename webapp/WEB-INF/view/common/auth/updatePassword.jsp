<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Content-Script-Type" content="text/javascript" />
<meta http-equiv="Content-Style-Type" content="text/css" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1" />
<title>Reset Password</title>
<!-- stylesheet -->
<link media="screen" href="${ctxPath}/stylesheet/${design}/common.css"
	rel="stylesheet" type="text/css" />
<link media="screen" href="${ctxPath}/stylesheet/${design}/layout.css"
	rel="stylesheet" type="text/css" />
<link rel="stylesheet"
	href="${ctxPath}/stylesheet/${design}/font-awesome/css/font-awesome.min.css"
	type="text/css" />

<!-- html5 IE(8~) -->
<!--[if lt IE 9]>
	<script type="text/javascript" src="${ctxPath}/script/js/html5shiv.js"></script>
	<script type="text/javascript" src="${ctxPath}/script/js/respond.min.js"></script>
<![endif]-->

<!-- jquery -->
<script type="text/javascript"
	src="${ctxPath}/script/jquery/jquery-1.8.3.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script
	src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
<script
	src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/additional-methods.min.js"></script>
<script type="text/javascript"
	src="${ctxPath}/script/a2mFWJs/security/rsa.js"></script>
<script type="text/javascript"
	src="${ctxPath}/script/a2mFWJs/security/jsbn.js"></script>
<script type="text/javascript"
	src="${ctxPath}/script/a2mFWJs/security/prng4.js"></script>
<script type="text/javascript"
	src="${ctxPath}/script/a2mFWJs/security/rng.js"></script>



<style>
#centerpoint {
	width: 1000px;
	overflow: hidden;
	margin: auto;
	margin-top: 100px;
}
table.write_tbl td{
	padding: 5px;
}
.register_background {
	background: #f7f7f7;
	text-align: center;
	padding: 50px;	
}

.inputGrid {
	width: -webkit-fill-available !important;
	height: 30px;
	border: solid 1px #cacaca8a;
	border-radius: 5px;
}

.labelGrid {
	margin: 0 10px !important;
	float: right !important;
}

.error {
	color: red;
}

label.error {
	float: left;
	padding: 10px;
}
label.error.valid{
	display: none!important;
}

/* style all input elements with a required attribute */
input:required {
	border: solid 1px red;
}

/**
 * style input elements that have a required
 * attribute and a focus state
 */
input:required:focus {
	border: 1px solid red;
	outline: none;
}

/**
 * style input elements that have a required
 * attribute and a hover state
 */
input:required:hover {
	opacity: 1;
}
.reset-pass-title{
	font-size: 15px;
	margin-bottom: 20px;
}
.reset-buttons{
	text-align: center;
	padding: 10px 0;
}
.reset-pass-btn{
	min-width: 100px;
	background: #202845;
	color: white;
	border-radius: 5px;
	margin: 10px;
	padding: 15px 20px;
}

</style>

</head>
<body id="error_total">
	<div id="centerpoint">
		<div class="register_background">
			<h2 class="reset-pass-title">Enter your new password.</h2>
			<form id="resetPassForm">
				<input value="${RESET_PASS_TOKEN}" type="hidden" name="RESET_PASS_TOKEN" id="RESET_PASS_TOKEN"/>
				<fieldset>
					<div class="group_content write" style="width: 800px !important;">
						<table class="write_tbl ">
							<colgroup>
								<col style="width: 210px;">
								<col style="width: 650px;">
							</colgroup>
							<tbody>
								<tr>
									<td>
										<label class="labelGrid" for="USER_PW_NEW">
											<spring:message text="New password" />
										</label>
									</td>
									<td>
										<input class="inputGrid" type="password" 
										id="USER_PW_NEW" name="USER_PW_NEW" />
										<span id="title.USER_PW_NEW"></span>
										<span id="error.USER_PW_NEW"></span>
										
									</td>
								</tr>
								
								<tr>
									<td>
										<label class="labelGrid" for="USER_PW_NEW_CONFIRM">
											<spring:message text="Confirm new password" />
										</label>
									</td>
									<td>
										<input class="inputGrid" type="password" 
										id="USER_PW_NEW_CONFIRM" name="USER_PW_NEW_CONFIRM" />
										<span id="title.USER_PW_NEW_CONFIRM"></span>
										<span id="error.USER_PW_NEW_CONFIRM"></span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</fieldset>
			</form>
			<div class="reset-buttons">
				<button id="bt_submit" onclick="doSave();" class="btn reset-pass-btn">Reset Password</button>
			</div>
		</div>
	</div>
	
	<script type="text/javascript">
		jQuery.validator.setDefaults({
			debug : true,
			success : "valid"
		});
		$("#resetPassForm").validate({
			rules : {
				USER_PW_NEW : "required",
				USER_PW_NEW_CONFIRM : "required"
			},
			messages : {
				USER_PW_NEW : "New password is required!",
				USER_PW_NEW_CONFIRM : "New password confirm is required!"
			},
			submitHandler : function(form) {
				return false;
			}
		});
		
		function checkPassword(form){
			var newPass = form.find('input#USER_PW_NEW').val();
			var newPassConfirm = form.find('input#USER_PW_NEW_CONFIRM').val();
			if(newPass.length < 8)
			if(!newPass){
				alert("New password is required!");
				return false;
			}
			if(newPass.length < 8){
			    alert("New password is required!");
				return false;
			}

			if(newPass === newPassConfirm) {
				return true;
			}
			alert("Password is not match!");
			return false;
		}
		
		function doSave() {
			var form = $("#resetPassForm");
			
			if (checkPassword(form) && $("#resetPassForm").valid()) {
				doSubmit(form);
			} else {
				return false;
			};
		};

		
		function doSubmit(form) {
			var CTX = "<%=request.getContextPath()%>";
			var values = new Object();
			form.find('input').not(':input[type=radio]').each(function() {
				values[$(this).attr('id')] = $(this).val();
			});
			 $.ajax({
				url : CTX + '/common/auth/resetPassword/updatePassword.ajax',
				type : "POST",
				data : values,
				success : function(data, textStatus, jqXHR) {
					console.log(data);
					if (data == "1") {
						window.alert("Success!");
						window.location.href = CTX + '/common/auth/loginForm';
						return;
					}
					if (data == "2") {
						window.alert("New password is required!");
						return;
					}
					if (data == "3") {
						window.alert("Password is not match!");
						return;
					}
					if (data == "4") {
						window.alert("Token is not be empty!");
						return;
					}

					if (data == "5") {
						window.alert("Token is not correct!");
						return;
					}

					if (data == "6") {
						window.alert("Token has been expired!");
						return;
					}

					if (data == "7" || data == "8") {
						window.alert("Token is unavailable!");
						return;
					}
					
					window.alert("Error!");
					return;
				},
				complete : function() {

				},
				error : function() {
					alert("Fail");
					return false;
				}
			});

		}
	
	</script>
	
</body>
</html>