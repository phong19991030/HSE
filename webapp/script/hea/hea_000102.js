function hea_000102() {
	$('button#BTN_POPUP_EMP').css('cursor', 'pointer').click(openPopupApprover);
	$('button#BTN_POPUP_SAFE').css('cursor', 'pointer').click(openPopupSafe);
	
  $("input#CHECK").change(function() {
    if(this.checked) {
      $('input#CERT_DATE').prop('disabled',true);
      $('input#RENEWAL_CERT_DATE').prop('disabled',true);
      $('input#CERT_DATE').val('');
      $('input#RENEWAL_CERT_DATE').val('');
      $('input#CERT_DATE').attr('validation-check','');
      $('input#RENEWAL_CERT_DATE').attr('validation-check','');
    }else{
      $('input#CERT_DATE').prop('disabled',false);
      $('input#RENEWAL_CERT_DATE').prop('disabled',false);
      $('input#CERT_DATE').attr('validation-check','required');
      $('input#RENEWAL_CERT_DATE').attr('validation-check','required');
    }
  });

	// UPDATE 일 경우, 수정 페이지 초기화 함수 실행 
	if($('input#PROCESS').val() === 'UPDATE') 
    {
      modifyInit();
    }else{
      regisInit();
    };
	$('button#SAVE_BTN').click(saveEmp);
	$('button#CANCEL_BTN').click(cancel);
	
	$('button#COMPANY_SEARCH_BTN').css('cursor', 'pointer').click(openPopupCompany);
}

function openPopupCompany(){
	var content = _sys_elements.sys_0301.popup.company_content({
		TITLE: 'Select a Organization',
		TYPE: 'COMPANY',
	});
	$('div#layerPopupCompany').html('').html(content);
	// row 생성 
	createSearchPopupRow();
	
	var scroll_target = '.base_grid_table';
	
	$("#layerPopupCompany " + scroll_target).mCustomScrollbar({
		axis: "Y",
		theme: "minimal-dark",
		mouseWheelPixels: 300
	});
	// 팝업 검색창 입력 이벤트 
	$('input#popup_search').keyup(function(e) {
		if(e.keyCode === 13) {
			var param = {SEARCH_ALL: $(this).val()};
			createSearchPopupRow(param);
		}
	});
	// 팝업 검색창 새로고침 버튼 이벤트 
	$('a#popup_search_refresh').css('cursor', 'pointer').click(function() {
		$('input#popup_search').val('');
		var param = {};
		createSearchPopupRow(param);
	});
	
	$('#popup_search_refresh').css('cursor', 'pointer').click(function() {
		$('input#popup_search').val('');
		var param = {};
		createSearchPopupRow(param);
	});
	// 전체 체크박스 이벤트 
	$('#layerPopup #all_check').click(function() {
		var check = true;  
		if(!$(this).is('input:checked')) check = false;
		$(this).prop('checked', check);
		$('tbody#popup_list').find('input[type=checkbox], input[type=radio]').prop('checked', check);
	});
	
	
	// 팝업 닫기 버튼 이벤트
	$('#popup_close').click(function(){
		closeCompPopup('close');
	});
	
	// 팝업 등록 버튼 이벤트
	$('#popup_register').click(closeCompPopup);
	
	// 팝업창 활성화 
	$('div#layerPopupCompany').addClass('active');
}

function closeCompPopup(action) {
	// 등록, 닫기 여부 체크  
	
	// type 체크 
	if(action === 'close'){
		$('div#layerPopupCompany').removeClass('active');
	}else{
		var type = $(this).parents('div.layer-cont').attr('popup-type');
	
		// 체크 리스트 조회
		var check_list = $('tbody#popup_list input[type="radio"]:checked, tbody#popup_list input[type="checkbox"]:checked');
		// 체크 항목 없을 경우 
		if(!check_list.length) return;
		// 체크 항목 정보 가져오기  
		var info_list = check_list.toArray().map((e) => $(e).parents('tr').prop('info'));
		
		// input value, property 세팅
		$('input#COMPANY').val(info_list[0].COMPANY_NAME);
		$('input#COMPANY').prop('info', info_list[0]);
		$('div#layerPopupCompany').removeClass('active');
	}
		
	// popup 내용 삭제, 비활성화 
	
}


