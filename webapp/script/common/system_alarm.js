

var _days_ago = 14;
var _interval = 30000;
var _systemAlarmActive = false;

$(document).ready(function() {
	$('#alarm_btn').prop('state', 'read');
	$('#alarm_btn').click(ckeckAlarm);
	activeAlarmServer();
	setInterval(activeAlarmServer, _interval);
//	setTimeout(() => {
//		activeAlarmServer();
//		setTimeout(activeAlarmServer, _interval);
//	}, 0);
});	

function ckeckAlarm() {
	
	var state = $(this).prop('state');
	
	$('#alarm_num').text(0);
	$('#alarm_num').css('display', 'none');
	
	var list = [];
	var sensor, scada, notice;
	
	if(state === 'delete') {
		console.log('delete');
		sensor = $('ul#_sensor > li').toArray().map((e) => e);
		scada = $('ul#_scada > li').toArray().map((e) => e);
		notice = $('ul#_notice > li').toArray().map((e) => e);
		
		$('#notice_area').html(_alarm_sample.no_alarm());
		$('#alarm_num').css('display', 'none');
	} 
	else if(state === 'read') {
		console.log('read');
		sensor = $('ul#_sensor > li').toArray().filter((e) => e.state === null);
		scada = $('ul#_scada > li').toArray().filter((e) => e.state === null);
		notice = $('ul#_notice > li').toArray().filter((e) => e.state === null);
	}
	
	sensor = sensor.concat(scada).concat(notice);
	
	sensor.forEach((e) => {
		list.push(e.id.split('_')[1]);
		$('#' + e.id).prop('state', 'read');
	});
	
	if(list.length > 0) {
		$.ajaxSettings.traditional = true;	
		$.ajax({
			url : ctx + '/common/SystemAlarm/checkAlarmHistory.ajax',
			type: 'GET',
			async: false,
			data : {ALARM_LIST: list, STATE: state},
			//dataType: 'json',
			error : function (req, status, err) {
				// alert("ajax ERROR!!");
			},
			success : function(data) {
				result = data;
			}
		});
	}
}

function activeAlarmServer() {
	
	console.warn('System Alarm is ' + (_systemAlarmActive ? 'turn on.' : 'turn off.'));
	if(!_systemAlarmActive) return;
	
	var param = makeSearchDate_system_alarm();
	var data = getAlarmData(param);
	
	if(!data) {
		/* Alarm 없을 경우 */
		// no_alarm sample 삽입 
		$('#notice_area').html(_alarm_sample.no_alarm());
		// alarm count 숨김  
		$('#alarm_num').css('display', 'none');
	} else {
		/* Alarm 있을 경우 */
		// has_alarm (sturture) 삽입  
		$('#notice_area').html(_alarm_sample.has_alarm());
		
		// Alarm 개수 체크
		var cnt = data.SENSOR.filter((e) => e.STATE === null).length;
		cnt = cnt + data.SCADA.filter((e) => e.STATE === null).length; 
		cnt = cnt + data.NOTICE.filter((e) => e.STATE === null).length; 
		
		// Alarm 개수 표시
		if(cnt === 0) $('#alarm_num').css('display', 'none');
		if(cnt > 0) $('#alarm_num').css('display', 'inline-block');
		cnt = cnt > 99 ? '99+' : cnt + '+';
		$('#alarm_num').text(cnt);
		
		// Alarm Message 생성 
		if(data.SENSOR.length > 0) {
			var sample = _alarm_sample.alarm_part(1);
			$('#has_alarm').append(sample);
			makeAlarm(1, data.SENSOR);
		}
		if(data.SCADA.length > 0) {
			var sample = _alarm_sample.alarm_part(2);
			$('#has_alarm').append(sample);
			makeAlarm(2, data.SCADA);
		}
		if(data.NOTICE.length > 0) {
			var sample = _alarm_sample.alarm_part(3);
			$('#has_alarm').append(sample);
			makeAlarm(3, data.NOTICE);
		}
		
		// Alarm Message Click Event 추가
		$('a[id*=go_]').click(goAlarm);
		$('a[id*=close_]').click(closeAlarm);
		
		$('#deleteAll').prop('state', 'delete');
		$('#deleteAll').click(ckeckAlarm);
		
		// scroll 활성화
		$("#notice_area .t-side-popup-scroll").mCustomScrollbar({
			axis: "Y",
			theme: "minimal-dark",
			mouseWheelPixels: 300
		});
	}
}

