<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script type="text/javascript">
var popupDrawgrid = function(formId,data){
	var mydata2 = data;
	$('#popupGrid').setViewGrid({id:'popupGrid',type:'view',
		url:CTX+'/common/popup/getDataPgmPopup.ajax', param : formId ,
		data:mydata2,  
		gridOptions : {width: 500, sortable:true, caption: '검색결과' , loadonce:true},
		colModels : [	             
     	   	{name:'프로그램ID', id :'PGM_ID', width:100},
   	   		{name:'프로그램명', id :'PGM_NM', width:200, align:'left'},
   	   		{name:'경로' ,id :'LINK_PATH',  width:200, align:'left'}
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
		]
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

$(document).ready(function(){
	// [유형- radio] change
	changeCls(); 	
	
	//$('.form_search_box#popupDrawgrid').trigger('submit');
});

</script>
<div id="popup_wrapper">
	<h4>프로그램ID 조회</h4>
	<a2m:searchbox script="popupDrawgrid" >
		<ul class="box">
			<li class="box_line">
				<div class="box_group"> 
					 <span class="box_tit">분야</span> 
					 <span class="box_txt">
						<a2m:combo id="SE_FLD_CD" type="load" params="UP_COMM_CD=020" 
								   daoName="common.code.Code.commCode" defaultValue="" selected="" script="popupDrawgrid()"/>
					 </span>
				</div> 
				<div class="box_group"> 
					<span class="box_tit">검색조건</span>
					<span class="box_txt">
						<select id="SE_KEY" name="SE_KEY">
							<option value="">::선택::</option>
							<option value="PGM_ID" selected="selected">프로그램ID</option>
							<option value="PGM_NM">프로그램명</option>
						</select>
						<input type="text" name="SE_KEY_WORD" name="SE_KEY_WORD" />
					</span>
				</div>
				<div class="box_group"> 
					<span class="box_tit">유형</span>
					<span class="box_txt">
						<input type="radio" class="input_style" id="SE_CLS_ALL" name="SE_CLS" value="" checked="checked" /> 전체
						<input type="radio" class="input_style" id="SE_CLS_01" name="SE_CLS" value="1" /> 일반
						<input type="radio" class="input_style" id="SE_CLS_02" name="SE_CLS" value="2" /> 담당
					</span>
				</div>
				<div class="box_group"> 
					<span class="box_tit">사용여부</span>
					<span class="box_txt">
						<a2m:radio id="SE_USE_YN" type="fixed" cls="USE_YN"
								   defaultValue="" selected="Y" wrapperCss="width:200px;" script="popupDrawgrid()"/>
					</span>
				</div>
			</li>
		</ul>	
		<div class="search_button"> 
			<span class="btn bg_gray ico k8 float_right ac_click submit" >검색</span>
			<span class="btn bg_gray ico a5" onclick="searchBoxReset()" >초기화</span>
		</div>
	</a2m:searchbox>
	<div id="popupGrid"> </div>
	<!-- <input id="save" type="button" value="확인" class="btn_W btn_WM"> -->
	<!-- <input id="cancel" type="button" value="닫기" class="btn_W btn_WM"> -->
</div>	