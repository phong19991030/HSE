<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript">
/* 
 * <공통코드관리 팝업>
 */
// 공통코드 내역
var popupDrawgrid1 = function(formId,data){
	$('#popupGrid1').setViewGrid({
		id:'popupGrid1',
		displayState : false,	// CURD display여부
		pinHeader : false, 		// 컬럼고정		
		url:CTX+'/common/popup/popupBusinessUnit/getDataList01.ajax',
		//url:CTX+'${param.data_url}',
		param : formId,  
		localData: data,  
		modelName : 'RESULTLIST',
		gridOptions : { height: 420, sortable:false, caption: '검색결과', loadonce:true, rownumbers:false},
		colModels : [
   	   		{name: '<spring:message code="dbm.dbm0601.label.searchTree"/>', id: 'TREE_NAME', attrType: 'text', width: 200, align: 'left'},
   	   		{name: 'DCMN_CLS_MNG_NO', id: 'DCMN_CLS_MNG_NO', hidden: true},
   	   		{name: 'PROC_DEPT_CD', id: 'PROC_DEPT_CD', hidden: true},  
   	 		{name: 'HND_SCT_NM', id: 'HND_SCT_NM', hidden: true},
   	 		{name: 'LC_CD', id: 'LC_CD', hidden: true},
   	 		{name: 'MC_CD', id: 'MC_CD', hidden: true},
   	 		{name: 'SC_CD', id: 'SC_CD', hidden: true},
   	 		{name: 'UNIT_DUTY_CD', id: 'UNIT_DUTY_CD', hidden: true},
   	 		{name: 'PRSRV_PRD', id: 'PRSRV_PRD', hidden: true},
   	 		{name: 'PRSRV_TYPE', id: 'PRSRV_TYPE', hidden: true},
   	 		{name: 'PRSRV_PLC', id: 'PRSRV_PLC', hidden: true},
			{name: 'IS_STCK_REC_THNG_YN', id: 'IS_STCK_REC_THNG_YN',  hidden: true},
			{name: 'STCK_REC_THNG_TRF_DT', id: 'STCK_REC_THNG_TRF_DT',  hidden: true},
			{name: 'TEMP_YN', id: 'TEMP_YN',  hidden: true},
			{name: 'FUNC_CLS_TYPE', id: 'FUNC_CLS_TYPE',  hidden: true},
			{name: 'DESCRIPTION', id: 'DESCRIPTION',  hidden: true},
			{name: 'LEV', id: 'LEV',  hidden: true}
   	   	],
		callback : 'gridCallBack', 	//그리드가 생성 된 후 실행된다.
		defaultOptions:{ align:'center', width:50, sortable:true}, 
 	 	treeview: {
 	 		viewField: 'TREE_NAME',
 			levField: 'LEV',
 			codeField: 'CODE',
 			pcodeField: 'PARENT_CODE'
 		},
		// 이벤트
		events:[
			{
				event:'${param.eventType}', funcName:'${param.funcname}', cls:'${param.cls}',
				target:'${param.target}', type:'${param.type}', callback:'${param.callback}'
			}
		],
		colspan:[],
		rowspan:[], 
		colGroup:[], 
		btn:[ 
			 {button:'excel',func:'excel',type:'dialog','classes':'',label:'엑셀'} 
		]		
	});

	return false;
 };
 
 
//"필수적용사항"
//*********폼 다이얼로그 & 팝업 (폼에서 다이얼로그 & 팝업 뛰운 경우)
//그리드의 데이터를 모두 가지고 넘어가야할 경우
//1. 다이얼로그
function onSelectAllbusinessUnitdialog(rowid, iRow, iCol, rowData, target,callback, obj){
	
	onSelectAll(rowid, iRow, iCol, rowData, target,callback, obj);
}

//2. 팝업
function onSelectAllbusinessUnitpopup(rowid, iRow, iCol, rowData, target,callback, obj){
	window.opener.onSelectAll(rowid, iRow, iCol, rowData, target,callback, obj);
	window.close();
}

//*********그리드 다이얼로그 & 팝업 (그리드에서 다이얼로그 & 팝업 뛰운 경우)
//그리드의 데이터를 모두 가지고 넘어가야할 경우
//1. 다이얼로그
function onSelectGridAllbusinessUnitdialog(rowid, iRow, iCol, rowData, target,callback, obj){
	onSelectGridAll(rowid, iRow, iCol, rowData, target,callback, obj);
}

//2. 팝업
function onSelectGridAllbusinessUnitpopup(rowid, iRow, iCol, rowData, target,callback, obj){
	window.opener.onSelectGridAll(rowid, iRow, iCol, rowData, target,callback, obj);
	window.close();
}