function createSearchPopupRow(param={}){
	$('tbody#popup_list').html('');
	
	var data = _sys.mariaDB.getData(CTX + '/hea/hea_0001/popupData/COMPANY.ajax', param);
	
	data.forEach((e) => {
		// row 생성
		var row;
		// row 생성
		row = _sys_elements.sys_0301.popup.tr_company_row({
			ID: e.COMPANY_ID,
			COMPANY_NM: e.COMPANY_NAME,
			LOGO_PATH: CTX + '/imageView' + e.FLE_PATH + '/' + e.NEW_FLE_NM,
			// CLS: e.CLS,
		});
		
		// 프로퍼티 추가 
		row = $(row).prop('info', e);
		// css, 이벤트 추가 : 팝업 리스트 tr(row) 클릭 이벤트 : tr 클릭 시 checkbox, radio on/off
		row = $(row).css('cursor', 'pointer').click(_sys.clickRowCheckOnOff);

		// 삽입
		$('tbody#popup_list').append(row);
	});
}

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
				console.log($(tmp).is(':checked'));
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

function openPopupSafe(){
	$('div#layer-popup-safe').attr('class', 'layer-popup active');
}

function savePopupSafe(){
	
}


function createParameter() {
	var param = {};
	
	param.PROCESS = $('input#PROCESS').val();
	param.EMP_NO = $('input#EMP_NO').val();
	param.EMP_NAME = $('input#EMP_NAME').val();
	param.DUTY_CD = $('#DUTY_CD').val();
	param.POSITION_CD = $('#POSITION_CD').val();
	param.COMPANY_ID = $('input#COMPANY').prop('info') ? $('input#COMPANY').prop('info').COMPANY_ID : '';
	param.AREA_CD = $('input#AREA_CD').val();
	param.EXPR = $('input#EXPR').val();
	param.MAIN_EXPR = $('textarea#MAIN_EXPR').val();
	param.MAIN_DEGREE = $('textarea#MAIN_DEGREE').val();
	param.SAFE_COURSE_CERT = $('input#SAFE_COURSE_CERT').val();
	param.CERT_DATE  = ($('input#CERT_DATE').val()=='')?"0000-00-00":$('input#CERT_DATE').val();
	param.RENEWAL_CERT_DATE  = ($('input#RENEWAL_CERT_DATE').val()=='')?"0000-00-00":$('input#RENEWAL_CERT_DATE').val();
	param.PPE_STATUS  = $('#PPE_STATUS').val();
	
	return param;
}

// set value form
function modifyInit() {
	var data = _sys.mariaDB.getData(CTX + '/hea/hea_0001/detailForm/getDetailInfo.ajax', {
		EMP_NO: $('input#EMP_NO').val(),
	});
 	
	if(!data) return;
	
	$('input#EMP_NAME').val(data.EMP_NAME);
	$('select#DUTY_CD').val(data.DUTY_CD).change();
  $('#POSITION_CD').val(data.POSITION_CD);
	$('input#COMPANY').val(data.COMPANY_NAME);
	$('input#COMPANY').prop('info', {COMPANY_ID: data.COMPANY_ID});
	$('input#AREA_CD').val(data.AREA_CD);
	$('input#EXPR').val(data.EXPR);
	$('textarea#MAIN_DEGREE').val(data.MAIN_DEGREE);
	$('textarea#MAIN_EXPR').val(data.MAIN_EXPR);
	$('input#SAFE_COURSE_CERT').val(data.SAFE_COURSE_CERT);
	$('input#CERT_DATE').val(data.CERT_DATE);
	$('input#RENEWAL_CERT_DATE').val(data.RENEWAL_CERT_DATE);
	$('select#PPE_STATUS').val(data.PPE_STATUS).change();
  if(data.CERT_DATE==null){
    $('input#CHECK').prop('checked',true).change();
  }

  var degreeObj = JSON.parse(data.MAIN_DEGREE);
  var expObj = JSON.parse(data.MAIN_EXPR);
  modifyInitCareer("degree", degreeObj);
  modifyInitCareer("exp", expObj);
}

