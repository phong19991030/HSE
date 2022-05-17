
function res_000101() {

  var turbine_list = _sys.mariaDB.getData(CTX + '/com/com_0201/getData.ajax', {});
	turbine_list.LIST.forEach((e) => {
		
		var option = '<option value="' + e.TURBINE_ID + '">' + e.TURBINE_NAME + '</option>';
		option = $(option).prop('info', e);
		$('select#TURBINE').append(option);
	});

  initCheckList();

	if($('input#PROCESS').val() === 'UPDATE') modifyInit();

  $('#SAVE_BTN').click(save);

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
}

function save() {
	// validation check
  var check = $('[validation-check]').vcCheck();
  if (!check) {
    return false;
  }
	
	// 파라미터 생성
	var param = createParameter();
  createStrCheckList();
  param.CUSTOM_CHECK = JSON.stringify(paramCustomCheckList());

  param.FIRE_EX_CL = str_fire_ex_cl;
  param.FIRE_AUTO_EX_CL = str_fire_auto_ex_cl;
  param.FIRE_ALARM_CL = str_fire_alarm_cl;
	console.log(param);
	
	// 파라미터 변환 (object, array => JSON string)
	param = _sys.convertParam(param);
	
	// 저장 
	var data = _sys.mariaDB.ajax(CTX + '/res/res_0001/save.ajax', param, 'post');
	console.log(data);
	
	if(data.INSERT_RES_CNT >0 || data.UPDATE_RES_CNT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/res/res_0001/list';
	} 
	else {
		alert(_MESSAGE.common.saveFail);
	}
}

/* 파라미터 생성 */
function createParameter() {
	var param = {};
	if($('input#PROCESS').val() === 'UPDATE') param.FIRE_PROTECTION_ID = $('input#FIRE_PROTECTION_ID').val();
	param.PROCESS = $('input#PROCESS').val();
	param.TURBINE_ID = $('select#TURBINE').val();
	param.CHECKER_ID = $('input#id_emp_str_uid_key_checker').val();
	param.INSPECTION_DATE = $('input#INSPECTION_DATE').val();
	console.log(param);
	return param;
}

var str_fire_ex_cl = "";
var str_fire_auto_ex_cl = "";
var str_fire_alarm_cl = "";

function createStrCheckList(){
  str_fire_ex_cl = "";
  str_fire_auto_ex_cl = "";
  str_fire_alarm_cl = "";

  $("tbody#ROW_CHECKLIST tr").each(function (i){
    var info =$(this).prop('info');
		var value = $(`input[name=radio${info.idx}]:checked`).prop('value');
    if(info.UP_CD == "FIRE_EX_CL") str_fire_ex_cl += info.COMM_CD + "=" + value + "!@#";
    if(info.UP_CD == "FIRE_AUTO_EX_CL") str_fire_auto_ex_cl += info.COMM_CD + "=" + value + "!@#"; 
    if(info.UP_CD == "FIRE_ALARM_CL") str_fire_alarm_cl += info.COMM_CD + "=" + value + "!@#"; 
  });
  //console.log(str_fire_ex_cl);
}

function paramCustomCheckList() {
  var result={};
  var EX1=[];
  var EX2=[];
  var EX3=[];
  $("tbody#ROW_CHECKLIST tr").each(function (i){ //info.type=type;info.numberRadio=customCheckNo;
    var info =$(this).prop('info');
    if(info.idx !=null) return;
    var type= info.type;
    var numberRadio = info.numberRadio;
    var checkListItem ={};
    checkListItem.value = $("input[type=radio][name="+type+"-"+numberRadio+"]:checked").prop('value');
    checkListItem.content = $("input[type=text][name="+type+"-"+numberRadio+"-content]").val().trim();
  
    if(info.type=="EX1" && checkListItem.content!="") EX1.push(checkListItem);
    if(info.type=="EX2" && checkListItem.content!="") EX2.push(checkListItem);
    if(info.type=="EX3" && checkListItem.content!="") EX3.push(checkListItem);
  });

  result.EX_CL=EX1;
  result.AUTO_EX=EX2;
  result.ALARM_EX=EX3;
  return result;
}

