/**
 * ###### Selector
 * input#SEARCH : 검색
 * a#SEARCH_TOGGLE_BTN : 상세 검색 토글 버튼
 * input#TITLE : 상세검색 제목
 * select#REGISTER : 상세검색 등록자
 * a#DOWNLOAD_BTN : 첨부파일 다운로드 버튼
 * 
 * strong#TOTAL_CNT : 페이지 최대 갯수
 * select#PAGE_SIZE : 페이지 갯수
 * tbody#ROW_LIST : 테이블 리스트
 * 
 * div#PAGENATION : 페이져
 * a#FST_PAGE : 첫 페이지
 * a#PRE_PAGE : 이전 페이지
 * a#NXT_PAGE : 다음 페이지
 * a#LST_PAGE : 마지막 페이지 
 * 
 * a#REGISTER_BTN : 등록 버튼
 */

/* 검색 */
var _search;
(function(window){
	
	/* 생성자  */
	function Search(a, b, c){
		//null check
		this.SEARCH = a || null;
		this.TITLE = b || null;
		this.REGISTER = c || null;
	}
	
	/* 현재 입력값 자동 셋팅 */
	Search.prototype.autoSet = function(){
		this.SEARCH = $('input#SEARCH').val() || null;
		this.TITLE = $('input#TITLE').val() || null;
		this.REGISTER = $('select#REGISTER option:selected').val() || null;
		return this;
	}
	
	/* 입력 폼 리셋 */
	Search.prototype.resetForm = function(target){
		
		if(target){
			if($(target).prop('tagName') === 'INPUT'){
				$(target).val('');
			}else if($(target).prop('tagName') === 'SELECT'){
				$(target + " option:eq(0)").prop("selected", true);
				$(target).siblings('label').text($(target + " option:eq(0)").text());
			}
		}
		else{
			$('input#SEARCH').val('');
			$('input#TITLE').val('');
			
			$('select#REGISTER option:eq(0)').prop("selected", true);
			$("select#REGISTER").siblings('label').text($("select#REGISTER option:eq(0)").text());
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
		if(this.SEARCH) param.SEARCH_ALL = this.SEARCH;
		if(this.TITLE) param.SEARCH_TITLE = this.TITLE;
		if(this.REGISTER) param.SEARCH_USER_ID = this.REGISTER;
		return param;
	}
	
	/* 검색 조건 초기화 */
	Search.prototype.reset = function() {
		this.SEARCH = null;
		this.TITLE = null;
		this.REGISTER = null;
		return this;
	}
	
	/* 생성자 */
	window.Search = Search;
	_search = new Search();
})(window);

/* 초기화 */
function sys0700(){
	
	//검색 폼 토글 버튼 클릭 이벤트
	$('a#SEARCH_TOGGLE_BTN').click(function() {
		$(this).parents('div.search-wrapper').toggleClass('active');
	});
	
	//전체 검색 input enter 이벤트
	$('input#SEARCH').keypress(function(e){
		if(e.keyCode === 13){
			//active 해제
			var parents = $(this).parents('.search-wrapper');
			if(parents.hasClass('active')) parents.removeClass('active');
			
			//검색 setting
			_search.autoSet().set('TITLE', null).set('REGISTER', null).resetForm('input#TITLE').resetForm('select#REGISTER');
			
			onSearch();
		}
	});
	
	/* 검색 조건 input enter = search 버튼 클릭*/
	$('ul.detail-search-lst li input').keypress(function(e){
		if(e.keyCode === 13) $('button#SEARCH_BTN').click();
	});
	
	//페이지네이션 버튼 클릭시
	$('a#FST_PAGE').click(movePage);
	$('a#PRE_PAGE').click(movePage);
	$('a#NXT_PAGE').click(movePage);
	$('a#LST_PAGE').click(movePage);

	//total 행 갯수 option change
	$('select#PAGE_SIZE').change(onSearch);
	
	//search 버튼 클릭
	$('button#SEARCH_BTN').click(function(){
		//검색창 닫기
		$(this).parents('.search-wrapper').toggleClass('active');
		
		//검색 setting
		_search.autoSet().set('ALL',null).resetForm('input#SEARCH');
		
		//page 초기화
		$('div#PAGENATION').children('.active').text(1);
		
		//검색 
		onSearch();
	});
	
	// 검색폼 리셋버튼 클릭 이벤트
	$('a#SEARCH_RESET_BTN').click(function(){
		//리스트 리셋
		$('div#PAGENATION').children('.active').text(1);
		//검색조건, 폼 리셋
		_search.reset().resetForm();
		onSearch();
	});
	
	//등록버튼 클릭
	$('a#REGISTER_BTN').click(function(){
		window.location = ctx + '/sys_new/sys_0700/registerForm';
	});
	

	
	onSearch();
}

/* 검색 이벤트 */
function onSearch(){
	
	var param = {};
	
	//페이징 옵션
	param.PAGE = $('#PAGENATION').children('.active').text() ? parseInt($('#PAGENATION').children('.active').text()) : 1;
	param.PAGE_SIZE = parseInt($('select#PAGE_SIZE option:selected').val());
	
	//검색 param까지 합치기
	param = Object.assign(param, _search.getParam());
	console.log(param);
	
	//검색
	var data = _sys.mariaDB.getData(CTX + '/sys_new/sys_0700/getData.ajax', param);
	console.log(data);
	
	//토탈 갯수 표시
	$('strong#TOTAL_CNT').text(data.CNT);
	
	//row 생성
	makeList(data.LIST);
	
	//페이지네이션 생성
	makePageNation(parseInt(data.CNT), parseInt(data.PAGE_SIZE), parseInt(data.PAGE));
}

// 리스트 row 
function makeList(list){
	$('tbody#ROW_LIST').html('');
	
	list.forEach((e) => {
		//row 생성
		var sample =  _sys_elements.sys_0700.main.tr_notice_row({
			RN: e.RN,
			TITLE: e.TITLE,
			REGISTER: e.REGISTER,
			INS_DATETIME: e.INS_DATETIME,
			ATCH_FILE: e.ATCH_FILE,
			STATUS: e.STATUS,
		});
			
		// 프로퍼티 추가 
		sample = $(sample).prop('info', e);
		
		sample = $(sample).css('cursor', 'pointer').click(function(e) {
			if(e.target.tagName === 'TD') {
				var info = $(this).prop('info');
				window.location = CTX + '/sys_new/sys_0700/detailForm?NOTICE_ID=' + info.NOTICE_ID;
			}
		});
		
		if(e.ATCH_FILE) {
			
			sample = $(sample).find('.download-btn').click(function(event){
				if(event.target.tagName === 'I') {
					var splitUrl = (e.NEW_FLE_NM).split(".");
					var fileName = splitUrl[0];
					console.log(fileName);
					window.location = encodeURI(CTX + '/sys_new/sys_0700/downloadFile.ajax?NEW_FLE_NM=' + fileName + '&FLE_TP=' + e.FLE_TP + '&FLE_PATH=' + e.FLE_PATH + '&FLE_NM=' + e.FLE_NM);
				}
			}).parents('tr');
		}
		
		
//		$('a#DOWNLOAD_BTN').click(function(e){
//			var info = $(this).prop('info');
//			window.location = CTX + '/sys_new/sys_0700/downloadFile.ajax?NOTICE_ID=' + info.NOTICE_ID;
//		});
//		sample = $(sample).find('a#DOWNLOAD_BTN').click(function(e){
//			if(event.target.tagName === 'TD' || event.target.tagName === 'EM' || event.target.tagName === 'SPAN') {
//				var info = $(this).prop('info');
//				window.location = CTX + '/sys_new/sys_0700/downloadFile.ajax?NOTICE_ID=' + info.NOTICE_ID;
//			}
//		});
		
		
		
		// row 추가 
		$('tbody#ROW_LIST').append(sample);
	});
	// 데이터 0개 일 경우 
	if(list.length === 0) $('tbody#ROW_LIST').append(_sys_elements.sys_0700.main.no_data());
}		

		
//		data.forEach((e) => {
//			var row = _sys_elements.sys_0700.main.tr_notice_row({
//				RN: e.RN,
//				TITLE: e.TITLE,
//				REGISTER: e.REGISTER,
//				INS_DATETIME: e.INS_DATETIME,
//				ATCH_FILE: e.ATCH_FILE,
//				STATUS: e.STATUS,
//			});
//			// tr에 프로퍼티 추가
//			row = $(row).prop('info',e);
//			
//			//tr css, 클릭 이벤트 추가
//			row = $(row).css('cursor', 'pointer').click(function(e){
//				if(event.target.tagName === 'TD'){
//					var info = $(this).prop('info');
//					window.location = CTX + '/sys_new/sys_0700/detailForm?NOTICE_ID=' + info.NOTICE_ID;
//				}
//			});
//			
//			//tr 첨부파일 다운로드 버튼 클릭 이벤트 추가
//			row = $(row).find('a#DOWNLOAD_BTN').click(function(e){
//				if($(e.target).prop('tagName') === 'TD'){
//					var info = $(this).parents('tr').prop('info');
//					window.location.href = CTX + '/sys_new/sys_0700/downloadFile.ajax?NOTICE_ID=' + info.NOTICE_ID;
//				}
//			}).parents('tr');
//			
//			// row 추가 
//			$('tbody#ROW_LIST').append(row);
//		});
	

//페이지네이션
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

//페이지 이동
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








