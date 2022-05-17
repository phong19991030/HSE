var CONTENT;
function safety_0201() {

  initCheckList();

	if($('input#PROCESS').val() === 'UPDATE') modifyInit();
	
	$('#SAVE_BTN').click(save);
}

function save() {
	// validation check
	if(!validationCheck()) {
		return;
	} 
	
	var tmp =  getEduContent();
	// 파라미터 생성
	var param = createParameter();
	
	// 파라미터 변환 (object, array => JSON string)
	param = _sys.convertParam(param);
	param.CONTENT = tmp // ex output: "EDU_CONTENT_TYPE-8!Y@EDU_CONTENT_TYPE-7!Y@EDU_CONTENT_TYPE-6!Y@EDU_CONTENT_TYPE-5!Y@EDU_CONTENT_TYPE-4!Y@EDU_CONTENT_TYPE-3!Y@EDU_CONTENT_TYPE-2!Y@EDU_CONTENT_TYPE-1!N@"
	
	// 저장 
	var data = _sys.mariaDB.ajax(CTX + '/sft/sft_0201/save.ajax', param, 'post');
	
	if(data.INSERT_USER_CNT > 0 || data.UPDATE_USER_CNT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/sft/sft_0201/list';
	} 
	else {
		alert(_MESSAGE.common.saveFail);
	}
}

function getEduContent(){
// doan make str edu content
var str = "";
	
$("#id_tbl_edu_content tbody tr").each(function (i){
  var eduType = $(this).find("input[value=Y]").attr('label');
  var tmpY = $(this).find("input[value=Y]");
  var isYChecked = tmpY[0].checked;
  var tmpY = isYChecked? "Y" : "N";
  
  str+= eduType + "!" + tmpY + "@";
});
	
	return str;
	// doan end
}

function validationCheck(root='') {
	var check = true;
	/* validation-check */
	check = $(root + ' [validation-check]').vcCheck();
	
	return check; 
}


/* 파라미터 생성 */
function createParameter() {
	var param = {};
	if($('input#PROCESS').val() === 'UPDATE') param.SAFE_COURSE_ID = $('input#SAFE_COURSE_ID').val();
	param.PROCESS = $('input#PROCESS').val();
	param.WORK_TYPE = $('#id_work_type').val();
	param.PROJECT_ID = $('#id_project_name').val();
	param.TRAINER = $('#id_emp_str_uid_key_trainer_no').val();
	param.DOC_NO = $('input#DOC_NO').val();
	param.PLACE = $('input#PLACE').val();
	param.TRAINEE = $('input#id_emp_str_uid_key_trainee_no').val();
	param.COURSE_DATE = $('input#COURSE_DATE').val();
	param.CONTENT = CONTENT;
	return param;
}

function initCheckList() { 
  $('tbody#ROW_CHECKLIST').html('');

  var edu_list = _sys.mariaDB.getData(CTX + '/common/popup/popupMutilCommonCode/getDataList.ajax', 
    {CODE : 'EDU_CONTENT_TYPE'});
    edu_list.forEach((e,index) => {
      e.idx = index+1;
      $('tbody#ROW_LIST').append(createRadio(e));
    });
}


function createRadio(info) {
  var sample =
  `<tr>`
+`	<td>${info.idx}</td>`
+`	<td>${info.NAME}</td>`
+`	<td>`
+`	  <span class="checkbox-radio-group">`
+`		<label for="check${info.idx}-1" class="radio">`
+`		  <input label="${info.COMM_CD}" value="Y" type="radio" name="check${info.idx}" id="check${info.idx}-1" checked>`
+`		  <span class="circle"></span>`
+`		  <em>YES</em>`
+`		</label>`
+`	  </span>`
+`	  <span class="checkbox-radio-group">`
+`		<label for="check${info.idx}-2" class="radio">`
+`		  <input label="${info.COMM_CD}" value="N" type="radio" name="check${info.idx}" id="check${info.idx}-2">`
+`		  <span class="circle"></span>`
+`		  <em>NO</em>`
+`		</label>`
+`	  </span>`
+`	</td>`
+`	<td>${info.DESCRPT}</td>`
+`</tr>`;

  sample = $(sample).css('cursor', 'pointer').click(function(event) {
    /* if(event.target.tagName === 'TD') {
      var info = $(this).prop('info');
      window.location = CTX + '/sft/sft_0001/detailForm?TOOL_ID=' + info.TOOL_ID;
    } */
  });

  $(sample).prop('info', info);

  return sample;
}


/* 수정 페이지에서 실행 될 초기화 함수 */
function modifyInit() {
	// 데이터 조회
	var data = _sys.mariaDB.getData(CTX +'/sft/sft_0201/detailForm/getDetailInfo.ajax', {
		SAFE_COURSE_ID: $('input#SAFE_COURSE_ID').val(),
	});
	// 데이터 없을 경우 return 
	if(!data) return;
	
	$('input#DOC_NO').val(data.DOC_NO);
	$('#id_work_type').val(data.WORK_TYPE);
	$('#id_project_name').val(data.PROJECT_ID);
	$('input#COURSE_DATE').val(data.COURSE_DATE);
	$('input#PLACE').val(data.PLACE);
	$('#id_emp_str_uid_key_trainer_no').val(data.TRAINER);
	$('#id_emp_str_uid_key_trainee_no').val(data.TRAINEE);

  initDataCheckList(data);
}

function initDataCheckList(data){
  var checkListObj ={};
  var checkListArr = data.CONTENT.split("@");

  checkListArr.forEach(e => { 
    var arr = e.split("!");
    checkListObj[arr[0]] = arr[1];
  });
  
  var edu_list = _sys.mariaDB.getData(CTX + '/common/popup/popupMutilCommonCode/getDataList.ajax', 
    {CODE : 'EDU_CONTENT_TYPE'});

    edu_list.forEach((e) => {
      e.value = checkListObj[e.COMM_CD];
      $(`input[label=${e.COMM_CD}][value=${e.value}]`).prop('checked', true);
    });
}

function goList() { 
  window.location = CTX + '/sft/sft_0201/list';
}