function initCheckList() {
  $("tbody#ROW_CHECKLIST").html("");

  var idx = 1;
  var fire_ex_cl = _sys.mariaDB.getData(
    CTX + "/common/popup/popupMutilCommonCode/getDataList.ajax",
    { CODE: "FIRE_EX_CL" }
  );
  var thIdx = idx;
  fire_ex_cl.forEach((e) => {
    e.idx = idx;
    if (thIdx === idx)
      e.th = `<th id="EX1TH" scope="row" rowspan="${fire_ex_cl.length+1}" class="txt-center">소화기</th>`;
    idx++;
    $("tbody#ROW_CHECKLIST").append(createRadio(e));
  });
  $("tbody#ROW_CHECKLIST").append(customCheck("EX1", "ADD"));

  var fire_auto_ex_cl = _sys.mariaDB.getData(
    CTX + "/common/popup/popupMutilCommonCode/getDataList.ajax",
    { CODE: "FIRE_AUTO_EX_CL" }
  );
  thIdx = idx;
  fire_auto_ex_cl.forEach((e) => {
    e.idx = idx;
    if (thIdx === idx)
      e.th = `<th id="EX2TH" scope="row" rowspan="${fire_auto_ex_cl.length+1}" class="txt-center">자동 소화설비</th>`;
    idx++;
    $("tbody#ROW_CHECKLIST").append(createRadio(e));
  });
  $("tbody#ROW_CHECKLIST").append(customCheck("EX2", "ADD"));

  var fire_alarm_cl = _sys.mariaDB.getData(
    CTX + "/common/popup/popupMutilCommonCode/getDataList.ajax",
    { CODE: "FIRE_ALARM_CL" }
  );
  thIdx = idx;
  fire_alarm_cl.forEach((e) => {
    e.idx = idx;
    if (thIdx === idx)
      e.th = `<th id="EX3TH" scope="row" rowspan="${fire_alarm_cl.length+1}" class="txt-center">화재 경보기</th>`;
    idx++;
    $("tbody#ROW_CHECKLIST").append(createRadio(e));
  });
  $("tbody#ROW_CHECKLIST").append(customCheck("EX3", "ADD"));
}

