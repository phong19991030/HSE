<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<!DOCTYPE html> 
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">  
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Content-Script-Type" content="text/javascript" />
<meta http-equiv="Content-Style-Type" content="text/css" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1" />

<link rel="shortcut icon" href="${ctxPath}/images/common/favicon/wind_energy.ico" type="image/x-icon" />
<link rel="icon" href="${ctxPath}/images/common/favicon/wind_energy.ico" type="image/x-icon" />

<title>Wind Turbine Platform</title>

<script type="text/javascript"> 
var CTX = "<%=request.getContextPath()%>"; 
var CID = "${cid}"; 
var WT_LOCALE = '${sessionScope["org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE"]}';
if (!WT_LOCALE) {
	WT_LOCALE = 'ko';
}

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

</script>

<script  type="text/javascript"> 
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
	var grant =${not empty grantjson ? grantjson:'""'};
</script>

<%------------------------ stylesheet ------------------------%>  

<%-- <link href="${ctxPath}/stylesheet/layout_common.css" rel="stylesheet" type="text/css"> --%>
<%-- <link href="${ctxPath}/stylesheet/pro_custom.css" rel="stylesheet" type="text/css">  --%>
 

<%-- 공통 css  --%>
<link media="screen" href="${ctxPath}/stylesheet/${design}/common.css" rel="stylesheet" type="text/css" />


<link href="${ctxPath}/stylesheet/${design}/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />

<%-- KendoUI --%>
<%-- Common Kendo UI CSS for web and dataviz widgets --%>
<link href="${ctxPath}/stylesheet/kendo/styles/kendo.common.css" rel="stylesheet"  type="text/css"/>
<%-- (optional) Kendo UI web widgets' RTL CSS, include only in right-to-left applications --%>
<link href="${ctxPath}/stylesheet/kendo/styles/kendo.rtl.min.css" rel="stylesheet" type="text/css" />
<%-- Default Kendo UI theme CSS for web and dataviz widgets --%>
<link href="${ctxPath}/stylesheet/kendo/styles/kendo.default.min.css" rel="stylesheet" />


<%-- css 그룹  --%>
<link media="screen" href="${ctxPath}/stylesheet/${design}/global.css" rel="stylesheet" type="text/css" />
<link media="screen" href="${ctxPath}/stylesheet/${design}/layout.css" rel="stylesheet" type="text/css" />
<link media="screen" href="${ctxPath}/stylesheet/${design}/button.css" rel="stylesheet" type="text/css" />
<link media="screen" href="${ctxPath}/stylesheet/${design}/function.css" rel="stylesheet" type="text/css" />
<link media="screen" href="${ctxPath}/stylesheet/${design}/sub.contents.css" rel="stylesheet" type="text/css" /> 
<link media="screen" href="${ctxPath}/stylesheet/${design}/jquery-ui-1.9.2.custom.css" rel="stylesheet" type="text/css" /> 
<link media="screen" href="${ctxPath}/stylesheet/${design}/perfect-scrollbar.css" rel="stylesheet" type="text/css" /> 
<link media="screen" href="${ctxPath}/stylesheet/${design}/jquery-ui-timepicker-addon.css" rel="stylesheet" type="text/css"/> 


<link media="screen" href="${ctxPath}/stylesheet/${design}/commonform.css" rel="stylesheet" type="text/css" />

<link media="screen" href="${ctxPath}/stylesheet/${design}/fork.css" rel="stylesheet" type="text/css" />

<%-- Calender  --%>
<%-- <link href="${ctxPath}/script/jquery/fullcalendar/fullcalendar.css" rel="stylesheet" > --%>
<%-- <link href="${ctxPath}/script/jquery/fullcalendar/fullcalendar.print.css" rel="stylesheet" media="print" > --%>

<!-- fullCalendar v3.9.0 -->
<link media="screen" href="${ctxPath}/stylesheet/fullcalendar/fullcalendar.css" rel="stylesheet" /> 
<%-- <link media="screen" href="${ctxPath}/stylesheet/fullcalendar/fullcalendar.print.css" rel="stylesheet" />  --%>

