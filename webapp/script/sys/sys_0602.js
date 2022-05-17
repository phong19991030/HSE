
/*초기화*/
function sys0602(){
	// 데이터 조회
	var data = _sys.mariaDB.getData(CTX + '/sys_new/sys_0600/detailForm/getDetailInfo.ajax', {
		ROLE_ID: $('input#ROLE_ID').val(),
	});
	
	// 데이터 없을 경우 return 
	if(!data) return;

	
	// 수정 버튼 클릭 이벤트
	$('button#MODIFY_BTN').click(function() {
		window.location = CTX + '/sys_new/sys_0600/modifyForm?ROLE_ID=' + $('input#ROLE_ID').val();
	});
	
	$('button#CANCEL_BTN').click(function() {
		window.location = CTX + '/sys_new/sys_0600/list';
	});
	
	// 삭제 버튼 클릭 이벤트 
	$('button#DELETE_BTN').click(function() {
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var result = _sys.mariaDB.getData(CTX + '/sys_new/sys_0600/detailForm/delete.ajax', {
			ROLE_ID: $('input#ROLE_ID').val(),
		});
		console.log(result);
		// 삭제 성공
		if(result.DELETE_MENU_ACCESS_CNT) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = CTX + '/sys_new/sys_0600/list';
		} 
		// 삭제 실패
		else {
			alert(_MESSAGE.common.deleteFail);
		}
	});

	// 메뉴 권한 정보 
	$('span#ROLE_ID').text(data.INFO.ROLE_ID);
	$('span#ROLE_NM').text(data.INFO.ROLE_NM);
	$('span#RMK').append('<p>' + data.INFO.RMK.split('\n').join('</p><p>') + '</p>');
	
	// 메뉴 권한 리스트 
	
	data.GRANT.forEach((e, i) => {
		var sample = _sys_elements.sys_0602.main.tr_grant_row({
			NUM: i+1,
			MENU_NM_KOR: e.MENU_NM_KOR,
			MENU_NM_ENG: e.MENU_NM_ENG,
			MENU_ID: e.MENU_ID,
			READ_ONLY: true,
		});
		
		if(e.READ_YN === 'Y') sample = $(sample).find('input[id*=CHECK_READ]').prop('checked', true).parents('tr');
        if(e.WRT_YN === 'Y') sample = $(sample).find('input[id*=CHECK_WRITE]').prop('checked', true).parents('tr');
        if(e.EXC_DN_YN === 'Y') sample = $(sample).find('input[id*=CHECK_DOWN]').prop('checked', true).parents('tr');
		
		$('tbody#ROW_LIST').append(sample);
	});
	

}