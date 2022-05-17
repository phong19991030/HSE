<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript">
var drawgrid = function(formId,data){

	var number = $('#page-size').val();
	number = number? number: 10;
	
	var mydata = data;
	$('#grid').setViewGrid({
		id: 'grid',
		type:'crud',
		pinHeader: false,  
		url: CTX + '/sys/sys_0103/getAllCode.ajax',
		param: formId,
		localData: mydata,
		data: mydata,  
		modelName: 'RESULTLIST', 
		gridOptions: {
			caption:'<spring:message code='sys.sys_0101.list' />',
			loadonce:true,
			rownumbersDESC: true,
			gridPaginationLength: 500,
			pageable : true,
// 			height: 570
			pageSize: number
		},
		colModels: 
		[

// 			{name:'<spring:message code='sys.sys_0101.list.title.type' />', id :'TYPE', width:120, align:'center'},
			{name:'<spring:message code='sys.sys_0101.list.title.name'/>', id :'NAME', width:180,  align:'center'},
			{name:'', id :'CODE', width:200, hidden: true},
			{name:'<spring:message code='sys.sys_0101.list.title.description' />', id :'DESCRPT', width:240,  align:'center'},
			{name:'<spring:message code='sys.sys_0101.list.title.date' />', id :'INS_DT', width:150, align:'center'},	
			{name:'<spring:message code='sys.sys_0101.list.title.insertUser' />', id :'USER_ID', width:100, align:'center'},
			{name:'Number of alarms', id :'COUNT_ALARM', width:100, align:'center'},

// 			{name:'<spring:message code='sys.sys_0501.insertUser' />', id :'USER_MN', width:220, align:'center'},	
// 	   		{name:'', id:'DELETE_ACTION', template:'<button onclick="deleteAlarmCode(event)" class="delete-btn"><i class="xi-trash"></i></button>', width:50},
   	   		{
			name : '<spring:message code="sys.sys_0204.list.label.detail"/>', template: '<span class="detail-btn ac_click link" onclick="editAlarm(event)"  ><i class="xi-document"></i></span>',
			
			id : 'edit',
			width: 50,
			}
		],
		defaultOptions: {width:180, sortable:false},
		events: [
			{
				event: 'click',
				funcName: 'showAlarm'
			}
		],
		colspan: [],
		rowspan: [], 
		colGroup: [],
		btn: [
			'${navimenu.SUBMENU.SUBMENU.SUBMENU.WRT_YN}' == 'Y'? {button:'addd', func:'addCode',  classes : 'btn-style btn-style1 float-right',  label:'<spring:message code="button.register"/>'}:'',
// 			{button:'', func:'deleteCode',  classes : 'btn-style btn-style3 float-right',  label:'<spring:message code="button.delete"/>'},
// 			{button:'import', func:'importExel',  classes : 'btn-style btn-style1 float-right',  label:'<spring:message code='sys.sys_0101.importEx' />'},

		]
	});
	$('.search_tbl').closest('form').find('.btm_refresh').removeClass('ac_click submit');
	return false;
};

function link_comm(cellValue, options, rowObject) {
 	var type = options['field'];
	var row = options['model'];
	var rowid = row['uid'];
	var role_id = row['ROLE_ID'];
	var role_nm = row['ROLE_NM'];
	var rmk = row['RMK'];
	
	if(type=='edit'){
		return '<strong class="th-tit display-title">Grant</strong><span class= "detail-btn ac_click link" data-func="editAlarm" data-rowid="'+
		rowid+'" data-role_id="'+role_id+'" data-role_nm="'+role_nm+' " data-rmk="'+rmk+'"><i class="xi-document"></i>' +'</span>';		

	}	
}


// form submit 후 처리
function saveCallbackFunc(form, data){
	// 그리드 reflesh
	drawgrid();
} 
function deleteAlarmCode(event){
	event.preventDefault();
	
	var url =CTX+'/sys/sys_0103/deleteGrAlarmCd.ajax';
	var data = {};
	data['CODE'] = $(e.target).closest('tr').find('input[name="CODE"]').val();
	if(!data['CODE']){
		return false
	}
	 if(confirm('<spring:message code='message.confirmDelete' />')){	
	$.ajax({
		url :url,// CTX+ url, )
		data : $.extend({
			'type' : 'dialog'
			,'cls' : ''
		}, data),
		cache : false,
		success : function(data, textStatus, jqXHR) {
			if(data == true || data == 'true'){
				alert('<spring:message code='message.deletedSuccess' />')
			}else if(data == 'hasChildren'){
				alert('This menu has children!');
			}else{
				alert('<spring:message code='message.deletedFailed' />');

			}
		}
	});
	 }
	 
  	event.stopPropagation();

}
function importExel(){
	var type="CODE";
	var url = CTX+'/sys/sys_0103/importExel/form.tab?CODE_TYPE=004&TYPE='+type;
	var param = {};		
	var success = function(html){
			};
	var ajax = new AjaxAccess();
	ajax.loadingHTML(url, $('#detail-content'), param, success, "");
	//openPopupByUrl(url);
}


