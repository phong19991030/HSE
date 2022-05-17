<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<!DOCTYPE html>
<html lang="KO-KR">

<head>
<meta charset="UTF-8">
<title>HSE 운영지원시스템</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="viewport" content="initial-scale=1.0,minimum-scale=1.0,maximum-scale=1,width=device-width" />
<meta name="copyright" content="Copyright 2022 © AtwoM. ALL Rights Reserved HSE 운영지원시스템" />

<link rel="shortcut icon" href="${ctxPath}/img_new/common/favicon.png" type="image/x-icon" />
<link rel="icon" href="${ctxPath}/img_new/common/favicon.png" type="image/x-icon" /> 

<%-- <link href="${ctxPath}/stylesheet/common/common.css" rel="stylesheet" type="text/css" media="all">
<link href="${ctxPath}/stylesheet/common/layout.css" rel="stylesheet" type="text/css" media="all">
<link href="${ctxPath}/stylesheet/common/sub.css" rel="stylesheet" type="text/css" media="all">
<link href="${ctxPath}/stylesheet/common/jquery.mCustomScrollbar.min.css" rel="stylesheet" type="text/css" media="all">

<link rel="stylesheet" href="${pageContext.request.contextPath}/stylesheet/stnd/login.css">

<script type="text/javascript" src="${pageContext.request.contextPath}/script/jquery/jquery-1.8.3.min.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/common/common.js"></script>
--%>

<script type="text/javascript" src="${pageContext.request.contextPath}/script/a2mFWJs/security/rsa.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/a2mFWJs/security/jsbn.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/a2mFWJs/security/prng4.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/script/a2mFWJs/security/rng.js"></script>


<script type="text/javascript" src="${ctxPath}/script/fullcalendar/lib/moment.min.js"></script>
<script type="text/javascript" src="${ctxPath}/script/fullcalendar/lib/moment-timezone.min.js"></script> 

<script type="text/javascript" src="${ctxPath}/script_new/lib/jquery-3.6.0.min.js" ></script>
<script type="text/javascript" src="${ctxPath}/script_new/common/common.js" ></script> 

<link href="${ctxPath}/stylesheet/common_new/reset.css" rel="stylesheet" type="text/css" media="all">
<link href="${ctxPath}/stylesheet/common_new/login.css" rel="stylesheet" type="text/css" media="all">

</head>

<!-- login form  -->
<form name="frm" method="post" action="${pageContext.request.contextPath}/common/auth/login" onsubmit="return encrypt()">
	<input type="hidden" id="RSAModulus" name="modulus" value="${RSAModulus }" /> 
	<input type="hidden" id="RSAExponent" name="exponent" value="${RSAExponent }" /> 
	<input type="hidden" id="USER_ID" name="USER_ID" value="" />
	<input type="hidden" id="USER_PW" name="USER_PW" />
	<input type="hidden" id="CLIENT_ACCESS_INFO" name="CLIENT_ACCESS_INFO" />
</form>

