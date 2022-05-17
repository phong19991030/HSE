
/* 검색 조건  */
var _search;
var LIST_PPE_ID_REMOVE=[];

function safety_0101() {
	
	// page nation 버튼 클릭 
	// $('a#FST_PAGE').click(movePage);
	// $('a#PRE_PAGE').click(movePage);
	// $('a#NXT_PAGE').click(movePage);
	// $('a#LST_PAGE').click(movePage);
	
	// 행 갯수 option change 
	// $('select#PAGE_SIZE').change(onSearch);
	
	//search 버튼 클릭

	$('button#SEARCH_BTN').click(function(){
		//검색창 닫기
		
		onSearch();
	});

	
	$('input#id_search_all').keypress(function(e) {
		if(e.keyCode === 13) onSearch();
	});
	
	// search 리셋 버튼 클릭
		$('#SEARCH_RESET_BTN').click(function(){
		//document.getElementById("id_search_tool_type").selectedIndex = "0";
		// document.getElementById("id_search_tool_brand").selectedIndex = "0";
		//document.getElementById("id_search_tool_status").selectedIndex = "0";
		$('#id_search_tool_type').val("");
		$('#id_search_tool_brand').val("");
		$('#id_search_tool_status').val("");
		$('input#id_search_grant_date').val("");
		$('input#id_search_renew_date').val("");
		$('input#id_search_all').val("");
		onSearch();
	});
	//등록버튼 클릭

	$('#REGISTER_BTN').click(function(){
		var crud = "C";
		var data = _sys.mariaDB.getData(CTX + '/sft/sft_0101/formManual.ajax?CRUD='+crud);
		getEmpInfos('key_employee', null );
		$('input#CRUD').val('C');
		console.log('data', data);
		makeDisableButton(false);
		makeRowFormRegister('init');
	});
	
	onSearch();

  InspectionList();
}


