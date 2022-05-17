/*초기화*/
function tsk_0101() {
	initCheckList();
	var CRUD = document.getElementById("CRUD").innerText;
	if (CRUD == 'U') {
		modifyInit();
		var html = document.getElementById("subTittleModify").innerText;
		$('#TITLE').append(html);
		controlIdxTr();
	} else {
		var html = document.getElementById("subTittleRegister").innerText;
		$('#TITLE').text(html);
	}
	//저장버튼 클릭
	$('#SAVE_BTN').click(save);

	$('#id_th_work_idx').append()

}

function initCheckList() {
	var paw_list = _sys.mariaDB.getData(CTX + '/common/popup/popupMutilCommonCode/getDataList.ajax',
		{ CODE: 'WPM_PAW_ITEM' });
	var ptw_list = _sys.mariaDB.getData(CTX + '/common/popup/popupMutilCommonCode/getDataList.ajax',
		{ CODE: 'WPM_PTW_ITEM' });

	for (i = 0; i < ptw_list.length; i++) {
		ptw_list[i].idx = i + 1;
		paw_list[i].idx = i + 1;
		$('tbody#ROW_LIST').append(createRadio(ptw_list[i], paw_list[i]));
	}
}

function createRadio(infoPtw, infoPaw) {
	var sample = '<tr>'
		+ '<td>' + infoPtw.idx
		+ '<input id="id_ptw_commCd" value="' + infoPtw.COMM_CD + '" hidden>'
		+ '<input id="id_paw_commCd" value="' + infoPaw.COMM_CD + '" hidden>'
		+ '</td>'
		+ '<td> ' + infoPtw.NAME + '</td>'
		+ '<td>'
		+ '<span class="checkbox-radio-group">'
		+ '<label for="A' + infoPtw.COMM_CD + '-1" class="radio">'
		+ '<input label="' + infoPtw.COMM_CD + '"  value="Y" type="radio" name="A' + infoPtw.COMM_CD + '" id="A' + infoPtw.COMM_CD + '-1">'
		+ '		  <span class="circle"></span>'
		+ '		  <em>YES</em>'
		+ '		</label>'
		+ '	  </span>'
		+ '	  <span class="checkbox-radio-group">'
		+ '		<label for="A' + infoPtw.COMM_CD + '-2" class="radio">'
		+ '		  <input label="' + infoPtw.COMM_CD + '" value="N" type="radio" name="A' + infoPtw.COMM_CD + '" id="A' + infoPtw.COMM_CD + '-2">'
		+ '		  <span class="circle"></span>'
		+ '		  <em>NO</em>'
		+ '		</label>'
		+ '	  </span>'
		+ '	  <span class="checkbox-radio-group">'
		+ '		<label for="A' + infoPtw.COMM_CD + '-3" class="radio">'
		+ '		  <input label="' + infoPtw.COMM_CD + '" value="A" type="radio" name="A' + infoPtw.COMM_CD + '" id="A' + infoPtw.COMM_CD + '-3">'
		+ '		  <span class="circle"></span>'
		+ '		  <em>N/A</em>'
		+ '		</label>'
		+ '	  </span>'
		+ '	</td>'
		+ '<td> ' + infoPaw.NAME + '</td>'
		+ '<td>'
		+ '<span class="checkbox-radio-group">'
		+ '<label for="A' + infoPaw.COMM_CD + '-1" class="radio">'
		+ '<input label="' + infoPaw.COMM_CD + '"  value="Y" type="radio" name="A' + infoPaw.COMM_CD + '" id="A' + infoPaw.COMM_CD + '-1">'
		+ '		  <span class="circle"></span>'
		+ '		  <em>YES</em>'
		+ '		</label>'
		+ '	  </span>'
		+ '	  <span class="checkbox-radio-group">'
		+ '		<label for="A' + infoPaw.COMM_CD + '-2" class="radio">'
		+ '		  <input label="' + infoPaw.COMM_CD + '" value="N" type="radio" name="A' + infoPaw.COMM_CD + '" id="A' + infoPaw.COMM_CD + '-2">'
		+ '		  <span class="circle"></span>'
		+ '		  <em>NO</em>'
		+ '		</label>'
		+ '	  </span>'
		+ '	  <span class="checkbox-radio-group">'
		+ '		<label for="A' + infoPaw.COMM_CD + '-3" class="radio">'
		+ '		  <input label="' + infoPaw.COMM_CD + '" value="A" type="radio" name="A' + infoPaw.COMM_CD + '" id="A' + infoPaw.COMM_CD + '-3">'
		+ '		  <span class="circle"></span>'
		+ '		  <em>N/A</em>'
		+ '		</label>'
		+ '	  </span>'
		+ '	</td>'
		+ '</tr>';


	return sample;
}

