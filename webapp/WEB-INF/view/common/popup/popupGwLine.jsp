<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script type="text/javascript">
var popupDrawgrid = function(){

	$('#popupGrid1').setViewGrid({
		id:'popupGrid1',
		type:'view',
		url:CTX+'/common/popup/getListGwLine.ajax', 
		param : {'APPRID' : '${param.APPRID}'} ,
// 		data:mydata2,  
		gridOptions : {sortable:true, caption: '결재라인' , setDataBinderGrid:false, loadonce:true},
		colModels : [	             
     	   	{name:'기안문서ID', id :'APPRID', hidden:true},
     	    {name:'원문서ID', id :'ID', hidden:true},
     	    {name:'접수문서인경우 원문서ID, 기안문은 00000000000000000000으로 표시', id :'ORGID', hidden:true},
     	    {name:'결재방법값', id :'ATYPE', hidden:true},
     	    {name:'직위명', id :'POSNAME', width:150},
     		{name:'성명', id :'NAME', width:90},
     		{name:'문서도착일자', id :'ARIVDATE', width:150},
     		{name:'문서결재일자', id :'SDATE', width:150},
     		{name:'결재방법', id :'TYPE', width:80},
     		{name:'결재순번', id :'SEQ', width:90, hidden:true},
     		{name:'결재여부', id :'COMP', width:80},
     		{name:'기안/접수', id :'STATUS', width:80}

   	   	],
		defaultOptions:{ width:120, sortable:true},
		colspan:[],
		rowspan:[], 
		colGroup:[], 
		events:[
			{
				event:'${param.eventType}', funcName:'${param.funcname}', cls:'${param.cls}',
				target:'${param.target}', type:'${param.type}', callback:'${param.callback}'
			}
		]
	});
	return false;
}; 

$(document).ready(function(){

	/* 검색버튼을 클릭하기전까지 빈그리드상태처리.. 
		1. a2m:searchbox script="popupDrawgrid" initenable="false"
		2. 그리드 draw function 호출 (배열형태의 빈데이터 넘김) : popupDrawgrid('',[]);
		3. 그리드에 빈데이터 넘김 : localData:mydata2 
	*/
	popupDrawgrid();

});
</script>


<div>
	<div id="popupGrid1" style="width:100%;"></div>
	
</div>