<%-- validate --%>
<link media="screen" href="${ctxPath}/stylesheet/common/validateEngine/validationEngine.jquery.css" rel="stylesheet" type="text/css" > 

<link media="screen" href="${ctxPath}/stylesheet/stnd/sub/<tiles:getAsString name="includeCSS" />.css" rel="stylesheet">
<%------------------------ //stylesheet ------------------------%>  


<%------------------------ jquery ------------------------%>  
<!-- Original -->
<script type="text/javascript" src="${ctxPath}/script/jquery/jquery-1.8.3.min.js" ></script>
<!-- New Modifier : parkjk--> 
<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script> -->
<script type="text/javascript" src="${ctxPath}/script/jquery/jquery-ui-1.9.2.custom.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/jquery/perfect-scrollbar.jquery.min.js" ></script>
<%-- <script type="text/javascript" src="${ctxPath}/script/jquery/jquery.timepicker.js"></script> --%>
<script type="text/javascript" src="${ctxPath}/script/jquery/jquery.timepicker.min.js"></script>
<%-- <script type="text/javascript" src="${ctxPath}/script/jquery-hive-master/jquery.hive.js" ></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/jquery-hive-master/jquery.pollen.js" ></script> --%>
<script type="text/javascript" src="${ctxPath}/script/jquery/jquery.cookie.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/jquery/jquery.blockUI.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/jquery/jquery-ui-timepicker-addon.js"></script>

<%-- locale --%>   
<%-- <script type="text/javascript" src="${ctxPath}/script/jquery/datepicker.locale-ko.js" charset="utf-8" ></script> --%>

<%--  grid --%>
<script type="text/javascript" src="${ctxPath}/script/jqgrid/jquery.jqGrid.js" ></script>
 
<%-- Kendo UI combined JavaScript --%>
<script src="${ctxPath}/script/kendo/js/kendo.all.min.js"></script>
<script src="${ctxPath}/script/kendo/js/jszip.min.js"></script>
<script src="${ctxPath}/script/kendo/js/pako_deflate.min.js"></script>
<script src="${ctxPath}/script/kendo/js/cultures/kendo.culture.ko-KR.min.js"></script>
<%-- locale --%>
    
<%-- chart --%> 
<%-- <script type="text/javascript" src="${ctxPath}/script/chart/highcharts.js"></script>    --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/chart/highstock.js"></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/chart/exporting.js"></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/chart/chartDefault.js"></script> --%>

<%-- mask  --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/jquery/jquery.mask.js" defer></script> --%>

<%-- form  --%>
<script type="text/javascript" src="${ctxPath}/script/jquery/plugin/jquery.form.js" defer></script>

<%-- number --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/jquery/jquery.number.js"></script> --%>

<%--datepicker  --%>
<script type="text/javascript" src="${ctxPath}/script/jquery/datepicker.locale-ko.js"></script>

<%-- config  --%>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/config/style.js"></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/config/common.js" ></script>
  <link type='text/css' rel='stylesheet' href='${ctxPath}/stylesheet/app/jquery-ui-timepicker-addon.min.css' />
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/config/gridConfig.js" ></script>

<%-- 신규  creator가 control 보다 상위 개념 --%>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/form.extends.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/domCreator.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/gridControl.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/gridObjControl.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/domControl.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/util/jsonlite.js" ></script>
<%-- <script type="text/javascript" src="${ctxPath}/script/js/control/w.gridControl.js" ></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/js/control/a2m.com.js.form.extends.js" ></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/js/control/a2m.com.js.domCreator.js" ></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/js/control/a2m.com.js.gridControl.js" ></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/js/control/a2m.com.js.domControl.js" ></script> --%>

