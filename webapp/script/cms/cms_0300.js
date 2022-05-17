



/*
 * 			실행 순서 
 * 			1. init() : page 초기화
 * 				
 * 			
 */

var _farm = {};
var _group = {};
var _turbine = {};
var _sensor = {};

var _sensor_config = {}; 			// sensor max, min 설정 값을 임시 저장하는 변수

var _allow_sample_data = true;		// 작년도 Data가 없을 시, 임의의 랜덤 데이터 생성


/*
 * page 초기화
 */
function cms0300() {
	
	/* view setting - menu창 숨기기 */
	$('body').addClass('gnb-none');
	// $('body').removeClass('gnb-active');
	// $('.gnb-menu').removeClass('on');
	// $('html').addClass('cms-wrapper');
	
	/* css */
// $('.sensor-data-table-wrap').css('display', 'none');
	$('#chart_title').css('display', 'none');
	$('#chart_info').css('display', 'none');
	
	
	/* comboBox setting */
	// headerWithSelectBox('onSelect');
	headerWithSelectBox('_cms.selectCombo', {turbine: 'createSensorTable'});
	
	
	/* datetimepicker setting */
	// $('.datepicker').setDatePicker('yy-mm-dd');
	$('.datetimepicker').setDateTimePicker('yy-mm-dd');
	
	analysisJSON();
	
	/* search-btn setting */
	$('#search-btn').click(onSearch);
	
	/* Compoare Popup Element Event & CSS 추가 */

	// compare popup open / close 버튼
	$('#compare_btn').click(openPopup);
	$('.layer-close').click(closePopup);
	
	
	// search 버튼
	$('#compare-search-btn').click(onCompareSearch);
	
	// 모델 셀렉터 초기화
	initCompareModelSelector();
	
	// Model Add 버튼
	$('a.blank-info').click(function() {
		$('a#compare_model_add_btn').text('add');
	});
	
	// Model Selector Add 버튼
	$('#compare_model_add_btn').click(addCompareModel);
	// Model Selector Cancel 버튼
	$('#compare_model_cancel_btn').click(function() {
		$('.select-turbine-pop-close').click();
	});
	
	// chart legend(범례) click event
	$('#legend_this_year').click(_cms.clickLegend);
	$('#legend_last_year').click(_cms.clickLegend);
	// $('#legend_plotline').click(_cms.clickLegend);
	
	// chart format selector change event
	$('#chartFormatSelector').change(_cms.changeChartFomatSelector);
	
	
	_cms.cookieSetting();
}

/*
 * 검색 전 Controller * Combo Box 체크 * Date 체크 및 관련 Date 값 도출 - from_dt_local,
 * to_dt_local : 사용자 검색 날짜 (local 기준) - from_dt_utc, to_dt_utc : 사용자 검색 날짜 (UTC
 * 기준) - from_dt_local_last_year, to_dt_local_last_year : 사용자 검색 날짜 (local 기준 +
 * 작년) - from_dt_utc_last_year, to_dt_utc_last_year : 사용자 검색 날짜 (UTC 기준 + 작년) -
 * offset (Type : +09:00) : TimeZone Offset (node.js API Server 검색용) Issue)
 * offset 관련 : client_access_timezone 변수에 담겨있는 Timezone Code(ex. Asia/Seoul)를
 * 사용해도 되지만 현재 node.js Server에 request 요청 시 query string으로 요청을 한다.
 * 
 * 예를 들어,
 * 
 * 'http://address/SD/getSensorDataByDay/param1/param2/param3/Asia/Seoul'
 * 
 * 의 형식으로 요청을 보낼 경우 Timezone Code에 포함 된 '/' 가 문제가 되므로
 * 
 * 'http://address/SD/getSensorDataByDay/param1/param2/param3/+09:00'
 * 
 * offset으로 변경하여 요청을 보낸다.
 * 
 * 
 * '/' = %2F
 *  * Sensor 선택 체크
 */
