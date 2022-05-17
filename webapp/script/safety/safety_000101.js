function sft000101() {
	var CRUD = "${DATA.CRUD}"
	if(CRUD == 'U') {
	}
	
	$('#SAVE_BTN').click(saveTool);
	
	controlDisabledDate(unnecessary == 'Y'? true : false);
  checkfilelist('id_lst_img');
  fileCssChange('id_lst_img');
  checkfilelist('id_lst_specification');
  fileCssChange('id_lst_specification');
}

function saveTool(){
	var check = $('[validation-check]').vcCheck();
    if (!check) {
    	return false;
    }
    debugger
	var param = createSearchParameter();
	
	param = _sys.convertParam(param);
	
	var arrStr = uploadSpecificationFiles();
	var arrImg = uploadImgs();
	
	param.specificationFileIds = arrStr;
	param.fileImgs = arrImg;
	
	var history_data = getDataHist();
	param.TOOL_HISTORY = JSON.stringify(history_data);
	
	var data = _sys.mariaDB.ajax(CTX + '/sft/sft_0001/saveManual.ajax', param, 'post');
	
	if(data.TOOL_ID > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/sft/sft_0001/detailForm?TOOL_ID=' + data.TOOL_ID;
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

function uploadSpecificationFiles(){
	var arrStr = '';
	
	if(specificationNewFiles.length){
		for (var i = 0; i < specificationNewFiles.length; i++) {
			var formdata = new FormData();
			formdata.append('file', specificationNewFiles[i]);
			var data = _sys.mariaDB.ajaxFile(CTX + '/util/upload/uploadMultipleFiles.ajax', formdata);
			var str = ''
			if(data && data.responseData){
				str = data.responseData.ATCH_FLE_SEQ
				arrStr += str + '!@#';
			}
		}
		return arrStr;
	}
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

function createSearchParameter() {
	var param = {};
	param.CRUD = $('#CRUD').val();
	param.TOOL_ID = $('#TOOL_ID').val();
	param.TOOL_TYPE = $('#id_tool_type').val();
	param.MANAGE_NO = $('input#MANAGE_NO').val();
	param.TOOL_NAME = $('input#TOOL_NAME').val();
	param.STANDARD = $('input#STANDARD').val();
	param.BRAND_NAME = $('input#BRAND_NAME').val();
	param.MODEL_NAME = $('input#MODEL_NAME').val();
	param.AMOUNT = $('input#AMOUNT').val();
//	param.IS_LOSS_OR_DAMAGE = $('input#IS_LOSS_OR_DAMAGE').val();
	param.LOSS_OR_DAMAGE = $("input[type='radio'][name='NAME_CHK']:checked").val();
	param.UNNECESSARY =  $('#unnecessary').is(":checked") ? "Y" : "N";
	param.CORRECTION_DATE = $('input#id_correctionDate').val();
	param.RENEW_DATE = $('input#id_renewDate').val();
	param.SERIAL_NO = $('input#SERIAL_NO').val();
	param.IMPORT_DATE = $('input#id_importDate').val();
	param.MANAGER = $('input#id_emp_str_uid_key_manager').val();
	param.IMPORT_PRICE = $('input#IMPORT_PRICE').val();
	return param;
}

function chkChange(inp){
	var isChecked = inp.checked;
	controlDisabledDate(isChecked);
}
function controlDisabledDate(isChecked){
/*	$("#id_correctionDate").val();*/
	$("#id_correctionDate").prop('disabled', isChecked);  
	if (isChecked) {
		$("#id_correctionDate").val("");
		$("#id_correctionDate").datepicker("disable");
	} else {
		$("#id_correctionDate").val();
		$("#id_correctionDate").datepicker("enable");
	}
}

function addHisFunc(inp){
	var eElement = inp.parentNode;
//	$( "li.third-item" ).prev()
//	check prev element is remove btn
	var prevEle = inp.previousElementSibling;
	var preEleClsLst = prevEle.classList;
	var isOld =  preEleClsLst.contains('remove-btn');
	
	var btnRemove = '<button class="btn1 remove-btn motion" onclick="removeHisFunc(this)" id="removeHisFunc">'
				  + 	'<i class="lar la-trash-alt"></i>'
				  + '</button>';

	if(!isOld){
		inp.insertAdjacentHTML('beforebegin', btnRemove);
	}
	
	var d = new Date();
	let time = d.getTime();
//	new his
	var tmpEle = '<li>'
		  	   + 	'<div class="calendar-picker">'
		  	   +		'<div class="input-group">'
		  	   +			'<label class="sr-only">날짜설정</label>'
		  	   +			'<input name="dp_'+time+'" type="text" id="HIS_DATE_'+time+'" validation-check="required" placeholder="YYYY-MM-DD" title="날짜설정" class="datepicker cls_HIS_DATE" readonly>'
		  	   +			'<button class="calendar-picker-btn"></button>'
		  	   +		'</div>'
		  	   +	'</div>'
		  	   +	'<div class="register-write">'
		  	   +		'<div class="input-group">'
		  	   +			'<input type="text" id="HIS_CONTENT" title="장비 활용 용도" placeholder="장비 활용 용도">'
		  	   +		'</div>'
		  	   +	'</div>'
		  	   +	'<button class="btn1 remove-btn motion cls_new" onclick="removeHisFunc(this)" id="removeHisFunc">'
		  	   +		'<i class="lar la-trash-alt"></i>'
		  	   +	'</button>'
		  	   + '</li>';
	
	var ulEle = eElement.parentNode;
	ulEle.insertAdjacentHTML('afterbegin', tmpEle);
	
	$('.datepicker').datepicker();
	$('.calendar-picker').click(function() {
     $(this).find(".datepicker").datepicker('show');
  });
}

function removeHisFunc(inp){
	var classList = inp.className.split(/\s+/);
	var isNew = classList.indexOf('cls_new');
	
//	check root hist
	var tmpParent = inp.parentNode;
	var lastEleChild = tmpParent.lastElementChild;
	var classListLastNode = lastEleChild.className.split(/\s+/);
	var isBtnAddHis = classListLastNode.indexOf('cls_addHis');
	var prevLi = tmpParent.previousElementSibling;
	if(isBtnAddHis > -1){
		var tmpAddBtn = '<button class="btn3 motion cls_addHis" onclick="addHisFunc(this)">'
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
	var tmpLength = $('#historys li').length;
	if(tmpLength == 1) {
		$('#historys li').each(function (i){
			var lastRmBtn = $(this).find(".remove-btn");
			lastRmBtn.remove()
		});
	}
}

function addImgFunc(){
	$("#id_input_imagePath").trigger("click");
}

var imgNewFiles = [];
var imgDelFile = [];
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
	}else{
		var tmpLi = inp.parentNode;
		tmpLi.remove();
	}
	
}

function addSpecificationFunc(){
	$("#id_input_specification").trigger("click");
}

var specificationNewFiles = [];
var specificationDelFile = [];
function getFilenameSpecification(inp){
	var files = $('#id_input_specification').prop('files');
    var file = files[0];
    if (file){
    	specificationNewFiles.push(file);
    	
    	drawPreviewSpecification(file);
    } 
}

function drawPreviewSpecification(file){
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
			 +		'<button class="remove-btn cls_new" onclick="removeSpecificationFunc(this)"></button>'
			 + '</li>';

	$('#id_lst_specification').append(html)
}

function removeSpecificationFunc(inp){
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

function deleteToolFileWithId(inp){
//	delete phy store
	if(!confirm(_MESSAGE.common.deleteConfirm)) return;
	var tmpInfoFile = inp.getAttribute("tmpFileId");
	var FILE_ID = inp.getAttribute("tmpFileId");
	var FILE_NM = inp.getAttribute("tmpFileNm");
	var TOOL_FILE_ID = inp.getAttribute("tmpToolFileId");
	var FLE_PATH = inp.getAttribute("tmpFilePath");
	
	var param = {};
	param.FILE_ID = FILE_ID;
	param.FILE_NM = FILE_NM;
	param.TOOL_FILE_ID = TOOL_FILE_ID;
	param.FLE_PATH = FLE_PATH;
	
	var data = _sys.mariaDB.ajax(CTX + '/sft/sft_0001/deleteToolFile.ajax', param, 'post');
	
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

function getDataHist(){
	var history_data = [];
	
	$("#historys li").each(function (i){
		var row = new Object();
		row.HIS_DATE        	= $(this).find(".cls_HIS_DATE").val();
		row.HIS_CONTENT = $(this).find("#HIS_CONTENT").val();
		history_data.push(row);
	})
	
	return history_data;
}

function goList() {
	$(location).attr('href', CTX + '/sft/sft_0001/list');
  localStorage.removeItem("paramSearchSft0002");
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


