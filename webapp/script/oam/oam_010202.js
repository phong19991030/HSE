
/*	
 * 	######## Selector ##########################################
 * 	## MAIN
 * 	
 *  span#PLAN_NM_EN	: 계획 제목 (영어)
 *  span#PLAN_NM	: 계획 제목 (한글)
 *  
 *  span#GERATOR_NM	: 발전기 이름
 *  span#COMPANY_NM	: 회사 이름
 *  
 *  span#PLAN_TIME		: 계획 종료 시간 
 *  span#PLAN_TOTAL_TIME: 총 작업 시간 
 * 
 * 	div#summary_form	: 본문 폼
 *  
 *  tbody#part_list 	: 부품 리스트  
 *	
 * 	tbody#tool_list		: 도구 리스트
 *  
 *  tbody#ppe_list		: PPE 리스트 
 *  
 *  tbody#work_list		: 작업 리스트
 *  
 *  span#modify_btn		: 수정 버튼
 *  span#delete_btn		: 삭제 버튼
 *  a#cancel_btn		: 취소 버튼
 *  
 *  ######## Parameter ##########################################
 *  # parameter
 *  input#EVENT_ID 		: 이벤트 ID
 *  input#PLAN_ID		: 계획 ID
 *  
 *  
 *  ######## Function ###########################################
 *  oam010202 		: 초기화 
 *  
 */
function oam010202() {
	
	// 데이터 조회
	var data = _oam.mariaDB.getData('/oam2/oam_0100/02/planDetail/getPlanInfo.ajax', {
		EVENT_ID: $('input#EVENT_ID').val(),
		PLAN_ID: $('input#PLAN_ID').val(),
	});
	if(!data) return;
	
	// 작성자와 사용자의 UID가 다를 경우, 컨펌 된 계획 일 경우 삭제, 수정 불가 
	if(data.INS_ID != _CLIENT.USER_UID || data.APL_YN == 'Y') {
		// 수정, 삭제 버튼 삭제 
		$('span#modify_btn').remove();
		$('span#delete_btn').remove();
	} else {
		// 수정 버튼 클릭 이벤트
		$('span#modify_btn').click(function() {
			window.location = ctx + '/oam2/oam_0100/02/planModify?EVENT_ID=' + $('input#EVENT_ID').val() + '&PLAN_ID=' + $('input#PLAN_ID').val();
		});
		// 삭제 버튼 클릭 이벤트
		$('span#delete_btn').click(function() {
			// 삭제여부 컨펌
			if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			// 삭제 요청
			var result = _oam.mariaDB.getData('/oam2/oam_0100/02/planDetail/deletePlan.ajax', {
				EVENT_ID: $('input#EVENT_ID').val(),
				PLAN_ID: $('input#PLAN_ID').val(),
			});
			console.log(result);
			// 삭제 성공
			if(result.CNT > 0) {
				alert(_MESSAGE.common.deleteSuccess);
				window.location = ctx + '/oam2/oam_0100/02/planList?EVENT_ID=' + $('input#EVENT_ID').val();
			} 
			// 삭제 실패
			else {
				alert(_MESSAGE.common.deleteFail);
			}
			
		});
	}
	
	// 데이터 변환
	console.log(data);
	data = _oam.convertData.PLAN(data);
	console.log(data);
	
	// REPORT NAME
	//$('span#PLAN_NM_EN').text(data.PLAN_NM_EN);
	$('span#PLAN_NM').text(data.PLAN_NM);
	// WTG NAME
	$('span#GERATOR_NM').text(data.GERATOR_NM);
	// COMPANY NAME
	$('span#COMPANY_NM').text(data.OPERATOR_NM);
	
	// PLAN TIME
	// 계획 시작, 종료 시간 표기 
	$('span#PLAN_TIME').text(data.PLAN_START_TIME + ' ~ ' + data.PLAN_END_TIME);
	// 총 계획 시간 표시 
	$('span#PLAN_TOTAL_TIME').text(_oam.toStringTimeDiff({START:data.PLAN_START_TIME, END:data.PLAN_END_TIME}));
	
	// PART
	$('#part_list').html('');
	data.PART_LIST.forEach((e) => {
		var sample = _oam_elements.oam_010202.main.tr_item_row({
			CATEGORY: e.CATEGORY,
			ITEM_NM: e.ITEM_NM,
			COST: '$ '+ e.COST,
			STATUS: e.STATUS,
			START_TIME: e.START_TIME,
			END_TIME: e.END_TIME,
		});
		$('#part_list').append(sample);
	});
	
	// TOOL
	$('#tool_list').html('');
	data.TOOL_LIST.forEach((e) => {
		var sample = _oam_elements.oam_010202.main.tr_item_row({
			CATEGORY: e.CATEGORY,
			ITEM_NM: e.ITEM_NM,
			COST: '$ '+ e.COST,
			STATUS: e.STATUS,
			START_TIME: e.START_TIME,
			END_TIME: e.END_TIME,
		});
		$('#tool_list').append(sample);
	});
	
	// PPE
	$('#ppe_list').html('');
	data.PPE_LIST.forEach((e) => {
		var sample = _oam_elements.oam_010202.main.tr_item_row({
			CATEGORY: e.CATEGORY,
			ITEM_NM: e.ITEM_NM,
			COST: '$ '+ e.COST,
			STATUS: e.STATUS,
			START_TIME: e.START_TIME,
			END_TIME: e.END_TIME,
		});
		$('#ppe_list').append(sample);
	});
	
	// WORK
	$('#WORK_LIST').html('');
	data.WORK_LIST.forEach((e) => {
		var sample = _oam_elements.oam_010202.main.div_work_row({
			ID: e.SCHED_ID,
			WORK_TITLE: e.WORK_TITLE,
			WORK_DETAIL: '<p>' + e.WORK_DETAIL.split('\n').join('</p><p>') + '</p>',
			WORK_COST: e.WORK_COST,
			START_TIME: e.START_TIME,
			END_TIME: e.END_TIME,
		});
		$('#WORK_LIST').append(sample);
		// WORKER
		e.WORKER.forEach((e2) => {
			var worker = _oam_elements.oam_010202.main.tr_worker_row({
				COMPANY_NM: e2.COMPANY_NM, 
				USER_NM: e2.USER_NM,
			});
			
			$('#WORKER_LIST_' + e.SCHED_ID).append(worker);
		});
		
	});
	
}

