var com0401Data = [];
var flagModifyCom0401  = false;

// show tab menu 1
function com0401() {
	onSearchCom0401();
	onSearchCom040102();
	onSearchCom040103();
	onSearchCom040104();
	onSearchCom040105();
	onSearchCom040106();
	onSearchCom040107();
	$(".hidden-cus").css("display", "none");
	
	$('button#MODIFY_BTN_COM0401').click(function(){
		doModify(1);
	});	
	
	$('button#MODIFY_BTN_COM0402').click(function(){
		doModify(2);
	});	
	
	$('button#MODIFY_BTN_COM0403').click(function(){
		doModify(3);
	});	
	
	$('button#MODIFY_BTN_COM0401_1').click(function(){
		doModify(1);
	});	
	
	$('button#MODIFY_BTN_COM0402_1').click(function(){
		doModify(2);
	});	
	
	$('button#MODIFY_BTN_COM0403_1').click(function(){
		doModify(3);
	});	
	
	// 검색 폼 토글 버튼 클릭 이벤트
	
	$('a#COM0401').click(function(){
		cssDefault(1);
		document.getElementById("LI_COM0402").classList.remove("current");
		document.getElementById("LI_COM0403").classList.remove("current");
		
		
		document.getElementById("DIV_COM0401").style.display = 'block';
		document.getElementById("DIV_COM0402").style.display = 'none';
		document.getElementById("DIV_COM0403").style.display = 'none';
		
		document.getElementById("LI_COM0401").classList.add("current");
	});
	
	$('a#COM0402').click(function(){
		cssDefault(2);
		document.getElementById("LI_COM0401").classList.remove("current");
		document.getElementById("LI_COM0403").classList.remove("current");
		
		
		document.getElementById("DIV_COM0401").style.display = 'none';
		document.getElementById("DIV_COM0402").style.display = 'block';
		document.getElementById("DIV_COM0403").style.display = 'none';
		
		document.getElementById("LI_COM0402").classList.add("current");
	});
	$('a#COM0403').click(function(){
		cssDefault(3);
		document.getElementById("LI_COM0401").classList.remove("current");
		document.getElementById("LI_COM0402").classList.remove("current");
		
		document.getElementById("DIV_COM0401").style.display = 'none';
		document.getElementById("DIV_COM0402").style.display = 'none';
		document.getElementById("DIV_COM0403").style.display = 'block';
		
		document.getElementById("LI_COM0403").classList.add("current");
	});
}

function registerCom0401(){
	// window.location = CTX + '/sys_new/doc_0100/registerForm?DOC_GROUP=DL';
	$("#file-input0401").trigger("click");
}
/* 검색 이벤트 */
function onSearchCom0401() {
	
		document.getElementById("DIV_COM0401").style.display = 'block';
		document.getElementById("DIV_COM0402").style.display = 'none';
		document.getElementById("DIV_COM0403").style.display = 'none';
		
		document.getElementById("LI_COM0401").classList.add("current");	
	
	var data = _sys.mariaDB.getData(CTX + '/com/com_0401/getData.ajax');
	// row 생성
	makeListCom0401(data.LIST);
}

function dowloadFileCom0401(index) {
	var info = com0401Data[index];
	if (info.FILE_ID)
		window.open(CTX + '/util/upload/downloadFileV2?fileId=' + info.FILE_ID + '&fileName=' + info.FLE_NM, '_blank');
	else
		alert("File not exists");
}

function makeListCom0401(list) {
	com0401Data = list;
	list.forEach(e => {
		var btnRemoveFile = grant['WRT_YN'] ? '<button class="remove-btn" onclick="deleteFileCom0401('+list.indexOf(e)+')"></button>' : '';
		var fileSize = e.FLE_SZ ? formatBytes(e.FLE_SZ) : '';
		var html = '<li onclick="dowloadFileCom0401('+list.indexOf(e)+')" style="cursor:pointer">'
				 + 		'<div class="file-wrap">'
				 +			'<span class="file-info"><em class="name">'+e.DOC_NAME+'</em></span>'
				 +			'<span class="bottom-info">'
				 +				'<em class="date">'+e.INS_DATE+'</em>'
				 +				'<em class="size">'+fileSize+'</em></span>'
				 +		'</div>'
				 +		'<button class="download-btn" onclick="dowloadFileCom0401('+list.indexOf(e)+')"></button>'
				 +		'<div class="hidden-cus">'
        		 + 			btnRemoveFile
        		 +		'</div>'
				 + '</li>'

		$('#ROW_LIST_COM0401').append(html);
	});
	if(grant['WRT_YN']){
		$('#ROW_LIST_COM0401').append('<li class="add-box hidden-cus" id="REGISTER_BTN_COM0401"><button class="add-btn" onclick="registerCom0401()"></button></li>');
	}
};

