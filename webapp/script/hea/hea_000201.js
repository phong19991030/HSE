
function hea_000201() {
	$('button#BTN_POPUP_EMP').css('cursor', 'pointer').click(openPopupApprover);
	$("#BTN_SELECT_FILE").on('click', function () {
		$("#file-input").trigger("click");
	});
  if($('input#PROCESS').val() == 'UPDATE') {
    modifyInit();
	}else{
    regisInit();
  }
  
	$('button#BTN_SAVE').click(saveEmpHea);
	$('button#BTN_CANCEL').click(cancel);
	
  user_list = _sys.mariaDB.getData(CTX + '/common/getEmpMgtList.ajax', {});
  setDuty($('input#id_emp_str_uid_key_emp_no').val());
  $('input#id_emp_str_uid_key_emp_no').change(function (e) { 
    e.preventDefault();
    setDuty($('input#id_emp_str_uid_key_emp_no').val());
  });
}

function cancel(){
	window.location = CTX + '/hea/hea_0002/list';
}

var user_list =[];
function setDuty(uid){
  if(user_list.length>0 && uid!=""){
    let indexUser = user_list.findIndex(user => user.EMP_NO == uid);
    $('input#DUTY_CD').val(user_list[indexUser].DUTY_NAME);
  }
}

// form submit
function saveEmpHea() {
  // validation check
  var check = $('[validation-check]').vcCheck();
  if (!check) {
    return false;
  }

	var params = createParameter();
		
	params = _sys.convertParam(params);
  var strHealthFiles = uploadRetirementFiles();
  params.healthFileIds = strHealthFiles;  
  
  var data = _sys.mariaDB.ajax(CTX + '/hea/hea_0002/save.ajax', params, 'post');
		
	if(data.RESULT_SAVE > 0 || data.RESULT_SAVE > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/hea/hea_0002/list';
	} 
	else {
		alert(_MESSAGE.common.saveFail);
	}

	// var file = catchFile();
	// if(file){
	//        doUpload(params, file);
	// }else{
	//     doSave(params)
	// }		
		
} // form submit end

function openPopupApprover(){
	
	$('#SELECTED_APPROVAL_VIEW').html('');
	$('div#layer-popup-approver').attr('class', 'layer-popup active');
	$('button#BTN_SAVE_POPUP_APPROVER').css('cursor', 'pointer').click(savePopupApprover);
	$('button#POPUP_SEARCH_EMP_BTN').css('cursor', 'pointer').click(onSearch);
	$('input#POPUP_SEARCH_ALL').keypress(function(e){
		if(e.keyCode === 13){
			onSearch();
		}
	});
	
	onSearch();
}

function onSearch(){

	$('tbody#EMP_ROW_LIST').html('');
	
	var param = {};
	param.SEARCH_ALL = $('input#POPUP_SEARCH_ALL').val();
	
	// 검색
	var data = _sys.mariaDB.getData(CTX + '/com/com_0102/getUserList.ajax', param);
	
	// row 생성
	makeList(data.LIST);
}

function makeList(list) {
	
	list.forEach((e) => {
		// row 생성 
		var sample = ''
			+ '<tr id="TR_EMP_' + e.EMP_NO + '">'
			+ '		<td>'
			+ '			<span class="checkbox-radio-group">'
			+ '				<label><input type="checkbox" name="checkbox" id= "EMP_CHECK_BOX_'+ e.EMP_NO + '"></label>'
			+ '			</span>'
			+ '		</td>'
			+ '		<td>' + e.COMPANY_NAME + '</td>'
			+ '		<td>' + e.EMP_NAME + '</td>'
			+ '		<td>' + e.COMM_NM + '</td>'
			+ '</tr>';
		
		sample = $(sample).css('cursor', 'pointer').click(function(event) {
			if(event.target.tagName === 'TD' || event.target.tagName === 'EM' || event.target.tagName === 'SPAN') {
				var info = $(this).prop('info');
				var tmp = '#EMP_CHECK_BOX_' + e.EMP_NO;
				
				if (!$(tmp).is(':checked')){
					$(tmp).prop('checked', true);
					addRow2(e);
				}else{
					$(tmp).prop('checked', false);
					var tmp2 = '#LI_SELECTED_' + info.EMP_NO;
					$(tmp2).remove();
				}
			}
			
		});
		
		// 프로퍼티 추가 
		$(sample).prop('info', e);
		
		// row 추가 
		$('tbody#EMP_ROW_LIST').append(sample);
	
		
	});
	
	// 데이터 0개 일 경우 
	if(list.length === 0) $('tbody#ROW_LIST').append('<tr><td colspan="5" class="NO_DATA">No Data</td><tr>');
};