function addWorkFunc(inp) {
	//	add remove btn to current tr
	var prevEle = inp.previousElementSibling;
	if (!prevEle) {
		var btnRemove = '<button class="btn6-2 remove-btn motion" onclick="removeWorkFunc(this)" >'
			+ '<i class="lar la-trash-alt"></i>'
			+ '</button>';

		inp.insertAdjacentHTML('beforebegin', btnRemove);
	}
	//	add tr
	var tmpTr = inp.parentNode.parentNode.parentNode.parentNode;
	var tmpTb = tmpTr.parentNode;
	var idWork = $('#id_work_content_tb tr').length + 1;

	var html =  '<tr>'
				+ '<th scope="row" style="width: 100px !important;" id="id_th_work_idx">작업' + idWork + '</th>'
				+ '<td>'
				+ 	'<div class="register-write w90p">'
				+ 		'<div class="input-group">'
				+ 		'<input type="text" title="작업자" id="WORK_WORKER" validation-check="required" placeholder="작업자 이름 입력" >'
				+ 		'</div>'
				+ 	'</div>'
				+ 	'<br /> <hr /> <br />'
				+ 	'<div class="register-write w90p">'
				+ 		'<div class="input-group">'
				+ 		'<input type="text" title="작업 내용" id="WORK_CONTENT" validation-check="required" placeholder="작업 내용을 입력해주세요" >'
				+ 		'</div>'
				+ 	'</div>'
				+ 	'<br /> <hr /> <br />'
				+ 	'<div class="flexWrap">'
				+ 		'<div class="register-write w90p">'
				+ 			'<div class="input-group">'
				+ 				'<textarea title="작업 절차" validation-check="required" placeholder="작업 절차를 입력해주세요" id="WORK_PROCEDURE" value=""></textarea>'
				+ 			'</div>'
				+ 		'</div>'
				+ 	'<div class="btn-vertical">'
				+ 		'<button class="btn6-2 remove-btn motion" onclick="removeWorkFunc(this)" >'
				+ 			'<i class="lar la-trash-alt"></i>'
				+ 		'</button>'
				+ 	'</div>'
				+ '</td>'
				+ '</tr>'
	tmpTb.insertAdjacentHTML('afterbegin', html);

}

function save() {
	// validation check
	if (!validationCheck()) {
		return;
	}

	// 파라미터 생성
	var param = createParameter();
	param = _sys.convertParam(param);
	var tool_data = getDataTool();
	param.LICENSE_TOOL = JSON.stringify(tool_data);

	var work_data = getDataWorkContent();
	param.LICENSE_WORK = JSON.stringify(work_data);

	var tmp = getWorkConfirm();
	param.CONFIRMATION = tmp;
	// 저장
	var data = _sys.mariaDB.ajax(CTX + '/tsk/tsk_0100/save.ajax', param, 'post');


	if (data.RESULT_SAVE > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/tsk/tsk_0100/list';
	}
	// Exception 발생
	else if (result.EXCEPTION) {
		if (result.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException);
	}
	// 삭제 실패
	else {
		alert(_MESSAGE.common.saveFail);
	}
}
function getDataWorkContent() {
	var work_data = [];

	$("#id_work_content_tb tr").each(function(i) {
		var row = new Object();
		row.WORK_CONTENT = $(this).find("#WORK_CONTENT").val();
		row.WORK_WORKER = $(this).find("#WORK_WORKER").val();
		row.WORK_PROCEDURE = $(this).find("#WORK_PROCEDURE").val();
		work_data.push(row);
	})

	return work_data;
}


function getDataTool() {
	var tool_data = [];

	$("#tools li").each(function(i) {
		var row = new Object();
		row.TOOL_NM = $(this).find("#TOOL_NM").val();
		row.TOOL_CONTENT = $(this).find("#TOOL_CONTENT").val();
		tool_data.push(row);
	})

	return tool_data;
}

