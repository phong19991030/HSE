

var _map;				/*  */

/* map config */
//var lat, lng;

var _zoom = {
	min: 9,
	max: 18,
	basic: 11, 			/* default */ /* group > farm  */
	farm: 12,			/* farm > group */ /* turbine > group  */
	no_group: 13,
	group: 14,			/* group > turbine */
	turbine: 16,		/* turbine select */
	oldZoom: 11,		/* previous zoom */
	newZoom: 11,		/* current zoom */
	motion: '',			/* zoom : in, out */
	bound: '',
	metersPerPx: 0,
	control: 'zoom',	/* click(click target), select(select combo), zoom(change zoom) */
};

var zIndex = 1;			// marker, infowindow, popup의 z-index는 각각 종류별로 적용됨

var _node = {
	on_farm: [],
	off_farm: [],
	on_group: [],
	off_group: [],
	on_turbine: [],
	off_turbine: [],
	infowindow: [],
	no_group: [],
	no_turbine: [],
	no_infowindow: [],
	idle_farm_check: []
}

/* popup */
var Popup_function;
var popup_farm = {};
var popup_group = {};
var marker_turbine = {};

var _view = 'map';			

var weather = {
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
		var icon; 
		for(var key in this.icon) {
            if(this.icon[key].indexOf(icon) > -1) icon = key;
		}		
		return icon; 
	},
	direction16 : ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'],
	calculate_direction16 : function(dec) {
		return this.direction16[parseInt((dec + 22.5 * 0.5) / 22.5)];
	}		
};

//var direction16_name = ['북', '북북동', '북동', '동북동', '동', '동남동', '남동', '남남동', '남', '남남서', '남서', '서남서', '서', '서북서', '북서', '북북서', '북'];
//var direction16_name = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];



function drawChart(param, target) {
	
	// 날짜 구하기 
	var to = moment().tz(_timezone);
	to.set('hour', 0);
    to.set('minute', 0);
    to.set('second', 0);
    to.set('millisecond', 0);
	
    var from = to.clone();
    from.set('month', 0);
    from.set('date', 1);
    
    var to_last_year = to.clone();
    to_last_year.set('year', to_last_year.get('year') - 1);
    
    var from_last_year = from.clone();
    from_last_year.set('year', from_last_year.get('year') - 1);
    
    var this_year = to.get('year');
    var last_year = to_last_year.get('year');
    
    
    from			= from.tz('UTC').format('YYYY-MM-DD HH:mm:ss');
    to 				= to.tz('UTC').format('YYYY-MM-DD HH:mm:ss');
    from_last_year	= from_last_year.tz('UTC').format('YYYY-MM-DD HH:mm:ss');
    to_last_year	= to_last_year.tz('UTC').format('YYYY-MM-DD HH:mm:ss');
    
    var type = 'day';
    var pattern = 1;
    
    var id = target === 'farm' ? param.farm_id : (target === 'group' ? param.group_id : param.turbine_id); 
    
    var data = _cms.mariaDB.getData({ID: id, TARGET: target, FROM: from, TO: to, FROM_LAST_YEAR: from_last_year, TO_LAST_YEAR: to_last_year});
    
    var arr_this_year = _moment.createRegularDateArray(from, to, type, pattern, 'UTC', _timezone, false);
    var arr_last_year = _moment.createRegularDateArray(from_last_year, to_last_year, type, pattern, 'UTC', _timezone, false);
    
    var sampleSeries_this_year = _highchartOptions.series.basicDatetime(arr_this_year, this_year, this_year);
	var sampleSeries_last_year = _highchartOptions.series.basicDatetime(arr_last_year, last_year, last_year);
    
	var or_series_this_year = _cms.matchDataToSeriesOfBasicDateTime(data.SEARCH_YEAR, JSON.parse(JSON.stringify(sampleSeries_this_year)), 'TIMESTAMP_UTC', 'OR_RT');
	var or_series_last_year = _cms.matchDataToSeriesOfBasicDateTime(data.LAST_YEAR, JSON.parse(JSON.stringify(sampleSeries_last_year)), 'TIMESTAMP_UTC', 'OR_RT');
	
	var qty_series_this_year = _cms.matchDataToSeriesOfBasicDateTime(data.SEARCH_YEAR, JSON.parse(JSON.stringify(sampleSeries_this_year)), 'TIMESTAMP_UTC', 'GR_QTY');
	var qty_series_last_year = _cms.matchDataToSeriesOfBasicDateTime(data.LAST_YEAR, JSON.parse(JSON.stringify(sampleSeries_last_year)), 'TIMESTAMP_UTC', 'GR_QTY');

	
	var or_series = _cms.convertLastYear(or_series_last_year, or_series_this_year, _timezone);
	var qty_series = _cms.convertLastYear(qty_series_last_year, qty_series_this_year, _timezone);
	
	
	var options1 = _highchartOptions.cms_0100['container1']({timezone: _timezone});
	var options2 = _highchartOptions.cms_0100['container2']({timezone: _timezone});
	
	options1 = _highchart.mergeOptions(options1, {series: or_series});
	options2 = _highchart.mergeOptions(options2, {series: qty_series});
	
	// legend setting
	$('.this_year').each(function() { 
		$(this).text(this_year);
	});
	$('.last_year').each(function() { 
		$(this).text(last_year);
	});
	
	$('#legend_this_year_or').attr('series_id', this_year);
	$('#legend_last_year_or').attr('series_id', last_year);
	$('#legend_this_year_qty').attr('series_id', this_year);
	$('#legend_last_year_qty').attr('series_id', last_year);
	
	$('#legend_this_year_or').click(_cms.clickLegend);
	$('#legend_last_year_or').click(_cms.clickLegend);
	$('#legend_this_year_qty').click(_cms.clickLegend);
	$('#legend_last_year_qty').click(_cms.clickLegend);
	// legend setting
	
	
	$('#container1').html('');
	$('#container2').html('');
	
	if(data.SEARCH_YEAR.length > 0 || data.LAST_YEAR.length > 0) { 
		
		// 기존 차트 삭제
		_highchart.chartsInitialization();
		
		// Draw Chart
		if($('#container1').length > 0 && $('#container2').length > 0) {
			Highcharts.chart('container1', options1);
			Highcharts.chart('container2', options2);
			
			// Chart yAxis View Setting
			_highchart.setAxisView('container1', arr_this_year[arr_this_year.length - 8], arr_this_year[arr_this_year.length - 1], 'x');
			_highchart.setAxisView('container2', arr_this_year[arr_this_year.length - 8], arr_this_year[arr_this_year.length - 1], 'x');
		}
		
	} else {
		/*
		 * 		<div class="no_data">
		 *			<div class="no_data_img"></div>
		 *			<div class="no_data_text"> No Data </div>
		 *		</div>
		 */
		//var sample = '<div class="no_data"><div class="no_data_img"></div><div class="no_data_text"> No Data</div></div>';
		var sample = _cms_elements.cms_0100.detail_info.no_chart();
		$('#container1').html(sample);
		$('#container2').html(sample);	
	}
	
}


/* 모든 발전단지가 화면에 보이기 위한 zoom 값 찾기 - map load 후 초기 1번 실행 */
function createInitZoom() {
	
	var cnt = 0;
	/* map idle event 삭제 - 처음 1번만 실행 되면 된다 */
	google.maps.event.clearListeners(_map, 'idle');
	
	
	/* map의 현재 bound 값 - map이 load 된 후 시점에서 실행 됨 -  idle event를 trigger 로 사용 */
	_zoom.bound = _map.getBounds();
	
	/* popup(farm)의 position을 zoom.bound 범위에 포함되는지 체크 */
	while(farm.length >= cnt) {
		for(var key in popup_farm) {
			if(_zoom.bound.contains(popup_farm[key].position)) {
				cnt++;
			}
		}
		/* zoom을 1씩 out */
		_map.setZoom(_zoom.newZoom - 1);
	}

	_map.addListener('idle', mapIdleFarmCheck);
}

/*
 *  Map의 idle 발생 시 화면에 보이는 Farm popup을 체크
 */
function mapIdleFarmCheck(init) {
	
	if(_view != 'map') return; 
	
	var bounds = _map.getBounds();
	var update_cnt = 0;
	if(!bounds) return;
	
	for(var key in popup_farm) {
		if(bounds.contains(popup_farm[key].position)) {
			if(_node.idle_farm_check.indexOf(key) == -1){
				_node.idle_farm_check.push(key);
				update_cnt++;
			}
		} else {
			var idx = _node.idle_farm_check.indexOf(key);
			if (idx > -1) {
				_node.idle_farm_check.splice(idx, 1);
				update_cnt++;
			}
		}
	}
	
	if(update_cnt > 0 || init !== undefined) {
		changeAllInfo();
	} 
}

/*
 *  All info 창의 정보 변경
 */
function changeAllInfo() {
	
	var info = calculateAllInfo();
	
	/* 1 */
	$('#info_capacity').attr('data-count', info.info_capacity);
	$('#info_capacity_unit').text(info.info_capacity_unit);
	$('#info_or').attr('data-count', info.info_or);
	$('#info_ur').attr('data-count', info.info_ur);
	
	/* 2 */
	$('#info_gr_qty_today').attr('data-count', info.info_gr_qty_today);
	$('#info_gr_qty_today_unit').text(info.info_gr_qty_today_unit);
	$('#info_gr_qty_this_year').attr('data-count', info.info_gr_qty_this_year);
	$('#info_gr_qty_this_year_unit').text(info.info_gr_qty_this_year_unit);
	$('#info_rate_ic_dc').attr('data-count', info.info_rate_ic_dc);
	$('#info_rate_ic_dc_sign').text(info.info_rate_ic_dc_sign);
	$('#info_rate_ic_dc_class').attr('class', info.info_rate_ic_dc_class);
	$('#info_rate_ic_dc_color').attr('class', info.info_rate_ic_dc_color);
	
	/* 3 */
	$('#turbine_nomal').attr('data-percent', info.turbine_nomal);
	$('#turbine_error').attr('data-percent', info.turbine_error);
	$('#turbine_alarm').attr('data-percent', info.turbine_alarm);
	
	infoEffect();
}

