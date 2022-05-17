

/* 검색 조건 관련 객체  */
var _search;
(function(window) {
	
	/* 생성자 */
	function Search(a, b, c, d) {
		this.ALL = a || null;
		this.CODE = b || null;
		this.TEXT = c || null;
		this.STATUS = d || null;
	};
	
	/* 현재 입력값 자동 setting */
	Search.prototype.autoSet = function() {
		this.ALL = $('#search_all').val() || null;
		this.CODE = $('#search_code').val() || null;
		this.TEXT = $('#search_text').val() || null;
		this.STATUS = $('#search_status option:selected').val() || null;
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
			// 전체 검색 초기화
			$('#search_all').val('');
			
			// Search Status 초기화 
			$("#search_status option:eq(0)").prop("selected", true);
			$("#search_status").siblings('label').text($("#search_status option:eq(0)").text()).attr('class', 'mark');
			
			// Search Code 초기화 
			$('#search_code').val('');
			
			// Search Text 초기화
			$('#search_text').val('');
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
		if(this.CODE) param.SEARCH_CODE = this.CODE;
		if(this.TEXT) param.SEARCH_TEXT = this.TEXT;
		if(this.STATUS && this.STATUS != '#') param.SEARCH_STATUS = this.STATUS;
		return param;
	}
	/* 검색 조건 초기화 */
	Search.prototype.reset = function() {
		this.ALL = null;
		this.CODE = null;
		this.TEXT = null;
		this.STATUS = null;
		return this;
	}
	window.Search = Search;
	_search = new Search();

})(window);



/*
 * 		page 초기화
 */
function oam0500() {
	
	/* view setting - menu창 숨기기 */
	$('body').addClass('gnb-none');
	//$('body').removeClass('gnb-active');
	//$('.gnb-menu').removeClass('on');
	//$('html').addClass('cms-wrapper');
	
	/*
	 *  # Combobox 생성
	 */
	headerWithSelectBox('_oam.selectCombo', {all: 'onSearch'});
	
	/* 검색창 toggle 버튼 클릭 이벤트 */
	$('#toggle_search').click(function() {
		$(this).parents('.search-wrapper').toggleClass('active');
	});
	
	/* 전체 검색 input keypress 이벤트 */
	$('#search_all').keypress(function(e) {
		if(e.keyCode === 13) {
			// active 해제 
			var parent = $(this).parents('.search-wrapper');
			if(parent.hasClass('active')) parent.removeClass('active');
			
			// 검색 setting
			//_search.autoSet().set('TEXT', null).set('STATUS', null).set('CODE', null).resetForm();
			_search.autoSet().set('TEXT', null).set('STATUS', null).set('CODE', null)
				.resetForm('#search_status').resetForm('#search_code').resetForm('#search_text');
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
		_search.autoSet().set('ALL', null).resetForm('#search_all');
		// page 초기화
		$('#pagenation').children('.active').text(1);
		// 검색
		onSearch();
	});
	
	// search 리셋 버튼 클릭 
	$('#search_reset').click(function() {
		// progress 버튼 리셋
		$('#progress_btn_list span').removeClass('active');
		// page 리셋
		$('#pagenation').children('.active').text(1);
		// 검색 조건, 폼 리셋
		_search.reset().resetForm();
		onSearch();
	});
	
	// progress button 클릭 이벤트
	$('#progress_btn_list span').click(function() {
		
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			_search.autoSet().set('STATUS', null);
		} else {
			$(this).addClass('active').siblings().removeClass('active');
			_search.autoSet().set('STATUS', $(this).attr('status'));
		}
		onSearch();
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
	var data = _oam.mariaDB.getData(ctx + '/oam2/oam_0500/getData.ajax', param);
	
	// 총 갯수 표시
	$('#alarm_cnt').html(data.ALARM_CNT);
	
	// 알람 생성
	makeAlarmList(data.ALARM_LIST);
	
	// 페이지네이션 생성
	makePageNation(parseInt(data.ALARM_CNT), parseInt(data.PAGE_SIZE), parseInt(data.PAGE));
}


/*
 * 	# Alarm List 생성(tr)
 */
function makeAlarmList(data) {
	$('#alarm_list').html('');
	data.forEach((e) => {
		var row = _oam_elements.oam_0500.main.tr_alarm_row({
			id: e.EVENT_ID,
			num: e.RN,
			datetime: e.DATETIME,
			code: e.ALARM_CODE,
			description: e.ALARM_TXT,
			position: e.POSITION,
			status: parseInt(e.STATUS)
		});
		$('#alarm_list').append(row);
		
		// tr에 프로퍼티 추가
		$('tr#tr-'+e.EVENT_ID).css('cursor', 'pointer').prop('info', {
			id: e.EVENT_ID,
		});
		// tr 클릭 이벤트
		$('tr#tr-'+e.EVENT_ID).click(function(){
			window.location = ctx + '/oam2/oam_0500/totalView?EVENT_ID=' + $(this).prop('info').id; 
		});
	});
	if(data.length === 0) $('#alarm_list').append(_oam_elements.oam_0100.main.no_data());
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
			$('#pagenation').children('#nxt_page').before('<a href="javascript:void(0);" class="' + cls + '">' + i + '</a>');
		}
		// 다음 page nation이 있을 경우
		if(e < page_cnt) {
			$('#pagenation').children('#nxt_page').before('<a href="javascript:void(0);" class="nxt_pagenation">...</a>');
			$('.nxt_pagenation').click(function() {
				$('#pagenation > a[class*="active"]').text(e+1);
				onSearch();
			});
		}
		// 이전 page nation이 있을 경우 
		if(current_page > 10) {
			$('#pagenation').children('#pre_page').after('<a href="javascript:void(0);" class="pre_pagenation">...</a>');
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