function getWorkConfirm() {
	var str = "";
	$("#ROW_LIST > tr").each(function(i) {

		var tmpPtw = $(this).find("#id_ptw_commCd").val();
		var valPtwRadio = '';
		var radioPtws = document.getElementsByName('A' + tmpPtw);
		for (var i = 0, length = radioPtws.length; i < length; i++) {
			if (radioPtws[i].checked) {
				valPtwRadio = radioPtws[i].value
				break;
			}
		}

		var tmpPaw = $(this).find("#id_paw_commCd").val();
		var valPawRadio = '';
		var radioPaws = document.getElementsByName('A' + tmpPaw);
		for (var i = 0, length = radioPaws.length; i < length; i++) {
			if (radioPaws[i].checked) {
				valPawRadio = radioPaws[i].value
				break;
			}
		}

		str += tmpPtw + "!" + valPtwRadio + "@" + tmpPaw + "!" + valPawRadio + "@";
	});
	return str;
}

function modifyInit() {
	var LICENSE_ID = $('input#LICENSE_ID').val();
	var data = _sys.mariaDB.getData(CTX + '/tsk/tsk_0100/detailForm/getDetailInfo.ajax', {
		LICENSE_ID: LICENSE_ID,
	});

	if (!data) return;
	initDataCheckList(data);
}

function initDataCheckList(data) {
	var checkListObj = {};
	var checkListArr = data.CONFIRMATION.split("@");

	checkListArr.forEach(e => {
		var arr = e.split("!");
		checkListObj[arr[0]] = arr[1];
	});

	var paw_list = _sys.mariaDB.getData(CTX + '/common/popup/popupMutilCommonCode/getDataList.ajax',
		{ CODE: 'WPM_PAW_ITEM' });
	var ptw_list = _sys.mariaDB.getData(CTX + '/common/popup/popupMutilCommonCode/getDataList.ajax',
		{ CODE: 'WPM_PTW_ITEM' });

	paw_list.forEach((e) => {
		e.value = checkListObj[e.COMM_CD];
		if (checkListObj[e.COMM_CD] == "") {
			e.value = null;
		} else {
			e.value = checkListObj[e.COMM_CD];
		}
		$('input[label=' + e.COMM_CD + '][value=' + e.value + ']').prop('checked', true);
		ptw_list.forEach((e) => {
			e.value = checkListObj[e.COMM_CD];
			if (checkListObj[e.COMM_CD] == "") {
			e.value = null;
			} else {
				e.value = checkListObj[e.COMM_CD];
			}
			$('input[label=' + e.COMM_CD + '][value=' + e.value + ']').prop('checked', true);
		});
	});
}



/* 유효성 검사 */
function validationCheck(root = '') {
	var check = true;
  //check = validationCheckRadio();
	/* validation-check */
	check = validationCheckRadio() && $(root + ' [validation-check]').vcCheck();

	return check;
}

function validationCheckRadio(){
  var check = true;

  var list = $('#ROW_LIST tr').find("input[value='Y']");
  for(let i = 0; i<list.length; i++){
    var e = list[i];
    var id = "#"+e.getAttribute('id');
    var name = e.getAttribute('name');
    //var oldHtml = $(id).parents("td").html();
    var checked = $(`input[name='${name}']:checked`).val()
    var selector = "td:has(input"+id+")";
    if(!checked){
      check = false;
      var selector =
      $(selector).eq( 1 ).css("color", "red" );
    }
    if(checked){
      $(selector).eq( 1 ).css("color", "" );
    }
  }
  $("input[type='radio']").change(e=>{
    var selector = "td:has(input#"+e.target.id+")";
    $(selector).eq( 1 ).css("color", "" );
  });
  return check;
}

