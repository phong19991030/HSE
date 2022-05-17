<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>


<%-- <c:if test="${param.CRUD eq 'C'}"> --%>
	<div class="btn-wrap">
		<button class="btn1" id="BTN_POPUP_EMP_${param.key}" onclick="openPerEquipPopup(this)"><spring:message code="button.setting" /></button>
	</div>
<%-- </c:if> --%>

<div class="btn-wrap check-selected-wrap" id="id_div_emp_${param.key}" style="display: none;">
	<button class="btn1 style2" id="BTN_RESET_EMP_${param.key}" onclick="openPerEquipPopup(this)"><spring:message code="button.reset1" /></button>
	<ul id="id_selected_emp_${param.key}">
	</ul>
</div>

<div class="layer-popup" id="layer-popup_${param.key}">
    <div class="popup-cont" style="min-width: 260px;">

      <h2 class="heading4">개인보호장비 설정</h2>

      <h3 class="heading5">장비 목록</h3>
      <div class="base-table">
        <table id="id_tbl_emp_${param.key}">
          <caption></caption>
          <colgroup>
            <col style="width: 10%;">
            <col style="width: 90%;">
          </colgroup>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">장비명</th>
            </tr>
          </thead>
          <tbody id="ROW_LIST_${param.key}">
            
          </tbody>
        </table>
      </div>

      <div class="foot-btn-area">
        <button class="btn-style1" id='id_btn_save_${param.key}' onclick="savePopupPersEquipment(this)">
          <i class="las la-edit"></i><span class="name">등록</span>
        </button>
      </div>

      <button type="button" class="popup-close-btn">
        <i class="xi-close"></i>
      </button>
    </div>
  </div>
  
  <script>

var strEmpId = "${param.strEmpId}";
var CRUD = "${param.CRUD}";

$(document).ready(function(){

});

 function getPersEquipmentInfo(key, parentPerEquipId){
	var param = {}
	if(parentPerEquipId){
		param.strUid = parentPerEquipId;
	}else{
		param.strUid = strEmpId;
	}
	var PersEquipmentInfo = _sys.mariaDB.getData(CTX + '/common/getPersEquipmentWithComcd.ajax', param);
	
	var cnt = 0;
	PersEquipmentInfo.forEach((e) => {
		cnt++;
		var persEquipment = {};
		persEquipment.idx = cnt;
		persEquipment.COMM_CD = e.COMM_CD;
		persEquipment.COMM_NM = e.COMM_NM;
		makeSelectedPersEquipment(persEquipment, key)
	});
	
	controlShowPerEquipment(cnt, key);
	
} 

function makeSelectedPersEquipment(info, keyEle){
	
	var sample = 
		  '<li>'
		+ 	'<span class="badge-custom8">'
		+		'<i class="number">'+info.idx+'</i>'
		+		'<span class="txt-inner">'
		+			'<em class="position">'+info.COMM_NM+'</em>'
		+		'</span>'
		+ 	'</span>'
		+ '</li>';
	
	sample = $(sample).css('cursor', 'pointer').click(function(event) {
	});
	
	// row 추가 
	$('ul#id_selected_emp_'+keyEle).append(sample);
} 

function savePopupPersEquipment(inp){
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
			makeSelectedPersEquipment(info, keyEle);
			strUId += info.COMM_CD + ",";
		}
	});
	if(cnt > 0){
		strUId = strUId.substring(0, strUId.length - 1);
	}
	$('div#layer-popup_'+keyEle).attr('class', 'layer-popup');
	document.getElementById("id_emp_str_uid_"+keyEle).value = strUId;
	controlShowPerEquipment(cnt, keyEle);
	
	return strUId;
}

function controlShowPerEquipment(cnt, keyEle){
	if(cnt > 0){
		$("#id_div_emp_"+keyEle).css("display", "flex");
		$("#BTN_POPUP_EMP_"+keyEle).css("display", "none");
	}else{
		$("#id_div_emp_"+keyEle).css("display", "none");
		$("#BTN_POPUP_EMP_"+keyEle).css("display", "block");
	}
}

function openPerEquipPopup(inp){
	var tmpEleId = inp.id;
	//BTN_POPUP_EMP_
	//BTN_RESET_EMP_
	var keyEle = tmpEleId.substring(14);
	
	$('div#layer-popup_'+keyEle).attr('class', 'layer-popup active');
	
	$('input#id_pp_emp_name_'+keyEle).keypress(function(e){
		if(e.keyCode === 13){
			onSearchPerEquipFunc1(this);
		}
	});
	onSearchPerEquipFunc1(inp);
}

function onSearchPerEquipFunc1(inp) {
	var tmpEleId = inp.id;
	//id_btn_search_
	var keyEle = tmpEleId.substring(14);
	
	var param = {};
	var ppe_list = _sys.mariaDB.getData(CTX + '/common/getPersEquipmentList.ajax', param);
	
	$('tbody#ROW_LIST_'+keyEle).html('');
	ppe_list.forEach((e) => {
		var sample = 
			'<tr>'
			+ '	<td>'
			+	'<span class="checkbox-radio-group">'
			+	'<label><input type="checkbox" name="checkbox" id="id_cb_'+e.RN+'_'+keyEle+'" class="cls_pp_cb"></label>'
			+	'</span>'
			+ '</td>'
			+ '	<td>' + e.COMM_NM + '</td>'
			+ '</tr>';
		
		sample = $(sample).css('cursor', 'pointer').click(function(event) {
			var cb = $(this).find(".cls_pp_cb");
			if(cb[0].checked){
				$('#id_cb_'+e.RN+'_'+keyEle).prop("checked", false);
			}else{
				$('#id_cb_'+e.RN+'_'+keyEle).prop("checked", true);
			}
		});
		
		// 프로퍼티 추가 
		$(sample).prop('info', e);
		
		// row 추가 
		$('tbody#ROW_LIST_'+keyEle).append(sample);
	});
}

  </script>