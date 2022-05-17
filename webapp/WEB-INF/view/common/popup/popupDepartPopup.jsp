<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript">
var popupDrawgrid = function(formId,data){
	var mydata2 = data;
	$('#popupGrid').setViewGrid({id:'popupGrid',type:'view',
		url : CTX + '/common/popup/getDataDepartmentPopup.ajax',
		param : formId ,
		data:mydata2,  
		gridOptions : {height:400, sortable:true,caption: '조직도' , loadonce:true,  types: 'tree'},
		colModels : [	             
		    {
				name : "<spring:message code='title.dept.code'/>",
				id : 'DEPT_CD',
				width : 200,
				align: "left"
			// 				type : "date",
			// 				format : "{MM-dd-yyyy}"
			},{
				name : "<spring:message code='title.dept.name'/>",
				id : 'DEPT_NM',
				width : 150,
				align:'left',
			},  {
				name : "<spring:message code='title.dept.headUser'/>",
				id : 'DEPT_HEAD_USER_NM',
				width : 100,
			}, {
				name : "head uid",
				id : 'DEPT_HEAD_USER_UID',
				width : 160,
				 attrType:'readonlytext',
				 hidden: true
			}, {
				name : "<spring:message code='title.dept.parentDept'/>",
				id : 'UP_COMM_DEPT_NM',
				width : 160,
			},{
				name : "<spring:message code='title.dept.parentDeptCd'/>",
				id : 'UP_COMM_DEPT_CD',
				width : 120,
			}, {
				name : "<spring:message code='title.dept.level'/>",
				id : 'LEV',
				width : 100,
				hidden: true
			}, {
				name : "DEPT_RCV_USER_UID",
				id : 'DEPT_RCV_USER_UID',
				hidden: true
			}, {
				name : "<spring:message code='title.dept.librarian'/>",
				id : 'DEPT_RCV_USER_NM'
			}
   	   	],
   		treeview : {
			viewField:'DEPT_CD', 		// 적용될 필드
			levField:'LEV', 			// LEVEL 필드
			codeField:'DEPT_CD', 		// 주코드
			pcodeField:'UP_COMM_DEPT_CD'		// 부모코드
		},
// 		callback : '${param.callback}',
		defaultOptions:{ width:120, sortable:false, align: 'left'},
		colspan:[],
		rowspan:[], 
		colGroup:[],
		events:[
			{
				event:'${param.eventType}', funcName:'${param.funcname}', cls:'${param.cls}',
				target:'${param.target}', type:'${param.type}', callback:'${param.callback}'
			}
		]
	});
	return false;
};





//"필수적용사항"
//*********폼 다이얼로그 & 팝업 (폼에서 다이얼로그 & 팝업 뛰운 경우)
//그리드의 데이터를 모두 가지고 넘어가야할 경우
//1. 다이얼로그
function onSelectAlldepartdialog(rowid, iRow, iCol, rowData, target,callback, obj){
	onSelectAll(rowid, iRow, iCol, rowData, target,callback, obj);
}

//2. 팝업
function onSelectAlldepartpopup(rowid, iRow, iCol, rowData, target,callback, obj){
	window.opener.onSelectAll(rowid, iRow, iCol, rowData, target,callback, obj);
	window.close();
}

//*********그리드 다이얼로그 & 팝업 (그리드에서 다이얼로그 & 팝업 뛰운 경우)
//그리드의 데이터를 모두 가지고 넘어가야할 경우
//1. 다이얼로그
function onSelectGridAlldepartdialog(rowid, iRow, iCol, rowData, target,callback, obj){
	onSelectGridAll(rowid, iRow, iCol, rowData, target,callback, obj);
}

//2. 팝업
function onSelectGridAlldepartpopup(rowid, iRow, iCol, rowData, target,callback, obj){
	window.opener.onSelectGridAll(rowid, iRow, iCol, rowData, target,callback, obj);
	window.close();
}




$(document).ready(function(){	
	
	//부모창에서 넘어온값 초기 세팅
	try{
		if('${param.type}' == 'popup'){
			var $parentId = $('#'+'${param.target}'.replace(/\./g, '\\.'),opener.document);
			var $prevId = $('#'+$parentId.data('prev').replace('[','\\[').replace(']','\\]').replace('.','\\.'),opener.document);
		}else{
			var $parentId = $('#'+'${param.target}'.replace(/\./g, '\\.'));		
			var $prevId = $('#'+$parentId.data('prev').replace('[','\\[').replace(']','\\]').replace('.','\\.'));
		}	
	} catch (e) {
		console.log(e);
	}
	
	$("#popupDrawgrid").find('input[name=DEPT_NM]').prop('value',$prevId.val());
	
	
	
// 	$('.form_search_box#popupDrawgrid').trigger('submit');
	popupDrawgrid('popupDrawgrid');
});
</script>
<div id="popup_wrapper" style="width:380px;">
	<form class="form_search_box validated fmt" id="popupDrawgrid" action="javascript:popupDrawgrid('popupDrawgrid');" onsubmit="popupDrawgrid('popupDrawgrid'); return false">
		<fieldset>
		<legend>조건을 검색합니다.</legend>
		<div class="group">
				<div class="group_title">
					<strong class="g_title">부서조회</strong>
					<div class="g_title_btn">
						<span class="btn btm_search ac_click submit"></span>
						<span class="btn btm_refresh ac_click reset"></span>
					</div>
				</div>
				<div class="group_content search">
		
				<table class="search_tbl">
					<caption>Search</caption>
					<colgroup>
						<col style="width: 140px;">
						<col style="width: auto;">
						<col style="width: 140px;">
						<col style="width: auto">
						<col style="width: 140px;">
						<col style="width: auto">
					</colgroup>
					<tbody>
						<tr>					
							<th><label for="DEPT_NM">부서명</label></th>
							<td><input type="text" id="DEPT_NM" name="search.DEPT_NM" class="w250px"></td>
						</tr>
					</tbody>
				</table>
					</div>
			</div>
		</fieldset>
	</form>
	
	
	<div id="popupGrid" style="width: 100%;"></div>
	
</div>	