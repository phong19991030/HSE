<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<div>
<div class="choiceInputContent">
	
	<a2m:choiceInputForm id="${DATA.id}" cls="${DATA.cls}" type="${DATA.type}"
			 codeFieldName="${DATA.codeFieldName}"  codeTargetName="${DATA.id}_CD"
			 textFieldName="${DATA.textFieldName}" textTargetName="${DATA.id}_NM"
			 eventType="${DATA.eventType}" funcname="${DATA.funcname}" params="${DATA.params}"
			 codeView="${DATA.codeView}" />
			 
</div>
</div>