function makeAlarm(i, data) {
	data.forEach((e) => {
		switch(i) {
			case 1:
				var param = _alarm_sample.sensor(e);
				var alarm = _alarm_sample.alarm(param);
				$('#_sensor').append(alarm);
				$('#sensor_' + e.CHECK_ID).prop('info', param.info);
				$('#sensor_' + e.CHECK_ID).prop('state', param.state);
				break;
			case 2:
				var param = _alarm_sample.scada(e);
				var alarm = _alarm_sample.alarm(param);
				$('#_scada').append(alarm);
				$('#scada_' + e.EVENT_ID).prop('info', param.info);
				$('#scada_' + e.EVENT_ID).prop('state', param.state);
				break;
			case 3:
				var param = _alarm_sample.notice(e);
				var alarm = _alarm_sample.alarm(param);
				$('#_notice').append(alarm);
				$('#notice_' + e.NOTICE_ID).prop('info', param.info);
				$('#notice_' + e.NOTICE_ID).prop('state', param.state);
				break;
		}
	});
}

function goAlarm() {
	var id = $(this).parent().attr('id').split('_');
	var info = $(this).parent().prop('info');
	
	if(id[0] === 'sensor') {
		for(var key in info) {
			setCookie(key, info[key], 1, 'hour');
		}
	}
	switch(id[0]) {
		case 'sensor':
			//location.href = ctx + '/cms/cms_0300/main';
			break;
		case 'scada':
			location.href = ctx + '/oam2/oam_0100/01/eventDetail?EVENT_ID=' + info.event_id;
			break;
		case 'notice':
			location.href = ctx + '/sys_new/sys_0700/detailForm?NOTICE_ID=' + info.notice_id;
			break;
	}
}

function closeAlarm() {
	
	var id = $(this).parent('li').attr('id').split('_')[1];
	$.ajaxSettings.traditional = true;	
	$.ajax({
		url : ctx + '/common/SystemAlarm/updateAlarmHistory.ajax',
		type: 'GET',
		async: false,
		data : {MESSAGE_ID: id, STATE: 'delete'},
		//dataType: 'json',
		error : function (req, status, err) {
			// alert("ajax ERROR!!");
		},
		success : function(data) {
		}
	});
	
	$(this).parent().remove();
	
	if($('#_sensor > li').length === 0 && $('#_scada > li').length === 0 && $('#_notice > li').length === 0) {
		$('#notice_area').html(_alarm_sample.no_alarm());
	}
}

function makeSearchDate_system_alarm() {
	
	var format = 'YYYY-MM-DD HH:mm:ss';
	var to = moment.tz(_timezone);
	var offset = to.format('Z');
	var from = to.clone();
	from.set('date', to.get('date') - _days_ago);
	from.set('hour', 0);
	from.set('minute', 0);
	from.set('second', 0);
	from.set('millisecond', 0);
	to.tz('UTC');
	from.tz('UTC');
	return {FROM:from.format(format), TO:to.format(format), TIMEZONE_OFFSET: offset};
}


function getAlarmData(param) {
	var result;
	$.ajaxSettings.traditional = true;	
	$.ajax({
		url : ctx + '/common/SystemAlarm/getAlarmData.ajax',
		type: 'GET',
		async: false,
		data : param,
		//dataType: 'json',
		error : function (req, status, err) {
			console.log("ajax ERROR!!");
		},
		success : function(data) {
			//console.log(data);
			result = data;
		}
	});
	return result;
}