function makeRowFormRegister(action){
	if(action === 'init'){
		$('div#list-item').html('');
	}

	var toolType = $("#toolType").val();
    var statusType = $("#statusType").val();
    console.log(toolType);
    console.log(statusType);
    toolType = makeOptionTypeSelect(toolType,null);
    statusType = makeOptionStatusSelect(statusType,null);
    // console.log(toolType);
    // console.log(statusType);
	var listTb = $("#list-item table");
	var i= listTb.length;
	var id = 'item-' + ++i;
	var tbId = 'tb-item-' + i;
	var selectId = 'sl-item-' + i;
	var brandId = 'item-brand-' + i;
	var modelId = 'item-model-' + i;
	var grantDateId = 'grant-date-' + i;
	var renewDateId = 'renew-date-' + i;
	var checkBoxId = 'check-renew-' + i;
	var sample = 
				'<table id="' + tbId + '">'
				+    '<caption></caption>'
				+    '<colgroup>'
				+    '<col style="width: 8%;">'
				+    '<col style="width: 12%;">'
				+    '<col style="width: auto;">'
				+    '<col style="width: 12%;">'
				+    '<col style="width: auto;">'
				+    '<col style="width: 3%;">'
				+    '</colgroup>'
				+    '<tbody>'
				+    '<tr>'
				+    '<th scope="row" rowspan="3" class="border-right txt-center stt">'+ i +'</th>'
				+    '<th scope="row">품목</th>'
				+    '<td colspan="3">'
				+      '<div class="select-group">'
				+        '<select title="품목" class="ppe_id" validation-check="required" id="' + selectId + '">'
				+           toolType
				+        '</select>'
				+      '</div>'
				+      '<div class="register-write">'
				+        '<div class="input-group">'
				+          '<input type="text" title="브랜드" placeholder="브랜드" class="brand" id="' + brandId + '" validation-check="required">'
				+        '</div>'
				+      '</div>'
				+      '<div class="register-write">'
				+        '<div class="input-group">'
				+          '<input type="text" title="모델명" placeholder="모델명" class="model" id="' + modelId + '" validation-check="required">'
				+        '</div>'
				+      '</div>'
				+    '</td>'
				+    '<td colspan="3" rowspan="3" class="border-left">'
				+      '<button class="table-remove-btn" id="' + id + '">'
				+        '<i class="las la-trash-alt"></i>'
				+      '</button>'
				+   ' </td>'
				+  '</tr>'
				+  '<tr>'
				+    '<th scope="row">지급일자</th>'
				+    '<td>'
				+      '<div class="calendar-picker">'
				+        '<div class="input-group">'
				+          '<label class="sr-only">날짜설정</label>'
				+          '<input type="text" placeholder="YYYY-MM-DD" title="날짜설정" id="' + grantDateId + '" class="datepicker grant_date" validation-check="required" readonly>'
				+          '<button class="calendar-picker-btn"></button>'
				+        '</div>'
				+      '</div>'
				+    '</td>'
				+    '<th scope="row">교체일자</th>'
				+    '<td >'
				+      '<div class="calendar-picker">'
				+        '<div class="input-group">'
				+          '<label class="sr-only">날짜설정</label>'
				+          '<input type="text" placeholder="YYYY-MM-DD" title="날짜설정" id="' + renewDateId + '" class="datepicker renew_date" readonly>'
				+          '<button class="calendar-picker-btn"></button>'
				+        '</div>'
				+      '</div>'
				+      '<span class="mgl10 checkbox-radio-group">'
				+        '<label for="radio" class="radio">'
				+          '<input type="checkbox" id="' + checkBoxId + '" class="check_renew">'
				+          '<em>파손 시 까지</em>'
				+        '</label>'
				+      '</span>'
				+    '</td>'
				+  '</tr>'
				+  '<tr> '
				+    '<th scope="row">상태</th>'
				+    '<td colspan="3">'
				+      '<div class="select-group">'
				+        '<select title="상태" class="status" validation-check="required">'
				+            '<option value="">상태</option>'
				+               statusType
				+        '</select>'
				+      '</div>'
				+    '</td>'
				+  '</tr>'
				+'</tbody>'
				+'</table>';

				$('div#list-item').append(sample);
				// $('table#tb-item').append(addBtn);
                $('.table-remove-btn').click(removeRow);

				$('select#'+selectId).change(function () {
					var optionSelected = $(this).find("option:selected");
					var data = getBrandandModelBySubject(optionSelected.val());
					$('input#'+brandId).val(getDataDisplay(data != undefined ? data.BRAND : ""));
					$('input#'+modelId).val(getDataDisplay(data != undefined ? data.MODEL_NAME : ""));
				});

				// $('#layer-popup1').on('shown.bs.modal', function (e) {
				$(".datepicker").datepicker();
				$('.calendar-picker').click(function() {
     				$(this).find(".datepicker").datepicker('show');
  					});
					// each(function (){
					// 	$(this).datepicker();
					// })
			//    });

				$('#'+renewDateId).change(function() {
					var date = $(this).val();
					if(date!== null && date !== ''){
						console.log(date, 'change');
						$("#"+checkBoxId).prop("checked", false);
						// $("#"+checkBoxId).attr('disabled', 'disabled');
					}else{
						// $("#"+checkBoxId).removeAttr('disabled');
					}
				});

				$("#"+checkBoxId).change(function() {
					if (!$(this).is(':checked')) {
						// $("#"+renewDateId).removeAttr('disabled');
					}else{
						$("#"+renewDateId).val('');
						// $("#"+renewDateId).attr('disabled', 'disabled');
					}
				  });

}

/* 검색 이벤트 */
function onSearch() {
	
	var param = {};
	var search =  createSearchParameter();
	// 페이징 옵션 
	// param.PAGE = $('#PAGENATION').children('.active').text() ? parseInt($('#PAGENATION').children('.active').text()) : 1;
	// param.PAGE_SIZE = parseInt($('select#PAGE_SIZE option:selected').val());
	
	// 검색 param까지 합치기
	param = Object.assign(param, search);
	console.log(param);
	
	// 검색
	var data = _sys.mariaDB.getData(CTX + '/sft/sft_0101/getManualListData.ajax', param);
	console.log('data', data);
	
	// 토탈 갯수 표기
	// $('strong#TOTAL_CNT').text(data.CNT);
	
	// row 생성
	makeList(data.LIST);
	$("strong#display-cnt").html(data.CNT);
	
	// 페이지네이션 생성
	// makePageNation(parseInt(data.CNT), parseInt(data.PAGE_SIZE), parseInt(data.PAGE));
	
}

