/* 검색 조건  */
var _search;
(function(window){
	
	/* 생성자 */
	function Search(a, b, c , d){
		//null check
		this.ALL = a || null;	
		this.A = b || null;	
		this.B = c || null;
    this.C = d || null;
	};
	
	/* 현재 입력값 자동 셋팅 */
	Search.prototype.autoSet = function(){
		this.ALL = $('input#SEARCH_MENU_ALL').val() || null;
		this.A = $('select#SEARCH_MENU_A option:selected').val() || null;
		this.B = $('input#SEARCH_MENU_B').val() || null;
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
			$('input#SEARCH_MENU_ALL').val('');
			$('select#SEARCH_MENU_A').val('');
			$('input#SEARCH_MENU_B').val('');
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
		if(this.A) param.SEARCH_STATUS = this.A;
		if(this.B) param.SEARCH_PAYMENT_STATUS = this.B;
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

function com020100(){

  // 전체 검색 input enter 이벤트 */
	$('input#SEARCH_MENU_ALL').keypress(function(e){
		if(e.keyCode === 13){
			// active 해제 
			var parent = $(this).parents('.search-wrapper');
			if(parent.hasClass('active')) parent.removeClass('active');
			
			// 검색 setting
			//_search.autoSet().set('A',null).set('B',null).resetForm('select#SEARCH_MENU_A').resetForm('input#SEARCH_MENU_B');
      _search.autoSet();
			
			onSearch();
		}
	});

  /* 검색 조건 input */
	$('ul.detail-search-lst li input').keypress(function(e) {
		if(e.keyCode === 13) $('button#SEARCH_BTN').click();
	});

  //search 버튼 클릭
	$('button#SEARCH_BTN').click(function(){
		//검색창 닫기
		//$(this).parents('.search-wrapper').toggleClass('active');
		
		//검색 setting
		//_search.autoSet().set('ALL',null).resetForm('input#SEARCH_MENU_ALL'); remove search all when click btn
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



  //ok	
	// page nation 버튼 클릭 
	$('a#FST_PAGE').click(movePage);
	$('a#PRE_PAGE').click(movePage);
	$('a#NXT_PAGE').click(movePage);
	$('a#LST_PAGE').click(movePage);
	
	// 행 갯수 option change 
	$('select#PAGE_SIZE').change(onSearch);

  //등록버튼 클릭
  	$('button#REGISTER_BTN').click(function(){		
		window.location = CTX + '/com/com_0201/form/newTurbine.part?CRUD=C';
	});
  //-ok
	
	onSearch();
}

function onSearch() {
	
	var param = {};
	
	// 페이징 옵션 
	param.PAGE = $('#PAGENATION').children('.active').text() ? parseInt($('#PAGENATION').children('.active').text()) : page;
	param.PAGE_SIZE = parseInt($('select#PAGE_SIZE option:selected').val());
	
	// 검색 param까지 합치기
	param = Object.assign(param, _search.getParam());
	
	// 검색
	var data = _sys.mariaDB.getData(CTX + '/com/com_0201/getData.ajax', param);
	if(data.LIST.length==0 && param.PAGE>1){
    param.PAGE--;
    data = _sys.mariaDB.getData(CTX + '/com/com_0201/getData.ajax', param);
  }
  
  setLocalObject('paramSearch', param);
	
	// 토탈 갯수 표기
	//$('strong#TOTAL_CNT').text(data.CNT);
	
	// row 생성
	makeList(data);
	
	// 페이지네이션 생성
	makePageNation(parseInt(data.CNT), parseInt(data.PAGE_SIZE), parseInt(data.PAGE));
	
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

function makeList(data) {
	list = data.LIST;
  $('tbody#ROW_LIST').html('');
  
  list.forEach((e) => {
		// row 생성 
		var sample = 
    '<tr>'
    +  '<td>'
    +		genIdx(data, e.RN)
    +  '</td>'

    +  '<td>'
    +		castEmptyData(e.TURBINE_NO)
    +  '</td>'

    +  '<td>'
    +		castEmptyData(e.TURBINE_MODEL)
    +  '</td>'
    
    +  '<td>'
    +		castEmptyData(e.TURBINE_NAME)
    +  '</td>'
    
   /* +  '<td>'
    +	  '<em>'+e.INSTALL_YEAR+'</em>'
    +  '</td>'*/
    
    +'<td>'
//      +`	<span ${(e.isNew=='Y')?'class="renew"':''}>`
      +		'<span>'
      +'	  <em>'+castEmptyData(e.INSTALL_YEAR)+'</em>'
      +'	</span>'
//      +   `${(e.isNew=='Y')?'<span class="badge-custom">갱신</span>':''}`
      +'</td>'

    +  '<td>'
    +	'<div class="graph-wrap">'
    +	  '<div class="bar-track">'
    +		`<span class="bar" style="width: ${e.USE_RATE==''?'':e.USE_RATE}%;">`+'</span>'
    +	  '</div>'
    +	  '<em class="num">'+castEmptyData(e.USE_RATE)+'</em>'
    +	  '<i>%</i>'
    +	'</div>'
    +  '</td>'

    +  '<td>'
    + 		statusFunction(e.STATUS)
    +  '</td>'

    +'</tr>'; 
		
	sample = $(sample).css('cursor', 'pointer').click(function(event) {
    if(event.target.tagName === 'TD' || event.target.tagName === 'EM' || event.target.tagName === 'SPAN') {
      var info = $(this).prop('info');
      window.location = CTX + '/com/com_0201/form/detailTurbine.part?TURBINE_ID=' + info.TURBINE_ID;

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

function statusFunction(status){
	var result ="";
	switch (status) {
	  case "TURBINE_STATUS-4":
	    result = '<span class="state-style state1">'+$('#Complete18n').val()+'</span>';
	    break;
	  case "TURBINE_STATUS-5":
	    result = '<span class="state-style state1">'+$('#Stop18n').val()+'</span>';
	    break;
	  case "TURBINE_STATUS-2":
	    result = '<span class="state-style state2">'+$('#Progress18n').val()+'</span>';
	    break;
	  case "TURBINE_STATUS-3":
	    result = '<span class="state-style state2">'+$('#inOperation18n').val()+'</span>';
	    break;
	  case "TURBINE_STATUS-1":
	    result = '<span class="state-style state3">'+$('#Under18n').val()+'</span>';
	    break;
	  default:
    	result = '<span>-</span>';
	}
	return result;
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