function infoEffect() {
	/* text animation */
	$(".counter-value").each(function() {
	    var t = $(this),
	        n = t.attr("data-count");
	    $({
	        countNum: t.text()
	    }).animate({
	        countNum: n
	    }, {
	        duration: 1e3,
	        easing: "swing",
	        step: function() {
	            t.text(Math.floor(this.countNum))
	        },
	        complete: function() {
	        	var tt = parseFloat(this.countNum.toFixed(1));
	            t.text(tt);
	        }
	    })
	});
	
	
	/* 이전 pie chart canvas 삭제 - 삭제 하지 않을 경우 중첩해서 쌓임 */
	$('canvas').each((i, e) => {
		//$(this).remove();
		e.remove();
	});
	
	
	/* chart animation */
	$(".chart").each((i, e) => {
		//var pieChart = window.chart = new EasyPieChart(t, {
		new EasyPieChart(e, {
			delay: 3000,
			barColor: ['#7DB150', '#ee5543', '#A151CE'][i],
			trackColor: '#f0f0f7',
			scaleColor: false,
			lineWidth: 10,
			trackWidth: 10,
			lineCap: 'butt',
			onStep: function(from, to, percent) {
				this.el.children[0].innerHTML = Math.round(percent);
			}
		});
	});	
	
}


/*
 *	All info 창에 보여질 farm의 정보들을 취합하여 계산 
 */
function calculateAllInfo() {
	
	var info = {
		info_capacity: 0,
		info_capacity_unit: 'MW',
		info_or: 0,
		info_ur: 0,
		
		info_gr_qty_today: 0,
		info_gr_qty_today_unit: 'MW',
		info_gr_qty_this_year: 0,
		info_gr_qty_this_year_unit: 'MW',
		info_gr_qty_last_year: 0,
		info_rate_ic_dc: 0,				//전년대비 증감율
		info_rate_ic_dc_sign: '+',
		info_rate_ic_dc_class: 'xi-long-arrow-up',
		info_rate_ic_dc_color: 'plus',
		
		turbine_nomal: 0,
		turbine_error: 0,
		turbine_alarm: 0,
	};
	
	for(var i=0; i<_node.idle_farm_check.length; i++) {
		var key = _node.idle_farm_check[i];
		info.info_capacity = info.info_capacity + popup_farm[key].info.target.capacity;
		info.info_or = info.info_or + popup_farm[key].info.target.or;
		info.info_ur = info.info_ur + popup_farm[key].info.target.ur;
		/* 일일 발전량 */
		info.info_gr_qty_today = info.info_gr_qty_today + popup_farm[key].info.target.gr_qty;
		info.info_gr_qty_this_year = info.info_gr_qty_this_year + popup_farm[key].info.target.gr_qty_this_year;
		info.info_gr_qty_last_year = info.info_gr_qty_last_year + popup_farm[key].info.target.gr_qty_last_year;
		info.turbine_nomal = info.turbine_nomal + popup_farm[key].info.target.turbine_cnt;
		info.turbine_error = info.turbine_error + popup_farm[key].info.target.error_cnt;
	}
	
	/* 이용률, 가동률 단지별 평균 */
	if(info.info_or != 0) info.info_or = parseFloat((info.info_or / _node.idle_farm_check.length).toFixed(2));
	if(info.info_ur != 0) info.info_ur = parseFloat((info.info_ur / _node.idle_farm_check.length).toFixed(2)); 	
	
	

	
	/* 전년대비 증감률 계산 */
	if(info.info_gr_qty_this_year !=0 && info.info_gr_qty_last_year !=0) {
		info.info_rate_ic_dc = parseFloat((((info.info_gr_qty_this_year - info.info_gr_qty_last_year) / info.info_gr_qty_last_year) * 100).toFixed(2));
		
		if(info.info_rate_ic_dc < 0) {
			info.info_rate_ic_dc = Math.abs(info.info_rate_ic_dc);
			info.info_rate_ic_dc_sign = '-';
			info.info_rate_ic_dc_class = 'xi-long-arrow-down';
			info.info_rate_ic_dc_color = 'minus';
		}
	}
	
	
	/* MW > GW 체크 및 단위 변환 */
	if(info.info_capacity >= 1000) {
		info.info_capacity = info.info_capacity / 1000;
		info.info_capacity_unit = 'GW'
	}
	
	if(info.info_gr_qty_today >= 1000) {
		info.info_gr_qty_today = info.info_gr_qty_today / 1000;
		info.info_gr_qty_today_unit = 'GW'
	}
	
	if(info.info_gr_qty_this_year >= 1000) {
		info.info_gr_qty_this_year = parseFloat((info.info_gr_qty_this_year / 1000).toFixed(1));
		info.info_gr_qty_this_year_unit = 'GW'
	}
	
	
	return info;
}

function initAllInfoView() {
	
	/* Info View Change */
	/* Map Info */ 
	$.ajaxSettings.traditional = true;	
	$.ajax({
		url :  ctx + "/cms/cms_0100/allInfo.ajax",
		data :  {},
		error : function (req, status, err) {
			// alert("ajax ERROR!!");
		},
		success : function(data) {
			$('#map_info').html(data);
			$('#detail_info').html('');
			changeView('map');
			mapIdleFarmCheck(1);
		}
	}); 

}



/* Change Zoom */
function zoomChange() {
	
	_zoom.bound = _map.getBounds();
	_zoom.metersPerPx = metersPerPx = 156543.03392 * Math.cos(_map.center.lat() * Math.PI / 180) / Math.pow(2, _map.getZoom());
	
	if(_zoom.oldZoom > _zoom.newZoom) {
		_zoom.motion = 'out';
	} else if(_zoom.oldZoom < _zoom.newZoom) {
		_zoom.motion = 'in';
	}
	
	/* Zoom in일 경우, 한번만 실행 */
	/* Zoom out일 경우, 한번만 실행 */
	if(_zoom.control == 'zoom') {
		switch(_zoom.newZoom) {
			case _zoom.basic:
				
				if(_zoom.motion == 'in') {
					
				} else {
					/* group > farm  */
					closeNoInfoWindow();
					zoomFarmToBasic();
				}
				break;
			case _zoom.farm:
				
				if(_zoom.motion == 'in') {
// 						/* farm > group  */
// 						var farm_id = findNearestNode(visibleFarm()).info.farm_id;
					
// 						/* View Change */
// 						changeView('farm');
					
// 						/* node Object Setting */
// 						nodeObjectController(farm_id, 'farm', 'off');
					
// 						/* Combo Setting */
// 						changeCombo([farm_id]);
					
// 						/* Init Group */			
// 						initGroup(farm_id);
					
// 						/* Delete FARM Popup */
// 						popup_farm[farm_id].onRemove();
					
// 						initDetailInfoView();
					
				} else {
					/* turbine > group  */
					zoomGroupToFarm();
					
					//!@#
					$('body').removeClass('gnb-active');
					$('body').addClass('gnb-none');
					$('#M_WTB_05').removeClass('on');
					
				}
				break;
			case _zoom.group:
				
				if(_zoom.motion == 'in') {
					/* group > turbine  */
// 						var farm_id = $('ul.select-machine.farm').attr('FARM_ID');
// 						var group_id = findNearestNode(visibleGroup(farm_id)).info.group_id;
// 						console.log(group_id);
				} else {
					
				}
				break;
			case _zoom.turbine:
				
				if(_zoom.motion == 'in') {
					
				} else {
					
				}
				break;
				
		}
	}
	
	_zoom.control = 'zoom';
	
	/* Zoom change 매 순간 실행 */
	// farm, group popup 사이즈 조정
	reSizingPopup();
}



/* Zoom Change Farm -> Basic */
function zoomFarmToBasic() {
	
	var default_group   = '<li class="active"><a href="#none"><span>-- GROUP --</span></a></li>';
	
	
	initAllInfoView(1);
	
	/* Show Farm Popup */ 
	for(var i=0; i<_node['off_farm'].length; i++) {
		var str = _node['off_farm'][i];
		popup_farm[str].onAdd();
	}
	_node['on_farm'] = _node['on_farm'].concat(_node['off_farm']);
	_node['off_farm'] = [];
	
	/* Hide Group Popup */
	for(var i=0; i<_node['on_group'].length; i++) {
		var str = _node['on_group'][i].split('-');
		popup_group[str[0]][str[1]].onRemove();
	}
	_node['on_group'] = [];
	_node['off_group'] = [];
	
	/* Hide Turbine Marker */
	for(var i=0; i<_node['on_turbine'].length; i++) {
		var str = _node['on_turbine'][i].split('-');
		marker_turbine[str[0]][str[1]].setMap(null);
	}
	_node['on_turbine'] = [];
	_node['off_turbine'] = [];
	
	/* Hide No Group Marker & infowindow */ 
	for(var i=0; i<_node['no_turbine'].length; i++) {
		var str = _node['no_turbine'][i].split('-');
		marker_turbine[str[0]][str[1]].setMap(null);
	}
	_node['no_group'] = [];
	_node['no_turbine'] = [];
	
	
	/* Combo Setting */
	$('.select-machine1').removeAttr('farm_id');
	$('ul[class*="select-machine1"] > li[class*="active"]').removeClass('active');
	$('ul[class*="select-machine1"] > li:eq(0)').addClass('active');
	
	
	$('.select-machine2').empty().append(default_group);
	$('.select-machine2').removeAttr('group_id');
	$('ul[class*="select-machine2"] > li').addClass('active');
	
}

/* Zoom Change Group -> Farm */
function zoomGroupToFarm() {
	
	if(_view !== 'group') return;
	
	var default_turbine = '<li class="active"><a href="#none"><span>-- WIND TURBINE --</span></a></li>';
	
	/* Close InfoWindow */
	closeInfoWindow();
	
	/* Show Group Popup */
	for(var i=0; i<_node['off_group'].length; i++) {
		
		var str = _node['off_group'][i].split('-');
		popup_group[str[0]][str[1]].onAdd();
	}
	_node['on_group'] = _node['on_group'].concat(_node['off_group']);
	_node['off_group'] = [];
	
	
	/* Combo Setting */
	$('ul[class*="select-machine2"] > li[class*="active"]').removeClass('active');
	$('ul[class*="select-machine2"] > li:eq(0)').addClass('active');
	$('.select-machine2').removeAttr('group_id');
	
	$('.select-machine3').empty().append(default_turbine);
	$('.select-machine3').removeAttr('gerator_id');
	$('ul[class*="select-machine3"] > li').addClass('active');
	
	
	/* change Target Info : 이전 Farm 정보로 update */
	var farm_id = $('.select-machine1').attr('farm_id');
	changeTargetInfo({farm_id: farm_id, group_id: undefined, turbine_id: undefined}, 'farm');
	changeDetailInfo({farm_id: farm_id, group_id: undefined, turbine_id: undefined}, 'farm');
}

/* 
 * 	Zoom Chagne ReSizing Popup
 *  
 *  zoom 이 변경 되면서 Farm, Group의 Popup을 ReSizing
 *  
 *  but, 현재 화면에 on 상태인 Popup만 해당
 *  node 배열에서 관리
 *  
 */
