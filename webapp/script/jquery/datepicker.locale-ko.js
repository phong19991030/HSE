/* Korean initialisation for the jQuery calendar extension. */
/* Written by DaeKwon Kang (ncrash.dk@gmail.com). */
jQuery(function($){
	$.datepicker.regional['ko'] = {
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		numberOfMonths:[1,1],
		showAnim:'fadeIn',
		monthNames: ['1월','2월','3월','4월','5월','6월',
		'7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월',
		'7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '년',
		yearRange:'c-100:c+10',
		showOn: "both",	
		buttonImageOnly: true,
		buttonImage: CTX+"/images/stnd/common/calender.png",
		buttonText:"달력보기",
		changeYear: true, changeMonth: true}; 
	$.datepicker.setDefaults($.datepicker.regional['ko']);
//	$.datepicker.parseDate( "yy-mm-dd", "20070126" );
//	$('.ui-datepicker-trigger').remove().parents('span').html('<span>aaaaaaaa</span>');
});