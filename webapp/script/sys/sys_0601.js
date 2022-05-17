
function sys0601() {
	
	// 저장 버튼 클릭
	$('button#SAVE_BTN').click(save);
	
	$('button#CANCEL_BTN').click(function() {
		window.location = CTX + '/sys_new/sys_0600/list';
	});
	
	// UPDATE 일 경우, 수정 페이지 초기화 함수 실행 
	if($('input#PROCESS').val() === 'UPDATE') modifyInit();
	
	if($('input#PROCESS').val() === 'INSERT') {
		// 데이터 조회
		var data = _sys.mariaDB.getData(CTX + '/sys_new/sys_0600/detailForm/getDetailInfo.ajax', {});
		console.log(data);
		// 메뉴 권한 리스트 생성  
		makeGrantRow(data.GRANT);
	}
	
	$('input[id*=ALL_CHECK]').click(function() {
		var type = $(this).attr('id').split('_')[0];
		var list = $('tbody#ROW_LIST').find('tr input[id*=' + type + ']').toArray();
		var flag;
		// 체크 (클릭 이벤트보다 체크가 먼저 됨) 
		if($(this).prop('checked')) flag = true;
		// 체크해체 
		else flag = false;
		list.forEach((e, i) => $(e).prop('checked', flag));
	});
	
}

function save() {
	// validation check
	if(!validationCheck()) return;
	
	// 파라미터 생성
	var param = createParameter();
	console.log(param);
	
	// 파라미터 변환 (object, array => JSON string)
	param = _sys.convertParam(param);
	
	// 저장 
	var data = _sys.mariaDB.ajax(CTX + '/sys_new/sys_0600/save.ajax', param, 'post');
	console.log(data);
	
	if(data.INSERT_MENU_ACCESS_CNT > 0 || data.UPDATE_MENU_ACCESS_CNT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/sys_new/sys_0600/detailForm?ROLE_ID=' + data.ROLE_ID;
	} 
	else {
		alert(_MESSAGE.common.saveFail);
	}
}

/* 유효성 검사 */
function validationCheck(root='') {
	var check = true;
	/* validation-check */
	check = $(root + ' [validation-check]').vcCheck();
	
	/* ROLE_ID 중복체크 */
	if($('input#ROLE_ID').val() && $('input#PROCESS').val() === 'INSERT') {
		var param = {ROLE_ID: $('input#ROLE_ID').val()};
		// 수정 일 경우, PREV_ROLE_ID를 같이 던져 이전 ID는 중복체크 제외
		//if($('input#PROCESS').val() === 'UPDATE') param.PREV_ROLE_ID = $('input#PREV_ROLE_ID').val();
		
		var result = _sys.mariaDB.ajax(CTX + '/sys_new/sys_0600/popupData/ID-CHECK.ajax', param, 'get');
		console.log(result.CNT);
		if(result.CNT > 0) {
			$('input#ROLE_ID').vcWarning(_MESSAGE.sys.idDuplicateCheckFail);
			check = false;
		} else {
			$('input#ROLE_ID').vcSuccess(_MESSAGE.sys.idDuplicateCheckSuccess);
		}
	}
	
	return check; 
}

/* 파라미터 생성 */
function createParameter() {
	var param = {};
	
	if($('input#PROCESS').val() === 'UPDATE') param.PREV_ROLE_ID = $('input#PREV_ROLE_ID').val();
	param.PROCESS = $('input#PROCESS').val();
	param.ROLE_ID = $('input#ROLE_ID').val();
	param.ROLE_NM = $('input#ROLE_NM').val();
	param.RMK = $('textarea#RMK').val();
	param.GRANT_LIST = $('tbody#ROW_LIST tr').toArray().reduce((acc, e) => {
		var info = $(e).prop('info');
		var read = $(e).find('input[id*=CHECK_READ]').is(':checked');
		var write = $(e).find('input[id*=CHECK_WRITE]').is(':checked');
		var download = $(e).find('input[id*=CHECK_DOWN]').is(':checked');
		info.READ_YN = read ? 'Y' : 'N';
		info.WRT_YN = write ? 'Y' : 'N';
		info.EXC_DN_YN = download ?  'Y' : 'N';
		if(read || write || download) acc.push(info);
		return acc;
	}, []);
	return param;
}

/* 수정 페이지에서 실행 될 초기화 함수 */
function modifyInit() {
	// 데이터 조회
	var data = _sys.mariaDB.getData(CTX + '/sys_new/sys_0600/detailForm/getDetailInfo.ajax', {
		ROLE_ID: $('input#PREV_ROLE_ID').val(),
	});
	console.log(data);
	// 데이터 없을 경우 return 
	if(!data) return;
	
	// 메뉴 권한 정보 
	$('input#ROLE_ID').val(data.INFO.ROLE_ID).prop('readonly', true);
	$('input#ROLE_NM').val(data.INFO.ROLE_NM);
	$('textarea#RMK').val(data.INFO.RMK);
	
	// 메뉴 권한 리스트 생성  
	makeGrantRow(data.GRANT);
}

function makeGrantRow(list) {
	list.forEach((e, i) => {
		var sample = _sys_elements.sys_0601.main.tr_grant_row({
			NUM: i+1,
			MENU_NM_KOR: e.MENU_NM_KOR,
			MENU_NM_ENG: e.MENU_NM_ENG,
			MENU_ID: e.MENU_ID,
			UP_MENU_ID: e.UP_MENU_ID,
			READ_ONLY: false,
		});
		
		// 프로퍼티 추가 
		sample = $(sample).prop('info', e);
		
		// 클릭 이벤트 추가 
		$(sample).find('input[type=checkbox]').change(function() {
			var type = $(this).attr('id').split('_')[1];
			var info = $(this).parents('tr').prop('info');
			var menu_id = info.MENU_ID;
			var parent_id = info.UP_MENU_ID;
			
			// 체크
			if($(this).prop('checked')) {
				// 상위 메뉴(체크 안 된 것만) 체크 
				$('tbody#ROW_LIST').find(`tr[menu-id=${parent_id}] input[id*=${type}]:not(:checked)`).trigger('click');
			}
			// 체크 해제
			else {
				// 하위 메뉴(체크 된 것만) 체크 해제
				$('tbody#ROW_LIST').find(`tr[parent-menu-id=${menu_id}] input[id*=${type}]:checked`).trigger('click');
			}
		});
		
		// 추가 여부 표시
		if(e.READ_YN === 'Y') sample = $(sample).find('input[id*=CHECK_READ]').prop('checked', true).parents('tr');
        if(e.WRT_YN === 'Y') sample = $(sample).find('input[id*=CHECK_WRITE]').prop('checked', true).parents('tr');
        if(e.EXC_DN_YN === 'Y') sample = $(sample).find('input[id*=CHECK_DOWN]').prop('checked', true).parents('tr');
		
		$('tbody#ROW_LIST').append(sample);
	});
}

