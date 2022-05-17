
/*초기화*/
function tsk_0202(){
	// 데이터 조회
	debugger
	var crud = "U";
	var RISK_ASSESSMENT_ID = $('input#RISK_ASSESSMENT_ID').val();
	console.log(RISK_ASSESSMENT_ID)
	// 수정 버튼 클릭 이벤트
	$('#MODIFY_BTN').click(function() {
		window.location = CTX + '/tsk/tsk_0200/modifyForm?CRUD='+crud+'&RISK_ASSESSMENT_ID='+ RISK_ASSESSMENT_ID;
	});
	$('#PRINT_BTN').click(function() {
		 window.print(); 
	});
	
	
	// 삭제 버튼 클릭 이벤트 
	$('span#DELETE_BTN').click(function() {
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var result = _sys.mariaDB.getData(CTX +'/tsk/tsk_0100/detailForm/delete.ajax', {
			LICENSE_ID: $('input#LICENSE_ID').val(),
		});
		console.log(result);
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = CTX + '/tsk/tsk_0100/list';
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

function getEmps(strEmp) {
	var param = {};

	param.strUid = strEmp;
	var result = '';
	var empInfos = _sys.mariaDB.getData(CTX + '/common/getEmpInfoWithStrUid.ajax', param);

	return empInfos;
}

function getPersEquipmentInfo(parentPerEquipId){
	var param = {}
	param.strUid = parentPerEquipId;
	
	var persEquipmentInfo = _sys.mariaDB.getData(CTX + '/common/getPersEquipmentWithComcd.ajax', param);
	
	return persEquipmentInfo;
}

function goList() { 
  window.location = CTX + '/tsk/tsk_0200/list';
}