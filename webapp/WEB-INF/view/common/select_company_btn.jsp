<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<div class="register-write " style="display: flex">
	<div class="input-group">
		<label for="COMPANY" class="sr-only"><spring:message code="com.com_0101.label.company" /></label>
		<input type="text" id="COMPANY" placeholder="회사 명" readonly>
    </div>
    <button id="COMPANY_SEARCH_BTN" onclick="openCompPopup(this)" type="button" class="input-btn btn-style1" style="margin: 5px"><spring:message code="button.select" /></button>
</div>
			
<div id="layerPopupCompany" class="layer-popup"></div>		                    	
  
<script>

$(document).ready(function(){
});

function openCompPopup(inp){
	var content = _sys_elements.sys_0301.popup.company_content({
		TITLE: 'Select a Organization',
		TYPE: 'COMPANY',
	});
	$('div#layerPopupCompany').html('').html(content);
	// row 생성 
	createCompPopupRow();
	
	var scroll_target = '.base_grid_table';
	
	$("#layerPopupCompany " + scroll_target).mCustomScrollbar({
		axis: "Y",
		theme: "minimal-dark",
		mouseWheelPixels: 300
	});
	// 팝업 검색창 입력 이벤트 
	$('input#popup_search').keyup(function(e) {
		if(e.keyCode === 13) {
			var param = {SEARCH_ALL: $(this).val()};
			createCompPopupRow(param);
		}
	});
	// 팝업 검색창 새로고침 버튼 이벤트 
	$('a#popup_search_refresh').css('cursor', 'pointer').click(function() {
		$('input#popup_search').val('');
		var param = {};
		createCompPopupRow(param);
	});
	
	$('#popup_search_refresh').css('cursor', 'pointer').click(function() {
		$('input#popup_search').val('');
		var param = {};
		createCompPopupRow(param);
	});
	// 전체 체크박스 이벤트 
	$('#layerPopup #all_check').click(function() {
		var check = true;  
		if(!$(this).is('input:checked')) check = false;
		$(this).prop('checked', check);
		$('tbody#popup_list').find('input[type=checkbox], input[type=radio]').prop('checked', check);
	});
	
	
	// 팝업 닫기 버튼 이벤트
	$('#popup_close').click(function(){
		closeCompPopup('close');
	});
	
	// 팝업 등록 버튼 이벤트
	$('#popup_register').click(closeCompPopup);
	
	// 팝업창 활성화 
	$('div#layerPopupCompany').addClass('active');
}

function closeCompPopup(action) {
	// 등록, 닫기 여부 체크  
	
	// type 체크 
	if(action === 'close'){
		$('div#layerPopupCompany').removeClass('active');
	}else{
		var type = $(this).parents('div.layer-cont').attr('popup-type');
	
		// 체크 리스트 조회
		var check_list = $('tbody#popup_list input[type="radio"]:checked, tbody#popup_list input[type="checkbox"]:checked');
		// 체크 항목 없을 경우 
		if(!check_list.length) return;
		// 체크 항목 정보 가져오기  
		var info_list = check_list.toArray().map((e) => $(e).parents('tr').prop('info'));
		
		// input value, property 세팅
		$('input#COMPANY').val(info_list[0].COMPANY_NAME);
		$('input#COMPANY').prop('info', info_list[0]);
		$('div#layerPopupCompany').removeClass('active');
	}
		
	// popup 내용 삭제, 비활성화 
	
}


function createCompPopupRow(param={}){
	$('tbody#popup_list').html('');
	
	var data = _sys.mariaDB.getData(CTX + '/hea/hea_0001/popupData/COMPANY.ajax', param);
	console.log(data)
	data.forEach((e) => {
		// row 생성
		var row;
		// row 생성
		row = _sys_elements.sys_0301.popup.tr_company_row({
			ID: e.COMPANY_ID,
			COMPANY_NM: e.COMPANY_NAME,
			LOGO_PATH: CTX + '/imageView' + e.FLE_PATH + '/' + e.NEW_FLE_NM,
			// CLS: e.CLS,
		});
		
		// 프로퍼티 추가 
		row = $(row).prop('info', e);
		// css, 이벤트 추가 : 팝업 리스트 tr(row) 클릭 이벤트 : tr 클릭 시 checkbox, radio on/off
		row = $(row).css('cursor', 'pointer').click(_sys.clickRowCheckOnOff);

		// 삽입
		$('tbody#popup_list').append(row);
	});
}

</script>