

/*
 * 		page 초기화
 */
function cms0500() {
	
	/* view setting - menu창 숨기기 */
	$('body').addClass('gnb-none');
//	$('body').removeClass('gnb-active');
//	$('.gnb-menu').removeClass('on');
	//$('html').addClass('cms-wrapper');
	
	/* comboBox setting */
	//headerWithSelectBox('onSelect');
	headerWithSelectBox('_cms.selectCombo');
	
	/* datetimepicker setting */
	//$('.datetimepicker').setDateTimePicker('yy-mm-dd');
	$('.datepicker').setDatePicker('yy-mm-dd');
	
	/* search-btn setting */
	$('#search-btn').click(onSearch);
	
	/* css */
	$('.chart-info-wrap').css('display', 'none');
	$('.txt-right').css('display', 'none');
	$('.base_grid_table').css('display', 'none');
	
	// chart download 버튼 click event
	$('#dw_png_btn').click(_cms.downloadChartFile);
	$('#dw_pdf_btn').click(_cms.downloadChartFile);
	
	// chart legend(범례) click event
	$('#legend_this_year').click(_cms.clickLegend);
	$('#legend_last_year').click(_cms.clickLegend);
	
	// chart format selector change event
	$('#chartFormatSelector').change(_cms.changeChartFomatSelector);
	
	_cms.cookieSetting();
}

function checkBeforeSearch() {
	
	var run = true;
	
	/* ComboBox 체크 */
	var farm_id = $('ul.select-machine.farm').attr('FARM_ID');
	var group_id = $('ul.select-machine.group').attr('GROUP_ID');
	var turbine_id = $('ul.select-machine.turbine').attr('GERATOR_ID');
	
	/* Date 체크 */
	var from_dt = $('#from_dt').val();
	var to_dt = $('#to_dt').val();
	
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
	//moment.tz.zone(client_access_timezone).parse() * 60 * 1000;				// -540 > -32400000
	
	
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
	
	
	/* Cookie Setting */
	setCookie('from_dt', from_dt, 1, 'hour');
	setCookie('to_dt', to_dt, 1, 'hour');

	
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
	};
	
	return obj;
}


function onSearch() {
	
	var param = checkBeforeSearch();
	if(!param.run) return; 
	
	$('.chart-info-wrap').css('display', 'block');
	$('.txt-right').css('display', 'block');
	$('.base_grid_table').css('display', 'block');
	
	$('#legend_this_year').attr('series_id', param.legend_search_year);
	$('#legend_last_year').attr('series_id', param.legend_last_year);
	
	$('#this_year').text(param.legend_search_year);
	$('#last_year').text(param.legend_last_year);
	
	var type = param.format;
	var pattern = 1;
	var timezone = param.timezone;
	
	var from = param.from_dt_utc;
	var to = param.to_dt_utc;
	var from_last_year = param.from_dt_utc_last_year;
	var to_last_year = param.to_dt_utc_last_year;
	
	// 입력 구간 mariaDB 검색 
	var data = _cms.mariaDB.getData({GERATOR_ID: param.turbine_id, FROM: from, TO: to, TYPE: type, FROM_LAST_YEAR: from_last_year, TO_LAST_YEAR: to_last_year});
	console.log(data);
	
	// dataArray 생성 
	var arr_this_year = _moment.createRegularDateArray(from, to, type, pattern, 'UTC', timezone, true);
	var arr_last_year = _moment.createRegularDateArray(from_last_year, to_last_year, type, pattern, 'UTC', timezone, true);
	
	// chart의 sample series 생성
	var sampleSeries_this_year = _highchartOptions.series.basicDatetime(arr_this_year, param.legend_search_year, param.legend_search_year, param);
	var sampleSeries_last_year = _highchartOptions.series.basicDatetime(arr_last_year, param.legend_last_year, param.legend_last_year, param);
	
	// sample series에 Data Parsing
	var series_this_year = _cms.matchDataToSeriesOfBasicDateTime(data.SEARCH_YEAR, sampleSeries_this_year, 'TIMESTAMP_UTC', 'UZ_RT');
	var series_last_year = _cms.matchDataToSeriesOfBasicDateTime(data.LAST_YEAR, sampleSeries_last_year, 'TIMESTAMP_UTC', 'UZ_RT');
	
	// last_year series 변환 
	var series = _cms.convertLastYear(series_last_year, series_this_year, timezone);
	
	// chart 그리기
	drawChart(param, series, 'container1');
	
	// table 그리기
	drawTable(param, series);

}


/**
 * 		Draw chart 
 * @param param				: checkBeforeSearch return value
 * @param series			: chart series
 * @param container_id		: chart container id 
 * @returns
 */
function drawChart(param, series, container_id) {
	
	// 기존 Chart 삭제 
	_highchart.deleteChartByID(container_id);
	//param.chart_width = parseInt($('#'+container_id).css('width').replace('px', ''));
	
	// chart option 생성 
	var options = _highchartOptions.cms_0500[container_id](param);
	
	// option, series merge
	options = _highchart.mergeOptions(options, {series: series});
	
	// draw chart 
	//$('#container1').highcharts('StockChart', options);
	var chart = Highcharts.chart(container_id, options);
	
	return chart;
}


function drawTable(param, series) {
	
	$('#th_last_year').text(series[0].name);
	$('#th_this_year').text(series[1].name);
	$('#table_tbody').html('');
	
	var format = param.format;
	var timezone = param.timezone;
	
	switch(format) {
		case 'year':
			format = 'YYYY';
			break;
		case 'month':
			//format = 'Mo';
			//format = 'MMM';
			format = 'MMMM';
			break;
		case 'day':
			format = 'MM-DD';
			break;
	}
	
	for(var i=0; i<series[0].data.length; i++) {
		var m = moment.tz(series[0].data[i][0], timezone);
		var date = m.format(format);
		
		var a = series[0].data[i][1];
		var b = series[1].data[i][1];
		
		var diff = b - a;
		var sign = diff >= 0 ? '+ ' : '- ';
		var remarks = Math.abs(diff);
		var remarksUnit = (a == null) || (b == null) ? '' : ' %';
		
		var aUnit = a == null ? '' : ' %';
		var bUnit = b == null ? '' : ' %';
		
		sign = (a == null) || (b == null) ? '' : sign;
		remarks = (a == null) || (b == null) ? '-' : remarks.toFixed(2);
		
		var a = a === null ? '-' : a;
		var b = b === null ? '-' : b;
		
		//#B23930 - 빨 
		//#295691 - 파
		//var style = (sign === '+ ' ? 'sytle="color:#295691"' : sign === '- ' ? 'sytle="color:#B23930"' : '');
		
		var color = (sign === '+ ' ? 'up' : sign === '- ' ? 'down' : '');
		
		date = format === 'YYYY' ? (m.get('year') - 1) + '   /   ' + date : date; 
		
		var sample = '<tr>';
		sample += '<td>' + date + '</td>';
		sample += '<td>' + a + aUnit + '</td>';
		sample += '<td>' + b + bUnit + '</td>';
		sample += '<td class="' + color + '">' + sign + remarks + remarksUnit + '</td>';
		sample += '</tr>';
		
		$('#table_tbody').append(sample);
	}
	
	
	$('.base_grid_table td.up').css('color', '#3C7ED7');
	$('.base_grid_table td.down').css('color', '#f7614e');
	
}


