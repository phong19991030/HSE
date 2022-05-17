/*	
 * 	######## Selector ##########################################
 * 	## MAIN
 *	span#RPT_NM				: 보고서 제목
 *	span#TURBINE		  	: 발전기 이름
 *	span#COMPANY		   	: 유지보수사?? 운영사?? 이름
 *	span#RPT_TIME			: 보고서 시간 
 *	span#RPT_TOTAL_TIME	 	: 총 보고서 시간
 *  span#WORKERS			: 작업자
 *  span#REGISTRATOR		: 작성자
 *  
 *  
 *  div#ISSUE				: 이슈 내용
 *  div#PURPOSE				: 목적 내용
 *   
 *  span#modify_btn			: 수정 버튼 
 *  span#delete_btn			: 삭제 버튼
 *  
 *  ######## Parameter ##########################################
 *  # parameter
 *  DATA.RPT_ID 
 *  DATA.USER_UID
 *  PAGE_TITLE
 *  
 *  ######## Function ###########################################
 *  
 *  oam0402 		: 초기화 
 */
function oam0402() {
	
	// 데이터 조회
	var data = _oam.mariaDB.getData('/oam2/oam_0400/reportDetail/getChklstReportInfo.ajax', {
		RPT_ID: $('input#RPT_ID').val(),
	});
	// 데이터 없을 경우 return 
	if(!data) return;
	
	// 작성자와 사용자의 UID가 다를 경우 삭제, 수정 불가
	if(data.INS_ID != _CLIENT.USER_UID) {
		// 수정, 삭제 버튼 삭제 
		$('span#modify_btn').remove();
		$('span#delete_btn').remove();
	} else {
		// 수정 버튼 클릭 이벤트
		$('span#modify_btn').click(function() {
			if($('input#EVENT_ID').val()) window.location = ctx + '/oam2/oam_0400/reportModify?RPT_ID=' + $('input#RPT_ID').val() + '&EVENT_ID=' + $('input#EVENT_ID').val();
			else window.location = ctx + '/oam2/oam_0400/reportModify?RPT_ID=' + $('input#RPT_ID').val();
		});
		
		// 삭제 버튼 클릭 이벤트
		$('span#delete_btn').click(function() {
			// 삭제 컨펌 여부
			if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			// 삭제 요청
			var result = _oam.mariaDB.getData(ctx + '/oam2/oam_0400/reportDetail/deleteReport.ajax', {
				RPT_ID: $('input#RPT_ID').val(),
			});
			console.log(result);
			// 삭제 성공
			if(result.IS_DELETE_RPT) {
				alert(_MESSAGE.common.deleteSuccess);
				window.location = ctx + '/oam2/oam_0400/main';
			} 
			// 삭제 실패
			else {
				alert(_MESSAGE.common.deleteFail);
			}
		});
	}
	
	// 데이터 변환  
	console.log(data);
	data = _oam.convertData.RPT_CHKLST(data);
	console.log(data);
	
	// OverView
	$('span#RPT_NM').text(data.RPT_NM);
	$('span#TURBINE').text(data.POSITION);
	$('span#COMPANY').text(data.COMPANY_NM);
	$('span#RPT_TIME').text(data.START_TIME + ' ~ ' + data.END_TIME);
	$('span#RPT_TOTAL_TIME').text(_oam.toStringTimeDiff({START: data.START_TIME, END: data.END_TIME}));
	$('span#WORKERS').text(data.WORKER_LIST.map((e) => e.WORKER_NM).join(', '));
	$('span#REGISTRATOR').text(data.USER_ID);
	
	// SAFETY
	$('div#SAFETY').append('<p>' + data.SAFETY.split('\n').join('</p><p>') + '</p>');
	// OVERVIEW
	$('div#OVERVIEW').append('<p>' + data.OVERVIEW.split('\n').join('</p><p>') + '</p>');
	
	// CHECKLIST
	data.CHECK_LIST.forEach((e) => {
		var sample = _oam_elements.oam_0402.main.tr_checklist_row({
			ID: e.CHK_TEMP_ID,
			CHK_NO: e.CHK_NO,
			CHK_ITEM: e.CHK_ITEM,
			CHK_DETAIL: e.CHK_DETAIL,
			GROUP_NUM: e.GROUP_NUM,
			GROUP_CNT: e.GROUP_CNT,
			IS_REMARK: e.IS_REMARK === 'Y',
			CHK: e.CHK,
			RMK: e.RMK,
		});
		$('tbody#CHECK_LIST').append(sample);
	});
}