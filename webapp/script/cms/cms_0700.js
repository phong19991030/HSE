/*
 * page 초기화
 */
function cms0700() {
	
	/* view setting - menu창 숨기기 */
	$('body').addClass('gnb-none');
//	$('body').removeClass('gnb-active');
//	$('.gnb-menu').removeClass('on');
//	$('html').addClass('cms-wrapper');
	
	/* comboBox setting */
//	headerWithSelectBox('onSelect');
	headerWithSelectBox('_cms.selectCombo');
	
	/* datetimepicker setting */
	// $('.datetimepicker').setDateTimePicker('yy-mm-dd');
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
	// moment.tz.zone(client_access_timezone).parse() * 60 * 1000; 				// -540 > -32400000
	
	
	/* ComboBox Check 제어 */
	if(!turbine_id) {
//		alert('발전기를 선택해 주세요');
		alert('Please check WTG ID.');
		return {run: !run};
	}
	

	/* Date Check 제어 */
	if(!from_dt || !to_dt) {
//		alert('날짜를 선택해 주세요');
		alert('Please check search date.');
		return {run: !run};
	} else {
		if(moment(to_dt).diff(moment(from_dt)) < 0) {
			alert('from > to');
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
	
	/* css */
	$('.chart-info-wrap').css('display', 'block');
	$('.txt-right').css('display', 'block');
	$('.base_grid_table').css('display', 'block');
	
	/* chart-legend */
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
	
	var processed_data = processingData(param, data);
	
	/* options : series, category(xAxis) */
	var options = calculateChartData(param, processed_data);
	
	drawChart(param, options, 'container1');
	drawTable(param, processed_data);
}

/* param : this_year와 last_year 비교 하기 위해 필요 */
function processingData(param, data) {
	
	var output = [];
	
	
	for(var key in data) {
		
		var arr = data[key];
		key = key.toLowerCase();
		
		for(var i=0; i<arr.length; i++) {
			
			var name = arr[i].LEV1_NAME;
			var code = arr[i].LEV1_CODE;
			
			var index = output.findIndex(x => x.code === code);
			
			if(index === -1) {
				/* index는 push 후 output.length가 반환 */
				index = output.push({
					code: code,
					name: name,
					last_year: 0,
					search_year: 0,
					occur_point: {
						last_year: [],
						search_year: []
					}
				});
				index--;
			}
			
			output[index][key] = output[index][key] + arr[i].OCCUR_CNT;
			
			output[index].occur_point[key].push({
				timestamp: arr[i].TIMESTAMP_UTC,
				lev1_code: arr[i].LEV1_CODE,
				lev1_name: arr[i].LEV1_NAME,
				lev2_code: arr[i].LEV2_CODE,
				lev2_name: arr[i].LEV2_NAME,
				cnt: arr[i].OCCUR_CNT
			});
			
		}
		
	}
	
	return output;
	
}


function calculateChartData(param, data) {
	
	var output = {
		categories: [],
		series: [
			{
				id: param.legend_last_year + '',
				name: param.legend_last_year,
				data:[],
				occur_point: []
			},
			{
				id: param.legend_search_year + '',
				name: param.legend_search_year,
				data: [],
				occur_point: []
			}
		]
	};

	for(var i=0; i<data.length; i++) {
		output.categories.push(data[i].name);
		output.series[0].data.push(data[i].last_year);
		output.series[1].data.push(data[i].search_year);
		output.series[0].occur_point.push(data[i].occur_point.last_year);
		output.series[1].occur_point.push(data[i].occur_point.search_year);
	}
	
	
	return output;
}


function drawChart(param, chart_options, container_id) {
	
	//기존 Chart 삭제 
	_highchart.deleteChartByID(container_id);
	//param.chart_width = parseInt($('#'+container_id).css('width').replace('px', ''));
	
	// chart option 생성 
	var options = _highchartOptions.cms_0700[container_id](param);
//	options.series = chart_options.series;
//	options.xAxis.categories = chart_options.categories;
	
	// option, series merge
	options = _highchart.mergeOptions(options, {series: chart_options.series, xAxis: {categories: chart_options.categories}});
	
	// draw chart 
	//$('#container1').highcharts('StockChart', options);
	var chart = Highcharts.chart(container_id, options);
	
	return chart;
}


function drawTable(param, data) {
	
	
	$('#th_last_year').text(param.legend_last_year);
	$('#th_this_year').text(param.legend_search_year);
	$('#table_tbody').html('');
	
	var total = {
		search_year: 0,
		last_year: 0
	};
	
	total.last_year = data.map(x => x.last_year).reduce((s, e) => s + e, 0);
	total.search_year = data.map(x => x.search_year).reduce((s, e) => s + e, 0);
	
	
	for(var i=0; i<data.length; i++) {
		
		var name = data[i].name;
		var a = data[i].last_year;
		var b = data[i].search_year;
		
		var diff = b - a;
		var sign = diff > 0 ? '+ ' : diff < 0 ? '- ' : '';
		var remarks = Math.abs(diff);
		
		// a, total 둘다 0일때 NaN
		var a_percent = (a / total.last_year) * 100 ? ((a / total.last_year) * 100).toFixed(2) : 0;  
		var b_percent = (b / total.search_year) * 100 ? ((b / total.search_year) * 100).toFixed(2) : 0;   
		
		a_percent = ' (' + a_percent + '%)';  
		b_percent = ' (' + b_percent + '%)';   
		
		
		var color = (sign === '+ ' ? 'up' : sign === '- ' ? 'down' : '');
		
		var sample = '<tr>';
		sample += '<td>' + name + '</td>';
		sample += '<td>' + a + a_percent + '</td>';
		sample += '<td>' + b + b_percent + '</td>';
		sample += '<td class="' + color + '">' + sign + remarks + '</td>';
		sample += '</tr>';
		
		$('#table_tbody').append(sample);
	}
	
	var a = total.last_year;
	var b = total.search_year;
	
	var a_percent = (a / a) * 100;
	var b_percent = (b / b) * 100;
	
	var diff = b - a;
	var sign = diff > 0 ? '+ ' : diff < 0 ? '- ' : '';
	var remarks = Math.abs(diff);
	
	a_percent = a_percent ? a_percent : 0;
	b_percent = b_percent ? b_percent : 0;
	
	var color = (sign === '+ ' ? 'up' : sign === '- ' ? 'down' : '');
	
	/* total */
	$('#total_last_year').text(total.last_year + ' (' + a_percent + '%)');
	$('#total_this_year').text(total.search_year + ' (' + b_percent + '%)');
	$('#total_remarks').text(sign + remarks);
	$('#total_remarks').attr('class', color);
	
	$('.base_grid_table td.up').css('color', '#f7614e');
	$('.base_grid_table td.down').css('color', '#3C7ED7');
	
}