<body >
	<%-- <div id="wrap">
		<!--contents-->
		<section id="contents">
			<!--detail-content-->
			<div id="detail-content" class="login">
				<div class="login-write-wrap">
					<span class="error" style="display: inline-block; text-align: center; width: 100%; color: #cf132c;">
						<!-- login 실패 message -->
						<c:if test="${not empty errCode }"> 
							* <spring:message code="${errCode}" arguments="${fail_cnt}" ></spring:message>
						</c:if>
					</span>
					<ul>
						<li>
							<strong> 
								<label for="id">ID</label>
							</strong>
							<div class="input-group">
								<label for="id" class="sr-only">ID</label>
								<input type="text" name="input" placeholder="Enter your ID" id="id" maxlength="15">
							</div>
						</li>
						<li>
							<strong> 
								<label for="Password">Password</label>
							</strong>
							<div class="input-group">
								<label for="Password" class="sr-only">Password</label>
								<input type="password" placeholder="Enter your password"  name="Password" id="pw">
							</div>
						</li>
					</ul>
					<div class="login-btn-wrap">
						<div class="checkbox-radio-custom">
							<input type="checkbox" class="checkbox" id="check"> 
							<label for="check">Remember Me</label>
						</div>
						<button type="submit" class="submit_btn">
							<span>Sign In</span>
						</button>
							
					</div>
				</div>
				<footer id="footer">
					<div class="copyright">
						2021 &copy; <strong>AtwoM</strong> All Right Reserved byWind v1.0
					</div>
				</footer>
			</div>
			
		</section>
	</div> --%>
	<main>
   		<!-- login -->
	    <div class="login">
	      <h1 class="title">
	        <span class="txt1">HSE</span><span class="txt2">운영지원시스템</span><span class="txt3">로그인</span>
	      </h1>
	      <span class="error" style="display: inline-block; text-align: center; width: 100%; color: #cf132c;">
				<!-- login 실패 message -->
				<c:if test="${not empty errCode }"> 
					* <spring:message code="${errCode}" arguments="${fail_cnt}" ></spring:message>
				</c:if>
			</span>
	
	      <div class="input-group id">
	        <input type="text" id="id" placeholder="아이디" required value="hseAdmin">
	        <label for="id">접속아이디</label>
	        <span class="icon"></span>
	      </div>
	      <div class="input-group pw">
	        <input type="password" name="password" id="pw" placeholder="비밀번호" required value="123456a@">
	        <label for="password">비밀번호</label>
	        <span class="icon"></span>
	      </div>
	      <button class="submit" class="submit_btn" onclick="submitBtnFunc()">로그인</button>
	      <div class="remember-me">
	        <input type="checkbox" name="checkbox" id="check">
	        <label for="check">계정 기억하기</label>
	      </div>
	    </div>
	    
	
	    <!-- footer -->
	    <footer>
	      <p>Copyright 2022 WINDETECT. All rights reserved.</p>
	    </footer>
	</main>
	<script>
		$(document).ready(function() {
			
	        var data = {};
	        data.timezone = 'Asia/Seoul';
			data.offset = moment.tz(data.timezone).format('Z');
			$('#CLIENT_ACCESS_INFO').val(JSON.stringify(data).toString());
			
			var $user = $('input#id');
			var $pass = $('input#pw');
			if ($user.val()) {
				$user.addClass('not-empty');
			}
			
			if ($pass.val()) {
				$pass.addClass('not-empty');
			}
			
			var stored = localStorage['id'];
			if (stored){
				$user.val(stored);
				$('#check').prop('checked', true);
			}
			
			$("input").on('focusout', function() {
				if ($(this).val()) {
					$(this).addClass('not-empty');
				} else {
					$(this).removeClass('not-empty');
				}
			});

		});
		
		function submitBtnFunc(){
			if(encrypt()){
				$('form[name="frm"]').submit();
			}
		}
					
		function encrypt() {
			var uid = $('#id').val(); 
			var upw = $('#pw').val();
			if (uid && upw) {
				
				try{
					var remember = $('#check').prop('checked');
					if(remember){
							localStorage['id'] = $('#id').val();
					}else{
						localStorage['id'] = '';
					}
				}catch(e){
					
				}
				
				var rsa = new RSAKey();
				rsa.setPublic($('#RSAModulus').val(),$('#RSAExponent').val());
				
				uid= rsa.encrypt(uid);
				upw= rsa.encrypt(upw);
				$('#USER_ID').val(uid).trigger('change');
				$('#USER_PW').val(upw).trigger('change');
				return true;
			} else {
				alert('<spring:message code='common.login.IDPW' />');
				return false;
			}
		}
		
		$(document).on("keypress", function(e) {
			if (e.which == 13) {
				submitBtnFunc();
				//$(".submit_btn").click();
			}
		});
	</script>
</body>

</html>
