/*초기화*/
function safety_0301(USER_NM){
	var CRUD = $('input#CRUD').val();
	if(CRUD == 'U') {
		//modifyInit();
		var html = document.getElementById("subTittleModify").innerText;
		$('#TITLE').append(html);
		cbNoInjuredChange();
	} else {
		var html = document.getElementById("subTittleRegister").innerText;
		$('#TITLE').text(html);
		$('span#WRITER_NAME').text(USER_NM);
	}
	//저장버튼 클릭
	$('#SAVE_BTN').click(save);
}


function save() {
	// validation check
	if(!validationCheck()) {
		return;
	}
		
	// 파라미터 생성
	var param = createParameter();
	var arrImg = uploadImgs();
    param.fileImgs = arrImg;
    
	param = _sys.convertParam(param);
	// 저장
	var data = _sys.mariaDB.ajax(CTX + '/sft/sft_0301/save.ajax', param, 'post');
	
	if(data.RESULT_SAVE > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/sft/sft_0301/list';
	}
	// Exception 발생
	else if(data.EXCEPTION){
		if(data.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
	}
	// 삭제 실패
	else {
		alert(_MESSAGE.common.saveFail);
	}
}

/* 유효성 검사 */
function validationCheck(root='') {
	var check = true;
	/* validation-check */
	check = $(root + ' [validation-check]').vcCheck();
	
	return check; 
}

/* 파라미터 생성 */
function createParameter() {
	var param = {};
	param.CRUD = $('input#CRUD').val();
	param.ACCIDENT_ID = $('input#ACCIDENT_ID').val();
	param.DOC_NO = $('input#DOC_NO').val();
	param.REPORT_TYPE = $('#id_report_type').val();
	param.ACCIDENT_NAME = $('#ACCIDENT_NAME').val();
	param.ACCIDENT_DATE = $('input#ACCIDENT_DATE').val()+" "+$('input#ACCIDENT_DATE_TIME').val();
	param.PLACE = $('input#PLACE').val();
	param.PLACE_DETAIL = $('input#PLACE_DETAIL').val();
	
	param.INJURED_AREA = getParamINJURED_AREA();
	param.ACCIDENT_DETAIL = getParamACCIDENT_DETAIL();
	param.ACTION = getParamACTION();
	param.PREVENTION_PLAN = getParamPREVENTION_PLAN();
	
	param.PROJECT_ID = $('#id_project_name').val();
	
	param.WRITER = $('input#id_emp_str_uid_key_writer').val();
	param.NAME_OF_INJURED = $('input#id_emp_str_uid_key_name_of_injured').val();
	param.EMP_NO_INVOLVE = $('input#id_emp_str_uid_key_emp_no_involve').val();
	param.EMP_NO_INJURED = $('input#id_emp_str_uid_key_emp_no_injured').val();
	param.OTHER_PEOPLE_INJURED = $('input#id_other_people_key_emp_no_injured').val();
	param.NO_INJURED = document.getElementById('NO_INJURED').checked ? "Y" : "N";
	return param;
}

function getParamPREVENTION_PLAN(){
	var data = "";
	$("#id_td_prevention_plan .flexWrap").each(function (i){
		var area = $(this).find("#PREVENTION_PLAN_ITEM").val();
		if(area && area != ""){
			data += area + "@!#%"
		}
	});
	data = data.substring(0, data.length - 4);
	return data;
}

function cbNoInjuredChange(){
	if (document.getElementById('NO_INJURED').checked){
		$('input#id_other_people_key_emp_no_injured').val("");
		$('input#id_emp_str_uid_key_emp_no_injured').val("");
		getEmpInfos("key_emp_no_injured","");
		$('#BTN_POPUP_EMP_key_emp_no_injured').attr("disabled",true);
	}else{
		$('#BTN_POPUP_EMP_key_emp_no_injured').prop("disabled",false);
	}
}

function getParamACTION(){
	var data = "";
	$("#id_td_action .flexWrap").each(function (i){
		var area = $(this).find("#ACTION_ITEM").val();
		if(area && area != ""){
			data += area + "@!#%"
		}
	});
	data = data.substring(0, data.length - 4);
	return data;
}

function getParamACCIDENT_DETAIL(){
	var data = "";
	$("#id_td_accident_detail .flexWrap").each(function (i){
		var area = $(this).find("#ACCIDENT_DETAIL_ITEM").val();
		if(area && area != ""){
			data += area + "@!#%"
		}
	});
	data = data.substring(0, data.length - 4);
	return data;
}

function getParamINJURED_AREA(){
	var data = "";
	$("#id_td_injured_area .flexWrap").each(function (i){
		var area = $(this).find("#INJURED_AREA_ITEM").val();
		if(area && area != ""){
			data += area + "@!#%"
		}
	});
	data = data.substring(0, data.length - 4);
	return data;
}


var imgNewFiles = [];
function getFilenameImagePath(inp){
	var files = $('#id_input_imagePath').prop('files');
    var file = files[0];
    if (file){
    	imgNewFiles.push(file);
    	drawPreviewImg();
    } 

    var formdata = new FormData();
    formdata.append('file', file);
}

function drawPreviewImg(){
	var html = '<li class="img-box" style="width: 236px;">'
			 + '<img src="'+ URL.createObjectURL(event.target.files[0]) +'" alt="예시 이미지">'
			 + '<button class="remove-btn cls_new" onclick="removeImgFunc(this)"></button>'
			 + '</li>';
	
	 $('#id_lst_img').append(html)
}

function removeImgFunc(inp){
	
	var classList = inp.className.split(/\s+/);
	var isNew = classList.indexOf('cls_new');
//	is Old
	if(isNew == -1){
		deleteToolFileWithId(inp);
	}
	
	var tmpLi = inp.parentNode;
	tmpLi.remove();
}

function addImgFunc(){
	$("#id_input_imagePath").trigger("click");
}

function uploadImgs(){
	var arrStr = '';
	if(imgNewFiles.length){
		for (var i = 0; i < imgNewFiles.length; i++) {
			var formdata = new FormData();
			formdata.append('file', imgNewFiles[i]);
			var data = _sys.mariaDB.ajaxFile(CTX + '/util/upload/uploadMultipleFiles.ajax', formdata);
//			arrStr.push(data);
			var str = ''
			if(data && data.responseData){
				str = data.responseData.ATCH_FLE_SEQ
				arrStr += str + '!@#';
			}
		}
		return arrStr;
	}
}

function deleteToolFileWithId(inp){
  //	delete phy store
    if(!confirm(_MESSAGE.common.deleteConfirm)) return;
    var tmpInfoFile = inp.getAttribute("tmpFileId");
    var FILE_ID = inp.getAttribute("tmpFileId");
    var FILE_NM = inp.getAttribute("tmpFileNm");
    var ACCIDENT_FILE_ID = inp.getAttribute("tmpToolFileId");
    var FLE_PATH = inp.getAttribute("tmpFilePath");
    
    var param = {};
    param.FILE_ID = FILE_ID;
    param.FILE_NM = FILE_NM;
    param.ACCIDENT_FILE_ID = ACCIDENT_FILE_ID;
    param.FLE_PATH = FLE_PATH;
    
    var data = _sys.mariaDB.ajax(CTX + '/sft/sft_0301/deleteAccidentFile.ajax', param, 'post');
    
    if(data.RESULT_DELETE > 0) {
      alert(_MESSAGE.common.deleteSuccess);
      var tmpLi = inp.parentNode;
      tmpLi.remove();
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

  function goList() { 
    window.location = CTX + '/sft/sft_0301/list';
  }
  
  function addAreaFunc(inp){
	var eElement = inp.parentNode;
	var prevEle = inp.previousElementSibling;
	var preEleClsLst = prevEle.classList;
	var isOld =  preEleClsLst.contains('remove-btn');
	var btnRemove = '<button class="btn6-2 motion remove-btn" onclick="removeAreaFunc(this)">'
		  + 	'<i class="lar la-trash-alt"></i>'
		  + '</button>';

	if(!isOld){
		inp.insertAdjacentHTML('beforebegin', btnRemove);
	}
	
	var tmpEle = 
			'<div class="flexWrap">'
			+	'<div class="register-write w100p">'
			+		'<div class="input-group">'
			+			'<input type="text" id="INJURED_AREA_ITEM" title="부상 부위" placeholder="부상 부위를 입력해주세요">'
			+		'</div>'
			+	'</div>'
			+	'<button class="btn6-2 motion remove-btn cls_new" onclick="removeAreaFunc(this)">'
			+		'<i class="las la-trash-alt"></i>'
			+	'</button>'
			+ '</div>'
	var tdEle = eElement.parentNode;
	tdEle.insertAdjacentHTML('afterbegin', tmpEle);
  }
  
  function removeAreaFunc(inp){
	  var tmpParent = inp.parentNode;
	  var lastEleChild = tmpParent.lastElementChild;
	  var classListLastNode = lastEleChild.className.split(/\s+/);
	  var isBtnAddHis = classListLastNode.indexOf('cls_addArea');
	  var prevLi = tmpParent.previousElementSibling;
	  
	  if(isBtnAddHis > -1){
		var tmpAddBtn = '<button class="btn6-1 motion cls_addArea" onclick="addAreaFunc(this)">'
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
	  var tmpLength = $('#id_td_injured_area .flexWrap').length;
	  if(tmpLength == 1) {
		  $('#id_td_injured_area .flexWrap').each(function (i){
			var lastRmBtn = $(this).find(".remove-btn");
			lastRmBtn.remove()
		  });
	  }
  }
  
function addDetailFunc(inp){
	var eElement = inp.parentNode;
	var prevEle = inp.previousElementSibling;
	var preEleClsLst = prevEle.classList;
	var isOld =  preEleClsLst.contains('remove-btn');
	var btnRemove = '<button class="btn6-2 motion remove-btn" onclick="removeDetailFunc(this)" style="height: 110px;">'
		  + 	'<i class="lar la-trash-alt"></i>'
		  + '</button>';

	if(!isOld){
		inp.insertAdjacentHTML('beforebegin', btnRemove);
	}
	
	var tmpEle = 
			'<div class="flexWrap">'
			+	'<div class="register-write w100p">'
			+		'<div class="input-group">'
			+			'<textarea title="사건사고 세부사항" id="ACCIDENT_DETAIL_ITEM" placeholder="사건사고 세부사항을 입력해주세요"></textarea>'
			+		'</div>'
			+	'</div>'
			+	'<button class="btn6-2 motion remove-btn cls_new" onclick="removeDetailFunc(this)" style="height: 110px;">'
			+		'<i class="las la-trash-alt"></i>'
			+	'</button>'
			+ '</div>'
	var tdEle = eElement.parentNode;
	tdEle.insertAdjacentHTML('afterbegin', tmpEle);
}

function removeDetailFunc(inp){
	var tmpParent = inp.parentNode;
	var lastEleChild = tmpParent.lastElementChild;
	var classListLastNode = lastEleChild.className.split(/\s+/);
	var isBtnAddHis = classListLastNode.indexOf('cls_addDetail');
	var prevLi = tmpParent.previousElementSibling;
  
  if(isBtnAddHis > -1){
	var tmpAddBtn = '<button class="btn6-1 motion cls_addDetail" onclick="addDetailFunc(this)" style="height: 110px;">'
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
  var tmpLength = $('#id_td_accident_detail .flexWrap').length;
  if(tmpLength == 1) {
	  $('#id_td_accident_detail .flexWrap').each(function (i){
		var lastRmBtn = $(this).find(".remove-btn");
		lastRmBtn.remove()
	  });
  }
}
  

function addActionFunc(inp){
	var eElement = inp.parentNode;
	var prevEle = inp.previousElementSibling;
	var preEleClsLst = prevEle.classList;
	var isOld =  preEleClsLst.contains('remove-btn');
	var btnRemove = '<button class="btn6-2 motion remove-btn" onclick="removeActionFunc(this)" style="height: 110px;">'
		  + 	'<i class="lar la-trash-alt"></i>'
		  + '</button>';

	if(!isOld){
		inp.insertAdjacentHTML('beforebegin', btnRemove);
	}
	
	var tmpEle = 
			'<div class="flexWrap">'
			+	'<div class="register-write w100p">'
			+		'<div class="input-group">'
			+			'<textarea title="조치사항" id="ACTION_ITEM" placeholder="조치사항을 입력해주세요"></textarea>'
			+		'</div>'
			+	'</div>'
			+	'<button class="btn6-2 motion remove-btn cls_new" onclick="removeActionFunc(this)" style="height: 110px;">'
			+		'<i class="las la-trash-alt"></i>'
			+	'</button>'
			+ '</div>'
	var tdEle = eElement.parentNode;
	tdEle.insertAdjacentHTML('afterbegin', tmpEle);
}

function removeActionFunc(inp){
	var tmpParent = inp.parentNode;
	var lastEleChild = tmpParent.lastElementChild;
	var classListLastNode = lastEleChild.className.split(/\s+/);
	var isBtnAddHis = classListLastNode.indexOf('cls_addAction');
	var prevLi = tmpParent.previousElementSibling;
  
  if(isBtnAddHis > -1){
	var tmpAddBtn = '<button class="btn6-1 motion cls_addAction" onclick="addActionFunc(this)" style="height: 110px;">'
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
  var tmpLength = $('#id_td_action .flexWrap').length;
  if(tmpLength == 1) {
	  $('#id_td_action .flexWrap').each(function (i){
		var lastRmBtn = $(this).find(".remove-btn");
		lastRmBtn.remove()
	  });
  }
}

function addPlanFunc(inp){
	var eElement = inp.parentNode;
	var prevEle = inp.previousElementSibling;
	var preEleClsLst = prevEle.classList;
	var isOld =  preEleClsLst.contains('remove-btn');
	var btnRemove = '<button class="btn6-2 motion remove-btn" onclick="removePlanFunc(this)" style="height: 110px;">'
		  + 	'<i class="lar la-trash-alt"></i>'
		  + '</button>';

	if(!isOld){
		inp.insertAdjacentHTML('beforebegin', btnRemove);
	}
	
	var tmpEle = 
			'<div class="flexWrap">'
			+	'<div class="register-write w100p">'
			+		'<div class="input-group">'
			+			'<textarea title="향후 예방계획" id="PREVENTION_PLAN_ITEM" placeholder="향후 예방계획을 입력해주세요"></textarea>'
			+		'</div>'
			+	'</div>'
			+	'<button class="btn6-2 motion remove-btn cls_new" onclick="removePlanFunc(this)" style="height: 110px;">'
			+		'<i class="las la-trash-alt"></i>'
			+	'</button>'
			+ '</div>'
	var tdEle = eElement.parentNode;
	tdEle.insertAdjacentHTML('afterbegin', tmpEle);
}

function removePlanFunc(inp){
	var tmpParent = inp.parentNode;
	var lastEleChild = tmpParent.lastElementChild;
	var classListLastNode = lastEleChild.className.split(/\s+/);
	var isBtnAddHis = classListLastNode.indexOf('cls_addPlan');
	var prevLi = tmpParent.previousElementSibling;
  
  if(isBtnAddHis > -1){
	var tmpAddBtn = '<button class="btn6-1 motion cls_addPlan" onclick="addPlanFunc(this)" style="height: 110px;">'
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
  var tmpLength = $('#id_td_prevention_plan .flexWrap').length;
  if(tmpLength == 1) {
	  $('#id_td_prevention_plan .flexWrap').each(function (i){
		var lastRmBtn = $(this).find(".remove-btn");
		lastRmBtn.remove()
	  });
  }
}




