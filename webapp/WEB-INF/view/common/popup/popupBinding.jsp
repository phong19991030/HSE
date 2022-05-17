<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script type="text/javascript">
var popupBindingDrawgrid = function(formId,data){
	
	// 조직도
	$('#popupBinding').setViewGrid({
	    
	    id : 'grid',
		type : 'crud',
		// defaultAttrType: 'readonlytext',
		pinHeader : true, //헤더고정 설정  
		url : CTX + '/common/popup/getDataBindingPopup.ajax',
		param : formId,
		localData : data,
		data : data,
		modelName : 'RESULTLIST',
		gridOptions : {
			caption : '검색결과',
			loadonce : true,
			rownumbers : true,
			height: 400
		},
		colModels :
		[ 
			{ name : '<spring:message code='title.binding.type' />', id : 'DCMN_TP', width : 100, hidden:true },
			{ name : '<spring:message code='title.binding.name' />', id : 'DCMN_NM', width : 200 },
			{ name : '<spring:message code='title.binding.option' />', id : 'PUB_YN', width : 80, hidden:true },
			{ name : '<spring:message code='title.binding.Term' />', id : 'PRSV_TERM', width : 150},
			{ name : '<spring:message code='title.binding.closeDate' />', id : 'CLOS_DT', width : 150, hidden:true},
			{ name : '<spring:message code='title.binding.manager' />', id : 'OWN_USER', width : 150, hidden: true},
			{ name : '<spring:message code='title.binding.dept' />', id : 'DEPT_NM', width : 150},
			{ name : '<spring:message code='title.binding.deptCD' />', id : 'DEPT_CD', width : 150, hidden: true},
			{ name : '<spring:message code='title.binding.businessUnit' />', id : 'BU_NO', width : 150, hidden: true},
			{ name : '<spring:message code='title.binding.businessUnit' />', id : 'BU_NM', width : 150},
//			{ name : '<spring:message code='title.binding.deptCD' />', id : 'OWN_USER', width : 150},
		],

		//callback: 'readOnlyStyle', 
		//boundEvent : 'readOnlyStyle',
		defaultOptions : {
			align : 'left',
			width : 180,
			title : false,
			sortable : false
		},
		// 이벤트
		events : [{
	                event: 'click',
	                funcName: 'onSelectDept'
	            }],
		colspan : [],
		rowspan : [],
		colGroup : [],
		btn:[{}],
		events:[{
			event:'${param.eventType}', funcName:'${param.funcname}',
			target:'${param.target}', type:'${param.type}', callback:'${param.callback}'
		}]
	});
};

/*
 * *****************************************
 * Grid 이벤트
 * ******************************************
 */

// "필수적용사항"
// *********폼 다이얼로그 & 팝업 (폼에서 다이얼로그 & 팝업 뛰운 경우)
// 그리드의 데이터를 모두 가지고 넘어가야할 경우
// 1. 다이얼로그
function onSelectAllmemberdialog(rowid, iRow, iCol, rowData, target,callback, obj){
	onSelectAll(rowid, iRow, iCol, rowData, target,callback, obj);
}

//2. 팝업
function onSelectAllmemberpopup(rowid, iRow, iCol, rowData, target,callback, obj){
	window.opener.onSelectAll(rowid, iRow, iCol, rowData, target,callback, obj);
	window.close();
}

//*********그리드 다이얼로그 & 팝업 (그리드에서 다이얼로그 & 팝업 뛰운 경우)
// 그리드의 데이터를 모두 가지고 넘어가야할 경우
// 1. 다이얼로그
function onSelectGridAllmemberdialog(rowid, iRow, iCol, rowData, target,callback, obj){
	onSelectGridAll(rowid, iRow, iCol, rowData, target,callback, obj);
}

// 2. 팝업
function onSelectGridAllmemberpopup(rowid, iRow, iCol, rowData, target,callback, obj){
	window.opener.onSelectGridAll(rowid, iRow, iCol, rowData, target,callback, obj);
	window.close();
}


/*
 * *****************************************
 * Form 이벤트
 * ******************************************
 */
 
//조회 - search_box 전송
function doPopupSearch() {
	$('#popupBindingDrawgrid').trigger('submit');
}

$(document).ready(function(){

// 	popupBindingDrawgrid();
	
}); 

</script>

