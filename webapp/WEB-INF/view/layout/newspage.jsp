<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>
<c:set var="conts" value="${DATA}"></c:set>
<div>
	<div class="grab">
		<div class="prd_area">
			<div class="event_cont" style="padding:16px;">
				<c:choose>
					<c:when test="${' ' eq conts.NOTICE_CONT}">
						정보가 없습니다.
					</c:when>
					<c:otherwise>
						${conts.NOTICE_CONT}
					</c:otherwise>
				</c:choose>
				<%-- 				<img src="${ctxPath}/images/eventimg1.png">	 --%>
			</div>
		</div>
	</div>
</div>