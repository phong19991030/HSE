
/*초기화*/
function safety_0402(){
	// 데이터 조회
	debugger
	var ERP_ID = $('input#ERP_ID').val();
	var crud = "U";
	/*var data = _sys.mariaDB.getData(CTX +'/sft/sft_0401/detailForm/getDetailInfo.ajax', {
		ERP_ID: ERP_ID,
	});*/

	// 데이터 없을 경우 return 

	// 수정 버튼 클릭 이벤트
	$('#MODIFY_BTN').click(function() {
		window.location = CTX + '/sft/sft_0401/modifyForm?CRUD='+crud+'&ERP_ID='+ ERP_ID;
	});
	
	
	// 삭제 버튼 클릭 이벤트 
	$('#DELETE_BTN').click(function() {
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var result = _sys.mariaDB.getData(CTX +'/sft/sft_0401/detailForm/delete.ajax', {
			ERP_ID: $('input#ERP_ID').val(),
		});
		console.log(result);
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = CTX + '/sft/sft_0401/list';
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

}

function goList() { 
  window.location = CTX + '/sft/sft_0401/list';
}

