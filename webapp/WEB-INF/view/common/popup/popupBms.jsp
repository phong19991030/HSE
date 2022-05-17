<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script type="text/javascript">
var popupDrawgrid = function(formId,data){

	var mydata2 = data;
	$('#popupGrid').setViewGrid({id:'popupGrid',type:'crud',
		displayState: true, // CRUD 상태표시창 show/hide 여부
		url:CTX+'${url}', param : formId ,
		data:mydata2,  
		modelName: 'RESULTLIST',
		gridOptions : {width: 500,height:300,rownumbers:true, sortable:true, caption: '검색결과' , loadonce:true},
		colModels : [	              
     	   	{name:'기관명', id :'ETPS_NAME', attrType: 'text', width:200},
   	   		{name:'ETPS_ID', id :'ETPS_ID', width:100, align:'left', hidden:true},
			{name:'구분', id:'ETPS_TYPE', attrType:'select', typeOption:{textfield:'ETPS_TYPE',codefield:'ETPS_TYPE'},
				typeValue:[{LABEL:'발주기관',DATA:'ETPSTYPE_01'},{LABEL:'수주기관',DATA:'ETPSTYPE_02'}]}
   	   	],
		defaultOptions:{ width:120, sortable:true}, 
		colspan:[],
		rowspan:[], 
		colGroup:[], 
		events:[
			{
				event:'${param.eventType}', funcName:'${param.funcname}',
				target:'${param.target}', type:'${param.type}', callback:'${param.callback}'
			}
		],
		btn: [
				// 버튼
				{button:'add', func:'addRow', type:'inline', 'classes':'', label:'추가'},
				{button:'delete', func:'deleteRow', type:'dialog', 'classes':'', label:'삭제'},
				{button:'save', func:'saveWithChk', label:'저장'}
			]
	});
	return false;
}; 

function saveWithChk(obj){
	$(obj).parents('form').submit()
}


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

/*
 * *****************************************
 * 폼 이벤트
 * ******************************************
 */

//조회 - search_box 전송
function doSubmit() {
	$('.form_search_box#popupDrawgrid').trigger('submit');
}

//[유형- radio] change
function changeCls() {
    $('input[name=SE_CLS]').change(function(){
        $('.form_search_box#popupDrawgrid').submit();
    });
}

// [search_box] 전체 Reset
function searchBoxReset() {
 	$('.form_search_box#popupDrawgrid').each(function() {  
        this.reset();  
    });  
 	doSubmit();
}

function callbackFunc(){

    popupDrawgrid('','');
}


$(document).ready(function(){
	// [유형- radio] change
	changeCls(); 	
	var etps = '${ETPS_TYPE}';
    $('.box_txt select option[value="'+etps+'"]').attr("selected", "selected");
	//$('.form_search_box#popupDrawgrid').trigger('submit');
});

</script>
<div id="popup_wrapper">
	<h4>기관 조회</h4>
	<a2m:searchbox script="popupDrawgrid" >
		<ul class="box">
			<li class="box_line">
				<div class="box_group"> 
					<span class="box_tit">기관 명</span>
					<span class="box_txt">
						<input type="text" name="SE.ETPS_NM" />
						<select id="SE.ETPS_TYPE" name="SE.ETPS_TYPE">
							<option value="ETPSTYPE_01">발주기관</option>
							<option value="ETPSTYPE_02">수주기관</option>
						</select>
					</span>
				</div>
			</li>
		</ul>	
		
	</a2m:searchbox>
	
	
	<form:form action="${ctxPath}/bms/bms_0101/saveEtps.ajax"  id="saveForm" data-func="saveAjax"  data-callback="callbackFunc" >    <%-- data-msg="SAVE" --%>
		<div id="popupGrid"> </div>
	</form:form>
	
	<!-- <input id="save" type="button" value="확인" class="btn_W btn_WM"> -->
	<!-- <input id="cancel" type="button" value="닫기" class="btn_W btn_WM"> -->
</div>	