function createRadio(info) {
  var th = (info.th)?info.th:'';
  var sample =
  `<tr>`
  + th
  +`	<td class="check-lst-txt">${info.idx}. ${info.NAME}</td>`
  +`	<td class="txt-center">`
  +`	  <span class="checkbox-radio-group">`
  +`		<label for="radio${info.idx}-1" class="radio">`
  +`		  <input label="${info.COMM_CD}" value="CL" type="radio" name="radio${info.idx}" id="radio${info.idx}-1" checked>`
  +`		  <span class="circle"></span>`
  +`		  <em>이상 없음</em>`
  +`		</label>`
  +`	  </span>`
  +`	  <span class="checkbox-radio-group">`
  +`		<label for="radio${info.idx}-2" class="radio">`
  +`		  <input label="${info.COMM_CD}" value="RP" type="radio" name="radio${info.idx}" id="radio${info.idx}-2">`
  +`		  <span class="circle"></span>`
  +`		  <em>수리 필요</em>`
  +`		</label>`
  +`	  </span>`
  +`	</td>`
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


function modifyInit(){
  var data = _sys.mariaDB.getData(CTX +'/res/res_0001/detailForm/getDetailInfo.ajax', {
		FIRE_PROTECTION_ID: $('input#FIRE_PROTECTION_ID').val(),
	});

  $('input#FIRE_PROTECTION_ID').text(data.FIRE_PROTECTION_ID);
  $('select#TURBINE').val(data.TURBINE_ID);
  $('input#INSPECTION_DATE').val(data.INSPECTION_DATE);

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

  console.log(CHECK_LIST);
  var CUSTOM_CHECK_LIST = JSON.parse(data.CUSTOM_CHECK);

  makeCheckList(CHECK_LIST);
  makeCustomCheckList(CUSTOM_CHECK_LIST);
}

function makeCustomCheckList(custom){
  var rowspan1 = $("#EX1TH").attr("rowspan");
  var rowspan2 = $("#EX2TH").attr("rowspan");
  var rowspan3 = $("#EX3TH").attr("rowspan");
  custom.EX_CL.forEach((e) => {
    var sample = customCheck("EX1", "REMOVE");
    var info = $(sample).prop("info");
    $('tr.EX1').last().before(sample);
    $("input[name=EX1-"+info.numberRadio+"][value="+e.value+"]").prop('checked', true);
    $("input[name=EX1-"+info.numberRadio+"-content]").val(e.content);
    rowspan1++;
  });
  $('tr.EX1').last().remove();
  var sample   =`<button class="btn7-1" label="EX1" onclick="addCheckFunc(this)">`
  +`		  <i class="las la-plus"></i>`
  +`		</button>`;
  $("button[label=EX1]").last().after(sample);
  rowspan1--;
  $("#EX1TH").attr("rowspan", rowspan1);

  custom.AUTO_EX.forEach((e) => {
    var sample = customCheck("EX2", "REMOVE");
    var info = $(sample).prop("info");
    $('tr.EX2').last().before(sample);
    $("input[name=EX2-"+info.numberRadio+"][value="+e.value+"]").prop('checked', true);
    $("input[name=EX2-"+info.numberRadio+"-content]").val(e.content);
    rowspan2++;
  });
  $('tr.EX2').last().remove();
  var sample   =`<button class="btn7-1" label="EX2" onclick="addCheckFunc(this)">`
  +`		  <i class="las la-plus"></i>`
  +`		</button>`;
  $("button[label=EX2]").last().after(sample);
  rowspan2--;
  $("#EX2TH").attr("rowspan", rowspan2);

  custom.ALARM_EX.forEach((e) => {
    var sample = customCheck("EX3", "REMOVE");
    var info = $(sample).prop("info");
    $('tr.EX3').last().before(sample);
    $("input[name=EX3-"+info.numberRadio+"][value="+e.value+"]").prop('checked', true);
    $("input[name=EX3-"+info.numberRadio+"-content]").val(e.content);
    rowspan3++;
  });
  $('tr.EX3').last().remove();
  var sample   =`<button class="btn7-1" label="EX3" onclick="addCheckFunc(this)">`
  +`		  <i class="las la-plus"></i>`
  +`		</button>`;
  $("button[label=EX3]").last().after(sample);
  rowspan3--;
  $("#EX3TH").attr("rowspan", rowspan3);
}

function makeCheckList(CHECK_LIST){
  var idx =1;
  var fire_ex_cl = _sys.mariaDB.getData(CTX + '/common/popup/popupMutilCommonCode/getDataList.ajax', 
          {CODE : 'FIRE_EX_CL'});
  var thIdx = idx;
  fire_ex_cl.forEach((e) => {
    e.idx = idx;
    e.value = CHECK_LIST[e.COMM_CD];
    if(thIdx ===idx) e.th=`<th id="EX1TH" scope="row" rowspan="${fire_ex_cl.length}" class="txt-center">소화기</th>`;
    idx++;
    $(`input[label=${e.COMM_CD}][value=${e.value}]`).prop('checked', true);
  });

  var fire_auto_ex_cl = _sys.mariaDB.getData(CTX + '/common/popup/popupMutilCommonCode/getDataList.ajax', 
       {CODE : 'FIRE_AUTO_EX_CL'});
    thIdx = idx;
    fire_auto_ex_cl.forEach((e) => {
    e.idx = idx;
    e.value = CHECK_LIST[e.COMM_CD];
    if(thIdx ===idx) e.th=`<th id="EX2TH" scope="row" rowspan="${fire_auto_ex_cl.length}" class="txt-center">자동 소화설비</th>`;
    idx++;
    $(`input[label=${e.COMM_CD}][value=${e.value}]`).prop('checked', true);
  });

  
  var fire_alarm_cl = _sys.mariaDB.getData(CTX + '/common/popup/popupMutilCommonCode/getDataList.ajax', 
        {CODE : 'FIRE_ALARM_CL'}); 
    thIdx = idx;
    fire_alarm_cl.forEach((e) => {
      e.idx = idx;
      e.value = CHECK_LIST[e.COMM_CD];
      if(thIdx ===idx) e.th=`<th id="EX3TH" scope="row" rowspan="${fire_alarm_cl.length}" class="txt-center">화재 경보기</th>`;
      idx++;
      $(`input[label=${e.COMM_CD}][value=${e.value}]`).prop('checked', true);
    });   

}

function addCheckFunc(inp) {
  var checkType = $(inp).attr("label");
  var isOne = $('.'+checkType).length==1;
  if(isOne){
    var removeElement = `		<button class="btn7-2" label="${checkType}" onclick="removeCheckFunc(this)">`
    +`		  <i class="las la-minus"></i>`
    +`		</button>`
    $(inp).before(removeElement);
  }
  var rowspan = $("#"+checkType+"TH").attr("rowspan");
  rowspan++;
  $("#"+checkType+"TH").attr("rowspan", rowspan);
  $(inp).parents("tr").before(customCheck(checkType, "REMOVE"));
}

function removeCheckFunc(inp){
	var checkType = $(inp).attr("label");
  var isTwo = $('.'+checkType).length==2;
  var isAddElement = inp.nextSibling.tagName=="BUTTON";
  
  var rowspan = $("#"+checkType+"TH").attr("rowspan");
  rowspan--;
  $("#"+checkType+"TH").attr("rowspan", rowspan);
  $(inp).parents("tr").remove();
  if(isAddElement){
    var sample   =`<button class="btn7-1" label="${checkType}" onclick="addCheckFunc(this)">`
    +`		  <i class="las la-plus"></i>`
    +`		</button>`;
    $("button[label='"+checkType+"']").last().after(sample);
  }
  if(isTwo){
    $("button.btn7-2[label='"+checkType+"']").remove();
  }

  
}

function goList() { 
  window.location = CTX + '/res/res_0001/list';
}

var customCheckNo = 1;
function customCheck(type, button){
  var sample = `<tr class="${type}">`
  +`	<td>`
  //	  <!-- add area -->
  +`	  <div class="flexWrap">`
  +`		<div class="register-write w100p">`
  +`		  <div class="input-group">`
  +`			<input name="${type}-${customCheckNo}-content" type="text" title="내용 입력" placeholder="내용을 입력해주세요">`
  +`		  </div>`
  +`		</div>`;

  if(button=="ADD"){
    sample+=`		<button class="btn7-1" label="${type}" onclick="addCheckFunc(this)">`
    +`		  <i class="las la-plus"></i>`
    +`		</button>`;
  }
  if(button=="REMOVE"){
    sample+=`		<button class="btn7-2" label="${type}" onclick="removeCheckFunc(this)">`
    +`		  <i class="las la-minus"></i>`
    +`		</button>`;
  }
  if(button=="ADD_REMOVE"){
    sample+=`		<button class="btn7-1" label="${type}" onclick="addCheckFunc(this)">`
    +`		  <i class="las la-plus"></i>`
    +`		</button>`;
    sample+=`		<button class="btn7-2" label="${type}" onclick="removeCheckFunc(this)">`
    +`		  <i class="las la-minus"></i>`
    +`		</button>`;
  }

  sample+=`	  </div>`
  //	  <!-- //add area -->
  +`	</td>`
  +`	<td class="txt-center">`
  +`	  <span class="checkbox-radio-group">`
  +`		<label for="${type}-${customCheckNo}-1" class="radio">`
  +`		  <input type="radio" value="CL" name="${type}-${customCheckNo}" id="${type}-${customCheckNo}-1" checked>` //EX1-1-1// EX2-1-1
  +`		  <span class="circle"></span>`
  +`		  <em>이상 없음</em>`
  +`		</label>`
  +`	  </span>`
  +`	  <span class="checkbox-radio-group">`
  +`		<label for="${type}-${customCheckNo}-2" class="radio">`
  +`		  <input type="radio" value="RP" name="${type}-${customCheckNo}" id="${type}-${customCheckNo}-2">` //EX1-1-2// EX2-1-2
  +`		  <span class="circle"></span>`
  +`		  <em>수리 필요</em>`
  +`		</label>`
  +`	  </span>`
  +`	</td>`
  +`</tr>`;
  
  sample = $(sample).css('cursor', 'pointer').click(function(event) {
    /* if(event.target.tagName === 'TD') {
      var info = $(this).prop('info');
      window.location = CTX + '/sft/sft_0001/detailManual?TOOL_ID=' + info.TOOL_ID;
    } */
  });

  var info={};
  info.type=type;
  info.numberRadio=customCheckNo;

  $(sample).prop('info', info);
  customCheckNo++;
  return sample;
}

