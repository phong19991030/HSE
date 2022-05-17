<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript">
	
	$(document).ready(function(){
		$('.foldingMenu').addClass('fold');
		// 	$('.admin_btn span').on('click',function(){
		// 		location.href = $(this).data('url');
		// 	});
		$('#content #conti').append($('#navigation span:last-child').text());
		
	
	
		jsCtxPath = $('#ctxPath').attr('ctxpath-attr');
		jsUrlWs = 'ws://' + host + wschatCtx + '/echo-ws';  
// 		getCredential();
	});
</script>

<!-- header -->
<header id="header">
	<tiles:insertAttribute name="header" />
</header>
<!-- //header -->

<!-- container -->
<section id="container" class="clearfix">   
	<!-- snb -->
	<nav id="snb" style="z-index: 100;">
		<c:if test = "${design eq 'sens'  }"> 
			<div id="adminwrap">
				<dl class="admin">
					<dt><span>${SESS_USER.SESS_USER_NM }</span>님 환영합니다</dt><dd><span>최종접속</span> : ${SESS_USER.LATE_ACCESS_TIME }</dd><dd><span>최종IP</span> : ${SESS_USER.IP} </dd>
				</dl>
				<p class="admin_btn">
					<!-- <span>회원정보</span> -->
					<c:if test="${fn:indexOf(SESS_ROLE_ID,'R000') >= 0 }">
					<span data-url= "${ctxPath}/stm/stm_0201/list"  class="ac_click mar_side link" >관리자</span>
					</c:if>
					<span  data-url= "${ctxPath}/common/auth/logout" class="ac_click link">로그아웃</span>
				</p>				
			</div>
		</c:if>
		<tiles:insertAttribute name="menu"/>
		<!-- snb footer -->
		<!-- <footer id="footer">
			<ul>
				<li><a href="javascript:;">footer</a></li>
				<li><a href="javascript:;">footer</a></li>
			</ul>
			<address>copyright(c) 2016 Framework. All rights reserved.</address>
		</footer> -->
		<!-- //snb footer -->
	</nav>
	<!-- //snb -->
	
	<!-- content -->
	<div id="content">
		<div class="cnb"></div>
		<a2m:navi menuMap="${navimenu}" title="${navimenu.param.TITLE }"/>   
		<div id="cont" class="ptx" style="height: 850px !important;"> 
			<tiles:insertAttribute name="body"/>
		</div>
		<!-- footer -->
		<%-- <footer id="footer">
			<tiles:insertAttribute name="footer" />
		</footer> --%>
		<!-- //footer -->  
	</div>
	<!-- //content -->
</section>
<!-- footer -->
<%-- <footer id="footer">
	<tiles:insertAttribute name="footer" />
</footer> --%>
<!-- //footer -->  