function checkBeforeSearch() {
	
	var run = true;
	
	/* ComboBox 체크 */
	var farm_id = $('ul.select-machine.farm').attr('FARM_ID');
	var group_id = $('ul.select-machine.group').attr('GROUP_ID');
	var turbine_id = $('ul.select-machine.turbine').attr('GERATOR_ID');
	
	
	/* Date 체크 */
	var isCompare = ['onCompareSearch', 'addSeriesOfCompareModel'].includes(arguments.callee.caller.name);
	var from_dt = isCompare ? $('#compare_from_dt').val() : $('#from_dt').val();
	var to_dt = isCompare ? $('#compare_to_dt').val() : $('#to_dt').val();
	
	/* Date 생성 */
	var mFrom = moment.tz(from_dt, client_access_timezone);
	var mTo = moment.tz(to_dt, client_access_timezone);
	
	var mFrom_last_year = mFrom.clone().set('year', mFrom.get('year') - 1);
	var mTo_last_year = mTo.clone().set('year', mTo.get('year') - 1);
	
	// From ~ To Diff
	var diff = mTo.diff(mFrom);

	// search date
	var from_dt_local = mFrom.format('YYYY-MM-DD HH:mm:ss');
	var to_dt_local = mTo.format('YYYY-MM-DD HH:mm:ss');
	
	var from_dt_utc = mFrom.clone().tz('UTC').format('YYYY-MM-DD HH:mm:ss');
	var to_dt_utc = mTo.clone().tz('UTC').format('YYYY-MM-DD HH:mm:ss');
	
	// last year of search date
	var from_dt_local_last_year = mFrom_last_year.format('YYYY-MM-DD HH:mm:ss');
	var to_dt_local_last_year = mTo_last_year.format('YYYY-MM-DD HH:mm:ss'); 
	
	var from_dt_utc_last_year = mFrom_last_year.tz('UTC').format('YYYY-MM-DD HH:mm:ss');
	var to_dt_utc_last_year = mTo_last_year.tz('UTC').format('YYYY-MM-DD HH:mm:ss');
	
	/* Timezone Offset */
	var offset = moment.tz(client_access_timezone).format('Z');					// +09:00
	// moment.tz.zone(client_access_timezone).parse() * 60 * 1000; // -540 >
	// -32400000
	
	
	/* ComboBox Check 제어 */
	if(!turbine_id) {
		alert(_MESSAGE.common.selectItem('turbine'));
		return {run: !run};
	}
	
	/* Date Check 제어 */
	if(!from_dt || !to_dt) {
		alert(_MESSAGE.common.selectItem('datetime'));
		return {run: !run};
	} else {
		if(moment(to_dt).diff(moment(from_dt)) < 0) {
			alert(_MESSAGE.common.timeError);
			return {run: !run};
		} 
	}

	/* Sensor 선택 체크 */
	var sensor_id = $('tbody > tr.focus').attr('id');
	
	/* Sensor Check 제어 */
	if(!sensor_id) {
		if(!sensor_id) {
			alert(_MESSAGE.common.selectItem('sensor'));
			return {run: !run};
		}
	}
	
	
	/*
	 * Power System ID Component Class ID Component Class Name Sensor Name
	 */
	var power_system_id = _turbine[group_id][turbine_id].object_id;
	var component_class_id = $('#' + sensor_id).parent().attr('id');
	var component_class_name = _sensor[turbine_id][component_class_id].name;
	var sensor_name = _sensor[turbine_id][component_class_id][sensor_id].name;
	var sensor_max = _sensor[turbine_id][component_class_id][sensor_id].max;
	var sensor_min = _sensor[turbine_id][component_class_id][sensor_id].min;
	var sensor_unit = _sensor[turbine_id][component_class_id][sensor_id].unit;
	
	/* Cookie Setting */
	setCookie('from_dt', from_dt, 1, 'hour');
	setCookie('to_dt', to_dt, 1, 'hour');
	setCookie('sensor_id', sensor_id, 1, 'hour');
	setCookie('sensor_nm', sensor_name, 1, 'hour');
	setCookie('component_class_id', component_class_id, 1, 'hour');
	setCookie('component_class_nm', component_class_name, 1, 'hour');
	
	var obj = {
		run: run, 
		
		/* Date */
		from_dt_local: from_dt_local,
		to_dt_local: to_dt_local,
		from_dt_utc: from_dt_utc,
		to_dt_utc: to_dt_utc,
		
		from_dt_local_last_year: from_dt_local_last_year,
		to_dt_local_last_year: to_dt_local_last_year,
		from_dt_utc_last_year: from_dt_utc_last_year,
		to_dt_utc_last_year: to_dt_utc_last_year,
		
		legend_search_year: mFrom.get('year') === mTo.get('year') ? mTo.get('year') : mFrom.get('year') + ' ~ ' + mTo.get('year'),
		legend_last_year: mFrom.get('year') === mTo.get('year') ? mTo.get('year') - 1 : (mFrom.get('year') - 1) + ' ~ ' + (mTo.get('year') - 1),
		
		timezone: client_access_timezone,
		timezone_offset: offset,
		diff: diff,
		diff_range: 86400000,
		is1Day: (diff <= 86400000),
		format: $('#chartFormatSelector option:selected').val(),
		
		/* Target */
		farm_id: farm_id, 
		group_id: group_id, 
		turbine_id: turbine_id, 
		turbine_nm: _turbine[group_id][turbine_id].name,
		power_system_id: power_system_id,
		component_class_id: component_class_id,
		component_class_name: component_class_name,
		sensor_id: sensor_id, 
		sensor_name: sensor_name,
		sensor_max: sensor_max,
		sensor_min:	sensor_min,
		sensor_unit: sensor_unit,
	};
	
	return obj;
}

/**
 * Search 버튼 클릭 후 실행,
 * 
 * @returns
 */
