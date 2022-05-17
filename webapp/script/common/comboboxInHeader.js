/* ============================================================
 * Header의 Farm, Group, Turbine Combobox 관련 Script
 * @author		: yjkim
 * @since		: 2020.02.10
 * @modifier	: parkjk
 * @since		: 2020.08.19
============================================================ */

//var default_farm    = '<li class="active"><a href="#none"><span># FARM</span></a></li>';      
//var default_group   = '<li class="active"><a href="#none"><span># GROUP</span></a></li>';         
//var default_turbine = '<li class="active"><a href="#none"><span># TURBINE</span></a></li>';

var no_group = '<li><a href="#none" id="no_group"><span>Don\'t have group</span></a></li>'; // 그룹 지정하지 않은 발전기들

/* 발전단지 목록 조회 */
function getFarms() {
	
	var caller = arguments.callee.caller.name;
	
//	$.ajax({
//		url: CTX + '/common/getFarm.ajax',
//		data: {},
//		success: function(response) {
//			if (!response || response.length <= 0) {
//				$('ul.select-machine1 li').removeClass('active');
//				
//				$('.select-machine1').empty().append(default_farm);
//				$('.select-machine2').empty().append(default_group);
//				$('.select-machine3').empty().append(default_turbine);
//				
//				return false;
//			}
//			
//			var str = (caller !== 'hasCookie' ? default_farm : default_farm.replace('class="active"', ''));
//			
//			$.each(response, function(index, obj) {
//				var active = '';
//				if(caller === 'hasCookie' && obj.FARM_ID === cookie_farm[0]) {
//					active = ' class="active"';
//				}
//				str += '<li' + active + '>' + '<a href="#none" id="' + obj.FARM_ID + '"><span>' + obj.FARM_NM + '</span></a></li>';
//			});
//			
//			$('.select-machine1').empty().append(str);
//			
//		},
//		error: function(jqXHR, textStatus, errorThrown) {
//			console.log(textStatus, errorThrown);
//		}
//	});
	
};

/* 그룹 목록 조회 */
function getGroups(farm_id) {
//	if (farm_id == '' || farm_id == undefined) {
//		return false;
//	}
//	var caller = arguments.callee.caller.name;
//	$.ajax({
//		url: CTX + '/common/getGroup.ajax',
//		data: {'FARM_ID' : farm_id},
//		success: function(response) {
//			if (!response || response.length <= 0) {
//				$('ul.select-machine2 li').removeClass('active');
//				$('.select-machine2').empty().append(default_group);
//				//$('.select-machine2').empty().append(no_group);
//				$('.select-machine3').empty().append(default_turbine);
//				return false;
//			}
//			
//			var str = (caller !== 'hasCookie' ? default_group : default_group.replace('class="active"', ''));
//			
//			$.each(response, function(index, obj) {
//				var active = '';
//				if(caller === 'hasCookie' && obj.GROUP_ID === cookie_group[0]) {
//					active = ' class="active"';
//				}
//				str += '<li' + active + '>' + '<a href="#none" id="' + obj.GROUP_ID + '"><span>' + obj.GROUP_NM + '</span></a></li>';
//			});
//			
//			//str += no_group;
//			
//			$('.select-machine2').empty().append(str);
//		},
//		error: function(jqXHR, textStatus, errorThrown) {
//			console.log(textStatus, errorThrown);
//		}
//	});
};

/* 발전기 목록 조회 */
function getTurbines(group_id) {
//	if (group_id == '' || group_id == undefined) {
//		return false;
//	}
//	
//	var caller = arguments.callee.caller.name;
//	
//	$.ajax({
//		url: CTX + '/common/getTurbine.ajax',
//		data: {'GROUP_ID' : group_id},
//		success: function(response) {
//			if (!response || response.length <= 0) {
//				$('ul.select-machine3 li').removeClass('active');
//				$('.select-machine3').empty().append(default_turbine);
//				return false;
//			}
//			var str = (caller !== 'hasCookie' ? default_turbine : default_turbine.replace('class="active"', ''));
//			
//			$.each(response, function(index, obj) {
//				var active = '';
//				if(caller === 'hasCookie' && obj.GERATOR_ID === cookie_turbine[0]) {
//					active = ' class="active"';
//				}
//				str += '<li' + active + '>' + '<a href="#none" id="' + obj.GERATOR_ID + '"><span>' + obj.GERATOR_NM + '</span></a></li>';
//			});
//			
//			$('.select-machine3').empty().append(str);
//		},
//		error: function(jqXHR, textStatus, errorThrown) {
//			console.log(textStatus, errorThrown);
//		}
//	});
};

