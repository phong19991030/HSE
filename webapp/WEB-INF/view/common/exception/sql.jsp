<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% String ctxPath = (String)request.getContextPath(); %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>[SQLException]에러</title>
<style type="text/css">
/* 
html 		  {height:100%;min-height:100%;}
*             {font-family:dotum, Arial, Verdana, Helvetica, sans-serif;}
body          {margin:0;padding:0;color:#666;line-height:17px;font-size:12px;background:#eee;}
img           {border:none;vertical-align:top;}
noscript      {position:absolute;z-index:1;width:100%;}
textarea      {font-size:12px;background:#ffffff;border-style:none;padding:10px;} */


#page_wrapper {width:100%;height:100%;min-height:100%;}
#page_header {height:50px;color:#fff;font-weight:bold;background:#787878 url('${ctxPath}/images/err/pattern.png');}
#page_title{height:42px;background: url('${ctxPath}/images/err/icon.png') no-repeat left top;padding-left: 40px;padding-top:13px;}
#page_body {height:100%;min-height:500px;text-align:center;padding:10px;}
</style>
</head>
<body>

<div id="page_wrapper">
	<div id="page_header">
		<div id="page_title">요청을 처리하는 과정에서 문제가 발생했습니다. (java.sql.SQLException)</div>
	</div>
<%-- 	<div id="page_body"><textarea style="width:96%;height:100%;min-height:500px;"></textarea></div> --%>
</div>
</body>
</html>