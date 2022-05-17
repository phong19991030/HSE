<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<style>
.k-header{
pointer-events: none;
}

</style>
<script type="text/javascript">
/* Maintance code */
	var type = '${TYPE}';
	var company_type =  '${COMP_TYPE}';
	var farm_id = '${FARM_ID}';
	var cls = '';
	
var drawgrid_part = function(formId,data){
	formId = 'searchForm_dlg'
	var company = '';
	if(company_type =='org'){
		company = '<spring:message code="sys.sys_0201.list.label.companyname"/>';
	}else if(company_type =='manu'){
		company = '<spring:message code="title.tb.brand"/>';
	}else{
		company = '<spring:message code="title.farm.operator"/>';
	}
	$('.tit-wrap strong').empty().append(company);
	if (type == 'ALL') {
	$('#gridPart').setViewGrid({
		id:'gridPart',
		displayState : false ,	
		pinHeader : false, 			
		url:CTX+'/common/popup/popupSelectCompany/getDataList.ajax?FARM_ID='+ farm_id + cls,
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
            {name:'Logo',  id : '', template: '<img src="${ctxPath}/util/upload/imageView/#=NEW_FLE_NM#" alt="" class="mCS_img_loaded">', width: 80},
  	   		{name:'<spring:message code="sys.sys_0201.list.label.companyid"/>', id :'COMPANY_ID',hidden: true},
  	  	 	{name: company, id :'COMPANY_NM', attrType:'readonly', width: 170},
  	   	],
		defaultOptions:{ align:'center', width:50, sortable:true }, 
	 	
// 		events:[{event:'${param.eventType}',funcName:'${param.funcname}',target:'${param.target}',type:'${param.type}'}], 
		btn:[ 
			//{button:'cancel', func:'onCancel', 'classes':'', label:'<spring:message code="button.cancel"/>', target:'${param.target}', type:'${param.type}', callback:'${param.callback}'},
			{button:'select company', func:'${param.funcname}', 'classes':'', label:'<spring:message code="search.choose"/>', target:'${param.target}', type:'${param.type}', callback:'${param.callback}'}

		]		
	});
	}else{
		$('#gridPart').setViewGrid({
			id:'gridPart',
			type:'tree',
			seq: true,
			displayState : false ,	
			pinHeader : false, 			
			url:CTX+'/common/popup/popupSelectCompany/getDataList.ajax?FARM_ID='+ farm_id + cls,
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
				{name: '', id: 'SELECTED', attrType: 'radio', typeValue: [ { LABEL: '사용', DATA: 'Y' }, { LABEL: '미사용', DATA: 'N' } ], width: 30},
                {name:'Logo',  id : '', template: '<img src="${ctxPath}/util/upload/imageView/#=NEW_FLE_NM#" alt="" class="mCS_img_loaded">', width: 80},
	  	   		{name:'<spring:message code="sys.sys_0201.list.label.companyid"/>', id :'COMPANY_ID',hidden: true},
	  	  	 	{name:company, id :'COMPANY_NM', sortable: false, attrType:'readonly', width: 170},
	  	 	
	  	   	],
			defaultOptions:{ align:'center'}, 
		 	
			//events:[{event:'click',funcName:'onClickRow'}],
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
	if(company_type=='opera'){
// 		$('#searchForm_dlg').append('<input hidden name="search.CLS" value="1">');
		cls = '&CLS=1';
	}else if(company_type=='manu'){
// 		$('#searchForm_dlg').append('<input hidden name="search.CLS" value="2">');
		cls = '&CLS=2';

	}else if(company_type=='isp'){
// 		$('#searchForm_dlg').append('<input hidden name="search.CLS" value="3">');
		cls = '&CLS=3';

	}else if(company_type=='consult'){
// 		$('#searchForm_dlg').append('<input hidden name="search.CLS" value="4">');
		cls = '&CLS=4';
	}
	
	$(document).on('click', '.btm_refresh', function() {
		$(this).closest('form').trigger('reset');
		$(this).closest('form').trigger('submit');
		return false;
	});	
	drawgrid_part();
	
});


// function onClickRow(rowid, iRow, iCol, rowData, target,callback, obj){
// 	$('#gridPart td[data-col="SELECTED"] div.checkbox-radio-custom > input').prop('checked', false).trigger('change');
// 	$('#gridPart  tr[data-uid="'+rowid+'"] div.checkbox-radio-custom > input').prop('checked', true).trigger('change');
// }


function onSelectCompany(btn) {
	
	target = '${param.target}';
		callback = '${param.callback}';
		var $target =  $('#' + target.replace('.', '\\.'));
	var texts = "";
	var codes = "";
// 		if(type == 'ALL'){
			var checked = type == 'ALL'? $('#gridPart').find('input[type="checkbox"][data-checked="Y"]:checked'): $('#gridPart').find('input[type="radio"][data-checked="Y"]:checked');
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

// 		}else{
// 			$tr = $('tr[data-uid="'+btn+'"]');
// 			var rowData = $tr.getGrid().dataItem($tr);
			
// 			texts = rowData["COMPANY_NM"];
// 			codes = rowData["COMPANY_ID"];
// 		}

 		var $text = $('#' + $target.data('prev')).length? $('#' + $target.data('prev')): $('input[name="'+$target.data('prev')+'"]');
		var $code = $('#' + $target.data('next')).length? $('#' + $target.data('next')): $('input[name="'+$target.data('next')+'"]');
 		
 		$text.val(texts).trigger('change');
 		$code.val(codes).trigger('change');
 		
		destroyDialogPopup($("#gridPart"));
		$('body').css('position', '');
}
 
</script>


<div class="tit-wrap">
	<strong class="heading6">Select a company</strong>
</div>	
<div class="dlg_main_content">
<a2m:searchbox script="drawgrid_part" formId="searchForm_dlg" initenable="false"  pagingable="false"></a2m:searchbox>
<div id="gridPart"></div>
 </div>
