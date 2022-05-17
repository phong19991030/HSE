/* 검색 조건  */
var _search;
(function(window){
	
	/* 생성자 */
	function Search(a, b, c){
		//null check
		this.ALL = a || null;	
		this.A = b || null;	
		this.B = c || null;
	};
	
	/* 현재 입력값 자동 셋팅 */
	Search.prototype.autoSet = function(){
		this.ALL = $('input#SEARCH_CRITERIA_ALL').val() || null;
		this.A = $('input#SEARCH_CRITERIA_A').val() || null;
		this.B = $('input#SEARCH_CRITERIA_B').val() || null;
		return this;
	} 
	
	/* 입력 폼 리셋 */
	Search.prototype.resetForm = function(target) {
		if(target) {
			if($(target).prop('tagName') === 'SELECT') {
				$(target + " option:eq(0)").prop("selected", true);
				$(target).siblings('label').text($(target + " option:eq(0)").text());
			} else if($(target).prop('tagName') === 'INPUT') {
				$(target).val('');
			}
		} else {
			$('input#SEARCH_CRITERIA_A').val('');
			$('input#SEARCH_CRITERIA_B').val('');
		}
		return this;
	}
	
	/* 검색 조건 set */
	Search.prototype.set = function(k, v){
		if(this.hasOwnProperty(k)) this[k] = v;
		return this;
	}
	
	/* 특정 검색 조건 get */
	Search.prototype.get = function(k, v){
		return this[k];
	}
	
	/* 모든 검색 조건 get */
	Search.prototype.getAll = function(k, v){
		return this;
	}
	
	/* 모든 검색 조건 parameter형식(xml 검색 조건) 으로 get */
	Search.prototype.getParam = function() {
		var param = {};
		if(this.ALL) param.SEARCH_ALL = this.ALL;
		if(this.A) param.SEARCH_ALARM_SUB_CD = this.A;
		if(this.B) param.SEARCH_ALARM_TXT = this.B;
		return param;
	}
	
	/* 검색 조건 초기화 */
	Search.prototype.reset = function() {
		this.ALL = null;
		this.A = null;
		this.B = null;
		return this;
	}
	
	/* 생성자 */
	window.Search = Search;
	_search = new Search();
	
})(window);

/*초기화*/
function sys0902(){
	// 데이터 조회
	var data = _sys.mariaDB.getData('/sys_new/sys_0900/detailForm/getDetailInfo.ajax', {
		WT_ALARM_GR_ID: $('input#WT_ALARM_GR_ID').val(),
	});
	console.log(data);
	// 데이터 없을 경우 return 
	if(!data) return;

	// 수정 버튼 클릭 이벤트
	$('span#MODIFY_BTN').click(function() {
		window.location = ctx + '/sys_new/sys_0900/modifyForm?WT_ALARM_GR_ID=' + $('input#WT_ALARM_GR_ID').val();
	});
	
	// 삭제 버튼 클릭 이벤트 
	$('span#DELETE_BTN').click(function() {
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var result = _sys.mariaDB.getData('/sys_new/sys_0900/detailForm/delete.ajax', {
			WT_ALARM_GR_ID: $('input#WT_ALARM_GR_ID').val(),
		});
		console.log(result);
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = ctx + '/sys_new/sys_0900/list';
		}
		// Exception 발생
		else if(result.EXCEPTION){
			if(result.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
		}
		// 삭제 실패
		else {
			alert(_MESSAGE.common.deleteFail);
		}
	});

	// 메뉴 권한 정보 
	$('span#TURBINE-MODEL').text(data.MODEL_NM);
	$('span#ALARM_NM').text(data.ALARM_NM);
	$('span#DESCRPT').html('<p>' + data.DESCRPT.split('\n').join('</p><p>') + '</p>');
	$('span#ALARM_GROUP_CODE').text(data.MODEL_CODE + data.MANUFACTURER_CODE + data.CAPACITY_CODE);
	$('span#CODE_A').text(data.MODEL_CODE);
	$('span#CODE_B').text(data.MANUFACTURER_CODE);
	$('span#CODE_C').text(data.CAPACITY_CODE);
	
	

	
	/****************** 검색 *******************/ 

	// 검색 폼 토글 버튼 클릭 이벤트 
	$('a#SEARCH_TOGGLE_BTN').click(function() {
		$(this).parents('div.search-wrapper').toggleClass('active');
	});
	
	// 전체 검색 input enter 이벤트
	$('input#SEARCH_CRITERIA_ALL').keypress(function(e){
		if(e.keyCode === 13){
			// active 해제 
			var parent = $(this).parents('.search-wrapper');
			if(parent.hasClass('active')) parent.removeClass('active');
			
			// 검색 setting
			_search.autoSet().set('A',null).set('B',null).resetForm('input#SEARCH_CRITERIA_A').resetForm('input#SEARCH_CRITERIA_B');
			onSearch();
		}
	});
	
	/* 검색 조건 input */
	$('ul.detail-search-lst li input').keypress(function(e) {
		if(e.keyCode === 13) $('button#SEARCH_BTN').click();
	});
	
	// page nation 버튼 클릭 
	$('a#FST_PAGE').click(movePage);
	$('a#PRE_PAGE').click(movePage);
	$('a#NXT_PAGE').click(movePage);
	$('a#LST_PAGE').click(movePage);
	
	// 행 갯수 option change 
	$('select#PAGE_SIZE').change(onSearch);
	
	//search 버튼 클릭
	$('button#SEARCH_BTN').click(function(){
		//검색창 닫기
		$(this).parents('.search-wrapper').toggleClass('active');
		
		//검색 setting
		_search.autoSet().set('ALL',null).resetForm('input#SEARCH_CRITERIA_ALL');
		
		//page 초기화
		$('div#PAGENATION').children('.active').text(1);
		
		//검색 
		onSearch();
	});
	
	// search 리셋 버튼 클릭
	$('a#SEARCH_RESET_BTN').click(function(){
		// page 리셋
		$('div#PAGENATION').children('.active').text(1);
		//검색조건, 폼 리셋
		_search.reset().resetForm();
		onSearch();
	});
	
	onSearch();
}

