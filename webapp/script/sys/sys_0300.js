
/* 검색 조건  */
var _search;
(function(window){
	
	/* 생성자 */
	function Search(a, b, c, d){
		//null check
		this.ALL = a || null;	
		this.A = b || null;	
		this.B = c || null;
		this.C = d || null;
	};
	
	/* 현재 입력값 자동 셋팅 */
	Search.prototype.autoSet = function(){
		this.ALL = $('input#SEARCH_CRITERIA_ALL').val() || null;
		this.A = $('input#SEARCH_CRITERIA_A').val() || null;
		this.B = $('input#SEARCH_CRITERIA_B').val() || null;
		this.C = $('input#SEARCH_CRITERIA_C').val() || null;
		return this;
	} 
	
	/* 입력 폼 리셋 */
	Search.prototype.resetForm = function(target) {
		
		if($(target).prop('tagName') === 'INPUT'){
			$(target).val('');
		}else {
			$('[id*=SEARCH_CRITERIA').val('');
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
		if(this.A) param.SEARCH_USER_ID = this.A;
		if(this.B) param.SEARCH_USER_NM = this.B;
		if(this.C) param.SEARCH_COMP_NM = this.C;
		return param;
	}
	
	/* 검색 조건 초기화 */
	Search.prototype.reset = function() {
		this.ALL = null;
		this.A = null;
		this.B = null;
		this.C = null;
		return this;
	}
	
	/* 생성자 */
	window.Search = Search;
	_search = new Search();
	
})(window);


function sys0300() {
	// 검색 폼 토글 버튼 클릭 이벤트 
	/*$('a#SEARCH_TOGGLE_BTN').click(function() {
		$(this).parents('div.search-wrapper').toggleClass('active');
	});*/
	
	// 전체 검색 input enter 이벤트 */
	$('input#SEARCH_CRITERIA_ALL').keypress(function(e){
		if(e.keyCode === 13){
			// active 해제 
			var parent = $(this).parents('.search-wrapper');
			if(parent.hasClass('active')) parent.removeClass('active');
			
			// 검색 setting
			//_search.autoSet().set('A',null).set('B',null).resetForm('input#SEARCH_CRITERIA_A').resetForm('input#SEARCH_CRITERIA_B');
			_search.autoSet();
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
		//_search.autoSet().set('ALL',null).resetForm('input#SEARCH_CRITERIA_ALL');
		_search.autoSet();
		//page 초기화
		$('div#PAGENATION').children('.active').text(1);
		
		//검색 
		onSearch();
	});
	
	// search 리셋 버튼 클릭
	$('#SEARCH_RESET_BTN').click(function(){
		// page 리셋
		$('div#PAGENATION').children('.active').text(1);
		//검색조건, 폼 리셋
		_search.reset().resetForm();
		$('input#SEARCH_CRITERIA_A').val("");
		$('input#SEARCH_CRITERIA_B').val("");
		$('input#SEARCH_CRITERIA_C').val("");
		onSearch();
	});
	
	//등록버튼 클릭
	$('#REGISTER_BTN').click(function(){
		window.location = CTX + '/com/com_0101/registerForm';
	});
	
	onSearch();
}


/* 검색 이벤트 */
function onSearch() {
	var param = {};
	
	// 페이징 옵션 
	param.PAGE = $('#PAGENATION').children('.active').text() ? parseInt($('#PAGENATION').children('.active').text()) : page;
	param.PAGE_SIZE = parseInt($('select#PAGE_SIZE option:selected').val());
	
	// 검색 param까지 합치기
	param = Object.assign(param, _search.getParam());
	console.log(param);
	
	// COMPANY_ID 가 있을 경우(Organization Management 에서 넘어옴) => 최초 1번 COMPANY_ID로 검색  
	if($('input#COMPANY_ID').val()) {
		param.COMPANY_ID = $('input#COMPANY_ID').val();
		$('input#COMPANY_ID').val('');
	}
	
	// 검색
	var data = _sys.mariaDB.getData(CTX + '/com/com_0101/getData.ajax', param);
	if(data.LIST.length==0 && param.PAGE>1){
    param.PAGE--;
    data = _sys.mariaDB.getData(CTX + '/com/com_0101/getData.ajax', param);
  }
	console.log('data', data);
  
  setLocalObject('paramSearch', param);
	
	// 토탈 갯수 표기
	$('strong#TOTAL_CNT').text(data.CNT);
	
	// row 생성
	makeList(data);
	
	// 페이지네이션 생성
	makePageNation(parseInt(data.CNT), parseInt(data.PAGE_SIZE), parseInt(data.PAGE));
	
}


function makeList(data) {
	// 
	list = data.LIST;
	$('tbody#ROW_LIST').html('');
	list.forEach((e) => {
		// row 생성 
		var sample = 
			'<tr>'
			+ '	<td>' + genIdx(data, e.RN) + '</td>'
			+ '	<td>' + castEmptyData(e.USER_ID) + '</td>'
			+ '	<td>' + castEmptyData(e.USER_NM) + '</td>'
			+ '	<td>' + castEmptyData(e.INS_DATETIME) + '</td>'
			+ '	<td>' + (e.RECENT_LOGIN_DATETIME ? e.RECENT_LOGIN_DATETIME : 'X') + '</td>'
			+ '</tr>';
		
		sample = $(sample).css('cursor', 'pointer').click(function(event) {
			if(event.target.tagName === 'TD' || event.target.tagName === 'EM' || event.target.tagName === 'SPAN') {
				var info = $(this).prop('info');
				window.location = CTX + '/com/com_0101/detailForm?USER_UID=' + info.USER_UID;
			}
		});
		
		// 프로퍼티 추가 
		$(sample).prop('info', e);
		
		// row 추가 
		$('tbody#ROW_LIST').append(sample);
	});
	
	// 데이터 0개 일 경우 
	if(list.length === 0) $('tbody#ROW_LIST').append('<tr><td colspan="6" class="NO_DATA">No Data</td><tr>');
};

function makePageNation(row_cnt, row_size, current_page) {
	// 기존 pagenation 초기화
	$('div#PAGENATION').css('display', 'block');
	$('div#PAGENATION > a[class*="page"]').remove();
	
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