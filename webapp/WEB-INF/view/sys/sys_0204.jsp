<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

    <%@ include file="/WEB-INF/_include/taglib.jsp"%>


<script type="text/javascript">
/**
 * Role 관리
 */   
function callBackAddRole(){
		drawgrid();
	}
var drawgrid = function(formId,data){
	

	var number = $('#page-size').val();
	number = number? number: 10;
	
	
	var mydata = data;
	$('#grid').setViewGrid({
		id:'grid',
		cid:'${cid}',
		//defaultAttrType:'readonlyText',
		displayState : false,	// CRUD display여부
		pinHeader : false, 		// 컬럼고정
		url:CTX+'/sys/sys_0204/getRoleMgt.ajax', 
		param : formId ,
 		localData: mydata, 
		modelName : 'RESULTLIST', 
		gridOptions: {
			//caption: '<spring:message code="sys.sys_0204.list.caption"/>',
			caption: ' ',
			loadonce: true, 
			rownumbersDESC: true,
			gridPaginationLength: 500, 
// 			height: 800
			pageSize: number,
            pageable: true
			},
		colModels : [	             
     	    {name:'<spring:message code="sys.sys_0204.list.label.code"/>' ,id :'ROLE_ID',align: 'center', width:100 },
   	   		{name:'<spring:message code="sys.sys_0204.list.label.name"/>' ,id :'ROLE_NM', align: 'center',width:200},
   	   		{name:'<spring:message code="sys.sys_0204.list.label.des"/>' ,id :'RMK', align: 'center',width:200},
   	   		{name:'<spring:message code="sys.sys_0204.list.label.regisdt"/>' ,id :'INS_DT', align: 'center',width:200},
   	   		{
			name : 'Grant',attrType:{'func':'link_comm'},
			id : 'COMM_Detail',
			width: 50,
			}
   	   	], 
   	 	callback: 'drawGridCallback',
   		colspan: [],
    	rowspan: [],
     	defaultOptions: {width: 100, sortable: true},
    	 events: [{
			event: 'click',
			funcName: 'editDocument'
		}],
		btn:[
			'${navimenu.SUBMENU.SUBMENU.WRT_YN}' == 'Y'? {button:'',func:'addRow', classes : 'btn-style btn-style1', label:'<spring:message code="button.register"/>'}: '',	
		]
	});

	$('.search_tbl').closest('form').find('.btm_refresh').removeClass('ac_click submit');
	return false;
}; 

function saveCallbackFunc(form, data) {

    drawgrid();
}
function link_comm(cellValue, options, rowObject) {
 	var type = options['field'];
	var row = options['model'];
	var rowid = row['uid'];
	var role_id = row['ROLE_ID'];
	var role_nm = row['ROLE_NM'];
	var rmk = row['RMK'];
	
	if(type=='COMM_Detail'){
		return '<strong class="th-tit display-title">Grant</strong><span class= "detail-btn ac_click link" data-func="detailCom" data-rowid="'+
		rowid+'" data-role_id="'+role_id+'" data-role_nm="'+role_nm+' " data-rmk="'+rmk+'"><i class="xi-document"></i>' +'</span>';		

	}	
}


function drawGridCallback(){
			 $('#table_grid').parent().find('#button_delete_grid').hide(); 
}

function addRow() {
	 var crud="C";
	//$(location).attr('href', CTX + '/sys/sys_0204/01?CRUD='+crud);
	var url = CTX+'/sys/sys_0204/form.part?CRUD='+crud;
	var success = function(html){
	};
	var ajax = new AjaxAccess();
	ajax.loadingHTML(url, $('#detail-content'), null, success, ""); 	
}
function parent_disable() {
	 if(popupWindow && !popupWindow.closed)
	 	popupWindow.focus();
}

function editDocument(rowid, target, obj3, obj4, obj5, obj6) {
 	var val = $(obj5.target).html();
 	var code = $(val).attr('data-id');
	var lev = $(val).attr('data-lev');
	var colObj = $(obj6).data();
	var col = colObj['col'];
	
	if(col =='ROLE_ID' || col=='ROLE_NM' || col=='RMK' || col=='INS_DT'){
		var crud="U";
		var rowData = $('#table_grid').getRowData(rowid);
		var isUndo = '';
		if(rowData.IS_UNDO != undefined) {
			isUndo = rowData.IS_UNDO;
		}
		var url = CTX+'/sys/sys_0204/form.part?ROLE_ID='+rowData.ROLE_ID+"&ROLE_NM="+rowData.ROLE_NM+"&RMK="+rowData.RMK+"&CRUD="+crud;
		
		var success = function(html){
		};
		var ajax = new AjaxAccess();
		ajax.loadingHTML(url, $('#detail-content'), null, success, ""); 		
	}	
}

function detailCom(rowid, status, e) {
	var rowData = $('#table_grid').getRowData(rowid);
	var isUndo = '';
	if(rowData.IS_UNDO != undefined) {
		isUndo = rowData.IS_UNDO;
	}
	var url = CTX+'/sys/sys_0204/formdetail.part?ROLE_ID='+rowData.ROLE_ID;	
	var success = function(html){
	};
	var ajax = new AjaxAccess();
	ajax.loadingHTML(url, $('#detail-content'), null, success, ""); 
}

function openDetailWindow(url) {
	popupWindow = window.open(url,'_blank');
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
	  <!-- 발전기 등록테이블 -->
	  <!--tit-wrap-->

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
		  <!--//tit-wrap-->
	<a2m:searchbox formId="searchForm" script="drawgrid" initenable="true"> 
		<li>
	            <span class="detail-search-keyword"><spring:message code="sys.sys_0204.list.label.code"/></span>
	            <div class="input-group">
	              <label for="search_code" class="sr-only"><spring:message code="sys.sys_0204.list.label.code"/></label>
	              <input type="text" id="search_code" name="search.ROLE_ID" value="">
	            </div>
	          </li>
	           <li>
	            <span class="detail-search-keyword"><spring:message code="sys.sys_0204.list.label.name"/></span>
	            <div class="input-group">
	              <label for="search_name" class="sr-only"><spring:message code="sys.sys_0204.list.label.name"/></label>
	              <input type="text" id="search_name" name="search.ROLE_NM" value="">
	            </div>
	          </li>
	</a2m:searchbox>

	<div id="grid" style="width: 100%;"></div>


	
	  <!-- //발전기 등록테이블 -->
</div>