<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<%-- <c:if test="${param.CRUD eq 'C'}"> --%>
<div class="btn-wrap">
	<button isone="${param.isOne}" class="btn1"
		id="BTN_POPUP_EMP_${param.key}" isaddmanual="${param.isAddManual}"
		isone="${param.isOne}" onclick="openEmpPopup(this)">
		<spring:message code="button.setting" />
	</button>
</div>
<%-- </c:if> --%>

<div class="btn-wrap check-selected-wrap" id="id_div_emp_${param.key}"
	style="display: none;">
	<button isone="${param.isOne}" class="btn1 style2"
		id="BTN_RESET_EMP_${param.key}" onclick="openEmpPopup(this)">
		<spring:message code="button.reset1" />
	</button>
	<ul id="id_selected_emp_${param.key}">
	</ul>
</div>
<!-- layer-popup2 (책임자 설정 팝업) -->
<div class="layer-popup" id="layer-popup_${param.key}">
	<div class="popup-cont" style="min-width: 468px;">
		<input custom_title="${title}" value="${param.title}" type="text" id='id_custom_title_${param.key}' style="display: none">
		<h2 class="heading4" id ="id_selected_emp_title_${param.key}"></h2>

		<!-- fixed-search-form2 -->
		<div class="fixed-search-form2">
			<div class="search-bar">
				<input isone="${param.isOne}" type="text" placeholder="이름" id='id_pp_emp_name_${param.key}' key="${param.key}" >
				<button isone="${param.isOne}" class="search-btn"
					id="id_btn_search_${param.key}" onclick="onSearchEmpFunc1(this)" key="${param.key}">검색</button>
			</div>
		</div>
		<!-- //fixed-search-form2 -->

		<h3 class="heading5">직원 목록</h3>
		<div class="base-table">
			<table id="id_tbl_emp_${param.key}" style="max-height: 420px;overflow: auto; display: block;">
				<caption></caption>
				<colgroup>
					<col style="width: 5%;">
					<col style="width: 45%;">
					<col style="width: 20%;">
					<col style="width: 30%;">
				</colgroup>
				<thead>
					<tr>
						<th scope="col"></th>
						<th scope="col">회사명</th>
						<th scope="col">성명</th>
						<th scope="col">직급</th>
					</tr>
				</thead>
				<tbody id="ROW_LIST_${param.key}">
				</tbody>
			</table>
		</div>
		<div>
			<c:if test="${param.isAddManual}">
				<h3 class="heading5" style="padding-top: 10px;">미등록 인원 등록</h3>
				<div class="registration-form">
					<div class="base-table">
						<table>
							<caption>미등록 인원 등록 - 성명</caption>
							<colgroup>
								<col style="width: 20%;">
								<col style="width: 70%;">
								<col style="width: 10%;">
							</colgroup>
							<tbody id="id_tb_people">
								<tr>
									<th scope="row">성명</th>
									<td>
										<div class="register-write">
											<div class="input-group">
												<input type="text" id="id_people_name" title="모델명"
													placeholder="모델명" value="">
											</div>
										</div>
									</td>
									<td class="border-left txt-center">
										<button class="table-remove-btn" onclick="rmPeopleFunc(this)">
											<i class="las la-trash-alt"></i>
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div class="txt-center mgvertical20">
					<button class="row-add-btn cls_add_people"
						onclick="addPeopleFunc(this)">
						<i class="las la-plus"></i>
					</button>
				</div>
			</c:if>
		</div>

		<div class="foot-btn-area">
			<button
				style="background: #929595; min-width: 93px; height: 35px; line-height: 35px; position: relative; display: inline-block; vertical-align: middle; transition: all .3s; font-size: 14px; text-align: center; font-weight: 200; padding: 0 0.75rem; color: #fff; border-radius: 3px;"
				id="id_btn_clse_${param.key}" onclick="handleClosePop(this)">
				<i class="las la-reply"></i><span class="name">취소</span>
			</button>
			<button class="btn-style1" id='id_btn_save_${param.key}'
				onclick="savePopupEmpFunc1(this)">
				<i class="las la-edit"></i><span class="name">등록</span>
			</button>
		</div>

		<button id="id_btn_clse_${param.key}" type="button"
			style="position: absolute; top: 14px; right: 17px; color: #b9b9b9; font-size: .9rem;"
			onclick="handleClosePop(this)">
			<i class="xi-close"></i>
		</button>
	</div>
