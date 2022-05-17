<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<%-- 공통 css  --%>
<html>

<link media="screen" href="${ctxPath}/stylesheet/${extDesign}/common.css" rel="stylesheet" type="text/css" />
<%-- <link href="${ctxPath}/stylesheet/${extDesign}/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" /> --%>

<%-- KendoUI --%>
<%-- Common Kendo UI CSS for web and dataviz widgets --%>
<%-- <link href="${ctxPath}/stylesheet/kendo/styles/kendo.common.css" rel="stylesheet"  type="text/css"/> --%>
<%-- (optional) Kendo UI web widgets' RTL CSS, include only in right-to-left applications --%>
<%-- <link href="${ctxPath}/stylesheet/kendo/styles/kendo.rtl.min.css" rel="stylesheet" type="text/css" /> --%>
<%-- Default Kendo UI theme CSS for web and dataviz widgets --%>
<%-- <link href="${ctxPath}/stylesheet/kendo/styles/kendo.default.min.css" rel="stylesheet" /> --%>


<%-- css 그룹  --%>
<link media="screen" href="${ctxPath}/stylesheet/${extDesign}/main.api.css" rel="stylesheet" type="text/css" />


<body>
<tiles:insertAttribute name="HTML.BODY" />
</body>
</html>