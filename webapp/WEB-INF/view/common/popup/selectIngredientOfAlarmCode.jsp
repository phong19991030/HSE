<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript">
var code = '${param.CODE}';
var targetCode = '${param.targetCode}';
var targetName = '${param.targetName}';
var param = '${param.callback}';

var drawgrid_common = function(formId,data){
	$('#gridCommon').setViewGrid({
		id:'gridCommon',
		type:'crud',
		seq: true,
		displayState : false ,	
		pinHeader : false, 			
		url:CTX+'/common/popup/popupMutilCommonCode/getDataList.ajax?CODE='+code,
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
			{name: '', id: 'SELECTED', attrType: 'checkbox', typeValue: [ { LABEL: '사용', DATA: 'Y' }, { LABEL: '미사용', DATA: 'N' } ], width: 30},
  	   		{name:'Name', id :'NAME', align:'left !important'},
  	   		{name:'Code', id :'CODE'},  
  	 		{name:'부모코드' ,id :'UP_CD', hidden:true},
  	 		{name:'레벨' ,id :'LEV', hidden:true}
  	   	],
		defaultOptions:{ align:'center'}, 
		boundEvent : 'setStyle',
		events:[{event:'click',funcName:'onClickRow'}], 
		btn:[ 
			 {button:'Select Part', func:'onSelectItem', 'classes':'', label:'Select', target:'${param.target}', type:'${param.type}', callback:'${param.callback}'}
		]		
	});
	return false;
};	

function onSelectItem(){
	var checked = $('#gridCommon').find('input[type="checkbox"][data-checked="Y"]:checked');
	if (!checked.size()) {
		alert('No selected!');
		return false;
	}
// 	debugger;
	var $text =  $('#' + targetName);
	var $code = $('#' + targetCode);
	var texts = '';
	var codes = '';
	var dataItems = $("#gridCommon").getGrid().dataItems().toJSON();

	$.each(dataItems, function(index, obj) {
		var $obj = $(obj)[0];
		if ($obj.SELECTED == 'Y') {
			texts = $obj['NAME'];
			codes = $obj['CODE'];
		}
	});
	var check = true;
	$code.closest('.group_area').find('input.code0').each(function(){
		if($(this).val() == codes){
			check = false;
		}
	});
	if(!check){
		alert('<spring:message code='sys.sys_0101.list.alert.doubles' />');
		return false;
	}
	
	$code.closest('div.input-group-wrapper').find('.input-group.input-group-num input').val('1');
	$text.val(texts).trigger('change');
	$code.val(codes).trigger('change');
	destroyDialogPopup($("#gridCommon"));

}


function onClickRow(rowid, iRow, iCol, rowData, target,callback, obj){
	$('#gridCommon td[data-col="SELECTED"] div.checkbox-radio-custom > input[type="checkbox"]').prop('checked', false).trigger('change');
	$('#gridCommon  tr[data-uid="'+rowid+'"] div.checkbox-radio-custom > input[type="checkbox"]').prop('checked', true).trigger('change');
}

function setStyle(){
	var grid = $('#gridCommon').getViewGridWrap();
	var check = $('#NAME_SEARCH').val();
	if(check!=null && check!=''){
		var rowList = grid.getGrid().items();
		$.each(rowList, function(i, obj){
			$obj = $(obj);
			var element = $obj[0].outerHTML;
	   		var rowId = $(element).attr('data-uid');
	   		var rowData = $('#table_gridCommon').getRowData(rowId);
	   		var code = rowData.NAME;
	    		if(!code.includes(check)){
	   			$(obj).hide();
	   		} 		
		});
	}
}
</script>
<div class="tit-wrap">
				<strong class="heading6">Select item</strong>
			</div>
	<a2m:searchbox formId="searchForm" script="drawgrid_common" pagingable="false">  
	<table class="search_tbl">
			<caption>Search</caption>
			<colgroup>
				<col style="width: 100px;">
				<col style="width: auto;">
			</colgroup>
			<tbody>
				<tr>
					<th>Name</th>
					<td>
						<input type="text" id="NAME_SEARCH" name="NAME_SEARCH" />
					</td>
					
				</tr>
			</tbody>
		</table>	
	</a2m:searchbox>
	<div id="gridCommon"> </div>