var _alarm_sample = {
	/* #notice_area */	
	no_alarm : function() {
		var sample = '<div class="cont-none">'
			+ '<strong>No notification.</strong>'
			+ '<a href="" class="view-post-btn">Viewing the last post</a>'
			+ '</div>';
		return sample;
	},
	/* #notice_area */	
	has_alarm: function() {
		var sample = '<div id="has_alarm" class="t-side-popup-scroll">'
			+ '</div>'
			+ '<a id="deleteAll" href="#none" class="all-clear-btn">Delete All</a>'; 
		return sample;
	},
	alarm_part : function(i) {
		
		var title, id, css;
		
		switch(i) {
			case 1:
				title = 'Sensor Error', id = '_sensor', css = 'notice-lst1';
				break;
			case 2:
				title = 'SCADA Error', id = '_scada', css = 'notice-lst2';
				break;
			case 3:
				title = 'Notice', id = '_notice', css = 'notice-lst3';
				break;
		}
		var sample = '<strong class="heading1">' + title + '</strong>'
			+ '<ul id="' + id + '" class="notice-lst ' + css + '">'
			+ '</ul>'
		
		return sample; 
	},
	alarm: function(p) {
		
		var cls = p.id.includes('notice') ? 'version user' : 'version';
		
		var cursor = p.id.includes('sensor') ? 'cursor:default !important;' : '';
		
		var sample = ''
			+ '<li id="' + p.id + '">'
			+ '		<a href="javascript:void(0);" class="cont-wrap" id="go_' + p.id + '" style="' + cursor + '">'
			+ '		<strong class="heading2">' + p.title + '</strong>'
			+ '		<span id="notice1" class="cont">' + p.content + '</span>'
			+ '		<span class="cont-info"> '
			+ '			<span class="' + cls + '">' + p.version + '</span>'
			+ '				<span class="day-time">'
//			+ '					<em>' + p.date + '</em>'
//			+ '					<em>' + p.time + '</em>'
			+ '					<em>' + p.date + 'T' + p.time +'</em>'
			+ '				</span>'
			+ '			</span>'
			+ '		</a>'
			+ '		<a href="javascript:void(0);" class="close" id="close_' + p.ids + '">'
			+ '			<span class="sr-only">닫기</span>'
			+ '			<i class="xi-close"></i>'
			+ '		</a>'
			+ '</li>';
		return sample;
	},
	sensor: function(p) {
		var title = p.KEYWORD.split('-')[0] + '  ' + p.SENSOR_NM;
		var content = ''
			+ '<span>' + p.ERR_VALUE + ' (max: ' + p.MAX_VALUE + ' / min:' + p.MIN_VALUE + ')</span>'
			+ '<p>count: ' + p.ERR_POINT_CNT + '</p>';
		var version = p.GERATOR_NM;
		var date = p.DATE;
		var time = p.START + ' ~ ' + p.END;
		var id = 'sensor_' + p.CHECK_ID;
		
		var info = {
			farm_info: p.FARM_ID + ':' + p.FARM_NM,
			group_info: p.GROUP_ID + ':' + p.GROUP_NM,
			turbine_info: p.GERATOR_ID + ':' + p.GERATOR_NM,
			sensor_id: p.SENSOR_ID,
			from_dt: moment.tz(p.DATE + ' ' + p.START, _timezone).tz('UTC').format('YYYY-MM-DD HH:mm:ss'),
			to_dt: moment.tz(p.DATE + ' ' + p.END, _timezone).tz('UTC').format('YYYY-MM-DD HH:mm:ss')
		};
		return {id:id, title:title, content:content, version:version, date:date, time:time, info:info, state: p.STATE};
	},
	scada: function(p) {
		var title = p.ALARM_CODE + '  ' + p.ALARM_TXT;
		var content = p.DESCRPT.length > 130 ? '<em class="substring">' + p.DESCRPT.substring(0, 130) + '</em>' : p.DESCRPT;
		var version = p.GERATOR_NM;
		var date = p.DATETIME.split(' ')[0];
		var time = p.DATETIME.split(' ')[1];
		var id = 'scada_' + p.EVENT_ID;
		
		var info = {
			event_id: p.EVENT_ID,
			turbine_nm: p.GERATOR_NM,
			status: p.STATUS,
		};
		return {id:id, title:title, content:content, version:version, date:date, time:time, info:info, state: p.STATE};
	},
	notice: function(p) {
		var title = p.NOTICE_TIT;
		var content = p.NOTICE_CONT.length > 130 ? '<em class="substring">' + p.NOTICE_CONT.substring(0, 130) + '</em>' : p.NOTICE_CONT;
		var version = p.USER_NM;				//USER_ID
		var date = p.DATETIME.split(' ')[0]
		var time = p.DATETIME.split(' ')[1]
		var id = 'notice_' + p.NOTICE_ID;
		
		var info = {
			notice_id: p.NOTICE_ID,
		};
		
		return {id:id, title:title, content:content, version:version, date:date, time:time, info:info, state: p.STATE};
	},
}


