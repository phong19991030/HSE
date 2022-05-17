<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<%--==============================================================
 * Notice list(공지사항 목록)
 * @author		: yjkim
 * @since		: 2019.09.30
 * @Modification Information
 *　Date　　　　　　Name　　　　　 Desc.
 *　──────────　　  ──────────　　 ──────────
 *　2019.00.00　　  Yunju Kim　　　-
===============================================================--%>
<style>
.active_1{
	padding: 4px;
	background: #455eee;
	color: #fff;
	border-radius: 2px;
}
.active_0{
	padding: 4px;
	background: #a5a5a5;
	color: #fff;
	border-radius: 2px;
}
</style>
<script>
var drawgrid = function(formId, data) {

	var number = $('#page-size').val();
	number = number? number: 10;
	
	
	$('#grid').setViewGrid({
		id: formId,
		cid:'${cid}', 
// 		displayState: true,
		url: CTX + '/sys/sys_0303/getNoticeList.ajax',
		param: formId,
		localData: data,
		modelName: 'RESULTLIST',
		gridOptions: { 
			caption: 'Notice List'
					 , loadonce: true
					 , rownumbers: false
// 		             , height: 450
					 , pageSize: 10
// 					 , gridPaginationLength:100
					 , pageable:true },
		colModels: [
			{name: '', id: 'SELECTED', attrType: 'checkbox', typeValue: [ { LABEL: '사용', DATA: 'Y' }, { LABEL: '미사용', DATA: 'N' } ], width: 30},
// 			{ name: 'No', 		  id :'RNUM',                 width : 80 },
			{ name: 'ID', 		  id :'NOTICE_ID', 	  hidden: 'true' },
			{ name: 'CONTENT', 		  id :'NOTICE_CONT', 	  hidden: 'true' },
			{ name: '<spring:message code="title.notice.title"/>', 	  id :'NOTICE_TIT',   width : 300 , align: 'left' },
			{ name: '<spring:message code="title.event.INS_DT"/>',  	  width : 200 ,  id :'INS_DT' },
			{ name: 'Writer_UID', id :'INS_USER_UID', hidden: 'true' },
			{ name: 'Writer_UID', id :'INS_USER_UID', hidden: 'true' },
			{ name: '<spring:message code="sys.sys_0303.attachment"/>',  width : 100 ,		attrType:{'func':'attach_file'}, id : 'ATTACH', width: 100 },
			{ name: '<spring:message code="title.notice.writer"/>',  width : 200 ,	  id :'USER_NM' },
			{ name: '<spring:message code="common.grid.status"/>',  width : 100 , id :'STATUS', attrType:{'func':'display_status'},},
			{ name: '<spring:message code="sys.sys_0101.list.title.detail"/>',  width : 100 , hidden: true,	attrType:{'func':'updateNotice'}, id : 'DETAIL', width: 50 },
// 			{ name: '<spring:message code="sys.sys_0101.list.title.detail"/>',  width : 100 ,		attrType:{'func':'previewNotice'}, id : '', width: 50 },

			],
		defaultOptions: { align: 'center', width: 50, sortable: false },
		
		events : [
			{ event : 'click', funcName : 'viewNotice' }
		],
      	
		colspan: [],
		rowspan: [],
		
		btn: [
			'${navimenu.SUBMENU.SUBMENU.WRT_YN}' == 'Y'? { button:'', func:'addNotice',  classes : 'btn-style btn-style1 float-right', label:'<spring:message code="button.register"/>' }: '',
					'${navimenu.SUBMENU.SUBMENU.WRT_YN}' == 'Y'? {button:'', classes : 'btn-style btn-style3 float-right', func:'deleteNotices', label:'<spring:message code="button.delete"/>'}: '',
					]
	});
	return false;
}

/* function onChangeEv(obj, obj2, obj3, obj4, obj5, obj6){
//	var id = $(obj5.target).closest('tr').find('td[col="FARM_ID"]').html();
var $td = $(obj5.target).closest('td');
if($td.attr('data-col') == 'SELECTED'){
	return false;
}
	var $tr = $td.closest('tr')
	var rowData = $('#grid').getGrid().dataItem($tr);
	var notice_id = rowData.NOTICE_ID;
	if(!notice_id){
		return false;
	}
	
	var url =  CTX + '/sys/sys_0303/01.part?NOTICE_ID=' + notice_id;
	var success = function(html){
	};
	var ajax = new AjaxAccess();
	ajax.loadingHTML(url, $('#detail-content'), null, success, "");	
	
// 	e.stopPropagation();
	
} */

function deleteNotices(){
	 var data = $("#table_searchForm").getDataSource().data();
	 var list = [];
	 var param = {}
	 var listID = '';
	 data.forEach(function(obj, i){
		 if(obj['SELECTED'] == 'Y'){
			 list.push(obj);
			 listID += (obj['NOTICE_ID']+ '-');
		 }
	 })
	 if(list.length <= 0){
		 alert('Please select one or more notices.');
		 return false;
	 }
	 listID  = listID.slice(0, -1); 
	 param = {'ID': listID};

	    if(confirm(_MESSAGE.common.deleteConfirm)) {
	        $.ajax({
	            url: CTX + "/sys/sys_0303/delete02.ajax",
	            type: 'post',
	        	data : param,
	        	cache : false,
	            success: function(data, textStatus, jqXHR) {
	                if(data == "true"){
	                    //alert('<spring:message code='message.deletedSuccess' />');
	                    alert(_MESSAGE.common.deleteSuccess);
	             		drawgrid();
	                }else{
	                    //alert('<spring:message code='message.deletedFailed' />');
	                    alert(_MESSAGE.common.deleteFail);

	                }
	            },complete: function(){
	                return true;
	            },error : function(){
	                //alert('<spring:message code='message.deletedFailed' />');
	                return false;
	            }
	        });

	    }
	 
}