</div>
<!-- //layer-popup2 -->

<script>

var strEmpId = "${param.strEmpId}";
var CRUD = "${param.CRUD}";
var isOne = ${param.isOne};
var isInPopup = ${not empty param.isInPopup ? param.isInPopup : false};
var isDisable = ${not empty param.isDisable ? param.isDisable : false};
var key = "${param.key}";
// var isOne = 

$(document).ready(function(){
	//onSearchEmpFunc();		
	//if(CRUD != 'C'){
		//getEmpInfos();
	//}
});

function handleClosePop(inp){
	var tmpEleId = inp.id;
	//id_btn_save_
	var keyEle = tmpEleId.substring(12);
	
	$('div#layer-popup_'+keyEle).attr('class', 'layer-popup');
	if(isInPopup){
		preOpenEmpPop(0);
	}
	
	$("input").keyup(function() {
		onSearchEmpFunc1(this);
	});
}

	
function preOpenEmpPop(type){
	if(type == 0){
		document.getElementById("layer-popup_"+key).style.display = 'none';
	}else{
		document.getElementById("layer-popup_"+key).style.display = 'flex';
	}
}

function getEmpInfoAndOther(key, parentEmpId, otherPeople){
	getEmpInfos(key, parentEmpId);
	
	if(otherPeople && otherPeople != ""){
		var arr = otherPeople.split('@!#%'); 
		for (var i = 0; i < arr.length; i++) {
			makeOtherPeople(arr[i], key)
		}
	}
}

function getEmpInfos(key, parentEmpId){
	var param = {}
	
	if(parentEmpId){
		param.strUid = parentEmpId;
	}else{
		param.strUid = strEmpId;
	}
	
	var empInfos = _sys.mariaDB.getData(CTX + '/common/getEmpInfoWithStrUid.ajax', param);
	
	var cnt = 0;
	

	if(empInfos.length >0){
		empInfos.forEach((e) => {
			cnt++;
			var info = {};
			info.idx = cnt;
			info.COMPANY_NAME = e.COMPANY_NAME;
			info.EMP_NAME = e.EMP_NAME;
			info.DUTY_NAME = e.DUTY_NAME;
			makeSelectedEmp(info, key)
		});
	}else{
		$('ul#id_selected_emp_'+key).html("");
	}
	
	controlShowHide1(cnt, key);
	
}

function openEmpPopup(inp){
	//preopen func
	if(isInPopup){
		preOpenEmpPop(1);
	}
	
	var tmpEleId = inp.id;
	//BTN_POPUP_EMP_
	//BTN_RESET_EMP_
	var keyEle = tmpEleId.substring(14);
	
	// title
	var customTitle = $('#id_custom_title_'+keyEle).val();
	if(customTitle && customTitle != ""){
		$('#id_selected_emp_title_'+keyEle).text(customTitle)
	}else{
		$('#id_selected_emp_title_'+keyEle).text("책임자 설정")
	}
	
	$('div#layer-popup_'+keyEle).attr('class', 'layer-popup active');
	
	$('input#id_pp_emp_name_'+keyEle).keypress(function(e){
		if(e.keyCode === 13){
			onSearchEmpFunc1(this);
		}
	});
	onSearchEmpFunc1($('input#id_pp_emp_name_'+keyEle)[0]);
}

