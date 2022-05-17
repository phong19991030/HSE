<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<% request.setCharacterEncoding("UTF-8"); %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>


<!-- <input type="hidden" id="COMPANY_ID" name="COMPANY_ID" value="${DATA.COMPANY_ID}"></input> -->

<div class="container">

	<!-- 타이틀 -->
	<div class="tit-wrap">
		<h2 class="heading3">
            <span class="txt"><spring:message code="com.com_0302_lable.title" /></span> 
			<!-- <span class="version">V47</span> -->
		</h2>
		<ul class="location">
			<li>Certificate Qualiity</li>
			<li class="bold"><spring:message code="com.com_0302_lable.title" /></li>
		</ul>
	</div>
	<!--//타이틀 -->

    <div id="ROW_LIST">
        <!-- <a href="javascript:;" onclick="dowloadFile()">[Dowload]<span>Hello</span></a> -->
    </div>

	
	
	<!--//mobile pager-->
	
	<!-- 하단 -->
	<div class="footer_table_btn">
		<a id="REGISTER_BTN" href="javascript:void(0);" class="btn-style btn-style1" style="width:100px;margin-left:5px;"><spring:message code="button.register" /></a>
	</div>
	<!-- //하단 -->
</div>
	
<!-- 스크립트 -->	
<script src="${ctxPath}/script/com/com_0302.js?cachebuster="+ new Date().getTime()></script>
<script src="${ctxPath}/script/sys/sys-common.js"></script>
<script src="${ctxPath}/script/sys/sys-element.js"></script>		

<script>
	$(document).ready(function(){
		com0302();		
	});
</script>

	
