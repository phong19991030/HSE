function tsk_0300() {

  //search 버튼 클릭
	$('button#SEARCH_BTN').click(function(){		
		//검색 
		onSearch();
	});
	
	// search 리셋 버튼 클릭
	$('button#SEARCH_RESET_BTN').click(function(){
    $('#SEARCH_RA_KEYWORD').val("");
		onSearch();
	});

	onSearch();
}

function onSearch() {
	// 검색
	
 	var param = {};
	var search =  createSearchParameter();
	// 페이징 옵션 
	param = Object.assign(param, search);
	// 검색 param까지 합치기
	console.log(param);
	var data = _sys.mariaDB.getData(CTX + '/tsk/tsk_0300/getData.ajax', param);
	console.log(data);

	// 토탈 갯수 표기
	$('span#TOTAL_CNT').text(data.CNT);

	// row 생성
	makeList(data);

	// 페이지네이션 생성


}

function createSearchParameter() {
	var param = {};
	param.SEARCH_RA_KEYWORD = $('#SEARCH_RA_KEYWORD').val();
	return param;
}

function makeList(data) {
  var list = data.LIST;
  var riskContents = data.riskContents;
  var riskContentsRight = data.riskContentsRight;
	// 
	$('tbody#ROW_LIST').html('');

	// COMPANY 분류
	list.forEach((e) => {
		// row 생성 
		var riskDatas=[];
		riskDatas=e.RISK_ASSESSMENT;
		var parsedTest = JSON.parse(riskDatas);
		var sample =
			'<tr>'
			+ '<td rowspan="3" class="bl-none">'
			+ '<span class="tit">'+e.RN+'</span>'
			+ '</td>'
			+ '<td rowspan="3">'
			+ '<span class="tit">'+e.RA_NAME+'</span>'
			+ '</td>'
			+ '<td rowspan="3">크레인 셋업 및 사용</td>'
			+ '<td class="txt-left">'
			+ '<p>'+riskContents[0].COMM_NM+'</p>'
			+ '</td>'
			+ '<td>'+parsedTest[0].FREQ+'</td>'
			+ '<td class="bl-none">'+parsedTest[0].RES+'</td>'
			+ '<td class="bl-none">'+parsedTest[0].RSK+'</td>'
			+ '<td class="txt-left">'
			+ '<p>'+riskContentsRight[0].COMM_NM+'</p>'
			+ '</td>'
			+ '<td>'+parsedTest[4].FREQ+'</td>'
			+ '<td class="bl-none">'+parsedTest[4].RES+'</td>'
			+ '<td class="bl-none">'+parsedTest[4].RSK+'</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td class="txt-left">'
			+ '<p>'+riskContents[1].COMM_NM+'</p>'
			+ '</td>'
			+ '<td>'+parsedTest[1].FREQ+'</td>'
			+ '<td class="bl-none">'+parsedTest[1].RES+'</td>'
			+ '<td class="bl-none">'+parsedTest[1].RSK+'</td>'
			+ '<td class="txt-left">'
			+ '<p>'+riskContentsRight[1].COMM_NM+'</p>'
			+ '</td>'
			+ '<td>'+parsedTest[5].FREQ+'</td>'
			+ '<td class="bl-none">'+parsedTest[5].RES+'</td>'
			+ '<td class="bl-none">'+parsedTest[5].RSK+'</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td class="txt-left">'
			+ '<p>'+riskContents[2].COMM_NM+'</p>'
			+ '</td>'
			+ '<td>'+parsedTest[2].FREQ+'</td>'
			+ '<td class="bl-none">'+parsedTest[2].RES+'</td>'
			+ '<td class="bl-none">'+parsedTest[2].RSK+'</td>'
			+ '<td class="txt-left">'
			+ '<p>'+riskContentsRight[2].COMM_NM+'</p>'
			+ '</td>'
			+ '<td>'+parsedTest[6].FREQ+'</td>'
			+ '<td class="bl-none">'+parsedTest[6].RES+'</td>'
			+ '<td class="bl-none">'+parsedTest[6].RSK+'</td>'
			+ '</tr>';
		// 프로퍼티 추가 
		$(sample).prop('info', e);

		// row 추가 
		$('tbody#ROW_LIST').append(sample);
	});

	// 데이터 0개 일 경우 
	if (list.length === 0) $('tbody#ROW_LIST').append('<tr><td colspan="11" class="NO_DATA">No Data</td><tr>');
};