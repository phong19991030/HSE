<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="/WEB-INF/_include/taglib.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>close window</title>
<!-- locale --> 
<script type="text/javascript" src="${ctxPath}/script/jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${ctxPath}/script/jquery/jquery-ui-1.9.2.custom.js"></script>
<script type="text/javascript">

	function resizing(){
		window.resizeTo(500, 500);
	}
	function selfClose(){
		self.close();
	}
	
	
	
	$(document).ready(function(){
		var parent = opener;
		location.href = '${ctxPath}/common/auth/loginForm'
//		selfClose();
// 		if(parent){
// 			parent.location="${ctxPath}/common/auth/redirectForm"
// 			$('#views_popup').show().siblings().hide()
// // 			selfClose();
// 		}else{
// 			this.location="${ctxPath}/common/auth/redirectForm"
			
// 		}
		
		
	})
</script>

</head>
<body bgcolor="#ffffff" onload="resizing()">
	
</body>
</html>