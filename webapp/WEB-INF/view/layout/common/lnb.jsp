<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<c:set var="localeCode" value="${pageContext.response.locale}" />

<nav id="gnb">
	<ul class="gnb-lst">
		<li class="gnb-active-none gnb-menu1">
			<a href="/"><em class="sr-only">홈</em></a>
		</li>
		<c:forEach items="${SESS_MENU.MENU.List}" var="menu1" varStatus="loop1">
		<c:if test="${menu1.value.READ_YN eq 'Y'}">
		<c:set var="forClass" value="${loop1.count+1 }"></c:set>
		<c:choose>
		<c:when test="${loop.index == 0}">
        <li class="gnb-active-none gnb-menu2">
        	<a href="${ctxPath}${menu1.value.LINK_PATH}"><span>${menu1.value.MENU_NM}</span></a>
        </li>
		</c:when>
		<c:otherwise>
		<li class="gnb-menu gnb-menu${forClass}" id="${menu1.value.MENU_ID}">
			<a href="#"><span>${menu1.value.MENU_NM}</span></a>
			<c:if test="${fn:length(menu1.value.List)>0}">
			<ul class="depth2">
				<c:forEach items="${menu1.value.List}" var="menu2" varStatus="loop2">
				<li id="${menu2.value.MENU_ID}">
					<a href="${ctxPath}${menu2.value.LINK_PATH}"><span>${menu2.value.MENU_NM}</span></a>
					<c:if test="${fn:length(menu2.value.List)>0}">
					<ul class="depth3">
						<c:forEach items="${menu2.value.List}" var="menu3" varStatus="loop3">
						<li id="${menu3.value.MENU_ID}">
							<a href="${ctxPath}${menu3.value.LINK_PATH}"><span>${menu3.value.MENU_NM}</span></a>
						</li>
						</c:forEach>
					</ul>
					</c:if>
				</li>
				</c:forEach>
			</ul>
			</c:if>
		</li>
		</c:otherwise>
		</c:choose>
		</c:if>
		</c:forEach>
	</ul>

	<div class="gnb-side">
		<div class="select-box lang-select">
			<label for="lang_type"></label>
			<select name="lang_type" id="lang_type" class="info-select">
				<option value="ko" <c:if test="${localeCode eq 'ko' }">selected</c:if>>KO</option>
				<option value="en" <c:if test="${localeCode eq 'en' }">selected</c:if>>EN</option>
				<option value="vi" <c:if test="${localeCode eq 'vi' }">selected</c:if>>VN</option>
			</select>
		</div>
		<a href="${ctxPath}/common/auth/logout" class="login-toggle-btn"><span>SIGN OUT</span></a>
	</div>
</nav>

<script>
$(document).ready(function() {
	/* 현재 페이지에 해당하는 메뉴 활성화 */
	var url = window.location.pathname;
	var index = $('a[href="' + url + '"]').closest('ul').closest('li').index();
	var check = false;
	
    if (index == -1) {
    	url = url.substring(0, 14) + 'list';
    	index = $('a[href="' + url + '"]').closest('ul').closest('li').index();
    	if (index != -1) {
			check = true;
    	}
    } else {
		check = true;
    }
    
    if (check) {
	    $('ul.gnb-lst > li:eq(' + index + ')').addClass('on');
    }
    
    /* 현재 페이지 navigation */
//     if (getCookie('depth2') !== null) {
//     	var code = '<li>' + getCookie('depth1') + '</li>'
//     			 + '<li>' + getCookie('depth2') + '</li>';
    	
//     	$('ul.location').empty();
//     	$('ul.location').html(code);
//     }
})
</script>