<div id="popup_wrapper" style="width: autox;">
	<a2m:searchbox script="popupBindingDrawgrid" initenable="true">
		<input name="DELEGATE" hidden value="${DATA}">
		<table class="search_tbl" style="max-width: 100%;">
			<caption>Search</caption>
			<colgroup>
				<col style="width: 120px;">
				<col style="width: auto;">
				<col style="width: 120px;">
				<col style="width: auto">
				<col style="width: 120px;">
				<col style="width: auto">
				<col style="width: 120px;">
				<col style="width: auto">
			</colgroup>
			<tbody>
				<tr>
					<th><label for="search.DCMN_NM"><spring:message code='title.binding.name' /></label></th>
					<td><input class="w150px" type="text" name="search.DCMN_NM" id="search.DCMN_NM"></td>
					
<%-- 					<th><label for="search.PUB_YN"><spring:message code='title.binding.option' /></label></th> --%>
<!-- 					<td> -->
<!-- 						<select id="search.PUB_YN"  name="search.PUB_YN" style="width: 140px"> -->
<!-- 							<option value="">-----</option> -->
<%-- 							<option value="Y"><spring:message code='title.binding.option_Y' /></option> --%>
<%-- 							<option value="N"><spring:message code='title.binding.option_N' /></option> --%>
<!-- 						</select> -->
<!-- 					</td> -->

					<th><label for="search.CLOS_DT"><spring:message code='title.binding.closeDate' /></label></th>
					<td><span class="inp_cal"><input class="datepicker" fpattern="date" id="search.CLOS_DT" name="search.CLOS_DT" /></span></td>
					
					<th><label for="PRSV_TERM"><spring:message	code='title.binding.Term'/></label></th>
					<td><input type="text" id="PRSV_TERM" name="search.PRSV_TERM" /></td>
				</tr>
				
				<tr>
					<c:if test="${empty DATA.BU_NO}">
						<th><label for="search.BU_NO"><spring:message code='title.binding.businessUnit' /></label></th>
						<td>
							<!-- <input id='search.BU_NO' name="search.BU_NO"  type="text"/> -->
							<a2m:choiceInputForm id="search.BU_NO" cls="businessUnit" type="dialog" codeFieldName="DCMN_CLS_MNG_NO" codeTargetName="search.BU_NO" 
							textFieldName="HND_SCT_NM" textTargetName="search.HND_SCT_NM" eventType="click" funcname="onSelect" params="" width="700" height="820" codeView="true" />
						</td>
					</c:if>
					<c:if test="${not empty DATA.BU_NO}">
						<input id='search.BU_NO' name="search.BU_NO" hidden value="${DATA.BU_NO}" type="text"/>
					</c:if>

					<th><label for="search.CLOS_YN"><spring:message code='title.binding.CLOS_YN' /></label></th>
					<td><input id='search.CLOS_YN' name="binding.CLOS_YN"  type="checkbox"/></td>
					
					<th><label for="search.OWN_USER"><spring:message code='title.binding.manager'/></label></th>
<!-- 					<td><input type="text" id="OWN_USER" name="binding.OWN_USER" /></td> -->
					<td>	<a2m:choiceInputForm id="search.OWN_USER" cls="empl" type="dialog" 
											 codeFieldName="USER_UID" codeTargetName="search.OWN_USER"
											 textFieldName="USER_NM" textTargetName="search.OWN_USER_NM"
											 eventType="click" funcname="onSelect" params=""
											 codeView="true" /></td>
				
					<c:if test="${empty DATA.DEPT_CD}">
						<th><label for="search.DEPT_CD"><spring:message code='title.binding.dept' /></label></th>
						<td><a2m:choiceInputForm id="DEPT_CD" cls="depart" type="dialog"
												 codeFieldName="DEPT_CD" codeTargetName="search.DEPT_CD"
												 textFieldName="DEPT_NM" textTargetName="search.DEPT_NM" width="800" height="600"
												 eventType="click" funcname="onSelect" params=""
												 codeView="true" />
												</td>
					</c:if>
					<c:if test="${not empty DATA.DEPT_CD}">
							<input type="text" id="dept" hidden name="search.DEPT_CD" value="${DATA.DEPT_CD}" class="w150">
					</c:if>
				</tr>
			</tbody>
		</table>
		<input hidden name="search.POPUP" value="TRUE">
	</a2m:searchbox>


	<div class="clear">
		<div>
			<div id="popupBinding" style="width: 100%;"></div>
		</div>
<!-- 		<div class="ft_right" style="width: 72%"> -->
<!-- 			<div id="popupEmpGrid2" style="width: 100%;"></div> -->
<!-- 		</div> -->
	</div>
</div>
