
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
 *  tbody#ISSUE_FILE_LIST 	: 이슈 첨부파일 리스트 
 *  
 *  
 *  div#PURPOSE				: 목적 내용
 *  tbody#PURPOSE_FILE_LIST	: 목적 첨부파일 리스트 
 *  
 *  div#CONCLUSION			: 결론 내용 
 *  
 *  
 *  tbody#PART_LIST			: 부품 리스트
 *  
 *  tbody#TOOL_LIST			: 도구 리스트
 *  
 *  tbody#PPE_LIST			: PPE 리스트
 *  
 *  div#WORK_LIST			: 작업 리스트
 *  
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
 *  oam0202 		: 초기화 
 *  
 */
/* 초기화 */
function oam0202(){ 
	// 데이터 조회
	var data = _oam.mariaDB.getData('/oam2/oam_0200/reportDetail/getProcReportInfo.ajax', {
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
			if($('input#EVENT_ID').val()) window.location = ctx + '/oam2/oam_0200/reportModify?RPT_ID=' + $('input#RPT_ID').val() + '&EVENT_ID=' + $('input#EVENT_ID').val();
			else window.location = ctx + '/oam2/oam_0200/reportModify?RPT_ID=' + $('input#RPT_ID').val(); 
		});
		
		// 삭제 버튼 클릭 이벤트
		$('span#delete_btn').click(function() {
			// 삭제여부 컨펌
			if(!confirm(_MESSAGE.common.deleteConfirm)) return;
			// 삭제 요청
			var result = _oam.mariaDB.getData('/oam2/oam_0200/reportDetail/deleteReport.ajax', {
				RPT_ID: $('input#RPT_ID').val(),
			});
			console.log(result);
			// 삭제 성공
			if(result.IS_DELETE_RPT) {
				alert(_MESSAGE.common.deleteSuccess);
				window.location = ctx + '/oam2/oam_0200/main';
			} 
			// 삭제 실패
			else {
				alert(_MESSAGE.common.deleteFail);
			}
		});
	}
	
	// 데이터 변환 
	console.log('변환 전', data);
	data = _oam.convertData.RPT_PROC(data);
	console.log('변환 후', data);
	
	// OverView
	$('span#RPT_NM').text(data.RPT_NM);
	$('span#TURBINE').text(data.POSITION);
	$('span#COMPANY').text(data.COMPANY_NM);
	$('span#RPT_TIME').text(data.START_TIME + ' ~ ' + data.END_TIME);
	$('span#RPT_TOTAL_TIME').text(_oam.toStringTimeDiff({START: data.START_TIME, END: data.END_TIME}));
	$('span#WORKERS').text(data.WORKER_LIST.map((e) => e.WORKER_NM).join(', '));
	$('span#REGISTRATOR').text(data.USER_ID);
	
	// ISSUE
	$('div#ISSUE').append('<p>' + data.ISSUE.split('\n').join('</p><p>') + '</p>');
	data.ISSUE_FILE_LIST.forEach((e) => {
		var sample= _oam_elements.oam_0202.main.tr_file_row({
			ID: e.ATCH_FLE_SEQ,
			TYPE: e.TYPE,
			FILE_NAME: e.FLE_NM.substring(0, e.FLE_NM.lastIndexOf('.')),
			FILE_EXTENSION: e.FLE_NM.substring(e.FLE_NM.lastIndexOf('.')),
			FILE_SIZE: _oam.returnFileSize(parseInt(e.FLE_SZ)),
			FILE_INFO: e.FILE_INFO,
			SRC: ctx + '/oam2/oam_0200/imageView' + e.FLE_PATH + '/' + e.NEW_FLE_NM
			//e.NEW_FLE_NM.substring(0, e.FLE_NM.lastIndexOf('.')) + '.' + e.FLE_TP
			//SRC: ctx + '/oam2/oam_0200/imageView/' + e.FLE_PATH.replaceAll('/', '%2F') + '/' + e.NEW_FLE_NM
		});
		$('tbody#ISSUE_FILE_LIST').append(sample);
	});
	// ISSUE 첨부파일이 없을 경우, 
	if(data.ISSUE_FILE_LIST.length === 0) $('tbody#ISSUE_FILE_LIST').append(_oam_elements.oam_0202.main.tr_nofile_row({TEXT: 'No File'})); 
	
	
	// PURPOSE
	$('div#PURPOSE').append('<p>' + data.PURPOSE.split('\n').join('</p><p>') + '</p>');
	data.PURPOSE_FILE_LIST.forEach((e) => {
		var sample= _oam_elements.oam_0202.main.tr_file_row({
			ID: e.ATCH_FLE_SEQ,
			TYPE: e.TYPE,
			FILE_NAME: e.FLE_NM.substring(0, e.FLE_NM.lastIndexOf('.')),
			FILE_EXTENSION: e.FLE_NM.substring(e.FLE_NM.lastIndexOf('.')),
			FILE_SIZE: _oam.returnFileSize(parseInt(e.FLE_SZ)),
			FILE_INFO: e.FILE_INFO,
			SRC: ctx + '/oam2/oam_0200/imageView' + e.FLE_PATH + '/' + e.NEW_FLE_NM
			//e.NEW_FLE_NM.substring(0, e.FLE_NM.lastIndexOf('.')) + '.' + e.FLE_TP
			//SRC: ctx + '/oam2/oam_0200/imageView/' + e.FLE_PATH.replaceAll('/', '%2F') + '/' + e.NEW_FLE_NM
		});
		$('tbody#PURPOSE_FILE_LIST').append(sample);
	});
	// PURPOSE 첨부파일이 없을 경우, 
	if(data.PURPOSE_FILE_LIST.length === 0) $('tbody#PURPOSE_FILE_LIST').append(_oam_elements.oam_0202.main.tr_nofile_row({TEXT: 'No File'}));
	
	// CONCLUSION 
	$('div#CONCLUSION').append('<p>' + data.CONCLUSION.split('\n').join('</p><p>') + '</p>');
	
	// PART
	data.PART_LIST.forEach((e) => {
		var sample = _oam_elements.oam_0202.main.tr_item_row({
			CATEGORY: e.CODE + ' ' + e.CATEGORY,
			ITEM_NM: e.ITEM_NM,
			RETURN_YN: e.STATE === 'U' ? true : false,
		});
		$('tbody#PART_LIST').append(sample);
	});
	// PART 없을 경우,
	if(data.PART_LIST.length === 0) $('tbody#PART_LIST').append(_oam_elements.oam_0202.main.tr_noitem_row({TEXT: 'No Part'}));
	
	// TOOL
	data.TOOL_LIST.forEach((e) => {
		var sample = _oam_elements.oam_0202.main.tr_item_row({
			CATEGORY: e.CODE + ' ' + e.CATEGORY,
			ITEM_NM: e.ITEM_NM,
			RETURN_YN: e.STATE === 'U' ? true : false,
		});
		$('tbody#TOOL_LIST').append(sample);
	});
	// TOOL 없을 경우,
	if(data.TOOL_LIST.length === 0) $('tbody#TOOL_LIST').append(_oam_elements.oam_0202.main.tr_noitem_row({TEXT: 'No Tool'}));
	
	// PPE
	data.PPE_LIST.forEach((e) => {
		var sample = _oam_elements.oam_0202.main.tr_item_row({
			CATEGORY: e.CODE + ' ' + e.CATEGORY,
			ITEM_NM: e.ITEM_NM,
			RETURN_YN: e.STATE === 'U' ? true : false,
		});
		$('tbody#PPE_LIST').append(sample);
	});
	// PPE 없을 경우,
	if(data.PPE_LIST.length === 0) $('tbody#PPE_LIST').append(_oam_elements.oam_0202.main.tr_noitem_row({TEXT: 'No PPE'}));
	
	// WORK
	data.WORK_LIST.forEach((e) => {
		
		var sample = _oam_elements.oam_0202.main.div_work_row({
			ID: e.PROC_WORK_ID,
			MAINTEN_CD: e.CODE + ' (' + e.MAINTEN_LEV1_NM + ' - ' + e.MAINTEN_LEV2_NM + ')',
			DIFFICULTY: parseInt(e.DIFFICULTY),
			WORK_NM: e.WORK_NM,
			WORK_DETAIL: e.WORK_DETAIL,
			WORK_TIME: e.START_TIME + ' ~ ' + e.END_TIME,
			WORK_TOTAL_TIME: _oam.toStringTimeDiff({START: e.START_TIME, END: e.END_TIME}),
			DOWNTIME_YN: e.DOWNTIME_YN,
		});
		$('div#WORK_LIST').append(sample);
		
		// WORK_FILE
		//WORK_FILE_LIST_ID
		e.FILE_LIST.forEach((e2) => {
			var sample = _oam_elements.oam_0202.main.tr_file_row({
				ID: e2.ATCH_FLE_SEQ,
				TYPE: e2.TYPE,
				FILE_NAME: e2.FLE_NM.substring(0, e2.FLE_NM.lastIndexOf('.')),
				FILE_EXTENSION: e2.FLE_NM.substring(e2.FLE_NM.lastIndexOf('.')),
				FILE_SIZE: _oam.returnFileSize(parseInt(e2.FLE_SZ)),
				FILE_INFO: e2.FILE_INFO,
				SRC: ctx + '/oam2/oam_0200/imageView' + e2.FLE_PATH + '/' + e2.NEW_FLE_NM
			});
			$('tbody#WORK_FILE_LIST_' + e.PROC_WORK_ID).append(sample);
		});
		// PURPOSE 첨부파일이 없을 경우, 
		if(e.FILE_LIST.length === 0) $('tbody#WORK_FILE_LIST_' + e.PROC_WORK_ID).append(_oam_elements.oam_0202.main.tr_nofile_row({TEXT: 'No File'}));
		
	});
	
}


