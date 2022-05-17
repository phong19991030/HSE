<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script type="text/javascript">
var popupDrawgrid = function(formId,data){
	var mydata2 = data;
	$('#popupGrid').setViewGrid({id:'popupGrid',type:'view',
// 		url:CTX+'/common/popup/getDataGeneratorPopup.ajax',
		url:CTX+'${urlGetData}',  

		param : formId ,
		data:mydata2,  
		gridOptions : {width: 500, sortable:true, caption: '검색결과' , loadonce:true},
		colModels : [	             
		   	{name:'<spring:message code='title.main.part.prop.id' />', id :'PART_PROP_ID', width:60},
   	   		{name:'<spring:message code='title.main.part.prop.name' />', id :'PROP_NM', width:190, align:'left'}  , 	   	
   	   		{name:'<spring:message code='title.main.part.prop.code' />', id :'PART_CD', width:190, align:'left'} ,  	   		
   	   	],
		defaultOptions:{ width:120, sortable:true},
		colspan:[],
		rowspan:[], 
		colGroup:[], 
		events:[
			{
				event:'${param.eventType}', funcName:'${param.funcname}',
				target:'${param.target}', type:'${param.type}', callback:'${param.callback}'
			}
		]
	});
	return false;
}; 

/*
 * *****************************************
 * Grid 이벤트
 * ******************************************
 */
 
//"필수적용사항"
//*********폼 다이얼로그 & 팝업 (폼에서 다이얼로그 & 팝업 뛰운 경우)
//그리드의 데이터를 모두 가지고 넘어가야할 경우
//1. 다이얼로그
function onSelectAlldialog(rowid, iRow, iCol, rowData, target,callback, obj){
	onSelectAll(rowid, iRow, iCol, rowData, target,callback, obj);
}

//2. 팝업
function onSelectAllpopup(rowid, iRow, iCol, rowData, target,callback, obj){
	window.opener.onSelectAll(rowid, iRow, iCol, rowData, target,callback, obj);
	window.close();
}

//*********그리드 다이얼로그 & 팝업 (그리드에서 다이얼로그 & 팝업 뛰운 경우)
//그리드의 데이터를 모두 가지고 넘어가야할 경우
//1. 다이얼로그
function onSelectGridAlldialog(rowid, iRow, iCol, rowData, target,callback, obj){
	onSelectGridAll(rowid, iRow, iCol, rowData, target,callback, obj);
}

//2. 팝업
function onSelectGridAllpopup(rowid, iRow, iCol, rowData, target,callback, obj){
	window.opener.onSelectGridAll(rowid, iRow, iCol, rowData, target,callback, obj);
	window.close();
}

/*
 * *****************************************
 * 폼 이벤트
 * ******************************************
 */

//조회 - search_box 전송
function doSubmit() {
	$('.form_search_box#popupDrawgrid').trigger('submit');
}

//[유형- radio] change
function changeCls() {
    $('input[name=SE_CLS]').change(function(){
        $('.form_search_box#popupDrawgrid').submit();
    });
}

// [search_box] 전체 Reset
function searchBoxReset() {
 	$('.form_search_box#popupDrawgrid').each(function() {  
        this.reset();  
    });  
 	doSubmit();
}

$(document).ready(function(){
	// [유형- radio] change
	changeCls(); 	
	
	//$('.form_search_box#popupDrawgrid').trigger('submit');
});

</script>
<div id="popup_wrapper">
	<h4><spring:message code='title.popup.property' /></h4>
	<a2m:searchbox script="popupDrawgrid" >
		<table class="search_tbl">
			<caption>Search</caption>
			<colgroup>
				<col style="width: 100px;">
				<col style="width: auto;">
				<col style="width: 100px;">
				<col style="width: auto">
			</colgroup>
			<tbody>
				<tr>
					<th><spring:message code='title.main.part.prop.name' /></th>
					<td><input type="text" id="PROP_NM" name="PROP_NM"/></td>
					<th><spring:message code='title.main.part.prop.code' /></th>
					<td><input type="text" id="PART_CD" name="PART_CD"/></td>
					
				</tr>
			</tbody>
		</table>
	</a2m:searchbox>
	<div id="popupGrid"> </div>
</div>	