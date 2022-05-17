
/*초기화*/
function res_000102(){
	// 데이터 조회
	var data = _sys.mariaDB.getData(CTX +'/res/res_0001/detailForm/getDetailInfo.ajax', {
		FIRE_PROTECTION_ID: $('input#FIRE_PROTECTION_ID').val(),
	});
	console.log(data);
	// 데이터 없을 경우 return 
	if(!data) {
		return;
	} 
	// 수정 버튼 클릭 이벤트
	$('button#MODIFY_BTN').click(function() {
		window.location = CTX + '/res/res_0001/modifyForm?FIRE_PROTECTION_ID=' + $('input#FIRE_PROTECTION_ID').val();
	});
	
	// 삭제 버튼 클릭 이벤트 
	$('button#DELETE_BTN').click(function() {
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var result = _sys.mariaDB.getData(CTX +'/res/res_0001/detailForm/delete.ajax', {
			FIRE_PROTECTION_ID: $('input#FIRE_PROTECTION_ID').val(),
		});
		console.log(result);
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = CTX + '/res/res_0001/list';
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

  $('td#FIRE_PROTECTION_ID').text(data.FIRE_PROTECTION_ID);
	$('td#CHECKER_NAME').text(data.CHECKER_NAME);
	$('td#TURBINE_NAME').text(data.TURBINE_NAME);
	$('td#INSPECTION_DATE').text(data.INSPECTION_DATE);

  initDataCheckList(data);
}



function initDataCheckList(data){
  var CHECK_LIST ={};

  var fire_ex_cl = data.FIRE_EX_CL.split("!@#");
  var fire_auto_ex_cl = data.FIRE_AUTO_EX_CL.split("!@#");
  var fire_alarm_cl = data.FIRE_ALARM_CL.split("!@#");

  fire_ex_cl.forEach(e => {
    var arr = e.split("=");
    CHECK_LIST[arr[0]] = arr[1];
  });

  fire_auto_ex_cl.forEach(e => {
    var arr = e.split("=");
    CHECK_LIST[arr[0]] = arr[1];
  });

  fire_alarm_cl.forEach(e => {
    var arr = e.split("=");
    CHECK_LIST[arr[0]] = arr[1];
  });

  //console.log(CHECK_LIST);

  var CUSTOM_CHECK_LIST = JSON.parse(data.CUSTOM_CHECK);

  makeCheckList(CHECK_LIST, CUSTOM_CHECK_LIST);
}

function makeCheckList(CHECK_LIST, CUSTOM_CHECK_LIST) {
  $("tbody#ROW_CHECKLIST").html("");

  var idx = 1;
  var fire_ex_cl = _sys.mariaDB.getData(
    CTX + "/common/popup/popupMutilCommonCode/getDataList.ajax",
    { CODE: "FIRE_EX_CL" }
  );
  var thIdx = idx;
  fire_ex_cl.forEach((e) => {
    e.idx = idx;
    e.value = CHECK_LIST[e.COMM_CD];
    if (thIdx === idx)
      e.th = `<th scope="row" rowspan="${fire_ex_cl.length + CUSTOM_CHECK_LIST.EX_CL.length}" class="txt-center">소화기</th>`;
    idx++;
    $("tbody#ROW_CHECKLIST").append(createRow(e));
  });

  CUSTOM_CHECK_LIST.EX_CL.forEach((e)=>{
    e.idx = idx;
    e.NAME = e.content;
    idx++;
    $("tbody#ROW_CHECKLIST").append(createRow(e));
  })

  var fire_auto_ex_cl = _sys.mariaDB.getData(
    CTX + "/common/popup/popupMutilCommonCode/getDataList.ajax",
    { CODE: "FIRE_AUTO_EX_CL" }
  );
  thIdx = idx;
  fire_auto_ex_cl.forEach((e) => {
    e.idx = idx;
    e.value = CHECK_LIST[e.COMM_CD];
    if (thIdx === idx)
      e.th = `<th scope="row" rowspan="${fire_auto_ex_cl.length + CUSTOM_CHECK_LIST.AUTO_EX.length}" class="txt-center">자동 소화설비</th>`;
    idx++;
    $("tbody#ROW_CHECKLIST").append(createRow(e));
  });

  CUSTOM_CHECK_LIST.AUTO_EX.forEach((e)=>{
    e.idx = idx;
    e.NAME = e.content;
    idx++;
    $("tbody#ROW_CHECKLIST").append(createRow(e));
  })

  var fire_alarm_cl = _sys.mariaDB.getData(
    CTX + "/common/popup/popupMutilCommonCode/getDataList.ajax",
    { CODE: "FIRE_ALARM_CL" }
  );
  thIdx = idx;
  fire_alarm_cl.forEach((e) => {
    e.idx = idx;
    e.value = CHECK_LIST[e.COMM_CD];
    if (thIdx === idx)
      e.th = `<th scope="row" rowspan="${fire_alarm_cl.length + CUSTOM_CHECK_LIST.ALARM_EX.length}" class="txt-center">화재 경보기</th>`;
    idx++;
    $("tbody#ROW_CHECKLIST").append(createRow(e));
  });

  CUSTOM_CHECK_LIST.ALARM_EX.forEach((e)=>{
    e.idx = idx;
    e.NAME = e.content;
    idx++;
    $("tbody#ROW_CHECKLIST").append(createRow(e));
  })
}

function createRow(info) {
  var th = (info.th)?info.th:'';
  var sample =
  `<tr>`
  + th
  +`	<td class="check-lst-txt">${info.idx}. ${info.NAME}</td>`
  +`	<td class="txt-center"><span class="${(info.value == "CL")?"green":"red"} f-bold">${(info.value=="CL")?"이상없음":"수리 필요"}</span></td>`
  +`</tr>`;

  sample = $(sample).css('cursor', 'pointer').click(function(event) {
    /* if(event.target.tagName === 'TD') {
      var info = $(this).prop('info');
      window.location = CTX + '/sft/sft_0001/detailManual?TOOL_ID=' + info.TOOL_ID;
    } */
  });

  $(sample).prop('info', info);

  return sample;
}

function goList() { 
  window.location = CTX + '/res/res_0001/list';
}