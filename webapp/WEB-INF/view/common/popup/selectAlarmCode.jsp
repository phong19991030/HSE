<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript">
var alarmCd = '${WT_ALARM_GR_ID}';
var drawgrid_alarm = function(formId,data){
	var mydata = data;
	$('#gridAlarm').setViewGrid({
		id: 'gridAlarm',
		type:'crud',
		// defaultAttrType: 'readonlytext',
		pinHeader: false, //헤더고정 설정  
		//displayState: true, // CRUD 상태표시창 show/hide 여부
		url: CTX + '/common/popup/popupAlarmCode/getDataList.ajax?WT_ALARM_GR_ID='+alarmCd,
		param: formId,
		localData: mydata,
		data: mydata,  
		modelName: 'RESULTLIST', 
		gridOptions: {
			caption:'프로그램내역',
			loadonce:true,
			rownumbers:true,
			gridPaginationLength: 500,
			pageable : true,
			height: 570
		},
		colModels: 
		[
			{name:'ALARM CODE', id :'ALARM_SUB_CD',  align:'center'},
			{name:'TEXT', id :'ALARM_TXT', align:'center'},
			{name:'DOC_PATH', id :'DOC_PATH', hidden:true},
 			{name:'WT_ALARM_GR_ID', id :'WT_ALARM_GR_ID', hidden:true}, 
			{name:'WT_ALARM_ID', id :'WT_ALARM_ID', hidden:true}, 
			{name:'SUGGEST', id :'SUGGEST', hidden:true},
			{name:'DESCRPT', id :'DESCRPT', hidden:true}
			
		],
// 		callback: 'readOnlyStyle', 
		//boundEvent : 'readOnlyStyle',
		defaultOptions: {width:180, sortable:true},
		// 이벤트
		events:[{event:'${param.eventType}',funcName:'${param.funcname}',target:'${param.target}',type:'${param.type}'}], 
		colspan: [],
		rowspan: [], 
		colGroup: [],
		btn: []
	});
	return false; // 화면 전환없음
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
<div> 
	<a2m:searchbox script="drawgrid_alarm" initenable="true">
		<table class="search_tbl">
			<caption>Search</caption>
			<colgroup>
				<col style="width: 200px;">
				<col style="width: auto;">
				<col style="width: 200px;">
				<col style="width: auto">
			</colgroup>
			<tbody>		
				<tr>
					<th><label for="ALARM_SUB_CD">Code name</label></th>
					<td><input type="text" id="ALARM_SUB_CD" name="ALARM_SUB_CD" />
					<td>
				</tr>
				
			</tbody>
		</table>
	</a2m:searchbox>
 
	<form:form action="${formPath }/save02.ajax" id="saveForm" data-func="saveAjax"   data-callback="saveCallbackFunc">
		<div id="gridAlarm" style="width: 100%;"></div>
	</form:form>
</div>


