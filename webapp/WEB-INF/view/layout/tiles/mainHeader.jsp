<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<script type="text/javascript">
	var currentMousePos = {
		x : -1,
		y : -1
	};
	
	var TOP_LAYOUT_WIDTH = 1000;

	function setTopMenu(obj){
		$(obj).addClass('lnb_current').siblings().removeClass('lnb_current');
		var mid = $(obj).data('mid');
		var $target =$('#sidemenu li#side_menu_'+mid);
		$target.removeClass('fold').find('li').removeClass('fold')
		$target.removeClass('hide').siblings().addClass('fold').removeClass('hide');
		$target.siblings('.sysmenu').addClass('hide');  
		//$('#sidemenu').animate({scrollTop:$('#sidemenu').scrollTop() +$target.offset().top-250},0)
	}
	function initMenu(obj){
		$(obj).addClass('lnb_current').siblings().removeClass('lnb_current');
		var mid = $(obj).data('mid');
		var $target =$('#sidemenu li#side_menu_'+mid);
		//하위 전체오픈
		//$('ul#sidemenu li').addClass('fold')
		$('#sidemenu li.foldingMenu').addClass('fold')
		$target.removeClass('fold').find('li.snb_current').removeClass('fold') 
		$target.removeClass('hide').siblings().addClass('fold').removeClass('hide');
		$target.siblings('.sysmenu').addClass('hide');  
		/* if($target.offset()){
		$('#sidemenu').animate({scrollTop:$('#sidemenu').scrollTop() +$target.offset().top-250},0)
		} */
	}
	
	$(document).ready(function() { 
	    $(".lnb_r li a img").hover(function(){ 
	        $(this).attr("src", $(this).attr("src").replace("logout.png", "logout_on.png")); 
	    }, function(){ 
	        $(this).attr("src", $(this).attr("src").replace("logout_on.png", "logout.png")); 
	    }); 
	    $(".lnb_r li a img").hover(function(){ 
	        $(this).attr("src", $(this).attr("src").replace("notice.png", "notice_on.png")); 
	    }, function(){ 
	        $(this).attr("src", $(this).attr("src").replace("notice_on.png", "notice.png")); 
	    }); 
// 	    $(".lnb_r li a img").hover(function(){ 
// 	        $(this).attr("src", $(this).attr("src").replace("language.png", "language_on.png")); 
// 	    }, function(){ 
// 	        $(this).attr("src", $(this).attr("src").replace("language_on.png", "language.png")); 
// 	    }); 
// 	    $(".lnb_r li.language a img").click(function(){
// // 	    	debugger;
// 	    	if($('#menu_Language').css('display') == 'none'){
// 		    	$('#menu_Language').show();
// 		    	$('#menu_Language').css('opacity', 1);
// 	    	}else{
// 	    		$('#menu_Language').hide();
// 		    	$('#menu_Language').css('opacity', 0);

// 	    	}
// 	    });
	});
	
	var theToggle = document.getElementById('toggle');

	// based on Todd Motto functions
	// https://toddmotto.com/labs/reusable-js/

	// hasClass
	function hasClass(elem, className) {
		return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
	}
	// addClass
	function addClass(elem, className) {
	    if (!hasClass(elem, className)) {
	    	elem.className += ' ' + className;
	    }
	}
	// removeClass
	function removeClass(elem, className) {
		var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
		if (hasClass(elem, className)) {
	        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
	            newClass = newClass.replace(' ' + className + ' ', ' ');
	        }
	        elem.className = newClass.replace(/^\s+|\s+$/g, '');
	    }
	}
	// toggleClass
	function toggleClass(elem, className) {
		var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, " " ) + ' ';
	    if (hasClass(elem, className)) {
	        while (newClass.indexOf(" " + className + " ") >= 0 ) {
	            newClass = newClass.replace( " " + className + " " , " " );
	        }
	        elem.className = newClass.replace(/^\s+|\s+$/g, '');
	    } else {
	        elem.className += ' ' + className;
	    }
	}
	
	if(theToggle || theToggle != null || theToggle != undefined){
		theToggle.onclick = function() {
			   toggleClass(this, 'on');
			   return false;
			}
	}
	
	
	
</script>



<!-- logo -->
<h1 class="logo">
	<a href="${ctxPath}/main/main.do">
		<img src="${ctxPath}/images/${design}/logo.png" alt="O&M로고">
	</a>
</h1>
<!-- //logo -->



<!-- gnb -->
<!-- <div id="gnb" class="clearfix"> -->
<!-- 	<!-- Service menu right --> -->
<!-- 	<ul class="lnb_r"> -->
<!-- 		<li class="language"> -->
<%-- 			<a href="#" id="toggle"><img src="${ctxPath}/images/language.png" alt="O&M언어선택"></a> --%>
<!-- 			<ul id="menu_Language" style="display: none"> -->
<!-- 		     	<li><a class="selected_lang" href="?lang=ko">KO</a></li> -->
<!-- 		    	<li><a href="?lang=en">EN</a></li> -->
<!-- 		    	<li><a href="?lang=vi">VN</a></li> -->

<!-- 		 	</ul> -->
<!-- 		</li> -->
<%-- 		<li><a href="#"><img src="${ctxPath}/images/notice.png" alt="O&M공지사항"></a></li> --%>
<%-- 		<li class="user_logout"><a href="${ctxPath}/common/auth/logout"><img src="${ctxPath}/images/logout.png" alt="로그아웃"></a></li> --%>
<!-- 	</ul> -->
<!-- 	<!-- //Service menu right --> -->
<!-- </div> -->
<!-- //gnb -->