/*
 * ######## Selector ##########################################
 * ## MAIN
 * 
 * 1) 프로그래스바
 * - li#STEP1	: SCADA Error 	- click시 section#SECTION1 이동
 * - li#STEP2	: Planning 		- click시 section#SECTION2 이동  
 * - li#STEP3	: Operating 	- click시 section#SECTION3 이동
 * - li#STEP4	: Complete 		- click시 section#SECTION3 이동
 * 
 * 2) 섹션
 * - section#SECTION1
 * - section#SECTION2
 * - section#SECTION3
 * 
 * 3) section#SECTION1
 * - span#ALARM_CODE		: 알람코드 ex) #010102103
 * - span#ALARM_TEXT 		: 알람텍스트 
 * - em#ALARM_DESCRIPTION 	: 알람설명
 * 
 * - strong#TURBINE_NAME	: 발전기 이름 
 * - em#TURBINE_POSITION_A 	: 단지 > 그룹 > 
 * - strong#TURBINE_POSITION_B : 발전기
 * 
 * - strong#TEMP_MIN 		: 최소 온도 (단위: ℃)
 * - strong#TEMP_MAX 		: 최대 온도 (단위: ℃)
 * - strong#RAIN			: 강수량 (단위: mm)
 * - strong#WIND_SPD		: 풍속 (단위: m/s)
 * 
 * 
 * 센서 모니터링 
 * - a#REFRESH_CHART_BTN 	: 차트 새로고침 버튼
 * - a#SNAPSHOT_CHART_BTN	: 차트 스냅샷 버튼  
 * - li#ADD_SENSOR_BTN		: 센서 추가 버튼
 * - ul#A_SENSOR_LIST		: 차트 센서 리스트
 * 
 * - div#SENSOR_CHART		: 센서 차트 컨테이너 
 * 
 * 4) section#SECTION2
 * - input#NOPLAN_BTN		: NOPLAN 체크박스 
 *
 * - article#RRE_PLAN_LIST_FORM : 이전 계획 리스트 폼
 * - article#NEW_PLAN_LIST_FORM 	: 계획 리스트 폼 
 * - article#PLAN_INFO_FORM 	: 계획 정보 폼
 * - article#PLAN_SHCEDULE_FORM : 계획 스케줄 폼 
 * 
 * - div#PLAN_REGISTER_FORM	: 계획 작성 폼 
 * - div#PLAN_REGISTER_FORM_WRAP: 계획 작성 폼 랩
 * - a#ADD_PLAN_BTN : 계획 작성 버튼 
 * 
 * - ul#PRE_PLAN_LIST		: 과거 작성된 계획 리스트 
 * - ul#NEW_PLAN_LIST		: 현재 작성된 계획 리스트
 * 
 * - div#SCHEDULE_CHART		: 스케줄 차트 컨테이너 
 * - div#PDF_CHART			: PDF 차트 컨테이너 (숨김처리)
 * 
 * 5) section#SECTION3
 * - span#NEW_REPORT_CNT : 새로운 보고서 갯수 ex) +3
 * 
 * - article#PRE_REPORT_LIST_FORM : 이전 보고서 리스트 폼
 * - article#NEW_REPORT_LIST_FORM : 보고서 리스트 폼
 * - div#REPORT_REGISTER_FORM_WRAP : 보고서 작성 폼 랩 
 * - a#ADD_INSP_BTN : 계획 작성 버튼 
 * - a#ADD_BLDINSP_BTN : 계획 작성 버튼 
 * - a#ADD_CHKLST_BTN : 계획 작성 버튼 
 * 
 * - ul#PRE_REPORT_LIST		: 과거 작성된 보고서 리스트 
 * - ul#NEW_REPORT_LIST			: 현재 작성된 보고서 리스트
 * 
 * 
 * 
 */
