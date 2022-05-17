
function hea_000202() {
	
	// UPDATE 일 경우, 수정 페이지 초기화 함수 실행 
	if($('input#PROCESS').val() === 'UPDATE') modifyInit();
	// else {
	// 	$('input#USER_ID').val('');
	// 	$('input#USER_NM').val('');
	// }
	// 저장 버튼 클릭
	$('button#MODIFY_BTN').click(doModify);
	$('button#PRINT_BTN').click(doPrint);
	$('button#DELETE_BTN').click(doDelete);
	$('button#DOWNLOAD_FILE_BTN').click(dowloadFile);
}

function doPrint(){
	//window.location = CTX + '/hea/hea_0002/list';
}

function doModify() {
	var url = CTX + '/hea/hea_0002/modifyForm?EMP_HEALTH_ID=' + $('#EMP_HEALTH_ID').val();
	window.location.href = url;
}


function doDelete() {
	// 삭제 여부 컨펌 
  if(!confirm(_MESSAGE.common.deleteConfirm)) return;
  // 삭제 요청
  var result = _sys.mariaDB.getData(CTX +'/hea/hea_0002/detailForm/delete.ajax', {
    EMP_HEALTH_ID: $('input#EMP_HEALTH_ID').val(),
  });
  console.log(result);
  // 삭제 성공
  if(result.IS_DELETE) {
    alert(_MESSAGE.common.deleteSuccess);
    window.location = CTX + '/hea/hea_0002/list';
  }
  // Exception 발생
  else if(result.EXCEPTION){
    if(result.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
  }
  // 삭제 실패
  else {
    alert(_MESSAGE.common.deleteFail);
  }
}

function dowloadFile() {
	
	var FILE_ID = $('input#HEALTH_CHECK_FILE').val();
	var FLE_NM  = $('input#FLE_NM').val();
	if (FILE_ID) {
		window.open(CTX + '/util/upload/downloadFileV2?fileId=' + FILE_ID + '&fileName=' + FLE_NM, '_blank');
	} else
	alert("File not exist");
}

function downloadfileFunc(inp){
	var prevEle = inp.previousElementSibling;
	var fileId = inp.getAttribute("tmpFileId");
	var fileNm = inp.getAttribute("tmpFileNm");
	
	window.open(CTX + '/util/upload/downloadFileV2?fileId=' + fileId + '&fileName=' + fileNm,'_blank');
}

function diseaseFunction(stringArray) {
  var selector = "tbody#DISEASE_ROWS";
  var array = JSON.parse(stringArray);
  array.forEach((element,index) => {
    var RN = index+1;
    var content = '<tr>'
    +'	<td>'+RN+'</td>'
    +'	<td>'+element.content+'</td>'
    +'	<td>'+element.radio+'</td>'
    +'	<td>'+element.startDate+'<span class="hyphen">~</span>'+element.endDate+'</td>'
    +'</tr>';
    $(selector).append(content);
  });
}
