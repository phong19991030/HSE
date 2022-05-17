
/*	
 * 	######## Selector ##########################################
 * 	## MAIN
 * 	
 * 	span#tit_turbine_nm : 콤보박스 선택 시 target 이름
 * 	ul.location 		: Position 
 * 	
 * 	tbody#row_list		: 테이블 row 리스트
 * 
 * 	a#register_btn		: 등록 버튼
 * 
 * 	
 * 
 * 	## SEARCH BOX - left
 * 
 * 	input#search_all	: 전체 검색 폼
 * 
 * 	a#search_reset		: 검색 창 reset 버튼
 * 	a#search_toggle		: 검색 창 toggle 버튼
 * 	a#search_btn		: 검색 버튼 
 * 
 * 
 * 
 * 	## SEARCH BOX - right
 *  input#search_criteria_all 	: 전체 검색 조건
 * 	input#search_criteria_a		: 검색 조건 a (보고서 이름) [name="criteriaA"] 
 * 	input#search_criteria_b		: 검색 조건 b (작성자 이름) [name="criteriaB"]
 * 	
 *  strong#search_result_cnt	: 검색 결과 갯수
 *  select#page_size			: page당 최대 갯수 셀렉터 
 *  
 *  
 *  
 *  ## PAGENATION
 *  
 *  div#pagenation	: pagenation
 *  a#fst_page		: 처음 페이지 버튼
 *  a#pre_page		: 이전 페이지 버튼
 *  a#nxt_page		: 다음 페이지 버튼
 *  a#lst_page		: 마지막 페이지 버튼
 *  
 *  
 *  
 *  ######## Function ###########################################
 */
/* 검색 조건 관련 객체  */
var _search;
(function(window) {
	
	/* 생성자 */
	function Search(a, b, c, d) {
		this.ALL = a || null;
		this.A = b || null;
		this.B = c || null;
	};
	
	/* 현재 입력값 자동 setting */
	Search.prototype.autoSet = function() {
		this.ALL = $('#search_criteria_all').val() || null;
		this.A = $('#search_criteria_a').val() || null;
		this.B = $('#search_criteria_b').val() || null;
		return this;
	}
	
	/* 입력 form 리셋 */
	Search.prototype.resetForm = function(target) {
		
		if(target) {
			if($(target).prop('tagName') === 'SELECT') {
				$(target + " option:eq(0)").prop("selected", true);
				$(target).siblings('label').text($(target + " option:eq(0)").text()).attr('class', 'mark');
			} else if($(target).prop('tagName') === 'INPUT') {
				$(target).val('');
			}
		} else {
			$('[id*=search_criteria]').val('');
		}
		return this;
	}
	/* 검색 조건 set */
	Search.prototype.set = function(k, v) {
		//if(this.hasOwnProperty(k)) this[k] = v || this[k];
		if(this.hasOwnProperty(k)) this[k] = v;
		return this;
	}
	/* 특정 검색 조건 get */
	Search.prototype.get = function(k) {
		return this[k];
	}
	/* 모든 검색 조건 get */
	Search.prototype.getAll = function() {
		return this;
	}
	/* 모든 검색 조건 parameter형식(xml 검색 조건) 으로 get */
	Search.prototype.getParam = function() {
		var param = {};
		if(this.ALL) param.SEARCH_ALL = this.ALL;
		if(this.A) param.SEARCH_RPT_NM = this.A;
		if(this.B) param.SEARCH_REGISTRATOR = this.B;
		return param;
	}
	/* 검색 조건 초기화 */
	Search.prototype.reset = function() {
		this.ALL = null;
		this.A = null;
		this.B = null;
		return this;
	}
	window.Search = Search;
	_search = new Search();

})(window);



/*
 * 		page 초기화
 */
