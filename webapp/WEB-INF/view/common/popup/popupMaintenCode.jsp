<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<style>
td > span.lev2 {
    width: calc(100% - 2rem);
    float: right;
}

tr.lev1 td .checkbox-radio-custom{
	display: none;
}

tr.lev1{
	font-weight: bold;
}
</style>




<script type="text/javascript">
/* Maintance code */
var type = '${TYPE}';

var drawgrid_part = function(formId,data){
	
	if (type == 'ALL') {

	
	$('#gridPart').setViewGrid({
		id:'gridPart',
		displayState : false ,	
		pinHeader : false, 			
		url:CTX+'/common/popup/popupMaintenCode/getDataList.ajax',
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
			{name:'Name', id :'NAME', attrType:'readonly'},
			{name:'Code', id :'CODE', attrType:'readonly'},
			{name:'LEV', id :'LEV', attrType:'readonly', hidden:true},
  	   	],
		defaultOptions:{ align:'center', width:50, sortable:true }, 
		treeview: {
			viewField:'NAME', 		// 적용될 필드
			levField:'LEV', 			// LEVEL 필드
			//codeField:'MENU_ID', 		// 주코드
			//pcodeField:'UP_MENU_ID'		// 부모코드
		},
	 	
// 		events:[{event:'${param.eventType}',funcName:'${param.funcname}',target:'${param.target}',type:'${param.type}'}], 
		btn:[ 
			//{button:'cancel', func:'onCancel', 'classes':'', label:'<spring:message code="button.cancel"/>', target:'${param.target}', type:'${param.type}', callback:'${param.callback}'},
			{button:'select company', func:'${param.funcname}', 'classes':'', label:'<spring:message code="search.choose"/>', target:'${param.target}', type:'${param.type}', callback:'${param.callback}'}

		]		
	});
	}else{
		$('#gridPart').setViewGrid({
			id:'gridPart',
			type:'crud',
			displayState : false ,	
			pinHeader : false, 			
			url:CTX+'/common/popup/popupMaintenCode/getDataList.ajax',
			param : formId,  
			localData: data,  
			modelName : 'RESULTLIST',
			gridOptions : {
				caption: '검색결과',
				loadonce:true,
				rownumber:false,
				height: 520,
				selectOne: true
			},
			colModels : [
				{name: '', id: 'SELECTED', attrType: 'checkbox', typeValue: [ { LABEL: '사용', DATA: 'Y' }, { LABEL: '미사용', DATA: 'N' } ], width: 30 },
				{name:'Name', id :'NAME', attrType:'readonly', align:'left !important'},
				{name:'Code', id :'CODE', attrType:'readonly'},
	  	 	 	{name:'LEV', id :'LEV', attrType:'readonly', hidden:true},
	  	 	    {name:'UP_CD', id :'UP_CD', attrType:'readonly', hidden:true},
	  	   	],
	  	  	defaultOptions:{ align:'center'}, 
			treeview: {
				viewField:'NAME', 		// 적용될 필드
				levField:'LEV', 			// LEVEL 필드
				codeField:'CODE', 		// 주코드
				pcodeField:'UP_CD'		// 부모코드
			},
			events:[
				{
					event: '${param.eventType}',
					funcName: '${param.funcname}',
					cls: '${param.cls}',
					target: '${param.target}'
				}
			],
			btn:[ 
				{button:'select company', func:'${param.funcname}', 'classes':'', label:'<spring:message code="search.choose"/>', target:'${param.target}', type:'${param.type}', callback:'${param.callback}'}
			]		
		});
		
	}
	
// 	$('.search_tbl').closest('form').find('.btm_refresh').removeClass('ac_click submit');
	
	// 하단에 있는 선택 버튼을 최상단으로 옮기기
	$('.footer_table_btn').contents().unwrap().wrap('<span class="footer_table_btn" style="margin-left:15%"></span>');
	$('.heading6').append($('span.footer_table_btn'));
	
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

function onCancel(){
	destroyDialogPopup($('#gridPart'));
}

$(document).ready(function(){
	$('body').css('position', 'fixed');
	
	$(document).on('click', '.btm_refresh', function() {
		$(this).closest('form').trigger('reset');
		$(this).closest('form').trigger('submit');
		return false;
	});	
	
	console.log($('.footer_table_btn'));

});


function onClickRow(rowid, iRow, iCol, rowData, target,callback, obj){
	$('#gridPart td[data-col="SELECTED"] div.checkbox-radio-custom > input[type="checkbox"]').prop('checked', false).trigger('change');
	$('#gridPart  tr[data-uid="'+rowid+'"] div.checkbox-radio-custom > input[type="checkbox"]').prop('checked', true).trigger('change');
}


function onSelectMainCode(btn) {
	target = '${param.target}';
	callback = '${param.callback}';
	var $target =  $('#' + target.replace('.', '\\.'));
	var texts = "";
	var codes = "";
		if(type == 'ALL'){
			var checked = $('#gridPart').find('input[type="checkbox"][data-checked="Y"]:checked');
			if (!checked.size()) {
				alert('No selected!');
				return false;
			}
			
			var text = $target.data('targettext');
			var code = $target.data('targetcode');
			
			var dataItems = $("#gridPart").getGrid().dataItems().toJSON();

			$.each(dataItems, function(index, obj) {
				var $obj = $(obj)[0];
				if ($obj.SELECTED == 'Y') {
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
				}
			});

		}else{
			var checked = $('#table_gridPart').find('input[type="checkbox"][data-checked="Y"]:checked');
			
			if (!checked.size()) {
				alert('No selected!');
			
				return false;
			}
			
			var text = $target.data('targettext');
			var code = $target.data('targetcode');
			var dataItems = $("#table_gridPart").getGrid().dataItems().toJSON();
			
			$.each(dataItems, function(index, obj) {
				var $obj = $(obj)[0];
				if ($obj.SELECTED == 'Y') {
					if(!texts) {
						texts = $obj["SUF_NM"];
					} else {
						texts = texts + "," + $obj["SUF_NM"];
					}
					
					if (!codes) {
						codes = $obj["SUF_NM"];
					} else {
						codes = codes + "," + $obj["SUF_NM"];
					}
				}
			});
		}
 		var $text = $('#' + $target.data('prev'));
		var $code = $('#' + $target.data('next'));

		$text.val(texts).trigger('change');
 		$code.val(codes).trigger('change');
 		 		
		destroyDialogPopup($("#gridPart"));
		$('body').css('position', '');
} 
</script>


<div class="tit-wrap">
	<strong class="heading6">Select a maintanance code</strong>
</div>	
<div class="dlg_main_content">
<a2m:searchbox script="drawgrid_part" formId="searchForm_dlg" initenable="true"  pagingable="false"></a2m:searchbox>
<div id="gridPart" class="scrollTable" style="height: 700px;"></div>
</div>
