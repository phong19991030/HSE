<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<link rel="stylesheet" href="${ctxPath}/stylesheet/stnd/sys_code.css">
<script type="text/javascript" >
var alarmCd = '${WT_ALARM_GR_ID}';
var drawgrid5 = function(formId,data){
	var mydata = data;
	$('#grid5').setViewGrid({
		id: 'grid5',
		type:'crud',
		pinHeader: false,  
		url: CTX + '/sys/sys_0103/getAllDetailCode.ajax?WT_ALARM_GR_ID='+alarmCd,
		param: formId,
		localData: mydata,
		data: mydata,  
		modelName: 'RESULTLIST', 
		gridOptions: {
			caption:'<spring:message code='sys.sys_0101.list.Alarm' />',
			loadonce:true,
			rownumbersDESC: true,
			gridPaginationLength: 500,
			pageable : true,
			pageSize: 10
// 			height: 570
		},
		colModels: 
		[
			{name:'<spring:message code='sys.sys_0101.list.title.alarmCode' />', id :'ALARM_SUB_CD',  align:'center', 
				sortable: {
	                compare: function(a, b) {
	                    return parseInt(a['ALARM_SUB_CD']) - parseInt(b['ALARM_SUB_CD']);
	                }
	            }
			},
			{name:'<spring:message code='sys.sys_0101.list.title.alarmText' />', id :'ALARM_TXT', align:'center'},
			{name:'DOC_PATH', id :'DOC_PATH', hidden:true},
 			{name:'WT_ALARM_GR_ID', id :'WT_ALARM_GR_ID', hidden:true}, 
			{name:'WT_ALARM_ID', id :'WT_ALARM_ID', hidden:true}, 
			{name:'SUGGEST', id :'SUGGEST', hidden:true},
			{name:'DESCRPT', id :'DESCRPT', hidden:true},
            {
				name : '<spring:message code='sys.sys_0101.list.title.manual' />',attrType:{'func':'link'},
				id : 'DOWNLOAD',
				width: 70,

			},
            {
				name : '<spring:message code='button.modify' />',attrType:{'func':'link'},
				id : 'DETAIL',
				width: 70,

			},
// 			{name:'<spring:message code='sys.sys_0501.insertUser' />', id :'USER_NM', width: 100, align:'center'},

		],

		defaultOptions: {width:180, sortable: false},
		events: [
/* 			{
				event: 'dblclick',
				funcName: 'updateDetail'
			}	 */
		],
		colspan: [],
		rowspan: [], 
		colGroup: [],
		btn: [
			{button:'', func:'backToList', 'classes':'btn-style btn-style2', label:'Cancel'},

// 			{button:'deletes', func:'deleteDetail', 'classes':'', label:'Delete'},
// 			{button:'del', func:'deleteAlarmGroup', 'classes':'btn-style btn-style3', label:'<spring:message code='button.delete' />'},
					'${navimenu.SUBMENU.SUBMENU.SUBMENU.WRT_YN}' == 'Y'?{button:'addd', func:'addDetail', 'classes':'btn-style btn-style1 float-right', label:'<spring:message code="button.register"/>'}:'',
							'${navimenu.SUBMENU.SUBMENU.SUBMENU.WRT_YN}' == 'Y'?{button:'import', func:'importExel', 'classes':'btn-style btn-style1 float-right', label:'<spring:message code='sys.sys_0101.importEx' />'}:'',

		]
	});
	return false; // 화면 전환없음
};

function backToList(){
	window.location.href = '/sys/sys_0103/list';
}

function deleteAlarmGroup(){
	var url =CTX+'/sys/sys_0103/deleteGrAlarmCd.ajax';
	var data = {};
	data['WT_ALARM_GR_ID'] = alarmCd;
	if(!data['WT_ALARM_GR_ID']){
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
				alert('<spring:message code='message.deletedSuccess' />');
				window.location.href =CTX+ "/sys/sys_0103/list";
			}else if(data == 'hasChildren'){
				alert('This menu has children!');
			}else{
				alert('<spring:message code='message.deletedFailed' />');

			}
		}
	});
	 }
}

