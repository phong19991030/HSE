<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<!-- Accessibility -->
<a href="#contents" class="skip-to sr-only">본문 바로가기</a>

<header id="header">
	<tiles:insertAttribute name="header" />
</header>
<!--//header-->

<!--gnb-->
<div class="gnb-wrap">
	<tiles:insertAttribute name="menu"/>
</div>
<!--//gnb-->

<!--contents-->
<section id="contents">
	<!--detail-content-->
	<div id="detail-content">
		<tiles:insertAttribute name="body"/>
	</div>
	<!--//detail-content-->
</section>
<!--//contents-->