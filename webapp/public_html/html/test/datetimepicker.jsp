<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script>
var WT_LOCALE = 'en'</script>
<% request.setCharacterEncoding("UTF-8"); %>
<script>
var CTX = "<%=request.getContextPath()%>"; 
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
var CID = "${cid}"; 

</script>

<jsp:include page="/public_html/html/include/sub_header.jsp"></jsp:include>

<link href="${ctxPath}/stylesheet/common/libraries-modify.css" rel="stylesheet" type="text/css" media="all">

<%-- Kendo UI combined JavaScript --%>
<script src="${ctxPath}/script/kendo/js/kendo.all.min.js"></script>
<script src="${ctxPath}/script/kendo/js/jszip.min.js"></script>
<script src="${ctxPath}/script/kendo/js/pako_deflate.min.js"></script>
<script src="${ctxPath}/script/kendo/js/cultures/kendo.culture.ko-KR.min.js"></script>

<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/util/utils.js" ></script>

<%-- config  --%>
<script src="${ctxPath}/script/a2mFWJs/config/common.js" ></script>
<script src="${ctxPath}/script/a2mFWJs/config/gridConfig.js" ></script>
<script src="${ctxPath}/script/a2mFWJs/control/form.validate.js" ></script>

<%-- validation --%>
<script src="${ctxPath}/script/jquery/validation/jquery.validationEngine.js" ></script>
<script src="${ctxPath}/script/jquery/validation/languages/jquery.validationEngine-kr.js" ></script>
<script src="${ctxPath}/script/jquery/validation/utils.js" ></script>

<%-- 신규  creator가 control 보다 상위 개념 --%>
<script src="${ctxPath}/script/a2mFWJs/control/form.extends.js" ></script>
<script src="${ctxPath}/script/a2mFWJs/control/domCreator.js" ></script>
<script src="${ctxPath}/script/a2mFWJs/control/gridControl.js" ></script>
<script src="${ctxPath}/script/a2mFWJs/control/gridObjControl.js" ></script>
<script src="${ctxPath}/script/a2mFWJs/control/domControl.js" ></script>
<script src="${ctxPath}/script/a2mFWJs/util/jsonlite.js" ></script>

<script src="${ctxPath}/script/a2mFWJs/util/nova-validation.js" ></script>


<!-------------------------------------------------------------------------------------------------------->
<link href="${ctxPath}/stylesheet/kendo/styles/kendo.common.min.css" rel="stylesheet" />
<link href="${ctxPath}/stylesheet/kendo/styles/kendo.default.min.css" rel="stylesheet" />

<script>
/* date time picker */
$(function() {
	function startChange() {
        var startDate = start.value(),
        endDate = end.value();

        if (startDate) {
            startDate = new Date(startDate);
            startDate.setDate(startDate.getDate());
            end.min(startDate);
        } else if (endDate) {
            start.max(new Date(endDate));
        } else {
            endDate = new Date();
            start.max(endDate);
            end.min(endDate);
        }
    }

    function endChange() {
        var endDate = end.value(),
        startDate = start.value();

        if (endDate) {
            endDate = new Date(endDate);
            endDate.setDate(endDate.getDate());
            start.max(endDate);
        } else if (startDate) {
            end.min(new Date(startDate));
        } else {
            endDate = new Date();
            start.max(endDate);
            end.min(endDate);
        }
    }

    var today = kendo.date.today();

    var start = $("#START_DOWNTIME").kendoDateTimePicker({
        value: today,
        change: startChange,
        parseFormats: ["MM/dd/yyyy"]
    }).data("kendoDateTimePicker");

    var end = $("#END_DOWNTIME").kendoDateTimePicker({
        value: today,
        change: endChange,
        parseFormats: ["MM/dd/yyyy"]
    }).data("kendoDateTimePicker");

    start.max(end.value());
    end.min(start.value());
});
</script>
<!-------------------------------------------------------------------------------------------------------->

