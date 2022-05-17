<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<%
	String lastpath="";
	
	if (request.getParameterValues("path")!=null)
	{
		String lpath[]	= request.getParameterValues("path");
		
		for (int i=0; i<lpath.length; i++)
		{
			if (i==(lpath.length-1))
			{
				lastpath=lpath[i];
			}
		}
	}
%>

<!DOCTYPE html>
<html lang="KO-KR">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <title>wind Turbine Platform</title>
  <meta name="robots" content="index,follow">
  <meta name="keywords" content="WT, Wind, Turbine, Platform">
  <meta name="description" content="">
  <meta name="copyright" content="Copyright 2020 © AtwoM. ALL Rights Reserved">
  <link media="screen" href="${ctxPath}/stylesheet/stnd/jquery-ui-1.9.2.custom.css" rel="stylesheet" type="text/css" /> 
  <link href="${ctxPath}/stylesheet/common/jquery.mCustomScrollbar.min.css" rel="stylesheet" type="text/css" media="all">
    <link href="${ctxPath}/stylesheet/common/common.css" rel="stylesheet" type="text/css" media="all">
  <link href="${ctxPath}/stylesheet/common/layout.css" rel="stylesheet" type="text/css" media="all">
  <link href="${ctxPath}/stylesheet/common/sub.css" rel="stylesheet" type="text/css" media="all">
  <style>
	pre{
		background: #e8e8e8;
	}
</style>
  	<script>
  	var CTX = "<%=request.getContextPath()%>"; 

  	</script>
	<!-- Original -->
	<script type="text/javascript" src="${ctxPath}/script/lib/jquery-2.2.4.min.js" ></script>
	<script type="text/javascript" src="${ctxPath}/script/jquery/jquery-ui-1.9.2.custom.js" ></script>
	<script type="text/javascript" src="${ctxPath}/script/jquery/perfect-scrollbar.jquery.min.js" ></script>
	<%-- <script type="text/javascript" src="${ctxPath}/script/jquery/jquery-ui-1.9.2.custom.js" ></script> --%>
	<script type="text/javascript" src="${ctxPath}/script/jquery/perfect-scrollbar.jquery.min.js" ></script>  
	<script type="text/javascript" src="${ctxPath}/script/lib/jquery.mCustinScrollbar.concat.min.js"></script>
	<script type="text/javascript" src="${ctxPath}/script/lib/easypiechart.js"></script>
	<script type="text/javascript" src="${ctxPath}/script/lib/jquery.bxslider.min.js"></script>
	<script type="text/javascript" src="${ctxPath}/script/common/common.js"></script>
	<script type="text/javascript" src="${ctxPath}/script/common/layout.js"></script>
	<script type="text/javascript" src="${ctxPath}/script/common/sub.js"></script>
	<script src="${ctxPath}/script/common/cookie.js"></script>
	

  <!--[if lt IE 9]>
 <script src="/_res/jquery/html5shiv.js"></script>
 <script src="/_res/jquery/respond.1.4.2.min.js"></script>
<![endif]-->
</head>

<body class="gnb-active">
<div id="wrap">
	<%@ include file="header.jsp" %>
	
	<!--contents-->
    <section id="contents">
      <!--detail-content-->
      <div id="detail-content">