var _weather = {
	icon : {
		weather1 : ['01d', '01n'],					// sunny (맑음) 
		weather2 : ['03d', '03n', '04d', '04n'],	// many_cloud (매우 흐림)
		weather3 : ['02d', '02n'],					// cloud (흐림)	
		weather4 : ['10d', '10n'],					// rain (비)
		weather5 : ['09d', '09n'],					// shower (소나기)
		weather6 : [],								// snowrain (진눈깨비)
		weather7 : ['13d', '13n'], 					// snow (눈)
		weather8 : ['11d', '11n'],					// thunderstorm (천둥, 번개)
		weather9 : ['50d', '50n']					// mist (안개)			
	},	
	calculate_icon : function(icon) {
		for(var key in this.icon) {
            if(this.icon[key].indexOf(icon) > -1) icon = key;
		}		
		return icon; 
	},
	direction16 : ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'],
	calculate_direction16 : function(dec) {
		return this.direction16[parseInt((dec + 22.5 * 0.5) / 22.5)];
	},
	getWeather: function(lat, lng){
		var url = 'https://api.openweathermap.org/data/2.5/weather';
		var api_key = 'a4b52528c482c721204c8e5c03aafd06';
		var lang = 'en'; // kr, en
		var units = 'metric'; 
		var w = {};
		
		$.ajaxSettings.traditional = true;	
		$.ajax({
			url : url,
			data :  {appid: api_key, units:units, lat:lat, lon: lng, lang:lang },
			dataType : 'JSON',
			type: 'GET',
			async : false,
			error : function (req, status, err) {
				alert("openWeatherAPI Error!!");
			},
			success : function(data) {
//				console.log(data);
				w.LAT = data.coord.lat;
				w.LNG = data.coord.lon;
				w.W_MAIN = data.weather[0].main;
				w.W_DESC = data.weather[0].description;
				w.W_ICON = 'weather-now ' + _weather.calculate_icon(data.weather[0].icon);
				w.TP = data.main.temp;
				w.TP_MAX = data.main.temp_max;
				w.TP_MIN = data.main.temp_min;
				w.WD_SPD = data.wind.speed;
				w.WD_DEG = 'wind-num ' + _weather.calculate_direction16(data.wind.deg);
				w.RAIN = data.rain ? data.rain['1h'] : 0; 
			}
		}); 
		return w;
	}
	//var direction16_name = ['북', '북북동', '북동', '동북동', '동', '동남동', '남동', '남남동', '남', '남남서', '남서', '서남서', '서', '서북서', '북서', '북북서', '북'];
	//var direction16_name = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
};

/*
 * 		page 초기화
 */
function oam0501() {
	
	/* view setting - menu창 숨기기 */
	$('body').addClass('gnb-none');
	$('body').removeClass('gnb-active');
	$('.gnb-menu').removeClass('on');
	
	/* 프로그래스바 STEP 클릭 이벤트 => 해당 SECTION으로 scroll 이동 */ 
	$('li[id*=STEP]').click(function() {
		if(this.id === 'STEP1') _oam.moveScrollToTargetPosition('section#SECTION1', 0);
		if(this.id === 'STEP2') _oam.moveScrollToTargetPosition('section#SECTION2', -105);
		if(this.id === 'STEP3') _oam.moveScrollToTargetPosition('section#SECTION3', -105);
		if(this.id === 'STEP4') _oam.moveScrollToTargetPosition('section#SECTION3', -105);
	});
	
	var data = _oam.mariaDB.getData(ctx + '/oam2/oam_0500/getTotalData.ajax', {EVENT_ID: $('input#EVENT_ID').val()});
	console.log(data);
	makeSection1(data);
	makeSection2(data);
	makeSection3(data);
	
	// NOPALN 버튼 클릭 이벤트 
	$('input#NOPLAN_BTN').click(function() {
		console.log('NO PLAN!!!!!!');
	});
	
	// 계획, 보고서 작성 버튼 클릭
	$('a[id*=ADD_]').click(function() {
		if(this.id === 'ADD_PLAN_BTN') window.location = ctx + '/oam2/oam_0100/02/planRegister?EVENT_ID=' + $('input#EVENT_ID').val() + '&FROM_TOTALVIEW=Y';
		if(this.id === 'ADD_INSP_BTN') window.location = ctx + '/oam2/oam_0200/reportRegister?EVENT_ID=' + $('input#EVENT_ID').val() + '&FROM_TOTALVIEW=Y';
		if(this.id === 'ADD_BLDINSP_BTN') window.location = ctx + '/oam2/oam_0300/reportRegister?EVENT_ID=' + $('input#EVENT_ID').val() + '&FROM_TOTALVIEW=Y';
		if(this.id === 'ADD_CHKLST_BTN') window.location = ctx + '/oam2/oam_0400/reportRegister?EVENT_ID=' + $('input#EVENT_ID').val() + '&FROM_TOTALVIEW=Y';
	});
	
	// 차트 스냅샷 버튼 클릭
	$('a#SNAPSHOT_CHART_BTN').click(function() {
		_highchart.exportFile('SENSOR_CHART', 'png', 'chart');
	});
	
}

