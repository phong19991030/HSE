<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<% request.setCharacterEncoding("UTF-8"); %>

<!DOCTYPE html> 
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">  
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Content-Script-Type" content="text/javascript" />
<meta http-equiv="Content-Style-Type" content="text/css" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1" />

<link rel="shortcut icon" href="${ctxPath}/img_new/common/favicon.png" type="image/x-icon" />
<link rel="icon" href="${ctxPath}/img_new/common/favicon.png" type="image/x-icon" /> 

<title>HSE</title>

<script type="text/javascript"> 
var CTX = "<%=request.getContextPath()%>"; 
var CID = "${cid}"; 
var WT_LOCALE = '${sessionScope["org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE"]}' || 'ko';


/*
 *	@JK
 *  # client 정보 [ BaseController.getClient ]
 *	- CLIENT_ACCESS_TIMEZONE	: client 접속 지역 timezone
 *	- CLIENT_CITY				: client 접속 지역	 city
 *	- CLIENT_IP					: client 접속 ip
 *	- CLIENT_REGION				: client 접속 지역
 *	- CLIENT_ACCESS_TIME		: 접속 시간
 *  - USER_ID, USER_UID			: 사용자 ID, UID
 */
var _CLIENT = ${not empty client ? client :'""'};
var _TIMEZONE = _CLIENT.CLIENT_ACCESS_TIMEZONE;


/* @JK - 현재 메뉴 관련 사용자 권한 */
var _MENU_GRANT = ${not empty grantjson ? grantjson : '""'};
console.log(_MENU_GRANT);

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function showWindowPopup(url, width, height, closeCallback, name) {
	if (!width) width = (parseInt(window.innerWidth) * 0.7);
	if (!height) height = (parseInt(window.innerHeight) * 0.7);
	var left = (screen.width - width) / 2;
	var top = (screen.height - height) / 4;
	
	var w = window.open(url, name ? name : '_blank', 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left);
	w.addEventListener('resize', function(){
		w.resizeTo(width, height);
    });
	if (closeCallback && typeof(closeCallback) == 'function') {
		w.onbeforeunload = function() {
			closeCallback.call(null);
		}
	}
	return w;
}

var agt = navigator.userAgent.toLowerCase();
var browserChk = true;
if(agt.indexOf("chrome") != -1){
}else if(agt.indexOf("msie") != -1){
	 if(agt.indexOf("msie 9.0") != -1){
		 browserChk = false
//		 alert('ie 9으로 접속하셨습니다. HTML5 지원이 되지 않는 브라우저 입니다. ');
//		 console.log('ie 9.0')
	 }else if(agt.indexOf("msie 8.0") != -1){
		 browserChk = false
//		 console.log('ie 8.0')
		 alert('ie 8으로 접속하셨습니다. 정상적으로 동작하지 않을 수 있습니다. ');
	 }else if(agt.indexOf("msie 7.0") != -1){
		 browserChk = false
		 alert('ie 7으로 접속하셨습니다. 이 브라우저는 지원하지 않습니다. ');
//		 console.log('ie 7.0')
	 }
}
</script>

<!-- Original -->


<!-- @JK 추가 - message (메세지) --> 
<script type="text/javascript" src="${ctxPath}/script/common/message.js"></script>