function deleteFileCom0401(index) {
	var info = com0401Data[index];
	if(info.FILE_ID){
	if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			// 삭제 요청
			
			var result = _sys.mariaDB.getData(CTX +'/sys_new/doc_0100/detailForm/delete.ajax', {
				DOC_ID: info.DOC_ID
				
			});
			// 삭제 성공
			if(result.IS_DELETE) {
				alert(_MESSAGE.common.deleteSuccess);
				$('#ROW_LIST_COM0401').empty();
				onSearchCom0401();
			}
			// Exception 발생
			else if(result.EXCEPTION){
				if(result.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
			}
			// 삭제 실패
			else {
				alert(_MESSAGE.common.deleteFail);
			}
	}
}


var com040102Data = [];

function registerCom040102(){
	// window.location = CTX + '/sys_new/doc_0100/registerForm?DOC_GROUP=AI';
	$("#file-input040102").trigger("click");
}


function onSearchCom040102() {
	var data = _sys.mariaDB.getData(CTX + '/com/com_0401/getDataCom040102.ajax');
	
	// row 생성
	makeListCom040102(data.LIST);
}

function dowloadFileCom040102(index){
    var info = com040102Data[index];
    if(info.FILE_ID)
    window.open(CTX + '/util/upload/downloadFileV2?fileId=' + info.FILE_ID + '&fileName=' + info.FLE_NM, '_blank');
    else
    alert("File not exists");
}



function makeListCom040102(list) {
    com040102Data = list;
    list.forEach(e => {
    	var btnRemoveFile = grant['WRT_YN'] ? '<button class="remove-btn" onclick="deleteFileCom040102('+list.indexOf(e)+')"></button>' : '';
    	var fileSize = e.FLE_SZ ? formatBytes(e.FLE_SZ) : '';
        var html = '<li  onclick="dowloadFileCom040102('+list.indexOf(e)+')" style="cursor:pointer">'
        		 + 		'<div class="file-wrap">'
        		 +			'<span class="file-info"><em class="name">'+e.DOC_NAME+'</em></span>'
        		 +			'<span class="bottom-info">'
        		 +				'<em class="date">'+e.INS_DATE+'</em>'
        		 +				'<em class="size">'+fileSize+'</em>'
        		 +			'</span>'
        		 +		'</div>'
        		 +		'<button class="download-btn" onclick="dowloadFileCom040102('+list.indexOf(e)+')"></button>'
        		 +		'<div class="hidden-cus">'
        		 + 			btnRemoveFile
        		 +		'</div>'
        		 +	'</li>'

        $('#ROW_LIST_COM040102').append(html);
    });
    if(grant['WRT_YN']){
    	$('#ROW_LIST_COM040102').append('<li class="add-box hidden-cus" id="REGISTER_BTN_COM040102"><button class="add-btn" onclick="registerCom040102()"></button></li>');
    }
};

function deleteFileCom040102(index) {
	var info = com040102Data[index];
	if(info.FILE_ID){
	if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			// 삭제 요청
			
			var result = _sys.mariaDB.getData(CTX +'/sys_new/doc_0100/detailForm/delete.ajax', {
				DOC_ID: info.DOC_ID
				
			});
			// 삭제 성공
			if(result.IS_DELETE) {
				alert(_MESSAGE.common.deleteSuccess);
				$('#ROW_LIST_COM040102').empty();
				onSearchCom040102();
			}
			// Exception 발생
			else if(result.EXCEPTION){
				if(result.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
			}
			// 삭제 실패
			else {
				alert(_MESSAGE.common.deleteFail);
			}
	}
}

var com040103Data = [];

function registerCom040103(){
	// window.location = CTX + '/sys_new/doc_0100/registerForm?DOC_GROUP=DS';
	$("#file-input040103").trigger("click");
}


function onSearchCom040103() {
	var data = _sys.mariaDB.getData(CTX + '/com/com_0401/getDataCom040103.ajax');
	
	// row 생성
	makeListCom040103(data.LIST);
}

function dowloadFileCom040103(index){
    var info = com040103Data[index];
    if(info.FILE_ID)
    window.open(CTX + '/util/upload/downloadFileV2?fileId=' + info.FILE_ID + '&fileName=' + info.FLE_NM, '_blank');
    else
    alert("File not exists");
}



function makeListCom040103(list) {
    com040103Data = list;
    list.forEach(e => {
    	var btnRemoveFile = grant['WRT_YN'] ? '<button class="remove-btn" onclick="deleteFileCom040103('+list.indexOf(e)+')"></button>' : '';
    	var fileSize = e.FLE_SZ ? formatBytes(e.FLE_SZ) : '';
        var html = '<li onclick="dowloadFileCom040103('+list.indexOf(e)+')" style="cursor:pointer">'
        		 + 		'<div class="file-wrap">'
        		 +			'<span class="file-info"><em class="name">'+e.DOC_NAME+'</em></span>'
        		 +			'<span class="bottom-info">'
        		 +				'<em class="date">'+e.INS_DATE+'</em>'
        		 +				'<em class="size">'+fileSize+'</em>'
        		 +			'</span>'
        		 +		'</div>'
        		 +		'<button class="download-btn" onclick="dowloadFileCom040103('+list.indexOf(e)+')"></button>'
        		 +		'<div class="hidden-cus">'
        		 + 			btnRemoveFile
        		 +		'</div>'
        		 +	'</li>'
        $('#ROW_LIST_COM040103').append(html);
    });
    if(grant['WRT_YN']){
    	$('#ROW_LIST_COM040103').append('<li class="add-box hidden-cus" id="REGISTER_BTN_COM040103"><button class="add-btn" onclick="registerCom040103()"></button></li>');
    }
};

function deleteFileCom040103(index) {
	var info = com040103Data[index];
	if(info.FILE_ID){
	if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			// 삭제 요청
			
			var result = _sys.mariaDB.getData(CTX +'/sys_new/doc_0100/detailForm/delete.ajax', {
				DOC_ID: info.DOC_ID
				
			});
			// 삭제 성공
			if(result.IS_DELETE) {
				alert(_MESSAGE.common.deleteSuccess);
				$('#ROW_LIST_COM040103').empty();
				onSearchCom040103();
			}
			// Exception 발생
			else if(result.EXCEPTION){
				if(result.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
			}
			// 삭제 실패
			else {
				alert(_MESSAGE.common.deleteFail);
			}
	}
}

// show tab menu 2
var com040104Data = [];

/* 검색 이벤트 */
function onSearchCom040104() {
	var data = _sys.mariaDB.getData(CTX + '/com/com_0401/getData040104.ajax');
	// row 생성
	makeListCom040104(data.LIST);
}

function dowloadFileCom040104(index){
    var info = com040104Data[index];
    if(info.FILE_ID)
    window.open(CTX + '/util/upload/downloadFileV2?fileId=' + info.FILE_ID + '&fileName=' + info.FLE_NM, '_blank');
    else
    alert("File not exists");
}

function makeListCom040104(list) {
    com040104Data = list;
    list.forEach(e => {
    	var btnRemoveFile = grant['WRT_YN'] ? '<button class="remove-btn" onclick="deleteFileCom040104('+list.indexOf(e)+')"></button>' : '';
    	var fileSize = e.FLE_SZ ? formatBytes(e.FLE_SZ) : '';
		var html = '<li onclick="dowloadFileCom040104('+list.indexOf(e)+')" style="cursor:pointer">'
				 + 		'<div class="file-wrap">'
				 +			'<span class="file-info"><em class="name">'+e.DOC_NAME+'</em></span>'
				 +			'<span class="bottom-info">'
				 +				'<em class="date">'+e.INS_DATE+'</em>'
				 +				'<em class="size">'+fileSize+'</em>'
				 +			'</span>'
				 +		'</div>'
				 +		'<button class="download-btn" onclick="dowloadFileCom040104('+list.indexOf(e)+')"></button>'
				 +		'<div class="hidden-cus">'
        		 + 			btnRemoveFile
        		 +		'</div>'
				 + '</li>'

        $('#ROW_LIST_COM040104').append(html);
    });
    if(grant['WRT_YN']){
    	$('#ROW_LIST_COM040104').append('<li class="add-box hidden-cus" id="REGISTER_BTN_COM040104"><button class="add-btn" onclick="registerCom040104()"></button></li>');
    }
};

function registerCom040104(){
	// window.location = CTX + '/sys_new/doc_0100/registerForm?DOC_GROUP=DC';
	$("#file-input040104").trigger("click");
}

function deleteFileCom040104(index) {
	var info = com040104Data[index];
	if(info.FILE_ID){
	if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			// 삭제 요청
			
			var result = _sys.mariaDB.getData(CTX +'/sys_new/doc_0100/detailForm/delete.ajax', {
				DOC_ID: info.DOC_ID
				
			});
			// 삭제 성공
			if(result.IS_DELETE) {
				alert(_MESSAGE.common.deleteSuccess);
				$('#ROW_LIST_COM040104').empty();
				onSearchCom040104();
			}
			// Exception 발생
			else if(result.EXCEPTION){
				if(result.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
			}
			// 삭제 실패
			else {
				alert(_MESSAGE.common.deleteFail);
			}
	}
}


// show tab menu 3
var com040105Data = [];

function registerCom040105(){
	// window.location = CTX + '/sys_new/doc_0100/registerForm?DOC_GROUP=DG';
	$("#file-input040105").trigger("click");
}

/* 검색 이벤트 */
function onSearchCom040105() {
	var data = _sys.mariaDB.getData(CTX + '/com/com_0401/getData040105.ajax');
	// row 생성
	makeListCom040105(data.LIST);
}

function dowloadFileCom040105(index){
    var info = com040105Data[index];
    if(info.FILE_ID)
    window.open(CTX + '/util/upload/downloadFileV2?fileId=' + info.FILE_ID + '&fileName=' + info.FLE_NM, '_blank');
    else
    alert("File not exists");
}



function makeListCom040105(list) {
    com040105Data = list;
    list.forEach(e => {
    	var btnRemoveFile = grant['WRT_YN'] ? '<button class="remove-btn" onclick="deleteFileCom040105('+list.indexOf(e)+')"></button>' : '';
    	var fileSize = e.FLE_SZ ? formatBytes(e.FLE_SZ) : '';
		var html = '<li onclick="dowloadFileCom040105('+list.indexOf(e)+')" style="cursor:pointer">'
				 + 		'<div class="file-wrap">'
				 +			'<span class="file-info"><em class="name">'+e.DOC_NAME+'</em></span>'
				 +			'<span class="bottom-info">'
				 +				'<em class="date">'+e.INS_DATE+'</em>'
				 +				'<em class="size">'+fileSize+'</em>'
				 +			'</span>'
				 +		'</div>'
				 + 		'<button class="download-btn" onclick="dowloadFileCom040105('+list.indexOf(e)+')"></button>'
				 +		'<div class="hidden-cus">'
        		 + 			btnRemoveFile
        		 +		'</div>'
				 + '</li>'

        $('#ROW_LIST_COM040105').append(html);
    });
    if(grant['WRT_YN']){
    	$('#ROW_LIST_COM040105').append('<li class="add-box hidden-cus" id="REGISTER_BTN_COM040105"><button class="add-btn" onclick="registerCom040105()"></button></li>');
    }
    
};

function deleteFileCom040105(index) {
	var info = com040105Data[index];
	if(info.FILE_ID){
	if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			// 삭제 요청
			
			var result = _sys.mariaDB.getData(CTX +'/sys_new/doc_0100/detailForm/delete.ajax', {
				DOC_ID: info.DOC_ID
				
			});
			// 삭제 성공
			if(result.IS_DELETE) {
				alert(_MESSAGE.common.deleteSuccess);
				$('#ROW_LIST_COM040105').empty();
				onSearchCom040105();
			}
			// Exception 발생
			else if(result.EXCEPTION){
				if(result.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
			}
			// 삭제 실패
			else {
				alert(_MESSAGE.common.deleteFail);
			}
	}
}

var com040106Data = [];

function registerCom040106(){
	// window.location = CTX + '/sys_new/doc_0100/registerForm?DOC_GROUP=OG';
	$("#file-input040106").trigger("click");
}


/* 검색 이벤트 */
function onSearchCom040106() {
	var data = _sys.mariaDB.getData(CTX + '/com/com_0401/getData040106.ajax');
	// row 생성
	makeListCom040106(data.LIST);
	
	
	
}
function dowloadFileCom040106(index){
    var info = com040106Data[index];
    if(info.FILE_ID)
    window.open(CTX + '/util/upload/downloadFileV2?fileId=' + info.FILE_ID + '&fileName=' + info.FLE_NM, '_blank');
    else
    alert("File not exists");
}



function makeListCom040106(list) {
    com040106Data = list;
    list.forEach(e => {
    	var btnRemoveFile = grant['WRT_YN'] ? '<button class="remove-btn" onclick="deleteFileCom040106('+list.indexOf(e)+')"></button>' : '';
    	var fileSize = e.FLE_SZ ? formatBytes(e.FLE_SZ) : '';
        var html = '<li onclick="dowloadFileCom040106('+list.indexOf(e)+')" style="cursor:pointer">'
        		 + 		'<div class="file-wrap">'
        		 +			'<span class="file-info"><em class="name">'+e.DOC_NAME+'</em></span>'
        		 +			'<span class="bottom-info">'
        		 +				'<em class="date">'+e.INS_DATE+'</em>'
        		 +				'<em class="size">'+fileSize+'</em>'
        		 +			'</span>'
        		 +		'</div>'
        		 + 		'<button class="download-btn" onclick="dowloadFileCom040106('+list.indexOf(e)+')"></button>'
        		 +		'<div class="hidden-cus">'
        		 + 			btnRemoveFile
        		 +		'</div>'
        		 + '</li>'

        $('#ROW_LIST_COM040106').append(html);
    });
    if(grant['WRT_YN']){
    	$('#ROW_LIST_COM040106').append('<li class="add-box hidden-cus" id="REGISTER_BTN_COM040106"><button class="add-btn" onclick="registerCom040106()"></button></li>');
    }
};

function deleteFileCom040106(index) {
	var info = com040106Data[index];
	if(info.FILE_ID){
	if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			// 삭제 요청
			
			var result = _sys.mariaDB.getData(CTX +'/sys_new/doc_0100/detailForm/delete.ajax', {
				DOC_ID: info.DOC_ID
				
			});
			// 삭제 성공
			if(result.IS_DELETE) {
				alert(_MESSAGE.common.deleteSuccess);
				$('#ROW_LIST_COM040106').empty();
				onSearchCom040106();
			}
			// Exception 발생
			else if(result.EXCEPTION){
				if(result.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
			}
			// 삭제 실패
			else {
				alert(_MESSAGE.common.deleteFail);
			}
	}
}

var com040107Data = [];

function registerCom040107(){
	// window.location = CTX + '/sys_new/doc_0100/registerForm?DOC_GROUP=RG';
	$("#file-input040107").trigger("click");
}


function onSearchCom040107() {
	var data = _sys.mariaDB.getData(CTX + '/com/com_0401/getDataCom040107.ajax');
	
	// row 생성
	makeListCom040107(data.LIST);
}

function dowloadFileCom040107(index){
    var info = com040107Data[index];
    if(info.FILE_ID)
    window.open(CTX + '/util/upload/downloadFileV2?fileId=' + info.FILE_ID + '&fileName=' + info.FLE_NM, '_blank');
    else
    alert("File not exists");
}



function makeListCom040107(list) {
    com040107Data = list;
    list.forEach(e => {
    	var btnRemoveFile = grant['WRT_YN'] ? '<button class="remove-btn" onclick="deleteFileCom040107('+list.indexOf(e)+')"></button>' : '';
    	var fileSize = e.FLE_SZ ? formatBytes(e.FLE_SZ) : '';
        var html = '<li onclick="dowloadFileCom040107('+list.indexOf(e)+')" style="cursor:pointer">'
        		 + 		'<div class="file-wrap">'
        		 +			'<span class="file-info"><em class="name">'+e.DOC_NAME+'</em></span>'
        		 +			'<span class="bottom-info">'
        		 +				'<em class="date">'+e.INS_DATE+'</em>'
        		 +				'<em class="size">'+fileSize+'</em>'
        		 +			'</span>'
        		 +		'</div>'
        		 + 		'<button class="download-btn" onclick="dowloadFileCom040107('+list.indexOf(e)+')"></button>'
        		 +		'<div class="hidden-cus">'
        		 + 			btnRemoveFile
        		 +		'</div>'
        		 + '</li>'

        $('#ROW_LIST_COM040107').append(html);
    });
    if(grant['WRT_YN']){
    	$('#ROW_LIST_COM040107').append('<li class="add-box hidden-cus" id="REGISTER_BTN_COM040107"><button class="add-btn" onclick="registerCom040107()"></button></li>');
    }
};

function deleteFileCom040107(index) {
	var info = com040107Data[index];
	if(info.FILE_ID){
	if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			// 삭제 요청
			
			var result = _sys.mariaDB.getData(CTX +'/sys_new/doc_0100/detailForm/delete.ajax', {
				DOC_ID: info.DOC_ID
				
			});
			// 삭제 성공
			if(result.IS_DELETE) {
				alert(_MESSAGE.common.deleteSuccess);
				$('#ROW_LIST_COM040107').empty();
				onSearchCom040107();
			}
			// Exception 발생
			else if(result.EXCEPTION){
				if(result.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
			}
			// 삭제 실패
			else {
				alert(_MESSAGE.common.deleteFail);
			}
	}
}

function doUpload(param, file) {
    var formdata = new FormData();
    formdata.append('file', file);
    var data = _sys.mariaDB.ajaxFile(CTX + '/util/upload/uploadMultipleFiles.ajax', formdata);
    if(data && data.responseData){
        param.FILE_ID = data.responseData.ATCH_FLE_SEQ;
        doSave(param);
    }  
    
  }
  
 function doSave(param){
    var data = _sys.mariaDB.ajax(CTX + '/sys_new/doc_0100/save.ajax', param, 'post');
   
    if (data.INSERT_DOC_CNT > 0 || data.UPDATE_DOC_CNT > 0) {
        alert(_MESSAGE.common.saveSuccess);
        $('#ROW_LIST_COM0401').empty();
		onSearchCom0401();
    }
    else {
        alert(_MESSAGE.common.saveFail);
    }

}

function doUploadCom040102(param, file) {
    var formdata = new FormData();
    formdata.append('file', file);
    var data = _sys.mariaDB.ajaxFile(CTX + '/util/upload/uploadMultipleFiles.ajax', formdata);
    if(data && data.responseData){
        param.FILE_ID = data.responseData.ATCH_FLE_SEQ;
        doSaveCom040102(param);
    }  
    
  }
function doSaveCom040102(param){
    var data = _sys.mariaDB.ajax(CTX + '/sys_new/doc_0100/save.ajax', param, 'post');
   
    if (data.INSERT_DOC_CNT > 0 || data.UPDATE_DOC_CNT > 0) {
        alert(_MESSAGE.common.saveSuccess);
        $('#ROW_LIST_COM040102').empty();
		onSearchCom040102();
    }
    else {
        alert(_MESSAGE.common.saveFail);
    }
}

function doUploadCom040103(param, file) {
    var formdata = new FormData();
    formdata.append('file', file);
    var data = _sys.mariaDB.ajaxFile(CTX + '/util/upload/uploadMultipleFiles.ajax', formdata);
    if(data && data.responseData){
        param.FILE_ID = data.responseData.ATCH_FLE_SEQ;
        doSaveCom040103(param);
    }  
    
  }
function doSaveCom040103(param){
    var data = _sys.mariaDB.ajax(CTX + '/sys_new/doc_0100/save.ajax', param, 'post');
   
    if (data.INSERT_DOC_CNT > 0 || data.UPDATE_DOC_CNT > 0) {
        alert(_MESSAGE.common.saveSuccess);
        $('#ROW_LIST_COM040103').empty();
		onSearchCom040103();
    }
    else {
        alert(_MESSAGE.common.saveFail);
    }
}

function doUploadCom040104(param, file) {
    var formdata = new FormData();
    formdata.append('file', file);
    var data = _sys.mariaDB.ajaxFile(CTX + '/util/upload/uploadMultipleFiles.ajax', formdata);
    if(data && data.responseData){
        param.FILE_ID = data.responseData.ATCH_FLE_SEQ;
        doSaveCom040104(param);
    }  
    
  }
function doSaveCom040104(param){
    var data = _sys.mariaDB.ajax(CTX + '/sys_new/doc_0100/save.ajax', param, 'post');
   
    if (data.INSERT_DOC_CNT > 0 || data.UPDATE_DOC_CNT > 0) {
        alert(_MESSAGE.common.saveSuccess);
        $('#ROW_LIST_COM040104').empty();
		onSearchCom040104();
    }
    else {
        alert(_MESSAGE.common.saveFail);
    }
}

function doUploadCom040105(param, file) {
    var formdata = new FormData();
    formdata.append('file', file);
    var data = _sys.mariaDB.ajaxFile(CTX + '/util/upload/uploadMultipleFiles.ajax', formdata);
    if(data && data.responseData){
        param.FILE_ID = data.responseData.ATCH_FLE_SEQ;
        doSaveCom040105(param);
    }  
    
  }
function doSaveCom040105(param){
    var data = _sys.mariaDB.ajax(CTX + '/sys_new/doc_0100/save.ajax', param, 'post');
   
    if (data.INSERT_DOC_CNT > 0 || data.UPDATE_DOC_CNT > 0) {
        alert(_MESSAGE.common.saveSuccess);
        $('#ROW_LIST_COM040105').empty();
		onSearchCom040105();
    }
    else {
        alert(_MESSAGE.common.saveFail);
    }
}

function doUploadCom040106(param, file) {
    var formdata = new FormData();
    formdata.append('file', file);
    var data = _sys.mariaDB.ajaxFile(CTX + '/util/upload/uploadMultipleFiles.ajax', formdata);
    if(data && data.responseData){
        param.FILE_ID = data.responseData.ATCH_FLE_SEQ;
        doSaveCom040106(param);
    }  
    
  }
function doSaveCom040106(param){
    var data = _sys.mariaDB.ajax(CTX + '/sys_new/doc_0100/save.ajax', param, 'post');
   
    if (data.INSERT_DOC_CNT > 0 || data.UPDATE_DOC_CNT > 0) {
        alert(_MESSAGE.common.saveSuccess);
        $('#ROW_LIST_COM040106').empty();
		onSearchCom040106();
    }
    else {
        alert(_MESSAGE.common.saveFail);
    }
}


function doUploadCom040107(param, file) {
    var formdata = new FormData();
    formdata.append('file', file);
    var data = _sys.mariaDB.ajaxFile(CTX + '/util/upload/uploadMultipleFiles.ajax', formdata);
    if(data && data.responseData){
        param.FILE_ID = data.responseData.ATCH_FLE_SEQ;
        doSaveCom040107(param);
    }  
    
  }
function doSaveCom040107(param){
    var data = _sys.mariaDB.ajax(CTX + '/sys_new/doc_0100/save.ajax', param, 'post');
   
    if (data.INSERT_DOC_CNT > 0 || data.UPDATE_DOC_CNT > 0) {
        alert(_MESSAGE.common.saveSuccess);
        $('#ROW_LIST_COM040107').empty();
		onSearchCom040107();
    }
    else {
        alert(_MESSAGE.common.saveFail);
    }
}










// UPLOAD COM0401
function getFilenameCom0401() {
    var file0401 = $('#file-input0401').prop('files');
    
    if(file0401.length > 0){
		var file = file0401[0];
	    if (file) $("#FILE_ID").val(file.name);
	
	    var formdata = new FormData();
	    formdata.append('file', file);
	
	    saveCom0401(file);
	} 
    
}

function getFilenameCom040102(){
	var file040102 = $('#file-input040102').prop('files');
	if(file040102.length > 0){
		var file = file040102[0];
		if (file) $("#FILE_ID").val(file.name);

	    var formdata = new FormData();
	    formdata.append('file', file);
	
	    saveCom040102(file);
	}
}

function getFilenameCom040103(){
	var file040103 = $('#file-input040103').prop('files');
	if(file040103.length > 0){
		var file = file040103[0];
	    if (file) $("#FILE_ID").val(file.name);
	
	    var formdata = new FormData();
	    formdata.append('file', file);
	
	    saveCom040103(file);
	} 
}

function getFilenameCom040104(){
	var file040104 = $('#file-input040104').prop('files');
	if(file040104.length > 0){
		var file = file040104[0];
	    if (file) $("#FILE_ID").val(file.name);
	
	    var formdata = new FormData();
	    formdata.append('file', file);
	
	    saveCom040104(file);
	} 
}

function getFilenameCom040105(){
	var file040105 = $('#file-input040105').prop('files');
	if(file040105.length > 0){
		var file = file040105[0];
	    if (file) $("#FILE_ID").val(file.name);
	
	    var formdata = new FormData();
	    formdata.append('file', file);
	
	    saveCom040105(file);
	}
}

function getFilenameCom040106(){
	var file040106 = $('#file-input040106').prop('files');
	if(file040106.length > 0){
		var file = file040106[0];
	    if (file) $("#FILE_ID").val(file.name);
	
	    var formdata = new FormData();
	    formdata.append('file', file);
	
	    saveCom040106(file);
	}
}
function getFilenameCom040107(){
	var file040107 = $('#file-input040107').prop('files');
	if(file040107.length > 0){
		var file = file040107[0];
	    if (file) $("#FILE_ID").val(file.name);
	
	    var formdata = new FormData();
	    formdata.append('file', file);
	
	    saveCom040107(file);
	}
}

function catchFileCom0401(){
    var files = $('#file-input0401').prop('files');
    return files[0];
}


function saveCom0401(file) {
    // validation check
	if(!confirm("do you want to save?")) return;
    // 파라미터 생성
    var param = createParameterCom0401(file);

    // 파라미터 변환 (object, array => JSON string)

    
    param = _sys.convertParam(param);
    // 저장

    var flle = catchFileCom0401();
    if(flle){
        doUpload(param, flle);
    }else{
        doSave(param);
    }
}

function createParameterCom0401(file) {
	
    var param = {};
    param.PROCESS = 'INSERT';
    param.DOC_NAME = file.name;
    param.DOC_GROUP = 'DL';
    return param;
}

// uploadcom040102
function catchFileCom040102(){
    var files = $('#file-input040102').prop('files');
    return files[0];
}


function saveCom040102(file) {
    // validation check
	if(!confirm("do you want to save?")) return;
    // 파라미터 생성
    var param = createParameterCom040102(file);

    // 파라미터 변환 (object, array => JSON string)

    
    param = _sys.convertParam(param);
    // 저장

    var flle = catchFileCom040102();
    if(flle){
        doUploadCom040102(param, flle);
    }else{
        doSaveCom040102(param);
    }
}

function createParameterCom040102(file) {
	
    var param = {};
    param.PROCESS = 'INSERT';
    param.DOC_NAME = file.name;
    param.DOC_GROUP = 'AI';
    return param;
}

// uploadcom040103
function catchFileCom040103(){
    var files = $('#file-input040103').prop('files');
    return files[0];
}


function saveCom040103(file) {
    // validation check
	if(!confirm("do you want to save?")) return;
    // 파라미터 생성
    var param = createParameterCom040103(file);

    // 파라미터 변환 (object, array => JSON string)

    
    param = _sys.convertParam(param);
    // 저장

    var flle = catchFileCom040103();
    if(flle){
        doUploadCom040103(param, flle);
    }else{
        doSaveCom040103(param);
    }
}

function createParameterCom040103(file) {
	
    var param = {};
    param.PROCESS = 'INSERT';
    param.DOC_NAME = file.name;
    param.DOC_GROUP = 'DS';
    return param;
}

// uploadcom040104
function catchFileCom040104(){
    var files = $('#file-input040104').prop('files');
    return files[0];
}


function saveCom040104(file) {
    // validation check
	if(!confirm("do you want to save?")) return;
    // 파라미터 생성
    var param = createParameterCom040104(file);

    // 파라미터 변환 (object, array => JSON string)

    
    param = _sys.convertParam(param);
    // 저장

    var flle = catchFileCom040104();
    if(flle){
        doUploadCom040104(param, flle);
    }else{
        doSaveCom040104(param);
    }
}

function createParameterCom040104(file) {
	
    var param = {};
    param.PROCESS = 'INSERT';
    param.DOC_NAME = file.name;
    param.DOC_GROUP = 'DC';
    return param;
}

// uploadcom040105
function catchFileCom040105(){
    var files = $('#file-input040105').prop('files');
    return files[0];
}


function saveCom040105(file) {
    // validation check
	if(!confirm("do you want to save?")) return;
    // 파라미터 생성
    var param = createParameterCom040105(file);

    // 파라미터 변환 (object, array => JSON string)

    
    param = _sys.convertParam(param);
    // 저장

    var flle = catchFileCom040105();
    if(flle){
        doUploadCom040105(param, flle);
    }else{
        doSaveCom040105(param);
    }
}

function createParameterCom040105(file) {
	
    var param = {};
    param.PROCESS = 'INSERT';
    param.DOC_NAME = file.name;
    param.DOC_GROUP = 'DG';
    return param;
}


// uploadcom040106
function catchFileCom040106(){
    var files = $('#file-input040106').prop('files');
    return files[0];
}


function saveCom040106(file) {
    // validation check
	if(!confirm("do you want to save?")) return;
    // 파라미터 생성
    var param = createParameterCom040106(file);

    // 파라미터 변환 (object, array => JSON string)

    
    param = _sys.convertParam(param);
    // 저장

    var flle = catchFileCom040106();
    if(flle){
        doUploadCom040106(param, flle);
    }else{
        doSaveCom040106(param);
    }
}

function createParameterCom040106(file) {
	
    var param = {};
    param.PROCESS = 'INSERT';
    param.DOC_NAME = file.name;
    param.DOC_GROUP = 'OG';
    return param;
}

// uploadcom040107
function catchFileCom040107(){
    var files = $('#file-input040107').prop('files');
    return files[0];
}


function saveCom040107(file) {
    // validation check
	if(!confirm("do you want to save?")) return;
    // 파라미터 생성
    var param = createParameterCom040107(file);

    // 파라미터 변환 (object, array => JSON string)

    
    param = _sys.convertParam(param);
    // 저장

    var flle = catchFileCom040107();
    if(flle){
        doUploadCom040107(param, flle);
    }else{
        doSaveCom040107(param);
    }
}

function createParameterCom040107(file) {
	
    var param = {};
    param.PROCESS = 'INSERT';
    param.DOC_NAME = file.name;
    param.DOC_GROUP = 'RG';
    return param;
}



function doModify(type){
	
	if (!flagModifyCom0401){
		$(".hidden-cus").css("display", "block");
		
		$("#MODIFY_BTN_COM040"+type).css("display", "none");
		$("#MODIFY_BTN_COM040"+type+"_1").css("display", "block");
	}else{
		$(".hidden-cus").css("display", "none");
		$("#MODIFY_BTN_COM040"+type).css("display", "block");
		$("#MODIFY_BTN_COM040"+type+"_1").css("display", "none");
	}
	 
	flagModifyCom0401 = !flagModifyCom0401;
}

function cssDefault(type){
	flagModifyCom0401  = false;
	$(".hidden-cus").css("display", "none");
	$("#MODIFY_BTN_COM040"+type).css("display", "block");
	$("#MODIFY_BTN_COM040"+type+"_1").css("display", "none");
}













