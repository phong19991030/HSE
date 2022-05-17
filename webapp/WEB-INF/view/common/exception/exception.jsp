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

<title>Exception</title>

<!-- stylesheet -->
<link media="screen" href="${ctxPath}/stylesheet/stnd/common.css" rel="stylesheet" type="text/css" />
<link media="screen" href="${ctxPath}/stylesheet/stnd/layout.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="${ctxPath}/stylesheet/stnd/font-awesome/css/font-awesome.min.css" type="text/css" />

<!-- html5 IE(8~) -->
<!--[if lt IE 9]>
	<script type="text/javascript" src="/script/js/html5shiv.js"></script>
	<script type="text/javascript" src="/script/js/respond.min.js"></script>
<![endif]-->

<!-- jquery -->
<script type="text/javascript" src="/script/jquery/jquery-1.8.3.min.js"></script>

<script type="text/javascript">
	$(".bt_back").click(function(){
		parent.history.back();
		return false;
	});
	/* 중앙정렬 */
	$(document).ready(function(){
		var wrap = $("#error_wrap");
		wrap.css("margin-top", ($("#error_total").outerHeight() / 2) - wrap.outerHeight() / 2 + "px");
		
		/* 반응형일경우 쉬운 제어를 위해 추가 */
		$(window).on("resize", function(){
			wrap.css("margin-top", ($("#error_total").outerHeight() / 2) - wrap.outerHeight() / 2 + "px");
		});
	});
</script>
</head>
<body id="error_total">
	<article id="error_wrap"> 
		<div class="error"></div>
		<div class="error_content">
			<div class="message">
				요청을 처리하는 과정에서<br /><em>문제가 발생</em>했습니다.<br />
				
			</div>
			<div class="btn_group">
				<button type="button" class="btn btg_white" onclick="selfClose()">Close</button>
				<a class="btn btg_orange bt_back" href="javascript:history.back()" ><i class="icon-angle-left"></i> Back</a>
			</div>
		</div> 
	</article>
</body>
</html>