<!-- 20220117 doanhq-->
	<!-- css -->
  <link href="${ctxPath}/stylesheet/common_new/common.css" rel="stylesheet" type="text/css" media="all">
  <link href="${ctxPath}/stylesheet/common_new/layout.css" rel="stylesheet" type="text/css" media="all">
  <link href="${ctxPath}/stylesheet/common_new/ui.css" rel="stylesheet" type="text/css" media="all">
  <link href="${ctxPath}/stylesheet/common_new/reset.css" rel="stylesheet" type="text/css" media="all">
  <%-- <link href="${ctxPath}/stylesheet/common_new/sub.css" rel="stylesheet" type="text/css" media="all"> --%>
  <link href="${ctxPath}/stylesheet/common_new/main.css" rel="stylesheet" type="text/css" media="all">
  
  <!-- lib -->
  <link href="${ctxPath}/stylesheet/common_new/lib/jquery-ui.min.css" rel="stylesheet" type="text/css" media="all">
  <link href="${ctxPath}/stylesheet/common_new/lib/jquery-ui.theme.css" rel="stylesheet" type="text/css" media="all">
  <link href="${ctxPath}/stylesheet/common_new/lib/jquery-ui-timepicker.css" rel="stylesheet" type="text/css" media="all">
  
  <!-- js -->
  <script type="text/javascript" src="${ctxPath}/script_new/lib/jquery-3.6.0.min.js" ></script>
  <script type="text/javascript" src="${ctxPath}/script_new/lib/jquery-ui.min.js" ></script>
  <script type="text/javascript" src="${ctxPath}/script_new/lib/date-search-setting.js" ></script>
  <script type="text/javascript" src="${ctxPath}/script_new/lib/jquery-timepicker.js" ></script>
  
  <script type="text/javascript" src="${ctxPath}/script_new/common/layout.js" ></script>
  <script type="text/javascript" src="${ctxPath}/script_new/common/common.js" ></script>
  <script type="text/javascript" src="${ctxPath}/script_new/common/layerPopup.js" ></script>
  <script type="text/javascript" src="${ctxPath}/script_new/common/main.js" ></script> 
 <%--  <script type="text/javascript" src="${ctxPath}/script_new/common/sub.js" ></script> --%>
  
  <script type="text/javascript" src="${ctxPath}/script/common/validation-check.js" ></script>
  
  
<!-- 20220117 doanhq end-->

<link href="${ctxPath}/stylesheet/common/jquery.mCustomScrollbar.min.css" rel="stylesheet" type="text/css" media="all">

<script type="text/javascript" src="${ctxPath}/script/lib/jquery.mCustinScrollbar.concat.min.js"></script>

<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/form.validate.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/domCreator.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/domControl.js" ></script>


<script type="text/javascript">
var jsCtxPath = '';
var jsUrlWs = '';
var host =  'wschat.a2m.co.kr';
var wschatCtx = '';

var code =  ${not empty code.json ? code.json :'""'};
/* var menu = ${menu}; */

var grant =${not empty grantjson ? grantjson:'""'};

$(document).ready(function(){
	//	$('li.help').hover(function(){
		//	$('#loading').css('display','block')
	//	},function(){
	//		$('#loading').css('display','none')
	//	})	
//	})
// 	var loadingBarShow = function(){ 
// 		$('#loading').show()
// 	}
// 	var loadingBarHide = function(){
// 		$('#loading').hide() 
// 	}
	
// 	var jsCtxPath = '';
// 	jsCtxPath = $('#ctxPath').attr('ctxpath-attr');
// 	var jsUrlWs = 'ws://localhost:8080/wschat/echo-ws';  
// 	console.log(jsCtxPath);
//     wschat.init(jsUrlWs);

	
});


</script>




</head>
<body id="bodyContents" class="bodyContents ${( navimenu.SUBMENU.MENU_ID eq null || navimenu.SUBMENU.MENU_OUT_YN == 'Y' )?'gnb-none' :'gnb-active'}"  style="position: inherit">
<div id="ctxPath" ctxpath-attr="${ctxPath}" class="hide"></div>

	
	<!-- wrap -->
	<article id="wrap"> 
		<tiles:insertAttribute name="HTML.BODY" />
	</article>
	<!-- //wrap -->
	 
 	<!-- loading -->
<!-- 	<div id="loading"> -->
<!-- 		<div class="loadingbar">  -->
<%-- 				<img alt="로딩중" src="${imgPath}/common/loading.gif"/>  --%>
<!-- 		</div>   -->
<!-- 	</div> -->
	<!-- //loading -->

</body>

<footer>
<%-- 		<tiles:insertAttribute name="footer" /> --%>

</footer>


</html>