
/* 검색 조건  */
var _search;
function safety_0200() {
    // page nation 버튼 클릭 
    $('a#FST_PAGE').click(movePage);
    $('a#PRE_PAGE').click(movePage);
    $('a#NXT_PAGE').click(movePage);
    $('a#LST_PAGE').click(movePage);
    
    $('select#PAGE_SIZE').change(onSearch);
    $('button#SEARCH_BTN').click(function(){
		//검색창 닫기
		
		onSearch();
	});
		$('#SEARCH_RESET_BTN').click(function(){
		//document.getElementById("id_search_work_type").selectedIndex = "0";
		$('#id_search_work_type').val("");
		$('input#id_search_course_first_date').val("");
		$('input#id_search_course_last_date').val("");
		$('input#id_search_txt').val("");
		onSearch();
	});
	//등록버튼 클릭
	
	$('#REGISTER_BTN').click(function(){
		 window.location = CTX + '/sft/sft_0201/registerForm?CRUD=C';
	});
	
	$("input#id_search_txt").keyup(function(event) {
		 if (event.keyCode === 13) {
        onSearch();
        }
	});
	
	onSearch();
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
	console.log(param);
	

	// 검색
	var data = _sys.mariaDB.getData(CTX + '/sft/sft_0201/getData.ajax', param);
  if(data.LIST.length==0 && param.PAGE>1){
    param.PAGE--;
    data = _sys.mariaDB.getData(CTX + '/sft/sft_0201/getData.ajax', param);
  }
	console.log('data', data);
  
  setLocalObject('paramSearch', param);
	
	// row 생성
	makeList(data);
	
	// 페이지네이션 생성
	makePageNation(parseInt(data.CNT), parseInt(data.PAGE_SIZE), parseInt(data.PAGE));
	
}

function createSearchParameter() {
	var param = {};
	param.SEARCH_FIRST_DT = $('input#id_search_course_first_date').val();
	param.SEARCH_LAST_DT = $('input#id_search_course_last_date').val();
	param.WORK_TYPE = $('#id_search_work_type').val();
	param.payment = $('input#id_search_payment').val();
	param.all = $('input#id_search_txt').val();
	return param;
}

function makeList(data) {
	// 
	$('tbody#ROW_LIST').html('');
	list = data.LIST;
	list.forEach((e) => {
		var tmpCnt =  e.CNT_TRAINEE_MORE;
		var tmpMore = "";
		if(tmpCnt > 0){
			tmpMore =  " " +$('#id_msg_and').val()+ "  " + tmpCnt + $('#id_msg_other').val();
		}
		// row 생성 
		var sample = 
			'<tr>'
			+ '	<td>' + genIdx(data, e.RN) + '</td>'
			+ '	<td>' + castEmptyData(e.DOC_NO) + '</td>'
			+ '	<td>' + castEmptyData(e.PROJECT_NAME) + '</td>'
			+ '	<td>' + castEmptyData(e.WORK_TYPE) + '</td>'
			+ '	<td>' + castEmptyData(e.COURSE_DATE) + '</td>'
			+ '	<td>' + castEmptyData(e.PLACE) + '</td>'
			+ '	<td>' + castEmptyData(e.TRAINER_NAME) + '</td>'
			+ '	<td>' + castEmptyData(e.FIRST_TRAINEE_NAME) + tmpMore + '</td>'
			+ '</tr>';
		
		sample = $(sample).css('cursor', 'pointer').click(function(event) {
			if(event.target.tagName === 'TD' || event.target.tagName === 'EM' || event.target.tagName === 'SPAN') {
				var info = $(this).prop('info');
				window.location = CTX + '/sft/sft_0201/detailForm?SAFE_COURSE_ID='
				+ info.SAFE_COURSE_ID;s
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

function getEmps(strEmp){
  var param = {};
	
  param.strUid = strEmp;
  var result='';
  var empInfos = _sys.mariaDB.getData(CTX + '/common/getEmpInfoWithStrUid.ajax', param);
  if(empInfos.length==1) return empInfos[0].EMP_NAME;
  
  if(empInfos.length>1)  return empInfos[0].EMP_NAME+" 외 "+(empInfos.length-1)+"인";

  return result;
}

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