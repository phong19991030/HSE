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
		url:CTX+'/stm/stm_0101/getDataList04.ajax',
		//url:CTX+'${param.data_url}',
		param : formId,  
		localData: data,  
		modelName : 'RESULTLIST',
		gridOptions : { height: 410, sortable:false, caption: '검색결과', loadonce:true, rownumbers:false},
		colModels : [
   	   		{name:'코드명', id :'COMM_NM_TREE', width:350, align:'left'},
   	   		{name:'코드명_원본', id :'COMM_NM', hidden:true},
   	   		{name:'코드', id :'COMM_CD', width:150, align: 'left'},
   	 		{name:'부모코드명' ,id :'UP_COMM_NM', hidden:true},
   	 		{name:'부모코드' ,id :'UP_COMM_CD', hidden:true},
   	 		{name:'참조코드' ,id :'REF_CD', hidden:true},
   	 		{name:'코드 영문명' ,id :'COMM_ENG_NM', hidden:true},
   	 		{name:'구분' ,id :'CLS', hidden:true},
   	 		{name:'레벨' ,id :'LEV', hidden:true},
   	 		{name:'순위' ,id :'ORD_NO', hidden:true},
   	 		{name:'사용여부' ,id :'USE_YN', hidden:true},
   	 		{name:'기타1' ,id :'ETC1', hidden:true},
   	 		{name:'기타2' ,id :'ETC2', hidden:true},
   	 		{name:'기타3' ,id :'ETC3', hidden:true},
   	 		{name:'기타4' ,id :'ETC4', hidden:true},
   	 		{name:'기타5' ,id :'ETC5', hidden:true},
   	 		{name:'기타6' ,id :'ETC6', hidden:true},
   	 		{name:'기타7' ,id :'ETC7', hidden:true},
   	 		{name:'기타8' ,id :'ETC8', hidden:true},
   	 		{name:'기타9' ,id :'ETC9', hidden:true},
   	 		{name:'기타10' ,id :'ETC10', hidden:true},
   	 		{name:'기타11' ,id :'ETC11', hidden:true},
   	 		{name:'기타12' ,id :'ETC12', hidden:true},
   	 		{name:'설명' ,id :'RMK', hidden:true}
   	   	],
		callback : '', 	//그리드가 생성 된 후 실행된다.
		defaultOptions:{ align:'center', width:50, sortable:true}, 
 	 	 treeview: {
 			viewField:'COMM_NM_TREE', 	// 적용될 필드
 			levField:'LEV', 			// LEVEL 필드
 			codeField:'COMM_CD', 	// 주코드
 			pcodeField:'UP_COMM_CD'	// 부모코드
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
function onSelectAllbusinessUnitCommCddialog(rowid, iRow, iCol, rowData, target,callback, obj){
	onSelectAll(rowid, iRow, iCol, rowData, target,callback, obj);
}

//2. 팝업
function onSelectAllbusinessUnitCommCdpopup(rowid, iRow, iCol, rowData, target,callback, obj){
	window.opener.onSelectAll(rowid, iRow, iCol, rowData, target,callback, obj);
	window.close();
}

//*********그리드 다이얼로그 & 팝업 (그리드에서 다이얼로그 & 팝업 뛰운 경우)
//그리드의 데이터를 모두 가지고 넘어가야할 경우
//1. 다이얼로그
function onSelectGridAllbusinessUnitCommCddialog(rowid, iRow, iCol, rowData, target,callback, obj){
	onSelectGridAll(rowid, iRow, iCol, rowData, target,callback, obj);
}

//2. 팝업
function onSelectGridAllbusinessUnitCommCdpopup(rowid, iRow, iCol, rowData, target,callback, obj){
	window.opener.onSelectGridAll(rowid, iRow, iCol, rowData, target,callback, obj);
	window.close();
}

</script>
<div> 
	<h4>비즈니스 코드 관리</h4>   
	<a2m:searchbox script="popupDrawgrid1" initenable="true"> 
		<ul class="box">
			<li class="box_line">
				<div class="box_group"> 	
					<span class="box_tit" style="width: 60px">상위코드</span>
					<span class="box_txt" > 
						<a2m:combo id="search.UP_COMM_CD" type="load" daoName="common.code.Code.getBU_UpCdList" 
										   defaultText=""  params=""  dataCodeField="DATA" dataLabelField="LABEL" script="popupDrawgrid1()"/>
					</span>
				</div>			
				<div class="box_group" style="width: 500px;"> 
					<span class="box_tit" style="width: 60px">코드명</span>
					<span class="box_txt" > 
						<input type="text" id="search.COMM_NM" name="search.COMM_NM" style="width: 150px;" value="" > 
					</span>
				</div>																
			</li> 
		</ul>
	</a2m:searchbox>	
	
	<div id="popupGrid1" style="width:100%;"></div>
</div>