function reSizingPopup() {
	
	/* Meter / Px 값 도출 */ 
	var metersPerPx = 156543.03392 * Math.cos(_map.center.lat() * Math.PI / 180) / Math.pow(2, _zoom.newZoom);
	
	
	if(_zoom.min < _zoom.newZoom && _zoom.newZoom < _zoom.max) {
		
		/* Farm Popup Size 조절 */
		for(var i=0; i<_node.on_farm.length; i++) {
			var farm_id = _node.on_farm[i];
			
			/* popup 지름 조절 */
			var diameter = popup_farm[farm_id].info.diameter;
			var width = diameter / metersPerPx;
			var target = $('#' + farm_id + '-farm');
			
			/* popup size, top 변경 + animate 효과 추가 */
			target.animate({ width: width, height: width, top: width/2 }, 300);
		}
		
		/* farm name 숨기기 추가 zoom 10 이하 일 때, before, after display none */
		if(10 >= _zoom.newZoom && _zoom.motion == 'out') {
			$('.popup-farm > div > span > em').css('display', 'none');
			$('.popup-farm').addClass('hide');
		} else if(10 <= _zoom.newZoom && _zoom.motion == 'in'){
			$('.popup-farm > div > span > em').css('display', 'block');
			$('.popup-farm').removeClass('hide');
		}
		
		/* farm name cnt 글자 크기 조절 */
		if(_zoom.basic < _zoom.newZoom) {
			var weight = _zoom.newZoom - _zoom.basic; 
//				$('.popup-farm > div > span > em').css('font-size', 20 * weight + 'px');
//				$('.popup-farm > div > span > strong').css('font-size', 70 * weight + 'px');
			
			$('.popup-farm > div > span > em').animate({ fontSize: 20 * weight + 'px'}, 300);
			$('.popup-farm > div > span > strong').animate({ fontSize: 70 * weight + 'px'}, 300);
			
			
		} else if(_zoom.basic == _zoom.newZoom){ /* 초기화 */
//				$('.popup-farm > div > span > em').css('font-size', '.6rem');
//				$('.popup-farm > div > span > strong').css('font-size', '2rem');
			
			$('.popup-farm > div > span > em').animate({fontSize: '.6rem'}, 300);
			$('.popup-farm > div > span > strong').animate({fontSize: '2rem'}, 300);
			
		}
		
	}
	
	/* Group Popup Size 조절 */
	if(_zoom.newZoom >= _zoom.farm) {
		for(var j=0; j<_node.on_group.length; j++) {
			var group_id = _node.on_group[j].split('-');
			var diameter2 = popup_group[group_id[0]][group_id[1]].info.diameter;
			var width2 = diameter2 / metersPerPx;
			var target2 = $('#' + group_id[1] + '-group');
			
			/* popup size, top 변경 + animate 효과 추가 */
			target2.animate({ width: width2, height: width2, top: width2/2 }, 300);
		}	
	}
}




/**
 * 
 * 		node Object Controller
 * @Ajax
 * @excuteFunction
 * @excutePoint
 * @param str		ex) farm_id, farm_id-group_id, group_id-turbine_id
 * @param arr		ex) farm, group, turbine
 * @param onoff		ex) on, off, init, no
 * @returns
 */
function nodeObjectController(str, arr, onoff) {
	
	var arr_name = onoff + '_' + arr;
	var dif_arr_name = (onoff == 'on' ?  'off' : 'on') + '_' + arr;
	
	if(onoff == 'init') {
		
		if(_node[dif_arr_name].indexOf(str) == -1) {
			_node[dif_arr_name].push(str);
		}
		
	} else if(onoff == 'no') {
	
		_node[arr_name].push(str);
		
	} else {
		
		if(_node[arr_name].indexOf(str) == -1) {
			_node[arr_name].push(str);
		}
		
		if(_node[dif_arr_name].indexOf(str) > -1) {
			_node[dif_arr_name].splice(_node[dif_arr_name].indexOf(str), 1);
		}
		
	}
}

/**
 * 
 * 		Map에 표기 할 Group, Turbine List의 Data 를 
 *		Page Load 후 미리 init 하는 Function
 * 
 * @Ajax
 * @excuteFunction	createGroup(), createTurbine()
 * @excutePoint		$(document).ready();
 * @param 			farm
 * @returns
 */
function initAllData(farm) {
	
	var farm_list = [];
	
	if(farm.length == 0) {
		alert('Data does not exist!!');
		return;
	}
	
	farm.forEach(function(item, i) {
		farm_list.push(item.FARM_ID);
	});
	
	if(farm_list.length == 0) return;
	
	$.ajaxSettings.traditional = true;	
	$.ajax({
		url :  ctx + "/cms/cms_0100/getAllData.ajax",
		data :  {'FARM_LIST' : farm_list },
		error : function (req, status, err) {
			// alert("ajax ERROR!!");
		},
		success : function(data) {
			turbine = data.TURBINE;
			group = data.GROUP;
			
			/* Create Group */ 
			createGroup();
			/* Create Turbine */ 
			createTurbine();
		}
	}); 
}


/**
 * 
 * 		Header의 combo 선택 시 view 조정 
 * 
 * @Ajax
 * @excuteFunction	changeView(), initGroup(), unactiveInfoWindow(), closeInfoWindow(), nodeObjectController()
 * 					activeInfoWindow()
 * @excutePoint		onSelect()
 * @param 			FARM_ID
 * @param 			GROUP_ID
 * @param 			TURBINE_ID 
 * @returns
 */
function selectTarget(FARM_ID, GROUP_ID, TURBINE_ID) {
	
	if(Object.keys(popup_group).length == 0 || Object.keys(marker_turbine).length == 0) {
		alert('Please wait.. Data Loding..');
		return;
	}
	_zoom.control = 'select';
	
	var target;
	
	if(FARM_ID !== undefined && GROUP_ID === undefined) target = 'farm';
	if(FARM_ID !== undefined && GROUP_ID !== undefined && TURBINE_ID === undefined) target = 'group';
	if(FARM_ID !== undefined && GROUP_ID !== undefined && TURBINE_ID === 'NO GROUP') target = 'no_group';
	if(FARM_ID !== undefined && GROUP_ID !== undefined && TURBINE_ID !== undefined && TURBINE_ID !== 'NO GROUP') target = 'turbine';
	
	if(target == 'farm') { /* FARM */
		
		/* Get Info */
		var center = popup_farm[FARM_ID].position;
		
		/* View Change */
		changeView('farm');
		
		/* Center Setting */
		_map.panTo(new google.maps.LatLng(center.lat(), center.lng()));
		
		/* Delete FARM Popup */
		popup_farm[FARM_ID].onRemove();
		
		/* node Object Setting */
		nodeObjectController(FARM_ID, 'farm', 'off');
		
		/* Zoom Setting */
		_map.setZoom(_zoom.farm);
		
		/* Init Group */			
		initGroup(FARM_ID);
		
		/* Unactive InfoWindow */
		unactiveInfoWindow();
		
		/* Close InfoWindow - select */
		closeInfoWindow();
		
	} else if(target == 'group') { /* GROUP */
		
		/* Get Info */
		var center = popup_group[FARM_ID][GROUP_ID].position;
		
		/* View Change */
		changeView('group');
		
		/* Center Setting */
		_map.panTo(new google.maps.LatLng(center.lat(), center.lng()));
		
		/* Delete Group Popup */
		popup_group[FARM_ID][GROUP_ID].onRemove();
		
		/* node Object Setting */
		nodeObjectController(FARM_ID + '-' + GROUP_ID, 'group', 'off');
		
		/* Zoom Setting */
		_map.setZoom(_zoom.group);
		
		/* Open InfoWindow */
		openInfoWindow(GROUP_ID);
		
		/* Unactive InfoWindow */
		unactiveInfoWindow();
		
	} else if(target == 'no_group') { /* NO GROUP */
		
		/* View Change */
		changeView('group');
		
		/* Center Setting */
		var center = popup_group[FARM_ID][GROUP_ID].position;
		_map.panTo(center);
		
		/* Zoom Setting */
		_map.setZoom(_zoom.no_group);
		
		target = 'group';
		
	} else if(target == 'turbine') { /* TURBINE */ 
		
		var marker = marker_turbine[GROUP_ID][TURBINE_ID];
		var center = marker.position;
		
		/* InfoWindow Active 변경, unAvtive 포함 */
		activeInfoWindow(GROUP_ID, TURBINE_ID);
		
		/* Center Setting */
		_map.panTo(new google.maps.LatLng(center.lat(), center.lng()));
		
		/* Zoom Setting */
		_map.setZoom(_zoom.turbine);
		
		$('li#M_WTB_05 > a').click();	//!@#
	}
	
	initDetailInfoView({farm_id:FARM_ID, group_id:GROUP_ID, turbine_id: TURBINE_ID}, target);
	
}

/**
 * 
 * 		Map의 Node 클릭 시 View 조정
 * 
 * @Ajax
 * @excuteFunction	changeView(), changeCombo(), initGroup(), unactiveInfoWindow(), closeInfoWindow(), nodeObjectController()
 * 					activeInfoWindow()
 * @excutePoint		node Click Event in the map
 * @param 			FARM_ID
 * @param 			GROUP_ID
 * @param 			TURBINE_ID 
 * @returns
 */
