// 쿠키 설정
var setCookie = function(name, value, exp, type) {
	var date = new Date();
	
	if(type) {
		if(type === 'hour') date.setTime(date.getTime() + exp * 60 * 60 * 1000);	
		if(type === 'min') date.setTime(date.getTime() + exp * 60 * 1000);
		if(type === 'sec') date.setTime(date.getTime() + exp * 1000);
	} else {
		date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
	}
	
	document.cookie = name + '=' + encodeURI(value) + ';expires=' + date.toUTCString() + ';path=/';
};

// 쿠키 값 가져오기
var getCookie = function(name) {
	var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return value? decodeURI(value[2]) : null;
};

// 쿠키 삭제
var deleteCookie = function(name) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/';
};

$(function() {
	// 선택한 메뉴 쿠키에 저장
	$('ul.depth2 > li').click(function() {
		var depth1_nm = $(this).parent().parent().children('a').children('span').text();
		var depth2_nm = $(this).children().children('span').text();
		
		setCookie('depth1', depth1_nm, 1);
		setCookie('depth2', depth2_nm, 1);
	});
});