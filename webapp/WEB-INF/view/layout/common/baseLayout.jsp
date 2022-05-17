<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<!DOCTYPE html>
<html lang="ko">

<head>

<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta name="robots" content="index,follow">
<meta name="keywords" content="WT, Wind, Turbine, Platform">
<meta name="description" content="">
<meta name="copyright" content="Copyright 2020 © AtwoM. ALL Rights Reserved">

<link rel="shortcut icon" href="${ctxPath}/images/common/favicon/wind_energy.ico" type="image/x-icon" />
<link rel="icon" href="${ctxPath}/images/common/favicon/wind_energy.ico" type="image/x-icon" />

<title>Wind Turbine Platform</title>

<link id="contextPathHolder" data-contextPath="${ctxPath}" />

<%---------- 기존에 있던 CSS : 꼭 필요한 파일만 주석을 해제하여 사용할 것 ----------%>
<%-- <link rel="stylesheet" media="screen" href="${ctxPath}/stylesheet/${design}/common.css"> --%>

<%-- <link rel="stylesheet" href="${ctxPath}/stylesheet/${design}/font-awesome/css/font-awesome.min.css"> --%>
<%-- <link rel="stylesheet" href="${ctxPath}/script/font-awesome-4.7.0/css/font-awesome.min.css"> --%>

<%-- <link rel="stylesheet" media="screen" href="${ctxPath}/stylesheet/${design}/global.css"> --%>
<%-- <link rel="stylesheet" media="screen" href="${ctxPath}/stylesheet/${design}/layout.css"> --%>
<%-- <link rel="stylesheet" media="screen" href="${ctxPath}/stylesheet/${design}/button.css"> --%>
<%-- <link rel="stylesheet" media="screen" href="${ctxPath}/stylesheet/${design}/function.css"> --%>
<%-- <link rel="stylesheet" media="screen" href="${ctxPath}/stylesheet/${design}/sub.contents.css">  --%>
<%-- <link rel="stylesheet" media="screen" href="${ctxPath}/stylesheet/${design}/jquery-ui-1.9.2.custom.css">  --%>
<%-- <link rel="stylesheet" media="screen" href="${ctxPath}/stylesheet/${design}/perfect-scrollbar.css">  --%>
<%-- <link rel="stylesheet" media="screen" href="${ctxPath}/stylesheet/${design}/jquery-ui-timepicker-addon.css">  --%>

<%-- <link rel="stylesheet" media="screen" href="${ctxPath}/stylesheet/${design}/commonform.css"> --%>

<%-- <link rel="stylesheet" media="screen" href="${ctxPath}/stylesheet/${design}/fork.css"> --%>

<!-- <!-- fullCalendar v3.9.0 -->
<%-- <link rel="stylesheet" media="screen" href="${ctxPath}/stylesheet/fullcalendar/fullcalendar.css">  --%>

<%-- <%-- validate --%>
<%-- <link rel="stylesheet" media="screen" href="${ctxPath}/stylesheet/common/validateEngine/validationEngine.jquery.css"> --%>

<!-- fancybox -->
<link rel="stylesheet" media="screen" href="${ctxPath}/script/fancybox/jquery.fancybox.css">
<link rel="stylesheet" media="screen" href="${ctxPath}/script/fancybox/helpers/jquery.fancybox-buttons.css">
<%---------- // 기존에 있던 CSS ----------%>

<link rel="stylesheet" media="all" href="${ctxPath}/stylesheet/common/common.css">
<link rel="stylesheet" media="all" href="${ctxPath}/stylesheet/common/layout.css">
<link rel="stylesheet" media="all" href="${ctxPath}/stylesheet/common/jquery.mCustomScrollbar.min.css">
<link rel="stylesheet" media="all" href="${ctxPath}/stylesheet/common/sub.css">
<%-- <link rel="stylesheet" media="screen" href="${ctxPath}/stylesheet/stnd/sub/<tiles:getAsString name="includeCSS" />.css"> --%>

