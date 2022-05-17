<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript">

var drawgrid = function(formId,data){
	$('#grid').setViewGrid({
		id:'grid',
		seq: true,
		displayState : false ,	// CURD display여부
		pinHeader : false, 		// 컬럼고정		
		url:CTX+'/app/api/getVersionList.ajax',
		param : formId, //String type은 ID , 아무데이터도 없으면 searchbox 
		localData: data,  
		modelName : 'RESULTLIST',
		gridOptions : {
			caption: '검색결과',// text 또는 null
			loadonce:true,
			rownumber:false,
// 			height: 520
            pageable: true,
			pageSize: 10
		},
		colModels : [
   	   		{name:'VERSION_ID', id :'VERSION_ID',attrType:'text', width:200, align:'left', hidden:true},
   	   		{name:'버전 이름', id :'VERSION_NAME',width:100},
   	   		{name:'버전 넘버', id :'VERSION_NUMBER', width:100, align:'left'},  
   	 		{name:'업데이트 내용' ,id :'VERSION_CONT', hidden:true},
   	 		{name:'플랫폼' ,id :'DEVICE_TYPE',width:100,},
   	 		{name:'업로드일' ,id :'INS_DT', width:100,},
   	   	],
		defaultOptions:{ align:'center'}, 
 	 	treeview: {
 			viewField:'COMM_NM_TREE', 	// 적용될 필드
 			levField:'LEV', 							// LEVEL 필드
 			codeField:'COMM_CD', 			// 주코드
 			pcodeField:'UP_COMM_CD'		// 부모코드
 		},
		// 이벤트
		events:[
			{
				// 더블클릭 이벤트
				event: 'click',
				funcName: 'doGridClick'
			}
		], 
// 		colGroup:[{startColumnName: 'ETC1', numberOfColumns: 2, titleText: '<em>열람시작일</em>'}], 
		btn:[ 
			 {button:'excel',func:'excel',type:'inline','classes':'',label:'엑셀'}, 
		]		
	});
	return false;
 };	
 
 
//######################################### 그리드 이벤트 #########################################
//##### 그리드 더블 클릭 시 동작 이벤트
var doGridClick = function(rowid, target, callback, obj) {
	var rowData;
	// 하위코드추가 컬럼을 제외한 나머지 컬럼 클릭 시 동작
		// 그리드 더블 클릭 시
		if(rowid){
			rowData = $('#table_grid').getRowData(rowid);
			
			if(rowData){
				$.each(rowData, function(key, val){
					// key값을 통해 radio element인 것을 찾는다.
					var radioNm = $('input:radio[name="'+key+'"]').attr('name');

					// radio의 값일 경우
					if(radioNm != null) {
						$('input:radio[name="'+key+'"][value="'+val+'"]').attr("checked",true);
					}
					
					// radio가 아닌 나머지 값 셋팅
					else {
						$('[name="'+key+'"]').val(val);
					} 
				});
				// 등록, 수정여부 변경
				$('input[name="CRUD"]').val("U");
				
				// 코드입력창 비활성화
				$('#DEVICE_TYPE').attr('readonly', true);
				$('#VERSION_NAME').attr('readonly', true);
				$('#VERSION_NUMBER').attr('readonly', true);
			}
		}
};
 
 
//######################################### Form 이벤트 #########################################
//##### 초기화 또는 신규 버튼 클릭 후 처리
function searchReset(){
	// 성과항목정보 form 리셋
 	$('#saveForm1').each(function() {  
        this.reset();  
    });
	
	//****** input hidden일 경우 초기화 반영이 되지 않기 때문에 따로 초기화 해야함.
	$('input[name="CRUD"]').val('C');
	

	$('#DEVICE_TYPE').attr('readonly', false);
	$('#VERSION_NAME').attr('readonly', false);
	$('#VERSION_NUMBER').attr('readonly', false);
}

//##### 저장 전 처리 기능
// -> 저장할 데이터가 없는 경우, 중복체크 
var frontSave = function(){
	var crud = $('#CRUD').val(); // 수정여부 
	var versionID = $('#VERSION_ID').val(); // 입력한 공통코드

};
//##### 삭제 전 처리 기능
//-> 삭제할 데이터가 없는 경우
var frontDelete = function(){
	var crud = $('#CRUD').val(); // 수정여부
	
	// 이미 존재하는 데이터인 경우
	if(crud == "U"){
		$('#btnDelete').addClass('ac_click submit'); // 삭제버튼 class 추가
																								// ac_click submit이 존재해야 domController -> $(document).on('click','.ac_click.submit',function(){ 실행됨
	}else {
		$('#btnDelete').removeClass('ac_click submit'); // 삭제버튼 class 제거 (이전 작업 후 ac_click submit가 남아 있을 수 있으므로 )
		alert("저장된 데이터가 아니므로 삭제할 수 없습니다.");
	}
};