function createSearchParameter() {
	var param = {};
	param.TOOL_NAME = $('#id_search_tool_type').val();
	// param.BRAND_NAME = $('#id_search_tool_brand').val();
	param.STATUS = $('#id_search_tool_status').val();
	param.GRANT_DATE = $('#id_search_grant_date').val();
	param.RENEW_DATE = $('#id_search_renew_date').val();
	param.all = $('input#id_search_all').val();
	return param;
}

function getHtmlStatus(status,sttCd){
	debugger
	if(status){
		if(sttCd === 'PPE_STATE-1' || sttCd === 'PPE_STATE-2') return '<span class="dot-badge-custom1">'+ status +'</span>';
		if(sttCd === 'PPE_STATE-3' || sttCd === 'PPE_STATE-4') return '<span class="dot-badge-custom2">'+ status +'</span>';
		if(sttCd === 'PPE_STATE-5' || sttCd === 'PPE_STATE-6') return '<span class="dot-badge-custom3">'+ status +'</span>';
	}else{
		return '<span> -- </span>';
	}
}


function getHtmlData(data){
	if(data){
		return '<td>'+ data +'</td>';
	}else{
		return '<td> -- </td>';
	}
}

function getHtmlRenewDate(data,flag, isNew1){
	if(data){
		return '<td>'
				+`	<span ${(isNew1=='Y')?'class="test renew"':'test'}>` 
				+'<em>' + data + '</em>'
				+'</span>'
				+   `${(isNew1=='Y')?'<span class="badge-custom">검사</span>':''}`
				+'</td>';
	}else if(flag){
		return '<td> 파손시 까지 </td>';
	}else return '<td> -- </td>';
}

function makeList(list) {
	// 
	// 
	$('ul#PPE_LIST').html('');
	list.forEach((e) => {
		debugger
		var row="";
		e.PPE_LIST.forEach((p) =>{
			row +=
					'<tr>'
			+		  '<th scope="row" class="txt-left">'+ p.PPE_NAME +'</th>'
			+		  getHtmlData(p.BRAND)
			+		  getHtmlData(p.MODEL_NAME)
			+		  getHtmlData(p.GRANT_DATE)
			+		  getHtmlRenewDate(p.RENEW_DATE,p.CHECK_RENEW,p.isNew1)
			+		  '<td>'
			+			getHtmlStatus(p.STATUS,p.STATUS_CODE)
			+		  '</td>'
			+		'</tr>'
		})

		var idBtn = 'id-btn-detail-'+e.EMP_NO;

		// row 생성 
		var sample = 
			'<li>'
			+ '<div class="tit-area"> '
			+  '<h2 class="heading4">'
			+	'<span class="name">'+ e.EMP_NAME +'</span>'
			+	'<span class="position">과장</span>'
			+ '</h2>'
			+  '<button class="btn2 btn-open-popup" modal-id="layer-popup2" id="'+ idBtn +'">'
			+	'<i class="las la-eraser"></i><span class="name">수정</span>'
			+  '</button>'
			+'</div>'
			+'<article class="view-form">'
			+  '<div class="base-table custom-table2 center-table">'
			+	'<table>'
			+	  '<colgroup>'
			+		'<col style="width: 16%;">'
			+		'<col style="width: 15%;">'
			+		'<col style="width: 15%;">'
			+		'<col style="width: 15%;">'
			+		'<col style="width: 20%;">'
			+		'<col style="width: 15%;">'
			+	  '</colgroup>'
			+	 ' <thead>'
			+		'<tr>'
			+		 ' <th scope="col" class="txt-left">품목</th>'
			+		 ' <th scope="col">브랜드</th>'
			+		 ' <th scope="col">모델명</th>'
			+		 ' <th scope="col">지급일자</th>'
			+		 ' <th scope="col">교체일자</th>'
			+		 ' <th scope="col">상태</th>'
			+		'</tr>'
			+	  '</thead>'
			+	  '<tbody >'
			+ 	row
			+	  '</tbody>'
			+	'</table>'
			+ '</div>'
			+ '</article>'
		    + '</li>';
		
		
		// 프로퍼티 추가 
		$(sample).prop('info', e);
		
		// row 추가 
		$('ul#PPE_LIST').append(sample);

		$("button#"+idBtn+"").click(function(){
			$('#layer-popup1').attr('class','layer-popup active');
			getEmpInfos('key_employee', null );
			// console.log(e);
			var param = {};
			param.CRUD = "U";
			param.EMPLOYEE = e.EMP_NO;
			var data = _sys.mariaDB.getData(CTX + '/sft/sft_0101/formManual.ajax', param);
			$('input#id_emp_str_uid_key_employee').val(data.EMPLOYEE);
			getEmpInfos('key_employee', data.EMPLOYEE);
			$('input#CRUD').val('U');
			makeDisableButton(true);
			makeInitDataDetal(e.PPE_LIST);

		});
	});
	
	// 데이터 0개 일 경우 
	// if(list.length === 0) $('tbody#ROW_LIST').append('<tr><td colspan="6" class="NO_DATA">No Data</td><tr>');
};


