<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript">
$(document).ready(function(){
	location.href= '${ctxPath }/manual/${fileName }'
});

</script>
<div> 
	<h4>매뉴얼</h4>   
	
	<div id="help" style="width:100%;">
<%-- 		<a href= "${ctxPath }/manual/${fileName } " >${fileName } </a> --%>
	</div>
</div>