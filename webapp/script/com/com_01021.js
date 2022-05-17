function com_01021() {
debugger
	//$('button[id*=SEARCH_BTN], span[id*=ADD_BTN]').css('cursor', 'pointer').click(openPopup);
	
	$('button#BTN_POPUP_EMP').css('cursor', 'pointer').click(openPopup1);
	$('button#BTN_POPUP_SPS_CD').css('cursor', 'pointer').click(openPopup2);
	$('button#BTN_POPUP_SPS_RS').css('cursor', 'pointer').click(openPopup2);
	// UPDATE 일 경우, 수정 페이지 초기화 함수 실행 
	if($('input#PROCESS').val() === 'UPDATE') modifyInit();
	// 저장 버튼 클릭
	$('button#BTN_SAVE').click(save);
	$('button#BTN_CANCEL').click(cancel);
	$('#COMPANY').attr('validation-check', 'required');
}

function cancel(){
	window.location = CTX + '/com/com_0102/list';
}

function save(){
	debugger
	var check = $('[validation-check]').vcCheck();
    if (!check) {
    	return false;
    }
	var param = createParameter();
	param = _sys.convertParam(param);
	
	var data = _sys.mariaDB.ajax(CTX + '/com/com_0102/save.ajax', param, 'post');
	
	if(data && data.RESULT_SAVE > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/com/com_0102/detailForm?PROJECT_ID=' + data.PROJECT_ID;
	}
	// Exception 발생
	else if(data && data.EXCEPTION){
		if(data.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
	}
	// 삭제 실패
	else {
		alert(_MESSAGE.common.saveFail);
	}
}

function createParameter() {
	var param = {};
	param.PROCESS = $('input#PROCESS').val();
	param.PROJECT_ID = $('input#PROJECT_ID').val();
	param.COMPANY_ID = $('input#COMPANY').prop('info') ? $('input#COMPANY').prop('info').COMPANY_ID : '';
	param.PROJECT_NAME = $('input#PROJECT_NAME').val();
	param.START_TIME = $('#START_TIME_PROJECT').val();
	param.END_TIME = $('input#END_TIME_PROJECT').val();
	param.MANAGER = $('input#id_emp_str_uid_key_manager').val();
	param.TOTAL_MANPOWER = $('input#TOTAL_MANPOWER').val();
	param.STATUS = $('#id_select_status').val();
	param.SFT_PLAN = $('#SFT_PLAN').val();
	return param;
}

function openPopup1(){
	$('#SELECTED_VIEW').html('');
	$('div#layer-popup1').attr('class', 'layer-popup active');
	$('button#BTN_SAVE_POPUP1').css('cursor', 'pointer').click(savePopup1);
	
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
	$('#SELECTED_VIEW').append(sample);
	
	$(sample).find('button#BTN_REMOVE_EMP').click(function(event) {
		var tmp1 = '#EMP_CHECK_BOX_' + data.EMP_NO;
		var tmp2 = '#LI_SELECTED_' + data.EMP_NO;
		if ($(tmp1).is(':checked')){
			$(tmp1).prop('checked', false);
		}
		$(tmp2).remove();
	});
}

function savePopup1(){
	var param = {};
	param.EMP_LIST = $('ul#SELECTED_VIEW li').toArray().reduce((acc, e) => {
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

		$('div#layer-popup1').attr('class', 'layer-popup');
	}
	
}

function openPopup2(){
	$('tbody#SPS_CD_ROW_LIST').html('');
	$('div#layer-popup2').attr('class', 'layer-popup active');
	$('button#BTN_SAVE_SPS_CD').css('cursor', 'pointer').click(savePopup2);
	
	var param = {};
	param.COMM_CD = "SPS_CD";
	// 검색
	var data = _sys.mariaDB.getData(CTX + '/sys_new/sys_1100/getComCodeListByComm_Cd.ajax', param);
		
	data.forEach((e,idx) => {
		e.RN = idx + 1;
		var sample = _com_elements.com_01021.popup.sps_cd_row(e);
		$(sample).prop('info', e);
		$('tbody#SPS_CD_ROW_LIST').append(sample);
	});
}

function savePopup2(){
	var strId = '';
	var cnt = 0;
	
	$('.cls_sps_detail').html('');
	$("tbody#SPS_CD_ROW_LIST tr").each(function (i){
		var info = new Object();
		var commCd 	= $(this).find(".cls_commCd").val();
		var commNm 	= $(this).find(".cls_commNm").val();
		info['COMM_CD'] = commCd;
		info['COMM_NM'] = commNm;
		var tmpChecked 	= $(this).find(".cls_cb_toggle");
		var isChecked = tmpChecked[0].checked;
		if(isChecked){
			cnt++;
			makeDetailItem(info);
			strId += info.COMM_CD + ",";
		}
	});
		if(cnt > 0){
			strId = strId.substring(0, strId.length - 1);
		}
		$('div#layer-popup2').attr('class', 'layer-popup');
		
		document.getElementById("SFT_PLAN").value = strId;
		
		controlShowHideCd(cnt);
		
		return strId;
	
}

function controlShowHideCd(cnt){
	if(cnt > 0){
		$(".cls_sps_td").css("display", "flex");
		
		$("#BTN_POPUP_SPS_CD").css("display", "none");
		$("#BTN_POPUP_SPS_RS").css("display", "block");
	}else{
		$(".cls_sps_td").css("display", "none");
		
		$("#BTN_POPUP_SPS_CD").css("display", "block");
		$("#BTN_POPUP_SPS_RS").css("display", "none");
	}
}

function makeDetailItem(info){
	var sample =  '<span class="badge-custom4" style="margin-bottom: 5px;">'+info.COMM_NM+'</span>';
	$('.cls_sps_detail').append(sample);
}

function modifyInit() {
		// 데이터 조회
		var data = _sys.mariaDB.getData(CTX + '/com/com_0102/detailForm/getDetailInfo.ajax', {PROJECT_ID : $('input#PROJECT_ID').val(),});
		
		// 데이터 없을 경우 return 
		if (!data)
			return;
		// 작성자와 사용자의 UID가 다를 경우 삭제, 수정 불가
		// 수정 버튼 클릭 이벤트
		
		$('#PROJECT_NAME').val(data.PROJECT_NAME);
		$('#COMPANY').val(data.COMPANY_NAME);
		$('input#COMPANY').prop('info', {COMPANY_ID: data.COMPANY_ID});
		$('#START_TIME_PROJECT').val(data.START_TIME_PROJECT);
		$('#END_TIME_PROJECT').val(data.END_TIME_PROJECT);
		$('#id_emp_str_uid_key_manager').val(data.MANAGER);
		$('#TOTAL_MANPOWER').val(data.TOTAL_MANPOWER);
		$('#SFT_PLAN').val(data.SFT_PLAN);
		//$('#STATUS').value = data.STATUS;
		document.getElementById('id_select_status').value = data.STATUS;
		
		var SFT_PLAN_NAME = data.SFT_PLAN_NAME;
		if(SFT_PLAN_NAME && SFT_PLAN_NAME != ""){
			var arr = SFT_PLAN_NAME.split("!@#");
			for (var i = 0; i < arr.length; i++) {
				var strNm = arr[i];
				var tmpSpan = '<span class="badge-custom4" style="margin-bottom: 5px;">'+strNm+'</span> '
				$("#id_SPS_PLAN").append(tmpSpan);
			}
			controlShowHideCd(arr.length)
		}
		
		getEmpInfos('key_manager', data.MANAGER);
		$('.datepicker').datepicker();
  		$('.calendar-picker').click(function() {
     		$(this).find(".datepicker").datepicker('show');
  			});
	}
