/*초기화*/
function tsk_0201() {
	var CRUD = document.getElementById("CRUD").innerText;
	if (CRUD == 'U') {
		//modifyInit();
		var html = document.getElementById("subTittleModify").innerText;
		$('#TITLE').append(html);
	} else {
		var html = document.getElementById("subTittleRegister").innerText;
		$('#TITLE').text(html);
	}
	//저장버튼 클릭
	$('#SAVE_BTN').click(save);
	$('#DEL_BTN').click(deleteRiskAssetWithId);

  $('.numbers').change(function(e) {
    var id = this.getAttribute('id');
    var index = id.split('-')[1];
    var FREQ = Number($('#FREQ-'+index).val());
    var RES = Number($('#RES-'+index).val());
    $('#RSK-'+index).val(FREQ*RES);
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

	param = _sys.convertParam(param);
	// 저장
	var data = _sys.mariaDB.ajax(CTX + '/tsk/tsk_0200/save.ajax', param, 'post');

	if (data.INSERT_RISK_ASSESSMENT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/tsk/tsk_0200/list';
	}else if (data.UPDATE_RISK_ASSESSMENT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/tsk/tsk_0200/list';
	}
	// Exception 발생
	
	// 삭제 실패
	else {
		alert(_MESSAGE.common.saveFail);
	}
}


function deleteRiskAssetWithId(){

	if(!confirm(_MESSAGE.common.deleteConfirm)) return;
	
	
	var param = createParameter();
	var data = _sys.mariaDB.ajax(CTX + '/tsk/tsk_0200/detailForm/delete.ajax', param, 'post');
	
	if(data.DELETE_RISK_ASSESSMENT > 0) {
		alert(_MESSAGE.common.deleteSuccess);
		window.location = CTX + '/tsk/tsk_0200/list';
	}
	// Exception 발생
	else if(data.EXCEPTION){
		if(data.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
	}
	// 삭제 실패
	else {
		alert(_MESSAGE.common.deleteFail);
	}
	
}

/* 파라미터 생성 */
function createParameter() {
	var param = {};
	param.CRUD = document.getElementById("CRUD").innerText;
	param.RISK_ASSESSMENT_ID = $('input#RISK_ASSESSMENT_ID').val();
	param.PROJECT_ID = $('#id_project_name').val();
	param.WORK_DATE = $('input#WORK_DATE').val();
	param.JOB_NAME = $('input#JOB_NAME').val();
	
	param.MANAGER = $('input#id_emp_str_uid_key_manager').val();
	param.PARTICIPANTS = $('input#id_emp_str_uid_key_participants').val();
	param.TOOL_LIST = $('input#id_emp_str_uid_key_tool_list').val();
	param.WORK_CONTENT = getDataWork();
	param.MATERIAL = getDataMat();
	param.CONSUMABLES = $('#CONSUMABLES').val();
	param.RA_KEYWORD = $('#id_risk_assessment').val();
	param.RISK_ASSESSMENT =getRiskAssement();
	return param;
}

function getDataMat() {
	var history_data = [];

	$("#materials li").each(function(i) {
		var row = new Object();
		row.MAT_ID = $(this).find(".cls_MAT").val();
		row.MAT_CONTENT = $(this).find("#MAT_CONTENT").val();
		history_data.push(row);
	})

	return history_data;
}

function getDataWork() {
	var history_data = [];

	$("#works li").each(function(i) {
		var row = new Object();
		row.WORK_CONTENT = $(this).find(".cls_WORK").val();
		history_data.push(row);
	})

	return history_data;
}

function getRiskAssement() {
	var history_data = [];

	for (let i = 1; i <= 8; i++) {
		var row = new Object();
		row.FREQ = $('#FREQ-' + i).val();
		row.RES = $('#RES-' + i).val();
		row.RSK = $('#RSK-' + i).val();
		history_data.push(row);
	}

	return history_data;
}

function addWorkFunc(inp) {
	var eElement = inp.parentNode;
	//	check prev element is remove btn
	var prevEle = inp.previousElementSibling;
	var preEleClsLst = prevEle.classList;
	var isOld = preEleClsLst.contains('remove-btn');

	var btnRemove = '<button class="btn1 remove-btn motion" onclick="removeWorkFunc(this)">'
		+ '<i class="lar la-trash-alt"></i>'
		+ '</button>';

	if (!isOld) {
		inp.insertAdjacentHTML('beforebegin', btnRemove);
	}

	var d = new Date();
	let time = d.getTime();
	//	new his
	var tmpEle = '<li>'
		+ '<div class="register-write">'
		+ '<div class="input-group">'
		+ '<input validation-check="required" name="dp_' + time + '" id="WORK_' + time + '" type="text" title="장비명" class="cls_WORK" placeholder="장비명">'
		+ '</div>'
		+ '</div>'
		+ '<button class="btn1 remove-btn motion cls_new" onclick="removeWorkFunc(this)">'
		+ '<i class="lar la-trash-alt"></i>'
		+ '</button>'
		+ '</li>';

	var ulEle = eElement.parentNode;
	ulEle.insertAdjacentHTML('afterbegin', tmpEle);
}

function removeWorkFunc(inp) {
	var classList = inp.className.split(/\s+/);
	var isNew = classList.indexOf('cls_new');

	//	check root hist
	var tmpParent = inp.parentNode;
	var lastEleChild = tmpParent.lastElementChild;
	var classListLastNode = lastEleChild.className.split(/\s+/);
	var isBtnAddHis = classListLastNode.indexOf('cls_addWork');
	var prevLi = tmpParent.previousElementSibling;
	if (isBtnAddHis > -1) {
		var tmpAddBtn = '<button class="btn3 motion cls_addWork" onclick="addWorkFunc(this)">'
			+ '<i class="las la-plus"></i>'
			+ '</button>';
		if(prevLi != null){
			var tmpprevLi = prevLi.previousElementSibling;
			if(tmpprevLi == null){
				var tmpBtnRm = prevLi.lastElementChild;
				tmpBtnRm.remove();
			}
			prevLi.insertAdjacentHTML('beforeend', tmpAddBtn);
		}
	}

	var tmpLi = inp.parentNode;
	tmpLi.remove();
//	check only 1 row have add btn
	var tmpLength = $('#works li').length;
	if(tmpLength == 1) {
		$('#works li').each(function (i){
			var lastRmBtn = $(this).find(".remove-btn");
			lastRmBtn.remove()
		});
	}
}

function addMatFunc(inp) {
	var eElement = inp.parentNode;
	//	$( "li.third-item" ).prev()
	//	check prev element is remove btn
	var prevEle = inp.previousElementSibling;
	var preEleClsLst = prevEle.classList;
	var isOld = preEleClsLst.contains('remove-btn');

	var btnRemove = '<button class="btn1 remove-btn motion" onclick="removeMatFunc(this)">'
		+ '<i class="lar la-trash-alt"></i>'
		+ '</button>';

	if (!isOld) {
		inp.insertAdjacentHTML('beforebegin', btnRemove);
	}

	var d = new Date();
	let time = d.getTime();
	//	new his
	var tmpEle = '<li>'
		+ '<div class="register-write">'
		+ '<div class="input-group">'
		+ '<input validation-check="required" name="dp_' + time + '" id="MATERIAL_' + time + '" type="text" title="장비명" class="cls_MAT" placeholder="장비명">'
		+ '</div>'
		+ '</div>'
		+ '<div class="register-write">'
		+ '<div class="input-group">'
		+ '<input validation-check="required" type="text" id="MAT_CONTENT" title="장비이력입력" placeholder="장비 이력을 입력해주세요">'
		+ '</div>'
		+ '</div>'
		+ '<button class="btn1 remove-btn motion cls_new" onclick="removeMatFunc(this)">'
		+ '<i class="lar la-trash-alt"></i>'
		+ '</button>'
		+ '</li>';

	var ulEle = eElement.parentNode;
	ulEle.insertAdjacentHTML('afterbegin', tmpEle);

	$('.datepicker').datepicker();
	$('.calendar-picker').click(function() {
     $(this).find(".datepicker").datepicker('show');
  });
}

function removeMatFunc(inp) {
	var classList = inp.className.split(/\s+/);
	var isNew = classList.indexOf('cls_new');

	//	check root hist
	var tmpParent = inp.parentNode;
	var lastEleChild = tmpParent.lastElementChild;
	var classListLastNode = lastEleChild.className.split(/\s+/);
	var isBtnAddHis = classListLastNode.indexOf('cls_addMat');
	var prevLi = tmpParent.previousElementSibling;
	if (isBtnAddHis > -1) {
		var tmpAddBtn = '<button class="btn3 motion cls_addMat" onclick="addMatFunc(this)">'
			+ '<i class="las la-plus"></i>'
			+ '</button>';
		if(prevLi != null){
			var tmpprevLi = prevLi.previousElementSibling;
			if(tmpprevLi == null){
				var tmpBtnRm = prevLi.lastElementChild;
				tmpBtnRm.remove();
			}
			prevLi.insertAdjacentHTML('beforeend', tmpAddBtn);
		}
	}

	var tmpLi = inp.parentNode;
	tmpLi.remove();
//	check only 1 row have add btn
	var tmpLength = $('#materials li').length;
	if(tmpLength == 1) {
		$('#materials li').each(function (i){
			var lastRmBtn = $(this).find(".remove-btn");
			lastRmBtn.remove()
		});
	}
}

function goList() { 
  window.location = CTX + '/tsk/tsk_0200/list';
}







