
/* 검색 조건  */
var _search;

function sft0001() {
	// page nation 버튼 클릭 
	$('a#FST_PAGE').click(movePage);
	$('a#PRE_PAGE').click(movePage);
	$('a#NXT_PAGE').click(movePage);
	$('a#LST_PAGE').click(movePage);
	
	// 행 갯수 option change 
	$('select#PAGE_SIZE').change(onSearch);
	
	//search 버튼 클릭
	$('button#SEARCH_BTN').click(function(){
		//검색 
		onSearch();
	});
	
	// search 리셋 버튼 클릭
	$('#SEARCH_RESET_BTN').click(function(){
    $('select#id_search_tool_type').val("");
		$('id_search_tool_type').val("");
		$('input#id_search_tool_name').val("");
		$('input#id_search_last_date').val("");
		$('input#id_search_first_date').val("");
		$('input#id_search_txt_0001').val("");
		onSearch();
	});
	
	//등록버튼 클릭
	$('#REGISTER_BTN_001').click(function(){
		window.location = CTX + '/sft/sft_0001/formManual?CRUD=C';
	});
	
	$("input#id_search_txt_0001").keyup(function(event) {
		 if (event.keyCode === 13) {
        onSearch();
        }
	});
	
	onSearch();
}

function createSearchParameter() {
	var param = {};
	param.TOOL_TYPE = $('#id_search_tool_type').val();
	param.TOOL_NAME = $('input#id_search_tool_name').val();
	param.PAYMENT_STATUS = $('#id_search_payment_status').val();
	param.SEARCH_FIRST_DT = $('input#id_search_first_date').val();
	param.SEARCH_LAST_DT = $('input#id_search_last_date').val();
	param.all = $('input#id_search_txt_0001').val();
	return param;
}

/* 검색 이벤트 */
function onSearch() {
	var param = {};
	var search =  createSearchParameter();
	
	// 페이징 옵션 
	param.PAGE = $('#PAGENATION').children('.active').text() ? parseInt($('#PAGENATION').children('.active').text()) : page;
	param.PAGE_SIZE = parseInt($('select#PAGE_SIZE option:selected').val());
	
	// 검색 param까지 합치기
	param = Object.assign(param, search);
	
	// 검색
	var data = _sys.mariaDB.getData(CTX + '/sft/sft_0001/getData.ajax', param);
	if(data.LIST.length==0 && param.PAGE>1){
    param.PAGE--;
    data = _sys.mariaDB.getData(CTX + '/sft/sft_0001/getData.ajax', param);
  }
	console.log('data', data);
  
  setLocalObject('paramSearchSft0001', param);
	// 토탈 갯수 표기
//	$('strong#TOTAL_CNT').text(data.CNT);
	
	// row 생성
	makeList(data);
	
	// 페이지네이션 생성
	makePageNation(parseInt(data.CNT), parseInt(data.PAGE_SIZE), parseInt(data.PAGE));
	
}


function makeList(data) {
	// 
	$('tbody#ROW_LIST_0001').html('');
	list = data.LIST;
	list.forEach((e) => {
		// row 생성 
		var sample = 
			'<tr>'
			+ '	<td>' + genIdx(data, e.RN) + '</td>'
			+ '	<td>' + castEmptyData(e.TOOL_TYPE_NAME) + '</td>'
			+ '	<td>' + castEmptyData(e.MANAGE_NO) + '</td>'
			+ '	<td>' + castEmptyData(e.TOOL_NAME) + '</td>'
			+ '	<td>' + castEmptyData(e.STANDARD) + '</td>'
			+ '	<td>' + castEmptyData(e.BRAND_NAME) + '</td>'
			+ '	<td>' + castEmptyData(e.MODEL_NAME) + '</td>'
			+ '	<td>' + castEmptyData(e.AMOUNT) + '</td>'
			+ '	<td>' + castEmptyData(e.LOSS_OR_DAMAGE_NAME) + '</td>'
			+ '	<td>' + castEmptyData(e.CORRECTION_DATE) + '</td>'
      +'<td>'
      +`	<span ${(e.isNew=='Y')?'class="renew"':''}>`
      +'	  <em>'+ castEmptyData(e.RENEW_DATE) +'</em>'
      +'	</span>'
      +   `${(e.isNew=='Y')?'<span class="badge-custom">갱신</span>':''}`
      +'</td>'
			+ '</tr>';
		
		sample = $(sample).css('cursor', 'pointer').click(function(event) {
			if(event.target.tagName === 'TD' || event.target.tagName === 'EM' || event.target.tagName === 'SPAN') {
				var info = $(this).prop('info');
				window.location = CTX + '/sft/sft_0001/detailForm?TOOL_ID=' + info.TOOL_ID;
			}
		});
		
		// 프로퍼티 추가 
		$(sample).prop('info', e);
		
		// row 추가 
		$('tbody#ROW_LIST_0001').append(sample);
	});
	
	// 데이터 0개 일 경우 
	if(list.length === 0) $('tbody#ROW_LIST_0001').append('<tr><td colspan="6" class="NO_DATA">No Data</td><tr>');
};

//page

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