function makeInitDataDetal(list){
	LIST_PPE_ID_REMOVE = [];
	$('div#list-item').html('');
	list.forEach(e =>{
		var toolType = $("#toolType").val();
		var statusType = $("#statusType").val();
		// console.log(toolType);
		// console.log(statusType);
		toolType = makeOptionTypeSelect(toolType,e.PPE_ID);
		statusType = makeOptionStatusSelect(statusType,e.STATUS_CODE);
		// console.log(toolType);
		// console.log(statusType);
		var listTb = $("#list-item table");
		var i= listTb.length;

		var id = 'item-' + ++i;
		var tbId = 'tb-item-' + i;
		var selectId = 'sl-item-' + i;
		var brandId = 'item-brand-' + i;
		var modelId = 'item-model-' + i;
		var empId = 'emp-ppe-id-' + i;
		var grantDateId = 'grant-date-' + i;
		var renewDateId = 'renew-date-' + i;
		var checkBoxId = 'check-renew-' + i;
		console.log(id);
		var sample = 
                    '<table id="' + tbId + '">'
                +    '<caption></caption>'
                +    '<colgroup>'
                +    '<col style="width: 8%;">'
                +    '<col style="width: 12%;">'
                +    '<col style="width: auto;">'
                +    '<col style="width: 12%;">'
                +    '<col style="width: auto;">'
                +    '<col style="width: 3%;">'
                +    '</colgroup>'
                +    '<tbody>'
				+    '<tr>'
                +    '<th scope="row" rowspan="3" class="border-right txt-center stt">'+ i +'</th>'
                +    '<th scope="row">품목</th>'
                +    '<td colspan="3">'
                +      '<div class="select-group">'
				+		'<input type="hidden" class="emp_ppe_id" name="modelAttr" id="' + empId + '" value="' + e.EMP_PPE_ID + '"/>'
                +        '<select title="품목" class="ppe_id" validation-check="required" id="' + selectId + '">'
                +           toolType
                +        '</select>'
                +      '</div>'
                +      '<div class="register-write">'
                +        '<div class="input-group">'
                +          '<input type="text" title="브랜드" placeholder="브랜드" class="brand" id="' + brandId + '" value="'+ getDataDisplay(e.BRAND) +'" validation-check="required">'
                +        '</div>'
                +      '</div>'
                +      '<div class="register-write">'
                +        '<div class="input-group">'
                +          '<input type="text" title="모델명" placeholder="모델명" class="model" id="' + modelId + '" value="'+ getDataDisplay(e.MODEL_NAME) +'" validation-check="required">'
                +        '</div>'
                +      '</div>'
                +    '</td>'
                +    '<td colspan="3" rowspan="3" class="border-left">'
                +      '<button class="table-remove-btn" id="' + id + '">'
                +        '<i class="las la-trash-alt"></i>'
                +      '</button>'
                +   ' </td>'
                +  '</tr>'
                +  '<tr>'
                +    '<th scope="row">지급일자</th>'
                +    '<td>'
                +      '<div class="calendar-picker">'
                +        '<div class="input-group">'
                +          '<label class="sr-only">날짜설정</label>'
                +          '<input type="text" placeholder="YYYY-MM-DD" title="날짜설정" id="' + grantDateId + '" class="datepicker grant_date" value="'+ getDataDisplay(e.GRANT_DATE) +'" validation-check="required" readonly>'
                +          '<button class="calendar-picker-btn"></button>'
                +        '</div>'
                +      '</div>'
                +    '</td>'
                +    '<th scope="row">교체일자</th>'
                +    '<td >'
                +      '<div class="calendar-picker">'
                +        '<div class="input-group">'
                +          '<label class="sr-only">날짜설정</label>'
                +          '<input type="text" placeholder="YYYY-MM-DD" title="날짜설정" id="' + renewDateId + '" class="datepicker renew_date" value="'+ getDataDisplay(e.RENEW_DATE) +'" readonly>'
                +          '<button class="calendar-picker-btn"></button>'
                +        '</div>'
                +      '</div>'
                +      '<span class="mgl10 checkbox-radio-group">'
                +        '<label for="radio" class="radio">'
                +          makeHtmlCheckRenew(e.CHECK_RENEW,checkBoxId)
                +          '<em>파손 시 까지</em>'
                +        '</label>'
                +      '</span>'
                +    '</td>'
                +  '</tr>'
                +  '<tr> '
                +    '<th scope="row">상태</th>'
                +    '<td colspan="3">'
                +      '<div class="select-group">'
                +        '<select title="상태" class="status" validation-check="required">'
                +            '<option value="">상태</option>'
                +               statusType
                +        '</select>'
                +      '</div>'
                +    '</td>'
                +  '</tr>'
                +'</tbody>'
                +'</table>';


				
				// $('#add-btn').remove();

                // var addBtn = 
                //     '<tr id="add-btn">'
                //     +'<td colspan="6" class="txt-center">'
                //     +    '<button class="row-add-btn">'
                //     +    '<i class="las la-plus"></i>'
                //     +    '</button>'
                //     +'</td>'
                //     +'</tr>'

				$('div#list-item').append(sample);
				// $('table#tb-item').append(addBtn);
                $('button#'+ id).click(function(){
					var tb = $("#" + id + "").parent().parent().parent().parent();
					tb.remove();
					var s = 1;
					$("#list-item table").each(function (tb){
						var stt = $(this).find('th.stt');
						stt.html(s++);
					})

					var param = {};
					param.EMP_PPE_ID = e.EMP_PPE_ID.toString(); 
					
					LIST_PPE_ID_REMOVE.push(param);
					// console.log(LIST_PPE_ID_REMOVE);
				});

				$('select#'+selectId).change(function () {
					var optionSelected = $(this).find("option:selected");
					var data = getBrandandModelBySubject(optionSelected.val());
					$('input#'+brandId).val(getDataDisplay(data.BRAND ? data.BRAND : null));
					$('input#'+modelId).val(getDataDisplay(data.MODEL_NAME ? data.MODEL_NAME : null));
				});
				$(".datepicker").datepicker();
				$('.calendar-picker').click(function() {
     				$(this).find(".datepicker").datepicker('show');
  					});

				// if(e.CHECK_RENEW){
				// 	$("#"+renewDateId).attr('disabled', 'disabled');
				// }

				$('#'+renewDateId).change(function() {
					var date = $(this).val();
					if(date !== null && date !== ''){
						console.log(date, 'change');
						$("#"+checkBoxId).prop("checked", false);
						// $("#"+checkBoxId).attr('disabled', 'disabled');
					}else{
						// $("#"+checkBoxId).removeAttr('disabled');
					}
				});

				$("#"+checkBoxId).change(function() {
					if (!$(this).is(':checked')) {
						// $("#"+renewDateId).removeAttr('disabled');
					}else{
						$("#"+renewDateId).val('');
						// $("#"+renewDateId).attr('disabled', 'disabled');
					}
				  });

	})
}

