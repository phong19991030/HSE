<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>


<!-- anhpv 2020/03/13 -->


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
var WT_LOCALE = 'ko';
</script>

<jsp:include page="/public_html/html/include/sub_header.jsp"></jsp:include>

  <link href="${ctxPath}/stylesheet/common/libraries-modify.css" rel="stylesheet" type="text/css" media="all">



<%-- Kendo UI combined JavaScript --%>
<script src="${ctxPath}/script/kendo/js/kendo.all.min.js"></script>
<script src="${ctxPath}/script/kendo/js/jszip.min.js"></script>
<script src="${ctxPath}/script/kendo/js/pako_deflate.min.js"></script>
<script src="${ctxPath}/script/kendo/js/cultures/kendo.culture.ko-KR.min.js"></script>

<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/util/utils.js"></script>

<%-- config  --%>
<%-- <script type="text/javascript" src="${ctxPath}/script/a2mFWJs/config/style.js"></script> --%>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/config/common.js"></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/config/gridConfig.js"></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/form.validate.js"></script>



<%-- validation --%>
<script type="text/javascript" src="${ctxPath}/script/jquery/validation/jquery.validationEngine.js"></script>
<script type="text/javascript" src="${ctxPath}/script/jquery/validation/languages/jquery.validationEngine-kr.js"></script>
<script type="text/javascript" src="${ctxPath}/script/jquery/validation/utils.js"></script>



<%-- 신규  creator가 control 보다 상위 개념 --%>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/form.extends.js"></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/domCreator.js"></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/gridControl.js"></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/gridObjControl.js"></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/control/domControl.js"></script>
<script type="text/javascript" src="${ctxPath}/script/a2mFWJs/util/jsonlite.js"></script>
<script type="text/javascript" src="${ctxPath}/script/jquery/jquery-ui-timepicker-addon.js"></script>
<link media="screen" href="${ctxPath}/stylesheet/${design}/jquery-ui-timepicker-addon.css" rel="stylesheet" type="text/css" />






<style>



</style>



<script type="text/javascript">
	$(function() {

		$('.datepicker').setDatePicker('yy/mm/dd');
		$('.datetimepicker').setDateTimePicker();
		
	})
</script>



<div class="container system-wrap system-wrap1">

	<!-- 발전기 등록 -->
	<div class="system-detail-wrap">
		<div class="system-left">
			<!--tit-wrap-->
			<div class="tit-wrap">
				<h2 class="heading3">
					<span class="txt">Date picker</span>
					<!-- <span class="version">V47</span> -->
				</h2>
				<ul class="location">
					<li>Component</li>
					<li class="bold">Date picker</li>
				</ul>
			</div>
			<!--//tit-wrap-->
			<!-- registration form -->


			<pre>
&lt!--         push the &ltinput class="datepicker"&gt in side .calendar-picker > calender-wrap to get styling. -->
&lt!--  			call $inputElement.setDatePicker(param); to set datepicker for it. param is template of date --&gt
&lt!-- 			Example: --&gt
			&ltscript type="text/javascript"&gt
			$(function(){
				
				$('.datepicker').setDatePicker();
			})
			&lt/script&gt

         &ltli  class="calendar-picker"&gt
             	            	             &ltspan class="detail-search-keyword"&gtDate picker&lt/span&gt
             
	            &ltdiv class="calendar-wrap"&gt
	            
	            &ltdiv class="input-group"&gt
	              &ltlabel for="search_TIMESTAMP" class="sr-only"&gtAccess Time&lt/label&gt
	              &ltinput class="datepicker" id="search_TIMESTAMP" name="USE_DT" value="" type="text"&gt
	            &lt/div&gt
	            &lt/div&gt
	          &lt/li&gt
	          
	          
	          -------------------------------------------------------------------------------------------------