function savePopupEmpFunc1(inp){
	var tmpEleId = inp.id;
	//id_btn_save_
	var keyEle = tmpEleId.substring(12);
	
	var arr = [];
	var strUId = '';
	var cnt = 0;
	
	$('ul#id_selected_emp_'+keyEle).html('');
	$("#id_tbl_emp_"+keyEle+" tbody tr").each(function (i){
		var info =$(this).prop('info');
		var tmpChecked 	= $(this).find(".cls_pp_cb");
		var isChecked = tmpChecked[0].checked;
		if(isChecked){
			cnt++;
			info.idx = cnt;
			arr.push(info)
			makeSelectedEmp(info, keyEle);
			strUId += info.EMP_NO + ",";
		}
	});
	if(cnt > 0){
		strUId = strUId.substring(0, strUId.length - 1);
		//var newStr = str.slice(0, -1);
	}
	// isManual case
	var elAddPeople = $("#layer-popup_"+keyEle).find(".cls_add_people"); 
	if(elAddPeople.length > 0){
		document.getElementById("id_other_people_"+keyEle).value = getOtherPeople(keyEle);
	}
	
	$('div#layer-popup_'+keyEle).attr('class', 'layer-popup');
	document.getElementById("id_emp_str_uid_"+keyEle).value = strUId;
  	$('#id_emp_str_uid_'+keyEle).change(); //thanh nv
	//$('id_emp_str_uid_${param.key}').val(strUId);
	controlShowHide1(cnt, keyEle);
	
	if(isInPopup){
		preOpenEmpPop(0);
	}
	return strUId;
}

function controlShowHide1(cnt, keyEle){
	if(cnt > 0){
		$("#id_div_emp_"+keyEle).css("display", "flex");
		$("#BTN_POPUP_EMP_"+keyEle).css("display", "none");
	}else{
		$("#id_div_emp_"+keyEle).css("display", "none");
		$("#BTN_POPUP_EMP_"+keyEle).css("display", "block");
	}
}

function makeSelectedEmp(info, keyEle){
	
	var sample = 
		  '<li>'
		+ 	'<span class="badge-custom8">'
		+		'<i class="number">'+info.idx+'</i>'
		+		'<span class="txt-inner">'
		+			'<em class="company">'+info.COMPANY_NAME+'</em>'
		+			'<em class="name">'+info.EMP_NAME+'</em>'
		+			'<em class="position">'+info.DUTY_NAME+'</em>'
		+		'</span>'
		+ 	'</span>'
		+ '</li>';
	
	sample = $(sample).css('cursor', 'pointer').click(function(event) {
		/* if(event.target.tagName === 'TD') {
			var info = $(this).prop('info');
			window.location = CTX + '/sft/sft_0001/detailManual?TOOL_ID=' + info.TOOL_ID;
		} */
	});
	
	// row 추가 
	$('ul#id_selected_emp_'+keyEle).append(sample);
}

function onSearchEmpFunc1(inp) {
// 	var tmpEleId = inp.id;
	//id_btn_search_
	var keyEle = $(inp).attr('key');
	var attributes = inp.attributes;
	var isOne = attributes[0].name == "isone" ? attributes[0].value : "true";
	
	var searchEmpName = $("#id_pp_emp_name_"+keyEle).val();
	var param = {};
	param.SEARCH_EMP_NAME = searchEmpName;
	param.COMPANY_ID = '${SESS_USER.COMP}';
	var user_list = _sys.mariaDB.getData(CTX + '/common/getEmpListWithParam.ajax', param);
	
	$('tbody#ROW_LIST_'+keyEle).html('');
	user_list.forEach((e) => {
		var sample = 
			'<tr>'
			+ '	<td>'
			+	'<span class="checkbox-radio-group">'
			+	'<label><input isone="'+isOne+'" type="checkbox" name="checkbox" id="id_cb_'+e.RN+'_'+keyEle+'" class="cls_pp_cb" onclick="cbClick(this)"></label>'
			+	'</span>'
			+ '</td>'
			+ '	<td>' + e.COMPANY_NAME + '</td>'
			+ '	<td>' + e.EMP_NAME + '</td>'
			+ '	<td>' + e.DUTY_NAME + '</td>'
			+ '</tr>';
		
		sample = $(sample).css('cursor', 'pointer').click(function(event) {
			cbClick($('input#id_cb_'+e.RN+'_'+keyEle)[0]);
		});
		
		// 프로퍼티 추가 
		$(sample).prop('info', e);
		
		// row 추가 
		$('tbody#ROW_LIST_'+keyEle).append(sample);
	});
}

