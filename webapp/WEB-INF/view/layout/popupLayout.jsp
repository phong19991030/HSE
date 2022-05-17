<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<!-- 
	*****************************************************************
	**** 기본 Layout과 같은 속성을 사용하기 때문에 일단 여기에 선언함 
	*****************************************************************
-->
<style type="text/css">
	#wrap{min-width:auto; height:100%;}
</style>
<c:if test="${not empty param.title }" >
	<div class="winpopup_title">
		<h1>${param.title}</h1>
	</div>
</c:if> 
<div class="winpopup_content">
	<div class="wp_cnt">
		<tiles:insertAttribute name="body" />
	</div>
</div>
<script type="text/javascript">
	$(document).ready(function() {
		// set datepicker format
		$.datepicker.setDefaults({
			dateFormat: 'yy-mm-dd'
		});
	});
</script>