/*초기화*/
function safety_0501() {
	if ($('input#PROCESS').val() === 'UPDATE') {
		//modifyInit();
	}

  user_list = _sys.mariaDB.getData(CTX + '/common/getEmpMgtList.ajax', {});

  $('div#layer-popup_key_emp_no').change(setDuty);

  $('#SAVE_BTN').click(onSave);
  checkfilelist('id_lst_shp');
  fileCssChange('id_lst_shp');

  checkfilelist('id_lst_pipl');
  fileCssChange('id_lst_pipl');

  checkfilelist('id_lst_disabilities');
  fileCssChange('id_lst_disabilities');

  checkfilelist('id_lst_retirement');
  fileCssChange('id_lst_retirement');

  checkfilelist('id_lst_safety');
  fileCssChange('id_lst_safety');
}

var user_list =[];
function setDuty(){ 
  var arg ={};
  arg['id']="id_btn_save_key_emp_no";
  var uid = savePopupEmpFunc1(arg);
  let indexUser = user_list.findIndex(user => user.EMP_NO == uid);
  $('input#id_duty_cd').val(user_list[indexUser].DUTY_NAME);
  $('div#layer-popup_'+'key_emp_no').attr('class', 'layer-popup active');
}

function onSave(){
	var check = $('[validation-check]').vcCheck();
    if (!check) {
    	return false;
  }
    
	var param = createParameter();
	
	param = _sys.convertParam(param);

  var strShps = uploadShpFiles();
  var strPipls = uploadPiplFiles();
  var strRetirements = uploadRetirementFiles();
  var strDisabilities = uploadDisabilitiesFiles();
  var strSafety = uploadSafetyFiles();
  param.shpFileIds = strShps;  
  param.piplFileIds = strPipls;  
  param.retirementFileIds = strRetirements;  
  param.disabilitiesFileIds = strDisabilities;
  param.safetyFileIds = strSafety;

	var data = _sys.mariaDB.ajax(CTX + '/sft/sft_0501/save.ajax', param, 'post');

	if (data.INSERT_RESULT > 0 || data.UPDATE_RESULT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		/*window.location = CTX + '/sft/sft_0501/detailForm?EDU_ID=' + data.EDU_ID;*/
		window.location = CTX + '/sft/sft_0501/list?';
	} // Exception 발생
	else if(result.EXCEPTION){
		if(result.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
	}
	// 삭제 실패
	else {
		alert(_MESSAGE.common.saveFail);
	}
}

/* 파라미터 생성 */
function createParameter() {
	var param = {};
	if ($('input#PROCESS').val() === 'UPDATE') {
		param.EDU_ID = $('input#EDU_ID').val();
	} else if ($('input#PROCESS').val() === 'INSERT') {
		param.EDU_ID = $('input#EDU_ID').val();
	}
	param.PROCESS = $('input#PROCESS').val();
	param.EMP_NO = $('#id_emp_str_uid_key_emp_no').val();
  param.SAFETY_EDU_DATE = $('input#SAFETY_EDU_DATE').val();
	param.SHP_EDU_DATE = $('input#SHP_EDU_DATE').val();
	param.DISABILITIES_EDU_DATE = $('input#DISABILITIES_EDU_DATE').val();
	param.PIPL_EDU_DATE = $('input#PIPL_EDU_DATE').val();
	param.RETIREMENT_EDU_DATE = $('input#RETIREMENT_EDU_DATE').val();
  param.SESS_USER_ID = $('input#SESS_USER_ID').val();
  param.UPS_ID = $('input#UPS_ID').val();
	return param;
}

function uploadShpFiles(){
	var arrStr = '';
	
	if(shpNewFiles.length){
		for (var i = 0; i < shpNewFiles.length; i++) {
			var formdata = new FormData();
			formdata.append('file', shpNewFiles[i]);
			var data = _sys.mariaDB.ajaxFile(CTX + '/util/upload/uploadMultipleFiles.ajax', formdata);
			var str = ''
			if(data && data.responseData){
				str = data.responseData.ATCH_FLE_SEQ
				arrStr += str + '!@#';
			}
		}
		return arrStr;
	}
  return arrStr;
}

function addShpFunc(){
	$("#id_input_shp").trigger("click");
}

var shpNewFiles = [];
function getFilenameShp(inp){
	var files = $('#id_input_shp').prop('files');
    var file = files[0];
    if (file){
    	shpNewFiles.push(file);
    	
    	drawPreviewShp(file);
    } 
}

function drawPreviewShp(file){
	var today = new Date();
	var datestring = today.getDate()  + "-" + (today.getMonth()+1) + "-" + today.getFullYear();
	var fileSize = file.size;
	
	var html = '<li>'
			 + 		'<div class="file-wrap">'
			 +			'<span class="file-info">'
			 +				'<em class="name">'+file.name+'</em>'
			 +			'</span>'
			 +			'<span class="bottom-info">'
			 +				'<em class="date">'+datestring+'</em>'
			 +				'<em style="padding-left: 10px;">'+fileSize+'</em>'
			 +			'</span>'
			 + 		'</div>'
//			 +		'<button class="download-btn"></button>'
			 +		'<button class="remove-btn cls_new" onclick="removeShpFunc(this)"></button>'
			 + '</li>';

	$('#id_lst_shp').append(html)
}

function removeShpFunc(inp){
	var classList = inp.className.split(/\s+/);
	var isNew = classList.indexOf('cls_new');
	
//	is Old
	if(isNew == -1){
		deleteToolFileWithId(inp);
	}else{
		var tmpLi = inp.parentNode;
		tmpLi.remove();
	}
}

function downloadFileShpFunc(inp){
	var prevEle = inp.previousElementSibling;
	var fileId = inp.getAttribute("tmpFileId");
	var fileNm = inp.getAttribute("tmpFileNm");
	
	window.open(CTX + '/util/upload/downloadFileV2?fileId=' + fileId + '&fileName=' + fileNm,'_blank');
}

function uploadPiplFiles(){
	var arrStr = '';
	
	if(piplNewFiles.length){
		for (var i = 0; i < piplNewFiles.length; i++) {
			var formdata = new FormData();
			formdata.append('file', piplNewFiles[i]);
			var data = _sys.mariaDB.ajaxFile(CTX + '/util/upload/uploadMultipleFiles.ajax', formdata);
			var str = ''
			if(data && data.responseData){
				str = data.responseData.ATCH_FLE_SEQ
				arrStr += str + '!@#';
			}
		}
		return arrStr;
	}
  return arrStr;
}

function addPiplFunc(){
	$("#id_input_pipl").trigger("click");
}

var piplNewFiles = [];
function getFilenamePipl(inp){
	var files = $('#id_input_pipl').prop('files');
    var file = files[0];
    if (file){
    	piplNewFiles.push(file);
    	
    	drawPreviewPipl(file);
    } 
}

function drawPreviewPipl(file){
	var today = new Date();
	var datestring = today.getDate()  + "-" + (today.getMonth()+1) + "-" + today.getFullYear();
	var fileSize = file.size;
	
	var html = '<li>'
			 + 		'<div class="file-wrap">'
			 +			'<span class="file-info">'
			 +				'<em class="name">'+file.name+'</em>'
			 +			'</span>'
			 +			'<span class="bottom-info">'
			 +				'<em class="date">'+datestring+'</em>'
			 +				'<em style="padding-left: 10px;">'+fileSize+'</em>'
			 +			'</span>'
			 + 		'</div>'
//			 +		'<button class="download-btn"></button>'
			 +		'<button class="remove-btn cls_new" onclick="removePiplFunc(this)"></button>'
			 + '</li>';

	$('#id_lst_pipl').append(html)
}

function removePiplFunc(inp){
	var classList = inp.className.split(/\s+/);
	var isNew = classList.indexOf('cls_new');
	
//	is Old
	if(isNew == -1){
		deleteToolFileWithId(inp);
	}else{
		var tmpLi = inp.parentNode;
		tmpLi.remove();
	}
}

function downloadFilePiplFunc(inp){
	var prevEle = inp.previousElementSibling;
	var fileId = inp.getAttribute("tmpFileId");
	var fileNm = inp.getAttribute("tmpFileNm");
	
	window.open(CTX + '/util/upload/downloadFileV2?fileId=' + fileId + '&fileName=' + fileNm,'_blank');
}

function uploadDisabilitiesFiles(){
	var arrStr = '';
	
	if(disabilitiesNewFiles.length){
		for (var i = 0; i < disabilitiesNewFiles.length; i++) {
			var formdata = new FormData();
			formdata.append('file', disabilitiesNewFiles[i]);
			var data = _sys.mariaDB.ajaxFile(CTX + '/util/upload/uploadMultipleFiles.ajax', formdata);
			var str = ''
			if(data && data.responseData){
				str = data.responseData.ATCH_FLE_SEQ
				arrStr += str + '!@#';
			}
		}
		return arrStr;
	}
  return arrStr;
}

function addDisabilitiesFunc(){
	$("#id_input_disabilities").trigger("click");
}

var disabilitiesNewFiles = [];
function getFilenameDisabilities(inp){
	var files = $('#id_input_disabilities').prop('files');
    var file = files[0];
    if (file){
    	disabilitiesNewFiles.push(file);
    	
    	drawPreviewDisabilities(file);
    } 
}

function drawPreviewDisabilities(file){
	var today = new Date();
	var datestring = today.getDate()  + "-" + (today.getMonth()+1) + "-" + today.getFullYear();
	var fileSize = file.size;
	
	var html = '<li>'
			 + 		'<div class="file-wrap">'
			 +			'<span class="file-info">'
			 +				'<em class="name">'+file.name+'</em>'
			 +			'</span>'
			 +			'<span class="bottom-info">'
			 +				'<em class="date">'+datestring+'</em>'
			 +				'<em style="padding-left: 10px;">'+fileSize+'</em>'
			 +			'</span>'
			 + 		'</div>'
//			 +		'<button class="download-btn"></button>'
			 +		'<button class="remove-btn cls_new" onclick="removeDisabilitiesFunc(this)"></button>'
			 + '</li>';

	$('#id_lst_disabilities').append(html)
}

function removeDisabilitiesFunc(inp){
	var classList = inp.className.split(/\s+/);
	var isNew = classList.indexOf('cls_new');
	
//	is Old
	if(isNew == -1){
		deleteToolFileWithId(inp);
	}else{
		var tmpLi = inp.parentNode;
		tmpLi.remove();
	}
}

function downloadFileDisabilitiesFunc(inp){
	var prevEle = inp.previousElementSibling;
	var fileId = inp.getAttribute("tmpFileId");
	var fileNm = inp.getAttribute("tmpFileNm");
	
	window.open(CTX + '/util/upload/downloadFileV2?fileId=' + fileId + '&fileName=' + fileNm,'_blank');
}

function uploadRetirementFiles(){
	var arrStr = '';
	
	if(retirementNewFiles.length){
		for (var i = 0; i < retirementNewFiles.length; i++) {
			var formdata = new FormData();
			formdata.append('file', retirementNewFiles[i]);
			var data = _sys.mariaDB.ajaxFile(CTX + '/util/upload/uploadMultipleFiles.ajax', formdata);
			var str = ''
			if(data && data.responseData){
				str = data.responseData.ATCH_FLE_SEQ
				arrStr += str + '!@#';
			}
		}
		return arrStr;
	}
  return arrStr;
}

function addRetirementFunc(){
	$("#id_input_retirement").trigger("click");
}

var retirementNewFiles = [];
function getFilenameRetirement(inp){
	var files = $('#id_input_retirement').prop('files');
    var file = files[0];
    if (file){
    	retirementNewFiles.push(file);
    	
    	drawPreviewRetirement(file);
    } 
}

function drawPreviewRetirement(file){
	var today = new Date();
	var datestring = today.getDate()  + "-" + (today.getMonth()+1) + "-" + today.getFullYear();
	var fileSize = file.size;
	
	var html = '<li>'
			 + 		'<div class="file-wrap">'
			 +			'<span class="file-info">'
			 +				'<em class="name">'+file.name+'</em>'
			 +			'</span>'
			 +			'<span class="bottom-info">'
			 +				'<em class="date">'+datestring+'</em>'
			 +				'<em style="padding-left: 10px;">'+fileSize+'</em>'
			 +			'</span>'
			 + 		'</div>'
//			 +		'<button class="download-btn"></button>'
			 +		'<button class="remove-btn cls_new" onclick="removeRetirementFunc(this)"></button>'
			 + '</li>';

	$('#id_lst_retirement').append(html)
}

function removeRetirementFunc(inp){
	var classList = inp.className.split(/\s+/);
	var isNew = classList.indexOf('cls_new');
	
//	is Old
	if(isNew == -1){
		deleteToolFileWithId(inp);
	}else{
		var tmpLi = inp.parentNode;
		tmpLi.remove();
	}
}

function downloadFileRetirementFunc(inp){
	var prevEle = inp.previousElementSibling;
	var fileId = inp.getAttribute("tmpFileId");
	var fileNm = inp.getAttribute("tmpFileNm");
	
	window.open(CTX + '/util/upload/downloadFileV2?fileId=' + fileId + '&fileName=' + fileNm,'_blank');
}

///////////
function uploadSafetyFiles(){
	var arrStr = '';
	
	if(SafetyNewFiles.length){
		for (var i = 0; i < SafetyNewFiles.length; i++) {
			var formdata = new FormData();
			formdata.append('file', SafetyNewFiles[i]);
			var data = _sys.mariaDB.ajaxFile(CTX + '/util/upload/uploadMultipleFiles.ajax', formdata);
			var str = ''
			if(data && data.responseData){
				str = data.responseData.ATCH_FLE_SEQ
				arrStr += str + '!@#';
			}
		}
		return arrStr;
	}
  return arrStr;
}

function addSafetyFunc(){
	$("#id_input_safety").trigger("click");
}

var SafetyNewFiles = [];
function getFilenameSafety(inp){
	var files = $('#id_input_safety').prop('files');
    var file = files[0];
    if (file){
    	SafetyNewFiles.push(file);
    	
    	drawPreviewSafety(file);
    } 
}

function drawPreviewSafety(file){
	var today = new Date();
	var datestring = today.getDate()  + "-" + (today.getMonth()+1) + "-" + today.getFullYear();
	var fileSize = file.size;
	
	var html = '<li>'
			 + 		'<div class="file-wrap">'
			 +			'<span class="file-info">'
			 +				'<em class="name">'+file.name+'</em>'
			 +			'</span>'
			 +			'<span class="bottom-info">'
			 +				'<em class="date">'+datestring+'</em>'
			 +				'<em style="padding-left: 10px;">'+fileSize+'</em>'
			 +			'</span>'
			 + 		'</div>'
//			 +		'<button class="download-btn"></button>'
			 +		'<button class="remove-btn cls_new" onclick="removeSafetyFunc(this)"></button>'
			 + '</li>';

	$('#id_lst_safety').append(html)
}

function removeSafetyFunc(inp){
	var classList = inp.className.split(/\s+/);
	var isNew = classList.indexOf('cls_new');
	
//	is Old
	if(isNew == -1){
		deleteToolFileWithId(inp);
	}else{
		var tmpLi = inp.parentNode;
		tmpLi.remove();
	}
}

function downloadfileSafetyFunc(inp){
	var prevEle = inp.previousElementSibling;
	var fileId = inp.getAttribute("tmpFileId");
	var fileNm = inp.getAttribute("tmpFileNm");
	
	window.open(CTX + '/util/upload/downloadFileV2?fileId=' + fileId + '&fileName=' + fileNm,'_blank');
}


function deleteToolFileWithId(inp){
  //	delete phy store
    if(!confirm(_MESSAGE.common.deleteConfirm)) return;
    var tmpInfoFile = inp.getAttribute("tmpFileId");
    var FILE_ID = inp.getAttribute("tmpFileId");
    var FILE_NM = inp.getAttribute("tmpFileNm");
    var EDU_FILE_ID = inp.getAttribute("tmpEduFileId");
    var FLE_PATH = inp.getAttribute("tmpFilePath");
    
    var param = {};
    param.FILE_ID = FILE_ID;
    param.FILE_NM = FILE_NM;
    param.EDU_FILE_ID = EDU_FILE_ID;
    param.FLE_PATH = FLE_PATH;
    
    var data = _sys.mariaDB.ajax(CTX + '/sft/sft_0501/deleteEduFile.ajax', param, 'post');
    
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
    window.location = CTX + '/sft/sft_0501/list';
  }

  function fileCssChange(selector){
    var myElement = document.getElementById(selector);
    if(window.addEventListener) {
      // Normal browsers
      myElement.addEventListener('DOMSubtreeModified',  function(){ checkfilelist(selector); }, false);
    } else
      if(window.attachEvent) {
          // IE
      myElement.attachEvent('DOMSubtreeModified', function(){ checkfilelist(selector); });
    }
  }
  
  function checkfilelist(selector) {
    if ( $('#'+selector).children().length > 0 ) {
      $('#'+selector).css("padding-right","10px");
    }else{
      $('#'+selector).css("padding-right","");
    }
  }
  