function addRow2(data){
	
	var sample = ''
		+ '<li id="LI_SELECTED_' + data.EMP_NO + '">'
		+ '		<div class="custom info">'
		+ '			<span class="team">' + data.COMPANY_NAME + '</span>'
		+ '			<span class="name">' + data.EMP_NAME + '<em class="position">' + data.COMM_NM + '</em></span>'
		+ '			<button class="remove-btn" id="BTN_REMOVE_EMP"></button>'
		+ '		</div>'
		+ '		<div class="custom select-group">'
		+ '			<select title="결재">'
		+ '				<option>전체</option>'
		+ '				<option>전체</option>'
		+ '				<option>전체</option>'
		+ '				<option>전체</option>'
		+ '				<option>전체</option>'
		+ '			</select>'
		+ '		</div>'
		+ '		<div class="custom">'
		+ '			<button class="drag-btn"><i class="las la-expand-arrows-alt"></i></button>'
		+ '		</div>'
		+ '</li>';
		
	sample = $(sample).css('cursor','pointer').click(function(event) {
		
	});
	
	// 프로퍼티 추가 
	$(sample).prop('info', data);
		
	// row 추가 
	$('#SELECTED_APPROVAL_VIEW').append(sample);
	
	$(sample).find('button#BTN_REMOVE_EMP').click(function(event) {
		var tmp1 = '#EMP_CHECK_BOX_' + data.EMP_NO;
		var tmp2 = '#LI_SELECTED_' + data.EMP_NO;
		if ($(tmp1).is(':checked')){
			$(tmp1).prop('checked', false);
		}
		$(tmp2).remove();
	});
}

function savePopupApprover(){
	var param = {};
	param.EMP_LIST = $('ul#SELECTED_APPROVAL_VIEW li').toArray().reduce((acc, e) => {
		var info = $(e).prop('info');
		acc.push(info);
		return acc;
	}, []);
	if (param.EMP_LIST.length > 0){
		$('#APPROVER_VIEW').html('');		
		var sample = _com_elements.com_01021.approver.view();
		$('#APPROVER_VIEW').append(sample);
		param.EMP_LIST.forEach(e => {
			var sample2 = _com_elements.com_01021.approver.view_line(e);
			$('#APPROVAL_VIEW_LINE').append(sample2);
		});

		$('div#layer-popup-approver').attr('class', 'layer-popup');
	}
	
}

function getFilename() {

	var files = $('#file-input').prop('files');
	var file = files[0];
	if (file) $("#FILE_ID").val(file.name);

}

function catchFile(){
	var files = $('#file-input').prop('files');
	return files[0];
}


function saveFile() {
    // validation check
    if (!validationCheck()) return;

    // 파라미터 생성
    var param = createParameter();

    // 파라미터 변환 (object, array => JSON string)

    param = _sys.convertParam(param);
    // 저장 

    var file = catchFile();
    if(file){
        doUpload(param, file);
    }else{
        doSave(param);
    }
}

function doUpload(params,file) {
	var formdata = new FormData();
	formdata.append('file', file);
	var data = _sys.mariaDB.ajaxFile(CTX + '/util/upload/uploadMultipleFiles.ajax', formdata);
	if(data && data.responseData){
		params.HEALTH_CHECK_FILE = data.responseData.ATCH_FLE_SEQ;
	    doSave(params);
	}   
	    
}
  