var _SENSOR;
function makeSection1(data) {
	
	// 섹션1 숨김
	$('section#SECTION1').hide();
	
	// 알람 정보 
	$('span#ALARM_CODE').text(data.ALARM_INFO.ALARM_CODE);
	$('span#ALARM_TEXT').text(data.ALARM_INFO.ALARM_TXT);
	$('em#ALARM_DESCRIPTION').text(data.ALARM_INFO.DESCRPT);
	// 터빈 정보  
	$('strong#TURBINE_NAME').text(data.ALARM_INFO.GERATOR_NM);
	$('em#TURBINE_POSITION_A').text(data.ALARM_INFO.FARM_NM + ' > ' + data.ALARM_INFO.GROUP_NM + ' > ');
	$('strong#TURBINE_POSITION_B').text(data.ALARM_INFO.GERATOR_NM);
	
	// weather 검색
	var weather = _weather.getWeather(data.ALARM_INFO.LAT, data.ALARM_INFO.LNG);
	console.log(weather);
	
	// 날씨 정보 
	$('strong#TEMP_MIN').text(weather.TP_MIN + '℃');
	$('strong#TEMP_MAX').text(weather.TP_MAX + '℃');
	$('strong#RAIN').text(weather.RAIN + 'mm');
	$('strong#WIND_SPD').text(weather.WD_SPD + 'm/s');
	//TODO 풍향 표시 
	
	// 센서 조회 
	var result = _oam.mongoDB.getSensor(JSON.stringify([{TURBINE_ID: data.ALARM_INFO.GERATOR_ID, POWER_SYSTEM_ID: data.ALARM_INFO.OBJECT_ID}]));
	console.log('센서정보', result[0].SENSOR, '센서 키워드 정보', data.ALARM_KEYWORD_LIST);
	
	// 센서 분류 
	// A: 알람 키워드와 관련있는 센서 리스트
	// B: 알람 키워드와 관련없는 센서 리스트
	// NULL: keyword가 지정 되지 않은 센서 리스트(to MongoDB)
	_SENSOR = result[0].SENSOR.reduce((acc, e, i) => {
		
		[A, B, C, D] = e.keyword ? e.keyword.split('-') : [null, null, null, null];
		//console.log(e.keyword, [A, B, C, D]);
		
		//
		e.power_system_id = data.ALARM_INFO.OBJECT_ID;
		
		if(e.keyword) {
			data.ALARM_KEYWORD_LIST.forEach((e2, i2, arr2) => {

				if(A === e2.COMPONENT_CLASS || e2.COMPONENT_CLASS === null)
					if(B === e2.COMPONENT || e2.COMPONENT === null)
						if(C === e2.PHYSICAL_NODE || e2.PHYSICAL_NODE === null) 
							if(D === e2.PHYSICAL_NODE_CLASS || e2.PHYSICAL_NODE_CLASS === null) 
								if(acc.A.filter((e3) => e3._id === e._id).length === 0) acc.A.push(e);
				
				// 마지막 회차 일때 : A에 추가 되지 않았을 경우, B에 추가  
				if(arr2.length === i2+1) if(acc.A.filter((e3) => e3._id === e._id).length === 0) acc.B.push(e);
			});
		} else {
			acc.NULL.push(e);
		}
		return acc;
	}, {A: [], B: [], NULL:[]});
	
	// A 센서 리스트 생성 
	makeSensor(_SENSOR.A);
	
	//var range = 'hour';
	var range = 'day';
	var max = 1;
	var min = -1;
	
	var alarm_current_time = moment.tz(data.ALARM_INFO.DATETIME, _CLIENT.CLIENT_ACCESS_TIMEZONE);
	// 차트에 필요한 정보 담기 
	_SENSOR.CHART = {
		ALARM_CURRENT_TIME_UTC: alarm_current_time.tz('UTC').format('YYYY-MM-DD HH:mm:ss'),
		ALARM_CURRENT_TIME_LOCAL: alarm_current_time.tz(_CLIENT.CLIENT_ACCESS_TIMEZONE).format('YYYY-MM-DD HH:mm:ss'),
		ALARM_CURRENT_TIME_MILLISEC: alarm_current_time.valueOf(),
		FROM: alarm_current_time.clone().set('second', 0).add(min, range).valueOf(),
		TO: alarm_current_time.clone().set('second', 0).add(max, range).valueOf(),
		FROM_TIME_LOCAL: alarm_current_time.clone().set('second', 0).add(min, range).tz(_CLIENT.CLIENT_ACCESS_TIMEZONE).format('YYYY-MM-DD HH:mm:ss'),
		FROM_TIME_UTC: alarm_current_time.clone().set('second', 0).add(min, range).tz('UTC').format('YYYY-MM-DD HH:mm:ss'),
		TO_TIME_LOCAL: alarm_current_time.clone().set('second', 0).add(max, range).tz(_CLIENT.CLIENT_ACCESS_TIMEZONE).format('YYYY-MM-DD HH:mm:ss'),
		TO_TIME_UTC: alarm_current_time.clone().set('second', 0).add(max, range).tz('UTC').format('YYYY-MM-DD HH:mm:ss'),
	};
	// 차트 배열 생성 
	_SENSOR.CHART.DATE_ARRAY = _moment.createRegularDateArray(_SENSOR.CHART.FROM, _SENSOR.CHART.TO, 'sec', 10, 'UTC', 'UTC', true);
	
	
	// 차트 시리즈 생성 
	var series = _SENSOR.A.reduce((acc, e, i) => {
		acc.push(makeSeries(_SENSOR.CHART.FROM_TIME_UTC, _SENSOR.CHART.TO_TIME_UTC, e, _SENSOR.CHART.DATE_ARRAY));
		return acc;
	}, []);
	
	// 차트 옵션 생성
	var options = _highchartOptions.oam_0501({timezone: _CLIENT.CLIENT_ACCESS_TIMEZONE});
	
	// 옵션, 시리즈 머지
	options = _highchart.mergeOptions(options, {series: series});
	
	// 차트 생성
	var chart;
	setTimeout(() => {
		
		// 차트 생성
		chart = Highcharts.chart('SENSOR_CHART', options);
		
		// plotLine 생성 (에러 발생, 계획, 보고서 일자) 
		var occurtime = moment.tz(data.ALARM_INFO.DATETIME, _CLIENT.CLIENT_ACCESS_TIMEZONE).set('second', 0).valueOf();
		var line = _highchartOptions.plotLine.oam_0501({
			ID: data.ALARM_INFO.EVENT_ID,
			TYPE: 'alarm',
			VALUE: occurtime,
			// 매칭되는 plotLine을 찾기 위한 정보 
			CHART_ID: 'SENSOR_CHART',
			AXIS_TYPE: 'x',
			// plotLine의 정보 
			INFO: {
				TYPE: 'alarm',
				OCCUR_TIME: occurtime,
			},
		});
		// plotLine 추가
		_highchart.addPlotLines('SENSOR_CHART', line, 'x', 0);
		
		
		// plotLine-icon mouseover 이벤트 (툴팁 생성)
		$('a.plotLine-icon').mouseover(function(e) {
	        
	        var position = $(this).offset(),
	            chart_id = $(this).children('#chart-id').text(),
	            plotline_id = $(this).children('#plotline-id').text(),
	            axis_type = $(this).children('#axis-type').text();

	        // plotLine 찾기 
	        var plotLine = _highchart.getPlotLine(chart_id, plotline_id, axis_type, 0);
	        if(!plotLine) return;
	        console.log(chart_id, plotline_id, axis_type, plotLine);
	        
	        // tooltip div 생성 
	        var _div = document.createElement('div');
	        _div = $(_div).addClass('plotLine-tooltip');
	        
	        // 내용 
	        var title = plotLine.options.info.TITLE;
	        var value = plotLine.options.value;
	        var timezone = plotLine.axis.chart.time.options.timezone;
	        var color = plotLine.options.color;
	        
	        $(_div).append('<span style="font-weight:bold;font-size:15px;">' + title + '</span><br/>');
	        $(_div).append('<span>occur time: ' + moment.tz(value, timezone).format('YYYY-MM-DD HH:mm:ss') + '</span><br/>');
	        _div = $(_div).css('border-color', color);
	        
	        // 위치 선정
	        _div = $(_div).css('top', position.top + 20 + 'px');
	        _div = $(_div).css('left', position.left + 'px');
	        _div = $(_div).show();
	        $('body').append(_div);
	    });
		
		// plotLine-icon mouseout 이벤트 (툴팁 삭제)
		$('a.plotLine-icon').mouseout(function(e) {
	        $('.plotLine-tooltip').remove();
	    });
	
	}, 1000);
	
	// 섹션 article padding 조정 : 숨김처리된 article 중 첫번째 요소 padding-top:0px;
	$('section#SECTION1 article').not('[style*=none]').eq(0).css('padding-top', '0px');
	// 섹션1 표시
	$('section#SECTION1').show();
}