function cbClick(inp){
	var attributes = inp.attributes;
	var isOne = attributes[0].name == "isone" ? attributes[0].value : "true";
	var tmpClickId = inp.id;
	if ($('#'+ tmpClickId).prop("checked")){
		$('#'+ tmpClickId).prop("checked", false);
	}else{
		$('#'+ tmpClickId).prop("checked", true);
	}
	var tmpIndex = parseInt(tmpClickId.indexOf("_", 6)) + 1; 
	//id_cb_
	var keyEle = tmpClickId.substring(tmpIndex);
	if(isOne == 'true'){
		$("#id_tbl_emp_"+keyEle+" tbody tr").each(function (i){
			var tmpChecked 	= $(this).find(".cls_pp_cb");
			var tmpCheckedId = tmpChecked[0].id;
			if(tmpCheckedId != tmpClickId){
				tmpChecked.prop("checked", false);
			}
		});
	}
}

function makeDisableButton(flag){
	var idButton = "BTN_RESET_EMP_"+key;
	var button = $("button#BTN_RESET_EMP_"+key);
	if(flag){
		button.remove();
	}else{
		if(button.length === 0){
			var sample = '<button isone="' + isOne + '" class="btn1 style2" id="' + idButton + '"><spring:message code="button.reset1" /></button>'
			$("#id_selected_emp_"+key).before(sample);
			$("button#BTN_RESET_EMP_"+key).click(function(){
				openEmpPopup(this);
			});
		}
	}
}

function getOtherPeople(keyEle){
	var strPeople = "";
	$("#id_tb_people tr").each(function (i){
		var inpEle = $(this).find("#id_people_name");
		if(inpEle && inpEle.val() != "")
		var str = inpEle.val();
		strPeople += inpEle.val() + "@!#%";
		
		makeOtherPeople(str, keyEle)
	});
	strPeople = strPeople.substring(0, strPeople.length - 4);
	return strPeople;
}

function makeOtherPeople(peopleName, keyEle){
	var idx = $('ul#id_selected_emp_'+keyEle + " li").length + 1;
	var sample = 
		  '<li>'
		+ 	'<span class="badge-custom8">'
		+		'<i class="number">'+idx+'</i>'
		+		'<span class="txt-inner">'
		+			'<em class="company"></em>'
		+			'<em class="name">'+peopleName+'</em>'
		+			'<em class="position"></em>'
		+		'</span>'
		+ 	'</span>'
		+ '</li>'; 
	
	$('ul#id_selected_emp_'+keyEle).append(sample);
}

function rmPeopleFunc(inp){
	var cntTr = $("#id_tb_people tr").length;
	if(cntTr > 1){
		var tmpTr = inp.parentNode.parentNode;
		tmpTr.remove();
	}else{
		$("#id_tb_people tr").each(function (i){
			var inpEle = $(this).find("#id_people_name");
			inpEle.val("");
		});
	}
}

function addPeopleFunc(inp){
	var sample = 
			'<tr>'
			+	'<th scope="row">성명</th>'
			+	'<td>'
			+		'<div class="register-write">'
			+			'<div class="input-group">'
			+				'<input type="text" id="id_people_name" title="모델명" placeholder="모델명" value="">'
			+			'</div>'
			+		'</div>'
			+	'</td>'
			+	'<td class="border-left txt-center">'
			+		'<button class="table-remove-btn" onclick="rmPeopleFunc(this)">'
			+			' <i class="las la-trash-alt"></i>'
			+		'</button>'
			+	'</td>'
			+ '</tr>'
			
			$("#id_tb_people").append(sample)
}

  </script>