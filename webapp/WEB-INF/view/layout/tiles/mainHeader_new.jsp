<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/_include/taglib.jsp"%>

<script>
	console.log('header');

	function alertHelp() {
		alert("<spring:message code='msg.alert.help'/>");
	}
</script>

<div class="headerwrap">

	<!-- mobile -->
	<a href="javascript:void(0);" class="all-menu"> 
		<span class="sr-only">All menu</span> 
		<em> 
			<em></em>
		</em>
	</a>
	
<!-- 	<h1 class="heading-tit">mobile title</h1> -->
	<!-- //mobile -->
	
	<!-- logo -->
	<h1 class="logo">
		<a href="<%=request.getContextPath()%>/main/main" title="Home"></a>
	</h1>
	<!-- //logo -->

	<!-- combobox -->
	<!-- <div class="select-machine-wrap custom_header"></div> -->
	<!-- //combobox -->

	<!-- side menu -->
	<div class="t-side">
		<ul>
			<!-- mobile -->
			<li class="select-machine-btn active-toggle-btn">
				<a href="javascript:void(0);">
					<i class="xi-tune"></i>
				</a>
			</li>
			
			<li class="change-layout-btn">
				<a href="/plt/plt_0101/list">
					<i class="xi-layout-snb"></i> 
					<span class="sr-only">Change Layout</span>
				</a>
			</li>
			<!-- //mobile -->
			
			
			<!-- Client Info -->
			<li class="t-side-userinfo">
          		<a href="javascript:void(0);" title="User Information">
            		<span class="sr-only">User Information</span>
            		<i class="xi-user"></i>
          		</a>
          		<div class="userinfo-cont">
            		<strong id="CLIENT_ID" class="tit"></strong>
            		<!-- <p>
            			<span>COMPANY :</span>
            			<span id="CLIENT_COMPANY"></span>
            		</p> -->
            		<!-- <p>
            			<span>E-mail :</span>
            			<span id="CLIENT_EMAIL"></span>
            		</p> -->
            		<p>
            			<span>Permission :</span>
            			<span id="CLIENT_PERMISSION"></span>
            		</p>
            		<!-- <p>
            			<span>Address :</span>
            			<span id="CLIENT_ADDRESS"></span>
            		</p> -->
            		<p>
            			<span>IP address :</span>
            			<span id="CLIENT_IP"></span>
            		</p>
            		<p>
            			<span>Timezone :</span>
            			<span id="CLIENT_TIMEZONE"></span>
            		</p>
            		<p>
            			<span>Access time :</span>
            			<span id="CLIENT_ACCESS_TIME"></span>
            		</p>
            		<!-- <p>
            			<span style="text-align:center;">Last PW</span>
            		</p> -->
            		<p>
            			<span>change time :</span>
            			<span id="CLIENT_LAST_PW_CHANGE_TIME"></span>
            		</p>
            		<a id="CLIENT_CHANGE_PW_BTN" href="javascript:void(0);" class="btn-style ch-btn" onclick="javascript: $(this).parents('.userinfo-cont').removeClass('active'); changePassword();">Change Password</a>
          		</div>
        	</li>
        	<!-- //Client Info -->
			
			<!-- notice -->
			<li class="t-side-notice active-toggle-btn">
				
				<a href="javascript:void(0);" id="alarm_btn">
					<em class="sr-only">notice</em> 
					<i class="xi-bell" title="System alarm"></i> 
					<span class="alarm-num" id="alarm_num" style="display:none;"></span>
				</a>

				<div id="notice_area" class="t-side-popup notice-popup"></div>
			</li>
			<!-- //notice -->
			
			<!-- question -->
			<!-- <li class="t-side-question active-toggle-btn"> -->
			<li class="t-side-question">
				<a href="${ctxPath}/manual.pdf" target="_blank" title="Help"> 
					<span class="sr-only">questions</span> 
					<i class="xi-help"></i>
				</a>
				<div class="t-side-popup notice-popup active-toggle-btn">
					<div class="cont-none">
						<strong>No notification.</strong> 
						<a href="" class="view-post-btn">Viewing the last post</a>
					</div>
					<div class="t-side-popup-scroll"></div>
			 
				</div>
			</li>
			<!-- //question -->
			
			<!-- setting -->
			<!-- <li class="t-side-setting active-toggle-btn">
				<a href="#none"> 
					<span class="sr-only">setting</span> 
					<i class="xi-cog"></i>
				</a>

				<div class="t-side-popup notice-popup">
					ë´ì© ìì ì
					<div class="cont-none">
						<strong>No notification.</strong> 
						<a href="" class="view-post-btn">Viewing the last post</a>
					</div>
					//ë´ì© ìì ì
					
					ë´ì© ìì ì 
					<div class="t-side-popup-scroll"></div>
					//ë´ì© ìì ì 
				</div>
			</li> -->
			<!-- //setting -->
			
		</ul>
	</div>
	<!-- //side menu -->
</div>


<script type="text/javascript">
	var ctx = '${CTX}';
	var _timezone = '${CLIENT_ACCESS_TIMEZONE}';
</script>

<script src="${ctxPath}/script/common/system_alarm.js"></script>



