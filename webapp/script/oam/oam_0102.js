
/*
 *  ######## Selector ##########################################
 *  ## MAIN
 *  
 *  ul#plan_list 			: 계획 리스트 
 *  div#plan_register 		: 계획 등록 버튼 => /oam2/oam_0100/02/planRegister
 *  
 *  li#plan_null 			: NO PLAN li
 *  li#plan_$PLAN_ID		: PLAN li
 *  
 *  input#radio_null		: NO PLAN radio 버튼
 *  input#radio_$PLAN_ID	: PLAN radio 버튼 
 *  
 *  span#confirm_null		: NO PLAN confirm 버튼
 *  span#confirm_$PALN_ID	: PLAN confirm 버튼
 *  
 *  a.plan_schdule			: PLAN schedule 이동 버튼
 */
/*
 * 초기화
 */
function oam0102() {
	/* plan list 데이터 조회 */
	var data = _oam.mariaDB.getData('/oam2/oam_0100/02/getPlanList.ajax', {EVENT_ID: event_id});
	/* 컨펌된 계획이 있는 지 체크 */
	var hasConfirm = data.find((e) => e.HAS_CONFIRM === 'Y');
	/* 컨펌 된 계획이 있으면 */
	if(hasConfirm) {
		// 계획 등록 버튼 삭제 
		$('div#plan_register').remove();
	} 
	/* 컨펌 된 계획이 없으면 */
	else {
		// 계획 등록 버튼 EVENT
		$('div#plan_register').click((e) => {
			window.location = ctx + '/oam2/oam_0100/02/planRegister?EVENT_ID=' + event_id;
		});
	}
	/* plan list 생성 */
	createPlanList(data);
}

/*
 * # 계획 리스트 생성
 */
