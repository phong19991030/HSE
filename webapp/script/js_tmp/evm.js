/****************************************************************************
 * 설명     : 목표기간에 대한 년수 구하기
 * date 	 : 2015-07-07
 * author	 : leehs
 ****************************************************************************/
var getGoalPeriodCnt = function (stdYY){ 
	// (동기식) : Ajax의 처리결과가 모두 완료된 후에 다음이 진행되도록 한다.
	// (비동기식) : Ajax가 처리되는동안 프로그램이 멈춰있는것이 아니라 Ajax를 실행만 
	//				 시켜놓고 다음 명령어를 계속 진행하게 된다. 
	
	var result="";     
	$.ajax({
		url: CTX + "/evm/code/getEvmGoalPeriodCnt.ajax",
		data:"STD_YY="+stdYY,     
		async: false, // (동기식) : Ajax의 처리결과가 모두 완료된 후에 다음이 진행되도록 한다.
		success:function(data){  
			if(data.length != 0){  
				$.each(data, function(i, val) {
					result = val.DATA; 
				});    
			}else {
				result = ""; 
			}
		}
	}); 
	return result;
};

/****************************************************************************
 * 설명     : 목표기간내의 년도 구하기  
 * date 	 : 2015-07-07
 * author	 : leehs
 ****************************************************************************/
var getGoalYears = function (stdYY, cnt) {
	var years = {};
	for(var i = 0; i < cnt; i++){   
		years[i] = Number(stdYY)+i;
	}
	return years;
};

/****************************************************************************
 * 설명     : 목표기간내의 년도 콤보박스 생성
 * date 	 : 2015-07-07
 * author	 : leehs
 ****************************************************************************/
var createGoalYearsCombo = function(years, target, selected){
	//var yearsLenth = Object.keys(years).length;
	var yearsLenth = Object.size(years); 
	
	$('select[name="'+target+'"]').find('option').remove();
	if(yearsLenth != 0){
		//$('select[name="'+target+'"]').append('<option value="">전체</option>');
		$.each(years, function(i, data) {;
			var label = data + "년";
			$('select[name="'+target+'"]').append('<option value="'+data+'">'+label+'</option>');
		}); 
	} else {
		$('select[name="'+target+'"]').append('<option value="">데이터가 없습니다.</option>');
	}
	
	$('select[name="'+target+'"]').find('option:eq(0)').attr('selected', true).trigger('change');  
	/*if(selected != null && selected != ''){
		$('select[name="'+target+'"]').val(selected).trigger('change');   
	}else {
		// 처음 값 선택 후 강제 변경 이벤트
		$('select[name="'+target+'"]').find('option:eq(0)').attr('selected', true).trigger('change');   
	}*/
	         
};

/****************************************************************************
 * 설명     : 최상위부서코드 조회
 * date 	 : 2015-12-11
 * author	 : leehs
 ****************************************************************************/
var getTopDeptCd = function (){ 
	// (동기식) : Ajax의 처리결과가 모두 완료된 후에 다음이 진행되도록 한다.
	// (비동기식) : Ajax가 처리되는동안 프로그램이 멈춰있는것이 아니라 Ajax를 실행만 
	//				 시켜놓고 다음 명령어를 계속 진행하게 된다. 
	
	var result="";     
	$.ajax({
		url: CTX + "/evm/code/getTopDeptCd.ajax",
		data:"",     
		async: false, // (동기식) : Ajax의 처리결과가 모두 완료된 후에 다음이 진행되도록 한다.
		success:function(data){  
			result = data.UP_DEPT_CD;   
		}
	}); 
	return result;
};

/****************************************************************************
 * 설명     : 하위부서코드 조회
 * date 	 : 2015-12-14
 * author	 : leehs
 ****************************************************************************/