function onSearch() {
	
	var param = checkBeforeSearch();
	if(!param.run) return;
	
	/* css setting */
	$('#chart_title').css('display', 'block');
	$('#chart_info').css('display', 'block');
	
	/* info setting */
	$('#component_class_name').text(param.component_class_name);
	$('#sensor_name').text(param.sensor_name);
	$('#sensor_name').attr('sensor_id', param.sensor_id);
	
	$('#legend_this_year').attr('series_id', param.legend_search_year);
	$('#legend_last_year').attr('series_id', param.legend_last_year);

	$('#this_year').text(param.legend_search_year);
	$('#last_year').text(param.legend_last_year);

	var type = param.is1Day ? 'sec' : param.format;
	param.format = type;
	var pattern = param.is1Day ? 10 : 1;
	var timezone = param.is1Day ? param.timezone : param.timezone;

	var from = param.from_dt_utc;
	var to = param.to_dt_utc;
	var from_last_year = param.from_dt_utc_last_year;
	var to_last_year = param.to_dt_utc_last_year;
	
	
	// 입력 구간 mongoDB 검색
	var data;
	// @JK
// if(param.is1Day) {
// data = _cms.mongoDB.getSensorData({sdate: param.from_dt_utc, edate:
// param.to_dt_utc, power_system_id: param.power_system_id, sensor_id:
// param.sensor_id, allow_last_year: true});
// } else {
// data = _cms.mongoDB.getSensorDataByFormat({sdate: param.from_dt_utc, edate:
// param.to_dt_utc, power_system_id: param.power_system_id, sensor_id:
// param.sensor_id, timezone_offset: param.timezone_offset, format:type,
// allow_last_year: true});
// }
// console.log(data);
	
	// dataArray 생성
	var arr_this_year = _moment.createRegularDateArray(from, to, type, pattern, 'UTC', timezone, true);
	var arr_last_year = _moment.createRegularDateArray(from_last_year, to_last_year, type, pattern, 'UTC', timezone, true);
	
	// chart의 sample series 생성
// var sampleSeries_this_year =
// _highchartOptions.series.basicDatetime(arr_this_year,
// param.legend_search_year, param.legend_search_year, param);
// var sampleSeries_last_year =
// _highchartOptions.series.basicDatetime(arr_last_year, param.legend_last_year,
// param.legend_last_year, param, _allow_sample_data);
	
	// sample series에 Data Parsing
// var series_this_year = _cms.matchDataToSeriesOfBasicDateTime(data.this_year,
// sampleSeries_this_year, 'timestamp', 'rms');
// var series_last_year = _cms.matchDataToSeriesOfBasicDateTime(data.last_year,
// sampleSeries_last_year, 'timestamp', 'rms');
	
	// @JK - 지우기
	var series_this_year = _highchartOptions.series.basicDatetime(arr_this_year, param.legend_search_year, param.legend_search_year, param, _allow_sample_data);
	var series_last_year =_highchartOptions.series.basicDatetime(arr_last_year, param.legend_last_year, param.legend_last_year, param, _allow_sample_data);
	
	
	// last_year series 변환
	var series = _cms.convertLastYear(series_last_year, series_this_year, timezone);
	
	// chart 그리기
	drawChart(param, series, 'container1');
}

/**
 * Chart 일자 도트 클릭시 일자에 해당하는 Chart 다시 Draw
 * 
 * @param from
 * @param to
 * @returns
 */
// function decomposeChart(from, to) {
// $('#from_dt').val(moment.tz(from,
// 'UTC').tz(client_access_timezone).format('YYYY-MM-DD HH:mm:ss'));
// $('#to_dt').val(moment.tz(to,
// 'UTC').tz(client_access_timezone).format('YYYY-MM-DD HH:mm:ss'));
// var param = checkBeforeSearch();
// var data = _cms.mongoDB.getSensorData({sdate: from, edate: to,
// power_system_id: param.power_system_id, sensor_id: param.sensor_id,
// allow_last_year: true});
// var arr = _moment.createRegularDateArray(from, to, 'sec', 10);
// var sampleSeries = _highchartOptions.series.twoDiffYear(arr, param.last_year,
// param.this_year);
// var series = _cms.matchDataToSeriesOfTwoDiffYear(data, sampleSeries, 'UTC',
// param.timezone, 'timestamp', 'rms');
// drawChart(param, series, 'container1');
// }


/**
 * Draw chart
 * 
 * @param param :
 *            checkBeforeSearch return value
 * @param series :
 *            chart series
 * @param container_id :
 *            chart container id
 * @returns
 */
function drawChart(param, series, container_id) {
	
	// 기존 Chart 삭제
	_highchart.deleteChartByID(container_id);
	// param.chart_width =
	// parseInt($('#'+container_id).css('width').replace('px', ''));
	
	// var callback = param.is1Day ? undefined : decomposeChart;
	var callback = param.is1Day ? undefined : onSearch;
	
	// chart option 생성
	var options = _highchartOptions.cms_0300[container_id](param, callback);
	
	// option, series merge
	options = _highchart.mergeOptions(options, {series: series});
	
	// draw chart
	// $('#container1').highcharts('StockChart', options);
	var chart = Highcharts.chart(container_id, options);
	
	// container1 chart view setting (chart value의 min, max 값과 plotline을 비교하여 초기
	// view 위치 생성)
	if((param.sensor_max > chart.yAxis[0].max || param.sensor_min < chart.yAxis[0].min) && container_id == 'container1') { 
		var max = param.sensor_max > chart.yAxis[0].max ? param.sensor_max : chart.yAxis[0].max;
		var min = param.sensor_min < chart.yAxis[0].min ? param.sensor_min : chart.yAxis[0].min;
		_highchart.setAxisView(container_id, min, max, 'y');
	}
	return chart;
}


/**
 * sensor table 생성
 * 
 * @param turbine_id
 * @returns
 */
function createSensorTable(turbine_id) {
	
	turbine_id = turbine_id || $('ul.select-machine.turbine li.active a').attr('id');
	
	if($('#table_area').children().length > 0) {
		$('#table_area_wrap').mCustomScrollbar('destroy');		// table
																// scroller 삭제
		$('#table_area').html('');								// 기존 table 내용
																// 삭제
	}
	
	if(!turbine_id) return;
	
	for(var key in _sensor[turbine_id]) {
		
		if(key === 'sensor_list' || key === 'keyword_list') continue;
		
		for(var key2 in _sensor[turbine_id][key]) {
			
			if(key2 === 'name') {
				var table_sample = _cms_elements.cms_0300.main.div_component_class_table({
					id: key, 
					name: _sensor[turbine_id][key].name
				});
				$('#table_area').append(table_sample);
			} 
			else  {
				var row_sample = _cms_elements.cms_0300.main.div_sensor_row({
					id: key2, 
					name:_sensor[turbine_id][key][key2].name 
				});
				$('#' + key).append(row_sample);
			}
			
		}
	}
	
	activeTable();
	updateLatestSensorData();
	initSensorTable();
}

