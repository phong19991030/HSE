/*초기화*/
function safety_0401(USER_NM){
	debugger
  var CRUD = $('input#CRUD').val();
	if(CRUD == 'U') {
		//modifyInit();
		var html = document.getElementById("subTittleModify").innerText;
		$('#TITLE').append(html);
	} else {
		var html = document.getElementById("subTittleRegister").innerText;
		$('#TITLE').text(html);
		$('span#WRITER').text(USER_NM);
	}
	//저장버튼 클릭
	$('#SAVE_BTN').click(save);
}


function save() {
	debugger
	// validation check
	if(!validationCheck()) {
		return;
	} 
		
	// 파라미터 생성
	var param = createParameter();
	var arrImg = uploadImgs();
	param.fileImgs = arrImg;
	console.log(param);
	param = _sys.convertParam(param);
	// 저장
	var data = _sys.mariaDB.ajax(CTX + '/sft/sft_0401/save.ajax', param, 'post');
	console.log(data);
	
	/*if(data.INSERT_RESULT > 0 || data.UPDATE_RESULT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/sft/sft_0401/list';
	} else {
		alert(_MESSAGE.common.saveFail);
	}*/
	if(data.RESULT_SAVE > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/sft/sft_0401/list';
	}
	// Exception 발생
	else if(result.EXCEPTION){
		if(result.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
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
	param.CRUD = $('#CRUD').val();
	//if(param.CRUD === 'U') param.ERP_ID = $('input#ERP_ID').val();
	param.ERP_ID = $('#ERP_ID').val();
	param.DOC_NO = $('#DOC_NO').val();
	param.WRITER = $('#id_emp_str_uid_key_writer').val();
	
	param.PROJECT_ID = $('#id_project_name').val();
  param.OTHER_CONTACTS = $('input#OTHER_CONTACTS').val();
	param.EMERGENCY_PHONE = $('input#EMERGENCY_PHONE').val();
	param.SAFE_OFFICER_PHONE = $('input#EMERGENCY_PHONE').val();
	param.FIELD_REPRESENT_PHONE = $('input#EMERGENCY_PHONE').val();
	param.SITE_REPRESENT_PHONE = $('input#SITE_REPRESENT_PHONE').val();
	param.EXPECTED_EMERGENCY = getParamEXPECTED_EMERGENCY();
	param.PROCEDURE_ACTION = getParamPROCEDURE_ACTION();
	EVACUATION_ROUTE1 = $('input#EVACUATION_ROUTE1').val();
	EVACUATION_ROUTE2 = $('input#EVACUATION_ROUTE2').val();
	param.EVACUATION_ROUTE = EVACUATION_ROUTE1 + "-" + EVACUATION_ROUTE2;
	return param;
}

function getParamPROCEDURE_ACTION(){
	var data = "";
	$("#id_num_lst_action .flexWrap").each(function (i){
		var area = $(this).find("#PROCEDURE_ACTION_ITEM").val();
		if(area && area != ""){
			data += area + "@!#%"
		}
	});
	data = data.substring(0, data.length - 4);
	return data;
}

function getParamEXPECTED_EMERGENCY(){
	var data = "";
	$("#id_td_expected_emergency .flexWrap").each(function (i){
		var area = $(this).find("#EXPECTED_EMERGENCY_ITEM").val();
		if(area && area != ""){
			data += area + "@!#%"
		}
	});
	data = data.substring(0, data.length - 4);
	return data;
}

/* 수정페이지에서 실행될 초기화 함수 */
/*function modifyInit(){
	debugger
	//데이터 조회
	var data = _sys.mariaDB.getData(CTX +'/sft/sft_0401/detailForm/getDetailInfo.ajax', {
		ERP_ID: $('input#ERP_ID').val()
	}); 
	console.log(data);
	//데이터 없을 경우 return
	if(!data) {
		return;
	}
	$('id_project_name').text(data.PROJECT_NAME);
	$('input#EXPECTED_EMERGENCY').text(data.EXPECTED_EMERGENCY);
	$('span#WRITER').text(data.WRITER);
	$('input#EMERGENCY_PHONE').text(data.EMERGENCY_PHONE);
	$('input#SAFE_OFFICER_PHONE').text(data.SAFE_OFFICER_PHONE);
	$('input#FIELD_REPRESENT_PHONE').text(data.FIELD_REPRESENT_PHONE);
	$('input#SITE_REPRESENT_PHONE').text(data.SITE_REPRESENT_PHONE);
	$('input#EXPECTED_EMERGENCY').text(data.EXPECTED_EMERGENCY);
	$('textarea#PROCEDURE_ACTION').text(data.PROCEDURE_ACTION);	
	$('input#EVACUATION_ROUTE1').text(data.EVACUATION_ROUTE1);
	$('input#EVACUATION_ROUTE2').text(data.EVACUATION_ROUTES2);
}
*/
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
    var EMERGENCY_FILE_ID = inp.getAttribute("tmpToolFileId");
    var FLE_PATH = inp.getAttribute("tmpFilePath");
    
    var param = {};
    param.FILE_ID = FILE_ID;
    param.FILE_NM = FILE_NM;
    param.EMERGENCY_FILE_ID = EMERGENCY_FILE_ID;
    param.FLE_PATH = FLE_PATH;
    
    var data = _sys.mariaDB.ajax(CTX + '/sft/sft_0401/deleteEmergencyFile.ajax', param, 'post');
    
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
  window.location = CTX + '/sft/sft_0401/list';
}


function addEmergencyFunc(inp){
	var eElement = inp.parentNode;
	var prevEle = inp.previousElementSibling;
	var preEleClsLst = prevEle.classList;
	var isOld =  preEleClsLst.contains('remove-btn');
	var btnRemove = '<button class="btn6-2 motion remove-btn" onclick="removeEmergencyFunc(this)">'
		  + 	'<i class="lar la-trash-alt"></i>'
		  + '</button>';

	if(!isOld){
		inp.insertAdjacentHTML('beforebegin', btnRemove);
	}
	
	var tmpEle = 
			'<div class="flexWrap">'
			+	'<div class="register-write w100p">'
			+		'<div class="input-group">'
			+			'<input type="text" id="EXPECTED_EMERGENCY_ITEM" title="예상 비상 상황" placeholder="예상 비상 상황을 입력해주세요" >'
			+		'</div>'
			+	'</div>'
			+	'<button class="btn6-2 motion remove-btn cls_new" onclick="removeEmergencyFunc(this)">'
			+		'<i class="las la-trash-alt"></i>'
			+	'</button>'
			+ '</div>'
	var tdEle = eElement.parentNode;
	tdEle.insertAdjacentHTML('afterbegin', tmpEle);
  }
  
  function removeEmergencyFunc(inp){
	  var tmpParent = inp.parentNode;
	  var lastEleChild = tmpParent.lastElementChild;
	  var classListLastNode = lastEleChild.className.split(/\s+/);
	  var isBtnAddHis = classListLastNode.indexOf('cls_addEmergency');
	  var prevLi = tmpParent.previousElementSibling;
	  
	  if(isBtnAddHis > -1){
		var tmpAddBtn = '<button class="btn6-1 motion cls_addEmergency" onclick="addEmergencyFunc(this)">'
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
	  var tmpLength = $('#id_td_expected_emergency .flexWrap').length;
	  if(tmpLength == 1) {
		  $('#id_td_expected_emergency .flexWrap').each(function (i){
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
	var btnRemove = '<button class="btn6-2 motion remove-btn" onclick="removeActionFunc(this)">'
		  + 	'<i class="lar la-trash-alt"></i>'
		  + '</button>';

	if(!isOld){
		inp.insertAdjacentHTML('beforebegin', btnRemove);
	}
	var index = $('#id_num_lst_action .flexWrap').length + 1;
	
	var tmpEle =
			'<div class="flexWrap">'
			+ '<div class="num" id="id_index_action">'+ index +'</div>'
			+	'<div class="register-write w100p">'
			+		'<div class="input-group">'
			+			'<textarea title="비상 상황 시 대응 절차" id="PROCEDURE_ACTION_ITEM" placeholder="비상 상황 시 대응 절차를 입력해주세요"></textarea>'
			+		'</div>'
			+	'</div>'
			+	'<button class="btn6-2 motion remove-btn cls_new" onclick="removeActionFunc(this)">'
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
		var tmpAddBtn = '<button class="btn6-1 motion cls_addAction" onclick="addActionFunc(this)">'
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
	//		check only 1 row have add btn
	  var tmpLength = $('#id_num_lst_action .flexWrap').length;
	  if(tmpLength == 1) {
	  $('#id_num_lst_action .flexWrap').each(function (i){
		var lastRmBtn = $(this).find(".remove-btn");
			lastRmBtn.remove()
		  });
	  }
	  
	  controlActionIdx();
}

function controlActionIdx(){
	var tmpLength = $('#id_num_lst_action .flexWrap').length;
	$('#id_num_lst_action .flexWrap').each(function (index){
		var tmp = tmpLength - index;
		var numEle = $(this).find('#id_index_action');
		numEle.html(tmp);
	});
}