/* 검색 이벤트 */
function onSearch() {
	
	var param = {WT_ALARM_GR_ID : $('input#WT_ALARM_GR_ID').val()};
	
	// 페이징 옵션 
	param.PAGE = $('#PAGENATION').children('.active').text() ? parseInt($('#PAGENATION').children('.active').text()) : 1;
	param.PAGE_SIZE = parseInt($('select#PAGE_SIZE option:selected').val());
	
	// 검색 param까지 합치기
	param = Object.assign(param, _search.getParam());
	console.log(param);

	// 검색
	var data = _sys.mariaDB.getData(CTX + '/sys_new/sys_0900/detailForm/getAlarmList.ajax', param);
	console.log(data);
	
	// 데이터 가공
	data.LIST.forEach((e) => _sys.convertData.ALARM_LIST(e));
	console.log(data);
	
	// 토탈 갯수 표기
	$('strong#TOTAL_CNT').text(data.CNT);
	
	// row 생성
	makeList(data.LIST);
	
	// 페이지네이션 생성
	makePageNation(parseInt(data.CNT), parseInt(data.PAGE_SIZE), parseInt(data.PAGE));
	
}

function makeList(list) {
	// 
	$('tbody#ALARM_LIST').html('');
	
	// COMPANY 분류
	list.forEach((e) => {
		// row 생성 
		var sample = _sys_elements.sys_0902.main.tr_alarm_row(e);
		
		// row 클릭
		sample = $(sample).css('cursor', 'pointer').click(openPopup);
		
		// 프로퍼티 추가 
		$(sample).prop('info', e);
		
		// row 추가 
		$('tbody#ALARM_LIST').append(sample);
	});
	
	// 데이터 0개 일 경우 
	if(list.length === 0) $('tbody#ALARM_LIST').append('<tr class="NO_DATA"><td colspan="8">No Data</td><tr>');
};

function makePageNation(row_cnt, row_size, current_page) {
	// 기존 pagenation 초기화
	$('div#PAGENATION').css('display', 'block');
	$('div#PAGENATION > a[class*="page"], div#PAGENATION > a[class*="PAGE"]').remove();
	
	// 생성 될 수 있는 전체 페이지 수 
	var page_cnt = parseInt(row_cnt / row_size);
	page_cnt = row_cnt % row_size > 0 ? page_cnt + 1 : page_cnt;
	$('a#FST_PAGE').prop('page', 1);
	$('a#LST_PAGE').prop('page', page_cnt);
	
	// 생성 될 페이지 수 제한 (10개)
	var mok = parseInt(current_page / 10);
	mok = current_page % 10 > 0 ? mok : mok - 1;
	//var nmg = page_cnt % 10;
	
	var s = (mok*10)+1;
	var e = (mok+1)*10 > page_cnt ? page_cnt : (mok+1)*10; 
	
	if(page_cnt > 0) {
		// pagenation 삽입
		for(var i=s; i<=e; i++) {
			var cls = i === current_page ? 'page active' : 'page';
			$('div#PAGENATION').children('#NXT_PAGE').before('<a href="javascript:void(0);" class="' + cls + '">' + i + '</a>');
		}
		// 다음 page nation이 있을 경우
		if(e < page_cnt) {
			$('div#PAGENATION').children('#NXT_PAGE').before('<a href="javascript:void(0);" class="NXT_PAGENATION">...</a>');
			$('.NXT_PAGENATION').click(function() {
				$('div#PAGENATION > a[class*="active"]').text(e+1);
				onSearch();
			});
		}
		// 이전 page nation이 있을 경우 
		if(current_page > 10) {
			$('div#PAGENATION').children('#PRE_PAGE').after('<a href="javascript:void(0);" class="PRE_PAGENATION">...</a>');
			$('.PRE_PAGENATION').click(function() {
				$('div#PAGENATION > a[class*="active"]').text(s-1);
				onSearch();
			});
		}
		// pagenation click event
		$('div#PAGENATION > a[class="page"]').click(function() {
			$(this).addClass('active');
			$(this).siblings('.active').removeClass('active');
			onSearch();
		});
	} else {
		$('div#PAGENATION').css('display', 'none');
	}
}