/* 파라미터 생성 */
function createParameter() {
	var param = {};
	param.CRUD = document.getElementById("CRUD").innerText;
	param.LICENSE_ID = $('input#LICENSE_ID').val();
	param.PROJECT_ID = $('#id_project_name').val();
	param.DOC_NO = $('#DOC_NO').val();
	param.WORK_PROCEDURE = $('textarea#WORK_PROCEDURE').val();
	param.WORK_TYPE = $('#id_work_type').val();
	param.WORK_DATE = $('input#id_correctionDate').val();
	param.RESPONSIBLE = $('input#id_emp_str_uid_key_responsible').val();
	param.PARTICIPANT = $('input#id_emp_str_uid_key_participants').val();
	param.PROTECTIVE_EQUIPMENT = $('input#id_emp_str_uid_key_protective_equipment').val();
	param.MATERIAL_CONSUMABLE = $('#id_mater_consum').val();
//	param.RISK_ASSESSMENT = $('#id_risk_assessment').val();

	return param;
}
function addToolFunc(inp) {
	var eElement = inp.parentNode;
	//	check prev element is remove btn
	var prevEle = inp.previousElementSibling;
	var preEleClsLst = prevEle.classList;
	var isOld = preEleClsLst.contains('remove-btn');

	var btnRemove = '<button class="btn1 remove-btn motion" onclick="removeToolFunc(this)" id="removeTool">'
		+ '<i class="lar la-trash-alt"></i>'
		+ '</button>';

	if (!isOld) {
		inp.insertAdjacentHTML('beforebegin', btnRemove);
	}

	var tmpEle = '<li>'
				+ '<div class="register-write">'
				+ '<div class="input-group" style="width: 252px">'
				+ '<input type="text" title="장비명" placeholder="장비명" id="TOOL_NM" validation-check="required" >'
				+ '</div>'
				+ '</div>'
				+ '<div class="register-write">'
				+ '<div class="input-group">'
				+ '<input type="text" id="TOOL_CONTENT" title="사용목적" placeholder="사용목적을 입력해주세요" validation-check="required" >'
				+ '</div>'
				+ '</div>'
				+ '<button class="btn1 remove-btn motion" onclick="removeToolFunc(this)" id="removeTool">'
				+ '<i class="lar la-trash-alt"></i>'
				+ '</button>'
				+ '</li>';



	var ulEle = eElement.parentNode;
	ulEle.insertAdjacentHTML('afterbegin', tmpEle);

}

function removeWorkFunc(inp) {
	//	check root hist
	var tmpTr = inp.parentNode.parentNode.parentNode.parentNode;

	var tmpParent = inp.parentNode;
	var lastEleChild = tmpParent.lastElementChild;
	var classListLastNode = lastEleChild.className.split(/\s+/);
	var isBtnAddHis = classListLastNode.indexOf('cls_addWork');
	var prevTr = tmpTr.previousElementSibling;
	if (isBtnAddHis > -1) {
		var tmpAddBtn = '<button class="btn6-1 motion cls_addWork" onclick="addWorkFunc(this)">'
			+ '<i class="las la-plus"></i>'
			+ '</button>';
		if (prevTr != null) {
			var tmpprevTr = prevTr.previousElementSibling;
			if (tmpprevTr == null) {
				var tmpBtnRm = prevTr.lastElementChild.lastElementChild.lastElementChild.lastElementChild;
				tmpBtnRm.remove();
			}
			prevTr.lastElementChild.lastElementChild.lastElementChild.insertAdjacentHTML('beforeend', tmpAddBtn);

		}
	}

	tmpTr.remove();

	controlIdxTr();
	var tmpLength = $('#id_work_content_tb tr').length;
	if(tmpLength == 1) {
		$('#id_work_content_tb tr').each(function (i){
			var lastRmBtn = $(this).find(".remove-btn");
			lastRmBtn.remove()
		});
	}

}

function controlIdxTr() {
	var tmpLength = $('#id_work_content_tb tr').length;
	var cnt = 0;
	$("#id_work_content_tb tr").each(function(i) {
		var tmpEle = $(this).find("#id_th_work_idx");
		var idx = tmpLength - cnt;
		tmpEle.html("작업" + idx);
		cnt++;
	});

}


function removeToolFunc(inp){
//	check root hist
	var tmpParent = inp.parentNode;
	var lastEleChild = tmpParent.lastElementChild;
	var classListLastNode = lastEleChild.className.split(/\s+/);
	var isBtnAddHis = classListLastNode.indexOf('cls_addTool');
	var prevLi = tmpParent.previousElementSibling;
	if(isBtnAddHis > -1){
		var tmpAddBtn = '<button class="btn3 motion cls_addTool" onclick="addToolFunc(this)">'
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
	var tmpLength = $('#tools li').length;
	if(tmpLength == 1) {
		$('#tools li').each(function (i){
			var lastRmBtn = $(this).find(".remove-btn");
			lastRmBtn.remove()
		});
	}
}

function goList() { 
  window.location = CTX + '/tsk/tsk_0100/list';
}




