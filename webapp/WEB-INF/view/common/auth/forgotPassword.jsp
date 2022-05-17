<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="cache-control" content="max-age=0" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><spring:message code="common.auth.forgotPassword.title"/></title>
	<style type="text/css">
		.flt {
			float: left;
		}
		
		.frt {
			float: right;
		}
		
		.clearfix {
			clear: both;
		}
	</style>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/stylesheet/stnd/login.css">
    <script type="text/javascript" src="${pageContext.request.contextPath}/script/jquery/jquery-1.8.3.min.js" ></script>
</head>
<body>
	<div id="login_logo"><img src="${pageContext.request.contextPath}/images/login/login_logo.png" alt=""></div>
	<div class="login-tit">WT O&amp;M PLATFORM SYSTEM</div>
	<div>
		<c:if test="${not empty errorCode}"> 
			<span class="error" style="display: inline-block; text-align: center; width: 100%; color: orange;">
				*<spring:message code="${errorCode}" arguments="${errorArguments}"/>
			</span>
		</c:if>
		<c:if test="${not empty successCode}"> 
			<span style="display: inline-block; text-align: center; width: 100%; color: lightgreen;">
				<spring:message code="${successCode}"/>
			</span>
		</c:if>
		<div style="text-align: center;">
			<a href="${pageContext.request.contextPath}/common/auth/loginForm" style="color: #FFF; text-decoration: none;">Login Page</a>
		</div>
	</div>
	<div class="login_area">
		<c:if test="${mode ne 'change'}">
			<div id="signin">
				<form name="frm" method="post" action="${pageContext.request.contextPath}/common/auth/forgotPassword">
					<div class="form-title"><spring:message code="common.auth.forgotPassword.title"/></div>
					<div class="input-field">
						<input type="email" name="EMAIL" id="EMAIL" autocomplete="off"/>
						<i class="material-icons"><img src="${pageContext.request.contextPath}/images/login/038-people-1.png" alt=""></i>
						<label for="EMAIL">Email <spring:message code="common.auth.forgotPassword.email"/></label>
					</div>
					<div class="input-field">
						<input type="text" name="USER_ID" id="USER_ID"/>
						<i class="material-icons"><img src="${pageContext.request.contextPath}/images/login/067-security.png" alt=""></i>
						<label for="USER_ID">User ID <spring:message code="common.auth.forgotPassword.userId"/></label>
					</div>
					<input type="hidden" name="proceed" value="true">
					<button type="submit" class="login"><spring:message code="common.auth.forgotPassword.sendRequest"/></button>
					<div class="check">
						<i class="material-icons"><spring:message code="common.auth.loginForm.loadingText"/></i>
					</div>
				</form>
			</div>
		</c:if>
		<c:if test="${mode eq 'change'}">
			<div id="signin">
				<form name="frm" method="post" action="${pageContext.request.contextPath}/common/auth/forgotPassword?mode=change">
					<div class="form-title"><spring:message code="common.auth.forgotPassword.changeYourPassword"/></div>
					<div class="input-field">
						<input type="password" name="NEW_PASSWORD" id="NEW_PASSWORD" autocomplete="off"/>
						<i class="material-icons"><img src="${pageContext.request.contextPath}/images/login/067-security.png" alt=""></i>
						<label for="NEW_PASSWORD"><spring:message code="common.auth.forgotPassword.newPassword"/></label>
					</div>
					<div class="input-field">
						<input type="password" name="CONFIRM_NEW_PASSWORD" id="CONFIRM_NEW_PASSWORD"/>
						<i class="material-icons"><img src="${pageContext.request.contextPath}/images/login/067-security.png" alt=""></i>
						<label for="CONFIRM_NEW_PASSWORD"><spring:message code="common.auth.forgotPassword.confirmNewPassword"/></label>
					</div>
					<input type="hidden" name="data" value="${ecryptData}">
					<input type="hidden" name="proceed" value="true">
					<button type="submit" class="login"><spring:message code="common.auth.forgotPassword.changePassword"/></button>
					<div class="check">
						<i class="material-icons"><spring:message code="common.auth.loginForm.loadingText"/></i>
					</div>
				</form>
			</div>
		</c:if>
	</div>
	<script type="text/javascript">
		$(document).ready(function() {
			var data = getParameterByName('data', window.location.href);
			if (data && data.length) {
				$('input[name=data]').val(data).trigger('change');
			}
			
			$("input").on('focusout', function() {
				if ($(this).val()) {
					$(this).addClass('not-empty');
				} else {
					$(this).removeClass('not-empty');
				}
			});

			$(".login").on('click', function(){
				$(this).animate({
					fontSize : 0
				}, 300, function(){
					$(".check").addClass('in');
				});
			});
		});
		
		function getParameterByName(name, url) {
		    if (!url) url = window.location.href;
		    name = name.replace(/[\[\]]/g, '\\$&');
		    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		        results = regex.exec(url);
		    if (!results) return null;
		    if (!results[2]) return '';
		    return decodeURIComponent(results[2].replace(/\+/g, ' '));
		}
	</script>
</body>
</html>