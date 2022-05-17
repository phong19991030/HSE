
/*	
 * 	######## Selector ##########################################
 * 	## MAIN
 * 	
 *  li#TODAY	: 오늘 날짜 
 *  li#TURBINE	: 발전기 이름
 *  li#WORKTIME	: 작업시간
 *  em#WORKTIME_DIFF : 총 작업 시간
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
function oam010203() {
	
	// 데이터 조회
	var data = _oam.mariaDB.getData('/oam2/oam_0100/02/planDetail/getPlanInfo.ajax', {
		EVENT_ID: $('input#EVENT_ID').val(),
		PLAN_ID: $('input#PLAN_ID').val(),
	});
	if(!data) return;
	
	// 데이터 변환
	console.log(data);
	data = _oam.convertData.PLAN(data);
	console.log(data);
	
	var a = moment.tz(data.PLAN_START_TIME, _CLIENT.CLIENT_ACCESS_TIMEZONE);
	var b = moment.tz(data.PLAN_END_TIME, _CLIENT.CLIENT_ACCESS_TIMEZONE);
	
	/* 스케줄 정보 입력 */
	$('li#TODAY').text(moment.tz(_CLIENT.CLIENT_ACCESS_TIMEZONE).format('YYYY-MM-DD dddd'));
	$('li#TURBINE').text(data.GERATOR_NM);
	$('li#WORKTIME').text(a.format('YYYY-MM-DD (ddd) HH:mm:ss') + ' ~ ' + b.format('YYYY-MM-DD (ddd) HH:mm:ss'));
	
	// 시작, 종료시간 차이 계산
	var diff = moment.duration(b.diff(a));
	var diff_str = ''; 
	if(diff.get('days')) diff_str = diff_str + diff.get('days') + 'days ';
	if(diff.get('hours')) diff_str = diff_str + diff.get('hours') + 'h ';
	if(diff.get('minutes')) diff_str = diff_str + diff.get('minutes') + 'm ';
	if(diff.get('seconds')) diff_str = diff_str + diff.get('seconds') + 's';
	$('em#WORKTIME_DIFF').text(diff_str);
	
	// part, tool, ppe, work 비용 합산 
	part_cost = data.PART_LIST.reduce((acc, e) => {
		if(e.COST) acc = acc + parseFloat(e.COST);
		return acc;
	}, 0);
	
	tool_cost = data.TOOL_LIST.reduce((acc, e) => {
		if(e.COST) acc = acc + parseFloat(e.COST);
		return acc;
	}, 0);
	
	ppe_cost = data.PPE_LIST.reduce((acc, e) => {
		if(e.COST) acc = acc + parseFloat(e.COST);
		return acc;
	}, 0);
	
	work_cost = data.WORK_LIST.reduce((acc, e) => {
		if(e.WORK_COST) acc = acc + parseFloat(e.WORK_COST);
		return acc;
	}, 0);
	
	// part_cost, tool_cost, ppe_cost (USD), work_cost (KRW)
	if(part_cost) $('strong#PART_COST').text(' $' + part_cost + '/USD').parent('li').show();
	if(tool_cost) $('strong#TOOL_COST').text(' $' + tool_cost + '/USD').parent('li').show();
	if(ppe_cost) $('strong#PPE_COST').text(' $' + ppe_cost + '/USD').parent('li').show();
	if(work_cost) $('strong#WORK_COST').text(' ₩' + _oam.addCharactersPerDigit(work_cost, 3, ',') + '/KRW').parent('li').show();
	$('em#TOTAL_COST').text( '$'+ (part_cost + tool_cost + ppe_cost) + '/USD' + ' + ' + '₩' + _oam.addCharactersPerDigit(work_cost, 3, ',') + '/KRW');
	
	
	/* 차트 시리즈 생성 */ 
//	var part_schedule = data.PART_LIST.reduce((acc, e) => {
//		
//		acc.data.push({
//			name: e.ITEM_NM,
//			id: e.SCHED_ID,
//			parent: 'PART',
//			//dependency: 'PART',
//			start: moment.tz(e.START_TIME_UTC, 'UTC').valueOf(),
//			end: moment.tz(e.END_TIME_UTC, 'UTC').valueOf(),
//			data: Object.assign({}, e),
//		});
//		
//		acc.data[0].children.push(Object.assign({}, e));
//		
//		return acc;
//	}, { name:'Part', data:[{name:'Part', id:'PART', children:[]}]});
//	
//	
//	var tool_schedule = data.TOOL_LIST.reduce((acc, e) => {
//		
//		acc.data.push({
//			name: e.ITEM_NM,
//			id: e.SCHED_ID,
//			parent: 'TOOL',
//			//dependency: 'TOOL',
//			start: moment.tz(e.START_TIME_UTC, 'UTC').valueOf(),
//			end: moment.tz(e.END_TIME_UTC, 'UTC').valueOf(),
//			data: Object.assign({}, e),
//		});
//		acc.data[0].children.push(Object.assign({}, e));
//		
//		return acc;
//	}, { name:'Tool', data:[{name:'Tool', id:'TOOL', children:[]}]});
//	
//	
//	var ppe_schedule = data.PPE_LIST.reduce((acc, e) => {
//		
//		acc.data.push({
//			name: e.ITEM_NM,
//			id: e.SCHED_ID,
//			parent: 'PPE',
//			//dependency: 'PPE',
//			start: moment.tz(e.START_TIME_UTC, 'UTC').valueOf(),
//			end: moment.tz(e.END_TIME_UTC, 'UTC').valueOf(),
//			data: Object.assign({}, e),
//		});
//		acc.data[0].children.push(Object.assign({}, e));
//		
//		return acc;
//	}, { name:'PPE', data:[{name:'PPE', id:'PPE', children:[]}]});
//	
//	
//	var work_schedule = data.WORK_LIST.reduce((acc, e) => {
//		
//		acc.data.push({
//			name: e.WORK_TITLE,
//			id: e.SCHED_ID,
//			parent: 'WORK',
//			//dependency: 'WORK',
//			start: moment.tz(e.START_TIME_UTC, 'UTC').valueOf(),
//			end: moment.tz(e.END_TIME_UTC, 'UTC').valueOf(),
//			data: Object.assign({}, e),
//		});
//		acc.data[0].children.push(Object.assign({}, e));
//		return acc;
//	}, { name:'Work', data:[{name:'Work', id:'WORK', children:[]}]});
//	
//	
//	var series = [];
//	series.push(part_schedule);
//	series.push(tool_schedule);
//	series.push(ppe_schedule);
//	series.push(work_schedule);
//	console.log(series);
	
	// series 생성 
	var series = _highchartOptions.series.oam_010203(data);
	// chart option 생성 
	var options = _highchartOptions.oam_010203({timezone:_CLIENT.CLIENT_ACCESS_TIMEZONE, start:a.valueOf(), end: b.valueOf(), series: series});
	// chart 그리기
	var chart = Highcharts.ganttChart('chart_container', options);
}