function cancel(){
	window.location = CTX + '/hea/hea_0001/list';
}

// form submit
function saveEmp() {

  // validation check
   var check = $('[validation-check]').vcCheck();
   if (!check) {
     return false;
   }
	
	var params = createParameter();
	params.MAIN_EXPR = getStringJson('exp');
  params.MAIN_DEGREE = getStringJson('degree');
	params = _sys.convertParam(params);
	
	var data = _sys.mariaDB.ajax(CTX + '/hea/hea_0001/save.ajax', params);
	
	if(data.INSERT_EMP_MGT > 0 || data.UPDATE_EMP_MGT > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/hea/hea_0001/list';
	} 
	else {
		alert(_MESSAGE.common.saveFail);
	}
} // form submit end

var rowExpIdx = 1;
var rowDegreeIdx = 1;
function newRow(type){  //type exp-degree

  var tmpEle = "";
  var info ={};
  info.type=type;
  if(type=="exp"){
    info.idx=rowExpIdx++;
    tmpEle = ""
    	  +`  <td>`
    	  +`    <div class="calendar-picker">`
    	  +`      <div class="input-group">`
    	  +`        <label class="sr-only">날짜설정</label>`
    	  +`        <input id="startDate${info.type}-${info.idx}" type="text" title="날짜설정" placeholder="YYYY-MM-DD" class="datepicker"`
    	  +`          readonly>`
    	  +`        <button class="calendar-picker-btn"></button>`
    	  +`      </div>`
    	  +`    </div>`
    	  +`    <span class="hyphen">~</span>`
    	  +`    <div class="calendar-picker">`
    	  +`      <div class="input-group">`
    	  +`        <label class="sr-only">날짜설정</label>`
    	  +`        <input id="endDate${info.type}-${info.idx}" type="text" title="날짜설정" placeholder="YYYY-MM-DD" class="datepicker"`
    	  +`          readonly>`
    	  +`        <button class="calendar-picker-btn"></button>`
    	  +`      </div>`
    	  +`    </div>`
    	  +`  </td>`
    	  +`  <td>`
    	  +`    <div class="register-write w100p">`
    	  +`      <div class="input-group">`
    	  +`        <input id="detail${info.type}-${info.idx}" type="text" title="내용입력" placeholder="내용을 입력해주세요">`
    	  +`      </div>`
    	  +`    </div>`
    	  +`  </td>` ;
  }
  if(type=="degree"){
    info.idx=rowDegreeIdx++;
    tmpEle = ""
	  	  +`  </td>`
	  	  +`  <td>`
	  	  +`    <div class="calendar-picker">`
	  	  +`      <div class="input-group">`
	  	  +`        <label class="sr-only">날짜설정</label>`
	  	  +`        <input id="startDate${info.type}-${info.idx}" type="text" title="날짜설정" placeholder="YYYY-MM-DD" class="datepicker"`
	  	  +`          readonly>`
	  	  +`        <button class="calendar-picker-btn"></button>`
	  	  +`      </div>`
	  	  +`    </div>`
	  	  +`  </td>`
	  	  +`  <td>`
	  	  +`    <div class="calendar-picker">`
	  	  +`      <div class="input-group">`
	  	  +`        <label class="sr-only">날짜설정</label>`
	  	  +`        <input id="endDate${info.type}-${info.idx}" type="text" title="날짜설정" placeholder="YYYY-MM-DD" class="datepicker"`
	  	  +`          readonly>`
	  	  +`        <button class="calendar-picker-btn"></button>`
	  	  +`      </div>`
	  	  +`    </div>`
	  	  +`  </td>` ;
  }
  info.name=info.type+"-"+info.idx

  var sample = 
  `<tr id="tr${info.type}-${info.idx}">`
  +`  <td id="idx${info.type}-${info.idx}">${info.idx}</td>`
  +`  <td>`
  +`    <div class="flexWrap">`
  +`      <div class="register-write w100p">`
  +`        <div class="input-group">`
  +`          <input id="content${info.type}-${info.idx}" type="text" title="내용입력" placeholder="내용을 입력해주세요">`
  +`        </div>`
  +`      </div>`
  +`      <button id="btnRem${info.type}-${info.idx}" name="${info.type}-${info.idx}" onclick="removeRowFunc(this, '${info.type}');" class="common-btn motion remove-btn" title="삭제"></button>`
  +`      <button id="btnAdd${info.type}-${info.idx}" name="${info.type}-${info.idx}" onclick="addRowFunc(this, '${info.type}');" class="common-btn motion add-btn" title="추가"></button>`
  +`    </div>`
  +`  </td>`
  +  tmpEle
  +`</tr>`;
  
  sample = $(sample).css('cursor', 'pointer').click(function(event) {
    /* if(event.target.tagName === 'TD') {
      var info = $(this).prop('info');
      window.location = CTX + '/sft/sft_0001/detailManual?TOOL_ID=' + info.TOOL_ID;
    } */
  });
  $(sample).prop('info', info);
  return sample;
}