<%-- validation --%>
<script type="text/javascript" src="${ctxPath}/script/jquery/validation/jquery.validationEngine.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/jquery/validation/languages/jquery.validationEngine-kr.js" ></script>
<script type="text/javascript" src="${ctxPath}/script/jquery/validation/utils.js" ></script>

<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/form.validate.js" ></script>
<%-- <script type="text/javascript" src="${ctxPath}/script/js/control/a2m.com.js.form.validate.js" ></script> --%>

<%-- mask --%>
<script type="text/javascript" src="${ctxPath}/script/jquery/plugin/jquery.mask.js" ></script>
<%-- <script type="text/javascript" src="${ctxPath}/script/jquery/plugin/jquery.money.js" ></script> --%>
<script type="text/javascript" src="${ctxPath}/script/jquery/plugin/jquery.number.js" ></script>

<%-- style- jquery 보다 밑으로 --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/jquery/fullcalendar/fullcalendar.moment.min-2.3.1.js"></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/jquery/fullcalendar/fullcalendar.min-2.3.1.js"></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/jquery/fullcalendar/ko-2.3.1.js"></script> --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/jquery/fullcalendar/lang-all.js"></script> --%>
<!-- fullCalendar v3.9.0 -->
<script type="text/javascript" src="${ctxPath}/script/fullcalendar/lib/moment.min.js"></script>
<script type="text/javascript" src="${ctxPath}/script/fullcalendar/fullcalendar.min.js"></script>

<%-- utils --%>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/util/utils.js" ></script>
<%-- <script type="text/javascript" src="${ctxPath}/script/js/wschat_mng.js" ></script> --%>
<link href="${ctxPath}/stylesheet/wsc/chatbox.css" rel="stylesheet" type="text/css">
<link href="${ctxPath}/stylesheet/wsc/roombox.css" rel="stylesheet" type="text/css">
<link href="${ctxPath}/script/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<%-- <script type="text/javascript" src="${ctxPath}/script/js/wschat.js"></script> --%>
<script type="text/javascript" src="${ctxPath}/script/js/notify.js"></script>
<script type="text/javascript" src="${ctxPath}/script/js/rsa.js"></script>

<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/security/jsbn.js"></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/security/prng4.js"></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/security/rng.js"></script>

<script type="text/javascript" src="${ctxPath}/script/js/MooTools-Core-1.6.0.js"></script>
<script type="text/javascript" src="${ctxPath}/script/js/WebSocketFileTransfer.js"></script>
<script type="text/javascript" src="${ctxPath}/script/js/chatutil.js"></script>
<script type="text/javascript" src="${ctxPath}/script/js/image-picker.min.js"></script>
<script type="text/javascript" src="${ctxPath}/script/js/lightslider.js"></script>

<script type="text/javascript" src="${ctxPath}/script/js/jquery.contextMenu.js"></script>
<script type="text/javascript" src="${ctxPath}/script/js/jquery.ui.position.js"></script>
<script type="text/javascript" src="${ctxPath}/script/js/fm.validator.jquery.js"></script>

<script type="text/javascript" src="${ctxPath}/script/js/encryption.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jsencrypt/2.3.1/jsencrypt.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jsencrypt/2.3.1/jsencrypt.js"></script>


<script type="text/javascript" src="${ctxPath}/script/js/libimports.js" ></script>

<!-- upload files -->
<link rel="stylesheet" type="text/css" href="${ctxPath}/stylesheet/stnd/A2mUpload.css">
<link id="contextPathHolder" data-contextPath="${ctxPath}"/>
<script type="text/javascript" src="${ctxPath}/script/js/message-de.js"></script>
<script type="text/javascript" src="${ctxPath}/script/js/message-en.js"></script>
<script type="text/javascript" src="${ctxPath}/script/js/message-jp.js"></script>
<script type="text/javascript" src="${ctxPath}/script/js/message-kr.js"></script>
<script type="text/javascript" src="${ctxPath}/script/js/A2mUpload.js"></script>
<script type="text/javascript" src="${ctxPath}/script/js/uploadConfig.js"></script>
<script type="text/javascript" src="${ctxPath}/script/js/designConfig.js"></script>
<script type="text/javascript" src="${ctxPath}/script/js/attachfile.js"></script>

