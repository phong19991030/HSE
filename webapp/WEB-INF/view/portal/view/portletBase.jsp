<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/portletBase.css"/>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/stylesheet/stnd/common.css"/>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/stylesheet/stnd/jquery-ui-1.9.2.custom.css"/>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/stylesheet/fullcalendar/fullcalendar.css"/>
	
	<!-- JS -->
	<script type="text/javascript" src="${pageContext.request.contextPath }/script/jquery/jquery-1.8.3.min.js" ></script>
	<script type="text/javascript" src="${pageContext.request.contextPath }/script/jquery/jquery-ui-1.9.2.custom.js" ></script>
	<script type="text/javascript" src="${pageContext.request.contextPath }/script/jquery/perfect-scrollbar.jquery.min.js" ></script>
	<script type="text/javascript" src="${pageContext.request.contextPath }/script/fullcalendar/lib/moment.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath }/script/fullcalendar/fullcalendar.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath }/script/a2mFWJs/control/domControl.js" ></script>
</head>
<body>
	<script type="text/javascript">
		"use strict";
		var CTX = '${pageContext.request.contextPath }';
		var agt = navigator.userAgent.toLowerCase();
		var browserChk = true;
		if(agt.indexOf("chrome") != -1) {
			
		} else if (agt.indexOf("msie") != -1){
			 if(agt.indexOf("msie 9.0") != -1){
				 browserChk = false
			 }else if(agt.indexOf("msie 8.0") != -1){
				 browserChk = false
				 alert('ie 8으로 접속하셨습니다. 정상적으로 동작하지 않을 수 있습니다. ');
			 }else if(agt.indexOf("msie 7.0") != -1){
				 browserChk = false
				 alert('ie 7으로 접속하셨습니다. 이 브라우저는 지원하지 않습니다. ');
			 }
		}
		
		function parentRedirect(location) {
			parent.window.location.href = location;
		}
		
		function _generateDialogDom(){
			var cid = $('body', window.parent.document).find('.a2m_dialog').length;
			$('body', window.parent.document).append('<div id="a2m_dialog'+cid+'" class="a2m_dialog"></div>');
			
			return cid;
		}

		function _destroyDialogDom(cid) {
			var $dialog = $('body', window.parent.document).find('#a2m_dialog' + cid);
			if ($dialog) {
				$dialog.remove();
			}
		}
		
		function onSelect(target, url, obj) {
		    var id = target;
		    
		    var idxArr = url.split('/');
		    var w = 0;
		    var h = 0;
		    
		    if (idxArr[1] == 'comm') {
		    	w = 1000;
		    	h = 550;
		    } else if (idxArr[1] == 'vac') {
		    	w = 500;
		    	h = 550;
		    }
		    
		    var url = CTX + url;
		    var $targetDialog = _generateDialogDom();
		    var data = {};
		    data[obj] = id;
		    
		    var $dialog = parent.$('#a2m_dialog' + $targetDialog);
		    
		    $.ajax({
		        url : url,
		        data : $.extend({
		            'type' : 'dialog',
		            'cls' : ''
		        }, data),
		        cache : false,
		        success : function (data, textStatus, jqXHR) {
		            $dialog.html(data).promise().done(function () {
		                console.log('${ctxPath}');
		            });

		        }
		    });

		    $dialog.dialog({
		    	autoOpen: false,
		        resizable : false,
		        width : w,
		        height : h,
		        modal : true,
		        open : function () {
		            $(".ui-dialog").css("box-shadow", "#999 5px 5px 5px");
		        },
		        close : function () {
		        	_destroyDialogDom($targetDialog);
		        }
		    });
		    
		    $dialog.dialog('open');
		}
	</script>
</body>
</html>