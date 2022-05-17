<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript">
var code = '${CODE}';
/* Maintance code */
var drawgrid_maint = function(formId,data){
	$('#grid2').setViewGrid({
		id:'grid2',
		type:'tree',
		seq: true,
		displayState : false ,	
		pinHeader : false, 			
		url:CTX+'/common/popup/popupMaintenCode/getDataList.ajax?CODE='+code,
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
  	   		{name:'Name', id :'NAME', align:'left !important'},
  	   		{name:'Code', id :'CODE'},  
  	 		{name:'부모코드' ,id :'UP_CD', hidden:true},
  	 		{name:'레벨' ,id :'LEV', hidden:true}
  	   	],
  	    callback: 'treeCallback',
		defaultOptions:{ align:'center'}, 
		boundEvent : 'setStyle',
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
	$('.search_tbl').closest('form').find('.btm_refresh').removeClass('ac_click submit');
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
$(document).ready(function(){	
	$(document).on('click', '.btm_refresh', function() {
		$(this).closest('form').trigger('reset');
		$(this).closest('form').trigger('submit');
		return false;
	});

});
function setStyle(){
	var grid = $('#grid2').getViewGridWrap();
	var check = $('#SUFFIX').val();
	if(check!=null && check!=''){
		var rowList = grid.getGrid().items();
		$.each(rowList, function(i, obj){
			$obj = $(obj);
			var element = $obj[0].outerHTML;
	   		var rowId = $(element).attr('data-uid');
	   		var rowData = $('#table_grid2').getRowData(rowId);
	   		var code = rowData.NAME;
	    		if(!code.includes(check)){
	   			$(obj).hide();
	   		} 		
		});
	}
}
function treeCallback(grid) {
	$(grid).find('span[data-lev="1"]').each(function(i, o) {
		$(o).css({
			margin: '0px',
			padding: '0px'
		});		
	});
	
	$(grid).find('span[data-lev="2"]').each(function(i, o) {
		if ($(o).hasClass('parent')) {
			$(o).css('margin-left', '40px');			
		}
	});
	
	$(grid).find('span[data-lev="3"]').each(function(i, o) {
		$(o).css('margin-right', '40px');		
	});
}
</script>

	<a2m:searchbox script="drawgrid_maint" >  
	<table class="search_tbl">
			<caption>Search</caption>
			<colgroup>
				<col style="width: 100px;">
				<col style="width: auto;">
			</colgroup>
			<tbody>
				<tr>
					<th><spring:message code='pic.pic_0401.list.partNm' /></th>
					<td>
						<input type="text" id="SUFFIX" name="SUFFIX" />
					</td>
					
				</tr>
			</tbody>
		</table>
	
	</a2m:searchbox>
	<div id="grid2"> </div>
<!-- <script type="text/javascript">
drawgrid_maint
</script> -->