<script type="text/javascript" src="${ctxPath}/script/js/elapsedTime.js"></script>
<script type="text/javascript" src="${ctxPath}/script/js/commonUtil.js"></script>
<script type="text/javascript" src="${ctxPath}/script/js/commonAjaxUtil.js"></script>


<!-- html5 IE(8~) -->
<!--[if lt IE 9]>
	<script type="text/javascript" src="${ctxPath}/script/js/html5shiv.js"></script>
	<script type="text/javascript" src="${ctxPath}/script/js/respond.min.js"></script>
<![endif]-->

<%------------------------ //jquery ------------------------%>  

<!-- fancybox -->
<script type="text/javascript" src="${ctxPath}/script/fancybox/jquery.fancybox.pack.js"></script>
<link rel="stylesheet" type="text/css" href="${ctxPath}/script/fancybox/jquery.fancybox.css" media="screen" />
<script type="text/javascript" src="${ctxPath}/script/fancybox/helpers/jquery.fancybox-buttons.js"></script>
<link rel="stylesheet" type="text/css" href="${ctxPath}/script/fancybox/helpers/jquery.fancybox-buttons.css" media="screen" />

<script type="text/javascript" src="${ctxPath}/js/files-upload.js"></script>
<script type="text/javascript" src="${ctxPath}/script/crypto-js/sha1.js"></script>
<script type="text/javascript" src="${ctxPath}/script/crypto-js/sha1-min.js"></script>
<script type="text/javascript" src="${ctxPath}/script/crypto-js/lib-typedarrays-min.js"></script>

<script type="text/javascript">
var jsCtxPath = '';
var jsUrlWs = '';
var host =  'wschat.a2m.co.kr';
var wschatCtx = '';


	
	var code =  ${not empty code.json ? code.json :'""'};
	$(document).ready(function(){
	//	$('li.help').hover(function(){
		//	$('#loading').css('display','block')
	//	},function(){
	//		$('#loading').css('display','none')
	//	})	
//	})
	var loadingBarShow = function(){ 
		$('#loading').show()
	}
	var loadingBarHide = function(){
		$('#loading').hide() 
	}
	
// 	var jsCtxPath = '';
// 	jsCtxPath = $('#ctxPath').attr('ctxpath-attr');
// 	var jsUrlWs = 'ws://localhost:8080/wschat/echo-ws';  
// 	console.log(jsCtxPath);
//     wschat.init(jsUrlWs);

	
});


</script>




</head>  
<body id="bodyContents" class="bodyContents">
<div id="ctxPath" ctxpath-attr="${ctxPath}" class="hide"></div>
	<!-- accessibility -->
	<ul id="accessibility">
		<li><a href="#header">메인메뉴 바로가기</a></li>
		<li><a href="#container">본문 바로가기</a></li>
	</ul>
	<!-- //accessibility -->
	
	<!-- wrap -->
	<article id="wrap"> 
		<tiles:insertAttribute name="HTML.BODY" />
	</article>
	<!-- //wrap -->
	 
 	<!-- loading -->
	<div id="loading">
		<div class="loadingbar"> 
			<!-- 저작권표시 -->