function clickTarget(FARM_ID, GROUP_ID, TURBINE_ID) {
	
	if(Object.keys(popup_group).length == 0 || Object.keys(marker_turbine).length == 0) {
		alert('Please wait.. Data Loding..');
		return;
	}
	
	_zoom.control = 'click';
	
	var id = $(this).attr('id');
	var target_id;
	var target;
	
	
	if(id == undefined) { /* click marker & infoWindow */
		
		if(GROUP_ID != undefined && TURBINE_ID != undefined) {
			id = marker_turbine[GROUP_ID][TURBINE_ID];	// clic infoWindow
		} else {
			id = this;	// click marker
		}
		target = 'turbine';
	} else {	/* click popup */
		id = $(this).attr('id').split('-');
		target_id = id[0];
		target = id[1];
	}
	

	var farm_id;
	var group_id;
	var turbine_id;
	
	
	if(target == 'farm') {

		farm_id = target_id;
		
		/* Get Info */
		var center = popup_farm[target_id].position;
		
		/* View Change */
		changeView('farm');
		
		/* Center Setting */
		_map.panTo(new google.maps.LatLng(center.lat(), center.lng()));
		
		/* Combo Setting - click */
		changeCombo([target_id]);
		
		/* Delete FARM Popup */
		popup_farm[target_id].onRemove();
		
		/* node Object Setting */
		nodeObjectController(target_id, 'farm', 'off');
		
		/* Zoom Setting */
		_map.setZoom(_zoom.farm);
		
		/* Init Group */			
		initGroup(target_id);
		
		/* Unactive InfoWindow */
		unactiveInfoWindow();
		
	} else if(target == 'group') {
		
		/* Get Info */
		farm_id = $(this).attr('farm_id');
		group_id = target_id;
		var center = popup_group[farm_id][target_id].position;
		
		/* View Change */
		changeView('group');
		
		/* Delete Group Popup */
		popup_group[farm_id][target_id].onRemove();
		
		/* node Object Setting */
		nodeObjectController(farm_id + '-' + target_id, 'group', 'off');
		
		/* Combo Setting - click */
		changeCombo([farm_id, target_id]);
		
		/* Zoom Setting */
		_map.setZoom(_zoom.group);
		
		/* Center Setting */
		_map.panTo(new google.maps.LatLng(center.lat(), center.lng()));
		
		/* infowindow open */
		openInfoWindow(target_id);
		
		/* Unactive InfoWindow */
		unactiveInfoWindow();
		
	} else if(target == 'turbine') {
		
		farm_id = id.info.farm_id
		group_id = id.info.group_id;
		turbine_id = id.info.turbine_id;
		
		
		
		var center = id.position;
		
		/* InfoWindow Active 변경, unAvtive 포함 */
		activeInfoWindow(group_id, turbine_id);
		
		/* Center Setting */
		_map.panTo(new google.maps.LatLng(center.lat(), center.lng()));
		
		/* Combo Setting - click */
		changeCombo([farm_id, group_id, turbine_id]);
		
		/* Zoom Setting */
		_map.setZoom(_zoom.turbine);
		
		$('li#M_WTB_05 > a').click();	//!@#
		
		// !@#
		var farm_nm = $('ul.select-machine1 > li.active > a > span').text();
		var group_nm = $('ul.select-machine2 > li.active > a > span').text();
		var turbine_nm = $('ul.select-machine3 > li.active > a > span').text();
		
		setCookie('farm_info', farm_id + ':' + farm_nm, 1, 'hour');
		setCookie('group_info', group_id + ':' + group_nm, 1, 'hour');
		setCookie('turbine_info', turbine_id + ':' + turbine_nm, 1, 'hour');
		// !@#		
	}
	
	initDetailInfoView({farm_id: farm_id, group_id: group_id, turbine_id: turbine_id}, target);
}

function initDetailInfoView(param, target) {
	
	/* view 가 farm일 경우 한 번만, 실행         target = farm ??? */
	if(_view == 'farm') {
		/* Map Info */ 
		$.ajaxSettings.traditional = true;	
		$.ajax({
			url :  ctx + "/cms/cms_0100/targetInfo.ajax",
			data :  {},
			error : function (req, status, err) {
				// alert("ajax ERROR!!");
			},
			success : function(data) {
				$('#map_info').html(data);
				changeTargetInfo(param, target);
			}
		}); 
		
		/* Detail Info */
		$.ajax({
			url :  ctx + "/cms/cms_0100/detailInfo.ajax",
			data :  {},
			error : function (req, status, err) {
				// alert("ajax ERROR!!");
			},
			success : function(data) {
				$('#detail_info').html(data);
				changeDetailInfo(param, target);
			}
		}); 
	} else {
		changeTargetInfo(param, target);
		changeDetailInfo(param, target);
	}
	
};

/* change target info */
function changeTargetInfo(param, target) {
	
	var info = calculateTargetInfo(param, target);
	
	/* 1 */
	$('#info_capacity').attr('data-count', info.info_capacity);
	$('#info_capacity_unit').text(info.info_capacity_unit);
	$('#info_or').attr('data-count', info.info_or);
	$('#info_ur').attr('data-count', info.info_ur);
	
	/* 2 */
	$('#info_gr_qty_today').attr('data-count', info.info_gr_qty_today);
	$('#info_gr_qty_today_unit').text(info.info_gr_qty_today_unit);
	$('#info_gr_qty_this_year').attr('data-count', info.info_gr_qty_this_year);
	$('#info_gr_qty_this_year_unit').text(info.info_gr_qty_this_year_unit);
	$('#info_rate_ic_dc').attr('data-count', info.info_rate_ic_dc);
	$('#info_rate_ic_dc_sign').text(info.info_rate_ic_dc_sign);
	$('#info_rate_ic_dc_class').attr('class', info.info_rate_ic_dc_class);
	$('#info_rate_ic_dc_color').attr('class', info.info_rate_ic_dc_color);
	
	/* 3 */
	if(target != 'turbine') {
		$('#turbine_nomal').attr('data-percent', info.turbine_nomal);
		$('#turbine_error').attr('data-percent', info.turbine_error);
		$('#turbine_alarm').attr('data-percent', info.turbine_alarm);
	}
	
	/* 4 */
	if(target == 'farm') {
		$('#weather_temp_now').attr('data-count', info.weather_temp_now);
		$('#weather_temp_max').attr('data-count', info.weather_temp_max);
		$('#weather_temp_min').attr('data-count', info.weather_temp_min);
		$('#weather_wind_spd').attr('data-count', info.weather_wind_spd);
		
		$('.weather-now').attr('class', info.weather_icon);
		$('.wind-num').attr('class', info.weather_wind_deg);
	}
	
	infoEffect();
}

/* calculate target info  */
function calculateTargetInfo(param, target) {
	
	var info = {
		info_capacity: 0,
		info_capacity_unit: 'MW',
		info_or: 0,
		info_ur: 0,
		
		info_gr_qty_today: 0,
		info_gr_qty_today_unit: 'MW',
		info_gr_qty_this_year: 0,
		info_gr_qty_this_year_unit: 'MW',
		info_gr_qty_last_year: 0,
		info_rate_ic_dc: 0,				//전년대비 증감율
		info_rate_ic_dc_sign: '+',
		info_rate_ic_dc_class: 'xi-long-arrow-up',
		info_rate_ic_dc_color: 'plus',
		
		turbine_nomal: 0,
		turbine_error: 0,
		turbine_alarm: 0,
		
		weather_temp_now: 0,
		weather_temp_max: 0,
		weather_temp_min: 0,
		weather_wind_spd: 0,
		weather_icon: '',
		weather_wind_deg: 0
	}
	
	var map;
	var key; 
	
	switch(target) {
		case 'farm':
			map = popup_farm;
			key = param.farm_id;
			break;
		case 'group':
			map = popup_group[param.farm_id];
			key = param.group_id;
			break;
		case 'turbine':
			map = marker_turbine[param.group_id];
			key = param.turbine_id;
			break;
	}
	
	/* init info */
	info.info_capacity = map[key].info.target.capacity;
	info.info_or = map[key].info.target.or;
	info.info_ur = map[key].info.target.ur;
	info.info_gr_qty_today = map[key].info.target.gr_qty;
	info.info_gr_qty_this_year = map[key].info.target.gr_qty_this_year;
	info.info_gr_qty_last_year = map[key].info.target.gr_qty_last_year;
	
	if(target != 'turbine') {
		info.turbine_nomal = map[key].info.target.turbine_cnt;
		info.turbine_error = map[key].info.target.error_cnt;
	}
	
	if(target == 'farm') {
		/* 날씨 수치 */
		info.weather_temp_now = map[key].info.weather.temp;
		info.weather_temp_max = map[key].info.weather.temp_max;
		info.weather_temp_min = map[key].info.weather.temp_min;
		info.weather_wind_spd = map[key].info.weather.wind_speed;
		
		/* icon, 풍향 */
		info.weather_icon = 'weather-now ' + weather.calculate_icon(map[key].info.weather.icon);
		info.weather_wind_deg = 'wind-num ' + weather.calculate_direction16(map[key].info.weather.wind_deg);
	}
	
	/* 전년대비 증감률 계산 */
	if(info.info_gr_qty_this_year !=0 && info.info_gr_qty_last_year !=0) {
		info.info_rate_ic_dc = parseFloat((((info.info_gr_qty_this_year - info.info_gr_qty_last_year) / info.info_gr_qty_last_year) * 100).toFixed(2));
		
		if(info.info_rate_ic_dc < 0) {
			info.info_rate_ic_dc = Math.abs(info.info_rate_ic_dc);
			info.info_rate_ic_dc_sign = '-';
			info.info_rate_ic_dc_class = 'xi-long-arrow-down';
			info.info_rate_ic_dc_color = 'minus';
		}
	}
	
	/* MW > GW 체크 및 단위 변환 */
	if(info.info_capacity >= 1000) {
		info.info_capacity = info.info_capacity / 1000;
		info.info_capacity_unit = 'GW'
	}
	
	if(info.info_gr_qty_today >= 1000) {
		info.info_gr_qty_today = info.info_gr_qty_today / 1000;
		info.info_gr_qty_today_unit = 'GW'
	}
	
	if(info.info_gr_qty_this_year >= 1000) {
		info.info_gr_qty_this_year = parseFloat((info.info_gr_qty_this_year / 1000).toFixed(1));
		info.info_gr_qty_this_year_unit = 'GW'
	}
	
	return info;
	
}

function changeDetailInfo(param, target) {
	
	switch(target) {
		case 'farm':
			$('#subject_1').text('Farm Name');
			$('#subject_2').text('Operator');
			break;
		case 'group':
			$('#subject_1').text('Group Name');
			$('#subject_2').text('Operator');
			break;
		case 'turbine':
			$('#subject_1').text('Turbine Name');
			$('#subject_2').text('Manufacture');
			break;
	}
	
	/* loding sample */
	var loading_sample = _cms_elements.cms_0100.detail_info.loading();
	$('#container1').html(loading_sample);
	$('#container2').html(loading_sample);
	/* loding sample */
	
	
	var info = calculateDetailInfo(param, target);
	$('#detail_title').text(info.detail_name);
	$('#detail_name').text(info.detail_name);
	$('#detail_name2').html(info.detail_name2);
	$('#detail_capacity').text(info.detail_capacity);
	$('#detail_turbine_cnt').text(info.detail_turbine_cnt ? '(' + info.detail_turbine_cnt + 'unit)' : '');
	$('#detail_lat').text(info.detail_lat);
	$('#detail_lng').text(info.detail_lng);
	
	//!@#
	var state_bar = info.detail_err_cnt > 0 ? 'bar-wrap bar-wrap2' : 'bar-wrap';
	$('#state_bar').attr('class', state_bar);
	var state_nm = info.detail_err_cnt > 0 ? 'Sensor Error' : 'Normal';
	$('#state_nm').text(state_nm);
	//!@#
	
	//drawChart(param, target);
	setTimeout(drawChart, 1500, param, target);
}