function movePage() {
	var process = $(this).attr('id').split('_')[0];
	var current_page = parseInt($('div#PAGENATION > a[class*="active"]').text());
	var last_page = $('#LST_PAGE').prop('page');
	
	if(current_page === 1 && (process === 'FST' || process === 'PRE')) return;
	if(current_page === last_page && (process === 'NXT' || process === 'LST')) return;
	
	var move_page;
	switch(process) {
		case 'FST':
			move_page = $(this).prop('page');
			break;
		case 'PRE':
			move_page = current_page - 1;
			break;
		case 'NXT':
			move_page = current_page + 1;
			break;
		case 'LST':
			move_page = $(this).prop('page');
			break;
	}
	$('div#PAGENATION > a[class*="active"]').text(move_page);
	onSearch();
}


function openPopup() {
	var TYPE = $(this).attr('id').split('_')[0].toUpperCase();
	var scroll_target = '.base_grid_table';
	
	if(['ALARM'].includes(TYPE)) {
		var content = _sys_elements.sys_0902.popup.alarm_content({
			TITLE: 'Alarm Code Details',
			TYPE: TYPE,
		});
		$('div#layerPopup').html('').html(content);
		
		// 스크롤 대상 지정
		scroll_target = '#scroll_target';
		
		// 값 채우기
		var info = $(this).prop('info');
		$('span#ALARM_SUB_CD').text(info.ALARM_SUB_CD);
		$('span#ALARM_TXT').text(info.ALARM_TXT);
		$('span#ALARM_DESCRPT').html('<p>' + info.DESCRPT ? info.ALARM_DESCRPT.split('\n').join('</p><p>') : 'X' + '</p>');
		$('span#ALARM_SUGGEST').html('<p>' + info.SUGGEST ? info.ALARM_SUGGEST.split('\n').join('</p><p>') : 'X' + '</p>');
		$('div#ACTION_LIST').html('<p>' + (info.ALARM_ACTION_LIST.length > 0 ? info.ALARM_ACTION_LIST.map((e) => e.ACTION_NUM + '. ' + e.ACTION_NM).join('</p><p>') : 'X') + '</p>');
		$('div#PART_LIST').html('<p>' + (info.ALARM_PART_LIST.length > 0 ? info.ALARM_PART_LIST.map((e) => e.PART_NUM + '. ' + e.PART_NM).join('</p><p>') : 'X') + '</p>');
		$('div#TOOL_LIST').html('<p>' + (info.ALARM_TOOL_LIST.length > 0 ? info.ALARM_TOOL_LIST.map((e) => e.TOOL_NUM + '. ' + e.TOOL_NM).join('</p><p>') : 'X') + '</p>');
		$('div#PPE_LIST').html('<p>' + (info.ALARM_PPE_LIST.length > 0 ? info.ALARM_PPE_LIST.map((e) => e.PPE_NUM + '. ' + e.PPE_NM).join('</p><p>') : 'X') + '</p>');
	}
	
	/*** 팝업 관련 이벤트 ***/
	// 스크롤 활성화 
	$("#layerPopup " + scroll_target).mCustomScrollbar({
		axis: "Y",
		theme: "minimal-dark",
		mouseWheelPixels: 300
	});
	
	// 팝업 닫기 버튼 이벤트
	$('a#popup_close').click(closePopup);
	
	// 팝업창 활성화 
	$('div#layerPopup').addClass('active');
	
}

function closePopup() {
	// 등록, 닫기 여부 체크  
	var isRegister = $(this).attr('id').split('_')[1] === 'register';
	
	// type 체크 
	var type = $(this).parents('div.layer-cont').attr('popup-type');
	
	if(isRegister && ['ALARM'].includes(type)) {
		
	}
	else {
		console.log('닫기');
	}
	// popup 내용 삭제, 비활성화 
	$('div#layerPopup').html('').removeClass('active');
}
