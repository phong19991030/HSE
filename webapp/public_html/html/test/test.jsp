<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
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
	
	<%-- Kendo UI combined JavaScript --%>
	<script src="${ctxPath}/script/kendo/js/kendo.all.min.js"></script>
	<script src="${ctxPath}/script/kendo/js/jszip.min.js"></script>
	<script src="${ctxPath}/script/kendo/js/pako_deflate.min.js"></script>
	<script src="${ctxPath}/script/kendo/js/cultures/kendo.culture.ko-KR.min.js"></script>
	
	<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/util/utils.js" ></script>

<%--   <link href="${ctxPath}/stylesheet/app/gridstack.min.css" rel="stylesheet" type="text/css" media="all"> --%>
<%-- <script src="${ctxPath}/script/js/gridstack.js"></script> --%>
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gridstack@1.1.1/dist/gridstack.min.css" /> -->
<!-- <script src="https://cdn.jsdelivr.net/npm/gridstack@1.1.1/dist/gridstack.all.js"></script> -->

<!--   <link rel="stylesheet" href="demo.css"/> -->




<div class="grid-stack">
  <div class="grid-stack-item">
    <div class="grid-stack-item-content">Item 1</div>
  </div>
  <div class="grid-stack-item" data-gs-width="2">
    <div class="grid-stack-item-content">Item 2 wider</div>
  </div>
</div>

<script type="text/javascript">
  GridStack.init();
</script>