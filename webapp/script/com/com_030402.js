
/*초기화*/
function com_030402(){
	// 데이터 조회
	var data = _sys.mariaDB.getData(CTX +'/com/com_0304/detailForm/getDetailInfo.ajax', {
		SAFE_COURSE_PLAN_ID: $('input#SAFE_COURSE_PLAN_ID').val(),
	});
	console.log($('input#SAFE_COURSE_PLAN_ID').val());
	console.log(data);
	// 데이터 없을 경우 return 
	if(!data) return;
	// 작성자와 사용자의 UID가 다를 경우 삭제, 수정 불가
//	if(data.INS_ID != _CLIENT.USER_UID) {
//		// 수정, 삭제 버튼 삭제 
//		$('span#modify_btn').remove();
//		$('span#delete_btn').remove();
//	} else {
//		// 수정 버튼 클릭 이벤트
//		$('span#modify_btn').click(function() {
//			if($('input#EVENT_ID').val()) window.location = CTX + '/oam2/oam_0200/reportModify?RPT_ID=' + $('input#RPT_ID').val() + '&EVENT_ID=' + $('input#EVENT_ID').val();
//			else window.location = CTX + '/oam2/oam_0200/reportModify?RPT_ID=' + $('input#RPT_ID').val(); 
//		});
//		
//		// 삭제 버튼 클릭 이벤트
//		$('span#delete_btn').click(function() {
//			// 삭제여부 컨펌
//			if(!confirm(_MESSAGE.common.deleteConfirm)) return;
//			// 삭제 요청
//			var result = _oam.mariaDB.getData('/oam2/oam_0200/reportDetail/deleteReport.ajax', {
//				RPT_ID: $('input#RPT_ID').val(),
//			});
//			console.log(result);
//			// 삭제 성공
//			if(result.IS_DELETE_RPT) {
//				alert(_MESSAGE.common.deleteSuccess);
//				window.location = CTX + '/oam2/oam_0200/main';
//			} 
//			// 삭제 실패
//			else {
//				alert(_MESSAGE.common.deleteFail);
//			}
//		});
//	}
	// 수정 버튼 클릭 이벤트
	$('span#MODIFY_BTN').click(function() {
		window.location = CTX + '/com/com_0304/modifyForm?SAFE_COURSE_PLAN_ID=' + $('input#SAFE_COURSE_PLAN_ID').val();
	});
	
	$('span#CANCEL_BTN').click(function() {
		window.location = CTX + '/com/com_0304/list';
	});
	
	// 삭제 버튼 클릭 이벤트 
	$('span#DELETE_BTN').click(function() {
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var result = _sys.mariaDB.getData(CTX +'/com/com_0304/detailForm/delete.ajax', {
			SAFE_COURSE_PLAN_ID: $('input#SAFE_COURSE_PLAN_ID').val(),
		});
		console.log(result);
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = CTX + '/com/com_0304/list';
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

	$('input#SAFE_COURSE_PLAN_ID').val(data.SAFE_COURSE_PLAN_ID);
	$('span#COURSE_TYPE').text(data.COURSE_TYPE);
	$('span#TRAIN_TERM').text(data.TRAIN_TERM);
	$('span#TRAINEE_TYPE').text(data.TRAINEE_TYPE);
	$('span#TRAIN_HOURS').text(data.TRAIN_HOURS);
	$('span#CONTENT').text(data.CONTENT);
	

	
}