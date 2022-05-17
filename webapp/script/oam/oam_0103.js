
/*
 *  ######## Selector ##########################################
 *  ## MAIN
 *  
 *  ul#report_list 			: 보고서 리스트 
 *  
 *  a#INSPECTION_BTN 		: 점검 보고서 등록 버튼 => /oam2/oam_0200/reportRegister
 *  a#BLADE_INSPECTION_BTN	: 점검 보고서 등록 버튼 => /oam2/oam_0300/reportRegister
 *  a#CHECKLIST 			: 점검 보고서 등록 버튼 => /oam2/oam_0400/reportRegister
 *  
 */
/*
 * 초기화
 */
function oam0103() {
	/* plan list 데이터 조회 */
	var data = _oam.mariaDB.getData('/oam2/oam_0100/03/getReportList.ajax', {EVENT_ID: event_id});
	console.log(data);
	
	/* 보고서 list 생성 */
	createReportList(data);
	
	// 보고서 작성 등록 버튼 클릭 이벤트 
	$('a#INSPECTION_BTN, a#BLADE_INSPECTION_BTN, a#CHECKLIST_BTN').click(function() {
		if(this.id === 'INSPECTION_BTN') window.location = ctx + '/oam2/oam_0200/reportRegister?EVENT_ID=' + event_id;
		if(this.id === 'BLADE_INSPECTION_BTN') window.location = ctx + '/oam2/oam_0300/reportRegister?EVENT_ID=' + event_id;
		if(this.id === 'CHECKLIST_BTN') window.location = ctx + '/oam2/oam_0400/reportRegister?EVENT_ID=' + event_id;
	});
}

/*
 * # 보고서 리스트 생성
 */
function createReportList(data) {
	/* plan list 데이터 조회 */
	if(!data) data = _oam.mariaDB.getData('/oam2/oam_0100/03/getReportList.ajax', {EVENT_ID: event_id});
	/* ul 초기화 */
	$('ul#report_list').html('');
	
	var report_type = {1: 'Inspection', 2: 'Blade Inspection', 3: 'Checklist'};
	
	/* plan 생성, 추가, 이벤트 */
	data.forEach((e) => {
		// 생성 
		var sample = _oam_elements.oam_0103.main.li_report_row({
			ID: e.RPT_ID,
			RPT_TYPE: report_type[e.TYPE],
			RPT_NM: e.RPT_NM,
			REGISTRATOR: e.USER_NM + ' (' + e.USER_ID + ')',
			DATETIME: e.DATETIME,
			// 작성자와 접속 유저와 같을 경우 
			HAS_AUTH: e.INS_ID === _CLIENT.USER_UID,
		});
		
		// 작성자와 접속 유저와 같을 경우 
		if(e.INS_ID === _CLIENT.USER_UID) {
			// 라디오 버튼 클릭 이벤트 
			sample = $(sample).find('input[id*=radio]').click(function() {
				var li = $(this).parents('li[id*=report]');
				if(li.hasClass('active')) {
					$(this).prop('checked', false);
					li.removeClass('active');
				} else {
					li.addClass('active').siblings('li').removeClass('active');
				}
			}).parents('li[id*=report]');
			
			// 삭제 버튼 클릭 이벤트
			sample = $(sample).find('span[id*=DELETE_BTN_]').click(function() {
				// 확인 
				if(confirm(_MESSAGE.common.deleteConfirm)) {
					var info = $(this).parents('li[id*=report]').prop('info');
					
					// 보고서 삭제 경로
					var path;
					if(info.TYPE === 1) path = ctx + '/oam2/oam_0200/reportDetail/deleteReport.ajax';
					if(info.TYPE === 2) path = ctx + '/oam2/oam_0300/reportDetail/deleteReport.ajax';
					if(info.TYPE === 3) path = ctx + '/oam2/oam_0400/reportDetail/deleteReport.ajax';
					
					// 보고서 삭제 
					var result = _oam.mariaDB.getData(path, {
						RPT_ID: info.RPT_ID,
					});
					console.log(result);
					
					// 삭제 후 처리 
					if(result.IS_DELETE_RPT) {
						alert(_MESSAGE.common.deleteSuccess);
						createReportList();
					} else {
						alert(_MESSAGE.common.deleteFail);
					}
				} 
				// 취소
				else {
					
				}
			}).parents('li[id*=report]');
			
			// 계획 수정 버튼 클릭 이벤트
			sample = $(sample).find('a[id*=MODIFY_BTN]').click(function() {
				var info = $(this).parents('li').prop('info');
				
				// 보고서 수정 페이지 이동
				if(info.TYPE === 1) window.location = ctx + '/oam2/oam_0200/reportModify?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID;
				if(info.TYPE === 2) window.location = ctx + '/oam2/oam_0300/reportModify?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID;
				if(info.TYPE === 3) window.location = ctx + '/oam2/oam_0400/reportModify?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID;
				
			}).parents('li[id*=report]');
			
		} else {
			
		}
		
		
		// 보고서 클릭 이벤트 
		sample = $(sample).find('.plan-lst-info-wrap').click(function(e) {
			
			// 왼쪽 radio, 오른쪽 a 태그 클릭 시 이벤트 막기  
			if(e.target !== e.currentTarget) return; 
			
			// 정보 가져오기
			var info = $(this).parents('li').prop('info');
			console.log(info);
			
			// 보고서 상세 페이지 이동
			if(info.TYPE === 1) window.location = ctx + '/oam2/oam_0200/reportDetail?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID;
			if(info.TYPE === 2) window.location = ctx + '/oam2/oam_0300/reportDetail?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID;
			if(info.TYPE === 3) window.location = ctx + '/oam2/oam_0400/reportDetail?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID;
		}).parents('li[id*=report]');
		
		
		// 보고서 PDF 다운로드 버튼 클릭 이벤트
		sample = $(sample).find('a[id*=DOWNLOAD_BTN]').click(function() {
			var info = $(this).parents('li').prop('info');
			
			// 보고서 PDF 다운로드
			if(info.TYPE === 1) window.location = ctx + '/oam2/oam_0200/downloadPDF.ajax?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID;
			if(info.TYPE === 2) window.location = ctx + '/oam2/oam_0300/downloadPDF.ajax?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID;
			if(info.TYPE === 3) window.location = ctx + '/oam2/oam_0400/downloadPDF.ajax?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID;
			
		}).parents('li[id*=report]');
		
		// 프로퍼티 추가
		sample = $(sample).prop('info', e);
		
		
		// 추가
		$('ul#report_list').append(sample);
	});
	
	// 보고서 없을 경우
	if(data.length === 0) {
		// No report 샘플 생성 
		var sample = _oam_elements.oam_0103.main.li_no_report_row();
		// 추가
		$('ul#report_list').append(sample);
	}

}







