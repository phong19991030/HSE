
function res_000201() {

  var project_list = _sys.mariaDB.getData(CTX + '/com/com_0102/getData.ajax', {});
	project_list.LIST.forEach((e) => {
		var selected = (e.PROJECT_ID == $('#PROJECT_ID').val())?"selected":"";
		var option = '<option value="' + e.PROJECT_ID + '"'+selected+'>' + e.PROJECT_NAME + '</option>';
		option = $(option).prop('info', e);
		$('select#PROJECT').append(option);
	});

	var CRUD = $('input#CRUD').val();
	if(CRUD == 'U') {
    $('select#LICENSE').val($('#LICENSE_VALUE').val());
	}
	
	$('#SAVE_BTN').click(saveWaste);

    	// 삭제 버튼 클릭 이벤트 
	$('button#DELETE_BTN').click(function() {
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var result = _sys.mariaDB.getData(CTX +'/res/res_0002/detailForm/delete.ajax', {
			WASTE_ID: $('input#WASTE_ID').val(),
		});
		console.log(result);
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = CTX + '/res/res_0002/list';
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

function saveWaste(){

	var check = $('[validation-check]').vcCheck();
    if (!check) {
    	return false;
  }
    
	var param = createSearchParameter();
	
	param = _sys.convertParam(param);
	var arrImg = uploadImgs();
	param.fileImgs = arrImg;
	
	var data = _sys.mariaDB.ajax(CTX + '/res/res_0002/save.ajax', param, 'post');
	
	if(data.RESULT_SAVE > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/res/res_0002/detailForm?WASTE_ID=' + data.WASTE_ID;
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
  param.PROCESS = $('#PROCESS').val();
	param.WASTE_ID = $('#WASTE_ID').val();
	param.MANAGER = $('input#id_emp_str_uid_key_manager').val();
  param.PROJECT_ID = $('#PROJECT').val();
  param.DISPOSAL_DATE = $('#DISPOSAL_DATE').val();
  param.WASTE_TYPE = $('#WASTE_TYPE').val();
  param.WASTE_GENERATION = $('#WASTE_GENERATION').val();
  param.SELF_THROUGHPUT = $('#SELF_THROUGHPUT').val();
  param.CONSIGNMENT_THROUGHPUT = $('#CONSIGNMENT_THROUGHPUT').val();
  param.LICENSE = $('#LICENSE').val();

	return param;
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
		deleteWasteFileWithId(inp);
	}else{
		var tmpLi = inp.parentNode;
		tmpLi.remove();
	}
	
}

function deleteWasteFileWithId(inp){
//	delete phy store
	if(!confirm(_MESSAGE.common.deleteConfirm)) return;
	var tmpInfoFile = inp.getAttribute("tmpFileId");
	var FILE_ID = inp.getAttribute("tmpFileId");
	var FILE_NM = inp.getAttribute("tmpFileNm");
	var WASTE_FILE_ID = inp.getAttribute("tmpToolFileId");
	var FLE_PATH = inp.getAttribute("tmpFilePath");
	
	var param = {};
	param.FILE_ID = FILE_ID;
	param.FILE_NM = FILE_NM;
	param.WASTE_FILE_ID = WASTE_FILE_ID;
	param.FLE_PATH = FLE_PATH;
	
	var data = _sys.mariaDB.ajax(CTX + '/res/res_0002/deleteWasteFile.ajax', param, 'post');
	
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
  window.location = CTX + '/res/res_0002/list';
}


