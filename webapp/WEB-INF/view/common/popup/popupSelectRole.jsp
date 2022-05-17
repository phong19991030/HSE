<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript">
	
	var type = '${TYPE}';

	var defaultValue = '${param.defaultValue}';
	//alert(defaultValue);
	function gridCallback(grid) {
		//debugger;
// 		if (defaultValue) {
// 			var dataItems = $(grid).getGrid().dataItems();
// 			var uidList = defaultValue.split(',');
// 			for (var i = 0; i < uidList.length; i++) {
// 				var uid = uidList[i] ? uidList[i].trim() : '';
// 				if (uid) {
// 					$.each(dataItems, function(index, o) {
						
// 						if (o.uid) {
// 							var expertUid = $(grid).find('tr[data-uid="' + o.uid + '"]').find('td[data-col=ROLE_ID]').text();
// 							if (uid == expertUid) {
// 								$(grid).find('tr[data-uid="' + o.uid + '"]').find('td[data-col=SELECTED] > input[name=SELECTED]').prop('checked', true).trigger('change');
// 								o.SELECTED = 'Y';
// 							}
// 						}
// 					});
// 				}
// 			}
// 		}
	}
	
	var drawgrid = function(formId, data) {
		debugger;
// 		formId = $.extend({
// 			'USER_UID': '${USER_UID}'
// 		}, formId);
		var user_uid = '${USER_UID}';
		if (type == 'ALL') {
			$('#select-human-grid').setViewGrid({
				id: 'select-human-grid',
				displayState: false,
				pinHeader: false,
				url: CTX+'/common/popup/popupSelectRole/getDataList.ajax?USER_UID='+user_uid,
				param: formId,  
				localData: data,  
				modelName: 'RESULTLIST',
				gridOptions: { height: 460, sortable:false, caption: 'Role List', loadonce:true, rownumbers:false},
				colModels: [
					{name: '', id: 'SELECTED', attrType: 'checkbox', typeValue: [ { LABEL: '사용', DATA: 'Y' }, { LABEL: '미사용', DATA: 'N' } ], width: 30},
					{name: 'ROLE_ID', id: 'ROLE_ID', attrType: 'readonly',hidden:true},
					{name: '<spring:message code="sys.sys_0201.list.label.rolename"/>', id: 'ROLE_NM', attrType: 'readonly'},
					{name: '<spring:message code="sys.sys_0201.list.label.remark"/>', id: 'RMK', attrType: 'readonly'},
		   	   	],
// 		   		callback: 'gridCallback',
				defaultOptions:{ align:'center', width:50, sortable:true }, 
				events:[],
				btn:[ 
// 					 {button:'cancel', func:'onCancel', 'classes':'', label:'<spring:message code="button.cancel"/>', target:'${param.target}', type:'${param.type}', callback:'${param.callback}'},
					 {button:'Select Human', func:'${param.funcname}', 'classes':'', label:'<spring:message code="search.choose"/>', target:'${param.target}', type:'${param.type}', callback:'${param.callback}'}
				]
			});
		} else {
			$('#select-human-grid').setViewGrid({
				id: 'select-human-grid',
				displayState: false,
				pinHeader: false,
				url: CTX+'/common/popup/popupSelectRole/getDataList.ajax?USER_UID='+user_uid,
				param: formId,  
				localData: data,  
				modelName: 'RESULTLIST',
				gridOptions: { height: 460, sortable:false, caption: 'Role List', loadonce:true, rownumbers:false, selectOne: true},
				colModels: [
					{name: '', id: 'SELECTED', attrType: 'checkbox', typeValue: [ { LABEL: '사용', DATA: 'Y' }, { LABEL: '미사용', DATA: 'N' } ], width: 30},
					{name: 'ROLE_ID', id: 'ROLE_ID', attrType: 'readonly',hidden:true},
					{name: '<spring:message code="sys.sys_0201.list.label.rolename"/>', id: 'ROLE_NM', attrType: 'readonly'},
					{name: '<spring:message code="sys.sys_0201.list.label.remark"/>', id: 'RMK', attrType: 'readonly'},
		   	   	],
				defaultOptions:{ align:'center', width:50, sortable:true }, 
				events:[
// 					{
// 						event:'${param.eventType}',
// 						funcName:'${param.funcname}',
// 						cls:'${param.cls}',
// 						target:'${param.target}',
// // 						type:'${param.type}',
// // 						callback:'${param.callback}'
// 					}
				],
				btn:[ 
// 					 {button:'cancel', func:'onCancel', 'classes':'', label:'<spring:message code="button.cancel"/>', target:'${param.target}', type:'${param.type}', callback:'${param.callback}'},
					 {button:'Select Human', func:'${param.funcname}', 'classes':'', label:'<spring:message code="search.choose"/>', target:'${param.target}', type:'${param.type}', callback:'${param.callback}'}
				
				]
			});
		}
		
// 		$('.search_tbl').closest('form').find('.btm_refresh').removeClass('ac_click submit');
		
		return false;
	};
	
	function onCancel(){
		destroyDialogPopup($('#select-human-grid'));
	}
	 
	function onSelectRole(btn) {
		target = '${param.target}';
 		callback = '${param.callback}';
 		var $target =  $('#' + target.replace('.', '\\.'));
		var texts = "";
		var codes = "";
 		if(type == 'ALL'){
 			var checked = $('#table_select-human-grid').find('input[type="checkbox"][data-checked="Y"]:checked');
 			if (!checked.size()) {
 				alert('No selected!');
 				return false;
 			}
 			
 			var text = $target.data('targettext');
 			var code = $target.data('targetcode');
 			
 			var dataItems = $("#table_select-human-grid").getGrid().dataItems().toJSON();
 
 			$.each(dataItems, function(index, obj) {
 				var $obj = $(obj)[0];
 				if ($obj.SELECTED == 'Y') {
 					if(!texts) {
 						texts = $obj[text];
 					} else {
 						texts = texts + "," + $obj[text];
 					}
 					if (!codes){
 						codes = $obj[code];
 					} else {
 						codes = codes + "," + $obj[code];
 					}
 				}
 			});

 		}else{
 			var checked = $('#table_select-human-grid').find('input[type="checkbox"][data-checked="Y"]:checked');
			if (!checked.size()) {
				alert('No selected!');
				return false;
			}else if(checked.size() > 1){
				alert('Select 1 only!');
				return false;
			}
			
			var text = $target.data('targettext');
			var code = $target.data('targetcode');
			
 			var dataItems = $("#table_select-human-grid").getGrid().dataItems().toJSON();

			$.each(dataItems, function(index, obj) {
				var $obj = $(obj)[0];
				if ($obj.SELECTED == 'Y') {
						texts = $obj[text];
						codes = $obj[code];
					
				}
			});
 			
 		}
 		

 		var $text = $('#' + $target.data('prev')).length > 0 ? $('#' + $target.data('prev')) :  $('[name="' + $target.data('prev')+'"]');
		var $code = $('#' + $target.data('next')).length > 0 ? $('#' + $target.data('next')) :  $('[name="' + $target.data('next')+'"]');
 			
	 		$text.val(texts).trigger('change');
	 		$code.val(codes).trigger('change');
	 		
			destroyDialogPopup($("#table_select-human-grid"));
			$('body').css('position', '');
 		
	}
	 
	$(document).ready(function() {
		$('body').css('position', 'fixed');
		$(document).on('click', '.btm_refresh', function() {
			$(this).closest('form').trigger('reset');
			$(this).closest('form').trigger('submit');
			return false;
		});	
	});
</script>
<div class="tit-wrap">
		<strong class="heading6">Select permission</strong>
</div>
<div id="select-human-dialog" class="dlg_main_content"> 
	<a2m:searchbox script="drawgrid" formId="searchForm" initenable="true" pagingable="false"> 
		<table class="search_tbl">
			<caption><spring:message code="sys.sys_0201.list.label.Search"/></caption>
			
			<tbody>
				<tr>
					<td colspan="2">
						<div class="inp_inline">
							<label for="SE_USER_NM"><spring:message code="sys.sys_0201.list.label.rolename"/></label> 
							<input type="text" id="ROLE_NM" name="ROLE_NM" class="w100px">
							
						</div>
					</td>
					
				</tr>
			</tbody>
		</table> 
	</a2m:searchbox>
	
	<div id="select-human-grid" style="width:100%;"></div>
</div>