function oam0400() {
	
	/* view setting - menu창 숨기기 */
	$('body').addClass('gnb-none');
	//$('body').removeClass('gnb-active');
	//$('.gnb-menu').removeClass('on');

	/*
	 *  # Combobox 생성
	 */
	headerWithSelectBox('_oam.selectCombo', {all: 'onSearch'});
	
	/* 검색창 toggle 버튼 클릭 이벤트 */
	$('#search_toggle').click(function() {
		$(this).parents('.search-wrapper').toggleClass('active');
	});
	
	/* 전체 검색 input keypress 이벤트 */
	$('#search_criteria_all').keypress(function(e) {
		if(e.keyCode === 13) {
			// active 해제 
			var parent = $(this).parents('.search-wrapper');
			if(parent.hasClass('active')) parent.removeClass('active');
			
			// 검색 setting
			_search.autoSet().set('A', null).set('B', null)
				.resetForm('#search_criteria_a').resetForm('#search_criteria_b');
			onSearch();
		}
	});
	
	/* 검색 조건 input */
	$('ul.detail-search-lst li input').keypress(function(e) {
		if(e.keyCode === 13) $('#search_btn').click();
	});
	
	// page nation 버튼 클릭 
	$('#fst_page').click(movePage);
	$('#lst_page').click(movePage);
	$('#pre_page').click(movePage);
	$('#nxt_page').click(movePage);
	
	// page size option 변경 
	$('#page_size').change(onSearch);
	
	// search 버튼 클릭 
	$('#search_btn').click(function() {
		// 검색 창 닫기
		$(this).parents('.search-wrapper').toggleClass('active');
		// 검색 setting
		_search.autoSet().set('ALL', null).resetForm('#search_criteria_all');
		// page 초기화
		$('#pagenation').children('.active').text(1);
		// 검색
		onSearch();
	});
	
	// search 리셋 버튼 클릭 
	$('#search_reset').click(function() {
		// page 리셋
		$('#pagenation').children('.active').text(1);
		// 검색 조건, 폼 리셋
		_search.reset().resetForm();
		onSearch();
	});
	
	// 등록 버튼 클릭 이벤트 
	$('a#register_btn').click(function(){
		window.location = ctx + '/oam2/oam_0400/reportRegister';
	});
	
	var cookies = hasCookie();
	onSearch();
}

/*
 * # 검색
 */
function onSearch() {
	
	var param = {};
	
	// 검색 조건
	var farm_id = $('ul.select-machine.farm').attr('FARM_ID');
	var group_id = $('ul.select-machine.group').attr('GROUP_ID');
	var turbine_id = $('ul.select-machine.turbine').attr('GERATOR_ID');
	if(farm_id && !group_id && !turbine_id) param.FARM_ID = farm_id;
	if(group_id && !turbine_id) param.GROUP_ID = group_id;
	if(turbine_id) param.TURBINE_ID = turbine_id;
	
	// 페이징 옵션
	param.PAGE = $('#pagenation').children('.active').text() ? parseInt($('#pagenation').children('.active').text()) : 1;
	param.PAGE_SIZE = parseInt($('#page_size option:selected').val());
	
	// param merge 
	param = Object.assign(param, _search.getParam());
	console.log(param);
	
	// 검색 
	var data = _oam.mariaDB.getData(ctx + '/oam2/oam_0400/getData.ajax', param);
	console.log(data);
	
	// 총 갯수 표시
	$('#search_result_cnt').html(data.CNT);
	
	// 알람 생성
	makeAlarmList(data.LIST);
	
	// 페이지네이션 생성
	makePageNation(parseInt(data.CNT), parseInt(data.PAGE_SIZE), parseInt(data.PAGE));
}


/*
 * 	# List 생성(tr)
 */
