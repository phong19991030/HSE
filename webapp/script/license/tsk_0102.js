
/*초기화*/
function tsk_0102() {
	// 데이터 조회
	var crud = "U";
	var LICENSE_ID = $('input#LICENSE_ID').val();
	var data = _sys.mariaDB.getData(CTX + '/tsk/tsk_0100/detailForm/getDetailInfo.ajax', {
		LICENSE_ID: LICENSE_ID,
	});
	rowspan = (data.LICENSE_WORK.length * 2) + 1;
	$('#thLicenseWork').attr('rowspan', rowspan);
	// 수정 버튼 클릭 이벤트
	$('#MODIFY_BTN').click(function() {
		window.location = CTX + '/tsk/tsk_0100/modifyForm?CRUD=' + crud + '&LICENSE_ID=' + LICENSE_ID;
	});

	// 삭제 버튼 클릭 이벤트 
	$('#DELETE_BTN').click(function() {
		// 삭제 여부 컨펌 
		if (!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var result = _sys.mariaDB.getData(CTX + '/tsk/tsk_0100/detailForm/delete.ajax', {
			LICENSE_ID: LICENSE_ID,
		});
		// 삭제 성공
		var resultDelete = result.RESULT_DELETE;
		if (resultDelete == 1) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = CTX + '/tsk/tsk_0100/list';
		}
		// Exception 발생
		else if (result.EXCEPTION) {
			if (result.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException);
		}
		// 삭제 실패
		else {
			alert(_MESSAGE.common.deleteFail);
		}
	});
	$('td#PARTICIPANT').text(getEmps(data.PARTICIPANT));
	$('td#PROTECTIVE_EQUIPMENT').text(getPerEquips(data.PROTECTIVE_EQUIPMENT));
	var checkList = initDataCheckList(data);
	makeList(checkList);
	initDataCheckList(data);
}


function initDataCheckList(data) {
	var checkListObj = {};
	var checkListArr = data.CONFIRMATION.split("@");

	checkListArr.forEach(e => {
		var arr = e.split("!");
		checkListObj[arr[0]] = arr[1];
	});

	return checkListObj;
}

function makeList(checkList) {
	var paw_list = _sys.mariaDB.getData(CTX + '/common/popup/popupMutilCommonCode/getDataList.ajax',
		{ CODE: 'WPM_PAW_ITEM' });
	var ptw_list = _sys.mariaDB.getData(CTX + '/common/popup/popupMutilCommonCode/getDataList.ajax',
		{ CODE: 'WPM_PTW_ITEM' });

	for (i = 0; i < ptw_list.length; i++) {
		ptw_list[i].idx = i + 1;
		paw_list[i].idx = i + 1;
		$('tbody#ROW_CHECKLIST').append(createRadio(ptw_list[i], paw_list[i]));
	}
	makeListCheck(checkList, ptw_list, paw_list);

}

function createRadio(infoPtw, infoPaw) {

	html = '<tr>'
		+ '	<td class="txt-center">' + infoPtw.idx + '</td>'
		+ '<td>' + infoPtw.NAME + '</td>'
		+ '<td class="txt-center"><span class="green f-bold" id="A' + infoPtw.COMM_CD + '"></span></td>'
		+ '<td>' + infoPaw.NAME + '</td>'
		+ '<td class="txt-center"><span class="green f-bold" id="A' + infoPaw.COMM_CD + '"></span></td>';
	+ '</tr>';
	return html;
}

function makeListCheck(checkList, ptw_list, paw_list) {
	var checkListObj = checkList;

	// 
	ptw_list.forEach((e) => {
		var valueCheckPtw = checkListObj[e.COMM_CD];
		switch (valueCheckPtw) {
			case 'Y':
				valueCheckPtw = "Yes";
				break;
			case 'N':
				valueCheckPtw = "No";
				break;
			case 'A':
				valueCheckPtw = "N/A";
				break;
		}
		var id = "span#A" + e.COMM_CD;

		$(id).text(valueCheckPtw);

		paw_list.forEach((e) => {

			var valueCheckPaw = checkListObj[e.COMM_CD];

			switch (valueCheckPaw) {
				case 'Y':
					valueCheckPaw = "Yes";
					break;
				case 'N':
					valueCheckPaw = "No";
					break;
				case 'A':
					valueCheckPaw = "N/A";
					break;
			}
			var id = "span#A" + e.COMM_CD;
			$(id).text(valueCheckPaw);
		});
	});
};


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

function getPerEquips(strEmp){
  var param = {};	
  param.strUid = strEmp;
  var result='';
  var perEquipInfos = _sys.mariaDB.getData(CTX + '/common/getPersEquipmentWithComcd.ajax', param);
  if(perEquipInfos.length==1) return perEquipInfos[0].COMM_NM;
  result = perEquipInfos[0].COMM_NM;

	for (let i = 1; i < perEquipInfos.length; i++) {
    result +=", "+ perEquipInfos[i].COMM_NM;
  }
  return result;
}

function goList() { 
  window.location = CTX + '/tsk/tsk_0100/list';
}