function createPlanList(data) {
	console.log(data);
	/* plan list 데이터 조회 */
	if(!data) data = _oam.mariaDB.getData('/oam2/oam_0100/02/getPlanList.ajax', {EVENT_ID: event_id});
	/* ul 초기화 */
	$('ul#plan_list').html('');
	/* plan 생성, 추가, 이벤트 */
	data.forEach((e) => {
		// 생성 
		var sample = _oam_elements.oam_0102.main.li_plan_row({
			ID: e.PLAN_ID,
			PLAN_NM: e.PLAN_NM,
			DATETIME: e.DATETIME,
			IS_CONFIRM: e.IS_CONFIRM,		// 컨펌된 계획 일 경우, 'Y', 'N'
			IS_NOPLAN: e.IS_NOPLAN,			// 계획없음 여부 'Y', 'N'
			HAS_CONFIRM: e.HAS_CONFIRM		// 리스트에 컨펌된 계획이 존재 할 경우 'Y' 아 닐 경우, 'N' 
		});
		
		// 라디오 버튼 클릭 이벤트
		if(e.HAS_CONFIRM === 'N') {
			sample = $(sample).find('input[id*=radio]').click(function() {
				var li = $(this).parents('li[id*=plan]');
				if(li.hasClass('active')) {
					$(this).prop('checked', false);
					li.removeClass('active');
				} else {
					li.addClass('active').siblings('li').removeClass('active');
				}
				var info = $(this).parents('li[id*=plan]').prop('info');
				console.log(info);
			}).parents('li[id*=plan]');
		}
		
		
		// 컨펌 버튼 클릭 이벤트
		//if(e.HAS_CONFIRM === 'N' && e.IS_NOPLAN === 'N') {
		if(e.HAS_CONFIRM === 'N') {
			sample = $(sample).find('span[id*=CONFIRM_BTN_]').click(function() {
				// 확인 
				if(confirm(_MESSAGE.oam.planConfirm)) {
					var param = $(this).parents('li[id*=plan]').prop('info');
					console.log('컨펌', param);
					var data = _oam.mariaDB.getData('/oam2/oam_0100/02/confirm.ajax', param);
					console.log('결과', data);
					// 컴펌 후 처리 
					if(data) {
						alert(_MESSAGE.oam.planConfirmSuccess);
						createPlanList();
						$('#plan_register').remove();
					} else {
						alert(_MESSAGE.oam.planConfirmFail);
					}
				} 
				// 취소
				else {
					
				}
			}).parents('li[id*=plan]');
		}
		
		
		// 계획 클릭 이벤트 
		sample = $(sample).find('.plan-lst-info-wrap').click(function(e) {
			
			// 왼쪽 radio, 오른쪽 a 태그 클릭 시 이벤트 막기  
			if(e.target !== e.currentTarget) return; 
			
			// 정보 가져오기
			var info = $(this).parents('li').prop('info');
			console.log(info);
			
			// NO PLAN이 아닐 경우, PLAN 상세보기 창 이동 
			if(info.IS_NOPLAN !== 'Y') {
				window.location = ctx + '/oam2/oam_0100/02/planDetail?EVENT_ID=' + info.EVENT_ID + '&PLAN_ID=' + info.PLAN_ID;
			} else {
				console.log('계획 없음');
			}
		}).parents('li[id*=plan]');
		
		
		if(e.IS_NOPLAN !== 'Y' && e.HAS_CONFIRM !=='Y') {
			// 계획 수정 버튼 클릭 이벤트
			sample = $(sample).find('a[id*=MODIFY_BTN]').click(function() {
				var info = $(this).parents('li').prop('info');
				window.location = ctx + '/oam2/oam_0100/02/planModify?EVENT_ID=' + info.EVENT_ID + '&PLAN_ID=' + info.PLAN_ID;
			}).parents('li[id*=plan]');
		}
		
		
		if(e.IS_NOPLAN !== 'Y') {
			// 계획 스케줄 버튼 클릭 이벤트
			sample = $(sample).find('a[id*=SCHEDULE_BTN]').click(function() {
				var info = $(this).parents('li').prop('info');
				window.location = ctx + '/oam2/oam_0100/02/planSchedule?EVENT_ID=' + info.EVENT_ID + '&PLAN_ID=' + info.PLAN_ID;
			}).parents('li[id*=plan]');
			
			// 계획 PDF 다운로드 버튼 클릭 이벤트
			sample = $(sample).find('a[id*=DOWNLOAD_BTN]').click(function() {
				var info = $(this).parents('li').prop('info');
				//window.location = ctx + '/oam2/oam_0100/02/downloadPDF.ajax?EVENT_ID=' + info.EVENT_ID + '&PLAN_ID=' + info.PLAN_ID + '&IMG=' + img;
				
				//var data = _oam.mariaDB.ajax(ctx + '/oam2/oam_0100/02/downloadPDF.ajax', {EVENT_ID: info.EVENT_ID, PLAN_ID: info.PLAN_ID, IMG: img}, 'POST');
				
//				$.ajax({
//			        type: "POST",
//			        url: ctx + '/oam2/oam_0100/02/downloadPDF.ajax',
//			        data: {EVENT_ID: info.EVENT_ID, PLAN_ID: info.PLAN_ID, IMG: img}
//				}).done(function (data) {
//					console.log(data);
//			        var blob = new Blob([data]);
//			        var link = document.createElement('a');
//			        link.href = window.URL.createObjectURL(blob);
//			        link.download = "Sample.pdf";
//			        link.click();
//			    });
				
				
				// 데이터 조회
				var planInfo = _oam.mariaDB.getData(ctx + '/oam2/oam_0100/02/planDetail/getPlanInfo.ajax', {
					EVENT_ID: info.EVENT_ID,
					PLAN_ID: info.PLAN_ID,
				});
				if(!planInfo) return;
				
				// 데이터 변환
				console.log(planInfo);
				planInfo = _oam.convertData.PLAN(planInfo);
				console.log(planInfo);
				
				var a = moment.tz(data.PLAN_START_TIME, _CLIENT.CLIENT_ACCESS_TIMEZONE);
				var b = moment.tz(data.PLAN_END_TIME, _CLIENT.CLIENT_ACCESS_TIMEZONE);
				
				// series 생성 
				var series = _highchartOptions.series.oam_010203(planInfo);
				// chart option 생성 
				var options = _highchartOptions.oam_010203({timezone:_CLIENT.CLIENT_ACCESS_TIMEZONE, start:a.valueOf(), end: b.valueOf(), series: series});
				// chart 그리기
				var chart = Highcharts.ganttChart('chart_container', options);
				
				
				var svg = chart.getSVG();
				var parser = new DOMParser();
				var svgElem = parser.parseFromString(svg, 'image/svg+xml').documentElement;
				var b64 = svgElem.toDataURL();
				
				var img = new Image();
				img.src = b64;
				
				var canvas = document.createElement('canvas');
				var c = canvas.getContext('2d');
				
				// 
				img.onload = function() {
					canvas.width = this.naturalWidth;
					canvas.height = this.naturalHeight;
					c.drawImage(img, 0, 0);
					
					var pngb64 = canvas.toDataURL();
					
					// pdf 다운로드 
					_oam.requestDownloadFile({
					    url: ctx + '/oam2/oam_0100/02/downloadPDF.ajax',
					    method: 'POST',
					    data: {EVENT_ID: info.EVENT_ID, PLAN_ID: info.PLAN_ID, IMG: pngb64}
					});
					
				}
				
			}).parents('li[id*=plan]');
		}
		
		// 추가
		$('ul#plan_list').append(sample);
		
		// 프로퍼티 추가
		$('li#plan_' + e.PLAN_ID).prop('info', {
			EVENT_ID: e.EVENT_ID, 
			PLAN_ID: e.PLAN_ID ? e.PLAN_ID : 'null',
			GERATOR_ID: e.GERATOR_ID,
			PLAN_NM: e.PLAN_NM,
			DATETIME: e.DATETIME,
			IS_CONFIRM: e.IS_CONFIRM,
			IS_NOPLAN: e.IS_NOPLAN,
			STATUS: 3,
		});
		
	});
	
		

}






