<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<style type="text/css">
/* 	#wrap{min-width:auto; height:100%;} */
</style>

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




<tiles:insertAttribute name="HTML.BODY" />

<a href="#none" class="layer-close">
	<span class="sr-only">close layer popup</span>
	<i class="xi-close"></i>
</a>
