
/*초기화*/
function safety_0702(){
	// 데이터 조회
	var data = _sys.mariaDB.getData(CTX +'/sft/sft_0701/detailForm/getDetailInfo.ajax', {
		SAFE_CHECK_ID: $('input#SAFE_CHECK_ID').val(),
	});
	console.log(data);
	// 데이터 없을 경우 return 
	if(!data) {
		return;
	} 
	// 수정 버튼 클릭 이벤트
	$('button#MODIFY_BTN').click(function() {
		window.location = CTX + '/sft/sft_0701/modifyForm?SAFE_CHECK_ID=' + $('input#SAFE_CHECK_ID').val();
	});
	
	// 삭제 버튼 클릭 이벤트 
	$('button#DELETE_BTN').click(function() {
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var result = _sys.mariaDB.getData(CTX +'/sft/sft_0701/detailForm/delete.ajax', {
			SAFE_CHECK_ID: $('input#SAFE_CHECK_ID').val(),
		});
		console.log(result);
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = CTX + '/sft/sft_0701/list';
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

	$('td#SAFE_CHECK_ID').text(data.SAFE_CHECK_ID);
	$('td#PROJECT_NAME').text(data.PROJECT_NAME);
	$('td#DOC_NO').text(data.DOC_NO);
	$('td#CHECKER').text(data.CHECKER_NAME);
	$('td#CHECK_DATE').text(data.CHECK_DATE);
	$('td#COMMON_CHECK').text(data.COMMON_CHECK_NAME);
	$('td#HEALTH_CHECK').text(data.HEALTH_CHECK_NAME);
	$('td#SAFETY_CHECK').text(data.SAFETY_CHECK_NAME);
	$('td#WORKING_CHECK').text(data.WORKING_CHECK_NAME);
	$('td#ENVIROMENT_CHECK').text(data.ENVIROMENT_CHECK_NAME);

  makeCheckList(data.CHECK_LIST);
}

function makeCheckList(list){
  $('#ROW_LIST').html('');
  var idx = 1;
 
  list.forEach(e => {
    var spanSaveCheckAction;  
    if(e.SAFE_CHECK_ACTION  == 'YES'){
      spanSaveCheckAction = `<span class="green">${e.SAFE_CHECK_ACTION}</span>`;
    }else{
      spanSaveCheckAction = `<span class="red">${e.SAFE_CHECK_ACTION}</span>`;
    }

    var sample = `<tr>`
    +`	<td>${idx}</td>`
    +`	<td>${e.NAME}</td>`
    +`	<td>${e.DESCRPT}</td>`
    +`	<td>${e.SAFE_CHECK_ERROR}</td>`
    +`	<td class="txt-center">`
    +   spanSaveCheckAction
    +`	</td>`
    +`	</tr>`;
    
    $('#ROW_LIST').append(sample);
    idx++;
  });

  
}

function goList() { 
  window.location = CTX + '/sft/sft_0701/list';
}