<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript">
var code = '${CODE}';
/* Maintance code */
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
		events:[{event:'${param.eventType}',funcName:'${param.funcname}',target:'${param.target}',type:'${param.type}'}], 
		btn:[ 
			 {button:'Select Part', func:'${param.funcname}', 'classes':'', label:'Select', target:'${param.target}', type:'${param.type}', callback:'${param.callback}'}
		]		
	});
	return false;
};	
function onSelectTool(btn) {
	target = '${param.target}';
		callback = '${param.callback}';
		var $target =  $('#' + target.replace('.', '\\.'));
		var checked = $('#table_gridCommon').find('input[type="checkbox"][data-checked="Y"]:checked');
	if (!checked.size()) {
		alert('<spring:message code="common.popup.popupSelectHuman.noOneSelected"/>');
		return false;
	}
	
	var text = $target.data('targettext');
	var code = $target.data('targetcode');
	var $text = $('#' + $target.data('prev'));
	var $code = $('#' + $target.data('next'));
	while ($code[0].hasChildNodes()) {  
		$code[0].removeChild($code[0].firstChild);
		}
	var dataItems = $("#table_gridCommon").getGrid().dataItems().toJSON();
	var texts = "";
	var codes = "";
	var count = 0;
	$.each(dataItems, function(index, obj) {
		var $obj = $(obj)[0];
		if ($obj.SELECTED == 'Y') {
			count++;
			if(!texts) {
				texts = $obj[text];
				
			} else {
				texts = texts + ", " + $obj[text];
			}
			if (!codes){
				codes = $obj[code];
			} else {
				codes = codes + ", " + $obj[code];
			}
			addInputPart(count,$obj[text],$code[0],"tool");
		}
	});

		$text.val(codes).trigger('change');
		$code.val(codes).trigger('change');
		
	if(callback) eval(callback);
	destroyDialogPopup($("#table_gridCommon"));
}
function onSelectPpe(btn) {
	target = '${param.target}';
		callback = '${param.callback}';
		var $target =  $('#' + target.replace('.', '\\.'));
		var checked = $('#table_gridCommon').find('input[type="checkbox"][data-checked="Y"]:checked');
	if (!checked.size()) {
		alert('<spring:message code="common.popup.popupSelectHuman.noOneSelected"/>');
		return false;
	}
	
	var text = $target.data('targettext');
	var code = $target.data('targetcode');
	var $text = $('#' + $target.data('prev'));
	var $code = $('#' + $target.data('next'));
	while ($code[0].hasChildNodes()) {  
		$code[0].removeChild($code[0].firstChild);
		}
	var dataItems = $("#table_gridCommon").getGrid().dataItems().toJSON();
	var texts = "";
	var codes = "";
	var count = 0;
	$.each(dataItems, function(index, obj) {
		var $obj = $(obj)[0];
		if ($obj.SELECTED == 'Y') {
			count++;
			if(!texts) {
				texts = $obj[text];
				
			} else {
				texts = texts + ", " + $obj[text];
			}
			if (!codes){
				codes = $obj[code];
			} else {
				codes = codes + ", " + $obj[code];
			}
			addInputPart(count,$obj[text],$code[0],"ppe");
		}
	});

		$text.val(codes).trigger('change');
		$code.val(codes).trigger('change');
		
	if(callback) eval(callback);
	destroyDialogPopup($("#table_gridCommon"));
}
var addInputPart = function(i,value,formPart,type) {
	    var input = document.createElement("input");
	    var inputNumber = document.createElement("input");
	    var img = document.createElement("img");
	    var br = document.createElement('br');
	    input.id = 'input-'+type+'-' + i;
	    input.type = 'text';
	    input.name = 'name';
	    input.readOnly = true;
	    input.value = value;
	    inputNumber.id = 'number-'+type+'-' + i;
	    inputNumber.type = 'number';
	    inputNumber.name = 'number';
	    inputNumber.min=1;
	    inputNumber.value=1;
	    inputNumber.className ='inputNumber';
	    img.className ='btn-img';
	    img.src='/images/minus.png';
	    img.id= type+'-' + i;
	    formPart.appendChild(input);
	    formPart.appendChild(inputNumber);
	    formPart.appendChild(img);
	    formPart.appendChild(br);
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
	<a2m:searchbox script="drawgrid_common" >  
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