&lt!--         same datepicker -->
&lt!--  			call $inputElement.setDateTimePicker(dateFormat, maxDate, maxTime); to set DateTimePicker for it. 
All parameters are not required --&gt
&lt!-- 			Example: --&gt
			&ltscript type="text/javascript"&gt
			$(function(){
				
				$('.datetimepicker').setDateTimePicker();
			})
			&lt/script&gt

       &ltinput type="text" name="STRT_DOWNTIME"   id="start-downtime11" class="datetimepicker" maxlength="16" value="" title="Start down time" /&gt

</pre>

			<div class="registration-form registration-form1">
				<div class="registration-form-lst-wrap">
					<ul class="registration-form-lst">
						<li>
							<span class="detail-search-keyword">Date picker</span>
							<div class="registration-write">
								<div class="calendar-picker calendar-picker-full">
									<div class="calendar-wrap">
										<div class="input-group">
											<label for="search_TIMESTAMP" class="sr-only">Access Time</label>
											<input class="datepicker" id="search_TIMESTAMP" name="USE_DT" value="" type="text">
											
<!-- 											<span class="calendar-picker-btn a"> -->
<!-- 												<i class="xi-calendar"></i> -->
<!-- 											</span> -->
										</div>
									</div>
								</div>
							</div>
						</li>
						
						<li>
							<span class="detail-search-keyword">Date time picker</span>
							<div class="registration-write">
								<div class="calendar-picker calendar-picker-full">
									<div class="calendar-wrap">
										<div class="input-group">
											<label for="start-downtime1" class="sr-only">Date time picker</label>
											<input type="text" name="STRT_DOWNTIME"  id="start-downtime11" class="datetimepicker" maxlength="16" value="" title="Start down time" />
<!-- 											<span class="calendar-picker-btn a"> -->
<!-- 												<i class="xi-calendar"></i> -->
<!-- 											</span> -->
										</div>
									</div>
								</div>
							</div>
						</li>
						
						<li>
							<span class="detail-search-keyword">Two calendars</span>
							<div class="registration-write">
								<div class="calendar-picker">
									<div class="calendar-wrap">
										<div class="input-group">
											<label for="start-downtime" class="sr-only">Date time picker</label>
											<input type="text" name="STRT_DOWNTIME"  id="start-downtime" class="datetimepicker" maxlength="16" value="" title="Start down time" />
<!-- 											<span class="calendar-picker-btn a"> -->
<!-- 												<i class="xi-calendar"></i> -->
<!-- 											</span> -->
										</div>
										<em class="hyphen">
											<span class="sr-only">-</span>
										</em>
										<div class="input-group">
											<label for="end-downtime" class="sr-only">Date time picker</label>
											<input type="text" name="STRT_DOWNTIME"  id="end-downtime" class="datetimepicker" maxlength="16" value="" title="Start down time" />
<!-- 											<span class="calendar-picker-btn a"> -->
<!-- 												<i class="xi-calendar"></i> -->
<!-- 											</span> -->
										</div>
									</div>
								</div>
							</div>
						</li>
						
						
					</ul>

					<ul class="registration-form-lst">
						<li>

						</li>

						<li>

						</li>
						<li>
						</li>
						<li>
						</li>
					</ul>

				</div>
			</div>
			<!-- //registration form -->
		</div>
		<!--       <div class="system-right"> -->
		<!--         <div class="btns"> -->
		<%--   	        <a class="btn-style btn-style1" onclick="submitForm()"><spring:message --%>
		<%-- 							code='button.save' /></a> <a class="btn-style btn-style2" --%>
		<%-- 						onclick="backToList()"><spring:message code='button.cancel' /></a> --%>
		<%-- 					<c:if test="${not(DATA.CRUD eq 'C')}"> --%>
		<%-- 						<a class="btn-style btn-style3" onclick="doDelete()"><spring:message	code='button.delete' /></a> --%>
		<%-- 					</c:if> --%>
		<!--         </div> -->
		<!--       </div> -->
	</div>
	<!-- //발전기 등록 -->
</div>


<!--

//-->
<jsp:include page="/public_html/html/include/footer.jsp"></jsp:include>