/**
 * sensor table 초기화
 * 
 * @returns
 */
function initSensorTable() {
	
	// cookie에 sensor_id가 존재 할 경우,

	// sensor row focusing
	$('#'+getCookie('sensor_id')).addClass('focus');
	
	// sensor 위치로 scroll 조정
	if($('tr[class="focus"]').length > 0) {
		var index = $('tr[class="focus"]').parents('div[class*="sensor-table-wrap"]').index();
		var width = $('#table_area').children('div[class*="sensor-table-wrap"]').toArray().reduce((t, e, i) => { 
			if(i<index) t = t + parseInt(e.style.width.replace('px', ''));
			return t;
		}, 0);
		$('#table_area').parent('.mCSB_container').css('left', '-' + width + 'px');
	}
	
}

/*
 * Sensor Table 활성화
 */
function activeTable() {
	
	/* 수정, 완료 버튼 활성화 */
// $('.sensor-data-btn-modify').click(function() {
// $(this).parents('.sensor-table-default').addClass('sensor-table-default-active');
// });
// $('.sensor-data-btn-complete').click(function() {
// $(this).parents('.sensor-table-default').removeClass('sensor-table-default-active');
// });
	
	// sensor 수정, 완료 버튼 event 추가
	$('.sensor-data-btn-modify').click(sensorMinMaxValueSetting);
	$('.sensor-data-btn-complete').click(sensorMinMaxValueSetting);
	
	// sensor table scroll 활성화
	$(".sensor-data-table-wrap").mCustomScrollbar({
	    axis: "x",
	    advanced: {
	      autoExpandHorizontalScroll: true
	    },
	    theme: "minimal-dark",
	    mouseWheelPixels: 100		// 300
	});
	$(".sensor-data-table-wrap .sensor-table-wrap.sensor-table-wrap-m").mCustomScrollbar({
	    axis: "Y",
	    theme: "minimal-dark",
	    mouseWheelPixels: 100		// 300
	});
	
	/* sensor row click event 추가 */
	$('.sensor-table-wrap .base_grid_table tr td > a').click(function() {
		$('tbody > tr.focus').removeClass('focus');
	    $(this).parents('tr').addClass('focus').siblings().removeClass('focus');
	});
}

/**
 * sensor min, max value 설정
 * 
 * @returns
 */
function sensorMinMaxValueSetting() {
	
	
	var component_class_id = $(this).siblings('.base_grid_table').find('tbody').attr('id');
	var sensors = $(this).siblings('.base_grid_table').find('tbody').find('input').map((i, e) => e).toArray();
	
	/* complete */
	if($(this).parents('.sensor-table-default').attr('class').includes('sensor-table-default-active')) {
		$(this).parents('.sensor-table-default').removeClass('sensor-table-default-active');
		
		sensors.forEach((e) => {
			
			/*
			 * e.name : sensor_id e.placeholder : min / max e.value : setting
			 * value
			 */
			
			// 임시 저장 된 sensor min,max value와 수정 후 value 비교 하여 다를 경우,
			if(_sensor_config[component_class_id][e.name][e.placeholder] !== e.value) {
				
				/* MongoDB sensor max, min update */
				_cms.mongoDB.updateSensor({sensor_id: e.name, field: e.placeholder, value: e.value});
				
				var value = parseFloat(e.value);
				
				/* 기존 sensor max, min update */
				var turbine_id = $('ul.select-machine.turbine').attr('GERATOR_ID');
				_sensor[turbine_id][component_class_id][e.name][e.placeholder] = value;
				
				/* 현재, chart의 sensor_id와 수정 된 sensor_id가 일치 할 경우, chart refresh */
				if($('#sensor_name').attr('sensor_id') === e.name) {
// var plotLine_options = _highchart.getPlotLine('container1', e.placeholder,
// 'y').options;
// var new_options = JSON.parse(JSON.stringify(plotLine_options));
// _highchart.removePlotLines('container1', e.placeholder, 'y');
// new_options.label.text = e.placeholder + ' : ' + value;
// new_options.value = value;
// _highchart.addPlotLines('container1', new_options, 'y');
//					
//					
// /* Axis View */
// var max = _highchart.getAxisValue('container1', 'max', 'y');
// var min = _highchart.getAxisValue('container1', 'min', 'y');
// var tickInterval = _highchart.getAxisValue('container1', 'tickInterval',
// 'y');
// var dataMax = _highchart.getAxisValue('container1', 'dataMax', 'y');
// var dataMin = _highchart.getAxisValue('container1', 'dataMin', 'y');
//					
// //var flaf = false;
//					
// var newMax, newMin;
// if(e.placeholder === 'max') {
// //flag = max < value ? true : false;
// // if(max < value) max = max < value ? value + tickInterval : max;
// // if(max > value) max = dataMax + tickInterval < max ? max - tickInterval :
// max;
//						
// newMax = max <= value ? value + tickInterval : max;
// //newMax = dataMax + tickInterval < max ? max - tickInterval : max;
//						
// //newMax = max > value ? dataMax + (2 * tickInterval) < max ? dataMax + (2 *
// tickInterval) - tickInterval : max : newMax;
// newMax = max > value ? dataMax + (2 * tickInterval) < max ? dataMax +
// tickInterval : max : newMax;
//						
// } else {
// //flag = min > value ? true : false;
// // if(min > value) min = min > value ? value - tickInterval : min;
// // if(min < value) min = dataMin - tickInterval > min ? min + tickInterval :
// min;
//						
// if(min > value) newMin = min > value ? value - tickInterval : min;
// else newMin = dataMin - tickInterval > min ? min + tickInterval : min;
// }
//					
//
// _highchart.setAxisView('container1', newMin, newMax, 'y');
					
					onSearch();
				}
			}
		});
		// 임시 저장 된 value 삭제
		delete _sensor_config[component_class_id];
	} 
	/* update */
	else {
		// setting 창으로 변경
		$(this).parents('.sensor-table-default').addClass('sensor-table-default-active');
		// 현재 sensor min, max value 임시 저장
		_sensor_config[component_class_id] = {};
		sensors.forEach((e) => {
			if(!_sensor_config[component_class_id][e.name]) {
				_sensor_config[component_class_id][e.name] = {};
			} 
			_sensor_config[component_class_id][e.name][e.placeholder] = e.value;
		});
	}
	
}