<!-- 			<a href="https://commons.wikimedia.org/wiki/File%3ALoading_icon.gif" target="_blank" title="새창열림"> -->
<!-- 				<span class="blind">By Ahm masum (자작) [CC BY-SA 4.0 (http://creativecommons.org/licenses/by-sa/4.0)], via Wikimedia Commons</span> -->
				<img alt="로딩중" src="${imgPath}/common/loading.gif"/> 
<!-- 			</a> -->
		</div>  
	</div>
	<!-- //loading -->
	
	<script type="text/javascript">
		/* scrollbar */
		$(document).ready(function(){
			$("#sidemenu").perfectScrollbar();
			
			/* show/hide footer */
			  $( ".footer_content" ).show();
			  $( ".footer_content" ).mouseover(function() {
				  $( ".footer_content" ).hide();
				});
			  setTimeout(function(){$( ".footer_content" ).fadeOut(); }, 3000);
			  
			$('.outer_tabview .tab_content').scroll(function() {
				 clearTimeout($.data(this, 'scrollTimer'));
				  $( ".footer_content" ).show();
				  
				  $.data(this, 'scrollTimer', setTimeout(function() {
				        // do something
					  $( ".footer_content" ).fadeOut();
				    }, 3000));
			});
			
			
			$('#cont').scroll(function() {
				 clearTimeout($.data(this, 'scrollTimer'));

				  $( ".footer_content" ).show();
				  $.data(this, 'scrollTimer', setTimeout(function() {
				        // do something
					  $( ".footer_content" ).fadeOut();
				    }, 3000));

			});
			
			/* show/hide footer */
			
			$('span.btn_go_top').click(function(){
				$('#cont').animate({
			        scrollTop: 0 //#DIV_ID is an example. Use the id of your destination on the page
			    }, 200);
				$('.outer_tabview .tab_content').animate({
			        scrollTop: 0 //#DIV_ID is an example. Use the id of your destination on the page
			    }, 200);
			});
			
// 			var init = '${SESS_USER.PASS_INIT}';
			var init = '${SESS_USER.IS_FIRST_LOGIN}';
			if(init == '1')
			{
				var url = CTX + '/common/auth/passInit.dialog';
		        $targetDialog = generateDialogDom();
		        
		        $.ajax({
		            url : url,
		            data : {
		                'type' : 'dialog',
		                'cls' : ''
		            },
		            cache : false,
		            success : function (data, textStatus, jqXHR) {
		                $targetDialog.html(data).promise().done(function () {
		                    console.log('${ctxPath}');
		                });

		            }
		        });

		        $targetDialog.dialog({
		            resizable : false,
		            width : 1000,
		            height : 550,
		            modal : true,
		            open : function () {
		                $(".ui-dialog").css("box-shadow", "#999 5px 5px 5px");
		            },
		            close : function () {
		            	alert("로그아웃 합니다.");
		            	document.location.href="${ctxPath}/common/auth/logout";
		                destroyDialogPopup($targetDialog);
		            }
		        });
			}
			
			window.addEventListener('load', function() {
				/* $('#a2m-mail').addClass('a2mSendMailBtn');
				
				$('#a2m-mail').append('<span style="position: absolute; width: 25px; height: 25px; background: red; color: #FFF; border-radius: 50%; text-align: center;" top: -4px; left: -2px;><b id="a2mMailCount"></b></span>');
				 */
				$(document).on('click', '#a2mMailCount', function(e) {
					e.stopPropagation();
					e.preventDefault();
					 window.location = CTX + '/asm/asm_0106/list?';
					return false;
				});
				
				$(document).on('click', '.a2mSendMailBtn', function(e) {
					e.stopPropagation();
					e.preventDefault();
					
					var $mailContainer = $(document).find("#mailContainer");
					if ($mailContainer && $mailContainer.size() > 0)
						return false;
					
					var _url = CTX + '/common/mail/openMailDialog.dialog';
					
					openDialog(_url, {}, {
						width: 960,
						height: 700
					});
				});
				
				//count new emails
				
// 				initCountMails();
				//schedule count new emails
// 				var intervalId = setInterval(initCountMails, 120000);
				
				// set datepicker format
				$.datepicker.setDefaults({
					dateFormat: 'yy/mm/dd'
				});
				
				// fix problems with sub_tab UI
				$('ul#sub_tab').each(function(index, o) {
					$(o).css('height', 'auto').after('<div style="clear: both;"></div>');
				});
			});
			
		});
	</script>
</body>

<footer>
		<tiles:insertAttribute name="footer" />

</footer>


</html>