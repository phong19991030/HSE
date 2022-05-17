/*
 * page 초기화
 */
function cms0900() {
	
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
//	$('#legend_this_year').click(_cms.clickLegend);
//	$('#legend_last_year').click(_cms.clickLegend);
	
	// chart format selector change event
//	$('#chartFormatSelector').change(_cms.changeChartFomatSelector);
	$('#chartTypeSelector').change(onSearch);
	
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
		alert(_MESSAGE.common.selectItem('turbine'));
		return {run: !run};
	}
	

	/* Date Check 제어 */
	if(!from_dt || !to_dt) {
		alert(_MESSAGE.common.selectItem('datetime'));alert('날짜를 선택해 주세요');
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
		//format: $('#chartFormatSelector option:selected').val(),
		type: $('#chartTypeSelector option:selected').val(),
		
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
	
	var type = param.type;
	var timezone = param.timezone;
	var from = param.from_dt_utc;
	var to = param.to_dt_utc;
	var from_last_year = param.from_dt_utc_last_year;
	var to_last_year = param.to_dt_utc_last_year;
	
	console.log(param);
	
	console.log(from);
	console.log(to);
	
	// Data(mariaDB) 검색 
	var data = _cms.mariaDB.getData({GERATOR_ID: param.turbine_id, FROM: from, TO: to, TYPE: type, FROM_LAST_YEAR: from_last_year, TO_LAST_YEAR: to_last_year});
	console.log(data);
	
	var processed_data = processingData(param, data);
	console.log(processed_data);
	
	/* options : series, category(xAxis) */
	var options = makeChartOptions(param, processed_data);
	console.log(options);
	
	
	/* chart 그리기 */
	drawChart(param, options, 'container1');
	
	/* table */
	drawTable(param, processed_data);
}

/* param : this_year와 last_year 비교 하기 위해 필요 */
function processingData(param, data) {
	
	var output = [];
	
	for(var key in data) {
		
		var arr = data[key];
		key = key.toLowerCase();
		
		for(var i=0; i<arr.length; i++) {
			
			var name = param.type !== 'd' ? arr[i].COMPONENT_NM : arr[i].ERROR_NM;
			var code = param.type !== 'd' ? arr[i].COMPONENT_CD : arr[i].ERROR_CD;
			
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
			
			//output[index][key] = output[index][key] + arr[i].CNT;
			output[index][key] = output[index][key] + 1;
			
			output[index].occur_point[key].push({
				timestamp_set: arr[i].TIMESTAMP,
				code: arr[i].ERROR_CD,
				name: arr[i].ERROR_NM,
//				cnt: arr[i].CNT
			});
		}
	}
	return output;
}


