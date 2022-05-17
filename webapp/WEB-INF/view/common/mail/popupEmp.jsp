<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script type="text/javascript">
var popupEmpDrawgrid = function(formId,data){
	// 조직도
	$('#popupEmpGrid1').setViewGrid({id:'popupEmpGrid1',type:'view', 
		url:CTX+'/common/popup/getDataEmpDeptPopup.ajax', param : formId ,
		modelName : 'RESULTLIST',  
		gridOptions : { height:480,	sortable:true, caption: '조직도', loadonce:true, rownumbers:true, setDataBinderGrid:false}, // setDataBinderGrid = true일 경우 데이터 건수 display},
		colModels : [
   	   		{name:'조직도', id :'DEPT_NM', width:190, align:'left'},
   	   		{name:'DEPT_CD', id :'DEPT_CD', hidden:true},
	   	   	{name:'상위부서코드', id :'UP_DEPT_CD', hidden:true},
	   	 	{name:'순번', id :'ORD_NO', hidden:true},
	   	 	{name:'LEV', id :'LEV', hidden:true}
   	   	],
   	 	treeview: {
			viewField:'DEPT_NM', 		// 적용될 필드
			levField:'LEV', 			// LEVEL 필드
			codeField:'DEPT_CD', 		// 주코드
			pcodeField:'UP_DEPT_CD'		// 부모코드
		},
		callback:'popupEmpDrawgrid2',
		defaultOptions:{ align:'center',width:100, sortable:false},
		colspan:[], 
		rowspan:[], 
		btn:[{}],
		events:[{event:"onSelectRow", funcName:"onSelectRowEvent"}]
	});
};

var popupEmpDrawgrid2 = function(formId, data){
	// 조직도 그리드 클릭 후 조회 시
	if(data == 'undefined'|| !data) {
		formId ='popupEmpDrawgrid';
	}
	// 일반조회 시
	else {
		formId = data; // paramObj
	}	

	// 사원정보
	$('#popupEmpGrid2').setViewGrid({
		id:'popupEmpGrid2',
		type:'view',
		//url:CTX+'/common/popup/getDataEmpPopup.ajax?'+data,
		url:CTX+'/common/popup/getDataEmpPopup.ajax', 
		param : formId , 
		modelName : 'RESULTLIST', 
		gridOptions : {height:480, sortable:true, caption: '사원정보', loadonce:true, rownumbers:true, setDataBinderGrid:false}, // setDataBinderGrid = true일 경우 데이터 건수 display
		colModels : 
		[
   	   		{name:'부서', id :'DEPT_NM', width:150, align:'left'}, 
   	   		{name:'직급', id :'JOB_GRD_NM', width:80},
   	   		{name:'직위', id :'JOB_PSIT_NM', width:80},
   	   		{name:'사번', id :'EMP_NO', width:70},
   	   		{name:'성명', id :'EMP_NM', width:90},
   	 		{name:'고용형태', id :'EMP_CLS_NM', width:80, hidden:true},
   	 		{name:'재직구분', id :'HOLD_CLS_NM', width:80},
   	   		{name:'겸직여부', id :'DUP_APPNT_YN', width:80},
   	   		{name:'부서코드', id :'DEPT_CD', hidden:true},
	   		{name:'상위부서코드', id :'UP_DEPT_CD', hidden:true},		
	   		{name:'직급코드', id :'JOB_GRD_CD', hidden:true},
	   		{name:'직급등급', id :'JOB_GRD_NUM', hidden:true},
   	   		{name:'직위코드', id :'JOB_PSIT_CD', hidden:true},
   	   		{name:'입소일', id :'ENT_DT', hidden:true},
   	 		{name:'근무상태', id :'HOLD_CLS', hidden:true},
   	 		{name:'근무상태', id :'EMP_CLS', hidden:true},
   	 		{name:'근무차수', id :'DUTY_DGR', hidden:true},
   	 		{name:'출장계좌', id :'ETC_ACC_NO', hidden:true},
   	 		{name:'출장계좌', id :'ETC_BNK_CD', hidden:true},
   	 		{name:'출장계좌', id :'ETC_BNK_NM', hidden:true}
   	   	], 
		defaultOptions:{ width:80, sortable:true},
		displayState:false, // CRUD 상태표시창 show/hide 여부
		colspan:[],
		rowspan:[], 
		colGroup:[],
		btn:[{}],
		events:[
			{
				event:'${param.eventType}', funcName:'${param.funcname}', cls:'${param.cls}',
				target:'${param.target}', type:'${param.type}', callback:'${param.callback}'
			}
		]
	});
	return false;
};

