var _search;
(function(window){
	
	/* 생성자 */
	function Search(a,b,c){
		//null check
		this.ALL = a || null;	
		this.A = b || null;	
		this.B = c || null;
    //this.C = d || null;
	};
	
	/* 현재 입력값 자동 셋팅 */
	Search.prototype.autoSet = function(){
		this.ALL = $('input#SEARCH_CRITERIA_ALL').val() || null;
		this.A = $('input#SEARCH_CRITERIA_A').val() || null;
		this.B = $('input#SEARCH_CRITERIA_B').val() || null;
    //this.C = $('input#SEARCH_CRITERIA_C').val() || null;
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
			$('input#SEARCH_CRITERIA_ALL').val('');
			$('input#SEARCH_CRITERIA_ALL').val('');
      $('input#SEARCH_CRITERIA_B').val('');
			//$('input#SEARCH_CRITERIA_C').val('');
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
		if(this.ALL) param.SEARCH_CRITERIA_ALL = this.ALL;
		if(this.A) param.SEARCH_INSPECTION_DATE = this.A;
		if(this.B) param.SEARCH_PAYMENT_STATUS = this.B;
    //if(this.C) param.SEARCH_END_TIME = this.C;
		return param;
	}
	
	/* 검색 조건 초기화 */
	Search.prototype.reset = function() {
		this.ALL = null;
		this.A = null;
		this.B = null;
    //this.C = null;
		return this;
	}
	
	/* 생성자 */
	window.Search = Search;
	_search = new Search();
	
})(window);
function res_0001() {
	
	// 전체 검색 input enter 이벤트 */
	$('input#SEARCH_CRITERIA_ALL').keypress(function(e){
		if(e.keyCode === 13){
			// active 해제 
			var parent = $(this).parents('.search-wrapper');
			if(parent.hasClass('active')) parent.removeClass('active');
			
			// 검색 setting
			// _search.autoSet().set('A',null).set('B',null).resetForm('input#SEARCH_CRITERIA_A').resetForm('input#SEARCH_CRITERIA_B');
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
	$('button#SEARCH_RESET_BTN').click(function(){
		// page 리셋
		$('div#PAGENATION').children('.active').text(1);
		//검색조건, 폼 리셋
		_search.reset().resetForm();
		onSearch();
	});
	
	//등록버튼 클릭
	$('button#REGISTER_BTN').click(function(){
		window.location = CTX + '/res/res_0001/registerForm';
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
	
	// 검색
	var data = _sys.mariaDB.getData(CTX + '/res/res_0001/getData.ajax', param);
	if(data.LIST.length==0 && param.PAGE>1){
    param.PAGE--;
    data = _sys.mariaDB.getData(CTX + '/res/res_0001/getData.ajax', param);
  }
	console.log('data', data);
  
  setLocalObject('paramSearch', param);
	
	// 토탈 갯수 표기
	//$('strong#TOTAL_CNT').text(data.CNT);
	
	// row 생성
	makeList(data);
	
	// 페이지네이션 생성
	makePageNation(parseInt(data.CNT), parseInt(data.PAGE_SIZE), parseInt(data.PAGE));
	
}

var fire_ex_cl_cd ={};
var fire_auto_ex_cl_cd ={};
var fire_alarm_cl_cd ={};
function makeList(data) {
	list = data.LIST;
  fire_ex_cl_cd =  _sys.mariaDB.getData(CTX + '/common/popup/popupMutilCommonCode/getDataList.ajax', {CODE : 'FIRE_EX_CL'});
  fire_auto_ex_cl_cd = _sys.mariaDB.getData(CTX + '/common/popup/popupMutilCommonCode/getDataList.ajax', {CODE : 'FIRE_AUTO_EX_CL'});
  fire_alarm_cl_cd = _sys.mariaDB.getData(CTX + '/common/popup/popupMutilCommonCode/getDataList.ajax', {CODE : 'FIRE_ALARM_CL'}); 
	// 
	$('tbody#ROW_LIST').html('');
	
	// COMPANY 분류
	
		list.forEach((e) => {
			// row 생성 
			var sample = 
      `<tr>`
      +`	<td>` + genIdx(data, e.RN) + `</td>`
      +`	<td>${castEmptyData(e.INSPECTION_DATE)}</td>`
      +`	<td>${castEmptyData(e.TURBINE_NAME)}</td>`
      +`	<td>`+ castEmptyData(e.CHECKER_NAME) +`</td>`
      +`	<td class="txt-left">`
      +`		<p>`+checkListRow(e)+`</p>`
      +`	</td>`
      +`	<td>`
      +`	<span class="badge-custom6 state1">진행 중</span>`
      +`	</td>`
      +`</tr>`;
      
			
			sample = sample + '</tr>';
			
			sample = $(sample).css('cursor', 'pointer').click(function(event) {
				if(event.target.tagName === 'TD' || event.target.tagName === 'EM' || event.target.tagName === 'SPAN' || event.target.tagName === 'P') {
					var info = $(this).prop('info');
					window.location = CTX + '/res/res_0001/detailForm?FIRE_PROTECTION_ID=' + info.FIRE_PROTECTION_ID;
				}
			});
			
			// 프로퍼티 추가 
			$(sample).prop('info', e);
			
			// row 추가 
			$('tbody#ROW_LIST').append(sample);
		});
	
		// 데이터 0개 일 경우 
  	if(list.length === 0) $('tbody#ROW_LIST').append('<tr><td colspan="5" class="NO_DATA">No Data</td><tr>');
	
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

function checkListRow(info){
  var objectCheckList = initDataCheckList(info);
  var checkListStr = makeCheckList(objectCheckList);
  return checkListStr;
}

function initDataCheckList(data){
  var CHECK_LIST ={};

  var fire_ex_cl = data.FIRE_EX_CL.split("!@#");
  var fire_auto_ex_cl = data.FIRE_AUTO_EX_CL.split("!@#");
  var fire_alarm_cl = data.FIRE_ALARM_CL.split("!@#");

  fire_ex_cl.forEach(e => {
    var arr = e.split("=");
    CHECK_LIST[arr[0]] = arr[1];
  });

  fire_auto_ex_cl.forEach(e => {
    var arr = e.split("=");
    CHECK_LIST[arr[0]] = arr[1];
  });

  fire_alarm_cl.forEach(e => {
    var arr = e.split("=");
    CHECK_LIST[arr[0]] = arr[1];
  });

  //console.log(CHECK_LIST);
  var CUSTOM_CHECK_LIST = JSON.parse(data.CUSTOM_CHECK);
  CHECK_LIST.CUSTOM_CHECK_LIST= CUSTOM_CHECK_LIST;
  return CHECK_LIST;
}

function makeCheckList(CHECK_LIST){
  
  var result="";
  var items = 0;
    fire_ex_cl_cd.forEach((e) => {      
      var value = CHECK_LIST[e.COMM_CD];      
      if(value == "RP"){
        if(items == 0) result += e.DESCRPT;
        items++;
      } 
    });
    
    fire_auto_ex_cl_cd.forEach((e) => {
      var value = CHECK_LIST[e.COMM_CD];
      if(value == "RP"){
        if(items == 0) result += e.DESCRPT;
        items++;
      } 
    });
    
    fire_alarm_cl_cd.forEach((e) => {
    var value = CHECK_LIST[e.COMM_CD];
    if(value == "RP"){
      if(items == 0) result += e.DESCRPT;
      items++;
    } 
    });  

    CHECK_LIST.CUSTOM_CHECK_LIST.EX_CL.forEach((e) => {
      var value = e.value; 
      if(value == "RP"){
        if(items == 0) result += e.content;
        items++;
      } 
    });

    CHECK_LIST.CUSTOM_CHECK_LIST.AUTO_EX.forEach((e) => {
      var value = e.value; 
      if(value == "RP"){
        if(items == 0) result += e.content;
        items++;
      } 
    });

    CHECK_LIST.CUSTOM_CHECK_LIST.ALARM_EX.forEach((e) => {
      var value = e.value; 
      if(value == "RP"){
        if(items == 0) result += e.content;
        items++;
      } 
    });

  if(items==1) return result;
  if(items==0) return "-";
  if(items>1) return result+ ", etc";
}
