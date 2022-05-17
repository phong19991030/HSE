
/*
 * 초기화
 */
function oam0101() {
	/* plan list 데이터 조회 */
	var data = _oam.mariaDB.getData('/oam2/oam_0100/01/alarmInfo.ajax', {EVENT_ID: $('#EVENT_ID').val()});
	
	console.log(data);
	
	// 
	$('#POSITION').text(data.POSITION);
	$('#DATETIME').text(data.DATETIME);
	$('#ALARM_CODE').text(data.ALARM_CODE);
	$('#ALARM_TXT').text(data.ALARM_TXT);
	$('#DESCRPT').append('<p>' + data.DESCRPT.split('\n').join('</p><p>') + '</p>');
	
	$('#ACTIONS').append('<p>' + data.ACTIONS.split(',').join('</p><p>') + '</p>');
	$('#PARTS').append('<p>' + data.PARTS.split(',').join('</p><p>') + '</p>');
	$('#TOOLS').append('<p>' + data.TOOLS.split(',').join('</p><p>') + '</p>');
	$('#PPES').append('<p>' + data.PPES.split(',').join('</p><p>') + '</p>');
	
}

