
/* 검색 조건  */
var _search;
function tsk_0200() {

  // 전체 검색 input enter 이벤트 */
	$('input#id_search_txt').keypress(function(e){
		if(e.keyCode === 13){
      // $('select#id_search_work_type').val("");
      // $('#id_search_payment').val("");
      // $('input#id_search_work_date_first').val("");
      // $('input#id_search_work_date_last').val("");
			
			onSearch();
		}
	});

	// page nation 버튼 클릭 
	$('a#FST_PAGE').click(movePage);
	$('a#PRE_PAGE').click(movePage);
	$('a#NXT_PAGE').click(movePage);
	$('a#LST_PAGE').click(movePage);

	// 행 갯수 option change 
	$('select#PAGE_SIZE').change(onSearch);

	//search 버튼 클릭

	$('button#SEARCH_BTN').click(function() {
		//검색창 닫기
    //$('input#id_search_txt').val("");
		onSearch();
	});

	// search 리셋 버튼 클릭
	$('#SEARCH_RESET_BTN').click(function() {
    $('select#id_search_work_type').val("");
		$('#id_search_payment').val("");
		$('input#id_search_work_date_first').val("");
		$('input#id_search_work_date_last').val("");
		$('input#id_search_txt').val("");
		onSearch();
	});
	//등록버튼 클릭

	$('#REGISTER_BTN').click(function() {
		window.location = CTX + '/tsk/tsk_0200/registerForm?CRUD=C';
	});

	onSearch();
}


function onSearch() {
	var param = {};
	var search = createSearchParameter();
	// 페이징 옵션 
	param.PAGE = $('#PAGENATION').children('.active').text() ? parseInt($('#PAGENATION').children('.active').text()) : page;
	param.PAGE_SIZE = parseInt($('select#PAGE_SIZE option:selected').val());
	param = Object.assign(param, search);

	// 검색
	var data = _sys.mariaDB.getData(CTX + '/tsk/tsk_0200/getData.ajax', param);
	if(data.LIST.length==0 && param.PAGE>1){
    param.PAGE--;
    data = _sys.mariaDB.getData(CTX + '/tsk/tsk_0200/getData.ajax', param);
  }
	console.log('data', data);
  
  setLocalObject('paramSearch', param);
	

	// 토탈 갯수 표기
	$('#TOTAL_CNT').text(data.CNT);

	// row 생성
	makeList(data);

	// 페이지네이션 생성
	makePageNation(parseInt(data.CNT), parseInt(data.PAGE_SIZE), parseInt(data.PAGE));

}

function getEmps(strEmp) {
	var param = {};

	param.strUid = strEmp;
	var result = '';
	var empInfos = _sys.mariaDB.getData(CTX + '/common/getEmpInfoWithStrUid.ajax', param);
	if (empInfos.length == 1) return empInfos[0].EMP_NAME;

	if (empInfos.length > 1) return empInfos[0].EMP_NAME + " 외 " + (empInfos.length - 1) + "인";

	return result;
}

function getEquids(strEquips) {
	var param = {};

	param.strUid = strEquips;
	var result = '';
	var editedText = '';
	var empInfos = _sys.mariaDB.getData(CTX + '/common/getPersEquipmentWithComcd.ajax', param);
	if (empInfos.length == 1) return empInfos[0].STATUS;

	if (empInfos.length > 1) {
		for (let i = 0; i < empInfos.length; i++) {
			result += empInfos[i].STATUS + ",";
		}
		editedText = result.slice(0, -1);
		return editedText;
	}

	return result;
}

function createSearchParameter() {
	var param = {};
	param.WORK_TYPE = $('#id_search_work_type').val();
	param.payment = $('input#id_search_payment').val();
	param.SEARCH_FIRST_DATE = $('input#id_search_work_date_first').val();
	param.SEARCH_LAST_DATE = $('input#id_search_work_date_last').val();
	param.all = $('input#id_search_txt').val();
	return param;
}