<div class="container system-wrap system-wrap1">
	<div class="system-detail-wrap">
		<div class="system-left">
			<div class="tit-wrap">
				<h2 class="heading3"><span class="txt">Date time picker - Range selection</span></h2>
				<ul class="location">
					<li>Components</li>
					<li class="bold">Date time picker - Range selection</li>
				</ul>
			</div>
			<pre>
&lt;link href="${ctxPath}/stylesheet/kendo/styles/kendo.common.min.css" rel="stylesheet" /&gt;
&lt;link href="${ctxPath}/stylesheet/kendo/styles/kendo.default.min.css" rel="stylesheet" /&gt;

&lt;script&gt;
/* date time picker */
$(function() {
	function startChange() {
        var startDate = start.value(),
        endDate = end.value();

        if (startDate) {
            startDate = new Date(startDate);
            startDate.setDate(startDate.getDate());
            end.min(startDate);
        } else if (endDate) {
            start.max(new Date(endDate));
        } else {
            endDate = new Date();
            start.max(endDate);
            end.min(endDate);
        }
    }

    function endChange() {
        var endDate = end.value(),
        startDate = start.value();

        if (endDate) {
            endDate = new Date(endDate);
            endDate.setDate(endDate.getDate());
            start.max(endDate);
        } else if (startDate) {
            end.min(new Date(startDate));
        } else {
            endDate = new Date();
            start.max(endDate);
            end.min(endDate);
        }
    }

    var today = kendo.date.today();

    var start = $("#START_DOWNTIME").kendoDateTimePicker({
        value: today,
        change: startChange,
        parseFormats: ["MM/dd/yyyy"]
    }).data("kendoDateTimePicker");

    var end = $("#END_DOWNTIME").kendoDateTimePicker({
        value: today,
        change: endChange,
        parseFormats: ["MM/dd/yyyy"]
    }).data("kendoDateTimePicker");

    start.max(end.value());
    end.min(start.value());
});
&lt;/script&gt;

&lt;div class="calendar-picker"&gt;
	&lt;div class="calendar-wrap"&gt;
		&lt;div class="input-group"&gt;
			&lt;label for="START_DOWNTIME" class="sr-only"&gt;&lt;/label&gt;
			&lt;input type="text" id="START_DOWNTIME" name="START_DOWNTIME" style="width: 100%" /&gt;
		&lt;/div&gt;
		&lt;em class="hyphen"&gt;
			&lt;span class="sr-only"&gt;-&lt;/span&gt;
		&lt;/em&gt;
		&lt;div class="input-group"&gt;
			&lt;label for="END_DOWNTIME" class="sr-only"&gt;&lt;/label&gt;
			&lt;input type="text" id="END_DOWNTIME" name="END_DOWNTIME" style="width: 100%" /&gt;
		&lt;/div&gt;
	&lt;/div&gt;
&lt;/div&gt;
			</pre>
			<div class="registration-write">
				<div class="calendar-picker">
					<div class="calendar-wrap">
						<div class="input-group">
							<label for="START_DOWNTIME" class="sr-only"></label>
	<!-- 						<input type="text" id="noticeCalendarPrev" name="noticeCalendarPrev" value=""> -->
	<!-- 						<button type="button" class="calendar-picker-btn"> -->
	<!-- 							<i class="xi-calendar"></i> -->
	<!-- 						</button> -->
							<input type="text" id="START_DOWNTIME" name="START_DOWNTIME" nova-validation="required" style="width: 100%" />
						</div>
						<em class="hyphen">
							<span class="sr-only">-</span>
						</em>
						<div class="input-group">
							<label for="END_DOWNTIME" class="sr-only"></label>
							<input type="text" id="END_DOWNTIME" name="END_DOWNTIME" nova-validation="required" style="width: 100%" />
						</div>
					</div>
				</div>
			</div>

		</div>
    </div>
</div>
    
    
<!--

//-->
<jsp:include page="/public_html/html/include/footer.jsp"></jsp:include>