//##### form submit 후 처리(저장, 삭제 후처리)
function saveCallbackFunc(form, data){
	searchReset();	// 코드정보 초기화
	drawgrid();  	// 그리드 reflesh
} 

//######################################### DOM이 생성되면 ready 메소드를 실행한다. //#########################################
$(document).ready(function(){
	/*
		// TO-DO : 등록, 수정, 삭제 메시지 처리는 추후 반영(공통에서)
	*/
	var action;
	// ##### 삭제버튼 클릭시 ajax action 변경
	$('#btnDelete').click(function() {
		action = '${formPath }/delete.ajax';
		$("#saveForm1").attr("action", action);
	});
	$('#btnDelete').click(function() {
		action = '${formPath }/delete.ajax';
		$("#saveForm1").attr("action", action);
	});
	// ##### 저장버튼 클릭시 ajax action 변경
	$('#btnSave').click(function() {
		if($('#CRUD').val() == 'U') {
			action = '${formPath }/update.ajax';
		} else {
			action = '${formPath }/save.ajax';
		}
		$("#saveForm1").attr("action", action);
	});
	
	
	// ##### 저장버튼 클릭시 ajax action 변경
// 	$('#grid1').on('change','.k-widget.k-combobox',function() {  
// 		alert();
// 	}) 
	
	
	
});
</script>

<div class="search">
	<a2m:searchbox script="drawgrid" initenable="true"> 
		<table class="search_tbl">
			<caption>Search</caption>
			<colgroup>
				<col style="width:140px;" />
				<col style="width:auto;" />
			</colgroup>
			<tbody>
				<tr>
					<th><label>플랫폼</label></th>
					<td>
						<a2m:combo id="DEVICE_TYPE" type="fixed" cls="DEVICE_TYPE" defaultValue="" defaultText="전체"/>
					</td>
				</tr>
			</tbody>
		</table>	
	</a2m:searchbox>	
</div>
	
<div class="layout clearfix">
	<div class="fl" style="width:500px;">
		<div id="grid" style="width:100%;"></div>
	</div>
	<div class="full_fr">
		<div class="group">
			<form:form action="${formPath }/save.ajax" id="saveForm1" data-func="saveAjax"  data-callback="saveCallbackFunc">
			<div class="group_title">
				<strong class="g_title">버전 정보</strong>
				<div class="g_title_btn">
					<span class="btn bg_gray ico c7" onclick="searchReset()">신규</span>
					<span id="btnSave" class="btn bg_orange ico g8 ac_click submit" onclick="frontSave()">저장</span> 
					<span id="btnDelete" class="btn bg_gray ico l7" onclick="frontDelete()">삭제</span>
				</div>
			</div>
			<div class="group_content">
				<table id="codeInfo" class="write_tbl"  style="width: 100%;" summary="코드정보">
					<caption>버전 정보</caption>
					<colgroup>
						<col width="15%">
						<col width="35%">
						<col width="15%">
						<col width="35%">
					</colgroup>
					<tbody>
						<tr>
							<th>플랫폼</th> 
							<td colspan="3">
								<a2m:combo id="DEVICE_TYPE" type="fixed" cls="DEVICE_TYPE" defaultValue="" defaultText="전체"/>
								
								<input type="hidden" id="VERSION_ID" name="VERSION_ID" value="">
														
								<!-- 등록/수정여부 -->
								<input type="hidden" id="CRUD" name="CRUD" value="">
							</td>
						</tr>				
						<tr> 
							<th>버전 이름</th>
							<td colspan="3">
								<input type="text" id="VERSION_NAME" name="VERSION_NAME"  style="width: 95%;" value="">
							</td>
						</tr>
						<tr>
							<th>버전 넘버</th>
							<td colspan="3">
								<input type="text" id="VERSION_NUMBER" name="VERSION_NUMBER"  style="width: 95%;" value="">
							</td>
						</tr>
						<tr>
							<th>설명</th>
							<td colspan="3">
								<textarea id="VERSION_CONT" name="VERSION_CONT" style="width: 99%; height: 100px; resize:none;"></textarea>
							</td>
						</tr>
					</tbody> 
				</table>
			</div>
			</form:form>
		</div>
	</div>
</div>

	
	
