<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<%
	request.setCharacterEncoding("UTF-8");
%>
<script>
var CTX = "<%=request.getContextPath()%>"; 
var agt = navigator.userAgent.toLowerCase();
var browserChk = true;
if(agt.indexOf("chrome") != -1){
}else if(agt.indexOf("msie") != -1){
	 if(agt.indexOf("msie 9.0") != -1){
		 browserChk = false
//		 alert('ie 9으로 접속하셨습니다. HTML5 지원이 되지 않는 브라우저 입니다. ');
//		 console.log('ie 9.0')
	 }else if(agt.indexOf("msie 8.0") != -1){
		 browserChk = false
//		 console.log('ie 8.0')
		 alert('ie 8으로 접속하셨습니다. 정상적으로 동작하지 않을 수 있습니다. ');
	 }else if(agt.indexOf("msie 7.0") != -1){
		 browserChk = false
		 alert('ie 7으로 접속하셨습니다. 이 브라우저는 지원하지 않습니다. ');
//		 console.log('ie 7.0')
	 }
}
var grant =${not empty grantjson ? grantjson:'""'};
var CID = "${cid}"; 

</script>


<body class="gnb-active">
	<div id="wrap">

		<!-- Accessibility -->
		<a href="#contents" class="skip-to sr-only">본문 바로가기</a>

		<!-- header -->
		<header id="header">
			<tiles:insertAttribute name="header" />
		</header>
		<!-- //header -->
		<!--gnb-->
		<div class="gnb-wrap">
			<nav id="gnb">
				<tiles:insertAttribute name="menu" />
			</nav>
		</div>
		<!--//gnb-->


		<!--contents-->
		<section id="contents">
			<!--detail-content-->
			<div id="detail-content">
				<tiles:insertAttribute name="body" />
			</div>
			<!--//detail-content-->
		</section>
		<!--//contents-->
	</div>
</body>