function removeRowFunc(inp, type){
  var length=0;
  var isAddElement = false;
  var name = $(inp).prop("name");
  if(type=="exp"){
    length = $('tbody#EXP_ROWS tr').length;
    isAddElement = $('button#btnAdd'+name).length==1;
  }
  if(type=="degree"){
    length = $('tbody#DEGREE_ROWS tr').length;
    isAddElement = $('button#btnAdd'+name).length==1;
  }
  
  $('tr#tr'+name).remove();
  if(isAddElement){
    var info ={};
    if(type=="exp") info = $('tbody#EXP_ROWS tr').last().prop("info");
    if(type=="degree") info = $('tbody#DEGREE_ROWS tr').last().prop("info");

    var content = `<button id="btnAdd${info.name}" name="${info.name}" onclick="addRowFunc(this, '${type}');" class="common-btn motion add-btn" title="추가"></button>`;
    $('button#btnRem'+info.name).after(content);
    if(length ==2)$('button#btnRem'+info.name).remove();
  }else if(length == 2){
    var info ={};
    if(type=="exp") info = $('tbody#EXP_ROWS tr').last().prop("info");
    if(type=="degree") info = $('tbody#DEGREE_ROWS tr').last().prop("info");
    if(length ==2)$('button#btnRem'+info.name).remove();
  }
  
  var index = 1;
  if(type=="exp"){
    $("tbody#EXP_ROWS  tr").each(function (i){
      var info =$(this).prop('info');
      $("td#idx"+info.name).html(index++);
    });
  }
  if(type=="degree"){
    $("tbody#DEGREE_ROWS  tr").each(function (i){
      var info =$(this).prop('info');
      $("td#idx"+info.name).html(index++);
    });
  }
  $('.datepicker').datepicker();
  $('.calendar-picker').click(function() {
     $(this).find(".datepicker").datepicker('show');
  });

  
 
}

function addRowFunc(inp, type){
  var name = $(inp).prop("name");

  //1 element handle
  var length=0;
  if(type=="exp"){
    length = $('tbody#EXP_ROWS tr').length;
  }
  if(type=="degree"){
    length = $('tbody#DEGREE_ROWS tr').length;
  }
  var name = $(inp).prop("name");
  if(length==1){
    var content = `<button id="btnRem${name}" name="${name}" onclick="removeRowFunc(this, '${type}');" class="common-btn motion remove-btn" title="삭제"></button>`
    $(inp).after(content);
  }
  if(type=="exp"){
    $('tbody#EXP_ROWS').append(newRow('exp'));
  }
  if(type=="degree"){
    $('tbody#DEGREE_ROWS').append(newRow('degree'));
  }

  $(inp).remove();
  var index = 1;
  if(type=="exp"){
    $("tbody#EXP_ROWS  tr").each(function (i){
      var info =$(this).prop('info');
      $("td#idx"+info.name).html(index++);
    });
  }
  if(type=="degree"){
    $("tbody#DEGREE_ROWS  tr").each(function (i){
      var info =$(this).prop('info');
      $("td#idx"+info.name).html(index++);
    });
  }
  $('.datepicker').datepicker();
  $('.calendar-picker').click(function() {
     $(this).find(".datepicker").datepicker('show');
  });
}