function editAlarm(e) {
	e.preventDefault();
	var $trSelected = $(e.target).closest('tr');
	var rowData = $trSelected.getGrid().dataItem($trSelected);
	
	
	
	var type = rowData['TYPE'];
	var code = rowData['CODE'];
	var url = CTX+'/sys/sys_0103/02?WT_ALARM_GR_ID='+code+'&GROUP_NM='+rowData['NAME'];
	window.location.href = url;

	
	
// 	var url = CTX+'/sys/sys_0103/formdetail/form.part?WT_ALARM_GR_ID='+rowData["CODE"];	
// 	var success = function(html){
// 	};
// 	var ajax = new AjaxAccess();
// 	ajax.loadingHTML(url, $('#detail-content'), null, success, ""); 
// 	e.stopPropagation();
}

function showAlarm(rowId, target, e){
	var rowData = $('#table_grid').getRowData(rowId);
	
	var url = CTX+'/sys/sys_0103/formdetail/form.part?WT_ALARM_GR_ID='+rowData["CODE"];	
	var success = function(html){
	};
	var ajax = new AjaxAccess();
	ajax.loadingHTML(url, $('#detail-content'), null, success, ""); 
	e.stopPropagation();
	
// 	var type = rowData['TYPE'];
// 	var code = rowData['CODE'];
// 	var url = CTX+'/sys/sys_0103/02?WT_ALARM_GR_ID='+code+'&GROUP_NM='+rowData['NAME'];
// 	window.location.href = url;
	
	
// 	if(type=='Alarm code'){
// 		var url = CTX+'/sys/sys_0103/02?WT_ALARM_GR_ID='+code+'&GROUP_NM='+rowData['NAME'];
// 		window.location.href = url;
// 	}else if(type=='Basic code'){
// 		var type = "CODE"
// 		var url = CTX+'/sys/sys_0103/listdetailBasic/form.tab?CODE='+code+"&TYPE="+type;
// 		var param = {};		
// 		var success = function(html){
// 				};
// 		var ajax = new AjaxAccess();
// 		ajax.loadingHTML(url, $('#detail-content'), param, success, "");
// 	}else if(type=='Maintenance code'){
// 		var url = CTX+'/sys/sys_0103/listdetailMainten/form.tab';
// 		var param = {};		
// 		var success = function(html){
// 				};
// 		var ajax = new AjaxAccess();
// 		ajax.loadingHTML(url, $('#detail-content'), param, success, "");
// 	}else{
// 		var url = CTX+'/sys/sys_0103/listdetailPart/form.tab';
// 		var param = {};		
// 		var success = function(html){
// 				};
// 		var ajax = new AjaxAccess();
// 		ajax.loadingHTML(url, $('#detail-content'), param, success, "");
// 	}
}
function addCode() {
		var url = CTX+'/sys/sys_0103/createCommon/form.tab';
		var param = {};		
		var success = function(html){
				};
		var ajax = new AjaxAccess();
		ajax.loadingHTML(url, $('#detail-content'), param, success, "");
 }
function parent_disable() {
	 if(popupWindow && !popupWindow.closed)
	 	popupWindow.focus();
}
// 조회 - search_box 전송
function doSubmit() {
	$('.form_search_box#drawgrid').trigger('submit');
} 

// [search_box] 전체 Reset
function searchBoxReset() {
 	$('.form_search_box#drawgrid').each(function() {  
        this.reset();  
    });  
 	doSubmit();
}
 
var saveWithChk = function(obj) {
	obj.parents('form').submit();
}
$(document).ready(function(){	
	$(document).on('click', '.btm_refresh', function() {
		$(this).closest('form').trigger('reset');
		$(this).closest('form').trigger('submit');
		return false;
	});

});
</script>


<div class="container system-wrap system-wrap1">
      <div class="tit-wrap">
	    <h2 class="heading3">
	    
	      <span class="txt">${navimenu.SUBMENU.SUBMENU.SUBMENU.MENU_NM}</span>
	      <!-- <span class="version">V47</span> -->
	    </h2>
	    <ul class="location">
	      <li>${navimenu.SUBMENU.MENU_NM}</li>
	      <li class="bold">${navimenu.SUBMENU.SUBMENU.MENU_NM}</li>
	      <li class="bold">${navimenu.SUBMENU.SUBMENU.SUBMENU.MENU_NM}</li>
	      
	    </ul>
	  </div>
      <!--//tit-wrap-->

	<a2m:searchbox script="drawgrid" formId="searchForm" initenable="true">
	
		<li><span class="detail-search-keyword"><spring:message	code='sys.sys_0101.list.title.name' /></span>
			<div class="input-group">
				<label for="search_NAME" class="sr-only"><spring:message code='sys.sys_0101.list.title.name' /></label> 
				<input type="text" id="search_NAME" name="search.NAME" value="">
			</div>
		</li>
	</a2m:searchbox>

	<form:form action="${formPath }/save01.ajax" id="saveForm" data-func="saveAjax" data-callback="saveCallbackFunc">
		<div id="grid" style="width: 100%;"></div>
	</form:form>

</div>