function makeSection2(data) {
	
//	 * - ul#PRE_PLAN_LIST		: 과거 작성된 계획 리스트 
//	 * - ul#NEW_PLAN_LIST		: 현재 작성된 계획 리스트
//	 * - div#PLAN_REGISTER_FORM	: 계획 작성 폼 
//	 * - div#PLAN_REGISTER_FORM_WRAP: 계획 작성 폼 랩
//	 * 
//	 * - article#RRE_PLAN_LIST_FORM : 이전 계획 리스트 폼
//	 * - article#NEW_PLAN_LIST_FORM 	: 계획 리스트 폼 
//	 * - article#PLAN_SHCEDULE_FORM : 계획 스케줄 폼 
	
	var pre_plans = data.PRE_PLAN_LIST;
	var new_plans = data.NEW_PLAN_LIST;
	// '계획없음' 으로 컴펌 된 경우 
	var isNoPlanConfirm = new_plans.filter((e) => e.IS_CONFIRM === 'Y' && e.IS_NOPLAN === 'Y').length ? true : false;
	// '계획' 으로 컨펌 된 경우 
	var isPlanConfirm = new_plans.filter((e) => e.IS_CONFIRM === 'Y' && e.IS_NOPLAN === 'N').length ? true : false;
	// 컨펌 된 경우 
	var isConfirm = isNoPlanConfirm || isPlanConfirm ? true : false;
	
	console.log('isNoPlanConfirm', isNoPlanConfirm, 'isPlanConfirm', isPlanConfirm, 'isConfirm', isConfirm);
	
	// '계획없음'으로 컨펌 경우, NOPLAN_BTN 체크 및 비활성화, 
	if(isNoPlanConfirm) {
		$('input#NOPLAN_BTN').prop('checked', true).prop('disabled', true);
		$('div#PLAN_REGISTER_FORM').addClass('no-plan').parents('div#PLAN_REGISTER_FORM_WRAP').show();
		$('article#NEW_PLAN_LIST_FORM').show();
	}
	// '계획' 으로 컨펌 된 경우, NOPLAN_BTN 체크 및 비활성화
	if(isPlanConfirm) {
		$('input#NOPLAN_BTN').prop('disabled', true);
		$('article#PLAN_INFO_FORM').show();
		$('article#PLAN_SHCEDULE_FORM').show();
	}
	// 컨펌 안된 경우 + 작성된 계획 있을 경우  
	if(!isConfirm && new_plans.length > 0) {
		$('article#NEW_PLAN_LIST_FORM').show();
	}
	// 컨펌 안된 경우 + 작성된 계획 없을 경우
	if(!isConfirm && new_plans.length == 0) {
		$('article#NEW_PLAN_LIST_FORM').show();
		$('div#PLAN_REGISTER_FORM_WRAP').show();
	}
	// 이전 작성된 계획 있을 경우 
	if(pre_plans.length > 0) {
		$('article#PRE_PLAN_LIST_FORM').show();
	}
	// 이전 작성 된 계획
	if(pre_plans) {
		$('ul#PRE_PLAN_LIST').html('');
		pre_plans.forEach((e) => {
			// sample 생성 
			var sample = _oam_elements.oam_0501.section2.li_pre_plan_row({
				ID: e.PLAN_ID,
				PLAN_NM_KR: e.PLAN_NM_KR,
				PLAN_NM_EN: e.PLAN_NM_EN,
				WRITER: e.INS_NM + ' (' + e.INS_ID + ')',
				DATETIME: e.DATETIME,
			});
			
			// li 클릭 이벤트
			sample = $(sample).find('.plan-lst-info-wrap').click(function(e) {
				// 왼쪽 radio, 오른쪽 a 태그 클릭 시 이벤트 막기  
				if(e.target !== e.currentTarget) return; 
				var info = $(this).parents('li').prop('info');
				console.log('상세페이지 이동', info);
				window.location = ctx + '/oam2/oam_0100/02/planDetail?EVENT_ID=' + info.EVENT_ID + '&PLAN_ID=' + info.PLAN_ID + '&FROM_TOTALVIEW=Y';
			}).parents('li');
			
			// PDF 다운 로드 버튼 클릭
			sample = $(sample).find('a[id*=DOWNLOAD_BTN]').click(function(e) {
				var info = $(this).parents('li').prop('info');
				console.log('PDF 다운로드', info);
				
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
				var chart = Highcharts.ganttChart('PDF_CHART', options);
				
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
			}).parents('li');
			
			// 프로퍼티 추가  
			sample = $(sample).css('cursor', 'pointer').prop('info', e);
			
			// 삽입 
			$('ul#PRE_PLAN_LIST').append(sample);
		});
	}
	
	// 현재 작성 된 계획 리스트 생성
	if(new_plans && !isNoPlanConfirm && !isConfirm) {
		$('ul#NEW_PLAN_LIST').html('');
		new_plans.forEach((e) => {
			// sample 생성 
			var sample = _oam_elements.oam_0501.section2.li_new_plan_row({
				ID: e.PLAN_ID,
				PLAN_NM_KR: e.PLAN_NM_KR,
				PLAN_NM_EN: e.PLAN_NM_EN,
				WRITER: e.INS_NM + ' (' + e.INS_ID + ')',
				DATETIME: e.DATETIME,
			});
			
			// 라디오 버튼 클릭 
			sample = $(sample).find('input[id*=RADIO_]').click(function() {
				var li = $(this).parents('li');
				if(li.hasClass('active')) {
					$(this).prop('checked', false);
					li.removeClass('active');
				} else {
					li.addClass('active').siblings('li').removeClass('active');
				}
				var info = $(this).parents('li[id*=plan]').prop('info');
				console.log(info);
			}).parents('li');
			
			// 컨펌 버튼 클릭 이벤트
			sample = $(sample).find('a[id*=CONFIRM_BTN_]').click(function() {
				// 확인 
				if(confirm('Do you really want to confirm? \nYou can\'t go back.')) {
					var param = $(this).parents('li').prop('info');
					
					console.log('컨펌', param);
					return;
					
					var data = _oam.mariaDB.getData('/oam2/oam_0100/02/confirm.ajax', param);
					console.log('결과', data);
					// 컴펌 후 처리 
					if(data) {
						alert('Confirm success.');
						//createPlanList();
					} else {
						alert('Confirm failed.');
					}
				} 
				// 취소
				else {
					
				}
			}).parents('li');
			
			// li 클릭 이벤트
			sample = $(sample).find('.plan-lst-info-wrap').click(function(e) {
				// 왼쪽 radio, 오른쪽 a 태그 클릭 시 이벤트 막기  
				if(e.target !== e.currentTarget) return; 
				var info = $(this).parents('li').prop('info');
				console.log('상세페이지 이동', info);
				window.location = ctx + '/oam2/oam_0100/02/planDetail?EVENT_ID=' + info.EVENT_ID + '&PLAN_ID=' + info.PLAN_ID + '&FROM_TOTALVIEW=Y';
			}).parents('li');
			
			// PDF 다운 로드 버튼 클릭
			sample = $(sample).find('a[id*=DOWNLOAD_BTN]').click(function(e) {
				var info = $(this).parents('li').prop('info');
				console.log('PDF 다운로드', info);
				
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
				var chart = Highcharts.ganttChart('PDF_CHART', options);
				
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
			}).parents('li');
			
			
			// 프로퍼티 추가
			sample = $(sample).css('cursor', 'pointer').prop('info', e);
			
			// 삽입 
			$('ul#NEW_PLAN_LIST').append(sample);
		});
	}
	
	// 계획으로 컨펌된 경우
	if(isPlanConfirm && isConfirm) {
		var comfirmPlan = new_plans.filter((e) => e.IS_CONFIRM === 'Y' && e.IS_NOPLAN === 'N')[0];
		
		var data = _oam.mariaDB.getData('/oam2/oam_0100/02/planDetail/getPlanInfo.ajax', {
			EVENT_ID: comfirmPlan.EVENT_ID,
			PLAN_ID: comfirmPlan.PLAN_ID
		});
		
		// 데이터 변환
		//console.log(data);
		data = _oam.convertData.PLAN(data);
		//console.log(data);
		
		var a = moment.tz(data.PLAN_START_TIME, _CLIENT.CLIENT_ACCESS_TIMEZONE);
		var b = moment.tz(data.PLAN_END_TIME, _CLIENT.CLIENT_ACCESS_TIMEZONE);
		
		/* 스케줄 정보 입력 */
		$('span#PLAN_INFO_TURBINE').text(data.GERATOR_NM);
		$('span#PLAN_INFO_WORKTIME').text(a.format('YYYY-MM-DD (ddd) HH:mm:ss') + ' ~ ' + b.format('YYYY-MM-DD (ddd) HH:mm:ss'));
		
		// 시작, 종료시간 차이 계산
		var diff = moment.duration(b.diff(a));
		var diff_str = ''; 
		if(diff.get('days')) diff_str = diff_str + diff.get('days') + 'days ';
		if(diff.get('hours')) diff_str = diff_str + diff.get('hours') + 'h ';
		if(diff.get('minutes')) diff_str = diff_str + diff.get('minutes') + 'm ';
		if(diff.get('seconds')) diff_str = diff_str + diff.get('seconds') + 's';
		$('strong#PLAN_INFO_WORKTIME_DIFF').text(diff_str);
		
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
		if(part_cost) $('strong#PART_COST').text(' $' + part_cost + '/USD').parent('span').show();
		if(tool_cost) $('strong#TOOL_COST').text(' $' + tool_cost + '/USD').parent('span').show();
		if(ppe_cost) $('strong#PPE_COST').text(' $' + ppe_cost + '/USD').parent('li').show();
		if(work_cost) $('strong#WORK_COST').text(' ₩' + _oam.addCharactersPerDigit(work_cost, 3, ',') + '/KRW').parent('li').show();
		$('strong#TOTAL_COST').text( '$'+ (part_cost + tool_cost + ppe_cost) + '/USD' + ' + ' + '₩' + _oam.addCharactersPerDigit(work_cost, 3, ',') + '/KRW');
		
		// series 생성 
		var series = _highchartOptions.series.oam_010203(data);
		// chart option 생성 
		var options = _highchartOptions.oam_010203({timezone:_CLIENT.CLIENT_ACCESS_TIMEZONE, start:a.valueOf(), end: b.valueOf(), series: series});
		// chart 그리기
		setTimeout(() => {
			chart = Highcharts.ganttChart('SCHEDULE_CHART', options);
			//chart.redraw();
		}, 1000);
	}
	
	// 섹션 article padding 조정 : 숨김처리된 article 중 첫번째 요소 padding-top:0px;
	$('section#SECTION2 article').not('[style*=none]').eq(0).css('padding-top', '0px');
	// 섹션2 표시
	$('section#SECTION2').show();
}

