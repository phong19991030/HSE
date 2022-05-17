/*com0301*/

var com0301Data = [];
var com0302Data = [];
var flagModifyCom0301  = false;

function com0301() {
	onSearch();
	onSearchCom0302();
	$(".hidden-cus").css("display", "none");
	
	$('button#MODIFY_BTN_COM0301').click(function(){
		doModify();
	});	
	
	$('button#MODIFY_BTN_COM0301_1').click(function(){
		doModify();
	});	
	// 검색 폼 토글 버튼 클릭 이벤트 
	
	$('a#COM0301').click(function(){

		document.getElementById("LI_COM0303").classList.remove("current");
		document.getElementById("LI_COM0304").classList.remove("current");
		
		
		document.getElementById("DIV_COM0301").style.display = 'block';
		document.getElementById("DIV_COM0303").style.display = 'none';
		document.getElementById("DIV_COM0304").style.display = 'none';
		
		document.getElementById("LI_COM0301").classList.add("current");
	});
	$('a#COM0303').click(function(){
		document.getElementById("LI_COM0301").classList.remove("current");
		document.getElementById("LI_COM0304").classList.remove("current");
		
		
		document.getElementById("DIV_COM0301").style.display = 'none';
		document.getElementById("DIV_COM0303").style.display = 'block';
		document.getElementById("DIV_COM0304").style.display = 'none';
		
		document.getElementById("LI_COM0303").classList.add("current");
	});
	$('a#COM0304').click(function(){
		document.getElementById("LI_COM0303").classList.remove("current");
		document.getElementById("LI_COM0301").classList.remove("current");
		
		document.getElementById("DIV_COM0301").style.display = 'none';
		document.getElementById("DIV_COM0303").style.display = 'none';
		document.getElementById("DIV_COM0304").style.display = 'block';
		
		document.getElementById("LI_COM0304").classList.add("current");
	});
	
	$("#DOC_SELECT_ID").on('click', function () {
        $("#file-input").trigger("click");
    });
}

function registerCom0301() {
	$("#file-input0301").trigger("click");
}

function registerCom0302() {
	$("#file-input0302").trigger("click");
}

/* 검색 이벤트 */
function onSearch() {
	
		document.getElementById("DIV_COM0301").style.display = 'block';
		document.getElementById("DIV_COM0303").style.display = 'none';
		document.getElementById("DIV_COM0304").style.display = 'none';
		
		document.getElementById("LI_COM0301").classList.add("current");

	var data = _sys.mariaDB.getData(CTX + '/com/com_0301/getData.ajax');
	// row 생성
	makeList(data.LIST);
	
}
function dowloadFile(index){
    var info = com0301Data[index];
    if(info.FILE_ID)
    window.open(CTX + '/util/upload/downloadFileV2?fileId=' + info.FILE_ID + '&fileName=' + info.FLE_NM, '_blank');
    else
    alert("File not exists");
}

function makeList(list) {
    com0301Data = list;
	
    list.forEach(e => {
    	var btnRemoveFile = grant['WRT_YN'] ? '<button class="remove-btn" onclick="deleteFileCom0301('+list.indexOf(e)+')"></button>' : '';
    	var fileSize = e.FLE_SZ ? formatBytes(e.FLE_SZ) : '';
        var html = '<li  onclick="dowloadFile('+list.indexOf(e)+')" style="cursor:pointer">'
        		 + 		'<div class="file-wrap">'
        		 + 			'<span class="file-info"><em class="name">'+e.DOC_NAME+'</em></span>'
        		 + 			'<span class="bottom-info">'
        		 +				'<em class="date">'+e.INS_DATE+'</em>'
        		 +				'<em class="size">'+fileSize+'</em>'
        		 +			'</span>'
        		 +		'</div>'
        		 + 		'<button class="download-btn" onclick="dowloadFile('+list.indexOf(e)+')"></button>'
        		 +		'<div class="hidden-cus">'
        		 + 			btnRemoveFile
        		 +		'</div>'
        		 + '</li>'
        $('#ROW_LIST_COM0301').append(html);
    });
    
    if(grant['WRT_YN']){
    	$('#ROW_LIST_COM0301').append('<li class="add-box hidden-cus" id="REGISTER_BTN_COM0301"><button class="add-btn" onclick="registerCom0301()"></button></li>');
    }
};


/*com0302*/


/* 검색 이벤트 */
function onSearchCom0302() {
	var data = _sys.mariaDB.getData(CTX + '/com/com_0301/getData0302.ajax');
	// row 생성
	makeListCom0302(data.LIST);
	
}

function dowloadFileCom0302(index){
    var info = com0302Data[index];
    if(info.FILE_ID)
    window.open(CTX + '/util/upload/downloadFileV2?fileId=' + info.FILE_ID + '&fileName=' + info.FLE_NM, '_blank');
    else
    alert("File not exists");
}