function getDataDisplay(data){
	return data ? data : "";
}

function makeHtmlCheckRenew(check,checkBoxId){
	var sample ='';
	if(check){
		sample += '<input type="checkbox" id="' + checkBoxId + '" checked class="check_renew">';
	}else{
		sample += '<input type="checkbox" id="' + checkBoxId + '" class="check_renew">';
	}
	return sample;
}

// function openPopupDetail(){
// 	$('#layer-popup1').attr('class','layer-popup active');

// }

function getBrandandModelBySubject(value){
	console.log(value);
	var param = {};
	param.TOOL_TYPE = value;

	var data = _sys.mariaDB.getData(CTX + '/sft/sft_0101/getBrandsByToolType.ajax', param);
	console.log(data);
	return data;
}

function InspectionList() {
  var param = {};
	var data = _sys.mariaDB.getData(CTX + '/sft/sft_0101/getInspectionList.ajax', param);
  makeInspectionList(data)
}

function makeInspectionList(data){
	debugger
  $('tbody#INSPECTION_LIST').html('');

  var list = data.filter((item, index) => item.isNew1 == "Y");

  list.sort((a, b) => {
    let fa = a.EMP_NAME.toLowerCase(),
        fb = b.EMP_NAME.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
  });

  var RN=0;
  var i = 0;
  while (i < list.length) {
	  var span = 1;
	  var sample = 
		  '<td>'+ list[i].PPE_NAME +'</td>'
		  +    getHtmlData(list[i].BRAND)
		  +	   getHtmlData(list[i].MODEL_NAME)
		  +    getHtmlData(list[i].GRANT_DATE)
		  +    getHtmlRenewDate(list[i].RENEW_DATE,list[i].CHECK_RENEW, list[i].isNew1)
		  +    '<td>'
		  +    getHtmlStatus(list[i].STATUS,list[i].STATUS_CODE)
		  +    '</td>'
		  +   '</tr>';
	  
	  if(i+1 < list.length){
		  while(list[i+1].EMP_NAME == list[i].EMP_NAME){
			  sample+=
				  '<tr>'
				  +    '<td>'+ list[i+1].PPE_NAME +'</td>'
				  +    getHtmlData(list[i+1].BRAND)
				  +	   getHtmlData(list[i+1].MODEL_NAME)
				  +    getHtmlData(list[i+1].GRANT_DATE)
				  +    getHtmlRenewDate(list[i+1].RENEW_DATE,list[i+1].CHECK_RENEW, list[i+1].isNew1)
				  +    '<td>'
				  +    getHtmlStatus(list[i+1].STATUS,list[i+1].STATUS_CODE)
				  +    '</td>'
				  +   '</tr>';
			  i++;
			  span++;
			  if(i+1 == list.length) break;
		  }
	  }
	  
	  RN++;
	  sample=    
		  '<tr>'
		  +    '<th scope="row" rowspan="'+span+'">'+RN+'</th>'
		  +    '<td rowspan="'+span+'">'+ list[i].EMP_NAME +'</td>'
		  +    '<td rowspan="'+span+'">'+ list[i].DUTY_NAME +'</td>'
		  + sample;
	  
	  // row 추가 
	  
	  $('tbody#INSPECTION_LIST').append(sample);
	  i++;
  }
    
    // 데이터 0개 일 경우 
    if(list.length === 0) $('tbody#INSPECTION_LIST').append('<tr><td colspan="6" class="NO_DATA">No Data</td><tr>');
}