var getLastDept = function (dept_cd){ 
	// (동기식) : Ajax의 처리결과가 모두 완료된 후에 다음이 진행되도록 한다.
	// (비동기식) : Ajax가 처리되는동안 프로그램이 멈춰있는것이 아니라 Ajax를 실행만 
	//				 시켜놓고 다음 명령어를 계속 진행하게 된다. 
	
	var result="";    
	if(dept_cd){
		$.ajax({
			url: CTX + "/evm/code/getLastDept.ajax",
			data:"DEPT_CD="+dept_cd,     
			async: false, // (동기식) : Ajax의 처리결과가 모두 완료된 후에 다음이 진행되도록 한다.
			success:function(data){
				result = data;
			}
		}); 
	}
	return result;
};


/****************************************************************************
 * << 성과목표등록, 성과실적등록에서만 사용한다.
 ****************************************************************************/
/****************************************************************************
 * 설명     : 전환된 부서검색조건의 부서코드 & 부서명 추출
 * date 	 : 2015-12-14
 * author	 : leehs
 ****************************************************************************/
var switchingDeptData = function() {
	var datas = new Object(); 	// 부서명, 부서코드
	var selectNm = $('select[name="search.RQST_DEPT_CD"]').attr('name'); 		// key값을 통해 select element인 것을 찾는다.
	var inputNm = $('input[name="search.RQST_DEPT_CD"]').attr('name'); 			// key값을 통해 input element인 것을 찾는다.
	
	if(selectNm == 'undefined'|| !selectNm ) {
		// select 검색조건이 아닐때
		datas["DEPT_CD"] = $('input[name="search.RQST_DEPT_CD"]').val(); 	
		datas["DEPT_NM"] = $('input[name="search.RQST_DEPT_NM"]').val();
	}
	else if(inputNm == 'undefined'|| !inputNm ) {
		// input 검색조건이 아날때
		datas["DEPT_CD"] = $('#search\\.RQST_DEPT_CD').find('option:selected').val(); 	
		datas["DEPT_NM"] = $('#search\\.RQST_DEPT_CD').find('option:selected').data('dept_nm'); 
	}
	
	return datas;
};

/****************************************************************************
 * 설명     : 부서검색조건 : 해당 부서의 WRT_YN(작성여부) 추출
 * date 	 : 2015-12-14
 * author	 : leehs
 ****************************************************************************/
var deptWrtYn = function() {
	var wrt_yn = ''; // 작성여부 체크(본부장 & 실장 & 단장 & 상위부서 소속자 작성불가)
	var selectNm = $('select[name="search.RQST_DEPT_CD"]').attr('name'); 		// key값을 통해 select element인 것을 찾는다.
	var inputNm = $('input[name="search.RQST_DEPT_CD"]').attr('name'); 			// key값을 통해 input element인 것을 찾는다.
	
	if(selectNm == 'undefined'|| !selectNm ) {
		// select 검색조건이 아닐때
		wrt_yn = $('#search\\.RQST_DEPT_CD').data('wrt_yn');
	}
	else if(inputNm == 'undefined'|| !inputNm ) {
		// input 검색조건이 아날때
		wrt_yn = $('#search\\.RQST_DEPT_CD').find('option:selected').data('wrt_yn'); 
	}
	
	if(wrt_yn == 'undefined'|| !wrt_yn) wrt_yn = '';
	
	return wrt_yn;
};


/****************************************************************************
 * 설명     : 접속자에 따른 부서조건 변경
 * date 	 : 2015-12-14
 * author	 : leehs
 ****************************************************************************/
