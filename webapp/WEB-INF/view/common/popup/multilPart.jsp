<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script type="text/javascript">
var popupDrawgrid = function(formId,data){
	var mydata2 = data;
	$('#popupGrid').setViewGrid({
		id:'popupGrid',
	
		url:CTX+'/common/popup/getMultilPartPopup',  

		param : formId ,
		data:mydata2,  
		gridOptions : {width: 500, sortable:true, caption: '검색결과' ,  loadonce:true, rownumbers:false},
		colModels : [
			{name: '', id: 'SELECTED', attrType: 'checkbox', typeValue: [ { LABEL: '사용', DATA: 'Y' }, { LABEL: '미사용', DATA: 'N' } ], width: 30},
		   	{name:'ID', id :'PART_ID', width:60},
   	   		{name:'<spring:message code='title.part.PART_NM' />', id :'PART_NM', width:190, align:'left'}  , 	   	
   	   		{name:'<spring:message code='title.part.MNG_CODE' />', id :'MNG_CODE', width:190, align:'left'} ,  	   		
   	   	],
		defaultOptions:{ width:120, sortable:true},
		colspan:[],
		rowspan:[], 
		colGroup:[], 
		events:[
			{
				event:'${param.eventType}', funcName:'${param.funcname}',
				target:'${param.target}', type:'${param.type}', callback:'${param.callback}'
			}
		],
		btn:[ 
			 {button:'Select Part', func:'${param.funcname}', 'classes':'', label:'Select', target:'${param.target}', type:'${param.type}', callback:'${param.callback}'}
		]
	});
	$('.search_tbl').closest('form').find('.btm_refresh').removeClass('ac_click submit');
	return false;
}; 
function getGroups(){
	var str = '';
	if($("#FARM_ID").val() == ""){
		str = '<option value="">-- <spring:message code="title.tb.GROUP_NM" /> --</option>'
		$("#GROUP_ID").empty().val('').append(str);
	}else{
		$.ajax({
			url: CTX+'/common/getGroup.ajax',
			data: {"FARM_ID": $("#FARM_ID").val()} ,
			success: function (response) {
				console.log(response);
			
				$.each( response, function( index, obj ) {
					str += '<option value="'+obj.GROUP_ID+'">'+obj.GROUP_NM+'</option>'
					});
				
				 $("#GROUP_ID").empty().val('').append(str);
				 getGenerators();

			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}
}

function getGenerators(){
	var str = '';
	if(!$("#GROUP_ID").val() || $("#GROUP_ID").val() == ""){
		console.log("vao day");
		str = '<option value="">-- <spring:message code="title.tb.GERATOR_NM" /> --</option>'
		$("#GERATOR_ID").empty().val('').append(str);
	}else{
		$.ajax({
			url: CTX+'/common/getTurbine.ajax',
			data: {"GROUP_ID": $("#GROUP_ID").val()} ,
			success: function (response) {
				console.log(response);
				$.each( response, function( index, obj ) {
					str += '<option value="'+obj.GERATOR_ID+'">'+obj.GERATOR_NM+'</option>'
					});
				
				 $("#GERATOR_ID").empty().val('').append(str);

			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}
}
function getDetailNm(){
	var str = '';
	
	if($("#PART_NO").val() == ""){
		str = '<option value="">-- <spring:message code="title.part.DETAIL_NM" /> --</option>'
		$("#DETAIL_NM").empty().val('').append(str);
	}else{
		$.ajax({
			url: CTX+'/sys/sys_0101/getPartDetailCd.ajax',
			data: {"PART_CD": $("#PART_NO").val()} ,
			success: function (response) {
			
				$.each( response, function( index, obj ) {
					str += '<option value="'+obj.PART_CD+'">'+obj.SUF_NM+'</option>'
				});
				
				 $("#DETAIL_NM").empty().val('').append(str);

			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
	}
}
$(document).ready(function(){
	$("#FARM_ID").change(function(){
		getGroups();
		getGenerators();
	 });
	$("#GROUP_ID").change(function(){
		getGenerators();
	 });
	
	$("#PART_NO").change(function(){
		getDetailNm();
	 });
	$(document).on('click', '.btm_refresh', function() {
		$(this).closest('form').trigger('reset');
		getGroups();
		getGenerators();
		$(this).closest('form').trigger('submit');
		return false;
	});
});
function onSelectPart(btn) {
	target = '${param.target}';
		callback = '${param.callback}';
		var $target =  $('#' + target.replace('.', '\\.'));
		var checked = $('#table_popupGrid').find('input[type="checkbox"][data-checked="Y"]:checked');
	if (!checked.size()) {
		alert('<spring:message code="common.popup.popupSelectHuman.noOneSelected"/>');
		return false;
	}
	
	var text = $target.data('targettext');
	var code = $target.data('targetcode');
	var $text = $('#' + $target.data('prev'));
	var $code = $('#' + $target.data('next'));
	while ($code[0].hasChildNodes()) {  
		$code[0].removeChild($code[0].firstChild);
		}
	var dataItems = $("#table_popupGrid").getGrid().dataItems().toJSON();
	var texts = "";
	var codes = "";
	var count = 0;
	$.each(dataItems, function(index, obj) {
		var $obj = $(obj)[0];
		if ($obj.SELECTED == 'Y') {
			count++;
			if(!texts) {
				texts = $obj[text];
				
			} else {
				texts = texts + ", " + $obj[text];
			}
			if (!codes){
				codes = $obj[code];
			} else {
				codes = codes + ", " + $obj[code];
			}
			addInputPart(count,$obj[text],$code[0]);
		}
	});

		$text.val(codes).trigger('change');
		$code.val(codes).trigger('change');
		
	if(callback) eval(callback);
	destroyDialogPopup($("#table_popupGrid"));
}
var addInputPart = function(i,value,formPart) {
	    var input = document.createElement("input");
	    var inputNumber = document.createElement("input");
	    var img = document.createElement("img");
	    var br = document.createElement('br');
	    input.id = 'input-part-' + i;
	    input.type = 'text';
	    input.name = 'name';
	    input.readOnly = true;
	    input.value = value;
	    inputNumber.id = 'number-part-' + i;
	    inputNumber.type = 'number';
	    inputNumber.name = 'number';
	    inputNumber.min=1;
	    inputNumber.value=1;
	    inputNumber.className ='inputNumber';
	    img.className ='btn-img';
	    img.src='/images/minus.png';
	    img.id= 'part-' + i;
	    formPart.appendChild(input);
	    formPart.appendChild(inputNumber);
	    formPart.appendChild(img);
	    formPart.appendChild(br);
	  };
/*
 * *****************************************
 * Grid 이벤트
 * ******************************************
 */
 
//"필수적용사항"
//*********폼 다이얼로그 & 팝업 (폼에서 다이얼로그 & 팝업 뛰운 경우)
//그리드의 데이터를 모두 가지고 넘어가야할 경우
//1. 다이얼로그
function onSelectAlldialog(rowid, iRow, iCol, rowData, target,callback, obj){
	onSelectAll(rowid, iRow, iCol, rowData, target,callback, obj);
}

//2. 팝업
function onSelectAllpopup(rowid, iRow, iCol, rowData, target,callback, obj){
	window.opener.onSelectAll(rowid, iRow, iCol, rowData, target,callback, obj);
	window.close();
}

//*********그리드 다이얼로그 & 팝업 (그리드에서 다이얼로그 & 팝업 뛰운 경우)
//그리드의 데이터를 모두 가지고 넘어가야할 경우
//1. 다이얼로그
function onSelectGridAlldialog(rowid, iRow, iCol, rowData, target,callback, obj){
	onSelectGridAll(rowid, iRow, iCol, rowData, target,callback, obj);
}

//2. 팝업
function onSelectGridAllpopup(rowid, iRow, iCol, rowData, target,callback, obj){
	window.opener.onSelectGridAll(rowid, iRow, iCol, rowData, target,callback, obj);
	window.close();
}

/*
 * *****************************************
 * 폼 이벤트
 * ******************************************
 */

//조회 - search_box 전송
function doSubmit() {
	$('.form_search_box#popupDrawgrid').trigger('submit');
}

//[유형- radio] change
function changeCls() {
    $('input[name=SE_CLS]').change(function(){
        $('.form_search_box#popupDrawgrid').submit();
    });
}

// [search_box] 전체 Reset
function searchBoxReset() {
 	$('.form_search_box#popupDrawgrid').each(function() {  
        this.reset();  
    });  
 	doSubmit();
}

$(document).ready(function(){
	// [유형- radio] change
	changeCls(); 	
	
	//$('.form_search_box#popupDrawgrid').trigger('submit');
});

</script>
<div id="popup_wrapper">
	<h4><spring:message code='title.popup.generator' /></h4>
	<a2m:searchbox script="popupDrawgrid" >
	<table class="search_tbl">
			<caption>Search</caption>
			<colgroup>
				<col style="width: 100px;">
				<col style="width: auto;">
			</colgroup>
			<tbody>
				<tr>
					<th><spring:message code='title.tb.GERATOR_NM' /></th>
					<td>
						<select id="FARM_ID" class="" style="width: 25%; margin-right: 20px;"  name="search.FARM_ID">
							<option value="">-- <spring:message code='title.farm.FARM_NM' /> --</option>
							<c:forEach var="farm" items="${farms}">
								<option value="${farm.FARM_ID}"> ${farm.FARM_NM}</option>
							</c:forEach>
						</select>
						<select id="GROUP_ID" class="" style="width: 25%; margin-right: 20px;"  name="search.GROUP_ID">
							<option value="">-- <spring:message code='title.farm.group' /> --</option>
						</select>
						<select id="GERATOR_ID" class="" style="width: 25%; margin-right: 20px;"  name="search.GERATOR_ID">
							<option value="">-- Generator name --</option>
						</select>
					</td>
					
				</tr>
			</tbody>
		</table>
	
		
		
	</a2m:searchbox>
	<div id="popupGrid"> </div>
</div>	