/*
 * *****************************************
 * Grid 이벤트
 * ******************************************
 */
// 부서 선택시 사원정보 조회
var onSelectRowEvent = function(rowid, status, e){ 
	var rowData = $('#table_popupEmpGrid1').getRowData(rowid);
	/*
	 * 다이얼로그일 때 파라미터name값이 부모와 같다면 class명으로 serialize()하지 않고
	 * form id로 serialize()
	 * class명으로 serialize()하면 부모의 form내용까지 가져온다.
	 */
	/* var searchData = $('#popupEmpDrawgrid').serialize();
	searchData += '&DEPT_CD='+rowData.DEPT_CD; 
	
	popupEmpDrawgrid2('popupEmpGrid2', searchData); */
	
	// 파라미터 가공
	var searchData = $('#popupEmpDrawgrid').serializeArray();
	searchData.push({'name' : 'DEPT_CD', 'value' : rowData.DEPT_CD}); 
	
	var searchObj = new Object();
	$.each(searchData, function(i, obj) { 
		var key = obj.name;
		var val = obj.value;
		
		searchObj[key] = val; 
	});

	popupEmpDrawgrid2('popupEmpGrid2', searchObj); 
};

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
	//부모창에서 넘어온 검색값 초기 세팅
	if('${param.type}' == 'popup'){
		var $parentId = $('#'+'${param.target}',opener.document);		
		var $prevId = $('#'+$parentId.data('prev').replace('[','\\[').replace(']','\\]').replace('.','\\.'),opener.document);
		//var $nextId = $('#'+$parentId.data('next').replace('[','\\[').replace(']','\\]').replace('.','\\.'),opener.document);
	}else{
		var $parentId = $('#'+'${param.target}');
		var $prevId = $('#'+$parentId.data('prev').replace('[','\\[').replace(']','\\]').replace('.','\\.'));
		//var $nextId = $('#'+$parentId.data('next').replace('[','\\[').replace(']','\\]').replace('.','\\.'));
	}
	$("#popupEmpDrawgrid").find('input[name="EMP_NM"]').prop('value',$prevId.val());
	//$("#popupEmpDrawgrid").find('input[name=EMP_NO]').prop('value',$nextId.val());
	
}); 

</script>

<div id="popup_wrapper" style="width:autox;">
	<a2m:searchbox script="popupEmpDrawgrid" >  
		<ul class="box">
			<li class="box_line">
				<div class="box_group" style="width:200px;"> 
					<span class="box_tit">사원번호</span><span class="box_txt"><input type="text" id="EMP_NO" name="EMP_NO" style="width:80px;"/></span>
				</div>
				<div class="box_group" style="width:220px;"> 
					<span class="box_tit">성명</span><span class="box_txt"><input type="text" id="EMP_NM" name="EMP_NM" style="width:100px;"/></span>
				</div>
				<div class="box_group" style="width:250px;"> 
					<span class="box_tit">부서명</span><span class="box_txt"><input type="text" id="DEPT_NM" name="DEPT_NM"/></span>
				</div>
				<div class="box_group" style="width:100px;"> 
					<span class="box_tit">재직구분</span>
					<span class="box_txt">
						<a2m:combo id="HOLD_CLS" type="load" params="UP_COMM_CD=101" daoName="common.code.Code.commCode" 
							dataCodeField="DATA" dataLabelField="LABEL" defaultValue="" selected="101-010" script="popupEmpDrawgrid()"/>
					</span>
				</div>
				<div class="box_group" style="width:10px;display:none;">					
					<span class="box_tit">고용형태</span><span class="box_txt">
						<a2m:combo id="EMP_CLS" type="load" params="UP_COMM_CD=102" daoName="common.code.Code.commCode" 
							dataCodeField="DATA" dataLabelField="LABEL" defaultValue=""/>
							
					</span>
				</div>
			</li> 
		</ul> 
		<div class="search_button">
			<span class="btn bg_gray ico a5 ac_click reset" >초기화</span>
			<span class="btn bg_gray ico k8 ac_click submit" >검색</span>
		</div>
	</a2m:searchbox>
	
	
	<div class="clear">      
		<div class="ft_left" style="width:27%;">
			<div id="popupEmpGrid1" style="width:100%;"></div>
		</div>
		<div class="ft_right" style="width:72%">	
			<div id="popupEmpGrid2" style="width:100%;"></div> 
		</div>		
	</div>
</div>	