function calculateDetailInfo(param, target) {
	
	var info = {
		detail_name: '',
		detail_capacity: 0,
		detail_turbine_cnt: 0,
		detail_lat: 0,
		detail_lng: 0,
		detail_err_cnt: 0,		//!@#
		detail_name2: '',
	}
	
	var map;
	var key;
	
	switch(target) {
		case 'farm':
			map = popup_farm;
			key = param.farm_id;
			var tmp = map[key].info.detail.operator_logo;
			if(tmp) {
				tmp = tmp.map((e) => {
					return _cms_elements.cms_0100.detail_info.logo_img({ctx:ctx, path:e});
				});
				info.detail_name2 = tmp.join('');
			} else {
				info.detail_name2 = '';
			}
			break;
		case 'group':
			map = popup_group[param.farm_id];
			key = param.group_id;
			var tmp = map[key].info.detail.operator_logo;
			if(tmp) {
				tmp = tmp.map((e) => {
					return _cms_elements.cms_0100.detail_info.logo_img({ctx:ctx, path:e});
				});
				info.detail_name2 = tmp.join('');
			} else {
				info.detail_name2 = '';
			}
			break;
		case 'turbine':
			map = marker_turbine[param.group_id];
			key = param.turbine_id;
			info.detail_name2 = _cms_elements.cms_0100.detail_info.logo_img({ctx:ctx, path:map[key].info.detail.manufacturer_logo});
			break;
	}
	
	info.detail_name = map[key].info.detail.name;
	info.detail_capacity = map[key].info.target.capacity;
	info.detail_turbine_cnt = map[key].info.target.turbine_cnt;
	info.detail_lat = map[key].info.detail.lat;
	info.detail_lng = map[key].info.detail.lng;
	info.detail_err_cnt = map[key].info.target.error_cnt;	//!@#
	
	return info;
}



/**
 * 
 * 		farm list를 매개변수로 받아 지도위에 popup 생성
 * 		
 *		- popup sample 
 * 		level2은 .popup-bubble에 이중 class로 .popup-bubble2이 붙습니다.
 * 		level3은 .popup-bubble에 이중 class로 .popup-bubble3이 붙습니다.
 * 		
 * 
 * @Ajax
 * @excuteFunction	nodeObjectController()
 * @excutePoint		$(document).ready()
 * @param 			farm 	ex) [ farm, farm, farm ]
 * @returns
 */
function initFarm(farm) {
	
	farm.forEach(function(e, i) {
		
		// popup sample 생성
		var popup_sample = _cms_elements.cms_0100.map.farm_popup({
			id: e.FARM_ID,
			name: e.FARM_NM,
			cnt: e.CNT_WT
		});
		
		// popup area 넣기 
		$('#popup').append(popup_sample);
		
		// popup Add Event
		$('#' + e.FARM_ID + '-farm').on('click', clickTarget);
		
		// createPopupClass function 생성
		Popup_function = createPopupClass();
		
		// popup center 좌표
		var center = new google.maps.LatLng(e.LATITUDE, e.LONGTUD);
		
		// popup 생성
		var tmp = new Popup_function(center, document.getElementById(e.FARM_ID + '-farm'));
		
		// meter / px 생성 : Zoom in & out에 따라 popup 크기 변경시 필요 
		var metersPerPx = 156543.03392 * Math.cos(center.lat() * Math.PI / 180) / Math.pow(2, _zoom.basic);
			
		// Farm(발전단지) 운영 정보 
		var ur = 0;
		var or = 0;
		var s_e_sec = 0;
		var qty = 0;
		var start_time = 0;
		var end_time = 0;
		
			
		start_time = new Date(e.START_TIME);
		end_time = new Date(e.END_TIME);
		s_e_sec = (end_time.getTime() - start_time.getTime()) / 1000;
		
		if(e.SUM_GR_QTY > 0 || e.SUM_GR_TIME > 0) {
			qty = parseFloat((e.SUM_GR_QTY / 1000).toFixed(2));
			ur = parseFloat(((qty / ((s_e_sec  / 60 / 60) * e.SUM_CAPACITY)) * 100).toFixed(2)); 
			or = parseFloat(((e.SUM_GR_TIME / (s_e_sec * e.CNT_WT)) * 100).toFixed(2));
		}
		
		// info 저장
		tmp.info = {
			farm_id : e.FARM_ID,
			index : i,
			diameter : 129 * metersPerPx,
			target: {
				capacity: e.SUM_CAPACITY,		// MW
				gr_qty: qty,						// MW
				gr_time: e.SUM_GR_TIME,			// sec
				gr_0_time: e.SUM_GR_0_TIME,		// sec
				turbine_cnt: e.CNT_WT,
				error_cnt: e.SENSOR_ERR_CNT,
				s_e_sec: s_e_sec,					// sec
				start_time: start_time,
				end_time: end_time,
				ur: ur,								// %
				or: or,								// %
				gr_qty_this_year: e.SUM_GR_QTY_THIS_YEAR,
				gr_qty_last_year: e.SUM_GR_QTY_LAST_YEAR
			},
			detail: {
				name: e.FARM_NM,
				lat: e.LATITUDE,
				lng: e.LONGTUD,
				operator_nm: e.OPERATOR_NM ? e.OPERATOR_NM.split(',,') : e.OPERATOR_NM,
				operator_logo: e.OPERATOR_LOGO ? e.OPERATOR_LOGO.split(',,') : e.OPERATOR_LOGO,
			},
			weather : {
				main: e.W_MAIN,
				temp: e.TP,
				temp_max: e.TP_MAX,
				temp_min: e.TP_MIN,
				wind_deg: e.WD_DEG,
				wind_speed: e.WD_SPD,
				icon: e.W_ICON,
			}
		}
		
		// add farm popup list 
		popup_farm[e.FARM_ID] = tmp;
		
		// popup map setting
		popup_farm[e.FARM_ID].setMap(_map);
		
		//Farm 중앙 마커 생성 & init
		//createMarker(e.LATITUDE, e.LONGTUD, e.FARM_ID, e.FARM_NM + '[Farm]의 중앙', tmp.info);
		
		/* node Object Setting */
		nodeObjectController(e.FARM_ID, 'farm', 'init');
		
	});
}


/**
 * 
 * 	test function
 * 
 * @param lat		Latitude - 위도
 * @param lng		Longitude - 경도
 * @param title		
 * @param msg		Alert Message
 * @param info		inner information
 * @returns
 */
//	function createMarker(lat, lng, title, msg, info) {
//		
//		var marker = new google.maps.Marker({
//            position: new google.maps.LatLng(lat, lng),
//            map: _map,
//            title: title,
//            msg: msg,
//            info: info
//        });
//		
//		marker.addListener('click', function() {
//			alert(this.msg);
//		});
//	}


/**
 * 
 * 		Create Group Popup
 * 
 * 		- popup sample
 * 		막대그래프 상황별로 Normal - default,  Sensor Error - .bar-wrap2, SCADA Alarm - .bar-wrap3
 * 		
 * 
 * @Ajax
 * @excuteFunction	createGroupPosition()
 * @excutePoint		selectTarget(), clickTarget()
 * @param 			
 * @returns
 */