/**
 * Sensor Table의 Value Setting
 * 
 * @returns
 */
function updateLatestSensorData() {
	
	var farm_id = $('ul.select-machine.farm').attr('FARM_ID');
	var group_id = $('ul.select-machine.group').attr('GROUP_ID');
	var turbine_id = $('ul.select-machine.turbine').attr('GERATOR_ID');
	
	var result = _cms.mongoDB.getLatestSensorData({power_system_id: _turbine[group_id][turbine_id].object_id, list: JSON.stringify(_sensor[turbine_id].sensor_list)});
	
	// key : sensor_id
	for(var key in result) {
		
		if(result[key].length > 0) {
			
			var component_class_id = $('#' + key).parent().attr('id');
			var hasError;
			// min, max 기준치 벗어날 경우 error
			hasError = (_sensor[turbine_id][component_class_id][key].max < result[key][0].rms || _sensor[turbine_id][component_class_id][key].min > result[key][0].rms) ? true : false;
			
			$('#' + key + 'Value').text(result[key][0].rms);
			$('#' + key + 'Row').attr('class', 'sensor-data-result ' +  (hasError ? 'error' : 'clear'));
			$('#' + key + 'Max').val(_sensor[turbine_id][component_class_id][key].max);
			$('#' + key + 'Min').val(_sensor[turbine_id][component_class_id][key].min);
			
			
			/* unit */
			var unit, flag = false;
			for(var sensor_id in _sensor[turbine_id][component_class_id]) {
				if(sensor_id !== 'name') {
					if(!unit) {
						unit = _sensor[turbine_id][component_class_id][sensor_id].unit;
					}
					flag = unit === _sensor[turbine_id][component_class_id][sensor_id].unit ? true : false;
				}
			}
			
			// table 내 모든 센서의 unit(단위)가 같을 경우, 통일
			if(flag) {
				$('#' + component_class_id + 'Unit').text('Unit : ' + _sensor[turbine_id][component_class_id][key].unit);
			} else {
				$('#' + key + 'Unit').text(' ['+_sensor[turbine_id][component_class_id][key].unit+']');
			}
			
		}
	}
}

/**
 * 초기 json_turbine을 Parsing하여 init Data 생성 (page load 후 한 번 실행)
 * 
 * @returns
 */
function analysisJSON() {
	
	var list = [];
	
	/* create farm, group, turbine */
	json_turbine.forEach(function(item) {
		
		// OBJECT_ID가 등록 된 turbine list 저장
		if(item.OBJECT_ID) {			
			var obj = {};
			obj['TURBINE_ID'] = item.GERATOR_ID;
			obj['POWER_SYSTEM_ID'] = item.OBJECT_ID;
			list.push(obj);			
		}
		
		// farm 분류
		if(!_farm[item.FARM_ID]) {
			_farm[item.FARM_ID] = { id: item.FARM_ID, name:item.FARM_NM };
		}
		
		// group 분류
		if(!_group[item.FARM_ID]) {
			_group[item.FARM_ID] = {};
		} 
		if(!_group[item.FARM_ID][item.GROUP_ID]) {
			_group[item.FARM_ID][item.GROUP_ID] = { id: item.GROUP_ID, name: item.GROUP_NM };
		}
		
		// turbine 분류
		if(!_turbine[item.GROUP_ID]) {
			_turbine[item.GROUP_ID] = {};
		} 
		if(!_turbine[item.GROUP_ID][item.GERATOR_ID])  {
			_turbine[item.GROUP_ID][item.GERATOR_ID] = { 
					id: item.GERATOR_ID, 
					name: item.GERATOR_NM,
					manufacture_nm: item.MANUFACTURER_NM,
					manufacture_logo: item.MANUFACTURER_LOGO,
					object_id: item.OBJECT_ID,
					model_nm: item.MODEL_NM,
			};
		}
		
	});
	
	
	// sensor 요청
	var result = _cms.mongoDB.getSensor(JSON.stringify(list));
	var list = [];
	
	/* create sensor */
	result.forEach(function(item) {
		
		if(!_sensor[item.TURBINE_ID]) {
			_sensor[item.TURBINE_ID] = {};
		}
		
		
		for(var i=0; i<item.SENSOR.length; i++){
			
			/* 검색을 위해 turbine에 포함된 sensor들의 id list */
			if(!_sensor[item.TURBINE_ID]['sensor_list']) {
				_sensor[item.TURBINE_ID]['sensor_list'] = [];
				_sensor[item.TURBINE_ID]['keyword_list'] = [];
			}
			_sensor[item.TURBINE_ID]['sensor_list'].push(item.SENSOR[i]._id);
			_sensor[item.TURBINE_ID]['keyword_list'].push(item.SENSOR[i].keyword);
			
			
			/* component_class 별로 sensor Object 생성 */
			var component_class_id = item.SENSOR[i].component_class_id;
			
			/* component class name */
			if(!_sensor[item.TURBINE_ID][component_class_id]) {
				_sensor[item.TURBINE_ID][component_class_id] = {
					name: item.SENSOR[i].component_class_name
				}
			}
			
			/* Sensor 정보 저장 */
			_sensor[item.TURBINE_ID][component_class_id][item.SENSOR[i]._id] = {					
				name: item.SENSOR[i].name,
				max: item.SENSOR[i].max,
				min: item.SENSOR[i].min,
				keyword: item.SENSOR[i].keyword,
				unit: item.SENSOR[i].unit.toLowerCase() === 'meterpersecondsquared' ? 'm/s^2' : item.SENSOR[i].unit,
			}
			
			list.push(item.SENSOR[i]._id);
		}

	});

}
/**
 * ******************************************** Popup Function
 * *********************************************
 */