function display_status(cellValue, options, rowObject) {
	var type = options['field'];
	var row = options['model'];
	var rowid = row['uid'];
	var status = row['STATUS'];
	var activeMsg = '<spring:message code="sys.sys_0303.active_1"/>';
	var inactiveMsg = '<spring:message code="sys.sys_0303.active_0"/>';
	if(status==1){
		return '<span class="active_'+status+'" >'+activeMsg+'</span>';		
	}else{
			return '<span class="active_'+status+'" >'+inactiveMsg+'</span>';		
		
	}
}

function updateNotice(cellValue, options, rowObject) {
	var type = options['field'];
	var row = options['model'];
	var rowid = row['uid'];
	var id = row['NOTICE_ID'];
		if (!id){
			return false;		
		}else{
			return '<strong class="th-tit display-title">Grant</strong><span class= "detail-btn ac_click link" onclick="detailCom(event)" data-rowid="'+
			rowid+'" ><i class="xi-document"></i>' +'</span>';
		}
}

/* function previewNotice(cellValue, options, rowObject) {
	var type = options['field'];
	var row = options['model'];
	var rowid = row['uid'];
	var id = row['NOTICE_ID'];
		if (!id){
			return false;		
		}else{
			return '<strong class="th-tit display-title">Grant</strong><span class= "detail-btn ac_click link" notice-id="'+id+'" onclick="viewNotice(event)" data-rowid="'+
			rowid+'" ><i class="xi-search"></i>' +'</span>';
		}
} */



function viewNotice(rowid, obj2, obj3, obj4, obj5, obj6){
	var $td = $(obj5.target).closest('td');
	if($td.attr('data-col') == 'SELECTED'){
		return false;
	}
		var $tr = $td.closest('tr')
		var rowData = $('#grid').getGrid().dataItem($tr);
		var id = rowData.NOTICE_ID;	if(id){
		var url = CTX+'/sys/sys_0303/formdetail?NOTICE_ID='+id;
		window.location.href = url;
	}
}

// function onClick(rowid, target, callback, obj) {
// 	var notice_id;
	
// 	if ($(obj)) {
// 		var $trSelected = $(obj);
// 		var rowData = $trSelected.getGrid().dataItem($trSelected);
// 		var notice_id = rowData["NOTICE_ID"];
		
// 		var url = CTX+'/sys/sys_0303/formdetail?NOTICE_ID='+notice_id;
// 		window.location.href = url;

// /* 		var success = function(html){
// 		};
// 		var ajax = new AjaxAccess();
// 		ajax.loadingHTML(url, $('#detail-content'), null, success, ""); 
//  */		
// 	}
// }


function detailCom(e) {
	e.preventDefault();
	
	var rowId = $(e.target).closest('span').attr('data-rowid');
	var rowData = $('#grid').getRowData(rowId);
	var notice_id = rowData.NOTICE_ID;
	if(!notice_id){
		return false;
	}
	
	var url =  CTX + '/sys/sys_0303/01.part?NOTICE_ID=' + notice_id;
	var success = function(html){
	};
	var ajax = new AjaxAccess();
	ajax.loadingHTML(url, $('#detail-content'), null, success, "");	
	
	e.stopPropagation();

}


// 첨부파일 클릭
function attach_file(cellValue, options, rowObject) {
	var type = options['field'];
	var row = options['model'];
	var rowid = row['uid'];
	var fileName = row['NEW_FLE_NM'];
	if(type=='ATTACH'){
		if (!fileName){
			return '';		
		}else{
			return '<span id="'+rowid+'" class="ac_click link" data-rowid="'+rowid+'" file-name="'+fileName+'" onclick="downloadFile(event)"><a><i class="xi-download"></i></a></span>';		
		}
	}
}

function downloadFile(e){
	e.preventDefault();
	var fileName =  $(e.target).closest('span').attr('file-name');
	if(!fileName) return false;
	var arr = [];
	arr = fileName.split('.');
	window.location.href = CTX + '/util/upload/downloadFile?fileName='+arr[0]+ '&extension='+arr[1];
	e.stopPropagation();

}

function downloadTemplate(){

}


// grid 내 한 행 클릭 시


function addNotice() {
	// 공지사항 등록 화면으로 이동
var url =  CTX + '/sys/sys_0303/01.part';
	var success = function(html){
		  noConflict();

	};
	var ajax = new AjaxAccess();
	ajax.loadingHTML(url, $('#detail-content'), null, success, "");
}

$(document).ready(function() {
// 	drawgrid();

	if ('${USER_ROLE}' != 'ADMIN') {
		$('#button__drawgrid').hide();
		
	}
});
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

	<a2m:searchbox formId="searchForm" script="drawgrid" initenable="true"> 
			<li>
	            <span class="detail-search-keyword"><spring:message code="title.notice.title"/></span>
	            <div class="input-group">
	              <label for="search_code" class="sr-only"><spring:message code="title.notice.title"/></label>
	              <input type="text" id="search_code" name="search.ROLE_ID" value="">
	            </div>
	          </li>
	           <li>
	            <span class="detail-search-keyword"><spring:message code="title.notice.contents"/></span>
	            <div class="input-group">
	              <label for="search_content" class="sr-only"><spring:message code="title.notice.contents"/></label>
	              <input type="text" id="search_content" name="search.NOTICE_CONT" value="">
	            </div>
	          </li>
</a2m:searchbox>

<div id="grid" style="width: 100%;"></div>
</div>