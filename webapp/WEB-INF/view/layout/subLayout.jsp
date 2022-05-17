<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script type="text/javascript">
$(document).ready(function(){
    console.log('sub layout');

	jsCtxPath = $('#ctxPath').attr('ctxpath-attr');
	jsUrlWs = 'ws://' + host + wschatCtx + '/echo-ws';  
});
</script>

<!-- header -->
<!-- <header id="header"> -->
<%-- 	<tiles:insertAttribute name="header" /> --%>
<!-- </header> -->
<!-- //header -->

<!-- container -->
<section id="container">
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
	</nav>
	<!-- //snb -->
	
	<!-- content -->
	<div id="content">
		<div id="cont">
			<c:choose>
				<c:when test="${mdi }">
					<script type="text/javascript">
						$(document).ready(function(){
						  
							$('div#mdi_tab_bar').on('click','ul#mdiMenu > li',function(){
								
								$(this).find('span.mbtn').addClass('tab_current')
								$(this).siblings().find('span.mbtn').removeClass('tab_current')
								//$(this).addClass('ov').siblings().removeClass('ov')
								//$(this).find('span.mbtn').removeClass('bg_gray').addClass('bg_mint');
								//$(this).siblings().find('span.mbtn').addClass('bg_gray').removeClass('bg_mint');
									
								$('#'+$(this).data('body_target_id')).show().siblings().hide();
							});
							$('div#mdi_tab_bar').on('click','ul#mdiMenu > li > span > span.close',function(){
								$('#'+$(this).parents('li').data('body_target_id')).remove();
								var $li = $(this).parents('li')
								if($(this).parent('span.mbtn').hasClass('tab_current')){
									$li.prev().trigger('click')
								}
								$li.remove();
							})
						});
					</script>
					
					<!-- cnb -->
	<%-- 				<div class="cnb"><a2m:navi menuMap="${navimenu}" title="${navimenu.param.TITLE }"/></div> --%>
					<!-- //cnb -->
					
					<!-- mdi tab -->
					<div id="mdi_tab_bar">
						<!-- 다음메일 처럼 열어본 페이지를 기억하는 기능이 필요합니다. -->
						<div class="control">
							<span class="prev">이전</span>  
							<span class="next">다음</span>
						</div>
						<ul id="mdiMenu"></ul>
					</div>
					<!-- //mdi tab -->
					
					<!-- content_grap -->
					<%----%>
					 <div id="txt" class="content_grap">
						
					</div> 
					<!-- //content_grap -->
				</c:when>
				<c:otherwise>
					<!-- cnb -->
					<div class="cnb">
					<a2m:navi menuMap="${navimenu}" title="${navimenu.param.TITLE }" 
					helpIcon="${helpicon}" />
					</div>
					
					<!-- content_grap -->
					<div  id="txt"  class="content_grap">
						<tiles:insertAttribute name="body"/>
					</div>
					<!-- //content_grap -->
				</c:otherwise>
			</c:choose>
		</div>
	</div>
	<!-- //content -->
</section>
<!-- //container -->
<!-- <header id="footer"> -->
<%-- 	<tiles:insertAttribute name="footer" /> --%>
<!-- </header> -->