function makeChartOptions(param, data) {
	
	var output;
	
	if(param.type === 'a' || param.type === 'd') {
		output = {
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
	} 
	
	
	if(param.type === 'b') {
		output = {
			container1: {
				title: {
		            text: param.legend_last_year + '',
		            align: 'center',
		            verticalAlign: 'middle',
		            y: -5
		        },
				series: [
					{
						id: param.legend_last_year + '',
						name: param.legend_last_year,
						innerSize: '50%',
						colorByPoint: true,
						data: null,
					}
				],
			},
			container2: {
				title: {
		            text: param.legend_search_year  + '',
		            align: 'center',
		            verticalAlign: 'middle',
		            y: -5
		        },
				series: [
					{
						id: param.legend_search_year + '',
						name: param.legend_search_year,
						innerSize: '50%',
						colorByPoint: true,
						data: null,
					}
				]
			},
		};
		
		// series 
		output.container1.series[0].data = data.map((e) => {
			return {
				name: e.name,
				y: e.last_year,
				dataLabels: {
                    enabled: e.last_year > 0 ? true : false,
                }
			}
		});
		
		output.container2.series[0].data = data.map((e) => {
			return {
				name: e.name,
				y: e.search_year,
				dataLabels: {
                    enabled: e.search_year > 0 ? true : false,
                }
			}
		});
	}
	
	if(param.type === 'c') {
		output = {
			container1: {
				categories:[],
				title: {
		            text: param.legend_last_year + '',
		        },
		        series: null
//				series: [
//					{
//						id: param.legend_last_year + '',
//						name: param.legend_last_year,
//						data: null,
//						stack:'1'
//					}
//				],
			},
			container2: {
				categories:[],
				title: {
		            text: param.legend_search_year  + '',
		        },
		        series: null
//				series: [
//					{
//						id: param.legend_search_year + '',
//						name: param.legend_search_year,
//						data: null,
//						stack:'1'
//					}
//				]
		    },
		};
		
		
		var from = moment.tz(param.from_dt_local, _TIMEZONE).get('month') + 1;
		var to = moment.tz(param.to_dt_local, _TIMEZONE).get('month') + 1;
		
		// 카테고리 생성
		for(var i=from; i<=to; i++) {
			output.container1.categories.push(i);
			output.container2.categories.push(i);
		}
		
		// 시리즈 생성
		output.container1.series = data.map((e) => {
			return {
				id: e.code,
				name: e.name,
				data: output.container1.categories.map((e) => 0),
				occur_point: e.occur_point.last_year
			}
		});
		output.container2.series = data.map((e) => {
			return {
				id: e.code,
				name: e.name,
				data: output.container1.categories.map((e) => 0),
				occur_point: e.occur_point.search_year
			}
		}); 
		
		// 시리즈 data 카운팅
		output.container1.series.forEach((e) => {
			
			e.occur_point.forEach((e2) => {
				// 월로 변환
				var month = moment.tz(e2.timestamp_set, _TIMEZONE).get('month') + 1;
			
				// index 찾기 
				var index = output.container1.categories.findIndex((e3) => e3 === month);
				
				// 시리즈 data 카운팅 
				e.data[index]++; 
				
			});
			
		});
		
		output.container2.series.forEach((e) => {
			
			e.occur_point.forEach((e2) => {
				// 월로 변환
				var month = moment.tz(e2.timestamp_set, _TIMEZONE).get('month') + 1;
			
				// index 찾기 
				var index = output.container1.categories.findIndex((e3) => e3 === month);
				
				// 시리즈 data 카운팅 
				e.data[index]++; 
				
			});
			
		});
		
	
	}
	
	
	return output;
}

var chart;
function drawChart(param, chart_options) {
	
	/* container controll */
	if(param.type  === 'a' || param.type  === 'd') {
		$('div#container1').css('width', '100%');
		
		$('div#container1').css('display', 'block');
		$('div#container2').css('display', 'none');
		
	} else {
		$('div#container1').css('width', '49%');
		$('div#container2').css('width', '49%');
		
		$('div#container1').css('display', 'inline-block');
		$('div#container2').css('display', 'inline-block');
	}
	/* container controll */

	//기존 Chart 삭제 
//	_highchart.deleteChartByID('container1');
//	_highchart.deleteChartByID('container2');
//	$('#container1').destroy();
	var cont1 = $('#container1').highcharts();
	var cont2 = $('#container2').highcharts();
	cont1 ? cont1.destroy() : false;
	cont2 ? cont2.destroy() : false;
	
	// chart 기본 option 생성 
	param.type = param.type === 'a' || param.type === 'd' ? 'a' : param.type; 
	var options = _highchartOptions.cms_0900[param.type](param);
	
//	var chart;
	if(param.type  === 'a' || param.type  === 'd') {
		// option, series merge
		options = _highchart.mergeOptions(options, {series: chart_options.series, xAxis: {categories: chart_options.categories}});
		
		// draw chart 
		chart = Highcharts.chart('container1', options);
		
	} else if(param.type  === 'b') {
		chart = [];
		
		options = _highchart.mergeOptions(options, { series: chart_options.container1.series, title: chart_options.container1.title });
		chart.push(Highcharts.chart('container1', options));
		
		
		options = _highchart.mergeOptions(options, { series: chart_options.container2.series, title: chart_options.container2.title });
		chart.push(Highcharts.chart('container2', options));
	} else if(param.type  === 'c') {
		chart = [];
		
		options = _highchart.mergeOptions(options, { series: chart_options.container1.series, title: chart_options.container1.title, xAxis: {categories: chart_options.container1.categories} });
		chart.push(Highcharts.chart('container1', options));
		
		
		options = _highchart.mergeOptions(options, { series: chart_options.container2.series, title: chart_options.container2.title, xAxis: {categories: chart_options.container2.categories} });
		chart.push(Highcharts.chart('container2', options));
		
	}
	
	
	console.log(chart);
	
	/* legend 추가 */
	
	// @TODO - chart[0].legend.allItems[0].setVisible(false, true)
	$('#chart_legend_list').html('');
	if(param.type  === 'a' || param.type  === 'd') {
		
		chart.series.forEach((e) => {
			var color = e.color;
			var name = e.userOptions.name;
			var id = e.userOptions.id;
			
			var legend = '<li id="legend_' + id + '" chart_id="container1" series_id="' + id + '">'
					+ '<em style="background: ' + color + ' !important; width:9px !important; height:9px !important; border-style: solid; border-color: ' + color + '; border-width: 2px;"></em>'
					+ '<span>' + name + '</span>' 
					+ '</li>';
			
			$('#chart_legend_list').append(legend);
				
			$('#legend_' + id).click(_cms.clickLegend);
			
		});
		
	} else if(param.type === 'b') {
		var list = chart[0].series[0].data.map((e) => { return { color: e.color, name: e.name.replace(/(\s*)/g, "") } });
		
		list.forEach((e, i) => {
			var color = e.color;
			var name = e.name;
			
			var legend = '<li id="legend_' + name + '">'
			+ '<em style="background: ' + color + ' !important; width:9px !important; height:9px !important; border-style: solid; border-color: ' + color + '; border-width: 2px;"></em>'
			+ '<span>' + name + '</span>' 
			+ '</li>';
			
			$('#chart_legend_list').append(legend);
			
			$('li#legend_' + e.name).prop('info', [chart[0].series[0].data[i], chart[1].series[0].data[i]]);
			
			$('li#legend_' + e.name).click(clickLegend2);
		});
		
	} else if(param.type === 'c') {
		var list = chart[0].yAxis[0].series.map((e) => { return { color: e.color, name: e.name.replace(/(\s*)/g, "") } });
		
		list.forEach((e, i) => {
			var color = e.color;
			var name = e.name;
			
			var legend = '<li id="legend_' + name + '">'
			+ '<em style="background: ' + color + ' !important; width:9px !important; height:9px !important; border-style: solid; border-color: ' + color + '; border-width: 2px;"></em>'
			+ '<span>' + name + '</span>' 
			+ '</li>';
			
			$('#chart_legend_list').append(legend);
			
			$('li#legend_' + e.name).prop('info', [chart[0].yAxis[0].series[i], chart[1].yAxis[0].series[i]]);
			
			$('li#legend_' + e.name).click(clickLegend2);
		});
	}
	/* legend 추가 */
}

function clickLegend2() {
	
	var list = $(this).prop('info');
	
	var on = $(this).attr('state');
	if(!on || on == 'on') {
		$(this).children('em').css('background', 'none');
		$(this).attr('state', 'off');
		list.forEach((e) => e.setVisible(false, true));
	} else {
		$(this).children('em').css('background', $(this).children('em').css('border-color'));
		$(this).attr('state', 'on');
		list.forEach((e) => e.setVisible(true, true));
	}
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
		var a_percent = (a / total.last_year) * 100 ? ((a / total.last_year) * 100).toFixed(2) : '0.00';  
		var b_percent = (b / total.search_year) * 100 ? ((b / total.search_year) * 100).toFixed(2) : '0.00';   
		
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
	$('#total_last_year').text(total.last_year + ' (' + a_percent + '.00%)');
	$('#total_this_year').text(total.search_year + ' (' + b_percent + '.00%)');
	$('#total_remarks').text(sign + remarks);
	$('#total_remarks').attr('class', color);
	
	$('.base_grid_table td.up').css('color', '#f7614e');
	$('.base_grid_table td.down').css('color', '#3C7ED7');
	
}



