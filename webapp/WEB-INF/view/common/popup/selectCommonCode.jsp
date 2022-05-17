<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript">
var code = '${CODE}';
/* Maintance code */
var drawgrid_common = function(formId,data){
	$('#gridCommon').setViewGrid({
		id:'gridCommon',
		type:'tree',
		seq: true,
		displayState : false ,	
		pinHeader : false, 			
		url:CTX+'/common/popup/popupCommonCode/getDataList.ajax?CODE='+code,
		param : formId,  
		localData: data,  
		modelName : 'RESULTLIST',
		gridOptions : {
			caption: '검색결과',
			loadonce:true,
			rownumber:false,
			height: 520
		},
		colModels : [
  	   		{name:'코드명', id :'NAME', align:'left'},
  	   		{name:'코드', id :'CODE'},  
  	 		{name:'부모코드' ,id :'UP_CD', hidden:true},
  	 		{name:'레벨' ,id :'LEV', hidden:true}
  	   	],
		defaultOptions:{ align:'center'}, 
	 	treeview: {
			viewField:'NAME', 
			levField:'LEV', 		
			codeField:'CODE', 			
			pcodeField:'UP_CD'	
		},
		events:[{event:'${param.eventType}',funcName:'${param.funcname}',target:'${param.target}',type:'${param.type}'}], 
		btn:[ 
			/* {button:'add', func:'addRootMainten', 'classes':'', label:'추가'}, */
		]		
	});
	return false;
};	
//"필수적용사항"
//*********폼 다이얼로그 & 팝업 (폼에서 다이얼로그 & 팝업 뛰운 경우)
//그리드의 데이터를 모두 가지고 넘어가야할 경우
//1. 다이얼로그
function onSelectAlldepartdialog(rowid, iRow, iCol, rowData, target,callback, obj){
	onSelectAll(rowid, iRow, iCol, rowData, target,callback, obj);
}

//2. 팝업
function onSelectAlldepartpopup(rowid, iRow, iCol, rowData, target,callback, obj){
	window.opener.onSelectAll(rowid, iRow, iCol, rowData, target,callback, obj);
	window.close();
}

//*********그리드 다이얼로그 & 팝업 (그리드에서 다이얼로그 & 팝업 뛰운 경우)
//그리드의 데이터를 모두 가지고 넘어가야할 경우
//1. 다이얼로그
function onSelectGridAlldepartdialog(rowid, iRow, iCol, rowData, target,callback, obj){
	onSelectGridAll(rowid, iRow, iCol, rowData, target,callback, obj);
}

//2. 팝업
function onSelectGridAlldepartpopup(rowid, iRow, iCol, rowData, target,callback, obj){
	window.opener.onSelectGridAll(rowid, iRow, iCol, rowData, target,callback, obj);
	window.close();
}

</script>

	<a2m:searchbox script="drawgrid_common" >  

	
	</a2m:searchbox>
	<div id="gridCommon"> </div>
<!-- <script type="text/javascript">
drawgrid_maint
</script> -->