// form submit 후 처리
function saveCallbackFunc(form, data){
	// 그리드 reflesh
	drawgrid5();
} 
function importExel(){
	var type="DETAIL";
	var url = CTX+'/sys/sys_0103/importExel/form.tab?TYPE='+type+'&WT_ALARM_GR_ID='+alarmCd;
	var param = {};		
	var success = function(html){
			};
	var ajax = new AjaxAccess();
	ajax.loadingHTML(url, $('#detail-content'), param, success, "");
	//popupWindow = window.open(url, 'popup', 'width=' + (parseInt(window.innerWidth) * 0.4) + ',height=' + (parseInt(window.innerHeight) * 0.4));	
}

function addDetail() {
		var url = CTX+'/sys/sys_0103/adddDetailAlarm/form.tab?WT_ALARM_GR_ID='+alarmCd+'&CRUD='+"C";
		//popupWindow = window.open(url, 'popup', 'width=' + (parseInt(window.innerWidth) * 0.9) + ',height=' + (parseInt(window.innerHeight) * 0.9));	
		//$(location).attr('href',url);
		var param = {};		
		var success = function(html){
			noConflict();
				};
		var ajax = new AjaxAccess();
		ajax.loadingHTML(url, $('#detail-content'), param, success, "");
 }
function updateDetail(rowid, status, e) {
	var rowData = $('#table_grid5').getRowData(rowid);
	var local = CTX+'/sys/sys_0103/adddDetailAlarm/form.tab?WT_ALARM_GR_ID='+alarmCd+'&CRUD='+'U'+'&WT_ALARM_ID='+rowData.WT_ALARM_ID+'&ALARM_SUB_CD='+rowData.ALARM_SUB_CD;
	var param = '&SUGGEST='+rowData.SUGGEST+'&DESCRPT='+rowData.DESCRPT+'&ALARM_TXT='+rowData.ALARM_TXT+'&DOC_PATH='+rowData.DOC_PATH+'&FLE_NM='+rowData.FLE_NM;
	var url = local+param;
	//popupWindow = window.open(url, 'popup', 'width=' + (parseInt(window.innerWidth) * 0.9) + ',height=' + (parseInt(window.innerHeight) * 0.9));
	//$(location).attr('href',url);
	var param = {};		
	var success = function(html){
		noConflict();
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
 function downloadFile(obj){
	 var uid = $(obj.target).closest('tr').data().uid;
	 rowData = $('#table_grid5').data('kendoGrid').dataSource.getByUid(uid);

	 var path = rowData['FLE_PATH'];
	 if(path==''||path==null){
		 alert('<spring:message code='sys.sys_0101.alertNotfile' />');
	 }else{
		 var splitChar = '\\';
			if (path.indexOf('\\') > -1)
				splitChar = '\\';
			else if (path.indexOf('/') > -1) {
				splitChar = '/';
			}
			
			var arr = path.split(splitChar);
			const fileName = arr[arr.length - 1].split('.')[0];
			const extension = arr[arr.length - 1].split('.')[1];
			const dir = arr[arr.length - 2];
			window.location.href =CTX + '/util/upload/downloadFile?dir=' + dir + '&fileName=' + fileName + '&extension=' + extension;
			
	 }
 }
 function showDetail(obj){
	
	 if($(obj.target).hasClass('detail-btn')){
		 $target = $(obj.target);
	 }else{
		 $target = $(obj.target).closest('.detail-btn');
	 }
	 var rowId =  $target.data('rowid');
	 var rowData = $('#table_grid5').getRowData(rowId);
		var local = CTX+'/sys/sys_0103/adddDetailAlarm/form.tab?WT_ALARM_GR_ID='+alarmCd+'&CRUD='+'U'+'&WT_ALARM_ID='+rowData.WT_ALARM_ID+'&ALARM_SUB_CD='+rowData.ALARM_SUB_CD;
		var param = '&SUGGEST='+rowData.SUGGEST+'&DESCRPT='+rowData.DESCRPT+'&ALARM_TXT='+rowData.ALARM_TXT+'&DOC_PATH='+rowData.DOC_PATH+'&FLE_NM='+rowData.FLE_NM;
		var url = local+param;
		//popupWindow = window.open(url, 'popup', 'width=' + (parseInt(window.innerWidth) * 0.9) + ',height=' + (parseInt(window.innerHeight) * 0.9));
		//$(location).attr('href',url);
		var param = {};		
		var success = function(html){
			noConflict();
				};
		var ajax = new AjaxAccess();
		ajax.loadingHTML(url, $('#detail-content'), param, success, "");
 }
 function link(cellValue, options, rowObject){
	 
	var type = options['field'];
	var row = options['model'];
	var rowid = row['uid'];
		
	if(type=='DOWNLOAD'){
		if( row['FLE_PATH']==''||row['FLE_PATH']==null){
			return '';
		}else{
			return '<a onclick="downloadFile(event)" data-rowid="'+rowid+'" class="download-btn">			<i class="xi-download"></i>			</a>';
// 			return '<span class= "fa fa-download btn ac_click " data-func="downloadFile" data-rowid="'+rowid+'">' +'</span>';
		}
		
	}else if(type='DETAIL'){
// 		return '<span class= "detail-btn ac_click link " data-func="showDetail" data-rowid="'+rowid+'"><i class="xi-document"></i>' +'</span>';
		return '<a onclick="showDetail(event)" data-rowid="'+rowid+'" class="detail-btn">		<i class="xi-search"></i>		</a>'
// 	return '<span class= "btn_ico btxs_ico_search ac_click link " data-func="showDetail" data-rowid="'+rowid+'">' +'</span>';
	}
 }
 function cancelCode(){
		var url = CTX+'/sys/sys_0103/list';
		$(location).attr('href',url); 
}
</script>

<div class="container system-wrap system-wrap1">
	  <!-- 발전기 등록테이블 -->
	  <!--tit-wrap-->
	  
	  	  <div class="tit-wrap">
	    <h2 class="heading3">
	    
	      <span class="txt">${GROUP_NM}</span>
	      <!-- <span class="version">V47</span> -->
	    </h2>
	    <ul class="location">
	      <li>${navimenu.SUBMENU.MENU_NM}</li>
	      <li class="bold">${navimenu.SUBMENU.SUBMENU.MENU_NM}</li>
	      <li class="bold">${navimenu.SUBMENU.SUBMENU.SUBMENU.MENU_NM}</li>
<%-- 	      <li class="bold">${GROUP_NM}</li> --%>
	      
	    </ul>
	  </div>
	  

	<a2m:searchbox script="drawgrid5" formId="searchForm" initenable="true">

			<li>
	            <span class="detail-search-keyword"><spring:message code='sys.sys_0101.list.title.alarmCode' /></span>
	            <div class="input-group">
	              <label for="search_code" class="sr-only"><spring:message code='sys.sys_0101.list.title.alarmCode' /></label>
<!-- 	              <input type="text" id="search_code" name="search.ROLE_ID" value=""> -->
	              <input type="text" id="ALARM_SUB_CD" name="search.ALARM_SUB_CD" />
	            </div>
	          </li>
	          
			<li>
	            <span class="detail-search-keyword"><spring:message code='sys.sys_0101.list.title.alarmText' /></span>
	            <div class="input-group">
	              <label for="search_code" class="sr-only"><spring:message code='sys.sys_0101.list.title.alarmText' /></label>
<!-- 	              <input type="text" id="search_code" name="search.ROLE_ID" value=""> -->
	              <input type="text" id="ALARM_SUB_CD" name="search.ALARM_TXT" />
	            </div>
	          </li>
	</a2m:searchbox>

	
	<form:form action="${formPath }/save01.ajax" id="menuForm" data-func="saveAjax"  data-callback="saveCallbackFunc">
		<div id="grid5" style="width: 100%;"></div>
	</form:form>
</div>