function convertJson(inp,name) {
	var parsedWorK = JSON.parse(inp);
	var result = '';
	var editedText = '';
	for (let i = 0; i < parsedWorK.length; i++) {
		result += parsedWorK[i][name] + " | ";

	}
	editedText = result.slice(0, -1);
	return editedText;
}

function makeList(data) {
	// 
	$('tbody#ROW_LIST').html('');
	list = data.LIST;
	// COMPANY 분류
	list.forEach((e) => {
		// row 생성 
		var tmpCnt =  e.CNT_PARTICIPANTS_MORE;
		var tmpMore = "";
		if(tmpCnt > 0){
			tmpMore =  " " +$('#id_msg_and').val()+ "  " + tmpCnt + $('#id_msg_other').val();
		}
		var sample =
			'<tr>'
			+ '	<td>' + genIdx(data, e.RN) + '</td>'
			+ '	<td class="txt-left">' + castEmptyData(e.PROJECT_NAME) + '</td>'
			+ '	<td>' + castEmptyData(e.WORK_DATE) + '</td>'
			+ '	<td class="txt-left">' + castEmptyData(convertJson(e.WORK_CONTENT,"WORK_CONTENT")) + '</td>'
			+ '	<td>' + castEmptyData(e.MANAGER_NAME) + '</td>'
			+ ' <td>'+ castEmptyData(e.FIRST_PARTICIPANTS_NAME) + tmpMore +'</td>'
			+ '	<td>' + castEmptyData(e.CONSUMABLES_NM) + '</td>'
//			 D : state-color
//           1. 수행완료 : badge-custom + complete                       
//           2. 수행전 : badge-custom + before
			+ '	<td>' +'<span class="badge-custom complete">수행완료</span>' +'</td>'
//			  D : state-color
//            1. 진행중 : badge-custom6 + state1
//            2. 반려 : badge-custom6 + state2
//            3. 결재 완료 : badge-custom6 + state3
			+ '	<td>' + '<span class="badge-custom6 state1">진행 중</span>' +'</td>'
			+ '</tr>';

		sample = $(sample).css('cursor', 'pointer').click(function(event) {
			if(event.target.tagName === 'TD' || event.target.tagName === 'EM' || event.target.tagName === 'SPAN') {
				var info = $(this).prop('info');
				window.location = CTX + '/tsk/tsk_0200/detailForm?RISK_ASSESSMENT_ID=' + info.RISK_ASSESSMENT_ID;
			}
		});

		// 프로퍼티 추가 
		$(sample).prop('info', e);

		// row 추가 
		$('tbody#ROW_LIST').append(sample);
	});

	// 데이터 0개 일 경우 
	if (list.length === 0) $('tbody#ROW_LIST').append('<tr><td colspan="11" class="NO_DATA">No Data</td><tr>');
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

	var s = (mok * 10) + 1;
	var e = (mok + 1) * 10 > page_cnt ? page_cnt : (mok + 1) * 10;

	if (page_cnt > 0) {
		// pagenation 삽입
		for (var i = s; i <= e; i++) {
			var cls = i === current_page ? 'page active' : 'page';
			$('div#PAGENATION').children('#NXT_PAGE').before('<a href="javascript:void(0);" class="' + cls + '">' + i + '</a>');
		}
		// 다음 page nation이 있을 경우
		if (e < page_cnt) {
			$('div#PAGENATION').children('#NXT_PAGE').before('<a href="javascript:void(0);" class="NXT_PAGENATION">...</a>');
			$('.NXT_PAGENATION').click(function() {
				$('div#PAGENATION > a[class*="active"]').text(e + 1);
				onSearch();
			});
		}
		// 이전 page nation이 있을 경우 
		if (current_page > 10) {
			$('div#PAGENATION').children('#PRE_PAGE').after('<a href="javascript:void(0);" class="PRE_PAGENATION">...</a>');
			$('.PRE_PAGENATION').click(function() {
				$('div#PAGENATION > a[class*="active"]').text(s - 1);
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

	if (current_page === 1 && (process === 'FST' || process === 'PRE')) return;
	if (current_page === last_page && (process === 'NXT' || process === 'LST')) return;

	var move_page;
	switch (process) {
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