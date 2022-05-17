<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script>
var aaa =  "${navimenu}";
// var dataaa = JSON.parse(${navimenu}); 
console.log('menu', aaa);
/* var _SESS_MENU = '${SESS_MENU}'; */
</script>

<ul class="gnb-lst">
	<li class="gnb-active-none home ${navimenu.SUBMENU.MENU_ID eq null ? 'on' :''}" id="">
		<a href="${ctxPath}/main/main">
	 		<em class="sr-only">HOME</em>
		</a>
	</li> 
	
	<c:forEach items="${SESS_MENU.MENU.List}" var="menu1" varStatus="loop">
			<c:if test="${menu1.value.READ_YN eq 'Y' && menu1.value.MENU_OUT_YN != 'Y'}">
			<c:set var="url" value="${ctxPath}${menu1.value.LINK_PATH}?${menu1.value.PARAM}"></c:set>
			
			<li menu-id="${menu1.value.MENU_ID}" class="gnb-menu  ${menu1.value.MENU_ID eq navimenu.SUBMENU.MENU_ID? 'on': ''}" id="${menu1.value.MENU_ID}"><a  href="${fn:length(menu1.value.LINK_PATH)>0  ? url :'#'}"> <span>${menu1.value.MENU_NM}</span></a>
			
				<ul class="depth2">
				<c:forEach items="${menu1.value.List}" var="menu2" varStatus="loop"> 
					<c:if test="${menu2.value.READ_YN eq 'Y' && menu2.value.MENU_OUT_YN != 'Y'}">
						<c:set var="url" value="${ctxPath}${menu2.value.LINK_PATH}?${menu2.value.PARAM}"></c:set>	
							<li class="${menu2.value.MENU_ID eq navimenu.SUBMENU.SUBMENU.MENU_ID? 'active': ''}" >
								<a  href="${fn:length(menu2.value.LINK_PATH)>0  ? url :''}">
									<span>${menu2.value.MENU_NM }</span>
								</a>
								<c:if test="${fn:length(menu2.value.List)>0}" >
									<ul class="depth3">
										<c:forEach items="${menu2.value.List}" var="menu3" varStatus="loop">
											 <c:set var="url" value="${ctxPath}${menu3.value.LINK_PATH}?${menu3.value.PARAM}"></c:set>
											 
											 <li class="${menu3.value.MENU_ID eq navimenu.SUBMENU.SUBMENU.SUBMENU.MENU_ID ? 'active': ''}">
							                  <a href="${fn:length(menu3.value.LINK_PATH)>0  ? url :''}">
							                    <span>${menu3.value.MENU_NM }</span>
							                  </a>
							                </li>
										</c:forEach>
									</ul>
					            </c:if>
							</li>
					</c:if>
				</c:forEach>
				</ul>
			</li>
			</c:if>
	</c:forEach>
</ul>
<c:set var="localeCode" value="${pageContext.response.locale}" />



<div class="gnb-side">
	<div class="select-box lang-select" >

		<label for="search_type"></label> <select name="search_type"
			id="search_type" class="info-select">
			<c:choose>
				<c:when test="${localeCode == 'ko'}">
					<option value="ko" selected="selected">KO</option>
					<option value="en">EN</option>
					<option value="vi">VN</option>
				</c:when>
				<c:when test="${localeCode == 'vi'}">
					<option value="ko">KO</option>
					<option value="en">EN</option>
					<option value="vi" selected="selected">VN</option>
				</c:when>
				<c:otherwise>
					<option value="ko">KO</option>
					<option value="en" selected="selected">EN</option>
					<option value="vi">VN</option>
				</c:otherwise>
			</c:choose>
		</select>
	</div>

	<!-- mobile -->
			<a href="#" class="lang-btn">
				<span class="sr-only">Language</span>
				<i class="xi-translate"></i>
			</a>
			<a href="#" class="setting-btn">
				<span class="sr-only">Setting</span>
				<i class="xi-cog"></i>
			</a>
			<!-- //mobile -->
			<a  href="${ctxPath}/common/auth/logout" class="login-toggle-btn">
				<span>SIGN OUT</span>
				<!-- mobile -->
				<i class="xi-log-out"></i>
				<!-- //mobile -->
			</a>

	</a>
</div>

<!-- layerpopup - mobile lang-->
<div id="layerPopupLang" class="layer-popup-lang" hidden>
	<div class="layer-cont">
		<strong class="tit">Language</strong>
		<ul class="lang-select-lst">
			<c:choose>
				<c:when test="${localeCode == 'ko'}">
					<li lang="ko" class="active"><a href="#none"><span>KO</span></a>
					</li>
					<li lang="en"><a href="#none"><span>EN</span></a></li>
					<li lang="vn"><a href="#none"><span>VN</span></a></li>
				</c:when>
				<c:when test="${localeCode == 'vi'}">
					<li lang="ko"><a href="#none"><span>KO</span></a></li>
					<li lang="en"><a href="#none"><span>EN</span></a></li>
					<li lang="vn" class="active"><a href="#none"><span>VN</span></a>
					</li>
				</c:when>
				<c:otherwise>
					<li lang="ko"><a href="#none"><span>KO</span></a></li>
					<li lang="en" class="active"><a href="#none"><span>EN</span></a>
					</li>
					<li lang="vn"><a href="#none"><span>VN</span></a></li>
				</c:otherwise>
			</c:choose>

		</ul>
		<div class="lang-btn-wrap">
			<a href="#none" class="layer-close lang-btn">
				<span>Cancel</span>
			</a>
			<a onclick="changeLanguage()" class="lang-btn layer-apply">
				<span>Apply</span>
			</a>
		</div>
	</div>
</div>
<!-- //layerpopup - mobile lang -->

