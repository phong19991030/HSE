
/*초기화*/
function safety_0602(){
	// 데이터 조회
	var data = _sys.mariaDB.getData(CTX +'/sft/sft_0601/detailForm/getDetailInfo.ajax', {
		SAFE_MGT_ORG_ID: $('input#SAFE_MGT_ORG_ID').val(),
	});
	console.log(data);
	// 데이터 없을 경우 return 
	if(!data) {
		return;
	} 
	// 수정 버튼 클릭 이벤트
	$('button#MODIFY_BTN').click(function() {
		window.location = CTX + '/sft/sft_0601/modifyForm?SAFE_MGT_ORG_ID=' + $('input#SAFE_MGT_ORG_ID').val();
	});
	
	// 삭제 버튼 클릭 이벤트 
	$('button#DELETE_BTN').click(function() {
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var result = _sys.mariaDB.getData(CTX +'/sft/sft_0601/detailForm/delete.ajax', {
			SAFE_MGT_ORG_ID: $('input#SAFE_MGT_ORG_ID').val(),
		});
		console.log(result);
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = CTX + '/sft/sft_0601/list';
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

	$('td#SAFE_MGT_ORG_ID').text(data.SAFE_MGT_ORG_ID);
	$('td#DOC_NO').text(data.DOC_NO);
	$('td#PROJECT_NAME').text(data.PROJECT_NAME);
	$('td#INVESTOR').text(data.INVESTOR);
	$('span#CSO').text(data.CSO_NAME);
	$('span#FIELD_AGENT').text(data.FIELD_AGENT_NAME);
	$('span#SAFETY_MANAGER').text(data.SAFETY_MANAGER_NAME);
	$('span#MATERIAL_MANAGER').text(data.MATERIAL_MANAGER_NAME);
	$('span#SITE_MANAGER').text(data.SITE_MANAGER_NAME);

  $('span#CSO_JOB').text(data.CSO_JOB);
	$('span#FIELD_AGENT_JOB').text(data.FIELD_AGENT_JOB);
	$('span#SAFETY_MANAGER_JOB').text(data.SAFETY_MANAGER_JOB);
	$('span#MATERIAL_MANAGER_JOB').text(data.MATERIAL_MANAGER_JOB);
	$('span#SITE_MANAGER_JOB').text(data.SITE_MANAGER_JOB);
}

function goList() { 
  window.location = CTX + '/sft/sft_0601/list';
}