/* navigation 정리 */
function clearNavi(chkNum) {
	$('ul.location li').each(function(index, item) {
		if (index > chkNum) {
			item.remove();
		}
	});
}

/* Combobox 관련 click events */
function headerWithSelectBox(callback, ...args) {
	/* Header에 발전단지, 그룹, 발전기 Combobox 추가 */
//	var $combo_farm    = $('<ul class="select-machine select-machine1 farm"></ul>');
//	var $combo_group   = $('<ul class="select-machine select-machine2 group"></ul>');
//	var $combo_turbine = $('<ul class="select-machine select-machine3 turbine"></ul>');
//	
//	$combo_farm.append(default_farm);
//	$combo_group.append(default_group);
//	$combo_turbine.append(default_turbine);
//	
//	$('div.select-machine-wrap').empty();
//	$('div.select-machine-wrap').append($combo_farm);	
//	$('div.select-machine-wrap').append($combo_group);	
//	$('div.select-machine-wrap').append($combo_turbine);
	
//	getFarms();
	
	/* Header의 Combobox에서 발전단지를 선택했을 때 */
	//$(document).on('click', '.select-machine1 > li > a:gt(0)', function() {
//	$(document).on('click', '.select-machine1 > li > a', function() {
//		var farm_id = $(this).attr('id');
//		var farm_nm = $(this).find('span').text();
//		
//		// init Location 
//		clearNavi(1);
//		// init group, turbine li, attribute 
//		$('.select-machine2').empty().append(default_group);
//		$('.select-machine3').empty().append(default_turbine);
//		$('ul.select-machine.group').removeAttr('GROUP_ID');
//		$('ul.select-machine.turbine').removeAttr('GERATOR_ID');
//		
//		if(farm_id) {
//			// location 추가 
//			$('ul.location').append('<li>' + farm_nm + '</li>');
//			
//			// 속성 추가 
//			$('ul.select-machine.farm').attr('FARM_ID', farm_id);
//			
//			// getGroup
//			getGroups(farm_id);
//		} else {
//			$('ul.select-machine.farm').removeAttr('FARM_ID');
//		}
//		
//		// title 추가 cms, oam, asset
//		$('.tit-wrap .heading3 .version').empty().text(farm_id ? farm_nm : '');
//		
//		// cookie
//		farm_id ? setCookie('farm_info', farm_id + ':' + farm_nm, 1, 'hour') : deleteCookie('farm_info');
//		deleteCookie('group_info');
//		deleteCookie('turbine_info');
//		// callback
//		//window[onSelect]();
//		excuteCallback(callback, ...args);
//	});
//	
//	/* Header의 Combobox에서 그룹을 선택했을 때 */
//	$(document).on('click', '.select-machine2 > li > a', function() {
//		var group_id = $(this).attr('id');
//		var group_nm = $(this).find('span').text();
//		
//		// init Location 
//		clearNavi(2);
//		
//		// init turbine li, attribute
//		$('.select-machine3').empty().append(default_turbine);
//		$('ul.select-machine.turbine').removeAttr('GERATOR_ID');
//		
//		if(group_id) {
//			// location 추가
//			$('ul.location').append('<li>' + group_nm + '</li>');
//			// 속성 추가 
//			$('ul.select-machine.group').attr('GROUP_ID', group_id);
//			// getTurbine
//			getTurbines(group_id);
//		} else {
//			$('ul.select-machine.group').removeAttr('GROUP_ID');
//		}
//		// title 추가 cms, oam, asset
//		$('.tit-wrap .heading3 .version').empty().text(group_id ? group_nm : $('ul.select-machine.farm li.active span').text());
//		// cookie
//		group_id ? setCookie('group_info', group_id + ':' + group_nm, 1, 'hour') : deleteCookie('group_info');
//		deleteCookie('turbine_info');
//		// callback
//		//window[onSelect]()
//		excuteCallback(callback, ...args);
//	});
//	
//	/* Header의 Combobox에서 발전기를 선택했을 때 */
//	$(document).on('click', '.select-machine3 > li > a', function() {
//		var turbine_id = $(this).attr('id');
//		var turbine_nm = $(this).find('span').text();
//		// Location Clear
//		clearNavi(3);
//		if(turbine_id) {
//			// location 추가
//			$('ul.location').append('<li class="bold">' + turbine_nm + '</li>');
//			// 속성 추가 
//			$('ul.select-machine.turbine').attr('GERATOR_ID', turbine_id);
//		} else {
//			$('ul.select-machine.turbine').removeAttr('GERATOR_ID');
//		}
//		// title 추가 cms, oam, asset
//		$('.tit-wrap .heading3 .version').empty().text(turbine_id ? turbine_nm : $('ul.select-machine.group li.active span').text());
//		
//		// cookie
//		turbine_id ? setCookie('turbine_info', turbine_id + ':' + turbine_nm, 1, 'hour') : deleteCookie('turbine_info');
//		// callback
//		//window[onSelect]()
//		excuteCallback(callback, ...args);
//	});
}