<%---------- KendoUI ----------%>
<%-- <link rel="stylesheet" media="all" href="${ctxPath}/stylesheet/kendo/styles/kendo.rtl.min.css"> --%>
<%-- <link rel="stylesheet" media="all" href="${ctxPath}/stylesheet/kendo/styles/kendo.common.css"> --%>
<%-- <link rel="stylesheet" media="all" href="${ctxPath}/stylesheet/kendo/styles/kendo.default.min.css"> --%>
<%-- <link rel="stylesheet" media="all" href="${ctxPath}/stylesheet/common/libraries-modify.css"> --%>


<%-- <script src="${ctxPath}/script/jquery/jquery-1.8.3.min.js"></script> --%>
<script src="${ctxPath}/script/lib/jquery-3.4.1.js"></script>
<script>
var CTX = '<%=request.getContextPath()%>'; 
var CID = '${cid}'; 
var WT_LOCALE = '${sessionScope["org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE"]}';
if (!WT_LOCALE) {
	WT_LOCALE = 'en';
}
</script>


<%---------- 기존에 있던 JS : 꼭 필요한 파일만 주석을 해제하여 사용할 것 ----------%>
<%-- <script src="${ctxPath}/script/jquery/jquery-ui-1.9.2.custom.js" ></script> --%>
<%-- <script src="${ctxPath}/script/jquery/perfect-scrollbar.jquery.min.js" ></script> --%>
<%-- <script src="${ctxPath}/script/jquery/jquery.timepicker.min.js"></script> --%>
<%-- <script src="${ctxPath}/script/jquery/jquery.cookie.js" ></script> --%>
<%-- <script src="${ctxPath}/script/jquery/jquery.blockUI.js" ></script> --%>
<%-- <script src="${ctxPath}/script/jquery/jquery-ui-timepicker-addon.js"></script> --%>

<%---------- grid ----------%>
<%-- <script src="${ctxPath}/script/jqgrid/jquery.jqGrid.js"></script> --%>

<%---------- KendoUI ----------%>
<script src="${ctxPath}/script/kendo/js/kendo.all.min.js"></script>
<%-- <script src="${ctxPath}/script/kendo/js/jszip.min.js"></script> --%>
<%-- <script src="${ctxPath}/script/kendo/js/pako_deflate.min.js"></script> --%>
<script src="${ctxPath}/script/kendo/js/cultures/kendo.culture.ko-KR.min.js"></script>

<%-- form  --%>
<%-- <script src="${ctxPath}/script/jquery/plugin/jquery.form.js" defer></script> --%>

<%--datepicker  --%>
<%-- <script src="${ctxPath}/script/jquery/datepicker.locale-ko.js"></script> --%>

<%---------- config ----------%>
<%-- <script src="${ctxPath}/script/a2mFWJs/config/style.js"></script> --%>
<%-- <script src="${ctxPath}/script/a2mFWJs/config/common.js"></script> --%>
<script src="${ctxPath}/script/a2mFWJs/config/gridConfig.js"></script>

<%-- 신규 creator가 control 보다 상위 개념 --%>
<%-- <script src="${ctxPath}/script/a2mFWJs/control/form.extends.js"></script> --%>
<%-- <script src="${ctxPath}/script/a2mFWJs/control/domCreator.js"></script> --%>
<script src="${ctxPath}/script/a2mFWJs/control/gridControl.js"></script>
<script src="${ctxPath}/script/a2mFWJs/control/gridObjControl.js"></script>
<%-- <script src="${ctxPath}/script/a2mFWJs/control/domControl.js"></script> --%>
<%-- <script src="${ctxPath}/script/a2mFWJs/util/jsonlite.js"></script> --%>

<%-- <%-- validation --%>
<script src="${ctxPath}/script/jquery/validation/jquery.validationEngine.js"></script>
<script src="${ctxPath}/script/jquery/validation/languages/jquery.validationEngine-kr.js"></script>
<%-- <script src="${ctxPath}/script/jquery/validation/utils.js"></script> --%>

<%-- <script src="${ctxPath}/script/a2mFWJs/control/form.validate.js"></script> --%>

<%-- <%-- mask --%>
<%-- <script src="${ctxPath}/script/jquery/plugin/jquery.mask.js"></script> --%>
<%-- <script src="${ctxPath}/script/jquery/plugin/jquery.number.js"></script> --%>