function createGroup() {
	
	farm.forEach(function(e, i) {
		
		popup_group[e.FARM_ID] = {}; 
		 
		group[e.FARM_ID].forEach(function(e2, i2) {
			
			/* Group 중심 좌표 생성 */
			//var position = createGroupPosition(e2.GROUP_ID, e);
			var position = _googlemap.calculateCenterPosition(
					turbine[e2.GROUP_ID].map((e) => {return {lat:e.LATITUDE, lng:e.LONGTUD}}),
					'lat', 'lng', {lat: e.LATITUDE, lng: e.LONGTUD});
			
			if(e2.GROUP_NM != 'NO GROUP') {				
				
				var css = createGroupCss(position, e2.GROUP_ID);
				
				var state = '';	//default 
				if(e2.SENSOR_ERR_CNT > 0) state = 'bar-wrap2';
				
//					if(e2.STATE === 2) state = 'bar-wrap2';
//					if(e2.STATE === 3) state = 'bar-wrap3';
//					if(e2.STATE === null) state = 'bar-wrap4';
				
				// !@# 임시 - turbine	이 존재하지 않는 group
				var style = '';
				if(!(e2.CNT_WT > 0)) style = ' none';
				// 
				
				var popup_sample = _cms_elements.cms_0100.map.group_popup({
					farm_id: e.FARM_ID,
					id: e2.GROUP_ID,
					style: style,
					name: e2.GROUP_NM,
					state: state,
					capacity: e2.SUM_CAPACITY,
					cnt: e2.CNT_WT
				});
				$('#popup').append(popup_sample);
				
				// click event
				$('#' + e2.GROUP_ID + '-group').on('click', clickTarget);
				
				Popup_function = createPopupClass();
				var tmp = new Popup_function(new google.maps.LatLng(position.lat, position.lng), document.getElementById(e2.GROUP_ID + '-group'));
				
				
				// Group 운영 정보 
				var ur = 0;
				var or = 0;
				var s_e_sec = 0;
				var qty = 0;
				var start_time = 0;
				var end_time = 0;
					
				start_time = new Date(e2.START_TIME);
				end_time = new Date(e2.END_TIME);
				s_e_sec = (end_time.getTime() - start_time.getTime()) / 1000;
				
//					start_time = moment.tz(e.START_TIME, _timezone).local().format('YYYY-MM-DD HH:mm:ss');
//					end_time = moment.tz(e.END_TIME, _timezone).local().format('YYYY-MM-DD HH:mm:ss');
				
				//!@# before = e, after = e2 
				if(e2.SUM_GR_QTY > 0 || e2.SUM_GR_TIME > 0) {
					qty = parseFloat((e2.SUM_GR_QTY / 1000).toFixed(2));
					ur = parseFloat(((qty / ((s_e_sec  / 60 / 60) * e2.SUM_CAPACITY)) * 100).toFixed(2)); 
					or = parseFloat(((e2.SUM_GR_TIME / (s_e_sec * e2.CNT_WT)) * 100).toFixed(2));
				}
				
				tmp.info = {
					farm_id: e.FARM_ID,
					group_id: e2.GROUP_ID,
					index: i2,
					diameter: css.distance,
					target: {
						capacity: e2.SUM_CAPACITY,			// MW
						gr_qty: qty,						// MW
						gr_time: e2.SUM_GR_TIME,			// sec
						gr_0_time: e2.SUM_GR_0_TIME,		// sec
						turbine_cnt: e2.CNT_WT,
						error_cnt: e2.SENSOR_ERR_CNT,
						s_e_sec: s_e_sec,					// sec
						start_time: start_time,
						end_time: end_time,
						ur: ur,								// %
						or: or,								// %
						gr_qty_this_year: e2.SUM_GR_QTY_THIS_YEAR,
						gr_qty_last_year: e2.SUM_GR_QTY_LAST_YEAR
					},
					detail: {
						name: e2.GROUP_NM,
						lat: position.lat,
						lng: position.lng,
						operator_nm: e2.OPERATOR_NM ? e2.OPERATOR_NM.split(',,') : e2.OPERATOR_NM,
						operator_logo: e2.OPERATOR_LOGO ? e2.OPERATOR_LOGO.split(',,') : e2.OPERATOR_LOGO,
					}
					
				}
				
				// add group popup 
				popup_group[e.FARM_ID][e2.GROUP_ID] = tmp;
				
				// update group popup css 
				updatePopupCss(e.FARM_ID, e2.GROUP_ID, css, 'group');
				
				// Group 중앙 마커 생성
				//var center_marker = createMarker(position.lat, position.lng, e2.GROUP_ID, e2.GROUP_NM + '[Group]의 중앙', tmp.info);
			} else {
				
				//popup_group[e.FARM_ID][e2.GROUP_ID] = 'NO GROUP';
				
				
				// No Group 운영 정보 
				var ur = 0;
				var or = 0;
				var s_e_sec = 0;
				var qty = 0;
				var start_time = 0;
				var end_time = 0;
					
				start_time = new Date(e2.START_TIME);
				end_time = new Date(e2.END_TIME);
				s_e_sec = (end_time.getTime() - start_time.getTime()) / 1000;
				
//					start_time = moment.tz(e.START_TIME, _timezone).local().format('YYYY-MM-DD HH:mm:ss');
//					end_time = moment.tz(e.END_TIME, _timezone).local().format('YYYY-MM-DD HH:mm:ss');
				
				//!@# before = e, after = e2
				if(e2.SUM_GR_QTY > 0 || e2.SUM_GR_TIME > 0) {
					qty = parseFloat((e2.SUM_GR_QTY / 1000).toFixed(2));
					ur = parseFloat(((qty / ((s_e_sec  / 60 / 60) * e2.SUM_CAPACITY)) * 100).toFixed(2)); 
					or = parseFloat(((e2.SUM_GR_TIME / (s_e_sec * e2.CNT_WT)) * 100).toFixed(2));
				}
				
				popup_group[e.FARM_ID][e2.GROUP_ID] = {
					position: new google.maps.LatLng(position.lat, position.lng),
					farm_id: e.FARM_ID,
					group_id: e2.GROUP_ID,
					description: 'NO GROUP',
					info: {
						target: {
							capacity: e2.SUM_CAPACITY,			// MW
							gr_qty: qty,						// MW
							gr_time: e2.SUM_GR_TIME,			// sec
							gr_0_time: e2.SUM_GR_0_TIME,		// sec
							turbine_cnt: e2.CNT_WT,
							error_cnt: e2.SENSOR_ERR_CNT,
							s_e_sec: s_e_sec,					// sec
							start_time: start_time,
							end_time: end_time,
							ur: ur,								// %
							or: or,								// %
							gr_qty_this_year: e2.SUM_GR_QTY_THIS_YEAR,
							gr_qty_last_year: e2.SUM_GR_QTY_LAST_YEAR
						},
						detail: {
							name: e2.GROUP_NM,
							lat: position.lat,
							lng: position.lng,
							operator_nm: e2.OPERATOR_NM ? e2.OPERATOR_NM.split(',') : e2.OPERATOR_NM,
							operator_logo: e2.OPERATOR_LOGO ? e2.OPERATOR_LOGO.split(',,') : e2.OPERATOR_LOGO,
						}
					}
				}
			}
		});
	});
}


/** 
 * 	
 * Group Popup의 CSS ( Width, Height ) 생성
 * 
 * @param center 	Group Center		
 * @param group_id	
 * @returns
 */
function createGroupCss(center, group_id) {
	
	var a = new google.maps.LatLng(center.lat, center.lng); 
	var b;
	var distance = 0;
	var width = 100;
	var css = {};
	var metersPerPx;
	
	/* Group에 속한 Turbine의 좌표와 Group Center 좌표중 가장 먼 거리 도출 */
	if(turbine[group_id].length > 0) {
		for(var key in turbine[group_id]) {
			b = new google.maps.LatLng(turbine[group_id][key].LATITUDE, turbine[group_id][key].LONGTUD);
			distance = (distance < google.maps.geometry.spherical.computeDistanceBetween(a, b) ? google.maps.geometry.spherical.computeDistanceBetween(a, b) : distance);
		}
	}
	
	metersPerPx = 156543.03392 * Math.cos(a.lat() * Math.PI / 180) / Math.pow(2, _zoom.farm);
	
	if(distance > 0) {
		//591657550.500000 / 2^(level-1)
		width = (distance * 2) / metersPerPx + 40;
		css.width = width;
		css.top = width / 2; 
		css.distance = width * metersPerPx;
		return css;
		
	} else {
		css.width = 100;
		css.top = width / 2;
		css.distance = 100 * metersPerPx;
		return css;
	}
}

// 팝업 사이즈 조정
function updatePopupCss(farm_id, group_id, css, target) {
	
	var container;
	
	if(target == 'farm') {
		container = popup_group[farm_id].containerDiv;
	} else if(target == 'group'){
		container = popup_group[farm_id][group_id].containerDiv;
	}
	
	var anchor = container.children[0];
	var target = anchor.children[0];
	
	target.style.width = css.width + 'px';
	target.style.height = css.width + 'px';
	target.style.top = css.top + 'px';
}


/**
 * 
 * 		Place group popup in the map.
 * 
 * 		but, At first use setMap() function, 
 *  	After that, use onAdd() function.
 * 		
 * 
 * @Ajax
 * @excuteFunction	initTurbine(), nodeObjectController()
 * @excutePoint		selectTarget(), clickTarget()
 * @param 			
 * @returns
 */
function initGroup(farm_id) {
	
	
	for( var key in popup_group[farm_id]) {
		
		if(popup_group[farm_id][key].description != 'NO GROUP') {
			
			if(popup_group[farm_id][key].getMap() == undefined) {
				popup_group[farm_id][key].setMap(_map);
			} else {
				popup_group[farm_id][key].onAdd();
			}
			
			/* node Object Setting */
			nodeObjectController(farm_id + '-' + key, 'group', 'init');
			
			/* init turbine */
			initTurbine(key, true);
		} else {
			
			/* node Object Setting */
			nodeObjectController(farm_id + '-' + key, 'group', 'no');
			
			/* init turbine */
			initTurbine(key, false);
		}

	}
	
}

function createTurbine() {
	
	var marker_image = {
		url : ctx + '/img/sub/wt_icon.png',
		size: new google.maps.Size(50, 50),
	    origin: new google.maps.Point(0, 0),
	    anchor: new google.maps.Point(23, 27) 
	};
	
	var shape = {
		coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly',
        fill: '#FF0000',
    };
	
	
	farm.forEach(function(e, i) {
		
		group[e.FARM_ID].forEach(function(e2, i2) {
			
			marker_turbine[e2.GROUP_ID] = {};	// { group_id : { turbine_id : $marker, turbine_id : $marker, ... } }	
			
			turbine[e2.GROUP_ID].forEach(function(e3, i3) {
				
				var state = '';
				if(e3.SENSOR_ERR_CNT > 0) state = 'bar-wrap2';
//					if(e3.STATE === 2) state = 'bar-wrap2';
//					if(e3.STATE === 3) state = 'bar-wrap3';
//					if(e3.STATE === null) state = 'bar-wrap4';
				
				var info_sample = _cms_elements.cms_0100.map.turbine_infowindow({
					farm_id: e.FARM_ID,
					group_id: e2.GROUP_ID,
					id: e3.GERATOR_ID,
					name: e3.GERATOR_NM,
					state: state,
					power: e3.POWER,
				});
				
				var infowindow = new google.maps.InfoWindow({
		            content: info_sample,
		            //maxWidth: 1000
		            farm_id: e.FARM_ID,
			        group_id: e2.GROUP_ID,
			        turbine_id: e3.GERATOR_ID,
		        });
				
				var marker = new google.maps.Marker({
			        position: new google.maps.LatLng(e3.LATITUDE, e3.LONGTUD),
			        map: null,
			        icon: marker_image,
			        //shape: shape,		// click 범위 바뀜
			        title: e3.GERATOR_NM,
			        optimized: false,
			        infowindow: infowindow,
//				        farm_id: e.FARM_ID,
//				        group_id: e2.GROUP_ID,
//				        turbine_id: e3.GERATOR_ID,
//				        index: i3,
			    });
				
				// turbine 운영 정보 
				var ur = 0;
				var or = 0;
				var s_e_sec = 0;
				var qty = 0;
				var start_time = 0;
				var end_time = 0;
					
				start_time = new Date(e3.START_TIME);
				end_time = new Date(e3.END_TIME);
				s_e_sec = (end_time.getTime() - start_time.getTime()) / 1000;
				
//					start_time = moment.tz(e.START_TIME, _timezone).local().format('YYYY-MM-DD HH:mm:ss');
//					end_time = moment.tz(e.END_TIME, _timezone).local().format('YYYY-MM-DD HH:mm:ss');
				
				if(e.SUM_GR_QTY > 0 || e.SUM_GR_TIME > 0) {
					qty = parseFloat((e3.SUM_GR_QTY / 1000).toFixed(2));
					ur = parseFloat(((qty / ((s_e_sec  / 60 / 60) * e3.POWER)) * 100).toFixed(2)); 
					or = parseFloat((e3.SUM_GR_TIME / s_e_sec * 100).toFixed(2));
				}
				
				marker.info = {
					index: i3,
					farm_id: e.FARM_ID,
			        group_id: e2.GROUP_ID,
			        turbine_id: e3.GERATOR_ID,
			        
			        target: {
						capacity: e3.POWER,					// MW
						gr_qty: qty,						// MW
						gr_time: e3.SUM_GR_TIME,			// sec
						gr_0_time: e2.SUM_GR_0_TIME,		// sec
						error_cnt: e3.SENSOR_ERR_CNT,
						s_e_sec: s_e_sec,					// sec
						start_time: start_time,
						end_time: end_time,
						ur: ur,								// %
						or: or,								// %
						gr_qty_this_year: e3.SUM_GR_QTY_THIS_YEAR,
						gr_qty_last_year: e3.SUM_GR_QTY_LAST_YEAR
					},
					detail: {
						name: e3.GERATOR_NM,
						lat: e3.LATITUDE,
						lng: e3.LONGTUD,
						manufacturer_nm : e3.MANUFACTURER_NM,
						manufacturer_logo : e3.MANUFACTURER_LOGO,
					}
				}
				
				marker.addListener('click', clickTarget);
				marker_turbine[e2.GROUP_ID][e3.GERATOR_ID] = marker;
			});
			
		});
	});
	
}

