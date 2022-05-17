<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script type="text/javascript">
/* 
 * <메뉴관리>
 *  그리드
 * - attrType은 gridContor에서 참고 (세부내용은 domCreator)
 */
 
 var mapYesNo = [{"DATA":"Y","LABEL":'<spring:message code="title.option.Y"/>'},{"DATA":"N","LABEL":'<spring:message code="title.option.N"/>'}];
var drawgrid = function(formId, data){
	 

		
	var mydata = data;
	$('#grid').setViewGrid({
		id:'grid',
		type:'crud',
		//defaultAttrType:'readonlyText',
		displayState:false, // CRUD 상태표시창 show/hide 여부
		pinHeader :false, // 컬럼고정
		url:CTX+'/sys/sys_0203/getData01.ajax', 
		param : formId ,
		localData: mydata,
		modelName : 'RESULTLIST', 
		gridOptions : {
			caption: '메뉴관리',
			loadonce:true,
			selectOne: true,
// 			rownumbersDESC: true,
// 			height: 710
// 			pageSize: 10,
//             pageable: true
		}, // height:750,	
		colModels : [	              
			{name: '', id: 'SELECTED', attrType: 'radio', typeValue: [ { LABEL: '사용', DATA: 'Y' }, { LABEL: '미사용', DATA: 'N' } ], width: 30},
   	   		{name:'<spring:message code="sys.sys_0203.list.label.menunm"/>', id :'MENU_NM', align:'left', width:260, attrType:'text'},	// frozen:true 
 	   		{name:'<spring:message code="sys.sys_0203.list.label.menunmen"/>', id :'MENU_NM_ENG', attrType:'text'},		
   	   		{name:'<spring:message code="sys.sys_0203.list.label.menuid"/>', id :'MENU_ID', align:'left', width:120, attrType:'readonlytext'}, // attrType:'readonlytext'
	 		{name:'<spring:message code="sys.sys_0203.list.label.url"/>', id :'LINK_PATH',  attrType:'text'},
	
   	   		{name:'<spring:message code="sys.sys_0203.list.label.useryn"/>', id :'USE_YN', width:90, attrType:'select',typeOption:{codefield:'USE_YN'}, typeValue: jQuery.parseJSON(JSON.stringify(mapYesNo))},
	   		{name:'<spring:message code="sys.sys_0203.list.label.topmenu"/>', id :'UP_MENU_ID', attrType:'readonlytext', align:'left', width:120},
	   		{name:'<spring:message code="sys.sys_0203.list.label.order"/>', id :'ORD_NO', attrType:'text', width:50},
	   		{name:'<spring:message code="sys.sys_0203.list.label.lev"/>', id :'LEV', attrType:'text', width:50},
	   		'${navimenu.SUBMENU.SUBMENU.WRT_YN}' == 'Y'? {name:'', id:'DELETE_ACTION', template:'<a onclick="deleteMenu(event)" class="delete-btn"><i class="xi-trash"></i></a>', width:50}:{name:'', id:'DELETE_ACTION', template:'<a></a>', width:50},
	   		{name:'CLS_CD', id :'CLS_CD', attrType:'readonlytext', width:50, hidden:true},
	   		{name:'MENU_TP', id :'MENU_TP', hidden:true},
	   		{name:'RMK', id :'MENU_TP', hidden:true},
	   		{name:'INS_ID', id :'INS_ID', hidden:true},
	   		{name:'INS_DT', id :'INS_DT', hidden:true},
	   		{name:'UPT_ID', id :'UPT_ID', hidden:true},
	   		{name:'UPT_DT', id :'UPT_DT', hidden:true} 
   	   	],
    	callback :'callbackGrid',
		treeview: {
			viewField:'MENU_NM', 		// 적용될 필드
			levField:'LEV', 			// LEVEL 필드
			codeField:'MENU_ID', 		// 주코드
			pcodeField:'UP_MENU_ID'		// 부모코드
		},
		defaultOptions:{ align:'center', width:100, title:false, sortable:false},
		// 버튼
		btn:[
		     //{button:'add', func:'addRow', type:'inline', 'classes':'', label:'추가'},
// 			 {button:'deletes', func:'deleteRow', classes : 'btn-style btn-style1', type:'inline',  label:'Delete'},
			 '${navimenu.SUBMENU.SUBMENU.WRT_YN}' == 'Y'?{button:'', func:'addMenu', classes : 'btn-style btn-style1 float-right', label:'<spring:message code="button.register"/>'}:'',
			 '${navimenu.SUBMENU.SUBMENU.WRT_YN}' == 'Y'?{button:'', classes : 'btn-style btn-style1 float-right',func:'save', label:'Save'}:'',
			'${navimenu.SUBMENU.SUBMENU.EXC_DN_YN}' == 'Y'?{button:'', func:'excelFile', classes : 'btn-style btn-style2 float-right', type:'inline',  label:'Excel'}: '',


		],
		events:[{event:"dblclick", funcName:"editMenu"},
//  		events:[{event:"click", funcName:"editMenu"},
// 			{
// 			event: 'click',
// 			funcName: 'onClick'
// 		}
		]
	});
	
	return false;
};

