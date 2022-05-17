<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script>
var type = '${TYPE}';

var defaultValue = '${param.defaultValue}';

var drawgrid_dialog = function(formId, data) {
	
	if (type == 'ALL') {
		
		$('#turbine-list').setViewGrid({
			id: 'turbine-list',
			displayState: false,
			pinHeader: false,
			url: CTX + '/common/popup/popupSelectTurbine/getDataList.ajax',
			param: formId,
			localData: data,
			modelName: 'RESULTLIST',
			gridOptions: {
				caption: 'Turbine list',
				loadonce: true,
				sortable: false,
				rownumber: false,
				height: 520
			},
			colModels : [
				{ name: '', id: 'SELECTED', attrType: 'checkbox', typeValue: [ { LABEL: '사용', DATA: 'Y' }, { LABEL: '미사용', DATA: 'N' } ], width: 30 },
				{ name: 'WTG ID', id :'GERATOR_ID', attrType:'readonly'},
	   	   		{ name: '<spring:message code="title.farm.FARM_NM" />',  id: 'FARM_NM', attrType: 'readonly' },
// 	   	   		{ name: '<spring:message code="title.tb.GROUP_NM" />',   id: 'GROUP_NM', attrType: 'readonly' },  	   		
				{ name: '<spring:message code="title.tb.GERATOR_NM" />(EN)', id: 'GERATOR_EN_NM', attrType: 'readonly' },
				{ name: '<spring:message code="title.tb.GERATOR_NM" />', id: 'GERATOR_ID', attrType: 'readonly' }	   	
	   	   	],
	   	   	defaultOptions: { align: 'center', width: 50, sortable: true },
	   	 	events: [],
	   	   	btn: [
	   	   		{ button: 'cancel', func: 'onCancel', 'classes': '', label: '<spring:message code="button.cancel" />', target: '${param.target}', type: '${param.type}', callback: '${param.callback}' },
	   	   		{ button: 'select turbine', func: '${param.funcname}', 'classes': '', label: '<spring:message code="search.choose" />', target: '${param.target}', type: '${param.type}', callback: '${param.callback}' }
	   	   	]
		});
		
	} else {
		
		$('#turbine-list').setViewGrid({
			id: 'turbine-list',
			displayState: false,
			pinHeader: false,
			url: CTX + '/common/popup/popupSelectTurbine/getDataList.ajax',
			param: formId,
			localData: data,
			modelName: 'RESULTLIST',
			gridOptions: {
				caption: 'Turbine list',
				loadonce: true,
				sortable: false,
				rownumber: false,
				selectOne: true,
				height: 520
			},
			colModels : [
				{ name: '', id: 'SELECTED', attrType: 'checkbox', typeValue: [ { LABEL: '사용', DATA: 'Y' }, { LABEL: '미사용', DATA: 'N' } ], width: 30 },
				{ name: 'WTG ID', id :'GERATOR_ID', attrType: 'readonly' },
	   	   		{ name: '<spring:message code="title.farm.FARM_NM" />',  id: 'FARM_NM', attrType: 'readonly' },
 	   	   		{ name: '<spring:message code="title.tb.GROUP_NM" />',   id: 'GROUP_NM', attrType: 'readonly' },  	   		
				//{ name: '<spring:message code="title.tb.GERATOR_NM" />(EN)', id: 'GERATOR_EN_NM', attrType: 'readonly' },
				{ name: '<spring:message code="title.tb.GERATOR_NM" />', id: 'GERATOR_NM', attrType: 'readonly' }
	   	   	],
	   	   	defaultOptions: { align: 'center', width: 50, sortable: true },
	   	 	events: [
				{
					event: '${param.eventType}',
					funcName: '${param.funcname}',
					cls: '${param.cls}',
					target: '${param.target}'
//						type:'${param.type}',
//						callback:'${param.callback}'
				}
			],
			btn:[ 
				{button:'select company', func:'${param.funcname}', 'classes':'', label:'<spring:message code="search.choose"/>', target:'${param.target}', type:'${param.type}', callback:'${param.callback}'}
			]
		});
		
	}
	
	$('.search_tbl').closest('form').find('.btm_refresh').removeClass('ac_click submit');
	
	return false;
};	