function initTurbine(group_id, boolean) {
	for( var key in marker_turbine[group_id] ) {
		marker_turbine[group_id][key].setMap(_map);
		
		/* node Object Setting */
		if(boolean) {
			nodeObjectController(group_id + '-' + key, 'turbine', 'init');
		} else {
			nodeObjectController(group_id + '-' + key, 'turbine', 'no');
			marker_turbine[group_id][key].infowindow.open(_map, marker_turbine[group_id][key]);
			node.no_infowindow.push(marker_turbine[group_id][key].infowindow);
		}
		
	}
}

/* open infowindow */
function openInfoWindow(group_id) {
	for(var key in marker_turbine[group_id]) {
		marker_turbine[group_id][key].infowindow.open(_map, marker_turbine[group_id][key]);
		_node.infowindow.push(marker_turbine[group_id][key].infowindow);
	}
}

/* close infowindow */
function closeInfoWindow() {
	if(_node.infowindow.length > 0) {
		_node.infowindow.forEach(function(item) {
			item.close();
		});
		_node.infowindow = [];
	}
}

function openNoInfoWindow(group_id) {
	for(var key in marker_turbine[group_id]) {
		marker_turbine[group_id][key].infowindow.open(_map, marker_turbine[group_id][key]);
		_node.no_infowindow.push(marker_turbine[group_id][key].infowindow);
	}
}

function closeNoInfoWindow() {
	if(_node.no_infowindow.length > 0) {
		_node.no_infowindow.forEach(function(item) {
			item.close();
		});
		_node.no_infowindow = [];
	}
}

/* Changed Active InfoWindow of turbine */  
function activeInfoWindow(group_id, turbine_id) {
	
	unactiveInfoWindow();
	
	/* infowindow z-index up */
	zIndex++;
	marker_turbine[group_id][turbine_id].infowindow.setZIndex(zIndex);
	
	/* Click한 Turbine의 infowindow를 Active 상태로 변경 */   
	$('#' + turbine_id + '-infowindow').addClass('active');
}

/* Changed Unactive InfoWindow of turbine */  
function unactiveInfoWindow() {
	
	/* Active 상태인 infowindow 찾기 */
	var active_target = $('div[id*="-infowindow"][class*="active"]');
	
	/* Active 해제 */
	if(active_target.length > 0) {
		active_target.removeClass('active');
	}
}


/* combobox 변경 */
function changeCombo(target) {
	
	var default_farm    = '<li class="active"><a href="#none"><span>-- WIND FARM --</span></a></li>';      
	var default_group   = '<li class="active"><a href="#none"><span>-- GROUP --</span></a></li>';         
	var default_turbine = '<li class="active"><a href="#none"><span>-- WIND TURBINE --</span></a></li>';

	//var no_group = '<li><a href="#none" id="no_group"><span>Don\'t have group</span></a></li>'; // 그룹 지정하지 않은 발전기들
	
	switch(target.length) {
		case 1:
			if($('ul.select-machine.farm').attr('FARM_ID') != target[0]) {
				
				/* ul id Setting */
				$('ul.select-machine.farm').attr('FARM_ID', target[0]);
				
				/* Combo li Setting */
				var selector = $('ul[class*="select-machine1"] > li > a[id="'+ target[0] +'"]');
				if(selector.length != 0) {
					$('.select-machine.select-machine1.farm li').removeClass('active');
					selector.parent('li').addClass('active');
				}
				
				
				/* group setting */
				var str = default_group;
				for(var i=0; i<group[target[0]].length; i++) {
					str += '<li>' + '<a href="#none" id="' + group[target[0]][i].GROUP_ID + '"><span>' + group[target[0]][i].GROUP_NM + '</span></a></li>';
				}
				//str += no_group;
				$('.select-machine2').empty().append(str);
				
			}
			break;
			
		case 2:
			if($('ul.select-machine.farm').attr('FARM_ID') != target[0]) {
				
				/* ul id Setting */
				$('ul.select-machine.farm').attr('FARM_ID', target[0]);
				
				/* Combo li Setting */
				var selector = $('ul[class*="select-machine1"] > li > a[id="'+ target[0] +'"]');
				if(selector.length != 0) {
					$('.select-machine.select-machine1.farm li').removeClass('active');
					selector.parent('li').addClass('active');
				}
				
				
				/* group setting */
				var str = default_group;
				for(var i=0; i<group[target[0]].length; i++) {
					str += '<li>' + '<a href="#none" id="' + group[target[0]][i].GROUP_ID + '"><span>' + group[target[0]][i].GROUP_NM + '</span></a></li>';
				}
				//str += no_group;
				$('.select-machine2').empty().append(str);
				
			}
			
			if($('ul.select-machine.group').attr('GROUP_ID') != target[1]) {
				
				/* ul id Setting */
				$('ul.select-machine.group').attr('GROUP_ID', target[1]);
				
				/* Combo li Setting */
				var selector = $('ul[class*="select-machine2"] > li > a[id="'+ target[1] +'"]');
				if(selector.length != 0) {
					$('.select-machine.select-machine2.group li').removeClass('active');
					selector.parent('li').addClass('active');
				}
				
				/* group setting */
				var str = default_turbine;
				for(var i=0; i<turbine[target[1]].length; i++) {
					str += '<li>' + '<a href="#none" id="' + turbine[target[1]][i].GERATOR_ID + '"><span>' + turbine[target[1]][i].GERATOR_NM + '</span></a></li>';
				};
				
				$('.select-machine3').empty().append(str);
				
			}
			
			break;
		case 3:
			
			if($('ul.select-machine.farm').attr('FARM_ID') != target[0]) {
				
				/* ul id Setting */
				$('ul.select-machine.farm').attr('FARM_ID', target[0]);
				
				/* Combo li Setting */
				var selector = $('ul[class*="select-machine1"] > li > a[id="'+ target[0] +'"]');
				if(selector.length != 0) {
					$('.select-machine.select-machine1.farm li').removeClass('active');
					selector.parent('li').addClass('active');
				}
				
				
				/* group setting */
				var str = default_group;
				for(var i=0; i<group[target[0]].length; i++) {
					str += '<li>' + '<a href="#none" id="' + group[target[0]][i].GROUP_ID + '"><span>' + group[target[0]][i].GROUP_NM + '</span></a></li>';
				}
				//str += no_group;
				$('.select-machine2').empty().append(str);
				
			}
			
			if($('ul.select-machine.group').attr('GROUP_ID') != target[1]) {
				
				/* ul id Setting */
				$('ul.select-machine.group').attr('GROUP_ID', target[1]);
				
				/* Combo li Setting */
				var selector = $('ul[class*="select-machine2"] > li > a[id="'+ target[1] +'"]');
				if(selector.length != 0) {
					$('.select-machine.select-machine2.group li').removeClass('active');
					selector.parent('li').addClass('active');
				}
				
				/* turbine setting */
				var str = default_turbine;
				for(var i=0; i<turbine[target[1]].length; i++) {
					str += '<li>' + '<a href="#none" id="' + turbine[target[1]][i].GERATOR_ID + '"><span>' + turbine[target[1]][i].GERATOR_NM + '</span></a></li>';
				};
				
				$('.select-machine3').empty().append(str);
				
			}
			
			if($('ul.select-machine.turbine').attr('GERATOR_ID') != target[2]) {
				
				/* ul id Setting */
				$('ul.select-machine.turbine').attr('GERATOR_ID', target[2]);
				
				/* Combo li Setting */
				var selector = $('ul[class*="select-machine3"] > li > a[id="'+ target[2] +'"]');
				if(selector.length != 0) {
					$('.select-machine.select-machine3.turbine li').removeClass('active');
					selector.parent('li').addClass('active');
				}
				
			}
			
			break;
	}
	
}


/**
 * 	This Function is that change CSS of view after Target Click or Select Combo
 * 
 * @tartget Farm, Group, Turbine, ComboBox
 * @param nextView ['map', 'farm', 'group', 'turbine']
 * @returns
 */
function changeView(nextView) {
	
//		if(_view == 'farm' && nextView == 'group') { $('#cms-map-wrap').addClass('cms-map-wrap2'); }		
//		if(_view == 'group' && nextView == 'turbine') {  $('#cms-map-wrap').addClass('cms-map-wrap3'); }
//		if(_view == 'group' && nextView == 'farm') { $('#cms-map-wrap').removeClass('cms-map-wrap2'); }
//		if(_view == 'turbine' && nextView == 'farm') { $('#cms-map-wrap').removeClass('cms-map-wrap2'); $('#cms-map-wrap').removeClass('cms-map-wrap3');}
	
	if(_view == 'map' && nextView == 'farm') { $('#cms-map-wrap').addClass('cms-map-wrap2'); }		
	if(_view == 'farm' && nextView == 'group') {  $('#cms-map-wrap').addClass('cms-map-wrap3'); }
	if(_view == 'farm' && nextView == 'map') { $('#cms-map-wrap').removeClass('cms-map-wrap2'); }
	if(_view == 'group' && nextView == 'map') { $('#cms-map-wrap').removeClass('cms-map-wrap2'); $('#cms-map-wrap').removeClass('cms-map-wrap3');}
	
	
	_view = nextView;
	
	//!@#
	$('body').removeClass('gnb-active');
	$('body').addClass('gnb-none');
	$('#M_WTB_05').removeClass('on');
	
}


/**
 * 
 * Returns the Popup class.
 * 안타깝게도, 팝업 클래스는 다음 시간 이후에만 정의 될 수 있다. 
 * 구글 맵 API가 로드되면 OverlayView가 정의 된다.
 * 이 기능은 initMap으로 호출해야 한다.
 * 
 * 
 * @returns popup
 */