function comboChangeFarm(farm_id){
	$('ul.select-machine.farm').attr('FARM_ID', farm_id);
	getGroups(farm_id);
	if($('.select-machine.select-machine1.farm li').length>1){
		$('.select-machine.select-machine1.farm li').each(function(id, obj){
			if($(this).find('a').attr('id') == farm_id){
				$('.select-machine.select-machine1.farm li').removeClass('active');
				$(this).addClass('active');
				
			}
		});
	}
}

function comboChangeGroup(group_id){
	$('ul.select-machine.group').attr('GROUP_ID', group_id);
	getTurbines(group_id);
	if($('.select-machine.select-machine2.group li').length>1){
		$('.select-machine.select-machine2.group li').each(function(id, obj){
			if($(this).find('a').attr('id') == group_id){
				$('.select-machine.select-machine2.group li').removeClass('active');
				$(this).addClass('active');
				
			}
		});
	}
}
function comboChangeTurbine(turbine_id){
	$('ul.select-machine.turbine').attr('GERATOR_ID', turbine_id);
	
	if($('.select-machine.select-machine3.turbine li').length>1){
		$('.select-machine.select-machine3.turbine li').each(function(id, obj){
			if($(this).find('a').attr('id') == turbine_id){
				$('.select-machine.select-machine3.turbine li').removeClass('active');
				$(this).addClass('active');
			}
		});
	}
}

var cookie_farm;
var cookie_group;
var cookie_turbine;
function hasCookie() {
	
	cookie_farm = getCookie('farm_info');
	cookie_group = getCookie('group_info');
	cookie_turbine = getCookie('turbine_info');
	
	if(cookie_farm && cookie_group && cookie_turbine) {
		
		cookie_farm = cookie_farm.split(':');
		cookie_group = cookie_group.split(':');
		cookie_turbine = cookie_turbine.split(':');
		
		$('ul.select-machine.farm').attr('FARM_ID', cookie_farm[0]);
		$('ul.select-machine.group').attr('GROUP_ID', cookie_group[0]);
		$('ul.select-machine.turbine').attr('GERATOR_ID', cookie_turbine[0]);
		
		getFarms();
		getGroups(cookie_farm[0]);
		getTurbines(cookie_group[0]);
		
		// location 추가
		$('ul.location').append('<li>' + cookie_farm[1] + '</li>');
		$('ul.location').append('<li>' + cookie_group[1] + '</li>');
		$('ul.location').append('<li>' + cookie_turbine[1] + '</li>');
		// title 추가 cms, oam, asset
		$('.tit-wrap .heading3 .version').empty().text(cookie_turbine[1]);

		return { farm_id: cookie_farm[0], farm_nm: cookie_farm[1], group_id: cookie_group[0], group_nm: cookie_group[1], turbine_id: cookie_turbine[0], turbine_nm: cookie_turbine[1] };
		
	} else {
		return false;
	}
}

/**
 * # combobox 선택 시 callback 함수 실행
 * @param callback 	: 실행 할 callback 함수(function 또는 namespace(string)) 
 * @param ...args	: callback에 인자 값
 * @returns callback 함수 결과 값
 * @JK
 */
function excuteCallback(callback, ...args) {
	var namespace = typeof callback === 'string' ? callback.split('.') : [];
    callback = typeof callback === 'function' ? callback : window;
    namespace.forEach((e) => callback = callback[e]);
    return typeof callback === 'function' ? callback(...args) : undefined;
}

