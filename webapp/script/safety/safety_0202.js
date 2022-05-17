
/*초기화*/
function safety_0202(){
	// 데이터 조회
	var data = _sys.mariaDB.getData(CTX +'/sft/sft_0201/detailForm/getDetailInfo.ajax', {
		SAFE_COURSE_ID: $('input#SAFE_COURSE_ID').val(),
	});
	// 데이터 없을 경우 return 
	if(!data) return;

	// 수정 버튼 클릭 이벤트
	$('button#MODIFY_BTN').click(function() {
		window.location = CTX + '/sft/sft_0201/modifyForm?SAFE_COURSE_ID=' + $('input#SAFE_COURSE_ID').val();
	});
	
	$('button#CANCEL_BTN').click(function() {
		window.location = CTX + '/sft/sft_0201/list';
	});
	
	// 삭제 버튼 클릭 이벤트 
	$('button#DELETE_BTN').click(function() {
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var result = _sys.mariaDB.getData(CTX +'/sft/sft_0201/detailForm/delete.ajax', {
			SAFE_COURSE_ID: $('input#SAFE_COURSE_ID').val(),
		});
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = CTX + '/sft/sft_0201/list';
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

	$('td#SAFE_COURSE_ID').val(data.SAFE_COURSE_ID);
	$('td#DOC_NO').text(data.DOC_NO);
	$('td#WORK_TYPE').text(data.WORK_TYPE);
	$('td#COURSE_DATE').text(data.COURSE_DATE);
	$('td#PLACE').text(data.PLACE);
	$('td#TRAINER').text(getEmps(data.TRAINER));
	$('td#TRAINEE').text(getEmps(data.TRAINEE));
	$('td#PROJECT_NAME').text(data.PROJECT_NAME);
	$('td#INS_DATE').text(data.INS_DATE);
	
	var checkList = initDataCheckList(data);
  makeList(checkList);
}

function getEmps(strEmp){
  var param = {};	
  param.strUid = strEmp;
  var result='';
  var empInfos = _sys.mariaDB.getData(CTX + '/common/getEmpInfoWithStrUid.ajax', param);
  if(empInfos.length==1) return empInfos[0].EMP_NAME;
  result = empInfos[0].EMP_NAME;

	for (let i = 1; i < empInfos.length; i++) {
    result +=", "+ empInfos[i].EMP_NAME;
  }
  return result;
}

function initDataCheckList(data){
  var checkListObj ={};
  var checkListArr = data.CONTENT.split("@");

  checkListArr.forEach(e => { 
    var arr = e.split("!");
    checkListObj[arr[0]] = arr[1];
  });
  return checkListObj;
}


function makeList(data) {
	var checkListObj = data;

  var edu_list = _sys.mariaDB.getData(CTX + '/common/popup/popupMutilCommonCode/getDataList.ajax', 
          {CODE : 'EDU_CONTENT_TYPE'});

	// 
	$('tbody#ROW_LIST').html('');
	
	edu_list.forEach((e, index) => {
		// row 생성 
		var sample = 
			'<tr>'
			+ '	<td>' + (index+1) + '</td>'
			+ '	<td>' + e.NAME + '</td>'
			+ `<td>${(checkListObj[e.COMM_CD]=='Y')?'YES':'NO'}</td>`
			+ '	<td>' + e.DESCRPT + '</td>'
			+ '</tr>';
		
		sample = $(sample).css('cursor', 'pointer').click(function(event) {
			if(event.target.tagName === 'TD' || event.target.tagName === 'EM' || event.target.tagName === 'SPAN') {
				var info = $(this).prop('info');
				//window.location = CTX + '/sys_new/sys_0200/detailForm?GERATOR_ID=' + info.GERATOR_ID;
			}
		});
		
		// 프로퍼티 추가 
		$(sample).prop('info', e);
		
		// row 추가 
		$('tbody#ROW_LIST').append(sample);
	});
	
	// 데이터 0개 일 경우 
	if(edu_list.length === 0) $('tbody#ROW_LIST').append('<tr><td colspan="8" class="NO_DATA">No Data</td><tr>');
};

function goList() { 
  window.location = CTX + '/sft/sft_0201/list';
}
