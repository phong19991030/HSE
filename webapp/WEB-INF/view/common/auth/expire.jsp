<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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

<title>Login</title>

<!-- stylesheet -->
<link media="screen" href="${ctxPath}/stylesheet/${design}/common.css" rel="stylesheet" type="text/css" />
<link media="screen" href="${ctxPath}/stylesheet/${design}/layout.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="${ctxPath}/stylesheet/${design}/font-awesome/css/font-awesome.min.css" type="text/css" />

<!-- html5 IE(8~) -->
<!--[if lt IE 9]>
	<script type="text/javascript" src="${ctxPath}/script/js/html5shiv.js"></script>
	<script type="text/javascript" src="${ctxPath}/script/js/respond.min.js"></script>
<![endif]-->

<!-- jquery -->
<script type="text/javascript" src="${ctxPath}/script/jquery/jquery-1.8.3.min.js"></script>

<script type="text/javascript">
	function resizing(){
		window.resizeTo(500, 500);
	}
	function selfClose(){
		self.close();
	}
	$(document).ready(function(){
		var parent = opener;
		if(parent){
			$('#views_popup').show().siblings().hide();
		}
	});
	
	/* 중앙정렬 */
	$(document).ready(function(){
		location.href = '${ctxPath}/common/auth/loginForm'
		/*
		var wrap = $("#error_wrap");
		wrap.css("padding-top", (($("#error_total").outerHeight() / 2) - wrap.outerHeight() / 2) + "px");
		
// 		 반응형일경우 쉬운 제어를 위해 추가 
		$(window).on("resize", function(){
			wrap.css("padding-top", (($("#error_total").outerHeight() / 2) - wrap.outerHeight() / 2) + "px");
		});
		*/
	});
</script>
</head>
<body id="error_total">
<!-- <article id="error_wrap">  -->
<!-- 	<div class="error_content" id="views_parent"> -->
<!-- 		<div class="error"></div> -->
<!-- 		<div class="message"> -->
<!-- 			<em>잘못된 접근</em>이거나<br /><em>세션이 만료</em>되었습니다. -->
<!-- 		</div> -->
<!-- 		<div class="btn_group"> -->
<!-- 			<button type="button" class="btn btg_white" onclick="selfClose()">Close</button> -->
<%-- 			<a class="btn btg_orange" href="${ctxPath}/common/auth/loginForm" >Login <i class="icon-angle-right"></i></a> --%>
<!-- 		</div> -->
<!-- 	</div> -->
<!-- </article> -->
</body>
</html>