function gridCallBack() {
	var dataItems = $('#table_popupGrid1').getGrid().dataItems();
	$.each(dataItems, function(index, item) {
		if (item.LEV != '6') {
			$('tr[data-uid="' + item.uid + '"] td').on('dblclick', function(e) {
				// prevent this action occurs and stop propagation to parent
				e.preventDefault();
				e.stopPropagation();
				return false;
			});
		} else {
			var $td = $('tr[data-uid="' + item.uid + '"] td');
			var $span = $td.find('span');
			var $html = $('<span class="active-item">' + item.TREE_NAME + '</span>');
			$html.css({
				cursor: 'pointer',
				'font-weight': 800,
				color : '#6582e6',    
				padding: '2px 13px'
			});
			
			$td.html($span);
			$td.append($html);
		}
	});
}

function isExistedTr(arr, $obj) {
	var existed = false;
	$.each(arr, function(index, obj) {
		if ($obj.data('uid') == $(obj).data('uid')) {
			existed = true;
			return false;
		}
	});
	
	return existed;
}

function doSearchTree() {
	var $grid = $('#table_popupGrid1');
	if($('#filterTxt1').val() == undefined || $('#filterTxt1').val() == ''){
	    return false;
	}
	var keyword = $('#filterTxt1').val().trim();
	if (!keyword) {
		$.each($grid.find('tr'), function(index, obj) {
			$(obj).find('.tnode').removeClass('fold');
			$(obj).removeClass('hide');
		});
		
		return false;
	}
	
	var $tdMatched = $grid.find('td:contains("' + keyword + '")');
	var spans = [];
	$tdMatched.each(function() {
		spans.push($(this).children('.tnode'));
	});
	
	var trList = [];
	
	$.each(spans, function(index, obj) {
		if (isExistedTr(trList, $(obj).closest('tr'))) {
			return true;
		}
		
		var lev = $(obj).data('lev');
		var $lastNode;
		$(obj).closest('tr').nextAll().each(function() {
			if ($(this).data('lev') == 6) {
				$lastNode = $(this);
				return false;
			}
		});
		
		var flag = false;
		$(obj).closest('tr').prevAll().each(function() {
			if ($(this).data('lev') == 6) {
				$(this).prevAll().each(function() {
					if ($(this).data('lev') == 1) {
						if (!isExistedTr(trList, $(this))) {
							trList.push($(this));
						}
						return false;
					}
				});
				
				return false;
			}
				
			if (!isExistedTr(trList, $(this))) {
				trList.push($(this));
			}
			
			if ($(this).data('lev') == 1) {
				return false;
			}
		});
		
		if (lev < 6 && $lastNode) {
			$(obj).closest('tr').nextUntil($lastNode).each(function() {
				if (!isExistedTr(trList, $(this))) {
					trList.push($(this));
				}
			});
			
			if (!isExistedTr(trList, $lastNode)) {
				trList.push($lastNode);
			}
		}
		
		trList.push($(obj).closest('tr'));
	});
	
	var nodes = $grid.find('.tnode');
	nodes.each(function() {
		$(this).addClass('fold');
		if ($(this).data('lev') > 1) {
			$(this).closest('tr').addClass('hide');
		}
	});
	
	$.each(trList, function(index, obj) {
		$(obj).find('.tnode').removeClass('fold');
		$(obj).removeClass('hide');
	});
	
	treeset($grid.getViewGrid());
}

$(document).ready(function() {
	$('#businessUnitDialog .btm_search').removeClass('ac_click submit').on('click', doSearchTree);
	
	var timeout = null;
	
	$('#filterTxt1').on('keyup', function() {
		clearTimeout(timeout);
		
		timeout = setTimeout(doSearchTree, 1000);
	});
});

</script>
<div id="businessUnitDialog"> 
	<h4><spring:message code="dbm.dbm0601.treeView.label"/></h4>
	<a2m:searchbox script="popupDrawgrid1" initenable="true"> 
		<ul class="box">
			<li class="box_line">
				<div class="box_group"> 	
					<span class="box_tit" style="width: 60px"><spring:message code="dbm.dbm0601.label.searchTree"/></span>
					<span class="box_txt" > 
						<input id="filterTxt1" type="text" class="w200px"/> 
					</span>
				</div>			
				<!-- <div class="box_group" style="width: 500px;"> 
					<span class="box_tit" style="width: 60px">코드명</span>
					<span class="box_txt" > 
						<input type="text" id="search.COMM_NM" name="search.COMM_NM" style="width: 150px;" value="" > 
					</span>
				</div> -->
			</li> 
		</ul>
	</a2m:searchbox>	
	
	<div id="popupGrid1" style="width:100%;"></div>
</div>