function createPopupClass() {
	
	/**
	 * 지도의 사용자 지정 팝업
	 * @param {!google.maps.LatLng} position
	 * @param {!Element} content The bubble div.
	 * @constructor
	 * @extends {google.maps.OverlayView}
	 */
	function Popup(position, content) {
		
		this.position = position;

		content.classList.add('popup-bubble');

		// 이 zero-height div는 bubble의 바닥에 위치한다.
		var bubbleAnchor = document.createElement('div');
		bubbleAnchor.classList.add('popup-bubble-anchor');
		bubbleAnchor.appendChild(content);

		// 이 zero-height div는 tip의 하단에 위치한다
		this.containerDiv = document.createElement('div');
		this.containerDiv.classList.add('popup-container');
		this.containerDiv.appendChild(bubbleAnchor);

		// 선적으로 클릭 중지. 지도에서 부글부글 끓어오르는
		google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
		
	}
	
	// ES5 magic to extend google.maps.OverlayView.
	Popup.prototype = Object.create(google.maps.OverlayView.prototype);

	/** map에 popup이 추가 될 때 호출됨 */
	Popup.prototype.onAdd = function() {
		this.getPanes().floatPane.appendChild(this.containerDiv);
	};

	/** map에 popup이 제거 될 때 호출 */
	Popup.prototype.onRemove = function() {
		if (this.containerDiv.parentElement) {
			this.containerDiv.parentElement.removeChild(this.containerDiv);
		}
	};
	
	/** popup 이 자체적으로 그려야 할 때 각 프레임 호출 */
	Popup.prototype.draw = function() {
		
		var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

		// popup이 멀리 보이지 않을 때, 숨긴다.
		var display =
			Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
			'block' :
			'none';

		if (display === 'block') {
			this.containerDiv.style.left = divPosition.x + 'px';
			this.containerDiv.style.top = divPosition.y + 'px';
		}
		if (this.containerDiv.style.display !== display) {
			this.containerDiv.style.display = display;
		}
	};
	
	//custom
	Popup.prototype.getInfo = function() {
		return 'getInfo';
	};

	return Popup;
}



/******************************************* Style *******************************************/

var map_styles = {
default: null,
silver: [
  {
    elementType: 'geometry',
    stylers: [{color: '#f5f5f5'}]
  },
  {
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{color: '#616161'}]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{color: '#f5f5f5'}]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{color: '#bdbdbd'}]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{color: '#eeeeee'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#757575'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#e5e5e5'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9e9e9e'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#ffffff'}]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [{color: '#757575'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#dadada'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#616161'}]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9e9e9e'}]
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{color: '#e5e5e5'}]
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{color: '#eeeeee'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#c9c9c9'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9e9e9e'}]
  }
],

night: [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}]
  }
],

retro: [
  {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{color: '#c9b2a6'}]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [{color: '#dcd2be'}]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{color: '#ae9e90'}]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#93817c'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{color: '#a5b076'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#447530'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#f5f1e6'}]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{color: '#fdfcf8'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#f8c967'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#e9bc62'}]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [{color: '#e98d58'}]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [{color: '#db8555'}]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{color: '#806b63'}]
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [{color: '#8f7d77'}]
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#ebe3cd'}]
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{color: '#b9d3c2'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#92998d'}]
  }
],

hiding: [
  {
    featureType: 'poi.business',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'transit',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
      }
    ]
  };
	
	
	
	
/******************************************* test function *******************************************/


/* test mode - start : console : testMode('test') */
var test_mode; 	// [create center]
var test_mode_list = [ 'create center', 'change theme', 'close' ];

var test_index=0;
var test_marker_arr = [];
var test_center;
var test_marker_icon = [
	"http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
	"http://maps.google.com/mapfiles/ms/icons/pink-dot.png",
	"http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
	"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
];

function testMode(param) {
	
	var msg = '꺼져';
	
	test_mode_list.forEach(function(item) { 
		
		if(param == item) {
			test_mode = param;
			msg = 'Start [ ' + test_mode + ' ] Mode'; 
		} 
		
	});
	
	return msg;
}

function testCreateMarkerAfterClick(e) {
	
	if(test_mode == 'create center') {
		var marker = new google.maps.Marker({
            position: new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()),
            map: map,
            title: 'test maker '+ test_index,
        });
		
		test_marker_arr.push(marker);
		test_index++;
		testCreateCenter();
	}
}

function testCreateCenter() {
	
	var x1;	// 가장 작은 위도 값 
	var y1; // 가장 작은 경도 값
	var x2; // 가장 큰 위도 값
	var y1; // 가장 큰 경도 값
	
	if(test_marker_arr.length >= 2) {
		if(test_center != undefined) test_center.setMap(null);
		
		test_marker_arr.forEach(function(item, i) {
			
			if(x1 == undefined) {
				x1 = item.position.lat();
				x2 = item.position.lat();
				y1 = item.position.lng();
				y2 = item.position.lng();
			}
			
			if(item.position.lat() > x2) {
				x2 = item.position.lat();
			}
			
			if(item.position.lat() < x1) {
				x1 = item.position.lat();
			}
			
			if(item.position.lng() > y2) {
				y2 = item.position.lng();
			}
			
			if(item.position.lng() < y1) {
				y1 = item.position.lng();
			}
			
		});
		
		var lat = x1 + ((x2-x1) / 2);
		var lng = y1 + ((y2-y1) / 2);
		
		test_center = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map,
            title: 'test center',
            icon: test_marker_icon[parseInt(Math.random() * 4)]
        });
		
	} 
	
}

var test_theme_list = ['default', 'retro', 'silver', 'night', 'hidding'];

function changeMapTheme(theme) {
	
	if(test_mode == 'change theme') {
		
		if(theme == 'list') {
			return test_theme_list;
		}
		
		if(test_theme_list.includes(theme)) {
			map.setOptions({styles: map_styles[theme]});
		} else {
			return 'error';
		}
	}
}


/******************************************* not used function *******************************************/	

/**
 * 
 * This is a function after selecting a farm
 * 
 * @Ajax	farmInfo.ajax, detailInfo.ajax
 * @excuteFunction changeView(), map_center_control(), initGroup()
 * @target 	Farm Combo
 * @param farm_id
 * @returns
 */
//	function selectFarm(farm_id) {
//		
//		if(Object.keys(popup_group).length == 0 || Object.keys(marker_turbine).length == 0) {
//			alert('Please wait.. Data Loding..');
//			return;
//		}
//		
//		changeView('group');						/* View Change */
//		map_center_control(farm_id);						/* Map Center */
//		
//		/* Map Info */ 
//		$.ajaxSettings.traditional = true;	
//		$.ajax({
//			url :  ctx + "/cms/cms_0100/farmInfo.ajax",
//			data :  {'FARM_ID' : farm_id },
//			error : function (req, status, err) {
//				alert("ajax ERROR!!");
//			},
//			success : function(data) {
//				$('#map_info').html(data);
//			}
//		}); 
//		
//		/* Detail Info */
//		$.ajax({
//			url :  ctx + "/cms/cms_0100/detailInfo.ajax",
//			data :  {'FARM_ID' : farm_id },
//			error : function (req, status, err) {
//				alert("ajax ERROR!!");
//			},
//			success : function(data) {
//				$('#detail_info').html(data);
//			}
//		}); 
//		
//		popup_farm[farm_id].onRemove();
//		map.setZoom(zoom.group);
//		initGroup(farm_id);
//	}

//	/**
//	 * 	
//	 * 	Farm Popup Click event
//	 * 
//	 * @Ajax	farmInfo.ajax, detailInfo.ajax
//	 * @excuteFunction changeView(), initGroup(), map_center_control(), comboChangeFarm() 	
//	 * @target 	Farm Popup
//	 * @param
//	 * @returns
//	 */
//	function clickFarm() {
//		
//		if(Object.keys(popup_group).length == 0 || Object.keys(marker_turbine).length == 0) {
//			alert('Please wait.. Data Loding..');
//			return;
//		}
//		
//		var id = $(this).attr('id').split('-');
//		var farm_id = id[0];
//		var target = id[1];
//		
//		changeView('group');									/* View Change */
//		map_center_control(farm_id);							/* Map Center */
//		changeCombo([farm_id]);									/* Combo Setting */	
//		
//		
//		/* Map Info */ 
//		$.ajaxSettings.traditional = true;	
//		$.ajax({
//			url :  ctx + "/cms/cms_0100/farmInfo.ajax",
//			data :  {'FARM_ID' : farm_id },
//			error : function (req, status, err) {
//				alert("ajax ERROR!!");
//			},
//			success : function(data) {
//				$('#map_info').html(data);
//			}
//		}); 
//		
//		/* Detail Info */
//		$.ajax({
//			url :  ctx + "/cms/cms_0100/detailInfo.ajax",
//			data :  {'FARM_ID' : farm_id },
//			error : function (req, status, err) {
//				alert("ajax ERROR!!");
//			},
//			success : function(data) {
//				$('#detail_info').html(data);
//			}
//		}); 
//		
//		/* Update Map */
//		popup_farm[farm_id].onRemove();
//		map.setZoom(zoom.group);
//		initGroup(farm_id);
//		
//	}


//	function selectGroup(farm_id, group_id) {
//		
//		/* Get Info */
//		var center = popup_group[farm_id][group_id].position;
//		
//		/* Ajax info */
//		
//		/* Delete Group Popup */
//		popup_group[farm_id][group_id].onRemove();
//		
//		/* zoom & center setting */
//		map.setZoom(zoom.turbine);
//		map.panTo(new google.maps.LatLng(center.lat(), center.lng()));
//		
//		/* info window open */
//		openInfoWindow(group_id);
//		
//		/* Init Map-Info */
//		
//		/* ChangeView */
//		changeView('turbine');
//	}


//	function clickGroup() {
//	
//		/* Get Info */
//		var id = $(this).attr('id').split('-');
//		var farm_id = $(this).attr('farm_id');
//		var group_id = id[0];
//		var target = id[1];
//		var center = popup_group[farm_id][group_id].position;
//		
//		/* Ajax info */
//		
//		/* Delete Group Popup */
//		popup_group[farm_id][group_id].onRemove();
//		
//		/* zoom & center & combo setting */
//		map.setZoom(zoom.turbine);
//		map.panTo(new google.maps.LatLng(center.lat(), center.lng()));
//		changeCombo([farm_id, group_id]);
//		
//		/* info window open */
//		openInfoWindow(group_id);
//		
//		/* Init Map-Info */
//		
//		/* ChangeView */
//		changeView('turbine');
//	}	

//	function clickTurbine() {
//	
//		var farm_id = this.farm_id
//		var group_id = this.group_id;
//		var turbine_id = this.turbine_id;
//		var center = this.position;
//		
//		
//		/* InfoWindow Active 변경, unAvtive 포함 */
//		activeInfoWindow(turbine_id);
//		
//		/* center 변경 */
//		map.panTo(new google.maps.LatLng(center.lat(), center.lng()));
//		
//		/* Combo 변경 farm, group, turbine */
//		changeCombo([farm_id, group_id, turbine_id]);
//		
//		
//		/* Ajax */
//		
//	}

//	function clickInfoWindow(turbine_id) {
//		
//		debugger;
//		
//		var farm_id = $(this).attr('farm_id');
//		var id = $(this).attr('id');
//		
//		alert(turbine_id);
//		
//	}
