
/*초기화*/
function project_0102(){
	// 데이터 조회
	var data = _sys.mariaDB.getData(CTX +'/project/project_0100/detailForm/getDetailInfo.ajax', {
		PROJECT_ID: $('input#PROJECT_ID').val(),
	});
	console.log($('input#PROJECT_ID').val());
	console.log(data);
	// 데이터 없을 경우 return 
	if(!data) return;
	// 작성자와 사용자의 UID가 다를 경우 삭제, 수정 불가
	// 수정 버튼 클릭 이벤트
	$('span#MODIFY_BTN').click(function() {
		window.location = CTX + '/project/project_0100/modifyForm?PROJECT_ID=' + $('input#PROJECT_ID').val();
	});
	
	// 삭제 버튼 클릭 이벤트 
	$('span#DELETE_BTN').click(function() {
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var result = _sys.mariaDB.getData(CTX +'/project/project_0100/detailForm/delete.ajax', {
			PROJECT_ID: $('input#PROJECT_ID').val()
		});
		console.log(result);
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = CTX + '/project/project_0100/list';
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

	$('input#PROJECT_ID').val(data.PROJECT_ID);
	
	$('span#PROJECT_ID').text(data.PROJECT_ID);
	$('span#PROJECT_NAME').text(data.PROJECT_NAME);
	$('span#COMPANY_NAME').text(data.COMPANY_NAME);
	$('span#START_TIME_PROJECT').text(data.START_TIME_PROJECT);
	$('span#END_TIME_PROJECT').text(data.END_TIME_PROJECT);
	$('span#MANAGER').text(data.MANAGER);
	
	$('span#TOTAL_MANPOWER').text(data.TOTAL_MANPOWER);
	$('span#CONTRACT_STATUS').text(data.CONTRACT_STATUS);
	$('span#INIT_STATUS').text(data.INIT_STATUS);
	$('span#IMP_STATUS').text(data.IMP_STATUS);
	$('span#CLOSED_STATUS').text(data.CLOSED_STATUS);
	$('span#DETAIL_CONTENT').text(data.DETAIL_CONTENT);
	
}