function doSave(params){
	var data = _sys.mariaDB.ajax(CTX + '/hea/hea_0002/save.ajax', params, 'post');
		
	if(data.INSERT_HEALTH > 0 || data.UPDATE_HEALTH > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/hea/hea_0002/list';
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

function createParameter() {
	var param = {};
		
	if ($('input#PROCESS').val() === 'UPDATE') param.HEALTH_CHECK_FILE  = $('input#HEALTH_CHECK_FILE').val();
	param.PROCESS = $('input#PROCESS').val();
	param.EMP_HEALTH_ID = $('input#EMP_HEALTH_ID').val();
	param.EMP_NO = $('input#id_emp_str_uid_key_emp_no').val();
	param.EMP_NAME = $('input#EMP_NAME').val();
	param.DUTY_CD = $('input#DUTY_CD').val();
	param.HEIGHT = $('input#HEIGHT').val();
	param.WEIGHT = $('input#WEIGHT').val();
	param.LEFT_EYE = $('input#LEFT_EYE').val();
	param.RIGHT_EYE = $('input#RIGHT_EYE').val();
	param.SBP  = $('input#SBP').val();
	param.DBP  = $('input#DBP').val();
	
	//param.HEALTH_CHECK_CERT_DATE  = $('input#HEALTH_CHECK_CERT_DATE').val();	
	param.DISEASES = getStringJson();
		
	return param;
}

function modifyInit() {
	// debugger;
	// var data = _sys.mariaDB.getData(CTX + '/hea/hea_0002/detailForm/getDetailInfo.ajax', {
	// 	EMP_HEALTH_ID: $('input#EMP_HEALTH_ID').val(),
	// });
 	
	// if(!data) return;
	// $('input#EMP_NAME').val(data.EMP_NAME);
	// $('input#DUTY_CD').val(data.DUTY_CD);
	// $('input#HEIGHT').val(data.HEIGHT);
	// $('input#WEIGHT').val(data.WEIGHT);
	// $('input#LEFT_EYE').val(data.LEFT_EYE);
	// $('input#RIGHT_EYE').val(data.RIGHT_EYE);
	// $('input#SBP').val(data.SBP);
	// $('input#DBP').val(data.DBP);
	// $('textarea#DISEASES').val(data.DISEASES);
	// //$('input#HEALTH_CHECK_CERT_DATE').val(data.HEALTH_CHECK_CERT_DATE);
	// $("#FILE_ID").val(data.FLE_NM);
	// $('input#HEALTH_CHECK_FILE').val(data.HEALTH_CHECK_FILE);
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


function deleteToolFileWithId(inp){
  //	delete phy store
    if(!confirm(_MESSAGE.common.deleteConfirm)) return;
    var tmpInfoFile = inp.getAttribute("tmpFileId");
    var FILE_ID = inp.getAttribute("tmpFileId");
    var FILE_NM = inp.getAttribute("tmpFileNm");
    var EMP_HEALTH_ID = inp.getAttribute("tmpEduFileId");
    var FLE_PATH = inp.getAttribute("tmpFilePath");
    
    var param = {};
    param.FILE_ID = FILE_ID; 
    param.FILE_NM = FILE_NM;
    param.EMP_HEALTH_ID = EMP_HEALTH_ID;
    param.FLE_PATH = FLE_PATH;
    
    var data = _sys.mariaDB.ajax(CTX + '/hea/hea_0002/deleteHealthFile.ajax', param, 'post');
    
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


var rowDiseaseIdx = 1;
function newRow(){  //type exp-degree
  var info ={};
  info.idx = rowDiseaseIdx++;
  info.name="_disease"+"-"+info.idx;

  var sample = 
  `<tr id="tr_disease-${info.idx}">`
+`  <td id="idx_disease-${info.idx}">${info.idx}</td>`
+`  <td>`
+`    <div class="register-write w100p">`
+`      <div class="input-group">`
+`        <input id="content_disease-${info.idx}" type="text" title="내용입력" placeholder="내용을 입력해주세요">`
+`      </div>`
+`    </div>`
+`  </td>`
+`  <td>`
+`    <span class="checkbox-radio-group">`
+`      <label for="radio_disease-${info.idx}1" class="radio">`
+`        <input value="Y" type="radio" name="radio_disease-${info.idx}" id="radio_disease-${info.idx}1" checked>`
+`        <span class="circle"></span>`
+`        <em>Y</em>`
+`      </label>`
+`    </span>`
+`    <span class="checkbox-radio-group">`
+`      <label for="radio_disease-${info.idx}2" class="radio">`
+`        <input value="N" type="radio" name="radio_disease-${info.idx}" id="radio_disease-${info.idx}2">`
+`        <span class="circle"></span>`
+`        <em>N</em>`
+`      </label>`
+`    </span>`
+`  </td>`
+`  <td>`
+`    <div class="calendar-picker">`
+`      <div class="input-group">`
+`        <label class="sr-only">날짜설정</label>`
+`        <input id="startDate_disease-${info.idx}" type="text" title="날짜설정" placeholder="YYYY-MM-DD" class="datepicker">`
+`        <button class="calendar-picker-btn"></button>`
+`      </div>`
+`    </div>`
+`    <span class="hyphen">~</span>`
+`    <div class="calendar-picker">`
+`      <div class="input-group">`
+`        <label class="sr-only">날짜설정</label>`
+`        <input id="endDate_disease-${info.idx}" type="text" title="날짜설정" placeholder="YYYY-MM-DD" class="datepicker">`
+`        <button class="calendar-picker-btn"></button>`
+`      </div>`
+`    </div>`
+`  </td>`
+`  <td>`
+`    <div class="flexWrap">`
+`      <button id="btnRem_disease-${info.idx}" name="_disease-${info.idx}" onclick="removeRowFunc(this);" class="common-btn motion remove-btn" title="삭제"></button>`
+`      <button id="btnAdd_disease-${info.idx}" name="_disease-${info.idx}" onclick="addRowFunc(this);" class="common-btn motion add-btn" title="추가"></button>`
+`    </div>`
+`  </td>`
+`</tr>`;

  // sample = $(sample).css('cursor', 'pointer').click(function(event) {
  // });
  sample = $($.parseHTML(sample));
  $(sample).prop('info', info);
  return sample;
}

function removeRowFunc(inp){
  var length=0;
  var isAddElement = false;
  var name = $(inp).prop("name");
  var selector = "tbody#DISEASE_ROWS";
  length = $(selector + " tr").length;
  //1 element handle
  // if(length==1){
  //   rowExpIdx = 1;
  //   $('tbody#EXP_ROWS').html('');
  //   var sample = newRow('exp');
  //   var info = $(sample).prop("info");
  //   $('tbody#EXP_ROWS').append(sample);
  //   $('button#btnRem'+info.name).remove();
  //   return;
  // }
  isAddElement = $('button#btnAdd'+name).length==1;

  $('tr#tr'+name).remove();
  if(isAddElement){
    var info ={};
    info = $(selector + " tr").last().prop("info");

    var content = `<button id="btnAdd${info.name}" name="${info.name}" onclick="addRowFunc(this);" class="common-btn motion add-btn" title="추가"></button>`;
    $('button#btnRem'+info.name).after(content);
    if(length ==2) $('button#btnRem'+info.name).remove();
  }else if(length == 2){
    var info ={};
    info = $(selector + " tr").last().prop("info");
    if(length ==2)$('button#btnRem'+info.name).remove();
  }

  var index = 1;
  $(selector + " tr").each(function (i){
    var info =$(this).prop('info');
    $("td#idx"+info.name).html(index++);
  });

  $('.datepicker').datepicker();
  $('.calendar-picker').click(function() {
     $(this).find(".datepicker").datepicker('show');
  });
}

function addRowFunc(inp){
  var selector = "tbody#DISEASE_ROWS";
  var name = $(inp).prop("name");

  //1 element handle
  var length=0;
  length = $(selector + " tr").length;
  var name = $(inp).prop("name");

  if(length==1){
    var content = `<button id="btnRem${name}" name="${name}" onclick="removeRowFunc(this);" class="common-btn motion remove-btn" title="삭제"></button>`
    $(inp).after(content);
  }
  $(selector).append(newRow());
  $(inp).remove();
  var index = 1;

  $(selector + " tr").each(function (i){
    var info =$(this).prop('info');
    $("td#idx"+info.name).html(index++);
  });
  
  $('.datepicker').datepicker();
  $('.calendar-picker').click(function() {
     $(this).find(".datepicker").datepicker('show');
  });
}

function regisInit(){
  $('tbody#DISEASE_ROWS').html('');
  var sample = newRow();
  var info = $(sample).prop("info");
  $('tbody#DISEASE_ROWS').append(sample);
  $('button#btnRem'+info.name).remove();
  $('.datepicker').datepicker();
  $('.calendar-picker').click(function() {
     $(this).find(".datepicker").datepicker('show');
  });
}

function getStringJson(){
  var list =[];
  var arrResult =[];
  list = $('tbody#DISEASE_ROWS tr');


  list.each(function (index, element) {
    var info = $(this).prop('info');
    var obj ={};
    obj.content = $('input#content'+info.name).val().trim();
    obj.startDate = $('input#startDate'+info.name).val();
    obj.endDate = $('input#endDate'+info.name).val();
    obj.radio = $("input[type='radio'][name='radio"+info.name+"']:checked").val();
    if(obj.content !="" && obj.startDate !="" && obj.endDate !="" && obj.radio !="")
    arrResult.push(obj);
  });

  return JSON.stringify(arrResult);
}

function initDisease(stringJson) {
  var obj = JSON.parse(stringJson)
  var selector ="";
  selector = "tbody#DISEASE_ROWS";
  $(selector).html('');

  if(obj.length==1){
    var sample = newRow();
    var info = $(sample).prop("info");
    $(selector).append(sample);
    $('button#btnRem'+info.name).remove();
    $('input#content'+info.name).val(obj[0].content);
    $("input[type='radio'][name='radio"+info.name+"'][value='"+obj[0].radio+"']").prop("checked", true);
    $('input#startDate'+info.name).val(obj[0].startDate);
    $('input#endDate'+info.name).val(obj[0].endDate);
  }

  if(obj.length>1){
    var sample = newRow();
    var info = $(sample).prop("info");
    $(selector).append(sample);
    $('button#btnAdd'+info.name).remove();
    $('input#content'+info.name).val(obj[0].content);
    $("input[type='radio'][name='radio"+info.name+"'][value='"+obj[0].radio+"']").prop("checked", true);
    $('input#startDate'+info.name).val(obj[0].startDate);
    $('input#endDate'+info.name).val(obj[0].endDate);
  }

  if(obj.length>1){
    for(let i = 1;i<obj.length;i++){
      var sample = newRow();
      var info = $(sample).prop("info");
      $(selector).append(sample);
      if(i<obj.length-1){
        $('button#btnAdd'+info.name).remove();
      }
      //$('button#btnRem'+info.name).remove();
      $('input#content'+info.name).val(obj[i].content);
      $("input[type='radio'][name='radio"+info.name+"'][value='"+obj[i].radio+"']").prop("checked", true);
      $('input#startDate'+info.name).val(obj[i].startDate);
      $('input#endDate'+info.name).val(obj[i].endDate);
    }
  }

  if(obj.length==0){
    var sample = newRow();
    var info = $(sample).prop("info");
    $(selector).append(sample);
    $('button#btnRem'+info.name).remove();
  }

  $('.datepicker').datepicker();
  $('.calendar-picker').click(function() {
     $(this).find(".datepicker").datepicker('show');
  });
}