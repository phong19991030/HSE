<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script type="text/javascript">
var popupDrawgrid = function(formId,data){
	var mydata2 = data;
	$('#popupGrid').setViewGrid({id:'popupGrid',type:'view',
// 		url:CTX+'/common/popup/getDataGeneratorPopup.ajax',
		url:CTX+'${urlGetData}',  

		param : formId ,
		data:mydata2,  
		gridOptions : {width: 500, sortable:true, caption: '검색결과' , loadonce:true},
		colModels : [	             
		   	{name:'ID', id :'GERATOR_ID', width:60},
   	   		{name:'<spring:message code='title.tb.GERATOR_NM' />', id :'GERATOR_NM', width:190, align:'left'}  , 	   	
   	   		{name:'<spring:message code='title.tb.GROUP_NM' />', id :'GROUP_NM', width:190, align:'left'} ,  	   		
   	   		{name:'<spring:message code='title.farm.FARM_NM' />', id :'FARM_NM', width:190, align:'left'} 
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

// 	changeCls(); 	
	
	getData();
	
});

function getData(){
	
	var url = 	CTX+'${urlGetData}';
	console.log(url);
	   $.ajax({
	        url: url,
	        data:  {} ,
	        success: function (response) {
	        	console.log(response);
	        	renderFarmList(response);
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	           console.log(textStatus, errorThrown);
	        }
	    }); 
	
}


function renderFarmList(list){
	if(list && list.length >0){
		var str = "";
		
		for(var i = 0; i<list.length; i++){
// 			str += '<div class="item" farm_id="'+list[i].FARM_ID+ '"><span><input type="radio" name="farm_check"></span>'+ list[i].FARM_NM+'</div>' ;
			str += '<div class="item" farm_id="'+list[i].FARM_ID+ '"><label class="container">' + list[i].FARM_NM
			+'  <input type="radio" name="farm_check">'
			+'  <span class="checkmark"></span>'
			+'</label></div>' ;
			
			
		}
		
		$('div.col.farmCol .list').append(str);
		$('div.col.farmCol .item').click(function(){
			$(this).find('input[type="radio"]').prop('checked', true);
			getDataGroup($(this).attr('farm_id'));
		});
		
		$('div.col.farmCol .item').first().click();
	}
	
}

function getDataGroup(farm_id){
	
	var url = 	CTX+'/common/popup/getDataGroup';
	console.log(url);
	   $.ajax({
	        url: url,
	        data:  {"FARM_ID": farm_id} ,
	        success: function (response) {
	        	console.log(response);

	        	renderGroupList(response);
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	           console.log(textStatus, errorThrown);
	        }
	    }); 
	
}


function renderGroupList(list){
	if(list && list.length >0){
		var str = "";
		
		for(var i = 0; i<list.length; i++){
// 			str += '<div class="item" group_id="'+list[i].GROUP_ID+'"><span><input type="radio" name="group_check"></span>'+ list[i].GROUP_NM+'</div>' ;
			str += '<div class="item" group_id="'+list[i].GROUP_ID+'"><label class="container">' + list[i].GROUP_NM
			+'  <input type="radio"  name="group_check">'
			+'  <span class="checkmark"></span>'
			+'</label></div>' ;
			
			
			
		}
		
		$('div.col.groupCol').find('div.item').remove();
		$('div.col.groupCol  .list').append(str);
		$('div.col.groupCol .item').click(function(){
			$(this).find('input[type="radio"]').prop('checked', true);
			getDataGenerator($(this).attr('group_id'));
		});
		
		$('div.col.groupCol .item').first().click();
	}
}

function getDataGenerator(group_id){
	
	var url = 	CTX+'/common/popup/getDataGenerator';
	console.log(url);
	   $.ajax({
	        url: url,
	        data:  {"GROUP_ID": group_id} ,
	        success: function (response) {
	        	console.log(response);

	        	renderGeneratorList(response);
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	           console.log(textStatus, errorThrown);
	        }
	    }); 
	
}

function renderGeneratorList(list){
	if(list && list.length >0){
		var str = "";
		var str2 = "";
		for(var i = 0; i<list.length; i++){
// 			str += '<div class="item" generator_id="'+list[i].GERATOR_ID+'"><span><input type="radio" name="generator_check"></span>'+ list[i].GERATOR_NM+'</div>' ;
			str2 += '<div class="item" generator_id="'+list[i].GERATOR_ID+'"><label class="container">' + list[i].GERATOR_NM
				+'  <input type="radio" value="month" name="generator_check">'
				+'  <span class="checkmark"></span>'
				+'</label></div>';
		}
		$('div.col.generatorCol').find('div.item').remove();
		$('div.col.generatorCol  .list').append(str2);
		$('div.col.generatorCol .item').click(function(){
			$(this).find('input[type="radio"]').prop('checked', true);
			$('input[name="select.GERATOR_ID"]').val($(this).attr('generator_id'));
			$('input[name="select.GERATOR_NM"]').val($(this).text());

		});
		
		$('div.col.generatorCol .item').first().click();
	}
}


function onSave(obj){
	var target = '${param.target}';
	var type = '${param.type}';
	var callback = '${param.callback}';
	
	var $target = $('#' + target.replace(/\./g, '\\.'));	// dialog 선택 결과가 적용될 부분
	var $prevTarget = $target.parents('.bodyContents').find('[name="' + $target.data('prev') + '"]#'+ $target.data('prev').replace('.', '\\.')).eq(0);		// $target.prev('[name="' + $target.data('prev') + '"]').eq(0);
	var $nextTarget = $target.parents('.bodyContents').find('[name="' + $target.data('next') + '"]#'+ $target.data('next').replace('.', '\\.')).eq(0); 	// $target.next('[name="' + $target.data('next') + '"]').eq(0)

	
	var prevField = $target.data('targettext');
	var nextField = $target.data('targetcode');
	
	var GERATOR_ID = $('input[name="select.GERATOR_ID"]').val();
	var GERATOR_NM = $('input[name="select.GERATOR_NM"]').val();

	$prevTarget.val(GERATOR_NM).trigger('change');
	$nextTarget.val(GERATOR_ID).trigger('change');
	
	if(callback) eval(callback);	
	$(obj.target).closest('.a2m_dialog.ui-dialog-content').dialog('close');
}



</script>

<style>
.table{
/* 	border: 1px solid #c1c1c1; */
	width: 100%;
	height: auto;
	background: #f3f3f3;
}

.col{
	width: 32%;
	height: 400px;
	display: inline-table;
	background: #f3f3f3;
}
.farmCol, .groupCol{
	width: 33%;

/* 	border-right: 1px solid #c1c1c1; */
}
.title1{
    text-align: center;
    font-weight: 700;
    background: white;
/*     border-bottom: 1px solid #c1c1c1; */
    padding: 15px;
    background: #fff;
    display: inline-table;
    width: 33%
}
.item{
	padding: 10px 10px;
}

.popupTitle{
	text-align: left;
	font-size: 24px;
	font-weight: 800;
	color: #888888;
	display: inline-table;
	
}
.popupButton{
	float: right;
	display: inline-table;
	margin: 10px;
}

.item span{
	margin-right: 10px;
}
</style>
<div id="popup_wrapper">
<%-- 	<a2m:searchbox script="popupDrawgrid" > --%>
<!-- 	<table class="search_tbl"> -->
<!-- 			<caption>Search</caption> -->
<!-- 			<colgroup> -->
<!-- 				<col style="width: 100px;"> -->
<!-- 				<col style="width: auto;"> -->
<!-- 				<col style="width: 100px;"> -->
<!-- 				<col style="width: auto"> -->
<!-- 			</colgroup> -->
<!-- 			<tbody> -->
<!-- 				<tr> -->
<%-- 					<th><spring:message code='title.tb.GERATOR_NM' /></th> --%>
<!-- 					<td><input type="text" id="GERATOR_NM" name="GERATOR_NM"/></td> -->
<%-- 					<th><spring:message code='title.tb.GROUP_NM' /> --%>
<!-- 					</th> -->
<!-- 					<td><input type="text" id="GROUP_NM" name="GROUP_NM"/> -->
<!-- 					</td> -->
<!-- 						</tr> -->
<!-- 						<tr> -->
<%-- 					<th><spring:message code='title.farm.FARM_NM' /> --%>
<!-- 					</th> -->
<!-- 					<td><input type="text" id="FARM_NM" name="FARM_NM"/> -->
<!-- 					</td> -->
<!-- 			</tr> -->
<!-- 			</tbody> -->
<!-- 		</table> -->
	
		
		
<%-- 	</a2m:searchbox> --%>
<!-- 	<div id="popupGrid"> </div> -->
	<!-- <input id="save" type="button" value="확인" class="btn_W btn_WM"> -->
	<!-- <input id="cancel" type="button" value="닫기" class="btn_W btn_WM"> -->
		<div >
		<h3>

		<spring:message code='title.popup.generator' />
	</h3>
		<div class="popupTitle">
		</div>
		<div class="popupButton">
		</div>
		</div>
	<div>
		
		<input hidden name="select.GERATOR_NM">
		<input hidden name="select.GERATOR_ID">
			
		<div class="table search_tbl" >
			<div style="width: 100%; background: #fff;">
							<div class="title1"><spring:message code='title.farm.FARM_NM' /></div>
							<div class="title1"><spring:message code='title.tb.GROUP_NM' /></div>
							<div class="title1"><spring:message code='title.tb.GERATOR_NM' /></div>
			
			</div>
			<div class="col farmCol">
				<div class="list"></div>
				
			</div><div class="col groupCol">
				<div class="list"></div>
			
			</div><div class="col generatorCol">
				<div class="list"></div>
			
			</div>
		
		</div>
	</div>
	<div class="btn_area">			<button class="basic_btn" onclick="onSave(event)">OK</button>
	</div>
	
</div>	