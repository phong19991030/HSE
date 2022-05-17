
/*초기화*/
function safety_0502(){
	// 데이터 조회
	var data = _sys.mariaDB.getData(CTX +'/sft/sft_0501/detailForm/getDetailInfo.ajax', {
		EDU_ID: $('input#EDU_ID').val(),
	});
	console.log(data);
	// 데이터 없을 경우 return 
	if(!data) {
		return;
	} 
	// 수정 버튼 클릭 이벤트
	$('button#MODIFY_BTN').click(function() {
		window.location = CTX + '/sft/sft_0501/modifyForm?EDU_ID=' + $('input#EDU_ID').val();
	});
	
	// 삭제 버튼 클릭 이벤트 
	$('button#DELETE_BTN').click(function() {
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var result = _sys.mariaDB.getData(CTX +'/sft/sft_0501/detailForm/delete.ajax', {
			EDU_ID: $('input#EDU_ID').val(),
		});
		console.log(result);
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = CTX + '/sft/sft_0501/list';
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
 
	$('input#EDU_ID').text(data.EDU_ID);
	$('td#EMP_NAME').text(data.EMP_NAME);
	$('td#DUTY_NAME').text(data.DUTY_NAME);
	$('td#SHP_EDU_DATE').text(data.SHP_EDU_DATE === null ? '' : data.SHP_EDU_DATE);
	$('td#SAFETY_EDU_DATE').text(data.SAFETY_EDU_DATE === null ? '' : data.SAFETY_EDU_DATE);
	$('td#DISABILITIES_EDU_DATE').text(data.DISABILITIES_EDU_DATE === null ? '' : data.DISABILITIES_EDU_DATE);
	$('td#PIPL_EDU_DATE').text(data.PIPL_EDU_DATE === null ? '' : data.PIPL_EDU_DATE);
	$('td#RETIREMENT_EDU_DATE').text(data.RETIREMENT_EDU_DATE === null ? '' : data.RETIREMENT_EDU_DATE);
}

function downloadFileRetirementFunc(inp){
	var prevEle = inp.previousElementSibling;
	var fileId = inp.getAttribute("tmpFileId");
	var fileNm = inp.getAttribute("tmpFileNm");
	
	window.open(CTX + '/util/upload/downloadFileV2?fileId=' + fileId + '&fileName=' + fileNm,'_blank');
}


function downloadFileDisabilitiesFunc(inp){
	var prevEle = inp.previousElementSibling;
	var fileId = inp.getAttribute("tmpFileId");
	var fileNm = inp.getAttribute("tmpFileNm");
	
	window.open(CTX + '/util/upload/downloadFileV2?fileId=' + fileId + '&fileName=' + fileNm,'_blank');
}


function downloadFilePiplFunc(inp){
	var prevEle = inp.previousElementSibling;
	var fileId = inp.getAttribute("tmpFileId");
	var fileNm = inp.getAttribute("tmpFileNm");
	
	window.open(CTX + '/util/upload/downloadFileV2?fileId=' + fileId + '&fileName=' + fileNm,'_blank');
}

function downloadFileShpFunc(inp){
	var prevEle = inp.previousElementSibling;
	var fileId = inp.getAttribute("tmpFileId");
	var fileNm = inp.getAttribute("tmpFileNm");
	
	window.open(CTX + '/util/upload/downloadFileV2?fileId=' + fileId + '&fileName=' + fileNm,'_blank');
}

function downloadfileSafetyFunc(inp){
	var prevEle = inp.previousElementSibling;
	var fileId = inp.getAttribute("tmpFileId");
	var fileNm = inp.getAttribute("tmpFileNm");
	
	window.open(CTX + '/util/upload/downloadFileV2?fileId=' + fileId + '&fileName=' + fileNm,'_blank');
}
function goList() { 
  window.location = CTX + '/sft/sft_0501/list';
}


