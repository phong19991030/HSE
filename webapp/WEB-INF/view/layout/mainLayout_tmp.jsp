<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<script type="text/javascript">
$(document).ready(function(){
// 	$('.admin_btn span').on('click',function(){
// 		location.href = $(this).data('url');
// 	});
	
	
	
	$('#rightwrap #conti').append($('#navigation span:last-child').text());
});

</script>

<div id="header">
	<tiles:insertAttribute name="header" />
</div>

<div id="container">  
	<div id="leftwrap"> 
		<c:if test = "${design eq 'sens'  }"> 
			<div id="adminwrap">
				<dl class="admin">
				
					<dt><span>${SESS_USER.SESS_USER_NM }</span>님 환영합니다</dt><dd><span>최종접속</span> : ${SESS_USER.LATE_ACCESS_TIME }</dd><dd><span>최종IP</span> : ${SESS_USER.IP} </dd>
				</dl>
				<p class="admin_btn">
<!-- 					<span>회원정보</span> -->
					<c:if test="${fn:indexOf(SESS_ROLE_ID,'R000') >= 0 }">
					<span data-url= "${ctxPath}/stm/stm_0201/list"  class="ac_click mar_side link" >관리자</span>
					</c:if>
					<span  data-url= "${ctxPath}/common/auth/logout" class="ac_click link">로그아웃</span>
				</p>				
			</div>
		</c:if>
		<tiles:insertAttribute name="menu"/>
<!-- 			<p class="bn_system"><span class="system1 ">연구관리시스템</span><span class="system2">전자결제시스템</span></p> -->
<!-- 		<div id="footer"><p class="copyright">copyright(c) 2014 MIS. all rights reserved</p></div> -->
	</div>
	<div id="rightwrap">
	
		<a2m:navi menuMap="${navimenu}" title="${navimenu.param.TITLE }"/>   
		
		<div id="main_txt" class="ptx" > 
			<tiles:insertAttribute name="body"/>
		</div>
	</div>
<!-- 	<div id="footer" style="clear: both;  position: relative;"> -->
<%-- 		<tiles:insertAttribute name="footer" /> --%>
<!-- 	</div> -->
</div>


<!-- 	<div id="footer" > -->
<%-- 		<img src="${ctxPath}/images/common/copyright.png" alt="copyright(c) 2013 MIS. all rights reserved"> --%>
<!-- 	</div> -->
<%-- 		<tiles:insertAttribute name="footer" /> --%>
