<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script type="text/javascript">
var popupDrawgrid = function(formId,data){
	var mydata2 = data;
	$('#popupGrid').setViewGrid({
		id:'popupGrid',
		localData:mydata2,
		url:CTX+'/common/popup/getDataPostPopup.ajax', 
		param : formId,
// 		data:mydata2,  
		gridOptions : {height: 460, sortable:true, caption: '검색결과' , loadonce:true},
		colModels : [	             
     	   	{name:'우편번호', id :'POST_NO_DSP', width:90},
   	   		//{name:'주소', id :'ADDR_DSP', width:440, align:'left'},
   	   		{name:'주소', id :'ADDR_FULL_DSP', width:440, align:'left'},
   	   		{name:'POST_NO' ,id :'POST_NO',  hidden:true},
   	   		{name:'ADDR_RTN' ,id :'ADDR_RTN',  hidden:true},
   	   		{name:'ADDR_OLD' ,id :'ADDR_OLD',  hidden:true},
   	   		{name:'ADDR_NEW' ,id :'ADDR_NEW',  hidden:true}
   	   	],
		defaultOptions:{ width:120, sortable:true},
		callback : 'postGridCallback',
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
function onSelectAllpostdialog(rowid, iRow, iCol, rowData, target,callback, obj){
	onSelectAll(rowid, iRow, iCol, rowData, target,callback, obj);
}

//2. 팝업
function onSelectAllpostpopup(rowid, iRow, iCol, rowData, target,callback, obj){
	window.opener.onSelectAll(rowid, iRow, iCol, rowData, target,callback, obj);
	window.close();
}

//*********그리드 다이얼로그 & 팝업 (그리드에서 다이얼로그 & 팝업 뛰운 경우)
//그리드의 데이터를 모두 가지고 넘어가야할 경우
//1. 다이얼로그
function onSelectGridAllpostdialog(rowid, iRow, iCol, rowData, target,callback, obj){
	onSelectGridAll(rowid, iRow, iCol, rowData, target,callback, obj);
}

//2. 팝업
function onSelectGridAllpostpopup(rowid, iRow, iCol, rowData, target,callback, obj){
	window.opener.onSelectGridAll(rowid, iRow, iCol, rowData, target,callback, obj);
	window.close();
}

// 조회
function doSearch(){
	var key_words = $('#KEY_WORDS').val();				// 통합검색
	var gugun = $('#GUGUN').val();						// 시군구
	var road_nm = $('#ROAD_NM').val();					// 도로명
	var bldg_num = $('#BLDG_NUM').val();				// 건물번호
	var bldg_sub_num = $('#BLDG_SUB_NUM').val();	// 건물번호 SUB
	var search_type = $('#SEARCH_TYPE').val(); 			// 검색 Type
	
	
	if(key_words == "" && gugun == "" && road_nm == ""){
		if(search_type == "A") { // 통합검색
			alert("통합검색을(를) 입력하십시오."); 
		}else if(search_type == "D") { // 상세검색
			alert("시군구, 도로명(읍면동/리)을(를) 입력하십시오."); 
		}else {
			alert("통합검색 또는 시군구, 도로명(읍면동/리)을(를) 입력하십시오.");	
		}
	}else {
		if(key_words.length > 1 || (gugun.length > 1 && road_nm.length > 1)){ // 2자 이상일 경우 
			// 검색버튼 비활성화
			$('#btn_search').addClass('bt_disabled');
			
			// 기존 동작이 한번 일어난다.
			setTimeout(function(){ popupDrawgrid();}, 1000);  
			
			// 기본 동작이 반복적으로 일어난ㄷ.
			//setInterval(function(){ popupDrawgrid;}, 1000);
			//popupDrawgrid();
		}
		else {
			if(search_type == "A") { // 통합검색
				if(key_words.length <= 1)  alert("통합검색을(를) 2자리 이상 입력하십시오."); 
			}else if(search_type == "D") { // 상세검색
				if(gugun.length <= 1) alert("시군구을(를) 2자리 이상 입력하십시오."); 
				else if(road_nm.length <= 1) alert("도로명(읍면동/리)을(를) 2자리 이상 입력하십시오."); 
			}
		}
	}	
}

/* function doSearch(){
	var road_nm = $('#ROAD_NM').val();		// 도로명
	var bldg_num = $('#BLDG_NUM').val();	// 건물번호
	var dong = $('#DONG').val();				// 동
	var lot_num = $('#LOT_NUM').val();		// 지번  
	
	if(road_nm == "" && bldg_num == "" && dong == "" && lot_num == ""){
		alert("도로명 또는 동(읍/면)을 입력하십시오.");
	}else {
		if(road_nm.length > 1 || dong.length > 1){ // 2자 이상일 경우 
			// 검색버튼 비활성화
			$('#btn_search').addClass('bt_disabled');
			
			// 기존 동작이 한번 일어난다.
			setTimeout(function(){ popupDrawgrid();}, 1000);  
			
			// 기본 동작이 반복적으로 일어난ㄷ.
			//setInterval(function(){ popupDrawgrid;}, 1000);
			//popupDrawgrid();
		}
		else {
			alert("2자리 이상 입력하십시오."); 
		}
	}	
}  */

// 조회 후 callback
function postGridCallback(){
	// 검색버튼 활성화
	$('#btn_search').removeClass('bt_disabled'); 
}

// focus 이벤트
function focusEvent(){
	$('#KEY_WORDS, #GUGUN, #ROAD_NM, #BLDG_NUM, #BLDG_SUB_NUM').on('focus', function(){ 
		var id = $(this).attr('id');   
		
		// focus에 따른 검색조건 초기화
		if(id == "KEY_WORDS"){ // 통합검색
			$('#SEARCH_TYPE').val('A'); // 통합(검색 Type)
			
			$('#GUGUN').val('');
			$('#ROAD_NM').val('');
			$('#BLDG_NUM').val('');
			$('#BLDG_SUB_NUM').val('');
		}else if(id == "GUGUN" || id == "ROAD_NM" || id == "BLDG_NUM" || id == "BLDG_SUB_NUM"){	// 시군구 & 도로명 & 건물번호 (상세검색)
			$('#SEARCH_TYPE').val('D'); // 상세(검색 Type)
			
			$('#KEY_WORDS').val('');
		}
	});
}

$(document).ready(function(){
	/* 검색버튼을 클릭하기전까지 빈그리드상태처리.. 
		1. a2m:searchbox script="popupDrawgrid" initenable="false"
		2. 그리드 draw function 호출 (배열형태의 빈데이터 넘김) : popupDrawgrid('',[]);
		3. 그리드에 빈데이터 넘김 : localData:mydata2 
	*/
	popupDrawgrid('popupGrid',[]);
	focusEvent();
});
</script>
<div id="popup_wrapper" style="width:auto;">
	<h4>우편번호 조회</h4>
	
	<form class="form_search_box" id="popupDrawgrid">
		<div class="portlet box">                                  
			<div class="portlet-title">                                
				<div class="caption">                                  
					<i class="icon-search"></i> 검색        
				</div>                                                 
				<div class="actions">                                       
					<span id="btn_search" class="btn_조회 bg_mint  ac_click sbtn" data-func="doSearch" data-flag=""></span>	              
				</div>                                                 
			</div>                                                     
			<div class="portlet-body search_box">
  
			<ul class="box">
				<li class="box_line">
					<div class="box_group"> 
						<span class="box_tit" style="width:100px;">시도</span>
						<span class="box_txt">
							<select id="SIDO" name="SIDO">							
								<option value="서울특별시">서울특별시</option>
								<option value="인천광역시">인천광역시</option>
								<option value="대전광역시" selected="selected">대전광역시</option>
								<option value="세종특별자치시">세종특별자치시</option>
								<option value="대구광역시">대구광역시</option>
								<option value="울산광역시">울산광역시</option>
								<option value="부산광역시">부산광역시</option>
								<option value="광주광역시">광주광역시</option>
								<option value="경기도">경기도</option>
								<option value="강원도">강원도</option>
								<option value="충청북도">충청북도</option>
								<option value="충청남도">충청남도</option>
								<option value="전라북도">전라북도</option>
								<option value="전라남도">전라남도</option>
								<option value="경상북도">경상북도</option>
								<option value="경상남도">경상남도</option>
								<option value="제주특별자치도">제주특별자치도</option>
							</select>
							<!-- 통합검색인지, 상태검색인지 체크 -->
							<input type="hidden" id="SEARCH_TYPE" name="SEARCH_TYPE" value="">
						</span>
					</div>
					<div class="box_group"> 
						<span class="box_tit" style="width:100px;">통합검색</span>
						<span class="box_txt">
							<input type="text" id="KEY_WORDS" name="KEY_WORDS" value="" style="width:170px;">
						</span>
						<div style="color:#9d9d9d;padding-left:140px;">※도로명, 건물명, 지번에 대해 통합검색이 가능합니다.</div>					
						<div style="color:#9d9d9d;padding-left:140px;">예) 대덕대로 776</div>
					</div>
					<div class="box_group"> 
						<span class="box_tit" style="width:100px;">시군구</span>
						<span class="box_txt">
							<input type="text" id="GUGUN" name="GUGUN" value="" style="width:170px;">
						</span>
						<div style="color:#9d9d9d;padding-left:140px;">예) 유성구</div>					
					</div>
					<div class="box_group"> 
						<span class="box_tit" style="width:100px;">도로명(읍면동/리)</span> 
						<span class="box_txt">
							<input type="text" id="ROAD_NM" name="ROAD_NM" style="width:170px;">
						</span>
						<div style="color:#9d9d9d;padding-left:140px;">예) 역삼동, 화도읍, 장유면</div>
					</div>
					<div class="box_group"> 
						<span class="box_tit" style="width:100px;">건물번호(번지)</span>
						<span class="box_txt">
							<input type="text" id="BLDG_NUM" name="BLDG_NUM" style="width:170px;" fpattern="number"> + 
							<input type="text" id="BLDG_SUB_NUM" name="BLDG_SUB_NUM" style="width:80px;" fpattern="number">
						</span>
						<div style="color:#9d9d9d;padding-left:140px;">예) 27-12</div>
					</div>
				</li>
			</ul>
			</div>                                    
		</div>                                    
	</form>

	<div class="layout">
		<div id="popupGrid" style=" width: 100%; "> </div>
	</div>	
</div>	