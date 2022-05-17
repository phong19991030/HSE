<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript">
var popupDrawgrid = function(formId,data){
	var mydata2 = data;
	
	$('#popupGrid').setViewGrid({id:'popupGrid',type:'view',
		url:CTX+'/common/popup/getDataUserDepartPopup.ajax',  
		param : formId ,
		data:mydata2,  
		gridOptions : {height: 420, width:200, sortable:true, caption: '검색결과' , loadonce:true},
		colModels : [	             
     	   	{name:"EMP_CODE", id :'EMP_NO', width:60},
   	   		{name:"EMP_NAME'", id :'NAME', width:190, align:'left'}   	   		
   	   	],
		defaultOptions:{ width:120, sortable:true},
		colspan:[],
		rowspan:[], 
		colGroup:[], 
		events:[{event:'${param.eventType}',funcName:'${param.funcname}',target:'${param.target}',type:'${param.type}'}]
	});
	
	return false;
}; 

/*
 * *****************************************
 * Grid 이벤트
 * ******************************************
 */
 
//"필수적용사항"
//*********폼 다이얼로그 & 팝업 (폼에서 다이얼로그 & 팝업 뛰운 경우)
//그리드의 데이터를 모두 가지고 넘어가야할 경우
//1. 다이얼로그
function onSelectAlldialog(rowid, iRow, iCol, rowData, target,callback, obj){
	onSelectAll(rowid, iRow, iCol, rowData, target,callback, obj);
}

//2. 팝업
function onSelectAllpopup(rowid, iRow, iCol, rowData, target,callback, obj){
	window.opener.onSelectAll(rowid, iRow, iCol, rowData, target,callback, obj);
	window.close();
}

//*********그리드 다이얼로그 & 팝업 (그리드에서 다이얼로그 & 팝업 뛰운 경우)
//그리드의 데이터를 모두 가지고 넘어가야할 경우
//1. 다이얼로그
function onSelectGridAlldialog(rowid, iRow, iCol, rowData, target,callback, obj){
	onSelectGridAll(rowid, iRow, iCol, rowData, target,callback, obj);
}

//2. 팝업
function onSelectGridAllpopup(rowid, iRow, iCol, rowData, target,callback, obj){
	window.opener.onSelectGridAll(rowid, iRow, iCol, rowData, target,callback, obj);
	window.close();
}

$(document).ready(function(){
	//부모창에서 넘어온값 초기 세팅
	if('${param.type}' == 'popup'){
		var $parentId = $('#'+'${param.target}',opener.document);
		var $prevId = $('#'+$parentId.data('prev').replace('[','\\[').replace(']','\\]').replace('.','\\.'),opener.document);
	}else{
		var $parentId = $('#'+'${param.target}');
		var $prevId = $('#'+$parentId.data('prev').replace('[','\\[').replace(']','\\]').replace('.','\\.'));
	}
// 	$("#popupDrawgrid").find('input[name=SE_NTN_NM]').prop('value',$prevId.val());
	
});
</script>
<div id="popup_wrapper" style="width:490px;">

	<h4>${param.title}</h4>
	<a2m:searchbox script="popupDrawgrid" >  
		<ul class="box">
			<li class="box_line">
				<div class="box_group"> 
					<span class="box_tit">이름</span>
					<span class="box_txt"><input type="text" id="NAME" name="NAME" style="width:200px;"/></span>
				</div>
			</li> 
		</ul>
		<div class="search_button">
			<span class="btn bg_gray ico k8 ac_click submit" >검색</span>
		</div>
	</a2m:searchbox>
	<div id="popupGrid"> </div>
</div>	