/**
 * compare popup 버튼 클릭
 * 
 * @returns
 */
function openPopup() {
	
	var param = checkBeforeSearch();
	if(!param.run) return;
	
	/* css setting */
	$("#layerPopup").addClass('active');
	
	/* info setting */
	$('#compare_component_class_name').text(param.component_class_name);
	$('#compare_sensor_name').text(param.sensor_name);
	
	/* init component_class list */
	for(var key in _sensor[param.turbine_id]) {
		if(key !== 'sensor_list' && key !== 'keyword_list') {
			var obj = {
				name: _sensor[param.turbine_id][key].name,
				id: key,
				turbine_id: param.turbine_id,
			};
			/* component_class list 버튼 삽입 */
			$('#compare_component_class').append(_cms_elements.cms_0300.popup.li_component_class(obj));
		}
	} 
	/* component_class list > a : click 이벤트 추가 */
	$('#compare_component_class > li > a').click(clickCompareComponentClass);
	
	/* 사용자 설정 target component_class click */
	$('#compare_component_class > li > a#' + param.component_class_id + '-Compare' ).click();
	
	/* 사용자 설정 target model sample 추가 */
	var id = _turbine[param.group_id][param.turbine_id].id;
	var name = _turbine[param.group_id][param.turbine_id].name;
	var manufacture = _turbine[param.group_id][param.turbine_id].manufacture_nm.toString().toUpperCase();
	var logo = _turbine[param.group_id][param.turbine_id].manufacture_logo;
	var model = _turbine[param.group_id][param.turbine_id].model_nm;
	
	var model_sample = _cms_elements.cms_0300.popup.li_turbine_model({ 
		id: id, 
		name: name, 
		manufacture: manufacture, 
		logo: logo, 
		model:model, 
		group_id: param.group_id, 
		sortation:'target' 
	});
	$('#compare_model').prepend(model_sample);
	
	$('#compare_from_dt').val(moment.tz(param.from_dt_local, client_access_timezone).format('YYYY-MM-DD HH:mm:ss'));
	$('#compare_to_dt').val(moment.tz(param.to_dt_local, client_access_timezone).format('YYYY-MM-DD HH:mm:ss'));
	
	// onCompareSearch();
	/* 사용자 설정 target sensor radio click */
	$('#radio-' + param.sensor_id + ' + label').click();
}

/**
 * compare popup 창 닫기 버튼 클릭
 * 
 * @returns
 */
function closePopup() {
	
	/* 날짜 검색 바 초기화 */
	$('#compare_from_dt').val('');
	$('#compare_to_dt').val('');
	
	/* component class list 삭제 */
	$('#compare_component_class li').remove();
	
	/* compare model 삭제 */
	$('#compare_model li.target').remove();
	
}

/**
 * Compare Search
 * 
 * @returns
 */
function onCompareSearch() {
	
	var param = checkBeforeSearch();
	if(!param.run) return;
	
	var model_list = $('#compare_model > li[class!=add]').toArray();
	var target_keyword, series = [];
	
	model_list.forEach((e) => {
		if(e.attributes.class.value === 'target') {
			target_keyword = $('#compare_sensor > li.active > input').attr('keyword');
		} 
		
		var group_id = e.attributes.group_id.value;
		var turbine_id = e.attributes.turbine_id.value;
		var power_system_id = _turbine[group_id][turbine_id].object_id;
		var model_nm = e.attributes.model_nm.value;
		
		var i = _sensor[turbine_id].keyword_list.indexOf(target_keyword);
		var sensor_id = _sensor[turbine_id].sensor_list[i];
		
		
		// 입력 구간 mongoDB 검색
		var data;
		if(param.is1Day) {
			data = _cms.mongoDB.getSensorData({sdate: param.from_dt_utc, edate: param.to_dt_utc, power_system_id: power_system_id, sensor_id: sensor_id, allow_last_year: false});
		} else {
			data = _cms.mongoDB.getSensorDataByFormat({sdate: param.from_dt_utc, edate: param.to_dt_utc, power_system_id: power_system_id, sensor_id: sensor_id, timezone_offset: param.timezone_offset, format:'day', allow_last_year: false});
		}
		console.log(data);
		
		// 입력 시간 dataArray 생성
		var type = param.is1Day ? 'sec' : 'day';
		var pattern = param.is1Day ? 10 : 1;
		var timezone = param.timezone;
		
		
		var from = param.from_dt_utc;
		var to = param.to_dt_utc;
		
		
		var arr = _moment.createRegularDateArray(from, to, type, pattern, 'UTC', timezone, true);
		
		// chart의 series init Data 생성
		var sampleSeries = _highchartOptions.series.basicDatetime(arr, turbine_id, model_nm);
		
		// series 생성
		var s = _cms.matchDataToSeriesOfBasicDateTime(data, sampleSeries, 'timestamp', 'rms');
		
		series.push(s);
	});

	// 차트 그리기
	var chart = drawChart(param, series, 'container2');
	
	$('ul#compare_legend').html('');
	// 차트 legend 추가
	chart.series.forEach((e) => {
		var legend = _cms_elements.cms_0300.popup.li_chart_legend({
			id: e.userOptions.id, 
			name: e.userOptions.name, 
			color: e.color
		});
		$('ul#compare_legend').append(legend);
	});
	
	// click event 추가
	$('ul#compare_legend > li').click(_cms.clickLegend);
	
}

