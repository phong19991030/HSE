<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript">
var popupEmpDrawgrid = function(formId,data){
	
	// 조직도
	$('#popupEmpGrid1').setViewGrid({id:'popupEmpGrid1',type:'view', 
		url:CTX+'/common/popup/getDataNoAccEmployeePopup.ajax', 
		param : formId ,
		modelName : 'RESULTLIST',  
		gridOptions : { height:400,	sortable:true, caption: '사용자 조회', loadonce:true, rownumbers:true, setDataBinderGrid:false}, // setDataBinderGrid = true일 경우 데이터 건수 display},
		colModels : [
   	   		{name:"<spring:message code='title.empl.name' />", id :'EMP_NM'},
   	   		{name:"CODE", id :'EMP_NO'},
	   	   	{name:"<spring:message code='asm0101.pst_nm' />", id :'PST_NM'},
	   	 	{name:"<spring:message code='asm0103.personal.email' />", id :'EMAIL'},
   	   	],
//    	 	treeview: {
// 			viewField:'DEPT_NM', 		// 적용될 필드
// 			levField:'LEV', 			// LEVEL 필드
// 			codeField:'DEPT_CD', 		// 주코드
// 			pcodeField:'UP_DEPT_CD'		// 부모코드
// 		},
// 		callback:'popupEmpDrawgrid2',
		defaultOptions:{ align:'left',width:100, sortable:false},
		colspan:[], 
		rowspan:[], 
		btn:[{}],
		events:[{
			event:'${param.eventType}', funcName:'${param.funcname}',
			target:'${param.target}', type:'${param.type}', callback:'${param.callback}'
		}]
	});
};

/*
 * *****************************************
 * Grid 이벤트
 * ******************************************
 */
// 부서 선택시 사원정보 조회
// var onSelectRowEvent = function(rowid, status, e){ 
// 	var rowData = $('#table_popupEmpGrid1').getRowData(rowid);
// 	/*
// 	 * 다이얼로그일 때 파라미터name값이 부모와 같다면 class명으로 serialize()하지 않고
// 	 * form id로 serialize()
// 	 * class명으로 serialize()하면 부모의 form내용까지 가져온다.
// 	 */
// 	/* var searchData = $('#popupEmpDrawgrid').serialize();
// 	searchData += '&DEPT_CD='+rowData.DEPT_CD; 
	
// 	popupEmpDrawgrid2('popupEmpGrid2', searchData); */
	
// 	// 파라미터 가공
// 	var searchData = $('#popupEmpDrawgrid').serializeArray();
// 	searchData.push({'name' : 'DEPT_CD', 'value' : rowData.DEPT_CD}); 
	
// 	var searchObj = new Object();
// 	$.each(searchData, function(i, obj) { 
// 		var key = obj.name;
// 		var val = obj.value;
		
// 		searchObj[key] = val; 
// 	});

// 	popupEmpDrawgrid2('popupEmpGrid2', searchObj); 
// };

// "필수적용사항"
// *********폼 다이얼로그 & 팝업 (폼에서 다이얼로그 & 팝업 뛰운 경우)
// 그리드의 데이터를 모두 가지고 넘어가야할 경우
// 1. 다이얼로그
function onSelectAllmemberdialog(rowid, iRow, iCol, rowData, target,callback, obj){
	onSelectAll(rowid, iRow, iCol, rowData, target,callback, obj);
}

//2. 팝업
function onSelectAllmemberpopup(rowid, iRow, iCol, rowData, target,callback, obj){
	window.opener.onSelectAll(rowid, iRow, iCol, rowData, target,callback, obj);
	window.close();
}

//*********그리드 다이얼로그 & 팝업 (그리드에서 다이얼로그 & 팝업 뛰운 경우)
// 그리드의 데이터를 모두 가지고 넘어가야할 경우
// 1. 다이얼로그
function onSelectGridAllmemberdialog(rowid, iRow, iCol, rowData, target,callback, obj){
	onSelectGridAll(rowid, iRow, iCol, rowData, target,callback, obj);
}

// 2. 팝업
function onSelectGridAllmemberpopup(rowid, iRow, iCol, rowData, target,callback, obj){
	window.opener.onSelectGridAll(rowid, iRow, iCol, rowData, target,callback, obj);
	window.close();
}


/*
 * *****************************************
 * Form 이벤트
 * ******************************************
 */
 
//조회 - search_box 전송
function doPopupSearch() {
	$('#popupEmpDrawgrid').trigger('submit');
}

$(document).ready(function(){
// 	//부모창에서 넘어온 검색값 초기 세팅
// 	if('${param.type}' == 'popup'){
// 		var $parentId = $('#'+'${param.target}',opener.document);		
// 		var $prevId = $('#'+$parentId.data('prev').replace('[','\\[').replace(']','\\]').replace('.','\\.'),opener.document);
// 		//var $nextId = $('#'+$parentId.data('next').replace('[','\\[').replace(']','\\]').replace('.','\\.'),opener.document);
// 	}else{
// 		var $parentId = $('#'+'${param.target}');
// 		var $prevId = $('#'+$parentId.data('prev').replace('[','\\[').replace(']','\\]').replace('.','\\.'));
// 		//var $nextId = $('#'+$parentId.data('next').replace('[','\\[').replace(']','\\]').replace('.','\\.'));
// 	}
// 	$("#popupEmpDrawgrid").find('input[name="EMP_NM"]').prop('value',$prevId.val());
// 	$("#popupEmpDrawgrid").find('input[name=EMP_NO]').prop('value',$nextId.val());
	popupEmpDrawgrid();
	
}); 

</script>

<div id="popup_wrapper" style="width: autox;">
	<a2m:searchbox script="popupEmpDrawgrid" initenable="true">
		<input name="DELEGATE" hidden value="${DATA}">
		<table class="search_tbl">
			<caption>Search</caption>
			<colgroup>
				<col style="width: 100px;">
				<col style="width: auto;">
				<col style="width: 100px;">
				<col style="width: auto">
				<col style="width: 100px;">
				<col style="width: auto">

			</colgroup>
			<tbody>
				<!-- 3단 input(width:150px) -->
				<tr>
					<th scope="row"><label for="name"><spring:message code='title.empl.name' /></label></th>
					<td><input id="name" type="text" name="empl.USER_NM" class="w150px"></td>

					<th scope="row"><label for="email"><spring:message	code='asm0103.personal.email' /></label></th>
					<td><input type="text" id="email"  name="empl.EMAIL"  class="w150px"></td>
					
					<th scope="row"><label for="pos"><spring:message	code='title.empl.pos' /></label></th>
					<td><input type="text" id="pos"  name="empl.PST_NM"  class="w150px"></td>
				</tr>

				<input type="text" id="grade" hidden name="empl.GRADE" value="${GRADE}" >

			</tbody>
		</table>
	</a2m:searchbox>


	<div class="clear">
		<div>
			<div id="popupEmpGrid1" style="width: 100%;"></div>
		</div>
<!-- 		<div class="ft_right" style="width: 72%"> -->
<!-- 			<div id="popupEmpGrid2" style="width: 100%;"></div> -->
<!-- 		</div> -->
	</div>
</div>
