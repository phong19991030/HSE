
/*초기화*/
function com_040502(){
	// 데이터 조회
	var data = _sys.mariaDB.getData(CTX +'/com/com_0405/detailForm/getDetailInfo.ajax', {
		COMPANY_ID: $('input#COMPANY_ID').val(),
	});
	
	if(!data) return;
	$('#MODIFY_BTN').click(function() {
		window.location = CTX + '/com/com_0405/modifyForm?COMPANY_ID=' + $('input#COMPANY_ID').val();
	});
	
	$('#DELETE_BTN').click(function() {
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var result = _sys.mariaDB.getData(CTX +'/com/com_0405/detailForm/delete.ajax', {
			COMPANY_ID: $('input#COMPANY_ID').val()
		});
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = CTX + '/com/com_0405/list';
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
	$('span#COMPANY_NAME').text(data.COMPANY_NAME);
	$('span#COMPANY_ADDRESS').text(data.COMPANY_ADDRESS);
	
}