<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript">
var popupDrawgrid = function(formId,data){
	var mydata2 = data;
	$('#popupGrid').setViewGrid({id:'popupGrid',type:'view',
		url:CTX+'/common/popup/getDataDepartPopup.ajax', param : formId ,
		data:mydata2,  
		gridOptions : {height:400, sortable:true,caption: '조직도' , loadonce:true},
		colModels : [	             
     	   	{name:'부서코드' ,id :'DEPT_CD',  width:95 },
   	   		{name:'부서명' ,id :'DEPT_NM_TREE',  width:240, align:'left'},
	   	   	{name:'상위부서코드', id :'UP_DEPT_CD', hidden:true},
	   	 	{name:'LEV', id :'LEV', hidden:true},
	   	 	{name:'부서명' ,id :'DEPT_NM', hidden:true}
   	   	],
   	 	treeview: {
			viewField:'DEPT_NM_TREE', 		// 적용될 필드
			levField:'LEV', 			// LEVEL 필드
			codeField:'DEPT_CD', 		// 주코드
			pcodeField:'UP_DEPT_CD'		// 부모코드
		},
// 		callback : '${param.callback}',
		defaultOptions:{ width:120, sortable:false},
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
	if('${param.type}' == 'popup'){
		var $parentId = $('#'+'${param.target}',opener.document);
		var $prevId = $('#'+$parentId.data('prev').replace('[','\\[').replace(']','\\]').replace('.','\\.'),opener.document);
	}else{
		var $parentId = $('#'+'${param.target}');
		var $prevId = $('#'+$parentId.data('prev').replace('[','\\[').replace(']','\\]').replace('.','\\.'));
	}
	$("#popupDrawgrid").find('input[name=DEPT_NM]').prop('value',$prevId.val());
	
	
	
// 	$('.form_search_box#popupDrawgrid').trigger('submit');
	
});
</script>
<div id="popup_wrapper" style="width:380px;">
	<h4>부서조회</h4>
	<a2m:searchbox script="popupDrawgrid" >  
		<ul class="box">
			<li class="box_line">
				<div class="box_group"> 
					<span class="box_tit">조직개편일</span>
					<span class="box_txt"><select name="STRUCT_DT" id="STRUCT_DT">  
							<c:forEach items="${STRUCT_DT}" var="item" varStatus="loop">
								<option value="${item.DATA }">${item.LABEL}</option>
							</c:forEach>
						</select></span>
					
				</div>
				<div class="box_group"> 
					<span class="box_tit" style="width:60px;">부서명</span><span class="box_txt"><input type="text" id="DEPT_NM" name="DEPT_NM" style="width:180px;"/></span>
				</div>
				<%-- <div class="box_group"> 
					<span class="box_tit">사용여부</span>
					<span class="box_txt">
						<a2m:combo id="USE_YN" type="fixed" cls="YN" dataCodeField="DATA" dataLabelField="LABEL"/>
					</span>
				</div> --%>
			</li> 
		</ul>
		<div class="search_button">
			<span class="btn bg_gray ico k8 ac_click submit" >검색</span>
		</div>
	</a2m:searchbox>
	
	<div id="popupGrid"></div>
	
</div>	