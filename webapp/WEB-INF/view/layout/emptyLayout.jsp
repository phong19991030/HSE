<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<style type="text/css">
/* 	#wrap{min-width:auto; height:100%;} */
</style>
<tiles:insertAttribute name="HTML.BODY" />
<script type="text/javascript">
	
	$(document).ready(function(){
	
		var loadingBarShow = function(){ 
			$('#loading').show()
		}
		var loadingBarHide = function(){
			$('#loading').hide() 
		}
	});
</script>