var evmDeptSearchChg = function (obj){ 
	//기본부서검색 조건 tag
	var dpet_cd_tag1 = '<input type="text" id="search.RQST_DEPT_NM" name="search.RQST_DEPT_NM" style="width: 150px; text-align: center; " readonly="readonly" value="'+obj.SESS_DEPT_NM+'">'
							+' <input type="text" id="search.RQST_DEPT_CD" name="search.RQST_DEPT_CD" style="width: 40px; text-align: center;" readonly="readonly" value="'+obj.SESS_DEPT_CD+'">';
	
	var top_dept_cd = getTopDeptCd(); 	//최상위부서 코드조회(쿼리 조회 : 현재 최상위부서코드, evm.js)  - 연구개발특구진흥재단
	var user_type = "user";					//부서사용자 구분[user : 하위부서원, up_user : 상위부서원(본부&실&단), group_user : 상위부서장(본부장 & 실장 & 단장)]
	
	/*
	 * ########################### 보직자(실장 & 본부장 여부 체크 및 부서 검색조건 변경) ###########################
	*/
	var org_dept_List = '';	//주부서의 부서정보(하위부서정보도 포함됨 - 존재하는 경우)
	var dup_dept_List = '';	//겸직부서의 부서정보(하위부서정보도 포함됨 - 존재하는 경우)
	
	// << 1. 접속자의 소속 체크 >>
	//원부서가 본부 & 실 & 단 소속인 경우
	if(obj.SESS_UP_DEPT_CD == top_dept_cd){   		
		//접속자가 원부서의 상위부서장(본부장 & 실장 & 단장)인 경우
		if(obj.SESS_EMP_NO == obj.SESS_HEAD_EMP_NO) { 
			user_type = "group_user"; 							//상위부서장(본부장 & 실장 & 단장)					
			org_dept_List = getLastDept(obj.SESS_DEPT_CD); 	//하위부서 조회(evm.js)
		}
		else {
			user_type = "up_user"; //상위부서원(본부&실&단)
		}
	}
	//원부서가 하위부서 소속인 경우
	else {
		user_type = "user"; //하위부서원(팀장, 일반)
	}
	
	// << 2. 겸직여부 체크 >>
	//겸직부서1가 있는 경우
	if(obj.SESS_DUP_DEPT_CD){
		var temp1 = []; //겸직부서1 temp
		var temp2 = []; //겸직부서2 temp
		
		//겸직부서1가 상위부서(본부 & 실 & 단 소속)인 경우
		if(obj.SESS_DUP_UP_DEPT_CD == top_dept_cd){  
			// 겸직부서1의 본부장 & 실장 & 단장인 경우 : 쓰기권한(WRT_YN) 부여X
			if(obj.SESS_EMP_NO == obj.SESS_DUP_HEAD_EMP_NO){
				var tempList1 = getLastDept(obj.SESS_DUP_DEPT_CD); // 겸직부서의 하위부서 조회(evm.js)
				
				// 하위부서가 존재하는 경우
				if(tempList1.length > 0){
					temp1.push(tempList1); 
				}
				// 하위부서가 없는 경우 - ex) 감사실, 임원실 등 : 쓰기권한(WRT_YN) 부여
				else { 
					temp1.push({"ORG_DEPT_NM" :  obj.SESS_DUP_DEPT_NM, "DEPT_CD" : obj.SESS_DUP_DEPT_CD, "DEPT_NM" : obj.SESS_DUP_UP_DEPT_NM + " [" + obj.SESS_DUP_DEPT_NM + "]", "WRT_YN" : "Y"});
				}
			}
		}
		//겸직부서1가 하위부서인 경우 : 쓰기권한(WRT_YN) 부여
		else{
			temp1.push({"ORG_DEPT_NM" :  obj.SESS_DUP_DEPT_NM, "DEPT_CD" : obj.SESS_DUP_DEPT_CD, "DEPT_NM" : obj.SESS_DUP_UP_DEPT_NM + " [" + obj.SESS_DUP_DEPT_NM + "]", "WRT_YN" : "Y"});
		}

		//겸직부서2가 있는 경우
		if(obj.SESS_DUP_DEPT_CD2){
			//겸직부서2가 상위부서(본부 & 실 & 단 소속)인 경우
			if(obj.SESS_DUP_UP_DEPT_CD2 == top_dept_cd){ 
				// 겸직부서2의 본부장 & 실장 & 단장인 경우 : 쓰기권한(WRT_YN) 부여X
				if(obj.SESS_EMP_NO == obj.SESS_DUP_HEAD_EMP_NO2){
					var tempList2 = getLastDept(obj.SESS_DUP_DEPT_CD2); // 겸직부서의 하위부서 조회(evm.js)
					
					// 하위부서가 존재하는 경우
					if(tempList2.length > 0){
						temp2.push(tempList2); 
					}
					// 하위부서가 없는 경우 - ex) 감사실, 임원실 등 : 쓰기권한(WRT_YN) 부여
					else { 
						temp2.push({"ORG_DEPT_NM" :  obj.SESS_DUP_DEPT_NM2, "DEPT_CD" : obj.SESS_DUP_DEPT_CD2, "DEPT_NM" : obj.SESS_DUP_UP_DEPT_NM2 + " [" + obj.SESS_DUP_DEPT_NM2 + "]", "WRT_YN" : "Y"});
					}
				}
			}
			//겸직부서2가 하위부서인 경우 : 쓰기권한(WRT_YN) 부여
			else{
				temp2.push({"ORG_DEPT_NM" :  obj.SESS_DUP_DEPT_NM2, "DEPT_CD" : obj.SESS_DUP_DEPT_CD2, "DEPT_NM" : obj.SESS_DUP_UP_DEPT_NM2 + " [" + obj.SESS_DUP_DEPT_NM2 + "]", "WRT_YN" : "Y"});
			}
		}

		//겸직부서 리스트 = 겸직부서1 + 겸직부서2
		dup_dept_List = temp1.concat(temp2);  
	}
		
	// << 3. 부서검색 조건 bind >>
	// 상위부서장이 아닌 경우(일반)
	if(user_type == "user" || user_type == "up_user"){
		// 겸직부서가 존재하는 경우
		if(dup_dept_List.length > 0){
			// 검색조건 selectBox 생성
			$('#searchBox_dept_cd1').append('<select id="search.RQST_DEPT_CD" name="search.RQST_DEPT_CD" onchange="drawgrid1()"></select>'); 			
			
			// 원부서 포함 (data-wrt_yn = "작성권한", data-dept_nm = "부서명")
			$('select[name="search.RQST_DEPT_CD"]').append(
				'<option value="'+obj.SESS_DEPT_CD+'" data-wrt_yn="Y" data-dept_nm="'+obj.SESS_DEPT_NM+'">'+obj.SESS_UP_DEPT_NM + " [" + obj.SESS_DEPT_NM + "]"+'</option>'
			);
			
			// 겸직부서 리스트 (data-wrt_yn = "작성권한", data-dept_nm = "부서명")
			$.each(dup_dept_List, function(i, val) {
				$('select[name="search.RQST_DEPT_CD"]').append(
					'<option value="'+val.DEPT_CD+'" data-wrt_yn="'+val.WRT_YN+'" data-dept_nm="'+val.ORG_DEPT_NM+'">'+val.DEPT_NM+'</option>'
				);
			});
		}
		// 겸직부서가 존재하지 않는 경우
		else { 
			$('#searchBox_dept_cd1').append(dpet_cd_tag1); 
			// data-wrt_yn = "작성권한"
			$('#searchBox_dept_cd1').find('input[name="search.RQST_DEPT_CD"]').attr('data-wrt_yn', 'Y');
		}
	}
	// 상위부서장인 경우(본부 & 실 & 단 소속)
	else if(user_type == "group_user"){
		// 원부서의 하위부서가 존재하는 경우
		if(org_dept_List.length > 0){  
			$('#searchBox_dept_cd1').append('<select id="search.RQST_DEPT_CD" name="search.RQST_DEPT_CD" onchange="drawgrid1()"></select>'); 			// 검색조건 selectBox 생성
			
			// 원부서 포함 (data-wrt_yn = "작성권한", data-dept_nm = "부서명")
			$('select[name="search.RQST_DEPT_CD"]').append(
				'<option value="'+obj.SESS_DEPT_CD+'" data-wrt_yn="Y" data-dept_nm="'+obj.SESS_DEPT_NM+'">'+obj.SESS_UP_DEPT_NM + " [" + obj.SESS_DEPT_NM + "]"+'</option>'
			);
			
			// 원부서의 하위부서 리스트 (data-wrt_yn = "작성권한", data-dept_nm = "부서명")
			$.each(org_dept_List, function(i, val) {
				$('select[name="search.RQST_DEPT_CD"]').append(
					'<option value="'+val.DEPT_CD+'" data-wrt_yn="'+val.WRT_YN+'" data-dept_nm="'+val.ORG_DEPT_NM+'">'+val.DEPT_NM+'</option>'
				);
			});
			
			// 겸직부서 리스트 (data-wrt_yn = "작성권한", data-dept_nm = "부서명")
			if(dup_dept_List.length > 0){
				$.each(dup_dept_List, function(i, val) {
					$('select[name="search.RQST_DEPT_CD"]').append(
						'<option value="'+val.DEPT_CD+'" data-wrt_yn="'+val.WRT_YN+'" data-dept_nm="'+val.ORG_DEPT_NM+'">'+val.DEPT_NM+'</option>'
					);
				});
			}
		}
		// 하위부서가 존재하지 않는 경우
		else { 
			//겸직부서가 존재하는 경우
			if(dup_dept_List.length > 0){
				$('#searchBox_dept_cd1').append('<select id="search.RQST_DEPT_CD" name="search.RQST_DEPT_CD" onchange="drawgrid1()"></select>'); 			// 검색조건 selectBox 생성
				
				// 원부서 포함 (data-wrt_yn = "작성권한", data-dept_nm = "부서명")
				$('select[name="search.RQST_DEPT_CD"]').append(
					'<option value="'+obj.SESS_DEPT_CD+'" data-wrt_yn="Y" data-dept_nm="'+obj.SESS_DEPT_NM+'">'+obj.SESS_UP_DEPT_NM + " [" + obj.SESS_DEPT_NM + "]"+'</option>'
				);
				
				// 겸직부서 리스트 (data-wrt_yn = "작성권한", data-dept_nm = "부서명")
				$.each(dup_dept_List, function(i, val) {
					$('select[name="search.RQST_DEPT_CD"]').append(
						'<option value="'+val.DEPT_CD+'" data-wrt_yn="'+val.WRT_YN+'" data-dept_nm="'+val.ORG_DEPT_NM+'">'+val.DEPT_NM+'</option>'
					);
				});
			}
			// 겸직부서가 존재하지 않는 경우
			else { 
				$('#searchBox_dept_cd1').append(dpet_cd_tag1);
				// data-wrt_yn = "작성권한"
				$('#searchBox_dept_cd1').find('input[name="search.RQST_DEPT_CD"]').attr('data-wrt_yn', 'Y');
			}
		}
	}
};

