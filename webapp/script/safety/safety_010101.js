/*초기화*/


function safety_010101(){
	// var CRUD = document.getElementById("CRUD").innerText;
	// if(CRUD == 'U') {
	// 	//modifyInit();
	// 	var html = document.getElementById("subTittleModify").innerText;
	// 	$('#TITLE').append(html);
	// } else {
	// 	var html = document.getElementById("subTittleRegister").innerText;
	// 	$('#TITLE').text(html);
	// 	$('span#ACCIDENT_NAME').text(USER_NM);
	// }
	// //저장버튼 클릭
    // var html = 
    // '<div class="">'
    // +'<input type="text" id="id_emp_str_uid_key_employee" validation-check="required" name="EMPLOYEE" value="${DATA.EMPLOYEE}" hidden="true"/>'
    // +'</div>'
    // +'<jsp:include page="../common/select_emp_btn.jsp">'
    // +	'<jsp:param name="key" value="key_employee" />'
    // +	'<jsp:param name="CRUD" value="${DATA.CRUD}" />'
    // +	'<jsp:param name="strEmpId" value="${DATA.EMPLOYEE}" />'
    // +	'<jsp:param name="isOne" value="true" />'
    // +	'<jsp:param name="isInPopup" value="true" />'
    // +'</jsp:include>';

    // $('#popup-select-emp').append(html);

	$('.table-remove-btn').click(removeRow);
	$('.row-add-btn').click(function(){
        makeRowFormRegister('add-row');
    });
    $('#SAVE_BTN').click(save);
    
}

function makeOptionTypeSelect(toolType,ppeId){
    var t1 = toolType.substring(1,toolType.length-1);
    t1 = t1.split('},');
    // console.log(t1);
    var sample = '';
    var list = [];
    t1.forEach(element => {
        var e = element.trim();
        e = e.substring(1,e.length);
        e = e.split(',');
        var item ={};
        e.forEach(i =>{
            var flag = i.split("=");
            item[flag[0].trim()] = flag[1];
        })
        list.push(item);
    });

    console.log(list);
    for (const element of list){
        if(ppeId!==null && ppeId.toString() === element.PPE_ID){
            sample += '<option value="'+ element.PPE_ID +'" selected>'+ element.SUBJECT +'</option>';
        }else{
            sample += '<option value="'+ element.PPE_ID +'">'+ element.SUBJECT +'</option>';
        }
    }
    // sample += '<option value="'+ element.SUBJECT +'">'+ element.SUBJECT +'</option>';
    return sample;
}   

function makeOptionStatusSelect(statusType,statusId){
    var sample = '';
    var t1 = statusType.substring(1,statusType.length-1);
    t1 = t1.split('},');
    // console.log(t1);
    var sample = '';
    var list = [];
    t1.forEach(element => {
        var e = element.trim();
        e = e.substring(1,e.length);
        e = e.split(',');
        var item ={};
        e.forEach(i =>{
            var flag = i.split("=");
            item[flag[0].trim()] = flag[1];
        })
        list.push(item);
    });

    // console.log(list);
    for (const element of list){
        if(statusId!==null && statusId === element.COMM_CD){
            sample += '<option value="'+ element.COMM_CD +'" selected>'+ element.COMM_NM +'</option>';
        }else{
            sample += '<option value="'+ element.COMM_CD +'">'+ element.COMM_NM +'</option>';
        }
    }
    return sample;
}

function removeRow(){

    console.log(this)
	var id = this.id;
	var tb = $("#" + id + "").parent().parent().parent().parent();
	// var tr2 = $("#" + id + "").parent().parent().next();
	// var tr3 = $("#" + id + "").parent().parent().next().next();
	console.log(id);
	console.log(tb);
	// console.log(tr2);
	// console.log(tr3);
	tb.remove();
    var s = 1;
    $("#list-item table").each(function (tb){
        var stt = $(this).find('th.stt');
        console.log(stt);
        stt.html(s++);
    })

}



function save() {
	// validation check
    debugger;
    var CRUD = $('input#CRUD').val();
    var param = createParameter(CRUD);
    console.log(param);
    
    if(CRUD === 'C' && param.PPE_LIST.length === 2){
        alert("Need create object");
        return false;
    }
	if(!validationCheck()) {
        console.log("check")
		return false;
	}

		
	// 파라미터 생성
    
	param = _sys.convertParam(param);
    debugger
    var data = _sys.mariaDB.ajax(CTX + '/sft/sft_0101/saveManual.ajax', param, 'post');
	console.log(data);
	if(data.RESULT_SAVE > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/sft/sft_0101/list';
	}
	// Exception 발생
	else if(data.EXCEPTION){
		if(data.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
	}
	// 삭제 실패
	else {
		alert(_MESSAGE.common.saveFail);
        window.location = CTX + '/sft/sft_0101/list';
	}
}

/* 유효성 검사 */
function validationCheck(root='') {
	var check = true;
	/* validation-check */
	check = $(root + ' [validation-check]').vcCheck();
	
	return check; 
}

// /* 파라미터 생성 */
function createParameter(CRUD) {

    var param ={};
    param.CRUD = CRUD;
	param.EMP_NO = $('input#id_emp_str_uid_key_employee').val();
    param.PPE_LIST=[];
    if(CRUD === 'U'){
         param.LIST_PPE_ID_REMOVE = LIST_PPE_ID_REMOVE;
         param.LIST_PPE_ID_REMOVE = JSON.stringify(param.LIST_PPE_ID_REMOVE);
         param.PPE_LIST_INSERT=[];
    }

    $("#list-item table").each(function (tb){
        var item = {};
       
        item.PPE_ID = $(this).find('.ppe_id').val();
        item.BRAND = $(this).find('.brand').val();
        item.MODEL = $(this).find('.model').val();
        item.STATUS = $(this).find('.status').val();
        item.GRANT_DATE = $(this).find('.grant_date').val() ? $(this).find('.grant_date').val() : null;
        item.RENEW_DATE = $(this).find('.renew_date').val() ? $(this).find('.renew_date').val() : null;
        item.EMP_NO = param.EMP_NO;

        if($(this).find('.check_renew').is(":checked")){
            item.CHECK_RENEW = true;
        }else{
            item.CHECK_RENEW = false;
        }
        
        if(CRUD === 'U'){
            if($(this).find('.emp_ppe_id').val()){
                item.EMP_PPE_ID = $(this).find('.emp_ppe_id').val();
                param.PPE_LIST.push(item);
            }else{
                param.PPE_LIST_INSERT.push(item);
            }
        }else{
            param.PPE_LIST.push(item);
        }

        console.log(item); 
    })
    console.log(param.PPE_LIST); 
    param.PPE_LIST = JSON.stringify(param.PPE_LIST);
    if(CRUD === 'U'){
        param.PPE_LIST_INSERT = JSON.stringify(param.PPE_LIST_INSERT);
   }
    console.log(param);

	
	return param;
}







