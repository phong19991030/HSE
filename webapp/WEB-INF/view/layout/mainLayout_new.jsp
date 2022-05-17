<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*" errorPage=""%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

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
				<tiles:insertAttribute name="body" />
			<!--//detail-content-->
		</section>
		<!--//contents-->
	</div>
</body>