/****************************************************************************
 * 설명     : 기관평가용 그리드 엑셀 다운로드(Custom)
 * date 	 : 2015-12-14
 * author	 : leehs
 ****************************************************************************/
function customExcel(obj){
	alert('excel 출력시 수정된 수정된 내용은 반영되지 않습니다. ')
	var gridId = $(obj).parents('h5').parent('div').prop('id');
	var label = $(obj).parents('h5').find('label:first').text();
	var type = "download";
	var hidden = $(obj).data('hidden');	// hidden 컬럼 view 여부
	
	if (hidden == 'undefined') hidden = false;
	var dataObj = customExcelInfo(gridId, label, hidden);
	dataObj['type'] = type;
	
	doExcel(dataObj);
}

//1. 그리드정보 추출
function customExcelInfo(gridId, excelTitle, hiddenColumnDisplay){
	// hidden컬럼 표시 여부
	if (hiddenColumnDisplay == null) hiddenColumnDisplay = false;

	// groupHeader
	var groupStartColumnIds = "";
	var groupNumberOfColumns = "";
	var groupColumnNames = "";
	var groupHeader = $("#table_" + gridId).getGridParam("groupHeader");
	if (groupHeader != null) {
		var groupHeaders = groupHeader.groupHeaders;
		if (groupHeaders != null) {
			for (var i = 0; i < groupHeaders.length; i++) {
				if (i == 0) {
					groupStartColumnIds = groupStartColumnIds + groupHeaders[i].startColumnName;
					groupNumberOfColumns = groupNumberOfColumns + groupHeaders[i].numberOfColumns;
					groupColumnNames = groupColumnNames + groupHeaders[i].titleText;
				} else {
					groupStartColumnIds = groupStartColumnIds + "," + groupHeaders[i].startColumnName;
					groupNumberOfColumns = groupNumberOfColumns + "," + groupHeaders[i].numberOfColumns;
					groupColumnNames = groupColumnNames + "," + groupHeaders[i].titleText;
				}
			}
			groupColumnNames = groupColumnNames.replace(/(<([^>]+)>)/gi, "");// remove
		}
	}
	// 컬럼명&컬럼ID
	var colType= [];
	var colNames = $("#table_" + gridId).getGridParam("colNames");
	var colModel = $("#table_" + gridId).getGridParam("colModel");
	var columnIds = "";
	var columnNames = "";

	if (colNames != null && colModel != null) {
		for (var i = 0; i < colNames.length; i++) {
			if (colNames[i] != "") {
				if (hiddenColumnDisplay == true || (hiddenColumnDisplay == false && colModel[i].hidden == false)) {
					if (columnIds == "") {
						if(colModel[i].name != "CRUD"){
							columnIds = columnIds + colModel[i].name;
							columnNames = columnNames + colNames[i];
							// col type
							if($('[col="'+colModel[i].name+'"]').find('input').length > 0 ){
								if($('[col="'+colModel[i].name+'"]:last input').datas().indexOf(',') > 0 || $('[col="'+colModel[i].name+'"]:last input').datas().indexOf(',') > 0){
									colType.push(true);
								}else{
									colType.push(false);
								}
							}else{
								if($('[col="'+colModel[i].name+'"]:last').datas().indexOf(',') > 0 || $('[col="'+colModel[i].name+'"]:last').datas().indexOf(',') > 0){
									colType.push(true);
								}else{
									colType.push(false);
								}
							}
						}
					} else {
						columnIds = columnIds + "," + colModel[i].name;
						columnNames = columnNames + "," + colNames[i];
						
						// col type
						if($('[col="'+colModel[i].name+'"]').find('input').length > 0 ){
							if($('[col="'+colModel[i].name+'"]:last input').datas().indexOf(',') > 0 || $('[col="'+colModel[i].name+'"]:last input').datas().indexOf(',') > 0){
								colType.push(true);
							}else{
								colType.push(false);
							}
						}else{
							if($('[col="'+colModel[i].name+'"]:last').datas().indexOf(',') > 0 || $('[col="'+colModel[i].name+'"]:last').datas().indexOf(',') > 0){
								colType.push(true);
							}else{
								colType.push(false);
							}
						}
					}
					
					
//					colType
				}
			}  
		}
		columnNames = columnNames.replace(/(<([^>]+)>)/gi, "");// remove html
		// tag
	}
	
	// 그리드 Data
	var gridData = $("#table_" + gridId).getRowData();
	var jsonData = JSON.stringify(gridData);
	jsonData = RemoveHTML(jsonData);
	jsonData = removeSpecial(jsonData);	
	
	var obj = {};
	obj['excelTitle'] = excelTitle;
	obj['columnIds'] = columnIds;
	obj['columnNames'] = columnNames;
	obj['columnType'] = colType;
	obj['groupStartColumnIds'] = groupStartColumnIds;
	obj['groupNumberOfColumns'] = groupNumberOfColumns;
	obj['groupColumnNames'] = groupColumnNames;
	obj['jsonData'] = jsonData;
	
	return obj;
}