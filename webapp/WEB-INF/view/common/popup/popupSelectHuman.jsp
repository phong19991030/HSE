<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript">
	var type = '${TYPE}';

	var defaultValue = '${param.defaultValue}';
	function gridCallback(grid) {
		if (defaultValue) {
			var dataItems = $(grid).getGrid().dataItems();
			var uidList = defaultValue.split(',');
			for (var i = 0; i < uidList.length; i++) {
				var uid = uidList[i] ? uidList[i].trim() : '';
				if (uid) {
					$.each(dataItems, function(index, o) {
						if (o.uid) {
							var expertUid = $(grid).find('tr[data-uid="' + o.uid + '"]').find('td[data-col=EDU_EPRT_UID] > input[name=EDU_EPRT_UID]').val();
							if (uid == expertUid) {
								$(grid).find('tr[data-uid="' + o.uid + '"]').find('td[data-col=SELECTED] > input[name=SELECTED]').prop('checked', true).trigger('change');
								o.SELECTED = 'Y';
							}
						}
					});
				}
			}
		}
	}
	
	var drawgrid = function(formId, data) {
		if (type == 'ALL') {
			$('#select-human-grid').setViewGrid({
				id: 'select-human-grid',
				displayState: false,
				pinHeader: false,
				url: CTX+'/common/popup/popupSelectHuman/getDataList.ajax',
				param: formId,  
				localData: data,  
				modelName: 'RESULTLIST',
				gridOptions: { height: 600, sortable:false, caption: '<spring:message code="common.popup.popupSelectHuman.title"/>', loadonce:true, rownumbers:false},
				colModels: [
					{name: '', id: 'SELECTED', attrType: 'checkbox', typeValue: [ { LABEL: '사용', DATA: 'Y' }, { LABEL: '미사용', DATA: 'N' } ], width: 30},
					{name: '', id: 'EDU_EPRT_UID', attrType: 'text', hidden: true},
		   	   		{name: '<spring:message code="common.popup.popupSelectHuman.name"/>', id: 'EPRT_FIRST_NAME', attrType: 'readonly'},
		   	   		{name: '<spring:message code="common.popup.popupSelectHuman.cost"/>', id: 'EDU_EPRT_COST', attrType: 'readonly'},  
		   	 		{name: '<spring:message code="common.popup.popupSelectHuman.department"/>', id: 'EDU_EPRT_DEPT', attrType: 'readonly'},
		   	 		{name: 'Email', id: 'EDU_EPRT_EMAIL', attrType: 'readonly'},
		   	   	],
		   	   	callback: 'gridCallback',
				defaultOptions:{ align:'center', width:100, sortable:true }, 
				events:[],
				btn:[ 
					 {button:'Select Human', func:'${param.funcname}', 'classes':'', label:'<spring:message code="common.popup.popupSelectHuman.select"/>', target:'${param.target}', type:'${param.type}', callback:'${param.callback}'}
				]
			});
		} else {
			$('#select-human-grid').setViewGrid({
				id: 'select-human-grid',
				displayState: false,
				pinHeader: false,
				url: CTX+'/common/popup/popupSelectHuman/getDataList.ajax',
				param: formId,  
				localData: data,  
				modelName: 'RESULTLIST',
				gridOptions: { height: 600, sortable:false, caption: '<spring:message code="common.popup.popupSelectHuman.title"/>', loadonce:true, rownumbers:false},
				colModels: [
					{name: '', id: 'SELECTED', attrType: 'checkbox', typeValue: [ { LABEL: '사용', DATA: 'Y' }, { LABEL: '미사용', DATA: 'N' } ], width: 30},
		   	   		{name: '', id: 'EDU_EPRT_UID', attrType: 'text', hidden: true},
		   	   		{name: '<spring:message code="common.popup.popupSelectHuman.name"/>', id: 'EPRT_FIRST_NAME', attrType: 'readonly'},
		   	   		{name: '<spring:message code="common.popup.popupSelectHuman.cost"/>', id: 'EDU_EPRT_COST', attrType: 'readonly'},  
		   	 		{name: '<spring:message code="common.popup.popupSelectHuman.department"/>', id: 'EDU_EPRT_DEPT', attrType: 'readonly'},
		   	 		{name: 'Email', id: 'EDU_EPRT_EMAIL', attrType: 'readonly'},
		   	   	],
				defaultOptions:{ align:'center', width:100, sortable:true }, 
				events:[
					{
						event: '${param.eventType}',
						funcName: '${param.funcname}',
						cls: '${param.cls}',
						target: '${param.target}'
						//type:'${param.type}',
						//callback:'${param.callback}'
					}
				],
				btn:[]
			});
		}
	
		return false;
	};
	 
	function onSelectHuman(btn) {
		target = '${param.target}';
 		callback = '${param.callback}';
 		var $target =  $('#' + target.replace('.', '\\.'));
 		
 		var checked = $('#table_select-human-grid').find('input[type="checkbox"][data-checked="Y"]:checked');
		if (!checked.size()) {
			alert('<spring:message code="common.popup.popupSelectHuman.noOneSelected"/>');
			return false;
		}
		
		var text = $target.data('targettext');
		var code = $target.data('targetcode');
		var humanUid = "EDU_EPRT_UID";
		
		var dataItems = $("#table_select-human-grid").getGrid().dataItems().toJSON();
		var texts = "";
		var codes = "";
		
		$.each(dataItems, function(index, obj) {
			var $obj = $(obj)[0];
			if ($obj.SELECTED == 'Y') {
				if(!texts) {
					texts = $obj[text];
				} else {
					texts = texts + ", " + $obj[text];
				}
				if (!codes){
					codes = $obj[humanUid];
				} else {
					codes = codes + "," + $obj[humanUid];
				}
				console.log($obj[text]);
				console.log($obj[humanUid]);
			}			
		});

 		var $text = $('#' + $target.data('prev'));
 		var $code = $('#' + $target.data('next'));
 		
 		$text.val(texts).trigger('change');
 		$code.val(codes).trigger('change');
 		
 		
 		$target.data('defaultvalue', codes);
		if(callback) eval(callback);
		destroyDialogPopup($("#table_select-human-grid"));
		$('body').css('position', '');
	}
	 
	$(document).ready(function() {
		$('body').css('position', 'fixed');
	});
</script>
<div id="select-human-dialog"> 
	<h3><spring:message code="common.popup.popupSelectHuman.title"/></h3>
	<a2m:searchbox script="drawgrid" formId="searchForm_dlg" initenable="true" pagingable="false"> 

	</a2m:searchbox>	
	
	<div id="select-human-grid"></div>
</div>