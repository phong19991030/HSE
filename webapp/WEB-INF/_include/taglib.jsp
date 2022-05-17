<%@ taglib prefix="c" uri="/WEB-INF/tlds/c.tld"  %>
<%@ taglib prefix="fmt" uri="/WEB-INF/tlds/fmt.tld"  %>
<%@ taglib prefix="fn" uri="/WEB-INF/tlds/fn.tld"  %>
<%@ taglib uri="/WEB-INF/tlds/html-object.tld" prefix="a2m"%>  
<%@ taglib uri="/WEB-INF/tlds/jquery-object.tld" prefix="jq"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<fmt:requestEncoding value="utf-8"/>   
<c:set var="mdi" value="false" />  
 

<%-- <c:set var="absPath" value="mis.innopolis.or.kr" /> --%>
<%-- <c:set var="absPath" value="${pageContext.request.contextPath}" /> --%>
<c:set var="ctxPath" value="${pageContext.request.contextPath}" />


<%-- <c:set var="design" value="inno" />  --%>
<%-- <c:set var="design" value="prof" />  --%>
<%-- <c:set var="design" value="sens" />  --%>
<c:set var="design" value="stnd" />  

<c:set var="imgPath" value="${ctxPath}/images/${design}"/>
<c:set var="formPath" value="${ctxPath}${pathKey}"/>
<c:set var="helpicon" value="false"/>


 
<jsp:useBean id="NOW" class="java.util.Date"/>

<%-- 어제 --%>
<fmt:formatDate value="${YESTERDAYS}" var="YESTERDAY" pattern="yyyy-MM-dd" />
<fmt:formatDate value="${YESTERDAYS}" var="YESTERDAY_DATE" pattern="dd" />

<%-- 내일 --%>
<fmt:formatDate value="${TOMORROWS}" var="TOMORROW" pattern="yyyy-MM-dd" /> 
<fmt:formatDate value="${TOMORROWS}" var="TOMORROW_DATE" pattern="dd" />

<%-- 전월 --%>
<fmt:formatDate value="${BEFORE_MONTHS}" var="BEFORE_YEAR" pattern="yyyy" />
<fmt:formatDate value="${BEFORE_MONTHS}" var="BEFORE_MONTH" pattern="MM" />
<fmt:formatDate value="${BEFORE_MONTHS}" var="BEFORE_YEAR_MONTH" pattern="yyyy-MM" />
<fmt:formatDate value="${BEFORE_MONTHS}" var="BEFORE_MONTH_DATE" pattern="yyyy-MM-dd" />

<%-- 다음월 --%>
<fmt:formatDate value="${AFTER_MONTHS}" var="AFTER_YEAR" pattern="yyyy" />
<fmt:formatDate value="${AFTER_MONTHS}" var="AFTER_MONTH" pattern="MM" />
<fmt:formatDate value="${AFTER_MONTHS}" var="AFTER_YEAR_MONTH" pattern="yyyy-MM" />
<fmt:formatDate value="${AFTER_MONTHS}" var="AFTER_MONTH_DATE" pattern="yyyy-MM-dd" />

<%-- 1주일 전 날짜 --%>
<fmt:formatDate value="${BEFORE_SEVEN_DATES}" var="BEFORE_SEVEN_DATE" pattern="yyyy-MM-dd" /> 
<%-- 1주일 후 날짜 --%>
<fmt:formatDate value="${AFTER_SEVEN_DATES}" var="AFTER_SEVEN_DATE" pattern="yyyy-MM-dd" />

<%-- 이번달 시작일--%>
<fmt:formatDate value="${MONTH_LAST_DATES}" var="MONTH_FIRST_DATE" pattern="yyyy-MM-01" />
<%-- 이번달 마지막일--%>
<fmt:formatDate value="${MONTH_LAST_DATES}" var="MONTH_LAST_DATE" pattern="yyyy-MM-dd" />

<%-- 올해 시작일 --%>
<fmt:formatDate value="${NOW}" var="YEAR_FIRST_DATE" pattern="yyyy-01-01" />
<%-- 올해 마지막일 --%>
<fmt:formatDate value="${NOW}" var="YEAR_LAST_DATE" pattern="yyyy-12-31" />

<%-- 오늘 --%>
<fmt:formatDate value="${NOW}" var="TODAY" pattern="yyyy-MM-dd" />
<fmt:formatDate value="${NOW}" var="TODAY_MONTH" pattern="yyyy-MM" />
<fmt:formatDate value="${NOW}" var="TODAY_TIME" pattern="yyyy-MM-dd HH:mm:ss" />

<fmt:formatDate value="${NOW}" var="YYMM" pattern="yyyyMM" />
<fmt:formatDate value="${NOW}" var="YEAR" pattern="yyyy" />
<fmt:formatDate value="${NOW}" var="MONTH" pattern="MM" />
<fmt:formatDate value="${NOW}" var="DAY" pattern="dd" />
<fmt:formatDate value="${NOW}" var="HOUR" pattern="HH" />
<fmt:formatDate value="${NOW}" var="TIME" pattern="HHmm" />
<fmt:formatDate value="${NOW}" var="MINUTE" pattern="mm" />
<fmt:formatNumber value="${MINUTE-(MINUTE%10)}" var="MINUTE10"  />
<c:set value="${HOUR}:${MINUTE10}" var="TIME10"  />

<c:set value="${HOUR}:${fn:length(MINUTE10) eq 1 ? '0':''}${MINUTE10}" var="TIME10"  />

<c:set var="popupOoptions" value='resizable,scrollbar=yes'/>
