<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script>
var type = '${TYPE}';

var defaultValue = '${param.defaultValue}';

var drawgrid_dialog = function(formId, data) {
	
	if (type == 'ALL') {
		
		$('#reportList').setViewGrid({
			id: 'reportList',
			displayState: false,
			pinHeader: false,
			url: CTX + '/common/popup/popupSelectReports/getReports.ajax',
			param: formId,
			localData: data,
			modelName: 'RESULTLIST',
			gridOptions: {
				caption: 'Reports List',
				loadonce: true,
				sortable: false,
				rownumber: false,
				height: 520
			},
			colModels : [
				//{ name: '', id: 'RPT_ID', hidden: true },
				//{ name: '<spring:message code="oam.oam_0203.grid.col.location"/>', id: 'GERATOR_ID', hidden: true },
				{ name: '<spring:message code="oam.oam_0203.grid.col.reportType"/>', id: 'RPT_TYPE_NM', attrType:'readonly' },
				//{ name: '<spring:message code="oam.oam_0203.grid.col.reportNumber"/>', id: 'RPT_NO', attrType:'readonly' },
				{ name: '<spring:message code="oam.oam_0203.grid.col.reportNM"/>', id: 'PROJECT', attrType:'readonly' },
				//{ name: '<spring:message code="oam.oam_0203.grid.col.author"/>', id: 'AUTHOR_NM', attrType:'readonly' },
				//{ name: '<spring:message code="title.event.INS_DT"/>', id: 'INS_DT', attrType:'readonly' },  	
	   	   	],
	   	   	defaultOptions: { align: 'center', width: 50, sortable: true },
	   	 	events: [],
	   	   	btn: [
	   	   		{ button: 'cancel', func: 'onCancel', 'classes': '', label: '<spring:message code="button.cancel" />', target: '${param.target}', type: '${param.type}', callback: '${param.callback}' },
	   	   		{ button: 'select turbine', func: '${param.funcname}', 'classes': '', label: '<spring:message code="search.choose" />', target: '${param.target}', type: '${param.type}', callback: '${param.callback}' }
	   	   	]
		});
		
	} else {
		
		$('#reportList').setViewGrid({
			id: 'reportList',
			displayState: false,
			pinHeader: false,
			url: CTX + '/common/popup/popupSelectReports/getReports.ajax',
			param: formId,
			localData: data,
			modelName: 'RESULTLIST',
			gridOptions: {
				caption: 'Reports List',
				loadonce: true,
				sortable: false,
				rownumber: false,
				height: 520
			},
			colModels : [
				//{ name: '', id: 'RPT_ID', hidden: true },
				//{ name: '<spring:message code="oam.oam_0203.grid.col.location"/>', id: 'GERATOR_ID', hidden: true },
				{ name: '<spring:message code="oam.oam_0203.grid.col.reportType"/>', id: 'RPT_TYPE_NM', attrType:'readonly' },
				//{ name: '<spring:message code="oam.oam_0203.grid.col.reportNumber"/>', id: 'RPT_NO', attrType:'readonly' },
				{ name: '<spring:message code="oam.oam_0203.grid.col.reportNM"/>', id: 'PROJECT', attrType:'readonly' },
				//{ name: '<spring:message code="oam.oam_0203.grid.col.author"/>', id: 'AUTHOR_NM', attrType:'readonly' },
				//{ name: '<spring:message code="title.event.INS_DT"/>', id: 'INS_DT', attrType:'readonly' }, 	
	   	   	],
	   	   	defaultOptions: { align: 'center', width: 50, sortable: true },
	   	 	events: [
				{
					event: 'dblclick',
					funcName: 'onSelectRole',
					cls: 'selectReports',
					target: 'RPT_ID'
//						type:'${param.type}',
//						callback:'${param.callback}'
				}
			],
	   	   	btn: []		
		});
		
	}
	
	$('.search_tbl').closest('form').find('.btm_refresh').removeClass('ac_click submit');
	
	return false;
};	

function onCancel(){
	destroyDialogPopup($('#reportList'));
}
 
function onSelectRole(btn) {
	target = '${param.target}';
	callback = '${param.callback}';
	
	var $target =  $('#' + target.replace('.', '\\.'));
	var texts = "";
	var codes = "";

	if (type == 'ALL') {
		
		var checked = $('#reportList').find('input[type="checkbox"][data-checked="Y"]:checked');
		
		if (!checked.size()) {
			alert('No selected!');
		
			return false;
		}
		
		var text = $target.data('targettext');
		var code = $target.data('targetcode');
		var dataItems = $("#reportList").getGrid().dataItems().toJSON();
		
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
		
		$tr = $('tr[data-uid="'+btn+'"]');
		texts = $tr.find('td[data-col="RPT_TYPE_NM"]').text()
			  + $tr.find('td[data-col="RPT_TYPE_NM"]').text();
		codes = $tr.find('td[data-col="PROJECT"]').text();
		
	}
	
	var $text = $('#' + $target.data('prev'));
	var $code = $('#' + $target.data('next'));
	
	$text.val(texts).trigger('change');
	$code.val(codes).trigger('change');
	
	destroyDialogPopup($("#reportList"));
	$('body').css('position', '');
		
}

$(function() {
	$('body').css('position', 'fixed');
	
	$(document).on('click', '.btm_refresh', function() {
		$(this).closest('form').trigger('reset');
		$(this).closest('form').trigger('submit');
		
		return false;
	});	
});
</script>


<div class="tit-wrap">
	<strong class="heading6">Select a report</strong>
</div>

<div id="select-report-dialog">
	<a2m:searchbox script="drawgrid_dialog" formId="searchForm_dlg" initenable="true"  pagingable="false">

	</a2m:searchbox>

	<div id="reportList"></div>
</div>