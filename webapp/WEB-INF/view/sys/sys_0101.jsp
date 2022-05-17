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
		url: CTX + '/sys/sys_0101/getAllCode.ajax',
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
			{name:'<spring:message code='sys.sys_0101.list.title.type' />', id :'TYPE', width:120, align:'center'},
			{name:'<spring:message code='sys.sys_0101.list.title.name'/>', id :'NAME', width:200,  align:'center'},
			{name:'<spring:message code='sys.sys_0101.list.title.description' />', id :'DESCRPT', width:220,  align:'center'},
			{name:'<spring:message code='sys.sys_0101.list.title.date' />', id :'INS_DT', width:220, align:'center'},	

		],
		defaultOptions: {width:180, sortable:true},
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
			{button:'import', func:'importExel',  classes : 'btn-style btn-style2',  label:'<spring:message code='sys.sys_0101.importEx' />'},
			{button:'addd', func:'addCode',  classes : 'btn-style btn-style1 float-right',  label:'<spring:message code="button.register"/>'},
			
		]
	});
	$('.search_tbl').closest('form').find('.btm_refresh').removeClass('ac_click submit');
	return false;
};

// form submit 후 처리
function saveCallbackFunc(form, data){
	// 그리드 reflesh
	drawgrid();
} 
function importExel(){
	var type="CODE";
	var url = CTX+'/sys/sys_0101/importExel/form.tab?TYPE='+type;
	var param = {};		
	var success = function(html){
			};
	var ajax = new AjaxAccess();
	ajax.loadingHTML(url, $('#detail-content'), param, success, "");
	//openPopupByUrl(url);
}
function showAlarm(rowId, target, e){
	var rowData = $('#table_grid').getRowData(rowId);
	var type = rowData['TYPE'];
	var code = rowData['CODE'];
	if(type=='Alarm code'){
		var url = CTX+'/sys/sys_0101/02?WT_ALARM_GR_ID='+code+'&GROUP_NM='+rowData['NAME'];
// 		var param = {};		
// 		var success = function(html){
// 				};
// 		var ajax = new AjaxAccess();
// 		ajax.loadingHTML(url, $('#detail-content'), param, success, "");
		window.location.href = url;
	}else if(type=='Basic code'){
		var type = "CODE"
		var url = CTX+'/sys/sys_0101/listdetailBasic/form.tab?CODE='+code+"&TYPE="+type;
		var param = {};		
		var success = function(html){
				};
		var ajax = new AjaxAccess();
		ajax.loadingHTML(url, $('#detail-content'), param, success, "");
	}else if(type=='Maintenance code'){
		var url = CTX+'/sys/sys_0101/listdetailMainten/form.tab';
		var param = {};		
		var success = function(html){
				};
		var ajax = new AjaxAccess();
		ajax.loadingHTML(url, $('#detail-content'), param, success, "");
	}else{
		var url = CTX+'/sys/sys_0101/listdetailPart/form.tab';
		var param = {};		
		var success = function(html){
				};
		var ajax = new AjaxAccess();
		ajax.loadingHTML(url, $('#detail-content'), param, success, "");
	}
}
function addCode() {
		var url = CTX+'/sys/sys_0101/createCommon/form.tab';
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
	    
	      <span class="txt">${navimenu.SUBMENU.SUBMENU.MENU_NM}</span>
	      <!-- <span class="version">V47</span> -->
	    </h2>
	    <ul class="location">
	      <li>${navimenu.SUBMENU.MENU_NM}</li>
	      <li class="bold">${navimenu.SUBMENU.SUBMENU.MENU_NM}</li>
	    </ul>
	  </div>

	<a2m:searchbox script="drawgrid" formId="searchForm" initenable="true">
		<li><span class="detail-search-keyword"> <spring:message code='sys.sys_0101.list.title.type' />
		</span>
			<div class="registration-write registration-write-select">
				<div class="input-group-wrapper">
					<div class="select-box">
						<label for="CLS_CD"></label> 
						<select id="search_type" name="search.TYPE" class="info-select">
							<option value="001"><spring:message code='sys.sys_0101.list.Comm' /></option>
							<option value="002"><spring:message code='sys.sys_0101.list.MaintenCd' /></option>
							<option value="003"><spring:message code='sys.sys_0101.list.partCd' /></option>
							<option value="004"><spring:message code='sys.sys_0101.list.title.alarmCode' /></option>
						</select>
					</div>
				</div>
			</div>
		</li>
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