function makeSection3(data) {
	
	var pre_reports = data.PRE_REPORT_LIST;
	var new_reports = data.NEW_REPORT_LIST;
	
	// 새로운 보고서 갯수 표시
	$('span#NEW_REPORT_CNT').text('+' + new_reports.length);
	
	// 과거 보고서 있을 경우 
	if(pre_reports.length > 0) {
		$('article#PRE_REPORT_LIST_FORM').show();
	}
	// 새로운 보고서 있을 경우 
	if(new_reports.length > 0) {
		$('article#NEW_REPORT_LIST_FORM').show();
	} else {
		$('article#NEW_REPORT_LIST_FORM').show();
		$('div#REPORT_REGISTER_FORM_WRAP').show();
	}
	
	var report_type = {1: 'Inspection', 2: 'Blade Inspection', 3: 'Checklist'};
	
	// 이전 작성 된 보고서
	if(pre_reports) {
		$('ul#PRE_REPORT_LIST').html('');
		pre_reports.forEach((e) => {
			// sample 생성 
			var sample = _oam_elements.oam_0501.section3.li_pre_report_row({
				ID: e.RPT_ID,
				TYPE: report_type[e.TYPE],
				RPT_NM: e.RPT_NM,
				WRITER: e.INS_NM + ' (' + e.INS_ID + ')',
				DATETIME: e.DATETIME,
			});
			
			// li 클릭 이벤트
			sample = $(sample).find('.plan-lst-info-wrap').click(function(e) {
				// 왼쪽 radio, 오른쪽 a 태그 클릭 시 이벤트 막기  
				if(e.target !== e.currentTarget) return; 
				var info = $(this).parents('li').prop('info');
				console.log('상세페이지 이동', info);
				// 보고서 상세 페이지 이동
				if(info.TYPE === 1) window.location = ctx + '/oam2/oam_0200/reportDetail?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID + '&FROM_TOTALVIEW=Y';
				if(info.TYPE === 2) window.location = ctx + '/oam2/oam_0300/reportDetail?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID + '&FROM_TOTALVIEW=Y';
				if(info.TYPE === 3) window.location = ctx + '/oam2/oam_0400/reportDetail?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID + '&FROM_TOTALVIEW=Y';
			}).parents('li');
			
			// 보고서 PDF 다운로드 버튼 클릭 이벤트
			sample = $(sample).find('a[id*=DOWNLOAD_BTN]').click(function() {
				var info = $(this).parents('li').prop('info');
				// 보고서 PDF 다운로드
				if(info.TYPE === 1) window.location = ctx + '/oam2/oam_0200/downloadPDF.ajax?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID;
				if(info.TYPE === 2) window.location = ctx + '/oam2/oam_0300/downloadPDF.ajax?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID;
				if(info.TYPE === 3) window.location = ctx + '/oam2/oam_0400/downloadPDF.ajax?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID;
			}).parents('li');
			
			// 프로퍼티 추가
			sample = $(sample).css('cursor', 'pointer').prop('info', e);
			
			// 삽입 
			$('ul#PRE_REPORT_LIST').append(sample);
		});
	}
	// 새로운 보고서 리스트 생성
	if(new_reports) {
		$('ul#NEW_REPORT_LIST').html('');
		new_reports.forEach((e) => {
			// sample 생성 
			var sample = _oam_elements.oam_0501.section3.li_new_report_row({
				ID: e.RPT_ID,
				TYPE: report_type[e.TYPE],
				RPT_NM: e.RPT_NM,
				WRITER: e.INS_NM + ' (' + e.INS_ID + ')',
				DATETIME: e.DATETIME,
			});
			
			// li 클릭 이벤트
			sample = $(sample).find('.plan-lst-info-wrap').click(function(e) {
				// 왼쪽 radio, 오른쪽 a 태그 클릭 시 이벤트 막기  
				if(e.target !== e.currentTarget) return; 
				var info = $(this).parents('li').prop('info');
				console.log('상세페이지 이동', info);
				// 보고서 상세 페이지 이동
				if(info.TYPE === 1) window.location = ctx + '/oam2/oam_0200/reportDetail?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID + '&FROM_TOTALVIEW=Y';
				if(info.TYPE === 2) window.location = ctx + '/oam2/oam_0300/reportDetail?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID + '&FROM_TOTALVIEW=Y';
				if(info.TYPE === 3) window.location = ctx + '/oam2/oam_0400/reportDetail?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID + '&FROM_TOTALVIEW=Y';
			}).parents('li');
			
			// 보고서 PDF 다운로드 버튼 클릭 이벤트
			sample = $(sample).find('a[id*=DOWNLOAD_BTN]').click(function() {
				var info = $(this).parents('li').prop('info');
				// 보고서 PDF 다운로드
				if(info.TYPE === 1) window.location = ctx + '/oam2/oam_0200/downloadPDF.ajax?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID;
				if(info.TYPE === 2) window.location = ctx + '/oam2/oam_0300/downloadPDF.ajax?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID;
				if(info.TYPE === 3) window.location = ctx + '/oam2/oam_0400/downloadPDF.ajax?EVENT_ID=' + info.EVENT_ID + '&RPT_ID=' + info.RPT_ID;
			}).parents('li');
			
			// 프로퍼티 추가
			sample = $(sample).css('cursor', 'pointer').prop('info', e);
			
			// 삽입 
			$('ul#NEW_REPORT_LIST').append(sample);
		});
	}
	
	// 섹션 article padding 조정 : 숨김처리된 article 중 첫번째 요소 padding-top:0px;
	$('section#SECTION2 article').not('[style*=none]').eq(0).css('padding-top', '0px');
	// 섹션3 표시
	$('section#SECTION3').show();
}

