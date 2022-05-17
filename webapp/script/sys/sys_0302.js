
/*초기화*/
function sys0302(){
	// 데이터 조회
	var data = _sys.mariaDB.getData(CTX +'/com/com_0101/detailForm/getDetailInfo.ajax', {
		USER_UID: $('input#USER_UID').val(),
	});
	// 데이터 없을 경우 return 
	if(!data) return;
	// 수정 버튼 클릭 이벤트
	$('#MODIFY_BTN').click(function() {
		window.location = CTX + '/com/com_0101/modifyForm?USER_UID=' + $('input#USER_UID').val();
	});
	
	// 삭제 버튼 클릭 이벤트 
	$('#DELETE_BTN').click(function() {
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var result = _sys.mariaDB.getData(CTX +'/com/com_0101/detailForm/delete.ajax', {
			USER_UID: $('input#USER_UID').val(),
			USER_ID: $('input#USER_ID').val(),
		});
		console.log(result);
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = CTX + '/com/com_0101/list';
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

	$('input#USER_ID').val(data.USER_ID);
	
	$('span#USER_ID').text(data.USER_ID);
	$('span#USER_NM').text(data.USER_NM);
	$('span#EMP').text(data.EMP_NAME);
	$('span#MENU-ACCESS').text(data.ROLE_NM_LIST ? data.ROLE_NM_LIST.replaceAll(' | ', ', ') : 'X');
	
}

function goList() { 
  window.location = CTX + '/com/com_0101/list';
}