<!-- <!-- fullCalendar v3.9.0 -->
<%-- <script src="${ctxPath}/script/fullcalendar/lib/moment.min.js"></script> --%>
<%-- <script src="${ctxPath}/script/fullcalendar/fullcalendar.min.js"></script> --%>

<%-- utils --%>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/util/utils.js" ></script>
<%-- <script type="text/javascript" src="${ctxPath}/script/js/wschat_mng.js" ></script> --%>
<%-- <link href="${ctxPath}/stylesheet/wsc/chatbox.css" rel="stylesheet" type="text/css"> --%>
<%-- <link href="${ctxPath}/stylesheet/wsc/roombox.css" rel="stylesheet" type="text/css"> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/js/wschat.js"></script> --%>
<script type="text/javascript" src="${ctxPath}/script/js/notify.js"></script>
<script type="text/javascript" src="${ctxPath}/script/js/rsa.js"></script>

<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/security/jsbn.js"></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/security/prng4.js"></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/security/rng.js"></script>

<%-- <script type="text/javascript" src="${ctxPath}/script/js/MooTools-Core-1.6.0.js"></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/js/WebSocketFileTransfer.js"></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/js/chatutil.js"></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/js/image-picker.min.js"></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/js/lightslider.js"></script> --%>

<%-- <script type="text/javascript" src="${ctxPath}/script/js/jquery.contextMenu.js"></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/js/jquery.ui.position.js"></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/js/fm.validator.jquery.js"></script> --%>

<script type="text/javascript" src="${ctxPath}/script/js/encryption.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jsencrypt/2.3.1/jsencrypt.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jsencrypt/2.3.1/jsencrypt.js"></script>


<script type="text/javascript" src="${ctxPath}/script/js/libimports.js" ></script>

<!-- upload files -->
<link rel="stylesheet" href="${ctxPath}/stylesheet/stnd/A2mUpload.css">
<script src="${ctxPath}/script/js/message-de.js"></script>
<script src="${ctxPath}/script/js/message-en.js"></script>
<script src="${ctxPath}/script/js/message-jp.js"></script>
<script src="${ctxPath}/script/js/message-kr.js"></script>
<script src="${ctxPath}/script/js/A2mUpload.js"></script>
<script src="${ctxPath}/script/js/uploadConfig.js"></script>
<script src="${ctxPath}/script/js/designConfig.js"></script>
<script src="${ctxPath}/script/js/attachfile.js"></script>

<script src="${ctxPath}/script/js/elapsedTime.js"></script>
<script src="${ctxPath}/script/js/commonUtil.js"></script>
<script src="${ctxPath}/script/js/commonAjaxUtil.js"></script>

<!-- fancybox -->
<%-- <script src="${ctxPath}/script/fancybox/jquery.fancybox.pack.js"></script> --%>
<%-- <script src="${ctxPath}/script/fancybox/helpers/jquery.fancybox-buttons.js"></script> --%>

<script src="${ctxPath}/js/files-upload.js"></script>
<script src="${ctxPath}/script/crypto-js/sha1.js"></script>
<script src="${ctxPath}/script/crypto-js/sha1-min.js"></script>
<script src="${ctxPath}/script/crypto-js/lib-typedarrays-min.js"></script>
<%---------- // 기존에 있던 JS ----------%>


<script src="${ctxPath}/script/lib/jquery.mCustinScrollbar.concat.min.js"></script>
<script src="${ctxPath}/script/lib/easypiechart.js"></script>
<script src="${ctxPath}/script/common/common.js"></script>
<script src="${ctxPath}/script/common/layout.js"></script>
<script src="${ctxPath}/script/common/sub.js"></script>
<script src="${ctxPath}/script/common/cookie.js"></script>

<script> 
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
		};
	}
	
	return w;
}
</script>

<!--[if lt IE 9]>
	<script src="${ctxPath}/script/js/html5shiv.js"></script>
	<script src="${ctxPath}/script/js/respond.min.js"></script>
<![endif]-->

</head>

<body class="gnb-active">

<div id="wrap">
	<tiles:insertAttribute name="HTML.BODY" />
</div>

</body>

</html>