/**
 * Compare Model 선택 창 SelectBox 초기화 Farm, Group, Turbine
 * 
 * 단) Turbine이 존재하지 않는 Farm, Group은 제외 된다.
 * 
 * @returns
 */
function initCompareModelSelector() {
	
	/* Farm Model SelectBox 초기화 */
	for(var key in _farm) {
		$('#selectFarm').append(_cms_elements.cms_0300.popup.option_selector_option(_farm[key]));
	}
	
	/* Farm Model SelectBox change Event 추가 */
	$('#selectFarm').change(function() {
		/* 기존 추가된 option 삭제 : init option 제외 */
		$('#selectGroup option[value!=000]').remove();
		
		/*
		 * Farm에 속한 Group List를 SelectBox에 추가 this.value = farm_id
		 */
		for(var key in _group[this.value]) {
			$('#selectGroup').append(_cms_elements.cms_0300.popup.option_selector_option(_group[this.value][key]));
		}
	});
	
	/* Group Model SelectBox change Event 추가 */
	$('#selectGroup').change(function() {
		/* 기존 추가된 option 삭제 : init option 제외 */
		$('#selectTurbine option[value!=000]').remove();
		
		/*
		 * Group에 속한 Turbine List를 SelectBox에 추가 this.value = group_id
		 */
		for(var key in _turbine[this.value]) {
			
			// 사용자가 이미 선택한 터빈은 CompareTarget list 에서 제외
			if($('ul#compare_model > li[turbine_id=' + key + ']').toArray().length === 0) {
			
				/*
				 * TODO : Name에 Manufacture / Model 로 변경해야함 현재 : Manufacture /
				 * TurbineName
				 */
				var id = _turbine[this.value][key].id;
				var name = _turbine[this.value][key].name + ' / ' + _turbine[this.value][key].model_nm;
				$('#selectTurbine').append(_cms_elements.cms_0300.popup.option_selector_option({id:id, name:name}));
			}
		}
	});
}

/**
 * Compare Model 추가 시 기존 차트 Series 추가
 * 
 * @param farm_id
 * @param group_id
 * @param turbine_id
 * @returns
 */
function addSeriesOfCompareModel(farm_id, group_id, turbine_id) {
	
	var param = checkBeforeSearch();
	if(!param.run) return;
	
	// target의 keyword 검색
	var keyword = $('#compare_sensor').children('li.active').children('input').attr('keyword');
	// compare target의 keyword list index 찾기
	var i = _sensor[turbine_id].keyword_list.indexOf(keyword);
	// sensor 찾기
	var sensor_id = _sensor[turbine_id].sensor_list[i];
	// turbine_name
	var model_nm = _turbine[group_id][turbine_id].model_nm;
	// power_system_id
	var power_system_id = _turbine[group_id][turbine_id].object_id;
	
	// 검색
	var data; 
	if(param.is1Day) {
		data = _cms.mongoDB.getSensorData({sdate: param.from_dt_utc, edate: param.to_dt_utc, power_system_id: power_system_id, sensor_id: sensor_id, allow_last_year: false});
	} else {
		data = _cms.mongoDB.getSensorDataByFormat({sdate: param.from_dt_utc, edate: param.to_dt_utc, power_system_id: power_system_id, sensor_id: sensor_id, timezone_offset: param.timezone_offset, format:'day', allow_last_year: false});
	}
	console.log(data);
	
	
	// 입력 시간 dataArray 생성
	var type = param.is1Day ? 'sec' : 'day';
	var pattern = param.is1Day ? 10 : 1;
	var timezone = param.timezone;
	var from = param.from_dt_utc;
	var to = param.to_dt_utc;
	
	var arr = _moment.createRegularDateArray(from, to, type, pattern, 'UTC', timezone, true);
	
	// chart의 series init Data 생성
	var sampleSeries = _highchartOptions.series.basicDatetime(arr, turbine_id, model_nm);
	
	// series 생성
	var series = _cms.matchDataToSeriesOfBasicDateTime(data, sampleSeries, 'timestamp', 'rms');
	
	// addSeries
	var series = _highchart.addSeries('container2', series);
	
	// 차트 legend 추가
	var legend = _cms_elements.cms_0300.popup.li_chart_legend({id: series.userOptions.id, name: series.userOptions.name, color: series.color});
	$('ul#compare_legend').append(legend);
	
	// click event 추가
	$('ul#compare_legend > li#legend-' + series.userOptions.id).click(_cms.clickLegend);
	
}

/**
 * Component Class list(li) 클릭 이벤트
 * 
 * @returns
 */