function onCancel(){
	destroyDialogPopup($('#turbine-list'));
}
 
function onSelectRole(btn) {
	target = '${param.target}';
	callback = '${param.callback}';
	
	var $target =  $('#' + target.replace('.', '\\.'));
	var texts = "";
	var codes = "";

	if (type == 'ALL') {
		
		var checked = $('#table_turbine-list').find('input[type="checkbox"][data-checked="Y"]:checked');
		
		if (!checked.size()) {
			alert('No selected!');
		
			return false;
		}
		
		var text = $target.data('targettext');
		var code = $target.data('targetcode');
		var dataItems = $("#table_turbine-list").getGrid().dataItems().toJSON();
		
		$.each(dataItems, function(index, obj) {
			var $obj = $(obj)[0];
			
			if ($obj.SELECTED == 'Y') {
				if(!texts) {
					texts = $obj[text];
				} else {
					texts = texts + "," + $obj[text];
				}
				
				if (!codes) {
					codes = $obj[code];
				} else {
					codes = codes + "," + $obj[code];
				}
			}
		});
	
	} else {
		
		var checked = $('#table_turbine-list').find('input[type="checkbox"][data-checked="Y"]:checked');
		
		if (!checked.size()) {
			alert('No selected!');
		
			return false;
		}
		
		var text = $target.data('targettext');
		var code = $target.data('targetcode');
		var dataItems = $("#table_turbine-list").getGrid().dataItems().toJSON();
		
		
		$.each(dataItems, function(index, obj) {
			var $obj = $(obj)[0];
			
			if ($obj.SELECTED == 'Y') {
				if(!texts) {
					texts = $obj[text];
				} else {
					texts = texts + "," + $obj[text];
				}
				
				if (!codes) {
					codes = $obj[code];
				} else {
					codes = codes + "," + $obj[code];
				}
			}
		});
		
		/*
		$tr = $('tr[data-uid="'+btn+'"]');
		texts = $tr.find('td[data-col="GERATOR_EN_NM"]').text()
			  + $tr.find('td[data-col="GERATOR_ID"]').text();
		codes = $tr.find('td[data-col="GERATOR_ID"]').text();
		*/
		
	}
	
	
	var $text = $('#' + $target.data('prev'));
	var $code = $('#' + $target.data('next'));
	
	$text.val(texts).trigger('change');
	$code.val(codes).trigger('change');
	
// 	$target.data('defaultvalue', codes);
	
// 	if (callback) eval(callback);
	
	destroyDialogPopup($("#table_turbine-list"));
	$('body').css('position', '');
		
}

$(function() {
	$('body').css('position', 'fixed');
	console.log("${param.eventType}");
	console.log("${param.funcname}");
	console.log("${param.cls}");
	console.log("${param.target}");
	$(document).on('click', '.btm_refresh', function() {
		$(this).closest('form').trigger('reset');
		$(this).closest('form').trigger('submit');
		
		return false;
	});	
});
</script>


<div class="tit-wrap">
	<strong class="heading6">Select a Wind Turbine</strong>
</div>

<div id="select-turbine-dialog">
	<a2m:searchbox script="drawgrid_dialog" formId="searchForm_dlg" initenable="true"  pagingable="false">
<!-- 		<li> -->
<!-- 			<span class="detail-search-keyword">Alarm code</span> -->
<!-- 			<div class="input-group"> -->
<!-- 				<label for="search.WT_ALARM_ID" class="sr-only">Alarm code</label> -->
<!-- 				<input type="text" id="search.WT_ALARM_ID" name="search.WT_ALARM_ID"> -->
<!-- 			</div> -->
<!-- 		</li> -->
<!-- 		<li> -->
<!-- 			<span class="detail-search-keyword">Alarm text</span> -->
<!-- 			<div class="input-group"> -->
<!-- 				<label for="search.ALARM_NM" class="sr-only">Alarm text</label> -->
<!-- 				<input type="text" id="search.ALARM_NM" name="search.ALARM_NM"> -->
<!-- 			</div> -->
<!-- 		</li> -->
	</a2m:searchbox>

	<div id="turbine-list"></div>
</div>