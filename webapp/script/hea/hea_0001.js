
/* 검색 조건  */
var _search;
(function(window){
	
	/* 생성자 */
	function Search(a, b, c, d, e){
		//null check
		this.ALL = a || null;	
		this.A = b || null;	
		this.B = c || null;
		this.C = d || null;
    this.D = e || null;
	};
	
	/* 현재 입력값 자동 셋팅 */
	Search.prototype.autoSet = function(){
		this.ALL = $('input#SEARCH_EMP_ALL').val() || null;
		this.A = $('input#id_search_area').val() || null;
		this.B = $('input#id_search_safeCourseCert').val() || null;
		this.C = $('select#id_search_paid').val() || null;
    this.D = $('select#id_search_payment').val() || null;
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
			$('input#SEARCH_EMP_ALL').val('');
			$('input#id_search_area').val('');
			$('input#id_search_safeCourseCert').val('');
			$('select#id_search_paid').val('');
      $('select#id_search_payment').val('');
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
		if(this.A) param.search_area = this.A;
		if(this.B) param.search_safeCourseCert = this.B;
		if(this.C) param.search_paid = this.C;
    if(this.C) param.search_payment = this.D;
		return param;
	}
	
	/* 검색 조건 초기화 */
	Search.prototype.reset = function() {
		this.ALL = null;
		this.A = null;
		this.B = null;
		this.C = null;
    this.D = null;
		return this;
	}
	
	/* 생성자 */
	window.Search = Search;
	_search = new Search();
	
})(window);


function sys0001() {
	
	// 전체 검색 input enter 이벤트 */
	$('input#SEARCH_EMP_ALL').keypress(function(e){
		if(e.keyCode === 13){
			// active 해제 
			var parent = $(this).parents('.search-wrapper');
			if(parent.hasClass('active')) parent.removeClass('active');
			
			// 검색 setting
			//_search.autoSet().set('A',null).set('B',null).set('C', null).set('C', null) 
      //.resetForm('input#id_search_area').resetForm('input#id_search_safeCourseCert')
      //.resetForm('select#id_search_paid').resetForm('select#id_search_payment');
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
		//$(this).parents('.search-wrapper').toggleClass('active');
		
		//검색 setting
		//_search.autoSet().set('ALL',null).resetForm('input#SEARCH_EMP_ALL');
    _search.autoSet();
		
		//page 초기화
		$('div#PAGENATION').children('.active').text(1);
		
		//검색 
		onSearch();
	});
	
	// search 리셋 버튼 클릭
	$('button#SEARCH_RESET_BTN').click(function(){
		// page 리셋
		$('div#PAGENATION').children('.active').text(1);
		//검색조건, 폼 리셋
		_search.reset().resetForm();
		onSearch();
	});
	
	//등록버튼 클릭
	$('button#REGISTER_BTN').click(function(){
		
		window.location = CTX + '/hea/hea_0001/registerForm';
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
	
	// 검색
	var data = _sys.mariaDB.getData(CTX + '/hea/hea_0001/getData.ajax', param);
  if(data.LIST.length==0 && param.PAGE>1){
    param.PAGE--;
    data = _sys.mariaDB.getData(CTX + '/hea/hea_0001/getData.ajax', param);
  }
  
  setLocalObject('paramSearch', param);
	// row 생성
	makeList(data);
	
	// 페이지네이션 생성
	makePageNation(parseInt(data.CNT), parseInt(data.PAGE_SIZE), parseInt(data.PAGE));
	
}


function makeList(data) {
	// 
	$('tbody#ROW_LIST').html('');
	list = data.LIST;
	
	list.forEach((e) => {
    // var ppe_status = _sys.mariaDB.getData(CTX + '/common/popup/popupMutilCommonCode/getDataList.ajax', {CODE : 'PAID_STATE'});
    // var ppe_status_obj={};
    // ppe_status.forEach(e =>{
    //   ppe_status_obj[e.COMM_CD] = e.COMM_NM;
    // })
		// row  
		var sample = 
			'<tr>'
			+ '	<td>' + genIdx(data, e.RN) + '</td>'
			+ '	<td>' + e.EMP_NAME + '</td>'
			+ '	<td>' + e.DUTY_NAME + '</td>'
			+ '	<td>' + castEmptyData(e.POSITION_NM) + '</td>'
			+ '	<td>' + castEmptyData(e.AREA_CD) + '</td>'
			+ '	<td>' + castEmptyData(e.EXPR) + '</td>'
			// + '	<td>' + e.MAIN_EXPR + '</td>'
			// + '	<td>' + e.MAIN_DEGREE + '</td>'
			+ '	<td>' + castEmptyData(e.SAFE_COURSE_CERT) + '</td>'
			+ '	<td>' + castEmptyData(e.CERT_DATE) + '</td>';
    if(e.isNew=='N') sample += '	<td>' + castEmptyData(e.RENEWAL_CERT_DATE) + '</td>';
    if(e.isNew=='Y') sample += '<td>'
    							+ '<span class="renew">'
    							+ '<em>' + castEmptyData(e.RENEWAL_CERT_DATE) + '</em>'
    							+ '</span>'
                                +'  <span class="state-style state3">갱신</span>'
                                +'</td>';

		
		if ( e.PPE_STATUS == 'PAID_STATE-1' ){
			sample = sample + '	<td><span class="state-style state1">지급완료 </span></td>'; 
			
		}else{
			sample = sample + '	<td><span class="state-style state3">미지급 </span></td>';
		}
		
		sample = sample + '</tr>';
		
		sample = $(sample).css('cursor', 'pointer').click(function(event) {
			if(event.target.tagName === 'TD' || event.target.tagName === 'EM' || event.target.tagName === 'SPAN') {
				var info = $(this).prop('info');
				window.location = CTX + '/hea/hea_0001/detailForm?EMP_NO=' + info.EMP_NO;
			}
		});
		 
		$(sample).prop('info', e);
		
		// row 
		$('tbody#ROW_LIST').append(sample);
	});
	
	
	if(list.length === 0) $('tbody#ROW_LIST').append('<tr><td colspan="5" class="NO_DATA">No Data</td><tr>');
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