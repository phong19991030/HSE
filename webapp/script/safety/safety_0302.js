
/*초기화*/
function safety_0302(){
	// 데이터 조회
	var crud = "U";
	var ACCIDENT_ID = $('input#ACCIDENT_ID').val();
	console.log(ACCIDENT_ID)
	// 수정 버튼 클릭 이벤트
	$('#MODIFY_BTN').click(function() {
		window.location = CTX + '/sft/sft_0301/formAccident?CRUD='+crud+'&ACCIDENT_ID='+ ACCIDENT_ID;
		
	});
	
	// 삭제 버튼 클릭 이벤트 
	$('#DELETE_BTN').click(function() {
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var result = _sys.mariaDB.getData(CTX +'/sft/sft_0301/detailForm/delete.ajax', {
			ACCIDENT_ID: $('input#ACCIDENT_ID').val(),
		});
		console.log(result);
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = CTX + '/sft/sft_0301/list';
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

  var involStr = $('input#EMP_NO_INVOLVE').val();
  $('#EMP_NAME_INVOLVE').html(getEmps(involStr));
  
  var injuredStr = $('input#id_EMP_NAME_INJURED').val();
  var other = $('input#id_OTHER_PEOPLE_INJURED').val();
  $('#EMP_NO_INJURED').html(getINJURED(injuredStr, other));
}

function getINJURED(strEmp, other){
	var injured = getEmps(strEmp);
	
	if(other && other != ""){
		injured += ', ' + other.replace('@!#%', ', ');
	}
	return injured;
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

function goList() { 
  window.location = CTX + '/sft/sft_0301/list';
}
