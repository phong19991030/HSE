
function sysDocRegister() {
    var docData = {};
    // 검색 버튼(TURBINE, COMPANY, WORKERS),
    // 추가 버튼(PART, TOOL, PPE) CSS, EVENT 추가


    // UPDATE 일 경우, 수정 페이지 초기화 함수 실행 
    if ($('input#PROCESS').val() === 'UPDATE') {
        modifyInit();
        $("#DELETE_BTN").removeClass("hidden");
        $("#DOWLOAD_FILE").removeClass("hidden");
        $('a#DOWLOAD_FILE').click(dowloadFile);    

    }
    // else {
    // 	$('input#USER_ID').val('');
    // 	$('input#USER_NM').val('');
    // }
    // 저장 버튼 클릭
    $('a#SAVE_BTN').click(save);


    //Select File
    $("#DOC_SELECT_ID").on('click', function () {
        $("#file-input").trigger("click");
    });


    $('span#DELETE_BTN').click(function() {
		// 삭제 여부 컨펌 
		if(!confirm(_MESSAGE.common.deleteConfirm)) return;
		// 삭제 요청
		var result = _sys.mariaDB.getData(CTX +'/sys_new/doc_0001/detailForm/delete.ajax', {
			DOC_ID: $('input#DOC_ID').val()
			
		});
		// 삭제 성공
		if(result.IS_DELETE) {
			alert(_MESSAGE.common.deleteSuccess);
			window.location = CTX + '/sys_new/doc_0001/list';
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

function getFilename() {
    var files = $('#file-input').prop('files');
    var file = files[0];
    if (file) $("#FILE_ID").val(file.name);

    var formdata = new FormData();
    formdata.append('file', file);

    // var data = _sys.mariaDB.ajaxFile(CTX + '/util/upload/uploadMultipleFiles.ajax', formdata,);
    // console.log(data);
}
function catchFile(){
    var files = $('#file-input').prop('files');
    return files[0];

}


function save() {
    // validation check
    if (!validationCheck()) return;

    // 파라미터 생성
    var param = createParameter();

    // 파라미터 변환 (object, array => JSON string)

    
    param = _sys.convertParam(param);
    // 저장 

    var flle = catchFile();
    if(flle){
        doUpload(param, flle);
    }else{
        doSave(param);
    }
}

function dowloadFile(){
    if(docData.FILE_ID)
    window.open(CTX + '/util/upload/downloadFileV2?fileId=' + docData.FILE_ID + '&fileName=' + docData.FLE_NM, '_blank');

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
    var data = _sys.mariaDB.ajax(CTX + '/sys_new/doc_0001/save.ajax', param, 'post');
   
    if (data.INSERT_DOC_CNT > 0 || data.UPDATE_DOC_CNT > 0) {
        alert(_MESSAGE.common.saveSuccess);
        window.location = CTX + '/sys_new/doc_0001/detailForm?DOC_ID=' + data.DOC_ID;
    }
    else {
        alert(_MESSAGE.common.saveFail);
    }

}


/* 유효성 검사 */
function validationCheck() {
    var check = true;
	/* validation-check */
	check = $('[validation-check]').vcCheck();
    return check;
}

/* 파라미터 생성 */
function createParameter() {
    var param = {};
    if ($('input#PROCESS').val() === 'UPDATE') param.DOC_ID = $('input#DOC_ID').val();
    param.PROCESS = $('input#PROCESS').val()
    param.DOC_NAME = $('input#DOC_NAME').val();
    param.DOC_GROUP = $('input#DOC_GROUP').val();
    // param. = $('input#USER_NM').val();
    return param;
}

/* 수정 페이지에서 실행 될 초기화 함수 */
function modifyInit() {
    // 데이터 조회
    var data = _sys.mariaDB.getData(CTX + '/sys_new/doc_0001/detailForm/getDetailInfo.ajax', {
        DOC_ID: $('input#DOC_ID').val(),
    });
    // 데이터 없을 경우 return 
    if (!data) return;
    docData = data;
    $('input#DOC_GROUP').val(data.DOC_GROUP);
    $('input#DOC_NAME').val(data.DOC_NAME);
    $('input#FILE_ID').val(data.FLE_NM);

}