function makeListCom0302(list) {
    com0302Data = list;
    list.forEach(e => {
    	var btnRemoveFile = grant['WRT_YN'] ? '<button class="remove-btn" onclick="deleteFileCom0302('+list.indexOf(e)+')"></button>' : '';
    	var fileSize = e.FLE_SZ ? formatBytes(e.FLE_SZ) : '';
        var html = '<li onclick="dowloadFileCom0302('+list.indexOf(e)+')" style="cursor:pointer">'
        		 + 		'<div class="file-wrap">'
        		 +			'<span class="file-info"><em class="name">'+e.DOC_NAME+'</em></span>'
        		 +			'<span class="bottom-info">'
        		 +				'<em class="date">'+e.INS_DATE+'</em>'
        		 +				'<em class="size">'+fileSize+'</em>'
        		 +			'</span>'
        		 +		'</div>'
        		 + 		'<button class="download-btn" onclick="dowloadFileCom0302('+list.indexOf(e)+')"></button>'
        		 +		'<div class="hidden-cus">'
        		 + 			btnRemoveFile
        		 +		'</div>'
        		 + '</li>'

        $('#ROW_LIST_COM0302').append(html);
    });
    if(grant['WRT_YN']){
    	$('#ROW_LIST_COM0302').append('<li class="add-box hidden-cus" id="REGISTER_BTN_COM0302"><button class="add-btn" onclick="registerCom0302()"></button></li>');
    }
};

function deleteFileCom0301(index) {
	var info = com0301Data[index];
	if(info.FILE_ID){
	if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			// 삭제 요청
			
			var result = _sys.mariaDB.getData(CTX +'/sys_new/doc_0100/detailForm/delete.ajax', {
				DOC_ID: info.DOC_ID
				
			});
			// 삭제 성공
			if(result.IS_DELETE) {
				alert(_MESSAGE.common.deleteSuccess);
				$('#ROW_LIST_COM0301').empty();
				onSearch();
//				window.location = CTX + '/com/com_0301/list';
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

function deleteFileCom0302(index) {
	var info = com0302Data[index];
	if(info.FILE_ID){
	if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			// 삭제 요청
			
			var result = _sys.mariaDB.getData(CTX +'/sys_new/doc_0100/detailForm/delete.ajax', {
				DOC_ID: info.DOC_ID
				
			});
			// 삭제 성공
			if(result.IS_DELETE) {
				alert(_MESSAGE.common.deleteSuccess);
				$('#ROW_LIST_COM0302').empty();
				onSearchCom0302();
//				window.location = CTX + '/com/com_0301/list';
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

function getFilenameCom0301() {
    var files = $('#file-input0301').prop('files');
    var file = files[0];
    if (file) $("#FILE_ID").val(file.name);

    var formdata = new FormData();
    formdata.append('file', file);

    // var data = _sys.mariaDB.ajaxFile(CTX + '/util/upload/uploadMultipleFiles.ajax', formdata,);
    // console.log(data);
    saveCom0301(file);
}

function catchFileCom0301(){
    var files = $('#file-input0301').prop('files');
    return files[0];
}


function saveCom0301(file) {
    // validation check
	if(!confirm("do you want to save?")) return;
    // 파라미터 생성
    var param = createParameterCom0301(file);

    // 파라미터 변환 (object, array => JSON string)

    
    param = _sys.convertParam(param);
    // 저장 

    var flle = catchFileCom0301();
    if(flle){
        doUpload(param, flle);
    }else{
        doSave(param);
    }
    
    $('#ROW_LIST_COM0301').empty();
	onSearch();
}

function createParameterCom0301(file) {
	
    var param = {};
    param.PROCESS = 'INSERT';
    param.DOC_NAME = file.name;
    param.DOC_GROUP = 'LHSP';
    return param;
}


function getFilenameCom0302() {
    var files = $('#file-input0302').prop('files');
    var file = files[0];
    if (file) $("#FILE_ID").val(file.name);

    var formdata = new FormData();
    formdata.append('file', file);

    saveCom0302(file);
}

function catchFileCom0302(){
    var files = $('#file-input0302').prop('files');
    return files[0];
}


function saveCom0302(file) {
    // validation check
	if(!confirm("do you want to save?")) return;
    // 파라미터 생성
    var param = createParameterCom0302(file);

    // 파라미터 변환 (object, array => JSON string)

    
    param = _sys.convertParam(param);
    // 저장 

    var flle = catchFileCom0302();
    if(flle){
        doUpload(param, flle);
    }else{
        doSave(param);
    }
    
    $('#ROW_LIST_COM0302').empty();
	onSearchCom0302();
}

function createParameterCom0302(file) {
	
    var param = {};
    param.PROCESS = 'INSERT';
    param.DOC_NAME = file.name;
    param.DOC_GROUP = 'CQB';
    return param;
}



function doUpload(param, file) {
	debugger
    var formdata = new FormData();
    formdata.append('file', file);
    var data = _sys.mariaDB.ajaxFile(CTX + '/util/upload/uploadMultipleFiles.ajax', formdata);
    if(data && data.responseData){
        param.FILE_ID = data.responseData.ATCH_FLE_SEQ;
        doSave(param);
    }  
    
  }
  
 function doSave(param){
	 debugger
    var data = _sys.mariaDB.ajax(CTX + '/sys_new/doc_0100/save.ajax', param, 'post');
   
    if (data.INSERT_DOC_CNT > 0 || data.UPDATE_DOC_CNT > 0) {
        alert(_MESSAGE.common.saveSuccess);
//        window.location = CTX + '/com/com_0301/list';
    }
    else {
        alert(_MESSAGE.common.saveFail);
    }

}

 function doModify(){
	 if (!flagModifyCom0301){
		 $(".hidden-cus").css("display", "block");
		 
		 $("#MODIFY_BTN_COM0301").css("display", "none");
		 $("#MODIFY_BTN_COM0301_1").css("display", "block");
	 }else{
		 $(".hidden-cus").css("display", "none");
		 $("#MODIFY_BTN_COM0301").css("display", "block");
		 $("#MODIFY_BTN_COM0301_1").css("display", "none");
	 }
	 
	 flagModifyCom0301 = !flagModifyCom0301;
 }