/* 사용자 계정 생성 및 비밀번호 변경 후 최초 로그인 시 비밀번호 변경 팝업창 */
if(_CLIENT.IS_FIRST_LOGIN) changePassword();
function changePassword() {
	var sample = '' 
		+ '<div id="layerPopup" class="layer-popup-pass active">' 
		+ '	<div class="layer-cont">'
		+ ' 	<div class="tit-wrap">'
		+ ' 		<strong class="heading6">Password Change</strong>'
		+ '		</div>'
		
		+ '		<div class="pass-wrap">'
		+ '			<label for="old-pass">Old Password<span class="essential">*</span></label>'
		+ ' 		<input type="password" id="old-pass" validation-check="required">'
		+ ' 	</div>'
		
		+ '		<div class="pass-wrap">'
		+ '			<label for="new-pass">New Password<span class="essential">*</span></label>'
		+ ' 		<input type="password" id="new-pass" validation-check="required,password" maxlength="20">'
		+ '			<span id="placeholder-pass" class="alarm"></span>'
		+ ' 	</div>'
		
		+ '		<div class="pass-wrap">'
		+ '			<label for="confirm-pass">Confirm Password<span class="essential">*</span></label>'
		+ ' 		<input type="password" id="confirm-pass" validation-check="required" maxlength="20">'
		+ ' 	</div>'
		
		+ ' 	<div class="btns txt-center">'
		+ ' 		<a id="next-btn" href="javascript:void(0);" class="btn-style pass-next">Changes next time</a>'
		+ ' 		<a id="now-btn" href="javascript:void(0);" class="btn-style btn-style4 pass-now">Changes now</a>'
		+ ' 	</div>'
		
		+ ' 	<a id="close-btn" href="javascript:void(0);" class="layer-close">'
		+ ' 		<span class="sr-only">close layer popup</span>'
		+ ' 		<i class="xi-close" title="Close popup"></i>'
		+ ' 	</a>'
		+ '	</div>'
		+ '</div>';
	/* 닫기 버튼 클릭 시 */
	sample = $(sample).find('a#close-btn').click(function() {
		$(this).parents('#layerPopup').removeClass('active');
	}).parents('#layerPopup');
	
	/* 다음에 변경하기 버튼 클릭 시 */
	sample = $(sample).find('a#next-btn').click(function() {
		var _popup = $(this);
		/* 비밀번호 변경 */
		$.ajaxSettings.traditional = true;
		$.ajax({
			url : ctx + '/common/auth/changePassword',
			type : 'get',
			async : false,	//동기화
			data : { PW_CHANGE_PROCESS: 'NEXT'},
			error : function (req, status, err){
				// alert("ajax ERROR!!");
			},
			success : function(data){
				_popup.parents('#layerPopup').removeClass('active');
			}
		});
	}).parents('#layerPopup');
	
	/* 지금 변경하기 클릭 시 */
	sample = $(sample).find('a#now-btn').click(function() {
		
		/* 유효성 체크 */
		var check = $('[validation-check]').vcCheck();
		
		if(!check) return;
		
		/* 기존PW와 변경PW가 같을 경우, */
		if($('input#old-pass').val() === $('input#new-pass').val()) {
			$('input#new-pass').vcWarning('Please enter a different password from the previous one.');
			check = false;
		}
		/* 변경PW와 변경재확인PW가 다를 경우, */
		else if($('input#new-pass').val() != $('input#confirm-pass').val()) {
			$('input#confirm-pass').vcWarning(_MESSAGE.sys.twoPassWordCheckFail);
			check = false;
		} 
		else {
			$('input#confirm-pass').vcSuccess(_MESSAGE.sys.twoPassWordCheckSuccess);
		}
		/* 위 유효성검사 통과 못할 경우, */
		if(!check) return;
		
		/* 비밀번호 변경 */
		$.ajaxSettings.traditional = true;
		$.ajax({
			url : ctx + '/common/auth/changePassword',
			type : 'get',
			async : false,	//동기화
			data : { PW_CHANGE_PROCESS: 'NOW', oldPw: $('#old-pass').val(), newPw: $('#new-pass').val(), confirmPw: $('#confirm-path').val() },
			error : function (req, status, err){
				// alert("ajax ERROR!!");
			},
			success : function(data){
				/* 변경 성공 */
				if(data.RESULT) {
					alert('Change succeeded.\nPlease log-in again.');
					location.href = ctx + '/common/auth/logout';
				} 
				/* 변경 실패 */
				else if(!data.RESULT){
					$('#old-pass').vcWarning('This password is wrong.');
				}
			}
		});
	}).parents('#layerPopup');
	
	$('body').append(sample);
	$('#layerPopup input[id*=-pass]').attr('placeholder', '8~20 characters, at least 1 letter and 1 number and 1 special symbol.');
	$('#layerPopup span#placeholder-pass').text('8~20 characters, at least 1 letter and 1 number and 1 special symbol.');
	
//	$('#layerPopup input[id*=-pass]').attr('placeholder', '8~16 characters, at least 1 letter and 1 number!');
//	$('#layerPopup span#placeholder-pass').text('8~16 characters, at least 1 letter and 1 number!');
};




