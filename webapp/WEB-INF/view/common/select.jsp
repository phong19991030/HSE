<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<div>
<a2m:combo id="${DATA.id}" type="${DATA.type}" params="${DATA.params}"  daoName="${DATA.daoName}" cls ="${DATA.cls}"  defaultValue="${DATA.defaultValue}" selected="${DATA.selected}" />
</div>