function regisInit(){
  $('tbody#EXP_ROWS').html('');
  var sample = newRow('exp');
  var info = $(sample).prop("info");
  $('tbody#EXP_ROWS').append(sample);
  $('button#btnRem'+info.name).remove();
 
  $('tbody#DEGREE_ROWS').html('');
  var sample = newRow('degree');
  var info = $(sample).prop("info");  
  $('tbody#DEGREE_ROWS').append(sample);
  $('button#btnRem'+info.name).remove();
  
  $('.datepicker').datepicker();
  $('.calendar-picker').click(function() {
     $(this).find(".datepicker").datepicker('show');
  });
}

function modifyInitCareer(type, obj) {
  var selector ="";
  if(type=='exp') selector = "tbody#EXP_ROWS";
  if(type=='degree') selector = "tbody#DEGREE_ROWS";
  $(selector).html('');
  
  if(obj.length==1){
    var sample = newRow(type);
    var info = $(sample).prop("info");
    $(selector).append(sample);
    $('button#btnRem'+info.name).remove();
    $('input#content'+info.name).val(obj[0].content);
    $('input#detail'+info.name).val(obj[0].detail);
    $('input#startDate'+info.name).val(obj[0].startDate);
    $('input#endDate'+info.name).val(obj[0].endDate);
  }

  if(obj.length>1){
    var sample = newRow(type);
    var info = $(sample).prop("info");
    $(selector).append(sample);
    $('button#btnAdd'+info.name).remove();
    $('input#content'+info.name).val(obj[0].content);
    $('input#detail'+info.name).val(obj[0].detail);
    $('input#startDate'+info.name).val(obj[0].startDate);
    $('input#endDate'+info.name).val(obj[0].endDate);
  }

  if(obj.length>1){
    for(let i = 1;i<obj.length;i++){
      var sample = newRow(type);
      var info = $(sample).prop("info");
      $(selector).append(sample);
      if(i<obj.length-1){
        $('button#btnAdd'+info.name).remove();
      }
      //$('button#btnRem'+info.name).remove();
      $('input#content'+info.name).val(obj[i].content);
      $('input#detail'+info.name).val(obj[i].detail);
      $('input#startDate'+info.name).val(obj[i].startDate);
      $('input#endDate'+info.name).val(obj[i].endDate);
    }
  }

  if(obj.length==0){
    var sample = newRow(type);
    var info = $(sample).prop("info");
    $(selector).append(sample);
    $('button#btnRem'+info.name).remove();
  }

  
  $('.datepicker').datepicker();
  $('.calendar-picker').click(function() {
     $(this).find(".datepicker").datepicker('show');
  });
  
}

function getStringJson(type){
  var list =[];
  var arrResult =[];
  if(type=='exp') list = $('tbody#EXP_ROWS tr');
  if(type=='degree') list = $('tbody#DEGREE_ROWS tr');

  list.each(function (index, element) {
    var info = $(this).prop('info');
    var obj ={};
    obj.content = $('input#content'+info.name).val().trim();
    obj.startDate = $('input#startDate'+info.name).val();
    obj.endDate = $('input#endDate'+info.name).val();
    if(type=='exp') obj.detail = $('input#detail'+info.name).val().trim();
    if(obj.content !="" && obj.startDate !="" && obj.endDate !="" && obj.detail !="")
    arrResult.push(obj);
  });

  return JSON.stringify(arrResult);
}