function makeSensor(list) {
	
	// 기존 센서 지우기 
	$('ul#A_SENSOR_LIST li').not('li#ADD_SENSOR_BTN').remove();
	
	list.forEach((e, i) => {
		
		var keyword = e.keyword ? e.keyword.split('-') : [];
		
		// 샘플 생성 
		var sample = _oam_elements.oam_0501.section1.li_sensor_button({
			ID: e._id,
			SENSOR_NM: e.name,
			INDEX: i,
			POSITION: keyword[0] + '-' + keyword[1],
			MEASUREMENT: keyword[2] + '-' + keyword[3],
			UNIT: e.unit
		});
		
		// 클릭 이벤트 
		sample = $(sample).click(function() {
			
			var info = $(this).prop('info');
			
			// active 끄기 
			if($(this).hasClass('active')) {
				$(this).removeClass('active');
				$(this).css('background', '#fff');
				$(this).css('color', $(this).css('border-color'));
				_highchart.removeSeries('SENSOR_CHART', info._id);
			} 
			// active 켜기 
			else {
				$(this).addClass('active');
				$(this).css('background', $(this).css('border-color'));
				$(this).css('color', '#fff');
				
				_highchart.addSeries('SENSOR_CHART', makeSeries(_SENSOR.CHART.FROM_TIME_UTC, _SENSOR.CHART.TO_TIME_UTC, info, _SENSOR.CHART.DATE_ARRAY));
			}
		});
		
		// 컬러 추가 
		e.color = _oam_elements.oam_0501.section1.li_sensor_colors(i);
		
		// 프로퍼티 추가 
		sample = $(sample).prop('info', e);

		// 샘플 추가 
		$('ul#A_SENSOR_LIST li#ADD_SENSOR_BTN').before(sample);
		
		
		/* 센서 포지션 */
		// 샘플 생성
		var sample = _oam_elements.oam_0501.section1.span_sensor_point({
			ID: e._id,
			SENSOR_NM: e.name,
			POSITION: keyword[0] + '_' + keyword[1],
			INDEX: i,
		});
		// 샘플 추가 
		if(keyword[0].includes('BLADE')) $('li#AREA1 img').before(sample);
		else if(keyword[0].includes('TOWER')) $('li#AREA3 img').before(sample);
		else $('li#AREA2 img').before(sample);
	
	});
}

function makeSeries(from, to, sensor, date_arr, color) {
	
	// 데이터 조회 
//	var data = _oam.mongoDB.getSensorData({
//		sdate: from, 
//		edate: to, 
//		power_system_id: sensor.power_system_id, 
//		sensor_id: sensor._id
//	});
	
	// series 생성 (배열, id, name, 랜덤데이터 생성시 max, min ({sensor_max: 1, sensor_min: 0}), 랜덤데이터 생성 여부(boolean))
	//var sample_series = _highChartOptions.series.basicDatetime(_SENSOR.CHART.DATE_ARRAY, {});
	
	var occur_time = moment.tz(_SENSOR.CHART.ALARM_CURRENT_TIME_MILLISEC, 'UTC').set('second', 0).valueOf();
	var sample_series = _highchartOptions.series.oam_0501(date_arr, sensor._id, sensor.name, sensor, true, occur_time);
	
	// 데이터 파싱 
	//var series = _oam.matchDataToSeriesOfBasicDateTime(data, sample_series, 'timestamp', 'rms');
	
	return sample_series;
}


