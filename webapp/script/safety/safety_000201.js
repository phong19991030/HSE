function sft000201() {
	
	var CRUD = "${DATA.CRUD}"
	if(CRUD == 'U') {
	}
	
	$('#SAVE_BTN').click(saveData);
}

function saveData(){
	var check = $('[validation-check]').vcCheck();
    if (!check) {
    	return false;
    }
    
	var param = createSearchParameter();
	
	param = _sys.convertParam(param);
	
	var tools_data = getDataTools();
	param.TOOL_GRANT_LIST = JSON.stringify(tools_data);
	
	var data = _sys.mariaDB.ajax(CTX + '/sft/sft_0002/saveManual.ajax', param, 'post');
	
	if(data.RESULT_SAVE > 0) {
		alert(_MESSAGE.common.saveSuccess);
		window.location = CTX + '/sft/sft_0002/detailForm?TOOL_GRANT_REVOKE_ID=' + data.TOOL_GRANT_REVOKE_ID;
	}
	else if(data.EXCEPTION){
		if(data.EXCEPTION === 'SQLIntegrityConstraintViolationException') alert(_MESSAGE.common.SQLIntegrityConstraintViolationException); 
	}
	else {
		alert(_MESSAGE.common.saveFail);
	}
}

function createSearchParameter() {
	var param = {};
	param.CRUD = $('#CRUD').val();
	param.TOOL_GRANT_REVOKE_ID = $('#TOOL_GRANT_REVOKE_ID').val();
	param.PROJECT_ID = $('#PROJECT_ID').val();
	param.GRANT_DATE = $('input#id_grantDate').val()==''?'00:00:00':$('input#id_grantDate').val();
	param.EXPECT_REVOKE_DATE = $('input#id_expectRevokeDate').val();
	var isReturn = $('#id_chk_isReturn').is(':checked');
	param.isReturn = isReturn;
	param.RETURN_YN = isReturn ? 'Y' : '';
	param.REGISTER_USER = $('input#id_emp_str_uid_key_register').val();
	param.APPROVE_USER = $('input#id_emp_str_uid_key_approve').val();
	
	return param;
}

function addToolItemFunc(inp){
	var eElement = inp.parentNode;
	var prevEle = inp.previousElementSibling;
	var preEleClsLst = prevEle.classList;
	var isOld =  preEleClsLst.contains('remove-btn');
	
	var btnRemove = '<button class="btn1 remove-btn motion" onclick="removeToolItemFunc(this)">'
		  + 	'<i class="lar la-trash-alt"></i>'
		  + '</button>';

	if(!isOld){
		inp.insertAdjacentHTML('beforebegin', btnRemove);
	}
	
	var d = new Date();
	let time = d.getTime();
	//	new tool item
	var tmpLi = $('<li />');
	
	var tmpDiv1 = $('<div class="select-group" />');
	var select = $('<select title="선택" id="id_select_tool_item" />');
	var optionDefault = $('<option value="">').html("전체");
	select.append(optionDefault);
	if(arrTools != null){
		for (var i in arrTools) {
			var item = arrTools[i];
			var key = $.trim(item.TOOL_ID);
			var val = $.trim(item.TOOL_NAME);
			var option = $('<option value="' + key + '">').html(val);
			select.append(option);
		}
	}
	tmpDiv1.append(select);
	
	var tmpDiv2 = $('<div class="register-write" />');
	var tmpDiv21 = $('<div class="input-group amount" />');
	var tmpIpt2 = $('<input type="number" id="id_tool_amount" validation-check="required" title="수량입력" placeholder="수량입력">');
	tmpDiv21.append(tmpIpt2);
	tmpDiv2.append(tmpDiv21);
	
	var tmpDiv3 = $('<div class="register-write" />');
	var tmpDiv31 = $('<div class="input-group" />');
	var tmpIpt3 = $(`<input type="text" id="id_tool_note" title="장비이력입력" validation-check="required" placeholder="특이사항을 입력해주세요 (이상없을 경우 '이상없음' 으로 입력해주세요)">`);
	tmpDiv31.append(tmpIpt3);
	tmpDiv3.append(tmpDiv31);
	
	var tmpBtnRm = $('<button class="btn1 remove-btn motion cls_new" onclick="removeToolItemFunc(this)" />');
	var tmpIcon = $('<i class="lar la-trash-alt" />');
	tmpBtnRm.append(tmpIcon);
	
	tmpLi.append(tmpDiv1).append(tmpDiv2).append(tmpDiv3).append(tmpBtnRm);
//	var ulEle = eElement.parentNode;
//	ulEle.append(tmpLi);
	$('#id_tool_grant_lst').prepend(tmpLi);
//	ulEle.insertAdjacentHTML('afterbegin', tmpLi);
	
}

function removeToolItemFunc(inp){
	var classList = inp.className.split(/\s+/);
	var isNew = classList.indexOf('cls_new');
	
	//	check root hist
	var tmpParent = inp.parentNode;
	var lastEleChild = tmpParent.lastElementChild;
	var classListLastNode = lastEleChild.className.split(/\s+/);
	var isBtnAddHis = classListLastNode.indexOf('cls_addHis');
	var prevLi = tmpParent.previousElementSibling;
	if(isBtnAddHis > -1){
		var tmpAddBtn = '<button class="btn3 motion cls_addHis" onclick="addToolItemFunc(this)">'
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
	var tmpLength = $('#id_tool_grant_lst li').length;
	if(tmpLength == 1) {
		$('#id_tool_grant_lst li').each(function (i){
			var lastRmBtn = $(this).find(".remove-btn");
			lastRmBtn.remove()
		});
	}
}

function getDataTools(){
	var tools_data = [];
	
	$("#id_tool_grant_lst li").each(function (i){
		var row = new Object();
		row.TOOL_ID = $(this).find("#id_select_tool_item").val();
		row.AMOUNT 	= $(this).find("#id_tool_amount").val();
		row.NOTE 	= $(this).find("#id_tool_note").val();
		tools_data.push(row);
	})
	
	return tools_data;
}

function goList() {
	$(location).attr('href', CTX + '/sft/sft_0001/list');
  localStorage.removeItem("paramSearchSft0001");
}



