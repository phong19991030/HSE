
/*초기화*/
function sys0502(){
	// 데이터 조회
	var data = _sys.mariaDB.getData('/sys_new/sys_0500/detailForm/getDetailInfo.ajax', {
		COMPANY_ID: $('input#COMPANY_ID').val(),
	});
	console.log(data);
	// 데이터 없을 경우 return 
	if(!data) return;

	
	// 수정 버튼 클릭 이벤트
	$('span#MODIFY_BTN').click(function() {
		window.location = ctx + '/sys_new/sys_0500/modifyForm?COMPANY_ID=' + $('input#COMPANY_ID').val();
	});
	
	// 삭제 버튼 클릭 이벤트 
	$('span#DELETE_BTN').click(function() {
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var result = _sys.mariaDB.getData('/sys_new/sys_0500/detailForm/delete.ajax', {
			COMPANY_ID: $('input#COMPANY_ID').val(),
			ATCH_FLE_SEQ: $('input#ATCH_FLE_SEQ').val(),
			FLE_PATH: $('input#FLE_PATH').val(),
			NEW_FLE_NM: $('input#NEW_FLE_NM').val(),
		});
		console.log(result);
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = ctx + '/sys_new/sys_0500/list';
		}
		// Exception 발생
		else if(result.EXCEPTION){
			if(result.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
		}
		// 삭제 실패
		else {
			alert(_MESSAGE.common.deleteFail);
		}
	});

	var cls = {1: 'Operator', 2: 'Manufacture', 3: 'ISP', 4: 'Consulting firm'};
	
	$('span#COMPANY_NM').text(data.COMPANY_NM);
	$('span#CLS').text(cls[data.CLS]);
	$('span#ADDRESS').text(data.ADDRESS);
	$('img#LOGO_VIEW').prop('src', ctx + '/imageView' + data.FLE_PATH + '/' + data.NEW_FLE_NM).parents('li').show();
	$('span#DESCRIPTION').append('<p>' + data.DESCRIPTION.split('\n').join('</p>\n<p>') + '<p>');
	
	$('input#ATCH_FLE_SEQ').val(data.ATCH_FLE_SEQ);
	$('input#FLE_PATH').val(data.FLE_PATH);
	$('input#NEW_FLE_NM').val(data.NEW_FLE_NM);
	
}