function clickCompareComponentClass() {
	
	/* css setting */
	$(this).parent().addClass('active').siblings().removeClass('active');
	
	/* sensor 선택창 열기 */
	$('.layer-popup-menu').attr('class').includes('active') ? null : $('.layer-popup-menu').addClass('active');
	
	var component_class_id = $(this).attr('component_class_id');
	var component_class_name = $(this).text();
	var turbine_id = $(this).attr('turbine_id');
	
	
	/*
	 * compare sensor list 선택창 1) title(controller name) 변경 2) 기존 sensor list 삭제
	 * 3) sensor list 추가 4) sensor list 클릭 이벤트 추가
	 */
	/* title(controller name) 변경 */
	$('#compare_sensor_title').text(component_class_name);
	
	/* 기존 sensor list 삭제 */
	$('#compare_sensor li').remove();

	/* sensor list(li) 추가 */
	for(var key in _sensor[turbine_id][component_class_id]) { 
		if(key != 'name') {
			var sensor_sample = _cms_elements.cms_0300.popup.li_sensor({
				id: key, 
				name: _sensor[turbine_id][component_class_id][key].name, 
				keyword: _sensor[turbine_id][component_class_id][key].keyword
			});
			$('#compare_sensor').append(sensor_sample);
		}
	}
	
	/* sensor li 클릭 이벤트 추가 */ 
	$('.checkbox-radio-custom input[type="radio"] + label').click(function() {
		
		$(this).parents('li').addClass('active');
		$(this).parents('li').siblings('li').removeClass('active');
		
		/* title 수정 */ 
		var compnent_class_name = $('#compare_sensor_title').text();
		var sensor_name = $(this).attr('sensor-name');
		$('#compare_component_class_name').text(compnent_class_name);
		$('#compare_sensor_name').text(sensor_name);
		
		/* 선택창 닫기 */ 
		$('.layer-popup-menu').removeClass('active');
		
		/* chart 그리기 */
		onCompareSearch();
	});
	
};

/**
 * Compoare Model 추가 * Popup창의 Model Select 창의 Add or Change 버튼 클릭시 실행 - add :
 * Compare Model을 새로 추가 - change : 기존 추가된 Compare Model을 변경시
 * 
 * @returns
 */
function addCompareModel() {
	
	/* 버튼의 Text 별로 처리가 변경 된다. process = add, change */
	var process = $(this).text();
	
	/* change일 경우 기존 추가된 Model의 turbine_id를 가져옴 */
	var id = $(this).attr('target-id');
	
	var farm_id = $('#selectFarm option:selected').val();
	var group_id = $('#selectGroup option:selected').val();
	var turbine_id = $('#selectTurbine option:selected').val();
	
	/* 현재 추가 된 모델 일 경우, 제어 */ 
	if($('ul#compare_model li#model-'+turbine_id).length > 0) return alert(_MESSAGE.cms.alreadyModel);
	
	/* model을 선택 하지 않았을 경우, 제어 */
	if((farm_id == '000') || (group_id == '000') || (turbine_id == '000')) return alert(_MESSAGE.common.selectItem('turbine model')); 
		
	/* 선택 된 Compare Model 추가 */
	var manufacture = _turbine[group_id][turbine_id].manufacture_nm.toString().toUpperCase();
	var logo = _turbine[group_id][turbine_id].manufacture_logo;
	var model = _turbine[group_id][turbine_id].model_nm.toString().toUpperCase();
	
	var model_sample = _cms_elements.cms_0300.popup.li_turbine_model({ 
		id: turbine_id, 
		model:model, 
		logo: logo, 
		manufacture: manufacture, 
		group_id: group_id, 
		sortation:'compare_target' 
	});
	
	$('#compare_model > .add').before(model_sample);
	
	
	/* 추가된 Model 변경, 삭제 버튼 이벤트 추가 */ 
	$('#change-' + turbine_id).click(function() {
		var id = $(this).parents('li').attr('turbine_id');
		$('a#compare_model_add_btn').attr('target-id', id);
		$('a#compare_model_add_btn').text('Change');
		$('div.select-turbine-pop').addClass('active');
	});
	
	$('#delete-' + turbine_id).click(function() {
		var id = $(this).parents('li').attr('turbine_id');
		// chart series 삭제
		_highchart.removeSeries('container2', id);
		// chart legend 삭제
		$('#compare_legend > li#legend-' + id).remove();
		// model 삭제
		$(this).parents('li').remove();
	});
	
	
	// process가 change 일 경우, 기존 모델 삭제
	if(process.toLowerCase() == 'change') {
		// chart series 삭제
		_highchart.removeSeries('container2', id);
		// chart legend 삭제
		$('#compare_legend > li#legend-' + id).remove();
		$('li#model-'+id).remove();
	}
	
	// selector 초기화
	$('#selectFarm option:eq(0)').prop('selected', true);
	$('#selectFarm').parent('div').children('label').text($('#selectFarm option:eq(0)').text());
	$('#selectGroup option:eq(0)').prop('selected', true);
	$('#selectGroup').parent('div').children('label').text($('#selectGroup option:eq(0)').text());
	$('#selectTurbine option:eq(0)').prop('selected', true);
	$('#selectTurbine').parent('div').children('label').text($('#selectTurbine option:eq(0)').text());
	
	$('#selectGroup option[value!=000]').remove();
	$('#selectTurbine option[value!=000]').remove();
	
	// Model Select 창 닫기
	$('.select-turbine-pop-close').click();
	
	addSeriesOfCompareModel(farm_id, group_id, turbine_id);
};