function callbackGrid(){
	$('#table_grid tr.parent span.tnode > span').unbind('click');

}

function onClick(rowid, status, e) {
// 	var rowData = $('#table_grid').getRowData(rowid);
// 	rowData['SELECTED'] = rowData['SELECTED'] == 'N'? 'Y': 'N';					
		
// //		grind.dataSource(rowDatas);
// 		$('#table_grid').data("kendoGrid").refresh();
	} 

var addMenu = function(){
	
	var list = $('#table_grid').data("kendoGrid").dataSource.data()
	var arr = [];
	list.forEach(function(obj, i){
			if(obj['SELECTED'] == 'Y'){
				arr.push(obj);
			}
	});
	if(arr.length > 1){
		alert('Please select only 1 parent.');
		return false;
	}else if( arr.length == 0){
		alert('<spring:message code="menu.msg.noSelectedParent"/>');
		return false;
	}
	selectedItem = arr[0];
	if(selectedItem['LEV'] == 0 || selectedItem['LEV'] > 3){
		alert('This menu can not add a sub menu.');
		return false;
	}
// 	var selectedItem =  $('#table_grid').data("kendoGrid").dataItem( $('#table_grid').data("kendoGrid").select());
	
// 	if(!selectedItem){
// 		alert('<spring:message code="menu.msg.noSelectedParent"/>');
// 		return false;
// 	}
// 	console.log(selectedItem);
// 	var rowData = $('#table_grid').getRowData(rowid);
	var url =CTX+'/sys/sys_0203/01/form.part';
	//window.open(url, 'popup', 'width=900, height=800');
	var data = {};
	data['MENU_ID'] = selectedItem.MENU_ID;
	data['LEV'] = selectedItem.LEV;	
	data['MODE'] = 'ADD';
	
// 	var $target = generateDialogDom();
	
	$.ajax({
		url :url,// CTX+ url, )
		data : $.extend({
			'type' : 'dialog'
			,'cls' : ''
		}, data),
		cache : false,
		success : function(data, textStatus, jqXHR) {
			$('#detail-content').html(data);
		}
	});
	
};


var editMenu = function(rowid, status, e){
	var rowData = $('#table_grid').getRowData(rowid);
	var url =CTX+'/sys/sys_0203/01/form.part';
	//window.open(url, 'popup', 'width=900, height=800');
	var data = {};
	data['MENU_ID'] = rowData.MENU_ID;
	data['LEV'] = rowData.LEV;	
	data['MODE'] = 'EDIT';
	
// 	var $target = generateDialogDom();
	
// 	$.ajax({
// 		url :url,// CTX+ url, )
// 		data : $.extend({
// 			'type' : 'dialog'
// 			,'cls' : ''
// 		}, data),
// 		cache : false,
// 		success : function(data, textStatus, jqXHR) {
// 			$('#detail-content').html(data);
// 		}
// 	});
	
// 	var url =  CTX + '/sys/sys_0303/01.part?NOTICE_ID=' + notice_id;
	

	var success = function(html){

	};
	
	var ajax = new AjaxAccess();
	ajax.loadingHTML(url, $('#detail-content'), data, success, "");	
	
	
};

//***********************************
//**** 그리드 이벤트
//***********************************

// form submit 후 처리
var saveCallbackFunc= function(form, data){
	// 그리드 reload
	//$("#table_grid").jqGrid('setGridParam',{datatype:'json', page:1, postData:{}}).trigger("reloadGrid");
	drawgrid();
};

$(document).ready(function(){
	drawgrid();
	
// 	$('#grid')

});

function excelFile() {
	window.location.href = CTX + '/sys/sys_0203/excelFile.ajax';
}

function deleteMenu(e){
	
	
	
	var url =CTX+'/sys/sys_0203/01/delete01.ajax';
	var data = {};
	data['MENU_ID'] = $(e.target).closest('tr').find('input[name="MENU_ID"]').val();
	if(!data['MENU_ID']){
		return false
	}
	
	
	var list = $('#table_grid').data("kendoGrid").dataSource.data()
	var arr = [];
	list.forEach(function(obj, i){
			if(obj['MENU_ID'] != data['MENU_ID'] && obj['MENU_ID'].indexOf(data['MENU_ID'])>-1){
				arr.push(obj);
			}
	});
	
	var msgConfirm = arr.length>0? 'This menu has sub menus. Would you want sure to delete all of them? ' : _MESSAGE.common.deleteConfirm
	
	 if(confirm(msgConfirm)){	
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
				drawgrid();
			}else if(data == 'hasChildren'){
				alert('<spring:message code='sys.sys_0203.list.hasChildren' />');
			}else{
				alert('<spring:message code='message.deletedFailed' />');

			}
		}
	});
	 }

}

</script>
<!-- <div class="white_bar"></div> -->

 
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


	
	<form:form action="${formPath }/save01.ajax" id="menuForm" data-func="saveAjax"  data-callback="saveCallbackFunc">
		<div id="grid"> </div>
	</form:form>
</div>