function makeAlarmList(data) {
	$('#row_list').html('');
	data.forEach((e) => {
		var row = _oam_elements.oam_0400.main.tr_report_row({
			ID: e.RPT_ID,
			RN: e.RN,
			ALARM_CODE: e.ALARM_CODE ? e.ALARM_CODE : 'X',
			POSITION: e.POSITION,
			RPT_NM: e.RPT_NM,
			//REGISTRATOR: e.USER_NM + ' (' + e.USER_ID + ')',
			REGISTRATOR: e.USER_ID,
			DATETIME: e.DATETIME,
		});
		// tr에 프로퍼티 추가
		row = $(row).prop('info', e);
		
		// tr css, 클릭 이벤트 추가 
		row = $(row).css('cursor', 'pointer').click(function(e) {
			if($(e.target).prop('tagName') === 'I') return;
			window.location = ctx + '/oam2/oam_0400/reportDetail?RPT_ID=' + $(this).prop('info').RPT_ID;
		});
		// tr 다운로드 버튼 클릭 이벤트 추가 
		row = $(row).find('.download-btn').click(function(e) {
			if($(e.target).prop('tagName') === 'I') {
				var info = $(this).parents('tr').prop('info');
				window.location.href = CTX + '/oam2/oam_0400/downloadPDF.ajax?RPT_ID=' + info.RPT_ID;
			}
		}).parents('tr');
		
		// 추가 
		$('#row_list').append(row);
	});
	if(data.length === 0) $('#row_list').append(_oam_elements.oam_0400.main.no_data());
}

/*
 * 		PageNation 생성
 */
function makePageNation(row_cnt, row_size, current_page) {
	// 기존 pagenation 초기화
	$('#pagenation').css('display', 'block');
	$('#pagenation > a[class*="page"]').remove();
	//$('#pagenation > a[class="active"]').remove();
	
	var page_cnt = parseInt(row_cnt / row_size);
	page_cnt = row_cnt % row_size > 0 ? page_cnt + 1 : page_cnt;
	$('#fst_page').prop('page', 1);
	$('#lst_page').prop('page', page_cnt);
	
	var mok = parseInt(current_page / 10);
	mok = current_page % 10 > 0 ? mok : mok - 1;
	//var nmg = page_cnt % 10;
	
	var s = (mok*10)+1;
	var e = (mok+1)*10 > page_cnt ? page_cnt : (mok+1)*10; 
	
	if(page_cnt > 0) {
		// pagenation 삽입
		for(var i=s; i<=e; i++) {
			var cls = i === current_page ? 'page active' : 'page';
			$('#pagenation').children('#nxt_page').before('<a href="#" class="' + cls + '">' + i + '</a>');
		}
		// 다음 page nation이 있을 경우
		if(e < page_cnt) {
			$('#pagenation').children('#nxt_page').before('<a href="#" class="nxt_pagenation">...</a>');
			$('.nxt_pagenation').click(function() {
				$('#pagenation > a[class*="active"]').text(e+1);
				onSearch();
			});
		}
		// 이전 page nation이 있을 경우 
		if(current_page > 10) {
			$('#pagenation').children('#pre_page').after('<a href="#" class="pre_pagenation">...</a>');
			$('.pre_pagenation').click(function() {
				$('#pagenation > a[class*="active"]').text(s-1);
				onSearch();
			});
		}
		// pagenation click event
		$('#pagenation > a[class="page"]').click(function() {
			$(this).addClass('active');
			$(this).siblings('.active').removeClass('active');
			onSearch();
		});
	} else {
		$('#pagenation').css('display', 'none');
	}
}


/*
 * 		page 이동
 */
function movePage() {
	var process = $(this).attr('id').split('_')[0];
	var current_page = parseInt($('#pagenation > a[class*="active"]').text());
	var last_page = $('#lst_page').prop('page');
	
	if(current_page === 1 && (process === 'fst' || process === 'pre')) return;
	if(current_page === last_page && (process === 'nxt' || process === 'lst')) return;
	
	var move_page;
	switch(process) {
		case 'fst':
			move_page = $(this).prop('page');
			break;
		case 'pre':
			move_page = current_page - 1;
			break;
		case 'nxt':
			move_page = current_page + 1;
			break;
		case 'lst':
			move_page = $(this).prop('page');
			break;
	}
	$('#pagenation > a[class*="active"]').text(move_page);
	onSearch();
}




