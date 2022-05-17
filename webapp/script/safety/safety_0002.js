
/* 검색 조건  */
function sft0002() {
	debugger
	// page nation 버튼 클릭 
	$('a#FST_PAGE0002').click(movePage0002);
	$('a#PRE_PAGE0002').click(movePage0002);
	$('a#NXT_PAGE0002').click(movePage0002);
	$('a#LST_PAGE0002').click(movePage0002);
	
	// 행 갯수 option change 
	$('select#PAGE_SIZE0002').change(onSearch);
	
	//search 버튼 클릭
	$('button#SEARCH_BTN0002').click(function(){
		//검색 
		onSearch0002();
	});
	
	// search 리셋 버튼 클릭
	$('#SEARCH_RESET_BTN0002').click(function(){
		$('select#id_search_project_name').val("");
		$('input#id_emp_str_uid_key_search_0002').val("");
		$('input#id_search_grantDate').val("");
		$('input#id_search_txt').val("");
		onSearch0002();
	});
	
	//등록버튼 클릭
	$('#REGISTER_BTN_0002').click(function(){
		window.location = CTX + '/sft/sft_0002/formManual?CRUD=C';
	});
	
	$("input#id_search_txt").keyup(function(event) {
		 if (event.keyCode === 13) {
        onSearch0002();
        }
	});
	onSearch0002();
}

function createSearchParameter0002() {
	var param = {};
	param.PROJECT_ID = $('#id_search_project_name').val();
	param.REGISTER_USER = $('input#id_emp_str_uid_key_search_0002').val();
	param.GRANT_DATE = $('input#id_search_grantDate').val();
	param.all = $('input#id_search_txt').val();
	return param;
}

/* 검색 이벤트 */
function onSearch0002() {
	var param = {};
	var search =  createSearchParameter0002();
	
	// 페이징 옵션 
	param.PAGE = $('#PAGENATION0002').children('.active').text() ? parseInt($('#PAGENATION0002').children('.active').text()) : page;
	param.PAGE_SIZE = parseInt($('select#PAGE_SIZE0002 option:selected').val());
	
	// 검색 param까지 합치기
	param = Object.assign(param, search);
	
	// 검색
	var data = _sys.mariaDB.getData(CTX + '/sft/sft_0002/getData.ajax', param);
	if(data.LIST.length==0 && param.PAGE>1){
    param.PAGE--;
    data = _sys.mariaDB.getData(CTX + '/sft/sft_0002/getData.ajax', param);
  }
	console.log('data', data);
  
  setLocalObject('paramSearchSft0002', param);
	// 토탈 갯수 표기
//	$('strong#TOTAL_CNT').text(data.CNT);
	
	// row 생성
	makeList0002(data);
	
	// 페이지네이션 생성
	makePageNation0002(parseInt(data.CNT), parseInt(data.PAGE_SIZE), parseInt(data.PAGE));
	
}


function makeList0002(data) {
	// 
	$('tbody#ROW_LIST_0002').html('');
	list = data.LIST;
	list.forEach((e) => {
		var tmpReturnCol = "";
		if(e.REVOKE_DATE == null || e.REVOKE_DATE == ""){
			tmpReturnCol = '<td> <span class="badge-custom5">미반납</span> </td>'
		}else{
			tmpReturnCol = '<td>' + e.REVOKE_DATE + '</td>'
		}
		// row 생성 
		var sample = 
			'<tr>'
			+ '	<td>' + genIdx(data, e.RN) + '</td>'
			+ '	<td class="txt-left">' + castEmptyData(e.PROJECT_NAME) + '</td>'
			+ '	<td class="txt-left">' + castEmptyData(e.tmpToolName) + '</td>'
			+ '	<td>' + castEmptyData(e.GRANT_DATE) + '</td>'
			+ '	<td>' + castEmptyData(e.EXPECT_REVOKE_DATE) + '</td>'
			+ tmpReturnCol
			+ '	<td>' + castEmptyData(e.REGISTER_USER_NAME) + '</td>'
			+ '	<td>' + castEmptyData(e.APPROVE_USER_NAME) + '</td>'
			+ '</tr>';
		
		sample = $(sample).css('cursor', 'pointer').click(function(event) {
			if(event.target.tagName === 'TD' || event.target.tagName === 'EM' || event.target.tagName === 'SPAN') {
				var info = $(this).prop('info');
				window.location = CTX + '/sft/sft_0002/detailForm?TOOL_GRANT_REVOKE_ID=' + info.TOOL_GRANT_REVOKE_ID;
			}
		});
		
		// 프로퍼티 추가 
		$(sample).prop('info', e);
		
		// row 추가 
		$('tbody#ROW_LIST_0002').append(sample);
	});
	
	// 데이터 0개 일 경우 
	if(list.length === 0) $('tbody#ROW_LIST_0002').append('<tr><td colspan="6" class="NO_DATA">No Data</td><tr>');
};






//page

function makePageNation0002(row_cnt, row_size, current_page) {
	// 기존 pagenation 초기화
	$('div#PAGENATION0002').css('display', 'block');
	$('div#PAGENATION0002 > a[class*="page"]').remove();
	
	// 생성 될 수 있는 전체 페이지 수 
	var page_cnt = parseInt(row_cnt / row_size);
	page_cnt = row_cnt % row_size > 0 ? page_cnt + 1 : page_cnt;
	$('a#FST_PAGE0002').prop('page', 1);
	$('a#LST_PAGE0002').prop('page', page_cnt);
	
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
			$('div#PAGENATION0002').children('#NXT_PAGE0002').before('<a href="javascript:void(0);" class="' + cls + '">' + i + '</a>');
		}
		// 다음 page nation이 있을 경우
		if(e < page_cnt) {
			$('div#PAGENATION0002').children('#NXT_PAGE0002').before('<a href="javascript:void(0);" class="NXT_PAGENATION0002">...</a>');
			$('.NXT_PAGENATION0002').click(function() {
				$('div#PAGENATION0002 > a[class*="active"]').text(e+1);
				onSearch0002();
			});
		}
		// 이전 page nation이 있을 경우 
		if(current_page > 10) {
			$('div#PAGENATION0002').children('#PRE_PAGE0002').after('<a href="javascript:void(0);" class="PRE_PAGENATION">...</a>');
			$('.PRE_PAGENATION0002').click(function() {
				$('div#PAGENATION0002 > a[class*="active"]').text(s-1);
				onSearch0002();
			});
		}
		// pagenation click event
		$('div#PAGENATION0002 > a[class="page"]').click(function() {
			$(this).addClass('active');
			$(this).siblings('.active').removeClass('active');
			onSearch0002();
		});
	} else {
		$('div#PAGENATION0002').css('display', 'none');
	}
}

function movePage0002() {
	var process = $(this).attr('id').split('_')[0];
	var current_page = parseInt($('div#PAGENATION0002 > a[class*="active"]').text());
	var last_page = $('#LST_PAGE0002').prop('page');
	
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
	$('div#PAGENATION0002 > a[class*="active"]').text(move_page);
	onSearch0002();
}